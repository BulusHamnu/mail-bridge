import mongoose, { Document, Schema } from "mongoose";

export enum Status {
  PENDING = "pending",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

export interface IdempotencyKey extends Document {
  emailId: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

const idempotencyKeySchema = new Schema<IdempotencyKey>({
  emailId: { unique: true, type: String, required: true },
  status: { type: String, enum: Status, default: Status.PENDING },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    expires: 0,
  },
});

const IdempotencyKeyModel = mongoose.model<IdempotencyKey>(
  "IdempotencyKey",
  idempotencyKeySchema,
);

export default IdempotencyKeyModel;
