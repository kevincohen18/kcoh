import {
  SiNextdotjs,
  SiApple,
  SiCloudflare,
  SiNodedotjs,
  SiSocketdotio,
  SiPostgresql,
  SiRedis,
} from "react-icons/si";
import { FaBox, FaPlug, FaCogs } from "react-icons/fa";
import {
  ShowcaseCanvas,
  Node,
  PLabel,
  FlowLegend,
  brand,
  brandAccent,
  rgba,
  THEME,
  type ThemeName,
  type EdgeSpec,
  type FlowKey,
} from "./flow-kit";

const W = 1140;
const H = 660;

/* Hub layout: the Node API sits at the centre; requests converge inward
   from the clients on the left, data fans outward to the stores on the
   right, realtime rides straight up, async and external drop out the
   bottom. Every spoke is a gently-bowed, colour-typed flow. */

/** Quadratic spoke between two points, bowed perpendicular for an organic,
    pinwheel-like sweep rather than a straight radial line. */
function spoke(x1: number, y1: number, x2: number, y2: number, bow = 0.13) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return `M${x1},${y1} Q${mx + nx * len * bow},${my + ny * len * bow} ${x2},${y2}`;
}

export function RadialMap({ theme = "light" }: { theme?: ThemeName }) {
  const t = THEME[theme];

  // Hub rect
  const hub = { left: 452, top: 268, w: 236, h: 136 };
  const hcx = hub.left + hub.w / 2; // 570
  const hcy = hub.top + hub.h / 2; // 336

  const e = (d: string, flow: FlowKey, wide = false): EdgeSpec => ({ d, flow, wide });

  const edges: EdgeSpec[] = [
    // requests converge INTO the hub from the left (arrow at hub)
    e(spoke(256, 168, 492, 300), "request"),
    e(spoke(226, 336, 452, 336), "request", true),
    e(spoke(256, 504, 492, 372), "request"),
    // data fans OUT to the stores on the right (arrow at store)
    e(spoke(648, 300, 884, 168), "data"),
    e(spoke(688, 336, 914, 336), "data", true),
    e(spoke(648, 372, 884, 504), "data"),
    // realtime straight up (arrow at realtime)
    e(spoke(569, 268, 569, 158, 0.0), "realtime"),
    // async out bottom-left, external out bottom-right
    e(spoke(524, 404, 410, 512), "event"),
    e(spoke(616, 404, 730, 512), "external"),
  ];

  const accent = t.flow.request.color;

  return (
    <ShowcaseCanvas t={t} w={W} h={H} eyebrow="THE SYSTEM, AROUND ITS CORE" edges={edges} grid>
      {/* protocol pills on the spokes */}
      <PLabel t={t} x={372} y={228} flow="request">REST</PLabel>
      <PLabel t={t} x={768} y={228} flow="data">SQL</PLabel>
      <PLabel t={t} x={569} y={214} flow="realtime">WSS</PLabel>
      <PLabel t={t} x={455} y={464} flow="event">QUEUE</PLabel>
      <PLabel t={t} x={685} y={464} flow="external">API</PLabel>

      {/* glow ring behind the hub */}
      <div
        aria-hidden
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: hcx,
          top: hcy,
          width: 360,
          height: 360,
          background: `radial-gradient(closest-side, ${rgba(accent, t.name === "dark" ? 0.22 : 0.12)}, transparent 70%)`,
        }}
      />

      {/* hub — the Node API core */}
      <div
        className="absolute flex flex-col justify-center overflow-hidden rounded-2xl"
        style={{
          left: hub.left,
          top: hub.top,
          width: hub.w,
          height: hub.h,
          padding: "0 20px",
          background:
            t.name === "dark"
              ? `linear-gradient(${rgba(accent, 0.16)}, ${rgba(accent, 0.04)}), ${t.nodeBg}`
              : `linear-gradient(${rgba(accent, 0.07)}, ${rgba(accent, 0.02)}), #ffffff`,
          border: `1.5px solid ${rgba(accent, t.name === "dark" ? 0.6 : 0.5)}`,
          boxShadow:
            t.name === "dark"
              ? `inset 0 1px 0 rgba(255,255,255,0.09), 0 0 60px -14px ${rgba(accent, 0.95)}, 0 24px 50px -24px rgba(0,0,0,0.8)`
              : `inset 0 1px 0 #ffffff, 0 2px 6px rgba(15,23,42,0.06), 0 26px 55px -22px ${rgba(accent, 0.55)}`,
        }}
      >
        <div className="flex items-center gap-2.5">
          {brandAccent(SiNodedotjs, accent, 20)}
          <span className="font-mono" style={{ fontSize: 17, fontWeight: 600, color: t.ink, letterSpacing: "-0.01em" }}>
            Node API
          </span>
        </div>
        <p className="font-sans" style={{ fontSize: 12.5, color: t.mut, marginTop: 5 }}>
          REST + WebSocket · autoscaled
        </p>
        <div className="flex flex-wrap gap-1.5" style={{ marginTop: 11 }}>
          {["auth", "billing", "realtime", "search", "jobs"].map((c) => (
            <span
              key={c}
              className="font-mono"
              style={{ fontSize: 10.5, color: t.mut, background: t.chipBg, border: t.nodeBorder, borderRadius: 5, padding: "2px 7px" }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* clients (left) */}
      <Node t={t} icon={brand(SiNextdotjs, t)} name="Web App" caption="Next.js · React" rail={t.flow.request.color} style={{ left: 70, top: 138, width: 186, height: 60 }} />
      <Node t={t} icon={brand(SiApple, t)} name="Mobile" caption="iOS · Android" rail={t.flow.request.color} style={{ left: 40, top: 306, width: 186, height: 60 }} />
      <Node t={t} icon={brand(SiCloudflare, t)} name="Cloudflare" caption="CDN · WAF · DNS" rail={t.flow.request.color} style={{ left: 70, top: 474, width: 186, height: 60 }} />

      {/* data (right) */}
      <Node t={t} icon={brand(SiPostgresql, t)} name="PostgreSQL" caption="primary · RLS" rail={t.flow.data.color} style={{ left: 884, top: 138, width: 186, height: 60 }} />
      <Node t={t} icon={brand(SiRedis, t)} name="Redis" caption="cache · sessions" rail={t.flow.data.color} style={{ left: 914, top: 306, width: 186, height: 60 }} />
      <Node t={t} icon={brand(FaBox, t, 15)} name="Object Store" caption="R2 · presigned" rail={t.flow.data.color} style={{ left: 884, top: 474, width: 186, height: 60 }} />

      {/* realtime (top) */}
      <Node t={t} icon={brand(SiSocketdotio, t)} name="Realtime" caption="Socket.IO · presence" rail={t.flow.realtime.color} style={{ left: 476, top: 96, width: 186, height: 60 }} />

      {/* async + external (bottom) */}
      <Node t={t} icon={brand(FaCogs, t, 15)} name="Workers" caption="BullMQ · cron" rail={t.flow.event.color} style={{ left: 300, top: 512, width: 186, height: 60 }} />
      <Node t={t} icon={brand(FaPlug, t, 15)} name="Integrations" caption="Stripe · Resend · APNs" rail={t.flow.external.color} style={{ left: 654, top: 512, width: 186, height: 60 }} />

      <FlowLegend t={t} keys={["request", "realtime", "data", "event", "external"]} style={{ left: 44, top: 604 }} />
    </ShowcaseCanvas>
  );
}
