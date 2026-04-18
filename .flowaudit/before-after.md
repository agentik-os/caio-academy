# Before / After Verification

## Hinge flow TOC — production Playwright walkthrough

| Route | h2 total | h2 with id (before) | h2 with id (after) | scroll delta on TOC click (before) | scroll delta on TOC click (after) |
|---|---|---|---|---|---|
| /fr/docs/content/business-plan-an-decennie | 16 | 0 | 16 | 0 px | 7728 px |
| /fr/docs/content/path-million-an3 | 21 | 0 | 21 | 0 px | 6225 px |
| /fr/docs/content/exit-strategy-math | 16 | 0 | 16 | 0 px | 8561 px |
| /en/docs/content/business-plan-an-decennie | 15 | 0 | 15 | 0 px | 6653 px |
| /en/docs/content/path-million-an3 | 17 | 0 | 17 | 0 px | 5407 px |
| /en/docs/content/exit-strategy-math | 16 | 0 | 16 | 0 px | 7912 px |

All 6 passing, 100% parity.

## 404 dead-end recovery

| Route | status | link count (before) | link count (after) | h1 (after) |
|---|---|---|---|---|
| /fr/docs/content/nonexistent-xyz-* | 404 | 0 | 50 | "Page introuvable" |
| /en/docs/content/nonexistent-xyz-* | 404 | 0 | 50 | "Page not found" |

Recovery paths available after fix: back-to-docs CTA, back-to-home CTA, full sidebar (3 section shortcuts), full search (Cmd+K), full mobile nav.

## Build integrity

| Metric | Before | After |
|---|---|---|
| `npm run build` | success | success |
| Static pages generated | 799 | 799 |
| Build duration | 22s | 22s |
| Bundle size on slug page | baseline | baseline (plugin is SSR-only, adds 0 KB to client) |

## Production commit

| SHA | Subject | Deploy status |
|---|---|---|
| `cd5459d` | fix(docs): heading ids on MDX h2/h3 + not-found page with navigation | Live on caio-academy.vercel.app (verified via h2-id grep) |
