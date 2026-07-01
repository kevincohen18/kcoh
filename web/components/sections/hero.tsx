import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { DashboardImage } from "@/components/site/dashboard-image";
import { Reveal } from "@/components/site/reveal";
import { CAL_URL } from "@/content/nav";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[720px] rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
      />
      <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <SectionLabel>Software that runs businesses</SectionLabel>
          <h1 className="mt-5 font-serif text-[clamp(40px,5.4vw,74px)] font-medium leading-[1.04] tracking-[-0.015em] text-fg">
            We build and operate{" "}
            <em className="text-brand">the systems that scale real companies.</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-fg-muted">
            Automation, financial clarity, and operational leverage. Built by
            someone who scaled a 7-figure platform from the inside.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                Book a Conversation
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-transparent text-fg hover:bg-section-alt"
            >
              <a href="#work">See What We&apos;ve Built</a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 translate-y-6 scale-95 rounded-[24px] opacity-40 blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
          />
          <DashboardImage priority className="drop-shadow-2xl" />
        </Reveal>
      </Container>
    </section>
  );
}
