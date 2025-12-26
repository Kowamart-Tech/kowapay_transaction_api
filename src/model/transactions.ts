import pool from "../config/db.js";

export interface ITransaction {
  id: string; // UUID
  user: string; // UUID
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  paymentMethod: string;
  paymentType?: string;
  transactionId?: string;
  usedForPayment: boolean;
  reference: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const Transactions = {

    async  createTransaction(tx: ITransaction) {
        const query = `
            INSERT INTO transactions 
            (user, amount, currency, status, payment_method, payment_type, transaction_id, used_for_payment, reference, metadata)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *;
        `;
  
  const values = [
    tx.user,
    tx.amount,
    tx.currency,
    tx.status,
    tx.paymentMethod,
    tx.paymentType || null,
    tx.transactionId || "",
    tx.usedForPayment,
    tx.reference,
    tx.metadata || null,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
},

async getUserTransaction(id: any){
  const result = await pool.query("SELECT * FROM transactions WHERE user_id =$1", [id]);
    return result.rows[0];

}

}

export default Transactions;