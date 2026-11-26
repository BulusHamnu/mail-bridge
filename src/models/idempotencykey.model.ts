import mongoose, { Document, Schema } from "mongoose";

enum Status {
  PENDING = "pending",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

interface IdempotencyKey extends Document {
  emailId: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

const idempotencyKeySchema = new Schema<IdempotencyKey>({
  emailId: { unique: true, type: String, required: true },
  status: { type: String, enum: Status, default: Status.PENDING },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const IdempotencyKey = mongoose.model<IdempotencyKey>(
  "IdempotencyKey",
  idempotencyKeySchema,
);

export default IdempotencyKey;
