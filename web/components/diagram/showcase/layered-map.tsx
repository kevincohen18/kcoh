import type { ReactNode } from "react";
import {
  SiNextdotjs,
  SiApple,
  SiCloudflare,
  SiNodedotjs,
  SiSocketdotio,
  SiPostgresql,
  SiRedis,
  SiStripe,
} from "react-icons/si";
import { FaBox, FaPlug, FaCogs, FaChartLine, FaCodeBranch } from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";
import {
  ShowcaseCanvas,
  Node,
  FlowLegend,
  brand,
  brandAccent,
  rgba,
  THEME,
  type Theme,
  type ThemeName,
  type FlowKey,
  type EdgeSpec,
} from "./flow-kit";

const W = 1140;
const H = 684;

/* Tier band geometry: a full-width translucent panel per architectural
   tier, a numbered tag in the left gutter, and the tier's nodes laid out
   evenly across it. Flows only ever connect ADJACENT tiers, so the whole
   thing reads top-to-bottom like a stack. */
const GUT = 44; // gutter left
const PANEL_X = 150;
const PANEL_W = W - PANEL_X - 30; // → right margin 30
const PAD = 16;
const CONTENT_X = PANEL_X + PAD;
const CONTENT_W = PANEL_W - PAD * 2;

const TIER_TOP0 = 90;
const TIER_H = 92;
const TIER_GAP = 20;

const tierTop = (i: number) => TIER_TOP0 + i * (TIER_H + TIER_GAP);
const CARD_H = 60;
const cardTop = (i: number) => tierTop(i) + (TIER_H - CARD_H) / 2;

/** Evenly distribute `n` cards across the content width; return left x of card k. */
function cardX(k: number, n: number) {
  const gap = 22;
  const cw = (CONTENT_W - (n - 1) * gap) / n;
  return { left: CONTENT_X + k * (cw + gap), width: cw };
}

function TierBand({ t, i, tag, dot }: { t: Theme; i: number; tag: string; dot: FlowKey }) {
  const top = tierTop(i);
  return (
    <>
      {/* panel */}
      <div
        className="absolute rounded-2xl"
        style={{
          left: PANEL_X,
          top,
          width: PANEL_W,
          height: TIER_H,
          background: t.name === "dark" ? "rgba(255,255,255,0.022)" : "rgba(255,255,255,0.55)",
          border: t.name === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(15,23,42,0.06)",
          boxShadow:
            t.name === "dark"
              ? "inset 0 1px 0 rgba(255,255,255,0.04)"
              : "inset 0 1px 0 rgba(255,255,255,0.8), 0 12px 30px -22px rgba(15,23,42,0.3)",
        }}
      />
      {/* gutter tag */}
      <div className="absolute flex flex-col gap-1.5" style={{ left: GUT, top: top + 20, width: PANEL_X - GUT - 14 }}>
        <span className="flex items-center gap-2">
          <span style={{ width: 7, height: 7, borderRadius: 999, background: t.flow[dot].color, boxShadow: `0 0 8px ${rgba(t.flow[dot].color, 0.6)}` }} />
          <span className="font-mono" style={{ fontSize: 12, color: t.faint }}>{String(i + 1).padStart(2, "0")}</span>
        </span>
        <span className="font-mono uppercase" style={{ fontSize: 10.5, lineHeight: 1.3, letterSpacing: "0.08em", color: t.mut }}>
          {tag}
        </span>
      </div>
    </>
  );
}

export function LayeredMap({ theme = "light" }: { theme?: ThemeName }) {
  const t = THEME[theme];

  // Card layout constants shared with the flow anchors below.
  const bottomOf = (i: number) => cardTop(i) + CARD_H;
  const topOf = (i: number) => cardTop(i);
  // vertical connector between tier i (bottom) and tier i+1 (top) at absolute x
  const vlink = (x: number, i: number, flow: FlowKey): EdgeSpec => ({
    d: `M${x},${bottomOf(i)} L${x},${topOf(i + 1)}`,
    flow,
  });

  const edges: EdgeSpec[] = [
    // clients → edge (request)
    vlink(cardX(0, 3).left + cardX(0, 3).width / 2, 0, "request"),
    vlink(cardX(1, 3).left + cardX(1, 3).width / 2, 0, "request"),
    // edge → services (request)
    vlink(cardX(0, 3).left + cardX(0, 3).width / 2, 1, "request"),
    vlink(cardX(2, 3).left + cardX(2, 3).width / 2, 1, "request"),
    // services → data & queues (data + one event)
    vlink(cardX(0, 5).left + cardX(0, 5).width / 2, 2, "data"),
    vlink(cardX(2, 5).left + cardX(2, 5).width / 2, 2, "data"),
    vlink(cardX(4, 5).left + cardX(4, 5).width / 2, 2, "event"),
    // data/queues → external & ops (external + telemetry)
    vlink(cardX(3, 4).left + cardX(3, 4).width / 2, 3, "event"),
    vlink(cardX(1, 4).left + cardX(1, 4).width / 2, 3, "telemetry"),
  ];

  const N = (
    icon: ReactNode,
    name: string,
    caption: string,
    rail: FlowKey,
    tier: number,
    k: number,
    n: number,
  ) => {
    const { left, width } = cardX(k, n);
    return (
      <Node t={t} icon={icon} name={name} caption={caption} rail={t.flow[rail].color} style={{ left, top: cardTop(tier), width, height: CARD_H }} />
    );
  };

  return (
    <ShowcaseCanvas t={t} w={W} h={H} eyebrow="ARCHITECTURE, BY TIER" edges={edges} grid={false}>
      <TierBand t={t} i={0} tag="Clients" dot="request" />
      <TierBand t={t} i={1} tag="Edge & gateway" dot="request" />
      <TierBand t={t} i={2} tag="Application" dot="request" />
      <TierBand t={t} i={3} tag="Data & queues" dot="data" />
      <TierBand t={t} i={4} tag="External & ops" dot="external" />

      {/* 0 · clients */}
      {N(brand(SiNextdotjs, t), "Web App", "Next.js · React", "request", 0, 0, 3)}
      {N(brand(SiApple, t), "Mobile", "iOS · Android", "request", 0, 1, 3)}
      {N(brand(FaCodeBranch, t, 15), "Partner API", "REST · webhooks", "request", 0, 2, 3)}

      {/* 1 · edge & gateway */}
      {N(brand(SiCloudflare, t), "Cloudflare", "CDN · WAF · DNS", "request", 1, 0, 3)}
      {N(brand(FaShieldHalved, t, 15), "API Gateway", "routing · rate-limit", "request", 1, 1, 3)}
      {N(brandAccent(SiNodedotjs, t.flow.request.color, 16), "Node API", "REST + WebSocket", "request", 1, 2, 3)}

      {/* 2 · application services */}
      {N(brand(FaShieldHalved, t, 14), "Auth", "OAuth · JWT", "request", 2, 0, 5)}
      {N(brand(SiStripe, t, 15), "Billing", "Stripe", "request", 2, 1, 5)}
      {N(brand(SiSocketdotio, t), "Realtime", "Socket.IO", "realtime", 2, 2, 5)}
      {N(brand(FaChartLine, t, 14), "Search", "typeahead", "request", 2, 3, 5)}
      {N(brand(FaCogs, t, 14), "Notifications", "APNs · email", "request", 2, 4, 5)}

      {/* 3 · data & queues */}
      {N(brand(SiPostgresql, t), "PostgreSQL", "primary · RLS", "data", 3, 0, 4)}
      {N(brand(SiRedis, t), "Redis", "cache · sessions", "data", 3, 1, 4)}
      {N(brand(FaBox, t, 14), "Object Store", "R2 · presigned", "data", 3, 2, 4)}
      {N(brand(FaCogs, t, 14), "Workers", "BullMQ · cron", "event", 3, 3, 4)}

      {/* 4 · external & ops */}
      {N(brand(FaPlug, t, 14), "Integrations", "Stripe · Resend · APNs", "external", 4, 0, 3)}
      {N(brand(FaChartLine, t, 14), "Observability", "logs · metrics · traces", "telemetry", 4, 1, 3)}
      {N(brand(FaShieldHalved, t, 14), "Secrets & CI/CD", "vault · GitHub Actions", "external", 4, 2, 3)}

      <FlowLegend t={t} keys={["request", "realtime", "data", "event", "external", "telemetry"]} style={{ left: GUT, top: tierTop(4) + TIER_H + 16 }} />
    </ShowcaseCanvas>
  );
}
