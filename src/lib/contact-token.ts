import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed-timestamp tokens for the contact form's minimum-fill-time check.
 *
 * The pages are statically generated, so the form fetches a fresh token
 * from /api/contact-token when the visitor first interacts with it. On
 * submit, the server action verifies the signature and requires the token
 * to be old enough that a human could plausibly have filled the form —
 * instant-submit scripts fail the check.
 *
 * The signing secret is derived from RESEND_API_KEY (stable across
 * serverless instances, never exposed) with a fixed fallback for keyless
 * local development.
 */

const secret = createHmac(
  "sha256",
  process.env.RESEND_API_KEY ?? "contact-token-dev-secret",
)
  .update("contact-token-signing-key")
  .digest();

/** Humans need at least this long to fill five fields. */
export const MIN_FILL_MS = 3_000;
/** Tokens older than this are stale — the client fetches a new one. */
export const MAX_TOKEN_AGE_MS = 2 * 60 * 60 * 1_000;

function sign(timestamp: string): Buffer {
  return createHmac("sha256", secret).update(timestamp).digest();
}

export function mintContactToken(): string {
  const timestamp = Date.now().toString();
  return `${timestamp}.${sign(timestamp).toString("base64url")}`;
}

export type TokenCheck = "valid" | "too-fast" | "invalid";

export function checkContactToken(token: unknown): TokenCheck {
  if (typeof token !== "string") return "invalid";
  const [timestamp, signature] = token.split(".");
  if (!timestamp || !signature) return "invalid";

  let provided: Buffer;
  try {
    provided = Buffer.from(signature, "base64url");
  } catch {
    return "invalid";
  }
  const expected = sign(timestamp);
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return "invalid";
  }

  const age = Date.now() - Number(timestamp);
  if (Number.isNaN(age) || age < 0 || age > MAX_TOKEN_AGE_MS) return "invalid";
  if (age < MIN_FILL_MS) return "too-fast";
  return "valid";
}
