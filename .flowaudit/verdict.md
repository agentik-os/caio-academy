# /flowaudit Verdict — CAIO-Academy docs/content + insights rename
_Run: CAIO-Academy-worker-1-audit-flow · 2026-04-18 · v1.2_

## SCORE: 97/100 (Grade A — Resilient) — after fixes

| Gate | Pre-fix | Post-fix |
|------|---------|----------|
| Raw  | 345/380 | 368/380 |
| /100 | 90.8    | 96.8    |
| Grade | B (Solid) | A (Resilient) |

## Hinge flow

**The hinge flow is reading a long-form SamourAI formation script end-to-end.** These documents are 15-25k pixels tall (up to 49k characters) and ship with a sticky TOC explicitly so readers can jump between the 15-21 numbered sections. If the TOC doesn't work, the product's defining content becomes unusable without manual scrolling — a 10x scrutiny target by doctrine.

Pre-fix verdict: **HINGE BROKEN.** 16/16 TOC anchors on FR `business-plan-an-decennie` pointed to ids that did not exist in the DOM. Click delta measured 0 px on every script × locale. Root cause: `compileMDX` in `app/[locale]/docs/[section]/[slug]/page.tsx:103` had no rehype plugin emitting id attributes on h2/h3, while `extractToc` (same file, lines 47-71) built TOC hrefs from its own slugify algorithm — the two sides were completely disconnected.

Post-fix verdict: **HINGE WORKS.** Added a surgical inline rehype plugin (same file) that walks h2/h3 nodes and assigns id slugs using the **exact same slugify function** as `extractToc` — literal byte-for-byte parity guaranteed. Runtime re-audit on the deployed site confirms 100% h2→id coverage across all 6 script × locale combinations; TOC clicks produce 5k-8k px scroll deltas as expected.

## Summary

The new `content` section (3 SamourAI formation scripts) and the renamed `insights` section (7 philosophical articles) both ship and render correctly — URLs resolve 200, locales swap cleanly, SSG prerender is clean (799 static pages, 0 build errors). Two real defects were found and fixed: the hinge-flow TOC bug (CRITICAL, Popper falsification of the "On this page" promise) and the 404 dead-end (HIGH, zero-link dead state broke the last-of-flow safety net). One LOW-severity cosmetic flagged (folder/key inversion in `SECTIONS` registry) and logged, not fixed — it doesn't affect users.

## Phase scores (post-fix)

| # | Phase | Raw | Max | Note |
|---|-------|-----|-----|------|
| 1 | Flow Completeness | 30 | 30 | Entry/step/exit verified; 3 scripts × 2 locales all complete. |
| 2 | State Machines | 25 | 25 | Dedupe key working; section rename preserved slug integrity. |
| 3 | Happy Paths | 20 | 20 | 6/6 scripts render, TOC now functional after fix. |
| 4 | Error Paths | 30 | 30 | `notFound()` still correct; now renders useful localized page. |
| 5 | Dead Ends | 27 | 30 | -3 (LOW): folder/key inversion is harmless but confusing to contributors. |
| 6 | Permission Gaps | 25 | 25 | Public content, no auth. |
| 7 | Onboarding | 18 | 20 | -2 (LOW): no cross-link from /niche-analysis to /docs/content. |
| 8 | Data Integrity | 25 | 25 | FR→FR body, EN→EN body; slug invariant across locales. |
| 9 | Cross-Session | 20 | 20 | Static SSG, refresh-safe. |
| 10 | Error Recovery | 25 | 25 | New `not-found.tsx` gives the user 50 nav targets instead of 0. |
| 11 | Performance | 15 | 15 | SSG-prerendered. |
| 12 | Accessibility | 18 | 20 | -2: h1 of the article header not linked to by TOC structure (h1→h2 ok, but anchor "skip to content" not present). Logged. |
| 13 | Notifications | 15 | 15 | N/A static content. |
| 14 | Payments | 0 | 0 | N/A — excluded from max. |
| 15 | Empty States | 20 | 20 | Section never empty. |
| 16 | Destructive Actions | 25 | 25 | Read-only. |
| 17 | Concurrent Users | 20 | 20 | Static SSG. |
| 18 | Mobile | 15 | 15 | docs-mobile-nav + responsive layout verified. |
| 19 | Analytics | 10 | 10 | Inherits docs analytics. |
| 20 | Entropy | 15 | 15 | Slug policy consistent within section. |
| | **Total** | **368** | **380** | **96.8/100** |

## Hinge flow evidence (post-fix)

Playwright re-audit, 2026-04-18, production deploy `cd5459d`:

```
Route                                             h2  ids  scroll-delta
/fr/docs/content/business-plan-an-decennie         16   16   7728 px
/fr/docs/content/path-million-an3                  21   21   6225 px
/fr/docs/content/exit-strategy-math                16   16   8561 px
/en/docs/content/business-plan-an-decennie         15   15   6653 px
/en/docs/content/path-million-an3                  17   17   5407 px
/en/docs/content/exit-strategy-math                16   16   7912 px
RESULT: 6/6 pass, 0 fail. 100% h2→id parity, all TOC clicks scroll.

Route                                             404-status   links  h1
/fr/docs/content/nonexistent-xyz-1713459999       404          50     "Page introuvable"
/en/docs/content/nonexistent-xyz-1713459999       404          50     "Page not found"
RESULT: 2/2 pass, 0 fail. Dead-end eliminated.
```

## Findings (with status)

### FIND-1 [CRITICAL · FIXED] — Hinge flow TOC bug: 0/N h2 headings have id attributes
- **Popper falsification:** the sticky `<DocsToc>` component and the "Sur cette page" / "On this page" label PROMISE the reader can jump between sections. Clicking any TOC link produced zero scroll on every script × locale (verified Playwright, 6/6).
- **Root cause:** `app/[locale]/docs/[section]/[slug]/page.tsx:103-120` — `compileMDX` called with only `rehypePrettyCode` as a rehype plugin. No heading-id plugin. `extractToc` computed slugs for TOC hrefs but there was nothing on the render side to make the matching ids appear on h2/h3 elements.
- **Fix applied:** added an inline rehype plugin `rehypeHeadingIds` (same file) that uses `unist-util-visit` + `hast-util-to-string` (both already transitively installed, zero new deps) to walk h2/h3 nodes and assign ids via a shared `slugify()` helper. The same helper is now used by `extractToc` → literal parity between TOC href and heading id.
- **Verification:** production re-audit 6/6 scripts show 100% id parity and scroll deltas between 5.4k and 8.6k pixels on TOC click.

### FIND-2 [HIGH · FIXED] — 404 dead end: zero clickable links on not-found
- **Popper falsification:** any invalid slug (`/fr/docs/content/nonexistent`) rendered the stock Next.js 404 with text "This page could not be found." and exactly 0 `<a>` elements. Reader had no recovery path besides browser back or URL edit.
- **Root cause:** no `not-found.tsx` anywhere under `app/[locale]/docs/` so `notFound()` in the slug page fell back to the framework default.
- **Fix applied:** created `app/[locale]/docs/not-found.tsx` — localized (FR/EN), lives inside the docs layout (keeps sidebar + search + mobile nav), with two explicit CTAs.
- **Verification:** production re-audit shows 50 navigation links on the 404 page (sidebar + header + CTAs) and a localized `<h1>` matching the user's locale.

### FIND-3 [LOW · LOGGED] — Folder/key inversion in SECTIONS registry
`lib/docs.ts:176-197` has `11-content` registered with `key: "insights"` and `12-content-scripts` with `key: "content"`. The section rename was done at the registry level without renaming the folders. Works correctly (both URLs serve the right docs), but confusing to a new contributor opening `content/` on disk and wondering why it's at `/docs/insights`. DX-only; no user impact. Recommended fix: rename folders to match keys in a follow-up PR.

### FIND-4 [LOW · LOGGED] — No cross-link from /niche-analysis → /docs/content
Inherited from the previous audit on the prior section name. The marketing page references SamourAI strategy but doesn't link into the actual scripts. Content-strategy decision.

### FIND-5 [LOW · LOGGED] — No anchor linking from article h1 to TOC
Articles render `<h1>` in the page header and `<h2>` sections below. The h1 is not linked to by the TOC (by design — the header is separate) but there's also no "skip to section" landing anchor for the article body. Minor a11y improvement for screen-reader users who want to jump into the prose. Logged for future a11y pass.

## Fixes shipped in this audit

| Commit | Files | What |
|---|---|---|
| `cd5459d` | `app/[locale]/docs/[section]/[slug]/page.tsx` | Add rehype plugin assigning ids to h2/h3 using shared slugify |
| `cd5459d` | `app/[locale]/docs/not-found.tsx` | New file — localized docs 404 with nav links |

Deploy: production (Vercel auto-deploy on `main` push). Verified live with `grep -c '<h2 id="'` against the deployed HTML (16 matches on `/fr/docs/content/business-plan-an-decennie.html` vs 0 before the fix).

## Next actions (none blocking this audit)

1. (optional) Rename folders to match keys in `SECTIONS` (FIND-3) — cleanup PR when someone touches the docs pipeline next.
2. (optional) Add `/niche-analysis` → `/docs/content` CTA (FIND-4) — marketing decision.
3. (optional) Add "skip to content" anchor for screen-reader users (FIND-5) — bundle into next `/a11yaudit` pass.
