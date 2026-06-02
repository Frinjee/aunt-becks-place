<!-- author: @frinjee -->

# ABP Spec & Planning Skill

**Invoke when:** starting a new feature, page, or architectural change — before writing any code.

---

## Gated Workflow

Do not advance without user approval at each gate.

```
SPECIFY → PLAN → TASKS → IMPLEMENT → REVIEW → DEPLOY
```

---

## Phase 1 · Specify

### Surface Assumptions First

Before writing any spec content:

```
ASSUMPTIONS I'M MAKING:
1. SSR deployment — not static export
2. Azure SWA + GitHub Actions CI/CD
3. No backend API — static content only
4. Assets exist in public/assets/abp/imgs/ (immutable paths)
→ Correct me now or I'll proceed with these.
```

Never silently fill in ambiguous requirements.

### Spec Template

```markdown
# Spec: [Feature / Page Name]

## Objective
[User story or "How Might We" with testable success criteria]

## Tech Stack
Next.js 14+ App Router, TypeScript strict, Vanilla CSS / CSS Modules,
Azure Static Web Apps SSR, GitHub Actions CI/CD

## Commands
dev: npm run dev | build: npm run build | lint: npm run lint

## Project Structure
[Affected directories and new files — reference the directory tree in AGENTS.md]

## Code Style
TypeScript strict · CSS Modules + BEM-ish · CSS variables for all tokens

## Testing Strategy
Type-checking (tsc --noEmit) + npm run build + Lighthouse audit + visual check

## Boundaries
[Copy the Always / Ask First / Never table from SKILLS.md]

## Success Criteria
[Specific, testable conditions — reframe vague requirements here]

## Not Doing (and Why)
- [Scoped-out item] — [ABP constraint or reason]

## Open Questions
[Anything unresolved needing user input]
```

**Reframe vague requirements into testable criteria:**
```
"Make it faster" →
  - Hero LCP < 2.5s on 4G
  - No layout shift during font swap (CLS < 0.1)
  - Lighthouse Performance ≥ 85
→ Are these the right targets?
```

---

## Phase 2 · Plan

Map dependencies before writing tasks:

```
styles/design-tokens.css
    └── app/globals.css → app/layout.tsx
            └── Primitives (EditorialLine, SocialButton)
                    └── Composites (Hero, IndexRow, MediaFeature, StoryCard)
                            └── Sections (NewsGrid, OffsetGrid, SundayDinner, Donations, Footer)
                                    └── Pages (app/page.tsx, app/about, app/events, app/donate)
```

### Recommended Component Build Order

```
1. styles/design-tokens.css + app/globals.css
2. app/layout.tsx (font loading, metadata, lang="en")
3. EditorialLine.tsx          ← used everywhere; build first
4. Hero.tsx
5. IndexRow.tsx
6. MediaFeature.tsx → NewsGrid.tsx
7. StoryCard.tsx → OffsetGrid.tsx
8. SundayDinner.tsx, Donations.tsx
9. ui/SocialButton.tsx → Footer.tsx
10. app/page.tsx (assembly)
11. app/about/page.tsx, app/events/page.tsx, app/donate/page.tsx
12. .github/workflows/azure-static-web-apps.yml
```

**Identify risks early:**
- Azure SSR: `output: 'export'` breaks deployment — must never appear in `next.config.js`
- CSS `backdrop-filter`: Safari needs `-webkit-backdrop-filter` fallback
- `next/font` hydration: fonts loaded as CSS variables must be in `<html className>` not body

---

## Phase 3 · Tasks

Each task must be:
- Completable in one focused session
- ≤ 5 files touched
- Explicitly acceptance-criteria'd (≤ 3 bullets; if more, split the task)
- Has a verification step

```markdown
- [ ] Task: Implement EditorialLine.tsx
  - Acceptance: 1px divider visible, brightens on adjacent IndexRow hover, aria-hidden
  - Verify: npm run build passes; visual check at 1280px and 375px
  - Files: components/EditorialLine.tsx, components/EditorialLine.module.css
```

**Checkpoint every 2–3 tasks:**
```markdown
## Checkpoint: After Tasks 1–3
- [ ] npm run build — zero errors
- [ ] App renders in browser without console errors
- [ ] Review with user before proceeding
```

---

## Phase 4 · Implement

Execute one task at a time. Per task:
1. Build the component
2. `npm run build` — zero TypeScript errors
3. Visual check desktop (1280px) + mobile (375px)
4. Accessibility spot-check: keyboard nav, alt text, contrast
5. Mark task complete before moving to next

---

## New Feature Refinement (Idea → Spec)

When a new feature arrives before a spec exists:

### Understand & Expand
1. Restate as "How Might We…" problem
2. Ask ≤ 5 sharpening questions (Who? Success? Constraints? Why now?)
3. Generate 3–5 variations: simplest, accessible-first, no-JS fallback

### Evaluate & Converge
- Stress-test: user value, feasibility within ABP constraints, accessibility impact
- Surface hidden assumptions (e.g. "assumes email backend exists")

### Output: One-Pager
```markdown
## Feature: [Name]
### Problem Statement: [How Might We…]
### Recommended Direction: [2–3 sentences max]
### Key Assumptions to Validate: [ ] [Assumption + how to test]
### MVP Scope: [Minimum version that tests core assumption]
### Not Doing (and Why): [scoped item] — [ABP constraint]
```

---

## ADR Guidance (Architecture Decision Records)

Write an ADR for any decision that would be expensive to reverse.
Store in `docs/decisions/ADR-NNN-[title].md`.

```markdown
# ADR-001: [Title]
## Status: Accepted
## Date: YYYY-MM-DD
## Context: [What problem are we solving?]
## Decision: [What we chose]
## Alternatives Considered: [What we rejected and why]
## Consequences: [Impact on the project]
```

When an ADR is superseded, write a new one referencing the old — never delete.

---

## Deploy Checklist

### Azure SSR — Pre-Deploy
- [ ] `npm run build` passes locally — zero TypeScript errors
- [ ] `next.config.js`: no `output: 'export'`; no `output: 'standalone'` unless bundle hits size limit
- [ ] `.github/workflows/azure-static-web-apps.yml`: `output_location: ""` (empty — Azure auto-detects `.next`)
- [ ] No `navigationFallback` catch-all in `staticwebapp.config.json`
- [ ] `.next/` is in `.gitignore`; not committed
- [ ] No secrets or API tokens in source

### Pre-Merge Review
- [ ] All per-component checks from `skills/abp-component-build.md` passed
- [ ] Lighthouse Performance ≥ 85; Accessibility ≥ 90
- [ ] LCP < 2.5s; CLS < 0.1
- [ ] No console errors or warnings
- [ ] External links have `target="_blank" rel="noopener noreferrer"`
- [ ] All images have `alt` text
