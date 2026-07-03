import { SiJavascript, SiNodedotjs, SiPostgresql, SiCloudflare } from "react-icons/si";
import { FaLock, FaCalendarCheck, FaBell } from "react-icons/fa";
import { SchematicCanvas, Node, ContainerNode, CLabel, si, fa } from "./schematic-kit";

const W = 1100;
const H = 460;

/* Deliberately the leanest of the four: one operator, one database,
   two tables. The honesty is the point — nothing is padded. Rendered
   as a single, mostly-horizontal spine (clients → edge → API →
   database) with generous whitespace, plus two modest offshoots. */
export function AutoMedicDiagram({ eyebrow, client = "Mobile mechanic · Québec", locale = "en" }: { eyebrow?: string; client?: string; locale?: "en" | "fr" } = {}) {
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);
  return (
    <SchematicCanvas
      client={client}
      clientColor="#16a34a"
      eyebrow={eyebrow}
      w={W}
      h={H}
      edges={[
        // the one spine: clients → edge → api → database (REST only, no realtime)
        { d: "M240,170 L280,170", accent: true },
        { d: "M240,246 L280,246" },
        { d: "M480,208 L510,208", accent: true },
        { d: "M770,208 L795,208", accent: true },
        // the one hard problem, sitting right at the database
        { d: "M925,271 L925,241" },
        // two minor, modest offshoots off the api — not a full bus
        { d: "M640,292 L640,310 M450,310 L670,310", arrow: false },
        { d: "M450,310 L450,325" },
        { d: "M670,310 L670,325" },
      ]}
    >
      <CLabel x={260} y={170} accent>REST</CLabel>
      <CLabel x={783} y={208} accent>SQL</CLabel>

      {/* clients */}
      <Node icon={si(SiJavascript)} name={t("Website", "Site web")} caption="HTML · vanilla JS" style={{ left: 40, top: 137, width: 200, height: 66 }} />
      <Node icon={fa(FaLock)} name="Admin" caption="vanilla JS · Bearer" style={{ left: 40, top: 213, width: 200, height: 66 }} />

      {/* edge */}
      <Node icon={si(SiCloudflare)} name="Cloudflare Edge" caption={t("Functions · KV · Google reviews", "Functions · KV · avis Google")} style={{ left: 280, top: 162, width: 200, height: 92 }} />

      {/* api */}
      <ContainerNode
        icon={si(SiNodedotjs, true)}
        name="Express API"
        caption="REST · Railway"
        chips={locale === "fr" ? ["créneaux", "réservations", "config", "annuler"] : ["slots", "bookings", "config", "cancel"]}
        style={{ left: 510, top: 124, width: 260, height: 168 }}
      />

      {/* data — a single database, on purpose */}
      <Node icon={si(SiPostgresql)} name="PostgreSQL" caption={t("single instance · unique-slot index", "instance unique · index de créneau unique")} style={{ left: 795, top: 175, width: 260, height: 66 }} />

      {/* the one hard problem, called out beside the database it protects */}
      <Node icon={fa(FaCalendarCheck)} name={t("Booking engine", "Moteur de réservation")} caption={t("row-locked tx · unique-slot index", "tx à verrou de ligne · index de créneau unique")} style={{ left: 795, top: 271, width: 260, height: 92 }} />

      {/* minor supporting nodes — a small offshoot, not a bus */}
      <Node icon={fa(FaLock)} name={t("Admin Auth", "Auth admin")} caption={t("bcrypt · in-memory Bearer", "bcrypt · Bearer en mémoire")} style={{ left: 350, top: 325, width: 200, height: 66 }} />
      <Node icon={fa(FaBell)} name="Notifications" caption={t("Resend email · Twilio SMS · .ics", "courriel Resend · SMS Twilio · .ics")} style={{ left: 570, top: 325, width: 200, height: 92 }} />
    </SchematicCanvas>
  );
}
