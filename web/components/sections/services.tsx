"use client";

import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { CAL_URL } from "@/content/nav";
import { services, servicesCopy } from "@/content/services";
import { useLocale } from "@/lib/i18n/locale";

export function Services() {
  const { locale } = useLocale();
  const items = services[locale];
  const copy = servicesCopy[locale];

  return (
    <section id="services" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionLabel>{copy.eyebrow}</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
            {copy.heading}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((s, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="flex items-center gap-2.5">
                    <s.icon size={18} className="text-brand" />
                    <h3 className="text-sm font-semibold text-fg">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.blurb}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[20px] border border-border bg-gradient-to-b from-brand/12 to-card p-8 text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
              />
              <h3 className="font-serif text-[26px] font-medium leading-[1.15] tracking-[-0.01em] text-fg">
                {copy.ctaHeadingLine1}
                <br />
                {copy.ctaHeadingLine2}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                {copy.ctaBody}
              </p>
              <Button asChild size="lg" className="mt-6 rounded-full">
                <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                  {copy.ctaButton}
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
