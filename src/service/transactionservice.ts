import Transactions from "../model/transactions"

const TransactionService = {
  createTransaction: async (transactionData: any) => {
    const transaction = await Transactions.createTransaction(transactionData);
    return transaction;
  },

  findTransactionByUserId: async (userId: string) => {
    const transaction = await Transactions.getUserTransaction(userId);
    return transaction;
  },

  getUserTransactions: async (userId: string) => {
    const transactions = await Transactions.getUserTransactions(userId);
    return transactions;
  },

  getTransactionHistory: async (userId: string) => {
    const history = await Transactions.transactionHistory(userId);
    return history;
  }
}


export default TransactionService