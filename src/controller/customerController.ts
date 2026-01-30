import HttpException from "../utils/httpExceptions";
import { successResponse } from "../utils/successresponse";
import statusCodes from "../constants/statuscodes";
import CustomerService from "../service/customerService";
import { UserService } from "../service/userService";
import TransactionService from "../service/transactionservice";

const CustomerController = {
  transferDispute: async (req: any, res: any) => {
  try {
    const userId = req.user._id;
    const {   year, week, day, status } = req.query;

    if (!userId) {
  throw new HttpException(
    statusCodes.BAD_REQUEST,
    "User not authenticated"
  );
}

    if (!year && !week && !day) {
      throw new HttpException(
        statusCodes.BAD_REQUEST,
        "At least one of year, week, or day is required"
      );
    }

    const user = await UserService.findById(userId);
    if (!user) {
      throw new HttpException(statusCodes.NOT_FOUND, "User not found");
    }

    const transactions = await CustomerService.transferDispute(
      userId,
      {year: year ? Number(year) : undefined,
    week: week ? Number(week) : undefined,
    day: day as string,
    status: status as string}
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
},


airtimeDispute: async (req: any, res: any) => {
  try {
    const userId = req.user._id;
    const {   year, week, day, status } = req.query;

    if (!userId) {
  throw new HttpException(
    statusCodes.BAD_REQUEST,
    "User not authenticated"
  );
}

    if (!year && !week && !day) {
      throw new HttpException(
        statusCodes.BAD_REQUEST,
        "At least one of year, week, or day is required"
      );
    }

    const user = await UserService.findById(userId);
    if (!user) {
      throw new HttpException(statusCodes.NOT_FOUND, "User not found");
    }

    const transactions = await CustomerService.airtimeDispute(
      userId,
      {year: year ? Number(year) : undefined,
    week: week ? Number(week) : undefined,
    day: day as string,
    status: status as string}
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



}

export default CustomerController;