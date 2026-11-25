import logger from "../utils/logger.js";
import {
  Resend,
  type CreateEmailOptions,
  type CreateEmailRequestOptions,
  type GetReceivingEmailResponseSuccess,
} from "resend";
import env from "../config/index.js";
import { generateIdempotencyKey } from "../utils/functions.utils.js";

const resend = new Resend(env.RESEND_API_KEY);

/* Send Email */
async function sendEmail(payload: CreateEmailOptions): Promise<void> {
  const key = generateIdempotencyKey();
  const requestOptions: CreateEmailRequestOptions = {
    idempotencyKey: `mail-bridge-${key}`,
  };

  const { data: email, error } = await resend.emails.send(
    payload,
    requestOptions,
  );

  if (error) {
    throw new Error("Unable to send email", { cause: error });
  }

  logger.info(`Email sent successfully with ID: ${email.id}`);
}

/* Retrieve Email */
async function retrieveEmail(
  emailId: string,
): Promise<GetReceivingEmailResponseSuccess> {
  logger.info(`Retrieving email with ID: ${emailId}`);

  const { data: email, error } = await resend.emails.receiving.get(emailId);

  if (error || !email) {
    logger.error(`Error retrieving email with ID: ${emailId}`);
    throw new Error("Unable to retrieve received email", { cause: error });
  }

  return email;
}

/* Retrieve Attachments */
async function retrieveAndDownloadAttachments(
  emailId: string,
): Promise<{ filename: string | undefined; content: string }[]> {
  logger.info(`Retrieving attachments for email with ID: ${emailId}`);

  const { data: attachmentList, error: attachmentErr } =
    await resend.emails.receiving.attachments.list({
      emailId,
    });

  if (attachmentErr) {
    logger.error(`Error retrieving attachments for email ID: ${emailId}`);
    throw new Error("Unable to retrieve attachments", { cause: attachmentErr });
  }

  const attachments = await Promise.all(
    attachmentList.data.map(async (attachment) => {
      const response = await fetch(attachment.download_url);

      if (!response.ok) {
        throw new Error(`Failed to download ${attachment.filename}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());

      return {
        filename: attachment.filename,
        content: buffer.toString("base64"),
      };
    }),
  );

  return attachments;
}

/* Forward Email */
async function forwardEmail(emailId: string) {
  logger.info(`Forwarding email with ID: ${emailId} to the admin...`);

  const email = await retrieveEmail(emailId);
  const attachments = await retrieveAndDownloadAttachments(emailId);

  const emailPayload: CreateEmailOptions = {
    from: "Mail Bridge <message@bulushamnu.com>",
    to: [env.ADMIN_EMAIL],
    replyTo: email.from,
    subject: email.subject,
    headers: {
      ...email.headers,
      "X-Forwarded-By": "Mail Bridge API",
    },
    text: email.text || "",
    attachments: attachments,
  };

  if (email.html) emailPayload.html = email.html;

  await sendEmail(emailPayload);
}

export { forwardEmail, retrieveEmail, retrieveAndDownloadAttachments, resend };
