import limiter, { ipKeyGenerator } from "express-rate-limit";
import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import type { Response as CustomResponse } from "../types/express.type.js";

function getIdentifer(req: Request) {
  // Read X-Forwarded-For to get correct client ip because server can be behind proxy/load-banlancer
  const forwardedIp = req.headers["x-forwarded-for"];
  if (forwardedIp) {
    logger.info(`X-Forwarded-For: ${forwardedIp}`);
    return typeof forwardedIp === "string"
      ? forwardedIp.split(",")[0]!.trim()
      : forwardedIp[0]!.split(",")[0]!.trim();
  } else {
    return ipKeyGenerator(req.ip as string);
  }
}

const limitOpts = {
  standardHeaders: false,
  handler: (
    req: Request,
    res: Response<CustomResponse<null>>,
    next: NextFunction,
  ) => {
    logger.debug("Too many requests", { identity: req.ip });

    return res.status(429).json({
      status: false,
      message: "Too many requests, please try again later.",
      error: {
        code: "RATE_LIMIT_EXCEEDED",
        details: null,
      },
    });
  },
  keyGenerator: (req: Request, res: Response) => {
    return getIdentifer(req);
  },
};

const rateLimiter = (limit: number, window: number) => {
  return limiter({ ...limitOpts, windowMs: window, limit });
};

export default rateLimiter;
