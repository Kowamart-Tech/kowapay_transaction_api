import pool from "../config/db.js";

export interface ITransaction {
  id: string; // UUID
  user_id: string; // UUID
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  paymentMethod: string;
  paymentType?: string;
  transactionId?: string;
  transaction_type?: string;
  reference: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const Transactions = {

    async  createTransaction(tx: ITransaction) {
        const query = `
            INSERT INTO transactions 
            (user_id, amount, currency, transaction_type, status, payment_method, payment_type, reference, metadata)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *;
        `;
  
  const values = [
    tx.user_id,
    tx.amount,
    tx.currency,
    tx.status ?? "pending",
    tx.transaction_type ?? null,
    tx.paymentMethod,
    tx.paymentType ?? null,
    tx.reference,
    tx.metadata ?? null,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
},

async getUserTransaction(id: any){
  const result = await pool.query("SELECT * FROM transactions WHERE transaction_id =$1", [id]);
    return result.rows[0];

},

async getUserBalance(id: string) {
  const result = await pool.query("SELECT * FROM users WHERE balance =$1", [id]);
  return result.rows[0];
}



}

export default Transactions;