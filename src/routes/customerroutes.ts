import express from "express";
import CustomerController from "../controller/customerController";
import {errorHandler} from "../utils/errorHandle";
import { userAuthMiddleware } from "../middleware/userMiddleWare";

const customerRouter = express.Router();

customerRouter.post("/transferdispute", userAuthMiddleware, errorHandler(CustomerController.transferDispute));
customerRouter.post("/createdispute",userAuthMiddleware, errorHandler(CustomerController.createTransferDispute));

export default customerRouter;