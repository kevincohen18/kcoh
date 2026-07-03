import { SiReact, SiNodedotjs, SiPostgresql, SiRailway } from "react-icons/si";
import { FaKey, FaLock, FaShieldAlt, FaPlug, FaClock } from "react-icons/fa";
import { SchematicCanvas, Node, ContainerNode, CLabel, si, fa } from "./schematic-kit";

const W = 1100;
const H = 540;

export function DrafterieDiagram({ eyebrow, client = "Legal · e-signature", locale = "en" }: { eyebrow?: string; client?: string; locale?: "en" | "fr" } = {}) {
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);
  return (
    <SchematicCanvas
      client={client}
      clientColor="#6e63ff"
      eyebrow={eyebrow}
      w={W}
      h={H}
      edges={[
        // clients → api — the signed-document conveyor starts here
        { d: "M247,133 L287,133", accent: true },
        { d: "M247,238 L287,238" },
        // api → signature & audit → sealed PDF storage — tamper-evidence conveyor, left to right
        { d: "M567,185 L607,185", accent: true },
        { d: "M842,185 L880,185", accent: true },
        // api → postgres, source of truth directly beneath
        { d: "M427,272 L427,310" },
        // api → secondary support cluster, routed around postgres
        { d: "M427,272 L427,295 L250,295 L250,395 M157.5,395 L667.5,395", arrow: false },
        { d: "M157.5,395 L157.5,410" },
        { d: "M412.5,395 L412.5,410" },
        { d: "M667.5,395 L667.5,410" },
      ]}
    >
      <CLabel x={267} y={133} accent>REST</CLabel>
      <CLabel x={587} y={185} accent>{t("SIGN", "SIGNER")}</CLabel>
      <CLabel x={861} y={185} accent>{t("SEAL", "SCELLER")}</CLabel>
      <CLabel x={427} y={293}>SQL</CLabel>

      {/* clients feed the pipeline */}
      <Node icon={si(SiReact)} name="Web SPA" caption={t("React · Vite · Cloudflare edge", "React · Vite · périphérie Cloudflare")} style={{ left: 40, top: 100, width: 207, height: 66 }} />
      <Node icon={fa(FaKey)} name={t("Developer Portal", "Portail développeur")} caption={t("API keys · REST", "clés API · REST")} style={{ left: 40, top: 205, width: 207, height: 66 }} />

      {/* orchestrator */}
      <ContainerNode
        icon={si(SiNodedotjs, true)}
        name="Express API"
        caption="REST · Railway"
        chips={locale === "fr" ? ["contrats", "signatures", "factures", "devis", "paiements"] : ["contracts", "signatures", "invoices", "quotes", "payments"]}
        style={{ left: 287, top: 98, width: 280, height: 174 }}
      />

      {/* the tamper-evidence chain: sign → seal, reading left to right */}
      <Node icon={fa(FaShieldAlt)} name={t("Signature & Audit", "Signature et audit")} caption={t("HMAC proof · hash-chained log · sealed PDF", "preuve HMAC · journal chaîné par hachage · PDF scellé")} style={{ left: 607, top: 139, width: 235, height: 92 }} />
      <Node icon={si(SiRailway)} name="Railway Volume" caption={t("logos · sealed PDFs", "logos · PDF scellés")} style={{ left: 880, top: 152, width: 170, height: 66 }} />

      {/* source of truth, directly beneath the api */}
      <Node icon={si(SiPostgresql)} name="PostgreSQL" caption={t("primary · AES-256-GCM", "primaire · AES-256-GCM")} style={{ left: 287, top: 310, width: 280, height: 66 }} />

      {/* secondary support, clustered compactly out of the pipeline's way */}
      <Node icon={fa(FaLock)} name={t("Authentication", "Authentification")} caption="JWT · bcrypt · TOTP · passkeys" style={{ left: 40, top: 410, width: 235, height: 92 }} />
      <Node icon={fa(FaPlug)} name={t("Integrations", "Intégrations")} caption="Stripe · Resend · Sentry" style={{ left: 295, top: 410, width: 235, height: 92 }} />
      <Node icon={fa(FaClock)} name={t("Background Jobs", "Tâches d'arrière-plan")} caption={t("in-process workers · webhook retry", "workers en processus · relance webhook")} style={{ left: 550, top: 410, width: 235, height: 92 }} />
    </SchematicCanvas>
  );
}
