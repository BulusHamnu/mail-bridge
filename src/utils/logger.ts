import { createLogger, format, transports } from "winston";
import chalk from "chalk";

const myFormat = format.printf(
  ({ level, timestamp, message, stack, ...meta }): string => {
    if (stack) {
      return `[${level}][${chalk.blueBright(
        timestamp,
      )}]: ${message} ${chalk.red(stack)}`;
    }
    return `[${level}][${chalk.blueBright(timestamp)}]: ${message} ${
      Object.keys(meta).length > 0 ? JSON.stringify(meta, null) : ""
    }`;
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
