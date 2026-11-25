import type { Request, Response } from "express";
import { forwardEmail } from "../services/resend.service.js";
import logger from "../utils/logger.js";
import type { EmailReceivedEvent } from "resend";

export async function handleResendWebhook(req: Request, res: Response) {
  const event: EmailReceivedEvent = req.body;

  logger.info("New webhook event received:\n", {
    type: event.type,
    emailId: event.data.email_id,
    sender: event.data.from,
  });

  await forwardEmail(event.data.email_id);

  res.status(200).json({ message: "Webhook received successfully" });
}
