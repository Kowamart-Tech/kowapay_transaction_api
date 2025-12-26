import Transactions from "../model/transactions";
import HttpException from "../utils/httpExceptions";
import  {successResponse}  from "../utils/successresponse";
import statusCodes from "../constants/statuscodes";

const TransactionController = {

    async createTransaction(req: any, res: any){
        try {
            const txData = req.body;
            if(!txData){
                throw new HttpException(statusCodes.BAD_REQUEST, "Transaction data is required");
            }
            const newTransaction = await Transactions.createTransaction(txData); 
            successResponse(res, newTransaction,"successfully created transaction",statusCodes.CREATED);   
            
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Failed to create transaction",
            });
        }       
    },

}

export default TransactionController;