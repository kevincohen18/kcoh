import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { altLanguages } from "@/lib/i18n/alternates";
import { ContactPageContent } from "./contact-page-content";

const contactMetadata = pageMetadata({
  title: "Contact",
  description:
    "Book a 30-minute conversation or write to us directly. Average reply: under 24h.",
  path: "/contact/",
});

export const metadata: Metadata = {
  ...contactMetadata,
  alternates: {
    ...contactMetadata.alternates,
    languages: altLanguages("/contact/"),
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
