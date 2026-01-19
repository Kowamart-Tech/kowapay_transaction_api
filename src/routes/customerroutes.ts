import express from "express";
import CustomerController from "../controller/customerController";
import {errorHandler} from "../utils/errorHandle";
import { auth } from "../middleware/authMiddleware";

const customerRouter = express.Router();

customerRouter.post("/transferdispute", auth, errorHandler(CustomerController.transferDispute));
customerRouter.post("/createdispute",auth, errorHandler(CustomerController.createTransferDispute));
export default customerRouter;