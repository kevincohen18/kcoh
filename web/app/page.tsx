import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Testimonial } from "@/components/sections/testimonial";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Services } from "@/components/sections/services";
import { Founder } from "@/components/sections/founder";
import { Technologies } from "@/components/sections/technologies";
import { Faq } from "@/components/sections/faq";
import { CTASection } from "@/components/site/cta-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
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
