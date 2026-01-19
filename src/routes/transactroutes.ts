import express from "express";
import TransactionController from "../controller/transactionController";
import {errorHandler} from "../utils/errorHandle";
import { auth } from "../middleware/authMiddleware";

const transactRouter = express.Router();

transactRouter.post("/transactions", auth, errorHandler(TransactionController.createTransaction));
transactRouter.post("/transactions/verify/:transactionId", auth, errorHandler(TransactionController.verifyTransaction));

export default transactRouter;