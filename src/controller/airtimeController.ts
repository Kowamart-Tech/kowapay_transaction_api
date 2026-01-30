import HttpException from "../utils/httpExceptions";
import { successResponse } from "../utils/successresponse";
import statusCodes from "../constants/statuscodes";
import { UserService } from "../service/userService";
import AirtimeService from "../service/airtimeService";
import axios from "axios";
import crypto from "crypto";

const API_URL = "http://localhost:4300";



const AirtimeController = {
 
    getUserAirtimeTransactions: async (req: any, res: any) => {
        try {
            const { userId } = req.body;
            if (!userId) {
                throw new HttpException(
                    statusCodes.BAD_REQUEST,
                    "userId is required"
                );
            }
            const user = await UserService.findById(userId);
            if (!user) {
                throw new HttpException(statusCodes.BAD_REQUEST, "User not found");
            }
            const airtimeTransactions = await AirtimeService.getUserAirtimeById(user.user_id);
            return successResponse(
                res,
                airtimeTransactions,
                "User airtime transactions fetched successfully",
                statusCodes.SUCCESS
            );
        } catch (error) {
           if (error instanceof HttpException) {
        return res.status(error.status).json({
          status: "error",
          message: error.message,
        });
      }

      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Failed to get airtime transaction",
      });
        }
    },

    createAirtimeTransaction: async (req: any, res: any) => {
        try {
            const { userId, amount, currency, phone_number, network } = req.body;

            if(!userId || !amount || !currency || !phone_number || !network){
                throw new HttpException(statusCodes.BAD_REQUEST, "userId, amount, currency, phone_number and network are required");
            }

            if(Number(amount) <= 0){
                throw new HttpException(statusCodes.BAD_REQUEST, "amount must be greater than zero");
            }

            const reference =` AIR_${crypto.randomUUID()}`;

            const user = await UserService.findById(userId);

            if (!user) {
                throw new HttpException(statusCodes.BAD_REQUEST, "user not found");

            }

            const response =  await axios.post(
                `${API_URL}/api/v1/balance/lock-balance`,
                {
                    userId,
                    amount,
                    reference
                },
                
   
            )
            console.log("Provider response:", response);
            if (response.data.status !== true) {
                throw new HttpException(statusCodes.BAD_REQUEST, "Trasnsaction failed");
            }


            

          


            await AirtimeService.create({
                 user_id: userId,
                amount,
                currency,
                phone_number,
                network,
                status: "PENDING",
                reference,
            })

            res.status(201).json({
                success: true,
                status: statusCodes.CREATED,
                message: "Airtime transaction created successfully",
                data: {
                    reference,
                }
            });
          

        } catch (error:any) {
             res.status(500).json({
                success: false,
                status: error.status || statusCodes.INTERNAL_SERVER_ERROR,
                message: error.message || 'Internal Server Error'
            });
      }

      
        
    }



}

export default AirtimeController;