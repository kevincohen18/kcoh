# KCOH Software Inc. — Website V2, Phase 2 — Full Business Site — Design Spec

- **Date:** 2026-07-01
- **Status:** Approved direction. Phase 2 = homepage completion + all pages + contact backend + playable demo + deploy pipeline.
- **Predecessor:** `2026-07-01-kcoh-v2-redesign-design.md` (Phase 1 — foundation + homepage). All Phase 1 tokens, stack pins, and technical guardrails carry forward unchanged and are not repeated here.
- **Owner:** Kevin Cohen (Founder)

---

## 1. Goal

Take the Phase 1 beta (homepage ~70% complete, no subpages, no contact backend) to a **complete, launch-ready business website**: nothing dead-ends, every nav route is a real page, interactivity is felt everywhere, and the whole site reads as designed-by-one-hand — professional, modern, explicitly *not* AI-template.

**Approach (chosen from three options): "Deepen the system."** Every new page extends the existing design system and dashboard component library. The signature move: **per-project-colored live dashboard compositions** on case-study pages — real components re-skinned in each product's brand palette.

## 2. Decisions locked during brainstorming

| Question | Decision |
|---|---|
| Scope | Full business site (homepage completion + all pages + form + demo + deploy) |
| Work depth | `/work` index + individual case pages for Concordia Connect, Drafterie, Skyroa, AutoMedic |
| Contact | Real form (Turnstile + Resend Pages Function) **and** Cal.com booking, two-path page |
| Launch flow | Localhost preview → Kevin approves → production deploy via Wrangler (no auto-cutover) |
| Interactivity | Micro-interactions site-wide **plus** playable `/dashboard` demo |
| About/Process | One combined `/about` page (founder story + method), not two thin pages |
| Success / FrostyNow | Logo row / logo strip only — no case pages (details too thin) |

## 3. Site structure & navigation

```
/                          Homepage (completed to the full 12-section Phase 1 IA)
/services                  Six services, in depth + engagement model strip
/work                      Case-study index (alternating feature rows)
/work/concordia-connect    Case page — burgundy #8B1D3F identity
/work/drafterie            Case page — violet #6E63FF identity
/work/skyroa               Case page — indigo identity
/work/automedic            Case page — green identity
/about                     Founder story + How We Work (absorbs Process)
/contact                   Book a call (Cal.com) + real contact form
/dashboard                 Playable product demo (upgraded from static composition)
404                        Branded not-found page
```

- **Nav:** real routes — Services / Work / About / Contact + theme toggle + **Let's Talk** button → `/contact`. Footer keeps direct Cal.com link + `inquiries@kcoh.ca` as the zero-friction path.
- **Spelling:** the product is **Drafterie** (standardized in commit `55b1468`; Phase 1 spec's "Draftery" is superseded).
- **Redirects (`web/public/_redirects`):** `/portfolio.html → /work/`, `/services.html → /services/`, `/about.html → /about/`, `/contact.html → /contact/`, `/index.html → /`, plus any other live v1 URLs discovered at build time. Static export note: Next's `redirects()` is ignored under `output: 'export'` — `_redirects` is the mechanism.
- Case routes ship via `generateStaticParams()` with `dynamicParams: false`.

## 4. Homepage completion (5 changes)

1. **Featured Work rebuilt** — two-across feature cards, each carrying its project's brand color as border glow, eyebrow, and chart accents (never a fill). Each card embeds a **live mini-preview from dashboard primitives, themed per product**: Concordia = community/chat metrics; Drafterie = contract-signature pipeline; Skyroa = escrow/KYC status flow; AutoMedic = booking queue. Hover animates the preview (chart draws, a status flips). Cards link to case pages.
2. **Technologies row** — muted mono strip: React, Next.js, TypeScript, Swift/SwiftUI, Node, PostgreSQL, Cloudflare.
3. **FAQ accordion** — v1 questions (pricing, timelines, code ownership, support) rewritten to the editorial voice.
4. **Final CTA** — full-width close: "Let's talk about what you're building." + Book a Conversation + email link.
5. **Expanded footer** — four columns: brand + one-liner · site nav · the four case studies · connect (LinkedIn, email, Cal.com). Legal line.

## 5. Work pages

**`/work` index:** editorial hero → alternating full-width feature rows (one per project, in its color identity: logo, one-liner, three fact chips, live mini-preview, "Read the case study →") → quiet Success/FrostyNow logo strip → closing CTA.

**`/work/[slug]` template (one template, four instances):**
- **Hero:** subtle project-color gradient tint on the base background, logo, name, what-it-is line, scope/stack chips, and a full **live dashboard composition re-skinned in the project palette**.
- **Body:** The Problem → The System We Built (feature blocks with small live components) → The Outcome (stat blocks, count-ups) → tech row → next-project pager + CTA.
- **Color mechanism:** per-project accent drives eyebrows, links, chart accents, and gradient tints via a CSS custom-property override on the page wrapper; global UI (nav, buttons) stays violet.
- **Content:** drafted from real facts in `web/content/projects.ts` + v1 copy; **Kevin fact-check pass required before launch** (open item).

## 6. Services page

Each of the six services (Custom Software, Automation, Financial Systems, Integrations, iOS Development, Ongoing Support) becomes a substantial block: serif heading, problem-it-solves paragraph, "what this looks like" deliverables list, and — where apt — a small live visual (Automation: workflow status feed; Financial Systems: revenue mini-chart). Then an **"How engagements work"** strip (discovery call → proposal → build → support; carry any real v1 pricing/engagement facts) and the closing CTA band.

## 7. About page

Founder story expanded from the homepage teaser (7-figure platform operated from the inside, 2,600+ members, systems-not-wireframes philosophy) + headshot → **How We Work**: the four steps, each expanded with what actually happens, beside the live process dashboard → operating principles → CTA.

## 8. Contact page + form backend

**Page — two-path split:**
- **Left "Book a conversation":** Cal.com scheduler embed with plain-link fallback (existing 30-min consultation URL in `content/nav.ts`).
- **Right "Or write to us":** form — name, email, company (optional), message, Turnstile widget. States: sending → sent / error; error falls back to a pre-filled `mailto:` so no lead is lost.
- Below: `inquiries@kcoh.ca`, LinkedIn, response-time promise.

**Backend — Cloudflare Pages Function `web/functions/api/contact.ts`** (deploys automatically with `wrangler pages deploy`):
1. Reject if honeypot filled or time-to-submit < ~3s.
2. Verify Turnstile token server-side (`challenges.cloudflare.com/turnstile/v0/siteverify`, `CF-Connecting-IP`; tokens single-use/300s → widget resets after submit).
3. Send via Resend REST — `from` on verified kcoh.ca domain, visitor in `reply_to`.

Secrets: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` (encrypted Pages secrets); `NEXT_PUBLIC_TURNSTILE_SITE_KEY` at build. **Dev/test = Cloudflare's public test keys**, works fully under `wrangler pages dev`. CSP (`_headers`): add `challenges.cloudflare.com` to `script-src` **and** `frame-src`; add Cal.com embed domains (`app.cal.com`, `cal.com`) to `frame-src`/`script-src` as required by the embed; remove all EmailJS entries. Manual dashboard step at launch: WAF rate limit (~5/min/IP) on `/api/contact`; DKIM/SPF/DMARC for the sending domain.

## 9. Interactivity & motion

All sub-400ms, once-per-scroll, gated by the existing `use-reduced-motion` hook; springs over easings; off on touch where cursor-driven.

- **Dashboard tilt:** hero + case-page compositions get ~2° cursor-aware perspective tilt, springing to rest; visible "Explore the live demo →" affordance → `/dashboard`.
- **Charts draw on scroll:** area paths sweep, bars stagger, donut fills.
- **Project cards:** brand-color border glow tracks hover; mini-preview ticks while hovered.
- **Buttons:** slight magnetic pull + press state. **Nav:** active-route indicator (blur-on-scroll stays). **Page mounts:** gentle fade-rise.

**Playable `/dashboard` demo:** clickable sidebar (Overview / Projects / Invoices / Analytics screens), sortable invoice table, chart hover tooltips, in-frame theme toggle, simulated live-ticking data. Client-side only. Framed "This is the kind of system we build — click around." Linked from hero, Services, case pages. Code-split (dynamic import) so it never weighs page one.

## 10. Deploy pipeline

- `web/wrangler.toml` (`pages_build_output_dir = "out"`, project name for kcoh.ca Pages project).
- npm scripts: `preview` → build + `wrangler pages dev` (Functions work on localhost); `deploy` → build + `wrangler pages deploy` to production — **run only on Kevin's approval** (workflow: localhost review → approve → prod).
- `web/public/`: `_headers` (updated CSP), `_redirects`, `robots.txt`; per-page Metadata API (canonical, OG/Twitter images — static branded PNGs), `Organization` JSON-LD, `app/sitemap.ts` extended to all routes; branded 404.
- Legacy v1 files at repo root remain untouched until approved cutover.

## 11. Quality gates (pre-ship, all verified before Kevin reviews)

- **A11y:** WCAG AA contrast both themes; full keyboard nav (accordion, tabs, form, demo); `focus-visible` rings; reduced-motion path exercised.
- **Perf:** Lighthouse ≥95 all categories; demo code-split; fonts already self-hosted; case/OG images pre-optimized (sharp script if needed).
- **Verification:** every route rendered and visually checked in both themes at 360px and 1440px; contact form exercised end-to-end with test keys under `wrangler pages dev`; `_redirects` behavior tested; `next build` clean.
- **Tests:** vitest stays for logic (chart geometry, hooks); contact Function validation extracted pure and unit-tested.

## 12. Implementation approach

Per standing rule: **subagent-driven** — the implementation plan decomposes into independent tasks (homepage sections, each page, Function, demo, deploy config) dispatched to subagents in waves with verification between waves.

## 13. Open items (non-blocking — build with placeholders/test keys and swap)

1. **Resend:** API key + kcoh.ca domain verification (DKIM/SPF/DMARC) — form ships on test keys until provided.
2. **Turnstile:** real site/secret keys from Cloudflare dashboard.
3. **Case-study facts:** Kevin's correction pass on drafted Problem/System/Outcome copy before launch.
4. **Success / FrostyNow one-liners** for the `/work` logo strip (cosmetic).
5. **WAF rate limit + email DNS records:** manual Cloudflare dashboard steps at launch.
6. **Pages project name** for `wrangler.toml` (existing kcoh.ca project identifier).

## 14. Out of scope (unchanged from Phase 1 spec)

Insights/blog · French i18n · CMS · e-commerce · additional dashboard screens beyond the demo's four · Workers/SSR migration.
