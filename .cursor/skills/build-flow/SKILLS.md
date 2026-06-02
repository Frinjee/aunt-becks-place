<!-- author: @frinjee -->

# ABP Component Build Skill

**Invoke when:** building, revising, or reviewing any file in `components/` or `components/ui/`.

---

## Before You Write Any Code

1. Confirm the component name matches the spec exactly (`Hero.tsx` not `HeroSection.tsx`)
2. Identify the correct directory: `components/` for composites, `components/ui/` for primitives
3. Check if `'use client'` is actually required (most components don't need it)

### `'use client'` Decision

Add only for: `useState`, `useEffect`, `useRef`, `IntersectionObserver`, event listeners.
Everything else is a Server Component — no directive.

---

## Component Checklist

### Structure
- [ ] File name matches spec exactly
- [ ] Explicit TypeScript `interface` for props; explicit return type
- [ ] No `any`; no component defined inside another component
- [ ] All text content verbatim from content spec — no paraphrasing or substitution

### Images
- [ ] `next/image` only — never raw `<img>`
- [ ] `alt` descriptive (or `alt=""` for purely decorative)
- [ ] `width`+`height` or `fill`+`sizes`
- [ ] Hero brand mark: `priority` prop (LCP candidate)
- [ ] Asset path from immutable list with leading slash: `/assets/abp/imgs/…`

### Styling
- [ ] All colors via CSS variables — zero hardcoded hex
- [ ] Font families via `var(--font-display)`, `var(--font-body)`, `var(--font-heading-ui)`, `var(--font-micro)`
- [ ] Font-weight ≥ 450 on every text element (target 500)
- [ ] No text below 9px; Atkinson micro minimum 9.5px
- [ ] Card surfaces: `var(--color-card-surface)` + `backdrop-filter: blur(4px)` + `var(--color-border)`
- [ ] Spacing: CSS custom properties, `rem`, or `clamp()` — no arbitrary `px` values

### Motion
- [ ] Transitions on `transform` / `opacity` / `color` / `background` only — never `width`, `height`, `top`, `padding`
- [ ] Hover duration: `0.25s ease` | Reveal duration: `0.4s ease`
- [ ] No bounce, elastic, or spring easing
- [ ] `prefers-reduced-motion` guard present in globals.css

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Accessibility
- [ ] Interactive elements reachable via Tab; focus ring visible
- [ ] Skip-to-content link in `app/layout.tsx`
- [ ] One `<h1>` per page; heading levels not skipped
- [ ] `SocialButton`: `aria-label` required (icon-only)
- [ ] `IndexRow` list: `role="list"` + `role="listitem"`
- [ ] `<nav aria-label="…">` on navigation landmarks

---

## Per-Component Reference

| Component | Critical requirement |
|---|---|
| `EditorialLine` | 1px `var(--color-divider)`; brightens to `--color-primary` on adjacent IndexRow hover; `aria-hidden="true"` |
| `IndexRow` | Hover `translateX(1rem)`; adjacent EditorialLine brightens; `role="listitem"` |
| `MediaFeature` | `filter: saturate(0.85)` default; hover `saturate(1) scale(1.03)` on **wrapper div** — never on `<img>` or `<svg>` |
| `OffsetGrid` | Right col `margin-top: 4rem` desktop; single col at `max-width: 768px`; `align-items: start` |
| `StoryCard` | No fixed `width`/`height`; glassmorphism via design token variables |
| `SundayDinner` | `background: var(--color-primary)`; white text; large border-radius `1.5rem`; left-aligned |
| `Donations` | QR codes side-by-side, centered; **no fixed pixel widths** on `<Image>` |
| `Hero` | Entrance fade-up once on mount via IntersectionObserver; `h1` → `--font-display`; manifesto `max-width: 45ch` |
| `NewsGrid` | Stable props; `name="news-img-{id}"` on each `<ViewTransition>` for shared element morphs |
| `Footer` | `EditorialLine` as top border; wordmark in `--font-display`; `SocialButton` for FB + IG |
| `ui/SocialButton` | Circular; `aria-label` required; external link rules; min 44×44px touch target |

---

## Scroll Reveal Pattern (copy verbatim)

```tsx
'use client';
import { useEffect, useRef } from 'react';

export default function RevealSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="reveal">{children}</div>;
}
```

---

## React Rules (ABP-Scoped)

### Avoid Render Waterfalls
```tsx
// Independent fetches — fire simultaneously
const [user, config] = await Promise.all([fetchUser(), fetchConfig()])

// Sibling RSCs fetch in parallel; do not nest async components
async function Header() { const d = await fetchHeader(); return <div>{d}</div> }
async function Sidebar() { const i = await fetchItems(); return <nav>...</nav> }
```

### Stable References (prevent re-renders)
```tsx
// Wrong — new object every render
function NewsGrid() { return <MediaFeature config={{ saturate: 0.85 }} />; }

// Correct — stable module-scope constant
const MEDIA_CONFIG = { saturate: 0.85 } as const;
function NewsGrid() { return <MediaFeature config={MEDIA_CONFIG} />; }
```

### Conditional Rendering — Ternary Only
```tsx
// Wrong — renders "0" as text node
{count && <Badge count={count} />}

// Correct
{count > 0 ? <Badge count={count} /> : null}
```

### Hoist Expensive Constructors
```tsx
// Create once at module scope — not inside render
const DATE_FMT = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
// Use in IndexRow, OffsetGrid event dates, Footer copyright
```

---

## View Transitions (when adding navigation animation)

Only add View Transitions when they communicate a **spatial relationship or continuity**.

```tsx
// next.config.js — enable experimental flag
experimental: { viewTransition: true }

// Page wrapper — directional slide for hierarchical nav
import { ViewTransition } from 'react';
export function DirectionalTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      exit={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

// Link — declare transition type
<Link href="/events" transitionTypes={['nav-forward']}>Events</Link>

// NewsGrid shared element — morph image to detail page
<ViewTransition name={`news-img-${article.id}`} share="morph" default="none">
  <Image src={article.image} width={400} height={300} alt={article.title} />
</ViewTransition>
```

**Rules:**
- Always pair `enter` with `exit`; always include `default: "none"`
- Place `DirectionalTransition` in page components — **not** in layouts
- Named VT values must be globally unique; use item IDs
- Only `startTransition`, `useDeferredValue`, or `Suspense` activate VTs

---

## Verification (before marking done)

Start any visual review with: **"From the visual evidence, I observe…"**

- [ ] `npm run build` — zero TypeScript errors
- [ ] Font families rendered (not system fallbacks)
- [ ] Font weights ≥ 500 on all visible text; no text below 9.5px
- [ ] All colors resolve from CSS variables (no raw hex visible)
- [ ] EditorialLine dividers visible at `rgba(84, 42, 90, 0.20)`
- [ ] Hero entrance fires once on mount only
- [ ] Offset grid: right col `4rem` offset desktop; single col at 375px
- [ ] MediaFeature gradient overlay: white text legible on all 4 images
- [ ] QR codes side-by-side, centered, no fixed width
- [ ] Keyboard nav passes; no `outline: none` without replacement
- [ ] Lighthouse Accessibility score ≥ 90
