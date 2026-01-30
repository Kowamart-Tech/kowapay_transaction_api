import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      _id: string;
      phone?: string;
      user_type?: string;
      kyc_level?: number;
    };
  }
}
