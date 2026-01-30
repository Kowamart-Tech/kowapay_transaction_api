import express from "express";
import {errorHandler} from "../utils/errorHandle";
import { authMiddleware } from "../middleware/authMiddleware";
import AdminController from "../controller/adminController";

const adminRouter = express.Router();

adminRouter.post("/toggle-feature", authMiddleware, errorHandler(AdminController.toggleFeature));

export default adminRouter;