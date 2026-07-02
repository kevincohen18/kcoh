"use client";

import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_EMAIL } from "@/content/nav";
import {
  buildContactPayload,
  buildMailtoUrl,
  validateFields,
  type ContactFields,
  type FieldErrors,
} from "@/lib/contact-validation";

// Cloudflare Turnstile public TEST site key (always passes, shows the widget).
// Swap at launch by setting NEXT_PUBLIC_TURNSTILE_SITE_KEY at build time.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

const EMPTY_FIELDS: ContactFields = {
  name: "",
  email: "",
  company: "",
  message: "",
};

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [token, setToken] = useState("");
  const [website, setWebsite] = useState("");
  // Lazy initializer: Date.now() runs once at mount, not on every render
  // (react-hooks/purity forbids calling impure functions directly in render).
  const [startTime] = useState(() => Date.now());
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const { resolvedTheme } = useTheme();

  function update(key: keyof ContactFields) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
    };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fieldErrors = validateFields(fields);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    setStatus("sending");
    const payload = buildContactPayload({
      fields,
      token,
      website,
      elapsedMs: Date.now() - startTime,
    });

    let sent = false;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
      } | null;
      sent = res.ok && data?.ok === true;
    } catch {
      sent = false;
    }

    // Turnstile tokens are single-use: reset the widget after every attempt.
    turnstileRef.current?.reset();
    setToken("");
    setStatus(sent ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-[18px] border border-border bg-card p-8"
      >
        <h3 className="font-serif text-2xl font-medium tracking-[-0.01em] text-fg">
          Message sent.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">
          It landed in the right inbox. Average reply: under 24h.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-[18px] border border-border bg-card p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="text-xs text-neg">
              {errors.name}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="text-xs text-neg">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        <Label htmlFor="contact-company">
          Company <span className="font-normal text-fg-subtle">(optional)</span>
        </Label>
        <Input
          id="contact-company"
          name="company"
          autoComplete="organization"
          value={fields.company}
          onChange={update("company")}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "contact-company-error" : undefined}
        />
        {errors.company && (
          <p id="contact-company-error" className="text-xs text-neg">
            {errors.company}
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          value={fields.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs text-neg">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: invisible to humans, skipped by keyboard, read by bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="mt-6">
        <Turnstile
          ref={turnstileRef}
          key={resolvedTheme}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={setToken}
          onExpire={() => setToken("")}
          onError={() => setToken("")}
          options={{ theme: resolvedTheme === "light" ? "light" : "dark" }}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          size="lg"
          className="rounded-full"
          disabled={status === "sending" || token === ""}
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        {status === "error" && (
          <p role="alert" className="text-sm text-neg">
            Something went wrong.{" "}
            <a
              href={buildMailtoUrl(CONTACT_EMAIL, fields)}
              className="font-medium underline underline-offset-4"
            >
              Email us directly
            </a>
            ; your message is pre-filled.
          </p>
        )}
      </div>
    </form>
  );
}
