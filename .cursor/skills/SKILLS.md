<!-- author: @frinjee -->

# ABP Skills

Skill index for the **Aunt Beck's Place** Next.js 14+ project (Azure SWA SSR, GitHub Actions CI/CD).

Skills are invoked contextually by Cursor — not always. Each skill file documents when and how to apply it.

---

## Available Skills

| Skill file | Invoke when |
|---|---|
| `skills/abp-component-build.md` | Building or revising any component in `components/` |
| `skills/abp-spec-plan.md` | Starting a new feature, page, or architectural change |
| `skills/abp-performance-a11y.md` | Auditing, optimizing, or reviewing UI output |
| `skills/audit_accessibility_wcag_nonprofit.md` | Auditing WCAG accessibility, implementing foundational SEO, or generating a staged SEO/growth roadmap for the non‑profit site |

---

## Accessibility Enhancement Layer

Use these together when a task touches public-facing UI, content, donation paths, contact paths, or route metadata.

- Start with `skills/abp-spec-plan.md` when the work changes a page, feature, IA, or user journey.
- Attach `skills/abp-component-build.md` for component-level semantics, accessible names, focus behavior, image handling, and overflow checks.
- Attach `skills/abp-performance-a11y.md` for WCAG 2.2 AA, Core Web Vitals, viewport, zoom, forced-colors, and assistive technology verification.
- Attach `skills/audit_accessibility_wcag_nonprofit.md` when the outcome affects nonprofit trust, donor confidence, local discoverability, privacy, plain language, or community access.
- Keep all additions compatible with the visual-impact limit and the no-overflow-scrollbar rule.

---

## Project Boundaries (Always / Ask First / Never)

These apply across all skills.

| Always | Ask First | Never |
|---|---|---|
| CSS variables for all color/font refs | Add a new npm dependency | Add `output: 'export'` |
| Font-weight ≥ 450 on every text element | Change `next.config.js` structure | Commit `.next/` or `.env` |
| Semantic HTML over `<div>` | Add/modify `staticwebapp.config.json` entries | Hardcode hex colors |
| `rel="noopener noreferrer"` on external links | Modify `.github/workflows/` | Use Tailwind or any CSS framework |
| `alt` on every `<Image>` | Alter asset file names or paths | Add `navigationFallback` to SWA config |
| `prefers-reduced-motion` guard on all animations | Alter font loading config in `app/layout.tsx` | Use Inter, Roboto, or system fonts as primary |

---

## Workflow Gates

Do not advance without user approval at each gate.

```
SPECIFY → PLAN → TASKS → IMPLEMENT → REVIEW → DEPLOY
```

See `skills/abp-spec-plan.md` for detailed phase instructions.

---

## Design North Star

Before any code: confirm the art direction.

```
Concept:    Community warmth + editorial restraint
Tone:       Intimate, dignified, accessible
Palette:    Soft lavender gradient → deep plum primary (--color-primary: #7c2d86)
Typography: Cormorant Garamond (display) / Lexend (body) / Comic Relief (headings)
Motion:     Understated — fade-up reveals, no bounce or elastic easing
```

**When in doubt, choose restraint over expressiveness.**
