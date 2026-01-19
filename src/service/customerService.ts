import Transactions from "../model/transactions"
import { UserService } from "./userService";
import HttpException from "../utils/httpExceptions";
import Customer from "../model/customerModel";

const CustomerService = {
    transferDispute: async(userId: string, year?: number)=>{
        
            const verifyuserId = await UserService.findById(userId);
            if(!verifyuserId){
                throw new HttpException(404, 'User not found');
            }
            const transaction = await Transactions.getTransactionByDate(userId, year);
            return transaction;
            
       
        

    },


    createDistpute: async(ICustomer:any)=>{
            const dispute = await Customer.createDispute(ICustomer);
            return dispute;
       
    },

    getUserTransactionById: async(id: string)=>{
            const transaction = await Transactions.getUserTransaction(id);
            return transaction;

    }
}

export default CustomerService