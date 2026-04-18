# /flowaudit Fix Plan — 2026-04-18

Two user-facing defects identified. Both fixed and shipped in this audit run.
Three low-severity items logged for future work.

## FIXED in this run

### FIX-1 — Hinge flow TOC bug (CRITICAL)
- **Target**: `app/[locale]/docs/[section]/[slug]/page.tsx`
- **Change**: Added inline `rehypeHeadingIds` plugin invoked in `compileMDX` rehypePlugins array. Plugin walks h2/h3 nodes via `unist-util-visit`, extracts text via `hast-util-to-string`, and assigns id via shared `slugify()` function. The same `slugify()` is now used by `extractToc` to guarantee byte-for-byte parity between TOC href and heading id.
- **Dependencies**: `unist-util-visit` and `hast-util-to-string` are already transitively installed via next-mdx-remote. Zero new packages.
- **Risk**: Extremely surgical; plugin only adds ids to nodes lacking one, leaves all other behavior (code highlighting, etc.) untouched.
- **Verify**: `grep -c '<h2 id="' .next/server/app/fr/docs/content/business-plan-an-decennie.html` → 16 (was 0). Playwright scroll test → 5.4k-8.6k px deltas across 6 routes.

### FIX-2 — 404 dead end (HIGH)
- **Target**: `app/[locale]/docs/not-found.tsx` (new file)
- **Change**: Created a docs-scoped not-found page. Uses `getLocale()` from next-intl to pick FR/EN copy, renders inside the docs layout so sidebar/search/mobile-nav remain usable, offers two explicit CTAs (`/docs`, `/`).
- **Verify**: Playwright on `/fr/docs/content/nonexistent-xyz-*` → 50 links, h1 "Page introuvable"; same on /en with "Page not found".

## LOGGED for future work

### LOG-1 — Folder/key inversion in SECTIONS (LOW, DX)
`lib/docs.ts:176` has `11-content` registered under key `insights` and `12-content-scripts` under key `content`. Works correctly; confusing to contributors. Recommendation: rename folders on disk to match keys, in a follow-up PR that doesn't mix concerns.

### LOG-2 — No /niche-analysis → /docs/content cross-link (LOW, content strategy)
Marketing page references SamourAI without a link into the scripts. Content decision, not an audit defect.

### LOG-3 — No "skip to content" anchor for a11y (LOW)
Article renders h1 in header, h2 in body; screen-reader users could use a jump anchor. Bundle into next `/a11yaudit` run.

## Risk assessment
- FIX-1 change is localized to one file; its failure mode on edge content (tables, inline code inside headings) was tested: `hast-util-to-string` concatenates text across child nodes, so headings with bold/code inside still produce a clean slug.
- FIX-2 uses `getLocale()` which is the server-context call that matches the surrounding docs layout; no client-side `useLocale` hazard.
- Build regression: none. `npm run build` produces 799 static pages, same as before.

## Rollback plan
If a regression is discovered, revert `cd5459d`:
```
git revert cd5459d
git push
```
This reverts both files atomically; the prior (broken) behavior is restored without side effects.
