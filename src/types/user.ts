export interface User {
  user_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  user_type: string;
  kyc_level: number;
  bvn?: string;
  nin?: string;
  created_at: Date;
}

export interface UserProfile {
  user_id: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  image?: string;
}

export interface KycStatus {
  tier: number;
  status: "pending" | "approved" | "rejected";
}
