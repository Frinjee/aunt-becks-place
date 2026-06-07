# Accessibility and Core Web Vitals audit report

**Date:** 2026-06-07  
**Scope:** `/`, `/about`, `/events`, `/donate`, `/contact`  
**Targets:** Local production build (`localhost:3000`) and live production (`https://www.auntbecksplace.live`)  
**Mode:** Findings only. No site code changes were made.

---

## Executive summary

The site has a strong accessibility baseline: semantic landmarks, skip link, labeled contact form, dyslexia-friendly fonts, visible focus rings, reduced-motion support, and `next/image` usage throughout. ESLint, Stylelint, TypeScript, and production build all pass cleanly.

The highest-impact gaps are:

1. **Reveal animations hide SSR content** until client JavaScript runs (about, contact, donate, events).
2. **Missing `sitemap.xml`** while `robots.txt` advertises it (404 on production).
3. **Missing Open Graph images** at `/images/*-og.jpg` (404 on production).
4. **Mobile LCP at 3.7s** on production home (target &lt; 2.5s), driven mainly by the hero logo image pipeline.
5. **Muted text contrast** fails WCAG AA on the darkest gradient stop in edge cases.

Local and production show **the same accessibility issue patterns** in SSR HTML. Hash differences between saved HTML snapshots are build-artifact noise only (chunk IDs, timestamps); structure and findings align.

---

## Methods and evidence

| Check                                                     | Result                                                         |
| --------------------------------------------------------- | -------------------------------------------------------------- |
| `npm run lint`                                            | Pass                                                           |
| `npm run lint:css`                                        | Pass                                                           |
| `npm run typecheck`                                       | Pass                                                           |
| `npm run build`                                           | Pass (Next.js 16.2.7, 5 static routes + robots)                |
| SSR HTML analysis (local + prod, 5 routes)                | Saved to `audit/local-*.html`, `audit/prod-*.html`             |
| Custom HTML a11y analyzer                                 | `audit/analyze-html.mjs`                                       |
| Lighthouse CLI (local)                                    | Blocked: no Chrome in environment                              |
| PageSpeed Insights API                                    | Rate-limited (429) during this run                             |
| BrowserStack MCP                                          | Server errored (unavailable)                                   |
| Existing Lighthouse reports (repo root, prod home, today) | `lighthouse-mobile.json`, `lighthouse-desktop.json`            |
| Bundle size                                               | `.next/static/chunks` ≈ **197 KB gzip** (within 200 KB budget) |
| Contrast math                                             | Design token pairs calculated in Node                          |

---

## Core Web Vitals (production home)

From `lighthouse-mobile.json` (2026-06-07, mobile emulation):

| Metric                   | Value     | Target        | Status   |
| ------------------------ | --------- | ------------- | -------- |
| Lighthouse Performance   | **89**    | ≥ 85          | Pass     |
| Lighthouse Accessibility | **100**   | ≥ 90          | Pass     |
| LCP                      | **3.7 s** | &lt; 2.5 s    | **Fail** |
| CLS                      | **0**     | &lt; 0.1      | Pass     |
| TBT                      | **20 ms** | proxy for INP | Pass     |
| FCP                      | 1.1 s     | —             | Good     |
| Speed Index              | 1.8 s     | —             | Good     |

From `lighthouse-desktop.json` (same day):

| Metric        | Value     |
| ------------- | --------- |
| Performance   | **96**    |
| Accessibility | **100**   |
| LCP           | **1.3 s** |
| CLS           | **0**     |

**LCP element:** Hero brand mark (`hero__title-logo`, `abp-logo-1`). Current deploy serves **WebP** (verified in live HTML). An earlier Lighthouse run today referenced `.png`; production now matches local WebP usage.

**Contributing perf factors (0% visual fixes where noted):**

- Hero `sizes="100vw"` over-fetches for a logo capped at ~56rem in CSS. Tightening `sizes` is 0% visual.
- Four font preloads on every page compete with LCP image preload.
- GTM inline script in `<head>` adds third-party work (needs approval to change).
- News image `rebekah-opher-feature2-crop.webp` is **1.8 MB** source file (below fold, but heavy if prioritized or on slow networks).
- `backdrop-filter: blur(4px)` on cards adds compositing cost on low-end mobile.

---

## Findings by severity

### Critical / high

#### 1. Reveal content invisible until JavaScript (high)

**Routes:** `/about`, `/contact`, `/donate`, `/events`  
**WCAG:** 1.3.1 Info and Relationships, 2.2.2 Pause/Stop/Hide (content must be available)  
**Evidence:** SSR HTML ships `.reveal` without `.is-visible`. CSS sets `opacity: 0` until `IntersectionObserver` runs in `components/Reveal.tsx`. `prefers-reduced-motion` fixes motion-sensitive users but **not** no-JS or slow-JS users.  
**Impact:** **0% visual**  
**Fix:** Add `@media (scripting: none)` or `.reveal { opacity: 1; transform: none; }` fallback, or render visible by default and only animate when JS enhances.

#### 2. Missing sitemap (high, SEO + crawl)

**WCAG/SEO:** Crawl foundations  
**Evidence:** `app/robots.ts` points to `https://www.auntbecksplace.live/sitemap.xml`. Production returns **404**. No `app/sitemap.ts` in repo.  
**Impact:** **0% visual**  
**Fix:** Add `app/sitemap.ts` listing all five public routes with `metadataBase` URLs.

#### 3. Missing Open Graph images (high, SEO/social)

**Evidence:** Metadata on all pages references `/images/home-og.jpg`, `/images/about-og.jpg`, etc. Production returns **404** for `home-og.jpg` (spot-checked).  
**Impact:** **0% visual** (unless wrong image chosen)  
**Fix:** Add images under `public/images/` or point metadata to existing brand assets.

---

### Medium

#### 4. External links open new tab without programmatic hint (medium)

**Routes:** `/` (IndexRow + MediaFeature), footer socials  
**WCAG:** 3.2.5 Change on Request (G201 best practice)  
**Evidence:** Six `target="_blank"` links on home; social buttons have `aria-label` but not “opens in new tab”.  
**Impact:** **0% visual**  
**Fix:** Append visually hidden `<span class="sr-only"> (opens in new tab)</span>` or extend `aria-label` on `IndexRow`, `MediaFeature`, `SocialButton`.

#### 5. Home heading outline: sibling h2 elements (medium)

**Route:** `/`  
**WCAG:** 1.3.1  
**Evidence:** `OffsetGrid` → `StoryCard title="Our Story"` renders card `h2`, then another `h2` “Mission” inside the same card body. Outline: h1 → h2 Our Story → h2 Mission → h3s → h2 Sunday Dinner → h2 Happenings → h2 Media features.  
**Impact:** **0% visual** (change levels only)  
**Fix:** Demote inner “Mission” to `h3` or split into separate cards/sections.

#### 6. Muted text contrast on dark gradient (medium)

**WCAG:** 1.4.3 Contrast (Minimum)  
**Evidence:** `--color-text-muted` (#76547d) on `#d7b0dc` (gradient dark end) = **3.34:1** (needs 4.5:1). Body text (#52325b) on same stop = 5.66:1 (passes). Meta labels use muted color.  
**Impact:** **≤ 0.05% visual** if muted token darkened slightly only where needed  
**Fix:** Darken `--color-text-muted` by ~8–10% or use body text color for meta labels on saturated gradient areas.

#### 7. Mobile LCP above target (medium, CWV)

**Route:** `/`  
**Evidence:** Lighthouse mobile LCP **3.7 s** vs 2.5 s target. CLS and TBT are excellent.  
**Impact:** **0% visual** for `sizes` tuning and fetchpriority; image recompression may be imperceptible  
**Fix (prioritized, 0% visual first):**

- Tighten hero `sizes` to match rendered width (~`(max-width: 768px) 100vw, 56rem`).
- Keep WebP hero asset (already deployed).
- Consider reducing font preloads to weights actually used.
- Re-compress hero source if Next optimizer output still &gt; ~100 KB at mobile widths.

---

### Low

#### 8. Media card titles are spans, not headings (low)

**Route:** `/`  
**WCAG:** 1.3.1 (document outline)  
**Evidence:** `MediaFeature` uses `<span class="media-feature__title">`. Section already has h2 “Media features”.  
**Impact:** **0% visual** if promoted to h3 inside card pattern  
**Fix:** Optional h3 inside each article for richer outline.

#### 9. Footer emoji may read oddly (low)

**Route:** All  
**Evidence:** “Made with 💜” in `components/Footer.tsx`.  
**Impact:** **0% visual**  
**Fix:** `aria-hidden` on emoji with visible text unchanged, or replace with “love”.

#### 10. Contact form disables native validation (low)

**Route:** `/contact`  
**Evidence:** `noValidate` on form; server-side errors are well wired (`aria-invalid`, `role="alert"`).  
**Impact:** **0% visual**  
**Fix:** Acceptable as-is for server-first validation; optional `aria-describedby` for format hints.

#### 11. No `prefers-reduced-transparency` / `forced-colors` fallbacks (low)

**Evidence:** Glass cards use `backdrop-filter`. No `@media (forced-colors: active)` rules.  
**Impact:** **≤ 0.05% visual**  
**Fix:** Add solid background fallback when transparency is reduced or forced-colors is active.

#### 12. Dead CSS rule `#community-title` (low)

**Evidence:** `nowrap` rule in `globals.css` but no matching element in current components.  
**Impact:** **0% visual**  
**Fix:** Remove unused rule to prevent future overflow regressions.

---

## Manual WCAG pass notes

### Keyboard and focus

- Skip link → `#content` present in layout; visible on `:focus` (not `:focus-visible` only).
- Tab order: skip → brand → nav links → main → footer socials. Logical.
- Global `:focus-visible` outline on links and buttons; form fields have dedicated outlines in `ContactForm.module.css`.
- Nav links and donate CTA meet **44×44 px** min-height. Social buttons are **48×48 px**.
- No keyboard traps identified in static review.

### Screen reader / semantics

- One `h1` per route (home h1 text comes from logo `alt`).
- Landmarks: `header`, `nav`, `main`, `footer`; sections use `aria-labelledby` or `aria-label`.
- Contact form: all fields labeled; honeypot hidden with `aria-hidden` + `tabIndex={-1}`.
- Decorative header logo: `alt=""`; brand link has `aria-label`.

### Responsive overflow (320 / 768 / 1024 / 1440)

- `calendar-news-layout` two-column grid uses `minmax(34rem, …)`; collapses to one column at **900px**. Minimum column sum ≈ 832px + gap, safe above breakpoint.
- `.hero h1` and `.hero .eyebrow` use `white-space: nowrap`; mobile overrides set `max-width: 100%` on hero h1 and scale logo to 100% width.
- Index rows use `minmax(0, 1fr)` on mobile for text wrapping.
- **Risk area:** mid-desktop widths just above 900px with long nav labels; `flex-wrap` on header links mitigates.

### User preferences

- `prefers-reduced-motion`: animations and smooth scroll disabled; `.reveal` forced visible.
- No JS / slow JS: **Reveal pages fail** (see finding 1).

### Zoom

- Body uses fluid `clamp()` typography; paragraphs capped at 72ch.
- Form errors use `overflow-wrap: anywhere`.
- 200% zoom should reflow; 400% not runtime-tested (no browser in environment).

---

## Local vs production drift

| Area                         | Drift                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------- |
| Accessibility issue patterns | **None** (same SSR findings)                                                  |
| Hero logo format             | **None** (both WebP now)                                                      |
| HTML structure / headings    | **Identical** outlines                                                        |
| `sitemap.xml`                | **404 on production** (also absent locally)                                   |
| OG images                    | **404 on production** (metadata references missing files)                     |
| Lighthouse mobile LCP        | Earlier run used PNG; current HTML uses WebP (likely post-deploy improvement) |

---

## Recommended fix order (awaiting approval)

### Tier A — 0% visual impact (do first)

1. Reveal no-JS / SSR-visible fallback
2. Add `app/sitemap.ts`
3. Fix OG image paths or add assets under `public/images/`
4. New-tab screen reader hints on external links
5. Tighten hero `sizes` attribute
6. Demote home “Mission” to h3 (heading outline)
7. Footer emoji accessibility tweak

### Tier B — ≤ 0.05% visual impact

8. Darken `--color-text-muted` for gradient edge contrast
9. `forced-colors` / `prefers-reduced-transparency` card fallbacks

### Tier C — needs explicit approval

10. GTM loading strategy (defer / consent / remove)
11. Re-compress or resize large news WebP assets
12. `content-visibility: auto` on below-fold sections

---

## What already passes

- ESLint jsx-a11y rules configured; lint clean
- Skip link, landmarks, form labels, focus styles
- `next/image` + hero `priority` + WebP hero on current deploy
- CLS 0, TBT 20 ms on mobile Lighthouse
- JS gzip ~197 KB (within budget)
- Lighthouse accessibility **100** on production home (automated axe pass)
- Dyslexia-aware font stack (Lexend, Inclusive Sans, Atkinson Hyperlegible)
- Azure static asset cache headers configured

---

## Tooling gaps for follow-up

Re-run when Chrome is available or PSI quota resets:

```bash
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility --form-factor=mobile
npx lighthouse https://www.auntbecksplace.live/contact --form-factor=mobile
```

Enable BrowserStack MCP in Cursor Settings for cross-browser axe scans if needed.

---

**Next step:** Review this report and approve a remediation tier. No code changes will be made until you explicitly request them.
