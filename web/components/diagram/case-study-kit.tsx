import type { ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Case-study kit — the editorial frame around a schematic: Fraunces
 * headings, a monospace meta rail, terse prose, one brand accent.
 * Shared so every case study keeps the same restrained identity.
 * ------------------------------------------------------------------ */

export const CS_INK = "#16181d";
export const CS_BODY = "#3b414c";
export const CS_MUT = "#6b7280";
export const CS_HAIR = "#e6e8ec";

/** Inline monospace for a technical term in body prose (REST, SQL …). */
export function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono" style={{ fontSize: "0.9em", color: CS_INK }}>
      {children}
    </code>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginTop: 44 }}>
      <h2 className="font-serif" style={{ fontSize: 25, fontWeight: 600, color: CS_INK, letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      <div className="font-sans" style={{ marginTop: 12, fontSize: 16, lineHeight: 1.72, color: CS_BODY }}>
        {children}
      </div>
    </section>
  );
}

function MetaItem({ k, v }: { k: string; v: string }) {
  return (
    <span className="font-mono" style={{ fontSize: 11.5, letterSpacing: "0.02em" }}>
      <span style={{ color: CS_MUT }}>{k} </span>
      <span style={{ color: CS_INK }}>{v}</span>
    </span>
  );
}

/** Terse decision bullets with an accent dot. */
export function BulletList({ items, accent }: { items: ReactNode[]; accent: string }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((t, i) => (
        <li key={i} className="font-sans" style={{ display: "flex", gap: 12, marginTop: 12, fontSize: 16, lineHeight: 1.65, color: CS_BODY }}>
          <span style={{ marginTop: 10, height: 5, width: 5, flexShrink: 0, borderRadius: 999, background: accent }} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** The full case-study frame: eyebrow, serif title, lead, meta rail,
    centered schematic, then a measure-limited prose column. */
export function CaseStudyShell({
  eyebrow = "CASE STUDY",
  accent,
  title,
  lead,
  meta,
  diagram,
  children,
}: {
  eyebrow?: string;
  accent: string;
  title: string;
  lead: ReactNode;
  meta: { k: string; v: string }[];
  diagram: ReactNode;
  children: ReactNode;
}) {
  return (
    <article id="case-study" className="mx-auto w-full max-w-[1100px] px-6 py-24">
      <header>
        <div className="font-mono" style={{ fontSize: 12, letterSpacing: "0.22em", color: accent }}>
          {eyebrow}
        </div>
        <h1 className="font-serif" style={{ marginTop: 14, fontSize: 52, fontWeight: 600, color: CS_INK, letterSpacing: "-0.02em", lineHeight: 1.02 }}>
          {title}
        </h1>
        <p className="font-sans" style={{ marginTop: 16, maxWidth: 620, fontSize: 17, lineHeight: 1.6, color: CS_BODY }}>
          {lead}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-5" style={{ borderColor: CS_HAIR }}>
          {meta.map((m) => (
            <MetaItem key={m.k} k={m.k} v={m.v} />
          ))}
        </div>
      </header>

      <div className="mt-12 flex justify-center">{diagram}</div>

      <div className="mx-auto" style={{ maxWidth: 720 }}>
        {children}
      </div>
    </article>
  );
}
