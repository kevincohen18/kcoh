import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { QuietProof } from "@/components/sections/quiet-proof";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Testimonial } from "@/components/sections/testimonial";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Services } from "@/components/sections/services";
import { Founder } from "@/components/sections/founder";
import { Technologies } from "@/components/sections/technologies";
import { Faq } from "@/components/sections/faq";
import { CTASection } from "@/components/site/cta-section";
import { altLanguages } from "@/lib/i18n/alternates";

// Mirrors app/page.tsx — same section components, which already derive
// locale="fr" from the `/fr` path via useLocale()/usePathname(). Title and
// description reuse the existing French hero copy from
// content/i18n/messages.ts (see PATTERN.md's "Voice" section: brand names
// stay untranslated).
export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s · KCOH Software Inc." template so
  // the homepage title isn't doubled (matches the English homepage, which uses
  // the layout's bare `default` title).
  title: { absolute: "KCOH Software Inc." },
  description:
    "Nous concevons et exploitons les systèmes qui font croître de vraies entreprises. Automatisation, clarté financière et effet de levier opérationnel.",
  alternates: { canonical: "/fr/", languages: altLanguages("/") },
};

export default function HomeFr() {
  return (
    <>
      <Hero />
      <QuietProof />
      <FeaturedWork />
      <Testimonial />
      <HowWeWork />
      <Services />
      <Founder />
      <Technologies />
      <Faq />
      <CTASection />
    </>
  );
}
