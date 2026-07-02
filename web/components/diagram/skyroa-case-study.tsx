import { SkyroaDiagram } from "./skyroa-diagram";
import { CaseStudyShell, Section, Mono, BulletList } from "./case-study-kit";

const ACCENT = "#4f46e5";

export function SkyroaCaseStudy() {
  return (
    <CaseStudyShell
      accent={ACCENT}
      title="Skyroa"
      lead={
        <>
          A regulated escrow platform for digital goods. Money is held, verified, and released under a compliance layer
          that lives in code, not a policy document.
        </>
      }
      meta={[
        { k: "CLIENT", v: "KCOH Software" },
        { k: "PLATFORM", v: "Web" },
        { k: "STACK", v: "React · NestJS · Postgres" },
        { k: "ROLE", v: "Product + Engineering" },
      ]}
      diagram={<SkyroaDiagram />}
    >
      <Section title="How it's connected">
        <p>
          Two React apps, a user app and an admin console, talk to one NestJS API on Railway over <Mono>REST</Mono>,
          with a WebSocket for live trade chat and notifications. Everything persists in a single Postgres database
          through Prisma. Stripe funds deposits; contracts are signed through Drafterie, our own e-signature API.
          Background jobs run on an in-process scheduler.
        </p>
      </Section>

      <Section title="Money is a ledger, not a column">
        <p>
          Balances are never a number on a user row. Every movement is a balanced double-entry transaction where debits
          equal credits, written atomically, and a running balance is derived from the ledger. Corrections are reversing
          entries, never edits. A reconciliation job proves the books tie out: platform funds equal user balances plus
          escrow plus fees.
        </p>
      </Section>

      <Section title="A state machine guards every dollar">
        <p>
          An escrow moves through an explicit state graph: created, contract signed, funded, in escrow, delivered,
          settled, with disputed and refunded branches. Each edge names who may trigger it and writes an audit row. Funds
          lock into an escrow account on funding and release to the seller, minus fee, only on a valid transition.
          Row-level locks and serializable transactions make concurrent attempts safe.
        </p>
      </Section>

      <Section title="Compliance, in code">
        <p>
          AML rules score every trade on velocity, unusual amounts, and structuring near the CAD $10,000 reporting line,
          and can flag, hold, or block. An append-only audit log with five-year retention and <Mono>FINTRAC</Mono>{" "}CSV
          exports back it. Card payments and e-signature are live; the bank-transfer and identity-verification rails are
          built to a provider interface and run against mocks until go-live.
        </p>
      </Section>

      <Section title="One database, and why that's right">
        <p>
          Money demands strong consistency, so the ledger, the state machine, and the locks all sit on one Postgres
          primary, with no cache or queue to fall out of sync. Redis was removed in favor of a Postgres key-value table.
          It is a vertically-scaled monolith; the first bottleneck is the per-trade reconciliation loops, which move to a
          durable job queue before horizontal scale, not before it is needed.
        </p>
      </Section>

      <Section title="Decisions worth noting">
        <BulletList
          accent={ACCENT}
          items={[
            "Double-entry ledger with a reconciliation invariant, the defensible core of any money system.",
            "Idempotency by state machine: an exact source state plus row locks; a durable key store is the next hardening step.",
            "We signed contracts with our own product, Drafterie, over a rate-limited API with a circuit breaker.",
          ]}
        />
      </Section>
    </CaseStudyShell>
  );
}
