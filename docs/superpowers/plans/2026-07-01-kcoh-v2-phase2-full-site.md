# KCOH v2 Phase 2 — Full Business Site Implementation Plan
> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Take the Phase 1 beta (homepage ~70% complete, no subpages, no contact backend) to a complete, launch-ready business website: nothing dead-ends, every nav route is a real page, interactivity is felt everywhere, and the whole site reads as designed-by-one-hand — professional, modern, explicitly not AI-template. Signature move: per-project-colored live dashboard compositions on case-study pages ("Deepen the system").

**Architecture:** Next.js 16 App Router static export (`output: "export"`) served on Cloudflare Pages; the ONLY server runtime is the Cloudflare Pages Function `web/functions/api/contact.ts` (Turnstile server verify + Resend REST send). Per-project color identity via a CSS custom-property override wrapper (`ProjectTheme` sets `--brand` and a derived `--highlight` inline) so every existing chart, eyebrow, and link recolors with zero component changes while global UI stays violet. All new pages compose the existing Phase 1 design-system primitives (`Container`, `SectionLabel`, `Reveal`, `ScaledPreview`, the dashboard chart library) plus four new pinned primitives (`PageHero`, `CTASection`, `FaqAccordion`, `LogoRow`). The playable `/dashboard` demo is client-only and code-split via `next/dynamic` with `ssr: false` so it never weighs page one. Case routes ship via `generateStaticParams()` with `dynamicParams: false`; legacy v1 URLs 301 via `web/public/_redirects`.

**Tech Stack:** Next.js 16.2.x + React 19 + TypeScript; Tailwind CSS v4 token system (dual theme via `.dark` CSS variables); shadcn/Radix primitives; `motion` (`motion/react`) springs; vitest for all pure logic; Cloudflare Pages + Wrangler ^4.59.0; Cloudflare Turnstile + Resend REST for the contact form; `@calcom/embed-react@^1.5.3` + `@marsidev/react-turnstile@^1.5.3`; lucide-react icons; next-themes; Fraunces (serif display) + Geist/Geist Mono fonts, self-hosted.

**Sources merged:** approved spec `docs/superpowers/specs/2026-07-01-kcoh-v2-phase2-full-site-design.md`; API reference `web/plan-refs/api-reference.md`; workstream section files A–H (locations listed under Harmonizations). All eight workstream section files (A–H) were present — **no GAP sections required**.

## Global Constraints (spec-wide — apply to every task)

- **Stack pins (Phase 1, carried forward unchanged):** Next.js 16.2.x App Router with `output: "export"`, `images.unoptimized: true`, `trailingSlash: true`. Static export only — **no server runtime of any kind except Cloudflare Pages Functions** (`web/functions/api/contact.ts` is the sole permitted server code, deployed automatically from `web/functions/`).
- **`"use client"` rules:** pages and composition sections stay server components; the directive appears only in leaf components that need state/effects/browser APIs (forms, hooks, ticking previews, motion wrappers). Never add it to a file that does not need it.
- **Fonts:** Fraunces (serif display) + Geist (sans) + Geist Mono, self-hosted via the existing Phase 1 setup. No font CDNs.
- **Color discipline:** violet `#6E63FF` — and every per-project accent (Concordia burgundy `#8b1d3f`, Skyroa indigo `#4f46e5`, AutoMedic green `#16a34a`) — is an accent ONLY: text, eyebrows, chart strokes, thin underlines, low-opacity radial glows, ≤12%-alpha tints. **Never a large fill.** For SMALL text (≤ ~14px: eyebrows, taglines, status tints, small links) the accent is always applied through the AA-derived `--brand-text` token / `text-brand-text` utility (Task 7) — the raw accent hexes fail WCAG AA at those sizes (e.g. burgundy 2.25:1 on the dark bg); raw `--brand`/`text-brand` is reserved for graphics, chart strokes, and large text.
- **Motion:** every animation ≤400ms, once-per-scroll, springs over easings, gated by the existing `useReducedMotion()` hook; cursor-driven effects are disabled on touch/coarse pointers. Discrete data ticks are state updates (not timed animations) but also stop entirely under reduced motion.
- **Accessibility:** WCAG AA contrast in BOTH themes; full keyboard operability (accordion, tabs, form, demo sidebar, sortable table); visible `focus-visible` rings; the reduced-motion path is exercised in verification.
- **Performance:** Lighthouse ≥95 in all four categories on every route; the `/dashboard` demo is code-split and never weighs page one; images pre-optimized; fonts already self-hosted.
- **Copy:** the product spelling is **Drafterie** everywhere (never "Draftery"/"Draftory" — the live domain fact `draftory.ca` stays lowercase as a fact); restrained editorial voice; facts verbatim from the facts inventory — no invented metrics (dashboard sample UI data like `$128,430`/`INV-2026-00x` is the established sample-data convention, never a claim); no em-dashes in new copy (the one spec-verbatim framing sentence on `/dashboard` is the sanctioned exception).
- **Contact stack:** Cloudflare Turnstile public TEST keys are the documented defaults everywhere until Kevin provides real ones — site key `1x00000000000000000000AA` (always passes), secret `1x0000000000000000000000000000000AA` (always passes). Real keys arrive via `NEXT_PUBLIC_TURNSTILE_SITE_KEY` at build time and encrypted Pages secrets `RESEND_API_KEY` / `TURNSTILE_SECRET_KEY` at runtime. Secrets are never committed, echoed, or logged.
- **Deploy:** the workflow is localhost preview → Kevin approves → production deploy via Wrangler (no auto-cutover). **Production deploy (`npm run deploy` / `wrangler pages deploy`) runs ONLY on Kevin's explicit approval — the plan ends with a hard STOP (Task 66). Legacy v1 files at the repo root remain untouched until the approved cutover.**
- Every task ends in its own conventional commit; every code step contains complete file contents or exact before/after diffs; verification (build, tests, dual-theme + 360px/1440px screenshots, reduced-motion checks) precedes every commit.

## Waves

Tasks are renumbered 1–66 in wave order; the original workstream ID is kept in parentheses in every task heading. Within each wave, tasks are ordered so nothing consumes an interface before it exists — execute in the listed order (tasks with no mutual dependency may be parallelized by the orchestrator, respecting the noted prerequisites).

**Wave 1 — Foundations (Tasks 1–15):** shared primitives, pure helpers, hooks, and installs everything else consumes.
- Tasks 1–6 (A1–A6): nav real routes; `PageHero`; `LogoRow` + homepage Technologies; `FaqAccordion` + homepage FAQ; `CTASection` + homepage final CTA; four-column footer.
- Task 7 (B1): `ProjectTheme` accent-override mechanism. Task 8 (B2): `tickSeries` (TDD).
- Task 9 (E1): install `@calcom/embed-react` + `@marsidev/react-turnstile`. Task 10 (E2): pure `contact-validation` module (TDD).
- Tasks 11–15 (G1–G5): `useTilt` (TDD); `Tilt` wrapper + hero tilt + hero "Explore the live demo →" link; `Magnetic` (TDD) + hero CTAs; chart `animateIn` on all four charts (must land before B's mini-previews); `usePointerGlow` (TDD).

**Wave 2 — Pages & features (Tasks 16–46):**
- Tasks 16–18 (C1–C3): case-study logo assets; `case-studies.ts` content module (TDD — **unblocks Task 19**); `outcomeToMetric` (TDD).
- Tasks 19–20 (B3–B4): `ProjectMiniPreview` (requires Task 17); Featured Work rebuild into two-across live cards.
- Tasks 21–24 (C4–C7): `/work/` index; `CaseHero` (tilt via G2's `Tilt` — no duplicate wrapper); case body sections + pager; `/work/[slug]/` routes.
- Tasks 25–30 (D1–D6): services/engagement content; `WorkflowFeed` (TDD); `RevenueMiniChart` + `ServiceBlock`; `/services/` page; about content; `/about/` page.
- Tasks 31–35 (E3–E7): contact Pages Function; `ContactForm`; `CalEmbed`; `/contact/` page; final `_headers` CSP + browser E2E.
- Tasks 36–46 (F1–F11): demo data/sort/ticker/hover logic (TDD); `useTicker`; tooltip charts; demo sidebar + screens; demo shell + code-split loader; `/dashboard` page rewrite.

**Wave 3 — Cross-cutting polish (Tasks 47–53):** G application tasks, each a wrapper-level edit on a Wave 1/2 artifact.
- Task 47 (G6): nav active-route indicator — canonical final `nav.tsx` (after Tasks 1 and 34).
- Task 48 (G7): page-mount fade-rise via `app/template.tsx`.
- Task 49 (G8): Magnetic on `CTASection` button (after Task 5). Task 50 (G9): Magnetic on contact submit (after Task 32).
- Task 51 (G10): case-hero tilt — **verification only**; already delivered by Task 22's use of G2's `Tilt` inside `CaseHero` (see merge note).
- Task 52 (G11): pointer glow on featured-work cards (after Task 20). Task 53 (G12): pointer glow on `/work` index rows (after Task 21).

**Wave 4 — Deploy + SEO + final QA (Tasks 54–66):**
- Tasks 54–60 (H1–H7): `wrangler.toml` + preview/deploy scripts; `_redirects`; branded 404; `pageMetadata` helper + pattern rollout; Organization JSON-LD; sitemap for all 10 routes (6 static including `/dashboard/` + 4 case studies); README runbook.
- Tasks 61–66 (H8–H13): FINAL QA WAVE — clean build + artifact inventory; full a11y gate; 44-screenshot dual-theme/dual-width review; `wrangler pages dev` E2E (form, redirects, headers, 404); Lighthouse ≥95; present preview to Kevin and **STOP** (no production deploy without explicit approval).

## Harmonizations Applied

Source section files: A/B/C/E/G/H at `plan-sections/section-{A,B,C,E,G,H}.md`, D at `web/plan-sections/section-D.md`, F at `docs/superpowers/plans/plan-sections/section-F.md` (B and F had noted their task prompts supplied an `undefined` base path; this merged plan similarly received an `undefined` output path and is written to `docs/superpowers/plans/2026-07-01-kcoh-v2-phase2-full-site.md`, sibling of the Phase 1 plan).

1. **B3's prerequisite reference corrected (Task 19):** Section B gates the mini-preview on "Workstream C, Task C1", but the file it needs (`web/content/case-studies.ts`) is created by C's Task C2. In this plan that is **Task 17**; Task 16 (C1) is the logo-asset copy. Inline merge note added.
2. **G10 superseded → verification-only (Task 51); C5's duplicate tilt wrapper removed (Task 22):** G's published contract 2 expected the case-hero composition to live bare in `web/app/work/[slug]/page.tsx` for G10 to wrap in `<Tilt>` — that markup never exists verbatim (C7's page renders `<CaseHero study={study} />`), so G10's exact-match edit could never apply, and executing it improvised would double-wrap the hero in two tilt handlers. Resolution: `CaseHero` (Task 22, C5) applies the tilt itself by consuming **G2's `Tilt` from `@/components/site/tilt`** (Task 22 therefore depends on G2, not just G1; the near-identical `TiltFrame` wrapper C5 originally planned is NOT created), with `ProjectTheme` applied at page level (Task 24, C7) — functionally equivalent recoloring and tilt. Task 51 skips its edit steps (no double-wrap) and runs its browser verification only. Inline merge notes added to Tasks 22, 24, and 51, and to G's published contract 2.
3. **G11 client-boundary reconciliation (Task 52):** B4 (Task 20) builds `FeatureCard` inline in `web/components/sections/featured-work.tsx` as a **server** component, while G's glow contract requires a `"use client"` file — calling `usePointerGlow()` there without the directive fails the static-export build with a hooks-in-Server-Component error. Task 52's **Step 1 is an explicit edit step** that prepends `"use client"` as the file's first line (all imports are client-safe; alternatively factor `FeatureCard` into its own client file), before the glow additions land on the card root `<Link>` (adding `relative overflow-hidden`). B4 carries a forward note.
4. **G12 target file named (Task 53):** C4 (Task 21) factored the `/work` row into `web/components/work/feature-row.tsx` (server component). Task 53's merge note directs the four glow additions there, adding `"use client"` as anticipated by G's own fallback wording.
5. **G6/G9 ownership attribution fixed (Tasks 47, 50):** Section G attributed the `/contact` route and contact form to "workstream F"; both are owned by Workstream E (Tasks 34 and 32; form path `web/components/contact/contact-form.tsx` matches G's expectation exactly). Inline merge notes added, including the exact submit-button markup Task 50 wraps.
6. **H4 dashboard-metadata before-block updated (Task 57):** F11 (Task 46) rewrites `/dashboard`'s metadata to `title: "Live Demo"` with a new description; H4's replacement is applied to that actual block (keeping F11's title/description, adding `path: "/dashboard/"`). Inline merge note added.
7. **H4 `pageMetadata` pattern rollout extended (Task 57):** H pins `pageMetadata(...)` as REQUIRED for every page, but the Wave 2 pages (C4, C7, D4, D6, E6, F11) run before `web/lib/seo.ts` exists and ship with inline `Metadata` objects (E6's `/contact/` lacking a canonical). Task 57's **Step 6b** migrates `/services/`, `/about/`, `/contact/`, `/work/` to `pageMetadata({...})` with exact before/after blocks reusing their existing titles/descriptions, and has `/work/[slug]/`'s `generateMetadata` return `pageMetadata({ title: study.name, description: study.oneLiner, path: \`/work/${study.slug}/\` })`. The H preamble's "must export via `pageMetadata`" contract carries a matching merge correction (ship inline first, migrate in Task 57).
8. **Same-file edit sequencing (no content changes needed):** `web/app/page.tsx` is progressively rewritten by Tasks 3→4→5 (A3→A4→A5, full contents each time) and then only touched by Task 57 (H4, adds the canonical block — applies cleanly to A5's final version); `web/components/site/nav.tsx` is written by Task 1 (A1) and intentionally superseded by Task 47 (G6), the canonical final version (as section G itself declares); `web/components/sections/hero.tsx` is edited by Task 12 then Task 13 in order (G2's before-block, then G3's before-block against the post-G2 file); `web/components/site/cta-section.tsx` created by Task 5, wrapper-edited by Task 49 (G8, per G's published contract 1 — A5's button markup matches it byte-for-byte); `web/public/_headers` is owned solely by Task 35 (E7); `web/package.json` gains runtime deps in Task 9 (E1) and devDeps/scripts in Task 54 (H1) — non-overlapping keys, merge note added to Task 54.
9. **G4 scheduled into Wave 1 (Task 14):** per section G's own note ("land it before B's mini-preview tasks"), so `animateIn` exists before Tasks 19–20 and 36–46 render charts. B's `ProjectMiniPreview` passes no `animateIn`; the default `true` is the intended behavior — merge note added.
10. **H1–H3 scheduled into Wave 4:** section H allows them "any early wave", but nothing in Waves 1–3 depends on them (Tasks 31/35 invoke `npx wrangler@4 pages dev` directly, which needs no `wrangler.toml` or devDependency), so they stay with their workstream in Wave 4 per the merged wave structure.
11. **H8 QA-suite inventory extended (Task 61):** the QA-log template names only the Phase 1 + H suites; a merge note lists the full set of vitest suites that must be green by Wave 4 (tick, case-studies, case-metrics, workflow-feed, demo-data/sort/ticker/hover, use-tilt, magnetic, use-pointer-glow, active-route, contact-validation, seo, sitemap).
12. **No duplicated installs or asset copies found:** E1 (Task 9) is the only npm-install of the contact packages; H1 (Task 54) is the only wrangler install; C1 (Task 16) is the only logo-asset copy. Nothing to dedupe.

---
## Workstream Context & Pinned Contracts (verbatim from the section files)

The eight workstream preambles below are reproduced verbatim (headings demoted one/two levels). They carry the pinned cross-workstream contracts, copy/facts rules, and dependency notes that every task references. Where a preamble's own wave/ordering advice differs from this plan's Waves section, the Waves section governs (see Harmonizations).

### Workstream A — Homepage completion + shared primitives

**Owns:** `PageHero`, `CTASection`, `FaqAccordion`, `LogoRow` (pinned cross-workstream signatures); homepage Technologies row, FAQ section, Final CTA section; the expanded 4-column footer; real-route nav wiring (`web/content/nav.ts` + `web/components/site/nav.tsx`).
**Does NOT own:** the Featured Work rebuild (workstream B), `ProjectTheme`/mini-previews (B), case-study content/routes (C), tilt/magnetic hooks (G).

**Final homepage section order after this workstream** (per Phase 1 spec §7 merged with Phase 2 spec §4; Testimonial stays where the current page has it):
`Hero → Metrics → FeaturedWork → Testimonial → HowWeWork → Services → Founder → Technologies → Faq → CTASection`.

**Dependency notes for the orchestrator:**
- Tasks A1–A6 consume nothing from other workstreams — this whole workstream can run in the first wave.
- Task A2 (`PageHero`), A3 (`LogoRow`), A5 (`CTASection`) produce pinned contracts consumed by workstreams B, C, D, E — schedule them before those workstreams' page-composition tasks.
- Task A1 changes nav routes to `/services/`, `/work/`, `/about/`, `/contact/`. Until the owning workstreams ship those pages, the links 404 — expected mid-plan state; verification below asserts `href` values, not navigation success.
- Task A6 (footer) links to `/work/<slug>/` for the four featured projects using the existing `featuredProjects` export from `web/content/projects.ts` (slugs already exactly match `CaseSlug`) — no dependency on workstream C's `case-studies.ts`.

All file paths below are relative to the repo root `/Users/kevincohen/Desktop/KCOH Software Inc./`. All build/dev commands run inside `web/`.

---

---

### Workstream B — Featured Work rebuild + per-project mini-previews

**Owns:** `ProjectTheme` (the per-project accent override mechanism), `ProjectMiniPreview` (four live dashboard vignettes built only from existing chart primitives), the `tickSeries` pure helper that powers hover ticking, and the rebuild of `web/components/sections/featured-work.tsx` into two-across feature cards linking to `/work/<slug>/`.

**Spec anchors:** Phase 2 spec §4.1 (Featured Work rebuilt — two-across cards, brand-color border glow, eyebrow, live mini-preview, hover animates, links to case pages), §5 (per-project color mechanism = CSS custom-property override; global UI stays violet), §9 (mini-preview ticks while hovered; all motion sub-400ms, gated by `useReducedMotion`, off on touch).

**Accent hexes (exact, stated per brief):**

| Project | Accent | Source |
|---|---|---|
| Concordia Connect | `#8b1d3f` (burgundy) | `web/content/projects.ts` + facts inventory §1 |
| Drafterie | `#6e63ff` (violet — same as site accent) | `web/content/projects.ts` |
| Skyroa | `#4f46e5` (indigo) | chosen = the existing design-system value already in `web/content/projects.ts` and `OverviewDashboard`'s `topProjects` |
| AutoMedic | `#16a34a` (green) | chosen = the existing design-system value already in `web/content/projects.ts` (matches v1 portfolio's `rgba(22,163,74,0.08)`) |

**Copy/facts rules applied:** Mini-preview numbers ("1,284 messages", "$46,120", "42 bookings") are dashboard **sample UI data** — the same established convention as `OverviewDashboard`'s `$128,430` / `INV-2026-00x` (Phase 1 spec §3, reproduced in facts inventory §1). They are product-screen decoration, never claims. Real verified facts are used where facts exist: Drafterie "8 contract types" (v1 verbatim), Skyroa "FINTRAC-aligned" / KYC / escrow / dispute vocabulary (v1 verbatim), AutoMedic "No double-books" (from v1 verbatim "no double-books, no race conditions"), Concordia realtime-chat/community framing (Phase 1 spec). Section heading reuses the verified v1 trust line verbatim: "Everything shown here was built, shipped, and operated in production." No accent is ever used as a large fill — accents appear only as chart strokes, ≤30%-opacity chart gradients (existing primitives' own behavior), text, dots, and 12%-alpha logo chips (`${color}1f`).

**Cross-workstream position:** B1 and B2 have zero dependencies and can run in any wave. B3 consumes `CaseSlug` from `web/content/case-studies.ts` (Task C2 — **Task 17** in this plan; C1/Task 16 only copies logo PNGs and creates no TypeScript) — **do not start B3 before C2 (Task 17) has landed.** B4 depends on B3. Workstreams A and C consume `ProjectTheme` and `ProjectMiniPreview` exactly as produced here. Card links target `/work/<slug>/` (routes owned by C); until C's routes land those links 404 — expected and noted in B4's verification.

---

---

### Workstream C — Work Index + Case-Study Pages

**Scope:** `web/content/case-studies.ts` (pinned contract, owner: C), the `/work/` index page, the `/work/[slug]/` template (four static instances), all supporting `web/components/work/` sections, and per-page metadata. All copy is drafted from verified facts in `plan-refs/facts-inventory.md`; conflicts and unverified items are flagged in code comments for Kevin's fact-check pass (Phase 2 spec, open item 3).

**Produces (consumed by other workstreams):**

```ts
// web/content/case-studies.ts  (pinned contract — B's ProjectMiniPreview imports CaseSlug)
export type CaseSlug = "concordia-connect" | "drafterie" | "skyroa" | "automedic";
export type CaseStudy = { slug: CaseSlug; name: string; accent: string; tagline: string; oneLiner: string; factChips: [string, string, string]; problem: string[]; system: { title: string; body: string }[]; outcomes: { value: string; label: string }[]; stack: string[]; logoSrc: string };
export const caseStudies: CaseStudy[];
export function getCaseStudy(slug: CaseSlug): CaseStudy;
export function nextCaseStudy(slug: CaseSlug): CaseStudy;   // C-internal extra (C owns this file)

// web/lib/case-metrics.ts
export function outcomeToMetric(value: string, label: string): Metric;
```

**Consumes (pinned contracts from other workstreams — do NOT redefine):**

- `PageHero({ eyebrow, title, intro, children })` from `web/components/site/page-hero.tsx` [A]
- `CTASection({ heading, subline })` from `web/components/site/cta-section.tsx` [A]
- `LogoRow({ names })` from `web/components/site/logo-row.tsx` [A]
- `ProjectTheme({ accent, children, className })` from `web/components/site/project-theme.tsx` [B] — overrides `--brand` via inline style
- `ProjectMiniPreview({ slug }: { slug: CaseSlug })` from `web/components/work/mini-preview.tsx` [B]
- `Tilt({ maxDeg, className, children })` from `web/components/site/tilt.tsx` [G, Task G2] *(merge correction: C5 consumes G2's `Tilt` wrapper directly instead of building its own `TiltFrame` on `useTilt` — see harmonization 2)*
- Existing (Phase 1, per API reference): `Container`, `SectionLabel`, `Reveal`, `ScaledPreview`, `DashboardScreen`, `StatBlock`, `Metric` type, `cn`

**Wave ordering note for the orchestrator:** Tasks C1–C3 have zero cross-workstream dependencies (run in wave 1; C2 unblocks B's `ProjectMiniPreview`). Task C4 requires A's `PageHero`/`CTASection`/`LogoRow` and B's `ProjectTheme`/`ProjectMiniPreview`. Task C5 additionally requires G2's `Tilt` component (Task 12 — not merely G1's `useTilt`). Tasks C6–C7 build on C4/C5. Nav links and `app/sitemap.ts` route additions are owned by the deploy/chrome workstream, not C.

---

---

### Workstream D — Services + About pages

**Owns:** `/services/` and `/about/` routes, all copy and composition components for them, plus the small live visuals (workflow status feed, revenue mini-chart) built from existing dashboard primitives.

**Depends on (other workstreams):**
- `PageHero({ eyebrow, title, intro, children })` from `web/components/site/page-hero.tsx` [owner: A]
- `CTASection({ heading, subline })` from `web/components/site/cta-section.tsx` [owner: A]

Tasks D1–D3 have **no** cross-workstream dependencies and can run in an early wave. Tasks D4 and D6 (the pages) require Workstream A's `PageHero` and `CTASection` to exist before `npm run build` will pass.

**Not owned here (do not touch):** `web/app/sitemap.ts` route additions, `navLinks` changes in `web/content/nav.ts`, `_redirects`/`_headers`, OG images — all owned by the nav/footer and deploy workstreams. The `/services/` and `/about/` sitemap entries are expected from the deploy workstream.

**Copy rules in force for every string below:** facts verbatim-or-tightened from `plan-refs/facts-inventory.md` (v1 services cards §3, engagement/pricing facts §3, founder story §4); restrained editorial voice; no em-dashes; **Drafterie** spelling; violet `#6E63FF` only as accent (icons, chips, chart strokes), never a large fill. All motion ≤400ms and gated by `useReducedMotion()` from `@/lib/hooks/use-reduced-motion`.

---

---

### Workstream E: Contact page + Pages Function + CSP

**Scope:** the `/contact/` two-path page (Cal.com booking + real form), the pure validation module `web/lib/contact-validation.ts` (TDD centerpiece), the Cloudflare Pages Function `web/functions/api/contact.ts` (Turnstile server verify + Resend send), and the final `web/public/_headers` CSP.

**Cal.com decision (one sentence):** Use the official `@calcom/embed-react` package (v1.5.3, verified peer-compatible with React 19.2.4) — the API reference shows no embed precedent either way, but the approved Phase 2 spec §8 explicitly locks "Cal.com scheduler embed with plain-link fallback" and pre-plans the Cal.com CSP domains, so the embed is the specced path; the plain `CAL_URL` link still renders beneath it as the fallback.

**Consumes (cross-workstream):** `PageHero` from `web/components/site/page-hero.tsx` (owner A, pinned contract: `PageHero({ eyebrow, title, intro, children })`). Everything else consumed already exists per the API reference: `Container`, `Reveal`, `Button`, `Input`, `Label`, `Textarea`, `CAL_URL` / `CONTACT_EMAIL` / `LINKEDIN_URL` from `web/content/nav.ts`, `cn`, and the brand token classes (`text-fg`, `text-fg-muted`, `text-brand`, `text-neg`, `bg-card`, `border-border`).

**Produces (for other workstreams):**
- Route `/contact/` (nav workstream points "Let's Talk" and the Contact nav link here).
- `web/lib/contact-validation.ts` — full export list in Task E2.
- `POST /api/contact` JSON contract — request `ContactPayload`, responses `200 {ok:true}` / `400|403|502 {ok:false, error:string}` (Task E3).
- `web/components/contact/contact-form.tsx` → `export function ContactForm()` (no props).
- `web/components/contact/cal-embed.tsx` → `export function CalEmbed()` (no props).
- Final `web/public/_headers` — **no other workstream edits `_headers`; all CSP needs land here in Task E7.**

**Anti-spam design (locked for all tasks):** honeypot field named `website` (hidden off-screen, tabIndex −1); minimum time-to-submit `3000ms` measured client-side from form mount and re-checked server-side; Turnstile token required. Server behavior: honeypot trip → **silent 200 fake-success** (never teach a bot it was caught; a real human never fills a hidden field, so no lead is lost); too-fast / malformed / invalid → 400 (a hasty human gets the error state with the prefilled `mailto:` fallback, so the lead survives); Turnstile verify fail → 403; Resend fail → 502. Cloudflare Turnstile **test keys** are the documented defaults everywhere: site `1x00000000000000000000AA` (always passes, visible widget), secret `1x0000000000000000000000000000000AA` (always passes). Real keys are swapped in at launch (spec §13 open items 1–2) via `NEXT_PUBLIC_TURNSTILE_SITE_KEY` at build time and encrypted Pages secrets `RESEND_API_KEY` / `TURNSTILE_SECRET_KEY` at runtime.

**Copy rules honored throughout:** restrained editorial voice, facts verbatim from the facts inventory ("30-minute call. No pitch, no pressure. Just a conversation about your systems.", "Average reply: under 24h", `inquiries@kcoh.ca`, `https://cal.com/kevin-cohen-utwpmj/consultation`), no em-dashes in copy (house rule), Drafterie spelling (not used in this workstream's copy anyway), violet only as accent. No new motion primitives are introduced; the only motion used is the existing `Reveal` (already gated by `useReducedMotion`).

---

---

### Workstream F — Playable Dashboard Demo (`/dashboard`)

**Goal:** Upgrade `/dashboard/` from a static composition into a clickable, client-side-simulated product demo: working sidebar navigation across four screens (Overview / Projects / Invoices / Analytics), a sortable invoice table, chart hover tooltips, an in-frame theme toggle, and live-ticking data. The demo body is code-split via `next/dynamic` so page-one bundles are unaffected.

**Spec basis:** Phase 2 spec §9 ("Playable `/dashboard` demo: clickable sidebar (Overview / Projects / Invoices / Analytics screens), sortable invoice table, chart hover tooltips, in-frame theme toggle, simulated live-ticking data. Client-side only. Framed 'This is the kind of system we build — click around.' ... Code-split (dynamic import) so it never weighs page one.") and §11 quality gates.

**Decisions made in this workstream (stated for the record):**

1. **In-frame theme toggle scope: it reuses the GLOBAL next-themes toggle.** The demo top bar renders the existing `ThemeToggle` component (`web/components/site/theme-toggle.tsx`), which calls `setTheme()` from next-themes and flips the `.dark` class on `<html>`. Rationale: every chart and token themes purely via CSS variable resolution under `.dark` (per API reference §1, "Charts never read theme via JS"); a frame-scoped theme would require duplicating the entire token cascade under a second class for zero benefit. The whole site flips together, which is consistent and honest. The spec's "in-frame theme toggle" is satisfied as an in-frame *affordance*.
2. **Overview screen = the existing `OverviewDashboard`, byte-for-byte untouched.** Ticking data lives on the Projects and Analytics screens. `web/components/dashboard/dashboard-screen.tsx`, `sidebar-nav.tsx`, and `overview-dashboard.tsx` are NOT modified, so the homepage `HowWeWork` preview (`ScaledPreview` → `DashboardScreen`) and the static `/dashboard-dark.webp` / `/dashboard-light.webp` assets consumed by `DashboardImage` keep working exactly as today.
3. **Code-split:** `web/app/dashboard/page.tsx` stays a server component (keeps `metadata`); it renders a tiny `"use client"` loader that `next/dynamic`-imports the demo shell with `ssr: false` and a skeleton fallback. Route-level splitting plus the dynamic import guarantees zero demo bytes on `/`.
4. **All demo data is simulated.** Labels reuse the established Phase 1 sample-data facts (projects Concordia Connect / Drafterie / Skyroa / AutoMedic / Success / FrostyNow, user `john@kcoh.ca`, revenue `$128,430`, invoices `INV-2026-00x`). A caption under the frame says so: "Simulated data. The components are the ones we ship."

**Cross-workstream dependencies (pinned contracts consumed — schedule F after these land):**

- `ProjectTheme` from `web/components/site/project-theme.tsx` [owner: B] — used in Task F7 to recolor per-project sparklines by overriding `--brand`.
- `PageHero` from `web/components/site/page-hero.tsx` [owner: A] — used in Task F11 for the page header.

**This workstream produces (consumed by others):** nothing pinned; `useTicker`, the tooltip charts, and the demo screens are internal to `/dashboard`. Other workstreams link *to* `/dashboard/` ("Explore the live demo →") — the route keeps its URL.

**House rules honored:** violet `#6E63FF` only as accent (chips, rings, 8%-opacity hover washes — never a large fill); all motion ≤ 400ms and gated on `useReducedMotion()` from `@/lib/hooks/use-reduced-motion`; Drafterie spelling; the one em-dash in the framing sentence is verbatim from the approved spec; everything else avoids em-dashes per the Phase 1 house rule.

All commands run from the repo root (`/Users/kevincohen/Desktop/KCOH Software Inc.`).

---

---

### Workstream G — Micro-interactions layer

Implements spec §9 (Interactivity & motion) of `docs/superpowers/specs/2026-07-01-kcoh-v2-phase2-full-site-design.md`: dashboard tilt, magnetic buttons, chart draw-on-scroll, nav active-route indicator, cursor-tracking brand glow on cards, and gentle page-mount fade-rise. All motion is sub-400ms, once-per-scroll, gated by the existing `useReducedMotion()` hook (`web/lib/hooks/use-reduced-motion.ts`), spring-driven via the already-installed `motion` package (`^12.42.2`, imported as `motion/react`), and disabled on touch wherever it is cursor-driven. No new dependencies. No new copy. Violet `#6E63FF` appears only as thin accents (2px underline, 12%-mixed radial glow) — never a large fill.

#### Dependency and ordering note (read before scheduling)

**No cross-workstream dependency (can run in wave 1, in this order):**
- G1 → G2 → G3 → G4 → G5 → G7 (G1 must precede G2; G3 must precede G8/G9; G5 must precede G11/G12; G4 and G7 are independent of everything except G-internal ordering).
- G4 (chart `animateIn`) is call-site-compatible (new prop defaults `true`), so it is safe in any order relative to workstream B — but land it **before** B's mini-preview tasks so B can pass `animateIn={false}` where a preview should stay static.

**Cross-workstream dependencies (must run in a later wave):**
- **G6 (nav active indicator)** — run AFTER the workstream A chrome task (Task 1, A1) that rewrites `web/content/nav.ts` `navLinks` to real routes (`/services/`, `/work/`, `/about/`, `/contact/`) and after **workstream E** creates the `/contact` route (Task 34, E6 — merge correction: section G originally said "workstream F", but F owns only `/dashboard`; the contact page is E's). G6's `nav.tsx` is the **canonical final** version of that file; no other task may modify `web/components/site/nav.tsx` after G6. (G6 degrades safely: `isActiveRoute` returns `false` for hash hrefs, so if it runs while `navLinks` are still `/#services`-style, links keep working and the indicator simply never shows.)
- **G8** — AFTER workstream A's Task creating `web/components/site/cta-section.tsx`.
- **G9** — AFTER **workstream E's** task creating the contact form component (Task 32, E4 — merge correction: section G originally said "workstream F"; a scheduler gating G9 on F would run it against a nonexistent file).
- **G10** — AFTER workstream C's case-page task (`web/app/work/[slug]/page.tsx`) and workstream B's `ProjectTheme`.
- **G11** — AFTER workstream B's featured-work rebuild (homepage feature cards with mini-previews).
- **G12** — AFTER workstream C's `/work` index task (alternating feature rows).

**Contracts G consumes from other workstreams** (pinned; exact signatures):
- `web/components/site/project-theme.tsx` → `export function ProjectTheme({ accent, children, className }: { accent: string; children: React.ReactNode; className?: string })` [owner B] — overrides the `--brand` CSS custom property inline, so G's glow (`var(--brand)`) and the charts' gradients recolor automatically inside it.
- `web/components/site/cta-section.tsx` → `export function CTASection({ heading, subline }: { heading?: string; subline?: string })` [owner A].
- Case routes `/work/[slug]/` for `CaseSlug = "concordia-connect" | "drafterie" | "skyroa" | "automedic"` [owner C].
- `web/components/site/scaled-preview.tsx` → `ScaledPreview({ designWidth = 1160, className, children })` and `web/components/dashboard/dashboard-screen.tsx` → `DashboardScreen({ className })` (both exist today, per API reference).

**Contracts G publishes for other workstreams** (referenced by the integration tasks below; A/B/C/F plan authors should build to these so G8–G12 are pure wrapper edits):
1. **CTASection primary button (for A)** — the primary CTA inside `cta-section.tsx` must be exactly the site-standard button (same markup as the existing Services CTA panel):
   ```tsx
   <Button asChild size="lg" className="rounded-full">
     <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
       Book a Conversation
     </a>
   </Button>
   ```
   G8 wraps this element in `<Magnetic>`.
2. **Case-page hero composition (for C)** — the hero's re-skinned dashboard must be rendered as:
   ```tsx
   <ScaledPreview designWidth={1160}>
     <ProjectTheme accent={study.accent}>
       <DashboardScreen />
     </ProjectTheme>
   </ScaledPreview>
   ```
   G10 wraps this `ScaledPreview` element in `<Tilt maxDeg={2}>`.
   *(Merge correction — harmonization 2: workstream C ships this composition inside `web/components/work/case-hero.tsx` (Task 22), not bare in `web/app/work/[slug]/page.tsx` — the page (Task 24) renders `<CaseHero study={study} />` with `ProjectTheme` applied at page level, and `CaseHero` already wraps the `ScaledPreview` in G2's `<Tilt maxDeg={2} className="will-change-transform">`. The recoloring and tilt are functionally identical; Task 51 (G10) is therefore verification-only and must never add a second `Tilt`.)*
3. **Glow-capable card root (for B's featured cards and C's work-index rows)** — the card/row root element must: (a) live in a `"use client"` file, (b) include `relative overflow-hidden` in its className, (c) spread the two handlers from `usePointerGlow()`, and (d) render this exact overlay as its first child:
   ```tsx
   <div
     aria-hidden
     className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
     style={{
       opacity: "var(--glow-opacity, 0)",
       background:
         "radial-gradient(240px circle at var(--glow-x, 50%) var(--glow-y, 50%), color-mix(in srgb, var(--brand) 12%, transparent), transparent 70%)",
     }}
   />
   ```
   G11/G12 apply this if B/C did not already. *(Merge correction — harmonization 3/4: B's `featured-work.tsx` (Task 20) and C's `feature-row.tsx` (Task 21) both ship as SERVER components, so requirement (a) is not yet true when they land; Task 52's Step 1 and Task 53's merge note add the `"use client"` directive to those files before the hook is called.)*

---

---

### Workstream H — Deploy pipeline, SEO, 404, QA gates

**Owner scope:** `web/wrangler.toml`, npm `preview`/`deploy` scripts, `web/public/_redirects` + `robots.txt`, branded `web/app/not-found.tsx`, `web/app/sitemap.ts`, per-page canonical/OG metadata pattern (`web/lib/seo.ts`), Organization JSON-LD in `web/app/layout.tsx`, `web/README.md`, and the FINAL QA WAVE that closes the whole plan.

**Ordering constraints (for the orchestrator):**
- H1–H3 have no cross-workstream dependencies and can run in any early wave.
- H4 and H5 edit `web/app/page.tsx`, `web/app/dashboard/page.tsx`, and `web/app/layout.tsx` — run them **after** workstreams A (homepage/pages) and **F** (playable demo — Task 46, F11, which rewrites `web/app/dashboard/page.tsx`; merge correction: section H originally said "G", but G owns micro-interactions, not the demo) have landed to avoid merge churn. H4 additionally runs after every Wave 2 page task it migrates (see Task 57 Step 6b).
- H6 imports `caseStudies` from `web/content/case-studies.ts` — run **after** workstream C's content task.
- H7 (README) any time after H1.
- H8–H13 are the FINAL QA WAVE: they must run **strictly last**, after every other workstream's tasks are merged. H13 ends the entire plan with a hard STOP before production deploy.

**Verified environment facts (checked 2026-07-01):**
- `wrangler` 4.59.0 resolves on this machine (global install); it is NOT yet in `web/package.json` — H1 pins it as a devDependency.
- `web/public/og.png` exists: branded 1200×630 card from Phase 1 commit `f6fc45a`, 112,448 bytes. It already implements the approved design ("We build and operate *the systems that scale real companies.*" on the dark brand background). **Chosen OG path (simplest reliable): reuse this committed static export from the design** — zero new tooling, deterministic. H4 verifies and wires it; README documents how to replace it.
- `web/.gitignore` already ignores `.dev.vars*`, `.wrangler/`, and `/out/`.
- `next build` already emits `web/out/404.html` (Cloudflare Pages serves it automatically for unmatched URLs) and copies `_headers`/`_redirects`/`robots.txt` from `web/public/` into `out/`.
- Cloudflare Turnstile public test keys (official, documented dummy keys): site key `1x00000000000000000000AA` (always passes), secret key `1x0000000000000000000000000000000AA` (always passes).

**Interfaces this workstream PRODUCES (other sections may consume):**

```ts
// web/lib/seo.ts
export function pageMetadata({
  title,
  description,
  path, // must start AND end with "/" (trailingSlash: true), e.g. "/services/"
}: {
  title: string;
  description: string;
  path: string;
}): Metadata; // import type { Metadata } from "next"

export const organizationJsonLd: Record<string, unknown>; // JSON-serializable schema.org Organization
```

Plus: npm scripts `preview` / `deploy`; `web/wrangler.toml`; branded `web/app/not-found.tsx` (default export `NotFound()`); `web/app/sitemap.ts` covering all 10 routes (6 static including `/dashboard/` + 4 case studies). **Every page ends up exporting its metadata via `pageMetadata(...)`** — that is the per-page canonical/OG pattern. (Merge correction: the Wave 2 page tasks — Tasks 21/24 (C4/C7), 28/30 (D4/D6), 34 (E6), 46 (F11) — run before `web/lib/seo.ts` exists, so they ship with inline `Metadata` objects first and are migrated to `pageMetadata(...)` by Task 57 (H4) Step 6b; any page task executing after Task 57 must use `pageMetadata(...)` directly.)

**Interfaces this workstream CONSUMES:**
- `caseStudies`, `CaseSlug` from `web/content/case-studies.ts` [owner C — pinned contract].
- Routes `/services/`, `/work/`, `/work/[slug]/`, `/about/`, `/contact/` [owners A, C].
- QA-walked components: `FaqAccordion`, `CTASection` [A]; `ProjectTheme`, `ProjectMiniPreview` [B]; `useTilt`, `Magnetic` [G]; the contact form + `web/functions/api/contact.ts` behavior as specified in design spec §8 (honeypot/time-guard rejection, Turnstile siteverify, Resend send, error → `mailto:` fallback) and its build-time env var `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- Existing primitives from the API reference: `Container`, `SectionLabel`, `Button`, `useReducedMotion`, `cn`.

All shell commands below run from the repo root (`/Users/kevincohen/Desktop/KCOH Software Inc./`).

---

---


## Wave 1 — Foundations (Tasks 1–15)

### Task 1 (A1): Real routes in nav content + nav chrome, "Let's Talk" → /contact/

**Files:**
- Modify: `web/content/nav.ts`
- Modify: `web/components/site/nav.tsx`

**Interfaces:**
- Consumes: `Button` (`@/components/ui/button`), `Sheet`/`SheetClose`/`SheetContent`/`SheetTitle`/`SheetTrigger` (`@/components/ui/sheet`), `ThemeToggle`, `Container`, `cn` — all existing, per API reference §4/§9.
- Produces: `navLinks: NavLink[]` now holding real routes `{ label: "Services", href: "/services/" } | { label: "Work", href: "/work/" } | { label: "About", href: "/about/" } | { label: "Contact", href: "/contact/" }` (type `NavLink = { label: string; href: string }` unchanged). `CAL_URL`, `CONTACT_EMAIL`, `LINKEDIN_URL` unchanged. `Nav()` (no props) unchanged in signature. Every other workstream that renders chrome inherits these routes automatically.

- [ ] **Step 1: Replace `web/content/nav.ts` with the real-route version.** Full new file contents:

```ts
export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services/" },
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const CAL_URL = "https://cal.com/kevin-cohen-utwpmj/consultation";
export const CONTACT_EMAIL = "inquiries@kcoh.ca";
export const LINKEDIN_URL =
  "https://ca.linkedin.com/in/kevin-cohen-entrepreneur";
```

- [ ] **Step 2: Replace `web/components/site/nav.tsx`.** Changes vs. current file: desktop and mobile nav links become `next/link` `Link`s (they are real routes now, not hash anchors); both "Let's Talk" CTAs point at `/contact/` instead of `CAL_URL` (so the `CAL_URL` import is removed); mobile sheet links are wrapped in `SheetClose asChild` so the sheet closes on client-side navigation. Full new file contents:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { navLinks } from "@/content/nav";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="leading-none" aria-label="KCOH Software Inc.">
          <div className="text-lg font-bold tracking-tight text-fg">KCOH</div>
          <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-fg-subtle">
            Software Inc.
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden rounded-full sm:inline-flex">
            <Link href="/contact/">Let&apos;s Talk</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="grid size-9 place-items-center rounded-full border border-border text-fg-muted md:hidden"
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="border-border bg-section">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-10 flex flex-col gap-5 px-5">
                {navLinks.map((l) => (
                  <SheetClose asChild key={l.label}>
                    <Link href={l.href} className="text-base text-fg">
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="/contact/"
                    className="mt-2 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
                  >
                    Let&apos;s Talk
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
```

- [ ] **Step 3: Build.** Run:

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
```

Expect a clean static export (exit 0, `out/` regenerated, no type errors). Linking to not-yet-existing routes does not fail `next build`.

- [ ] **Step 4: Dev-server verification (both themes + mobile).** Start the dev server in the background:

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev
```

Open `http://localhost:3000/` (Playwright MCP browser or manually) and verify:
  - **Dark (default):** the four desktop nav items read Services / Work / About / Contact and their anchor `href`s are `/services/`, `/work/`, `/about/`, `/contact/` (inspect the DOM — do NOT click through; those pages 404 until other workstreams land). The "Let's Talk" pill's `href` is `/contact/` and it no longer has `target="_blank"`.
  - **Light:** click the round sun/moon theme-toggle button in the nav; nav text stays legible (muted grey links, dark wordmark), pill stays violet.
  - **Mobile (360px viewport):** resize to 360×800; the hamburger opens the sheet; the four links + "Let's Talk" render; all five `href`s match the above.
  Then stop the dev server.

- [ ] **Step 5: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/content/nav.ts web/components/site/nav.tsx && git commit -m "feat(web): nav points at real routes, Let's Talk goes to /contact/"
```

---

### Task 2 (A2): `PageHero` shared sub-page header primitive

**Files:**
- Create: `web/components/site/page-hero.tsx`

**Interfaces:**
- Consumes: `Container`, `SectionLabel`, `Reveal` (existing, API reference §4).
- Produces (PINNED contract, consumed by workstreams B, C, D, E for every sub-page):

```ts
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children?: React.ReactNode;
})
```

Notes baked into the design: the eyebrow renders through `SectionLabel` (`text-brand`) and the glow uses `var(--brand)`, so when workstream B wraps a case page in `ProjectTheme` (which overrides the `--brand` custom property inline), the hero recolors automatically with zero extra props. Server component (no `"use client"` — `Reveal` carries its own directive and handles the page-mount fade-rise, reduced-motion-gated).

- [ ] **Step 1: Create `web/components/site/page-hero.tsx`.** Full file contents:

```tsx
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(40px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.015em] text-fg">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              {intro}
            </p>
          ) : null}
        </Reveal>
        {children ? (
          <Reveal delay={0.1} className="mt-12">
            {children}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Build + lint.** Run:

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build && npm run lint
```

Expect exit 0 for both. (No page consumes `PageHero` yet — visual verification happens on the first consuming page in workstreams B/C/D/E; type-correctness and a clean export build are the gate here.)

- [ ] **Step 3: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/site/page-hero.tsx && git commit -m "feat(web): PageHero shared sub-page header primitive"
```

---

### Task 3 (A3): `LogoRow` primitive + homepage Technologies row

**Files:**
- Create: `web/components/site/logo-row.tsx`
- Create: `web/components/sections/technologies.tsx`
- Modify: `web/app/page.tsx`

**Interfaces:**
- Consumes: `technologies: string[]` from `@/content/technologies` (existing, verbatim in API reference §8: React, Next.js, TypeScript, Swift, Node.js, PostgreSQL, Cloudflare, Stripe); `Container`, `SectionLabel`, `Reveal`.
- Produces:
  - PINNED contract (also consumed by workstream B for the `/work` Success/FrostyNow strip): `export function LogoRow({ names }: { names: string[] })` — server component, quiet uppercase mono strip of names.
  - `export function Technologies()` — homepage section, no props, `web/components/sections/technologies.tsx`.

- [ ] **Step 1: Create `web/components/site/logo-row.tsx`.** Full file contents:

```tsx
export function LogoRow({ names }: { names: string[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
      {names.map((name) => (
        <li
          key={name}
          className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Create `web/components/sections/technologies.tsx`.** A quiet single-row strip (Phase 2 spec §4.2: "muted mono strip"), shorter vertical rhythm than full sections. Full file contents:

```tsx
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { LogoRow } from "@/components/site/logo-row";
import { technologies } from "@/content/technologies";

export function Technologies() {
  return (
    <section className="border-t border-border bg-bg">
      <Container className="py-14 md:py-16">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
            <SectionLabel className="shrink-0">Technologies</SectionLabel>
            <LogoRow names={technologies} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `web/app/page.tsx` after `Founder`.** Full new file contents (before: the current 21-line file listed in API reference §2; after):

```tsx
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Testimonial } from "@/components/sections/testimonial";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Services } from "@/components/sections/services";
import { Founder } from "@/components/sections/founder";
import { Technologies } from "@/components/sections/technologies";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <FeaturedWork />
      <Testimonial />
      <HowWeWork />
      <Services />
      <Founder />
      <Technologies />
    </>
  );
}
```

- [ ] **Step 4: Build.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
```

Expect exit 0.

- [ ] **Step 5: Dev-server screenshot verification (both themes).** Start `npm run dev` (same command pattern as Task A1 Step 4), open `http://localhost:3000/`, scroll to just below the Founder section and verify:
  - **Dark:** a hairline-bordered quiet strip with the violet "TECHNOLOGIES" eyebrow on the left and one wrapping row of eight uppercase monospace items — REACT, NEXT.JS, TYPESCRIPT, SWIFT, NODE.JS, POSTGRESQL, CLOUDFLARE, STRIPE — in the subtle grey (`--fg-subtle`), on the page background. No violet fill anywhere in the strip.
  - **Light:** toggle the theme; the strip stays legible (slate-grey mono items on near-white), the hairline border is visible.
  - The strip fades and rises once on scroll-into-view (and renders statically with reduced motion enabled, if you check via emulation).
  Take a screenshot in each theme, then stop the dev server.

- [ ] **Step 6: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/site/logo-row.tsx web/components/sections/technologies.tsx web/app/page.tsx && git commit -m "feat(web): LogoRow primitive and homepage Technologies row"
```

---

### Task 4 (A4): `FaqAccordion` + homepage FAQ section

**Files:**
- Create: `web/components/site/faq-accordion.tsx`
- Create: `web/components/sections/faq.tsx`
- Modify: `web/app/page.tsx`

**Interfaces:**
- Consumes: `faqs: Faq[]` from `@/content/faq` (existing 5 rewritten Q&As — verbatim in facts inventory §2, already in the editorial voice; do NOT rewrite them); `Accordion`/`AccordionItem`/`AccordionTrigger`/`AccordionContent` from `@/components/ui/accordion` (existing shadcn, `"use client"`, Radix-animated — motion is the built-in `animate-accordion-up/down`, well under 400ms, and Radix respects reduced-motion via the `tw-animate-css` keyframes being purely height-based and instant when animations are disabled); `Container`, `SectionLabel`, `Reveal`.
- Produces:
  - PINNED contract: `export function FaqAccordion()` — no props, `web/components/site/faq-accordion.tsx` (server component composing the client accordion).
  - `export function Faq()` — homepage section, no props, `web/components/sections/faq.tsx`.

- [ ] **Step 1: Create `web/components/site/faq-accordion.tsx`.** Full file contents:

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/content/faq";

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.q} value={`faq-${i}`}>
          <AccordionTrigger className="py-5 text-left text-base font-medium text-fg hover:no-underline">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl text-sm leading-relaxed text-fg-muted">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

- [ ] **Step 2: Create `web/components/sections/faq.tsx`.** Header copy is verbatim v1 (`index.html` FAQ header: "Common Questions" / "Before you book." — facts inventory §2). Full file contents:

```tsx
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { FaqAccordion } from "@/components/site/faq-accordion";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border bg-section">
      <Container className="py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel>Common Questions</SectionLabel>
            <h2 className="mt-4 font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
              Before you book.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <FaqAccordion />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `web/app/page.tsx` after `Technologies`.** Full new file contents (before: the Task A3 Step 3 version; after):

```tsx
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Testimonial } from "@/components/sections/testimonial";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Services } from "@/components/sections/services";
import { Founder } from "@/components/sections/founder";
import { Technologies } from "@/components/sections/technologies";
import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <FeaturedWork />
      <Testimonial />
      <HowWeWork />
      <Services />
      <Founder />
      <Technologies />
      <Faq />
    </>
  );
}
```

- [ ] **Step 4: Build.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
```

Expect exit 0.

- [ ] **Step 5: Dev-server verification (both themes + keyboard).** Start `npm run dev`, open `http://localhost:3000/`, scroll below the Technologies strip and verify:
  - **Dark:** a `--section`-background band with the violet "COMMON QUESTIONS" eyebrow + serif "Before you book." on the left, five accordion rows on the right, hairline dividers between items. Click "What does it cost?" — it opens (chevron rotates, answer mentions the 5k / 10k / 20k anchors verbatim from `content/faq.ts`); clicking another question closes it (single-collapsible).
  - **Light:** toggle theme; question text near-black, answers slate, dividers visible against white.
  - **Keyboard:** Tab reaches each trigger (visible focus ring — `--ring` violet), Enter/Space toggles, Up/Down arrows move between triggers (Radix built-in).
  Screenshot each theme (one item open), then stop the dev server.

- [ ] **Step 6: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/site/faq-accordion.tsx web/components/sections/faq.tsx web/app/page.tsx && git commit -m "feat(web): FaqAccordion primitive and homepage FAQ section"
```

---

### Task 5 (A5): `CTASection` shared closer + homepage Final CTA

**Files:**
- Create: `web/components/site/cta-section.tsx`
- Modify: `web/app/page.tsx`

**Interfaces:**
- Consumes: `CAL_URL`, `CONTACT_EMAIL` from `@/content/nav`; `Button` (`@/components/ui/button`); `Container`, `Reveal`.
- Produces (PINNED contract, consumed by workstreams B, C, D, E as the closing band of every page):

```ts
export function CTASection({
  heading = "Let's talk about what you're building.",
  subline = "30-minute call. No pitch, no pressure. Just a conversation about your systems.",
}: {
  heading?: string;
  subline?: string;
})
```

Defaults: heading is the Phase 2 spec §4.4 close verbatim; subline is the verbatim v1 mid-CTA line (facts inventory §3) already used on the Services CTA card. Renders its own full-width `<section>` (border-t, centered, "Book a Conversation" → `CAL_URL` + `mailto:inquiries@kcoh.ca` email link, low-opacity violet radial glow — never a violet fill).

- [ ] **Step 1: Create `web/components/site/cta-section.tsx`.** Full file contents:

```tsx
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { CAL_URL, CONTACT_EMAIL } from "@/content/nav";

export function CTASection({
  heading = "Let's talk about what you're building.",
  subline = "30-minute call. No pitch, no pressure. Just a conversation about your systems.",
}: {
  heading?: string;
  subline?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-border bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />
      <Container className="py-24 md:py-32">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="font-serif text-[clamp(34px,4.4vw,56px)] font-medium leading-[1.06] tracking-[-0.015em] text-fg">
            {heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg-muted">
            {subline}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-full">
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                Book a Conversation
              </a>
            </Button>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `web/app/page.tsx` as the final section.** Full new file contents (before: the Task A4 Step 3 version; after — this is the FINAL homepage composition for this workstream):

```tsx
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Testimonial } from "@/components/sections/testimonial";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Services } from "@/components/sections/services";
import { Founder } from "@/components/sections/founder";
import { Technologies } from "@/components/sections/technologies";
import { Faq } from "@/components/sections/faq";
import { CTASection } from "@/components/site/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <FeaturedWork />
      <Testimonial />
      <HowWeWork />
      <Services />
      <Founder />
      <Technologies />
      <Faq />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 3: Build.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
```

Expect exit 0.

- [ ] **Step 4: Dev-server screenshot verification (both themes).** Start `npm run dev`, open `http://localhost:3000/`, scroll to the bottom (above the footer) and verify:
  - **Dark:** centered serif "Let's talk about what you're building." at display size, the subline beneath, a violet pill "Book a Conversation" whose `href` is the Cal.com consultation URL (`https://cal.com/kevin-cohen-utwpmj/consultation`, opens new tab), and `inquiries@kcoh.ca` as a quiet text `mailto:` link beside it. A faint violet radial glow bleeds from the bottom edge — verify it is subtle (low opacity), not a violet band.
  - **Light:** toggle theme; heading near-black, glow still faint, button contrast unchanged (white-on-violet).
  Screenshot each theme, then stop the dev server.

- [ ] **Step 5: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/site/cta-section.tsx web/app/page.tsx && git commit -m "feat(web): CTASection shared closer wired as homepage final CTA"
```

---

### Task 6 (A6): Expanded four-column footer

**Files:**
- Modify: `web/components/site/footer.tsx`

**Interfaces:**
- Consumes: `navLinks`, `CAL_URL`, `CONTACT_EMAIL`, `LINKEDIN_URL` from `@/content/nav` (Task A1 values); `featuredProjects` from `@/content/projects` (existing export, API reference §8 — exactly the four case-study projects, slugs `drafterie` / `concordia-connect` / `skyroa` / `automedic`, matching workstream C's pinned `CaseSlug` values and the pinned `/work/[slug]/` routes); `Container`.
- Produces: `export function Footer()` — same export name/signature as today (no props, server component), so `web/app/layout.tsx` needs no change. Columns per Phase 2 spec §4.5: brand + one-liner · site nav · the four case studies · connect (LinkedIn, email, Cal.com) · legal line. Brand one-liner is the verbatim v1 footer line (facts inventory §4).

- [ ] **Step 1: Replace `web/components/site/footer.tsx`.** Full new file contents:

```tsx
import Link from "next/link";
import { Container } from "./container";
import { navLinks, CAL_URL, CONTACT_EMAIL, LINKEDIN_URL } from "@/content/nav";
import { featuredProjects } from "@/content/projects";

const footerLink =
  "text-sm text-fg-muted transition-colors hover:text-fg";
const columnHeading =
  "text-xs font-medium uppercase tracking-[0.2em] text-fg-subtle";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-14 md:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="text-lg font-bold tracking-tight text-fg">KCOH</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-fg-subtle">
              Software Inc.
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">
              Software systems that automate operations and add financial
              clarity. Led by an operator who built and scaled a 7 figure
              platform.
            </p>
          </div>

          <nav aria-label="Site" className="lg:col-span-2">
            <h3 className={columnHeading}>Site</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={footerLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Work" className="lg:col-span-3">
            <h3 className={columnHeading}>Work</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {featuredProjects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}/`} className={footerLink}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h3 className={columnHeading}>Connect</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={footerLink}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  Book a Conversation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-xs text-fg-subtle">
          © 2026 KCOH Software Inc. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 2: Build.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
```

Expect exit 0.

- [ ] **Step 3: Dev-server verification (both themes + mobile).** Start `npm run dev`, open `http://localhost:3000/`, scroll to the footer and verify:
  - **Dark, 1440px:** four columns across — (1) KCOH wordmark + the operator one-liner, (2) "SITE" with Services / Work / About / Contact (`href`s `/services/`, `/work/`, `/about/`, `/contact/`), (3) "WORK" with Drafterie / Concordia Connect / Skyroa / AutoMedic (`href`s `/work/drafterie/`, `/work/concordia-connect/`, `/work/skyroa/`, `/work/automedic/` — confirm the "Drafterie" spelling in the rendered text), (4) "CONNECT" with LinkedIn (`https://ca.linkedin.com/in/kevin-cohen-entrepreneur`), `inquiries@kcoh.ca` (mailto), Book a Conversation (Cal.com URL, new tab). Legal line "© 2026 KCOH Software Inc. All rights reserved." below a hairline divider.
  - **Light:** toggle theme; column headings subtle-grey, links legible slate on near-white.
  - **Mobile, 360px:** columns stack (brand full-width first, then Site/Work side by side, then Connect); nothing overflows horizontally.
  Screenshot dark 1440px and light 1440px, then stop the dev server.

- [ ] **Step 4: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/site/footer.tsx && git commit -m "feat(web): expanded four-column footer with case-study links"
```

---

### Task 7 (B1): ProjectTheme — per-project accent override + AA-safe `--brand-text`/status/button tokens

**Files:**
- Create: `web/components/site/project-theme.tsx`
- Modify: `web/app/globals.css`
- Modify: `web/components/site/section-label.tsx`

**Interfaces:**
- Consumes: nothing beyond React types. (Deliberately does not import `cn` — there are no default classes to merge.)
- Produces: `export function ProjectTheme({ accent, children, className }: { accent: string; children: React.ReactNode; className?: string }): React.JSX.Element` — pinned cross-workstream contract, consumed by B3/B4 and by Workstream C's case pages.
- Produces (token contract, pinned): the `--brand-text` CSS custom property + `text-brand-text` Tailwind utility — **the accent color for SMALL TEXT** (eyebrows, taglines, status tints, "Read the case study"-style links). Raw `--brand`/`text-brand` stays reserved for graphics, chart strokes, glows, large serif text, and underline-affordance elements. Rationale: the raw project accents fail WCAG AA as small text (Concordia burgundy `#8b1d3f` on the dark `--bg` `#05070b` = **2.25:1**; AutoMedic green `#16a34a` on the light `--bg` = **3.16:1**), so `--brand-text` derives a readable tone from whatever `--brand` currently is — violet by default, the project accent inside `ProjectTheme`. Also produces the AA-corrected light-theme status tokens (`--pos` `#15803d`, `--warn` `#b45309`, both 5.02:1 on white) and the darkened primary-button fill (`--primary` = 88% brand + black, white label ≈5.3:1), so Wave 2+ components are built AA-compliant instead of being flagged at QA Gate 2 (Task 62).

**Mechanism (the exact property names, from the API reference):** the design-system accent custom property is `--brand` (defined in `web/app/globals.css` `:root` and `.dark`, both `#6e63ff`; consumed by `AreaChart`, `BarChart`, `Sparkline`, `DonutGauge` via inline `style` `var(--brand)`, and by every `text-brand`/`bg-brand`/`border-brand` Tailwind utility since `@theme inline` maps `--color-brand: var(--brand)`). `ProjectTheme` overrides `--brand` via inline style on a wrapper `div`, so **everything** nested — charts, eyebrows (`SectionLabel` is `text-brand-text` after this task), links, glows — recolors with zero component changes. It also derives `--highlight` (the secondary chart color, `#6be5ff`, used as the far stop of `AreaChart`'s stroke gradient and `BarChart`'s series B) as a white-tinted mix of the accent, so two-tone chart gradients stay inside the project's palette instead of ending in ice blue. Global UI outside the wrapper (nav, buttons) is untouched — spec §5's "global UI stays violet" holds by construction. Inline style for CSS-var values is the codebase's sanctioned use of inline style (API reference §10).

**`--brand-text` mechanism (why the extra token, and why it lives in `globals.css` rather than in the inline style):** an inline style cannot be theme-aware, and a `color-mix()` written into `:root` resolves `var(--brand)` **at `:root`** (custom properties substitute `var()` at the element where they are declared, then the *resolved* value inherits) — so `--brand-text` must be *re-declared* on the `ProjectTheme` element itself for the mix to pick up the overridden accent. The wrapper therefore carries a `data-project-theme` attribute, and `globals.css` declares `--brand-text` three times: the site-wide defaults on `:root`/`.dark` (violet-based) and the `[data-project-theme]` re-declarations (accent-based). Derivation formulas and their computed WCAG ratios: light default `color-mix(in srgb, var(--brand) 85%, black)` ≈ `#5e54d9` = **5.4:1** on `--bg` `#fafafb`; dark default `var(--brand)` = **4.70:1** on `#05070b`; inside `ProjectTheme`, light `color-mix(72%, black)` (AutoMedic green → ≈**5.6:1**) and dark `color-mix(60%, white)` (Concordia burgundy → ≈**5.8:1**, the exact formula QA Gate 2's table verifies). Charts, gradients, logo chips, and glows keep consuming raw `--brand` — only text opts in via `text-brand-text`.

- [ ] **Step 1: Create `web/components/site/project-theme.tsx`** with the complete contents:

```tsx
/**
 * Re-skins everything inside it in a project's brand palette by overriding
 * the design-system accent custom properties (--brand, and a derived
 * --highlight) via inline style. Charts, eyebrows, links, and Tailwind
 * brand utilities all resolve the new values; global UI outside the
 * wrapper stays on the default violet.
 *
 * The data-project-theme attribute re-triggers the globals.css
 * --brand-text declarations, so small text inside the wrapper gets an
 * AA-safe derived tone of the accent (raw accents like #8b1d3f fail
 * WCAG AA as small text) while charts keep the raw accent.
 */
export function ProjectTheme({
  accent,
  children,
  className,
}: {
  accent: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-project-theme
      className={className}
      style={
        {
          "--brand": accent,
          "--highlight": `color-mix(in srgb, ${accent} 55%, white)`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
```

Notes: server component (no `"use client"` — pure render, matching `container.tsx`/`section-label.tsx`). `color-mix` is already used by the codebase (`::selection` in `globals.css`), so browser support is settled.

- [ ] **Step 2: Add the AA token layer to `web/app/globals.css`** (four exact edits; the before-blocks are the current committed file):

  **(a) Light tokens — `:root`:** add `--brand-text` and raise the light status colors to AA (the current `#16a34a`/`#d97706` are 3.30:1/3.19:1 on white — they fail for the 11–12px "Paid"/"Pending"/"Confirmed" status text rendered by `ProjectMiniPreview`, `WorkflowFeed`, and the demo `InvoicesScreen`). Before:

```css
  --brand: #6e63ff;
  --highlight: #6be5ff;
  --pos: #16a34a;
  --warn: #d97706;
  --neg: #dc2626;
```

  After:

```css
  --brand: #6e63ff;
  /* Accent tone for SMALL TEXT (12px eyebrows, status tints, small links):
     raw --brand is 4.12:1 on --bg — below the 4.5:1 AA small-text bar.
     85% brand + black ≈ #5e54d9 = 5.4:1. */
  --brand-text: color-mix(in srgb, var(--brand) 85%, black);
  --highlight: #6be5ff;
  --pos: #15803d; /* was #16a34a (3.30:1 on white) — 5.02:1, AA for status text */
  --warn: #b45309; /* was #d97706 (3.19:1 on white) — 5.02:1, AA for status text */
  --neg: #dc2626;
```

  **(b) Dark tokens — `.dark`:** violet already passes on the dark bg (4.70:1), so the dark default is the raw brand; dark status tokens are untouched (9.33/10.75/6.49 — all pass). Before:

```css
  --brand: #6e63ff;
  --highlight: #6be5ff;
```

  (the occurrence inside `.dark`) — After:

```css
  --brand: #6e63ff;
  --brand-text: var(--brand); /* violet on #05070b = 4.70:1, AA for small text */
  --highlight: #6be5ff;
```

  **(c) Primary-button fill (both themes at once, since both map `--primary: var(--brand)`):** white on raw `#6e63ff` is **4.29:1** — under the 4.5:1 AA bar for the 14px-medium button labels the site uses. Decision (explicit, not a QA-gate rationalization): darken the fill, keep white text, keep every button's markup untouched. In **both** the `:root` and `.dark` blocks, replace:

```css
  --primary: var(--brand);
```

  with:

```css
  --primary: color-mix(in srgb, var(--brand) 88%, black); /* white label ≈5.3:1 (raw brand = 4.29:1) */
```

  (Two occurrences — change both. `--ring: var(--brand)` stays raw: focus rings are non-text indicators with a 3:1 bar, which 4.12+ passes.)

  **(d) ProjectTheme re-declarations + utility mapping:** insert this block between the `.dark { ... }` block and `@theme inline { ... }`:

```css
/* Inside ProjectTheme (data-project-theme), --brand is the project accent.
   --brand-text must be RE-declared here — a color-mix() declared on :root
   resolves var(--brand) at :root, so it would never see the override. The
   mixes below keep every case accent AA as small text in both themes
   (e.g. Concordia #8b1d3f: raw = 2.25:1 on the dark bg, 60%+white ≈ 5.8:1;
   AutoMedic #16a34a: raw = 3.16:1 on the light bg, 72%+black ≈ 5.6:1). */
[data-project-theme] {
  --brand-text: color-mix(in srgb, var(--brand) 72%, black);
}
.dark [data-project-theme] {
  --brand-text: color-mix(in srgb, var(--brand) 60%, white);
}
```

  and inside `@theme inline`, directly under `--color-brand: var(--brand);`, add:

```css
  --color-brand-text: var(--brand-text);
```

  (this is what makes the `text-brand-text` Tailwind utility exist).

- [ ] **Step 3: Switch `SectionLabel` (the shared 12px eyebrow) to the AA token.** In `web/components/site/section-label.tsx`, change one class. Before:

```tsx
      className={cn(
        "text-xs font-medium uppercase tracking-[0.25em] text-brand",
        className,
      )}
```

  After:

```tsx
      className={cn(
        "text-xs font-medium uppercase tracking-[0.25em] text-brand-text",
        className,
      )}
```

  Outside `ProjectTheme` nothing visibly changes in dark (`--brand-text` = the same violet) and light eyebrows get the slightly deeper AA violet; inside `ProjectTheme`, every eyebrow automatically renders the readable accent tone. Case-page components built later (Tasks 19–24) use `text-brand-text` for their hand-rolled eyebrows, taglines, status tints, and small links, per this task's token contract.

- [ ] **Step 4: Verify it compiles cleanly and the tokens resolve.** Run:

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build && npm run dev
```

Expect: build completes with exit code 0, all existing routes exported, no type errors. Then open `http://localhost:3000`, inspect any `SectionLabel` eyebrow in DevTools and confirm its computed color is `rgb(94, 84, 217)`-ish in light theme and `rgb(110, 99, 255)` in dark; confirm the hero's primary button background computes to the darkened violet (≈`rgb(97, 87, 224)`), not `#6e63ff`. Stop the dev server. (Visual verification of the per-project recoloring happens in B3/B4 where `ProjectTheme` is first rendered; both themes are checked there.)

- [ ] **Step 5: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/site/project-theme.tsx web/app/globals.css web/components/site/section-label.tsx && git commit -m "feat(web): ProjectTheme accent override + AA-safe brand-text/status/button tokens"
```

---

### Task 8 (B2): `tickSeries` — deterministic live-tick helper (TDD)

**Files:**
- Create: `web/lib/charts/tick.ts`
- Test: `web/lib/__tests__/tick.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `export function tickSeries(series: number[], seed: number): number[]` — drops the first value, appends a new deterministic value inside the series' existing `[min, max]` range. Consumed by B3's hover ticking. Pure module (no `"use client"`), same placement convention as `web/lib/charts/geometry.ts`.

- [ ] **Step 1: Write the failing test.** Create `web/lib/__tests__/tick.test.ts` with the complete contents:

```ts
import { describe, it, expect } from "vitest";
import { tickSeries } from "@/lib/charts/tick";

describe("tickSeries", () => {
  it("returns an array of the same length", () => {
    expect(tickSeries([1, 2, 3, 4], 1)).toHaveLength(4);
  });

  it("shifts the window left by one (drops the first value)", () => {
    const out = tickSeries([5, 9, 7, 11], 1);
    expect(out.slice(0, 3)).toEqual([9, 7, 11]);
  });

  it("appends a new value within the min/max bounds of the input", () => {
    const input = [10, 40, 25, 30];
    for (let seed = 0; seed < 25; seed++) {
      const next = tickSeries(input, seed)[3];
      expect(next).toBeGreaterThanOrEqual(10);
      expect(next).toBeLessThanOrEqual(40);
    }
  });

  it("is deterministic for the same seed", () => {
    expect(tickSeries([3, 1, 4, 1, 5], 42)).toEqual(
      tickSeries([3, 1, 4, 1, 5], 42),
    );
  });

  it("produces different values across seeds", () => {
    const input = [0, 100];
    const values = new Set(
      [1, 2, 3, 4, 5].map((seed) => tickSeries(input, seed)[1]),
    );
    expect(values.size).toBeGreaterThan(1);
  });

  it("returns an empty array for empty input", () => {
    expect(tickSeries([], 7)).toEqual([]);
  });

  it("keeps a flat series flat", () => {
    expect(tickSeries([5, 5, 5], 3)).toEqual([5, 5, 5]);
  });
});
```

- [ ] **Step 2: Run the test and watch it fail.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx vitest run lib/__tests__/tick.test.ts
```

Expected failure: `Error: Failed to resolve import "@/lib/charts/tick"` (module does not exist yet). Do not proceed until you have seen this failure.

- [ ] **Step 3: Implement.** Create `web/lib/charts/tick.ts` with the complete contents:

```ts
/**
 * Deterministically advance a chart series by one step: drop the first
 * value and append a plausible new one within the series' existing range.
 * Pure and seed-driven so the live-ticking mini-previews are testable.
 */
export function tickSeries(series: number[], seed: number): number[] {
  if (series.length === 0) return [];
  const min = Math.min(...series);
  const max = Math.max(...series);
  const next = Math.round(min + pseudoRandom(seed) * (max - min));
  return [...series.slice(1), Math.min(max, Math.max(min, next))];
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
```

- [ ] **Step 4: Run the test and watch it pass.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx vitest run lib/__tests__/tick.test.ts
```

Expect: 7 tests, all passing. Then run the full suite to confirm nothing else broke:

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test
```

- [ ] **Step 5: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/lib/charts/tick.ts web/lib/__tests__/tick.test.ts && git commit -m "feat(web): tickSeries helper for live-ticking chart previews (TDD)"
```

---

### Task 9 (E1): Install contact dependencies

**Files:**
- Modify: `web/package.json` (+ `web/package-lock.json`, via npm)

**Interfaces:** Consumes: nothing. / Produces: `@calcom/embed-react@1.5.3` and `@marsidev/react-turnstile@1.5.3` available for import in Tasks E4–E5.

- [ ] **Step 1: Install the two packages (exact versions, verified on npm 2026-07-01; both declare React 19 in peerDependencies so no flags are needed).**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm install @calcom/embed-react@1.5.3 @marsidev/react-turnstile@1.5.3
  ```

  Expect: npm exits 0; `web/package.json` `dependencies` now contains `"@calcom/embed-react": "^1.5.3"` and `"@marsidev/react-turnstile": "^1.5.3"`.

- [ ] **Step 2: Verify the build is still clean.**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
  ```

  Expect: `next build` completes with no type errors and the static export lands in `web/out/`.

- [ ] **Step 3: Commit.**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/package.json web/package-lock.json && git commit -m "chore(web): add @calcom/embed-react and @marsidev/react-turnstile"
  ```

---

### Task 10 (E2): Pure contact validation module (TDD centerpiece)

**Files:**
- Test: `web/lib/__tests__/contact-validation.test.ts` (create — written FIRST)
- Create: `web/lib/contact-validation.ts`

**Interfaces:** Consumes: nothing (pure module, no imports). / Produces (exact signatures):

```ts
export const MIN_SUBMIT_MS = 3000;
export const FIELD_LIMITS: { readonly name: 100; readonly email: 254; readonly company: 150; readonly message: 5000 };
export type ContactFields = { name: string; email: string; company: string; message: string };
export type ContactPayload = ContactFields & { token: string; website: string; elapsedMs: number };
export type FieldErrors = Partial<Record<keyof ContactFields, string>>;
export type ParseFailureReason = "malformed" | "invalid" | "honeypot" | "too-fast";
export type ParseResult =
  | { ok: true; payload: ContactPayload }
  | { ok: false; reason: ParseFailureReason };
export function isValidEmail(email: string): boolean;
export function validateFields(fields: ContactFields): FieldErrors;          // {} when valid
export function isHoneypotTripped(website: string): boolean;
export function isTooFast(elapsedMs: number, minMs?: number): boolean;
export function buildContactPayload(input: { fields: ContactFields; token: string; website: string; elapsedMs: number }): ContactPayload;
export function parseContactPayload(data: unknown): ParseResult;
export function buildMailtoUrl(to: string, fields: ContactFields): string;
```

This module is shared three ways: client field validation + payload shaping + mailto fallback (Task E4) and server-side parse/shape/spam checks (Task E3). It follows the existing pure-module pattern (`web/lib/charts/geometry.ts`: no `"use client"`, no imports) and the existing test pattern (`web/lib/__tests__/geometry.test.ts`: explicit vitest imports, `@/` alias).

- [ ] **Step 1: Write the complete failing test file at `web/lib/__tests__/contact-validation.test.ts`.**

  ```ts
  import { describe, it, expect } from "vitest";
  import {
    MIN_SUBMIT_MS,
    FIELD_LIMITS,
    isValidEmail,
    validateFields,
    isHoneypotTripped,
    isTooFast,
    buildContactPayload,
    parseContactPayload,
    buildMailtoUrl,
    type ContactFields,
  } from "@/lib/contact-validation";

  const validFields: ContactFields = {
    name: "Ada Lovelace",
    email: "ada@example.com",
    company: "Analytical Engines Ltd",
    message: "We need a booking system that does not double-book.",
  };

  const validRaw = {
    ...validFields,
    token: "XXXX.DUMMY.TOKEN.XXXX",
    website: "",
    elapsedMs: 8000,
  };

  describe("isValidEmail", () => {
    it("accepts a normal address", () => {
      expect(isValidEmail("ada@example.com")).toBe(true);
    });

    it("accepts short domains", () => {
      expect(isValidEmail("a@b.co")).toBe(true);
    });

    it("trims surrounding whitespace", () => {
      expect(isValidEmail("  ada@example.com  ")).toBe(true);
    });

    it("rejects a missing @", () => {
      expect(isValidEmail("ada.example.com")).toBe(false);
    });

    it("rejects a missing local part", () => {
      expect(isValidEmail("@example.com")).toBe(false);
    });

    it("rejects a domain without a dot", () => {
      expect(isValidEmail("ada@example")).toBe(false);
    });

    it("rejects internal whitespace", () => {
      expect(isValidEmail("ada lovelace@example.com")).toBe(false);
    });
  });

  describe("validateFields", () => {
    it("returns no errors for valid fields", () => {
      expect(validateFields(validFields)).toEqual({});
    });

    it("allows an empty company (optional field)", () => {
      expect(validateFields({ ...validFields, company: "" })).toEqual({});
    });

    it("requires a name", () => {
      expect(validateFields({ ...validFields, name: "" }).name).toBeTruthy();
    });

    it("rejects whitespace-only names", () => {
      expect(validateFields({ ...validFields, name: "   " }).name).toBeTruthy();
    });

    it("accepts a name at the length limit", () => {
      expect(
        validateFields({ ...validFields, name: "a".repeat(FIELD_LIMITS.name) }),
      ).toEqual({});
    });

    it("rejects a name over the length limit", () => {
      expect(
        validateFields({ ...validFields, name: "a".repeat(FIELD_LIMITS.name + 1) })
          .name,
      ).toBeTruthy();
    });

    it("rejects an invalid email", () => {
      expect(validateFields({ ...validFields, email: "nope" }).email).toBeTruthy();
    });

    it("rejects an overlong email", () => {
      const email = `${"a".repeat(FIELD_LIMITS.email)}@example.com`;
      expect(validateFields({ ...validFields, email }).email).toBeTruthy();
    });

    it("rejects an overlong company", () => {
      expect(
        validateFields({
          ...validFields,
          company: "c".repeat(FIELD_LIMITS.company + 1),
        }).company,
      ).toBeTruthy();
    });

    it("requires a message", () => {
      expect(validateFields({ ...validFields, message: " " }).message).toBeTruthy();
    });

    it("accepts a message at the length limit", () => {
      expect(
        validateFields({ ...validFields, message: "m".repeat(FIELD_LIMITS.message) }),
      ).toEqual({});
    });

    it("rejects a message over the length limit", () => {
      expect(
        validateFields({
          ...validFields,
          message: "m".repeat(FIELD_LIMITS.message + 1),
        }).message,
      ).toBeTruthy();
    });

    it("accumulates multiple errors", () => {
      const errors = validateFields({
        name: "",
        email: "nope",
        company: "",
        message: "",
      });
      expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
    });
  });

  describe("isHoneypotTripped", () => {
    it("is false for an empty value", () => {
      expect(isHoneypotTripped("")).toBe(false);
    });

    it("is false for whitespace only", () => {
      expect(isHoneypotTripped("   ")).toBe(false);
    });

    it("is true for any filled value", () => {
      expect(isHoneypotTripped("https://spam.example")).toBe(true);
    });
  });

  describe("isTooFast", () => {
    it("flags submissions under the minimum", () => {
      expect(isTooFast(MIN_SUBMIT_MS - 1)).toBe(true);
    });

    it("allows submissions at the minimum", () => {
      expect(isTooFast(MIN_SUBMIT_MS)).toBe(false);
    });

    it("allows slow submissions", () => {
      expect(isTooFast(60_000)).toBe(false);
    });

    it("flags negative elapsed times", () => {
      expect(isTooFast(-5)).toBe(true);
    });

    it("flags non-finite elapsed times", () => {
      expect(isTooFast(Number.NaN)).toBe(true);
      expect(isTooFast(Number.POSITIVE_INFINITY)).toBe(true);
    });

    it("respects a custom minimum", () => {
      expect(isTooFast(500, 400)).toBe(false);
      expect(isTooFast(300, 400)).toBe(true);
    });
  });

  describe("buildContactPayload", () => {
    it("single-lines name and company, trims email and message", () => {
      const payload = buildContactPayload({
        fields: {
          name: "  Ada\nLovelace ",
          email: " ada@example.com ",
          company: " Analytical\tEngines ",
          message: "  line one\nline two  ",
        },
        token: "tok",
        website: "",
        elapsedMs: 5000,
      });
      expect(payload.name).toBe("Ada Lovelace");
      expect(payload.email).toBe("ada@example.com");
      expect(payload.company).toBe("Analytical Engines");
      expect(payload.message).toBe("line one\nline two");
    });

    it("passes token, website, and elapsedMs through unchanged", () => {
      const payload = buildContactPayload({
        fields: validFields,
        token: "tok",
        website: "hp",
        elapsedMs: 4200,
      });
      expect(payload.token).toBe("tok");
      expect(payload.website).toBe("hp");
      expect(payload.elapsedMs).toBe(4200);
    });
  });

  describe("parseContactPayload", () => {
    it("accepts a valid payload and returns it shaped", () => {
      const result = parseContactPayload({ ...validRaw, name: " Ada Lovelace " });
      expect(result).toEqual({
        ok: true,
        payload: { ...validRaw, name: "Ada Lovelace" },
      });
    });

    it("defaults missing company and website to empty strings", () => {
      const result = parseContactPayload({
        name: validRaw.name,
        email: validRaw.email,
        message: validRaw.message,
        token: validRaw.token,
        elapsedMs: validRaw.elapsedMs,
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.payload.company).toBe("");
        expect(result.payload.website).toBe("");
      }
    });

    it.each([null, "text", 42, []])(
      "rejects non-object input %p as malformed",
      (input) => {
        expect(parseContactPayload(input)).toEqual({
          ok: false,
          reason: "malformed",
        });
      },
    );

    it("rejects a missing message as malformed", () => {
      expect(
        parseContactPayload({
          name: validRaw.name,
          email: validRaw.email,
          token: validRaw.token,
          website: "",
          elapsedMs: validRaw.elapsedMs,
        }),
      ).toEqual({ ok: false, reason: "malformed" });
    });

    it("rejects a non-string name as malformed", () => {
      expect(parseContactPayload({ ...validRaw, name: 7 })).toEqual({
        ok: false,
        reason: "malformed",
      });
    });

    it("rejects a missing or empty token as malformed", () => {
      expect(parseContactPayload({ ...validRaw, token: undefined })).toEqual({
        ok: false,
        reason: "malformed",
      });
      expect(parseContactPayload({ ...validRaw, token: "" })).toEqual({
        ok: false,
        reason: "malformed",
      });
    });

    it("rejects a non-numeric elapsedMs as malformed", () => {
      expect(parseContactPayload({ ...validRaw, elapsedMs: "8000" })).toEqual({
        ok: false,
        reason: "malformed",
      });
      expect(parseContactPayload({ ...validRaw, elapsedMs: Number.NaN })).toEqual({
        ok: false,
        reason: "malformed",
      });
    });

    it("flags a filled honeypot", () => {
      expect(
        parseContactPayload({ ...validRaw, website: "https://spam.example" }),
      ).toEqual({ ok: false, reason: "honeypot" });
    });

    it("prefers the honeypot verdict over the time check", () => {
      expect(
        parseContactPayload({ ...validRaw, website: "spam", elapsedMs: 0 }),
      ).toEqual({ ok: false, reason: "honeypot" });
    });

    it("flags a too-fast submission", () => {
      expect(
        parseContactPayload({ ...validRaw, elapsedMs: MIN_SUBMIT_MS - 1 }),
      ).toEqual({ ok: false, reason: "too-fast" });
    });

    it("flags invalid field values", () => {
      expect(parseContactPayload({ ...validRaw, email: "nope" })).toEqual({
        ok: false,
        reason: "invalid",
      });
    });
  });

  describe("buildMailtoUrl", () => {
    it("targets the given address", () => {
      expect(
        buildMailtoUrl("inquiries@kcoh.ca", validFields).startsWith(
          "mailto:inquiries@kcoh.ca?subject=",
        ),
      ).toBe(true);
    });

    it("prefills the subject with the sender name", () => {
      const params = new URL(buildMailtoUrl("inquiries@kcoh.ca", validFields))
        .searchParams;
      expect(params.get("subject")).toBe("Website inquiry from Ada Lovelace");
    });

    it("prefills the body with message, company, and signature", () => {
      const body = new URL(buildMailtoUrl("inquiries@kcoh.ca", validFields))
        .searchParams.get("body");
      expect(body).toContain("We need a booking system that does not double-book.");
      expect(body).toContain("Company: Analytical Engines Ltd");
      expect(body).toContain("Ada Lovelace (ada@example.com)");
    });

    it("omits the company line when company is empty", () => {
      const body = new URL(
        buildMailtoUrl("inquiries@kcoh.ca", { ...validFields, company: "" }),
      ).searchParams.get("body");
      expect(body).not.toContain("Company:");
    });

    it("falls back to a generic subject when the name is empty", () => {
      const params = new URL(
        buildMailtoUrl("inquiries@kcoh.ca", { ...validFields, name: "" }),
      ).searchParams;
      expect(params.get("subject")).toBe("Website inquiry from the KCOH website");
    });
  });
  ```

- [ ] **Step 2: Run the suite and watch it fail.**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test
  ```

  Expect: vitest fails with a module-resolution error for `@/lib/contact-validation` ("Failed to resolve import" / "Cannot find module") — the module does not exist yet. The two pre-existing test files (`geometry.test.ts`, `use-count-up.test.ts`) still pass.

- [ ] **Step 3: Implement `web/lib/contact-validation.ts` (complete file). Pure module: no `"use client"`, no imports, mirrors `geometry.ts`.**

  ```ts
  export const MIN_SUBMIT_MS = 3000;

  export const FIELD_LIMITS = {
    name: 100,
    email: 254,
    company: 150,
    message: 5000,
  } as const;

  export type ContactFields = {
    name: string;
    email: string;
    company: string;
    message: string;
  };

  export type ContactPayload = ContactFields & {
    token: string;
    website: string;
    elapsedMs: number;
  };

  export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

  export type ParseFailureReason = "malformed" | "invalid" | "honeypot" | "too-fast";

  export type ParseResult =
    | { ok: true; payload: ContactPayload }
    | { ok: false; reason: ParseFailureReason };

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function singleLine(value: string): string {
    return value.replace(/\s+/g, " ").trim();
  }

  export function isValidEmail(email: string): boolean {
    return EMAIL_RE.test(email.trim());
  }

  export function validateFields(fields: ContactFields): FieldErrors {
    const errors: FieldErrors = {};
    const name = singleLine(fields.name);
    const email = fields.email.trim();
    const company = singleLine(fields.company);
    const message = fields.message.trim();

    if (name.length === 0) {
      errors.name = "Please tell us your name.";
    } else if (name.length > FIELD_LIMITS.name) {
      errors.name = `Please keep your name under ${FIELD_LIMITS.name} characters.`;
    }

    if (!isValidEmail(email) || email.length > FIELD_LIMITS.email) {
      errors.email = "Please enter a valid email address.";
    }

    if (company.length > FIELD_LIMITS.company) {
      errors.company = `Please keep the company name under ${FIELD_LIMITS.company} characters.`;
    }

    if (message.length === 0) {
      errors.message = "Please include a short message.";
    } else if (message.length > FIELD_LIMITS.message) {
      errors.message = `Please keep your message under ${FIELD_LIMITS.message} characters.`;
    }

    return errors;
  }

  export function isHoneypotTripped(website: string): boolean {
    return website.trim().length > 0;
  }

  export function isTooFast(
    elapsedMs: number,
    minMs: number = MIN_SUBMIT_MS,
  ): boolean {
    return !Number.isFinite(elapsedMs) || elapsedMs < minMs;
  }

  export function buildContactPayload(input: {
    fields: ContactFields;
    token: string;
    website: string;
    elapsedMs: number;
  }): ContactPayload {
    return {
      name: singleLine(input.fields.name),
      email: input.fields.email.trim(),
      company: singleLine(input.fields.company),
      message: input.fields.message.trim(),
      token: input.token,
      website: input.website,
      elapsedMs: input.elapsedMs,
    };
  }

  export function parseContactPayload(data: unknown): ParseResult {
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      return { ok: false, reason: "malformed" };
    }
    const record = data as Record<string, unknown>;
    const { name, email, message, token, elapsedMs } = record;
    const company = typeof record.company === "string" ? record.company : "";
    const website = typeof record.website === "string" ? record.website : "";

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      typeof token !== "string" ||
      token.length === 0 ||
      typeof elapsedMs !== "number" ||
      !Number.isFinite(elapsedMs)
    ) {
      return { ok: false, reason: "malformed" };
    }

    if (isHoneypotTripped(website)) {
      return { ok: false, reason: "honeypot" };
    }

    if (isTooFast(elapsedMs)) {
      return { ok: false, reason: "too-fast" };
    }

    const payload = buildContactPayload({
      fields: { name, email, company, message },
      token,
      website,
      elapsedMs,
    });

    if (Object.keys(validateFields(payload)).length > 0) {
      return { ok: false, reason: "invalid" };
    }

    return { ok: true, payload };
  }

  export function buildMailtoUrl(to: string, fields: ContactFields): string {
    const name = singleLine(fields.name);
    const subject = `Website inquiry from ${name || "the KCOH website"}`;
    const lines = [fields.message.trim()];
    const company = singleLine(fields.company);
    if (company) {
      lines.push("", `Company: ${company}`);
    }
    lines.push("", `${name} (${fields.email.trim()})`);
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }
  ```

- [ ] **Step 4: Run the suite and watch it pass.**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test
  ```

  Expect: all test files pass, including every `contact-validation.test.ts` case (0 failures).

- [ ] **Step 5: Commit.**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/lib/contact-validation.ts web/lib/__tests__/contact-validation.test.ts && git commit -m "feat(web): pure contact validation module with full vitest coverage"
  ```

---

### Task 11 (G1): Tilt math + `useTilt` hook

**Files:**
- Create: `web/lib/hooks/use-tilt.ts`
- Test: `web/lib/__tests__/use-tilt.test.ts`

**Interfaces:**
- Consumes: `useReducedMotion(): boolean` from `@/lib/hooks/use-reduced-motion`; `useSpring` from `motion/react`.
- Produces (pinned cross-workstream contract):
  ```ts
  export function computeTilt(px: number, py: number, maxDeg: number): { rotateX: number; rotateY: number }
  export function useTilt(maxDeg?: number): {
    ref: React.RefObject<HTMLDivElement | null>;
    style: React.CSSProperties;
    onMouseMove: React.MouseEventHandler;
    onMouseLeave: () => void;
  }
  ```

- [ ] **Step 1: Write the failing test for the tilt geometry.** Create `web/lib/__tests__/use-tilt.test.ts` with exactly:

  ```ts
  import { describe, it, expect } from "vitest";
  import { computeTilt } from "@/lib/hooks/use-tilt";

  describe("computeTilt", () => {
    it("is level at the center", () => {
      expect(computeTilt(0.5, 0.5, 2)).toEqual({ rotateX: 0, rotateY: 0 });
    });

    it("reaches plus/minus maxDeg at the corners", () => {
      expect(computeTilt(0, 0, 2)).toEqual({ rotateX: 2, rotateY: -2 });
      expect(computeTilt(1, 1, 2)).toEqual({ rotateX: -2, rotateY: 2 });
    });

    it("clamps positions outside the element", () => {
      expect(computeTilt(-1, 2, 2)).toEqual({ rotateX: -2, rotateY: -2 });
    });

    it("scales with maxDeg", () => {
      expect(computeTilt(1, 0.5, 5)).toEqual({ rotateX: 0, rotateY: 5 });
    });
  });
  ```

- [ ] **Step 2: Run the test and watch it fail.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx vitest run lib/__tests__/use-tilt.test.ts
  ```
  Expected failure: `Failed to resolve import "@/lib/hooks/use-tilt"` (module does not exist yet).

- [ ] **Step 3: Implement the hook.** Create `web/lib/hooks/use-tilt.ts` with exactly:

  ```ts
  "use client";

  import { useCallback, useEffect, useRef, useState } from "react";
  import { useSpring } from "motion/react";
  import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

  /**
   * Pure tilt geometry: px/py are the pointer position normalized to [0, 1]
   * within the element (clamped). Returns degrees so the surface leans
   * toward the cursor, never exceeding maxDeg.
   */
  export function computeTilt(
    px: number,
    py: number,
    maxDeg: number,
  ): { rotateX: number; rotateY: number } {
    const cx = Math.min(Math.max(px, 0), 1) - 0.5;
    const cy = Math.min(Math.max(py, 0), 1) - 0.5;
    return { rotateX: -cy * 2 * maxDeg, rotateY: cx * 2 * maxDeg };
  }

  const SPRING = { stiffness: 160, damping: 18, mass: 0.4 };

  /**
   * Cursor-aware perspective tilt (~2deg max by default), spring-driven.
   * Disabled on touch/coarse pointers and under prefers-reduced-motion.
   */
  export function useTilt(maxDeg = 2): {
    ref: React.RefObject<HTMLDivElement | null>;
    style: React.CSSProperties;
    onMouseMove: React.MouseEventHandler;
    onMouseLeave: () => void;
  } {
    const ref = useRef<HTMLDivElement | null>(null);
    const reduced = useReducedMotion();
    const [finePointer, setFinePointer] = useState(false);
    const rotateX = useSpring(0, SPRING);
    const rotateY = useSpring(0, SPRING);

    useEffect(() => {
      setFinePointer(
        window.matchMedia("(hover: hover) and (pointer: fine)").matches,
      );
    }, []);

    const enabled = finePointer && !reduced;

    useEffect(() => {
      if (!enabled) {
        if (ref.current) ref.current.style.transform = "";
        return;
      }
      const apply = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = `perspective(900px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`;
      };
      const unsubX = rotateX.on("change", apply);
      const unsubY = rotateY.on("change", apply);
      return () => {
        unsubX();
        unsubY();
      };
    }, [enabled, rotateX, rotateY]);

    const onMouseMove: React.MouseEventHandler = useCallback(
      (e) => {
        if (!enabled) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const t = computeTilt(
          (e.clientX - rect.left) / rect.width,
          (e.clientY - rect.top) / rect.height,
          maxDeg,
        );
        rotateX.set(t.rotateX);
        rotateY.set(t.rotateY);
      },
      [enabled, maxDeg, rotateX, rotateY],
    );

    const onMouseLeave = useCallback(() => {
      rotateX.set(0);
      rotateY.set(0);
    }, [rotateX, rotateY]);

    return {
      ref,
      style: enabled ? { willChange: "transform" } : {},
      onMouseMove,
      onMouseLeave,
    };
  }
  ```

- [ ] **Step 4: Run the test and watch it pass.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx vitest run lib/__tests__/use-tilt.test.ts
  ```
  Expected: 4 tests pass. Also run the whole suite to confirm nothing broke: `npm test`.

- [ ] **Step 5: Commit.**
  ```bash
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." add web/lib/hooks/use-tilt.ts web/lib/__tests__/use-tilt.test.ts
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." commit -m "feat(web): useTilt hook — spring-driven 2deg tilt, touch and reduced-motion safe"
  ```

---

### Task 12 (G2): `Tilt` wrapper component + hero dashboard tilt + hero "Explore the live demo" link

**Files:**
- Create: `web/components/site/tilt.tsx`
- Modify: `web/components/sections/hero.tsx`

**Interfaces:**
- Consumes: `useTilt(maxDeg?: number)` from Task G1; `cn(...inputs: ClassValue[]): string` from `@/lib/utils`.
- Produces: `export function Tilt({ maxDeg, className, children }: { maxDeg?: number; className?: string; children: React.ReactNode })` — declarative wrapper so server components (hero, case pages) can apply tilt without becoming client components themselves. Also ships the hero's "Explore the live demo →" affordance (→ `/dashboard/`) required by spec §9, which mandates the demo be linked from the hero, Services, and case pages (the other two entry points are Task 28 and Task 22).

- [ ] **Step 1: Create the wrapper.** Create `web/components/site/tilt.tsx` with exactly:

  ```tsx
  "use client";

  import { useTilt } from "@/lib/hooks/use-tilt";
  import { cn } from "@/lib/utils";

  export function Tilt({
    maxDeg = 2,
    className,
    children,
  }: {
    maxDeg?: number;
    className?: string;
    children: React.ReactNode;
  }) {
    const { ref, style, onMouseMove, onMouseLeave } = useTilt(maxDeg);

    return (
      <div
        ref={ref}
        style={style}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(className)}
      >
        {children}
      </div>
    );
  }
  ```

- [ ] **Step 2: Wrap the hero dashboard image and add the demo link.** In `web/components/sections/hero.tsx`, extend the import block. Before:

  ```tsx
  import { Reveal } from "@/components/site/reveal";
  import { CAL_URL } from "@/content/nav";
  ```

  After:

  ```tsx
  import Link from "next/link";
  import { ArrowRight } from "lucide-react";
  import { Reveal } from "@/components/site/reveal";
  import { Tilt } from "@/components/site/tilt";
  import { CAL_URL } from "@/content/nav";
  ```

  Then change the right-hand column. Before:

  ```tsx
          <Reveal delay={0.1} className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 translate-y-6 scale-95 rounded-[24px] opacity-40 blur-3xl"
              style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
            />
            <DashboardImage priority className="drop-shadow-2xl" />
          </Reveal>
  ```

  After:

  ```tsx
          <Reveal delay={0.1} className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 translate-y-6 scale-95 rounded-[24px] opacity-40 blur-3xl"
              style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
            />
            <Tilt maxDeg={2}>
              <DashboardImage priority className="drop-shadow-2xl" />
            </Tilt>
            <div className="mt-4 flex justify-center">
              <Link
                href="/dashboard/"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-brand-text"
              >
                Explore the live demo
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Reveal>
  ```

  (Everything else in the file stays byte-identical. The "Explore the live demo" link beneath the composition is the hero's spec-§9 demo entry point and mirrors Task 22's case-hero markup byte-for-byte apart from the icon size. Note: if the homepage-completion workstream later swaps `DashboardImage` for a live composition inside this same `Reveal`, the `Tilt` wrapper and demo link stay in place around/below it.)

- [ ] **Step 3: Verify in the browser, both themes.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev
  ```
  Open `http://localhost:3000`. Look for: moving the cursor across the hero dashboard tilts it subtly (max ~2 degrees, springs smoothly, settles level on mouse-leave); the "Explore the live demo" link renders centered beneath the composition and navigates to `/dashboard/` (the route exists from Phase 1 — the playable upgrade lands in Wave 2). Toggle the theme with the nav sun/moon button and repeat — behavior identical in dark and light, no clipping or shadow artifacts. Then open DevTools → Rendering → set "Emulate CSS media feature prefers-reduced-motion" to `reduce`, reload: the dashboard must stay perfectly static on hover. Finally, toggle DevTools device emulation (touch): no tilt on simulated touch, link still tappable.

- [ ] **Step 4: Verify the build stays clean.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
  ```
  Expected: static export completes with no errors.

- [ ] **Step 5: Commit.**
  ```bash
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." add web/components/site/tilt.tsx web/components/sections/hero.tsx
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." commit -m "feat(web): Tilt wrapper, hero dashboard tilt + live-demo link"
  ```

---

### Task 13 (G3): `Magnetic` button wrapper + hero CTAs

**Files:**
- Create: `web/components/site/magnetic.tsx`
- Test: `web/lib/__tests__/magnetic.test.ts`
- Modify: `web/components/sections/hero.tsx`

**Interfaces:**
- Consumes: `useReducedMotion()` from `@/lib/hooks/use-reduced-motion`; `motion`, `useSpring` from `motion/react`.
- Produces (pinned cross-workstream contract):
  ```ts
  export function computeMagneticOffset(dx: number, dy: number, strength: number, max?: number): { x: number; y: number }
  export function Magnetic({ children, strength }: { children: React.ReactNode; strength?: number }): JSX element
  ```

- [ ] **Step 1: Write the failing test for the offset math.** Create `web/lib/__tests__/magnetic.test.ts` with exactly:

  ```ts
  import { describe, it, expect } from "vitest";
  import { computeMagneticOffset } from "@/components/site/magnetic";

  describe("computeMagneticOffset", () => {
    it("scales the pointer offset by strength", () => {
      expect(computeMagneticOffset(40, -20, 0.25)).toEqual({ x: 10, y: -5 });
    });

    it("returns zero at the center", () => {
      expect(computeMagneticOffset(0, 0, 0.4)).toEqual({ x: 0, y: 0 });
    });

    it("clamps large offsets to the default max of 12px", () => {
      expect(computeMagneticOffset(400, -400, 0.25)).toEqual({ x: 12, y: -12 });
    });

    it("honors a custom max", () => {
      expect(computeMagneticOffset(100, 0, 1, 30)).toEqual({ x: 30, y: 0 });
    });
  });
  ```

- [ ] **Step 2: Run the test and watch it fail.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx vitest run lib/__tests__/magnetic.test.ts
  ```
  Expected failure: `Failed to resolve import "@/components/site/magnetic"`.

- [ ] **Step 3: Implement the component.** Create `web/components/site/magnetic.tsx` with exactly:

  ```tsx
  "use client";

  import { useCallback, useEffect, useRef, useState } from "react";
  import { motion, useSpring } from "motion/react";
  import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

  /**
   * Pure magnetic-pull math: dx/dy are the pointer offset from the element
   * center in px. Returns a translation scaled by strength and clamped to
   * plus/minus max px so buttons never fly off their layout position.
   */
  export function computeMagneticOffset(
    dx: number,
    dy: number,
    strength: number,
    max = 12,
  ): { x: number; y: number } {
    const clamp = (v: number) => Math.min(Math.max(v, -max), max);
    return { x: clamp(dx * strength), y: clamp(dy * strength) };
  }

  const SPRING = { stiffness: 260, damping: 18, mass: 0.4 };

  /**
   * Slight magnetic pull toward the cursor plus a press state.
   * Static passthrough on touch/coarse pointers and reduced motion.
   */
  export function Magnetic({
    children,
    strength = 0.25,
  }: {
    children: React.ReactNode;
    strength?: number;
  }) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const reduced = useReducedMotion();
    const [finePointer, setFinePointer] = useState(false);
    const x = useSpring(0, SPRING);
    const y = useSpring(0, SPRING);

    useEffect(() => {
      setFinePointer(
        window.matchMedia("(hover: hover) and (pointer: fine)").matches,
      );
    }, []);

    const enabled = finePointer && !reduced;

    const onMouseMove: React.MouseEventHandler<HTMLSpanElement> = useCallback(
      (e) => {
        if (!enabled) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const o = computeMagneticOffset(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2),
          strength,
        );
        x.set(o.x);
        y.set(o.y);
      },
      [enabled, strength, x, y],
    );

    const onMouseLeave = useCallback(() => {
      x.set(0);
      y.set(0);
    }, [x, y]);

    if (reduced) {
      return <span className="inline-block">{children}</span>;
    }

    return (
      <motion.span
        ref={ref}
        className="inline-block"
        style={{ x, y }}
        whileTap={{ scale: 0.97 }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </motion.span>
    );
  }
  ```

- [ ] **Step 4: Run the test and watch it pass.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx vitest run lib/__tests__/magnetic.test.ts
  ```
  Expected: 4 tests pass.

- [ ] **Step 5: Wrap the hero CTAs.** In `web/components/sections/hero.tsx` (the post-Task-12 file, which already imports `Link`, `ArrowRight`, and `Tilt`), add the import (after the `ArrowRight` import). Before:

  ```tsx
  import { ArrowRight } from "lucide-react";
  import { Reveal } from "@/components/site/reveal";
  ```

  After:

  ```tsx
  import { ArrowRight } from "lucide-react";
  import { Magnetic } from "@/components/site/magnetic";
  import { Reveal } from "@/components/site/reveal";
  ```

  Then wrap both buttons. Before:

  ```tsx
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                  Book a Conversation
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-border bg-transparent text-fg hover:bg-section-alt"
              >
                <a href="#work">See What We&apos;ve Built</a>
              </Button>
            </div>
  ```

  After:

  ```tsx
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Button asChild size="lg" className="rounded-full">
                  <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                    Book a Conversation
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-border bg-transparent text-fg hover:bg-section-alt"
                >
                  <a href="#work">See What We&apos;ve Built</a>
                </Button>
              </Magnetic>
            </div>
  ```

  (The rest of the file stays byte-identical to its post-G2 state.)

- [ ] **Step 6: Verify in the browser, both themes.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev
  ```
  Open `http://localhost:3000`. Look for: hovering near either hero button pulls it a few px toward the cursor (max 12px) and it springs back on leave; clicking shows a slight 0.97 press scale. Check in dark then light theme. With prefers-reduced-motion emulated (DevTools → Rendering), buttons stay static and remain fully clickable.

- [ ] **Step 7: Commit.**
  ```bash
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." add web/components/site/magnetic.tsx web/lib/__tests__/magnetic.test.ts web/components/sections/hero.tsx
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." commit -m "feat(web): Magnetic CTA wrapper with press state, applied to hero buttons"
  ```

---

### Task 14 (G4): Chart draw-on-scroll — `animateIn` on all four charts

> **Merge note (harmonization 9):** Runs in Wave 1 so the chart `animateIn` prop exists before Workstream B's mini-previews (Task 19) and F's demo (Tasks 36–46) render charts. B's `ProjectMiniPreview` does not pass `animateIn` — the default `true` applies and is the intended behavior (initial draw-on-view, then discrete data ticks).

**Files:**
- Modify: `web/components/dashboard/charts/area-chart.tsx`
- Modify: `web/components/dashboard/charts/sparkline.tsx`
- Modify: `web/components/dashboard/charts/bar-chart.tsx`
- Modify: `web/components/dashboard/charts/donut-gauge.tsx`

**Interfaces:**
- Consumes: `useReducedMotion()`, `motion` from `motion/react`, geometry helpers from `@/lib/charts/geometry` (unchanged).
- Produces: each chart gains `animateIn?: boolean` (default `true`); all other props and all existing call sites (`OverviewDashboard`, homepage `ScaledPreview` composition) unchanged:
  ```ts
  export function AreaChart({ data, width?, height?, highlightIndex?, animateIn?, className? }: { data: number[]; width?: number; height?: number; highlightIndex?: number; animateIn?: boolean; className?: string })
  export function Sparkline({ data, width?, height?, animateIn?, className? }: { data: number[]; width?: number; height?: number; animateIn?: boolean; className?: string })
  export type BarGroup = { label: string; a: number; b: number }  // unchanged
  export function BarChart({ data, max?, width?, height?, animateIn?, className? }: { data: BarGroup[]; max?: number; width?: number; height?: number; animateIn?: boolean; className?: string })
  export type DonutSegment = { value: number; color: string }  // unchanged
  export function DonutGauge({ pct?, segments?, size?, stroke?, trackClassName?, animateIn?, children?, className? }: { pct?: number; segments?: DonutSegment[]; size?: number; stroke?: number; trackClassName?: string; animateIn?: boolean; children?: React.ReactNode; className?: string })
  ```

Animation design (applies to all four): `whileInView` with `viewport={{ once: true, margin: "-40px" }}`, ease `[0.22, 1, 0.36, 1]` (Reveal's ease), every individual animation at most 0.35s. When `animateIn === false` or reduced motion, `initial`/`whileInView` are passed as `undefined`, so the SVG renders exactly as today (static). Gradient colors still come from `var(--brand)`/`var(--highlight)`, so B's `ProjectTheme` recolors animated charts automatically.

- [ ] **Step 1: Rewrite `area-chart.tsx`.** Replace the full contents of `web/components/dashboard/charts/area-chart.tsx` with (diff vs today: `motion`/`useReducedMotion` imports, `animateIn` prop, `EASE`/`VIEWPORT` consts, `path` → `motion.path` for area + line, highlight guide/dot grouped in a fading `motion.g`):

  ```tsx
  "use client";

  import { useId } from "react";
  import { motion } from "motion/react";
  import { areaPath, linePath, toPoints } from "@/lib/charts/geometry";
  import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const VIEWPORT = { once: true, margin: "-40px" } as const;

  export function AreaChart({
    data,
    width = 560,
    height = 190,
    highlightIndex,
    animateIn = true,
    className,
  }: {
    data: number[];
    width?: number;
    height?: number;
    highlightIndex?: number;
    animateIn?: boolean;
    className?: string;
  }) {
    const uid = useId().replace(/[:]/g, "");
    const reduced = useReducedMotion();
    const animate = animateIn && !reduced;
    const pad = 6;
    const line = linePath(data, width, height, pad);
    const area = areaPath(data, width, height, pad);
    const pts = toPoints(data, width, height, pad);
    const hp = highlightIndex !== undefined ? pts[highlightIndex] : undefined;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className={className}
        role="img"
        aria-label="Revenue over time"
      >
        <defs>
          <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--brand)", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: "var(--brand)", stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id={`stroke-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" style={{ stopColor: "var(--brand)" }} />
            <stop offset="100%" style={{ stopColor: "var(--highlight)" }} />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill={`url(#fill-${uid})`}
          initial={animate ? { opacity: 0 } : undefined}
          whileInView={animate ? { opacity: 1 } : undefined}
          viewport={VIEWPORT}
          transition={{ duration: 0.3, ease: EASE, delay: 0.08 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={`url(#stroke-${uid})`}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={animate ? { pathLength: 0 } : undefined}
          whileInView={animate ? { pathLength: 1 } : undefined}
          viewport={VIEWPORT}
          transition={{ duration: 0.35, ease: EASE }}
        />
        {hp ? (
          <motion.g
            initial={animate ? { opacity: 0 } : undefined}
            whileInView={animate ? { opacity: 1 } : undefined}
            viewport={VIEWPORT}
            transition={{ duration: 0.25, ease: EASE, delay: 0.15 }}
          >
            <line
              x1={hp.x}
              y1={hp.y}
              x2={hp.x}
              y2={height - pad}
              style={{ stroke: "var(--brand)" }}
              strokeOpacity="0.4"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={hp.x}
              cy={hp.y}
              r={5}
              style={{ fill: "var(--card)", stroke: "var(--brand)" }}
              strokeWidth={2.5}
              vectorEffect="non-scaling-stroke"
            />
          </motion.g>
        ) : null}
      </svg>
    );
  }
  ```

- [ ] **Step 2: Rewrite `sparkline.tsx`.** Replace the full contents of `web/components/dashboard/charts/sparkline.tsx` with (diff: same pattern — line sweeps via `pathLength`, area fades):

  ```tsx
  "use client";

  import { useId } from "react";
  import { motion } from "motion/react";
  import { areaPath, linePath } from "@/lib/charts/geometry";
  import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const VIEWPORT = { once: true, margin: "-40px" } as const;

  export function Sparkline({
    data,
    width = 180,
    height = 56,
    animateIn = true,
    className,
  }: {
    data: number[];
    width?: number;
    height?: number;
    animateIn?: boolean;
    className?: string;
  }) {
    const uid = useId().replace(/[:]/g, "");
    const reduced = useReducedMotion();
    const animate = animateIn && !reduced;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className={className}
        aria-hidden
      >
        <defs>
          <linearGradient id={`spark-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--brand)", stopOpacity: 0.25 }} />
            <stop offset="100%" style={{ stopColor: "var(--brand)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <motion.path
          d={areaPath(data, width, height, 3)}
          fill={`url(#spark-${uid})`}
          initial={animate ? { opacity: 0 } : undefined}
          whileInView={animate ? { opacity: 1 } : undefined}
          viewport={VIEWPORT}
          transition={{ duration: 0.3, ease: EASE, delay: 0.08 }}
        />
        <motion.path
          d={linePath(data, width, height, 3)}
          fill="none"
          style={{ stroke: "var(--brand)" }}
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={animate ? { pathLength: 0 } : undefined}
          whileInView={animate ? { pathLength: 1 } : undefined}
          viewport={VIEWPORT}
          transition={{ duration: 0.35, ease: EASE }}
        />
      </svg>
    );
  }
  ```

- [ ] **Step 3: Rewrite `bar-chart.tsx`.** Replace the full contents of `web/components/dashboard/charts/bar-chart.tsx` with (diff: bars become `motion.rect` growing from the baseline via `scaleY` with `originY: 1`, staggered ~30ms per group):

  ```tsx
  "use client";

  import { useId } from "react";
  import { motion } from "motion/react";
  import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

  export type BarGroup = { label: string; a: number; b: number };

  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const VIEWPORT = { once: true, margin: "-40px" } as const;

  export function BarChart({
    data,
    max = 30,
    width = 520,
    height = 190,
    animateIn = true,
    className,
  }: {
    data: BarGroup[];
    max?: number;
    width?: number;
    height?: number;
    animateIn?: boolean;
    className?: string;
  }) {
    const uid = useId().replace(/[:]/g, "");
    const reduced = useReducedMotion();
    const animate = animateIn && !reduced;
    const pad = 10;
    const innerH = height - pad * 2;
    const groupW = (width - pad * 2) / data.length;
    const barW = Math.min(14, groupW / 3.2);
    const gap = 6;

    const y = (v: number) => pad + innerH - (v / max) * innerH;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className={className}
        role="img"
        aria-label="Projects overview"
      >
        <defs>
          <linearGradient id={`barA-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--brand)" }} />
            <stop offset="100%" style={{ stopColor: "var(--brand)", stopOpacity: 0.55 }} />
          </linearGradient>
          <linearGradient id={`barB-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--highlight)" }} />
            <stop offset="100%" style={{ stopColor: "var(--highlight)", stopOpacity: 0.5 }} />
          </linearGradient>
        </defs>
        {data.map((g, i) => {
          const cx = pad + groupW * i + groupW / 2;
          const ax = cx - barW - gap / 2;
          const bx = cx + gap / 2;
          return (
            <g key={g.label}>
              <motion.rect
                x={ax}
                y={y(g.a)}
                width={barW}
                height={pad + innerH - y(g.a)}
                rx={4}
                fill={`url(#barA-${uid})`}
                style={{ originY: 1 }}
                initial={animate ? { scaleY: 0 } : undefined}
                whileInView={animate ? { scaleY: 1 } : undefined}
                viewport={VIEWPORT}
                transition={{ duration: 0.3, ease: EASE, delay: i * 0.03 }}
              />
              <motion.rect
                x={bx}
                y={y(g.b)}
                width={barW}
                height={pad + innerH - y(g.b)}
                rx={4}
                fill={`url(#barB-${uid})`}
                style={{ originY: 1 }}
                initial={animate ? { scaleY: 0 } : undefined}
                whileInView={animate ? { scaleY: 1 } : undefined}
                viewport={VIEWPORT}
                transition={{ duration: 0.3, ease: EASE, delay: i * 0.03 + 0.02 }}
              />
            </g>
          );
        })}
      </svg>
    );
  }
  ```

- [ ] **Step 4: Rewrite `donut-gauge.tsx`.** Replace the full contents of `web/components/dashboard/charts/donut-gauge.tsx` with (diff: animated `pct` mode fills via `pathLength` on a `motion.circle` inside a plain rotated `<g>`; animated `segments` mode grows each segment from its own start via constant `pathOffset` + animated `pathLength`, staggered 50ms; static modes are byte-identical to today's rendering):

  ```tsx
  "use client";

  import { useId } from "react";
  import { motion } from "motion/react";
  import { donutArc } from "@/lib/charts/geometry";
  import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

  export type DonutSegment = { value: number; color: string };

  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const VIEWPORT = { once: true, margin: "-40px" } as const;

  /**
   * A ring gauge. Pass a single `pct` for a one-value gauge, or `segments`
   * (values that sum to a whole) for a multi-part donut.
   */
  export function DonutGauge({
    pct,
    segments,
    size = 140,
    stroke = 14,
    trackClassName = "text-border",
    animateIn = true,
    children,
    className,
  }: {
    pct?: number;
    segments?: DonutSegment[];
    size?: number;
    stroke?: number;
    trackClassName?: string;
    animateIn?: boolean;
    children?: React.ReactNode;
    className?: string;
  }) {
    const uid = useId().replace(/[:]/g, "");
    const reduced = useReducedMotion();
    const animate = animateIn && !reduced;
    const r = (size - stroke) / 2;
    const cx = size / 2;

    let offset = 0;
    let startFraction = 0;

    return (
      <div className={className} style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id={`ring-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--brand)" }} />
              <stop offset="100%" style={{ stopColor: "var(--highlight)" }} />
            </linearGradient>
          </defs>
          <circle
            cx={cx}
            cy={cx}
            r={r}
            fill="none"
            strokeWidth={stroke}
            className={trackClassName}
            stroke="currentColor"
          />
          {segments ? (
            animate ? (
              <g transform={`rotate(-90 ${cx} ${cx})`}>
                {segments.map((seg, i) => {
                  const start = startFraction;
                  startFraction += seg.value;
                  return (
                    <motion.circle
                      key={i}
                      cx={cx}
                      cy={cx}
                      r={r}
                      fill="none"
                      style={{ stroke: seg.color }}
                      strokeWidth={stroke}
                      strokeLinecap="butt"
                      initial={{ pathLength: 0, pathOffset: start }}
                      whileInView={{ pathLength: seg.value, pathOffset: start }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.3, ease: EASE, delay: i * 0.05 }}
                    />
                  );
                })}
              </g>
            ) : (
              segments.map((seg, i) => {
                const { dash, gap } = donutArc(seg.value, r);
                const el = (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cx}
                    r={r}
                    fill="none"
                    style={{ stroke: seg.color }}
                    strokeWidth={stroke}
                    strokeDasharray={`${dash} ${gap}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="butt"
                    transform={`rotate(-90 ${cx} ${cx})`}
                  />
                );
                offset += dash;
                return el;
              })
            )
          ) : pct !== undefined ? (
            animate ? (
              <g transform={`rotate(-90 ${cx} ${cx})`}>
                <motion.circle
                  cx={cx}
                  cy={cx}
                  r={r}
                  fill="none"
                  stroke={`url(#ring-${uid})`}
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: Math.min(Math.max(pct, 0), 1) }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </g>
            ) : (
              (() => {
                const { dash, gap } = donutArc(pct, r);
                return (
                  <circle
                    cx={cx}
                    cy={cx}
                    r={r}
                    fill="none"
                    stroke={`url(#ring-${uid})`}
                    strokeWidth={stroke}
                    strokeDasharray={`${dash} ${gap}`}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${cx} ${cx})`}
                  />
                );
              })()
            )
          ) : null}
        </svg>
        {children ? (
          <div className="absolute inset-0 grid place-items-center text-center">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
  ```

- [ ] **Step 5: Confirm the existing geometry tests still pass and the build is clean.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test && npm run build
  ```
  Expected: all existing tests pass (chart geometry untouched); static export builds with no type errors.

- [ ] **Step 6: Verify in the browser, both themes.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev
  ```
  Open `http://localhost:3000/dashboard/`. Look for, as each card scrolls into view (scroll down slowly): the revenue area line sweeps left-to-right then the gradient fill fades in; the grouped bars grow up from the baseline with a slight left-to-right stagger; the 0.98 donut gauge fills clockwise from 12 o'clock; the segments donut grows each colored arc in sequence; the live-users sparkline sweeps. Each runs once only (scroll away and back: no replay). Repeat in light theme (nav toggle) — identical, gradients read correctly on white. Then check the homepage `#process` section: the scaled dashboard preview's charts animate when scrolled into view. Finally, emulate prefers-reduced-motion and reload both pages: every chart renders fully drawn with zero animation.

- [ ] **Step 7: Commit.**
  ```bash
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." add web/components/dashboard/charts/area-chart.tsx web/components/dashboard/charts/sparkline.tsx web/components/dashboard/charts/bar-chart.tsx web/components/dashboard/charts/donut-gauge.tsx
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." commit -m "feat(web): draw-on-scroll animateIn for AreaChart, BarChart, DonutGauge, Sparkline"
  ```

---

### Task 15 (G5): `usePointerGlow` hook

**Files:**
- Create: `web/lib/hooks/use-pointer-glow.ts`
- Test: `web/lib/__tests__/use-pointer-glow.test.ts`

**Interfaces:**
- Consumes: nothing beyond React.
- Produces (contract for B's featured cards and C's work rows — see "Contracts G publishes" at the top of this section for the matching overlay markup):
  ```ts
  export function computeGlowPosition(rect: { left: number; top: number }, clientX: number, clientY: number): { x: number; y: number }
  export function usePointerGlow(): {
    onMouseMove: React.MouseEventHandler<HTMLElement>;
    onMouseLeave: React.MouseEventHandler<HTMLElement>;
  }
  ```
  Design note: the handlers write `--glow-x`/`--glow-y` (px, element-local) and `--glow-opacity` onto `e.currentTarget`'s inline style — no ref, so the same hook return can be spread onto `<a>`, `<article>`, or `<div>` roots without ref-type friction. The overlay reads them with `var(..., fallback)` defaults, and its gradient uses `var(--brand)` so `ProjectTheme` recolors it per project.

- [ ] **Step 1: Write the failing test.** Create `web/lib/__tests__/use-pointer-glow.test.ts` with exactly:

  ```ts
  import { describe, it, expect } from "vitest";
  import { computeGlowPosition } from "@/lib/hooks/use-pointer-glow";

  describe("computeGlowPosition", () => {
    it("converts viewport coordinates to element-local coordinates", () => {
      expect(computeGlowPosition({ left: 100, top: 50 }, 160, 90)).toEqual({
        x: 60,
        y: 40,
      });
    });

    it("is zero at the element origin", () => {
      expect(computeGlowPosition({ left: 20, top: 20 }, 20, 20)).toEqual({
        x: 0,
        y: 0,
      });
    });

    it("goes negative when the pointer is outside the element", () => {
      expect(computeGlowPosition({ left: 100, top: 100 }, 90, 80)).toEqual({
        x: -10,
        y: -20,
      });
    });
  });
  ```

- [ ] **Step 2: Run the test and watch it fail.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx vitest run lib/__tests__/use-pointer-glow.test.ts
  ```
  Expected failure: `Failed to resolve import "@/lib/hooks/use-pointer-glow"`.

- [ ] **Step 3: Implement the hook.** Create `web/lib/hooks/use-pointer-glow.ts` with exactly:

  ```ts
  "use client";

  import { useCallback, useEffect, useState } from "react";

  /** Pure transform: viewport pointer coords -> element-local coords. */
  export function computeGlowPosition(
    rect: { left: number; top: number },
    clientX: number,
    clientY: number,
  ): { x: number; y: number } {
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  /**
   * Cursor-tracking brand glow for cards. Spread the returned handlers onto
   * the card root (which needs `relative overflow-hidden`) and render an
   * overlay child that reads --glow-x / --glow-y / --glow-opacity:
   *
   *   <div
   *     aria-hidden
   *     className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
   *     style={{
   *       opacity: "var(--glow-opacity, 0)",
   *       background:
   *         "radial-gradient(240px circle at var(--glow-x, 50%) var(--glow-y, 50%), color-mix(in srgb, var(--brand) 12%, transparent), transparent 70%)",
   *     }}
   *   />
   *
   * No-op on touch/coarse pointers.
   */
  export function usePointerGlow(): {
    onMouseMove: React.MouseEventHandler<HTMLElement>;
    onMouseLeave: React.MouseEventHandler<HTMLElement>;
  } {
    const [finePointer, setFinePointer] = useState(false);

    useEffect(() => {
      setFinePointer(
        window.matchMedia("(hover: hover) and (pointer: fine)").matches,
      );
    }, []);

    const onMouseMove: React.MouseEventHandler<HTMLElement> = useCallback(
      (e) => {
        if (!finePointer) return;
        const el = e.currentTarget;
        const { x, y } = computeGlowPosition(
          el.getBoundingClientRect(),
          e.clientX,
          e.clientY,
        );
        el.style.setProperty("--glow-x", `${x}px`);
        el.style.setProperty("--glow-y", `${y}px`);
        el.style.setProperty("--glow-opacity", "1");
      },
      [finePointer],
    );

    const onMouseLeave: React.MouseEventHandler<HTMLElement> = useCallback(
      (e) => {
        e.currentTarget.style.setProperty("--glow-opacity", "0");
      },
      [],
    );

    return { onMouseMove, onMouseLeave };
  }
  ```

- [ ] **Step 4: Run the test and watch it pass.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx vitest run lib/__tests__/use-pointer-glow.test.ts
  ```
  Expected: 3 tests pass.

- [ ] **Step 5: Commit.**
  ```bash
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." add web/lib/hooks/use-pointer-glow.ts web/lib/__tests__/use-pointer-glow.test.ts
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." commit -m "feat(web): usePointerGlow hook for cursor-tracking brand glow on cards"
  ```

---


## Wave 2 — Pages & Features (Tasks 16–46)

### Task 16 (C1): Copy case-study logo assets into `web/public/work/`

**Files:**
- Create: `web/public/work/concordia-connect.png`, `web/public/work/drafterie.png`, `web/public/work/skyroa.png`, `web/public/work/automedic.png` (copied + downscaled from repo-root originals)

**Interfaces:** Consumes: repo-root logo files (exact names from facts inventory §1: `Concordia_Connect_Icon.PNG` — note uppercase `.PNG`; `Draftory-Logo.png`; `skyroa-logo.png`; `Automedic Logo no text.png` — note spaces). Produces: static assets served at `/work/<slug>.png`, referenced by `CaseStudy.logoSrc` in Task C2.

- [ ] **Step 1: Copy and rename the four repo-root logos.** The originals are 768KB–1.5MB; `sips -Z 512` downscales the longest side to 512px (they render at ≤56px, so this is generous) to protect the Lighthouse ≥95 perf gate. Run from the repo root:

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc."
mkdir -p web/public/work
cp "Concordia_Connect_Icon.PNG" web/public/work/concordia-connect.png
cp "Draftory-Logo.png" web/public/work/drafterie.png
cp "skyroa-logo.png" web/public/work/skyroa.png
cp "Automedic Logo no text.png" web/public/work/automedic.png
sips -Z 512 web/public/work/concordia-connect.png web/public/work/drafterie.png web/public/work/skyroa.png web/public/work/automedic.png
```

- [ ] **Step 2: Verify the copies.** Run:

```bash
ls -la "/Users/kevincohen/Desktop/KCOH Software Inc./web/public/work/"
```

Expect exactly four files: `automedic.png`, `concordia-connect.png`, `drafterie.png`, `skyroa.png`, each well under 200KB after resampling (skyroa was already 13KB).

- [ ] **Step 3: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/public/work && git commit -m "feat(web): add case-study logo assets under public/work"
```

---

### Task 17 (C2): `web/content/case-studies.ts` — content module with real facts (TDD)

**Files:**
- Create: `web/content/case-studies.ts`
- Test: `web/lib/__tests__/case-studies.test.ts`

**Interfaces:** Consumes: nothing (leaf content module). Produces (pinned contract): `export type CaseSlug = "concordia-connect" | "drafterie" | "skyroa" | "automedic"`; `export type CaseStudy = { slug: CaseSlug; name: string; accent: string; tagline: string; oneLiner: string; factChips: [string, string, string]; problem: string[]; system: { title: string; body: string }[]; outcomes: { value: string; label: string }[]; stack: string[]; logoSrc: string }`; `export const caseStudies: CaseStudy[]`; `export function getCaseStudy(slug: CaseSlug): CaseStudy`. Plus C-internal `export function nextCaseStudy(slug: CaseSlug): CaseStudy` (wrap-around pager lookup).

- [ ] **Step 1: Write the failing test.** Create `web/lib/__tests__/case-studies.test.ts` with exactly:

```ts
import { describe, it, expect } from "vitest";
import {
  caseStudies,
  getCaseStudy,
  nextCaseStudy,
} from "@/content/case-studies";

describe("caseStudies", () => {
  it("contains exactly the four case slugs in site order", () => {
    expect(caseStudies.map((c) => c.slug)).toEqual([
      "concordia-connect",
      "drafterie",
      "skyroa",
      "automedic",
    ]);
  });

  it("gives every study three fact chips and at least three outcomes", () => {
    for (const c of caseStudies) {
      expect(c.factChips).toHaveLength(3);
      expect(c.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(c.problem.length).toBeGreaterThanOrEqual(2);
      expect(c.system.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("points every logoSrc at the copied /work/ assets", () => {
    for (const c of caseStudies) {
      expect(c.logoSrc).toBe(`/work/${c.slug}.png`);
    }
  });

  it("uses the real brand accent hex per project", () => {
    expect(getCaseStudy("concordia-connect").accent).toBe("#8b1d3f");
    expect(getCaseStudy("drafterie").accent).toBe("#6e63ff");
    expect(getCaseStudy("skyroa").accent).toBe("#4f46e5");
    expect(getCaseStudy("automedic").accent).toBe("#16a34a");
  });

  it("never misspells Drafterie", () => {
    const json = JSON.stringify(caseStudies);
    expect(json).not.toContain("Draftery");
    expect(json).not.toContain("Draftory");
    expect(getCaseStudy("drafterie").name).toBe("Drafterie");
  });
});

describe("getCaseStudy", () => {
  it("returns the entry whose slug matches", () => {
    expect(getCaseStudy("skyroa").name).toBe("Skyroa");
  });
});

describe("nextCaseStudy", () => {
  it("returns the following study in site order", () => {
    expect(nextCaseStudy("concordia-connect").slug).toBe("drafterie");
    expect(nextCaseStudy("drafterie").slug).toBe("skyroa");
  });

  it("wraps from the last study back to the first", () => {
    expect(nextCaseStudy("automedic").slug).toBe("concordia-connect");
  });
});
```

(`"Draftory"` capital-D never appears; the live domain fact `draftory.ca` is lowercase, so the assertion passes while still guarding against the superseded spellings.)

- [ ] **Step 2: Run the test and watch it fail.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test
```

Expect a module-resolution failure for the new file: `Failed to resolve import "@/content/case-studies"` (the module does not exist yet). Existing suites (`use-count-up`, `geometry`) still pass.

- [ ] **Step 3: Create `web/content/case-studies.ts`** with exactly:

```ts
// Case-study content for /work and /work/[slug].
//
// FACTS: every claim below is drafted from the verified v1 sources catalogued
// in plan-refs/facts-inventory.md (section 1). No metrics are invented: where
// a project has no numbers on record (Concordia Connect), outcomes are
// qualitative by design. Problem-narrative framing is written in the site
// voice and awaits Kevin's fact-check pass before launch (Phase 2 spec,
// open item 3).

export type CaseSlug =
  | "concordia-connect"
  | "drafterie"
  | "skyroa"
  | "automedic";

export type CaseStudy = {
  slug: CaseSlug;
  name: string;
  accent: string;
  tagline: string;
  oneLiner: string;
  factChips: [string, string, string];
  problem: string[];
  system: { title: string; body: string }[];
  outcomes: { value: string; label: string }[];
  stack: string[];
  logoSrc: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "concordia-connect",
    name: "Concordia Connect",
    accent: "#8b1d3f",
    tagline: "Connect. Belong. Succeed.",
    oneLiner:
      "A student networking platform for Concordia University. Native iOS and web, with realtime chat and sign-in through Apple and Google.",
    factChips: ["Native iOS + web", "Realtime chat", "Apple & Google sign-in"],
    problem: [
      "A campus full of people is not the same thing as a community. Students share classrooms and schedules, and still graduate without meeting the people who would have mattered.",
      "Concordia Connect was built to close that gap: one network for one university, on the devices students actually live on.",
    ],
    system: [
      {
        title: "One product, two clients",
        body: "A native iOS app built in SwiftUI and a web client, backed by the same Node and PostgreSQL system. The community is identical wherever you open it.",
      },
      {
        title: "Chat that feels instant",
        body: "Realtime messaging runs over Socket.IO. Conversations are the core of the product, not a feature bolted on.",
      },
      {
        title: "Sign-in without passwords",
        body: "Apple and Google sign-in get students in with accounts they already trust. Nothing new to remember, nothing new to leak.",
      },
      {
        title: "Lean, static web delivery",
        body: "The web client ships as a static build on Cloudflare Pages, with Resend for email and Cloudflare Web Analytics. Fast to load and cheap to operate.",
      },
    ],
    // No public metrics on record for Concordia Connect (facts inventory
    // section 1) — outcomes are qualitative statements of shipped scope.
    // None invented.
    outcomes: [
      { value: "2", label: "Clients shipped: native iOS and web" },
      { value: "Realtime", label: "Chat at the center of the product" },
      { value: "Static", label: "Web delivery on Cloudflare Pages" },
    ],
    stack: ["Swift", "SwiftUI", "Node", "PostgreSQL", "Socket.IO"],
    logoSrc: "/work/concordia-connect.png",
  },
  {
    slug: "drafterie",
    name: "Drafterie",
    accent: "#6e63ff",
    tagline: "From blank page to signed contract in minutes",
    // v1 index.html verbatim description. The live domain is draftory.ca;
    // the product name is standardized as Drafterie (commit 55b1468).
    oneLiner:
      "A full contract generation and e-signature platform. 8 contract types, built-in electronic signatures, and a native iOS companion app.",
    factChips: [
      "8 contract types",
      "Built-in e-signatures",
      "Live at draftory.ca",
    ],
    problem: [
      "Contracts are where momentum goes to die. Templates drift, signatures crawl through email threads, and nobody can prove which version was the one that got signed.",
      "Drafterie compresses the whole path: pick a contract type, generate a document of law-firm quality, and sign it in the same place, with an audit trail behind every signature.",
    ],
    system: [
      {
        title: "A contract engine, not a template folder",
        body: "Drafterie generates 8 contract types with law-firm quality PDF output. Documents are produced by the system, so every contract starts correct.",
      },
      {
        title: "Signatures with receipts",
        body: "Electronic signatures are built in, backed by cryptographic audit trails and HMAC-SHA256 signing. Who signed what, and when, is provable.",
      },
      {
        title: "Security treated as a feature",
        body: "AES-256-GCM encryption, passkey authentication, TOTP two-factor, and JWT auth. Contract data is handled like it matters.",
      },
      {
        title: "Web platform, native companion",
        body: "The platform runs on the web with Stripe handling payments, and a native iOS app keeps contracts within reach.",
      },
    ],
    outcomes: [
      { value: "8", label: "Contract types with built-in e-signatures" },
      { value: "AES-256", label: "GCM encryption on contract data" },
      { value: "Live", label: "Web and iOS, at draftory.ca" },
    ],
    // CONFLICT (facts inventory section 1): v1 portfolio.html says SQLite;
    // the newer projects.ts says PostgreSQL. Using the fuller v1 list until
    // Kevin's fact-check pass resolves it.
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "SQLite",
      "Stripe",
      "Cloudflare Pages",
      "Railway",
      "Swift",
    ],
    logoSrc: "/work/drafterie.png",
  },
  {
    slug: "skyroa",
    name: "Skyroa",
    accent: "#4f46e5",
    tagline: "Regulated escrow for digital goods",
    oneLiner:
      "Secure escrow protecting buyers and sellers in digital transactions. KYC verification, dispute resolution, real-time chat, and FINTRAC-aligned compliance.",
    factChips: ["Double-entry ledger", "Tiered KYC", "Live at skyroa.com"],
    problem: [
      "Digital goods trade on trust between strangers, which is to say they trade on hope. Someone ships first, and someone else decides whether to be honest.",
      "Skyroa removes the leap of faith. Funds sit in escrow until both sides deliver, with verified identities and a dispute process for when things go sideways.",
    ],
    system: [
      {
        title: "A ledger that cannot drift",
        body: "Every movement of money lands as a double-entry record. Balances are derived from the ledger, not asserted, so the books always reconcile.",
      },
      {
        title: "KYC that scales with risk",
        body: "Tiered identity verification: higher limits require stronger proof, in line with FINTRAC-aligned compliance.",
      },
      {
        title: "Trades as state machines",
        body: "Every trade moves through an explicit state-machine flow. There is never ambiguity about where a transaction stands.",
      },
      {
        title: "Both sides see the same truth",
        body: "WebSocket realtime updates and built-in chat keep buyer and seller in sync while a trade is open, with dispute resolution one step away.",
      },
    ],
    outcomes: [
      { value: "2", label: "Ledger entries for every movement, by design" },
      {
        value: "FINTRAC",
        label: "Aligned compliance, FMSB application in progress",
      },
      { value: "Live", label: "In production at skyroa.com" },
    ],
    stack: [
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Stripe",
      "Plaid",
      "React",
      "Cloudflare Workers",
    ],
    logoSrc: "/work/skyroa.png",
  },
  {
    slug: "automedic",
    name: "AutoMedic",
    accent: "#16a34a",
    tagline: "End-to-end booking system with real-time ops",
    oneLiner:
      "A full platform for a Montreal mobile mechanic business. Custom booking engine with live slot availability, admin dashboard with instant database sync, and bilingual support. All built from scratch.",
    factChips: [
      "Zero double-bookings",
      "Email + SMS with .ics",
      "Bilingual EN / FR",
    ],
    problem: [
      "For a mobile mechanic, the calendar is the business. Every double-booking is a missed job, a wasted drive, or a customer waiting in a parking lot for a van that is not coming.",
      "AutoMedic replaced the phone-and-notebook workflow with a booking engine that knows, in real time, exactly which slots exist and refuses to sell the same one twice.",
    ],
    system: [
      {
        title: "Transactional booking",
        body: "Bookings commit inside PostgreSQL transactions: no double-books, no race conditions. Two customers cannot win the same slot.",
      },
      {
        title: "An admin panel that runs the day",
        body: "Live schedule, service CRUD, date overrides, and revenue stats in one dashboard, synced instantly with the database.",
      },
      {
        title: "Notifications that arrive",
        body: "Resend email and Twilio SMS confirmations, each with an .ics calendar attachment, so appointments land where customers actually look.",
      },
      {
        title: "Bilingual by default",
        body: "English and French with runtime switching and locale detection. Built for how Montreal actually talks.",
      },
    ],
    outcomes: [
      { value: "0", label: "Double-bookings, enforced by the database" },
      { value: "2", label: "Languages, switchable at runtime" },
      { value: "Live", label: "At automedicquebec.com" },
    ],
    // CONFLICT (facts inventory section 1): projects.ts lists React Native;
    // v1 says a vanilla-JS web front end with Node/Express/PostgreSQL. Using
    // v1 until Kevin's fact-check pass resolves it.
    stack: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Resend",
      "Twilio",
      "Railway",
      "Cloudflare",
    ],
    logoSrc: "/work/automedic.png",
  },
];

export function getCaseStudy(slug: CaseSlug): CaseStudy {
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) {
    throw new Error(`Unknown case study slug: ${slug}`);
  }
  return study;
}

export function nextCaseStudy(slug: CaseSlug): CaseStudy {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}
```

- [ ] **Step 4: Run the tests and watch them pass.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test
```

Expect all suites green, including all 8 new `case-studies` assertions.

- [ ] **Step 5: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/content/case-studies.ts web/lib/__tests__/case-studies.test.ts && git commit -m "feat(web): case-studies content module with real project facts"
```

---

### Task 18 (C3): `outcomeToMetric` — outcome strings to `StatBlock` metrics (TDD)

**Files:**
- Create: `web/lib/case-metrics.ts`
- Test: `web/lib/__tests__/case-metrics.test.ts`

**Interfaces:** Consumes: `Metric` type from `web/content/metrics.ts` (`{ value: number; suffix?: string; display?: string; label: string }` — when `display` is set, `StatBlock` shows it literally and disables the count-up; otherwise it counts to `value` and appends `suffix`). Produces: `export function outcomeToMetric(value: string, label: string): Metric`.

Purpose: `CaseStudy.outcomes` values are strings (pinned contract). Numeric strings like `"8"` or `"2,600+"` should count up via the existing `useCountUp` inside `StatBlock`; non-numeric strings like `"AES-256"` or `"Live"` should render literally in display mode.

- [ ] **Step 1: Write the failing test.** Create `web/lib/__tests__/case-metrics.test.ts` with exactly:

```ts
import { describe, it, expect } from "vitest";
import { outcomeToMetric } from "@/lib/case-metrics";

describe("outcomeToMetric", () => {
  it("parses a plain integer into a counting metric", () => {
    expect(outcomeToMetric("8", "Contract types")).toEqual({
      value: 8,
      label: "Contract types",
    });
  });

  it("parses thousands separators and keeps a plus suffix", () => {
    expect(outcomeToMetric("2,600+", "Members")).toEqual({
      value: 2600,
      suffix: "+",
      label: "Members",
    });
  });

  it("keeps percent suffixes", () => {
    expect(outcomeToMetric("100%", "Uptime")).toEqual({
      value: 100,
      suffix: "%",
      label: "Uptime",
    });
  });

  it("parses zero as a counting metric", () => {
    expect(outcomeToMetric("0", "Double-bookings")).toEqual({
      value: 0,
      label: "Double-bookings",
    });
  });

  it("falls back to display mode for non-numeric values", () => {
    expect(outcomeToMetric("AES-256", "Encryption")).toEqual({
      value: 0,
      display: "AES-256",
      label: "Encryption",
    });
  });

  it("treats Live as a display value", () => {
    expect(outcomeToMetric("Live", "At skyroa.com")).toEqual({
      value: 0,
      display: "Live",
      label: "At skyroa.com",
    });
  });
});
```

- [ ] **Step 2: Run the test and watch it fail.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test
```

Expect: `Failed to resolve import "@/lib/case-metrics"`.

- [ ] **Step 3: Create `web/lib/case-metrics.ts`** (pure module, no `"use client"`) with exactly:

```ts
import type { Metric } from "@/content/metrics";

// Matches outcome values StatBlock can count up to: an integer (optionally
// with thousands separators) plus an optional "+" or "%" suffix. Anything
// else renders literally via Metric.display (count-up disabled).
const NUMERIC = /^(\d[\d,]*)\s*([+%]?)$/;

export function outcomeToMetric(value: string, label: string): Metric {
  const match = NUMERIC.exec(value.trim());
  if (!match) {
    return { value: 0, display: value, label };
  }
  const n = Number(match[1].replaceAll(",", ""));
  return match[2] ? { value: n, suffix: match[2], label } : { value: n, label };
}
```

- [ ] **Step 4: Run the tests and watch them pass.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test
```

Expect all 6 new assertions green, existing suites untouched.

- [ ] **Step 5: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/lib/case-metrics.ts web/lib/__tests__/case-metrics.test.ts && git commit -m "feat(web): outcome-to-metric mapping for case-study stat blocks"
```

---

### Task 19 (B3): ProjectMiniPreview — four per-project live compositions

> **Merge note (harmonization 1):** Section B's original prerequisite said "Task C1", but the file this task needs (`web/content/case-studies.ts`) is created by C's **Task C2 — Task 17** in this merged plan (Task 16 (C1) only copies the logo assets and creates no TypeScript). The interface block below and the workstream B preamble are corrected accordingly: an orchestrator must gate this task on Task 17, and the Step 1 prerequisite check guards it.

**Files:**
- Create: `web/components/work/mini-preview.tsx` (new `components/work/` directory)

**Interfaces:**
- Consumes:
  - `CaseSlug` from `web/content/case-studies.ts` — **Workstream C, Task C2 (Task 17 in this plan) must be merged first** (`export type CaseSlug = "concordia-connect" | "drafterie" | "skyroa" | "automedic"`). This type import is the only cross-workstream coupling.
  - `ProjectTheme({ accent, children, className })` from Task B1.
  - `tickSeries(series: number[], seed: number): number[]` from Task B2.
  - Existing primitives (API reference §6): `AreaChart({ data, width?, height?, highlightIndex?, className? })` from `@/components/dashboard/charts/area-chart`; `Sparkline({ data, width?, height?, className? })` from `@/components/dashboard/charts/sparkline`; `DonutGauge({ pct?, segments?, size?, stroke?, trackClassName?, children?, className? })` from `@/components/dashboard/charts/donut-gauge`; `useReducedMotion(): boolean` from `@/lib/hooks/use-reduced-motion`; `cn` from `@/lib/utils`.
- Produces:
  - `export function ProjectMiniPreview({ slug }: { slug: CaseSlug }): React.JSX.Element` — pinned cross-workstream contract, consumed by B4 and by Workstream C (`/work` index rows + case-page bodies).
  - **Hover protocol (additive, optional):** any ancestor element carrying a `data-preview-group` attribute becomes the hover trigger for the preview's animation (the component walks up with `Element.closest("[data-preview-group]")`; if no such ancestor exists it falls back to its own root). B4's cards set it on the card `<Link>`; C may set it on its feature rows. Works standalone with no attribute.

**Behavior:** each slug renders a compact two-tile dashboard vignette wrapped in `ProjectTheme` with that project's accent. While hovered with a mouse (pointer events filtered to `pointerType === "mouse"` → off on touch, spec §9) and reduced motion is off: the chart series ticks every 700 ms via `tickSeries` (discrete data updates — not a timed animation, so no 400 ms budget applies) and one status flips (a content swap whose only motion is a 300 ms color transition — sub-400 ms). With `prefers-reduced-motion: reduce`, nothing ticks and nothing flips. The whole preview is `aria-hidden` decoration (same convention as `ScaledPreview`), which also neutralizes `AreaChart`'s hardcoded `aria-label="Revenue over time"` inside a non-revenue context.

- [ ] **Step 1: Prerequisite check — confirm Workstream C's content module exists.**

```bash
ls "/Users/kevincohen/Desktop/KCOH Software Inc./web/content/case-studies.ts"
```

Expect the file to be listed. If it is not, STOP — this task is sequenced after Task 17 (C2); report the ordering problem instead of working around it.

- [ ] **Step 2: Create `web/components/work/mini-preview.tsx` — part 1 of 3 (directive, imports, data, shared tiles).** Create the file with exactly this content (parts 2 and 3 append below it, in order, to form one file):

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectTheme } from "@/components/site/project-theme";
import { AreaChart } from "@/components/dashboard/charts/area-chart";
import { Sparkline } from "@/components/dashboard/charts/sparkline";
import { DonutGauge } from "@/components/dashboard/charts/donut-gauge";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { tickSeries } from "@/lib/charts/tick";
import type { CaseSlug } from "@/content/case-studies";

/**
 * Per-project accent hexes. All four match web/content/projects.ts —
 * burgundy and violet are the products' real brand colors; indigo
 * (#4f46e5) and green (#16a34a) are the design-system values already
 * used for Skyroa and AutoMedic across the dashboard.
 */
const accents: Record<CaseSlug, string> = {
  "concordia-connect": "#8b1d3f",
  drafterie: "#6e63ff",
  skyroa: "#4f46e5",
  automedic: "#16a34a",
};

/** Sample UI series (dashboard sample-data convention, not claims). */
const baseSeries: Record<CaseSlug, number[]> = {
  "concordia-connect": [14, 18, 16, 22, 20, 26, 24, 30, 28, 34, 31, 38],
  drafterie: [4, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16],
  skyroa: [20, 24, 22, 28, 26, 32, 30, 36, 33, 40, 38, 44],
  automedic: [3, 5, 4, 7, 6, 8, 7, 10, 9, 12, 11, 13],
};

type CompositionProps = { series: number[]; active: boolean };

function Tile({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-card p-3", className)}
    >
      <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
        {title}
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function StatusRow({
  label,
  status,
  tint,
}: {
  label: string;
  status: string;
  tint: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-1 text-[11px]">
      <span className="truncate text-fg-muted">{label}</span>
      <span
        className={cn(
          "shrink-0 font-medium transition-colors duration-300",
          tint,
        )}
      >
        {status}
      </span>
    </div>
  );
}
```

- [ ] **Step 3: Append part 2 of 3 (the four per-project compositions)** directly below part 1:

```tsx
function ConcordiaPreview({ series, active }: CompositionProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      <Tile title="Messages this week" className="col-span-3">
        <div className="text-lg font-semibold tabular-nums text-fg">1,284</div>
        <AreaChart data={series} className="mt-1 h-16 w-full" />
      </Tile>
      <Tile title="Community" className="col-span-2">
        <div className="text-lg font-semibold tabular-nums text-fg">
          {active ? "148" : "132"}
        </div>
        <div className="text-[10px] text-pos">online now</div>
        <div className="mt-2">
          <StatusRow label="New members" status="+12 today" tint="text-brand-text" />
          <StatusRow label="Group chats" status="46 active" tint="text-fg" />
        </div>
      </Tile>
    </div>
  );
}

function DrafteriePreview({ active }: CompositionProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      <Tile title="Signature pipeline" className="col-span-3">
        <StatusRow label="Consulting agreement" status="Signed" tint="text-pos" />
        <StatusRow
          label="Mutual NDA"
          status={active ? "Signed" : "Viewed"}
          tint={active ? "text-pos" : "text-warn"}
        />
        <StatusRow label="Service contract" status="Sent" tint="text-brand-text" />
        <StatusRow
          label="Freelance retainer"
          status="Drafted"
          tint="text-fg-subtle"
        />
      </Tile>
      <Tile title="Signed this month" className="col-span-2">
        <DonutGauge pct={active ? 0.86 : 0.82} size={64} stroke={8}>
          <span className="text-[11px] font-semibold tabular-nums text-fg">
            {active ? "86%" : "82%"}
          </span>
        </DonutGauge>
        <div className="mt-2 text-[10px] text-fg-subtle">8 contract types</div>
      </Tile>
    </div>
  );
}

function SkyroaPreview({ series, active }: CompositionProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      <Tile title="Trade flow" className="col-span-3">
        <StatusRow
          label="TX-4821 · KYC verified"
          status="Cleared"
          tint="text-pos"
        />
        <StatusRow
          label="TX-4822 · Funds held"
          status={active ? "Released" : "In escrow"}
          tint={active ? "text-pos" : "text-warn"}
        />
        <StatusRow
          label="TX-4823 · Dispute open"
          status="Reviewing"
          tint="text-brand-text"
        />
        <StatusRow
          label="TX-4824 · Buyer funded"
          status="KYC check"
          tint="text-fg-subtle"
        />
      </Tile>
      <Tile title="Escrow volume" className="col-span-2">
        <div className="text-lg font-semibold tabular-nums text-fg">
          $46,120
        </div>
        <Sparkline data={series} className="mt-1 h-9 w-full" />
        <div className="mt-1 text-[10px] text-fg-subtle">FINTRAC-aligned</div>
      </Tile>
    </div>
  );
}

function AutoMedicPreview({ series, active }: CompositionProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      <Tile title="Booking queue" className="col-span-3">
        <StatusRow
          label="9:30 · Brake inspection"
          status="Confirmed"
          tint="text-pos"
        />
        <StatusRow
          label="11:00 · Oil change"
          status={active ? "Confirmed" : "Pending"}
          tint={active ? "text-pos" : "text-warn"}
        />
        <StatusRow
          label="13:30 · Diagnostic"
          status="Confirmed"
          tint="text-pos"
        />
        <StatusRow
          label="15:00 · Battery swap"
          status="SMS sent"
          tint="text-brand-text"
        />
      </Tile>
      <Tile title="Bookings this week" className="col-span-2">
        <div className="text-lg font-semibold tabular-nums text-fg">42</div>
        <Sparkline data={series} className="mt-1 h-9 w-full" />
        <div className="mt-1 text-[10px] text-fg-subtle">No double-books</div>
      </Tile>
    </div>
  );
}
```

- [ ] **Step 4: Append part 3 of 3 (composition map + exported root)** directly below part 2, completing the file:

```tsx
const compositions: Record<CaseSlug, React.ComponentType<CompositionProps>> = {
  "concordia-connect": ConcordiaPreview,
  drafterie: DrafteriePreview,
  skyroa: SkyroaPreview,
  automedic: AutoMedicPreview,
};

/**
 * Small live dashboard composition for one project, re-skinned in its
 * brand palette via ProjectTheme. Decorative (aria-hidden). While a mouse
 * hovers it — or any ancestor marked data-preview-group — the chart
 * series ticks and one status flips; both are disabled under
 * prefers-reduced-motion and on touch.
 */
export function ProjectMiniPreview({ slug }: { slug: CaseSlug }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const seedRef = useRef(1);
  const base = baseSeries[slug];
  const [series, setSeries] = useState(base);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const target =
      (el.closest("[data-preview-group]") as HTMLElement | null) ?? el;
    const on = (e: PointerEvent) => {
      if (e.pointerType === "mouse") setActive(true);
    };
    const off = () => setActive(false);
    target.addEventListener("pointerenter", on);
    target.addEventListener("pointerleave", off);
    return () => {
      target.removeEventListener("pointerenter", on);
      target.removeEventListener("pointerleave", off);
    };
  }, []);

  useEffect(() => {
    if (!active || reduced) {
      setSeries(base);
      return;
    }
    setSeries((s) => tickSeries(s, seedRef.current++));
    const id = setInterval(() => {
      setSeries((s) => tickSeries(s, seedRef.current++));
    }, 700);
    return () => clearInterval(id);
  }, [active, reduced, base]);

  const Composition = compositions[slug];

  return (
    <ProjectTheme accent={accents[slug]}>
      <div
        ref={rootRef}
        aria-hidden
        className="select-none overflow-hidden rounded-xl border border-border bg-section p-3"
      >
        <Composition series={series} active={active && !reduced} />
      </div>
    </ProjectTheme>
  );
}
```

- [ ] **Step 5: Type/build check.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
```

Expect exit code 0 and no type errors. (The component is not yet rendered by any page; full visual verification in both themes happens in B4, where all four previews appear on the homepage. If B4 is being executed by a different agent, this build check is this task's gate.)

- [ ] **Step 6: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/work/mini-preview.tsx && git commit -m "feat(web): ProjectMiniPreview — four per-project live dashboard vignettes"
```

---

### Task 20 (B4): Rebuild Featured Work into two-across live feature cards

> **Merge note (harmonization 3, forward pointer):** This file is deliberately written as a **server** component. **Task 52 (G11)** later adds the cursor glow, which will convert `featured-work.tsx` to a `"use client"` file (or factor `FeatureCard` out into a client file). Do not pre-empt that here — build exactly as specified.

**Files:**
- Modify: `web/components/sections/featured-work.tsx` (full rewrite, contents below)
- Modify: `web/content/projects.ts` (minimal extension — four `href` values; exact diff below)

**Interfaces:**
- Consumes: `ProjectTheme` (B1), `ProjectMiniPreview({ slug })` + `data-preview-group` hover protocol (B3), `CaseSlug` from `@/content/case-studies` (C1), and existing `Container`, `SectionLabel`, `Reveal`, `projects`/`Project`, `cn`-free primitives per API reference. Routes `/work/[slug]/` are owned by Workstream C.
- Produces: `export function FeaturedWork(): React.JSX.Element` (no props — same signature the homepage `web/app/page.tsx` already renders; no page change needed). Also: `projects.ts` `href` fields for the four featured projects now point at `/work/<slug>/`, which every other `Project` consumer (e.g. `ProjectCard`, footer) inherits.

- [ ] **Step 1: Extend `web/content/projects.ts` — point the four featured projects at their case pages.** Four edits, exact before → after (each `old_string` is unique because it includes the adjacent `logo` line):

Edit 1 (Drafterie):
```ts
// BEFORE
    logo: "/logos/drafterie.png",
    featured: true,
    href: "#",
// AFTER
    logo: "/logos/drafterie.png",
    featured: true,
    href: "/work/drafterie/",
```

Edit 2 (Concordia Connect):
```ts
// BEFORE
    logo: "/logos/concordia.png",
    featured: true,
    href: "#",
// AFTER
    logo: "/logos/concordia.png",
    featured: true,
    href: "/work/concordia-connect/",
```

Edit 3 (Skyroa):
```ts
// BEFORE
    logo: "/logos/skyroa.png",
    featured: true,
    href: "#",
// AFTER
    logo: "/logos/skyroa.png",
    featured: true,
    href: "/work/skyroa/",
```

Edit 4 (AutoMedic):
```ts
// BEFORE
    logo: "/logos/automedic.png",
    featured: true,
    href: "#",
// AFTER
    logo: "/logos/automedic.png",
    featured: true,
    href: "/work/automedic/",
```

No other lines in `projects.ts` change (Success and FrostyNow keep `href: "#"` — logo-strip only per spec §2).

- [ ] **Step 2: Rewrite `web/components/sections/featured-work.tsx`.** Replace the entire file with:

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { ProjectTheme } from "@/components/site/project-theme";
import { ProjectMiniPreview } from "@/components/work/mini-preview";
import { projects, type Project } from "@/content/projects";
import type { CaseSlug } from "@/content/case-studies";

const featuredSlugs: CaseSlug[] = [
  "concordia-connect",
  "drafterie",
  "skyroa",
  "automedic",
];

const featured = featuredSlugs.flatMap((slug) => {
  const project = projects.find((p) => p.slug === slug);
  return project ? [{ slug, project }] : [];
});

function FeatureCard({ slug, project }: { slug: CaseSlug; project: Project }) {
  return (
    <ProjectTheme accent={project.color} className="h-full w-full">
      <Link
        href={project.href}
        data-preview-group
        className="group flex h-full flex-col rounded-[20px] border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand)_45%,transparent)] hover:shadow-[0_30px_80px_-32px_color-mix(in_srgb,var(--brand)_60%,transparent)]"
      >
        <div className="flex items-center justify-between gap-4">
          <SectionLabel className="tracking-[0.18em]">
            {project.tagline}
          </SectionLabel>
          <div
            className="grid size-9 shrink-0 place-items-center rounded-lg"
            style={{ background: `${project.color}1f` }}
          >
            <Image
              src={project.logo}
              alt=""
              width={22}
              height={22}
              className="size-5 object-contain"
            />
          </div>
        </div>
        <h3 className="mt-3 font-serif text-2xl font-medium tracking-[-0.01em] text-fg">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {project.description}
        </p>
        <div className="mt-5 flex-1">
          <ProjectMiniPreview slug={slug} />
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-text">
          Read the case study
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </ProjectTheme>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-24 bg-bg">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionLabel>Featured Work</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
            Everything shown here was built, shipped, and operated in
            production.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featured.map(({ slug, project }, i) => (
            <Reveal key={slug} delay={i * 0.08} className="flex">
              <FeatureCard slug={slug} project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

Design notes locking spec §4.1 to code: two-across = `md:grid-cols-2`; brand-color border glow = the `hover:border-[color-mix(...)]` + `hover:shadow-[...color-mix(in srgb,var(--brand) 60%,transparent)]` pair, which resolves to each card's own accent because `ProjectTheme` wraps the `<Link>` (underscores inside the arbitrary values are Tailwind's space encoding — keep them exactly); eyebrow = `SectionLabel` (its `text-brand-text` recolors per project to the AA-safe accent tone from Task 7 — Concordia's eyebrow renders "Connect. Belong. Succeed." in a readable burgundy tone, all taglines verbatim from `projects.ts`; the card's "Read the case study" line uses `text-brand-text` for the same reason — raw burgundy is 2.25:1 on the dark bg); live mini-preview = `ProjectMiniPreview`; hover animation = `data-preview-group` on the `<Link>` so hovering anywhere on the card ticks the chart and flips a status; links to case pages = `project.href` (now `/work/<slug>/` from Step 1). The h2 is the verified v1 trust line, verbatim. This file stays a server component through this task — all interactivity lives in the already-`"use client"` `ProjectMiniPreview` and `Reveal`. (Task 52 (G11) later prepends `"use client"` to this file as its own Step 1, so `FeatureCard` can host the pointer-glow hook — expected, per harmonization 3.) `Link` from `next/link` matches the `nav.tsx` convention for internal routes. `ProjectCard` (`web/components/project-card.tsx`) is intentionally untouched — no longer used here, still available to other workstreams.

- [ ] **Step 3: Build + lint.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build && npm run lint
```

Expect: exit code 0 for both; the homepage route exports; no unused-import warnings (the rewrite removed the `ProjectCard` import).

- [ ] **Step 4: Visual verification in BOTH themes.** Start the dev server:

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev
```

Open `http://localhost:3000/#work` (browser, or Playwright MCP `browser_navigate` + `browser_take_screenshot`). Verify in **dark** (default theme):
  1. Cards are two-across at ≥768px, single column below; all four cards equal height in a row.
  2. Per-card accents: charts/glows in the RAW accents — Concordia burgundy `#8b1d3f`, Drafterie violet `#6e63ff`, Skyroa indigo `#4f46e5`, AutoMedic green `#16a34a` — while eyebrows, status tints, and "Read the case study" render the AA-safe `--brand-text` tone of each accent (Task 7; e.g. Concordia's small text is a lightened burgundy in dark theme, never raw `#8b1d3f`), and the nav, buttons, and section eyebrow "Featured Work" stay site violet.
  3. Hover a card (anywhere on it): border and soft glow shadow tint in that card's own color; the chart series starts shifting roughly every 0.7 s; Drafterie's "Mutual NDA" flips Viewed→Signed and its donut steps 82%→86%; Skyroa's "Funds held" flips In escrow→Released; AutoMedic's "Oil change" flips Pending→Confirmed; Concordia's online count bumps 132→148; the "Read the case study" arrow nudges right. Un-hover: everything settles back.
  4. Each card's link points at `/work/<slug>/` (inspect the anchor; a 404 on click is expected until Workstream C's routes land — note it, don't fix it here).

Toggle to **light** via the nav sun/moon and re-check items 1–3: tiles read cleanly on white, status tints (`text-pos`/`text-warn`) legible, accent glows visible but restrained. Then in DevTools enable `prefers-reduced-motion: reduce` emulation and confirm hover produces **no** ticking and **no** status flips in either theme. Finally check 360 px viewport: cards stack, preview grids stay intact, labels truncate instead of overflowing. Stop the dev server.

- [ ] **Step 5: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/sections/featured-work.tsx web/content/projects.ts && git commit -m "feat(web): rebuild Featured Work into two-across feature cards with live per-project previews"
```

---

### Task 21 (C4): `/work/` index page — alternating per-project feature rows

**Files:**
- Create: `web/components/work/feature-row.tsx`
- Create: `web/app/work/page.tsx`

**Interfaces:** Consumes: `PageHero`, `CTASection`, `LogoRow` [A]; `ProjectTheme`, `ProjectMiniPreview({ slug })` [B]; `Container`, `Reveal`, `cn`; `caseStudies`, `CaseStudy` from Task C2. Produces: `export function WorkFeatureRow({ study, flip }: { study: CaseStudy; flip?: boolean })` (server component); route `/work/` with static `metadata`.

Design notes: each row is wrapped in `ProjectTheme accent={study.accent}` so the eyebrow, "Read the case study" link, and the mini-preview's chart accents recolor per project. The accent is used only for text, a 12%-alpha logo tint, and chart strokes — never a large fill. Rows alternate text/preview sides via `flip`.

- [ ] **Step 1: Create `web/components/work/feature-row.tsx`** with exactly:

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/site/container";
import { ProjectTheme } from "@/components/site/project-theme";
import { ProjectMiniPreview } from "@/components/work/mini-preview";
import { Reveal } from "@/components/site/reveal";
import type { CaseStudy } from "@/content/case-studies";

export function WorkFeatureRow({
  study,
  flip = false,
}: {
  study: CaseStudy;
  flip?: boolean;
}) {
  return (
    <ProjectTheme accent={study.accent}>
      <article className="border-t border-border bg-bg">
        <Container>
          <div className="grid items-center gap-10 py-16 md:py-20 lg:grid-cols-12 lg:gap-14">
            <Reveal className={cn("lg:col-span-5", flip && "lg:order-2")}>
              <div className="flex items-center gap-3">
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-xl border border-border"
                  style={{ background: `${study.accent}1f` }}
                >
                  <Image
                    src={study.logoSrc}
                    alt={`${study.name} logo`}
                    width={24}
                    height={24}
                    className="size-6 object-contain"
                  />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-brand-text">
                  {study.tagline}
                </span>
              </div>
              <h2 className="mt-5 font-serif text-[clamp(28px,3.2vw,42px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
                {study.name}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
                {study.oneLiner}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {study.factChips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-fg-muted"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
              <Link
                href={`/work/${study.slug}/`}
                className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text"
              >
                Read the case study
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>

            <Reveal
              delay={0.1}
              className={cn("lg:col-span-7", flip && "lg:order-1")}
            >
              <ProjectMiniPreview slug={study.slug} />
            </Reveal>
          </div>
        </Container>
      </article>
    </ProjectTheme>
  );
}
```

- [ ] **Step 2: Create `web/app/work/page.tsx`** with exactly:

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { LogoRow } from "@/components/site/logo-row";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { WorkFeatureRow } from "@/components/work/feature-row";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from KCOH Software Inc.: Concordia Connect, Drafterie, Skyroa, and AutoMedic. Systems built, shipped, and operated in production.",
  alternates: { canonical: "/work/" },
  openGraph: {
    title: "Work",
    description:
      "Case studies from KCOH Software Inc.: Concordia Connect, Drafterie, Skyroa, and AutoMedic.",
    images: ["/og.png"],
  },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title={
          <>
            Systems that run
            <br />
            real businesses.
          </>
        }
        intro="Everything shown here was built, shipped, and operated in production."
      />

      {caseStudies.map((study, i) => (
        <WorkFeatureRow key={study.slug} study={study} flip={i % 2 === 1} />
      ))}

      <section className="border-t border-border bg-section">
        <Container className="py-14 md:py-16">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-fg-subtle">
              Also built and shipped
            </p>
            <LogoRow names={["Success", "FrostyNow"]} />
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
```

(The intro line is the verified trust line from v1 `portfolio.html`, verbatim. Success and FrostyNow get the quiet logo strip only — no case pages, per the Phase 2 spec decision table.)

- [ ] **Step 3: Build to verify the route compiles and exports.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
```

Expect a clean build with `/work` in the route table and `out/work/index.html` emitted:

```bash
ls "/Users/kevincohen/Desktop/KCOH Software Inc./web/out/work/"
```

- [ ] **Step 4: Visual check in both themes.** Run `npm run dev` in `web/`, open `http://localhost:3000/work/` (default dark theme), then click the nav theme toggle for light. At 1440px and 360px widths check:
  - Dark: four rows alternate sides; each eyebrow/tagline and "Read the case study" link renders in that project's accent **tone** (`text-brand-text` — Task 7's AA derivation, so the Concordia row reads as a lightened burgundy ≈5.8:1 on `#05070b`, never the raw `#8b1d3f` at 2.25:1); mini-preview charts recolor per row in the RAW accents (charts keep `--brand`); accents appear only as text/tints/strokes, never a filled panel. If any eyebrow computes to the raw accent hex, the `data-project-theme` attribute or the `[data-project-theme]` CSS from Task 7 is missing — fix there, not here.
  - Light: same layout on `#fafafb`; chips readable (`bg-card` on `bg-bg`); logo tints still subtle.
  - Both: PageHero at top, "Also built and shipped" strip with Success + FrostyNow, CTASection close ("Let's talk about what you're building."); at 360px rows stack preview-below-text and chips wrap.

- [ ] **Step 5: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/work/feature-row.tsx web/app/work/page.tsx && git commit -m "feat(web): /work index with per-project themed feature rows"
```

---

### Task 22 (C5): Case-study hero — `CaseHero` (tilt via G2's `Tilt`)

> **Merge note (harmonization 2):** C5 originally planned its own `TiltFrame` client wrapper — a near-duplicate of the `Tilt` component Task 12 (G2) already ships (both are thin `useTilt` consumers). This plan removes the duplicate: `CaseHero` consumes **G2's `Tilt` from `@/components/site/tilt`** directly. This task therefore depends on Task 12 (G2), not just Task 11 (G1). Do NOT create `web/components/work/tilt-frame.tsx`.

**Files:**
- Create: `web/components/work/case-hero.tsx`

**Interfaces:** Consumes: `Tilt({ maxDeg, className, children }: { maxDeg?: number; className?: string; children: React.ReactNode })` from `@/components/site/tilt` [G, Task 12 (G2)]; `Container`, `Reveal`, `ScaledPreview`, `DashboardScreen`; `CaseStudy` from Task C2. Produces: `export function CaseHero({ study }: { study: CaseStudy })` (server). `CaseHero` does NOT wrap itself in `ProjectTheme` — the page wrapper (Task C7) provides it, so `var(--brand)` here already resolves to the project accent.

- [ ] **Step 1: Prerequisite check — confirm G2's `Tilt` wrapper exists** (this task reuses it instead of duplicating a tilt wrapper):

```bash
ls "/Users/kevincohen/Desktop/KCOH Software Inc./web/components/site/tilt.tsx"
```

Expect the file to be listed. If it is not, STOP — this task is sequenced after Task 12 (G2); report the ordering problem instead of recreating a local wrapper.

- [ ] **Step 2: Create `web/components/work/case-hero.tsx`** with exactly:

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { ScaledPreview } from "@/components/site/scaled-preview";
import { DashboardScreen } from "@/components/dashboard/dashboard-screen";
import { Tilt } from "@/components/site/tilt";
import type { CaseStudy } from "@/content/case-studies";

// Rendered inside the page-level ProjectTheme wrapper, so var(--brand) is the
// project accent here. The gradient is a low-opacity radial tint on the base
// background — an atmosphere, never a fill.
export function CaseHero({ study }: { study: CaseStudy }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />
      <Container className="relative pb-16 pt-20 md:pb-20 md:pt-28">
        <Reveal>
          <div className="flex items-center gap-4">
            <span
              className="grid size-14 shrink-0 place-items-center rounded-2xl border border-border"
              style={{ background: `${study.accent}14` }}
            >
              <Image
                src={study.logoSrc}
                alt={`${study.name} logo`}
                width={32}
                height={32}
                className="size-8 object-contain"
                priority
              />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-text">
                Case Study
              </p>
              <h1 className="mt-1 font-serif text-[clamp(36px,5vw,64px)] font-medium leading-[1.02] tracking-[-0.015em] text-fg">
                {study.name}
              </h1>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {study.oneLiner}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {study.factChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-fg"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <Tilt maxDeg={2} className="will-change-transform">
            <ScaledPreview designWidth={1160}>
              <DashboardScreen />
            </ScaledPreview>
          </Tilt>
          <div className="mt-4 flex justify-center">
            <Link
              href="/dashboard/"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-brand-text"
            >
              Explore the live demo
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

(The full-width `DashboardScreen` inside `ScaledPreview` is the "live dashboard composition re-skinned in the project palette" — its `AreaChart`/`BarChart`/`DonutGauge`/`Sparkline` consume `var(--brand)` via inline SVG styles, so the page-level `ProjectTheme` recolors every chart with zero chart changes. The "Explore the live demo" affordance is required by spec section 9.)

- [ ] **Step 3: Verify compilation.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
```

Expect a clean build (the component is not yet routed but is type-checked; failures here mean a contract mismatch with G2's `Tilt` — fix the import/usage, not the contract).

- [ ] **Step 4: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/work/case-hero.tsx && git commit -m "feat(web): case-study hero with tilted live dashboard composition"
```

---

### Task 23 (C6): Case-study body sections + next-project pager

**Files:**
- Create: `web/components/work/case-problem.tsx`
- Create: `web/components/work/case-system.tsx`
- Create: `web/components/work/case-outcome.tsx`
- Create: `web/components/work/next-project-pager.tsx`

**Interfaces:** Consumes: `Container`, `SectionLabel`, `Reveal`, `cn`; `StatBlock({ metric })`; `ProjectTheme` [B]; `ProjectMiniPreview({ slug })` [B]; `outcomeToMetric` from Task C3; `CaseStudy`, `CaseSlug`, `nextCaseStudy` from Task C2. Produces: `export function CaseProblem({ study }: { study: CaseStudy })`; `export function CaseSystem({ study }: { study: CaseStudy })`; `export function CaseOutcome({ study }: { study: CaseStudy })` (includes the tech row); `export function NextProjectPager({ current }: { current: CaseSlug })` (self-wraps in `ProjectTheme` with the NEXT project's accent). All server components.

- [ ] **Step 1: Create `web/components/work/case-problem.tsx`** with exactly:

```tsx
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/content/case-studies";

export function CaseProblem({ study }: { study: CaseStudy }) {
  return (
    <section className="bg-bg">
      <Container className="py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel>The Problem</SectionLabel>
          </Reveal>
          <div className="space-y-5 lg:col-span-7 lg:col-start-6">
            {study.problem.map((para, i) => (
              <Reveal key={para} delay={i * 0.05}>
                <p
                  className={cn(
                    "leading-relaxed",
                    i === 0 ? "text-xl text-fg" : "text-lg text-fg-muted",
                  )}
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create `web/components/work/case-system.tsx`** with exactly:

```tsx
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { ProjectMiniPreview } from "@/components/work/mini-preview";
import type { CaseStudy } from "@/content/case-studies";

export function CaseSystem({ study }: { study: CaseStudy }) {
  return (
    <section className="border-t border-border bg-section">
      <Container className="py-16 md:py-24">
        <Reveal>
          <SectionLabel>The System We Built</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-[clamp(28px,3.2vw,42px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
            What it took to make {study.name} run.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="grid content-start gap-x-8 gap-y-9 sm:grid-cols-2 lg:col-span-7">
            {study.system.map((block, i) => (
              <Reveal key={block.title} delay={i * 0.05}>
                <h3 className="text-sm font-semibold text-fg">{block.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {block.body}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <ProjectMiniPreview slug={study.slug} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Create `web/components/work/case-outcome.tsx`** (stat count-ups + tech row) with exactly:

```tsx
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { StatBlock } from "@/components/stat-block";
import { outcomeToMetric } from "@/lib/case-metrics";
import type { CaseStudy } from "@/content/case-studies";

export function CaseOutcome({ study }: { study: CaseStudy }) {
  return (
    <section className="border-t border-border bg-bg">
      <Container className="py-16 md:py-24">
        <Reveal>
          <SectionLabel>The Outcome</SectionLabel>
        </Reveal>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {study.outcomes.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.06}>
              <StatBlock metric={outcomeToMetric(o.value, o.label)} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-14 border-t border-border pt-8">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-fg-subtle">
              Built with
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-fg-muted">
              {study.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Create `web/components/work/next-project-pager.tsx`** with exactly:

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { ProjectTheme } from "@/components/site/project-theme";
import { nextCaseStudy } from "@/content/case-studies";
import type { CaseSlug } from "@/content/case-studies";

// Self-themed with the NEXT project's accent so the handoff row previews the
// destination's color identity.
export function NextProjectPager({ current }: { current: CaseSlug }) {
  const next = nextCaseStudy(current);

  return (
    <ProjectTheme accent={next.accent}>
      <section className="border-t border-border bg-section-alt">
        <Container className="py-12 md:py-16">
          <Link
            href={`/work/${next.slug}/`}
            className="group flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <span
                className="grid size-11 shrink-0 place-items-center rounded-xl border border-border"
                style={{ background: `${next.accent}14` }}
              >
                <Image
                  src={next.logoSrc}
                  alt={`${next.name} logo`}
                  width={24}
                  height={24}
                  className="size-6 object-contain"
                />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-text">
                  Next case study
                </p>
                <p className="mt-1 font-serif text-2xl font-medium tracking-[-0.01em] text-fg md:text-3xl">
                  {next.name}
                </p>
              </div>
            </div>
            <ArrowRight
              size={22}
              className="shrink-0 text-fg-muted transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Container>
      </section>
    </ProjectTheme>
  );
}
```

- [ ] **Step 5: Verify compilation.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
```

Expect a clean build (components type-check against C2/C3 exports and B's `ProjectTheme`/`ProjectMiniPreview`).

- [ ] **Step 6: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/work/case-problem.tsx web/components/work/case-system.tsx web/components/work/case-outcome.tsx web/components/work/next-project-pager.tsx && git commit -m "feat(web): case-study body sections and next-project pager"
```

---

### Task 24 (C7): `/work/[slug]/` route — static params, per-page metadata, full assembly

> **Merge note (harmonization 2):** The case-hero cursor tilt required by spec §9 is already delivered by G2's `Tilt` inside `CaseHero` (Task 22 (C5)). **Task 51 (G10)** is therefore verification-only for these routes — no second `Tilt` wrapper is ever added. The composition nesting differs harmlessly from G's published contract 2: `ProjectTheme` wraps at page level (this file) rather than inside `ScaledPreview`, and the composition lives in `case-hero.tsx`, not this page file; `var(--brand)` resolution inside the composition is identical.

**Files:**
- Create: `web/app/work/[slug]/page.tsx`

**Interfaces:** Consumes: `CaseHero` (C5); `CaseProblem`, `CaseSystem`, `CaseOutcome`, `NextProjectPager` (C6); `CTASection` [A]; `ProjectTheme` [B]; `caseStudies`, `getCaseStudy`, `CaseSlug` (C2). Produces: static routes `/work/concordia-connect/`, `/work/drafterie/`, `/work/skyroa/`, `/work/automedic/` via `generateStaticParams` with `dynamicParams = false`, each with `generateMetadata` (title/description/canonical/OG). Note Next 16: `params` is a `Promise` and must be awaited.

Assembly order per spec: hero → Problem → System → Outcome (incl. tech row) → next-project pager → CTA. The page-level `ProjectTheme` wraps hero through Outcome so the accent drives eyebrows, links, chips, and every chart; the pager themes itself with the next project's accent; `CTASection` stays OUTSIDE the wrapper so its button keeps the global violet (spec: "global UI stays violet").

- [ ] **Step 1: Create `web/app/work/[slug]/page.tsx`** with exactly:

```tsx
import type { Metadata } from "next";
import { ProjectTheme } from "@/components/site/project-theme";
import { CTASection } from "@/components/site/cta-section";
import { CaseHero } from "@/components/work/case-hero";
import { CaseProblem } from "@/components/work/case-problem";
import { CaseSystem } from "@/components/work/case-system";
import { CaseOutcome } from "@/components/work/case-outcome";
import { NextProjectPager } from "@/components/work/next-project-pager";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import type { CaseSlug } from "@/content/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: CaseSlug }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return {
    title: study.name,
    description: study.oneLiner,
    alternates: { canonical: `/work/${study.slug}/` },
    openGraph: {
      title: `${study.name} · KCOH Software Inc.`,
      description: study.oneLiner,
      images: ["/og.png"],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  return (
    <>
      <ProjectTheme accent={study.accent}>
        <CaseHero study={study} />
        <CaseProblem study={study} />
        <CaseSystem study={study} />
        <CaseOutcome study={study} />
      </ProjectTheme>
      <NextProjectPager current={study.slug} />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: Build and verify all four static routes are emitted.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build && ls out/work/
```

Expect: build succeeds; route table shows `/work/[slug]` as SSG with 4 generated paths; `ls out/work/` lists `automedic`, `concordia-connect`, `drafterie`, `skyroa` directories plus `index.html` (each directory containing its own `index.html`, per `trailingSlash: true`).

- [ ] **Step 3: Verify per-page metadata in the export.**

```bash
grep -o "<title>[^<]*</title>" "/Users/kevincohen/Desktop/KCOH Software Inc./web/out/work/drafterie/index.html" && grep -o 'rel="canonical" href="[^"]*"' "/Users/kevincohen/Desktop/KCOH Software Inc./web/out/work/skyroa/index.html"
```

Expect `<title>Drafterie · KCOH Software Inc.</title>` (layout title template applied) and a canonical of `https://kcoh.ca/work/skyroa/`.

- [ ] **Step 4: Visual check in both themes.** Run `npm run dev` in `web/`, then for `http://localhost:3000/work/concordia-connect/` (burgundy) and `http://localhost:3000/work/automedic/` (green), in dark (default) then light (nav toggle), at 1440px and 360px:
  - Hero: radial accent tint sits behind the header as a subtle glow, not a fill; logo renders in its 8%-alpha tinted chip; "Case Study" eyebrow and fact chips carry the project accent; the full-width `DashboardScreen` charts (area, bars, donut, sparkline) are recolored to the accent; cursor movement tilts the composition ~2 degrees and it springs back on leave; "Explore the live demo" links to `/dashboard/`.
  - Body: The Problem (first paragraph emphasized), The System We Built with the sticky `ProjectMiniPreview`, The Outcome stat blocks count up on scroll (Drafterie's "8" animates; "Live"/"AES-256" render statically), "Built with" mono tech row.
  - Pager: shows the NEXT project's name and accent (concordia-connect → Drafterie in violet; automedic → Concordia Connect in burgundy); CTASection at the bottom keeps the global violet button in both themes.
  - Reduced motion (macOS: System Settings → Accessibility → Display → Reduce motion, or DevTools emulation): no tilt, no reveal animation, stat values appear instantly at their targets.
  - Spot-check the other two routes (`/work/drafterie/`, `/work/skyroa/`) load with their own accents and copy.

- [ ] **Step 5: Run the full test suite one final time.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test
```

Expect all suites green.

- [ ] **Step 6: Commit.**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add "web/app/work/[slug]/page.tsx" && git commit -m "feat(web): /work/[slug] case-study routes with static params and metadata"
```

---

### Task 25 (D1): Services + engagement content modules

**Files:**
- Create: `web/content/service-details.ts`
- Create: `web/content/engagement.ts`

**Interfaces:**
- Consumes: nothing (pure data modules, matches the existing `web/content/*.ts` pattern).
- Produces:

```ts
// web/content/service-details.ts
export type ServiceSlug =
  | "custom-software" | "automation" | "financial-systems"
  | "integrations" | "ios-development" | "ongoing-support";
export type ServiceDetail = {
  slug: ServiceSlug;
  title: string;        // matches web/content/services.ts titles
  heading: string;      // serif display heading for the block
  problem: string;      // problem-it-solves paragraph
  deliverables: string[]; // "what this looks like" list
};
export const serviceDetails: ServiceDetail[]; // 6 entries, page order

// web/content/engagement.ts
export type EngagementStep = { n: number; title: string; body: string; meta: string };
export const engagementSteps: EngagementStep[]; // 4 entries: discovery, proposal, build, support
export const pricingNote: string;               // v1 pricing anchors
```

- [ ] **Step 1: Create `web/content/service-details.ts`** (full file):

```ts
export type ServiceSlug =
  | "custom-software"
  | "automation"
  | "financial-systems"
  | "integrations"
  | "ios-development"
  | "ongoing-support";

export type ServiceDetail = {
  slug: ServiceSlug;
  title: string;
  heading: string;
  problem: string;
  deliverables: string[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "custom-software",
    title: "Custom Software",
    heading: "Software built around how you actually operate.",
    problem:
      "Off-the-shelf tools force your operations into someone else's shape. We design, build, and operate cohesive systems across mobile, web, and backend, with one owner from first sketch to production. No handoffs, no silos.",
    deliverables: [
      "One operator across mobile, web, and API",
      "Design, build, deploy, and support under one roof",
      "Measured on stability, shipping speed, and adoption",
    ],
  },
  {
    slug: "automation",
    title: "Automation",
    heading: "Manual work, retired.",
    problem:
      "Repetitive workflows drain hours and invite errors. We replace manual processes with durable automation across operations, fulfillment, customer communications, and finance. Then we keep measuring it after launch.",
    deliverables: [
      "80%+ of repetitive tasks automated, fewer tickets",
      "Existing tools connected, edge cases handled",
      "Monitored, measured, and iterated after launch",
    ],
  },
  {
    slug: "financial-systems",
    title: "Financial Systems",
    heading: "One view of the money.",
    problem:
      "When payments, subscriptions, cards, and accounting live in separate tools, nobody knows the real number. We unify them into a single view, with reconciliation, dispute flows, and reporting handled.",
    deliverables: [
      "Weekly cashflow and P&L dashboards",
      "Dispute automation, refunds, and edge cases covered",
      "Fee reduction and processor optimization",
    ],
  },
  {
    slug: "integrations",
    title: "Integrations",
    heading: "Your tools, finally talking.",
    problem:
      "Most engagements connect to what you already run instead of replacing everything at once. API integrations, webhooks, and data migrations are standard, and your team gets trained on the result.",
    deliverables: [
      "APIs, webhooks, and data migrations",
      "Third-party tools and databases wired into one flow",
      "Your team trained on the new systems",
    ],
  },
  {
    slug: "ios-development",
    title: "iOS Development",
    heading: "Native iOS, shipped to the App Store.",
    problem:
      "We build native iOS in Swift and SwiftUI. More than ten production apps shipped to the App Store, built to hold up with real users.",
    deliverables: [
      "Swift and SwiftUI, native performance",
      "App Store submission handled end to end",
      "Backend integration included",
    ],
  },
  {
    slug: "ongoing-support",
    title: "Ongoing Support",
    heading: "We stand behind what we ship.",
    problem:
      "Software is not done at launch. Every project includes 30-90 days of post-launch support depending on scope. After that, retainers cover iteration, monitoring, and optimization on real usage.",
    deliverables: [
      "30-90 days of post-launch support on every project",
      "Retainers for iteration, monitoring, and optimization",
      "Runbooks and training for your team",
    ],
  },
];
```

- [ ] **Step 2: Create `web/content/engagement.ts`** (full file):

```ts
export type EngagementStep = {
  n: number;
  title: string;
  body: string;
  meta: string;
};

export const engagementSteps: EngagementStep[] = [
  {
    n: 1,
    title: "Discovery Call",
    body: "A 30-minute call. No pitch, no pressure. Just a conversation about your systems and where the leverage is.",
    meta: "30 minutes",
  },
  {
    n: 2,
    title: "Proposal",
    body: "We scope the workflows with you, then provide a fixed quote. Project-based pricing, no hourly billing, no surprises.",
    meta: "Fixed quote after discovery",
  },
  {
    n: 3,
    title: "Build",
    body: "Weekly increments with working demos. Clean architecture, proper testing, and integration with your existing tools. Most projects run 4-12 weeks.",
    meta: "4-12 weeks typical",
  },
  {
    n: 4,
    title: "Support",
    body: "Every project includes 30-90 days of post-launch support. After that, retainers cover iteration, monitoring, and optimization.",
    meta: "30-90 days included",
  },
];

export const pricingNote =
  "Clear starting points: iOS MVPs from $5k, web platforms from $10k, full product builds from $20k. All projects include discovery, a fixed-price quote, and post-launch support.";
```

- [ ] **Step 3: Typecheck**

Run: `cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx tsc --noEmit`
Expected: exits 0, no errors mentioning `content/service-details.ts` or `content/engagement.ts`.

- [ ] **Step 4: Commit**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/content/service-details.ts web/content/engagement.ts && git commit -m "feat(web): services + engagement content modules"
```

---

### Task 26 (D2): Workflow status feed (TDD logic + live component)

The Automation service block gets a compact "live" workflow feed: a four-step pipeline whose statuses advance on a timer (queued → running → done, then the run resets). The advancing rule is pure logic → TDD. The component is a client component gated by `useReducedMotion()` (static snapshot when reduced; no infinite spinners; status color transitions at 300ms).

**Files:**
- Create: `web/lib/workflow-feed.ts` (pure logic)
- Create: `web/components/services/workflow-feed.tsx` (client component)
- Test: `web/lib/__tests__/workflow-feed.test.ts`

**Interfaces:**
- Consumes: `useReducedMotion(): boolean` from `@/lib/hooks/use-reduced-motion`; `cn(...inputs: ClassValue[])` from `@/lib/utils`; lucide icons `CheckCircle2`, `CircleDot`, `CircleDashed` (all verified exports of `lucide-react@^1.23.0`).
- Produces:

```ts
// web/lib/workflow-feed.ts (pure, no "use client")
export type WorkflowStepStatus = "done" | "running" | "queued";
export type WorkflowStep = { label: string; detail: string; status: WorkflowStepStatus };
export function advanceWorkflow(steps: WorkflowStep[]): WorkflowStep[];

// web/components/services/workflow-feed.tsx ("use client")
export function WorkflowFeed({ className }: { className?: string }): React.JSX.Element;
```

- [ ] **Step 1: Write the failing test** — create `web/lib/__tests__/workflow-feed.test.ts` (full file):

```ts
import { describe, it, expect } from "vitest";
import {
  advanceWorkflow,
  type WorkflowStep,
  type WorkflowStepStatus,
} from "@/lib/workflow-feed";

const make = (statuses: WorkflowStepStatus[]): WorkflowStep[] =>
  statuses.map((status, i) => ({
    label: `Step ${i}`,
    detail: `Detail ${i}`,
    status,
  }));

describe("advanceWorkflow", () => {
  it("marks the running step done and starts the next queued step", () => {
    const next = advanceWorkflow(make(["done", "running", "queued", "queued"]));
    expect(next.map((s) => s.status)).toEqual([
      "done",
      "done",
      "running",
      "queued",
    ]);
  });

  it("starts the first queued step when nothing is running", () => {
    const next = advanceWorkflow(make(["done", "queued", "queued"]));
    expect(next.map((s) => s.status)).toEqual(["done", "running", "queued"]);
  });

  it("marks the last running step done when nothing is queued", () => {
    const next = advanceWorkflow(make(["done", "done", "running"]));
    expect(next.map((s) => s.status)).toEqual(["done", "done", "done"]);
  });

  it("resets to the first step running when every step is done", () => {
    const next = advanceWorkflow(make(["done", "done", "done"]));
    expect(next.map((s) => s.status)).toEqual(["running", "queued", "queued"]);
  });

  it("returns an empty array for empty input", () => {
    expect(advanceWorkflow([])).toEqual([]);
  });

  it("does not mutate its input", () => {
    const input = make(["running", "queued"]);
    advanceWorkflow(input);
    expect(input.map((s) => s.status)).toEqual(["running", "queued"]);
  });
});
```

- [ ] **Step 2: Run the test, watch it fail**

Run: `cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test -- lib/__tests__/workflow-feed.test.ts`
Expected failure: module-resolution error — `Failed to resolve import "@/lib/workflow-feed"` (the module does not exist yet).

- [ ] **Step 3: Implement the pure logic** — create `web/lib/workflow-feed.ts` (full file):

```ts
export type WorkflowStepStatus = "done" | "running" | "queued";

export type WorkflowStep = {
  label: string;
  detail: string;
  status: WorkflowStepStatus;
};

/**
 * One tick of the simulated workflow: the running step completes and the
 * first queued step starts. When every step is done, the run resets with
 * the first step running again.
 */
export function advanceWorkflow(steps: WorkflowStep[]): WorkflowStep[] {
  if (steps.length === 0) return [];

  const allDone = steps.every((s) => s.status === "done");
  if (allDone) {
    return steps.map((s, i) => ({
      ...s,
      status: i === 0 ? ("running" as const) : ("queued" as const),
    }));
  }

  const runningIndex = steps.findIndex((s) => s.status === "running");
  const queuedIndex = steps.findIndex((s) => s.status === "queued");

  return steps.map((s, i) => {
    if (i === runningIndex) return { ...s, status: "done" as const };
    if (i === queuedIndex) return { ...s, status: "running" as const };
    return s;
  });
}
```

- [ ] **Step 4: Run the test, watch it pass**

Run: `cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test -- lib/__tests__/workflow-feed.test.ts`
Expected: 6 tests pass. Also run the full suite once (`npm test`) to confirm nothing else broke.

- [ ] **Step 5: Implement the component** — create `web/components/services/workflow-feed.tsx` (full file). Feed content uses real stack facts (Stripe, Resend appear in `web/content/technologies.ts` / AutoMedic facts). No infinite animation: "live" is the periodic status flip; each flip transitions colors in 300ms; reduced motion renders the initial snapshot with no timer.

```tsx
"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, CircleDashed, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { advanceWorkflow, type WorkflowStep } from "@/lib/workflow-feed";

const initialSteps: WorkflowStep[] = [
  { label: "New order received", detail: "Stripe webhook", status: "done" },
  { label: "Invoice generated", detail: "PDF + ledger entry", status: "running" },
  { label: "Customer notified", detail: "Email via Resend", status: "queued" },
  { label: "Books reconciled", detail: "Synced to accounting", status: "queued" },
];

const TICK_MS = 2200;

const statusTint: Record<WorkflowStep["status"], string> = {
  done: "text-pos",
  running: "text-brand-text", // 12px status text — AA token from Task 7 (raw --brand is 4.12:1 on white)
  queued: "text-fg-subtle",
};

function StatusIcon({ status }: { status: WorkflowStep["status"] }) {
  if (status === "done") {
    return <CheckCircle2 size={16} className="shrink-0 text-pos" />;
  }
  if (status === "running") {
    return <CircleDot size={16} className="shrink-0 text-brand" />;
  }
  return <CircleDashed size={16} className="shrink-0 text-fg-subtle" />;
}

export function WorkflowFeed({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [steps, setSteps] = useState(initialSteps);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setSteps((prev) => advanceWorkflow(prev));
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg">Workflow: order to books</h3>
        <span className="flex items-center gap-1.5 text-[11px] text-fg-muted">
          <span className="size-1.5 rounded-full bg-pos" /> Live
        </span>
      </div>
      <ul className="space-y-3.5">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-3 text-sm">
            <StatusIcon status={s.status} />
            <span
              className={cn(
                "flex-1 transition-colors duration-300",
                s.status === "queued" ? "text-fg-muted" : "text-fg",
              )}
            >
              {s.label}
            </span>
            <span className="hidden text-xs text-fg-subtle sm:inline">{s.detail}</span>
            <span
              className={cn(
                "w-14 text-right text-xs font-medium capitalize transition-colors duration-300",
                statusTint[s.status],
              )}
            >
              {s.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 6: Typecheck**

Run: `cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx tsc --noEmit`
Expected: exits 0. (Visual verification happens in Task D4 once the component is placed on the page.)

- [ ] **Step 7: Commit**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/lib/workflow-feed.ts web/lib/__tests__/workflow-feed.test.ts web/components/services/workflow-feed.tsx && git commit -m "feat(web): workflow status feed with tested advance logic"
```

---

### Task 27 (D3): RevenueMiniChart + ServiceBlock components

The Financial Systems block gets a compact revenue chart card reusing the existing `AreaChart` primitive and the approved dashboard sample data (`$128,430`, `+12.5%`, May axis — same figures as `OverviewDashboard`). `ServiceBlock` is the shared layout for all six service blocks.

**Files:**
- Create: `web/components/services/revenue-mini-chart.tsx` (server component)
- Create: `web/components/services/service-block.tsx` (server component)

**Interfaces:**
- Consumes: `AreaChart({ data, width?, height?, highlightIndex?, className? })` from `@/components/dashboard/charts/area-chart`; `Reveal({ children, delay?, y?, className? })` from `@/components/site/reveal`; `SectionLabel({ className?, children })` from `@/components/site/section-label`; `cn` from `@/lib/utils`; `ServiceDetail` from Task D1; lucide `Check`.
- Produces:

```ts
// web/components/services/revenue-mini-chart.tsx
export function RevenueMiniChart({ className }: { className?: string }): React.JSX.Element;

// web/components/services/service-block.tsx
export function ServiceBlock({ detail, index, visual }: {
  detail: ServiceDetail;
  index: number;              // 0-based; rendered as 01..06
  visual?: React.ReactNode;   // optional live visual, right column
}): React.JSX.Element;
```

- [ ] **Step 1: Create `web/components/services/revenue-mini-chart.tsx`** (full file):

```tsx
import { AreaChart } from "@/components/dashboard/charts/area-chart";
import { cn } from "@/lib/utils";

const revenueSeries = [
  12, 14, 13, 16, 18, 17, 20, 19, 22, 21, 24, 23, 20, 25, 27, 26, 29, 24, 28,
  30, 27, 31, 29, 33, 30, 34, 32, 36, 35, 38,
];

export function RevenueMiniChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg">Revenue</h3>
        <span className="rounded-md border border-border px-2 py-1 text-[11px] text-fg-muted">
          This Month
        </span>
      </div>
      <div className="mb-1 text-2xl font-semibold text-fg tabular-nums">$128,430</div>
      <div className="mb-3 text-xs">
        <span className="text-pos">+12.5%</span>{" "}
        <span className="text-fg-subtle">vs last month</span>
      </div>
      <AreaChart data={revenueSeries} highlightIndex={19} className="h-32 w-full" />
      <div className="mt-2 flex justify-between text-[11px] text-fg-subtle">
        <span>May 1</span>
        <span>May 8</span>
        <span>May 15</span>
        <span>May 22</span>
        <span>May 29</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `web/components/services/service-block.tsx`** (full file):

```tsx
import { Check } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import type { ServiceDetail } from "@/content/service-details";

export function ServiceBlock({
  detail,
  index,
  visual,
}: {
  detail: ServiceDetail;
  index: number;
  visual?: React.ReactNode;
}) {
  return (
    <div className="grid gap-10 border-t border-border py-14 first:border-t-0 first:pt-0 md:py-16 lg:grid-cols-12">
      <Reveal className={visual ? "lg:col-span-7" : "lg:col-span-8"}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-fg-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
          <SectionLabel>{detail.title}</SectionLabel>
        </div>
        <h2 className="mt-4 max-w-xl font-serif text-[clamp(26px,3vw,38px)] font-medium leading-[1.12] tracking-[-0.015em] text-fg">
          {detail.heading}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
          {detail.problem}
        </p>
        <h3 className="mt-7 text-xs font-medium uppercase tracking-[0.2em] text-fg-subtle">
          What this looks like
        </h3>
        <ul className="mt-3 space-y-2.5">
          {detail.deliverables.map((d) => (
            <li
              key={d}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-muted"
            >
              <Check size={16} className="mt-0.5 shrink-0 text-brand" />
              {d}
            </li>
          ))}
        </ul>
      </Reveal>
      {visual ? (
        <Reveal delay={0.1} className="lg:col-span-5 lg:self-center">
          {visual}
        </Reveal>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx tsc --noEmit`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/services/revenue-mini-chart.tsx web/components/services/service-block.tsx && git commit -m "feat(web): revenue mini-chart and service block components"
```

---

### Task 28 (D4): EngagementStrip + `/services/` page

Assembles the page: `PageHero` → six `ServiceBlock`s (Automation gets `WorkflowFeed`, Financial Systems gets `RevenueMiniChart`) → "Explore the live demo →" link to `/dashboard/` beneath the live visuals (spec §9 requires the playable demo to be linked from Services) → `EngagementStrip` (discovery call, proposal, build, support, with real v1 pricing facts) → `CTASection` with spec defaults.

**Blocked until Workstream A ships `PageHero` and `CTASection`.**

**Files:**
- Create: `web/components/services/engagement-strip.tsx` (server component)
- Create: `web/app/services/page.tsx` (server component, Metadata export)

**Interfaces:**
- Consumes: `PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro?: string; children?: React.ReactNode })` from `@/components/site/page-hero` [A]; `CTASection({ heading, subline }: { heading?: string; subline?: string })` from `@/components/site/cta-section` [A]; `Container`, `SectionLabel`, `Reveal` from `@/components/site/*`; `serviceDetails`, `ServiceSlug` [D1]; `engagementSteps`, `pricingNote` [D1]; `WorkflowFeed` [D2]; `RevenueMiniChart`, `ServiceBlock` [D3].
- Produces:

```ts
// web/components/services/engagement-strip.tsx
export function EngagementStrip(): React.JSX.Element;

// web/app/services/page.tsx
export const metadata: Metadata;                 // title "Services"
export default function ServicesPage(): React.JSX.Element;  // route /services/
```

- [ ] **Step 1: Create `web/components/services/engagement-strip.tsx`** (full file):

```tsx
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { engagementSteps, pricingNote } from "@/content/engagement";

export function EngagementStrip() {
  return (
    <section id="engagements" className="scroll-mt-24 border-t border-border bg-section">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionLabel>How Engagements Work</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
            From first call to running system.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {engagementSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <span className="grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,var(--brand),var(--highlight))] text-sm font-semibold text-white">
                {s.n}
              </span>
              <h3 className="mt-4 text-base font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-fg-subtle">
                {s.meta}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 max-w-2xl border-t border-border pt-6 text-sm leading-relaxed text-fg-muted">
            {pricingNote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create `web/app/services/page.tsx`** (full file). Hero copy is the verbatim v1 services header ("Business Systems Engineering" + subtitle + who-we-serve, tightened):

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { EngagementStrip } from "@/components/services/engagement-strip";
import { RevenueMiniChart } from "@/components/services/revenue-mini-chart";
import { ServiceBlock } from "@/components/services/service-block";
import { WorkflowFeed } from "@/components/services/workflow-feed";
import { serviceDetails, type ServiceSlug } from "@/content/service-details";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business systems engineering: custom software, automation, financial systems, integrations, iOS development, and ongoing support. Fixed quotes after discovery, no hourly billing.",
  alternates: { canonical: "/services/" },
};

const visuals: Partial<Record<ServiceSlug, React.ReactNode>> = {
  automation: <WorkflowFeed />,
  "financial-systems": <RevenueMiniChart />,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Business systems engineering."
        intro="Software that automates operations, clarifies finances, and creates operational leverage. Built for revenue-generating businesses scaling past manual processes."
      />

      <section className="border-t border-border bg-bg">
        <Container className="py-16 md:py-20">
          {serviceDetails.map((detail, i) => (
            <ServiceBlock
              key={detail.slug}
              detail={detail}
              index={i}
              visual={visuals[detail.slug]}
            />
          ))}
          <div className="mt-4 flex justify-center">
            <Link
              href="/dashboard/"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-brand-text"
            >
              Explore the live demo
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Container>
      </section>

      <EngagementStrip />
      <CTASection />
    </>
  );
}
```

(The "Explore the live demo" link beneath the service blocks — right after the two live visuals — is the Services-page entry point to the playable `/dashboard/` demo that spec §9 requires; same markup convention as the hero (Task 12) and case-hero (Task 22) affordances.)

- [ ] **Step 3: Build**

Run: `cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build`
Expected: build succeeds; the route table lists `/services` as a statically exported route (○/●), and `out/services/index.html` exists (`ls out/services/index.html`).

- [ ] **Step 4: Visual verification, both themes**

Run: `cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev`, open `http://localhost:3000/services/`.

**Dark (default) — verify:**
- PageHero: violet uppercase eyebrow "SERVICES", serif headline "Business systems engineering.", intro paragraph.
- Six blocks in order (01 Custom Software → 06 Ongoing Support), each with mono index, violet eyebrow, serif heading, problem paragraph, and a "WHAT THIS LOOKS LIKE" list with violet check icons.
- Block 02 (Automation): "Workflow: order to books" card on the right; statuses flip roughly every 2.2s (running → done, next step starts, run resets after all four are done); color changes are smooth (300ms), no layout shift.
- Block 03 (Financial Systems): revenue card with "$128,430", green "+12.5%", violet-to-cyan area line with highlight dot, May axis labels.
- Beneath block 06: centered "Explore the live demo" link with arrow; clicking it navigates to `/dashboard/` (spec §9 Services entry point to the playable demo).
- Engagement strip on the `bg-section` band: 4 numbered gradient chips (Discovery Call / Proposal / Build / Support), metas ("30 minutes", "Fixed quote after discovery", "4-12 weeks typical", "30-90 days included"), and the pricing line with $5k / $10k / $20k.
- CTASection with the default "Let's talk about what you're building." close.
- Violet appears only as accent (icons, eyebrows, chips, chart strokes) — no large violet fills.

**Light — toggle the theme via the nav ThemeToggle and verify:** all of the above with light tokens (white/near-white bands, dark text), charts and gradient chips still legible, borders visible.

**Reduced motion:** in devtools, emulate `prefers-reduced-motion: reduce` and reload — the workflow feed stays static (one step "running", no ticking) and blocks render without reveal animation.

Fix anything off before committing, then stop the dev server.

- [ ] **Step 5: Commit**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/services/engagement-strip.tsx web/app/services && git commit -m "feat(web): /services page with six service blocks and engagement strip"
```

---

### Task 29 (D5): About page content module

All `/about/` copy in one content module, sourced from the facts inventory §4 (index.html operator story, about.html H1/subtitle/"How I work", v1 engagement facts). First-person voice preserved for the founder story (matches `web/content/founder.ts`).

**Files:**
- Create: `web/content/about.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:

```ts
// web/content/about.ts
export type ProofPoint = { title: string; body: string };
export type Principle = { title: string; body: string };
export const aboutIntro: string;
export const founderStory: string[];              // 3 paragraphs
export const proofPoints: ProofPoint[];           // 3 entries
export const stepDetails: Record<number, string>; // keyed by ProcessStep.n (1..4)
export const principles: Principle[];             // 4 entries
```

- [ ] **Step 1: Create `web/content/about.ts`** (full file):

```ts
export type ProofPoint = { title: string; body: string };
export type Principle = { title: string; body: string };

export const aboutIntro =
  "I built and operated a 7-figure digital platform with 2,600+ members. Handled payments, disputes, support, abuse, and uptime. I apply that systems thinking to businesses through KCOH Software Inc.";

export const founderStory: string[] = [
  "Most developers build what you spec. I've been on the other side, operating a platform with thousands of members, handling payments, disputes, uptime, and the kind of edge cases that only show up at scale.",
  "That experience changed how I build. I design systems around how businesses actually run, not how they look in a wireframe. Financial clarity, automated workflows, operational leverage. These aren't features I list. They're problems I've solved for myself.",
  "When I build for you, I'm applying judgment I earned by operating, not just engineering.",
];

export const proofPoints: ProofPoint[] = [
  {
    title: "Digital platform",
    body: "Built and operated a 7-figure platform with 2,600+ members.",
  },
  {
    title: "iOS apps",
    body: "10+ production apps shipped to the App Store.",
  },
  {
    title: "Payment operations",
    body: "Managed payment flows, disputes, and reconciliation at scale.",
  },
];

export const stepDetails: Record<number, string> = {
  1: "We sit with your actual workflows: orders, payments, support, reporting. We trace where time and money leak, and name the bottlenecks and edge cases before any code is written.",
  2: "Not everything is worth automating. We rank the work by operational ROI, then agree on a fixed scope and a fixed quote. No hourly billing, no surprises.",
  3: "We build in weekly increments with demos of actual working software, not status decks. Clean architecture, proper testing, and integration with the tools you already run.",
  4: "Launch is not the end. Every project includes 30-90 days of post-launch support. We monitor performance, train your team, and iterate on real usage.",
};

export const principles: Principle[] = [
  {
    title: "Clear scoping",
    body: "Fixed quotes after discovery. Clear scope, clear price, no surprises.",
  },
  {
    title: "Weekly progress",
    body: "Real software every week, with measurable results. Never status decks.",
  },
  {
    title: "Durable stack",
    body: "Swift, React, Node, and cloud infrastructure. Tools chosen for durability and speed, not trends.",
  },
  {
    title: "Leverage first",
    body: "Focus on what creates leverage for your business. No fluff.",
  },
];
```

- [ ] **Step 2: Typecheck**

Run: `cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx tsc --noEmit`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/content/about.ts && git commit -m "feat(web): about page content module"
```

---

### Task 30 (D6): `/about/` page

Founder story (expanded, with the existing `/founder.webp` headshot from `web/public/`) → How We Work (the four `processSteps`, each expanded with `stepDetails`, beside the existing process dashboard composition: `ScaledPreview` → `DashboardScreen`, exactly the homepage HowWeWork pattern) → operating principles → `CTASection`.

**Blocked until Workstream A ships `PageHero` and `CTASection`.**

**Files:**
- Create: `web/app/about/page.tsx` (server component, Metadata export)

**Interfaces:**
- Consumes: `PageHero`, `CTASection` [A]; `Container`, `SectionLabel`, `Reveal`, `ScaledPreview({ designWidth?, className?, children })` from `@/components/site/*`; `DashboardScreen({ className? })` from `@/components/dashboard/dashboard-screen`; `founder` from `@/content/founder` (`founder.photo === "/founder.webp"`, `founder.quote`); `processSteps` from `@/content/process`; `aboutIntro`, `founderStory`, `proofPoints`, `stepDetails`, `principles` [D5]; `next/image`.
- Produces:

```ts
// web/app/about/page.tsx
export const metadata: Metadata;              // title "About"
export default function AboutPage(): React.JSX.Element;  // route /about/
```

- [ ] **Step 1: Create `web/app/about/page.tsx`** (full file). Hero title is the verbatim about.html H1; the story h2 is the founder quote already shipped in `founder.ts`:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { ScaledPreview } from "@/components/site/scaled-preview";
import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { DashboardScreen } from "@/components/dashboard/dashboard-screen";
import { founder } from "@/content/founder";
import { processSteps } from "@/content/process";
import {
  aboutIntro,
  founderStory,
  proofPoints,
  stepDetails,
  principles,
} from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kevin Cohen built and operated a 7-figure platform with 2,600+ members. KCOH Software Inc. applies that operator judgment to software systems that automate operations and add financial clarity.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Operator who builds systems under real constraints."
        intro={aboutIntro}
      />

      {/* Founder story */}
      <section className="border-t border-border bg-bg">
        <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionLabel>The Story</SectionLabel>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.1] tracking-[-0.015em] text-fg">
              {founder.quote.lead} {founder.quote.emphasis}
            </h2>
            <div className="mt-6 max-w-xl space-y-5">
              {founderStory.map((p) => (
                <p key={p} className="text-base leading-relaxed text-fg-muted">
                  {p}
                </p>
              ))}
            </div>
            <ul className="mt-10 space-y-4 border-t border-border pt-8">
              {proofPoints.map((pt) => (
                <li
                  key={pt.title}
                  className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <span className="w-44 shrink-0 text-sm font-semibold text-fg">
                    {pt.title}
                  </span>
                  <span className="text-sm leading-relaxed text-fg-muted">
                    {pt.body}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-[20px] border border-border bg-section">
              <Image
                src={founder.photo}
                alt={`${founder.name}, ${founder.role}`}
                fill
                sizes="360px"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-fg">
              {founder.name}
            </p>
            <p className="text-center text-sm text-fg-subtle">{founder.role}</p>
          </Reveal>
        </Container>
      </section>

      {/* How we work, expanded */}
      <section id="process" className="scroll-mt-24 border-t border-border bg-section">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
              The four steps, in full.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <ol className="space-y-9 lg:col-span-5">
              {processSteps.map((s, i) => (
                <li key={s.n}>
                  <Reveal delay={i * 0.06} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--brand),var(--highlight))] text-sm font-semibold text-white">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-fg">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                        {s.body}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-fg-subtle">
                        {stepDetails[s.n]}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-30 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, var(--brand), transparent)",
                  }}
                />
                <ScaledPreview designWidth={1160}>
                  <DashboardScreen />
                </ScaledPreview>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Operating principles */}
      <section className="border-t border-border bg-bg">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionLabel>Operating Principles</SectionLabel>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
              No surprises. No fluff.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <h3 className="text-base font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Work with an operator."
        subline="30-minute call. No pitch, no pressure. Just a conversation about your systems."
      />
    </>
  );
}
```

- [ ] **Step 2: Build**

Run: `cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build`
Expected: build succeeds; route table lists `/about`; `out/about/index.html` exists (`ls out/about/index.html`).

- [ ] **Step 3: Visual verification, both themes**

Run: `cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev`, open `http://localhost:3000/about/`.

**Dark (default) — verify:**
- PageHero: eyebrow "ABOUT", serif H1 "Operator who builds systems under real constraints.", intro with "7-figure" and "2,600+ members".
- Story section: serif h2 "I don't just write code. I run the business that needed it.", three paragraphs, three proof rows (Digital platform / iOS apps / Payment operations), and the founder headshot (`/founder.webp`) in a 4:5 rounded frame with name and role beneath.
- How We Work band (`bg-section`): four gradient number chips, each step showing its short body plus the expanded detail paragraph; the scaled `DashboardScreen` composition on the right with a soft violet glow behind it; charts render.
- Operating principles: four columns (Clear scoping / Weekly progress / Durable stack / Leverage first).
- CTASection with "Work with an operator." and the 30-minute-call subline.
- Violet only as accent; no invented facts on screen (numbers limited to 7-figure, 2,600+, 10+, 30-90 days, 4-12 weeks).

**Light — toggle via nav ThemeToggle and verify:** all sections legible on light tokens; headshot frame border visible; dashboard preview swaps to light card/section colors automatically (CSS vars).

**Reduced motion:** emulate `prefers-reduced-motion: reduce`, reload — content renders immediately with no reveal animation.

Stop the dev server when done.

- [ ] **Step 4: Commit**

```bash
cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/app/about && git commit -m "feat(web): /about page with founder story, expanded process, and principles"
```

---

### Task 31 (E3): Cloudflare Pages Function `POST /api/contact`

**Files:**
- Create: `web/functions/api/contact.ts`

**Interfaces:** Consumes: `parseContactPayload`, `type ContactPayload` from `web/lib/contact-validation.ts` (Task E2, via **relative** import — wrangler's esbuild bundles the Functions directory independently of the Next `@/` alias); `CONTACT_EMAIL` from `web/content/nav.ts` (relative import). / Produces: `export const onRequestPost: (context: { request: Request; env: { RESEND_API_KEY?: string; TURNSTILE_SECRET_KEY?: string } }) => Promise<Response>` and the HTTP contract: `200 {"ok":true}` (sent, or silent honeypot drop, or dev log-only mode), `400 {"ok":false,"error":"Invalid request."}`, `403 {"ok":false,"error":"Verification failed. Please retry the challenge."}`, `502 {"ok":false,"error":"Could not send your message."}`.

Notes locked here: Pages Functions live in `web/functions/` and deploy automatically with the static export (spec §8) — this is the only permitted server runtime. Env typing is a local `Env` type (no `@cloudflare/workers-types` dependency; `Request`/`Response`/`fetch`/`FormData` all type-check against the project's existing `dom` lib since tsconfig `include` covers `**/*.ts`). Secrets are never echoed in responses or logs; error strings are generic constants. `TURNSTILE_SECRET_KEY` defaults to the Cloudflare **test** secret (documented default per spec §8 "Dev/test = Cloudflare's public test keys"); `RESEND_API_KEY` has no default — when unset (local `wrangler pages dev`), the function logs the message and returns success so the full happy path is exercisable locally without a real key.

- [ ] **Step 1: Create `web/functions/api/contact.ts` (complete file).**

  ```ts
  // Cloudflare Pages Function — runs on the Pages runtime, NOT inside the Next
  // static export. Deployed automatically from web/functions/ by wrangler.
  // Relative imports (not "@/...") because wrangler bundles this independently.
  import {
    parseContactPayload,
    type ContactPayload,
  } from "../../lib/contact-validation";
  import { CONTACT_EMAIL } from "../../content/nav";

  type Env = {
    // Encrypted Pages secrets in production; unset under local wrangler dev.
    RESEND_API_KEY?: string;
    TURNSTILE_SECRET_KEY?: string;
  };

  type PagesContext = {
    request: Request;
    env: Env;
  };

  // Cloudflare Turnstile public TEST secret (always passes) — the documented
  // default so `wrangler pages dev` works end-to-end. Production sets the real
  // TURNSTILE_SECRET_KEY as an encrypted Pages secret.
  const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";
  const SITEVERIFY_URL =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const RESEND_URL = "https://api.resend.com/emails";
  const FROM_ADDRESS = "KCOH Software <contact@kcoh.ca>";

  const INVALID_REQUEST = "Invalid request.";
  const VERIFY_FAILED = "Verification failed. Please retry the challenge.";
  const SEND_FAILED = "Could not send your message.";

  function json(status: number, body: Record<string, unknown>): Response {
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  async function verifyTurnstile(
    token: string,
    secret: string,
    ip: string | null,
  ): Promise<boolean> {
    const form = new FormData();
    form.append("secret", secret);
    form.append("response", token);
    if (ip) {
      form.append("remoteip", ip);
    }
    const res = await fetch(SITEVERIFY_URL, { method: "POST", body: form });
    if (!res.ok) {
      return false;
    }
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  }

  async function sendEmail(
    payload: ContactPayload,
    apiKey: string,
  ): Promise<boolean> {
    const lines = [payload.message, "", `From: ${payload.name} <${payload.email}>`];
    if (payload.company) {
      lines.push(`Company: ${payload.company}`);
    }
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [CONTACT_EMAIL],
        reply_to: payload.email,
        subject: `Website inquiry from ${payload.name}`,
        text: lines.join("\n"),
      }),
    });
    return res.ok;
  }

  export const onRequestPost = async (
    context: PagesContext,
  ): Promise<Response> => {
    let data: unknown;
    try {
      data = await context.request.json();
    } catch {
      return json(400, { ok: false, error: INVALID_REQUEST });
    }

    const parsed = parseContactPayload(data);
    if (!parsed.ok) {
      if (parsed.reason === "honeypot") {
        // Silent drop: never tell an automated submitter it was caught.
        return json(200, { ok: true });
      }
      return json(400, { ok: false, error: INVALID_REQUEST });
    }

    const secret = context.env.TURNSTILE_SECRET_KEY || TURNSTILE_TEST_SECRET;
    const ip = context.request.headers.get("CF-Connecting-IP");
    let human = false;
    try {
      human = await verifyTurnstile(parsed.payload.token, secret, ip);
    } catch {
      human = false;
    }
    if (!human) {
      return json(403, { ok: false, error: VERIFY_FAILED });
    }

    const apiKey = context.env.RESEND_API_KEY;
    if (!apiKey) {
      // Local dev (wrangler pages dev without secrets): log instead of sending.
      console.log(
        "[contact] RESEND_API_KEY not set, message logged instead of sent:",
        JSON.stringify({
          name: parsed.payload.name,
          email: parsed.payload.email,
          company: parsed.payload.company,
          message: parsed.payload.message,
        }),
      );
      return json(200, { ok: true });
    }

    try {
      const sent = await sendEmail(parsed.payload, apiKey);
      if (!sent) {
        return json(502, { ok: false, error: SEND_FAILED });
      }
    } catch {
      return json(502, { ok: false, error: SEND_FAILED });
    }

    return json(200, { ok: true });
  };
  ```

- [ ] **Step 2: Type-check the function through the normal build (tsconfig `include: ["**/*.ts", ...]` covers `web/functions/`).**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
  ```

  Expect: clean build, fresh `web/out/`. (The function is NOT part of the export; this run is for the shared type-check and to produce `out/` for the next step.)

- [ ] **Step 3: Start the local Pages emulator (background process).** Run from `web/` so wrangler auto-detects the Functions directory at `./functions` (this is the documented Pages layout; it is the same thing as "wrangler pages dev against web/out", just executed from the project root that owns `functions/`).

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && WRANGLER_SEND_METRICS=false npx wrangler@4 pages dev out --compatibility-date=2026-06-01 --port 8788
  ```

  Expect: wrangler serves `http://127.0.0.1:8788` and logs that it compiled Functions from `functions/` (route `POST /api/contact` available).

- [ ] **Step 4: Exercise the full status-code matrix with curl (Turnstile verify runs for real against `siteverify`; the test secret accepts the dummy token).**

  ```bash
  # 1) Happy path → 200 {"ok":true}; wrangler terminal logs the "[contact] RESEND_API_KEY not set" line
  curl -s -w "\n%{http_code}\n" -X POST http://127.0.0.1:8788/api/contact -H "Content-Type: application/json" -d '{"name":"Ada Lovelace","email":"ada@example.com","company":"","message":"Testing the contact function end to end.","token":"XXXX.DUMMY.TOKEN.XXXX","website":"","elapsedMs":8000}'

  # 2) Honeypot filled → 200 {"ok":true} but NO log line (silent drop, nothing sent)
  curl -s -w "\n%{http_code}\n" -X POST http://127.0.0.1:8788/api/contact -H "Content-Type: application/json" -d '{"name":"Bot","email":"bot@example.com","company":"","message":"buy now","token":"XXXX.DUMMY.TOKEN.XXXX","website":"https://spam.example","elapsedMs":9000}'

  # 3) Too fast (elapsedMs < 3000) → 400 {"ok":false,"error":"Invalid request."}
  curl -s -w "\n%{http_code}\n" -X POST http://127.0.0.1:8788/api/contact -H "Content-Type: application/json" -d '{"name":"Ada","email":"ada@example.com","company":"","message":"quick","token":"XXXX.DUMMY.TOKEN.XXXX","website":"","elapsedMs":500}'

  # 4) Malformed body → 400 {"ok":false,"error":"Invalid request."}
  curl -s -w "\n%{http_code}\n" -X POST http://127.0.0.1:8788/api/contact -H "Content-Type: application/json" -d 'not json'

  # 5) Invalid email → 400 {"ok":false,"error":"Invalid request."}
  curl -s -w "\n%{http_code}\n" -X POST http://127.0.0.1:8788/api/contact -H "Content-Type: application/json" -d '{"name":"Ada","email":"nope","company":"","message":"hello there","token":"XXXX.DUMMY.TOKEN.XXXX","website":"","elapsedMs":8000}'

  # 6) Missing token → 400 {"ok":false,"error":"Invalid request."}
  curl -s -w "\n%{http_code}\n" -X POST http://127.0.0.1:8788/api/contact -H "Content-Type: application/json" -d '{"name":"Ada","email":"ada@example.com","company":"","message":"hello there","website":"","elapsedMs":8000}'
  ```

  Expect exactly the annotated status/body per call, and confirm no secret values ever appear in any response body.

- [ ] **Step 5: Stop the wrangler process** (kill the background job from Step 3).

- [ ] **Step 6: Commit.**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/functions/api/contact.ts && git commit -m "feat(web): contact Pages Function with Turnstile verify and Resend send"
  ```

---

### Task 32 (E4): Contact form component (Turnstile + honeypot + min-time + states)

**Files:**
- Create: `web/components/contact/contact-form.tsx`

**Interfaces:** Consumes: `validateFields`, `buildContactPayload`, `buildMailtoUrl`, `type ContactFields`, `type FieldErrors` from `@/lib/contact-validation` (Task E2); `POST /api/contact` contract (Task E3); `Turnstile`, `type TurnstileInstance` from `@marsidev/react-turnstile` (Task E1); `Button` / `Input` / `Label` / `Textarea` from `@/components/ui/*`; `CONTACT_EMAIL` from `@/content/nav`; `useTheme` from `next-themes`. / Produces: `export function ContactForm(): React.JSX.Element` (no props).

Behavior locked here: states `idle → sending → sent | error`; min-time tracked from component mount via a `Date.now()` ref; honeypot input named `website` hidden off-screen (`aria-hidden`, `tabIndex={-1}`); Turnstile widget keyed on `resolvedTheme` so it re-renders in the matching theme, token cleared and widget `reset()` after every submit (tokens are single-use per spec §8); error state keeps all field values and renders a prefilled `mailto:` fallback so no lead is lost; submit disabled until a token exists. No new motion is introduced (nothing to gate beyond the existing primitives).

- [ ] **Step 1: Create `web/components/contact/contact-form.tsx` (complete file).**

  ```tsx
  "use client";

  import { useRef, useState } from "react";
  import { useTheme } from "next-themes";
  import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Textarea } from "@/components/ui/textarea";
  import { CONTACT_EMAIL } from "@/content/nav";
  import {
    buildContactPayload,
    buildMailtoUrl,
    validateFields,
    type ContactFields,
    type FieldErrors,
  } from "@/lib/contact-validation";

  // Cloudflare Turnstile public TEST site key (always passes, shows the widget).
  // Swap at launch by setting NEXT_PUBLIC_TURNSTILE_SITE_KEY at build time.
  const TURNSTILE_SITE_KEY =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

  const EMPTY_FIELDS: ContactFields = {
    name: "",
    email: "",
    company: "",
    message: "",
  };

  type Status = "idle" | "sending" | "sent" | "error";

  export function ContactForm() {
    const [fields, setFields] = useState<ContactFields>(EMPTY_FIELDS);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [status, setStatus] = useState<Status>("idle");
    const [token, setToken] = useState("");
    const [website, setWebsite] = useState("");
    const startRef = useRef(Date.now());
    const turnstileRef = useRef<TurnstileInstance | null>(null);
    const { resolvedTheme } = useTheme();

    function update(key: keyof ContactFields) {
      return (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setFields((prev) => ({ ...prev, [key]: e.target.value }));
      };
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const fieldErrors = validateFields(fields);
      setErrors(fieldErrors);
      if (Object.keys(fieldErrors).length > 0) {
        return;
      }

      setStatus("sending");
      const payload = buildContactPayload({
        fields,
        token,
        website,
        elapsedMs: Date.now() - startRef.current,
      });

      let sent = false;
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await res.json().catch(() => null)) as {
          ok?: boolean;
        } | null;
        sent = res.ok && data?.ok === true;
      } catch {
        sent = false;
      }

      // Turnstile tokens are single-use: reset the widget after every attempt.
      turnstileRef.current?.reset();
      setToken("");
      setStatus(sent ? "sent" : "error");
    }

    if (status === "sent") {
      return (
        <div
          role="status"
          className="rounded-[18px] border border-border bg-card p-8"
        >
          <h3 className="font-serif text-2xl font-medium tracking-[-0.01em] text-fg">
            Message sent.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">
            It landed in the right inbox. Average reply: under 24h.
          </p>
        </div>
      );
    }

    return (
      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative rounded-[18px] border border-border bg-card p-6 md:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              value={fields.name}
              onChange={update("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name && (
              <p id="contact-name-error" className="text-xs text-neg">
                {errors.name}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={update("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email && (
              <p id="contact-email-error" className="text-xs text-neg">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          <Label htmlFor="contact-company">
            Company <span className="font-normal text-fg-subtle">(optional)</span>
          </Label>
          <Input
            id="contact-company"
            name="company"
            autoComplete="organization"
            value={fields.company}
            onChange={update("company")}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "contact-company-error" : undefined}
          />
          {errors.company && (
            <p id="contact-company-error" className="text-xs text-neg">
              {errors.company}
            </p>
          )}
        </div>

        <div className="mt-5 grid gap-2">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            value={fields.message}
            onChange={update("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
          {errors.message && (
            <p id="contact-message-error" className="text-xs text-neg">
              {errors.message}
            </p>
          )}
        </div>

        {/* Honeypot: invisible to humans, skipped by keyboard, read by bots. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        >
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <Turnstile
            ref={turnstileRef}
            key={resolvedTheme}
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={setToken}
            onExpire={() => setToken("")}
            onError={() => setToken("")}
            options={{ theme: resolvedTheme === "light" ? "light" : "dark" }}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button
            type="submit"
            size="lg"
            className="rounded-full"
            disabled={status === "sending" || token === ""}
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </Button>
          {status === "error" && (
            <p role="alert" className="text-sm text-neg">
              Something went wrong.{" "}
              <a
                href={buildMailtoUrl(CONTACT_EMAIL, fields)}
                className="font-medium underline underline-offset-4"
              >
                Email us directly
              </a>
              ; your message is pre-filled.
            </p>
          )}
        </div>
      </form>
    );
  }
  ```

- [ ] **Step 2: Verify the component compiles and lints (visual verification happens in Task E6 once the page exists to render it).**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build && npm run lint
  ```

  Expect: clean build, no lint errors.

- [ ] **Step 3: Commit.**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/contact/contact-form.tsx && git commit -m "feat(web): contact form with Turnstile, honeypot, and mailto fallback"
  ```

---

### Task 33 (E5): Cal.com booking embed component

**Files:**
- Create: `web/components/contact/cal-embed.tsx`

**Interfaces:** Consumes: `Cal` (default) and `getCalApi` from `@calcom/embed-react` (Task E1); `CAL_URL` from `@/content/nav`; `useTheme` from `next-themes`. / Produces: `export function CalEmbed(): React.JSX.Element` (no props).

The calLink is derived from the existing `CAL_URL` constant (single source of truth, no duplicated booking URL). The embed follows the site theme via `cal("ui", { theme })` re-run on theme change, and brands the scheduler violet with `cssVarsPerTheme` (`cal-brand: #6e63ff` — accent usage only, exactly the design-system accent). The always-present plain-link fallback is rendered by the page (Task E6) directly under the embed.

- [ ] **Step 1: Create `web/components/contact/cal-embed.tsx` (complete file).**

  ```tsx
  "use client";

  import { useEffect } from "react";
  import Cal, { getCalApi } from "@calcom/embed-react";
  import { useTheme } from "next-themes";
  import { CAL_URL } from "@/content/nav";

  // "kevin-cohen-utwpmj/consultation", derived from the canonical CAL_URL.
  const CAL_LINK = CAL_URL.replace("https://cal.com/", "");
  const CAL_NAMESPACE = "consultation";

  export function CalEmbed() {
    const { resolvedTheme } = useTheme();

    useEffect(() => {
      let cancelled = false;
      (async () => {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE });
        if (cancelled) {
          return;
        }
        cal("ui", {
          theme: resolvedTheme === "light" ? "light" : "dark",
          hideEventTypeDetails: false,
          layout: "month_view",
          cssVarsPerTheme: {
            light: { "cal-brand": "#6e63ff" },
            dark: { "cal-brand": "#6e63ff" },
          },
        });
      })();
      return () => {
        cancelled = true;
      };
    }, [resolvedTheme]);

    return (
      <div className="overflow-hidden rounded-[18px] border border-border bg-card">
        <Cal
          namespace={CAL_NAMESPACE}
          calLink={CAL_LINK}
          style={{ width: "100%", height: "100%", minHeight: "560px" }}
          config={{ layout: "month_view" }}
        />
      </div>
    );
  }
  ```

- [ ] **Step 2: Verify compile + lint (visual verification happens in Task E6 on the assembled page, where the embed can actually load).**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build && npm run lint
  ```

  Expect: clean build, no lint errors.

- [ ] **Step 3: Commit.**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/components/contact/cal-embed.tsx && git commit -m "feat(web): Cal.com booking embed with site-theme sync"
  ```

---

### Task 34 (E6): `/contact/` page (two-path split + direct lines)

**Files:**
- Create: `web/app/contact/page.tsx`

**Interfaces:** Consumes: `PageHero` from `@/components/site/page-hero` (**owner A**, pinned contract `{ eyebrow, title, intro?, children? }` — if Task A's file is not merged yet when this task runs, this task blocks on it); `Container` from `@/components/site/container`; `Reveal` from `@/components/site/reveal`; `CalEmbed` (Task E5); `ContactForm` (Task E4); `CAL_URL`, `CONTACT_EMAIL`, `LINKEDIN_URL` from `@/content/nav`; `Clock`, `Mail` from `lucide-react` (note: lucide-react 1.x removed brand icons — there is NO `Linkedin` icon; LinkedIn renders as a text link exactly like the existing `Footer`). / Produces: static route `/contact/` with `metadata.title = "Contact"`.

Copy sources (facts inventory §7, verbatim or minimally-shaped): hero intro "30-minute call. No pitch, no pressure. Just a conversation about your systems." (v1 index mid-CTA); "Book a conversation" / "Or write to us" (spec §8 headings); "Average reply: under 24h" (v1 contact page); `inquiries@kcoh.ca`; LinkedIn profile URL; Cal.com consultation URL.

- [ ] **Step 1: Create `web/app/contact/page.tsx` (complete file).**

  ```tsx
  import type { Metadata } from "next";
  import { Clock, Mail } from "lucide-react";
  import { Container } from "@/components/site/container";
  import { PageHero } from "@/components/site/page-hero";
  import { Reveal } from "@/components/site/reveal";
  import { CalEmbed } from "@/components/contact/cal-embed";
  import { ContactForm } from "@/components/contact/contact-form";
  import { CAL_URL, CONTACT_EMAIL, LINKEDIN_URL } from "@/content/nav";

  export const metadata: Metadata = {
    title: "Contact",
    description:
      "Book a 30-minute conversation or write to us directly. Average reply: under 24h.",
  };

  export default function ContactPage() {
    return (
      <>
        <PageHero
          eyebrow="Contact"
          title="Let's talk about what you're building."
          intro="30-minute call. No pitch, no pressure. Just a conversation about your systems."
        />

        <section className="border-t border-border bg-bg">
          <Container className="py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-2">
              <Reveal>
                <div className="flex h-full flex-col">
                  <h2 className="font-serif text-[26px] font-medium leading-[1.15] tracking-[-0.01em] text-fg">
                    Book a conversation
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    A 30-minute consultation, scheduled directly.
                  </p>
                  <div className="mt-6 flex-1">
                    <CalEmbed />
                  </div>
                  <p className="mt-3 text-sm text-fg-muted">
                    Prefer a direct link?{" "}
                    <a
                      href={CAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-text underline-offset-4 hover:underline"
                    >
                      Open the calendar on Cal.com
                    </a>
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex h-full flex-col">
                  <h2 className="font-serif text-[26px] font-medium leading-[1.15] tracking-[-0.01em] text-fg">
                    Or write to us
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    A few lines about what you&apos;re building is plenty.
                  </p>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-3"
              >
                <Mail size={16} className="text-brand" />
                <span className="text-sm text-fg-muted transition-colors group-hover:text-fg">
                  {CONTACT_EMAIL}
                </span>
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <span
                  aria-hidden
                  className="grid size-4 place-items-center rounded-[3px] bg-brand/15 text-[9px] font-semibold text-brand"
                >
                  in
                </span>
                <span className="text-sm text-fg-muted transition-colors group-hover:text-fg">
                  LinkedIn
                </span>
              </a>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-brand" />
                <span className="text-sm text-fg-muted">
                  Average reply: under 24h
                </span>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  }
  ```

- [ ] **Step 2: Build, then verify the page in the dev server in BOTH themes.**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev
  ```

  Open `http://localhost:3000/contact/` and verify (screenshot at 1440px and 360px, e.g. with the Playwright browser tools):

  **Dark (default):**
  - PageHero renders eyebrow "CONTACT", serif title, intro line.
  - Two columns: Cal.com month-view scheduler loads inside the rounded card (network-dependent; if offline, the card renders empty but the "Open the calendar on Cal.com" fallback link below is always present and points to `https://cal.com/kevin-cohen-utwpmj/consultation`).
  - Form renders Name/Email/Company (optional)/Message, dark-themed Turnstile widget shows the test-key "Testing only" pass state, "Send message" button enabled once the widget passes.
  - Honeypot: no visible "Website" field; Tab order goes Name → Email → Company → Message → (widget) → Send, never a hidden input.
  - **Error-fallback path (deliberate):** `next dev` has no Pages Functions, so `/api/contact` 404s. Fill the form (wait at least 3 seconds after load), submit, and confirm the error state appears: "Something went wrong. Email us directly; your message is pre-filled." — and the link `href` starts with `mailto:inquiries@kcoh.ca?subject=` and contains your typed message. Field values are retained.
  - Direct lines row: mailto email link, LinkedIn link (to `https://ca.linkedin.com/in/kevin-cohen-entrepreneur`), "Average reply: under 24h".
  - Client-side validation: submit with an empty form → inline `text-neg` messages under Name, Email, Message; no network request fired.

  **Light (toggle via the nav ThemeToggle):**
  - Backgrounds/borders flip to light tokens, serif headings stay `text-fg`, Turnstile widget re-renders in its light theme, Cal embed recolors to light (effect re-runs on theme change).

  **360px:** columns stack (booking above form), nothing overflows horizontally.

  Stop the dev server when done.

- [ ] **Step 3: Commit.**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/app/contact/page.tsx && git commit -m "feat(web): /contact page with two-path booking and form split"
  ```

---

### Task 35 (E7): `_headers` CSP for Turnstile + Cal.com, and full local E2E

**Files:**
- Modify: `web/public/_headers`
- Test: end-to-end under `wrangler pages dev` (browser + curl)

**Interfaces:** Consumes: everything from E1–E6. / Produces: the final Phase 2 `web/public/_headers` (no other workstream touches this file). The v1 root `_headers` porting was partially done in Phase 1 — EmailJS and Google Fonts entries are already removed, Turnstile is already in `script-src`/`frame-src`, and both `/_next/static/*` immutable cache rules already exist. This task adds the Cal.com embed domains (`https://app.cal.com`, `https://cal.com`) to `script-src` and `frame-src` per spec §8, and adds `https://challenges.cloudflare.com` + the Cal domains to `connect-src` (the Turnstile api.js and Cal embed.js run in the top-level page and phone home from there).

- [ ] **Step 1: Edit `web/public/_headers` — replace ONLY the `Content-Security-Policy` line.**

  Before (single line):

  ```
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; connect-src 'self' https://cloudflareinsights.com; frame-src https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'
  ```

  After (single line):

  ```
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://challenges.cloudflare.com https://app.cal.com https://cal.com; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; connect-src 'self' https://cloudflareinsights.com https://challenges.cloudflare.com https://app.cal.com https://cal.com; frame-src https://challenges.cloudflare.com https://app.cal.com https://cal.com; object-src 'none'; base-uri 'self'; form-action 'self'
  ```

  The complete resulting file must be exactly:

  ```
  /*
    X-Content-Type-Options: nosniff
    X-Frame-Options: SAMEORIGIN
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()
    Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://challenges.cloudflare.com https://app.cal.com https://cal.com; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; connect-src 'self' https://cloudflareinsights.com https://challenges.cloudflare.com https://app.cal.com https://cal.com; frame-src https://challenges.cloudflare.com https://app.cal.com https://cal.com; object-src 'none'; base-uri 'self'; form-action 'self'

  /_next/static/media/*
    Cache-Control: public, max-age=31536000, immutable

  /_next/static/*
    Cache-Control: public, max-age=31536000, immutable
  ```

- [ ] **Step 2: Rebuild so the updated `_headers` is copied into `out/`, then start the Pages emulator (background).**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && WRANGLER_SEND_METRICS=false npx wrangler@4 pages dev out --compatibility-date=2026-06-01 --port 8788
  ```

- [ ] **Step 3: Full happy-path E2E in the browser with CSP enforced.** Open `http://127.0.0.1:8788/contact/` and verify, in BOTH themes (toggle via nav):

  - Browser console shows **zero** CSP violation reports; the Turnstile iframe (`challenges.cloudflare.com`) and Cal.com iframe (`app.cal.com` / `cal.com`) both load; the month-view calendar renders.
  - Fill Name/Email/Message taking at least 3 seconds, wait for the Turnstile test-key pass state, click "Send message" → the card is replaced by "Message sent. / It landed in the right inbox. Average reply: under 24h." and the wrangler terminal logs the `[contact] RESEND_API_KEY not set, message logged instead of sent:` line containing the submitted name/email (never the token or any secret).
  - Reload and submit again in the other theme: same result (proves widget reset + re-theming works end-to-end).

- [ ] **Step 4: Status-code regression via curl against the same running emulator (same commands and expectations as Task E3 Step 4, calls 2–4: honeypot → 200 silent, too-fast → 400, malformed → 400).** Then stop the wrangler process.

- [ ] **Step 5: Record the launch swap-over notes (documentation inside this plan; manual Cloudflare-dashboard steps per spec §8/§13 — NOT executed now):**
  - Build with the real widget key: `NEXT_PUBLIC_TURNSTILE_SITE_KEY=<real site key> npm run build`.
  - Set encrypted Pages secrets `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` on the kcoh.ca Pages project (dashboard or `wrangler pages secret put`).
  - Verify the kcoh.ca sending domain in Resend (DKIM/SPF/DMARC) so `contact@kcoh.ca` may send.
  - Add a WAF rate limit (~5 req/min/IP) on `/api/contact`.

- [ ] **Step 6: Run the full test suite one last time, then commit.**

  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test
  cd "/Users/kevincohen/Desktop/KCOH Software Inc." && git add web/public/_headers && git commit -m "feat(web): CSP for Turnstile and Cal.com embeds, contact flow verified e2e"
  ```

---

**Workstream E complete when:** `/contact/` renders in both themes at 360/1440px, `npm test` passes with the full `contact-validation` suite, the curl matrix returns the exact documented status codes under `wrangler pages dev`, the browser happy path shows "Message sent." with zero CSP violations, and the error path degrades to a prefilled `mailto:inquiries@kcoh.ca` link.

---

### Task 36 (F1): Demo data module (types, seed data, formatters)

**Files:**
- Create `web/lib/demo/data.ts`
- Create (test) `web/lib/__tests__/demo-data.test.ts`

**Interfaces:**
- Consumes: nothing (pure module, no imports).
- Produces:
  - `export type DemoScreen = "overview" | "projects" | "invoices" | "analytics"`
  - `export type InvoiceStatus = "Paid" | "Pending" | "Overdue"`
  - `export type DemoInvoice = { id: string; client: string; amount: number; issued: string; status: InvoiceStatus }`
  - `export type DemoProject = { name: string; color: string; phase: string; pct: number; trend: number[] }`
  - `export type DemoLiveData = { revenue: number[]; users: number[]; projectTrends: number[][] }`
  - `export const demoInvoices: DemoInvoice[]` (8 entries)
  - `export const demoProjects: DemoProject[]` (5 entries)
  - `export const demoRevenueSeries: number[]` (30 pts) / `export const demoUsersSeries: number[]` (14 pts)
  - `export const demoLiveInitial: DemoLiveData`
  - `export function formatMoney(amount: number): string`
  - `export function formatIssued(iso: string): string`

- [ ] **Step 1: Write the failing test**

Create `web/lib/__tests__/demo-data.test.ts` with exactly:

```ts
import { describe, it, expect } from "vitest";
import {
  demoInvoices,
  demoProjects,
  demoLiveInitial,
  formatMoney,
  formatIssued,
} from "@/lib/demo/data";

describe("formatMoney", () => {
  it("formats thousands with separators and two decimals", () => {
    expect(formatMoney(4850)).toBe("$4,850.00");
  });

  it("formats sub-thousand amounts", () => {
    expect(formatMoney(980)).toBe("$980.00");
  });

  it("formats decimals without rounding surprises", () => {
    expect(formatMoney(2120.5)).toBe("$2,120.50");
  });
});

describe("formatIssued", () => {
  it("renders an ISO date as Month D, YYYY", () => {
    expect(formatIssued("2026-05-02")).toBe("May 2, 2026");
  });

  it("handles December (index arithmetic)", () => {
    expect(formatIssued("2026-12-24")).toBe("December 24, 2026");
  });
});

describe("demo seed data shape", () => {
  it("has 8 invoices with unique ids", () => {
    expect(demoInvoices).toHaveLength(8);
    expect(new Set(demoInvoices.map((i) => i.id)).size).toBe(8);
  });

  it("live trends are parallel to the projects list", () => {
    expect(demoLiveInitial.projectTrends).toHaveLength(demoProjects.length);
  });

  it("every trend series has enough points to draw a sparkline", () => {
    for (const t of demoLiveInitial.projectTrends) {
      expect(t.length).toBeGreaterThanOrEqual(8);
    }
  });
});
```

- [ ] **Step 2: Run the test and watch it fail**

Run: `cd web && npx vitest run lib/__tests__/demo-data.test.ts`
Expected: the run FAILS with a module-resolution error ("Failed to resolve import \"@/lib/demo/data\"" or "Cannot find module") because `web/lib/demo/data.ts` does not exist yet.

- [ ] **Step 3: Implement the data module**

Create `web/lib/demo/data.ts` with exactly:

```ts
export type DemoScreen = "overview" | "projects" | "invoices" | "analytics";

export type InvoiceStatus = "Paid" | "Pending" | "Overdue";

export type DemoInvoice = {
  id: string;
  client: string;
  amount: number;
  /** ISO date (YYYY-MM-DD): sortable as a plain string. */
  issued: string;
  status: InvoiceStatus;
};

export type DemoProject = {
  name: string;
  color: string;
  phase: string;
  pct: number;
  trend: number[];
};

export type DemoLiveData = {
  revenue: number[];
  users: number[];
  projectTrends: number[][];
};

/** Simulated invoices. Ids/amounts 001-004 match the Overview screen's
 *  "Recent Invoices" card so the demo reads as one system. */
export const demoInvoices: DemoInvoice[] = [
  { id: "INV-2026-001", client: "Concordia Connect", amount: 4850, issued: "2026-05-02", status: "Paid" },
  { id: "INV-2026-002", client: "Drafterie", amount: 2120, issued: "2026-05-06", status: "Paid" },
  { id: "INV-2026-003", client: "Skyroa", amount: 6430, issued: "2026-05-11", status: "Pending" },
  { id: "INV-2026-004", client: "AutoMedic", amount: 1250, issued: "2026-04-28", status: "Overdue" },
  { id: "INV-2026-005", client: "Success", amount: 3480, issued: "2026-05-14", status: "Paid" },
  { id: "INV-2026-006", client: "FrostyNow", amount: 980, issued: "2026-05-17", status: "Pending" },
  { id: "INV-2026-007", client: "Concordia Connect", amount: 5620, issued: "2026-05-21", status: "Paid" },
  { id: "INV-2026-008", client: "Drafterie", amount: 2760, issued: "2026-05-24", status: "Pending" },
];

/** Simulated project list. Colors are the real brand colors from
 *  web/content/projects.ts; pcts match the Overview "Top Projects" card;
 *  phases reuse the four process step names from web/content/process.ts. */
export const demoProjects: DemoProject[] = [
  {
    name: "Concordia Connect",
    color: "#8b1d3f",
    phase: "Build and Ship",
    pct: 75,
    trend: [12, 14, 13, 16, 15, 18, 17, 20, 22, 21, 24, 26],
  },
  {
    name: "Drafterie",
    color: "#6e63ff",
    phase: "Build and Ship",
    pct: 60,
    trend: [8, 9, 11, 10, 13, 12, 15, 14, 16, 18, 17, 19],
  },
  {
    name: "Skyroa",
    color: "#4f46e5",
    phase: "Find the Leverage",
    pct: 45,
    trend: [20, 18, 21, 19, 23, 22, 24, 26, 25, 27, 26, 29],
  },
  {
    name: "AutoMedic",
    color: "#16a34a",
    phase: "Map the System",
    pct: 30,
    trend: [5, 7, 6, 9, 8, 10, 12, 11, 13, 12, 14, 16],
  },
  {
    name: "FrostyNow",
    color: "#6be5ff",
    phase: "Map the System",
    pct: 20,
    trend: [3, 4, 6, 5, 7, 8, 7, 9, 10, 9, 11, 12],
  },
];

/** Same 30-point series the Overview revenue chart uses. */
export const demoRevenueSeries: number[] = [
  12, 14, 13, 16, 18, 17, 20, 19, 22, 21, 24, 23, 20, 25, 27, 26, 29, 24, 28,
  30, 27, 31, 29, 33, 30, 34, 32, 36, 35, 38,
];

/** Same 14-point series the Overview "Live Users" sparkline uses. */
export const demoUsersSeries: number[] = [
  8, 10, 9, 12, 11, 14, 13, 16, 15, 18, 20, 19, 22, 24,
];

export const demoLiveInitial: DemoLiveData = {
  revenue: demoRevenueSeries,
  users: demoUsersSeries,
  projectTrends: demoProjects.map((p) => p.trend),
};

export function formatMoney(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-05-02" -> "May 2, 2026". Parses parts directly (no Date, no TZ drift). */
export function formatIssued(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1] ?? ""} ${d}, ${y}`;
}
```

- [ ] **Step 4: Run the test and watch it pass**

Run: `cd web && npx vitest run lib/__tests__/demo-data.test.ts`
Expected: 8 tests pass, 0 fail.

- [ ] **Step 5: Commit**

```bash
git add web/lib/demo/data.ts web/lib/__tests__/demo-data.test.ts
git commit -m "feat(web): demo data model and formatters for playable dashboard"
```

---

### Task 37 (F2): Invoice sort logic (TDD)

**Files:**
- Create `web/lib/demo/sort.ts`
- Create (test) `web/lib/__tests__/demo-sort.test.ts`

**Interfaces:**
- Consumes: `DemoInvoice`, `InvoiceStatus` from `web/lib/demo/data.ts` (Task F1).
- Produces:
  - `export type SortDirection = "asc" | "desc"`
  - `export type InvoiceSortKey = "id" | "client" | "amount" | "issued" | "status"`
  - `export type SortState = { key: InvoiceSortKey; direction: SortDirection }`
  - `export function nextSortState(current: SortState | null, clicked: InvoiceSortKey): SortState`
  - `export function sortInvoices(invoices: DemoInvoice[], state: SortState | null): DemoInvoice[]` (non-mutating; stable within equal keys; `null` state returns a copy in original order)

- [ ] **Step 1: Write the failing test**

Create `web/lib/__tests__/demo-sort.test.ts` with exactly:

```ts
import { describe, it, expect } from "vitest";
import type { DemoInvoice } from "@/lib/demo/data";
import { nextSortState, sortInvoices } from "@/lib/demo/sort";

const fixture: DemoInvoice[] = [
  { id: "INV-2026-003", client: "Skyroa", amount: 6430, issued: "2026-05-11", status: "Pending" },
  { id: "INV-2026-001", client: "Concordia Connect", amount: 4850, issued: "2026-05-02", status: "Paid" },
  { id: "INV-2026-004", client: "AutoMedic", amount: 1250, issued: "2026-04-28", status: "Overdue" },
  { id: "INV-2026-002", client: "Drafterie", amount: 2120, issued: "2026-05-06", status: "Paid" },
];

const ids = (rows: DemoInvoice[]) => rows.map((r) => r.id);

describe("nextSortState", () => {
  it("starts ascending on a fresh column", () => {
    expect(nextSortState(null, "amount")).toEqual({ key: "amount", direction: "asc" });
  });

  it("toggles asc to desc on the same column", () => {
    expect(nextSortState({ key: "amount", direction: "asc" }, "amount")).toEqual({
      key: "amount",
      direction: "desc",
    });
  });

  it("toggles desc back to asc on the same column", () => {
    expect(nextSortState({ key: "amount", direction: "desc" }, "amount")).toEqual({
      key: "amount",
      direction: "asc",
    });
  });

  it("resets to ascending when a different column is clicked", () => {
    expect(nextSortState({ key: "amount", direction: "desc" }, "client")).toEqual({
      key: "client",
      direction: "asc",
    });
  });
});

describe("sortInvoices", () => {
  it("returns a copy in original order when state is null", () => {
    const out = sortInvoices(fixture, null);
    expect(ids(out)).toEqual(["INV-2026-003", "INV-2026-001", "INV-2026-004", "INV-2026-002"]);
    expect(out).not.toBe(fixture);
  });

  it("sorts by amount ascending", () => {
    const out = sortInvoices(fixture, { key: "amount", direction: "asc" });
    expect(ids(out)).toEqual(["INV-2026-004", "INV-2026-002", "INV-2026-001", "INV-2026-003"]);
  });

  it("sorts by amount descending", () => {
    const out = sortInvoices(fixture, { key: "amount", direction: "desc" });
    expect(ids(out)).toEqual(["INV-2026-003", "INV-2026-001", "INV-2026-002", "INV-2026-004"]);
  });

  it("sorts by id ascending", () => {
    const out = sortInvoices(fixture, { key: "id", direction: "asc" });
    expect(ids(out)).toEqual(["INV-2026-001", "INV-2026-002", "INV-2026-003", "INV-2026-004"]);
  });

  it("sorts by client name ascending", () => {
    const out = sortInvoices(fixture, { key: "client", direction: "asc" });
    expect(out.map((r) => r.client)).toEqual([
      "AutoMedic",
      "Concordia Connect",
      "Drafterie",
      "Skyroa",
    ]);
  });

  it("sorts by issued date ascending (ISO string order)", () => {
    const out = sortInvoices(fixture, { key: "issued", direction: "asc" });
    expect(out.map((r) => r.issued)).toEqual([
      "2026-04-28",
      "2026-05-02",
      "2026-05-06",
      "2026-05-11",
    ]);
  });

  it("sorts by status rank Paid < Pending < Overdue, stable within equal ranks", () => {
    const asc = sortInvoices(fixture, { key: "status", direction: "asc" });
    expect(ids(asc)).toEqual(["INV-2026-001", "INV-2026-002", "INV-2026-003", "INV-2026-004"]);
    const desc = sortInvoices(fixture, { key: "status", direction: "desc" });
    expect(ids(desc)).toEqual(["INV-2026-004", "INV-2026-003", "INV-2026-001", "INV-2026-002"]);
  });

  it("does not mutate the input array", () => {
    sortInvoices(fixture, { key: "amount", direction: "asc" });
    expect(fixture[0].id).toBe("INV-2026-003");
  });
});
```

- [ ] **Step 2: Run the test and watch it fail**

Run: `cd web && npx vitest run lib/__tests__/demo-sort.test.ts`
Expected: FAILS with a module-resolution error for `@/lib/demo/sort` (file does not exist yet).

- [ ] **Step 3: Implement the sort module**

Create `web/lib/demo/sort.ts` with exactly:

```ts
import type { DemoInvoice, InvoiceStatus } from "./data";

export type SortDirection = "asc" | "desc";

export type InvoiceSortKey = "id" | "client" | "amount" | "issued" | "status";

export type SortState = { key: InvoiceSortKey; direction: SortDirection };

const statusRank: Record<InvoiceStatus, number> = {
  Paid: 0,
  Pending: 1,
  Overdue: 2,
};

/** Column-header click reducer: fresh column starts ascending,
 *  clicking the active column toggles direction. */
export function nextSortState(
  current: SortState | null,
  clicked: InvoiceSortKey,
): SortState {
  if (!current || current.key !== clicked) {
    return { key: clicked, direction: "asc" };
  }
  return {
    key: clicked,
    direction: current.direction === "asc" ? "desc" : "asc",
  };
}

function compare(a: DemoInvoice, b: DemoInvoice, key: InvoiceSortKey): number {
  switch (key) {
    case "amount":
      return a.amount - b.amount;
    case "status":
      return statusRank[a.status] - statusRank[b.status];
    case "issued":
      return a.issued < b.issued ? -1 : a.issued > b.issued ? 1 : 0;
    default:
      return a[key].localeCompare(b[key]);
  }
}

/** Non-mutating sort. `null` state returns a copy in original order.
 *  Array.prototype.sort is stable, so equal keys keep their relative order. */
export function sortInvoices(
  invoices: DemoInvoice[],
  state: SortState | null,
): DemoInvoice[] {
  const copy = [...invoices];
  if (!state) return copy;
  const dir = state.direction === "asc" ? 1 : -1;
  copy.sort((a, b) => dir * compare(a, b, state.key));
  return copy;
}
```

- [ ] **Step 4: Run the test and watch it pass**

Run: `cd web && npx vitest run lib/__tests__/demo-sort.test.ts`
Expected: 12 tests pass, 0 fail.

- [ ] **Step 5: Commit**

```bash
git add web/lib/demo/sort.ts web/lib/__tests__/demo-sort.test.ts
git commit -m "feat(web): invoice sort logic for demo dashboard"
```

---

### Task 38 (F3): Ticker data-advance logic (TDD)

**Files:**
- Create `web/lib/demo/ticker.ts`
- Create (test) `web/lib/__tests__/demo-ticker.test.ts`

**Interfaces:**
- Consumes: `DemoLiveData` from `web/lib/demo/data.ts` (Task F1).
- Produces:
  - `export const DEMO_TICK_MS = 1600`
  - `export type SeriesBounds = { min: number; max: number; maxStep: number }`
  - `export function advanceSeries(series: number[], bounds: SeriesBounds, random?: () => number): number[]` (drops the first point, appends a bounded random walk from the last point; non-mutating; deterministic when `random` is injected)
  - `export const REVENUE_BOUNDS: SeriesBounds` / `export const USERS_BOUNDS: SeriesBounds` / `export const TREND_BOUNDS: SeriesBounds`
  - `export function advanceDemoLive(live: DemoLiveData, random?: () => number): DemoLiveData`

- [ ] **Step 1: Write the failing test**

Create `web/lib/__tests__/demo-ticker.test.ts` with exactly:

```ts
import { describe, it, expect } from "vitest";
import type { DemoLiveData } from "@/lib/demo/data";
import { advanceSeries, advanceDemoLive } from "@/lib/demo/ticker";

const bounds = { min: 0, max: 100, maxStep: 3 };

describe("advanceSeries", () => {
  it("keeps the series length", () => {
    expect(advanceSeries([1, 2, 3], bounds, () => 0.5)).toHaveLength(3);
  });

  it("slides the window: drops the first point, keeps the rest", () => {
    const out = advanceSeries([10, 12, 14], bounds, () => 0.5);
    expect(out.slice(0, 2)).toEqual([12, 14]);
  });

  it("appends last + maxStep when random() = 1", () => {
    expect(advanceSeries([10, 12], bounds, () => 1)).toEqual([12, 15]);
  });

  it("appends last - maxStep when random() = 0", () => {
    expect(advanceSeries([10, 12], bounds, () => 0)).toEqual([12, 9]);
  });

  it("clamps to max", () => {
    expect(advanceSeries([10, 99], { min: 0, max: 100, maxStep: 5 }, () => 1)).toEqual([99, 100]);
  });

  it("clamps to min", () => {
    expect(advanceSeries([5, 1], { min: 0, max: 100, maxStep: 5 }, () => 0)).toEqual([1, 0]);
  });

  it("rounds the appended value to two decimals", () => {
    const out = advanceSeries([1], { min: 0, max: 10, maxStep: 1 }, () => 0.8333);
    expect(out[0]).toBe(1.67);
  });

  it("returns [] for an empty series", () => {
    expect(advanceSeries([], bounds, () => 1)).toEqual([]);
  });

  it("does not mutate the input", () => {
    const input = [10, 12];
    advanceSeries(input, bounds, () => 1);
    expect(input).toEqual([10, 12]);
  });
});

describe("advanceDemoLive", () => {
  // Fixture values sit INSIDE each series' bounds so the clamp never
  // interferes with the deterministic expectations below
  // (REVENUE_BOUNDS.min = 10, USERS_BOUNDS.min = 6, TREND_BOUNDS.min = 2).
  const live: DemoLiveData = {
    revenue: [12, 14],
    users: [8, 10],
    projectTrends: [
      [5, 6],
      [7, 8],
    ],
  };

  it("advances every series deterministically with an injected random", () => {
    const out = advanceDemoLive(live, () => 1);
    expect(out.revenue).toEqual([14, 17]); // REVENUE_BOUNDS.maxStep = 3
    expect(out.users).toEqual([10, 12.5]); // USERS_BOUNDS.maxStep = 2.5
    expect(out.projectTrends).toEqual([
      [6, 8], // TREND_BOUNDS.maxStep = 2
      [8, 10],
    ]);
  });

  it("preserves all lengths and does not mutate the input", () => {
    const out = advanceDemoLive(live, () => 0.5);
    expect(out.revenue).toHaveLength(2);
    expect(out.users).toHaveLength(2);
    expect(out.projectTrends).toHaveLength(2);
    expect(live.revenue).toEqual([12, 14]);
    expect(live.projectTrends[0]).toEqual([5, 6]);
  });
});
```

- [ ] **Step 2: Run the test and watch it fail**

Run: `cd web && npx vitest run lib/__tests__/demo-ticker.test.ts`
Expected: FAILS with a module-resolution error for `@/lib/demo/ticker`.

- [ ] **Step 3: Implement the ticker module**

Create `web/lib/demo/ticker.ts` with exactly:

```ts
import type { DemoLiveData } from "./data";

/** One simulated data tick every 1.6s (state update, not an animation). */
export const DEMO_TICK_MS = 1600;

export type SeriesBounds = { min: number; max: number; maxStep: number };

/**
 * Advance a series one tick: drop the first point and append a bounded
 * random-walk step from the last point. Pure and non-mutating; inject
 * `random` for deterministic tests.
 */
export function advanceSeries(
  series: number[],
  bounds: SeriesBounds,
  random: () => number = Math.random,
): number[] {
  if (series.length === 0) return [];
  const last = series[series.length - 1];
  const delta = (random() * 2 - 1) * bounds.maxStep;
  const next = Math.min(bounds.max, Math.max(bounds.min, last + delta));
  return [...series.slice(1), Math.round(next * 100) / 100];
}

export const REVENUE_BOUNDS: SeriesBounds = { min: 10, max: 42, maxStep: 3 };
export const USERS_BOUNDS: SeriesBounds = { min: 6, max: 30, maxStep: 2.5 };
export const TREND_BOUNDS: SeriesBounds = { min: 2, max: 32, maxStep: 2 };

/** Advance every live series in one pass (used by the demo shell's ticker). */
export function advanceDemoLive(
  live: DemoLiveData,
  random: () => number = Math.random,
): DemoLiveData {
  return {
    revenue: advanceSeries(live.revenue, REVENUE_BOUNDS, random),
    users: advanceSeries(live.users, USERS_BOUNDS, random),
    projectTrends: live.projectTrends.map((t) =>
      advanceSeries(t, TREND_BOUNDS, random),
    ),
  };
}
```

- [ ] **Step 4: Run the test and watch it pass**

Run: `cd web && npx vitest run lib/__tests__/demo-ticker.test.ts`
Expected: 11 tests pass, 0 fail.

- [ ] **Step 5: Commit**

```bash
git add web/lib/demo/ticker.ts web/lib/__tests__/demo-ticker.test.ts
git commit -m "feat(web): live ticker advance logic for demo dashboard"
```

---

### Task 39 (F4): `useTicker` hook (setInterval-driven, reduced-motion aware)

**Files:**
- Create `web/lib/hooks/use-ticker.ts`

**Interfaces:**
- Consumes: `useReducedMotion(): boolean` from `web/lib/hooks/use-reduced-motion.ts` (existing, API reference §3).
- Produces: `export function useTicker<T>(initial: T, advance: (current: T) => T, intervalMs?: number): T` — returns `initial` frozen when reduced motion is on; otherwise advances state every `intervalMs` (default 1600) via `setInterval`; clears the interval on unmount and when reduced motion flips on.

Per repo convention, hooks are not unit-tested (vitest covers exported pure helpers only — the pure `advance` functions were TDD'd in F3). Verification here is the type-check plus the live behavior check in Task F11.

- [ ] **Step 1: Implement the hook**

Create `web/lib/hooks/use-ticker.ts` with exactly:

```ts
"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * Simulated-live-data ticker. Advances `initial` through the pure `advance`
 * function every `intervalMs` milliseconds via setInterval.
 * Reduced-motion aware: when the user prefers reduced motion the interval
 * never starts (or is torn down) and the initial data stays frozen.
 * The interval is cleared on unmount.
 */
export function useTicker<T>(
  initial: T,
  advance: (current: T) => T,
  intervalMs = 1600,
): T {
  const [value, setValue] = useState(initial);
  const advanceRef = useRef(advance);
  const reduced = useReducedMotion();

  useEffect(() => {
    advanceRef.current = advance;
  }, [advance]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setValue((current) => advanceRef.current(current));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduced, intervalMs]);

  return value;
}
```

- [ ] **Step 2: Type-check and lint**

Run: `cd web && npx tsc --noEmit && npm run lint`
Expected: both exit 0 with no errors.

- [ ] **Step 3: Commit**

```bash
git add web/lib/hooks/use-ticker.ts
git commit -m "feat(web): useTicker hook for simulated live data"
```

---

### Task 40 (F5): Hover-index geometry (TDD) + `ChartTooltip` component

**Files:**
- Create `web/lib/demo/hover.ts`
- Create (test) `web/lib/__tests__/demo-hover.test.ts`
- Create `web/components/dashboard/charts/chart-tooltip.tsx`

**Interfaces:**
- Consumes: `cn` from `web/lib/utils.ts` (existing).
- Produces:
  - `export function hoverIndexFromX(x: number, width: number, count: number): number` — nearest data-point index for a continuous (line/area) series; clamps out-of-range x; `-1` when `count <= 0`
  - `export function barIndexFromX(x: number, width: number, count: number): number` — containing-group index for grouped bars; clamps; `-1` when `count <= 0`
  - `export function ChartTooltip({ x, y, label, value, className }: { x: number; y: number; label: string; value: string; className?: string })` — absolutely positioned tooltip box; parent must be `position: relative`; `x`/`y` are container pixels

- [ ] **Step 1: Write the failing test**

Create `web/lib/__tests__/demo-hover.test.ts` with exactly:

```ts
import { describe, it, expect } from "vitest";
import { hoverIndexFromX, barIndexFromX } from "@/lib/demo/hover";

describe("hoverIndexFromX", () => {
  it("maps the left edge to index 0", () => {
    expect(hoverIndexFromX(0, 100, 30)).toBe(0);
  });

  it("maps the right edge to the last index", () => {
    expect(hoverIndexFromX(100, 100, 30)).toBe(29);
  });

  it("rounds to the nearest index", () => {
    expect(hoverIndexFromX(50, 100, 3)).toBe(1);
    expect(hoverIndexFromX(74, 100, 3)).toBe(1);
    expect(hoverIndexFromX(76, 100, 3)).toBe(2);
  });

  it("clamps x below 0 and above width", () => {
    expect(hoverIndexFromX(-20, 100, 5)).toBe(0);
    expect(hoverIndexFromX(140, 100, 5)).toBe(4);
  });

  it("returns 0 for a single point and for zero width", () => {
    expect(hoverIndexFromX(50, 100, 1)).toBe(0);
    expect(hoverIndexFromX(50, 0, 5)).toBe(0);
  });

  it("returns -1 when there are no points", () => {
    expect(hoverIndexFromX(50, 100, 0)).toBe(-1);
  });
});

describe("barIndexFromX", () => {
  it("maps x to the containing group", () => {
    expect(barIndexFromX(0, 100, 5)).toBe(0);
    expect(barIndexFromX(19.9, 100, 5)).toBe(0);
    expect(barIndexFromX(20, 100, 5)).toBe(1);
    expect(barIndexFromX(99.9, 100, 5)).toBe(4);
  });

  it("clamps the right edge into the last group", () => {
    expect(barIndexFromX(100, 100, 5)).toBe(4);
    expect(barIndexFromX(150, 100, 5)).toBe(4);
  });

  it("clamps negative x into the first group", () => {
    expect(barIndexFromX(-5, 100, 5)).toBe(0);
  });

  it("returns -1 when there are no groups and 0 for zero width", () => {
    expect(barIndexFromX(50, 100, 0)).toBe(-1);
    expect(barIndexFromX(50, 0, 5)).toBe(0);
  });
});
```

- [ ] **Step 2: Run the test and watch it fail**

Run: `cd web && npx vitest run lib/__tests__/demo-hover.test.ts`
Expected: FAILS with a module-resolution error for `@/lib/demo/hover`.

- [ ] **Step 3: Implement the hover module**

Create `web/lib/demo/hover.ts` with exactly:

```ts
/**
 * Hover-picking math for the demo's tooltip charts. Callers translate a
 * mouse position into the chart's viewBox space (minus padding) and get a
 * data index back. Pairs with toPoints() from lib/charts/geometry for the
 * dot/guide position.
 */

/** Nearest point index for a continuous series (area/line charts). */
export function hoverIndexFromX(x: number, width: number, count: number): number {
  if (count <= 0) return -1;
  if (count === 1 || width <= 0) return 0;
  const t = Math.min(1, Math.max(0, x / width));
  return Math.round(t * (count - 1));
}

/** Containing group index for grouped bar charts. */
export function barIndexFromX(x: number, width: number, count: number): number {
  if (count <= 0) return -1;
  if (width <= 0) return 0;
  const t = Math.min(1, Math.max(0, x / width));
  return Math.min(count - 1, Math.floor(t * count));
}
```

- [ ] **Step 4: Run the test and watch it pass**

Run: `cd web && npx vitest run lib/__tests__/demo-hover.test.ts`
Expected: 10 tests pass, 0 fail.

- [ ] **Step 5: Implement `ChartTooltip`**

Create `web/components/dashboard/charts/chart-tooltip.tsx` with exactly:

```tsx
import { cn } from "@/lib/utils";

/**
 * Positioned tooltip for the demo charts. Parent must be `relative`;
 * `x`/`y` are pixel coordinates within that parent. Rendered 10px above
 * the anchor point, centered horizontally. Pure presentation, no state.
 */
export function ChartTooltip({
  x,
  y,
  label,
  value,
  className,
}: {
  x: number;
  y: number;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        "pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs shadow-lg",
        className,
      )}
      style={{ left: x, top: y }}
    >
      {label ? <div className="text-fg-subtle">{label}</div> : null}
      <div className="font-semibold text-fg tabular-nums">{value}</div>
    </div>
  );
}
```

- [ ] **Step 6: Type-check and lint**

Run: `cd web && npx tsc --noEmit && npm run lint`
Expected: both clean.

- [ ] **Step 7: Commit**

```bash
git add web/lib/demo/hover.ts web/lib/__tests__/demo-hover.test.ts web/components/dashboard/charts/chart-tooltip.tsx
git commit -m "feat(web): chart hover geometry and tooltip component"
```

---

### Task 41 (F6): `TooltipAreaChart` + `TooltipBarChart`

**Files:**
- Create `web/components/dashboard/charts/tooltip-area-chart.tsx`
- Create `web/components/dashboard/charts/tooltip-bar-chart.tsx`

**Interfaces:**
- Consumes: `toPoints`, `linePath`, `areaPath` from `web/lib/charts/geometry.ts` (existing); `hoverIndexFromX`, `barIndexFromX` from `web/lib/demo/hover.ts` (F5); `ChartTooltip` (F5); `BarGroup` type from `web/components/dashboard/charts/bar-chart.tsx` (existing); `cn`.
- Produces:
  - `export function TooltipAreaChart({ data, labels, formatValue, width = 560, height = 220, ariaLabel, className }: { data: number[]; labels: string[]; formatValue: (value: number) => string; width?: number; height?: number; ariaLabel: string; className?: string })`
  - `export function TooltipBarChart({ data, formatValue, max = 30, width = 520, height = 220, ariaLabel, className }: { data: BarGroup[]; formatValue: (group: BarGroup) => string; max?: number; width?: number; height?: number; ariaLabel: string; className?: string })`

Both render the same brand/highlight gradient visuals as the existing `AreaChart`/`BarChart` (violet only as line/gradient accents, never a fill block) and add mouse-hover tooltips. Hover math: translate the mouse x into viewBox space, subtract the chart pad, and pick the index with the pure helpers from F5; dot/guide positions come from `toPoints` (same geometry module the base charts use). Tooltips are instant show/hide (no animation), so no reduced-motion gating is needed; on touch devices there is simply no hover, which is safe.

- [ ] **Step 1: Implement `TooltipAreaChart`**

Create `web/components/dashboard/charts/tooltip-area-chart.tsx` with exactly:

```tsx
"use client";

import { useId, useState } from "react";
import { areaPath, linePath, toPoints } from "@/lib/charts/geometry";
import { hoverIndexFromX } from "@/lib/demo/hover";
import { cn } from "@/lib/utils";
import { ChartTooltip } from "./chart-tooltip";

type HoverState = { index: number; cx: number; cy: number };

/**
 * AreaChart variant with a cursor-tracking tooltip: vertical guide line,
 * ring dot, and a ChartTooltip showing labels[i] + formatValue(data[i]).
 * `className` must give the wrapper a height (e.g. "h-56 w-full").
 */
export function TooltipAreaChart({
  data,
  labels,
  formatValue,
  width = 560,
  height = 220,
  ariaLabel,
  className,
}: {
  data: number[];
  labels: string[];
  formatValue: (value: number) => string;
  width?: number;
  height?: number;
  ariaLabel: string;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const [hover, setHover] = useState<HoverState | null>(null);
  const pad = 6;
  const line = linePath(data, width, height, pad);
  const area = areaPath(data, width, height, pad);
  const pts = toPoints(data, width, height, pad);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (pts.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const viewX = ((e.clientX - rect.left) / rect.width) * width;
    const index = hoverIndexFromX(viewX - pad, width - pad * 2, data.length);
    if (index < 0) return;
    const pt = pts[index];
    setHover({
      index,
      cx: (pt.x / width) * rect.width,
      cy: (pt.y / height) * rect.height,
    });
  }

  const hp = hover ? pts[hover.index] : undefined;
  const hoveredValue = hover ? data[hover.index] : undefined;

  return (
    <div
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHover(null)}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-full w-full"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--brand)", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: "var(--brand)", stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id={`stroke-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" style={{ stopColor: "var(--brand)" }} />
            <stop offset="100%" style={{ stopColor: "var(--highlight)" }} />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#fill-${uid})`} />
        <path
          d={line}
          fill="none"
          stroke={`url(#stroke-${uid})`}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {hp ? (
          <>
            <line
              x1={hp.x}
              y1={hp.y}
              x2={hp.x}
              y2={height - pad}
              style={{ stroke: "var(--brand)" }}
              strokeOpacity="0.4"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={hp.x}
              cy={hp.y}
              r={5}
              style={{ fill: "var(--card)", stroke: "var(--brand)" }}
              strokeWidth={2.5}
              vectorEffect="non-scaling-stroke"
            />
          </>
        ) : null}
      </svg>
      {hover && hoveredValue !== undefined ? (
        <ChartTooltip
          x={hover.cx}
          y={hover.cy}
          label={labels[hover.index] ?? ""}
          value={formatValue(hoveredValue)}
        />
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Implement `TooltipBarChart`**

Create `web/components/dashboard/charts/tooltip-bar-chart.tsx` with exactly:

```tsx
"use client";

import { useId, useState } from "react";
import { barIndexFromX } from "@/lib/demo/hover";
import { cn } from "@/lib/utils";
import type { BarGroup } from "./bar-chart";
import { ChartTooltip } from "./chart-tooltip";

type HoverState = { index: number; cx: number; cy: number };

/**
 * BarChart variant with per-group hover: a faint brand wash behind the
 * hovered group plus a ChartTooltip showing the group label + formatValue.
 * Same geometry constants as the base BarChart (pad 10, barW cap 14, gap 6).
 */
export function TooltipBarChart({
  data,
  formatValue,
  max = 30,
  width = 520,
  height = 220,
  ariaLabel,
  className,
}: {
  data: BarGroup[];
  formatValue: (group: BarGroup) => string;
  max?: number;
  width?: number;
  height?: number;
  ariaLabel: string;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const [hover, setHover] = useState<HoverState | null>(null);
  const pad = 10;
  const innerH = height - pad * 2;
  const groupW = (width - pad * 2) / data.length;
  const barW = Math.min(14, groupW / 3.2);
  const gap = 6;

  const y = (v: number) => pad + innerH - (v / max) * innerH;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (data.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const viewX = ((e.clientX - rect.left) / rect.width) * width;
    const index = barIndexFromX(viewX - pad, width - pad * 2, data.length);
    if (index < 0) return;
    const g = data[index];
    const cx = pad + groupW * index + groupW / 2;
    const cy = y(Math.max(g.a, g.b));
    setHover({
      index,
      cx: (cx / width) * rect.width,
      cy: (cy / height) * rect.height,
    });
  }

  const hovered = hover ? data[hover.index] : undefined;

  return (
    <div
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHover(null)}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-full w-full"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id={`barA-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--brand)" }} />
            <stop offset="100%" style={{ stopColor: "var(--brand)", stopOpacity: 0.55 }} />
          </linearGradient>
          <linearGradient id={`barB-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--highlight)" }} />
            <stop offset="100%" style={{ stopColor: "var(--highlight)", stopOpacity: 0.5 }} />
          </linearGradient>
        </defs>
        {hover ? (
          <rect
            x={pad + groupW * hover.index}
            y={pad}
            width={groupW}
            height={innerH}
            rx={8}
            style={{ fill: "var(--brand)" }}
            opacity={0.08}
          />
        ) : null}
        {data.map((g, i) => {
          const cx = pad + groupW * i + groupW / 2;
          const ax = cx - barW - gap / 2;
          const bx = cx + gap / 2;
          return (
            <g key={g.label}>
              <rect
                x={ax}
                y={y(g.a)}
                width={barW}
                height={pad + innerH - y(g.a)}
                rx={4}
                fill={`url(#barA-${uid})`}
              />
              <rect
                x={bx}
                y={y(g.b)}
                width={barW}
                height={pad + innerH - y(g.b)}
                rx={4}
                fill={`url(#barB-${uid})`}
              />
            </g>
          );
        })}
      </svg>
      {hover && hovered ? (
        <ChartTooltip
          x={hover.cx}
          y={hover.cy}
          label={hovered.label}
          value={formatValue(hovered)}
        />
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Type-check and lint**

Run: `cd web && npx tsc --noEmit && npm run lint`
Expected: both clean. (Visual verification happens in Tasks F9/F11 once the charts are on the Analytics screen.)

- [ ] **Step 4: Commit**

```bash
git add web/components/dashboard/charts/tooltip-area-chart.tsx web/components/dashboard/charts/tooltip-bar-chart.tsx
git commit -m "feat(web): tooltip area and bar charts for demo dashboard"
```

---

### Task 42 (F7): `DemoSidebar` (clickable nav) + `ProjectsScreen`

**Files:**
- Create `web/components/dashboard/demo/demo-sidebar.tsx`
- Create `web/components/dashboard/demo/projects-screen.tsx`

**Interfaces:**
- Consumes: `DemoScreen`, `demoProjects` from `web/lib/demo/data.ts` (F1); `Sparkline` from `web/components/dashboard/charts/sparkline.tsx` (existing); **`ProjectTheme({ accent, children, className })` from `web/components/site/project-theme.tsx` [owner: B — must land before this task executes]**; `cn`; lucide icons.
- Produces:
  - `export const demoNavScreens: { id: DemoScreen; label: string }[]` (from `demo-sidebar.tsx`)
  - `export function DemoSidebar({ screen, onSelect }: { screen: DemoScreen; onSelect: (screen: DemoScreen) => void })`
  - `export function ProjectsScreen({ trends }: { trends: number[][] })` — `trends` is the live-ticking `projectTrends` array, parallel to `demoProjects`

The sidebar preserves the exact look and item order of the static `SidebarNav` (profile card, seven items, log-out footer) but renders Overview / Projects / Invoices / Analytics as real buttons; Clients / Calendar / Settings stay display-only, muted. The static `sidebar-nav.tsx` is not touched.

- [ ] **Step 1: Implement `DemoSidebar`**

Create `web/components/dashboard/demo/demo-sidebar.tsx` with exactly:

```tsx
"use client";

import {
  LayoutGrid,
  FolderKanban,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoScreen } from "@/lib/demo/data";

/** The four playable screens, in sidebar order. Reused by the mobile tab row. */
export const demoNavScreens: { id: DemoScreen; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "invoices", label: "Invoices" },
  { id: "analytics", label: "Analytics" },
];

const items: { icon: LucideIcon; label: string; screen?: DemoScreen }[] = [
  { icon: LayoutGrid, label: "Overview", screen: "overview" },
  { icon: FolderKanban, label: "Projects", screen: "projects" },
  { icon: Users, label: "Clients" },
  { icon: FileText, label: "Invoices", screen: "invoices" },
  { icon: Calendar, label: "Calendar" },
  { icon: BarChart3, label: "Analytics", screen: "analytics" },
  { icon: Settings, label: "Settings" },
];

/** Clickable variant of SidebarNav for the playable demo. Same visual
 *  language; Clients/Calendar/Settings stay display-only. */
export function DemoSidebar({
  screen,
  onSelect,
}: {
  screen: DemoScreen;
  onSelect: (screen: DemoScreen) => void;
}) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-3 rounded-xl border border-border p-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-highlight text-xs font-semibold text-white">
          JS
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-fg">John Smith</div>
          <div className="truncate text-xs text-fg-subtle">john@kcoh.ca</div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Demo dashboard screens">
        {items.map((it) => {
          const target = it.screen;
          if (!target) {
            return (
              <div
                key={it.label}
                className="flex cursor-default items-center gap-3 rounded-lg px-3 py-2 text-sm text-fg-subtle"
              >
                <it.icon size={16} />
                <span className="flex-1">{it.label}</span>
              </div>
            );
          }
          const active = target === screen;
          return (
            <button
              key={it.label}
              type="button"
              onClick={() => onSelect(target)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                active
                  ? "bg-brand/10 font-medium text-fg"
                  : "text-fg-muted hover:text-fg",
              )}
            >
              <it.icon size={16} className={active ? "text-brand" : ""} />
              <span className="flex-1">{it.label}</span>
              {active ? <ChevronRight size={14} className="text-brand" /> : null}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 border-t border-border px-3 pt-3 text-sm text-fg-muted">
        <LogOut size={16} /> Log out
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Implement `ProjectsScreen`**

Create `web/components/dashboard/demo/projects-screen.tsx` with exactly:

```tsx
"use client";

import { ProjectTheme } from "@/components/site/project-theme";
import { Sparkline } from "@/components/dashboard/charts/sparkline";
import { demoProjects } from "@/lib/demo/data";

/**
 * Projects screen: progress list with per-project live sparklines.
 * `trends` is the ticking projectTrends array from the demo shell,
 * parallel to demoProjects. Each sparkline is wrapped in ProjectTheme
 * so it draws in that project's real brand color.
 */
export function ProjectsScreen({ trends }: { trends: number[][] }) {
  return (
    <div className="space-y-4 text-fg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects</h2>
        <span className="rounded-md border border-border px-2 py-1 text-[11px] text-fg-muted">
          {demoProjects.length} active
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <ul className="divide-y divide-border/70">
          {demoProjects.map((p, i) => (
            <li
              key={p.name}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-[180px] flex-1 items-center gap-3">
                <span
                  className="size-4 shrink-0 rounded-md"
                  style={{ background: p.color }}
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-fg">{p.name}</div>
                  <div className="text-xs text-fg-muted">{p.phase}</div>
                </div>
              </div>

              <ProjectTheme accent={p.color} className="hidden sm:block">
                <Sparkline data={trends[i] ?? p.trend} className="h-10 w-32" />
              </ProjectTheme>

              <div className="flex w-full max-w-[220px] items-center gap-3 sm:w-auto sm:flex-1">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${p.pct}%`, background: p.color }}
                  />
                </div>
                <span className="w-10 text-right text-sm text-fg-muted tabular-nums">
                  {p.pct}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Type-check and lint**

Run: `cd web && npx tsc --noEmit && npm run lint`
Expected: both clean. (If `ProjectTheme` does not exist yet, workstream B has not landed — pause this task until it has; do not stub the component.)

- [ ] **Step 4: Commit**

```bash
git add web/components/dashboard/demo/demo-sidebar.tsx web/components/dashboard/demo/projects-screen.tsx
git commit -m "feat(web): demo sidebar and projects screen"
```

---

### Task 43 (F8): `InvoicesScreen` (sortable table)

**Files:**
- Create `web/components/dashboard/demo/invoices-screen.tsx`

**Interfaces:**
- Consumes: `demoInvoices`, `formatIssued`, `formatMoney`, `InvoiceStatus` from `web/lib/demo/data.ts` (F1); `nextSortState`, `sortInvoices`, `InvoiceSortKey`, `SortState` from `web/lib/demo/sort.ts` (F2); `cn`; lucide `ArrowUp`/`ArrowDown`/`ChevronsUpDown`.
- Produces: `export function InvoicesScreen()` — no props; owns its `SortState | null` via `useState`, sorts through the pure `sortInvoices`.

- [ ] **Step 1: Implement `InvoicesScreen`**

Create `web/components/dashboard/demo/invoices-screen.tsx` with exactly:

```tsx
"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  demoInvoices,
  formatIssued,
  formatMoney,
  type InvoiceStatus,
} from "@/lib/demo/data";
import {
  nextSortState,
  sortInvoices,
  type InvoiceSortKey,
  type SortState,
} from "@/lib/demo/sort";

const statusTint: Record<InvoiceStatus, string> = {
  Paid: "text-pos",
  Pending: "text-warn",
  Overdue: "text-neg",
};

const columns: { key: InvoiceSortKey; label: string; align?: "right" }[] = [
  { key: "id", label: "Invoice" },
  { key: "client", label: "Client" },
  { key: "amount", label: "Amount", align: "right" },
  { key: "issued", label: "Issued" },
  { key: "status", label: "Status", align: "right" },
];

/** Invoices screen: sortable table. Click a header to sort; clicking the
 *  active header toggles direction. Sorting is the pure sortInvoices(). */
export function InvoicesScreen() {
  const [sort, setSort] = useState<SortState | null>(null);
  const rows = useMemo(() => sortInvoices(demoInvoices, sort), [sort]);
  const open = demoInvoices.filter((inv) => inv.status !== "Paid");
  const outstanding = open.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-4 text-fg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Invoices</h2>
        <span className="rounded-md border border-border px-2 py-1 text-[11px] text-fg-muted">
          {formatMoney(outstanding)} outstanding
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="mb-3 text-xs text-fg-subtle">Click a column to sort.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border">
                {columns.map((col) => {
                  const dir = sort && sort.key === col.key ? sort.direction : undefined;
                  const active = dir !== undefined;
                  return (
                    <th
                      key={col.key}
                      scope="col"
                      aria-sort={
                        active ? (dir === "asc" ? "ascending" : "descending") : "none"
                      }
                      className={cn(
                        "pb-2 font-medium text-fg-muted",
                        col.align === "right" ? "text-right" : "text-left",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setSort((current) => nextSortState(current, col.key))}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-1 py-0.5 transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                          active && "text-fg",
                        )}
                      >
                        {col.label}
                        {active ? (
                          dir === "asc" ? (
                            <ArrowUp size={13} className="text-brand" />
                          ) : (
                            <ArrowDown size={13} className="text-brand" />
                          )
                        ) : (
                          <ChevronsUpDown size={13} className="text-fg-subtle" />
                        )}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {rows.map((inv) => (
                <tr key={inv.id}>
                  <td className="py-2.5 text-fg-muted">{inv.id}</td>
                  <td className="py-2.5 text-fg">{inv.client}</td>
                  <td className="py-2.5 text-right text-fg tabular-nums">
                    {formatMoney(inv.amount)}
                  </td>
                  <td className="py-2.5 text-fg-muted">{formatIssued(inv.issued)}</td>
                  <td
                    className={cn(
                      "py-2.5 text-right text-xs font-medium",
                      statusTint[inv.status],
                    )}
                  >
                    {inv.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check and lint**

Run: `cd web && npx tsc --noEmit && npm run lint`
Expected: both clean.

- [ ] **Step 3: Commit**

```bash
git add web/components/dashboard/demo/invoices-screen.tsx
git commit -m "feat(web): sortable invoices screen for demo dashboard"
```

---

### Task 44 (F9): `AnalyticsScreen` (larger charts with tooltips, ticking tiles)

**Files:**
- Create `web/components/dashboard/demo/analytics-screen.tsx`

**Interfaces:**
- Consumes: `TooltipAreaChart`, `TooltipBarChart` (F6); `BarGroup` type from `web/components/dashboard/charts/bar-chart.tsx` (existing); `demoInvoices`, `formatMoney` from `web/lib/demo/data.ts` (F1); `cn`.
- Produces: `export function AnalyticsScreen({ revenue, users }: { revenue: number[]; users: number[] })` — `revenue`/`users` are the live-ticking series from the demo shell.

Notes: the "Live Users" tile shows `128 + last-users-sample` so its magnitude matches the Overview screen's "152" at first render and then ticks. The bar data reuses the exact `projectBars` values from the Overview screen. The "Outstanding" tile is derived from `demoInvoices`, never hand-typed.

- [ ] **Step 1: Implement `AnalyticsScreen`**

Create `web/components/dashboard/demo/analytics-screen.tsx` with exactly:

```tsx
"use client";

import { cn } from "@/lib/utils";
import type { BarGroup } from "@/components/dashboard/charts/bar-chart";
import { TooltipAreaChart } from "@/components/dashboard/charts/tooltip-area-chart";
import { TooltipBarChart } from "@/components/dashboard/charts/tooltip-bar-chart";
import { demoInvoices, formatMoney } from "@/lib/demo/data";

/** Same values as the Overview screen's "Projects Overview" bars. */
const hoursByProject: BarGroup[] = [
  { label: "Concordia Connect", a: 24, b: 13 },
  { label: "Drafterie", a: 14, b: 18 },
  { label: "Skyroa", a: 26, b: 11 },
  { label: "AutoMedic", a: 16, b: 22 },
  { label: "Success", a: 13, b: 10 },
];

function Panel({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>
      <h3 className="mb-4 text-sm font-semibold text-fg">{title}</h3>
      {children}
    </div>
  );
}

/** Analytics screen: stat tiles plus larger charts with hover tooltips.
 *  `revenue` and `users` tick live via the shell's useTicker. */
export function AnalyticsScreen({
  revenue,
  users,
}: {
  revenue: number[];
  users: number[];
}) {
  const liveUsers = Math.round(128 + (users[users.length - 1] ?? 0));
  const open = demoInvoices.filter((inv) => inv.status !== "Paid");
  const outstanding = open.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-4 text-fg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Analytics</h2>
        <span className="rounded-md border border-border px-2 py-1 text-[11px] text-fg-muted">
          Last 30 days
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Panel title="Revenue This Month">
          <div className="text-2xl font-semibold tabular-nums">$128,430</div>
          <div className="text-xs">
            <span className="text-pos">+12.5%</span>{" "}
            <span className="text-fg-subtle">vs last month</span>
          </div>
        </Panel>
        <Panel title="Live Users">
          <div className="text-2xl font-semibold tabular-nums">{liveUsers}</div>
          <div className="text-xs text-fg-subtle">updating live</div>
        </Panel>
        <Panel title="Outstanding">
          <div className="text-2xl font-semibold tabular-nums">
            {formatMoney(outstanding)}
          </div>
          <div className="text-xs text-fg-subtle">{open.length} open invoices</div>
        </Panel>
      </div>

      <Panel title="Revenue Trend">
        <TooltipAreaChart
          data={revenue}
          labels={revenue.map((_, i) => `Day ${i + 1}`)}
          formatValue={(v) => `$${v.toFixed(1)}k`}
          ariaLabel="Revenue trend, last 30 days"
          className="h-56 w-full"
        />
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Active Users">
          <TooltipAreaChart
            data={users}
            labels={users.map((_, i) => `Day ${i + 1}`)}
            formatValue={(v) => `${Math.round(128 + v)} users`}
            ariaLabel="Active users, last 14 days"
            className="h-44 w-full"
          />
        </Panel>
        <Panel title="Hours by Project">
          <TooltipBarChart
            data={hoursByProject}
            formatValue={(g) => `${g.a}h billable, ${g.b}h internal`}
            ariaLabel="Hours by project"
            className="h-44 w-full"
          />
          <div className="mt-2 grid grid-cols-5 text-center text-[10px] leading-tight text-fg-subtle">
            {hoursByProject.map((g) => (
              <span key={g.label}>{g.label}</span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-fg-muted">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-brand" /> Billable
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-highlight" /> Internal
            </span>
          </div>
        </Panel>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check and lint**

Run: `cd web && npx tsc --noEmit && npm run lint`
Expected: both clean.

- [ ] **Step 3: Commit**

```bash
git add web/components/dashboard/demo/analytics-screen.tsx
git commit -m "feat(web): analytics screen with hover tooltips"
```

---

### Task 45 (F10): `DashboardDemo` shell + code-split loader

**Files:**
- Create `web/components/dashboard/demo/dashboard-demo.tsx`
- Create `web/components/dashboard/demo/dashboard-demo-loader.tsx`

**Interfaces:**
- Consumes: `DemoSidebar`, `demoNavScreens` (F7); `ProjectsScreen` (F7); `InvoicesScreen` (F8); `AnalyticsScreen` (F9); `OverviewDashboard` from `web/components/dashboard/overview-dashboard.tsx` (existing, unmodified); `ThemeToggle` from `web/components/site/theme-toggle.tsx` (existing); `useTicker` (F4); `advanceDemoLive`, `DEMO_TICK_MS` (F3); `demoLiveInitial`, `DemoScreen` (F1); `useReducedMotion` (existing); `motion` from `motion/react`; `cn`; lucide `Menu`.
- Produces:
  - `export function DashboardDemo({ className }: { className?: string })` — the full playable frame
  - `export function DashboardDemoLoader()` — `"use client"` wrapper that `next/dynamic`-imports `DashboardDemo` with `ssr: false` and a skeleton fallback (this is what the page renders)

The frame chrome copies `DashboardScreen`'s exact classes (rounded-[18px], border, bg-section, shadow) so the demo is visually identical to the Phase 1 composition; a single `useTicker` at the shell level drives all live data; screen switches crossfade in 250ms via `motion/react`, gated by `useReducedMotion` (static `<div>` fallback). Below `lg` the sidebar is hidden and a pill tab row provides the four screens, so the demo is playable at 360px.

- [ ] **Step 1: Confirm Next 16 `next/dynamic` API against the shipped docs** (per `web/AGENTS.md`)

Run: `grep -rln "next/dynamic" web/node_modules/next/dist/docs | head -5` then open the lazy-loading guide it finds (e.g. `grep -n "ssr: false" <that file> | head -5`).
Expected: examples show `dynamic(() => import("..."), { ssr: false })` used inside a client component. If the API differs from that shape, follow the doc, keeping the behavior (client-only, code-split, loading fallback) identical.

- [ ] **Step 2: Implement the shell**

Create `web/components/dashboard/demo/dashboard-demo.tsx` with exactly:

```tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useTicker } from "@/lib/hooks/use-ticker";
import { advanceDemoLive, DEMO_TICK_MS } from "@/lib/demo/ticker";
import { demoLiveInitial, type DemoScreen } from "@/lib/demo/data";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { OverviewDashboard } from "@/components/dashboard/overview-dashboard";
import { DemoSidebar, demoNavScreens } from "./demo-sidebar";
import { ProjectsScreen } from "./projects-screen";
import { InvoicesScreen } from "./invoices-screen";
import { AnalyticsScreen } from "./analytics-screen";

/**
 * The playable dashboard demo. Everything is client-side simulated data:
 * one useTicker at this level advances all live series; the in-frame
 * ThemeToggle is the global next-themes toggle (see workstream decision 1);
 * screen switches crossfade in 250ms, gated by reduced motion.
 */
export function DashboardDemo({ className }: { className?: string }) {
  const [screen, setScreen] = useState<DemoScreen>("overview");
  const live = useTicker(demoLiveInitial, advanceDemoLive, DEMO_TICK_MS);
  const reduced = useReducedMotion();

  const body =
    screen === "overview" ? (
      <OverviewDashboard />
    ) : screen === "projects" ? (
      <ProjectsScreen trends={live.projectTrends} />
    ) : screen === "invoices" ? (
      <InvoicesScreen />
    ) : (
      <AnalyticsScreen revenue={live.revenue} users={live.users} />
    );

  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-[18px] border border-border bg-section shadow-[0_30px_80px_-24px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <aside className="hidden w-[200px] shrink-0 border-r border-border p-4 lg:block">
        <DemoSidebar screen={screen} onSelect={setScreen} />
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-4 border-b border-border px-5 py-4">
          <Menu size={18} className="hidden text-fg-subtle sm:block" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-fg">
              Welcome back, John
            </p>
            <p className="truncate text-xs text-fg-subtle">
              Here&apos;s what&apos;s happening with your business.
            </p>
          </div>
          <span className="hidden rounded-md border border-border px-2.5 py-1 text-[11px] text-fg-muted md:inline">
            May 1 – May 31, 2026
          </span>
          <ThemeToggle />
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/15 text-[11px] font-semibold text-brand">
            JS
          </span>
        </div>

        <div className="flex gap-1.5 overflow-x-auto border-b border-border px-4 py-3 lg:hidden">
          {demoNavScreens.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScreen(s.id)}
              aria-current={screen === s.id ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                screen === s.id
                  ? "border-brand/40 bg-brand/10 font-medium text-fg"
                  : "border-border text-fg-muted hover:text-fg",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-5">
          {reduced ? (
            <div>{body}</div>
          ) : (
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {body}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Implement the code-split loader**

Create `web/components/dashboard/demo/dashboard-demo-loader.tsx` with exactly:

```tsx
"use client";

import dynamic from "next/dynamic";

const DashboardDemo = dynamic(
  () => import("./dashboard-demo").then((m) => m.DashboardDemo),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="min-h-[640px] rounded-[18px] border border-border bg-section motion-safe:animate-pulse"
      />
    ),
  },
);

/** Client boundary that lazy-loads the demo. The /dashboard page (server
 *  component, keeps its metadata export) renders this, so zero demo code
 *  ships with any other route and none of it is server-rendered. */
export function DashboardDemoLoader() {
  return <DashboardDemo />;
}
```

- [ ] **Step 4: Type-check and lint**

Run: `cd web && npx tsc --noEmit && npm run lint`
Expected: both clean.

- [ ] **Step 5: Commit**

```bash
git add web/components/dashboard/demo/dashboard-demo.tsx web/components/dashboard/demo/dashboard-demo-loader.tsx
git commit -m "feat(web): playable dashboard demo shell with code-split loader"
```

---

### Task 46 (F11): `/dashboard` page integration + full verification

**Files:**
- Modify `web/app/dashboard/page.tsx` (full rewrite, shown below)

**Interfaces:**
- Consumes: **`PageHero({ eyebrow, title, intro, children })` from `web/components/site/page-hero.tsx` [owner: A — must land before this task executes]**; `DashboardDemoLoader` (F10); `Container` (existing); `Button` from `web/components/ui/button.tsx` (existing); `Link` from `next/link`; lucide `ArrowRight`.
- Produces: the finished `/dashboard/` route. **Not modified anywhere:** `web/components/dashboard/dashboard-screen.tsx`, `sidebar-nav.tsx`, `overview-dashboard.tsx`, `web/app/page.tsx`, `web/components/sections/*` — the homepage preview and `/dashboard-*.webp` assets keep working untouched.

- [ ] **Step 1: Rewrite the page**

Replace the entire contents of `web/app/dashboard/page.tsx` with exactly:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { DashboardDemoLoader } from "@/components/dashboard/demo/dashboard-demo-loader";

export const metadata: Metadata = {
  title: "Live Demo",
  description:
    "A playable preview of the operations dashboards we build: revenue, projects, invoices, and analytics in one place.",
};

export default function DashboardPage() {
  return (
    <>
      <PageHero
        eyebrow="Product demo"
        title="The operations dashboard we build for you."
        intro="This is the kind of system we build — click around. Switch screens, sort the invoices, hover the charts, and flip the theme."
      />
      <Container className="pb-20 md:pb-28">
        <DashboardDemoLoader />
        <p className="mt-3 text-center text-xs text-fg-subtle">
          Simulated data. The components are the ones we ship.
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-md text-fg-muted">
            Want a system like this behind your business? It starts with a
            conversation.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/contact/">
              Start the conversation
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
```

- [ ] **Step 2: Run the full test suite**

Run: `cd web && npm test`
Expected: all vitest suites pass (geometry, use-count-up, demo-data, demo-sort, demo-ticker, demo-hover), 0 failures.

- [ ] **Step 3: Lint + production build**

Run: `cd web && npm run lint && npm run build`
Expected: lint clean; `next build` completes the static export with `/dashboard` in the route list. Then confirm the exported page exists: `ls web/out/dashboard/index.html`.

- [ ] **Step 4: Confirm no page-one weight and no touched shared files**

Run: `git diff --name-only main -- web/app/page.tsx web/components/sections web/components/dashboard/dashboard-screen.tsx web/components/dashboard/sidebar-nav.tsx web/components/dashboard/overview-dashboard.tsx` (adjust `main` to the working branch base if different).
Expected: no output — workstream F touched none of these, so the homepage bundle and the `HowWeWork` static preview are untouched, and the demo only loads on `/dashboard/` (route-level split + `ssr: false` dynamic import).

- [ ] **Step 5: Visual + interaction verification, dark theme**

Run: `cd web && npm run dev`, open `http://localhost:3000/dashboard/`. Verify in the default dark theme:
- PageHero header renders with eyebrow "Product demo" and the framing intro.
- The demo frame appears (brief skeleton pulse first), sidebar shows Overview active with violet tint + chevron.
- Click **Projects**: five rows (Concordia Connect burgundy, Drafterie violet, Skyroa indigo, AutoMedic green, FrostyNow ice blue), each sparkline drawn in its project color, values visibly shifting every ~1.6s.
- Click **Invoices**: click "Amount" once (ascending, arrow-up icon, INV-2026-006 first), again (descending, INV-2026-003 first); check `aria-sort` toggles in devtools; keyboard: Tab reaches the headers and Enter sorts.
- Click **Analytics**: Live Users tile ticks; hover the Revenue Trend chart — guide line, ring dot, and tooltip ("Day n" + "$xx.xk") track the cursor; hover the bars — faint violet group wash + "24h billable, 13h internal" style tooltip; move off — tooltips clear.
- Screen switches crossfade quickly (~250ms), no layout jump.

- [ ] **Step 6: Visual verification, light theme + mobile + reduced motion**

Still on `http://localhost:3000/dashboard/`:
- Click the **in-frame theme toggle** (sun/moon in the demo top bar): the whole site flips to light. Re-check all four screens: white cards, `#e5e7eb` borders, charts/tooltips recolored automatically (CSS vars), status tints readable (green/amber/red), tooltip box white with border.
- Resize to 360px wide: sidebar hidden, pill tab row navigates all four screens; invoice table scrolls horizontally inside its card; nothing overflows the frame.
- Emulate reduced motion (DevTools → Rendering → "prefers-reduced-motion: reduce", or macOS Accessibility setting): ticking stops (values frozen), screen switches are instant with no fade, skeleton does not pulse. Turn emulation off afterwards.
- Open `http://localhost:3000/` and confirm the homepage is unchanged, including the static dashboard preview in the process section.
- Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add web/app/dashboard/page.tsx
git commit -m "feat(web): upgrade /dashboard to playable demo page"
```

---

**Workstream F complete.** `/dashboard/` is a playable, client-side simulated demo: four clickable screens, sortable invoices, tooltip charts, live ticking data, in-frame theme toggle, framed with the spec copy and a CTA to `/contact/` — all code-split away from page one, with the Phase 1 static composition and homepage preview untouched.

---


## Wave 3 — Cross-Cutting Polish (Tasks 47–53)

### Task 47 (G6): Nav active-route indicator

> **Merge note (harmonization 5):** The `/contact/` route named in this task's dependency note is owned by Workstream E — **Task 34 (E6)** — not F. Task 1 (A1) already moved `navLinks` to the real routes, so the degradation path described below never engages. This task's `nav.tsx` rewrite intentionally supersedes the Task 1 (A1) version and is the **canonical final** `nav.tsx` (harmonization 8).

**Depends on:** the workstream A chrome task (Task 1, A1) that rewrites `web/content/nav.ts` `navLinks` to real routes and workstream E's `/contact` route (Task 34, E6 — see merge note). This task's `nav.tsx` is the canonical final version of the file.

**Files:**
- Create: `web/lib/active-route.ts`
- Test: `web/lib/__tests__/active-route.test.ts`
- Modify: `web/components/site/nav.tsx`

**Interfaces:**
- Consumes: `navLinks: NavLink[]` from `@/content/nav` (with `NavLink = { label: string; href: string }`); `usePathname()` from `next/navigation` (client-side, static-export safe); `useReducedMotion()`; `SheetClose` from `@/components/ui/sheet`.
- Produces: `export function isActiveRoute(href: string, pathname: string): boolean`; `Nav()` unchanged signature (no props).

- [ ] **Step 1: Write the failing test.** Create `web/lib/__tests__/active-route.test.ts` with exactly:

  ```ts
  import { describe, it, expect } from "vitest";
  import { isActiveRoute } from "@/lib/active-route";

  describe("isActiveRoute", () => {
    it("matches the homepage only exactly", () => {
      expect(isActiveRoute("/", "/")).toBe(true);
      expect(isActiveRoute("/", "/work/")).toBe(false);
    });

    it("matches a route regardless of trailing slashes", () => {
      expect(isActiveRoute("/work/", "/work/")).toBe(true);
      expect(isActiveRoute("/work/", "/work")).toBe(true);
      expect(isActiveRoute("/services", "/services/")).toBe(true);
    });

    it("marks parent routes active on child pages", () => {
      expect(isActiveRoute("/work/", "/work/drafterie/")).toBe(true);
    });

    it("does not match sibling routes sharing a prefix", () => {
      expect(isActiveRoute("/services/", "/service-status/")).toBe(false);
    });

    it("never marks hash links active", () => {
      expect(isActiveRoute("/#services", "/")).toBe(false);
    });
  });
  ```

- [ ] **Step 2: Run the test and watch it fail.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx vitest run lib/__tests__/active-route.test.ts
  ```
  Expected failure: `Failed to resolve import "@/lib/active-route"`.

- [ ] **Step 3: Implement the helper.** Create `web/lib/active-route.ts` with exactly:

  ```ts
  /**
   * Whether a nav link href should be highlighted for the current pathname.
   * Trailing-slash tolerant (the site exports with trailingSlash: true);
   * parent routes stay active on child pages (/work/ on /work/drafterie/);
   * hash links are never active.
   */
  export function isActiveRoute(href: string, pathname: string): boolean {
    if (href.includes("#")) return false;
    const normalize = (p: string) => {
      const trimmed = p.replace(/\/+$/, "");
      return trimmed === "" ? "/" : trimmed;
    };
    const h = normalize(href);
    const p = normalize(pathname);
    if (h === "/") return p === "/";
    return p === h || p.startsWith(`${h}/`);
  }
  ```

- [ ] **Step 4: Run the test and watch it pass.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npx vitest run lib/__tests__/active-route.test.ts
  ```
  Expected: 5 tests pass.

- [ ] **Step 5: Rewrite `nav.tsx` with the active indicator.** Replace the full contents of `web/components/site/nav.tsx` with (diff vs current: `usePathname` + `isActiveRoute` + `useReducedMotion` + `motion` imports; desktop links become `Link`s with `aria-current` and a shared-`layoutId` violet underline that slides between links; mobile links close the sheet via `SheetClose` and tint the active item; per spec §3 the nav CTA points at `/contact/`; `CAL_URL` import dropped — the footer keeps the direct Cal.com path):

  ```tsx
  "use client";

  import Link from "next/link";
  import { usePathname } from "next/navigation";
  import { useEffect, useState } from "react";
  import { Menu } from "lucide-react";
  import { motion } from "motion/react";
  import { navLinks } from "@/content/nav";
  import { isActiveRoute } from "@/lib/active-route";
  import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
  import { Container } from "./container";
  import { ThemeToggle } from "./theme-toggle";
  import { Button } from "@/components/ui/button";
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { cn } from "@/lib/utils";

  export function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const reduced = useReducedMotion();

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
      <header
        className={cn(
          "sticky top-0 z-50 transition-colors duration-300",
          scrolled
            ? "border-b border-border bg-bg/80 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="leading-none" aria-label="KCOH Software Inc.">
            <div className="text-lg font-bold tracking-tight text-fg">KCOH</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-fg-subtle">
              Software Inc.
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => {
              const active = isActiveRoute(l.href, pathname);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-sm transition-colors hover:text-fg",
                    active ? "text-fg" : "text-fg-muted",
                  )}
                >
                  {l.label}
                  {active ? (
                    <motion.span
                      aria-hidden
                      layoutId={reduced ? undefined : "nav-active"}
                      className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-brand"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild className="hidden rounded-full sm:inline-flex">
              <Link href="/contact/">Let&apos;s Talk</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="grid size-9 place-items-center rounded-full border border-border text-fg-muted md:hidden"
                  aria-label="Open menu"
                >
                  <Menu size={18} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="border-border bg-section">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <nav className="mt-10 flex flex-col gap-5 px-5">
                  {navLinks.map((l) => {
                    const active = isActiveRoute(l.href, pathname);
                    return (
                      <SheetClose asChild key={l.label}>
                        <Link
                          href={l.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "text-base",
                            active ? "font-medium text-brand-text" : "text-fg",
                          )}
                        >
                          {l.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                  <SheetClose asChild>
                    <Link
                      href="/contact/"
                      className="mt-2 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
                    >
                      Let&apos;s Talk
                    </Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </Container>
      </header>
    );
  }
  ```

- [ ] **Step 6: Verify in the browser, both themes.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm test && npm run dev
  ```
  Open `http://localhost:3000/services/` (any real route). Look for: the matching desktop nav link is full-strength `text-fg` with a 2px violet underline; navigating to another route slides the underline to the new link (a quick spring-free 0.3s glide); on `/work/drafterie/` the "Work" link stays underlined. Both themes: underline is `--brand` violet and visible against the header in dark and light. Mobile width (360px): open the sheet — the active link is violet, tapping a link closes the sheet and navigates. Reduced-motion emulation: underline still marks the active link but jumps without sliding. Keyboard: tab through links — focus and `aria-current="page"` present (inspect element).

- [ ] **Step 7: Commit.**
  ```bash
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." add web/lib/active-route.ts web/lib/__tests__/active-route.test.ts web/components/site/nav.tsx
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." commit -m "feat(web): nav active-route indicator with sliding underline and sheet auto-close"
  ```

---

### Task 48 (G7): Page-mount fade-rise via `app/template.tsx`

**Decision (verified):** the shared page-mount animation lives in `web/app/template.tsx`. Next 16's bundled docs (`web/node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/template.md`) confirm: a template is a plain component rendered between the layout and the page, remounted with a new key when its segment changes — nothing server-dynamic, so it is fully compatible with `output: "export"` (it is not in the static-export unsupported-features list; the build verification step below proves it). Two documented behaviors shape the design: (a) the ROOT template only remounts when the FIRST path segment changes, so `/work/` → `/work/drafterie/` does not re-trigger the root fade — case pages rely on their own `Reveal`s for entrance, which is the intended layered feel; (b) the template animates via `initial`/`animate` (not `whileInView`), so to avoid shipping `opacity: 0` in the prerendered HTML (blank page before hydration), the animation is skipped on the very first load via a module-level flag and only runs on client-side navigations.

**Files:**
- Create: `web/app/template.tsx`

**Interfaces:**
- Consumes: `useReducedMotion()`; `motion` from `motion/react`.
- Produces: `export default function Template({ children }: { children: React.ReactNode })` (Next file convention — not imported by other code).

- [ ] **Step 1: Create the template.** Create `web/app/template.tsx` with exactly:

  ```tsx
  "use client";

  import { useEffect } from "react";
  import { motion } from "motion/react";
  import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

  /**
   * Gentle fade-rise on page mount. Skipped on the very first page load
   * (so prerendered HTML is never hidden pre-hydration) and under
   * prefers-reduced-motion; runs on every client-side navigation where
   * the first path segment changes (Next remounts the root template).
   */
  let hasNavigated = false;

  export default function Template({ children }: { children: React.ReactNode }) {
    const reduced = useReducedMotion();
    const animateEntry = hasNavigated && !reduced;

    useEffect(() => {
      hasNavigated = true;
    }, []);

    if (!animateEntry) {
      return <>{children}</>;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    );
  }
  ```

- [ ] **Step 2: Verify static-export compatibility.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run build && ls out/index.html && grep -c 'id="__next_error__"' out/index.html || true
  ```
  Expected: `next build` completes with no errors or template-related warnings; `out/index.html` exists; the grep finds 0 occurrences (no error shell). Also confirm the prerendered homepage body is NOT wrapped in an `opacity:0` page-level div: `grep -o 'translateY(10px)' out/index.html | wc -l` must print `0` (the first-load branch renders a plain fragment).

- [ ] **Step 3: Verify the feel in the browser, both themes.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev
  ```
  Open `http://localhost:3000` (no fade on first load — content appears immediately), then click through nav routes (for example `/` → `/dashboard/` and back): each destination page fades up gently (10px rise, 0.35s), nav and footer stay put (they live in the layout, outside the template). Repeat in light theme. With reduced-motion emulated, navigations swap pages instantly with no fade.

- [ ] **Step 4: Commit.**
  ```bash
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." add web/app/template.tsx
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." commit -m "feat(web): page-mount fade-rise via root template, first-load and reduced-motion safe"
  ```

---

### Task 49 (G8): Magnetic on the CTASection button

**Depends on:** workstream A's task creating `web/components/site/cta-section.tsx` (pinned contract: `CTASection({ heading, subline }: { heading?: string; subline?: string })` with default heading "Let's talk about what you're building."). Runs after it; G3 provided `Magnetic`.

**Files:**
- Modify: `web/components/site/cta-section.tsx`

**Interfaces:**
- Consumes: `Magnetic({ children, strength })` from Task G3; A's CTASection primary button (published contract 1 at the top of this section).
- Produces: no signature changes — `CTASection` props and export are untouched.

- [ ] **Step 1: Add the import.** In `web/components/site/cta-section.tsx`, add this line to the import block (alongside the existing `@/components/...` imports):

  ```tsx
  import { Magnetic } from "@/components/site/magnetic";
  ```

- [ ] **Step 2: Wrap the primary CTA button.** Per published contract 1, the file contains this exact element. Before:

  ```tsx
  <Button asChild size="lg" className="rounded-full">
    <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
      Book a Conversation
    </a>
  </Button>
  ```

  After:

  ```tsx
  <Magnetic>
    <Button asChild size="lg" className="rounded-full">
      <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
        Book a Conversation
      </a>
    </Button>
  </Magnetic>
  ```

  The `Magnetic` open/close tags and the import are the only changes; every other line of A's file stays byte-identical. (`Magnetic` is a client component; `CTASection` may remain a server component — the wrapped button is passed as serializable children.)

- [ ] **Step 3: Verify in the browser, both themes.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev
  ```
  Open the homepage and scroll to the final CTA band ("Let's talk about what you're building."). Look for: the Book a Conversation button pulls slightly toward the cursor and springs back, with a press state, in dark and light themes; static under reduced-motion emulation.

- [ ] **Step 4: Commit.**
  ```bash
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." add web/components/site/cta-section.tsx
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." commit -m "feat(web): magnetic pull on CTASection primary button"
  ```

---

### Task 50 (G9): Magnetic on the contact form submit button

> **Merge note (harmonization 5):** The contact form is owned by Workstream E — **Task 32 (E4)** — at exactly the path this task expects, `web/components/contact/contact-form.tsx`. The submit button to wrap is `<Button type="submit" size="lg" className="rounded-full" disabled={status === "sending" || token === ""}>…</Button>`; keep its props and children byte-identical, per Step 2.

**Depends on:** workstream E's task creating the contact form client component — Task 32 (E4), at exactly the expected path `web/components/contact/contact-form.tsx` (merge correction: section G originally attributed the form to workstream F; if the component were ever moved, apply this same two-part edit — one import line, one wrapper — to that file's submit button).

**Files:**
- Modify: `web/components/contact/contact-form.tsx`

**Interfaces:**
- Consumes: `Magnetic({ children, strength })` from Task G3.
- Produces: no signature changes to F's component.

- [ ] **Step 1: Add the import.** In the contact form component file, add to the import block:

  ```tsx
  import { Magnetic } from "@/components/site/magnetic";
  ```

- [ ] **Step 2: Wrap the submit button.** Find the form's single `<Button type="submit" ...>` element and wrap it, changing nothing else — the button's own props, disabled logic, and children (including any sending/sent state text) stay exactly as F wrote them:

  ```tsx
  <Magnetic>
    <Button type="submit" /* F's existing props, unchanged */>
      {/* F's existing children, unchanged */}
    </Button>
  </Magnetic>
  ```

  The only diff in this file is the import line plus the `<Magnetic>`/`</Magnetic>` lines around that one element.

- [ ] **Step 3: Verify in the browser, both themes.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev
  ```
  Open `http://localhost:3000/contact/`. Look for: the submit button has the magnetic pull and press state; submitting still works (fill the form and submit — the sending/sent states behave exactly as before this edit, since only presentation wrapping changed); dark and light themes both correct; static under reduced motion; on a simulated touch device the button is plainly tappable.

- [ ] **Step 4: Commit.**
  ```bash
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." add web/components/contact/contact-form.tsx
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." commit -m "feat(web): magnetic pull on contact form submit button"
  ```

---

### Task 51 (G10): Tilt on the case-page hero compositions

> **Merge note (harmonization 2) — SUPERSEDED EDIT; VERIFICATION ONLY:** Workstream C already applies the cursor tilt inside `web/components/work/case-hero.tsx` by wrapping the composition in **G2's own `Tilt`** (Task 22 (C5)), so the case-page hero tilts without any edit to `web/app/work/[slug]/page.tsx` — and this task's before-block below never exists verbatim in that page file (Task 24 renders `<CaseHero study={study} />`). **Skip Steps 1–2 below (do not double-wrap the composition).** Execute Step 3's browser verification (all four case routes, both themes, reduced motion) as this task's entire scope. If verification passes, there is nothing to commit — skip Step 4 and record the result in the task log instead. If the tilt is missing or broken, fix it in `web/components/site/tilt.tsx`/`use-tilt.ts` or `case-hero.tsx`, not by adding a wrapper here.

**Depends on:** workstream C's case-page task (`web/app/work/[slug]/page.tsx`, four static params via `generateStaticParams`, `dynamicParams = false`) and workstream B's `ProjectTheme`. Runs after both; G2 provided `Tilt`.

**Files:**
- Modify: `web/app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: `Tilt({ maxDeg, className, children })` from Task G2; C's hero composition (see the merge correction on published contract 2: the composition lives in `web/components/work/case-hero.tsx`, already wrapped in G2's `Tilt`, with `ProjectTheme` applied at page level).
- Produces: no signature changes to C's page.

- [ ] **Step 1: Add the import.** In `web/app/work/[slug]/page.tsx`, add to the import block:

  ```tsx
  import { Tilt } from "@/components/site/tilt";
  ```

- [ ] **Step 2: Wrap the hero composition.** Per published contract 2, the hero renders the re-skinned dashboard composition. Before (C's markup, verbatim):

  ```tsx
  <ScaledPreview designWidth={1160}>
    <ProjectTheme accent={study.accent}>
      <DashboardScreen />
    </ProjectTheme>
  </ScaledPreview>
  ```

  After:

  ```tsx
  <Tilt maxDeg={2}>
    <ScaledPreview designWidth={1160}>
      <ProjectTheme accent={study.accent}>
        <DashboardScreen />
      </ProjectTheme>
    </ScaledPreview>
  </Tilt>
  ```

  The three inner lines are C's element exactly as C created it (unchanged); the `Tilt` open/close tags and the import are the only additions. `ScaledPreview` marks its children `pointer-events-none`, so the mouse events land on the `Tilt` div — tilt works even though the composition itself is non-interactive. Note the wrapper deliberately sits OUTSIDE `ProjectTheme` here and applies no color: the tilt is color-agnostic, while everything inside recolors per project.

- [ ] **Step 3: Verify all four case pages in the browser, both themes.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev
  ```
  Visit `/work/concordia-connect/`, `/work/drafterie/`, `/work/skyroa/`, `/work/automedic/`. Look for on each: the hero dashboard composition tilts ~2 degrees toward the cursor and springs level on leave; the composition's charts stay in their project accent (burgundy, violet, indigo, green respectively) while tilting; no clipping of the composition's shadow at the extremes of the tilt. Repeat one page in light theme. Reduced motion: static. Then run `npm run build` — the four routes still export cleanly.

- [ ] **Step 4: Commit.**
  ```bash
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." add "web/app/work/[slug]/page.tsx"
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." commit -m "feat(web): cursor tilt on case-page hero dashboard compositions"
  ```

---

### Task 52 (G11): Pointer glow on homepage featured-work cards

> **Merge note (harmonization 3):** Task 20 (B4) built the cards inline in `web/components/sections/featured-work.tsx` as a **server** component (deliberately — all of B4's interactivity lives in the already-client `ProjectMiniPreview`/`Reveal`). `usePointerGlow()` is a client hook, so calling it in `FeatureCard` without a `"use client"` boundary makes the static-export build fail with a hooks-in-Server-Component error. **Step 1 below therefore prepends the directive** (all of `featured-work.tsx`'s imports are client-safe); alternatively factor `FeatureCard` into its own `"use client"` file under `web/components/work/` and apply Steps 2–5 there.

**Depends on:** workstream B's featured-work rebuild (two-across feature cards with per-project mini-previews). Runs after it; G5 provided `usePointerGlow`.

**Files:**
- Modify: `web/components/sections/featured-work.tsx` (if B factored the card into its own component file — for example a card component under `web/components/work/` — apply the identical additions below to that card component's file/root element instead; the section file itself then needs no change)

**Interfaces:**
- Consumes: `usePointerGlow()` from Task G5; B's `FeatureCard` (built inside the server-component `featured-work.tsx` by Task 20 — Step 1 makes the file `"use client"` BEFORE the hook lands, satisfying G's contract 3(a)) wrapped in B's `ProjectTheme accent={...}` so `var(--brand)` inside the card is the project color.
- Produces: no signature changes to B's components.

- [ ] **Step 1: Make the card file a client component.** Prepend to `web/components/sections/featured-work.tsx`, as the very first line of the file (before all imports), followed by a blank line:

  ```tsx
  "use client";
  ```

  (Required: Step 3 calls a hook inside `FeatureCard`. Every import in the file — `next/image`, `next/link`, `lucide-react`, the site primitives, the content modules — is client-safe, and the section renders identically as a client component.)

- [ ] **Step 2: Add the hook import to the card component file.**

  ```tsx
  import { usePointerGlow } from "@/lib/hooks/use-pointer-glow";
  ```

- [ ] **Step 3: Instantiate the hook at the top of the `FeatureCard` component body.**

  ```tsx
  const { onMouseMove, onMouseLeave } = usePointerGlow();
  ```

- [ ] **Step 4: Wire the card root.** On the card's root element (the bordered, rounded card container B created — an `<a>` or `Link` per spec, since cards link to case pages): ensure its `className` includes `relative overflow-hidden` (add whichever of the two classes is missing; keep all of B's existing classes), and add the two handlers:

  ```tsx
  onMouseMove={onMouseMove}
  onMouseLeave={onMouseLeave}
  ```

- [ ] **Step 5: Insert the glow overlay as the FIRST child of the card root** (exactly the published contract 3 markup):

  ```tsx
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
    style={{
      opacity: "var(--glow-opacity, 0)",
      background:
        "radial-gradient(240px circle at var(--glow-x, 50%) var(--glow-y, 50%), color-mix(in srgb, var(--brand) 12%, transparent), transparent 70%)",
    }}
  />
  ```

  These five additions (the `"use client"` directive, import, hook call, two handler props + up to two classes, overlay div) are the complete diff; every other line of B's file stays byte-identical. Run `cd web && npm run build` — a hooks-in-Server-Component error here means Step 1 was skipped.

- [ ] **Step 6: Verify in the browser, both themes.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev
  ```
  Open `http://localhost:3000` and scroll to Featured Work. Look for: moving the cursor over a card shows a soft radial glow (about 240px across, ~12% tint — a wash, never a solid fill) that follows the cursor and fades out over 0.3s on leave; the glow is burgundy on Concordia Connect, violet on Drafterie, indigo on Skyroa, green on AutoMedic (it inherits each card's `ProjectTheme` accent); card content and the mini-preview remain fully visible above the glow. Check dark then light theme — in light theme the tint should still be perceptible but subtle. On simulated touch: no glow, cards still navigate.

- [ ] **Step 7: Commit.**
  ```bash
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." add web/components/sections/featured-work.tsx web/components/work
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." commit -m "feat(web): cursor-tracking project-color glow on featured-work cards"
  ```

---

### Task 53 (G12): Pointer glow on `/work` index feature rows

> **Merge note (harmonization 4):** Task 21 (C4) factored the row into `web/components/work/feature-row.tsx` (server component) — apply the four additions there, exactly as this task's own fallback wording anticipates: add `"use client"` as its first line, then wire the handlers + overlay onto the bordered row container inside the `ProjectTheme` wrapper (adding `relative overflow-hidden` where missing). `web/app/work/page.tsx` itself needs no change.

**Depends on:** workstream C's `/work` index task (alternating full-width feature rows, one per project, each in its color identity). Runs after it; G5 provided `usePointerGlow`.

**Files:**
- Modify: `web/app/work/page.tsx` (if C factored the row into its own component file — for example `web/components/work/feature-row.tsx` — apply the identical four additions to that component's root element instead; the row component must be, or become, a `"use client"` file since it calls a hook)

**Interfaces:**
- Consumes: `usePointerGlow()` from Task G5; C's feature-row markup wrapped in B's `ProjectTheme accent={...}`.
- Produces: no signature changes to C's components.

- [ ] **Step 1: Add the hook import to the row component file.**

  ```tsx
  import { usePointerGlow } from "@/lib/hooks/use-pointer-glow";
  ```

- [ ] **Step 2: Instantiate the hook at the top of the row component body.**

  ```tsx
  const { onMouseMove, onMouseLeave } = usePointerGlow();
  ```

- [ ] **Step 3: Wire the row root.** On each feature row's outer card container (the bordered/rounded row element C created, inside its `ProjectTheme`): ensure `className` includes `relative overflow-hidden` (keep all existing classes) and add:

  ```tsx
  onMouseMove={onMouseMove}
  onMouseLeave={onMouseLeave}
  ```

- [ ] **Step 4: Insert the glow overlay as the FIRST child of the row root** — the identical published contract 3 markup:

  ```tsx
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
    style={{
      opacity: "var(--glow-opacity, 0)",
      background:
        "radial-gradient(240px circle at var(--glow-x, 50%) var(--glow-y, 50%), color-mix(in srgb, var(--brand) 12%, transparent), transparent 70%)",
    }}
  />
  ```

  As in G11, these four additions are the complete diff to C's file.

- [ ] **Step 5: Verify in the browser, both themes.**
  ```bash
  cd "/Users/kevincohen/Desktop/KCOH Software Inc./web" && npm run dev
  ```
  Open `http://localhost:3000/work/`. Look for: each of the four feature rows glows in its own project color under the cursor (burgundy / violet / indigo / green), fading on leave; the "Read the case study" links and mini-previews stay fully legible above the glow; the Success/FrostyNow logo strip and CTA below are unaffected. Both themes checked; no glow on simulated touch. Run `npm run build` once more — clean export.

- [ ] **Step 6: Commit.**
  ```bash
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." add web/app/work/page.tsx web/components/work
  git -C "/Users/kevincohen/Desktop/KCOH Software Inc." commit -m "feat(web): cursor-tracking project-color glow on work index feature rows"
  ```

---


## Wave 4 — Deploy, SEO, Final QA (Tasks 54–66)

### Task 54 (H1): Wrangler Pages config + `preview`/`deploy` npm scripts

> **Merge note (harmonization 8):** By this point `web/package.json` `dependencies` also contains `@calcom/embed-react` and `@marsidev/react-turnstile` from Task 9 (E1). Step 3's exact `devDependencies` object is unaffected — leave `dependencies` untouched.

**Files:**
- Create: `web/wrangler.toml`
- Modify: `web/package.json` (+ `web/package-lock.json` via npm install)

**Interfaces:** Consumes: nothing. Produces: `web/wrangler.toml` (`pages_build_output_dir = "out"`); npm scripts `preview` (build + `wrangler pages dev out`, serves at `http://localhost:8788` with Functions/`_redirects`/`_headers` live) and `deploy` (build + `wrangler pages deploy out` — **never run without Kevin's approval**, see Task H13).

- [ ] **Step 1: Create `web/wrangler.toml`** with exactly this content (spec §13 open item 6 is RESOLVED: the production project is `kcoh`, confirmed via `wrangler pages project list` on 2026-07-01 — it serves `kcoh.pages.dev` + `kcoh.ca`):

```toml
# Cloudflare Pages configuration for the KCOH v2 site.
# `wrangler pages dev out` = local preview with Functions, _redirects, _headers.
# `wrangler pages deploy out` = production deploy (ONLY on Kevin's explicit approval).
#
# NOTE: the `kcoh` project is GIT-CONNECTED (wrangler pages project list shows a
# Git provider). Cloudflare is expected to REJECT direct-upload deploys to
# Git-connected projects, so `npm run deploy` likely cannot target `kcoh` as-is.
# The cutover decision (Task 66 / H13 Step 4) covers the two launch paths;
# `npm run preview` is purely local and unaffected.

name = "kcoh"

compatibility_date = "2026-07-01"
pages_build_output_dir = "out"
```

- [ ] **Step 2: Pin wrangler as a devDependency:**

```bash
cd web && npm install --save-dev wrangler@^4.59.0
```

Expected: exit 0; `web/package.json` devDependencies gains `"wrangler": "^4.59.0"` (npm inserts it after `"vitest"`).

- [ ] **Step 3: Add the `preview` and `deploy` scripts** to `web/package.json`. Exact JSON diff — the `"scripts"` object changes from:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run"
  },
```

to:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run",
    "preview": "next build && wrangler pages dev out",
    "deploy": "next build && wrangler pages deploy out"
  },
```

and (after Step 2) the `"devDependencies"` object reads exactly:

```json
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.3",
    "eslint": "^9",
    "eslint-config-next": "16.2.9",
    "jsdom": "^29.1.1",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^4.1.9",
    "wrangler": "^4.59.0"
  }
```

- [ ] **Step 4: Verify the preview pipeline boots.**

```bash
cd web && npm run build
```

Expected: exit 0, static export written to `web/out/`.

```bash
cd web && (npx wrangler pages dev out --port 8788 >/tmp/kcoh-wrangler-h1.log 2>&1 &) && sleep 8 && curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8788/
```

Expected output: `200`. Then stop the server:

```bash
pkill -f "wrangler pages dev"
```

- [ ] **Step 5: Commit.**

```bash
git add web/wrangler.toml web/package.json web/package-lock.json && git commit -m "feat(web): Cloudflare Pages deploy pipeline (wrangler.toml, preview/deploy scripts)"
```

---

### Task 55 (H2): `_redirects` — cover every real v1 URL, fix the dead `/sitemap/` target; verify `robots.txt`

**Files:**
- Modify: `web/public/_redirects`
- Verify (no change expected): `web/public/robots.txt`

**Interfaces:** Consumes: Task H1's preview server. Produces: final `_redirects` mapping every live v1 page URL (facts inventory §8: `/index.html`, `/about.html`, `/services.html`, `/portfolio.html`, `/contact.html`, `/sitemap.html`) to its v2 route with a 301. Note: Next's `redirects()` is ignored under `output: "export"` — `_redirects` is the mechanism (spec §3).

- [ ] **Step 1: Replace `web/public/_redirects`** with exactly this content. Only the last line changes vs. today: facts inventory flag #7 — `/sitemap.html` currently points at `/sitemap/`, a route no spec plans to build, so it is retargeted to `/`:

```
/index.html      /            301
/about.html      /about/      301
/services.html   /services/   301
/portfolio.html  /work/       301
/contact.html    /contact/    301
/sitemap.html    /            301
```

(`/404.html` needs no entry — the branded Next 404 in Task H3 replaces it, and Pages serves `out/404.html` automatically. The `emailjs_*`/`integration-test`/`test-cache-bust` root HTML files are dev artifacts, not pages — no redirects, per facts inventory §8.)

- [ ] **Step 2: Verify `web/public/robots.txt` is already correct** — it must read exactly (no edit expected; if it differs, restore this):

```
User-agent: *
Allow: /

Sitemap: https://kcoh.ca/sitemap.xml
```

- [ ] **Step 3: Test all six 301s against the real Pages runtime.** (Targets like `/services/` may still 404 at this point in the plan — that is fine; this test asserts only the 301 status + Location of the redirect itself.)

```bash
cd web && npm run build
cd web && (npx wrangler pages dev out --port 8788 >/tmp/kcoh-wrangler-h2.log 2>&1 &) && sleep 8
for p in "index.html" "about.html" "services.html" "portfolio.html" "contact.html" "sitemap.html"; do
  printf "/%s → " "$p"
  curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "http://localhost:8788/$p"
done
pkill -f "wrangler pages dev"
```

Expected output, exactly:

```
/index.html → 301 http://localhost:8788/
/about.html → 301 http://localhost:8788/about/
/services.html → 301 http://localhost:8788/services/
/portfolio.html → 301 http://localhost:8788/work/
/contact.html → 301 http://localhost:8788/contact/
/sitemap.html → 301 http://localhost:8788/
```

- [ ] **Step 4: Commit.**

```bash
git add web/public/_redirects && git commit -m "fix(web): retarget /sitemap.html redirect to / (no v2 sitemap page)"
```

---

### Task 56 (H3): Branded 404 page

**Files:**
- Create: `web/app/not-found.tsx`

**Interfaces:** Consumes: `Container` (`@/components/site/container`), `SectionLabel` (`@/components/site/section-label`), `Button` (`@/components/ui/button`) — all per API reference. Produces: `export default function NotFound()`; `next build` renders it into `out/404.html`, which Cloudflare Pages serves for every unmatched URL. Links target the contract routes `/`, `/work/`, `/contact/`.

- [ ] **Step 1: Create `web/app/not-found.tsx`** (server component — no `"use client"`; hover/focus states are pure CSS; no metadata export — plain `not-found.tsx` does not support one in Next 16, so the page inherits the layout default title):

```tsx
import Link from "next/link";
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />
      <Container className="flex min-h-[70vh] flex-col items-start justify-center py-20 md:py-28">
        <SectionLabel>404 — Page not found</SectionLabel>
        <h1 className="mt-4 max-w-2xl font-serif text-[clamp(32px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.015em] text-fg">
          There&apos;s no page here.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg-muted">
          The address may be out of date — we rebuilt the site, and a few old
          links now live somewhere new. Everything current is one step away.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/">Back to the homepage</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/work/">See the work</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-fg-muted">
          Looking for something specific?{" "}
          <Link
            href="/contact/"
            className="font-medium text-brand-text underline-offset-4 hover:underline"
          >
            Get in touch
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Build and confirm the static 404 artifact.**

```bash
cd web && npm run build && grep -c "no page here" out/404.html
```

Expected: build exits 0 and the grep prints `1` (or more).

- [ ] **Step 3: Visual verification, both themes.** Start the dev server:

```bash
cd web && npm run dev
```

With the Playwright MCP browser: `browser_resize` to `1440×900`, `browser_navigate` to `http://localhost:3000/this-page-does-not-exist/`, `browser_take_screenshot` (filename `404-dark.png`). Then `browser_click` on the button with accessible name **"Switch to light mode"** and `browser_take_screenshot` (filename `404-light.png`). Look for, in BOTH themes: serif headline in `--fg`; violet used ONLY for the eyebrow, the "Get in touch" link, the primary button, and the soft radial glow (no large violet fill); outline button legible; Nav and Footer render around the page (root layout wraps `not-found`). Click "Switch to dark mode" to restore the default theme, then stop the dev server (Ctrl-C / kill the process).

- [ ] **Step 4: Commit.**

```bash
git add web/app/not-found.tsx && git commit -m "feat(web): branded 404 page"
```

---

### Task 57 (H4): `pageMetadata` helper (canonical + OG/Twitter pattern) + branded OG card wiring — TDD

> **Merge note (harmonizations 6 + 7):**
> 1. **Dashboard metadata:** this task runs AFTER Task 46 (F11), which rewrote `web/app/dashboard/page.tsx` with `title: "Live Demo"` and the playable-demo description. Step 6's before/after blocks below are written against that shipped F11 file — the pattern keeps F11's title and description verbatim (the page title is **"Live Demo"**, full stop; "Live Dashboard" was the pre-F11 Phase 1 title and must not resurface) and only adds `path: "/dashboard/"` via `pageMetadata`. Step 8's title grep guards against any silent revert.
> 2. **Pattern rollout:** the Wave 2 pages shipped with inline `Metadata` objects — `/services/` and `/about/` (canonical only, Tasks 28/30), `/work/` (canonical + partial OG, Task 21), `/work/[slug]/` (`generateMetadata`, Task 24), `/contact/` (no canonical, Task 34). Step 6b migrates all five to `pageMetadata(...)` with exact before/after blocks (this is what adds the missing `/contact/` canonical and the full OG/Twitter blocks to `/services/`, `/about/`, and `/contact/`).
> 3. `web/app/page.tsx` at this point is the Task 5 (A5) final version — Step 7 applies cleanly on top of it.

**Files:**
- Create: `web/lib/seo.ts`
- Test: `web/lib/__tests__/seo.test.ts`
- Modify: `web/app/dashboard/page.tsx`, `web/app/page.tsx`, `web/app/services/page.tsx`, `web/app/about/page.tsx`, `web/app/contact/page.tsx`, `web/app/work/page.tsx`, `web/app/work/[slug]/page.tsx`

**Interfaces:** Consumes: `Metadata` type from `next`; the root layout's `metadataBase: new URL("https://kcoh.ca")` (already set — resolves relative canonical/OG URLs); the committed branded card `web/public/og.png` (1200×630, Phase 1 commit `f6fc45a`); the shipped Wave 2 page files (Tasks 21, 24, 28, 30, 34, 46 — this task runs after all of them). Produces: `pageMetadata({ title, description, path }): Metadata` — **the** per-page metadata pattern. The Wave 2 pages ship with inline `Metadata` first (`web/lib/seo.ts` does not exist yet in Wave 2); Steps 6/6b migrate `/dashboard/`, `/services/`, `/about/`, `/contact/`, `/work/`, and `/work/[slug]/` to it, so after this task every route except `/` (canonical-only by design, Step 7) exports `pageMetadata(...)` — which is exactly what Task 65's SEO playbook checks.

**OG image decision (spec §10 "static branded PNGs"):** the simplest reliable path is the static export from the design that already ships — `web/public/og.png` is the approved branded 1200×630 card produced in Phase 1. This task verifies the asset and locks it into the pattern; no generation tooling is added. Replacement recipe is documented in the README (Task H7).

- [ ] **Step 1: Write the failing test** — create `web/lib/__tests__/seo.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { pageMetadata } from "@/lib/seo";

describe("pageMetadata", () => {
  const meta = pageMetadata({
    title: "Services",
    description: "Six services, in depth.",
    path: "/services/",
  });
  const og = meta.openGraph as {
    title?: string;
    url?: string;
    siteName?: string;
    images?: unknown;
  };
  const tw = meta.twitter as {
    card?: string;
    title?: string;
    images?: unknown;
  };

  it("sets the canonical to the given path", () => {
    expect(meta.alternates?.canonical).toBe("/services/");
  });

  it("passes title and description through for the <title> template", () => {
    expect(meta.title).toBe("Services");
    expect(meta.description).toBe("Six services, in depth.");
  });

  it("applies the site template to the OG and twitter titles", () => {
    expect(og.title).toBe("Services · KCOH Software Inc.");
    expect(tw.title).toBe("Services · KCOH Software Inc.");
  });

  it("points OG at the page path and the branded 1200x630 card", () => {
    expect(og.url).toBe("/services/");
    expect(og.siteName).toBe("KCOH Software Inc.");
    expect(og.images).toEqual([
      expect.objectContaining({ url: "/og.png", width: 1200, height: 630 }),
    ]);
  });

  it("uses a summary_large_image twitter card with the same asset", () => {
    expect(tw.card).toBe("summary_large_image");
    expect(tw.images).toEqual(["/og.png"]);
  });

  it("rejects paths without a leading slash", () => {
    expect(() =>
      pageMetadata({ title: "X", description: "Y", path: "services/" }),
    ).toThrow(/must start and end/);
  });

  it("rejects paths without a trailing slash (trailingSlash: true)", () => {
    expect(() =>
      pageMetadata({ title: "X", description: "Y", path: "/services" }),
    ).toThrow(/must start and end/);
  });
});
```

- [ ] **Step 2: Run the test and watch it fail.**

```bash
cd web && npm test
```

Expected failure: `Error: Failed to resolve import "@/lib/seo"` (module does not exist yet). Existing `geometry` and `use-count-up` suites still pass.

- [ ] **Step 3: Implement** — create `web/lib/seo.ts` (no `"use client"`; pure module):

```ts
import type { Metadata } from "next";

const SITE_NAME = "KCOH Software Inc.";

const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "KCOH Software Inc. — we build and operate the systems that scale real companies.",
};

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  if (!path.startsWith("/") || !path.endsWith("/")) {
    throw new Error(
      `pageMetadata: path must start and end with "/" (trailingSlash: true) — got "${path}"`,
    );
  }

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
```

- [ ] **Step 4: Run the test and watch it pass.**

```bash
cd web && npm test
```

Expected: all suites green, including the 7 new `pageMetadata` tests.

- [ ] **Step 5: Verify the branded OG asset itself** (dimensions and weight are load-bearing for the pattern):

```bash
sips -g pixelWidth -g pixelHeight web/public/og.png && ls -l web/public/og.png
```

Expected: `pixelWidth: 1200`, `pixelHeight: 630`, size ≈ `112448` bytes (must stay under ~300 KB).

- [ ] **Step 6: Apply the pattern to `/dashboard` (the post-F11 file).** In `web/app/dashboard/page.tsx`, add the import (after the existing `import type { Metadata } from "next";` line):

```tsx
import { pageMetadata } from "@/lib/seo";
```

and replace the metadata export block that Task 46 (F11) shipped:

```tsx
export const metadata: Metadata = {
  title: "Live Demo",
  description:
    "A playable preview of the operations dashboards we build: revenue, projects, invoices, and analytics in one place.",
};
```

with:

```tsx
export const metadata: Metadata = pageMetadata({
  title: "Live Demo",
  description:
    "A playable preview of the operations dashboards we build: revenue, projects, invoices, and analytics in one place.",
  path: "/dashboard/",
});
```

  (F11's title and description are kept byte-identical — this edit only wraps them in `pageMetadata` to add the canonical + OG/Twitter blocks. If the before-block does not match, STOP and reconcile against the actual file rather than reverting F11's copy.)

- [ ] **Step 6b: Migrate the Wave 2 pages to `pageMetadata` (pattern rollout — harmonization 7).** In each file below, add `import { pageMetadata } from "@/lib/seo";` after the existing `import type { Metadata } from "next";` line, then replace the metadata block exactly as shown (titles/descriptions are the Wave 2 pages' own, byte-identical):

  **(a) `web/app/services/page.tsx`** — replace:

```tsx
export const metadata: Metadata = {
  title: "Services",
  description:
    "Business systems engineering: custom software, automation, financial systems, integrations, iOS development, and ongoing support. Fixed quotes after discovery, no hourly billing.",
  alternates: { canonical: "/services/" },
};
```

  with:

```tsx
export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Business systems engineering: custom software, automation, financial systems, integrations, iOS development, and ongoing support. Fixed quotes after discovery, no hourly billing.",
  path: "/services/",
});
```

  **(b) `web/app/about/page.tsx`** — replace:

```tsx
export const metadata: Metadata = {
  title: "About",
  description:
    "Kevin Cohen built and operated a 7-figure platform with 2,600+ members. KCOH Software Inc. applies that operator judgment to software systems that automate operations and add financial clarity.",
  alternates: { canonical: "/about/" },
};
```

  with:

```tsx
export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Kevin Cohen built and operated a 7-figure platform with 2,600+ members. KCOH Software Inc. applies that operator judgment to software systems that automate operations and add financial clarity.",
  path: "/about/",
});
```

  **(c) `web/app/contact/page.tsx`** — replace (this page shipped with NO canonical; the migration adds it):

```tsx
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 30-minute conversation or write to us directly. Average reply: under 24h.",
};
```

  with:

```tsx
export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Book a 30-minute conversation or write to us directly. Average reply: under 24h.",
  path: "/contact/",
});
```

  **(d) `web/app/work/page.tsx`** — replace (the hand-rolled partial OG block is superseded by the pattern's full siteName/Twitter shape):

```tsx
export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from KCOH Software Inc.: Concordia Connect, Drafterie, Skyroa, and AutoMedic. Systems built, shipped, and operated in production.",
  alternates: { canonical: "/work/" },
  openGraph: {
    title: "Work",
    description:
      "Case studies from KCOH Software Inc.: Concordia Connect, Drafterie, Skyroa, and AutoMedic.",
    images: ["/og.png"],
  },
};
```

  with:

```tsx
export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Case studies from KCOH Software Inc.: Concordia Connect, Drafterie, Skyroa, and AutoMedic. Systems built, shipped, and operated in production.",
  path: "/work/",
});
```

  **(e) `web/app/work/[slug]/page.tsx`** — inside `generateMetadata`, replace the hand-rolled return:

```tsx
  return {
    title: study.name,
    description: study.oneLiner,
    alternates: { canonical: `/work/${study.slug}/` },
    openGraph: {
      title: `${study.name} · KCOH Software Inc.`,
      description: study.oneLiner,
      images: ["/og.png"],
    },
  };
```

  with:

```tsx
  return pageMetadata({
    title: study.name,
    description: study.oneLiner,
    path: `/work/${study.slug}/`,
  });
```

  Then run `cd web && npm run build` — clean export, all routes still emitted. (If a before-block does not match byte-for-byte — e.g. a page shipped with drifted copy — apply the same wrap-in-`pageMetadata` transformation to the block as found, preserving that page's actual title/description.)

- [ ] **Step 7: Give the homepage its canonical.** In `web/app/page.tsx`, add as the FIRST import line:

```tsx
import type { Metadata } from "next";
```

and insert this block immediately above the `export default function Home() {` line (the homepage keeps the layout's default un-templated title and OG block; only the canonical is page-level):

```tsx
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};
```

- [ ] **Step 8: Build and verify the rendered head tags.**

```bash
cd web && npm run build
grep -o '<title>[^<]*</title>' web/out/dashboard/index.html
grep -o '<link rel="canonical" href="[^"]*"' web/out/dashboard/index.html
grep -o '<link rel="canonical" href="[^"]*"' web/out/index.html
grep -o '<link rel="canonical" href="[^"]*"' web/out/contact/index.html
grep -o 'property="og:image" content="[^"]*"' web/out/dashboard/index.html
```

Expected output lines:

```
<title>Live Demo · KCOH Software Inc.</title>
<link rel="canonical" href="https://kcoh.ca/dashboard/"
<link rel="canonical" href="https://kcoh.ca/"
<link rel="canonical" href="https://kcoh.ca/contact/"
property="og:image" content="https://kcoh.ca/og.png"
```

(The title grep is the regression guard for F11's "Live Demo" title — if it prints "Live Dashboard", Step 6 reverted F11's copy; fix before committing. The `/contact/` canonical proves the Step 6b migration ran.)

- [ ] **Step 9: Commit.**

```bash
git add web/lib/seo.ts web/lib/__tests__/seo.test.ts web/app/dashboard/page.tsx web/app/page.tsx web/app/services/page.tsx web/app/about/page.tsx web/app/contact/page.tsx web/app/work/page.tsx "web/app/work/[slug]/page.tsx" && git commit -m "feat(web): per-page canonical + OG/Twitter metadata pattern with branded og card"
```

---

### Task 58 (H5): Organization JSON-LD in the root layout — TDD

**Files:**
- Modify: `web/lib/seo.ts`, `web/app/layout.tsx`
- Test: `web/lib/__tests__/seo.test.ts`

**Interfaces:** Consumes: `CONTACT_EMAIL`, `LINKEDIN_URL` from `@/content/nav`; `founder` from `@/content/founder` (API reference §8) — facts only, per facts inventory §7 (v1 JSON-LD carried `availableLanguage ["English","French"]`, `addressCountry "CA"`). Produces: `export const organizationJsonLd` from `web/lib/seo.ts`, rendered once in the root layout so it ships on every page.

- [ ] **Step 1: Write the failing test.** In `web/lib/__tests__/seo.test.ts`, change the import line from:

```ts
import { pageMetadata } from "@/lib/seo";
```

to:

```ts
import { pageMetadata, organizationJsonLd } from "@/lib/seo";
```

and append this block at the end of the file:

```ts
describe("organizationJsonLd", () => {
  it("is a schema.org Organization for kcoh.ca", () => {
    expect(organizationJsonLd["@context"]).toBe("https://schema.org");
    expect(organizationJsonLd["@type"]).toBe("Organization");
    expect(organizationJsonLd.name).toBe("KCOH Software Inc.");
    expect(organizationJsonLd.url).toBe("https://kcoh.ca");
  });

  it("carries the real contact facts (never invented)", () => {
    expect(organizationJsonLd.email).toBe("inquiries@kcoh.ca");
    expect(organizationJsonLd.sameAs).toContain(
      "https://ca.linkedin.com/in/kevin-cohen-entrepreneur",
    );
    expect(organizationJsonLd.founder.name).toBe("Kevin Cohen");
    expect(organizationJsonLd.address.addressCountry).toBe("CA");
    expect(organizationJsonLd.contactPoint.availableLanguage).toEqual([
      "English",
      "French",
    ]);
  });

  it("serializes cleanly for the ld+json script tag", () => {
    expect(JSON.stringify(organizationJsonLd)).not.toContain("undefined");
  });
});
```

- [ ] **Step 2: Run and watch it fail.**

```bash
cd web && npm test
```

Expected failure: `SyntaxError: ... does not provide an export named 'organizationJsonLd'` (or equivalent unresolved-export error).

- [ ] **Step 3: Implement.** In `web/lib/seo.ts`, add below the existing `import type { Metadata } from "next";` line:

```ts
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/content/nav";
import { founder } from "@/content/founder";
```

and append at the end of the file:

```ts
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: "https://kcoh.ca",
  logo: "https://kcoh.ca/icon.png",
  email: CONTACT_EMAIL,
  founder: {
    "@type": "Person",
    name: founder.name,
    url: LINKEDIN_URL,
  },
  sameAs: [LINKEDIN_URL],
  address: { "@type": "PostalAddress", addressCountry: "CA" },
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    availableLanguage: ["English", "French"],
  },
} as const;
```

- [ ] **Step 4: Run and watch it pass.**

```bash
cd web && npm test
```

Expected: all green, including the 3 new `organizationJsonLd` tests.

- [ ] **Step 5: Render it in the root layout.** In `web/app/layout.tsx`, add after the `import { Footer } from "@/components/site/footer";` line:

```tsx
import { organizationJsonLd } from "@/lib/seo";
```

and change the body opening from:

```tsx
      <body>
        <Providers>
```

to:

```tsx
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Providers>
```

Everything else in `layout.tsx` stays byte-identical.

- [ ] **Step 6: Build and verify the emitted JSON-LD.**

```bash
cd web && npm run build && grep -o '"@type":"Organization"' web/out/index.html && grep -o '"email":"inquiries@kcoh.ca"' web/out/index.html
```

Expected: both greps print their match once.

- [ ] **Step 7: Commit.**

```bash
git add web/lib/seo.ts web/lib/__tests__/seo.test.ts web/app/layout.tsx && git commit -m "feat(web): Organization JSON-LD on every page"
```

---

### Task 59 (H6): Extend `sitemap.ts` to all routes including case slugs — TDD

**Files:**
- Modify: `web/app/sitemap.ts`
- Test: `web/lib/__tests__/sitemap.test.ts`

**Interfaces:** Consumes: `caseStudies: CaseStudy[]` from `web/content/case-studies.ts` [owner C — pinned contract; this task MUST run after C's content task lands]. Produces: static `out/sitemap.xml` listing all 10 routes (6 static including `/dashboard/` + 4 case studies), every URL with a trailing slash (matching `trailingSlash: true`), referenced by `robots.txt`.

- [ ] **Step 1: Write the failing test** — create `web/lib/__tests__/sitemap.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);

  it("lists all ten routes", () => {
    expect(urls).toHaveLength(10);
  });

  it("includes every static route", () => {
    for (const path of [
      "/",
      "/services/",
      "/work/",
      "/about/",
      "/contact/",
      "/dashboard/",
    ]) {
      expect(urls).toContain(`https://kcoh.ca${path}`);
    }
  });

  it("includes all four case-study routes", () => {
    for (const slug of [
      "concordia-connect",
      "drafterie",
      "skyroa",
      "automedic",
    ]) {
      expect(urls).toContain(`https://kcoh.ca/work/${slug}/`);
    }
  });

  it("gives the homepage top priority", () => {
    const home = entries.find((e) => e.url === "https://kcoh.ca/");
    expect(home?.priority).toBe(1);
  });

  it("never emits a URL without a trailing slash (trailingSlash: true)", () => {
    for (const url of urls) {
      expect(url.endsWith("/")).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run and watch it fail.**

```bash
cd web && npm test
```

Expected failure: `expected [ …2 entries… ] to have a length of 10 but got 2` (today's sitemap only lists `/` and `/dashboard`), plus missing-route failures.

- [ ] **Step 3: Implement** — replace the entire contents of `web/app/sitemap.ts` with:

```ts
import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";

// Required for `output: "export"` — emit a static sitemap.xml at build time.
export const dynamic = "force-static";

const base = "https://kcoh.ca";
const lastModified = new Date("2026-07-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/services/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/work/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/about/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/dashboard/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const caseRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${base}/work/${cs.slug}/`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseRoutes];
}
```

- [ ] **Step 4: Run and watch it pass.**

```bash
cd web && npm test
```

Expected: all green, including the 5 new sitemap tests.

- [ ] **Step 5: Build and verify the emitted XML.**

```bash
cd web && npm run build && grep -c "<loc>" web/out/sitemap.xml && grep -o "<loc>https://kcoh.ca/work/drafterie/</loc>" web/out/sitemap.xml
```

Expected: `10` and the Drafterie `<loc>` line printed.

- [ ] **Step 6: Commit.**

```bash
git add web/app/sitemap.ts web/lib/__tests__/sitemap.test.ts && git commit -m "feat(web): sitemap covers all routes including case studies"
```

---

### Task 60 (H7): `web/README.md` — document the preview-then-approve deploy workflow

**Files:**
- Modify: `web/README.md` (full replacement of the create-next-app boilerplate)

**Interfaces:** Consumes: scripts and config from H1, test keys convention from spec §8, SEO pattern from H4/H6. Produces: the operational runbook every future session (and Kevin) follows.

- [ ] **Step 1: Replace the entire contents of `web/README.md`** with:

```markdown
# KCOH Software Inc. — kcoh.ca (v2)

Static Next.js 16 site (App Router, `output: "export"`) deployed to Cloudflare
Pages via Wrangler. The only server-side code is the Cloudflare Pages Function
for the contact form (`functions/api/contact.ts`), which deploys automatically
with the site.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Next dev server at http://localhost:3000 — fast iteration, but **no** Pages Functions, `_redirects`, or `_headers` |
| `npm test` | Vitest unit tests (chart geometry, count-up, SEO helpers, sitemap, contact validation) |
| `npm run lint` | ESLint |
| `npm run build` | Static export to `out/` |
| `npm run preview` | Build + `wrangler pages dev out` at http://localhost:8788 — launch-fidelity preview: Functions, redirects, and headers all live |
| `npm run deploy` | Build + `wrangler pages deploy out` → **production**. Never run without Kevin's explicit approval. |

## The preview → approve → deploy workflow

1. `npm run preview` and review at http://localhost:8788. This is the
   launch-fidelity environment — test redirects, headers, and the contact form
   here, not under `npm run dev`.
2. Present the preview to Kevin. **Stop.**
3. Only on his explicit approval: complete "Production setup" below once, then
   `npm run deploy`.

## Local secrets (contact form)

`wrangler pages dev` reads `.dev.vars` (gitignored). Use Cloudflare's public
Turnstile test keys locally:

```
# web/.dev.vars
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
RESEND_API_KEY=re_dev_placeholder
```

The Turnstile widget needs its site key at build time:

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm run preview
```

The test site key always passes verification. The placeholder Resend key means
a local submit exercises the full request path and then surfaces the form's
error state with the pre-filled `mailto:` fallback — that is the expected local
behavior, not a bug.

## Production setup (once, before first deploy)

1. `npx wrangler login`
2. In `wrangler.toml`, replace the single marked `name = "kcoh-ca"` line with
   the real kcoh.ca Pages project name.
3. Set encrypted secrets:
   `npx wrangler pages secret put RESEND_API_KEY` and
   `npx wrangler pages secret put TURNSTILE_SECRET_KEY`
4. Deploy with the real widget key:
   `NEXT_PUBLIC_TURNSTILE_SITE_KEY=<real site key> npm run deploy`
5. Manual Cloudflare dashboard steps at launch: WAF rate limit (~5/min/IP) on
   `/api/contact`; DKIM/SPF/DMARC DNS records for the Resend sending domain.

## SEO conventions

- Every page exports metadata via `pageMetadata({ title, description, path })`
  from `lib/seo.ts` (canonical + OG + Twitter). `path` must start and end with
  `/` — the site builds with `trailingSlash: true`.
- `app/sitemap.ts` lists every route; update it when adding a page (the vitest
  suite pins the route count).
- The social card is the static branded `public/og.png` (1200×630, ~110 KB).
  To replace it, export a new 1200×630 PNG from the design and overwrite the
  file — keep it under 300 KB. No generation tooling required.
- Legacy v1 URLs 301 via `public/_redirects` (Next `redirects()` is a no-op
  under static export).
- Organization JSON-LD ships on every page from the root layout
  (`organizationJsonLd` in `lib/seo.ts`).

## QA gates

The pre-ship gates and their results live in
`docs/qa/2026-07-01-phase2-qa-log.md`: clean build + route inventory, full
a11y pass (keyboard, contrast, reduced motion), both-themes/both-widths
screenshot review, end-to-end contact + redirects under `wrangler pages dev`,
and Lighthouse ≥ 95 on every category.
```

- [ ] **Step 2: Sanity-check the README renders** (headings/tables intact):

```bash
grep -c "^## " web/README.md
```

Expected: `6`.

- [ ] **Step 3: Commit.**

```bash
git add web/README.md && git commit -m "docs(web): preview-then-approve deploy runbook"
```

---

## FINAL QA WAVE (Tasks H8–H13) — runs strictly after ALL other workstreams are merged

These tasks close the plan. Each records its results in `docs/qa/2026-07-01-phase2-qa-log.md` so every gate has a committed artifact. A gate that fails blocks the next task until the owning component is fixed and the gate re-run.

---

### Task 61 (H8): QA Gate 1 — tests, lint, clean `next build`, full route/asset inventory

> **Merge note (harmonization 11):** By this gate the vitest suite also includes `tick`, `case-studies`, `case-metrics`, `workflow-feed`, `demo-data`, `demo-sort`, `demo-ticker`, `demo-hover`, `use-tilt`, `magnetic`, `use-pointer-glow`, `active-route`, `contact-validation`, `seo`, and `sitemap` — ALL must be green, not just the suites named in the QA-log template below.

**Files:**
- Create: `docs/qa/2026-07-01-phase2-qa-log.md`

**Interfaces:** Consumes: every route and asset produced by workstreams A–G + H1–H7. Produces: the QA log all later gates append to; a verified-complete `out/` directory.

- [ ] **Step 1: Run the full unit suite and lint.**

```bash
cd web && npm test && npm run lint
```

Expected: vitest exits 0 (geometry, count-up, seo, sitemap, and the contact-validation suites all green); eslint exits 0 with no errors. If any test fails, stop — fix in the owning workstream's component before proceeding.

- [ ] **Step 2: Clean build gate.**

```bash
cd web && npm run build
```

Expected: exit 0; the route table printed by Next lists `/`, `/services`, `/work`, `/work/[slug]` (4 paths), `/about`, `/contact`, `/dashboard`, `/_not-found`, `/sitemap.xml`; zero build warnings about missing `generateStaticParams`.

- [ ] **Step 3: Inventory every expected artifact in `out/`.**

```bash
cd web && for f in index.html 404.html sitemap.xml robots.txt _headers _redirects og.png \
  services/index.html work/index.html work/concordia-connect/index.html \
  work/drafterie/index.html work/skyroa/index.html work/automedic/index.html \
  about/index.html contact/index.html dashboard/index.html; do
  if [ -f "out/$f" ]; then echo "OK       $f"; else echo "MISSING  $f"; fi
done
```

Expected: 16 `OK` lines, zero `MISSING`. A `MISSING` line means the owning page task is incomplete — stop and resolve before continuing the QA wave.

- [ ] **Step 4: Create the QA log** — create `docs/qa/2026-07-01-phase2-qa-log.md`:

```markdown
# Phase 2 QA log — started 2026-07-01

Gates run strictly in order. A failed gate blocks the next until fixed and re-run.

## Gate 1 — tests, lint, clean build, route inventory (Task H8)

- [ ] `npm test` green (suites: geometry, use-count-up, seo, sitemap, contact validation)
- [ ] `npm run lint` clean
- [ ] `npm run build` exit 0, all 10 routes + `_not-found` + `sitemap.xml` in route table
- [ ] `out/` inventory: 16/16 artifacts present

Result: PENDING

## Gate 2 — accessibility pass (Task H9)

Result: PENDING

## Gate 3 — both-themes / both-widths screenshot review (Task H10)

Result: PENDING

## Gate 4 — wrangler pages dev end-to-end: contact form, redirects, headers, 404 (Task H11)

Result: PENDING

## Gate 5 — Lighthouse ≥ 95 all categories (Task H12)

Result: PENDING

## Gate 6 — preview presented to Kevin (Task H13)

Result: PENDING — production deploy happens ONLY on Kevin's explicit approval.
```

Then tick Gate 1's four checkboxes and change its `Result: PENDING` to `Result: PASS — <date>` (or record exactly what failed and was fixed).

- [ ] **Step 5: Commit.**

```bash
git add docs/qa/2026-07-01-phase2-qa-log.md && git commit -m "chore(qa): phase 2 QA gate 1 — clean build + route inventory"
```

---

### Task 62 (H9): QA Gate 2 — full accessibility pass (keyboard, contrast, reduced motion)

**Files:**
- Modify: `docs/qa/2026-07-01-phase2-qa-log.md`

**Interfaces:** Consumes: `Nav` + mobile `Sheet`, `ThemeToggle` (API reference); `FaqAccordion`, `CTASection` [A]; `ProjectTheme` accent behavior + `--brand-text`/status tokens [B, Task 7]; contact form (spec §8) [E]; playable `/dashboard` demo (sidebar screens, sortable invoice table, in-frame theme toggle) [F]; `Magnetic`, `useTilt` [G]; `useReducedMotion` gating everywhere. Produces: Gate 2 record.

- [ ] **Step 1: Start the dev server** (`cd web && npm run dev`) and open `http://localhost:3000/` in the Playwright MCP browser at `1440×900`.

- [ ] **Step 2: Keyboard-walk every interactive component.** Using only Tab / Shift-Tab / Enter / Space / Arrow keys / Escape (via `browser_press_key`), verify each row and note pass/fail:

| Component | Route | Expected keyboard behavior |
| --- | --- | --- |
| Nav links + "Let's Talk" CTA | every page | Tab reaches each link in order; Enter follows; `focus-visible` ring visible on every stop |
| ThemeToggle | every page | Tab reaches it; Enter/Space flips theme; accessible name flips between "Switch to light mode"/"Switch to dark mode" |
| Mobile menu (Sheet) | any page at 360px | Trigger opens with Enter; focus moves into sheet; Escape closes and returns focus to trigger |
| FAQ accordion (`FaqAccordion`) | `/` | Tab reaches each trigger; Enter/Space toggles; chevron rotates; collapsed content not tabbable |
| Featured-work cards → case pages | `/`, `/work/` | Cards are links: Tab + Enter navigates; tilt/glow effects never trap focus |
| Case-page next-project pager | `/work/<slug>/` | Tab + Enter navigates to next case |
| Contact form | `/contact/` | Tab order: name → email → company → message → Turnstile → submit; every field has a visible label; error state announced next to the field; `mailto:` fallback link reachable |
| Cal.com embed fallback link | `/contact/` | Plain link reachable and operable by keyboard |
| Dashboard demo | `/dashboard/` | Sidebar items (Overview/Projects/Invoices/Analytics) focusable + Enter switches screen; invoice table sort controls operable via keyboard; in-frame theme toggle operable |
| Magnetic buttons | site-wide | Magnetic pull is hover-only; keyboard focus + Enter works identically to a plain button |
| 404 page buttons/links | `/nope/` | All three targets reachable and operable |

- [ ] **Step 3: Contrast check — named color pairs, both themes.** These ratios were computed from the exact token values in `web/app/globals.css` **after Task 7's AA token layer** (`--brand-text`, raised light `--pos`/`--warn`, darkened `--primary`) — the small-text accent failures that the raw palette would have produced (raw burgundy 2.25:1 on dark, raw green 3.16:1 on light, raw status greens/ambers ~3.2–3.3:1, white-on-raw-brand 4.29:1) were designed out in Wave 1. This gate VERIFIES the tokens landed; any FAIL here means a component bypassed a token (e.g. small text using `text-brand` instead of `text-brand-text`) — fix that component before passing the gate:

| Pair (usage) | Theme | Ratio | Threshold | Verdict |
| --- | --- | --- | --- | --- |
| `--fg` #0f172a on `--bg` #fafafb (body text) | light | 17.11 | ≥ 4.5 | PASS |
| `--fg-muted` #64748b on `--bg` #fafafb (secondary text) | light | 4.56 | ≥ 4.5 | PASS |
| `--fg-muted` #64748b on `--card` #ffffff | light | 4.76 | ≥ 4.5 | PASS |
| `--fg-subtle` #94a3b8 on `--card` #ffffff | light | 2.56 | ≥ 4.5 if used for real text | **FAIL as text** — allowed only for decorative/`aria-hidden` dashboard chrome; confirm no meaningful text uses `text-fg-subtle` on light cards |
| `--brand-text` ≈ #5e54d9 (85% brand + black) on `--bg` #fafafb — eyebrows (`SectionLabel`), small brand links, status tints | light | ≈ 5.4 | ≥ 4.5 (12px eyebrows are small text — the large-text 3:1 bar does NOT apply) | PASS — verify a light-theme eyebrow's computed color is the mixed tone, not raw #6e63ff |
| `--brand-text` = `var(--brand)` #6e63ff on `--bg` #05070b (same usages) | dark | 4.70 | ≥ 4.5 | PASS |
| `--brand` #6e63ff (chart strokes, icons, focus rings, ≥24px serif `em` text) | both | 4.12 (light) / 4.70 (dark) | ≥ 3 (graphics/large text only) | PASS — raw `--brand` must not color small text; that is `--brand-text`'s job (Task 7) |
| white on `--primary` (primary buttons; `--primary` = 88% brand + black per Task 7) | both | ≈ 5.3 | ≥ 4.5 (14px-medium button labels are small text) | PASS — verify the button fill computes to ≈ rgb(97,87,224), not raw #6e63ff (which is 4.29:1) |
| `--pos` #15803d on `--card` #ffffff (status text; Task 7 raised from #16a34a = 3.30) | light | 5.02 | ≥ 4.5 | PASS — verify "Paid"/"Confirmed"/"done" labels compute to #15803d in light theme |
| `--warn` #b45309 on `--card` #ffffff (status text; Task 7 raised from #d97706 = 3.19) | light | 5.02 | ≥ 4.5 | PASS — verify "Pending" labels compute to #b45309 in light theme |
| `--neg` #dc2626 on `--card` #ffffff | light | 4.83 | ≥ 4.5 | PASS |
| `--fg` #f6f7fb on `--bg` #05070b | dark | 18.83 | ≥ 4.5 | PASS |
| `--fg-muted` #9aa4b2 on `--card` #111723 | dark | 7.11 | ≥ 4.5 | PASS |
| `--pos`/`--warn`/`--neg` on `--card` | dark | 9.33 / 10.75 / 6.49 | ≥ 4.5 | PASS |
| Concordia case text via `--brand-text` = color-mix(60% #8b1d3f, white) on `--bg` #05070b | dark | ≈ 5.8 | ≥ 4.5 | PASS — on `/work/concordia-connect/` in dark theme, verify the "Case Study" eyebrow computes to the lightened tone, NOT raw #8b1d3f (which is 2.25:1); if raw, `ProjectTheme`'s `data-project-theme`/CSS from Task 7 is broken |
| Case accents as text via `--brand-text` = color-mix(72% accent, black) on `--bg` #fafafb | light | AutoMedic ≈ 5.6; indigo higher | ≥ 4.5 | PASS — raw #16a34a as text would be 3.16:1; verify `/work/automedic/` eyebrow/link in light theme computes to the darkened tone |
| Raw accents #8b1d3f / #4f46e5 / #16a34a (chart strokes, gradients, logo-chip tints inside `ProjectTheme`) | both | n/a (graphics) | ≥ 3 where meaningful | PASS — charts deliberately keep the raw accent via `--brand`; confirm no small TEXT node computes to a raw accent hex |

- [ ] **Step 4: Reduced-motion pass.** Emulate `prefers-reduced-motion` in the Playwright MCP browser by running, via `browser_run_code_unsafe`:

```js
await page.emulateMedia({ reducedMotion: "reduce" });
```

then reload each route. (Fallback if emulation is unavailable: macOS System Settings → Accessibility → Display → Reduce motion ON, then relaunch the browser.) Verify on `/`, `/work/drafterie/`, `/dashboard/`:
  - `Reveal` renders plain `div`s — all content visible immediately, no fade-rise.
  - Stat count-ups show final values instantly (`useCountUp` returns target when reduced).
  - Charts render their final drawn state — no sweep/stagger/fill animation.
  - Tilt (`useTilt`) and `Magnetic` are inert; hover produces no transform.
  - Accordion and demo remain fully functional (state changes allowed; large movement not).
  Then run `await page.emulateMedia({ reducedMotion: null });` to restore.

- [ ] **Step 5: Record Gate 2.** In `docs/qa/2026-07-01-phase2-qa-log.md`, replace Gate 2's `Result: PENDING` with the completed keyboard table verdicts, the contrast verdicts (including any token/component fixes made, with commit hashes), the reduced-motion checklist, and `Result: PASS — <date>`.

- [ ] **Step 6: Commit.**

```bash
git add docs/qa/2026-07-01-phase2-qa-log.md && git commit -m "chore(qa): phase 2 QA gate 2 — a11y pass (keyboard, contrast, reduced motion)"
```

(If component fixes were required, they are committed in the owning component's files first, with their own conventional-commit messages, e.g. `fix(web): raise light-theme status color contrast to AA`.)

---

### Task 63 (H10): QA Gate 3 — both-themes / both-widths screenshot review of every route

**Files:**
- Modify: `docs/qa/2026-07-01-phase2-qa-log.md`

**Interfaces:** Consumes: every route; `ThemeToggle` (theme persists via `next-themes` localStorage, default dark). Produces: Gate 3 record + 44 reviewed screenshots.

- [ ] **Step 1: Start the dev server** (`cd web && npm run dev`). Route list (11 URLs):

```
/   /services/   /work/   /work/concordia-connect/   /work/drafterie/
/work/skyroa/   /work/automedic/   /about/   /contact/   /dashboard/
/this-page-does-not-exist/   (404)
```

- [ ] **Step 2: Dark pass.** With Playwright MCP: `browser_resize` to `1440×900`; for each of the 11 URLs: `browser_navigate`, wait for load, `browser_take_screenshot` with filename `<route-key>-dark-1440.png` (route keys: `home`, `services`, `work`, `work-concordia-connect`, `work-drafterie`, `work-skyroa`, `work-automedic`, `about`, `contact`, `dashboard`, `404`). Then `browser_resize` to `360×800` and repeat → `<route-key>-dark-360.png`.

- [ ] **Step 3: Light pass.** `browser_click` the button with accessible name **"Switch to light mode"** once (persists for the session), then repeat Step 2 at both widths → `<route-key>-light-1440.png` / `<route-key>-light-360.png`. 44 screenshots total.

- [ ] **Step 4: Review every screenshot against this checklist** and log any failure with route + theme + width:
  - No horizontal overflow/scrollbar at 360px; no clipped text or overlapping elements.
  - Nothing invisible-in-theme: project logos, chart strokes, borders, and muted text legible in BOTH themes.
  - Case pages: eyebrows, links, chart accents, and gradient tints recolored to the project accent via `ProjectTheme`; nav/buttons stay violet; accent never appears as a large fill.
  - Live compositions (`ProjectMiniPreview`, case-page dashboards, `/dashboard` demo) scale correctly at 360px (no overflow, `ScaledPreview`-style shrink where used).
  - Demo entry points (spec §9): the "Explore the live demo →" link is visible beneath the hero composition on `/`, beneath the six service blocks on `/services/`, and under each case-page hero composition — all pointing at `/dashboard/`.
  - Footer: four columns at 1440px, cleanly stacked at 360px; legal line present.
  - 404 page brand-correct in both themes.
  - Serif headlines render in Fraunces (not fallback Georgia — check letterforms).

- [ ] **Step 5: Record Gate 3** in the QA log: the 44-screenshot matrix (route × theme × width) with per-cell PASS/notes, fixes filed/committed, and `Result: PASS — <date>`.

- [ ] **Step 6: Commit.**

```bash
git add docs/qa/2026-07-01-phase2-qa-log.md && git commit -m "chore(qa): phase 2 QA gate 3 — both-themes both-widths screenshot review"
```

---

### Task 64 (H11): QA Gate 4 — `wrangler pages dev` end-to-end: contact form (test keys), redirects, headers, 404

**Files:**
- Create: `web/.dev.vars` (gitignored — never committed)
- Modify: `docs/qa/2026-07-01-phase2-qa-log.md`

**Interfaces:** Consumes: contact form + `web/functions/api/contact.ts` per spec §8 (honeypot/time-guard rejection; Turnstile siteverify; Resend send; error state → pre-filled `mailto:`); `NEXT_PUBLIC_TURNSTILE_SITE_KEY` build-time env var; `_redirects` from H2; `_headers` CSP (Turnstile + Cal.com domains); `out/404.html` from H3. Produces: Gate 4 record.

- [ ] **Step 1: Create `web/.dev.vars`** with Cloudflare's public Turnstile test secret and a placeholder Resend key:

```
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
RESEND_API_KEY=re_dev_placeholder
```

Confirm it can never be committed:

```bash
cd web && git check-ignore .dev.vars
```

Expected output: `.dev.vars`.

- [ ] **Step 2: Build with the test site key and start the launch-fidelity server.**

```bash
cd web && NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm run build
cd web && (npx wrangler pages dev out --port 8788 >/tmp/kcoh-wrangler-h11.log 2>&1 &) && sleep 8 && curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8788/
```

Expected: `200`.

- [ ] **Step 3: Redirects behavior test (exact curls + expected 301s).**

```bash
for p in "index.html" "about.html" "services.html" "portfolio.html" "contact.html" "sitemap.html"; do
  printf "/%s → " "$p"
  curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "http://localhost:8788/$p"
done
```

Expected output, exactly:

```
/index.html → 301 http://localhost:8788/
/about.html → 301 http://localhost:8788/about/
/services.html → 301 http://localhost:8788/services/
/portfolio.html → 301 http://localhost:8788/work/
/contact.html → 301 http://localhost:8788/contact/
/sitemap.html → 301 http://localhost:8788/
```

This time also spot-check one redirect END-TO-END (target exists now):

```bash
curl -s -o /dev/null -w "%{http_code}\n" -L http://localhost:8788/portfolio.html
```

Expected: `200`.

- [ ] **Step 4: 404 behavior under the real runtime.**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8788/definitely-not-here/
curl -s http://localhost:8788/definitely-not-here/ | grep -c "no page here"
```

Expected: `404`, then `1` (or more) — the branded page is served with the correct status.

- [ ] **Step 5: Security headers served.**

```bash
curl -sI http://localhost:8788/ | grep -i "content-security-policy"
```

Expected: one CSP line containing `challenges.cloudflare.com` in both `script-src` and `frame-src`, plus the Cal.com embed domains (`app.cal.com`, `cal.com`) added by the contact workstream, and NO `emailjs` entries.

- [ ] **Step 6: Contact Function rejects garbage.**

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:8788/api/contact -H "Content-Type: application/json" -d '{}'
```

Expected: a `4xx` status (spec §8: invalid/botlike submissions are rejected — missing fields/token). Record the exact code in the log. A `5xx` here is a bug — stop and fix the Function.

- [ ] **Step 7: Contact form end-to-end in the browser.** With Playwright MCP against `http://localhost:8788/contact/`:
  1. Fill name `QA Test`, email `qa@example.com`, leave company empty, message `End-to-end preview test — please ignore.`
  2. Wait > 3 seconds before submitting (the time-to-submit guard must not trip).
  3. The Turnstile test widget auto-passes (test site key).
  4. Submit. Expected sequence: "sending" state → because `RESEND_API_KEY` is a placeholder, the Resend call fails and the form must show its **error state with the pre-filled `mailto:` fallback** (spec §8: no lead is lost). Verify the fallback link's `href` starts with `mailto:inquiries@kcoh.ca` and carries the typed message.
  5. Verify the Turnstile widget reset after the submit (tokens are single-use).
  6. Log explicitly: "Success path (`sent` state) requires the real `RESEND_API_KEY` — re-test at launch (spec §13, open item 1)."
  Then stop the server: `pkill -f "wrangler pages dev"`.

- [ ] **Step 8: Record Gate 4** in the QA log (redirect table output verbatim, status codes, form behavior, CSP line) and set `Result: PASS — <date>`.

- [ ] **Step 9: Commit.**

```bash
git add docs/qa/2026-07-01-phase2-qa-log.md && git commit -m "chore(qa): phase 2 QA gate 4 — e2e contact form, redirects, headers, 404 under wrangler"
```

---

### Task 65 (H12): QA Gate 5 — Lighthouse ≥ 95 on every category

**Files:**
- Modify: `docs/qa/2026-07-01-phase2-qa-log.md`

**Interfaces:** Consumes: the built site served by `wrangler pages dev` (closest to production: real headers, compression, Functions). Produces: Gate 5 record with per-route scores.

- [ ] **Step 1: Serve the production build.**

```bash
cd web && NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm run build
cd web && (npx wrangler pages dev out --port 8788 >/tmp/kcoh-wrangler-h12.log 2>&1 &) && sleep 8
```

- [ ] **Step 2: Run Lighthouse (desktop) on the five key routes + a mobile run on the homepage.**

```bash
mkdir -p /tmp/kcoh-lh
for r in "home /" "work /work/" "case-drafterie /work/drafterie/" "contact /contact/" "dashboard /dashboard/"; do
  set -- $r
  npx --yes lighthouse@12 "http://localhost:8788$2" --preset=desktop --quiet \
    --chrome-flags="--headless=new" --output=json --output=html \
    --output-path="/tmp/kcoh-lh/$1"
done
npx --yes lighthouse@12 "http://localhost:8788/" --quiet \
  --chrome-flags="--headless=new" --output=json --output=html \
  --output-path="/tmp/kcoh-lh/home-mobile"
```

- [ ] **Step 3: Extract and judge the scores.**

```bash
node -e '
const fs = require("fs");
let fail = false;
for (const f of fs.readdirSync("/tmp/kcoh-lh").filter((f) => f.endsWith(".report.json"))) {
  const r = JSON.parse(fs.readFileSync("/tmp/kcoh-lh/" + f));
  const scores = Object.entries(r.categories).map(([k, v]) => [k, Math.round(v.score * 100)]);
  console.log(f.replace(".report.json", ""), scores.map(([k, s]) => `${k}:${s}`).join("  "));
  if (scores.some(([, s]) => s < 95)) fail = true;
}
process.exit(fail ? 1 : 0);
'
```

Expected: every line shows `performance`, `accessibility`, `best-practices`, `seo` all ≥ 95, exit code 0.

- [ ] **Step 4: On failure, apply the category playbook, fix root cause in the owning component, and re-run ONLY the failing route** (same commands as Steps 2–3, single route):
  - **performance < 95:** confirm the demo is code-split — `grep -rn "next/dynamic" web/app/dashboard web/components` must hit (spec §9: the demo never weighs page one); check asset weights `du -h web/public/* web/public/logos/* | sort -h` (webp ≤ ~200 KB, `og.png` ≈ 110 KB, logos ≤ ~60 KB each); open `/tmp/kcoh-lh/<route>.report.html` and check the LCP element — if it is the hero composition, ensure the `priority` prop is set on `DashboardImage`.
  - **accessibility < 95:** every flagged node in the HTML report maps to a component — apply the Gate 2 contrast remediations (H9 table) or add the missing name/label/role in that component; never suppress with `aria-hidden` on meaningful content.
  - **best-practices < 95:** check for console errors via Playwright MCP `browser_console_messages` on the failing route; CSP violations mean `web/public/_headers` is missing a domain — only Turnstile (`challenges.cloudflare.com`) and Cal.com (`app.cal.com`, `cal.com`) are sanctioned additions per spec §8.
  - **seo < 95:** confirm the page exports `pageMetadata(...)` (description + canonical; every route does after Task 57 Steps 6/6b except `/`, which is canonical-only with the layout's default title/description by design), `curl -s http://localhost:8788/robots.txt` returns the file, and the route is in `out/sitemap.xml`.
  Do not chase scores by removing features; fix the cause. Then `pkill -f "wrangler pages dev"`.

- [ ] **Step 5: Record Gate 5** in the QA log: the score table (6 report rows × 4 categories), any fixes with commit hashes, and `Result: PASS — <date>`.

- [ ] **Step 6: Commit.**

```bash
git add docs/qa/2026-07-01-phase2-qa-log.md && git commit -m "chore(qa): phase 2 QA gate 5 — Lighthouse >=95 all categories"
```

---

### Task 66 (H13): FINAL — present the preview to Kevin and STOP (no production deploy without explicit approval)

**Files:**
- Modify: `docs/qa/2026-07-01-phase2-qa-log.md`

**Interfaces:** Consumes: all five passed gates. Produces: the launch handoff. **This task ends the plan. It does NOT deploy.**

- [ ] **Step 1: Final green sweep** (everything at once, from a clean state):

```bash
cd web && npm test && npm run lint && npm run build
```

Expected: all exit 0.

- [ ] **Step 2: Start the preview for Kevin's review.**

```bash
cd web && NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm run preview
```

Leave it running at `http://localhost:8788`.

- [ ] **Step 3: Present to Kevin.** Deliver this summary (verbatim structure, fill in gate dates):

> **KCOH v2 Phase 2 is ready for your review at http://localhost:8788** (launch-fidelity preview: redirects, headers, and the contact Function are live).
>
> Worth clicking: the four case pages under /work/ (each in its product's color), the playable /dashboard demo, the contact page (form runs on the REAL Turnstile + Resend keys — stored 2026-07-01 in web/.env.local and web/.dev.vars, kcoh.ca verified in Resend — so a preview submit delivers an actual email to inquiries@kcoh.ca), and the old v1 URLs (e.g. /portfolio.html) which now 301.
>
> All QA gates passed (docs/qa/2026-07-01-phase2-qa-log.md): tests/lint/build, full a11y pass, both-themes/both-widths review of every route, e2e form + redirects, Lighthouse ≥ 95.
>
> Needs your input before launch: (1) fact-check pass on the case-study Problem/System/Outcome copy; (2) the availability truth — v1 says both "currently taking on new projects" and "2026 is fully booked"; (3) Success/FrostyNow one-liners; (4) the production deploy path decision (Step 4 below — the `kcoh` Pages project is Git-connected).

- [ ] **Step 4: STOP.** Production deploy happens ONLY on Kevin's explicit approval. Session facts already banked (2026-07-01): wrangler is OAuth-authenticated on this machine; `web/wrangler.toml` already carries `name = "kcoh"`; real keys live in `web/.env.local` (Turnstile site key — `next build` reads it automatically) and `web/.dev.vars` (Resend + Turnstile secrets); kcoh.ca is `verified` in Resend (DKIM + SPF green). Remaining launch steps (documented here, NOT executed now): `npx wrangler pages secret put RESEND_API_KEY --project-name kcoh` and `npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name kcoh` (paste the values from `web/.dev.vars`) → **choose the deploy path, because the `kcoh` project is Git-connected and Cloudflare is expected to reject direct uploads to it**: **Option A (recommended)** — dashboard → Workers & Pages → `kcoh` → Settings → Builds & deployments: root directory `web`, build command `npx next build`, output `out`, env var `NODE_VERSION=22`; then deploy = `git push` to the production branch (keeps Git integration + branch previews); **Option B** — `npx wrangler pages project create kcoh-v2` (direct upload), `npm run deploy -- --project-name kcoh-v2`, verify on kcoh-v2.pages.dev, then move the `kcoh.ca` custom domain from `kcoh` to `kcoh-v2` in the dashboard (instant cutover, keeps old project as rollback); if a trial `npm run deploy` against `kcoh` is NOT rejected (Cloudflare behavior may have changed), that's Option 0 — simplest → manual dashboard steps either way: WAF rate limit (~5/min/IP) on `/api/contact`, optional DMARC record → re-verify the six 301s and one form submit against production. Legacy v1 files at the repo root remain untouched until the approved cutover (spec §10).

- [ ] **Step 5: Record Gate 6** in the QA log: `Result: PRESENTED — awaiting Kevin's explicit approval; production deploy not run.` and the date.

- [ ] **Step 6: Commit.**

```bash
git add docs/qa/2026-07-01-phase2-qa-log.md && git commit -m "chore(qa): phase 2 QA gate 6 — preview presented, awaiting approval for production deploy"
```

---
