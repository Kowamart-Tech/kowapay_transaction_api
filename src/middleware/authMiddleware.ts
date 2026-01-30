import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwtVerify(token, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token expired"
        });
      }

      return res.status(401).json({
        message: "Invalid token"
      });
    }

    // decoded is JwtPayload | string
    const payload = decoded as any;

    req.user = {
      _id: payload.sub || payload.id,
      phone: payload.phone,
      user_type: payload.user_type,
      kyc_level: payload.kyc_level
    };

    next();
  });
};
