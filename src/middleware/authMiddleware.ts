import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "../utils/jwt";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

/**
 * Authentication middleware
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const bearer = req.header("Authorization");

  if (!bearer) {
    res.status(403).json({
      status: 403,
      success: false,
      message: "Access denied",
    });
    return;
  }

  if (!bearer.startsWith("Bearer ")) {
    res.status(401).json({
      status: 401,
      success: false,
      message: "Authorization type is Bearer <token>",
    });
    return;
  }

  const token = bearer.split(" ")[1];

  try {
    const decoded = jwtVerify(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        status: 401,
        success: false,
        message: "Token has expired",
      });
      return;
    }

    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid token",
      });
      return;
    }

    res.status(401).json({
      status: 401,
      success: false,
      message: "Authentication failed",
    });
  }
};
