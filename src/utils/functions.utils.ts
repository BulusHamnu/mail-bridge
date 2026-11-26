import crypto from "crypto";
import xss from "xss";

const escapeHtml = (value: string = ""): string => {
  return xss(value);
};

function cleanDataBody(data: any) {
  const cleanData: {
    [key: string]: string;
  } = {};

  for (const [key, value] of Object.entries(data) as [string, string][]) {
    cleanData[key] = escapeHtml(value);
  }

  return cleanData;
}

function generateIdempotencyKey(): string {
  return crypto.randomBytes(16).toString("hex");
}

export { generateIdempotencyKey, cleanDataBody };
