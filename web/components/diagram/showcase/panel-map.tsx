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
import { FaBox, FaPlug, FaCogs, FaChartLine } from "react-icons/fa";
import {
  ShowcaseCanvas,
  Node,
  CoreNode,
  PLabel,
  FlowLegend,
  brand,
  brandAccent,
  THEME,
  type ThemeName,
  type EdgeSpec,
} from "./flow-kit";

const W = 1140;
const H = 660;

/* Panel layout: clients (left) → Cloudflare edge → Node core (centre,
   emphasised) → data column (right). Realtime rides a bidirectional WSS
   channel above the data. Workers hang off an async queue below the core;
   integrations sit bottom-right on an external call path. Every connector
   is a typed, coloured flow — see the legend. */
export function PanelMap({ theme = "light" }: { theme?: ThemeName }) {
  const t = THEME[theme];

  const edges: EdgeSpec[] = [
    // request path — clients converge into the edge, edge into the core
    { d: "M254,175 L280,175 L280,237 L306,237", flow: "request" },
    { d: "M254,275 L280,275 L280,237 L306,237", flow: "request" },
    { d: "M492,237 L520,237 L520,275 L548,275", flow: "request", wide: true },
    // realtime — bidirectional WSS between core and the elevated realtime node
    { d: "M848,182 L874,182 L874,127 L900,127", flow: "realtime" },
    { d: "M900,133 L879,133 L879,188 L848,188", flow: "realtime" },
    // data — core reads/writes the stores
    { d: "M848,246 L874,246 L874,237 L900,237", flow: "data", wide: true },
    { d: "M848,300 L886,300 L886,321 L900,321", flow: "data" },
    { d: "M848,332 L868,332 L868,401 L900,401", flow: "data" },
    // async event — core enqueues to the workers
    { d: "M698,400 L698,452", flow: "event" },
    // external — core calls out to third parties
    { d: "M770,400 L770,529 L900,529", flow: "external" },
    // telemetry — services emit to observability
    { d: "M548,360 L528,360 L528,489 L344,489", flow: "telemetry" },
  ];

  return (
    <ShowcaseCanvas t={t} w={W} h={H} eyebrow="REFERENCE ARCHITECTURE" edges={edges}>
      {/* protocol pills */}
      <PLabel t={t} x={520} y={256} flow="request">REST</PLabel>
      <PLabel t={t} x={889} y={150} flow="realtime">WSS</PLabel>
      <PLabel t={t} x={884} y={223} flow="data">SQL</PLabel>
      <PLabel t={t} x={698} y={428} flow="event">QUEUE</PLabel>
      <PLabel t={t} x={793} y={452} flow="external">API</PLabel>

      {/* clients */}
      <Node t={t} icon={brand(SiNextdotjs, t)} name="Web App" caption="Next.js · React" rail={t.flow.request.color} style={{ left: 44, top: 140, width: 210, height: 70 }} />
      <Node t={t} icon={brand(SiApple, t)} name="Mobile" caption="iOS · Android" rail={t.flow.request.color} style={{ left: 44, top: 240, width: 210, height: 70 }} />

      {/* edge */}
      <Node t={t} icon={brand(SiCloudflare, t)} name="Cloudflare" caption="CDN · WAF · DNS" rail={t.flow.request.color} style={{ left: 306, top: 190, width: 186, height: 96 }} />

      {/* core */}
      <CoreNode
        t={t}
        icon={brandAccent(SiNodedotjs, t.flow.request.color, 18)}
        name="Node API"
        caption="REST + WebSocket · autoscaled"
        modules={[
          { name: "auth", sub: "OAuth · JWT" },
          { name: "users & teams" },
          { name: "billing", sub: "Stripe" },
          { name: "search", sub: "typeahead" },
          { name: "notifications" },
        ]}
        style={{ left: 548, top: 150, width: 300, height: 250 }}
      />

      {/* realtime */}
      <Node t={t} icon={brand(SiSocketdotio, t)} name="Realtime" caption="Socket.IO · presence" rail={t.flow.realtime.color} style={{ left: 900, top: 96, width: 200, height: 68 }} />

      {/* data column */}
      <Node t={t} icon={brand(SiPostgresql, t)} name="PostgreSQL" caption="primary · row-level security" rail={t.flow.data.color} style={{ left: 900, top: 200, width: 210, height: 74 }} />
      <Node t={t} icon={brand(SiRedis, t)} name="Redis" caption="cache · sessions" rail={t.flow.data.color} style={{ left: 900, top: 288, width: 210, height: 66 }} />
      <Node t={t} icon={brand(FaBox, t, 15)} name="Object Store" caption="R2 · presigned uploads" rail={t.flow.data.color} style={{ left: 900, top: 368, width: 210, height: 66 }} />

      {/* workers */}
      <Node t={t} icon={brand(FaCogs, t, 15)} name="Workers" caption="BullMQ · scheduled jobs" rail={t.flow.event.color} style={{ left: 548, top: 452, width: 300, height: 74 }} />

      {/* integrations */}
      <Node t={t} icon={brand(FaPlug, t, 15)} name="Integrations" caption="Stripe · Resend · APNs" rail={t.flow.external.color} style={{ left: 900, top: 490, width: 210, height: 78 }} />

      {/* observability */}
      <Node t={t} icon={brand(FaChartLine, t, 15)} name="Observability" caption="logs · metrics · traces · alerts" rail={t.flow.telemetry.color} style={{ left: 44, top: 452, width: 300, height: 74 }} />

      {/* legend */}
      <FlowLegend t={t} keys={["request", "realtime", "data", "event", "external", "telemetry"]} style={{ left: 44, top: 596 }} />
    </ShowcaseCanvas>
  );
}
