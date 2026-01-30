import pool from "../config/db";
import { User, UserProfile, KycStatus } from "../types/user";



export class UserService {
  /** Check if user exists */
  static async findById(userId: string): Promise<User | null> {
    const result = await pool.query<User>(
      `SELECT * FROM users WHERE user_id = $1`,[userId]
    );

    return result.rows[0];
  }

  /** Used for phone-based transfers */
  static async findByPhone(phone: string): Promise<User | null> {
    const result = await pool.query<User>(
      `SELECT user_id, full_name, email, phone_number, user_type, kyc_level
       FROM users WHERE phone_number = $1`,
      [phone]
    );

    return result.rows[0] || null;
  }

  /** KYC check before transactions */
  static async getKycStatus(userId: string): Promise<KycStatus> {
    const result = await pool.query<KycStatus>(
      `SELECT kyc_level FROM users WHERE user_id = $1`,
      [userId]
    );

    return result.rows[0] || { kyc_level: 0 };
  }

  /** Optional: profile data */
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const result = await pool.query<UserProfile>(
      `SELECT up.*
       FROM user_profiles up
       WHERE up.user_id = $1`,
      [userId]
    );

    return result.rows[0] || null;
  }
}
