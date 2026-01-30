import express from "express";
import TransactionController from "../controller/transactionController";
import {errorHandler} from "../utils/errorHandle";
import { userAuthMiddleware } from "../middleware/userMiddleWare";

const transactRouter = express.Router();

transactRouter.post("/transactions", userAuthMiddleware, errorHandler(TransactionController.createTransaction));
transactRouter.post("/transactions/verify/:transactionId", userAuthMiddleware, errorHandler(TransactionController.verifyTransaction));
transactRouter.get("/get-transactions", userAuthMiddleware, errorHandler(TransactionController.getUserTransactions));
transactRouter.get("/transaction-history", userAuthMiddleware, errorHandler(TransactionController.getTransactionHistory));

export default transactRouter;