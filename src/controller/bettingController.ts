import HttpException from "../utils/httpExceptions";
import { successResponse } from "../utils/successresponse";
import statusCodes from "../constants/statuscodes";
import { UserService } from "../service/userService";
import BettingService from "../service/bettingService";
import axios from "axios";
import crypto from "crypto";
import { bettingSchema } from "../validations/bettingvalidations";

const API_URL = "http://localhost:4300";



const BettingController = {
 
    getUserBettingTransactions: async (req: any, res: any) => {
        try {
            const  userId  = req.user._id;
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
            const bettingTransactions = await BettingService.getUserBettingById(user.user_id);
            return successResponse(
                res,
                bettingTransactions,
                "User betting transactions fetched successfully",
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
        message: "Failed to get betting transaction",
      });
        }
    },

    createBettingTransaction: async (req: any, res: any) => {
        try {
            const userId = req.user._id
            const parsed =  bettingSchema.safeParse(req.body);

            if (!parsed.success) {
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: parsed.error.flatten().fieldErrors,
                });
                }

            const {  amount, currency, betting_id, network,customer_name } = parsed.data;

            if(!userId || !amount || !currency || !betting_id || !network || !customer_name){
                throw new HttpException(statusCodes.BAD_REQUEST, "userId, amount, currency, betting_id, network and customer_name are required");
            }

            if(Number(amount) <= 0){
                throw new HttpException(statusCodes.BAD_REQUEST, "amount must be greater than zero");
            }

            const reference =` BET_${crypto.randomUUID()}`;

            const user = await UserService.findById(userId);

            if (!user) {
                throw new HttpException(statusCodes.BAD_REQUEST, "user not found");

            }

            // const response =  await axios.post(
            //     `${API_URL}/api/v1/balance/lock-balance`,
            //     {
            //         userId,
            //         amount,
            //         reference
            //     },
                
   
            // )
            // console.log("Provider response:", response);
            // if (response.data.status !== true) {
            //     throw new HttpException(statusCodes.BAD_REQUEST, "Trasnsaction failed");
            // }


            

          


            await BettingService.create({
                 user_id: userId,
                amount,
                currency,
                customer_name,
                betting_id,
                network,
                status: "pending",
                reference,
            })

            res.status(201).json({
                success: true,
                status: statusCodes.CREATED,
                message: "Betting transaction created successfully",
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

export default BettingController;