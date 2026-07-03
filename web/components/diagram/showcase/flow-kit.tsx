import type { CSSProperties, ReactNode } from "react";
import type { IconType } from "react-icons";

/* ------------------------------------------------------------------ *
 * Flow-kit — the "dialed-up" sibling of the case-study schematic kit.
 *
 * Same DNA (real brand marks, mono technical labels, right-angle
 * connectors) but built to be the homepage showpiece: framed glass
 * canvas with a bezel highlight + soft drop shadow, and — the signature —
 * TYPED data-flow edges, each flow a different colour with a legend.
 * The colour is semantic (sync request / realtime / async event /
 * data read-write / external call), which is what keeps a colourful
 * diagram reading as "an architect drew this" rather than AI decoration.
 *
 * Theme-aware: every value resolves from a `Theme` object so one map
 * renders in both a light "blueprint" mood and a dark "control-room" mood.
 * ------------------------------------------------------------------ */

export type FlowKey = "request" | "realtime" | "event" | "data" | "external" | "telemetry";

export type FlowDef = { label: string; color: string; dashed?: boolean };

/* Per-theme flow palettes. Tuned so each hue reads on its own background:
   deeper/saturated on white, brighter on near-black. */
export const FLOW_LIGHT: Record<FlowKey, FlowDef> = {
  request: { label: "Request", color: "#6e63ff" },
  realtime: { label: "Realtime", color: "#0e9bb8" },
  event: { label: "Async event", color: "#d97706", dashed: true },
  data: { label: "Data", color: "#0d9f6e" },
  external: { label: "External", color: "#e11d68", dashed: true },
  telemetry: { label: "Telemetry", color: "#8b93a6", dashed: true },
};

export const FLOW_DARK: Record<FlowKey, FlowDef> = {
  request: { label: "Request", color: "#8b82ff" },
  realtime: { label: "Realtime", color: "#3bd6ef" },
  event: { label: "Async event", color: "#fbbf24", dashed: true },
  data: { label: "Data", color: "#34d9a0" },
  external: { label: "External", color: "#fb5c8a", dashed: true },
  telemetry: { label: "Telemetry", color: "#8792a5", dashed: true },
};

export type ThemeName = "light" | "dark";

export type Theme = {
  name: ThemeName;
  flow: Record<FlowKey, FlowDef>;
  ink: string;
  mut: string;
  faint: string;
  canvasBg: string;
  panelBorder: string;
  panelShadow: string;
  gridColor: string;
  nodeBg: string;
  nodeBorder: string;
  nodeShadow: string;
  chipBg: string;
};

export const THEME: Record<ThemeName, Theme> = {
  light: {
    name: "light",
    flow: FLOW_LIGHT,
    ink: "#0f172a",
    mut: "#64748b",
    faint: "#94a3b8",
    canvasBg:
      "linear-gradient(180deg,#f6f8fc 0%, #eef1f7 100%)",
    panelBorder: "1px solid rgba(15,23,42,0.09)",
    panelShadow:
      "inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 6px -2px rgba(15,23,42,0.10), 0 34px 70px -34px rgba(15,23,42,0.42)",
    gridColor: "rgba(15,23,42,0.05)",
    nodeBg: "#ffffff",
    nodeBorder: "1px solid rgba(15,23,42,0.10)",
    nodeShadow:
      "inset 0 1px 0 #ffffff, 0 1px 2px rgba(15,23,42,0.05), 0 10px 22px -14px rgba(15,23,42,0.28)",
    chipBg: "#f1f3f8",
  },
  dark: {
    name: "dark",
    flow: FLOW_DARK,
    ink: "#f6f7fb",
    mut: "#9aa4b2",
    faint: "#6e7786",
    canvasBg:
      "radial-gradient(120% 105% at 50% -12%, #101828 0%, #080b12 55%, #05070b 100%)",
    panelBorder: "1px solid rgba(255,255,255,0.09)",
    panelShadow:
      "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.02), 0 40px 90px -40px rgba(0,0,0,0.85)",
    gridColor: "rgba(255,255,255,0.045)",
    nodeBg: "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.014))",
    nodeBorder: "1px solid rgba(255,255,255,0.10)",
    nodeShadow:
      "inset 0 1px 0 rgba(255,255,255,0.07), 0 1px 2px rgba(0,0,0,0.4), 0 14px 30px -18px rgba(0,0,0,0.7)",
    chipBg: "rgba(255,255,255,0.05)",
  },
};

export function rgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  return `rgba(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}, ${a})`;
}

/* ---- icon helpers ------------------------------------------------- */
export const brand = (Comp: IconType, t: Theme, size = 17) => (
  <Comp size={size} style={{ color: t.ink, opacity: t.name === "dark" ? 0.9 : 0.82 }} />
);
export const brandAccent = (Comp: IconType, color: string, size = 17) => (
  <Comp size={size} style={{ color }} />
);

/* ------------------------------------------------------------------ *
 * Node — a rim-lit glass card. A thin coloured left rail encodes which
 * layer/flow it belongs to; the mark stays monochrome for credibility.
 * ------------------------------------------------------------------ */
export function Node({
  t,
  icon,
  name,
  caption,
  rail,
  style,
}: {
  t: Theme;
  icon: ReactNode;
  name: string;
  caption?: string;
  rail?: string;
  style?: CSSProperties;
}) {
  const { height, ...rest } = style ?? {};
  return (
    <div
      className="absolute overflow-hidden rounded-xl"
      style={{
        background: t.nodeBg,
        border: t.nodeBorder,
        boxShadow: t.nodeShadow,
        backdropFilter: t.name === "dark" ? "blur(2px)" : undefined,
        minHeight: height,
        ...rest,
      }}
    >
      {rail && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0"
          style={{ width: 3, background: rail, boxShadow: `0 0 10px ${rgba(rail, 0.5)}` }}
        />
      )}
      <div style={{ padding: "12px 14px 12px 16px" }}>
        <div className="flex items-center gap-2.5">
          {icon}
          <span
            className="font-mono"
            style={{ fontSize: 14, color: t.ink, fontWeight: 500, letterSpacing: "-0.01em" }}
          >
            {name}
          </span>
        </div>
        {caption && (
          <p className="font-sans" style={{ fontSize: 12, color: t.mut, lineHeight: 1.4, marginTop: 5 }}>
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}

/* The emphasised core node: brand-violet framed, header + a list of the
   modules the service actually owns (fills the container with real content
   instead of a hollow box). */
export type Module = { name: string; sub?: string };

export function CoreNode({
  t,
  icon,
  name,
  caption,
  modules,
  style,
}: {
  t: Theme;
  icon: ReactNode;
  name: string;
  caption: string;
  modules: Module[];
  style?: CSSProperties;
}) {
  const accent = t.flow.request.color;
  return (
    <div
      className="absolute flex flex-col overflow-hidden rounded-xl"
      style={{
        background:
          t.name === "dark"
            ? `linear-gradient(${rgba(accent, 0.1)}, ${rgba(accent, 0.02)}), ${t.nodeBg}`
            : `linear-gradient(${rgba(accent, 0.05)}, ${rgba(accent, 0.02)}), #ffffff`,
        border: `1px solid ${rgba(accent, t.name === "dark" ? 0.55 : 0.45)}`,
        boxShadow:
          t.name === "dark"
            ? `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px -18px ${rgba(accent, 0.9)}, 0 20px 40px -22px rgba(0,0,0,0.7)`
            : `inset 0 1px 0 #ffffff, 0 2px 4px rgba(15,23,42,0.05), 0 18px 40px -20px ${rgba(accent, 0.5)}`,
        ...style,
      }}
    >
      <div style={{ padding: "14px 16px" }} className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center gap-2.5">
          {icon}
          <span
            className="font-mono"
            style={{ fontSize: 15, color: t.ink, fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            {name}
          </span>
        </div>
        <p className="font-sans" style={{ fontSize: 12, color: t.mut, marginTop: 6 }}>
          {caption}
        </p>
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: `1px solid ${rgba(accent, t.name === "dark" ? 0.22 : 0.16)}`,
            display: "flex",
            flexDirection: "column",
            gap: 9,
          }}
        >
          {modules.map((m) => (
            <div key={m.name} className="flex items-center gap-2.5">
              <span
                aria-hidden
                style={{ width: 5, height: 5, borderRadius: 999, background: accent, boxShadow: `0 0 6px ${rgba(accent, 0.6)}`, flexShrink: 0 }}
              />
              <span className="font-mono" style={{ fontSize: 12.5, color: t.ink, letterSpacing: "-0.01em" }}>
                {m.name}
              </span>
              {m.sub && (
                <span className="font-sans" style={{ fontSize: 11, color: t.faint }}>
                  {m.sub}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * OptionNode — a layer presented as a CHOICE: a category label plus the
 * options you can pick, with the common default highlighted and the
 * alternatives shown as "also supported". This is what turns the map
 * from "the build" into "your build — we wire whichever you pick".
 * ------------------------------------------------------------------ */
export type StackOpt = { Comp?: IconType; name: string; sel?: boolean };

export function OptionChip({ t, opt, accent }: { t: Theme; opt: StackOpt; accent: string }) {
  const sel = !!opt.sel;
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono"
      style={{
        fontSize: 11.5,
        lineHeight: 1,
        padding: "4px 8px",
        borderRadius: 7,
        letterSpacing: "-0.01em",
        color: sel ? t.ink : t.mut,
        background: sel ? rgba(accent, t.name === "dark" ? 0.16 : 0.09) : "transparent",
        border: `1px solid ${
          sel
            ? rgba(accent, t.name === "dark" ? 0.5 : 0.4)
            : t.name === "dark"
              ? "rgba(255,255,255,0.09)"
              : "rgba(15,23,42,0.10)"
        }`,
        boxShadow: sel && t.name === "dark" ? `0 0 12px -5px ${rgba(accent, 0.8)}` : undefined,
      }}
    >
      {opt.Comp && (
        <opt.Comp size={13} style={{ color: sel ? accent : t.faint, opacity: sel ? 1 : 0.85 }} />
      )}
      {opt.name}
    </span>
  );
}

export function OptionNode({
  t,
  category,
  options,
  rail,
  style,
}: {
  t: Theme;
  category: string;
  options: StackOpt[];
  rail: string;
  style?: CSSProperties;
}) {
  const { height, ...rest } = style ?? {};
  return (
    <div
      className="absolute overflow-hidden rounded-xl"
      style={{ background: t.nodeBg, border: t.nodeBorder, boxShadow: t.nodeShadow, minHeight: height, ...rest }}
    >
      <span aria-hidden className="absolute inset-y-0 left-0" style={{ width: 3, background: rail, boxShadow: `0 0 10px ${rgba(rail, 0.5)}` }} />
      <div style={{ padding: "11px 13px 12px 16px" }}>
        <span className="font-mono uppercase" style={{ fontSize: 9.5, letterSpacing: "0.11em", color: t.faint }}>
          {category}
        </span>
        <div className="flex flex-wrap" style={{ gap: 6, marginTop: 9 }}>
          {options.map((o) => (
            <OptionChip key={o.name} t={t} opt={o} accent={rail} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* A protocol pill sitting on a connector (REST / WSS / SQL …), coloured
   to match its flow. */
export function PLabel({
  t,
  x,
  y,
  flow,
  children,
}: {
  t: Theme;
  x: number;
  y: number;
  flow: FlowKey;
  children: ReactNode;
}) {
  const color = t.flow[flow].color;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 font-mono"
      style={{
        left: x,
        top: y,
        fontSize: 10.5,
        letterSpacing: "0.04em",
        color,
        background: t.name === "dark" ? rgba(color, 0.12) : "#ffffff",
        padding: "2px 7px",
        border: `1px solid ${rgba(color, t.name === "dark" ? 0.4 : 0.35)}`,
        borderRadius: 5,
        zIndex: 4,
        boxShadow: t.name === "light" ? "0 1px 2px rgba(15,23,42,0.06)" : undefined,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Edges — typed, coloured connectors drawn in the SVG overlay.
 * ------------------------------------------------------------------ */
export type EdgeSpec = { d: string; flow: FlowKey; wide?: boolean; noArrow?: boolean };

export function FlowDefs({ t }: { t: Theme }) {
  return (
    <defs>
      {(Object.keys(t.flow) as FlowKey[]).map((k) => (
        <marker
          key={k}
          id={`ah-${t.name}-${k}`}
          markerWidth="8"
          markerHeight="8"
          refX="5.5"
          refY="3"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill={t.flow[k].color} />
        </marker>
      ))}
    </defs>
  );
}

export function Edge({ t, spec }: { t: Theme; spec: EdgeSpec }) {
  const f = t.flow[spec.flow];
  return (
    <path
      d={spec.d}
      fill="none"
      stroke={f.color}
      strokeWidth={spec.wide ? 2.4 : 1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={f.dashed ? "5 5" : undefined}
      markerEnd={spec.noArrow ? undefined : `url(#ah-${t.name}-${spec.flow})`}
      style={
        t.name === "dark"
          ? { filter: `drop-shadow(0 0 6px ${rgba(f.color, 0.55)})` }
          : undefined
      }
    />
  );
}

/* ------------------------------------------------------------------ *
 * FlowLegend — the typed-flow key. This is what makes the colour read
 * as meaning, not decoration.
 * ------------------------------------------------------------------ */
export function FlowLegend({
  t,
  keys,
  style,
}: {
  t: Theme;
  keys: FlowKey[];
  style?: CSSProperties;
}) {
  return (
    <div
      className="absolute flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-lg"
      style={{
        padding: "8px 12px",
        background: t.name === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)",
        border: t.nodeBorder,
        backdropFilter: "blur(4px)",
        ...style,
      }}
    >
      {keys.map((k) => {
        const f = t.flow[k];
        return (
          <span key={k} className="flex items-center gap-2 font-mono" style={{ fontSize: 10.5, color: t.mut }}>
            <svg width="22" height="8" style={{ overflow: "visible" }}>
              <line
                x1="0"
                y1="4"
                x2="18"
                y2="4"
                stroke={f.color}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray={f.dashed ? "4 4" : undefined}
              />
              <path d="M18,1.5 L22,4 L18,6.5 Z" fill={f.color} />
            </svg>
            {f.label}
          </span>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * ShowcaseCanvas — the framed, bezel-lit panel everything sits on.
 * ------------------------------------------------------------------ */
export function ShowcaseCanvas({
  t,
  w,
  h,
  eyebrow = "SYSTEM ARCHITECTURE",
  tag,
  edges = [],
  grid = true,
  children,
}: {
  t: Theme;
  w: number;
  h: number;
  eyebrow?: string;
  tag?: string;
  edges?: EdgeSpec[];
  grid?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        width: w,
        height: h,
        background: t.canvasBg,
        border: t.panelBorder,
        boxShadow: t.panelShadow,
      }}
    >
      {grid && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${t.gridColor} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(120% 100% at 50% 40%, #000 55%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(120% 100% at 50% 40%, #000 55%, transparent 100%)",
          }}
        />
      )}

      <div className="absolute left-7 right-7 top-6 z-10 flex items-baseline justify-between">
        <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: t.mut }}>
          {eyebrow}
        </span>
        {tag && (
          <span className="flex items-center gap-2 font-mono" style={{ fontSize: 11, color: t.faint }}>
            {tag}
          </span>
        )}
      </div>

      <svg className="pointer-events-none absolute inset-0" width={w} height={h} style={{ zIndex: 1 }}>
        <FlowDefs t={t} />
        {edges.map((e, i) => (
          <Edge key={i} t={t} spec={e} />
        ))}
      </svg>

      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
