import  express  from "express";
import transactRouter from "./transactroutes";
import customerRouter from "./customerroutes";
import airtimeRouter from "./airtimeroutes";
import adminRouter from "./adminRoutes";
import bettingRouter from "./bettingRoutes";

const indexRouter= express.Router();


indexRouter.use('/transact', transactRouter);
indexRouter.use('/customer', customerRouter);
indexRouter.use('/airtime', airtimeRouter);
indexRouter.use('/admin', adminRouter);
indexRouter.use('/betting', bettingRouter);

export default indexRouter;