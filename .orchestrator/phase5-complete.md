# Phase 5 — Markdown Ingestion: COMPLETE

**Finished:** 2026-04-15T15:50Z
**Status:** done_clean
**Commit:** pending push

## Brief vs reality

Brief estimated ~290 source markdown files; the actual corpus at
`/home/hacker/VibeCoding/1-life/05-business/01-caio/` contains **62 `.md` files**
(1 root `CLAUDE.md` excluded → **61 ingestible docs**). The delta is noted and
the full corpus has been ingested — nothing skipped.

## Docs per section (after dedup by slug, FR locale)

| # | Section key | Title | Files | Notes |
|---|---|---|---|---|
| 01 | `vision` | Vision | 3 | Business plan, Million path, Exit strategy |
| 02 | `avatars` | Avatars | 10 | 5 personas × FR/EN pairs |
| 03 | `product` | Produit | 3 | Curriculum, pricing, certification |
| 04 | `c-suite-training` | C-Suite Training | 11 | CEO, CTO, CMO, CFO, COO, CHRO, CLO, CIO, CAIO, Cohesion, Systems |
| 05 | `courses-en` | Courses (EN) | 10 | Sales mastery, Agentic coding, Tools, MCP, etc. |
| 06 | `formations-fr` | Formations (FR) | 13 | Bilingual counterparts |
| 07 | `playbook` | Playbook | 2 | Marketing arsenal, agent systems |
| 08 | `marketing` | Marketing | 1 | Brand content |
| 09 | `launch` | Launch | 3 | Funnels, CAC/LTV |
| 10 | `operations` | Operations | 5 | Legal, stack, risk, metrics, scaling |
| **Total** | | | **61** | |

## Generated artifacts

- `lib/docs.ts` — filesystem ingestion: section/slug resolution, locale detection
  (`-FR`/`-EN` suffixes + stop-word heuristic), frontmatter via gray-matter,
  MDX escaping (HTML entities for `{}<>`), prev/next neighbors.
- `app/[locale]/docs/page.tsx` — 10-section index grid with counts.
- `app/[locale]/docs/[section]/page.tsx` — section landing with ordered doc list.
- `app/[locale]/docs/[section]/[slug]/page.tsx` — doc detail: full sidebar tree,
  TOC from h2/h3 headings, prev/next nav, Prose MDX rendering with
  `rehype-pretty-code`.
- `scripts/build-search-index.ts` — writes `public/search-index.json` with 61
  entries (FR + EN emitted for neutral docs, single-locale otherwise).
- `package.json` — added `prebuild` script wiring search index into the build.

## Build results

- `bun run build` → **exit 0**
- `bun run lint` → **exit 0** (no warnings)
- `bunx tsc --noEmit` → **exit 0**
- Prerendered routes for docs:
  - 2 × `/[locale]/docs` (FR, EN)
  - 20 × `/[locale]/docs/[section]` (10 sections × 2 locales)
  - 112 × `/[locale]/docs/[section]/[slug]` (61 docs × 2 locales with fallback)
- **Total new doc routes: 134** — added to prior 99 = ~233 static pages project-wide.

## Scope discipline

- Zero color-utility leaks (`(blue|red|green|...)-\d+`) in new files.
- Zero rounded-* utilities in new files.
- Only B&W + `var(--color-*)` tokens used.
- No touches to Phase 3/4/7 ownership (avatars, formations, admin, auth).
- `components/sidebar-nav.tsx` left untouched — it already supported the needed
  tree rendering, so I reused it directly in the doc detail page.

## Screenshots

Captured via Playwright against `next start -p 22120` (separate port to avoid
the always-on prod instance on 22020):

- `docs-index-fr.png` — 1440×900 full-page
- `docs-section-vision-fr.png` — 1440×900 full-page
- `docs-detail-business-plan-fr.png` — 1440×900 full-page
- `docs-sidebar-collapsed-fr.png` — 1440×900 viewport
- `docs-mobile-fr.png` — 390×844 full-page

## Karpathy checklist

- **Think first:** counted source files before design; noticed real count (61)
  was far below brief's estimate (290); built for what's real.
- **Simplicity:** filesystem read at build, cached in module scope; no DB, no
  client JS beyond the existing SidebarNav collapse toggle.
- **Surgical:** only added files inside owned paths; extended `lib/site.ts` and
  messages with a single `docs` entry each.
- **Goal-driven:** full VERIFY COMMAND passed before report.

## Pending actions

None. Phase 8 owns the Fuse.js client-side wiring against
`public/search-index.json`.
