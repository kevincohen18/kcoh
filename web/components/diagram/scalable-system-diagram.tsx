import {
  Globe,
  Apple,
  Smartphone,
  Network,
  Shield,
  Split,
  Lock,
  KeyRound,
  Users,
  Search,
  Bell,
  CreditCard,
  ChartColumn,
  Layers,
  Database,
  Braces,
  Box,
  ListOrdered,
  Workflow,
  Cog,
  ScrollText,
  Route,
  Activity,
  BellRing,
  LayoutDashboard,
  Mail,
} from "lucide-react";
import { CATEGORY, LEGEND_ITEMS, rgba } from "./palette";
import { Panel, NodeCard, Legend, VArrow, HArrow } from "./primitives";

/* Fixed design canvas — everything is placed on this coordinate space,
   then scaled to fit the viewport by the page wrapper. */
const W = 1680;
const H = 952;

/* ------------------------------------------------------------------ *
 * Inter-panel connector (drawn in the SVG overlay).
 * ------------------------------------------------------------------ */
function Edge({
  x1,
  y1,
  x2,
  y2,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(255,255,255,0.55)"
      strokeWidth={1.8}
      strokeDasharray={dashed ? "6 6" : undefined}
      markerEnd="url(#ah)"
    />
  );
}

const c = CATEGORY;

export function ScalableSystemDiagram() {
  return (
    <div
      id="system-canvas"
      className="relative overflow-hidden rounded-[20px]"
      style={{
        width: W,
        height: H,
        background:
          "radial-gradient(135% 105% at 50% -8%, #0a0b12 0%, #020204 52%, #000000 100%)",
      }}
    >
      {/* ---- Title ------------------------------------------------- */}
      <div className="absolute left-0 right-0 top-6 flex items-center justify-center gap-5">
        <svg width="150" height="34" viewBox="0 0 150 34" fill="none">
          <path
            d="M2 24 H70 L86 8 H148"
            stroke={c.edge.color}
            strokeWidth="2"
            opacity="0.8"
          />
          <circle cx="86" cy="8" r="3.5" fill={c.edge.color} />
        </svg>
        <h1
          className="text-center text-[60px] leading-none text-white"
          style={{
            fontWeight: 900,
            letterSpacing: "-0.02em",
            textShadow:
              "0 0 30px rgba(255,255,255,0.35), 0 0 60px rgba(120,140,255,0.15)",
          }}
        >
          Scalable System Design
        </h1>
        <svg width="150" height="34" viewBox="0 0 150 34" fill="none">
          <path
            d="M148 24 H80 L64 8 H2"
            stroke={c.external.color}
            strokeWidth="2"
            opacity="0.85"
          />
          <circle cx="64" cy="8" r="3.5" fill={c.external.color} />
        </svg>
      </div>

      {/* ---- Connectors (behind panels) ---------------------------- */}
      <svg
        className="pointer-events-none absolute inset-0"
        width={W}
        height={H}
        style={{ zIndex: 0 }}
      >
        <defs>
          <marker
            id="ah"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="3"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M0,0 L7,3 L0,6 Z" fill="rgba(255,255,255,0.8)" />
          </marker>
        </defs>

        {/* sync */}
        <Edge x1={276} y1={206} x2={298} y2={206} />
        <Edge x1={548} y1={352} x2={594} y2={352} />
        <Edge x1={1142} y1={318} x2={1316} y2={210} />
        <Edge x1={1142} y1={392} x2={1316} y2={404} />
        <Edge x1={712} y1={458} x2={712} y2={546} />
        <Edge x1={852} y1={458} x2={852} y2={546} />
        <Edge x1={992} y1={458} x2={992} y2={546} />
        <Edge x1={1088} y1={458} x2={1088} y2={546} />

        {/* async */}
        <Edge x1={884} y1={236} x2={884} y2={276} dashed />
        <Edge x1={964} y1={276} x2={964} y2={236} dashed />
        <Edge x1={540} y1={548} x2={604} y2={460} dashed />
        <Edge x1={548} y1={606} x2={594} y2={606} dashed />
        <Edge x1={594} y1={628} x2={548} y2={628} dashed />
        <Edge x1={760} y1={730} x2={760} y2={764} dashed />
        <Edge x1={1000} y1={730} x2={1000} y2={764} dashed />
        <Edge x1={300} y1={730} x2={300} y2={764} dashed />
      </svg>

      {/* ---- Layers ------------------------------------------------ */}

      {/* 1 · Client Layer */}
      <Panel
        n={1}
        title="Client Layer"
        color={c.client.color}
        style={{ left: 48, top: 118, width: 228, height: 392 }}
      >
        <div className="flex flex-1 flex-col gap-3">
          <NodeCard icon={Globe} label="Web App" color={c.client.color} />
          <NodeCard icon={Apple} label="iOS App" color={c.client.color} />
          <NodeCard icon={Smartphone} label="Android App" color={c.client.color} />
        </div>
      </Panel>

      {/* 2 · Edge Layer */}
      <Panel
        n={2}
        title="Edge Layer"
        color={c.edge.color}
        style={{ left: 300, top: 118, width: 248, height: 392 }}
      >
        <div className="flex flex-1 flex-col">
          <div className="flex-1">
            <NodeCard icon={Globe} label="CDN" color={c.edge.color} />
          </div>
          <VArrow />
          <div className="flex-1">
            <NodeCard icon={Shield} label="WAF" color={c.edge.color} />
          </div>
          <VArrow />
          <div className="flex-1">
            <NodeCard icon={Network} label="API Gateway" color={c.edge.color} />
          </div>
          <VArrow />
          <div className="flex-1">
            <NodeCard icon={Split} label="Load Balancer" color={c.edge.color} />
          </div>
        </div>
      </Panel>

      {/* 3 · Authentication */}
      <Panel
        n={3}
        title="Authentication"
        color={c.auth.color}
        style={{ left: 644, top: 118, width: 498, height: 120 }}
      >
        <div className="flex flex-1 items-stretch">
          <div className="flex-1">
            <NodeCard icon={Lock} label="Auth Service" color={c.auth.color} />
          </div>
          <HArrow both />
          <div className="flex-1">
            <NodeCard icon={KeyRound} label="OAuth / JWT" color={c.auth.color} />
          </div>
        </div>
      </Panel>

      {/* 4 · Core Services */}
      <Panel
        n={4}
        title="Core Services"
        color={c.core.color}
        style={{ left: 596, top: 278, width: 546, height: 180 }}
      >
        <div className="grid flex-1 grid-cols-5 gap-2.5">
          <NodeCard icon={Users} label="User Service" color={c.core.color} orientation="col" />
          <NodeCard icon={Search} label="Search Service" color={c.core.color} orientation="col" />
          <NodeCard icon={Bell} label="Notification" color={c.core.color} orientation="col" />
          <NodeCard icon={CreditCard} label="Billing Service" color={c.core.color} orientation="col" />
          <NodeCard icon={ChartColumn} label="Analytics" color={c.core.color} orientation="col" />
        </div>
      </Panel>

      {/* 5 · Async / Event Layer */}
      <Panel
        n={5}
        title="Async / Event Layer"
        color={c.async.color}
        style={{ left: 48, top: 548, width: 500, height: 182 }}
      >
        <div className="flex flex-1 items-stretch">
          <div className="flex-1">
            <NodeCard icon={ListOrdered} label="Message Queue" color={c.async.color} orientation="col" />
          </div>
          <HArrow />
          <div className="flex-1">
            <NodeCard icon={Workflow} label="Event Bus" color={c.async.color} orientation="col" />
          </div>
          <HArrow />
          <div className="flex-1">
            <NodeCard icon={Cog} label="Worker Nodes" color={c.async.color} orientation="col" />
          </div>
        </div>
      </Panel>

      {/* 6 · Data Layer */}
      <Panel
        n={6}
        title="Data Layer"
        color={c.data.color}
        style={{ left: 596, top: 548, width: 546, height: 182 }}
      >
        <div className="flex flex-1 items-stretch">
          <div className="flex-1">
            <NodeCard icon={Layers} label="Redis Cache" color={c.data.color} orientation="col" />
          </div>
          <HArrow both />
          <div className="flex-1">
            <NodeCard icon={Database} label="PostgreSQL" sub="Primary" color={c.data.color} orientation="col" />
          </div>
          <HArrow both />
          <div className="flex-1">
            <NodeCard icon={Braces} label="NoSQL DB" color={c.data.color} orientation="col" />
          </div>
          <HArrow both />
          <div className="flex-1">
            <NodeCard icon={Box} label="Object Storage" color={c.data.color} orientation="col" />
          </div>
        </div>
      </Panel>

      {/* 7 · Observability / Reliability */}
      <Panel
        n={7}
        title="Observability / Reliability"
        color={c.observ.color}
        style={{ left: 48, top: 766, width: 1094, height: 166 }}
      >
        <div className="flex flex-1 items-stretch">
          <div className="flex-1">
            <NodeCard icon={ScrollText} label="Logging" sub="Centralized log aggregation" color={c.observ.color} />
          </div>
          <HArrow />
          <div className="flex-1">
            <NodeCard icon={ChartColumn} label="Metrics" sub="Performance & business" color={c.observ.color} />
          </div>
          <HArrow />
          <div className="flex-1">
            <NodeCard icon={Route} label="Tracing" sub="Distributed tracing" color={c.observ.color} />
          </div>
          <HArrow />
          <div className="flex-1">
            <NodeCard icon={Activity} label="Monitoring" sub="Health & SLA tracking" color={c.observ.color} />
          </div>
          <HArrow />
          <div className="flex-1">
            <NodeCard icon={BellRing} label="Alerting" sub="Email / Slack / SMS" color={c.observ.color} />
          </div>
        </div>
      </Panel>

      {/* 10 · Admin Dashboard */}
      <Panel
        n={10}
        title="Admin Dashboard"
        color={c.admin.color}
        style={{ left: 1320, top: 118, width: 312, height: 166 }}
      >
        <div className="flex flex-1 items-center gap-4">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center rounded-xl"
            style={{
              color: c.admin.color,
              border: `1px solid ${rgba(c.admin.color, 0.4)}`,
              background: rgba(c.admin.color, 0.08),
              boxShadow: `inset 0 0 16px -6px ${rgba(c.admin.color, 0.9)}`,
            }}
          >
            <LayoutDashboard size={26} strokeWidth={1.75} />
          </span>
          <ul className="space-y-1 text-[12.5px] text-white/85">
            <li>• System Overview</li>
            <li>• User Management</li>
            <li>• Billing &amp; Reports</li>
            <li>• Feature Flags</li>
          </ul>
        </div>
      </Panel>

      {/* 11 · Third-Party Integrations */}
      <Panel
        n={11}
        title="Third-Party Integrations"
        color={c.external.color}
        style={{ left: 1320, top: 312, width: 312, height: 212 }}
      >
        <ul className="flex flex-1 flex-col justify-center gap-2.5">
          {[
            { icon: CreditCard, label: "Payment Gateway" },
            { icon: Mail, label: "Email / SMS Provider" },
            { icon: Bell, label: "Push Notification" },
            { icon: Users, label: "Social Login" },
            { icon: ChartColumn, label: "Analytics / Ads" },
          ].map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-[12.5px] text-white/90">
              <Icon size={18} strokeWidth={1.75} style={{ color: c.external.color }} />
              {label}
            </li>
          ))}
        </ul>
      </Panel>

      {/* Legend */}
      <Legend
        items={LEGEND_ITEMS}
        style={{ left: 1352, top: 560, width: 280, height: 272 }}
      />
    </div>
  );
}
