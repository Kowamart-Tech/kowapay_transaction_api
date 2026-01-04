import express from "express";
import TransactionController from "../controller/transactionController";
import {errorHandler} from "../utils/errorHandle";
import { authMiddleware } from "../middleware/authMiddleware";

const transactRouter = express.Router();

transactRouter.post("/transactions", errorHandler(TransactionController.createTransaction));
transactRouter.post("/transactions/verify/:transactionId", authMiddleware, errorHandler(TransactionController.verifyTransaction));

export default transactRouter;