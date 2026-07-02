import { SiApple, SiReact, SiNodedotjs, SiPostgresql, SiCloudflare, SiSocketdotio } from "react-icons/si";
import { FaLock, FaPlug, FaClock } from "react-icons/fa";
import { SchematicCanvas, Node, ContainerNode, CLabel, si, fa } from "./schematic-kit";

const W = 1100;
const H = 500;

export function ConcordiaConnectDiagram({ eyebrow, client = "Concordia University" }: { eyebrow?: string; client?: string } = {}) {
  return (
    <SchematicCanvas
      client={client}
      clientColor="#912338"
      eyebrow={eyebrow}
      w={W}
      h={H}
      edges={[
        // clients → api
        { d: "M247,170 L343,170", accent: true },
        { d: "M247,214 L343,214", dashed: true },
        // api → data
        { d: "M632,155 L716,155", accent: true },
        { d: "M632,231 L716,231" },
        // supporting bus
        { d: "M488,278 L488,335 M157,335 L922,335", arrow: false },
        { d: "M157,335 L157,368 M412,335 L412,368 M667,335 L667,368 M922,335 L922,368" },
      ]}
    >
      <CLabel x={295} y={170} accent>REST</CLabel>
      <CLabel x={295} y={214}>WSS</CLabel>
      <CLabel x={674} y={155} accent>SQL</CLabel>

      {/* clients */}
      <Node icon={si(SiApple)} name="iOS App" caption="SwiftUI" style={{ left: 40, top: 137, width: 207, height: 66 }} />
      <Node icon={si(SiReact)} name="Web App" caption="React · Vite" style={{ left: 40, top: 213, width: 207, height: 66 }} />

      {/* api */}
      <ContainerNode
        icon={si(SiNodedotjs, true)}
        name="Express API"
        caption="REST + WebSocket · Railway"
        chips={["users", "events", "courses", "connections", "messages"]}
        style={{ left: 345, top: 110, width: 287, height: 168 }}
      />

      {/* data */}
      <Node icon={si(SiPostgresql)} name="PostgreSQL" caption="primary · unsharded" style={{ left: 720, top: 122, width: 300, height: 66 }} />
      <Node icon={si(SiCloudflare)} name="Cloudflare R2" caption="chat media · presigned uploads" style={{ left: 720, top: 198, width: 300, height: 66 }} />

      {/* supporting */}
      <Node icon={fa(FaLock)} name="Authentication" caption="Apple · Google · magic-link · passkeys → JWT" style={{ left: 40, top: 370, width: 235, height: 92 }} />
      <Node icon={si(SiSocketdotio)} name="Realtime" caption="Socket.IO · chat sync" style={{ left: 295, top: 370, width: 235, height: 92 }} />
      <Node icon={fa(FaPlug)} name="Integrations" caption="APNs · Resend · OAuth" style={{ left: 550, top: 370, width: 235, height: 92 }} />
      <Node icon={fa(FaClock)} name="Scheduled Jobs" caption="node-cron · catalog ingest" style={{ left: 805, top: 370, width: 235, height: 92 }} />
    </SchematicCanvas>
  );
}
