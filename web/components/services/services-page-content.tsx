"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { LocaleLink } from "@/components/site/locale-link";
import { EngagementStrip } from "@/components/services/engagement-strip";
import { RevenueMiniChart } from "@/components/services/revenue-mini-chart";
import { ServiceBlock } from "@/components/services/service-block";
import { WorkflowFeed } from "@/components/services/workflow-feed";
import {
  serviceDetails,
  serviceDetailsCopy,
  type ServiceSlug,
} from "@/content/service-details";
import { useLocale } from "@/lib/i18n/locale";

/**
 * Client child of both `app/services/page.tsx` and `app/fr/services/page.tsx`
 * — the page files keep `export const metadata` (per-locale) and stay thin
 * server shells; all visible, locale-reactive copy lives here. See
 * PATTERN.md §"Making a component locale-reactive — checklist" step 5.
 */
export function ServicesPageContent() {
  const { locale } = useLocale();
  const details = serviceDetails[locale];
  const copy = serviceDetailsCopy[locale];
  // `key={locale}` remounts WorkflowFeed on a locale switch so its internal
  // simulated-run state resets to the new locale's steps (see the comment
  // in `workflow-feed.tsx` for why this is a remount, not a state effect).
  const visuals: Partial<Record<ServiceSlug, React.ReactNode>> = {
    automation: <WorkflowFeed key={locale} />,
    "financial-systems": <RevenueMiniChart />,
  };

  return (
    <>
      <PageHero
        eyebrow={copy.pageHero.eyebrow}
        title={copy.pageHero.title}
        intro={copy.pageHero.intro}
      />

      <section>
        <Container className="py-16 md:py-20">
          {details.map((detail, i) => (
            <ServiceBlock
              key={detail.slug}
              detail={detail}
              index={i}
              visual={visuals[detail.slug]}
            />
          ))}
          <div className="mt-4 flex justify-center">
            <LocaleLink
              href="/dashboard/"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-brand-text"
            >
              {copy.exploreDemo}
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </LocaleLink>
          </div>
        </Container>
      </section>

      <EngagementStrip />
      <CTASection />
    </>
  );
}
