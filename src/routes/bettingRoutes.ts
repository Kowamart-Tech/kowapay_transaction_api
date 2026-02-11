import express from "express";
import {errorHandler} from "../utils/errorHandle";
import { authMiddleware } from "../middleware/authMiddleware";
import BettingController from "../controller/bettingController";

const bettingRouter = express.Router();

bettingRouter.get('/getuser-betting', authMiddleware, errorHandler(BettingController.getUserBettingTransactions));
bettingRouter.post('/create-betting-transaction', authMiddleware, errorHandler(BettingController.createBettingTransaction));

export default bettingRouter;