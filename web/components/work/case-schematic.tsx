"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { ConcordiaConnectDiagram } from "@/components/diagram/concordia-connect-diagram";
import { DrafterieDiagram } from "@/components/diagram/drafterie-diagram";
import { SkyroaDiagram } from "@/components/diagram/skyroa-diagram";
import { AutoMedicDiagram } from "@/components/diagram/automedic-diagram";
import { useLocale } from "@/lib/i18n/locale";
import type { CaseSlug } from "@/content/case-studies";

/* The architecture schematics are drawn on a fixed 1100×500 coordinate
   canvas. This wrapper scales that canvas to whatever width its column
   gives it, and localizes the diagram's prose chrome (the eyebrow and the
   client tag) so it reads correctly on /fr. Node names and REST/SQL/WSS
   labels are universal tech terms and stay as-is. */
const W = 1100;
const H = 500;

type DiagramProps = { eyebrow?: string; client?: string };

const diagrams: Record<CaseSlug, ComponentType<DiagramProps>> = {
  "concordia-connect": ConcordiaConnectDiagram,
  drafterie: DrafterieDiagram,
  skyroa: SkyroaDiagram,
  automedic: AutoMedicDiagram,
};

const CLIENT_TAG: Record<CaseSlug, Record<"en" | "fr", string>> = {
  "concordia-connect": { en: "Concordia University", fr: "Université Concordia" },
  drafterie: { en: "Legal · e-signature", fr: "Légal · signature électronique" },
  skyroa: { en: "Regulated escrow", fr: "Entiercement réglementé" },
  automedic: { en: "Mobile mechanic · Québec", fr: "Mécanicien mobile · Québec" },
};

export function CaseSchematic({ slug }: { slug: CaseSlug }) {
  const { locale } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const Diagram = diagrams[slug];
  const eyebrow = locale === "fr" ? "ARCHITECTURE DU SYSTÈME" : "SYSTEM ARCHITECTURE";
  const client = CLIENT_TAG[slug][locale] ?? CLIENT_TAG[slug].en;

  return (
    <div ref={ref} className="w-full overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <Diagram eyebrow={eyebrow} client={client} />
      </div>
    </div>
  );
}
