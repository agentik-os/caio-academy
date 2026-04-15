# Phase 4 — Avatars + Formations Catalog — COMPLETE

**Date**: 2026-04-15
**Branch**: main
**Session**: CAIO-Academy-phase4

## Delivered

- `app/[locale]/avatars/page.tsx` — index listing 5 personas by priority
- `app/[locale]/avatars/[slug]/page.tsx` — MDX-rendered detail + curated hero/sidebar + prev/next
- `app/[locale]/formations/page.tsx` — filterable catalog hero
- `app/[locale]/formations/[slug]/page.tsx` — MDX detail + TOC + prev/next
- `components/formations-filter.tsx` — client-side track + avatar + search filter
- `lib/avatars.ts` — 5 avatars, curated bilingual metadata, neighbor cyclic nav
- `lib/formations.ts` — filesystem scanner for 34 source files, 3 tracks, summary extraction, avatar inference, TRACK_LABELS map
- Nav updated in `lib/site.ts` (Avatars + Formations inserted between Business and Roadmap)
- i18n keys already present in `messages/{fr,en}.json` (Phase 2 scaffold)

## Routes generated

- 10 avatar routes: `/{fr,en}/avatars/{cto-saas,consultant-ai,dg-pme,head-digital,dev-ambitieux}`
- 68 formation routes: `/{fr,en}/formations/{34 slugs}`
- 2 index routes: `/{fr,en}/avatars`
- 2 index routes: `/{fr,en}/formations`

Total static pages: **99** (build output).

## Formation breakdown

- **c-suite** (11): CEO, CTO, CMO, CFO, CPO, COO, CIO, CHRO, CLO, CRO, Cohesion
- **course-en** (10): Sales Mastery, Agentic Coding, Tools Arbitrage, AI for Business Owners, MCP/API, AI SEO, Agentik Stack, Building AI Systems, Claude Code, AI Creator
- **formation-fr** (13): same + Context Engineering, Oracle AISB Setup, Prompt Engineering

## MDX safety

Source markdown files contain PDF-extraction artefacts (raw `{OS}`, extracted JSX fragments). Both pages escape `{`, `}`, `<`, `>` to HTML entities outside code fences before passing to `compileMDX`. Avatar page also strips page-footer noise lines ("AGENTIK OS", numeric page numbers, "CAIO ACADEMY — AI SYSTEMS ARCHITECT TRACK").

## Verification

- `bun run build` — **0 errors**, 99 pages, ✓ Compiled
- `bun run lint` — **0 errors**
- `bunx tsc --noEmit` — **0 errors**
- Color leak in new files: **0**
- Rounded leak in new files: **0**
- Runtime smoke test on port 41717: `/fr/avatars`, `/fr/formations`, `/fr/avatars/cto-saas`, `/fr/formations/c-suite-01-ceo` all **200 OK**

## Screenshots (`.orchestrator/phase4-screenshots/`)

- `avatars-index-fr.png` — 5 numbered cards, proper nav
- `avatar-cto-saas-fr.png` — hero + MDX body + sidebar meta
- `formations-catalog-fr.png` — 34 cards, 3 tracks visible
- `formations-catalog-fr-filtered-c-suite.png` — C-Suite filter active (11 modules only)
- `formation-detail-fr.png` — CEO module MDX rendered
- `avatars-index-mobile-fr.png` — 390×844 viewport

Screenshot capture bypass: the Phase 7 Clerk placeholder middleware redirects JS-enabled browsers to `clerk.placeholder.com`, causing SSL errors. Worked around by fetching HTML via `curl`, stripping clerk scripts, serving through `file://` with `<base href>` pointing at the Next server — same final DOM, no placeholder redirect.

## Ownership respected

Did NOT touch: `convex/`, `proxy.ts`, `middleware.ts`, `app/[locale]/admin/`, `.env.local`, `app/[locale]/layout.tsx`, existing Phase 2 components. Only added new files and extended `lib/site.ts` nav array.
