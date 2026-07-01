# KCOH V2 — Phase 1 (Foundation + Homepage) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a premium, editorial, dual-theme KCOH marketing homepage (Linear/Vercel/Stripe tier) as a Next.js 16 static export on Cloudflare Pages, with a reusable live-DOM dashboard system reproducing the reference designs.

**Architecture:** Next.js 16 App Router in `web/`, statically exported (`output: 'export'`) to Cloudflare Pages. All design tokens as CSS variables in Tailwind v4 `@theme inline`, dark default via next-themes class strategy. UI = shadcn/ui primitives + custom section/dashboard components. Dashboards are hand-built themeable SVG. Motion via `motion@12`, reveal-on-scroll, ≤400ms, reduced-motion aware.

**Tech Stack:** Next.js 16.2.x · React 19.2 · TypeScript (strict) · Tailwind v4 · shadcn/ui · motion@12 · next-themes 0.4.6 · lucide-react · geist + Fraunces (next/font) · Vitest + RTL (logic tests) · Playwright (visual/e2e).

## Global Constraints

*(verbatim from spec — every task inherits these)*

- **Next.js `16.2.x`, React `19.2`, Node `22 LTS`** (build). Pin Next 16.2.x; never 14.x.
- **Static export:** `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`. No `headers()`/`redirects()`/`rewrites()` in next.config. Every dynamic route exports `generateStaticParams()`.
- **`'use client'`** on every interactive/browser-API component; `<html suppressHydrationWarning>`.
- **Tailwind v4:** dark variant via `@custom-variant dark (&:where(.dark, .dark *));`; tokens in `@theme inline`. No `tailwind.config` `darkMode`.
- **next-themes:** `attribute='class'`, `defaultTheme='dark'`, `enableSystem={false}`, `disableTransitionOnChange`.
- **Fonts:** ship **Fraunces** (serif) + **Geist** (sans); Canela is **local-only**, never in a production build. Fallback only via CSS var stack, never next/font `fallback` array.
- **Color tokens (dark):** bg `#05070B`; sections `#0A0D14`/`#0D111A`; card `#111723`; border `rgba(255,255,255,.08)`; text `#F6F7FB`/`#9AA4B2`/`#6E7786`; accent `#6E63FF`; highlight `#6BE5FF`.
- **Color tokens (light):** bg `#FAFAFB`; card `#FFFFFF`; border `#E5E7EB`; text `#0F172A`/`#64748B`; accent `#6E63FF`.
- **Type:** display `clamp(64px,6vw,84px)` Fraunces; body 18–20px Geist; eyebrow 12px uppercase `0.25em`.
- **Card radius 18px.** Hover: `translateY(-2px)` + border-brighten + faint violet glow. **Accent is a seasoning — never a large fill.**
- **Motion ≤400ms, ease-out, `prefers-reduced-motion` respected.**
- **Copy:** no em-dashes (house rule, per v1 history); rewrite facts to editorial voice, invent no new facts.
- **Reference images** (repo root, one level up from `web/`): `Dark_Mode_Dash.PNG`, `Light_Mode_Dash.PNG`, `MOCKUP-NEW.PNG` — the visual source of truth.

---

## File Structure

```
web/
  next.config.ts                 # export, unoptimized, trailingSlash
  postcss.config.mjs             # @tailwindcss/postcss
  .nvmrc                         # 22
  package.json
  app/
    layout.tsx                   # html lang, font vars, suppressHydrationWarning, Providers
    page.tsx                     # homepage — composes sections
    globals.css                  # @theme tokens, @custom-variant dark, base
    providers.tsx                # 'use client' ThemeProvider
    export/page.tsx              # PNG-capture surface for OG/social (Phase 1: hero + dashboard)
  components/
    ui/                          # shadcn primitives (button, card, badge, accordion, tabs, input, ...)
    site/
      container.tsx section.tsx section-label.tsx
      nav.tsx footer.tsx theme-toggle.tsx
      reveal.tsx                 # motion reveal-on-scroll
      cta-section.tsx logo-row.tsx signature.tsx
    sections/
      hero.tsx metrics.tsx featured-work.tsx process.tsx
      services.tsx philosophy.tsx technologies.tsx
      testimonial.tsx faq.tsx final-cta.tsx
    dashboard/
      charts/area-chart.tsx bar-chart.tsx donut-gauge.tsx sparkline.tsx
      metric-card.tsx activity-feed.tsx invoice-table.tsx
      project-progress.tsx sidebar-nav.tsx dashboard-frame.tsx
      hero-dashboard.tsx overview-dashboard.tsx process-dashboard.tsx product-preview.tsx
    project-card.tsx service-item.tsx process-step.tsx stat-block.tsx
  lib/
    fonts.ts                     # Geist + Fraunces (+ Canela local flag)
    utils.ts                     # cn()
    hooks/use-count-up.ts use-reduced-motion.ts use-parallax.ts
    charts/geometry.ts           # data -> SVG path math (pure, tested)
  content/
    projects.ts services.ts faq.ts metrics.ts founder.ts nav.ts technologies.ts
  public/
    _headers _redirects robots.txt favicon.svg
    logos/ (draftery, concordia, skyroa, automedic, success, frostynow)
  lib/__tests__/ ...             # vitest
  e2e/                           # playwright visual + a11y
```

---

## Group A — Foundation & Deploy

### Task A1: Scaffold Next.js 16 app in `web/`

**Files:** Create `web/` (via create-next-app), `web/.nvmrc`.

**Interfaces:** Produces the `web/` app root all later tasks live in.

- [ ] **Step 1: Scaffold**

```bash
cd "KCOH Software Inc."
npx create-next-app@16 web --ts --app --tailwind --eslint --src-dir=false --import-alias "@/*" --no-turbopack --use-npm
```

- [ ] **Step 2: Pin versions + Node**

```bash
cd web
npm pkg set dependencies.next="16.2.9" dependencies.react="19.2.7" dependencies.react-dom="19.2.7"
printf '22\n' > .nvmrc
npm install
```

- [ ] **Step 3: Verify dev + build**

Run: `npm run dev` (open http://localhost:3000, confirm default page) then `Ctrl-C`; `npm run build`.
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add web .gitignore && git commit -m "chore(web): scaffold Next.js 16 app in web/"
```

### Task A2: Static-export config + Tailwind v4 tokens + dark variant

**Files:** Modify `web/next.config.ts`, `web/app/globals.css`; confirm `web/postcss.config.mjs`.

**Interfaces:** Produces the token layer (`bg`, `card`, `border`, `fg`, `fg-muted`, `accent`, etc.) every component consumes via Tailwind utilities (`bg-bg`, `text-fg`, `border-border`, `text-accent`).

- [ ] **Step 1: next.config.ts**

```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
```

- [ ] **Step 2: globals.css — variant, tokens, base**

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --bg: #FAFAFB; --section: #FFFFFF; --section-alt: #F4F5F7;
  --card: #FFFFFF; --border: #E5E7EB;
  --fg: #0F172A; --fg-muted: #64748B; --fg-subtle: #94A3B8;
  --accent: #6E63FF; --highlight: #6BE5FF;
  --pos: #16A34A; --warn: #D97706; --neg: #DC2626;
}
.dark {
  --bg: #05070B; --section: #0A0D14; --section-alt: #0D111A;
  --card: #111723; --border: rgba(255,255,255,.08);
  --fg: #F6F7FB; --fg-muted: #9AA4B2; --fg-subtle: #6E7786;
  --accent: #6E63FF; --highlight: #6BE5FF;
  --pos: #34D399; --warn: #FBBF24; --neg: #F87171;
}

@theme inline {
  --color-bg: var(--bg); --color-section: var(--section); --color-section-alt: var(--section-alt);
  --color-card: var(--card); --color-border: var(--border);
  --color-fg: var(--fg); --color-fg-muted: var(--fg-muted); --color-fg-subtle: var(--fg-subtle);
  --color-accent: var(--accent); --color-highlight: var(--highlight);
  --color-pos: var(--pos); --color-warn: var(--warn); --color-neg: var(--neg);
  --radius-card: 18px;
  --font-serif: var(--font-fraunces), Georgia, "Times New Roman", serif;
  --font-sans: var(--font-geist-sans), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}

* { border-color: var(--color-border); }
body { background: var(--color-bg); color: var(--color-fg); font-family: var(--font-sans); }
```

- [ ] **Step 3: Verify build emits `out/`**

Run: `npm run build` then `ls out/index.html`.
Expected: `out/index.html` exists.

- [ ] **Step 4: Commit** — `git commit -am "feat(web): static export + Tailwind v4 tokens + dark variant"`

### Task A3: Fonts (Geist + Fraunces) + root layout

**Files:** Create `web/lib/fonts.ts`; modify `web/app/layout.tsx`.

**Interfaces:** Produces `fontVariables` (string of className vars) applied to `<html>`; exposes `--font-geist-sans`, `--font-geist-mono`, `--font-fraunces`.

- [ ] **Step 1: lib/fonts.ts**

```ts
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

export const fontVariables = `${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`;
```

Install: `npm i geist@1.7.2`

- [ ] **Step 2: app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kcoh.ca"),
  title: { default: "KCOH Software Inc.", template: "%s · KCOH Software Inc." },
  description: "We build and operate the systems that scale real companies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify** — `npm run build`; confirm no font errors. **Commit.**

### Task A4: Theme provider + toggle

**Files:** Create `web/app/providers.tsx`, `web/components/site/theme-toggle.tsx`. Install `next-themes@0.4.6`.

**Interfaces:** Produces `<Providers>` (wraps app) and `<ThemeToggle/>` (used by Nav). Consumes `useTheme` from next-themes.

- [ ] **Step 1: providers.tsx**

```tsx
"use client";
import { ThemeProvider } from "next-themes";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
```

- [ ] **Step 2: theme-toggle.tsx**

```tsx
"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  const dark = resolvedTheme === "dark";
  return (
    <button aria-label="Toggle theme" onClick={() => setTheme(dark ? "light" : "dark")}
      className="grid size-9 place-items-center rounded-full border text-fg-muted transition hover:text-fg">
      {m ? (dark ? <Sun size={16} /> : <Moon size={16} />) : <span className="size-4" />}
    </button>
  );
}
```

Install: `npm i next-themes@0.4.6 lucide-react@1.23.0`

- [ ] **Step 3: Verify** toggle flips `.dark` on `<html>` (temporary button on page). **Commit.**

### Task A5: Cloudflare deploy artifacts (`_headers`, `_redirects`, robots)

**Files:** Create `web/public/_headers`, `web/public/_redirects`, `web/public/robots.txt`.

- [ ] **Step 1: public/_headers** (CSP ready for future Turnstile, EmailJS removed)

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), geolocation=(), microphone=(), payment=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; connect-src 'self' https://cloudflareinsights.com; frame-src https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'
/_next/static/media/*
  Cache-Control: public, max-age=31536000, immutable
```

- [ ] **Step 2: public/_redirects** (old v1 paths → new)

```
/index.html      /            301
/about.html      /about/      301
/services.html   /services/   301
/portfolio.html  /work/       301
/contact.html    /contact/    301
```

- [ ] **Step 3: public/robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://kcoh.ca/sitemap.xml
```

- [ ] **Step 4: Verify** files land in `out/` after build. **Commit.**

---

## Group B — Design System Primitives

### Task B1: shadcn init + core primitives

**Files:** `web/components.json`, `web/components/ui/*`, `web/lib/utils.ts`.

**Interfaces:** Produces `cn()` and `<Button>` (`variant: default|secondary|ghost|outline`), `<Card>`, `<Badge>`, `<Accordion>`, `<Tabs>`, `<Input>`, `<Textarea>`, `<Separator>` wired to the token colors.

- [ ] **Step 1:** `npx shadcn@latest init` (choose CSS variables; base color slate). Then `npx shadcn@latest add button card badge accordion tabs input textarea separator dropdown-menu tooltip`.
- [ ] **Step 2:** In each primitive, replace shadcn's default color classes with token classes (`bg-card`, `text-fg`, `border-border`, `bg-accent text-white` for primary). Set Button primary = `bg-accent text-white hover:bg-accent/90`, radius `rounded-full` for pill CTAs, `rounded-[12px]` default.
- [ ] **Step 3: Verify** a scratch page renders Button variants in both themes. **Commit.**

### Task B2: Layout primitives — Container, Section, SectionLabel

**Files:** `web/components/site/container.tsx`, `section.tsx`, `section-label.tsx`.

**Interfaces:**
- `<Container>` — max-width 1240px, responsive padding. Produces `className` merge via `cn`.
- `<Section id? bg?: "bg"|"section"|"section-alt">` — vertical rhythm (`py-24 md:py-32`), optional background token.
- `<SectionLabel>` — eyebrow: 12px, uppercase, `tracking-[0.25em]`, `text-accent`.

- [ ] **Step 1:** Implement all three (each ~15 lines). `Container`: `mx-auto w-full max-w-[1240px] px-6 md:px-10`.
- [ ] **Step 2: Verify** rhythm visually. **Commit.**

### Task B3: Motion primitives + count-up hook (TDD the hook)

**Files:** `web/components/site/reveal.tsx`, `web/lib/hooks/use-count-up.ts`, `web/lib/hooks/use-reduced-motion.ts`, `web/lib/__tests__/use-count-up.test.ts`.

**Interfaces:**
- `<Reveal delay? y?>` — wraps children, `motion` fade+rise on `whileInView` (`once`), disabled under reduced motion.
- `useCountUp(target: number, opts?: { duration?: number; enabled?: boolean }): number` — returns the animated value, ends exactly on `target`, returns `target` immediately when disabled/reduced-motion.

- [ ] **Step 1: Write failing test** (`use-count-up.test.ts`)

```ts
import { renderHook, act } from "@testing-library/react";
import { useCountUp } from "@/lib/hooks/use-count-up";
import { vi } from "vitest";

test("returns target immediately when disabled", () => {
  const { result } = renderHook(() => useCountUp(2600, { enabled: false }));
  expect(result.current).toBe(2600);
});

test("ends exactly on target", () => {
  vi.useFakeTimers();
  const { result } = renderHook(() => useCountUp(100, { duration: 300 }));
  act(() => { vi.advanceTimersByTime(400); });
  expect(result.current).toBe(100);
  vi.useRealTimers();
});
```

- [ ] **Step 2:** Install test tooling: `npm i -D vitest @testing-library/react @testing-library/dom jsdom @vitejs/plugin-react`; add `vitest.config.ts` (jsdom env) and `"test": "vitest run"`. Run test → FAIL.
- [ ] **Step 3:** Implement `useReducedMotion` (reads `matchMedia('(prefers-reduced-motion: reduce)')`, SSR-safe) and `useCountUp` (rAF easing, clamps to target on completion, honors `enabled` + reduced motion). Implement `Reveal` using `motion/react` `whileInView`.
- [ ] **Step 4:** Run `npm run test` → PASS. **Commit.**

### Task B4: Typed content module

**Files:** `web/content/{projects,services,faq,metrics,founder,nav,technologies}.ts`.

**Interfaces:** Produces typed exports consumed by every section. Exact types:

```ts
// content/projects.ts
export type Project = {
  slug: string; name: string; tagline: string; description: string;
  color: string;            // hex accent for the card
  tech: string[]; logo: string; featured: boolean; cta: string;
};
export const projects: Project[]; // Draftery, Concordia Connect, Skyroa, AutoMedic, Success, FrostyNow
```

- [ ] **Step 1:** Author `projects.ts` with real facts from the spec (Draftery = "Smart contract creation and e-signature platform", violet `#6E63FF`; Concordia Connect = "Student networking app for Concordia University. Connect. Belong. Succeed.", burgundy `#8B1D3F`, tech Swift/SwiftUI, Node/TS, PostgreSQL; Skyroa = "Secure escrow and KYC for digital transactions", indigo `#4F46E5`; AutoMedic = "Real-time booking and operations platform for mobile mechanics", green `#16A34A`; Success = placeholder one-liner, orange `#EA580C`; FrostyNow = placeholder one-liner, ice `#6BE5FF`). Mark Draftery/Concordia/Skyroa/AutoMedic `featured: true`.
- [ ] **Step 2:** `services.ts` (6 items: Custom Software, Automation, Financial Systems, Integrations, iOS Development, Ongoing Support — each `{icon, title, blurb}` using Lucide icon names). `metrics.ts` (7-figure/2,600+/10+/100% with labels). `faq.ts` (rewrite v1 items). `founder.ts` (name, role, statement, signature). `nav.ts` (Services, Work, About, Process links + Let's Talk Cal.com URL `https://cal.com/kevin-cohen-utwpmj/consultation`). `technologies.ts` (React, Next.js, TypeScript, Swift, Node, PostgreSQL, Cloudflare).
- [ ] **Step 3: Verify** `tsc --noEmit`. **Commit.**

---

## Group C — Dashboard Component System

> Verify each against `../Dark_Mode_Dash.PNG` and `../Light_Mode_Dash.PNG`. All components theme-aware.

### Task C1: SVG chart geometry (TDD) + chart components

**Files:** `web/lib/charts/geometry.ts`, `web/lib/__tests__/geometry.test.ts`, `web/components/dashboard/charts/{area-chart,bar-chart,donut-gauge,sparkline}.tsx`.

**Interfaces:**
- `linePath(points: number[], w: number, h: number, pad?: number): string` — smooth SVG path `d`.
- `areaPath(points, w, h, pad?): string` — closed area under the line.
- `donutArc(pct: number, r: number, cx: number, cy: number): { d: string; circumference: number }`.
- Components consume these; all accept `className`, read color from `currentColor`/token props, gradient stroke violet→ice.

- [ ] **Step 1: Failing test**

```ts
import { linePath, donutArc } from "@/lib/charts/geometry";
test("linePath starts at first point", () => {
  expect(linePath([0, 10, 5], 100, 50, 0)).toMatch(/^M0,50/);
});
test("donutArc circumference matches radius", () => {
  const { circumference } = donutArc(0.5, 40, 50, 50);
  expect(circumference).toBeCloseTo(2 * Math.PI * 40);
});
```

- [ ] **Step 2:** Run → FAIL. Implement `geometry.ts` (Catmull-Rom→Bézier smoothing for `linePath`, `areaPath` closes to baseline, `donutArc` via stroke-dasharray). Run → PASS.
- [ ] **Step 3:** Build the 4 chart components (SVG, gradient `<defs>` violet→ice, `AreaChart` with axis labels + hover dot, `BarChart` gradient bars per project, `DonutGauge` with center label, `Sparkline` minimal). Gate any DOM measurement behind `useEffect`; provide fixed `viewBox` so SSR/export is stable.
- [ ] **Step 4: Commit.**

### Task C2: Dashboard cards

**Files:** `web/components/dashboard/{metric-card,activity-feed,invoice-table,project-progress,sidebar-nav}.tsx`.

**Interfaces:** `<MetricCard label value delta? spark? gauge?>`; `<ActivityFeed items>`; `<InvoiceTable rows>` (status pill pos/warn/neg); `<ProjectProgress items>` (logo + name + % bar); `<SidebarNav items active>` (icon rows, active = accent pill + chevron).

- [ ] **Step 1:** Implement each to match the reference cards (Revenue Overview, Recent Activity, Live Users, System Health, Top Projects, Revenue by Source, Recent Invoices). Data from inline sample constants matching the reference labels (Concordia Connect 75%, Draftery 60%, Skyroa 45%, AutoMedic 30%, FrostyNow 20%; INV-2026-001..004; $128,430).
- [ ] **Step 2: Commit.**

### Task C3: OverviewDashboard (matches reference PNGs, both themes)

**Files:** `web/components/dashboard/dashboard-frame.tsx`, `web/components/dashboard/overview-dashboard.tsx`.

**Interfaces:** `<DashboardFrame sidebar header>` (card `rounded-[18px]`, sidebar + top bar); `<OverviewDashboard>` composes the full grid (Overview + Live Users + System Health row, Revenue + Projects Overview row, Top Projects + Revenue by Source + Recent Invoices row).

- [ ] **Step 1:** Compose the full dashboard on a scratch route `/scratch/dash`.
- [ ] **Step 2: Visual verify** — Playwright screenshot dark + light, compare side-by-side to `../Dark_Mode_Dash.PNG` / `../Light_Mode_Dash.PNG`. Adjust spacing/color until it reads as the same design.
- [ ] **Step 3: Commit.**

### Task C4: HeroDashboard (layered, floating, perspective)

**Files:** `web/components/dashboard/hero-dashboard.tsx`, `web/lib/hooks/use-parallax.ts`.

**Interfaces:** `<HeroDashboard>` — main revenue card + floating satellite cards (Live Users, System Health, Recent Activity), CSS 3D perspective tilt, layered shadows, soft violet radial glow behind, animated chart draw-in on mount, subtle cursor parallax (`useParallax`, disabled under reduced motion).

- [ ] **Step 1:** Implement composition reusing C1/C2. Perspective via `transform: perspective(1200px) rotateY(-8deg) rotateX(4deg)`; satellites `position: absolute` with staggered `Reveal`.
- [ ] **Step 2:** `useParallax` maps pointer to small translate on satellites (`≤12px`), rAF-throttled, no-op under reduced motion / touch.
- [ ] **Step 3: Visual verify** against the hero region of `../MOCKUP-NEW.PNG`. **Commit.**

### Task C5: ProcessDashboard, ProductPreview, /export route

**Files:** `web/components/dashboard/{process-dashboard,product-preview}.tsx`, `web/app/export/page.tsx`.

**Interfaces:** `<ProcessDashboard>` (the fuller sidebar+content dashboard beside the Process steps in the mockup right panel); `<ProductPreview project>` (mini dashboard tinted to a project's `color`); `/export?target=hero|dash` renders a single composition on a transparent/framed canvas for PNG screenshot.

- [ ] **Step 1:** Implement all three (reuse primitives). `/export` reads `?target` (client component, `generateStaticParams` not needed — static page reads query at runtime client-side).
- [ ] **Step 2: Commit.**

---

## Group D — Layout Shell

### Task D1: Nav (sticky, blur-on-scroll, mobile sheet)

**Files:** `web/components/site/nav.tsx`.

**Interfaces:** Consumes `content/nav.ts`, `<ThemeToggle>`. Transparent at top → `backdrop-blur` + border after scroll (scroll listener in `useEffect`). Desktop: wordmark left, links center/right, ThemeToggle + "Let's Talk" pill (Cal.com) right. Mobile: hamburger → shadcn Sheet.

- [ ] **Step 1:** Implement. Wordmark = `KCOH` (Geist bold) over `SOFTWARE INC.` (11px, `tracking-[0.2em]`, muted). Active/hover link = `text-fg` with accent underline.
- [ ] **Step 2: Verify** scroll state + mobile sheet + keyboard nav. **Commit.**

### Task D2: Footer

**Files:** `web/components/site/footer.tsx`.

**Interfaces:** Expanded footer: brand blurb, nav columns, connect (LinkedIn, `inquiries@kcoh.ca`), `© 2026 KCOH Software Inc. All rights reserved.`

- [ ] **Step 1:** Implement + wire into `app/layout.tsx` (Nav + `{children}` + Footer). **Commit.**

---

## Group E — Homepage Sections

> Each section: `'use client'` only if it uses motion/hooks; wrap content in `<Reveal>`; consume typed content; verify dark + light. Acceptance for each = renders in both themes, matches the corresponding region of `../MOCKUP-NEW.PNG`, responsive at 390/768/1240px, AA contrast.

### Task E1: Hero
**Files:** `web/components/sections/hero.tsx`.
- [ ] Eyebrow "SOFTWARE THAT RUNS BUSINESSES"; H1 `We build and operate` + serif-italic accent fragment `the systems that scale real companies` (`font-serif italic text-accent` on the fragment, gradient optional); subhead (2 lines, no em-dash); CTAs "Book a Conversation" (primary, Cal.com) + "See What We've Built" (`outline`, anchors `#work`); `<HeroDashboard>` right (stacks below on mobile). **Commit.**

### Task E2: Metrics
**Files:** `web/components/sections/metrics.tsx`, `web/components/stat-block.tsx`.
- [ ] 4-col grid (`StatBlock` uses `useCountUp`, triggered on reveal). Values from `content/metrics.ts`. **Commit.**

### Task E3: Featured Work
**Files:** `web/components/sections/featured-work.tsx`, `web/components/project-card.tsx`.
- [ ] `SectionLabel` "FEATURED PROJECTS"; grid of featured `projects`; each `<ProjectCard>` = logo, name, description, per-project color identity accent, `<ProductPreview>` mini dashboard, tech chips, "View Project ->" (Phase 1: anchors/placeholder). Hover lift+glow. **Commit.**

### Task E4: How We Work (Process)
**Files:** `web/components/sections/process.tsx`, `web/components/process-step.tsx`.
- [ ] `SectionLabel` "HOW WE WORK"; heading "Four steps. No mystery."; 4 numbered `<ProcessStep>` (Map the System / Find the Leverage / Build and Ship / Support and Iterate) beside `<ProcessDashboard>`. **Commit.**

### Task E5: What We Do (Services)
**Files:** `web/components/sections/services.tsx`, `web/components/service-item.tsx`.
- [ ] `SectionLabel` "WHAT WE DO"; heading "End-to-end software systems that run your business."; 6-item grid (Lucide icon + title + blurb) + a "Let's talk about what you're building" CTA card (30-minute call copy + Book a Conversation). **Commit.**

### Task E6: Operating Philosophy
**Files:** `web/components/sections/philosophy.tsx`, `web/components/site/signature.tsx`.
- [ ] `SectionLabel` "BUILT BY SOMEONE WHO OPERATES"; statement "I've built, scaled, and operated every system we deliver."; supporting paragraph; `<Signature>` (Kevin Cohen, Founder) + headshot (`next/image`, placeholder until asset supplied). **Commit.**

### Task E7: Technologies
**Files:** `web/components/sections/technologies.tsx`.
- [ ] Quiet responsive row/grid of tech from `content/technologies.ts` (Lucide/simple wordmarks), muted, no accent wash. **Commit.**

### Task E8: Testimonial + client logos
**Files:** `web/components/sections/testimonial.tsx`, `web/components/site/logo-row.tsx`.
- [ ] Left: pull-quote "I don't just write code. / I run the business that needed it." + supporting paragraph. Right: `<LogoRow>` (Concordia Connect, Draftery, Skyroa, AutoMedic, FrostyNow) monochrome logos. **Commit.**

### Task E9: FAQ
**Files:** `web/components/sections/faq.tsx`.
- [ ] shadcn `<Accordion>` from `content/faq.ts`. **Commit.**

### Task E10: Final CTA
**Files:** `web/components/sections/final-cta.tsx`, `web/components/site/cta-section.tsx`.
- [ ] Big closing "Let's talk about what you're building." + Book a Conversation. **Commit.**

### Task E11: Assemble homepage + reveal orchestration
**Files:** `web/app/page.tsx`.
- [ ] Compose sections in spec order (Hero → Metrics → Featured Work → Process → Services → Philosophy → Technologies → Testimonial → FAQ → Final CTA), alternating `bg`/`section`/`section-alt`. Page `metadata` (title/description/OG). **Commit.**

---

## Group F — Verification & Polish

### Task F1: Visual + responsive + a11y verification
**Files:** `web/e2e/home.spec.ts`, `web/e2e/a11y.spec.ts`.
- [ ] Install Playwright + `@axe-core/playwright`. Screenshot homepage + dashboards at 390/768/1240 in dark + light; compare to `../MOCKUP-NEW.PNG` / `../Dark_Mode_Dash.PNG` / `../Light_Mode_Dash.PNG`. axe scan → zero serious violations. Fix contrast/focus issues. **Commit.**

### Task F2: Build, Lighthouse, deploy dry-run
- [ ] `npm run build` → `out/` clean. Serve `out/` (`npx serve out`), Lighthouse ≥95 perf/a11y/best-practices/SEO on the homepage. Confirm `_headers`/`_redirects`/`robots.txt` in `out/`. Document Cloudflare Pages settings (root `web`, preset "Next.js (Static HTML Export)", build `npx next build`, output `out`, `NODE_VERSION=22`). **Commit.**

---

## Deferred to Phase 2 (not in this plan)
Contact page + Pages Function + Turnstile + Resend; Services/Work/About/Process pages; Insights/blog; French i18n; expanded dashboard library. (Homepage CTAs use Cal.com, so no backend needed for Phase 1.)

---

## Self-Review

**Spec coverage:** Positioning/signature → E1 + design system; tokens/type/motion → A2/A3/B3; dark+light → A2/A4 + per-section verify; Next 16 static export/Cloudflare → A1/A2/A5/F2; fonts (Fraunces ship, Canela local) → A3 + Global Constraints; dashboard system (both reference PNGs) → Group C; 12-section IA → D + E; projects incl. Concordia Connect → B4/E3/E8; accessibility/perf → F1/F2; SEO → A5 + E11/F2; contact form correctly **deferred** to Phase 2 (homepage uses Cal.com) — noted, not a gap.

**Placeholder scan:** Section content marked "placeholder one-liner" for Success/FrostyNow and the headshot are **data/asset open items from the spec**, not code placeholders — the components are fully specified. No "TBD"/"handle edge cases"/"similar to Task N".

**Type consistency:** `Project` fields (`slug/name/tagline/description/color/tech/logo/featured/cta`) used consistently across B4 → E3 → E8; `useCountUp(target, opts)` signature identical in B3 → E2; chart geometry fns (`linePath/areaPath/donutArc`) defined in C1, consumed in C1–C5.
