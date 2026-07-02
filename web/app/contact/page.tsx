import type { Metadata } from "next";
import { Clock, Mail } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { CalEmbed } from "@/components/contact/cal-embed";
import { ContactForm } from "@/components/contact/contact-form";
import { CAL_URL, CONTACT_EMAIL, LINKEDIN_URL } from "@/content/nav";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 30-minute conversation or write to us directly. Average reply: under 24h.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what you're building."
        intro="30-minute call. No pitch, no pressure. Just a conversation about your systems."
      />

      <section className="border-t border-border bg-bg">
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col">
                <h2 className="font-serif text-[26px] font-medium leading-[1.15] tracking-[-0.01em] text-fg">
                  Book a conversation
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  A 30-minute consultation, scheduled directly.
                </p>
                <div className="mt-6 flex-1">
                  <CalEmbed />
                </div>
                <p className="mt-3 text-sm text-fg-muted">
                  Prefer a direct link?{" "}
                  <a
                    href={CAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-text underline-offset-4 hover:underline"
                  >
                    Open the calendar on Cal.com
                  </a>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex h-full flex-col">
                <h2 className="font-serif text-[26px] font-medium leading-[1.15] tracking-[-0.01em] text-fg">
                  Or write to us
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  A few lines about what you&apos;re building is plenty.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-center gap-3"
            >
              <Mail size={16} className="text-brand" />
              <span className="text-sm text-fg-muted transition-colors group-hover:text-fg">
                {CONTACT_EMAIL}
              </span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3"
            >
              <span
                aria-hidden
                className="grid size-4 place-items-center rounded-[3px] bg-brand/15 text-[9px] font-semibold text-brand"
              >
                in
              </span>
              <span className="text-sm text-fg-muted transition-colors group-hover:text-fg">
                LinkedIn
              </span>
            </a>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-brand" />
              <span className="text-sm text-fg-muted">
                Average reply: under 24h
              </span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
