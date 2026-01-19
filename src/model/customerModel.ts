import pool from "../config/db";


export interface ICustomer {
   userId: string;
  transactionId: string;
  disputeReason: string;
  description?: string;
}

const Customer = {
    async createDispute(tx:ICustomer) {
  const query = `
    INSERT INTO disputes
    (user_id, transaction_id, dispute_reason, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [
    tx.userId,
    tx.transactionId,
    tx.disputeReason,
    tx.description || null,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

}

export default Customer;