import { DrafterieDiagram } from "./drafterie-diagram";
import { CaseStudyShell, Section, Mono, BulletList } from "./case-study-kit";

const ACCENT = "#6e63ff";

export function DrafterieCaseStudy() {
  return (
    <CaseStudyShell
      accent={ACCENT}
      title="Drafterie"
      lead={
        <>
          An e-signature platform where every signed contract carries court-ready proof. One Node service runs the web
          app, a developer API, and the signing pipeline.
        </>
      }
      meta={[
        { k: "CLIENT", v: "KCOH Software" },
        { k: "PLATFORM", v: "Web + API" },
        { k: "STACK", v: "React · Node · Postgres" },
        { k: "ROLE", v: "Product + Engineering" },
      ]}
      diagram={<DrafterieDiagram />}
    >
      <Section title="How it's connected">
        <p>
          A React/Vite SPA ships from a Cloudflare Worker at the edge; at runtime it calls one Express API on Railway over{" "}
          <Mono>REST</Mono>. Contract bodies live in Postgres, encrypted with <Mono>AES-256-GCM</Mono>. Uploaded logos and
          generated PDFs sit on a Railway volume. Stripe handles billing, Resend sends mail. There is no second service.
        </p>
      </Section>

      <Section title="Why REST, and one process">
        <p>
          The surface is CRUD: contracts, signatures, invoices, clients. <Mono>REST</Mono>{" "}fits it with less to run and
          free HTTP caching, so there is no reason to reach for GraphQL. Reminders, webhook retries, and the email queue
          run as in-process workers on timers, and idempotency is a Postgres table. A monolith on purpose:
          one codebase, easy to keep consistent.
        </p>
      </Section>

      <Section title="The real work: tamper-evidence">
        <p>
          Signing is the hard part, and it is done properly. Each signature is captured with its context and sealed with
          an <Mono>HMAC-SHA256</Mono>{" "}proof. Every contract event appends to a keyed hash chain, so altering any past
          event breaks the chain and is detectable, even by someone with database access. On request the server assembles
          a court-ready evidence bundle: the sealed PDF, an integrity manifest, the event chronology, and the signer&apos;s
          consent record.
        </p>
      </Section>

      <Section title="One database, strong consistency">
        <p>
          Postgres, single primary. Signing, billing, and the audit chain all have to be correct under concurrency, so
          they run as transactions on one strongly-consistent store. There are no replicas or queues to reconcile against,
          which is exactly what a legal-evidence product wants. Dashboards and document lists are the read-heavy hot path
          and are covered by indexes.
        </p>
      </Section>

      <Section title="Decisions worth noting">
        <BulletList
          accent={ACCENT}
          items={[
            "Split hosting on purpose: the SPA on Cloudflare's edge, the stateful API and database on Railway.",
            "Encryption favors recovery: AES-256-GCM with a versioned key-ring, no external KMS to depend on.",
            "Passwordless-capable auth: bcrypt plus TOTP and passkeys, with one-tap session revocation.",
          ]}
        />
      </Section>
    </CaseStudyShell>
  );
}
