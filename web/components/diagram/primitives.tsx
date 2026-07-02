import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowRight, ArrowLeftRight } from "lucide-react";
import { rgba } from "./palette";

/* ------------------------------------------------------------------ *
 * Number badge — the small circled index on each layer panel.
 * ------------------------------------------------------------------ */
export function NumberBadge({ n, color }: { n: number; color: string }) {
  return (
    <span
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[12px] font-bold"
      style={{
        color,
        border: `1.5px solid ${rgba(color, 0.9)}`,
        boxShadow: `0 0 12px -1px ${rgba(color, 0.9)}, inset 0 0 8px -4px ${rgba(color, 0.9)}`,
        textShadow: `0 0 10px ${rgba(color, 0.9)}`,
      }}
    >
      {n}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Panel — a neon-bordered layer container. Positioned by the caller
 * via `style` (absolute left/top/width/height on the diagram canvas).
 * ------------------------------------------------------------------ */
export function Panel({
  n,
  title,
  color,
  style,
  className,
  children,
}: {
  n?: number;
  title: string;
  color: string;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`absolute flex flex-col rounded-2xl p-3 ${className ?? ""}`}
      style={{
        border: `1.5px solid ${rgba(color, 0.85)}`,
        background: "rgba(6,7,11,0.5)",
        boxShadow: `0 0 32px -6px ${rgba(color, 0.6)}, 0 0 1px ${rgba(color, 0.9)}, inset 0 0 44px -26px ${rgba(color, 1)}`,
        ...style,
      }}
    >
      <header className="mb-2.5 flex items-center gap-2 px-1">
        {n != null && <NumberBadge n={n} color={color} />}
        <h3
          className="text-[15px] font-extrabold uppercase tracking-wide"
          style={{ color, textShadow: `0 0 18px ${rgba(color, 0.85)}` }}
        >
          {title}
        </h3>
      </header>
      <div className="flex min-h-0 flex-1">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * NodeCard — a single service / component tile with icon + label.
 * `row` = icon left of label; `col` = icon stacked above centered label.
 * ------------------------------------------------------------------ */
export function NodeCard({
  icon: Icon,
  label,
  sub,
  color,
  orientation = "row",
}: {
  icon: LucideIcon;
  label: string;
  sub?: string;
  color: string;
  orientation?: "row" | "col";
}) {
  const col = orientation === "col";
  return (
    <div
      className={`flex h-full w-full rounded-xl ${
        col
          ? "flex-col items-center justify-center gap-1.5 px-2 py-1.5 text-center"
          : "flex-row items-center gap-3 px-3 py-2.5"
      }`}
      style={{
        border: `1.2px solid ${rgba(color, 0.72)}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.006))",
        boxShadow: `0 0 22px -10px ${rgba(color, 1)}, inset 0 0 26px -22px ${rgba(color, 0.9)}`,
      }}
    >
      <span
        className="grid shrink-0 place-items-center rounded-lg"
        style={{
          color,
          height: col ? 37 : 34,
          width: col ? 37 : 34,
          border: `1px solid ${rgba(color, 0.5)}`,
          background: rgba(color, 0.1),
          boxShadow: `inset 0 0 16px -6px ${rgba(color, 1)}, 0 0 12px -6px ${rgba(color, 0.7)}`,
          filter: `drop-shadow(0 0 5px ${rgba(color, 0.55)})`,
        }}
      >
        <Icon size={col ? 20 : 19} strokeWidth={1.9} />
      </span>
      <div className={col ? "" : "min-w-0"}>
        <div className="text-[12.5px] font-semibold leading-tight text-white/95">
          {label}
        </div>
        {sub && (
          <div className="mt-0.5 text-[10.5px] leading-snug text-white/45">{sub}</div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Intra-panel flow arrows — placed between sibling NodeCards.
 * ------------------------------------------------------------------ */
export function VArrow() {
  return (
    <div className="flex shrink-0 justify-center py-[3px]">
      <ArrowDown size={16} className="text-white/40" strokeWidth={2} />
    </div>
  );
}

export function HArrow({ both = false }: { both?: boolean }) {
  return (
    <div className="flex shrink-0 items-center px-[3px]">
      {both ? (
        <ArrowLeftRight size={16} className="text-white/40" strokeWidth={2} />
      ) : (
        <ArrowRight size={16} className="text-white/40" strokeWidth={2} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Legend — flow-type key + category color key.
 * ------------------------------------------------------------------ */
function FlowSample({ dashed }: { dashed?: boolean }) {
  return (
    <svg width="38" height="10" viewBox="0 0 38 10" className="shrink-0">
      <line
        x1="0"
        y1="5"
        x2="29"
        y2="5"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="1.5"
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      <path d="M29,1.5 L36,5 L29,8.5 Z" fill="rgba(255,255,255,0.85)" />
    </svg>
  );
}

export function Legend({
  style,
  items,
}: {
  style?: CSSProperties;
  items: { label: string; color: string }[];
}) {
  return (
    <section
      className="absolute flex flex-col rounded-2xl p-4"
      style={{
        border: "1.5px solid rgba(255,255,255,0.16)",
        background: "rgba(6,7,11,0.6)",
        boxShadow: "0 0 24px -12px rgba(255,255,255,0.3)",
        ...style,
      }}
    >
      <h3 className="mb-3 text-center text-[13px] font-extrabold uppercase tracking-[0.2em] text-white/90">
        Legend
      </h3>
      <div className="mb-3 space-y-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-3 text-[11.5px] text-white/75">
          <FlowSample />
          Synchronous Flow
        </div>
        <div className="flex items-center gap-3 text-[11.5px] text-white/75">
          <FlowSample dashed />
          Asynchronous Flow
        </div>
      </div>
      <div className="space-y-[7px]">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3 text-[11.5px]">
            <span
              className="h-[3px] w-7 shrink-0 rounded-full"
              style={{ background: it.color, boxShadow: `0 0 8px ${it.color}` }}
            />
            <span style={{ color: it.color }}>{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
