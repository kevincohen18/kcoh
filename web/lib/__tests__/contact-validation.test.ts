import { describe, it, expect } from "vitest";
import {
  MIN_SUBMIT_MS,
  FIELD_LIMITS,
  isValidEmail,
  validateFields,
  isHoneypotTripped,
  isTooFast,
  buildContactPayload,
  parseContactPayload,
  buildMailtoUrl,
  type ContactFields,
} from "@/lib/contact-validation";

const validFields: ContactFields = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines Ltd",
  message: "We need a booking system that does not double-book.",
};

const validRaw = {
  ...validFields,
  token: "XXXX.DUMMY.TOKEN.XXXX",
  website: "",
  elapsedMs: 8000,
};

describe("isValidEmail", () => {
  it("accepts a normal address", () => {
    expect(isValidEmail("ada@example.com")).toBe(true);
  });

  it("accepts short domains", () => {
    expect(isValidEmail("a@b.co")).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    expect(isValidEmail("  ada@example.com  ")).toBe(true);
  });

  it("rejects a missing @", () => {
    expect(isValidEmail("ada.example.com")).toBe(false);
  });

  it("rejects a missing local part", () => {
    expect(isValidEmail("@example.com")).toBe(false);
  });

  it("rejects a domain without a dot", () => {
    expect(isValidEmail("ada@example")).toBe(false);
  });

  it("rejects internal whitespace", () => {
    expect(isValidEmail("ada lovelace@example.com")).toBe(false);
  });
});

describe("validateFields", () => {
  it("returns no errors for valid fields", () => {
    expect(validateFields(validFields)).toEqual({});
  });

  it("allows an empty company (optional field)", () => {
    expect(validateFields({ ...validFields, company: "" })).toEqual({});
  });

  it("requires a name", () => {
    expect(validateFields({ ...validFields, name: "" }).name).toBeTruthy();
  });

  it("rejects whitespace-only names", () => {
    expect(validateFields({ ...validFields, name: "   " }).name).toBeTruthy();
  });

  it("accepts a name at the length limit", () => {
    expect(
      validateFields({ ...validFields, name: "a".repeat(FIELD_LIMITS.name) }),
    ).toEqual({});
  });

  it("rejects a name over the length limit", () => {
    expect(
      validateFields({ ...validFields, name: "a".repeat(FIELD_LIMITS.name + 1) })
        .name,
    ).toBeTruthy();
  });

  it("rejects an invalid email", () => {
    expect(validateFields({ ...validFields, email: "nope" }).email).toBeTruthy();
  });

  it("rejects an overlong email", () => {
    const email = `${"a".repeat(FIELD_LIMITS.email)}@example.com`;
    expect(validateFields({ ...validFields, email }).email).toBeTruthy();
  });

  it("rejects an overlong company", () => {
    expect(
      validateFields({
        ...validFields,
        company: "c".repeat(FIELD_LIMITS.company + 1),
      }).company,
    ).toBeTruthy();
  });

  it("requires a message", () => {
    expect(validateFields({ ...validFields, message: " " }).message).toBeTruthy();
  });

  it("accepts a message at the length limit", () => {
    expect(
      validateFields({ ...validFields, message: "m".repeat(FIELD_LIMITS.message) }),
    ).toEqual({});
  });

  it("rejects a message over the length limit", () => {
    expect(
      validateFields({
        ...validFields,
        message: "m".repeat(FIELD_LIMITS.message + 1),
      }).message,
    ).toBeTruthy();
  });

  it("accumulates multiple errors", () => {
    const errors = validateFields({
      name: "",
      email: "nope",
      company: "",
      message: "",
    });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });
});

describe("isHoneypotTripped", () => {
  it("is false for an empty value", () => {
    expect(isHoneypotTripped("")).toBe(false);
  });

  it("is false for whitespace only", () => {
    expect(isHoneypotTripped("   ")).toBe(false);
  });

  it("is true for any filled value", () => {
    expect(isHoneypotTripped("https://spam.example")).toBe(true);
  });
});

describe("isTooFast", () => {
  it("flags submissions under the minimum", () => {
    expect(isTooFast(MIN_SUBMIT_MS - 1)).toBe(true);
  });

  it("allows submissions at the minimum", () => {
    expect(isTooFast(MIN_SUBMIT_MS)).toBe(false);
  });

  it("allows slow submissions", () => {
    expect(isTooFast(60_000)).toBe(false);
  });

  it("flags negative elapsed times", () => {
    expect(isTooFast(-5)).toBe(true);
  });

  it("flags non-finite elapsed times", () => {
    expect(isTooFast(Number.NaN)).toBe(true);
    expect(isTooFast(Number.POSITIVE_INFINITY)).toBe(true);
  });

  it("respects a custom minimum", () => {
    expect(isTooFast(500, 400)).toBe(false);
    expect(isTooFast(300, 400)).toBe(true);
  });
});

describe("buildContactPayload", () => {
  it("single-lines name and company, trims email and message", () => {
    const payload = buildContactPayload({
      fields: {
        name: "  Ada\nLovelace ",
        email: " ada@example.com ",
        company: " Analytical\tEngines ",
        message: "  line one\nline two  ",
      },
      token: "tok",
      website: "",
      elapsedMs: 5000,
    });
    expect(payload.name).toBe("Ada Lovelace");
    expect(payload.email).toBe("ada@example.com");
    expect(payload.company).toBe("Analytical Engines");
    expect(payload.message).toBe("line one\nline two");
  });

  it("passes token, website, and elapsedMs through unchanged", () => {
    const payload = buildContactPayload({
      fields: validFields,
      token: "tok",
      website: "hp",
      elapsedMs: 4200,
    });
    expect(payload.token).toBe("tok");
    expect(payload.website).toBe("hp");
    expect(payload.elapsedMs).toBe(4200);
  });
});

describe("parseContactPayload", () => {
  it("accepts a valid payload and returns it shaped", () => {
    const result = parseContactPayload({ ...validRaw, name: " Ada Lovelace " });
    expect(result).toEqual({
      ok: true,
      payload: { ...validRaw, name: "Ada Lovelace" },
    });
  });

  it("defaults missing company and website to empty strings", () => {
    const result = parseContactPayload({
      name: validRaw.name,
      email: validRaw.email,
      message: validRaw.message,
      token: validRaw.token,
      elapsedMs: validRaw.elapsedMs,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.company).toBe("");
      expect(result.payload.website).toBe("");
    }
  });

  it.each([null, "text", 42, []])(
    "rejects non-object input %p as malformed",
    (input) => {
      expect(parseContactPayload(input)).toEqual({
        ok: false,
        reason: "malformed",
      });
    },
  );

  it("rejects a missing message as malformed", () => {
    expect(
      parseContactPayload({
        name: validRaw.name,
        email: validRaw.email,
        token: validRaw.token,
        website: "",
        elapsedMs: validRaw.elapsedMs,
      }),
    ).toEqual({ ok: false, reason: "malformed" });
  });

  it("rejects a non-string name as malformed", () => {
    expect(parseContactPayload({ ...validRaw, name: 7 })).toEqual({
      ok: false,
      reason: "malformed",
    });
  });

  it("rejects a missing or empty token as malformed", () => {
    expect(parseContactPayload({ ...validRaw, token: undefined })).toEqual({
      ok: false,
      reason: "malformed",
    });
    expect(parseContactPayload({ ...validRaw, token: "" })).toEqual({
      ok: false,
      reason: "malformed",
    });
  });

  it("rejects a non-numeric elapsedMs as malformed", () => {
    expect(parseContactPayload({ ...validRaw, elapsedMs: "8000" })).toEqual({
      ok: false,
      reason: "malformed",
    });
    expect(parseContactPayload({ ...validRaw, elapsedMs: Number.NaN })).toEqual({
      ok: false,
      reason: "malformed",
    });
  });

  it("flags a filled honeypot", () => {
    expect(
      parseContactPayload({ ...validRaw, website: "https://spam.example" }),
    ).toEqual({ ok: false, reason: "honeypot" });
  });

  it("prefers the honeypot verdict over the time check", () => {
    expect(
      parseContactPayload({ ...validRaw, website: "spam", elapsedMs: 0 }),
    ).toEqual({ ok: false, reason: "honeypot" });
  });

  it("flags a too-fast submission", () => {
    expect(
      parseContactPayload({ ...validRaw, elapsedMs: MIN_SUBMIT_MS - 1 }),
    ).toEqual({ ok: false, reason: "too-fast" });
  });

  it("flags invalid field values", () => {
    expect(parseContactPayload({ ...validRaw, email: "nope" })).toEqual({
      ok: false,
      reason: "invalid",
    });
  });
});

describe("buildMailtoUrl", () => {
  it("targets the given address", () => {
    expect(
      buildMailtoUrl("inquiries@kcoh.ca", validFields).startsWith(
        "mailto:inquiries@kcoh.ca?subject=",
      ),
    ).toBe(true);
  });

  it("prefills the subject with the sender name", () => {
    const params = new URL(buildMailtoUrl("inquiries@kcoh.ca", validFields))
      .searchParams;
    expect(params.get("subject")).toBe("Website inquiry from Ada Lovelace");
  });

  it("prefills the body with message, company, and signature", () => {
    const body = new URL(buildMailtoUrl("inquiries@kcoh.ca", validFields))
      .searchParams.get("body");
    expect(body).toContain("We need a booking system that does not double-book.");
    expect(body).toContain("Company: Analytical Engines Ltd");
    expect(body).toContain("Ada Lovelace (ada@example.com)");
  });

  it("omits the company line when company is empty", () => {
    const body = new URL(
      buildMailtoUrl("inquiries@kcoh.ca", { ...validFields, company: "" }),
    ).searchParams.get("body");
    expect(body).not.toContain("Company:");
  });

  it("falls back to a generic subject when the name is empty", () => {
    const params = new URL(
      buildMailtoUrl("inquiries@kcoh.ca", { ...validFields, name: "" }),
    ).searchParams;
    expect(params.get("subject")).toBe("Website inquiry from the KCOH website");
  });
});
