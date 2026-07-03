"use client";

import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { TechMarquee } from "@/components/site/tech-marquee";
import { technologiesCopy } from "@/content/technologies";
import { useLocale } from "@/lib/i18n/locale";

export function Technologies() {
  const { locale } = useLocale();
  const copy = technologiesCopy[locale];

  return (
    <section>
      <Container className="py-14 md:py-16">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            <SectionLabel className="shrink-0">{copy.label}</SectionLabel>
            <TechMarquee />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
