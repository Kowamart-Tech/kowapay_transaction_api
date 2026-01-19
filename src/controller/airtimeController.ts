import HttpException from "../utils/httpExceptions";
import { successResponse } from "../utils/successresponse";
import statusCodes from "../constants/statuscodes";
import { UserService } from "../service/userService";
import AirtimeService from "../service/airtimeService";

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
                throw new HttpException(statusCodes.UNAUTHORIZED, "User not found");
            }
            const airtimeTransactions = await AirtimeService.getUserAirtimeById(user.user_id);
            return successResponse(
                res,
                airtimeTransactions,
                "User airtime transactions fetched successfully",
                statusCodes.SUCCESS
            );
        } catch (error) {
            
        }
    }



}

export default AirtimeController;