import Transactions from "../model/transactions"

const TransactionService = {
  createTransaction: async (transactionData: any) => {
    const transaction = await Transactions.createTransaction(transactionData);
    return transaction;
  }
}


export default TransactionService