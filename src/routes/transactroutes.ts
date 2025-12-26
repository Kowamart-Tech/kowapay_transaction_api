import express from "express";
import TransactionController from "../controller/transactionController";
import {errorHandler} from "../utils/errorHandle";


const transactRouter = express.Router();

transactRouter.post("/transactions", errorHandler(TransactionController.createTransaction));


export default transactRouter;