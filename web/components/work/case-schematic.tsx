"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import { ConcordiaConnectDiagram } from "@/components/diagram/concordia-connect-diagram";
import { DrafterieDiagram } from "@/components/diagram/drafterie-diagram";
import { SkyroaDiagram } from "@/components/diagram/skyroa-diagram";
import { AutoMedicDiagram } from "@/components/diagram/automedic-diagram";
import { useLocale, type Locale } from "@/lib/i18n/locale";
import type { CaseSlug } from "@/content/case-studies";

/* The architecture schematics are drawn on a fixed 1100×500 coordinate
   canvas. This wrapper scales that canvas to whatever width its column
   gives it, and localizes the diagram's prose chrome (the eyebrow and the
   client tag) so it reads correctly on /fr. Node names and REST/SQL/WSS
   labels are universal tech terms and stay as-is. */
const W = 1100;

type DiagramProps = { eyebrow?: string; client?: string; locale?: Locale };

// Each diagram sets its own canvas height to fit its distinct layout; mirror
// those here so the responsive wrapper reserves the exact aspect ratio — no
// bottom clipping on taller diagrams, no dead space under shorter ones.
const DIAGRAM_H: Record<CaseSlug, number> = {
  "concordia-connect": 520,
  drafterie: 540,
  skyroa: 500,
  automedic: 460,
};

const diagrams: Record<CaseSlug, ComponentType<DiagramProps>> = {
  "concordia-connect": ConcordiaConnectDiagram,
  drafterie: DrafterieDiagram,
  skyroa: SkyroaDiagram,
  automedic: AutoMedicDiagram,
};

const CLIENT_TAG: Record<CaseSlug, Record<"en" | "fr", string>> = {
  "concordia-connect": { en: "Concordia Connect", fr: "Concordia Connect" },
  drafterie: { en: "Legal · e-signature", fr: "Légal · signature électronique" },
  skyroa: { en: "Regulated escrow", fr: "Entiercement réglementé" },
  automedic: { en: "Mobile mechanic · Québec", fr: "Mécanicien mobile · Québec" },
};

export function CaseSchematic({
  slug,
  flip = false,
  zoom = false,
}: {
  slug: CaseSlug;
  flip?: boolean;
  zoom?: boolean;
}) {
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
  const H = DIAGRAM_H[slug];
  const eyebrow = locale === "fr" ? "ARCHITECTURE DU SYSTÈME" : "SYSTEM ARCHITECTURE";
  const client = CLIENT_TAG[slug][locale] ?? CLIENT_TAG[slug].en;

  // When `zoom` is set (the /work + homepage index rows), hovering the
  // schematic grows it to ~1.85x so the node labels become legible (at rest it
  // renders at ~0.6x to fit its column). It grows away from the page edge
  // (origin on the side the diagram sits) and lifts on a shadow above the
  // neighbouring rows (the row's article carries hover:z-30). Off by default:
  // the case-study detail page renders this full-width and must not zoom.
  return (
    <div ref={ref} className={cn("w-full", !zoom && "overflow-hidden")} style={{ aspectRatio: `${W} / ${H}` }}>
      <div
        className={cn(
          "relative h-full w-full",
          zoom &&
            "rounded-xl transition-all duration-300 ease-out will-change-transform hover:z-10 hover:scale-[1.85] hover:shadow-2xl motion-reduce:transition-none motion-reduce:hover:scale-100",
          zoom && (flip ? "origin-left" : "origin-right"),
        )}
      >
        <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <Diagram eyebrow={eyebrow} client={client} locale={locale} />
        </div>
      </div>
    </div>
  );
}
