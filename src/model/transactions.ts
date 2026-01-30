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
  const result = await pool.query("SELECT * FROM transactions WHERE user_id =$1", [id]);
    return result.rows;

},

async getUserBalance(id: string) {
  const result = await pool.query("SELECT * FROM users WHERE balance =$1", [id]);
  return result.rows[0];
},

async getTransactionByDate(userId: string, year?: number,status?: string){
    let query = `SELECT * FROM transactions WHERE user_id = $1`;
    const values: any[] = [userId];
    if (year) {
    query += ` AND EXTRACT(YEAR FROM created_at) = $${values.length + 1}`;
    values.push(year);
  }

  if (status) {
    query += ` AND status = $${values.length + 1}`;
    values.push(status);
  }

  query += ` ORDER BY created_at DESC`;

  const result = await pool.query(query, values);
  return result.rows;


},

async getTransactions(
  userId: string,
  filters?: {
    from?: string; // YYYY-MM-DD
    to?: string;   // YYYY-MM-DD
    status?: string;
  }
) {
  let query = `SELECT * FROM transactions WHERE user_id = $1`;
  const values: any[] = [userId];

  if (filters?.from) {
    query += ` AND created_at >= $${values.length + 1}`;
    values.push(filters.from);
  }

  if (filters?.to) {
    query += ` AND created_at <= $${values.length + 1}`;
    values.push(`${filters.to} 23:59:59`);
  }

  if (filters?.status) {
    query += ` AND status = $${values.length + 1}`;
    values.push(filters.status);
  }

  query += ` ORDER BY created_at DESC`;

  return (await pool.query(query, values)).rows;
},

async getAirtimePaymentTransactions(
  userId: string,
  filters?: {
    from?: string; // YYYY-MM-DD
    to?: string;   // YYYY-MM-DD
    status?: string;
  }
) {
  let query = `SELECT * FROM airtime_transactions WHERE user_id = $1`;
  const values: any[] = [userId];

  if (filters?.from) {
    query += ` AND created_at >= $${values.length + 1}`;
    values.push(filters.from);
  }

  if (filters?.to) {
    query += ` AND created_at <= $${values.length + 1}`;
    values.push(`${filters.to} 23:59:59`);
  }

  if (filters?.status) {
    query += ` AND status = $${values.length + 1}`;
    values.push(filters.status);
  }

  query += ` ORDER BY created_at DESC`;

  return (await pool.query(query, values)).rows;
},

async getUserTransactions(id: string) {
  const result = await pool.query("SELECT * FROM transactions WHERE user_id =$1", [id]);
  return result.rows;
},

async transactionHistory(id: string) {
  const query = `
    SELECT
      transaction_id,
      user_id,
      amount,
      status,
      created_at,
      'transaction' AS source
    FROM transactions
    WHERE user_id = $1

    UNION ALL

    SELECT
      id,
      user_id,
      amount,
      status,
      created_at,
      'airtime' AS source
    FROM airtime_transactions
    WHERE user_id = $1

    ORDER BY created_at DESC
  `;

  const {rows} = await pool.query(query, [id]);
  return rows;

}


}

export default Transactions;