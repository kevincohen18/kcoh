import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { engagementSteps, pricingNote } from "@/content/engagement";

export function EngagementStrip() {
  return (
    <section id="engagements" className="scroll-mt-24 border-t border-border bg-section">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionLabel>How Engagements Work</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
            From first call to running system.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {engagementSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <span className="grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,var(--brand),var(--highlight))] text-sm font-semibold text-white">
                {s.n}
              </span>
              <h3 className="mt-4 text-base font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-fg-subtle">
                {s.meta}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 max-w-2xl border-t border-border pt-6 text-sm leading-relaxed text-fg-muted">
            {pricingNote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
