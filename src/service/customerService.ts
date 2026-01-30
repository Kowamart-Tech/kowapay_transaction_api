import Transactions from "../model/transactions"
import { UserService } from "./userService";
import HttpException from "../utils/httpExceptions";
import Customer from "../model/customerModel";

const CustomerService = {
   transferDispute: async (
  userId: string,
  filters?: {
    year?: number;
    week?: number;
    day?: string;
    status?: string;
  }
) => {
  const verifyUser = await UserService.findById(userId);
  if (!verifyUser) {
    throw new HttpException(404, "User not found");
  }

  let from: string | undefined;
  let to: string | undefined;

  // YEAR filter
  if (filters?.year) {
    from = `${filters.year}-01-01`;
    to = `${filters.year}-12-31`;
  }

  // WEEK filter (overrides year range)
  if (filters?.year && filters?.week) {
    const startOfYear = new Date(filters.year, 0, 1);
    const startOfWeek = new Date(startOfYear);
    startOfWeek.setDate(startOfYear.getDate() + (filters.week - 1) * 7);

    from = startOfWeek.toISOString().split("T")[0];
    to = new Date(
      startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000
    ).toISOString().split("T")[0];
  }

  // DAY filter (highest priority)
  if (filters?.day) {
    from = filters.day;
    to = filters.day;
  }

  return Transactions.getTransactions(userId, {
    from,
    to,
    status: filters?.status
  });
   },

    createDistpute: async(ICustomer:any)=>{
            const dispute = await Customer.createDispute(ICustomer);
            return dispute;
       
    },

    getUserTransactionById: async(id: string)=>{
            const transaction = await Transactions.getUserTransaction(id);
            return transaction;

    },


  airtimeDispute: async (
  userId: string,
  filters?: {
    year?: number;
    week?: number;
    day?: string;
    status?: string;
  }
) => {
  const verifyUser = await UserService.findById(userId);
  if (!verifyUser) {
    throw new HttpException(404, "User not found");
  }

  let from: string | undefined;
  let to: string | undefined;

  // YEAR filter
  if (filters?.year) {
    from = `${filters.year}-01-01`;
    to = `${filters.year}-12-31`;
  }

  // WEEK filter (overrides year range)
  if (filters?.year && filters?.week) {
    const startOfYear = new Date(filters.year, 0, 1);
    const startOfWeek = new Date(startOfYear);
    startOfWeek.setDate(startOfYear.getDate() + (filters.week - 1) * 7);

    from = startOfWeek.toISOString().split("T")[0];
    to = new Date(
      startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000
    ).toISOString().split("T")[0];
  }

  // DAY filter (highest priority)
  if (filters?.day) {
    from = filters.day;
    to = filters.day;
  }

  return Transactions.getAirtimePaymentTransactions(userId, {
    from,
    to,
    status: filters?.status
  });
    },

}

export default CustomerService