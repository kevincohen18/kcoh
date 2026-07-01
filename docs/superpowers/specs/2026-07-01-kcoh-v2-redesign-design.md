# KCOH Software Inc. — Website V2 — Design Spec

- **Date:** 2026-07-01
- **Status:** Approved direction. Phase 1 = Foundation + Homepage.
- **Branch:** `v2-redesign`
- **Owner:** Kevin Cohen (Founder)

---

## 1. Goal & Positioning

Rebuild `kcoh.ca` **from scratch** as a premium, restrained, editorial software-company site — the **Linear / Vercel / Stripe / Mercury** tier. A visitor's first thought must be **"this company builds serious software,"** not "another agency" and not "an AI landing page."

**The signature (non-negotiable):**
1. Editorial **serif display headlines** (Canela feel; **ships as Fraunces**).
2. **Violet accent** `#6E63FF` used sparingly (a seasoning, never a wash).
3. **Live DOM software-dashboard compositions** as the hero and showcase visuals — real components, dark + light, not images.
4. **Huge whitespace**, strong 12-column alignment, subtle **sub-400ms** motion.

**Preserve:** the KCOH name, real facts (projects, services, pricing, founder story), the Cal.com booking link, `inquiries@kcoh.ca`, and existing logo/image assets.
**Retire:** the gold palette, the freelancer/agency framing, and 100% of the v1 code.

---

## 2. Scope & Phasing

**Phase 1 (this spec):**
- Next.js app + design system + theming + layout shell + Cloudflare deploy pipeline.
- The reusable **dashboard component system** (the two dashboards — dark + light — are first-class deliverables).
- The complete **Homepage** (all sections below).

**Phase 2+ (later specs):** Services, Work, About, Process, and Let's Talk (contact) pages; expanded dashboard library; then (deferred) an Insights/blog subsystem and French i18n.

**English-only now, i18n-ready architecture.** No blog yet.

---

## 3. Brand, Projects & Assets

### Featured projects (real details — carry facts, rewrite voice)

| Project | What it is | Color identity | Assets on hand |
|---|---|---|---|
| **Draftery** | Smart contract creation & e-signature platform | Violet `#6E63FF` | `Draftory-Logo.png`, `Email_Draftory_Logo.png` |
| **Concordia Connect** | Student networking app for Concordia University — iOS (SwiftUI) + web + realtime chat, Apple/Google sign-in. *"Connect. Belong. Succeed."* | **Burgundy** `#8B1D3F` (real brand; prompt said "blue" — flagged) | `Concordia_Connect_Icon.PNG`, `Concordia Connect LOGO Clear BG.png` |
| **Skyroa** | Secure escrow & KYC for digital transactions | Indigo | `skyroa-logo.png` |
| **AutoMedic** | Real-time booking & operations platform for mobile mechanics | Green | `Automedic Logo no text.png` |
| **Success** | (to confirm — precious-metals / valuation product line) | Orange | `Success logo.png`, `MetalWorth_Logo_Clear.png` |
| **FrostyNow** | (to confirm — details thin) | Ice blue `#6BE5FF` | `FrostyNow-Logo.png` |

Homepage **Featured Work** leads with the strongest 3–4 (Draftery, Concordia Connect, Skyroa, AutoMedic); the rest appear in the client/logo row.

### Fonts
- **Display / headlines:** **Fraunces** (variable serif, high-contrast, italic) via `next/font/google`, exposed as `--font-display`. **Canela Deck trial** stays in-repo for local visual comparison **only** (never shipped — trial license).
- **Body / UI:** **Geist** via `next/font`, `--font-sans`. **Geist Mono** for eyebrows/code accents if needed.
- The headline family is a **single swappable token** — flipping Fraunces→Canela later is one change.

### Kept assets
Project/client logos above, `App Store Icon.png`, Apple logo, founder headshot (**source file needed — open item**). Favicon/wordmark are **redrawn off-gold** to the new violet/mono identity.

### Canonical design references (in repo root)
- `Dark_Mode_Dash.PNG` — the dark dashboard to reproduce as a **live component**.
- `Light_Mode_Dash.PNG` — the light-theme counterpart.
- `MOCKUP-NEW.PNG` — the full homepage inspiration mockup.

The dashboards now carry KCOH's **real** data labels — projects Concordia Connect / Draftery / Skyroa / AutoMedic / Success / FrostyNow, user `john@kcoh.ca`, revenue $128,430, invoices INV-2026-00x. Reproduce these labels in the built dashboards (sample/illustrative data is fine).

---

## 4. Technical Foundation

> **Verified 2026-07 by research workflow** (`kcoh-v2-foundation-research`) against current docs, and cross-checked against KCOH's own **Concordia Connect** web client (already static → Cloudflare Pages + `_headers`/`_redirects` + Resend + CF Web Analytics). This is a drop-in continuation of the v1 static-Pages model — **zero server runtime, no adapter, no cold starts.**

**Stack (pinned):**
- **Next.js `16.2.x`** (App Router) · **React `19.2`** · **TypeScript** (strict) · **Node 22 LTS** (build). Pin to 16.2.x — avoid 14.x (OpenNext drops Next 14 in Q1 2026, foreclosing the future Workers path).
- **Tailwind CSS `v4`** (`@tailwindcss/postcss`) + **shadcn/ui** (`npx shadcn init`, Radix, vendored). *Note v4 differences:* dark variant via `@custom-variant dark (&:where(.dark, .dark *));` in `globals.css` (no `tailwind.config darkMode`); tokens in `@theme inline`.
- **motion `12`** (`import { ... } from 'motion/react'` — the renamed framer-motion) · **lucide-react** · **next-themes `0.4.6`**.
- **Charts:** hand-built **SVG** components (themeable). Client components must carry `'use client'`; DOM measurement gated behind `useEffect`.

**Rendering — static export:**
```ts
// next.config.ts
output: 'export',              // emits ./out at `next build`
images: { unoptimized: true }, // REQUIRED or next/image fails the build
trailingSlash: true,           // directory-style URLs on static hosting
```
Do **not** use `headers()`/`redirects()`/`rewrites()` (ignored under export → use `public/_headers` + `public/_redirects`). Every dynamic route (`/work/[slug]`) must export `generateStaticParams()` (`dynamicParams` stays `false`). `<html suppressHydrationWarning>` for next-themes.

**Theming:** next-themes Provider (`'use client'`) with `attribute='class'`, `defaultTheme='dark'`, `enableSystem={false}`, `disableTransitionOnChange`.

**Fonts (self-hosted via `next/font`, baked into `/out`):**
- **Body:** the official **`geist`** package (`geist/font/sans` → `--font-geist-sans`; `GeistMono` if needed).
- **Headline serif (production): Fraunces** via `next/font/google` (`axes:['opsz']`, `style:['normal','italic']`, `--font-fraunces`). **This is what ships** — it also **resolves the Canela trial-license launch blocker** (Canela never ships).
- **Canela (local-only):** `next/font/local` behind a dev flag for visual comparison; convert/subset `.otf → .woff2` via `pyftsubset … --flavor=woff2 --layout-features='*' --no-hinting --desubroutinize` (needs `fonttools`+`brotli`). Weight+style required per entry (non-variable).
- **Token stack** (Tailwind `@theme inline`): `--font-serif: var(--font-fraunces), Georgia, 'Times New Roman', serif;` `--font-sans: var(--font-geist-sans), system-ui, sans-serif;` (prepend `var(--font-canela)` locally). **Never** put Fraunces/Canela in next/font's `fallback` array — it won't resolve the hashed family. All font-variable classNames on `<html>`.

**Images:** keep `next/image` (lazy, explicit `width`/`height` for CLS, `priority`, `sizes`) with `unoptimized`; pre-optimize sources to AVIF/WebP at display widths via a build-time **`sharp`** `opt:img` script. Live-DOM hero → no heavy LCP image.

**Contact form — Cloudflare Pages Function** (`web/functions/api/contact.ts`, deploys alongside static assets, no adapter): client POSTs `{name,email,subject,message,turnstileToken}` → Function (1) checks **honeypot + min-time-to-submit**, (2) verifies **Turnstile** server-side (`challenges.cloudflare.com/turnstile/v0/siteverify`, use `CF-Connecting-IP`; tokens single-use/300s → reset widget after submit), (3) sends via **Resend** REST (`from` = verified-domain address, visitor in `reply_to`). Widget: **`@marsidev/react-turnstile`** (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`). Secrets `RESEND_API_KEY` / `TURNSTILE_SECRET_KEY` as **encrypted Pages secrets**. Add DKIM/SPF/DMARC + a WAF **rate-limit** (~5/min/IP) on `/api/contact`. Replaces EmailJS.

**Headers / CSP:** port `_headers` into `web/public/`; add `https://challenges.cloudflare.com` to **`script-src` AND `frame-src`**, remove `*.emailjs.com`, keep Cloudflare Insights, `connect-src 'self'`. Immutable 1yr cache on `/_next/static/media` (hashed). `_redirects` maps old `/*.html` → new routes.

**Repo layout & deploy:** Next.js app in **`web/`**; legacy v1 stays at root and keeps serving until launch. Cloudflare Pages (Git integration): **root directory `web`**, preset **"Next.js (Static HTML Export)"**, build `npx next build`, output `out`, **`NODE_VERSION=22`** + committed `.nvmrc`. `_headers`/`_redirects`/`robots.txt`/favicon live in `web/public/`; Pages Functions in `web/functions/`. At go-live, flip the production Pages project to build `web/`.
*Escalation (not now):* `@opennextjs/cloudflare` → Cloudflare **Workers** only if SSR/ISR/middleware/server-image-opt is ever needed; the Function logic ports to a Route Handler unchanged.

**Analytics / SEO:** Cloudflare Web Analytics; Next Metadata API, canonical, OG/Twitter, `Organization` JSON-LD, `sitemap.xml`, `robots.txt`, `_redirects` for old paths.

---

## 5. Design System

### Color tokens

**Dark (default)**

| Role | Value |
|---|---|
| Background | `#05070B` |
| Section bg | `#0A0D14` · `#0D111A` |
| Card | `#111723` |
| Border | `rgba(255,255,255,.08)` |
| Text primary / secondary / muted | `#F6F7FB` · `#9AA4B2` · `#6E7786` |
| Accent (violet) | `#6E63FF` |
| Highlight (ice) | `#6BE5FF` |

**Light**

| Role | Value |
|---|---|
| Background | `#FAFAFB` |
| Card | `#FFFFFF` |
| Border | `#E5E7EB` |
| Text primary / secondary | `#0F172A` · `#64748B` |
| Accent (violet) | `#6E63FF` |

Status colors (dashboards): green (positive/paid), amber (pending), red (overdue/negative).

**Accent rule:** violet appears on links, focus rings, active states, one hero gradient moment, and small data highlights — **never** as a large fill.

### Typography
- Display: `clamp(64px → 84px)`, Fraunces, tight leading, italic used for the emphasized headline fragment.
- Body: `18–20px`, Geist.
- Eyebrow/section label: `12px`, uppercase, `0.25em` tracking, muted.

### Space, shape, motion
- **Grid:** 12-col, container ~`1240px`, generous margins; every section on the same rhythm.
- **Radius:** cards `18px`.
- **Elevation:** hairline border + tiny shadow. **Hover:** `translateY(-2px)` + border-brighten + faint violet glow.
- **Reveal:** fade + rise on scroll (Framer `whileInView`, staggered, once).

---

## 6. Component Inventory (Phase 1)

**Primitives (shadcn/ui):** Button (`primary` / `secondary` / `ghost`), Card, Badge, Tabs, Accordion, Input / Textarea / Select, Dropdown, Tooltip, Separator.

**Custom site components:** `SectionLabel` (eyebrow), `Section`/`Container` (grid rhythm), `StatBlock` (count-up), `ProjectCard` (per-product color identity + mini dashboard), `ProcessStep`, `ServiceItem`, `ThemeToggle`, `Nav` (sticky, transparent→blur on scroll, mobile sheet), `Footer`, `CTASection`, `FaqAccordion`, `LogoRow`, `Signature`.

**Dashboard system (`components/dashboard/`) — the two required designs:**
`DashboardFrame`, `SidebarNav`, `MetricCard`, `AreaChart` (SVG), `BarChart` (SVG), `DonutGauge` (SVG), `Sparkline`, `ActivityFeed`, `InvoiceTable`, `ProjectProgressList`. Composed into **`HeroDashboard`** (layered, floating, perspective), **`ProcessDashboard`**, and **`ProductPreview`** minis. Every part is **theme-aware (dark + light)** and matches the two provided dashboard designs. An `/export` route screenshots any composition to PNG for OG/social/decks.

---

## 7. Homepage Information Architecture

Merged the master-prompt section list with the mockup, **collapsing overlaps so no section repeats** (an explicit brand rule):

1. **Nav** — sticky, blur-on-scroll · wordmark · Services / Work / About / Process · theme toggle · **Let's Talk** (Cal.com).
2. **Hero** — eyebrow "SOFTWARE THAT RUNS BUSINESSES" · editorial headline with a serif-italic emphasis fragment · subhead · **Book a Conversation** + **See What We've Built** · **live floating `HeroDashboard`**.
3. **Metrics** — 7-figure · 2,600+ · 10+ · 100% (subtle count-up).
4. **Featured Work** *(merges Featured Products + Case Studies)* — `ProjectCard`s with per-product color identity + live mini-dashboard preview + tech + CTA. Lead with the top 3–4.
5. **How We Work (Process)** — 4 numbered steps (Map the System → Find the Leverage → Build and Ship → Support and Iterate) beside a live `ProcessDashboard`. *(Absorbs "Client Journey" — the steps are the journey.)*
6. **What We Do (Services)** — 6-service grid (Custom Software, Automation, Financial Systems, Integrations, iOS Development, Ongoing Support) + a "Let's talk" CTA card.
7. **Operating Philosophy** *(merges Founder + philosophy)* — "I've built, scaled, and operated every system we deliver." + signature + headshot.
8. **Technologies** — quiet tech row (React, Next.js, TypeScript, Swift/SwiftUI, Node, PostgreSQL, Cloudflare…).
9. **Testimonial + client logos** — the quote + Concordia Connect / Draftery / Skyroa / AutoMedic / FrostyNow row.
10. **FAQ** — accordion (v1 items, rewritten to voice).
11. **Final CTA** — closing "Let's talk about what you're building."
12. **Footer** — expanded (brand · nav · connect · © 2026 KCOH Software Inc.).

Copy is **rewritten to the new editorial voice; facts preserved** from v1 + Concordia Connect.

---

## 8. Accessibility & Performance
- **WCAG AA:** verify violet-on-dark and muted-text contrast; `focus-visible` rings; semantic landmarks; full keyboard nav; `prefers-reduced-motion`.
- **Perf:** static export, self-hosted fonts (`display: swap`), no LCP hero image (live DOM), below-fold lazy, code-split dashboards. Lighthouse target **≥95** across the board.

---

## 9. Out of Scope (Phase 1) / Deferred
Insights/blog · French i18n · the other full pages (Phase 2) · dashboard screens beyond what the homepage needs · any CMS · e-commerce.

---

## 10. Open Items (need input, non-blocking — I build with placeholders and swap)
1. **Founder headshot** — source image file for the Operating Philosophy section.
2. **Concordia Connect color** — real brand is burgundy `#8B1D3F`; master prompt said blue. Defaulting to real brand; confirm.
3. **"Success" / FrostyNow** — thin details; confirm one-line descriptions + whether featured or logo-row only.
4. **Resend** — verified sending domain + API key (or say "use EmailJS for now").
5. **Cloudflare Turnstile** — site/secret keys when ready (dev uses Cloudflare's test keys meanwhile).

## 11. Technical Guardrails (load-bearing — from research)
- **Canela license:** resolved by shipping Fraunces; Canela never ships (trial EULA forbids production). Do not embed Canela woff2 in a production build.
- **Node 22** on Cloudflare (`NODE_VERSION=22` + `.nvmrc`) or the Next 16 build fails.
- **`images.unoptimized: true`** is mandatory under static export, else `next/image` fails the build; pre-optimize assets with `sharp`.
- **`'use client'`** on every interactive/browser-API component (shadcn interactives, motion, theme toggle, SVG charts reading `window`) + `<html suppressHydrationWarning>` — or the export build errors / hydration warns.
- **Fraunces fallback only works as a CSS var stack**, not next/font's `fallback` array.
- **Turnstile:** tokens single-use / 300s (reset widget after submit); CSP must allow `challenges.cloudflare.com` in **both** `script-src` and `frame-src`; use `CF-Connecting-IP`. Secrets stored **encrypted**.
- **Resend:** `from` must be on the verified domain (visitor → `reply_to`); free tier 100/day — Turnstile + honeypot + WAF rate-limit are load-bearing, not optional.
- **Static export forbids** SSR/ISR/middleware/Server Actions/runtime Route Handlers — needing any is the explicit signal to migrate to `@opennextjs/cloudflare` (Workers).
