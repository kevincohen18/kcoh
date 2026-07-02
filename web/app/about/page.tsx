import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AboutContent } from "@/components/about/about-content";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Kevin Cohen built and operated a 7-figure platform with 2,600+ members. KCOH Software Inc. applies that operator judgment to software systems that automate operations and add financial clarity.",
  path: "/about/",
});

export default function AboutPage() {
  return <AboutContent />;
}
