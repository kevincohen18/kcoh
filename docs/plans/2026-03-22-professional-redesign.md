# Professional Tone Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reposition KCOH Software Inc. website from developer/startup aesthetic to premium operator/entrepreneur — navy + gold color scheme, stripped animations, authoritative copy.

**Architecture:** Surgical surface-layer changes only. Update CSS custom properties and direct color values, remove playful animations, update i18n copy in both EN/FR. No HTML structural changes.

**Tech Stack:** HTML, CSS, vanilla JS, JSON i18n files

**Design Doc:** `docs/plans/2026-03-22-professional-redesign-design.md`

---

### Task 1: CSS Custom Properties — Color System Foundation

**Files:**
- Modify: `assets/css/shared.css` (lines 18-44)

**Step 1: Update CSS custom properties in :root**

Replace the `:root` color definitions. These cascade to most of the site automatically.

```css
/* OLD */
--primary-color: #6366f1;
--primary-dark: #4f46e5;
--secondary-color: #8b5cf6;
/* ... */
--gradient-start: #6366f1;
--gradient-end: #8b5cf6;

/* NEW */
--primary-color: #c9a84c;
--primary-dark: #b8943e;
--secondary-color: #d4af57;
/* ... */
--gradient-start: #b8943e;
--gradient-end: #d4af57;
```

Also update:
- `--text-secondary: #d1d5db` → `--text-secondary: #a09d98`
- Background `#0f172a` → `#0a0f1a` (lines 15, 49, 61, 70, 115)

**Step 2: Verify custom property change cascades**

Open site in browser and check that buttons, links, and gradient text shifted from indigo to gold.

**Step 3: Commit**

```
git commit -m "feat: update CSS custom properties to navy+gold palette"
```

---

### Task 2: Direct Color References in shared.css

**Files:**
- Modify: `assets/css/shared.css`

**Step 1: Update navbar**

- Line 128: `rgba(15, 23, 42, 0.9)` → `rgba(10, 15, 26, 0.95)`
- Lines 131-132: Replace triple indigo glow box-shadow with single shadow:
  ```css
  box-shadow: 0 1px 0 rgba(201, 168, 76, 0.15);
  ```

**Step 2: Update logo colors**

- Line 179: Replace `rgba(99, 102, 241, ...)` and `rgba(139, 92, 246, ...)` → `rgba(201, 168, 76, ...)`
- Line 194: `rgba(99, 102, 241, 0.1)` → `rgba(201, 168, 76, 0.1)`
- Line 222: `#a78bfa` → `#d4af57`
- Line 223: `linear-gradient(135deg, #6366f1, #a78bfa)` → `linear-gradient(135deg, #b8943e, #d4af57)`
- Lines 257-258: Logo hover — replace indigo rgba values with gold equivalents
- Line 262: `#8b5cf6` → `#d4af57`
- Line 263: `linear-gradient(135deg, #8b5cf6, #6366f1, #a78bfa)` → `linear-gradient(135deg, #d4af57, #c9a84c, #b8943e)`

**Step 3: Update scrollbar**

- Line 666: `#0f172a` → `#0a0f1a`
- Line 670: `linear-gradient(180deg, #6366f1, #8b5cf6)` → `#c9a84c` (solid, no gradient)
- Line 672: `#0f172a` → `#0a0f1a`
- Line 676: `linear-gradient(180deg, #8b5cf6, #6366f1)` → `#d4af57` (solid)

**Step 4: Update footer link color**

- Line 574: `#d1d5db` → `#a09d98`

**Step 5: Update mobile menu background**

- Line 436: `rgba(15, 23, 42, 0.98)` → `rgba(10, 15, 26, 0.98)`

**Step 6: Commit**

```
git commit -m "feat: replace all direct indigo/purple color refs with navy+gold"
```

---

### Task 3: Remove Developer Palette CSS

**Files:**
- Modify: `assets/css/shared.css` (lines 683-778 approximately)

**Step 1: Delete the entire `.dev-palette` block**

Remove all CSS from `.dev-palette` through the end of the developer palette styles (`.dev-palette-header`, `.dev-palette-close`, `.dev-palette-list`, `.dev-key`, `.dev-palette-hint`, `.dev-palette.show`). Also remove `.palette-toggle` styles if they exist (lines ~280-305).

**Step 2: Commit**

```
git commit -m "chore: remove dead developer palette CSS"
```

---

### Task 4: Strip Playful Animations from shared.css

**Files:**
- Modify: `assets/css/shared.css`

**Step 1: Remove logo animations**

- Remove `animation: logoPulse 3s ease-in-out infinite` from `.logo-text-container` (line 188)
- The `logoShine` animation on `::before` was already removed in the bug fix
- The `logoTextPulse` animation on `.logo-text` was already removed in the bug fix
- Keep `@keyframes logoPulse` and `@keyframes logoTextPulse` definitions (dead code but harmless — can clean later)
- Replace the animated border/shadow on `.logo-text-container` with a static gold border:
  ```css
  border: 1px solid rgba(201, 168, 76, 0.3);
  box-shadow: none;
  ```

**Step 2: Remove button ripple effect**

Search for `.btn-primary::before` ripple/pulse pseudo-element and remove the animation. Keep the hover `translateY(-1px)` transition.

**Step 3: Commit**

```
git commit -m "feat: strip playful animations from shared.css"
```

---

### Task 5: Strip Animations from styles.css (main stylesheet)

**Files:**
- Modify: `styles.css` (the large page-specific stylesheet)

**Step 1: Remove high-priority animation classes**

Search and neutralize these class definitions:
- `.bounce-1`, `.bounce-2`, `.bounce-3`, `.bounce-4` — remove animation properties, keep as static classes
- `.pulse-animation` — remove animation property
- `.typing-animation` — remove animation (but NOT the terminal typing — that's separate JS)
- `.subtitle-typing` — remove animation, make static
- `.floating-code-bg` — set `display: none`
- `.scroll-indicator span` bounce — remove animation

**Step 2: Remove decorative @keyframes**

Remove these keyframe blocks entirely:
- `@keyframes floating`
- `@keyframes rotateGlow`
- `@keyframes float`
- `@keyframes floatWithRest`
- `@keyframes neonPulse`
- `@keyframes scanline`
- `@keyframes gridMove`
- `@keyframes textGlow`
- `@keyframes badgePulse`
- `@keyframes badgeFloat`
- `@keyframes typeGradient`
- `@keyframes buttonPulse`
- `@keyframes matrixPulse`
- `@keyframes cursorBlink` (but NOT if it's used in the terminal)
- `@keyframes bounce` (scroll arrow)
- `@keyframes expandLine`
- `@keyframes ripple`
- `@keyframes floatUp`

Keep these:
- `@keyframes fadeIn`, `fadeInUp`, `fadeInDown` (scroll reveal)
- `@keyframes scaleIn`, `slideInScale`, `slideInUp` (entrance)
- `@keyframes spin` (loading spinner)
- `@keyframes slideDownFade` (dropdown)
- `@keyframes subtleFade`, `revealText` (content reveal)

**Step 3: Update all indigo/purple color references in styles.css**

Search for `#6366f1`, `#8b5cf6`, `#a78bfa`, `#4f46e5` and all `rgba(99, 102, 241, ...)` / `rgba(139, 92, 246, ...)` values. Replace with gold equivalents following the same mapping as Task 2.

**Step 4: Commit**

```
git commit -m "feat: strip decorative animations, update colors in styles.css"
```

---

### Task 6: Remove Particle System from JS

**Files:**
- Modify: `script.js` (main page JS, if it exists — may be inline or bundled)

**Step 1: Find and remove particle system**

Remove the `initParticles()` function and its call (the `Particle` class, the canvas setup, the `requestAnimationFrame` loop). Based on research: lines ~772-856.

**Step 2: Remove particle canvas from index.html**

Remove `<canvas id="particles" class="particles-canvas">` (line 228).

**Step 3: Remove floating code background from index.html**

Remove the `.floating-code-bg` div (line 229).

**Step 4: Remove scroll arrow element from index.html**

Remove the `.scroll-arrow` div (line 298) and the "Explore" text near it.

**Step 5: Remove bounce classes from hero badges in index.html**

- Line 241: Remove `bounce-1` from class list
- Line 249: Remove `bounce-2` from class list

**Step 6: Remove pulse-animation class from CTA in index.html**

- Line 263: Remove `pulse-animation` from class list

**Step 7: Remove typing-animation from subtitle in index.html**

- Line 238: Remove `subtitle-typing` class (keep terminal typing separate)

**Step 8: Commit**

```
git commit -m "feat: remove particles, bouncing badges, pulse CTA, floating bg"
```

---

### Task 7: Update Copy — English (en.json)

**Files:**
- Modify: `lang/en.json`

**Step 1: Apply all copy changes**

| Line | Key | Old | New |
|------|-----|-----|-----|
| 9 | shared.nav.discuss | "Discuss your systems" | "Schedule a Consultation" |
| 24 | shared.footer.what_i_build | "What I Build" | "Capabilities" |
| 25 | shared.footer.connect | "Connect" | "Contact" |
| 42 | home.btn_discuss | "Discuss Your Systems" | "Book a Consultation" |
| 43 | home.btn_view_systems | "View Systems Built" | "View Portfolio" |
| 44 | home.availability_notice | "Available starting 2027 ..." | "Accepting engagements from 2027 — currently at capacity" |
| 48 | home.scroll_explore | "Explore" | "" (empty — element will be removed from HTML) |
| 119 | home.process_title | "How It Works" | "Engagement Process" |
| 239 | services.pricing_btn | "Request a Quote" | "Request a Proposal" |
| 371 | contact.title | "Let's build something great together" | "Start a Conversation" |
| 376 | contact.card_title | "Talk to a human" | "Direct Contact" |
| 377 | contact.card_desc | "Fast responses, clear estimates, honest advice." | "Clear estimates. Honest counsel. Direct access." |
| 394 | contact.form_title | "Send me a message" | "Project Inquiry" |
| 417 | contact.form_message_placeholder | "Share goals, timeline, and must-haves." | "Describe your project, timeline, and objectives." |
| 419 | contact.newsletter_title | "Stay Updated" | "Quarterly Insights" |
| 420 | contact.newsletter_desc | "Quarterly updates with new launches, tech insights, and tips." | "System design perspectives, product launches, and operational insights." |
| 422 | contact.newsletter_btn | "Subscribe" | "Join" |
| 425 | error.title | "Oops! Page Not Found" | "Page Not Found" |
| 426 | error.message | "Looks like this page took a vacation..." | "The page you're looking for doesn't exist or has been moved." |

**Step 2: Commit**

```
git commit -m "feat: update EN copy to authoritative corporate tone"
```

---

### Task 8: Update Copy — French (fr.json)

**Files:**
- Modify: `lang/fr.json`

**Step 1: Apply all French copy changes**

| Line | Key | Old | New |
|------|-----|-----|-----|
| 9 | shared.nav.discuss | "Discutons de vos systemes" | "Planifier une consultation" |
| 24 | shared.footer.what_i_build | "Ce que je construis" | "Expertises" |
| 25 | shared.footer.connect | "Me joindre" | "Contact" |
| 42 | home.btn_discuss | "Discutons de vos systemes" | "Prendre rendez-vous" |
| 43 | home.btn_view_systems | "Voir les systemes construits" | "Voir le portfolio" |
| 44 | home.availability_notice | "Disponible a partir de 2027 ..." | "Mandats acceptes a partir de 2027 — capacite actuelle atteinte" |
| 48 | home.scroll_explore | "Explorer" | "" |
| 119 | home.process_title | "Comment ca fonctionne" | "Processus de mandat" |
| 239 | services.pricing_btn | "Demander un devis" | "Demander une proposition" |
| 371 | contact.title | "Construisons quelque chose d'exceptionnel ensemble" | "Entamer une conversation" |
| 376 | contact.card_title | "Parlez a un humain" | "Contact direct" |
| 377 | contact.card_desc | "Reponses rapides, estimations claires, conseils honnetes." | "Estimations claires. Conseils rigoureux. Acces direct." |
| 394 | contact.form_title | "Envoyez-moi un message" | "Demande de projet" |
| 417 | contact.form_message_placeholder | "Partagez vos objectifs..." | "Decrivez votre projet, echeancier et objectifs." |
| 419 | contact.newsletter_title | "Restez informe" | "Perspectives trimestrielles" |
| 420 | contact.newsletter_desc | "Mises a jour trimestrielles..." | "Perspectives en conception de systemes, lancements de produits et analyses operationnelles." |
| 422 | contact.newsletter_btn | "S'abonner" | "Rejoindre" |
| 425 | error.title | "Oups ! Page non trouvee" | "Page non trouvee" |
| 426 | error.message | "On dirait que cette page a pris des vacances..." | "La page que vous cherchez n'existe pas ou a ete deplacee." |

**Step 2: Commit**

```
git commit -m "feat: update FR copy to authoritative corporate tone"
```

---

### Task 9: Update 404.html Inline Colors

**Files:**
- Modify: `404.html`

**Step 1: Update all inline style colors**

The 404 page has a large inline `<style>` block. Replace all indigo/purple references:
- Line 38: `rgba(99, 102, 241, 0.1)` → `rgba(201, 168, 76, 0.1)`
- Line 57: `linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)` → `linear-gradient(135deg, #b8943e, #c9a84c, #d4af57)`
- Line 94: `rgba(99, 102, 241, 0.3)` → `rgba(201, 168, 76, 0.3)`
- Line 117: `linear-gradient(135deg, #6366f1, #8b5cf6)` → `linear-gradient(135deg, #b8943e, #c9a84c)`
- Line 119: `rgba(99, 102, 241, 0.6)` → `rgba(201, 168, 76, 0.6)`
- Line 137: `rgba(99, 102, 241, 0.05)` → `rgba(201, 168, 76, 0.05)`
- Line 138: `rgba(99, 102, 241, 0.2)` → `rgba(201, 168, 76, 0.2)`
- Line 162: `#6366f1` → `#c9a84c`
- Line 168: `#8b5cf6` → `#d4af57`
- Line 198: `linear-gradient(135deg, #6366f1, #8b5cf6)` → `linear-gradient(135deg, #b8943e, #c9a84c)`
- Lines 241-242: SVG gradient stops → gold equivalents

**Step 2: Commit**

```
git commit -m "feat: update 404 page colors to navy+gold"
```

---

### Task 10: Update HTML Meta Theme Colors

**Files:**
- Modify: `index.html`, `about.html`, `contact.html`, `services.html`, `portfolio.html`

**Step 1: Update theme-color meta tag in all 5 HTML files**

Each file has line 13: `<meta name="theme-color" content="#6366f1">`

Change to: `<meta name="theme-color" content="#0a0f1a">`

(Use the dark navy background for the browser chrome — more corporate than showing the gold accent.)

**Step 2: Commit**

```
git commit -m "feat: update meta theme-color to navy across all pages"
```

---

### Task 11: Update GitHub Chart Colors + Remove Edit Hint

**Files:**
- Modify: `lang/en.json` (line 165)
- Modify: `lang/fr.json` (line 165)
- Modify: `styles.css` or inline styles (wherever the GitHub chart green color is defined)

**Step 1: Update hint text**

- en.json line 165: `"github_edit_hint": "Click chart to edit name"` → `"github_edit_hint": ""`
- fr.json line 165: equivalent → `""`

**Step 2: Find and update contribution chart square colors**

Search styles.css for the GitHub chart/contribution colors (likely greens). Replace with gold gradient:
- Lightest: `rgba(201, 168, 76, 0.15)`
- Light: `rgba(201, 168, 76, 0.4)`
- Medium: `rgba(201, 168, 76, 0.65)`
- Dark: `rgba(201, 168, 76, 0.85)`
- Darkest: `#c9a84c`

**Step 3: Commit**

```
git commit -m "feat: update GitHub chart to gold, remove edit hint"
```

---

### Task 12: Final Sweep and Verification

**Step 1: Search for any remaining indigo references**

```bash
grep -rn "#6366f1\|#8b5cf6\|#a78bfa\|#4f46e5\|99, 102, 241\|139, 92, 246" --include="*.css" --include="*.html" --include="*.js" .
```

Fix any stragglers found.

**Step 2: Search for remaining casual copy**

```bash
grep -rn "Oops\|oops\|dev/null\|Let's build\|Talk to a human\|Discuss your\|What I Build" --include="*.json" --include="*.html" .
```

Fix any stragglers found.

**Step 3: Visual check in browser**

Open each page and verify:
- [ ] Navy + gold color scheme throughout
- [ ] No bouncing, pulsing, or particle effects
- [ ] Terminal still works with typing animation
- [ ] GitHub chart displays in gold
- [ ] Sections fade in on scroll
- [ ] Hover states are subtle (lift only, no glow)
- [ ] Copy reads as authoritative, no jokes or casual language
- [ ] French toggle works and shows updated FR copy
- [ ] Mobile responsive still works

**Step 4: Final commit**

```
git commit -m "feat: complete professional tone redesign — navy+gold, authoritative copy"
```
