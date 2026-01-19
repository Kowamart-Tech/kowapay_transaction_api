import HttpException from "../utils/httpExceptions";
import { successResponse } from "../utils/successresponse";
import statusCodes from "../constants/statuscodes";
import CustomerService from "../service/customerService";
import { UserService } from "../service/userService";
import TransactionService from "../service/transactionservice";

const CustomerController = {
  transferDispute: async (req: any, res: any) => {
  try {
    const { userId, year } = req.body;

    if (!userId || !year) {
      throw new HttpException(
        statusCodes.BAD_REQUEST,
        "userId and year are required"
      );
    }

    const user = await UserService.findById(userId);
    if (!user) {
      throw new HttpException(statusCodes.NOT_FOUND, "User not found");
    }

    const transactions = await CustomerService.transferDispute(
      userId,
      year
    );

    return successResponse(
      res,
      transactions,
      "User transactions fetched successfully",
      statusCodes.SUCCESS
    );

  } catch (error: any) {
    return res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
},

createTransferDispute: async (req: any, res: any) => {
  try {
    const { userId, transactionId, disputeReason, description } = req.body;

    if (!userId || !transactionId || !disputeReason) {
      throw new HttpException(
        statusCodes.BAD_REQUEST,
        "userId, transactionId and disputeReason are required"
      );
    }

    //  Validate user
    const user = await UserService.findById(userId);
    if (!user) {
      throw new HttpException(statusCodes.NOT_FOUND, "User not found");
    }

    //  Validate transaction
    const transaction =
      await TransactionService.findTransactionByUserId(userId);


    if (!transaction) {
      throw new HttpException(404, "Transaction not found");
    }


   

    //  Create dispute
    const dispute = await CustomerService.createDistpute({
      userId,
      transactionId,
      disputeReason,
      description,
    });

    return successResponse(
      res,
      dispute,
      "Dispute submitted successfully",
      statusCodes.CREATED
    );

  } catch (error: any) {
    return res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
}



}

export default CustomerController;