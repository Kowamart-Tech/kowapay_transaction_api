import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "../utils/jwt";
import jwt from "jsonwebtoken";
import { User } from "../types/user";

export interface CustomRequest extends Request {
  user?: User;
}

export const auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const bearer = req.header("Authorization");
  if (bearer) {
    if (bearer.startsWith("Bearer ")) {
      const token = bearer.split(" ")[1];

      jwtVerify(
        token,
        (error: jwt.VerifyErrors | null, user: string | object | undefined) => {
          if (error) {
            if (error.name === "TokenExpiredError") {
              return res.status(401).json({
                status: 401,
                success: false,
                message: "Token has expired",
                error,
              });
            }
            return res.status(401).json({
              status: 401,
              success: false,
              message: "Invalid token",
              error,
            });
          }
          req.user = user as User;
          next();
        }
      );
    } else {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Authorization type is Bearer <token>",
      });
    }
  } else {
    return res
      .status(403)
      .json({ status: 403, success: false, message: "Access denied" });
  }
};