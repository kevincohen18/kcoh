import { SiJavascript, SiNodedotjs, SiPostgresql, SiCloudflare } from "react-icons/si";
import { FaLock, FaCalendarCheck, FaBell } from "react-icons/fa";
import { SchematicCanvas, Node, ContainerNode, CLabel, si, fa } from "./schematic-kit";

const W = 1100;
const H = 500;

/* Deliberately the leanest of the four: one operator, one database,
   two tables. The honesty is the point — nothing is padded. */
export function AutoMedicDiagram({ eyebrow, client = "Mobile mechanic · Québec" }: { eyebrow?: string; client?: string } = {}) {
  return (
    <SchematicCanvas
      client={client}
      clientColor="#16a34a"
      eyebrow={eyebrow}
      w={W}
      h={H}
      edges={[
        // clients → api (REST only, no realtime)
        { d: "M247,170 L343,170", accent: true },
        { d: "M247,214 L343,214" },
        // api → single database
        { d: "M632,193 L716,193", accent: true },
        // supporting bus
        { d: "M488,278 L488,335 M157,335 L922,335", arrow: false },
        { d: "M157,335 L157,368 M412,335 L412,368 M667,335 L667,368 M922,335 L922,368" },
      ]}
    >
      <CLabel x={295} y={170} accent>REST</CLabel>
      <CLabel x={674} y={193} accent>SQL</CLabel>

      {/* clients */}
      <Node icon={si(SiJavascript)} name="Website" caption="HTML · vanilla JS" style={{ left: 40, top: 137, width: 207, height: 66 }} />
      <Node icon={fa(FaLock)} name="Admin" caption="vanilla JS · Bearer" style={{ left: 40, top: 213, width: 207, height: 66 }} />

      {/* api */}
      <ContainerNode
        icon={si(SiNodedotjs, true)}
        name="Express API"
        caption="REST · Railway"
        chips={["slots", "bookings", "config", "cancel"]}
        style={{ left: 345, top: 110, width: 287, height: 168 }}
      />

      {/* data — a single database, on purpose */}
      <Node icon={si(SiPostgresql)} name="PostgreSQL" caption="single instance · unique-slot index" style={{ left: 720, top: 160, width: 300, height: 66 }} />

      {/* supporting */}
      <Node icon={fa(FaCalendarCheck)} name="Booking engine" caption="row-locked tx · unique-slot index" style={{ left: 40, top: 370, width: 235, height: 92 }} />
      <Node icon={fa(FaLock)} name="Admin Auth" caption="bcrypt · in-memory Bearer" style={{ left: 295, top: 370, width: 235, height: 92 }} />
      <Node icon={fa(FaBell)} name="Notifications" caption="Resend email · Twilio SMS · .ics" style={{ left: 550, top: 370, width: 235, height: 92 }} />
      <Node icon={si(SiCloudflare)} name="Cloudflare Edge" caption="Functions · KV · Google reviews" style={{ left: 805, top: 370, width: 235, height: 92 }} />
    </SchematicCanvas>
  );
}
