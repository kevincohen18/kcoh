"use client";

import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/site/magnetic";
import { CAL_URL, CONTACT_EMAIL } from "@/content/nav";
import { useT } from "@/content/i18n/messages";

export function CTASection({
  heading,
  subline,
}: {
  heading?: string;
  subline?: string;
}) {
  const t = useT();
  const resolvedHeading = heading ?? t.cta.heading;
  const resolvedSubline = subline ?? t.cta.subline;

  return (
    <section className="relative overflow-hidden border-t border-border bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />
      <Container className="py-24 md:py-32">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="font-serif text-[clamp(34px,4.4vw,56px)] font-medium leading-[1.06] tracking-[-0.015em] text-fg">
            {resolvedHeading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg-muted">
            {resolvedSubline}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Magnetic>
              <Button asChild size="lg" className="rounded-full">
                <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                  {t.cta.bookCall}
                </a>
              </Button>
            </Magnetic>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
