"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { DashboardImage } from "@/components/site/dashboard-image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/site/magnetic";
import { Reveal } from "@/components/site/reveal";
import { Tilt } from "@/components/site/tilt";
import { CAL_URL } from "@/content/nav";
import { useT } from "@/content/i18n/messages";

export function Hero() {
  const t = useT();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[720px] rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
      />
      <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <SectionLabel>{t.hero.eyebrow}</SectionLabel>
          <h1 className="mt-5 font-serif text-[clamp(40px,5.4vw,74px)] font-medium leading-[1.04] tracking-[-0.015em] text-fg">
            {t.hero.headlineLead}{" "}
            <em className="text-brand">{t.hero.headlineEmphasis}</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-fg-muted">
            {t.hero.subhead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild size="lg" className="rounded-full">
                <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                  {t.hero.primaryCta}
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-border bg-transparent text-fg hover:bg-section-alt"
              >
                <a href="#work">{t.hero.secondaryCta}</a>
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 translate-y-6 scale-95 rounded-[24px] opacity-40 blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
          />
          <Tilt maxDeg={2}>
            <DashboardImage priority className="drop-shadow-2xl" />
          </Tilt>
          <div className="mt-4 flex justify-center">
            <Link
              href="/dashboard/"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-brand-text"
            >
              {t.hero.exploreDemo}
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
