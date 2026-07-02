import { SiReact, SiNodedotjs, SiPostgresql, SiRailway } from "react-icons/si";
import { FaKey, FaLock, FaShieldAlt, FaPlug, FaClock } from "react-icons/fa";
import { SchematicCanvas, Node, ContainerNode, CLabel, si, fa } from "./schematic-kit";

const W = 1100;
const H = 500;

export function DrafterieDiagram({ eyebrow, client = "Legal · e-signature" }: { eyebrow?: string; client?: string } = {}) {
  return (
    <SchematicCanvas
      client={client}
      clientColor="#6e63ff"
      eyebrow={eyebrow}
      w={W}
      h={H}
      edges={[
        // clients → api (both REST)
        { d: "M247,170 L343,170", accent: true },
        { d: "M247,214 L343,214" },
        // api → data
        { d: "M632,155 L716,155", accent: true },
        { d: "M632,231 L716,231" },
        // supporting bus
        { d: "M488,278 L488,335 M157,335 L922,335", arrow: false },
        { d: "M157,335 L157,368 M412,335 L412,368 M667,335 L667,368 M922,335 L922,368" },
      ]}
    >
      <CLabel x={295} y={170} accent>REST</CLabel>
      <CLabel x={674} y={155} accent>SQL</CLabel>

      {/* clients */}
      <Node icon={si(SiReact)} name="Web SPA" caption="React · Vite · Cloudflare edge" style={{ left: 40, top: 137, width: 207, height: 66 }} />
      <Node icon={fa(FaKey)} name="Developer Portal" caption="API keys · REST" style={{ left: 40, top: 213, width: 207, height: 66 }} />

      {/* api */}
      <ContainerNode
        icon={si(SiNodedotjs, true)}
        name="Express API"
        caption="REST · Railway"
        chips={["contracts", "signatures", "invoices", "quotes", "payments"]}
        style={{ left: 345, top: 110, width: 287, height: 168 }}
      />

      {/* data */}
      <Node icon={si(SiPostgresql)} name="PostgreSQL" caption="primary · AES-256-GCM" style={{ left: 720, top: 122, width: 300, height: 66 }} />
      <Node icon={si(SiRailway)} name="Railway Volume" caption="logos · sealed PDFs" style={{ left: 720, top: 198, width: 300, height: 66 }} />

      {/* supporting */}
      <Node icon={fa(FaLock)} name="Authentication" caption="JWT · bcrypt · TOTP · passkeys" style={{ left: 40, top: 370, width: 235, height: 92 }} />
      <Node icon={fa(FaShieldAlt)} name="Signature & Audit" caption="HMAC proof · hash-chained log · sealed PDF" style={{ left: 295, top: 370, width: 235, height: 92 }} />
      <Node icon={fa(FaPlug)} name="Integrations" caption="Stripe · Resend · Sentry" style={{ left: 550, top: 370, width: 235, height: 92 }} />
      <Node icon={fa(FaClock)} name="Background Jobs" caption="in-process workers · webhook retry" style={{ left: 805, top: 370, width: 235, height: 92 }} />
    </SchematicCanvas>
  );
}
