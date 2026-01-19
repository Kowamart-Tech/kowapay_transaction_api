import pool from "../config/db.js";

export interface IBetting {
  id: string;                 // UUID
  user_id: string;            // UUID

  phone_number: string;       // Recipient number
  network: "MTN" | "AIRTEL" | "GLO" | "9MOBILE";

  amount: number;
  currency: string;

  reference: string;          // Unique transaction reference
  provider_reference?: string; // From airtime provider

  status: "pending" | "completed" | "failed" | "reversed";

  metadata?: Record<string, any>;

  created_at: Date;
  updated_at: Date;
}

const Betting = {
    async createBettingTransaction(tx:IBetting){
        const query = `
            INSERT INTO betting_transactions 
            (user_id, phone_number, network, amount, currency, reference, provider_reference, status, metadata)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *;
        `;

          const values = [
    tx.user_id,
    tx.phone_number,
    tx.network,
    tx.amount ,
    tx.currency ?? null,
    tx.reference,
    tx.provider_reference ?? null,
    tx.status,
    tx.metadata ?? null,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
    }

}

export default Betting;