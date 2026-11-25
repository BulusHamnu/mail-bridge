import dotenv from "dotenv";
dotenv.config();

/* Environment variables */
interface env {
  PORT: number;
}

const env: env = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};

export default env;
