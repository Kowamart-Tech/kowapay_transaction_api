import express from "express";
import {errorHandler} from "../utils/errorHandle";
import { auth } from "../middleware/authMiddleware";
import AirtimeController from "../controller/airtimeController";

const airtimeRouter = express.Router();

airtimeRouter.get('/getuser-airtime', errorHandler(AirtimeController.getUserAirtimeTransactions));

export default airtimeRouter;