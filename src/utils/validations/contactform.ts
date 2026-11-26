import zod from "zod";

const contactFormSchema = zod.object({
  name: zod.string().min(3, "Name is required"),
  subject: zod.string().min(3, "Subject is required"),
  email: zod.string().email("Invalid email address"),
  message: zod.string().min(1, "Message is required"),
});

export type ContactForm = zod.infer<typeof contactFormSchema>;
export default contactFormSchema;
