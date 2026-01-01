import HttpException from "../utils/httpExceptions";
import { successResponse } from "../utils/successresponse";
import statusCodes from "../constants/statuscodes";
import TransactionService from "../service/transactionservice";
import { UserService } from "../service/userService";
import { sendTransactionNotificationEmail } from "../service/emailService";

const TransactionController = {
  async createTransaction(req: any, res: any) {
    try {
      const { userId, amount, type, currency } = req.body;

      if (!userId || !amount || !type) {
        throw new HttpException(
          statusCodes.BAD_REQUEST,
          "userId, amount and type are required"
        );
      }

      /**  Check user existence */
      const user = await UserService.findById(userId);
      if (!user) {
        throw new HttpException(
          statusCodes.NOT_FOUND,
          "User not found"
        );
      }

      /**  Check KYC before transaction */
      const kyc = await UserService.getKycStatus(userId);
      if (kyc.tier < 2) {
        throw new HttpException(
          statusCodes.BAD_REQUEST,
          "Complete KYC to perform this transaction"
        );
      }

      /**  Create transaction */
      const transaction = await TransactionService.createTransaction({
        userId,
        amount,
        type,
        currency,
      });

      await sendTransactionNotificationEmail(user.email, {
            fullName: user.full_name,
            amount: transaction.amount,
            currency: transaction.currency,
            transactionType: transaction.type,
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
};

export default TransactionController;
