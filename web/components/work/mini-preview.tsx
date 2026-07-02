"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectTheme } from "@/components/site/project-theme";
import { AreaChart } from "@/components/dashboard/charts/area-chart";
import { Sparkline } from "@/components/dashboard/charts/sparkline";
import { DonutGauge } from "@/components/dashboard/charts/donut-gauge";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { tickSeries } from "@/lib/charts/tick";
import type { CaseSlug } from "@/content/case-studies";

/**
 * Per-project accent hexes. All four match web/content/projects.ts —
 * burgundy and violet are the products' real brand colors; indigo
 * (#4f46e5) and green (#16a34a) are the design-system values already
 * used for Skyroa and AutoMedic across the dashboard.
 */
const accents: Record<CaseSlug, string> = {
  "concordia-connect": "#8b1d3f",
  drafterie: "#6e63ff",
  skyroa: "#4f46e5",
  automedic: "#16a34a",
};

/** Sample UI series (dashboard sample-data convention, not claims). */
const baseSeries: Record<CaseSlug, number[]> = {
  "concordia-connect": [14, 18, 16, 22, 20, 26, 24, 30, 28, 34, 31, 38],
  drafterie: [4, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16],
  skyroa: [20, 24, 22, 28, 26, 32, 30, 36, 33, 40, 38, 44],
  automedic: [3, 5, 4, 7, 6, 8, 7, 10, 9, 12, 11, 13],
};

type CompositionProps = { series: number[]; active: boolean };

function Tile({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-card p-3", className)}
    >
      <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
        {title}
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function StatusRow({
  label,
  status,
  tint,
}: {
  label: string;
  status: string;
  tint: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-1 text-[11px]">
      <span className="truncate text-fg-muted">{label}</span>
      <span
        className={cn(
          "shrink-0 font-medium transition-colors duration-300",
          tint,
        )}
      >
        {status}
      </span>
    </div>
  );
}

function ConcordiaPreview({ series, active }: CompositionProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      <Tile title="Messages this week" className="col-span-3">
        <div className="text-lg font-semibold tabular-nums text-fg">1,284</div>
        <AreaChart data={series} className="mt-1 h-16 w-full" />
      </Tile>
      <Tile title="Community" className="col-span-2">
        <div className="text-lg font-semibold tabular-nums text-fg">
          {active ? "148" : "132"}
        </div>
        <div className="text-[10px] text-pos">online now</div>
        <div className="mt-2">
          <StatusRow label="New members" status="+12 today" tint="text-brand-text" />
          <StatusRow label="Group chats" status="46 active" tint="text-fg" />
        </div>
      </Tile>
    </div>
  );
}

function DrafteriePreview({ active }: CompositionProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      <Tile title="Signature pipeline" className="col-span-3">
        <StatusRow label="Consulting agreement" status="Signed" tint="text-pos" />
        <StatusRow
          label="Mutual NDA"
          status={active ? "Signed" : "Viewed"}
          tint={active ? "text-pos" : "text-warn"}
        />
        <StatusRow label="Service contract" status="Sent" tint="text-brand-text" />
        <StatusRow
          label="Freelance retainer"
          status="Drafted"
          tint="text-fg-subtle"
        />
      </Tile>
      <Tile title="Signed this month" className="col-span-2">
        <DonutGauge pct={active ? 0.86 : 0.82} size={64} stroke={8}>
          <span className="text-[11px] font-semibold tabular-nums text-fg">
            {active ? "86%" : "82%"}
          </span>
        </DonutGauge>
        <div className="mt-2 text-[10px] text-fg-subtle">8 contract types</div>
      </Tile>
    </div>
  );
}

function SkyroaPreview({ series, active }: CompositionProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      <Tile title="Trade flow" className="col-span-3">
        <StatusRow
          label="TX-4821 · KYC verified"
          status="Cleared"
          tint="text-pos"
        />
        <StatusRow
          label="TX-4822 · Funds held"
          status={active ? "Released" : "In escrow"}
          tint={active ? "text-pos" : "text-warn"}
        />
        <StatusRow
          label="TX-4823 · Dispute open"
          status="Reviewing"
          tint="text-brand-text"
        />
        <StatusRow
          label="TX-4824 · Buyer funded"
          status="KYC check"
          tint="text-fg-subtle"
        />
      </Tile>
      <Tile title="Escrow volume" className="col-span-2">
        <div className="text-lg font-semibold tabular-nums text-fg">
          $46,120
        </div>
        <Sparkline data={series} className="mt-1 h-9 w-full" />
        <div className="mt-1 text-[10px] text-fg-subtle">FINTRAC-aligned</div>
      </Tile>
    </div>
  );
}

function AutoMedicPreview({ series, active }: CompositionProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      <Tile title="Booking queue" className="col-span-3">
        <StatusRow
          label="9:30 · Brake inspection"
          status="Confirmed"
          tint="text-pos"
        />
        <StatusRow
          label="11:00 · Oil change"
          status={active ? "Confirmed" : "Pending"}
          tint={active ? "text-pos" : "text-warn"}
        />
        <StatusRow
          label="13:30 · Diagnostic"
          status="Confirmed"
          tint="text-pos"
        />
        <StatusRow
          label="15:00 · Battery swap"
          status="SMS sent"
          tint="text-brand-text"
        />
      </Tile>
      <Tile title="Bookings this week" className="col-span-2">
        <div className="text-lg font-semibold tabular-nums text-fg">42</div>
        <Sparkline data={series} className="mt-1 h-9 w-full" />
        <div className="mt-1 text-[10px] text-fg-subtle">No double-books</div>
      </Tile>
    </div>
  );
}

const compositions: Record<CaseSlug, React.ComponentType<CompositionProps>> = {
  "concordia-connect": ConcordiaPreview,
  drafterie: DrafteriePreview,
  skyroa: SkyroaPreview,
  automedic: AutoMedicPreview,
};

/**
 * Small live dashboard composition for one project, re-skinned in its
 * brand palette via ProjectTheme. Decorative (aria-hidden). While a mouse
 * hovers it — or any ancestor marked data-preview-group — the chart
 * series ticks and one status flips; both are disabled under
 * prefers-reduced-motion and on touch.
 */
export function ProjectMiniPreview({ slug }: { slug: CaseSlug }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const seedRef = useRef(1);
  const base = baseSeries[slug];
  const [series, setSeries] = useState(base);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const target =
      (el.closest("[data-preview-group]") as HTMLElement | null) ?? el;
    const on = (e: PointerEvent) => {
      if (e.pointerType === "mouse") setActive(true);
    };
    const off = () => setActive(false);
    target.addEventListener("pointerenter", on);
    target.addEventListener("pointerleave", off);
    return () => {
      target.removeEventListener("pointerenter", on);
      target.removeEventListener("pointerleave", off);
    };
  }, []);

  // Ticking is a subscription to the interval "external system"; the reset
  // back to `base` on deactivation is not stored in state at all (see the
  // derived `displaySeries` below) so this effect never calls setState
  // synchronously with a value already computable at render time
  // (react-hooks/set-state-in-effect).
  useEffect(() => {
    if (!active || reduced) {
      return;
    }
    setSeries(tickSeries(base, seedRef.current++));
    const id = setInterval(() => {
      setSeries((s) => tickSeries(s, seedRef.current++));
    }, 700);
    return () => clearInterval(id);
  }, [active, reduced, base]);

  const Composition = compositions[slug];
  const isTicking = active && !reduced;
  const displaySeries = isTicking ? series : base;

  return (
    <ProjectTheme accent={accents[slug]}>
      <div
        ref={rootRef}
        aria-hidden
        className="select-none overflow-hidden rounded-xl border border-border bg-section p-3"
      >
        <Composition series={displaySeries} active={isTicking} />
      </div>
    </ProjectTheme>
  );
}
