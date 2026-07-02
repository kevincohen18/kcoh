import { AutoMedicDiagram } from "./automedic-diagram";
import { CaseStudyShell, Section, Mono, BulletList } from "./case-study-kit";

const ACCENT = "#16a34a";

export function AutoMedicCaseStudy() {
  return (
    <CaseStudyShell
      accent={ACCENT}
      title="AutoMedic"
      lead={
        <>
          A booking system for a mobile mechanic. Pick a service, pick a slot, get a confirmation. Double-booking is made
          impossible at the database.
        </>
      }
      meta={[
        { k: "CLIENT", v: "AutoMedic Québec" },
        { k: "PLATFORM", v: "Web" },
        { k: "STACK", v: "JS · Node · Postgres" },
        { k: "ROLE", v: "Design + Engineering" },
      ]}
      diagram={<AutoMedicDiagram />}
    >
      <Section title="How it's connected">
        <p>
          A static, bilingual site runs on Cloudflare Pages. The booking form posts to one Express API on Railway, which
          owns all state in a single Postgres database. A few Cloudflare Functions handle the admin proxy, analytics, and
          live Google reviews at the edge. Confirmations go out through Resend with a calendar invite, and optionally
          Twilio SMS.
        </p>
      </Section>

      <Section title="The whole job is not double-booking">
        <p>
          The one thing that must never happen is two bookings in the same slot, and that guarantee lives in the database,
          not the app. A partial unique index on <Mono>(date, slot)</Mono>{" "}for active bookings makes a duplicate
          physically impossible. The booking request runs in a transaction that locks the day&apos;s rows, checks for
          interval overlap against service durations, then inserts. A race loses at the index and returns a clean 409.
        </p>
      </Section>

      <Section title="Right-sized on purpose">
        <p>
          There is no mechanic-dispatch table, no queue, no cache, no realtime layer, because there is one operator and
          low-tens of bookings a week. Availability is a JSON config the owner edits from an admin page and the server
          caches for ten seconds. Anonymous bookings cancel through an unguessable link instead of accounts. Building
          less here is the senior decision.
        </p>
      </Section>

      <Section title="Edge where it's free, a server where it counts">
        <p>
          Static content, analytics, and reviews run on Cloudflare&apos;s edge at no cost and no cold-start. The booking
          brain stays a small always-on Express process so it can hold a connection pool and run row-locked transactions,
          the things serverless makes awkward.
        </p>
      </Section>

      <Section title="Decisions worth noting">
        <BulletList
          accent={ACCENT}
          items={[
            "Correctness at the database: the partial unique index is the source of truth, the locking transaction is the friendly first check.",
            "No payments in the app: checkout is handled by external links, keeping card data entirely out of scope.",
            "Bilingual EN/FR from one JSON content source, served static from the edge.",
          ]}
        />
      </Section>
    </CaseStudyShell>
  );
}
