"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/site/locale-link";
import { DashboardDemoLoader } from "@/components/dashboard/demo/dashboard-demo-loader";
import { demoCopy } from "@/content/demo-copy";
import { useLocale } from "@/lib/i18n/locale";

/** Client boundary for the localized demo page framing (heading, intro,
 *  CTA). `app/dashboard/page.tsx` stays a server component (keeps its
 *  English `metadata` export) and just renders this. The demo widgets
 *  rendered by `DashboardDemoLoader` are illustrative mock product UI and
 *  stay English — see `web/lib/i18n/PATTERN.md` step 5. */
export function DashboardPageContent() {
  const { locale } = useLocale();
  const copy = demoCopy[locale];

  return (
    <>
      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        intro={copy.hero.intro}
      />
      <Container className="pb-20 md:pb-28">
        <DashboardDemoLoader />
        <p className="mt-3 text-center text-xs text-fg-subtle">
          {copy.simulatedNote}
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-md text-fg-muted">{copy.ctaText}</p>
          <Button asChild size="lg" className="rounded-full">
            <LocaleLink href="/contact/">
              {copy.ctaButton}
              <ArrowRight size={16} />
            </LocaleLink>
          </Button>
        </div>
      </Container>
    </>
  );
}
