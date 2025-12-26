import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

/**
 * Validate and load KEK (Key Encryption Key)
 */
const MASTER_KEK = process.env.MASTER_KEK;

if (!MASTER_KEK) {
  throw new Error("MASTER_KEK is not defined in environment variables");
}

const KEK = Buffer.from(MASTER_KEK, "hex");

if (KEK.length !== 32) {
  throw new Error("MASTER_KEK must be a 32-byte (256-bit) hex string");
}

/**
 * Envelope encryption result interface
 */
export interface EnvelopeEncryptionResult {
  encryptedData: string;
  dataIv: string;
  dataTag: string;
  encryptedDEK: string;
  dekIv: string;
  dekTag: string;
}

/**
 * Envelope Encryption
 * - Encrypts data with a random DEK
 * - Encrypts DEK with a master KEK
 */
export const envelopeEncrypt = (
  plainText: string
): EnvelopeEncryptionResult => {
  // 1. Generate DEK (Data Encryption Key)
  const DEK = crypto.randomBytes(32);

  // 2. Encrypt data with DEK
  const ivData = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", DEK, ivData);

  let encryptedData = cipher.update(plainText, "utf8", "hex");
  encryptedData += cipher.final("hex");
  const dataTag = cipher.getAuthTag().toString("hex");

  // 3. Encrypt DEK with KEK
  const ivDek = crypto.randomBytes(12);
  const cipherDek = crypto.createCipheriv("aes-256-gcm", KEK, ivDek);

  let encryptedDEK = cipherDek.update(DEK, undefined, "hex");
  encryptedDEK += cipherDek.final("hex");
  const dekTag = cipherDek.getAuthTag().toString("hex");

  return {
    encryptedData,
    dataIv: ivData.toString("hex"),
    dataTag,
    encryptedDEK,
    dekIv: ivDek.toString("hex"),
    dekTag,
  };
};
