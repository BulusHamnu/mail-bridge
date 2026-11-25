import { createLogger, format, transports } from "winston";
import chalk from "chalk";

const myFormat = format.printf(
  ({ level, timestamp, message, stack, cause, ...meta }): string => {
    const errorDetails = [
      stack && chalk.red(stack),
      cause &&
        chalk.yellow(
          `Cause: ${
            cause instanceof Error
              ? cause.stack || cause.message
              : JSON.stringify(cause)
          }`,
        ),
    ]
      .filter(Boolean)
      .join("\n");

    return `[${level}][${chalk.blueBright(timestamp)}]: ${message}${
      errorDetails ? `\n${errorDetails}` : ""
    }${Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : ""}`;
  },
);

/* Main logger instance */
const logger = createLogger({
  level: "debug",
  transports: [
    new transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.timestamp(),
        myFormat,
      ),
    }),
  ],
});

export default logger;
