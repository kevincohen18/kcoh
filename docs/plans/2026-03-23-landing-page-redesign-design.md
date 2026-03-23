# Landing Page Redesign — Design Document

**Date:** 2026-03-23
**Goal:** Redesign kcoh.ca landing page to feel human-designed, brand-intentional, premium, and conversion-ready. Remove all AI-generated template patterns.
**Target audience:** Founders/CEOs who need systems built
**Primary conversion action:** Book a consultation call (Cal.com)
**Core positioning:** "This person has actually built and run real businesses — he's not just a developer for hire."

---

## Visual System

### Palette
- Background: `#f7f5f0` (warm off-white)
- Headline text: `#1a1a1a`
- Body text: `#4a4a4a`
- Caption/label text: `#8a8a8a`
- Muted text: `#6a6a6a`
- Accent (copper): `#b45309` — used sparingly: primary CTA, key links, occasional emphasis
- Secondary (slate): `#334155` — secondary buttons, borders, structural elements
- Dark sections (1-2 max): `#1c1917` (warm near-black)
- Borders/dividers: `#e5e5e0`

### Typography
- Headlines: **Instrument Serif** (Google Fonts) — editorial weight, used for main headlines only
- Everything else: **Inter** — 400 body, 500 labels, 600 sub-headlines. No 700/800 overuse.
- Hero headline: `clamp(2.75rem, 5vw, 4rem)`
- Section headlines: `2rem`
- Nothing else above `1.25rem`
- Body text max-width: `540px`
- Headline max-width: `680px`

### What's killed
- All gold/amber gradients
- All glow effects, box-shadow glows, animated gradient backgrounds
- All backdrop-filter blur (except navbar if needed)
- All animated gradient text
- Animations: `gradientShift`, `glowPulse`, `logoPulse`, `logoShine`, `badgePulse`, `badgeFloat`
- Global background veil with radial gradients
- Scroll progress bar
- Loading screen spinner
- Code showcase section (fake sample code)
- Terminal portfolio section (ls -la)
- GitHub contribution graph (fake stats)
- Search functionality
- Language toggle
- Theme toggle (one theme, commit to it)
- Back to top button

### What's kept
- Subtle `fadeInUp` on scroll (restrained, once per element)
- Clean hover states — simple transforms, no glow
- `prefers-reduced-motion` respect

---

## Page Structure (10 sections → 9 focused)

### 1. Navigation
- Minimal: Logo left, 3-4 text links right, one CTA button
- No icons on nav links, no search, no language/theme/palette toggles
- Logo: Clean text "KCOH" — no animated border, no glow pulse, no shine effect
- CTA button: "Book a Call" in copper, small, right-aligned
- Background: white/off-white with subtle bottom border on scroll

### 2. Hero
- **Asymmetric, left-aligned.** Content in left ~60%, right side is whitespace.
- Label: `KCOH SOFTWARE INC.` — small, uppercase, letterspaced, `0.75rem`, Inter 500, `#8a8a8a`
- Headline (Instrument Serif, large):
  > I've built and operated the systems that most companies only talk about.
- Supporting line (Inter 400, `#4a4a4a`, max-width 480px):
  > Automation, financial clarity, and operational leverage — built by someone who scaled a 7-figure platform from the inside.
- CTA pair, left-aligned:
  - Primary: "Book a Conversation" — solid copper, white text, `border-radius: 6px`
  - Secondary: "See What I've Built" — transparent, slate border, dark text
- Proof line beneath buttons: `Currently taking on new projects · inquiries@kcoh.ca` — `0.85rem`, `#8a8a8a`
- No: terminal prompt, gradient text, badges, scroll indicator, background effects
- Padding: ~160px top, ~100px bottom. NOT forced `min-height: 100vh`.

### 3. Credibility Strip
- Single horizontal row, 3 proof points, left-aligned
- No cards, no borders, no background change
- Separated by thin vertical lines (`1px solid #e5e5e0`)
- Content:
  - **7-figure** / Platform built & operated
  - **2,500+** / Members managed at scale
  - **10+** / Production apps shipped
- Numbers: Instrument Serif, `1.75rem`, `#1a1a1a`
- Labels: Inter 400, `0.85rem`, `#6a6a6a`
- Padding: `3rem 0`

### 4. The Operator Story
- Single column, left-aligned, max-width `540px`
- No background change, no card, no border — just text on warm off-white
- Label: `HOW I'M DIFFERENT` — small uppercase
- Headline (Instrument Serif, `2rem`):
  > I don't just write code. I've run the business that needed it.
- Body (2-3 paragraphs, Inter 400, `1.05rem`, `#4a4a4a`, `line-height: 1.75`):
  > Most developers build what you spec. I've been on the other side — operating a platform with thousands of members, handling payments, disputes, uptime, and the kind of edge cases that only show up at scale.
  >
  > That experience changed how I build. I design systems around how businesses actually run, not how they look in a wireframe. Financial clarity, automated workflows, operational leverage — these aren't features I list. They're problems I've solved for myself.
  >
  > When I build for you, I'm applying judgment I earned by operating, not just engineering.
- No CTA. Trust-building moment.
- Padding: `5rem 0`

### 5. What I Build — Case Studies
- Label: `WHAT I'VE BUILT` — small uppercase
- Headline (Instrument Serif, `2rem`):
  > Real systems in production, not side projects.

#### Tier 1: Featured (Draftory & Skyroa)
- Full-width, two-column asymmetric per case study (text 45% / screenshot 55%)
- Alternate sides: Draftory text-left/image-right, Skyroa image-left/text-right
- Text side: tag (small uppercase, color-coded text only), title (Instrument Serif `1.75rem`), 2-3 sentence description, 3 key detail lines with copper dash prefix, simple text link "Visit draftory.ca →"
- Screenshot side: real product screenshot in minimal browser chrome, `border-radius: 8px`, subtle shadow
- `4rem` gap between the two

#### Tier 2: Secondary Work (3-4 items)
- Text-only list below featured studies
- Each item: **Title** — One line description
- Inter 500 title in `#1a1a1a`, Inter 400 description in `#6a6a6a`
- Separated by `1px` border-bottom in `#e5e5e0`
- Items: Digital Platform, iOS Apps, FrostyNow, Payment Operations

- Padding: `5rem 0`

### 6. How I Work
- Replaces current 4-step process grid
- Vertical numbered list, left-aligned, narrow column (max-width `540px`)
- Each step: bold number + title, one sentence underneath
- Steps:
  1. **Map the system** — I audit your current workflows, data flows, and bottlenecks before writing any code.
  2. **Find the leverage** — Identify which automations will yield the highest operational ROI and prioritize the build.
  3. **Build and ship** — Clean architecture, proper testing, integration with your existing tools. Deployed to production.
  4. **Support and iterate** — Monitor performance, train your team, and iterate based on real usage.
- No icons, no cards, no checkmark lists
- Numbers: Instrument Serif, copper color, `1.5rem`
- Titles: Inter 600, `1.1rem`, `#1a1a1a`
- Descriptions: Inter 400, `0.95rem`, `#4a4a4a`
- Padding: `4rem 0`
- Subtle top border to separate from case studies

### 7. Who This Is For
- A short, direct section that helps founders self-select
- Label: `IS THIS YOU`
- Headline (Instrument Serif, `2rem`):
  > This is for founders who've outgrown manual processes.
- Three statements, each on its own line with generous line spacing:
  - Your business works, but it runs on spreadsheets, manual steps, and tribal knowledge.
  - You need financial visibility you don't currently have — real cashflow clarity, not just accounting.
  - You want to scale operations without hiring a team for every new function.
- No bullets, no icons. Just three confident lines. Inter 400, `1.05rem`, `#4a4a4a`
- Padding: `4rem 0`

### 8. Mid-Page CTA Block
- **Background shift:** This section uses the warm dark background `#1c1917` with light text. Creates visual contrast and signals importance.
- Centered (the ONE section that centers — makes it stand out from the left-aligned rhythm)
- Headline (Instrument Serif, `1.75rem`, `#f7f5f0`):
  > Let's talk about what you're building.
- One line beneath: "30-minute call. No pitch, no pressure. Just a conversation about your systems." — Inter 400, `1rem`, `#a3a3a3`
- One button: "Book a Conversation" — copper, same as hero primary
- Padding: `5rem 0`

### 9. FAQ
- Back to off-white background
- Label: `COMMON QUESTIONS`
- Simple accordion, left-aligned, max-width `640px`
- 5 questions:
  1. **What's your availability?** — I'm currently taking on new projects. Book a call and we'll discuss timeline and fit.
  2. **How do you price engagements?** — Project-based pricing scoped after our initial conversation. No hourly billing, no surprises.
  3. **Do you work with early-stage companies?** — Yes, if the problem is clear and the engagement is well-scoped. Stage matters less than clarity.
  4. **What does a typical engagement look like?** — It starts with a systems audit, then a prioritized build plan, then execution. Most projects run 4-12 weeks.
  5. **Can you work with my existing tools and team?** — Yes. I integrate with whatever you're already using and train your team on the new systems.
- Question text: Inter 600, `1rem`, `#1a1a1a`
- Answer text: Inter 400, `0.95rem`, `#4a4a4a`, `line-height: 1.7`
- Dividers between items: `1px solid #e5e5e0`
- Padding: `4rem 0`

### 10. Final CTA
- Still on off-white background. No dark section again — that was used once for impact.
- Left-aligned to match page rhythm
- Headline (Instrument Serif, `1.75rem`):
  > If this sounds like what you need, let's talk.
- Subline: "Or reach out directly at inquiries@kcoh.ca" — `0.9rem`, `#8a8a8a`, email is a copper text link
- One button: "Book a Conversation" — copper
- Padding: `5rem 0 3rem`

### 11. Footer
- Minimal, single row
- Left: "KCOH Software Inc." in Inter 500
- Right: LinkedIn icon link, email text link
- Copyright line beneath: `0.8rem`, `#8a8a8a`
- Top border: `1px solid #e5e5e0`
- Padding: `2rem 0`
- No 4-column grid, no "What I Build" links, no Quick Links

---

## Key Conversion Principles

1. **CTA appears 3 times** with different framing:
   - Hero: discovery intent ("Book a Conversation")
   - Mid-page: evaluation intent ("Let's talk about what you're building")
   - Final: decision intent ("If this sounds like what you need, let's talk")
2. **Proof comes early** — credibility strip is the 2nd thing they see
3. **Availability is honest** — "Currently taking on new projects" replaces fake scarcity
4. **Email alternative** at hero and final CTA for async-preferring founders
5. **Self-selection section** (Who This Is For) reduces unqualified leads and makes qualified ones feel seen

---

## What Makes This Not Look AI-Generated

1. **Mixed type families** — Serif headlines + sans body. AI pages almost never do this.
2. **Asymmetric, left-aligned layout** — Not everything centered.
3. **Warm light palette** — Not dark mode with gradients.
4. **No uniform card grids** — Tiered hierarchy in case studies.
5. **Varied section density** — Some sections breathe (Operator Story), some are tight (Credibility Strip, How I Work).
6. **No decorative effects** — No glows, no animated gradients, no backdrop blur, no particle effects.
7. **Editorial typography** — Narrow text columns, confident headline scale, real hierarchy.
8. **First-person voice** — Copy sounds like a person, not a template.
9. **Restraint** — Fewer sections, fewer elements, fewer colors. Every piece earns its place.
10. **One dark section** used for emphasis — not the whole page.
