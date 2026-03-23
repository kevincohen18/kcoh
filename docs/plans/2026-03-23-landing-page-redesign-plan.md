# Landing Page Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild index.html and styles.css from scratch to match the approved design document at `docs/plans/2026-03-23-landing-page-redesign-design.md`.

**Architecture:** Complete rewrite of index.html (new semantic structure, new copy, removed sections) and styles.css (new visual system, new palette, new typography). script.js stripped to minimal functionality (FAQ accordion, navbar scroll, subtle scroll animations). terminal.js removed entirely.

**Tech Stack:** HTML, CSS (vanilla, no framework), vanilla JS, Google Fonts (Instrument Serif + Inter)

**Design doc:** `docs/plans/2026-03-23-landing-page-redesign-design.md`

---

### Task 1: Create new styles.css from scratch

**Files:**
- Rewrite: `styles.css` (complete replacement)

**Step 1: Read the current file**

Read `styles.css` to confirm it's been reviewed (required before Write).

**Step 2: Write the new stylesheet**

The new stylesheet implements the full visual system from the design doc:

```css
/* KCOH Software Inc. — Redesign 2026 */

/* Reset */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    background-color: #f7f5f0;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #1a1a1a;
    background-color: #f7f5f0;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* --- Typography --- */

.label {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #8a8a8a;
}

h1, h2, .headline {
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    color: #1a1a1a;
    line-height: 1.2;
}

h1 {
    font-size: clamp(2.75rem, 5vw, 4rem);
    max-width: 680px;
    letter-spacing: -0.02em;
}

h2 {
    font-size: 2rem;
    max-width: 680px;
}

p {
    max-width: 540px;
}

/* --- Layout --- */

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 2rem;
    width: 100%;
}

@media (max-width: 480px) {
    .container {
        padding: 0 1.25rem;
    }
}

/* --- Navigation --- */

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(247, 245, 240, 0.95);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: box-shadow 0.3s ease;
}

.navbar.scrolled {
    box-shadow: 0 1px 0 #e5e5e0;
}

.nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 0;
}

.nav-logo {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    color: #1a1a1a;
    text-decoration: none;
    letter-spacing: 0.05em;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
}

.nav-links a {
    font-size: 0.9rem;
    font-weight: 500;
    color: #4a4a4a;
    text-decoration: none;
    transition: color 0.2s ease;
}

.nav-links a:hover {
    color: #1a1a1a;
}

.nav-cta {
    display: inline-flex;
    align-items: center;
    padding: 0.6rem 1.25rem;
    background: #b45309;
    color: #fff !important;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease, transform 0.2s ease;
}

.nav-cta:hover {
    background: #a14b08;
    transform: translateY(-1px);
}

/* Mobile nav */
.mobile-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
}

.mobile-toggle span {
    display: block;
    width: 22px;
    height: 2px;
    background: #1a1a1a;
    margin: 5px 0;
    border-radius: 1px;
    transition: all 0.3s ease;
}

@media (max-width: 768px) {
    .mobile-toggle {
        display: block;
    }

    .nav-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        background: #f7f5f0;
        padding: 1.5rem 2rem;
        gap: 1rem;
        border-bottom: 1px solid #e5e5e0;
    }

    .nav-links.open {
        display: flex;
    }
}

/* --- Hero --- */

.hero {
    padding: 10rem 0 6rem;
}

.hero-content {
    max-width: 680px;
}

.hero .label {
    margin-bottom: 1.5rem;
}

.hero h1 {
    margin-bottom: 1.5rem;
}

.hero-supporting {
    font-size: 1.1rem;
    color: #4a4a4a;
    line-height: 1.7;
    margin-bottom: 2.5rem;
    max-width: 480px;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    padding: 0.875rem 2rem;
    background: #b45309;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.btn-primary:hover {
    background: #a14b08;
    transform: translateY(-1px);
}

.btn-secondary {
    display: inline-flex;
    align-items: center;
    padding: 0.875rem 2rem;
    background: transparent;
    color: #1a1a1a;
    border: 1.5px solid #334155;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease;
}

.btn-secondary:hover {
    border-color: #1a1a1a;
}

.hero-proof {
    font-size: 0.85rem;
    color: #8a8a8a;
}

.hero-proof a {
    color: #b45309;
    text-decoration: none;
}

.hero-proof a:hover {
    text-decoration: underline;
}

/* --- Credibility Strip --- */

.credibility-strip {
    padding: 3rem 0;
}

.credibility-row {
    display: flex;
    gap: 3rem;
    align-items: baseline;
}

.credibility-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-right: 3rem;
    border-right: 1px solid #e5e5e0;
}

.credibility-item:last-child {
    border-right: none;
    padding-right: 0;
}

.credibility-number {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1.75rem;
    font-weight: 400;
    color: #1a1a1a;
}

.credibility-label {
    font-size: 0.85rem;
    color: #6a6a6a;
    font-weight: 400;
}

@media (max-width: 640px) {
    .credibility-row {
        flex-direction: column;
        gap: 1.5rem;
    }

    .credibility-item {
        border-right: none;
        padding-right: 0;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #e5e5e0;
    }

    .credibility-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }
}

/* --- Operator Story --- */

.operator-story {
    padding: 5rem 0;
}

.operator-story .label {
    margin-bottom: 1.25rem;
}

.operator-story h2 {
    margin-bottom: 2rem;
}

.operator-story p {
    font-size: 1.05rem;
    color: #4a4a4a;
    line-height: 1.75;
    margin-bottom: 1.5rem;
}

.operator-story p:last-of-type {
    margin-bottom: 0;
}

/* --- Case Studies --- */

.case-studies {
    padding: 5rem 0;
}

.case-studies .label {
    margin-bottom: 1.25rem;
}

.case-studies > .container > h2 {
    margin-bottom: 3.5rem;
}

/* Featured case study */
.featured-case {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 4rem;
    align-items: center;
    margin-bottom: 4rem;
}

.featured-case.reversed {
    grid-template-columns: 1.2fr 1fr;
}

.featured-case.reversed .case-text {
    order: 2;
}

.featured-case.reversed .case-visual {
    order: 1;
}

.case-tag {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
}

.case-tag.copper {
    color: #b45309;
}

.case-tag.slate {
    color: #334155;
}

.case-title {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1.75rem;
    font-weight: 400;
    color: #1a1a1a;
    line-height: 1.3;
    margin-bottom: 1rem;
}

.case-description {
    font-size: 1rem;
    color: #4a4a4a;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    max-width: 440px;
}

.case-details {
    list-style: none;
    padding: 0;
    margin-bottom: 1.5rem;
}

.case-details li {
    font-size: 0.875rem;
    color: #6a6a6a;
    line-height: 1.6;
    padding: 0.35rem 0;
}

.case-details li::before {
    content: '\2014\00a0';
    color: #b45309;
}

.case-link {
    font-size: 0.9rem;
    font-weight: 600;
    color: #b45309;
    text-decoration: none;
    transition: color 0.2s ease;
}

.case-link:hover {
    color: #a14b08;
}

.case-link::after {
    content: ' \2192';
}

/* Case visual / screenshot */
.case-visual {
    position: relative;
}

.browser-frame {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    border: 1px solid #e5e5e0;
}

.browser-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: #fafaf8;
    border-bottom: 1px solid #e5e5e0;
}

.browser-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d1d1d1;
}

.browser-url {
    font-size: 0.75rem;
    color: #8a8a8a;
    margin-left: 0.75rem;
}

.browser-frame img {
    display: block;
    width: 100%;
    height: auto;
}

.screenshot-placeholder {
    aspect-ratio: 16 / 10;
    background: #eae8e3;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8a8a8a;
    font-size: 0.85rem;
}

@media (max-width: 768px) {
    .featured-case,
    .featured-case.reversed {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .featured-case.reversed .case-text,
    .featured-case.reversed .case-visual {
        order: unset;
    }

    .case-title {
        font-size: 1.5rem;
    }
}

/* Secondary work list */
.secondary-work {
    margin-top: 3rem;
    padding-top: 3rem;
    border-top: 1px solid #e5e5e0;
}

.secondary-item {
    display: flex;
    gap: 0.5rem;
    padding: 1rem 0;
    border-bottom: 1px solid #e5e5e0;
    align-items: baseline;
}

.secondary-item:last-child {
    border-bottom: none;
}

.secondary-name {
    font-weight: 600;
    color: #1a1a1a;
    font-size: 1rem;
    flex-shrink: 0;
}

.secondary-name::after {
    content: '\00a0\2014\00a0';
    color: #d1d1d1;
    font-weight: 400;
}

.secondary-desc {
    color: #6a6a6a;
    font-size: 1rem;
}

/* --- How I Work --- */

.how-i-work {
    padding: 4rem 0;
    border-top: 1px solid #e5e5e0;
}

.how-i-work .label {
    margin-bottom: 1.25rem;
}

.how-i-work h2 {
    margin-bottom: 2.5rem;
}

.process-list {
    max-width: 540px;
}

.process-item {
    display: flex;
    gap: 1.25rem;
    padding: 1.25rem 0;
    border-bottom: 1px solid #e5e5e0;
    align-items: baseline;
}

.process-item:last-child {
    border-bottom: none;
}

.process-number {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1.5rem;
    color: #b45309;
    flex-shrink: 0;
    line-height: 1;
}

.process-content h3 {
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 0.35rem;
}

.process-content p {
    font-size: 0.95rem;
    color: #4a4a4a;
    line-height: 1.6;
}

/* --- Who This Is For --- */

.who-this-is-for {
    padding: 4rem 0;
}

.who-this-is-for .label {
    margin-bottom: 1.25rem;
}

.who-this-is-for h2 {
    margin-bottom: 2rem;
    max-width: 540px;
}

.audience-statements {
    max-width: 540px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.audience-statements p {
    font-size: 1.05rem;
    color: #4a4a4a;
    line-height: 1.75;
}

/* --- Mid-Page CTA --- */

.mid-cta {
    padding: 5rem 0;
    background: #1c1917;
    text-align: center;
}

.mid-cta h2 {
    color: #f7f5f0;
    margin: 0 auto 1rem;
    font-size: 1.75rem;
}

.mid-cta p {
    color: #a3a3a3;
    font-size: 1rem;
    margin: 0 auto 2rem;
    max-width: 460px;
}

.mid-cta .btn-primary {
    margin: 0 auto;
}

/* --- FAQ --- */

.faq {
    padding: 4rem 0;
}

.faq .label {
    margin-bottom: 1.25rem;
}

.faq h2 {
    margin-bottom: 2.5rem;
}

.faq-list {
    max-width: 640px;
}

.faq-item {
    border-bottom: 1px solid #e5e5e0;
}

.faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1.25rem 0;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
    transition: color 0.2s ease;
}

.faq-question:hover {
    color: #b45309;
}

.faq-icon {
    font-size: 1.25rem;
    color: #8a8a8a;
    transition: transform 0.3s ease;
    flex-shrink: 0;
    margin-left: 1rem;
}

.faq-item.open .faq-icon {
    transform: rotate(45deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
}

.faq-item.open .faq-answer {
    max-height: 200px;
    padding-bottom: 1.25rem;
}

.faq-answer p {
    font-size: 0.95rem;
    color: #4a4a4a;
    line-height: 1.7;
    max-width: 540px;
}

/* --- Final CTA --- */

.final-cta {
    padding: 5rem 0 3rem;
}

.final-cta h2 {
    margin-bottom: 1.25rem;
}

.final-cta .subline {
    font-size: 0.9rem;
    color: #8a8a8a;
    margin-bottom: 2rem;
}

.final-cta .subline a {
    color: #b45309;
    text-decoration: none;
}

.final-cta .subline a:hover {
    text-decoration: underline;
}

/* --- Footer --- */

.footer {
    padding: 2rem 0;
    border-top: 1px solid #e5e5e0;
}

.footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-brand {
    font-weight: 600;
    font-size: 0.9rem;
    color: #1a1a1a;
}

.footer-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.footer-links a {
    color: #6a6a6a;
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.2s ease;
}

.footer-links a:hover {
    color: #1a1a1a;
}

.footer-copyright {
    text-align: center;
    padding-top: 1.5rem;
    font-size: 0.8rem;
    color: #8a8a8a;
}

@media (max-width: 640px) {
    .footer-inner {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}

/* --- Scroll Animation --- */

.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
    .fade-in {
        opacity: 1;
        transform: none;
        transition: none;
    }
}

/* --- Focus States --- */

a:focus-visible,
button:focus-visible {
    outline: 2px solid #b45309;
    outline-offset: 2px;
}
```

**Step 3: Verify the file was written**

Open the file and confirm the new palette, typography, and layout classes are all present.

**Step 4: Commit**

```bash
git add styles.css
git commit -m "feat: rewrite styles.css with new visual system

Warm off-white palette, Instrument Serif headlines, copper accent,
left-aligned asymmetric layout. Removes all AI template patterns:
glows, gradients, backdrop-blur, animated effects."
```

---

### Task 2: Rewrite index.html with new structure

**Files:**
- Rewrite: `index.html` (complete replacement of body content, preserve head meta)

**Step 1: Read the current file**

Read `index.html` to confirm it's been reviewed.

**Step 2: Write the new HTML**

New HTML structure with all approved sections. Preserves: meta tags, Open Graph, structured data, favicon, CSP header. Removes: loader, scroll progress, back-to-top, search, theme toggle, language toggle, terminal, code showcase, GitHub graph. Adds: Instrument Serif font. Updates: all copy per design doc.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="I built and operated a 7-figure platform with 2,500+ members. I now build software systems that automate operations and add financial clarity for businesses.">
    <meta name="keywords" content="business automation, financial clarity systems, operational leverage, platform operator, systems engineer, workflow automation, payment systems">
    <meta name="author" content="Kevin Cohen - KCOH Software Inc.">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://kcoh.ca">
    <meta name="theme-color" content="#f7f5f0">

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://kcoh.ca/">
    <meta property="og:title" content="Kevin Cohen — Operator, Systems Engineer, KCOH Software Inc.">
    <meta property="og:description" content="Built and operated a 7-figure platform with 2,500+ members. I build software systems that automate operations and add financial clarity.">
    <meta property="og:image" content="https://kcoh.ca/success.png">
    <meta property="og:site_name" content="KCOH Software Inc.">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://kcoh.ca/">
    <meta name="twitter:title" content="Kevin Cohen — Operator, Systems Engineer">
    <meta name="twitter:description" content="Built and operated a 7-figure platform with 2,500+ members. I build software systems that automate operations and add financial clarity.">
    <meta name="twitter:image" content="https://kcoh.ca/success.png">

    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="apple-touch-icon" href="favicon.svg">

    <title>KCOH Software Inc. — Systems That Replace Manual Work</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "KCOH Software Inc.",
        "url": "https://kcoh.ca",
        "description": "Software systems that automate operations and add financial clarity. Led by an operator who built and scaled a 7-figure platform with 2,500+ members.",
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "email": "inquiries@kcoh.ca",
            "areaServed": "CA",
            "availableLanguage": ["English", "French"]
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "CA"
        }
    }
    </script>
</head>
<body>

    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="container">
            <div class="nav-inner">
                <a href="index.html" class="nav-logo">KCOH</a>
                <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-links" id="navLinks">
                    <li><a href="services.html">Services</a></li>
                    <li><a href="portfolio.html">Portfolio</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="https://cal.com/kevin-cohen-utwpmj/consultation" target="_blank" rel="noopener noreferrer" class="nav-cta">Book a Call</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
        <div class="container">
            <div class="hero-content fade-in">
                <p class="label">KCOH Software Inc.</p>
                <h1>I've built and operated the systems that most companies only talk about.</h1>
                <p class="hero-supporting">Automation, financial clarity, and operational leverage — built by someone who scaled a 7-figure platform from the inside.</p>
                <div class="hero-buttons">
                    <a href="https://cal.com/kevin-cohen-utwpmj/consultation" target="_blank" rel="noopener noreferrer" class="btn-primary">Book a Conversation</a>
                    <a href="#case-studies" class="btn-secondary">See What I've Built</a>
                </div>
                <p class="hero-proof">Currently taking on new projects · <a href="mailto:inquiries@kcoh.ca">inquiries@kcoh.ca</a></p>
            </div>
        </div>
    </section>

    <!-- Credibility Strip -->
    <section class="credibility-strip">
        <div class="container">
            <div class="credibility-row fade-in">
                <div class="credibility-item">
                    <span class="credibility-number">7-figure</span>
                    <span class="credibility-label">Platform built & operated</span>
                </div>
                <div class="credibility-item">
                    <span class="credibility-number">2,500+</span>
                    <span class="credibility-label">Members managed at scale</span>
                </div>
                <div class="credibility-item">
                    <span class="credibility-number">10+</span>
                    <span class="credibility-label">Production apps shipped</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Operator Story -->
    <section class="operator-story">
        <div class="container">
            <div class="fade-in">
                <p class="label">How I'm Different</p>
                <h2>I don't just write code. I've run the business that needed it.</h2>
                <p>Most developers build what you spec. I've been on the other side — operating a platform with thousands of members, handling payments, disputes, uptime, and the kind of edge cases that only show up at scale.</p>
                <p>That experience changed how I build. I design systems around how businesses actually run, not how they look in a wireframe. Financial clarity, automated workflows, operational leverage — these aren't features I list. They're problems I've solved for myself.</p>
                <p>When I build for you, I'm applying judgment I earned by operating, not just engineering.</p>
            </div>
        </div>
    </section>

    <!-- Case Studies -->
    <section class="case-studies" id="case-studies">
        <div class="container">
            <p class="label">What I've Built</p>
            <h2>Real systems in production, not side projects.</h2>

            <!-- Featured: Draftory -->
            <div class="featured-case fade-in">
                <div class="case-text">
                    <p class="case-tag copper">SaaS Platform</p>
                    <h3 class="case-title">Draftory — From blank page to signed contract in minutes</h3>
                    <p class="case-description">A full contract generation and e-signature platform. 8 contract types, built-in electronic signatures, and a native iOS companion app.</p>
                    <ul class="case-details">
                        <li>8 contract types with built-in e-signatures</li>
                        <li>AES-256-GCM encryption, passkey auth, TOTP 2FA</li>
                        <li>React, Node.js, Stripe, Cloudflare, Railway</li>
                    </ul>
                    <a href="https://draftory.ca" target="_blank" rel="noopener noreferrer" class="case-link">Visit draftory.ca</a>
                </div>
                <div class="case-visual">
                    <div class="browser-frame">
                        <div class="browser-bar">
                            <span class="browser-dot"></span>
                            <span class="browser-dot"></span>
                            <span class="browser-dot"></span>
                            <span class="browser-url">draftory.ca</span>
                        </div>
                        <div class="screenshot-placeholder">Screenshot: draftory.ca</div>
                    </div>
                </div>
            </div>

            <!-- Featured: Skyroa -->
            <div class="featured-case reversed fade-in">
                <div class="case-text">
                    <p class="case-tag slate">Fintech</p>
                    <h3 class="case-title">Skyroa — Regulated escrow for digital goods</h3>
                    <p class="case-description">Secure escrow protecting buyers and sellers in digital transactions. KYC verification, dispute resolution, real-time chat, and FINTRAC-aligned compliance.</p>
                    <ul class="case-details">
                        <li>Double-entry ledger, FINTRAC-aligned compliance</li>
                        <li>KYC verification, dispute resolution, real-time chat</li>
                        <li>NestJS, PostgreSQL, Redis, Stripe, Plaid</li>
                    </ul>
                    <a href="https://skyroa.com" target="_blank" rel="noopener noreferrer" class="case-link">Visit skyroa.com</a>
                </div>
                <div class="case-visual">
                    <div class="browser-frame">
                        <div class="browser-bar">
                            <span class="browser-dot"></span>
                            <span class="browser-dot"></span>
                            <span class="browser-dot"></span>
                            <span class="browser-url">skyroa.com</span>
                        </div>
                        <div class="screenshot-placeholder">Screenshot: skyroa.com</div>
                    </div>
                </div>
            </div>

            <!-- Secondary Work -->
            <div class="secondary-work fade-in">
                <div class="secondary-item">
                    <span class="secondary-name">Digital Platform</span>
                    <span class="secondary-desc">Built and operated a 7-figure platform with 2,500+ members</span>
                </div>
                <div class="secondary-item">
                    <span class="secondary-name">iOS Apps</span>
                    <span class="secondary-desc">10+ production apps shipped to the App Store</span>
                </div>
                <div class="secondary-item">
                    <span class="secondary-name">FrostyNow</span>
                    <span class="secondary-desc">IoT smart window control with HomeKit integration</span>
                </div>
                <div class="secondary-item">
                    <span class="secondary-name">Payment Operations</span>
                    <span class="secondary-desc">Managed payment flows, disputes, and reconciliation at scale</span>
                </div>
            </div>
        </div>
    </section>

    <!-- How I Work -->
    <section class="how-i-work">
        <div class="container">
            <div class="fade-in">
                <p class="label">Process</p>
                <h2>Four steps. No mystery.</h2>
                <div class="process-list">
                    <div class="process-item">
                        <span class="process-number">1</span>
                        <div class="process-content">
                            <h3>Map the system</h3>
                            <p>I audit your current workflows, data flows, and bottlenecks before writing any code.</p>
                        </div>
                    </div>
                    <div class="process-item">
                        <span class="process-number">2</span>
                        <div class="process-content">
                            <h3>Find the leverage</h3>
                            <p>Identify which automations will yield the highest operational ROI and prioritize the build.</p>
                        </div>
                    </div>
                    <div class="process-item">
                        <span class="process-number">3</span>
                        <div class="process-content">
                            <h3>Build and ship</h3>
                            <p>Clean architecture, proper testing, integration with your existing tools. Deployed to production.</p>
                        </div>
                    </div>
                    <div class="process-item">
                        <span class="process-number">4</span>
                        <div class="process-content">
                            <h3>Support and iterate</h3>
                            <p>Monitor performance, train your team, and iterate based on real usage.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Who This Is For -->
    <section class="who-this-is-for">
        <div class="container">
            <div class="fade-in">
                <p class="label">Is This You</p>
                <h2>This is for founders who've outgrown manual processes.</h2>
                <div class="audience-statements">
                    <p>Your business works, but it runs on spreadsheets, manual steps, and tribal knowledge.</p>
                    <p>You need financial visibility you don't currently have — real cashflow clarity, not just accounting.</p>
                    <p>You want to scale operations without hiring a team for every new function.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Mid-Page CTA -->
    <section class="mid-cta">
        <div class="container">
            <div class="fade-in">
                <h2>Let's talk about what you're building.</h2>
                <p>30-minute call. No pitch, no pressure. Just a conversation about your systems.</p>
                <a href="https://cal.com/kevin-cohen-utwpmj/consultation" target="_blank" rel="noopener noreferrer" class="btn-primary">Book a Conversation</a>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="faq">
        <div class="container">
            <div class="fade-in">
                <p class="label">Common Questions</p>
                <h2>Before you book.</h2>
                <div class="faq-list">
                    <div class="faq-item">
                        <button class="faq-question" aria-expanded="false">
                            What's your availability?
                            <span class="faq-icon">+</span>
                        </button>
                        <div class="faq-answer">
                            <p>I'm currently taking on new projects. Book a call and we'll discuss timeline and fit.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question" aria-expanded="false">
                            How do you price engagements?
                            <span class="faq-icon">+</span>
                        </button>
                        <div class="faq-answer">
                            <p>Project-based pricing scoped after our initial conversation. No hourly billing, no surprises.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question" aria-expanded="false">
                            Do you work with early-stage companies?
                            <span class="faq-icon">+</span>
                        </button>
                        <div class="faq-answer">
                            <p>Yes, if the problem is clear and the engagement is well-scoped. Stage matters less than clarity.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question" aria-expanded="false">
                            What does a typical engagement look like?
                            <span class="faq-icon">+</span>
                        </button>
                        <div class="faq-answer">
                            <p>It starts with a systems audit, then a prioritized build plan, then execution. Most projects run 4-12 weeks.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question" aria-expanded="false">
                            Can you work with my existing tools and team?
                            <span class="faq-icon">+</span>
                        </button>
                        <div class="faq-answer">
                            <p>Yes. I integrate with whatever you're already using and train your team on the new systems.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta">
        <div class="container">
            <div class="fade-in">
                <h2>If this sounds like what you need, let's talk.</h2>
                <p class="subline">Or reach out directly at <a href="mailto:inquiries@kcoh.ca">inquiries@kcoh.ca</a></p>
                <a href="https://cal.com/kevin-cohen-utwpmj/consultation" target="_blank" rel="noopener noreferrer" class="btn-primary">Book a Conversation</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-inner">
                <span class="footer-brand">KCOH Software Inc.</span>
                <div class="footer-links">
                    <a href="https://www.linkedin.com/in/kevin-cohen-entrepreneur/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="mailto:inquiries@kcoh.ca">inquiries@kcoh.ca</a>
                </div>
            </div>
            <p class="footer-copyright">&copy; 2026 KCOH Software Inc. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js" defer></script>
</body>
</html>
```

**Step 3: Verify the file**

Confirm the new HTML matches the approved section structure from the design doc.

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: rewrite index.html with new page structure

New narrative arc: hero, credibility strip, operator story,
tiered case studies, process, audience, mid-CTA, FAQ, final CTA.
Removes: code showcase, terminal, GitHub graph, loader, search,
theme/language toggles. New copy throughout."
```

---

### Task 3: Rewrite script.js — minimal functionality

**Files:**
- Rewrite: `script.js` (strip to essentials)
- Delete: `terminal.js` (no longer needed)
- Delete: `quick-wins.css` (no longer needed)
- Delete: `init.js` (loader no longer exists)

**Step 1: Read current script.js**

Read to confirm reviewed.

**Step 2: Write minimal script.js**

Only three features remain: navbar scroll detection, FAQ accordion, scroll-triggered fade-in.

```javascript
// KCOH Software Inc. — Minimal JS

(function () {
    'use strict';

    // Navbar scroll state
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    // Mobile menu toggle
    const toggle = document.getElementById('mobileToggle');
    const links = document.getElementById('navLinks');
    if (toggle && links) {
        toggle.addEventListener('click', function () {
            links.classList.toggle('open');
        });
    }

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq-item').forEach(function (el) {
                el.classList.remove('open');
                el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked (if it wasn't already open)
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Scroll-triggered fade-in
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(function (el) {
        observer.observe(el);
    });
})();
```

**Step 3: Delete files no longer needed**

```bash
rm terminal.js
rm quick-wins.css
rm init.js
```

**Step 4: Commit**

```bash
git add script.js
git rm terminal.js quick-wins.css init.js
git commit -m "feat: strip script.js to essentials, remove dead files

Only navbar scroll, mobile menu, FAQ accordion, and scroll fade-in
remain. Removes: loader logic, particles, search, theme toggle,
contribution graph, terminal, and all animation JS."
```

---

### Task 4: Update shared.css for new palette

**Files:**
- Modify: `assets/css/shared.css` (update CSS variables for other pages)

**Step 1: Read shared.css**

Read the full file to understand what other pages depend on.

**Step 2: Update root variables**

Update the `:root` and dark-theme variables to use the new warm palette. This ensures services.html, portfolio.html, about.html, contact.html don't break visually. Those pages will need their own redesign later, but the shared variables should at least shift toward the new direction.

**Step 3: Commit**

```bash
git add assets/css/shared.css
git commit -m "chore: update shared.css variables toward new palette"
```

---

### Task 5: Clean up dist/ and remove stale references

**Files:**
- Delete: `dist/styles.min.css` (stale minified version)
- Delete: `dist/quick-wins.min.css` (no longer exists)
- Verify: no other files reference `quick-wins.css`, `terminal.js`, or `init.js`

**Step 1: Search for stale references**

```bash
grep -r "quick-wins" --include="*.html" --include="*.js" .
grep -r "terminal.js" --include="*.html" .
grep -r "init.js" --include="*.html" .
grep -r "i18n.js" --include="*.html" . # index.html no longer loads this
```

**Step 2: Clean up any found references in other HTML pages**

If services.html, about.html, etc. reference these files, update them.

**Step 3: Remove stale dist files**

```bash
rm dist/styles.min.css dist/quick-wins.min.css
```

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove stale dist files and dead references"
```

---

### Task 6: Visual QA and browser test

**Step 1: Open in browser**

Open `index.html` in a browser and verify:
- [ ] Warm off-white background renders correctly
- [ ] Instrument Serif loads for headlines
- [ ] Hero is left-aligned, not centered
- [ ] Credibility strip displays in a row with vertical dividers
- [ ] Operator story section is narrow-column, left-aligned
- [ ] Featured case studies alternate layout (text-left/image-right, then reversed)
- [ ] Secondary work list renders as simple text lines
- [ ] Process section is a vertical numbered list
- [ ] Mid-page CTA has dark background
- [ ] FAQ accordion opens/closes correctly
- [ ] Mobile nav toggle works
- [ ] All Cal.com links work
- [ ] No gold/amber colors anywhere
- [ ] No glow effects anywhere
- [ ] Footer is minimal single row

**Step 2: Test mobile (< 768px)**

- [ ] Nav collapses to hamburger
- [ ] Case study grids stack to single column
- [ ] Credibility strip stacks vertically
- [ ] All text is readable, no overflow

**Step 3: Fix any issues found**

Address bugs, spacing issues, or broken elements.

**Step 4: Final commit**

```bash
git add -A
git commit -m "fix: visual QA adjustments from browser testing"
```
