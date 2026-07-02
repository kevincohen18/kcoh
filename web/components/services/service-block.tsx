"use client";

import { Check } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import type { ServiceDetail } from "@/content/service-details";
import { serviceDetailsCopy } from "@/content/service-details";
import { useLocale } from "@/lib/i18n/locale";

export function ServiceBlock({
  detail,
  index,
  visual,
}: {
  detail: ServiceDetail;
  index: number;
  visual?: React.ReactNode;
}) {
  const { locale } = useLocale();
  const copy = serviceDetailsCopy[locale];

  return (
    <div className="grid gap-10 border-t border-border py-14 first:border-t-0 first:pt-0 md:py-16 lg:grid-cols-12">
      <Reveal className={visual ? "lg:col-span-7" : "lg:col-span-8"}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-fg-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
          <SectionLabel>{detail.title}</SectionLabel>
        </div>
        <h2 className="mt-4 max-w-xl font-serif text-[clamp(26px,3vw,38px)] font-medium leading-[1.12] tracking-[-0.015em] text-fg">
          {detail.heading}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
          {detail.problem}
        </p>
        <h3 className="mt-7 text-xs font-medium uppercase tracking-[0.2em] text-fg-subtle">
          {copy.whatThisLooksLike}
        </h3>
        <ul className="mt-3 space-y-2.5">
          {detail.deliverables.map((d) => (
            <li
              key={d}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-muted"
            >
              <Check size={16} className="mt-0.5 shrink-0 text-brand" />
              {d}
            </li>
          ))}
        </ul>
      </Reveal>
      {visual ? (
        <Reveal delay={0.1} className="lg:col-span-5 lg:self-center">
          {visual}
        </Reveal>
      ) : null}
    </div>
  );
}
