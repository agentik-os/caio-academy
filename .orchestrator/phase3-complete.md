# Phase 3 — Main Pages (Home / Vision / Business Plan / Roadmap) · COMPLETE

**Worker:** oracle-CAIO-Academy-phase3
**Finished:** 2026-04-15 (Third Law autonomous)
**Status:** done_clean

---

## Summary

Four main marketing pages × two locales = **8 static routes** prerendered at build, whitepaper-grade FR/EN content, 100% sourced from the three canonical `.md` files in `01-caio/01-vision/`. Phase 2 design system reused exactly — zero new components, zero color leaks, zero rounded corners.

---

## Files created / changed

| File | Role |
|---|---|
| `app/[locale]/page.tsx` | Home (rewritten): hero + Teach/Certify/Place pillars + stat strip + "why now" 2-col + final CTA band |
| `app/[locale]/vision/page.tsx` | Vision: hero + 3 pillars (AgentikOS/Academy/Gareth) + An 1-3 path + exit strategy table + manifesto Prose |
| `app/[locale]/business-plan/page.tsx` | Business Plan: hero + 3 tiers + 4 add-ons + unit economics stats + avatar funnel table + 3-yr projections + transparency note + CTA |
| `app/[locale]/roadmap/page.tsx` | Roadmap: hero + Beta II live panel with stats + programme checklist + An 1/2/3 vertical timeline with status badges + next-4-weeks list + Beta CTA |
| `lib/site.ts` | Trimmed `navItems` to 3 public routes (Vision · Business · Roadmap). Avatars/Formations/Podcast/Playbook removed until their phases ship. |
| `.orchestrator/phase3-data-gaps.md` | Honest inventory of which fields are sourced vs derived vs flagged for user-provided data. |

**No new components added** — `PageShell`, `Section`, `Stat`, `CtaLink`, `Prose` handled everything per the Phase 2 inventory. Status badges on `/roadmap` are a 15-line inline component (`StatusBadge`) scoped to that page, not a reusable primitive.

---

## i18n approach

Long-form prose lives in **per-page `CONTENT` objects** keyed by locale (`{ fr: {...}, en: {...} }`), not in `messages/*.json`. Rationale: `next-intl` string keys are the right tool for nav/CTA labels shared across pages, but they become unreadable and diff-hostile for multi-paragraph manifestos and data tables. Mission brief explicitly allowed this.

Short shared labels (nav, hero CTAs, footer) stay in `messages/fr.json` + `messages/en.json` untouched from Phase 2.

The home page replaces the Phase-2 hero stub with a full locale-switched content object. Every nav link and CTA href is locale-prefixed (`/${locale}/vision`, `/${locale}/beta`, …).

---

## Design system compliance

- ✓ Zero color utility classes (`grep` for `(blue|red|...|slate)-[0-9]` returns 0 matches across the 4 new pages).
- ✓ Zero `rounded-*` classes.
- ✓ Sharp borders only; all spacing via padding + `border-*`.
- ✓ Serif Playfair for h1-h3 (matches Phase-2 `Section` + `Prose` scales).
- ✓ Muted grey (`--color-muted`) for lead paragraphs and table secondary cells; ink for primary.
- ✓ Tier card on Business Plan flips ink↔paper on hover for the highlight variant (matches `CtaButton.variants.ink`).
- ✓ Status badges on Roadmap are pure B&W: ink-fill for "live", ink-outline for "done", muted-outline for "planned".
- ✓ Every page renders under `<PageShell>`; verified by grep.

---

## Content sourcing

All figures, tiers, LTVs, milestones, and exit scenarios lifted verbatim from:

- `/home/hacker/VibeCoding/1-life/05-business/01-caio/01-vision/01-Business-Plan-2025.md` — tiers, avatars, projections An 1-3, phase I-IV roadmap
- `/home/hacker/VibeCoding/1-life/05-business/01-caio/01-vision/02-Million-Path-An3.md` — CAC An 3, LTV/CAC ratio, Registry ARR, quarterly Y2/Y3 calendar
- `/home/hacker/VibeCoding/1-life/05-business/01-caio/01-vision/03-Exit-Strategy-Math.md` — Options A/B/C valuations, ranges, structure notes

Gaps flagged in `phase3-data-gaps.md` — no fabrication.

---

## Verification

```
=== BUILD   === ✓ 13 static pages prerendered (1 _not-found + 4 pages × 2 locales + 2 design-system + 2 home root paths)
                ✓ /fr, /en
                ✓ /fr/vision, /en/vision
                ✓ /fr/business-plan, /en/business-plan
                ✓ /fr/roadmap, /en/roadmap
=== LINT    === ✓ 0 errors / 0 warnings (apostrophes in Prose converted to U+2019)
=== TSC     === ✓ no errors
=== COLOR   === ✓ 0 matches on 4 page paths
=== ROUNDED === ✓ 0 matches on 4 page paths
=== SHELL   === ✓ PageShell present on all 4 pages
=== SHOTS   === ✓ 8 screenshots (1440×900 full-page) — home/vision/business-plan/roadmap × fr/en
```

Screenshots in `.orchestrator/phase3-screenshots/`:

| File | Size | Route |
|---|---|---|
| `home-fr.png` | 223 KB | `/fr` |
| `home-en.png` | 218 KB | `/en` |
| `vision-fr.png` | 351 KB | `/fr/vision` |
| `vision-en.png` | 348 KB | `/en/vision` |
| `business-plan-fr.png` | 467 KB | `/fr/business-plan` |
| `business-plan-en.png` | 458 KB | `/en/business-plan` |
| `roadmap-fr.png` | 344 KB | `/fr/roadmap` |
| `roadmap-en.png` | 338 KB | `/en/roadmap` |

---

## Key decisions (logged for Phase 4+)

1. **`navItems` trimmed to 3** — header now shows Vision · Business · Roadmap only. Avatars/Formations/Podcast/Playbook keys kept in `messages/*.json` so they re-appear with zero friction when their phases ship; just add the entries back to `lib/site.ts`.
2. **Per-page `CONTENT` over i18n keys for prose** — future MDX ingestion (Phase 5) will replace CONTENT objects on Avatars/Formations. For now this keeps Phase 3 self-contained.
3. **`Prose` used for manifesto only** — data-dense sections (tiers, funnel, projections) use raw JSX grids because `Prose`'s 68ch cap would hurt table legibility.
4. **Status badge inline in roadmap** — 15 LOC, not promoted to a reusable component. Karpathy: surgical. If Phase 5+ needs the same badge pattern elsewhere, lift it to `components/status-badge.tsx` at that moment.
5. **Tier highlight = ink fill with inverted hover** — matches `CtaButton.variants.ink` semantics already shipped in Phase 2. No new pattern introduced.
6. **Quotation apostrophes (`'` → `'`)** — inside `Prose` JSX text blocks to satisfy `react/no-unescaped-entities` without littering the source with `&apos;`. Typographically correct side effect.

---

## Handoff to Phase 4

Phase 4 (Avatars page) inherits:
- The per-page `CONTENT: Record<Locale, {...}>` pattern — direct copy-paste template from any of the 4 pages here.
- `Section` + grid layouts for the 5-avatar cards.
- Status badge pattern from roadmap if needed for "priorité" indicators.

Not wired yet (scope belongs to later phases):
- `/beta` page — CTA buttons point to it but route 404s until Phase 7 (Clerk waitlist).
- `/formations` catalogue — deferred to Phase 5 (MDX ingestion).
- Search Ctrl+K — Phase 8.
- Podcast player — Phase 6.
