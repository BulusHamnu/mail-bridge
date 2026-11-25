import crypto from "crypto";

function generateIdempotencyKey(): string {
  return crypto.randomBytes(16).toString("hex");
}

export { generateIdempotencyKey };
