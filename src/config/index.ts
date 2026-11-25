import dotenv from "dotenv";
dotenv.config();

/* Environment variables */
interface env {
  PORT: number;
  RESEND_API_KEY: string;
  ADMIN_EMAIL: string;
}

const env: env = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
};

export default env;
