import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/site/magnetic";
import { CAL_URL, CONTACT_EMAIL } from "@/content/nav";

export function CTASection({
  heading = "Let's talk about what you're building.",
  subline = "30-minute call. No pitch, no pressure. Just a conversation about your systems.",
}: {
  heading?: string;
  subline?: string;
}) {
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
            {heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg-muted">
            {subline}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Magnetic>
              <Button asChild size="lg" className="rounded-full">
                <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                  Book a Conversation
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
