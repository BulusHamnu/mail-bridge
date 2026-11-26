import logger from "../utils/logger.js";
import env from "../config/index.js";
import type { ContactForm } from "../utils/validations/contactform.js";
import { sendEmail } from "./resend.service.js";
import {
  contactFormTemplate,
  contactFormReplyTemplate,
} from "../utils/templates/contact.js";

/* Send contact form submission to admin */
export async function processContactFormMessage(data: ContactForm) {
  const adminEmailPayload = {
    from: `Mail Bridge <message@bulushamnu.com>`,
    to: [env.ADMIN_EMAIL],
    replyTo: data.email,
    subject: `New Contact Form Submission from ${data.name}`,
    html: contactFormTemplate(data),
  };

  const replyEmailPayload = {
    from: "Hamnu Bulus Madu <no-reply@bulushamnu.com>",
    to: [data.email],
    subject: "Thanks for reaching out!",
    html: contactFormReplyTemplate(data),
  };

  const [adminResult, replyResult] = await Promise.allSettled([
    sendEmail(adminEmailPayload),
    sendEmail(replyEmailPayload),
  ]);

  if (adminResult.status === "rejected") {
    logger.error("Admin notification failed", {
      error: adminResult.reason,
    });
  }

  if (replyResult.status === "rejected") {
    logger.error("Visitor acknowledgement failed", {
      error: replyResult.reason,
    });
  }

  logger.info("Contact form submission email sent successfully", {
    name: data.name,
    email: data.email,
  });
}
