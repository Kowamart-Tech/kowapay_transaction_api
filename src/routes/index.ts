import  express  from "express";
import transactRouter from "./transactroutes";
import customerRouter from "./customerroutes";
import airtimeRouter from "./airtimeroutes";

const indexRouter= express.Router();


indexRouter.use('/transact', transactRouter);
indexRouter.use('/customer', customerRouter);
indexRouter.use('/airtime', airtimeRouter);

export default indexRouter;