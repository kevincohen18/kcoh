import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactPageContent } from "./contact-page-content";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Book a 30-minute conversation or write to us directly. Average reply: under 24h.",
  path: "/contact/",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
