import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(40px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.015em] text-fg">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              {intro}
            </p>
          ) : null}
        </Reveal>
        {children ? (
          <Reveal delay={0.1} className="mt-12">
            {children}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
