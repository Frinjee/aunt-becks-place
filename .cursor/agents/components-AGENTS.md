<!-- author: @frinjee -->

# ABP Components — Agent Instructions

Inherits all root `AGENTS.md` rules. Instructions here are **specific to `components/`** and take precedence for any file in this directory or its children.

---

## Component Conventions

### `'use client'` — Only Where Required
Add only for: `useState`, `useEffect`, `useRef`, `IntersectionObserver`, event listeners.
Everything else is a Server Component — no directive needed.

### Naming & Placement
- File names must match spec exactly: `Hero.tsx`, `EditorialLine.tsx`, `IndexRow.tsx`, etc.
- UI primitives go in `components/ui/` (e.g. `SocialButton.tsx`)
- No component defined inside another component — always module-scope

### Prop Interfaces
- Explicit TypeScript interface for every component
- No `any` types; no implicit `any` from missing prop types
- Boolean props that create variants are **not allowed** — use explicit variant components instead

---

## Per-Component Requirements

| Component | Key requirement |
|---|---|
| `EditorialLine` | 1px `var(--color-divider)`; brightens toward `--color-primary` on adjacent IndexRow hover; `aria-hidden="true"` |
| `IndexRow` | Hover: `translateX(1rem)`; adjacent EditorialLine brightens; `role="listitem"` |
| `MediaFeature` | `filter: saturate(0.85)` default; hover `saturate(1) scale(1.03)` on wrapper div — never on `<img>` or `<svg>` |
| `OffsetGrid` | Right col `margin-top: 4rem` desktop; single col `max-width: 768px`; `align-items: start` |
| `StoryCard` | No fixed `width`/`height`; glassmorphism: `var(--color-card-surface)` + `backdrop-filter: blur(4px)` + `var(--color-border)` |
| `SundayDinner` | `background: var(--color-primary)`; white text; large border-radius (`1.5rem`); left-aligned |
| `Donations` | QR codes side-by-side, centered, no fixed widths — never constrain `<Image>` to fixed px |
| `Hero` | Entrance fade-up once on mount via IntersectionObserver; `h1` uses `--font-display`; manifesto `max-width: 45ch` |
| `NewsGrid` | Renders 4 `MediaFeature` items; named VT `name="news-img-{id}"` for future shared element transitions |
| `Footer` | `EditorialLine` as top border; wordmark in `--font-display`; `SocialButton` for FB + IG |
| `ui/SocialButton` | Circular; `aria-label` required; `target="_blank" rel="noopener noreferrer"`; min 44×44px touch target |

---

## Motion Rules

- Transitions: `transform` and `opacity`/`color`/`background` only — never `width`, `height`, `top`, `padding`
- Hover duration: `0.25s ease` | Reveal duration: `0.4s ease`
- No bounce, elastic, or spring easing
- Stagger: `transition-delay: calc(var(--i, 0) * 0.08s)`

```css
/* Required in globals.css */
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

### Scroll Reveal Pattern

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

## CSS Patterns

### Design Tokens — Mandatory Usage

```css
/* Correct */
.heading { font-family: var(--font-heading-ui); color: var(--color-text); }

/* Wrong — never hardcode */
.heading { font-family: 'Comic Relief'; color: #52325b; }
```

### Glassmorphism Card

```css
.card {
  background: var(--color-card-surface);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: clamp(1.25rem, 3vw, 2rem);
}
```

### Mobile-First Breakpoints

```css
/* Default: mobile 375px */
.component { padding: var(--space-4); }

@media (min-width: 600px)  { .component { padding: var(--space-8); } }
@media (min-width: 1024px) { .component { padding: var(--space-12); } }
@media (max-width: 768px)  { .offset-grid { grid-template-columns: 1fr; } }
```

### Conditional Rendering — Ternary Only

```tsx
/* Correct */
{count > 0 ? <Badge count={count} /> : null}

/* Wrong — renders "0" as text node */
{count && <Badge count={count} />}
```

---

## AI Aesthetic — Never Do These in Components

- Add more purple/violet gradients — the design uses purple purposefully
- Center-align body text, cards, or feature descriptions
- Use icon-in-colored-circle layouts — use editorial layout
- Use gradient buttons — solid `var(--color-primary)` only
- Apply `transform` directly to `<svg>` or `<img>` elements — wrap them

---

## Visual Validation (Before Marking a Component Done)

Start any visual review with: **"From the visual evidence, I observe…"**

- [ ] Font families rendered (not system fallbacks)
- [ ] Font weights ≥ 500 on all visible text
- [ ] No text below 9.5px
- [ ] All colors resolve from CSS variables (no raw hex leaking)
- [ ] `EditorialLine` dividers visible at `rgba(84, 42, 90, 0.20)`
- [ ] Hero entrance fires once on mount only
- [ ] Offset grid: right col offset `4rem` desktop; single col mobile
- [ ] `MediaFeature` gradient overlay makes white text legible on all 4 images
- [ ] QR codes side-by-side, centered, no fixed width
- [ ] Mobile (`375px`): grid collapses, hero `clamp(2.4rem, 10vw, 4rem)` scales correctly
