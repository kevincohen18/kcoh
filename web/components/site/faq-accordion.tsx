"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/content/faq";
import { useLocale } from "@/lib/i18n/locale";

export function FaqAccordion() {
  const { locale } = useLocale();
  const items = faqs[locale];

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((faq, i) => (
        <AccordionItem key={faq.q} value={`faq-${i}`}>
          <AccordionTrigger className="py-5 text-left text-base font-medium text-fg hover:no-underline">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl text-sm leading-relaxed text-fg-muted">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
