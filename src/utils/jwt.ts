import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Load and validate JWT secret
 */
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

/**
 * JWT Sign
 */
export const jwtSign = (
  payload: string | object | Buffer,
  options: SignOptions = { expiresIn: "15m" }
): string => {
  return jwt.sign(payload, JWT_SECRET, options);
};

/**
 * JWT Verify
 */
export const jwtVerify = <T = JwtPayload>(
  token: string
): T => {
  return jwt.verify(token, JWT_SECRET) as T;
};
