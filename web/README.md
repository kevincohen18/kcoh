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
2. `wrangler.toml` already targets the confirmed production project,
   `name = "kcoh"` (verified via `wrangler pages project list` — serves
   `kcoh.pages.dev` + `kcoh.ca`). That project is **Git-connected**, and
   Cloudflare is expected to reject direct-upload deploys to Git-connected
   projects, so `npm run deploy` likely cannot target it as-is — see the
   comment in `wrangler.toml` and the Task 66 cutover decision for the two
   launch paths.
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
