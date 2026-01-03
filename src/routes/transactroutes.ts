import express from "express";
import TransactionController from "../controller/transactionController";
import {errorHandler} from "../utils/errorHandle";
import { authMiddleware } from "../middleware/authMiddleware";

const transactRouter = express.Router();

transactRouter.post("/transactions", errorHandler(TransactionController.createTransaction));

export default transactRouter;