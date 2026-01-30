import pool from "../config/db";
import { Admin } from "../types/admin";



export class AdminService {
  /** Check if user exists */
  static async findById(userId: string): Promise<Admin | null> {
    const result = await pool.query<Admin>(
      `SELECT * FROM admin WHERE id = $1`,[userId]
    );

    return result.rows[0];
  }

  /** Used for phone-based transfers */
  static async findByEmail(email: string): Promise<Admin | null> {
    const result = await pool.query<Admin>(
      `SELECT id, full_name, email, user_type
       FROM admin WHERE email = $1`,
      [email]
    );

    return result.rows[0] || null;
  }




}
