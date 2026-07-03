import {
  SiNextdotjs,
  SiReact,
  SiVuedotjs,
  SiApple,
  SiAndroid,
  SiFlutter,
  SiCloudflare,
  SiVercel,
  SiRailway,
  SiNodedotjs,
  SiPython,
  SiGo,
  SiSocketdotio,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiRabbitmq,
  SiStripe,
  SiPaypal,
  SiSquare,
  SiSentry,
  SiGrafana,
  SiDatadog,
  SiGooglecloud,
  SiGraphql,
} from "react-icons/si";
import {
  ShowcaseCanvas,
  OptionNode,
  OptionChip,
  PLabel,
  FlowLegend,
  brandAccent,
  rgba,
  THEME,
  type Theme,
  type ThemeName,
  type EdgeSpec,
  type StackOpt,
} from "./flow-kit";

const W = 1280;
const H = 664;

/* "Compose your stack" — the same system shape, but every layer is a menu.
   The common default is highlighted; the alternatives are shown as also-
   supported. The typed flow-arrows say: whatever you pick, we wire it. */

type Locale = "en" | "fr";
const tr = (locale: Locale) => (en: string, fr: string) => (locale === "fr" ? fr : en);

function CoreNode({ t, locale, style }: { t: Theme; locale: Locale; style: React.CSSProperties }) {
  const x = tr(locale);
  const accent = t.flow.request.color;
  const runtime: StackOpt[] = [
    { Comp: SiNodedotjs, name: "Node.js", sel: true },
    { Comp: SiPython, name: "Python" },
    { Comp: SiGo, name: "Go" },
  ];
  const protocol: StackOpt[] = [
    { name: "REST", sel: true },
    { Comp: SiGraphql, name: "GraphQL" },
    { name: "gRPC" },
  ];
  return (
    <div
      className="absolute flex flex-col overflow-hidden rounded-xl"
      style={{
        background:
          t.name === "dark"
            ? `linear-gradient(${rgba(accent, 0.1)}, ${rgba(accent, 0.02)}), ${t.nodeBg}`
            : `linear-gradient(${rgba(accent, 0.05)}, ${rgba(accent, 0.02)}), #ffffff`,
        border: `1px solid ${rgba(accent, t.name === "dark" ? 0.55 : 0.45)}`,
        boxShadow:
          t.name === "dark"
            ? `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 44px -18px ${rgba(accent, 0.9)}, 0 20px 40px -22px rgba(0,0,0,0.7)`
            : `inset 0 1px 0 #ffffff, 0 2px 4px rgba(15,23,42,0.05), 0 20px 44px -20px ${rgba(accent, 0.5)}`,
        ...style,
      }}
    >
      <div style={{ padding: "15px 17px" }} className="flex flex-1 flex-col">
        <div className="flex items-center gap-2.5">
          {brandAccent(SiNodedotjs, accent, 19)}
          <span className="font-mono" style={{ fontSize: 15, fontWeight: 600, color: t.ink, letterSpacing: "-0.01em" }}>
            {x("API Layer", "Couche API")}
          </span>
        </div>
        <p className="font-sans" style={{ fontSize: 11.5, color: t.mut, marginTop: 4 }}>
          {x("Autoscaled · your language, your protocol", "Autoscalé · votre langage, votre protocole")}
        </p>

        <span className="font-mono uppercase" style={{ fontSize: 9.5, letterSpacing: "0.11em", color: t.faint, marginTop: 14 }}>
          {x("Runtime", "Runtime")}
        </span>
        <div className="flex flex-wrap" style={{ gap: 6, marginTop: 7 }}>
          {runtime.map((o) => (
            <OptionChip key={o.name} t={t} opt={o} accent={accent} />
          ))}
        </div>

        <span className="font-mono uppercase" style={{ fontSize: 9.5, letterSpacing: "0.11em", color: t.faint, marginTop: 12 }}>
          {x("Protocol", "Protocole")}
        </span>
        <div className="flex flex-wrap" style={{ gap: 6, marginTop: 7 }}>
          {protocol.map((o) => (
            <OptionChip key={o.name} t={t} opt={o} accent={accent} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function StackMap({ theme = "light", locale = "en" }: { theme?: ThemeName; locale?: Locale }) {
  const t = THEME[theme];
  const F = t.flow;
  const x = tr(locale);

  const edges: EdgeSpec[] = [
    // requests → hosting → core
    { d: "M284,148 L300,148 L300,208 L316,208", flow: "request" },
    { d: "M284,268 L300,268 L300,208 L316,208", flow: "request" },
    { d: "M530,208 L545,208 L545,226 L560,226", flow: "request", wide: true },
    // realtime (bidirectional WSS)
    { d: "M864,146 L940,146 L940,110 L1000,110", flow: "realtime" },
    { d: "M1000,120 L948,120 L948,158 L864,158", flow: "realtime" },
    // data fan-out
    { d: "M864,206 L940,206 L940,230 L1000,230", flow: "data", wide: true },
    { d: "M864,246 L962,246 L962,344 L1000,344", flow: "data" },
    { d: "M864,286 L926,286 L926,454 L1000,454", flow: "data" },
    // async → queue
    { d: "M712,336 L712,392", flow: "event" },
    // external → payments
    { d: "M864,318 L900,318 L900,568 L1000,568", flow: "external" },
    // telemetry → observability
    { d: "M560,300 L540,300 L540,440 L284,440", flow: "telemetry" },
  ];

  const mk = (name: string, sel: boolean, Comp?: StackOpt["Comp"]): StackOpt => ({ name, sel, Comp });

  return (
    <ShowcaseCanvas t={t} w={W} h={H} eyebrow={x("COMPOSE YOUR STACK · WE WIRE IT TOGETHER", "COMPOSEZ VOTRE STACK · ON L'ASSEMBLE")} edges={edges}>
      <PLabel t={t} x={545} y={188} flow="request">API</PLabel>
      <PLabel t={t} x={940} y={128} flow="realtime">WSS</PLabel>
      <PLabel t={t} x={938} y={214} flow="data">SQL</PLabel>
      <PLabel t={t} x={712} y={364} flow="event">QUEUE</PLabel>
      <PLabel t={t} x={900} y={430} flow="external">{x("3rd-party", "externe")}</PLabel>

      {/* clients */}
      <OptionNode t={t} category={x("Frontend", "Interface web")} rail={F.request.color} options={[mk("Next.js", true, SiNextdotjs), mk("React", false, SiReact), mk("Vue", false, SiVuedotjs)]} style={{ left: 40, top: 96, width: 244, height: 104 }} />
      <OptionNode t={t} category={x("Mobile", "Mobile")} rail={F.request.color} options={[mk("iOS", true, SiApple), mk("Android", false, SiAndroid), mk("Flutter", false, SiFlutter)]} style={{ left: 40, top: 216, width: 244, height: 104 }} />

      {/* edge / hosting */}
      <OptionNode t={t} category={x("Hosting · Edge · CDN", "Hébergement · Edge · CDN")} rail={F.request.color} options={[mk("Cloudflare", true, SiCloudflare), mk("Vercel", false, SiVercel), mk("Railway", false, SiRailway)]} style={{ left: 316, top: 150, width: 214, height: 116 }} />

      {/* core */}
      <CoreNode t={t} locale={locale} style={{ left: 560, top: 116, width: 304, height: 220 }} />

      {/* realtime */}
      <OptionNode t={t} category={x("Realtime", "Temps réel")} rail={F.realtime.color} options={[mk("Socket.IO", true, SiSocketdotio), mk("Pusher", false), mk("Ably", false)]} style={{ left: 1000, top: 66, width: 240, height: 92 }} />

      {/* data */}
      <OptionNode t={t} category={x("Database", "Base de données")} rail={F.data.color} options={[mk("PostgreSQL", true, SiPostgresql), mk("MySQL", false, SiMysql), mk("MongoDB", false, SiMongodb)]} style={{ left: 1000, top: 178, width: 240, height: 104 }} />
      <OptionNode t={t} category={x("Cache", "Cache")} rail={F.data.color} options={[mk("Redis", true, SiRedis), mk("Memcached", false)]} style={{ left: 1000, top: 298, width: 240, height: 92 }} />
      <OptionNode t={t} category={x("Object storage", "Stockage objet")} rail={F.data.color} options={[mk("R2", true, SiCloudflare), mk("S3", false), mk("GCS", false, SiGooglecloud)]} style={{ left: 1000, top: 406, width: 240, height: 96 }} />

      {/* workers */}
      <OptionNode t={t} category={x("Queue · Jobs", "File · Tâches")} rail={F.event.color} options={[mk("BullMQ", true), mk("RabbitMQ", false, SiRabbitmq), mk("SQS", false)]} style={{ left: 560, top: 392, width: 304, height: 96 }} />

      {/* payments / integrations */}
      <OptionNode t={t} category={x("Payments", "Paiements")} rail={F.external.color} options={[mk("Stripe", true, SiStripe), mk("PayPal", false, SiPaypal), mk("Square", false, SiSquare)]} style={{ left: 1000, top: 520, width: 240, height: 96 }} />

      {/* observability */}
      <OptionNode t={t} category={x("Observability", "Observabilité")} rail={F.telemetry.color} options={[mk("Sentry", true, SiSentry), mk("Grafana", false, SiGrafana), mk("Datadog", false, SiDatadog)]} style={{ left: 40, top: 392, width: 244, height: 96 }} />

      <FlowLegend t={t} keys={["request", "realtime", "data", "event", "external", "telemetry"]} style={{ left: 40, top: 586 }} />

      {/* selected-vs-supported key */}
      <div
        className="absolute flex items-center gap-4 font-mono"
        style={{ left: 44, top: 628, fontSize: 10.5, color: t.mut }}
      >
        <span className="flex items-center gap-1.5">
          <span style={{ width: 9, height: 9, borderRadius: 3, background: rgba(F.request.color, t.name === "dark" ? 0.16 : 0.09), border: `1px solid ${rgba(F.request.color, 0.5)}` }} />
          {x("what we usually pick", "notre choix par défaut")}
        </span>
        <span className="flex items-center gap-1.5">
          <span style={{ width: 9, height: 9, borderRadius: 3, border: t.name === "dark" ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(15,23,42,0.14)" }} />
          {x("also supported", "aussi pris en charge")}
        </span>
      </div>
    </ShowcaseCanvas>
  );
}
