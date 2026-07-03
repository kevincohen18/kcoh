import type { CSSProperties, ReactNode } from "react";
import type { IconType } from "react-icons";

/* ------------------------------------------------------------------ *
 * Schematic kit — shared primitives for the case-study architecture
 * diagrams. Restrained by design: white canvas, hairline right-angle
 * connectors, ONE accent for the primary request path, monospace
 * technical labels, real brand marks kept monochrome.
 * ------------------------------------------------------------------ */

export const INK = "var(--fg)";
export const MUT = "var(--fg-muted)";
export const HAIR = "var(--border)";
export const LINE = "var(--diagram-line)";
export const VIOLET = "#6e63ff";
export const CHIP_BG = "var(--accent)";

export function withAlpha(hex: string, a: number) {
  const h = hex.replace("#", "");
  return `rgba(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}, ${a})`;
}

/* Icon helpers — `si` for brand marks (Simple Icons), `fa` for the
   filled neutral marks on category nodes. Kept monochrome; the primary
   node's mark is the one exception (accent-colored). */
export const si = (Comp: IconType, primary = false) => (
  <Comp size={16} style={{ color: primary ? VIOLET : INK, opacity: primary ? 1 : 0.74 }} />
);
export const fa = (Comp: IconType) => <Comp size={13} style={{ color: INK, opacity: 0.62 }} />;

export function Node({ icon, name, caption, style }: { icon: ReactNode; name: string; caption: string; style?: CSSProperties }) {
  // Treat the caller's height as a MINIMUM, not a hard height, so a longer
  // French caption grows the box downward instead of spilling past its border.
  // Edges anchor to the declared height's center, which stays inside the box.
  const { height, ...rest } = style ?? {};
  return (
    <div className="absolute rounded-lg" style={{ background: "var(--card)", border: `1px solid ${HAIR}`, boxShadow: "0 1px 2px rgba(16,18,29,0.05)", padding: "13px 15px", minHeight: height, ...rest }}>
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="font-mono" style={{ fontSize: 13, color: INK, fontWeight: 500, letterSpacing: "-0.01em" }}>{name}</span>
      </div>
      <p className="font-sans" style={{ fontSize: 11.5, color: MUT, lineHeight: 1.4, marginTop: 6 }}>{caption}</p>
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono" style={{ fontSize: 9.5, color: MUT, background: CHIP_BG, border: `1px solid ${HAIR}`, borderRadius: 4, padding: "2px 6px", letterSpacing: "0.01em" }}>
      {children}
    </span>
  );
}

/* The emphasized primary node: a violet-tinted container with a header,
   caption, and a row of resource/module chips filling the body. */
export function ContainerNode({ icon, name, caption, chips, accent = VIOLET, style }: { icon: ReactNode; name: string; caption: string; chips: string[]; accent?: string; style?: CSSProperties }) {
  return (
    <div className="absolute rounded-lg" style={{ background: `linear-gradient(${withAlpha(accent, 0.035)}, ${withAlpha(accent, 0.035)}), var(--card)`, border: `1px solid ${withAlpha(accent, 0.5)}`, boxShadow: "0 1px 2px rgba(16,18,29,0.05)", padding: "14px 16px", display: "flex", flexDirection: "column", ...style }}>
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="font-mono" style={{ fontSize: 13.5, color: INK, fontWeight: 500, letterSpacing: "-0.01em" }}>{name}</span>
      </div>
      <p className="font-sans" style={{ fontSize: 11.5, color: MUT, marginTop: 6 }}>{caption}</p>
      <div style={{ marginTop: "auto", borderTop: `1px solid ${withAlpha(accent, 0.18)}`, paddingTop: 11, display: "flex", flexWrap: "wrap", gap: 6 }}>
        {chips.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>
    </div>
  );
}

/* A small labelled pill sitting on a connector (REST / WSS / SQL …). */
export function CLabel({ x, y, children, accent = false }: { x: number; y: number; children: ReactNode; accent?: boolean }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 font-mono" style={{ left: x, top: y, fontSize: 10, letterSpacing: "0.03em", color: accent ? VIOLET : MUT, background: "var(--card)", padding: "1px 6px", border: `1px solid ${HAIR}`, borderRadius: 4, zIndex: 3 }}>
      {children}
    </div>
  );
}

export type EdgeSpec = { d: string; accent?: boolean; dashed?: boolean; arrow?: boolean };

function Edge({ d, accent = false, dashed = false, arrow = true }: EdgeSpec) {
  return (
    <path
      d={d}
      fill="none"
      stroke={accent ? VIOLET : LINE}
      strokeWidth={accent ? 1.4 : 1.3}
      strokeDasharray={dashed ? "4 4" : undefined}
      markerEnd={arrow ? (accent ? "url(#p-ah-v)" : "url(#p-ah)") : undefined}
    />
  );
}

/* The canvas: fixed coordinate space, header eyebrow + client tag, and
   the connector overlay built from `edges`. Nodes/labels are passed as
   absolutely-positioned children. */
export function SchematicCanvas({ client, clientColor = VIOLET, eyebrow = "SYSTEM ARCHITECTURE", w, h, edges = [], children }: { client: string; clientColor?: string; eyebrow?: string; w: number; h: number; edges?: EdgeSpec[]; children: ReactNode }) {
  return (
    <div id="system-canvas" className="relative overflow-hidden rounded-xl" style={{ width: w, height: h, background: "var(--section)", border: `1px solid ${HAIR}` }}>
      <div className="absolute left-7 right-7 top-6 flex items-baseline justify-between">
        <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: MUT }}>{eyebrow}</span>
        <span className="flex items-center gap-2 font-mono" style={{ fontSize: 11, letterSpacing: "0.04em", color: MUT }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: clientColor, display: "inline-block" }} />
          {client}
        </span>
      </div>

      <svg className="pointer-events-none absolute inset-0" width={w} height={h} style={{ zIndex: 0 }}>
        <defs>
          <marker id="p-ah" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L5,2.5 L0,5 Z" fill={LINE} /></marker>
          <marker id="p-ah-v" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L5,2.5 L0,5 Z" fill={VIOLET} /></marker>
        </defs>
        {edges.map((e, i) => (
          <Edge key={i} {...e} />
        ))}
      </svg>

      {children}
    </div>
  );
}
