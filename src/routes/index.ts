import  express  from "express";
import transactRouter from "./transactroutes";

const indexRouter= express.Router();


indexRouter.use('/transact', transactRouter);

export default indexRouter;