"use client";

import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { proofPoints } from "@/content/proof";
import { useLocale } from "@/lib/i18n/locale";
import { useT } from "@/content/i18n/messages";

export function QuietProof() {
  const { locale } = useLocale();
  const t = useT();
  const points = proofPoints[locale];

  return (
    <section className="relative overflow-hidden">
      {/* Soft lavender wash that continues the hero — no hard divider. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--bg) 0%, color-mix(in srgb, var(--brand) 7%, var(--bg)) 48%, var(--bg) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.1] blur-[130px]"
        style={{
          background: "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />

      <Container className="py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-[-0.01em] text-fg">
              {t.proof.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
              {t.proof.body}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:gap-5 lg:grid-cols-4">
          {points.map((point, i) => (
            <Reveal key={i} delay={0.08 + i * 0.07}>
              <div className="proof-card group h-full rounded-2xl p-6 backdrop-blur-xl">
                <div className="font-serif text-2xl leading-none tracking-tight text-fg">
                  {point.value}
                </div>
                <div className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-fg-subtle">
                  {point.label}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                  {point.context}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
