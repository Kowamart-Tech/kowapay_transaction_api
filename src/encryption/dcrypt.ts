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
 * Envelope Decryption Payload Interface
 */
export interface EnvelopeDecryptionPayload {
  encryptedData: string;
  dataIv: string;
  dataTag: string;
  encryptedDEK: string;
  dekIv: string;
  dekTag: string;
}

/**
 * Envelope Decryption
 * - Decrypts DEK using KEK
 * - Decrypts actual data using DEK
 */
export const envelopeDecrypt = (
  payload: EnvelopeDecryptionPayload
): string => {
  // 1. Decrypt DEK using KEK
  const decipherDek = crypto.createDecipheriv(
    "aes-256-gcm",
    KEK,
    Buffer.from(payload.dekIv, "hex")
  );

  decipherDek.setAuthTag(Buffer.from(payload.dekTag, "hex"));

  let DEK = decipherDek.update(payload.encryptedDEK, "hex");
  DEK = Buffer.concat([DEK, decipherDek.final()]);

  // 2. Decrypt actual data using DEK
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    DEK,
    Buffer.from(payload.dataIv, "hex")
  );

  decipher.setAuthTag(Buffer.from(payload.dataTag, "hex"));

  let data = decipher.update(payload.encryptedData, "hex", "utf8");
  data += decipher.final("utf8");

  return data;
};
