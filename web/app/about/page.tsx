import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { ScaledPreview } from "@/components/site/scaled-preview";
import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { DashboardScreen } from "@/components/dashboard/dashboard-screen";
import { founder } from "@/content/founder";
import { processSteps } from "@/content/process";
import {
  aboutIntro,
  founderStory,
  proofPoints,
  stepDetails,
  principles,
} from "@/content/about";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Kevin Cohen built and operated a 7-figure platform with 2,600+ members. KCOH Software Inc. applies that operator judgment to software systems that automate operations and add financial clarity.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Operator who builds systems under real constraints."
        intro={aboutIntro}
      />

      {/* Founder story */}
      <section className="border-t border-border bg-bg">
        <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionLabel>The Story</SectionLabel>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.1] tracking-[-0.015em] text-fg">
              {founder.quote.lead} {founder.quote.emphasis}
            </h2>
            <div className="mt-6 max-w-xl space-y-5">
              {founderStory.map((p) => (
                <p key={p} className="text-base leading-relaxed text-fg-muted">
                  {p}
                </p>
              ))}
            </div>
            <ul className="mt-10 space-y-4 border-t border-border pt-8">
              {proofPoints.map((pt) => (
                <li
                  key={pt.title}
                  className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <span className="w-44 shrink-0 text-sm font-semibold text-fg">
                    {pt.title}
                  </span>
                  <span className="text-sm leading-relaxed text-fg-muted">
                    {pt.body}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-[20px] border border-border bg-section">
              <Image
                src={founder.photo}
                alt={`${founder.name}, ${founder.role}`}
                fill
                sizes="360px"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-fg">
              {founder.name}
            </p>
            <p className="text-center text-sm text-fg-subtle">{founder.role}</p>
          </Reveal>
        </Container>
      </section>

      {/* How we work, expanded */}
      <section id="process" className="scroll-mt-24 border-t border-border bg-section">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
              The four steps, in full.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <ol className="space-y-9 lg:col-span-5">
              {processSteps.map((s, i) => (
                <li key={s.n}>
                  <Reveal delay={i * 0.06} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--brand),var(--highlight))] text-sm font-semibold text-white">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-fg">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                        {s.body}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-fg-subtle">
                        {stepDetails[s.n]}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-30 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, var(--brand), transparent)",
                  }}
                />
                <ScaledPreview designWidth={1160}>
                  <DashboardScreen />
                </ScaledPreview>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Operating principles */}
      <section className="border-t border-border bg-bg">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionLabel>Operating Principles</SectionLabel>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
              No surprises. No fluff.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <h3 className="text-base font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Work with an operator."
        subline="30-minute call. No pitch, no pressure. Just a conversation about your systems."
      />
    </>
  );
}
