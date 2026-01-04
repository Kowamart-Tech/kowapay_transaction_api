import HttpException from "../utils/httpExceptions";
import { successResponse } from "../utils/successresponse";
import statusCodes from "../constants/statuscodes";
import TransactionService from "../service/transactionservice";
import { UserService } from "../service/userService";
import { sendTransactionNotificationEmail } from "../service/emailService";

const TransactionController = {
  async createTransaction(req: any, res: any) {
    try {
      const { userId, amount, transaction_type, currency, reference, status, paymentMethod, paymentType } = req.body;
      console.log("Create Transaction Request Body:", req.body);

      if (!userId || !amount || !transaction_type) {
        throw new HttpException(
          statusCodes.BAD_REQUEST,
          "userId, amount and type are required"
        );
      }

      /**  Check user existence */
      const user = await UserService.findById(userId);
      console.log("User fetched for transaction:", user);
      if (!user) {
        throw new HttpException(
          statusCodes.NOT_FOUND,
          "User not found"
        );
      }

     

      /**  Create transaction */
      const transaction = await TransactionService.createTransaction({
        user_id: user.user_id,
        amount,
        transaction_type,
        currency,
        status,
        reference,
        paymentMethod,
        paymentType
      });

      await sendTransactionNotificationEmail(user.email, {
            fullName: user.full_name,
            amount: transaction.amount,
            currency: transaction.currency,
            transactionType: transaction.transaction_type,
            reference: transaction.reference,
            status: transaction.status,
            createdAt: transaction.created_at,
            });

      return successResponse(
        res,
        transaction,
        "Transaction created successfully",
        statusCodes.CREATED
      );



    } catch (error: any) {
      console.error("CREATE TRANSACTION ERROR:", error);
      if (error instanceof HttpException) {
        return res.status(error.status).json({
          status: "error",
          message: error.message,
        });
      }

      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Failed to create transaction",
      });
    }
  },

  async verifyTransaction(req: any, res: any) {
    const { transactionId } = req.params;
          if (!transactionId) {
          throw new HttpException(400, "transactionId is required");
        }


        const transaction = await TransactionService.findTransactionByUserId(transactionId);

        if (!transaction) {
          throw new HttpException(404, "Transaction not found");
        }

         if (transaction.status === "completed") {
    throw new HttpException(400, "Transaction already verified");
  }

  //await TransactionService.verifyAndApply(transaction);

  return successResponse(
    res,
    null,
    "Transaction verified and balance updated",
    statusCodes.SUCCESS
  );




  }
};

export default TransactionController;
