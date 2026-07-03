import { SiApple, SiReact, SiNodedotjs, SiPostgresql, SiCloudflare, SiSocketdotio } from "react-icons/si";
import { FaLock, FaPlug, FaClock } from "react-icons/fa";
import { SchematicCanvas, Node, ContainerNode, CLabel, si, fa } from "./schematic-kit";

const W = 1100;
const H = 520;

/* Layout concept: two horizontal lanes.
 * TOP LANE — the live path: clients → Express API → Realtime (Socket.IO),
 * with a bidirectional WSS channel drawn between API and the elevated
 * Realtime node. This is the signature: "live" sits up front, not buried.
 * BOTTOM LANE — persistence (PostgreSQL, Cloudflare R2) on the right
 * under Realtime, and supporting services (Auth, Integrations, Scheduled
 * Jobs) on a bus beneath the API. The single violet accent traces the
 * primary REST path: iOS App → Express API → PostgreSQL. */

export function ConcordiaConnectDiagram({ eyebrow, client = "Concordia University", locale = "en" }: { eyebrow?: string; client?: string; locale?: "en" | "fr" } = {}) {
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);
  return (
    <SchematicCanvas
      client={client}
      clientColor="#912338"
      eyebrow={eyebrow}
      w={W}
      h={H}
      edges={[
        // clients → api (top lane)
        { d: "M250,139 L400,139", accent: true },
        { d: "M250,219 L400,219", dashed: true },
        // api ⇄ realtime — bidirectional live channel, elevated beside the api
        { d: "M670,128 L710,128", dashed: true },
        { d: "M710,150 L670,150", dashed: true },
        // api → postgresql (continues the single primary path)
        { d: "M670,197.5 L690,197.5 L690,228 L710,228", accent: true },
        // api → cloudflare r2 (plain)
        { d: "M670,260 L698,260 L698,314 L710,314" },
        // api → supporting bus (trunk + backbone)
        { d: "M535,280 L535,365 M185,365 L885,365", arrow: false },
        // bus → auth / integrations / scheduled jobs
        { d: "M185,365 L185,385 M535,365 L535,385 M885,365 L885,385" },
      ]}
    >
      <CLabel x={325} y={139} accent>REST</CLabel>
      <CLabel x={325} y={219}>WSS</CLabel>
      <CLabel x={690} y={139}>WSS</CLabel>
      <CLabel x={700} y={213} accent>SQL</CLabel>

      {/* clients — top lane, left */}
      <Node icon={si(SiApple)} name={t("iOS App", "App iOS")} caption="SwiftUI" style={{ left: 40, top: 106, width: 210, height: 66 }} />
      <Node icon={si(SiReact)} name={t("Web App", "App web")} caption="React · Vite" style={{ left: 40, top: 186, width: 210, height: 66 }} />

      {/* api — top lane, center */}
      <ContainerNode
        icon={si(SiNodedotjs, true)}
        name="Express API"
        caption="REST + WebSocket · Railway"
        chips={locale === "fr" ? ["utilisateurs", "événements", "cours", "connexions", "messages"] : ["users", "events", "courses", "connections", "messages"]}
        style={{ left: 400, top: 115, width: 270, height: 165 }}
      />

      {/* realtime — top lane, elevated beside the api: the live-lane hero */}
      <Node icon={si(SiSocketdotio)} name={t("Realtime", "Temps réel")} caption={t("Socket.IO · chat sync", "Socket.IO · synchro clavardage")} style={{ left: 710, top: 100, width: 240, height: 66 }} />

      {/* persistence — bottom lane, right column under realtime */}
      <Node icon={si(SiPostgresql)} name="PostgreSQL" caption={t("primary · unsharded", "primaire · non partitionné")} style={{ left: 710, top: 195, width: 300, height: 66 }} />
      <Node icon={si(SiCloudflare)} name="Cloudflare R2" caption={t("chat media · presigned uploads", "médias de clavardage · téléversements pré-signés")} style={{ left: 710, top: 281, width: 300, height: 66 }} />

      {/* supporting services — bottom lane, bus row under the api */}
      <Node icon={fa(FaLock)} name={t("Authentication", "Authentification")} caption={t("Apple · Google · magic-link · passkeys → JWT", "Apple · Google · lien magique · passkeys → JWT")} style={{ left: 40, top: 385, width: 290, height: 92 }} />
      <Node icon={fa(FaPlug)} name={t("Integrations", "Intégrations")} caption="APNs · Resend · OAuth" style={{ left: 390, top: 385, width: 290, height: 66 }} />
      <Node icon={fa(FaClock)} name={t("Scheduled Jobs", "Tâches planifiées")} caption={t("node-cron · catalog ingest", "node-cron · ingestion catalogue")} style={{ left: 740, top: 385, width: 290, height: 66 }} />
    </SchematicCanvas>
  );
}
