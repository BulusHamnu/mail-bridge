import IdempotencyKeyModel from "../models/idempotencykey.model.js";
import { type IdempotencyKey, Status } from "../models/idempotencykey.model.js";

async function createIdempotencyKey(emailId: string): Promise<IdempotencyKey> {
  try {
    const newRecord = await IdempotencyKeyModel.create({
      emailId,
      status: Status.PENDING,
    });

    return newRecord;
  } catch (error: any) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      const record = await IdempotencyKeyModel.findOne({ emailId }).lean();

      if (record && record.status === Status.PENDING) {
        const err = new Error(
          `Idempotency key for emailId ${emailId} is already pending`,
        );

        err.name = "IdempotencyKeyPendingError";
        throw err;
      }

      if (record && record.status === Status.SUCCEEDED) {
        const err = new Error(
          `Idempotency key for emailId ${emailId} has already succeeded`,
        );

        err.name = "IdempotencyKeySucceededError";
        throw err;
      }
    }

    throw new Error("Unable to create idempotency key", { cause: error });
  }
}

async function updateIdempotencyKeyStatus(
  emailId: string,
  status: "pending" | "succeeded" | "failed",
): Promise<IdempotencyKey | null> {
  return await IdempotencyKeyModel.findOneAndUpdate(
    { emailId },
    { status, updatedAt: new Date() },
    { returnDocument: "after" },
  );
}

export { createIdempotencyKey, updateIdempotencyKeyStatus };
