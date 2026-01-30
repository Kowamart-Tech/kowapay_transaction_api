import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

/**
 * JWT Verify (callback-based, same style as User API)
 */
export const jwtVerify = (
  token: string,
  callback: (err: VerifyErrors | null, decoded?: JwtPayload | string) => void
): void => {
  jwt.verify(token, JWT_SECRET, callback);
};
