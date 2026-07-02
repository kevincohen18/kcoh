import { ConcordiaConnectDiagram } from "./concordia-connect-diagram";
import { CaseStudyShell, Section, Mono, BulletList } from "./case-study-kit";

const MAROON = "#912338";

/** Case study: precise schematic on top, terse rationale below. */
export function ConcordiaCaseStudy() {
  return (
    <CaseStudyShell
      accent={MAROON}
      title="Concordia Connect"
      lead={
        <>
          A student network for Concordia University, on native iOS and the web. Directory, connections, events,
          the course catalog, and chat.
        </>
      }
      meta={[
        { k: "CLIENT", v: "Concordia University" },
        { k: "PLATFORM", v: "iOS + Web" },
        { k: "STACK", v: "Swift · React · Node · Postgres" },
        { k: "ROLE", v: "Design + Engineering" },
      ]}
      diagram={<ConcordiaConnectDiagram />}
    >
      <Section title="How it's connected">
        <p>
          iOS and web clients hit one Express API on Railway. Reads and writes go over <Mono>REST</Mono>. Chat runs on a
          WebSocket, so messages and read receipts land instantly. Postgres holds the data. Chat media goes straight to
          Cloudflare R2 through presigned URLs and never touches the API. A nightly cron loads Concordia&apos;s course
          catalog into Postgres.
        </p>
      </Section>

      <Section title="Why REST, not GraphQL">
        <p>
          The clients read fixed resources, so <Mono>REST</Mono>{" "}covers them with less to maintain and HTTP caching for
          free. Nothing here has the fan-out query problem that earns GraphQL&apos;s overhead. Chat is the one exception:
          it needs the server to push, so it runs on a WebSocket instead of polling.
        </p>
      </Section>

      <Section title="One database, no shards">
        <p>
          Postgres, single primary. The data is relational: the course-prerequisite graph alone needs real joins, and a
          campus fits inside one instance with headroom. Sharding is a cost we haven&apos;t earned yet.
        </p>
      </Section>

      <Section title="Scaling, when it's needed">
        <p>
          One API node and one database today. Reads outweigh writes about 20 to 1 and load stays light. The API runs
          single-instance because socket connections and rate-limit counters sit in memory. The first move at scale is a
          Redis adapter for Socket.IO, then more nodes behind a load balancer. Read replicas and a CDN on R2 come after.
          Message partitioning waits until past a million users.
        </p>
      </Section>

      <Section title="Decisions worth noting">
        <BulletList
          accent={MAROON}
          items={[
            "Monolith, not microservices. One team, one codebase, background work on node-cron.",
            "No passwords. Sign-in through Apple, Google, magic links, and passkeys; sessions revoke by bumping a version number.",
            "Uploads bypass the API. Clients push media straight to R2.",
          ]}
        />
      </Section>
    </CaseStudyShell>
  );
}
