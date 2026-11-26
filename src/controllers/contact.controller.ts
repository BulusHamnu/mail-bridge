import type { Request, Response } from "express";
import logger from "../utils/logger.js";
import contactFormSchema, {
  type ContactForm,
} from "../utils/validations/contactform.js";
import zod from "zod";
import type { Response as CustomResponse } from "../types/express.type.js";
import { processContactFormMessage } from "../services/contact.service.js";
import { cleanDataBody } from "../utils/functions.utils.js";

/* Handle contact form submission */
async function handleContactForm(
  req: Request<{}, {}, ContactForm, {}>,
  res: Response<CustomResponse<null>>,
) {
  try {
    const formData = req.body;
    const result = await contactFormSchema.parseAsync(formData);

    const clean = cleanDataBody(result) as ContactForm;
    await processContactFormMessage(clean);

    res.status(200).json({
      status: true,
      message: "Contact form submission sent successfully",
      data: null,
    });
  } catch (error: any) {
    if (error instanceof zod.ZodError) {
      const details = zod.flattenError(error);

      logger.error(
        "Validation error in contact form submission",
        details.fieldErrors,
      );

      return res.status(400).json({
        status: false,
        message: "Validation error",
        error: { code: "VALIDATION_ERROR", details: details.fieldErrors },
      });
    }

    logger.error("Error handling contact form submission", { error });
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: { code: "INTERNAL_SERVER_ERROR", details: null },
    });
  }
}

export { handleContactForm };
