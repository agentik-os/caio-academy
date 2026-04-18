# Flow Inventory — /fr/docs/content (renamed section)

Scope: `/flowaudit --url=https://caio-academy.vercel.app/fr/docs/content` + 3 script subpages + cross-links + 404 path.
Context: the section formerly known as `content-scripts` has been renamed to `content`; the old `content` section is now `insights`. Commits: 1e4d42b (rename), 900b54f/8072982/01baef5 (script expansions).

## Entry points (in scope)

| # | URL | Type | HTTP | Notes |
|---|-----|------|------|-------|
| 1 | /fr/docs | Docs index landing | 200 | Lists all sections incl. Content + Insights |
| 2 | /fr/docs/content | Section index (FR) | 200 | 3 SamourAI formation scripts |
| 3 | /en/docs/content | Section index (EN) | 200 | Same, EN locale |
| 4 | /fr/docs/content/business-plan-an-decennie | Doc detail (FR) | 200 | 16 h2 / 21k px tall |
| 5 | /fr/docs/content/path-million-an3 | Doc detail (FR) | 200 | 21 h2 |
| 6 | /fr/docs/content/exit-strategy-math | Doc detail (FR) | 200 | 16 h2 |
| 7 | /en/docs/content/business-plan-an-decennie | Doc detail (EN) | 200 | 15 h2 |
| 8 | /en/docs/content/path-million-an3 | Doc detail (EN) | 200 | 17 h2 |
| 9 | /en/docs/content/exit-strategy-math | Doc detail (EN) | 200 | 16 h2 |
| 10 | /fr/docs/insights | Renamed section (ex-content) | 200 | 7 insights articles |
| 11 | /fr/docs/content/nonexistent-xyz | Invalid slug → 404 | 404 | Now renders localized not-found w/ 50 nav links (was 0) |

## Flows (journeys, not pages)

### FLOW-1 HINGE — Read a long-form SamourAI script end-to-end
Entry → /fr/docs → section list → click Content → section index (3 scripts) → click script → scroll body → use TOC to jump between sections.
Pre-fix verdict: **BROKEN** — TOC anchors pointed to ids that didn't exist on the page (0/16 headings had id attributes). Click → no scroll. Reader forced to manually scroll 20k+ px per script.
Post-fix verdict: **WORKS** — 100% h2 id parity across all 6 script×locale combinations. TOC click produces 5k-8k px scroll delta.

### FLOW-2 — Locale swap on script pages
Identical slug on /fr and /en; locale button keeps the slug and swaps language.
Verdict: WORKS.

### FLOW-3 — Recovery from broken URL
User shares / mistypes / link-rots into a nonexistent script slug.
Pre-fix verdict: **DEAD END** — Next.js default 404 with 0 clickable links. User must edit URL or back-button out.
Post-fix verdict: **RECOVERS** — localized not-found page ("Page introuvable" / "Page not found") renders within the docs layout, keeping the header, sidebar, and mobile nav intact (50 navigation links). Two explicit CTAs: back to docs, back to home.

### FLOW-4 — Insights / Content separation
Two sections now exist: /docs/content (SamourAI scripts) + /docs/insights (philosophical long-form). Previously one section.
Verdict: WORKS — both render distinct content, distinct `SECTION_META` entries, no slug collisions.

### FLOW-5 — Cross-section discovery
Reader on /fr/niche-analysis (marketing page) → no link into /docs/content despite SamourAI references.
Verdict: LOW — unchanged from prior audit; content-strategy decision, not an audit defect.

## State machines

No authentication, no user state — pure static SSG.
The two relevant pieces of state:
1. **Docs dedupe key** `section.key/slugBase/lang` (`lib/docs.ts:328`) — previously conflated FR+EN; now each lang has its own entry with identical slug. Verified by bidirectional locale-swap test (6/6 pass).
2. **SECTION_META[section]** — `page.tsx:96` routes requests with an unknown section name through `notFound()`. Now falls into the new `not-found.tsx` instead of the default dead-end.

## Implementation note (folder/key inversion — FLOW-LOW-01)

`lib/docs.ts:176-197` SECTIONS registry has an oddity:
- Folder `11-content/` is registered with `key: "insights"`
- Folder `12-content-scripts/` is registered with `key: "content"`

This is an inversion between folder name and URL key. It works because the rename was done at the registry level without renaming the folders on disk. Functionally correct; cosmetically confusing to a new contributor. Flagged as LOW (DX, not user-facing).
