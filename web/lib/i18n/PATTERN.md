# i18n pattern (EN / FR)

Client-side, static-export-safe locale toggle. No `/fr` routes, no reload —
toggling swaps visible copy instantly. This doc is for agents translating the
rest of the site. Read the reference slice first: `components/site/nav.tsx`,
`components/sections/hero.tsx`, `components/sections/quiet-proof.tsx` +
`content/proof.ts`, `components/site/cta-section.tsx`,
`components/site/footer.tsx`.

## The two hooks you need

```ts
// web/lib/i18n/locale.tsx
export type Locale = "en" | "fr";
function useLocale(): { locale: Locale; setLocale: (locale: Locale) => void };

// web/content/i18n/messages.ts
function useT(): Messages; // returns messages[locale]
```

Both are React hooks — only call them from a Client Component
(`"use client"` at the top of the file, first line).

`LocaleProvider` is already wired into `app/providers.tsx` (outside
`ThemeProvider`), and it's mounted in the root layout above `<Nav />`,
`{children}`, and `<Footer />`, so every page and component in the tree can
call `useLocale()` / `useT()`.

## SSR-safety, in one sentence

`LocaleProvider` reads locale via `useSyncExternalStore` over `localStorage`
(`lib/i18n/locale.tsx`) — the same idiom `useMediaQuery` uses for
`matchMedia`: `getServerSnapshot` always returns `"en"`, so the server render
and the first client (hydration) render always match; `getSnapshot` reads
`localStorage["kcoh-locale"]` directly, so a stored `"fr"` is picked up in
the render that follows mount, with no `setState`-in-`useEffect` (that
pattern trips the `react-hooks/set-state-in-effect` ESLint rule in this
repo). You don't need to add any mounted-guard yourself. `LocaleToggle`
(`components/site/locale-toggle.tsx`) is proof: it reads `useLocale()`
directly with zero extra guarding.

## Two content patterns — pick based on shape

### 1. Inline component literals → `content/i18n/messages.ts`

Use this for headings, button labels, short strings that live directly in a
component's JSX. Add a new section (or new keys to an existing section) to
the `Messages` type, then fill in `en` and `fr` in the `messages` object —
TypeScript will error until both locales are complete.

```ts
// content/i18n/messages.ts
export type Messages = {
  // ...existing sections...
  services: {
    heading: string;
  };
};

export const messages: Record<Locale, Messages> = {
  en: { /* ... */ services: { heading: "What we build" } },
  fr: { /* ... */ services: { heading: "Ce que nous bâtissons" } },
};
```

```tsx
// components/sections/services.tsx
"use client";
import { useT } from "@/content/i18n/messages";

export function Services() {
  const t = useT();
  return <h2>{t.services.heading}</h2>;
}
```

### 2. Structured content (arrays/objects) → `content/*.ts` as `Record<Locale, T>`

Use this for content modules that hold lists or nested objects (case
studies, FAQ entries, proof cards, nav links). Keep the original type `T`
unchanged; wrap the exported value in `Record<Locale, T>`. Consumers select
the active locale's data with `data[locale]`.

Reference implementation — `content/proof.ts`:

```ts
export type ProofPoint = { value: string; label: string; context: string };

export const proofPoints: Record<Locale, ProofPoint[]> = {
  en: [ /* ... */ ],
  fr: [ /* ... */ ],
};
```

```tsx
// components/sections/quiet-proof.tsx
"use client";
import { useLocale } from "@/lib/i18n/locale";
import { proofPoints } from "@/content/proof";

export function QuietProof() {
  const { locale } = useLocale();
  const points = proofPoints[locale]; // ProofPoint[]
  // ...
}
```

`content/nav.ts` follows the same pattern for `navLinks` — routes (`href`)
don't change between locales, only `label` does, so keep using `l.href` for
links and React keys (never `l.label`, which now differs per locale).

**Rule of thumb:** if the content is a plain string/short phrase sitting
directly in JSX, it's a `messages.ts` entry. If it's an array or nested
object exported from a `content/*.ts` module, it's a `Record<Locale, T>` in
that module.

## Making a component locale-reactive — checklist

1. Add `"use client";` as the file's first line (before imports) if it isn't
   already a Client Component.
2. Import `useT` (for inline copy) and/or `useLocale` (for
   `Record<Locale, T>` content selection).
3. Call the hook(s) at the top of the component function.
4. Replace hardcoded literal strings with `t.<section>.<key>`, and
   `array.map(...)` with `data[locale].map(...)`.
5. If the component was a Server Component doing SSG/metadata work
   (`generateMetadata`, `export const metadata`), **don't** convert the page
   file itself — keep the page as a thin server shell and move only the
   copy-rendering JSX into a client child component. None of the components
   in the reference slice needed this split (they were already
   presentational), but you will hit it for pages with `metadata` exports.
6. Run `npm run lint` and `npm run build` after each component — cheaper to
   catch a missed translation or type error immediately.

## Which components had to become Client Components for the reference slice

`Hero`, `QuietProof`, `CTASection`, `Footer` were Server Components before
this work (no interactivity, pure presentational). They are now
`"use client"` because they read `useT()`/`useLocale()`. `Nav` was already a
Client Component. This is expected: any component rendering translatable
copy must be a Client Component under this architecture. It does not affect
static export — `output: "export"` still prerenders the initial (English)
HTML for every route; the locale toggle only changes things after hydration,
client-side.

`CTASection` keeps its `heading`/`subline` override props (used by
`app/about/page.tsx` with bespoke English copy) — those callers are **not**
translated by this pattern unless you explicitly migrate them to omit the
props (so the component falls back to `t.cta.heading` / `t.cta.subline`) or
pass `t.cta.*` themselves from a client wrapper.

## LocaleToggle

`components/site/locale-toggle.tsx` is a small "EN / FR" segmented control
(`role="group"`, `aria-pressed` per button, keyboard-focusable buttons). It's
placed in `Nav` next to `ThemeToggle`, in both the desktop header and the
mobile `Sheet`. Copy this component's shape if you ever need a similar
inline picker elsewhere — don't duplicate the locale-switching logic itself,
just reuse `<LocaleToggle />`.

## Voice

Write natural, professional **Québec French** (Montréal business tone), not
machine-literal translation. Keep brand/product names untranslated: KCOH,
Drafterie, Concordia Connect, Skyroa, AutoMedic, Cal.com. Keep routes/URLs
untranslated. French number/currency conventions: space as thousands
separator (`2 600` not `2,600`), non-breaking space before `%` (`100 %`).

## Remaining areas to translate (not yet done)

These still render English-only copy and need the same treatment (messages
key for inline literals, `Record<Locale, T>` for structured content):

- `components/sections/services.tsx` + `content/services.ts` /
  `content/service-details.ts`
- `app/about/page.tsx` + `content/about.ts` + `content/founder.ts` (Founder
  section)
- `app/work/page.tsx`, `components/work/*`, `content/case-studies.ts` (work
  index + the 4 case study pages, one per project)
- `components/sections/faq.tsx` + `content/faq.ts` +
  `components/site/faq-accordion.tsx`
- `app/contact/page.tsx` + `components/contact/contact-form.tsx` +
  `components/contact/cal-embed.tsx` (form labels, validation messages in
  `lib/contact-validation.ts`, success/error states)
- `components/dashboard/**` (dashboard demo: sidebar nav, screen headings,
  chart labels/tooltips) — large surface, do this last
- `components/sections/how-we-work.tsx` + `content/process.ts` ("process"
  step content)
- `components/sections/testimonial.tsx` (quote + attribution — check with
  the source if the testimonial itself should be translated or kept
  verbatim as a direct quote)
- `components/sections/technologies.tsx` + `content/technologies.ts` (likely
  mostly proper nouns — audit for any translatable copy)
- `content/engagement.ts` + `components/services/engagement-strip.tsx`
- `components/site/page-hero.tsx` (used with per-page `eyebrow`/`title`/
  `intro` props across About/Work/Services/Contact — each caller needs its
  own messages keys)
- Page `<title>`/`metadata` strings (`export const metadata` in every
  `app/**/page.tsx`) — these are server-rendered and static per route, so
  they need a different approach (e.g. keep English metadata since there's
  no `/fr` route to serve French metadata to, or accept that metadata stays
  English while visible body copy is bilingual — decide and document before
  starting).

## Route-based routing (current)

**Supersedes the "no `/fr` routes" framing above.** The site now has real
`/fr` routes: English lives at the root (`/`, `/services/`, …), French lives
under `/fr` (`/fr/`, `/fr/services/`, …). The metadata bullet above is
resolved too — `/fr` pages now get real French metadata via
`altLanguages()`, see below.

- **Locale source**: `useLocale()` (`lib/i18n/locale.tsx`) no longer reads
  `localStorage`. `LocaleProvider` derives `locale` from `usePathname()` —
  `/fr` or `/fr/...` → `"fr"`, everything else → `"en"`. This means locale
  is now correct on the very first server/prerendered render for every
  route (no post-hydration flash), and `useLocale()` returns `{ locale }`
  only — **there is no `setLocale` anymore**. Don't try to call it.
- **Internal links**: use `<LocaleLink href="/services/">` from
  `components/site/locale-link.tsx` instead of `next/link`'s `Link` for any
  internal absolute-path href. It reads the active locale and rewrites the
  href via `localizedPath()` (`lib/i18n/routing.ts`) — `/services/` becomes
  `/fr/services/` when the current route is under `/fr`. Leave hash links
  (`#work`), `mailto:`, `tel:`, and external `http(s)` links as plain `<a>`
  — `LocaleLink` only rewrites internal string hrefs.
  - `localizedPath(href, locale)` — unlocalized → locale-specific href.
  - `unlocalizedPath(pathname)` — locale-specific pathname → unlocalized
    (strips the `/fr` prefix). Used by `LocaleToggle` and by `Nav` to run
    `isActiveRoute()` against the unlocalized pathname (nav link hrefs are
    stored unlocalized in `content/nav.ts`).
- **Adding a `/fr/<route>` mirror**: for every English page
  `app/<route>/page.tsx`, add `app/fr/<route>/page.tsx` that:
  1. Renders the *same* content component(s) the English page renders
     (e.g. `app/fr/page.tsx` renders `<Hero /><QuietProof /><FeaturedWork />…`
     — the identical components `app/page.tsx` uses). Components already
     derive `locale="fr"` automatically from the `/fr` path — do not pass a
     `locale` prop or duplicate the component.
  2. Exports its own `metadata` with a French `title`/`description` (reuse
     existing French copy from `content/i18n/messages.ts` /
     `content/*.ts` — do not invent new translations) and
     `alternates: { canonical: "/fr/<route>/", languages: altLanguages("/<route>/") }`.
  3. The matching English page's `alternates` must also include
     `languages: altLanguages("/<route>/")` (canonical stays `"/<route>/"`)
     so both sides emit the same hreflang map.
  - `altLanguages(enPath)` (`lib/i18n/alternates.ts`) builds the
    `{ en, fr, "x-default" }` language map from the *English* (unlocalized)
    path — always pass the English path, even from the `/fr` page.
  - Reference implementation: `app/page.tsx` + `app/fr/page.tsx`.
- **`<html lang>`**: still tracked automatically — `LocaleProvider` sets
  `document.documentElement.lang = locale` in a `useEffect` (a DOM side
  effect, not React state, so it doesn't trip
  `react-hooks/set-state-in-effect`).
- Static export constraint unchanged: no middleware, no server runtime.
  `usePathname()` in a Client Component is prerendered per-route at build
  time — that's the whole mechanism.
