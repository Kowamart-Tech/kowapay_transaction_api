import  express  from "express";
import transactRouter from "./transactroutes";
import customerRouter from "./customerroutes";
import airtimeRouter from "./airtimeroutes";
import adminRouter from "./adminRoutes";

const indexRouter= express.Router();


indexRouter.use('/transact', transactRouter);
indexRouter.use('/customer', customerRouter);
indexRouter.use('/airtime', airtimeRouter);
indexRouter.use('/admin', adminRouter);

export default indexRouter;