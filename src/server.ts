import express from "express";
import env from "./config/index.js";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger.js";
import webhookRoutes from "./routes/webhook.route.js";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contact.route.js";

const app = express();

app.use((req, res, next) => {
  if (req.originalUrl === "/api/webhook/resend") {
    return express.raw({ type: "application/json" })(req, res, next);
  }
  express.json()(req, res, next);
});
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);
app.use(
  morgan("dev", {
    stream: {
      write: (s: string) => {
        logger.http(s.trim());
      },
    },
  }),
);

app.use("/api/webhook", webhookRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", async (req, res) => {
  res.send(`
    <h1>Welcome to Mail Bridge API</h1>
    <p>A lightweight email gateway built with Node.js, TypeScript, and Resend for email forwarding, contact form handling, and automated email notifications.</p>
  `);
});

app.listen(env.PORT, async () => {
  await connectDB();
  logger.info(`Server started on: http://localhost:${env.PORT}`);
});
