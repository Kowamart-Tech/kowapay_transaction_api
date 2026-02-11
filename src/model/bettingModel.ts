import pool from "../config/db.js";

export interface IBetting {
  id: string;                 // UUID
  user_id: string;            // UUID

  betting_id: string;       // Recipient number
  network: string;            // betting network provider

  customer_name?: string;

  amount: number;
  currency: string;

  reference: string;          // Unique transaction reference
  provider_reference?: string; // From betting provider

  status: "pending" | "completed" | "failed" | "reversed";

  metadata?: Record<string, any>;

  created_at: Date;
  updated_at: Date;
}

const Betting = {
    async createBettingTransaction(tx:IBetting){
        const query = `
            INSERT INTO betting_transactions 
            (user_id, betting_id, network, customer_name, amount, currency, reference, provider_reference, status, metadata)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *;
        `;

          const values = [
    tx.user_id,
    tx.betting_id,
    tx.network,
    tx.customer_name ?? null,
    tx.amount ,
    tx.currency ?? null,
    tx.reference,
    tx.provider_reference ?? null,
    tx.status,
    tx.metadata ?? null,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
    },

    async getUserBettingById(id:any){
       const result = await pool.query("SELECT * FROM betting_transactions WHERE user_id =$1", [id]);
        return result.rows;
    }

}

export default Betting;