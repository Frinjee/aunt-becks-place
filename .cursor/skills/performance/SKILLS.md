<!-- author: @frinjee -->

# ABP Performance & Accessibility Skill

**Invoke when:** auditing UI output, reviewing a built component or page, optimizing Core Web Vitals, or running accessibility checks.

---

## Performance Budget

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |
| JS bundle (initial, gzipped) | < 200 KB |
| Lighthouse Performance | ≥ 85 |
| Lighthouse Accessibility | ≥ 90 |

---

## Measure Before Optimizing

```bash
# Synthetic — run locally before any optimization work
npx lighthouse http://localhost:3000 --view

# Bundle analysis
npx @next/bundle-analyzer

# Web Vitals in browser
import { onLCP, onINP, onCLS } from 'web-vitals';
onLCP(console.log); onINP(console.log); onCLS(console.log);
```

---

## ABP Performance Decision Tree

```
What is slow?
├── First paint / LCP
│   ├── Hero image not priority? → add priority prop to Hero <Image>
│   ├── Fonts via CDN <link>? → must use next/font/google in app/layout.tsx
│   └── Too many 'use client' components? → convert to Server Components
├── Layout shift (CLS)
│   ├── Images without width/height? → add width+height or fill+sizes
│   └── Font swap jump? → display: 'swap' already set — check fallback metrics
└── Interaction lag (INP)
    ├── Heavy JS on main thread? → DevTools Performance tab → long tasks (>50ms)
    └── Unnecessary re-renders? → check useEffect dependency arrays
```

---

## Image Rules (Next.js)

- **Hero brand mark:** `priority` prop — it's the LCP candidate
- **Below-fold images:** no `priority` (lazy is Next.js default for non-priority)
- **All images:** `next/image` — never raw `<img>` with `/assets/` paths
- **Sizes:** always set `width`+`height` or `fill`+`sizes` to prevent CLS

```tsx
// Hero — LCP candidate
<Image
  src="/assets/abp/imgs/crossstreet-names.png"
  alt="Aunt Becks Place crossstreet logo"
  width={400}
  height={200}
  priority
/>

// Below fold
<Image
  src="/assets/abp/imgs/rebekah-opher-feature2.jpg"
  alt="Rebekah Opher"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

---

## Server Component Strategy

Keep `'use client'` off by default. Server Components reduce JS bundle and improve TTFB.

| Component | Client? | Reason |
|---|---|---|
| `EditorialLine`, `Footer`, `SundayDinner` | No | Pure presentational |
| `Hero`, `IndexRow`, `NewsGrid` | No | Static content, no browser APIs |
| `RevealSection` (scroll observer) | Yes | `IntersectionObserver` + `useRef` |
| Any component with `useState`/`useEffect` | Yes | Required |

---

## CSS Performance Rules

```css
/* Correct — compositor thread, no reflow */
.media-feature { transition: transform 0.25s ease, opacity 0.25s ease; }
.media-feature:hover { transform: scale(1.03); }

/* Wrong — triggers layout reflow */
.media-feature:hover { width: calc(100% + 4px); }

/* content-visibility for below-fold sections */
.news-grid,
.offset-grid {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```

---

## Accessibility Checklist (WCAG 2.1 AA + Dyslexia-Aware)

### Keyboard Navigation
- [ ] All interactive elements (links, buttons, `IndexRow`) reachable via Tab
- [ ] Focus order matches visual/reading order
- [ ] Focus ring visible — never `outline: none` without a replacement
- [ ] Skip-to-content link present in `app/layout.tsx`, visible on keyboard focus
- [ ] No keyboard traps

### Screen Reader
- [ ] One `<h1>` per page; heading levels not skipped
- [ ] All `<Image>` / `<img>` have `alt` (descriptive or `""` for decorative)
- [ ] All `<button>` and `<a>` have descriptive text or `aria-label`
- [ ] `SocialButton`: `aria-label` required (icon-only button)
- [ ] `IndexRow` list: `role="list"` + `role="listitem"`
- [ ] `<nav aria-label="…">` on navigation landmarks
- [ ] Dynamic content uses `aria-live` regions where relevant

### Contrast Requirements (purple is a trap)
- [ ] Body text `--color-text` (#52325b) on gradient background: ≥ 4.5:1
- [ ] Muted text `--color-text-muted` (#76547d) on gradient: ≥ 4.5:1
- [ ] White text on `--color-primary` (#7c2d86): ≥ 4.5:1 — **verify explicitly**
- [ ] `MediaFeature` overlay gradient: white text legible on all 4 images
- [ ] Color is not the only visual indicator of state

### Typography (Dyslexia-Aware)
- [ ] Font-weight ≥ 450 on every visible text element (target 500)
- [ ] No text below 9px; Atkinson Hyperlegible minimum 9.5px for captions
- [ ] Primary body text in Lexend at ≥ 16px
- [ ] Comic Relief UI labels use weight 700 (only 400/700 available)
- [ ] `font-display: swap` on all Google Fonts (set in `next/font/google` config)

### Visual
- [ ] Layout intact at 200% browser zoom
- [ ] No content flashes > 3× per second
- [ ] Touch targets ≥ 44×44px on mobile (especially `SocialButton`)
- [ ] Text resizable without breaking layout

---

## Common Anti-Patterns

| Anti-pattern | Fix |
|---|---|
| `<img>` instead of `next/image` | Replace with `<Image>` from `next/image` |
| `priority` on below-fold images | Remove `priority`; lazy loading is default |
| Missing `width`/`height` on `<Image>` | Add dimensions or `fill`+`sizes` |
| `filter`/`transform` on `<img>` or `<svg>` directly | Wrap in `<div>` and apply to wrapper |
| Hardcoded hex in CSS | Replace with CSS variable from `design-tokens.css` |
| `outline: none` with no replacement | Add visible `:focus-visible` style |
| `<div onClick>` for interactive elements | Use `<button>` or `<a>` |
| Storing computable values in state | Derive during render: `const full = first + ' ' + last` |
| New object literal as prop on every render | Hoist to module-scope constant |

---

## Verification Commands

```bash
npm run build          # zero TS errors — required before any merge
npx tsc --noEmit       # type-check without full build
npx lighthouse http://localhost:3000 --view
```

### DevTools Checklist
- [ ] Console: zero errors and warnings
- [ ] Network: fonts loaded via `next/font` (not CDN `<link>`)
- [ ] Performance: no long tasks (>50ms) on main thread
- [ ] Accessibility tree: meaningful landmark structure
