import pool from "../config/db";

export class FeatureFlagModel {
    
  static async findByKey(featureKey: string) {
    const result = await pool.query(
      `SELECT feature_key, is_disabled, reason
       FROM feature_flags
       WHERE feature_key = $1`,
      [featureKey]
    );

    return result.rows[0] || null;
  }

  static async updateFeature(
    featureKey: string,
    isDisabled: boolean,
    reason: string,
    adminId:string,


  ) {
    return pool.query(
    `UPDATE feature_flags
     SET is_disabled = $1,
         reason = $2,
         updated_by = $3,
         updated_at = NOW()
     WHERE feature_key = $4`,
    [isDisabled, reason || null, adminId, featureKey]
    );
  }
}
