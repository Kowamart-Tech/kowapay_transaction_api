import express from "express";
import {errorHandler} from "../utils/errorHandle";
import { authMiddleware } from "../middleware/authMiddleware";
import AirtimeController from "../controller/airtimeController";

const airtimeRouter = express.Router();

airtimeRouter.get('/getuser-airtime', authMiddleware, errorHandler(AirtimeController.getUserAirtimeTransactions));
airtimeRouter.post('/create-airtime-transaction', authMiddleware, errorHandler(AirtimeController.createAirtimeTransaction));

export default airtimeRouter;