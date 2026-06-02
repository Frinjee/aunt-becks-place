<!-- author: @frinjee -->

# ABP — Full Priority Checklist (Usage-Optimized)

> **Legend**
> 🖥️ = Run yourself in terminal — zero credits
> 🔍 = Check yourself in browser/DevTools — zero credits
> ✏️ = Edit file yourself — zero credits
> 💬 = One Cursor chat message (Auto mode unless noted)
> 🛑 = BREAK — stop Cursor, do this manually, then continue

---

## GET LOCAL SERVER RUNNING

### 🔴 Priority 1 — Immediate Completion Needed

---

**1. Delete duplicate workflow**

🛑 BREAK — run yourself:
```bash
rm .github/workflows/azure-static-web-apps-mango-sky-0c8129c0f.yml
```
✅ Done when only one `.yml` file remains in `.github/workflows/`.

---

**2. npm install**

🛑 BREAK — run yourself:
```bash
rm -rf node_modules package-lock.json
npm install
```
- If errors: paste the exact error text into one 💬 Cursor Auto chat message
- Do not ask Cursor to run install — it costs a tool call and you can read the error faster yourself

✅ Done when `npm install` completes with zero errors.

---

**3. Fix TypeScript errors**

🛑 BREAK — run yourself and capture output:
```bash
npx tsc --noEmit 2>&1 | tee /tmp/tsc-out.txt
cat /tmp/tsc-out.txt
```

If errors exist → 💬 ONE Cursor Auto chat message:
```
Fix all TypeScript errors below. Known expected issues:
- app/layout.tsx: Cormorant_Garamond missing from next/font/google imports
  (weight: ['500','600','700'], variable: '--font-display', display: 'swap')
- Reveal.tsx: add explicit prop interface { children: React.ReactNode }
- lib/content.ts: fix any implicit `any` types

Do not change anything not in this error list.

--- errors ---
[paste /tmp/tsc-out.txt here]
```

🛑 BREAK — after Cursor edits, re-run yourself:
```bash
npx tsc --noEmit
```
✅ Done when zero errors.

---

**4. npm run build**

🛑 BREAK — run yourself:
```bash
npm run build 2>&1 | tee /tmp/build-out.txt
cat /tmp/build-out.txt
```

If errors exist → 💬 ONE Cursor Auto chat message:
```
Fix all build errors below. Known expected issues:
- Font name casing: Comic_Relief not ComicRelief
- Any <Image> missing both width+height or fill+sizes props

Do not change anything not listed in these errors.

--- errors ---
[paste /tmp/build-out.txt here]
```

🛑 BREAK — re-run yourself:
```bash
npm run build
```
✅ Done when build completes with zero errors.

---

**5. npm run dev — verify localhost:3000**

🛑 BREAK — run yourself:
```bash
npm run dev
```

🔍 Check yourself in browser — write down every issue before opening Cursor:
- [ ] Page renders (no white screen)
- [ ] Console: zero errors (F12 → Console)
- [ ] No hydration mismatch warnings

If problems → 💬 ONE Cursor Auto chat message listing all issues found.
✅ Done when page renders with no console errors.

---

### 🟡 Priority 2 — Important Before Calling It "Working"

---

**6. Verify all 7 images load**

🔍 Check yourself — DevTools → Network → filter "Img":
- `crossstreet-names.png`
- `videoframe_13226.png`
- `wypr.jpg`
- `rebekah-opher-feature2.jpg`
- `Member Spotligh-Rebekah Opher_Banner.png`
- `qrcode-base.svg`
- `qrcode-weaves.svg`

Any 404s → ✏️ fix the path yourself in the component (leading slash, exact filename).
Only ask Cursor if more than 2 files are broken (not worth a new chat for one path fix).

---

**7. Restore Cormorant_Garamond to app/layout.tsx**

✏️ Edit yourself — open `app/layout.tsx` and add:
```tsx
import { Cormorant_Garamond } from 'next/font/google';
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});
```
Add `cormorant.variable` to the `<html className>` alongside other font variables.

🛑 BREAK — rebuild after:
```bash
npm run build && npm run dev
```

---

**8. Verify fonts loading via next/font**

🔍 Check yourself — DevTools → Network → filter "Font":
- ✅ Should show: `_next/static/media/…woff2`
- ❌ Should NOT show: `fonts.googleapis.com`

If CDN URLs appear → 💬 Cursor Auto: "Fonts are still loading from Google CDN instead of next/font. Check app/layout.tsx font config."

---

**9. Validate "Restore the village…" heading**

🔍 Check yourself in browser — is the subhead visible on the offset grid section?
- If you want it removed: ✏️ delete the line yourself from `OffsetGrid.tsx`
- If you want to keep it: no action needed (it was flagged as new framing, not from abp.html)

Do not use a Cursor chat for a single line deletion.

---

**10. Confirm all 4 routes load**

🔍 Check yourself in browser:
- `localhost:3000`
- `localhost:3000/about`
- `localhost:3000/events`
- `localhost:3000/donate`

Any crash → note the exact error → 💬 ONE Cursor Auto message with all broken routes listed together.

---

### 🟢 Priority 3 — Lowest Priority (Local Goal)

---

**11. Mobile 375px spot-check**

🔍 Check yourself — DevTools → device toolbar → 375px width:
- Offset grid collapses to single column
- Hero text scales (not oversized or clipped)

Any layout breaks → screenshot + 💬 Cursor Auto with screenshot attached (images give Cursor context without extra back-and-forth).

---

**12. Confirm "Fb / Ig" text labels**

🔍 Check yourself — decide: acceptable or needs icons?
- Acceptable → ✅ no action
- Needs SVG icons → add to post-deploy Priority 3 backlog (not blocking local server)

---

---

## AFTER LOCAL SERVER IS RUNNING

### 🔴 Priority 1 — Immediate Completion Needed (Pre-Deploy)

---

**1. Full a11y pass**

🛑 BREAK — check these yourself in browser (zero credits):

*Keyboard nav:*
- Tab through all interactive elements — every link, button, IndexRow
- Focus ring must be visible at all times
- No keyboard trap anywhere

*Heading structure:*
- Each page has exactly one `<h1>`
- No skipped heading levels (h1 → h3 is invalid)

*Images + ARIA:*
- Every `<Image>` has a descriptive `alt` (or `alt=""` for decorative)
- Both SocialButton instances have `aria-label`
- `EditorialLine` has `aria-hidden="true"`

Write down every failure → 💬 ONE Cursor Auto message with the full list.

---

**2. WCAG AA contrast**

🔍 Check yourself — use the free browser extension [axe DevTools](https://www.deque.com/axe/) or paste hex values into [contrast.tools](https://contrast.tools):

Critical pair to verify manually (purple is the contrast trap):
- White `#ffffff` on `--color-primary` `#7c2d86` — must be ≥ 4.5:1

If it fails → 💬 Cursor Auto: "White text on #7c2d86 fails WCAG AA contrast (ratio is X:1, needs 4.5:1). Adjust --color-primary to the darkest shade that keeps the design intent while passing."

---

**3. Add AZURE_STATIC_WEB_APPS_API_TOKEN**

🛑 BREAK — do this yourself in GitHub (cannot be done by Cursor — it's a repo secret):

1. Azure Portal → your Static Web App → **Manage deployment token** → copy token
2. GitHub repo → **Settings → Secrets → Actions → New repository secret**
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: paste token

✅ Done when secret appears in the GitHub secrets list.

---

**4. prefers-reduced-motion verify**

🔍 Check yourself — DevTools → Rendering panel → "Emulate CSS media feature prefers-reduced-motion" → reduced:
- All scroll reveals should snap into place with no animation
- No transitions should fire on hover

If animations still fire → 💬 Cursor Auto: "prefers-reduced-motion is not being respected. Check globals.css reduced-motion block and Reveal.tsx."

---

**5. Confirm no `output: 'export'` in next.config.js**

✏️ Check yourself — open `next.config.js`:
- Should NOT contain `output: 'export'`
- Should NOT contain `output: 'standalone'` (unless bundle hits Azure size limit)

If present → ✏️ delete the line yourself. Single-line edit, zero Cursor needed.

---

### 🟡 Priority 2 — Priority to Complete

---

**6. Lighthouse audit**

🛑 BREAK — run yourself:
```bash
npx lighthouse http://localhost:3000 --view
```

Targets: Performance ≥ 85, Accessibility ≥ 90, LCP < 2.5s, CLS < 0.1

If scores are below target → 💬 ONE Cursor Auto message with the full Lighthouse JSON output (copy from report). Do not describe issues in prose — paste the raw data so Cursor doesn't need extra tool calls to understand the problem.

---

**7. Hero `priority` prop**

✏️ Check yourself — open `Hero.tsx`, find the `<Image>` for `crossstreet-names.png`:
- Should have `priority` prop
- If missing → add `priority` yourself. It's one word. Zero Cursor needed.

---

**8. IndexRow + MediaFeature hover behavior**

🔍 Check yourself in browser:
- `IndexRow`: hover moves row right (`translateX(1rem)`) + adjacent line brightens
- `MediaFeature`: hover desaturates → full color + slight scale on wrapper div (not `<img>`)

If broken → 💬 Cursor Auto with the specific component name and observed vs. expected behavior.

---

**9. Mobile pass on all 4 routes**

🔍 Check yourself — DevTools 375px:
- Single column layout on all pages
- No horizontal overflow (check `document.documentElement.scrollWidth > window.innerWidth` in console)
- Touch targets visually ≥ 44×44px

Any issues → 💬 ONE Cursor Auto message listing all routes + problems together.

---

**10. Font weight audit**

🔍 Check yourself — DevTools → Elements → select text node → Computed styles → `font-weight`:
- All text ≥ 500 (Comic Relief UI labels must be 700)
- No text below 9.5px font-size

Any failures → 💬 Cursor Auto with specific element + selector.

---

### 🟢 Priority 3 — Lowest Priority

---

**11. Bundle size check**

🛑 BREAK — run yourself:
```bash
ANALYZE=true npm run build
```
Target: JS initial load < 200 KB gzipped.
Only act if over budget — do not pre-optimize.

---

**12. Social icon upgrade**

💬 Only if you've decided to replace Fb/Ig text labels. Start a fresh chat:
```
Replace the text labels "Fb" and "Ig" in ui/SocialButton.tsx with inline SVG icons.
Facebook SVG: [paste SVG here]
Instagram SVG: [paste SVG here]
Keep aria-label, noopener noreferrer, and 44×44px touch target intact.
```

---

**13. View Transitions prep**

💬 ONE Cursor Auto message when ready:
```
Add View Transitions prep (non-breaking, not user-visible yet):
1. next.config.js: add experimental: { viewTransition: true }
2. NewsGrid.tsx: wrap each MediaFeature <Image> in <ViewTransition name={`news-img-${article.id}`} share="morph" default="none">
Do not add DirectionalTransition or Link transitionTypes yet — those come with route pages.
```

---

**14. ADR: font and icon decisions**

✏️ Write yourself — create `docs/decisions/ADR-001-fonts-and-icons.md`:
```markdown
# ADR-001: Font selection and social icon implementation
## Status: Accepted
## Date: [today]
## Decision: Loaded Cormorant Garamond, Lexend, Comic Relief, Atkinson Hyperlegible
via next/font/google. Social buttons use text labels (Fb/Ig) in place of
legacy Font Awesome icons. Font Awesome was removed to eliminate the CDN dependency.
## Consequences: SocialButton aria-labels carry full accessibility weight for icon-only context.
```

No Cursor needed — copy, paste, save.

---

**15. Confirm abp/crossstreet.png is intentionally unused**

🔍 Check yourself:
```bash
grep -r "crossstreet.png" . --include="*.tsx" --include="*.ts" --include="*.css"
```
- If no results → file is unused, no action needed
- If results appear → flag the path for review before renaming anything
