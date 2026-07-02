"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { ConcordiaConnectDiagram } from "@/components/diagram/concordia-connect-diagram";
import { DrafterieDiagram } from "@/components/diagram/drafterie-diagram";
import { SkyroaDiagram } from "@/components/diagram/skyroa-diagram";
import { AutoMedicDiagram } from "@/components/diagram/automedic-diagram";
import type { CaseSlug } from "@/content/case-studies";

/* The architecture schematics are drawn on a fixed 1100×500 coordinate
   canvas. This wrapper scales that canvas to whatever width its column
   gives it (full-bleed on the detail page, smaller in teaser columns),
   preserving aspect ratio so there is no layout shift. */
const W = 1100;
const H = 500;

const diagrams: Record<CaseSlug, ComponentType> = {
  "concordia-connect": ConcordiaConnectDiagram,
  drafterie: DrafterieDiagram,
  skyroa: SkyroaDiagram,
  automedic: AutoMedicDiagram,
};

export function CaseSchematic({ slug }: { slug: CaseSlug }) {
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

  return (
    <div ref={ref} className="w-full overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <Diagram />
      </div>
    </div>
  );
}
