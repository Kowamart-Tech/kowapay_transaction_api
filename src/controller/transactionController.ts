import HttpException from "../utils/httpExceptions";
import { successResponse } from "../utils/successresponse";
import statusCodes from "../constants/statuscodes";
import TransactionService from "../service/transactionservice";
import { UserService } from "../service/userService";
import { sendTransactionNotificationEmail } from "../service/emailService";
import axios from "axios";
import { get } from "http";


const TransactionController = {
   createTransaction: async(req: any, res: any) => {
    try {
      const userId = req.user.user._id;
      const { amount, currency, transaction_type, paymentMethod, paymentType, reference,  metadata } = req.body;

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
        status: 'pending',
        currency,
        transaction_type,
        paymentMethod,
        paymentType,
        reference,
        metadata
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

  verifyTransaction: async (req: any, res: any) => {
    const { transactionId } = req.params;
          if (!transactionId) {
          throw new HttpException(400, "transactionId is required");
        }


        const transaction = await TransactionService.findTransactionByUserId(transactionId);

        if (!transaction) {
          throw new HttpException(404, "Transaction not found");
        }

    
  //await TransactionService.verifyAndApply(transaction);

  return successResponse(
    res,
    null,
    "Transaction verified and balance updated",
    statusCodes.SUCCESS
  );




  },

  getUserTransactions: async (req: any, res: any) => {
    try {
      const userId = req.user._id;


      if(!userId){
        throw new HttpException(401, 'Unauthorized');
      }

      const verifyUser = await UserService.findById(userId);
      if(!verifyUser){
        throw new HttpException(401, 'Unauthorized');
      }
      const transactions =  await TransactionService.getUserTransactions(userId);

      return successResponse(
        res,
        transactions,
        "User transactions fetched successfully",
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
        message: "Failed to get user transaction",
      });
    
    }
  },

  getTransactionHistory: async (req: any, res: any) => {
    try {
      const userId = req.user._id;
      console.log("Fetching transaction history for userId:", userId);
      if(!userId){
        throw new HttpException(401, 'Unauthorized');
      }
      const verifyUser = await UserService.findById(userId);
      if(!verifyUser){
        throw new HttpException(401, 'Unauthorized');
      }
      const history =  await TransactionService.getTransactionHistory(userId);
      console.log("Transaction history fetched:", history);

      return successResponse(
        res,
        history,
        "Transaction history fetched successfully",
        statusCodes.SUCCESS
      );

    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.status).json({
          status: "error",
          message: error.message,
        });
      }

    
    }
  }
}

export default TransactionController;
