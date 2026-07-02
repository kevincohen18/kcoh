"use client";

import { Clock, Mail } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { CalEmbed } from "@/components/contact/cal-embed";
import { ContactForm } from "@/components/contact/contact-form";
import { CAL_URL, CONTACT_EMAIL, LINKEDIN_URL } from "@/content/nav";
import { contactPageCopy } from "@/content/contact";
import { useLocale } from "@/lib/i18n/locale";

/** Client boundary for the localized contact page body. `app/contact/page.tsx`
 *  stays a server component (keeps its English `metadata` export) and just
 *  renders this. See `web/lib/i18n/PATTERN.md` step 5. */
export function ContactPageContent() {
  const { locale } = useLocale();
  const copy = contactPageCopy[locale];

  return (
    <>
      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        intro={copy.hero.intro}
      />

      <section className="border-t border-border bg-bg">
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col">
                <h2 className="font-serif text-[26px] font-medium leading-[1.15] tracking-[-0.01em] text-fg">
                  {copy.book.heading}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {copy.book.subline}
                </p>
                <div className="mt-6 flex-1">
                  <CalEmbed />
                </div>
                <p className="mt-3 text-sm text-fg-muted">
                  {copy.book.calLinkPrefix}{" "}
                  <a
                    href={CAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-text underline-offset-4 hover:underline"
                  >
                    {copy.book.calLinkText}
                  </a>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex h-full flex-col">
                <h2 className="font-serif text-[26px] font-medium leading-[1.15] tracking-[-0.01em] text-fg">
                  {copy.write.heading}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {copy.write.subline}
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
                {copy.directLines.linkedinLabel}
              </span>
            </a>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-brand" />
              <span className="text-sm text-fg-muted">
                {copy.directLines.responseTime}
              </span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
