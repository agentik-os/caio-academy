# Phase 3 — Data gaps

Content not present in the three canonical source files (`01-Business-Plan-2025.md`, `02-Million-Path-An3.md`, `03-Exit-Strategy-Math.md`). Flagged for user-provided data before Phase 4+.

## Unit economics (Business Plan → Unit economics section)

Source provides only partial quantification. Values displayed are **derived** from available data:

- **CAC An 3 (€300-400)** — taken from `02-Million-Path-An3.md` Levier 1. ✓ sourced.
- **LTV (€9,500-21,500)** — taken from `01-Business-Plan-2025.md` avatar rows (CTO SaaS = €9,500 / Consultant AI = €21,500). ✓ sourced.
- **LTV/CAC ratio (20x+)** — stated explicitly in `02-Million-Path-An3.md` ("Le ratio LTV/CAC reste superieur a 20x"). ✓ sourced.
- **Workshop net margin 70%** — stated in `02-Million-Path-An3.md` Levier 3. ✓ sourced.

**Gaps flagged in UI copy (Business Plan → "Ce qu'on n'a pas encore mesuré" section):**

- Real payback period from Beta Phase I (2025) — not yet in source.
- 12-month Mastermind churn rate — not yet in source. (Source only references target <5%/month as a *condition* for the Year 3 plan, not an actual measurement.)
- B2B Registry conversion rate — not yet in source. (5 Year-2 pilots are planned, not measured.)

## Roadmap milestones

All milestones taken from `01-Business-Plan-2025.md` section 08 (Roadmap Exécution) and `02-Million-Path-An3.md` "Calendrier des jalons An 2 et An 3". Year 2 and Year 3 milestones split into quarters per source.

- **Phase I status = "Done"** — implied by "Beta Phase II" being live (would require Phase I to be complete). Source `01-Business-Plan-2025.md` describes Phase I (M1-M3) as the prerequisite to Phase II. Marking as Done is consistent; if the user's internal tracker says otherwise, update `MILESTONES_*` in `app/[locale]/roadmap/page.tsx`.
- **"Next 4 weeks" priorities** — constructed from Phase II actions described in source. Specific dates (April-May 2026) come from current date context (2026-04-15) and the Beta II live status. If user has different active priorities for the current sprint, update the `c.next.items` arrays in the Roadmap page content object.

## Home — "Why now" context paragraphs

Both quotes/claims are sourced from `01-Business-Plan-2025.md` section 02 (Marché & Timing):
- "800%+ recherches 2023-2025" ✓
- "Coursera, Google, Microsoft via LinkedIn Learning" ✓
- Fenêtre 18 mois ✓

## Not implemented (out of Phase 3 scope)

- `/beta` landing page — referenced by CTA buttons but 404s until Phase 4+/7 (Beta landing + Clerk waitlist).
- `/formations` catalogue — referenced but deferred to Phase 5.
- `/avatars` — deferred to Phase 4.

No fabricated numbers, pricing, or claims. All figures trace to one of the three source `.md` files.
