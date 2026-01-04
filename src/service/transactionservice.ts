import Transactions from "../model/transactions"

const TransactionService = {
  createTransaction: async (transactionData: any) => {
    const transaction = await Transactions.createTransaction(transactionData);
    return transaction;
  },

  findTransactionByUserId: async (userId: string) => {
    const transaction = await Transactions.getUserTransaction(userId);
    return transaction;
  }


}


export default TransactionService