import { SiReact, SiNestjs, SiPostgresql, SiRailway } from "react-icons/si";
import { FaLock, FaCoins, FaShieldAlt, FaPlug } from "react-icons/fa";
import { SchematicCanvas, Node, ContainerNode, CLabel, si, fa } from "./schematic-kit";

const W = 1100;
const H = 500;

/* Skyroa is regulated escrow: the honest shape is a MONEY PIPELINE, not a
   hub. Requests enter through the NestJS API (the real module container),
   then the accent money path runs along the top spine — API → Ledger &
   Escrow (the double-entry heart) → Compliance & AML (the gate) — while the
   ledger settles down into PostgreSQL (source of truth beneath the ledger).
   Compliance branches to Railway Disk (FINTRAC exports); Auth + Integrations
   are secondary and sit off the spine. */
export function SkyroaDiagram({ eyebrow, client = "Regulated escrow", locale = "en" }: { eyebrow?: string; client?: string; locale?: "en" | "fr" } = {}) {
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);
  return (
    <SchematicCanvas
      client={client}
      clientColor="#4f46e5"
      eyebrow={eyebrow}
      w={W}
      h={H}
      edges={[
        // clients → api
        { d: "M225,168 L285,168", accent: true },
        { d: "M225,250 L285,250", dashed: true },
        // money spine along the top: api → ledger → compliance (gate)
        { d: "M540,200 L592,200", accent: true },
        { d: "M797,200 L849,200", accent: true },
        // settlement: ledger commits down into postgres (beneath the ledger)
        { d: "M694.5,246 L694.5,360", accent: true },
        // compliance branches to fintrac exports
        { d: "M949,233 L949,360" },
        // secondary support, off the spine, up into the api
        { d: "M157.5,360 L157.5,320 L320,320 L320,284" },
        { d: "M425,360 L425,284" },
      ]}
    >
      <CLabel x={255} y={168} accent>REST</CLabel>
      <CLabel x={255} y={250}>WSS</CLabel>
      <CLabel x={566} y={200} accent>TXN</CLabel>
      <CLabel x={823} y={200} accent>{t("AML", "LBA")}</CLabel>
      <CLabel x={694.5} y={303} accent>SQL</CLabel>

      {/* clients */}
      <Node icon={si(SiReact)} name={t("User App", "App utilisateur")} caption="React · Vite" style={{ left: 40, top: 135, width: 185, height: 66 }} />
      <Node icon={si(SiReact)} name={t("Admin Console", "Console admin")} caption="React · Recharts" style={{ left: 40, top: 217, width: 185, height: 66 }} />

      {/* api — the real module container at the head of the pipeline */}
      <ContainerNode
        icon={si(SiNestjs, true)}
        name="NestJS API"
        caption="REST + WebSocket · Railway"
        chips={locale === "fr" ? ["transactions", "entiercement", "registre", "kyc", "litiges"] : ["trades", "escrow", "ledger", "kyc", "disputes"]}
        style={{ left: 285, top: 116, width: 255, height: 168 }}
      />

      {/* the heart: double-entry ledger + escrow state machine */}
      <Node icon={fa(FaCoins)} name={t("Ledger & Escrow", "Registre et entiercement")} caption={t("double-entry · escrow state machine", "partie double · machine à états d'entiercement")} style={{ left: 592, top: 154, width: 205, height: 92 }} />

      {/* the gate: money clears compliance before escrow releases */}
      <Node icon={fa(FaShieldAlt)} name={t("Compliance & AML", "Conformité et LBA")} caption={t("risk rules · FINTRAC audit", "règles de risque · audit CANAFE")} style={{ left: 849, top: 167, width: 200, height: 66 }} />

      {/* settlement + exports, downstream of the spine */}
      <Node icon={si(SiPostgresql)} name="PostgreSQL" caption={t("single primary · Prisma", "primaire unique · Prisma")} style={{ left: 574, top: 360, width: 241, height: 66 }} />
      <Node icon={si(SiRailway)} name={t("Railway Disk", "Disque Railway")} caption={t("FINTRAC exports · backups", "exports CANAFE · sauvegardes")} style={{ left: 849, top: 360, width: 200, height: 66 }} />

      {/* secondary — compact, out of the main spine */}
      <Node icon={fa(FaLock)} name={t("Authentication", "Authentification")} caption="JWT · TOTP · passkeys · RBAC" style={{ left: 40, top: 360, width: 235, height: 66 }} />
      <Node icon={fa(FaPlug)} name={t("Integrations", "Intégrations")} caption={t("Stripe · Drafterie e-sign · Resend", "Stripe · e-sign Drafterie · Resend")} style={{ left: 300, top: 360, width: 250, height: 66 }} />
    </SchematicCanvas>
  );
}
