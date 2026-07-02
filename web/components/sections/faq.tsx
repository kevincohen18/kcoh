"use client";

import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { faqCopy } from "@/content/faq";
import { useLocale } from "@/lib/i18n/locale";

export function Faq() {
  const { locale } = useLocale();
  const copy = faqCopy[locale];

  return (
    <section id="faq" className="scroll-mt-24 border-t border-border bg-section">
      <Container className="py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 className="mt-4 font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
              {copy.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <FaqAccordion />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
