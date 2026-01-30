import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "../utils/jwt";

export const userAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwtVerify(token, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: err.name === "TokenExpiredError"
          ? "Token expired"
          : "Invalid token"
      });
    }

    const payload = decoded as any;

    req.user = {
      _id: payload._id,          
      phone: payload.phone,
      user_type: payload.user_type,
      kyc_level: payload.kyc_level
    };

    next();
  });
};

