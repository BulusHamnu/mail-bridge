import type { Request, Response } from "express";
import { forwardEmail, resend } from "../services/resend.service.js";
import logger from "../utils/logger.js";
import type { EmailReceivedEvent, WebhookEventPayload } from "resend";
import env from "../config/index.js";

export async function handleResendWebhook(req: Request, res: Response) {
  try {
    logger.info("New webhook event received");

    const payload = req.body.toString();

    if (
      !req.headers["svix-id"] ||
      !req.headers["svix-timestamp"] ||
      !req.headers["svix-signature"]
    ) {
      logger.error("Missing required headers for webhook verification");
      return res
        .status(400)
        .json({ message: "Missing required headers for webhook verification" });
    }

    let result: WebhookEventPayload | null = null;
    try {
      result = resend.webhooks.verify({
        payload,
        headers: {
          id: req.headers["svix-id"] as string,
          timestamp: req.headers["svix-timestamp"] as string,
          signature: req.headers["svix-signature"] as string,
        },
        webhookSecret: env.RESEND_WEBHOOK_SECRET,
      });
    } catch (error) {
      const err = new Error("Webhook verification failed", { cause: error });
      err.name = "WebhookVerificationError";
      throw err;
    }

    if (result.type !== "email.received") {
      logger.warn("Received webhook event is not of type 'email.received'", {
        type: result.type,
      });
      return res.status(400).json({
        message: "Received webhook event is not of type 'email.received'",
      });
    }

    const event = result as unknown as EmailReceivedEvent;

    logger.info("Webhook verification successful:", {
      type: event.type,
      emailId: event.data.email_id,
      sender: event.data.from,
    });

    await forwardEmail(event.data.email_id);

    res.status(200).json({ message: "Webhook received successfully" });
  } catch (error) {
    if (error instanceof Error && error.name === "WebhookVerificationError") {
      logger.error("Webhook verification failed", error);
      return res.status(400).json({ message: "Webhook verification failed" });
    }

    logger.error("Error processing webhook event", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
