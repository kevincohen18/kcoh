export const MIN_SUBMIT_MS = 3000;

export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  company: 150,
  message: 5000,
} as const;

export type ContactFields = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ContactPayload = ContactFields & {
  token: string;
  website: string;
  elapsedMs: number;
};

export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export type ParseFailureReason = "malformed" | "invalid" | "honeypot" | "too-fast";

export type ParseResult =
  | { ok: true; payload: ContactPayload }
  | { ok: false; reason: ParseFailureReason };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function singleLine(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function validateFields(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  const name = singleLine(fields.name);
  const email = fields.email.trim();
  const company = singleLine(fields.company);
  const message = fields.message.trim();

  if (name.length === 0) {
    errors.name = "Please tell us your name.";
  } else if (name.length > FIELD_LIMITS.name) {
    errors.name = `Please keep your name under ${FIELD_LIMITS.name} characters.`;
  }

  if (!isValidEmail(email) || email.length > FIELD_LIMITS.email) {
    errors.email = "Please enter a valid email address.";
  }

  if (company.length > FIELD_LIMITS.company) {
    errors.company = `Please keep the company name under ${FIELD_LIMITS.company} characters.`;
  }

  if (message.length === 0) {
    errors.message = "Please include a short message.";
  } else if (message.length > FIELD_LIMITS.message) {
    errors.message = `Please keep your message under ${FIELD_LIMITS.message} characters.`;
  }

  return errors;
}

export function isHoneypotTripped(website: string): boolean {
  return website.trim().length > 0;
}

export function isTooFast(
  elapsedMs: number,
  minMs: number = MIN_SUBMIT_MS,
): boolean {
  return !Number.isFinite(elapsedMs) || elapsedMs < minMs;
}

export function buildContactPayload(input: {
  fields: ContactFields;
  token: string;
  website: string;
  elapsedMs: number;
}): ContactPayload {
  return {
    name: singleLine(input.fields.name),
    email: input.fields.email.trim(),
    company: singleLine(input.fields.company),
    message: input.fields.message.trim(),
    token: input.token,
    website: input.website,
    elapsedMs: input.elapsedMs,
  };
}

export function parseContactPayload(data: unknown): ParseResult {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return { ok: false, reason: "malformed" };
  }
  const record = data as Record<string, unknown>;
  const { name, email, message, token, elapsedMs } = record;
  const company = typeof record.company === "string" ? record.company : "";
  const website = typeof record.website === "string" ? record.website : "";

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    typeof token !== "string" ||
    token.length === 0 ||
    typeof elapsedMs !== "number" ||
    !Number.isFinite(elapsedMs)
  ) {
    return { ok: false, reason: "malformed" };
  }

  if (isHoneypotTripped(website)) {
    return { ok: false, reason: "honeypot" };
  }

  if (isTooFast(elapsedMs)) {
    return { ok: false, reason: "too-fast" };
  }

  const payload = buildContactPayload({
    fields: { name, email, company, message },
    token,
    website,
    elapsedMs,
  });

  if (Object.keys(validateFields(payload)).length > 0) {
    return { ok: false, reason: "invalid" };
  }

  return { ok: true, payload };
}

export function buildMailtoUrl(to: string, fields: ContactFields): string {
  const name = singleLine(fields.name);
  const subject = `Website inquiry from ${name || "the KCOH website"}`;
  const lines = [fields.message.trim()];
  const company = singleLine(fields.company);
  if (company) {
    lines.push("", `Company: ${company}`);
  }
  lines.push("", `${name} (${fields.email.trim()})`);
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
