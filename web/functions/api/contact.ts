// Cloudflare Pages Function — runs on the Pages runtime, NOT inside the Next
// static export. Deployed automatically from web/functions/ by wrangler.
// Relative imports (not "@/...") because wrangler bundles this independently.
import {
  parseContactPayload,
  type ContactPayload,
} from "../../lib/contact-validation";
import { CONTACT_EMAIL } from "../../content/nav";

type Env = {
  // Encrypted Pages secrets in production; unset under local wrangler dev.
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

// Cloudflare Turnstile public TEST secret (always passes) — the documented
// default so `wrangler pages dev` works end-to-end. Production sets the real
// TURNSTILE_SECRET_KEY as an encrypted Pages secret.
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";
const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_URL = "https://api.resend.com/emails";
const FROM_ADDRESS = "KCOH Software <contact@kcoh.ca>";

const INVALID_REQUEST = "Invalid request.";
const VERIFY_FAILED = "Verification failed. Please retry the challenge.";
const SEND_FAILED = "Could not send your message.";

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string | null,
): Promise<boolean> {
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) {
    form.append("remoteip", ip);
  }
  const res = await fetch(SITEVERIFY_URL, { method: "POST", body: form });
  if (!res.ok) {
    return false;
  }
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

async function sendEmail(
  payload: ContactPayload,
  apiKey: string,
): Promise<boolean> {
  const lines = [payload.message, "", `From: ${payload.name} <${payload.email}>`];
  if (payload.company) {
    lines.push(`Company: ${payload.company}`);
  }
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [CONTACT_EMAIL],
      reply_to: payload.email,
      subject: `Website inquiry from ${payload.name}`,
      text: lines.join("\n"),
    }),
  });
  return res.ok;
}

export const onRequestPost = async (
  context: PagesContext,
): Promise<Response> => {
  let data: unknown;
  try {
    data = await context.request.json();
  } catch {
    return json(400, { ok: false, error: INVALID_REQUEST });
  }

  const parsed = parseContactPayload(data);
  if (!parsed.ok) {
    if (parsed.reason === "honeypot") {
      // Silent drop: never tell an automated submitter it was caught.
      return json(200, { ok: true });
    }
    return json(400, { ok: false, error: INVALID_REQUEST });
  }

  const secret = context.env.TURNSTILE_SECRET_KEY || TURNSTILE_TEST_SECRET;
  const ip = context.request.headers.get("CF-Connecting-IP");
  let human = false;
  try {
    human = await verifyTurnstile(parsed.payload.token, secret, ip);
  } catch {
    human = false;
  }
  if (!human) {
    return json(403, { ok: false, error: VERIFY_FAILED });
  }

  const apiKey = context.env.RESEND_API_KEY;
  if (!apiKey) {
    // Local dev (wrangler pages dev without secrets): log instead of sending.
    console.log(
      "[contact] RESEND_API_KEY not set, message logged instead of sent:",
      JSON.stringify({
        name: parsed.payload.name,
        email: parsed.payload.email,
        company: parsed.payload.company,
        message: parsed.payload.message,
      }),
    );
    return json(200, { ok: true });
  }

  try {
    const sent = await sendEmail(parsed.payload, apiKey);
    if (!sent) {
      return json(502, { ok: false, error: SEND_FAILED });
    }
  } catch {
    return json(502, { ok: false, error: SEND_FAILED });
  }

  return json(200, { ok: true });
};
