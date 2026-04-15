# Phase 6 — Podcast Hub (ElevenLabs lazy gen) — COMPLETE

## Status: done_clean (pending user env vars)

## What shipped

### Convex (append-only)
- `convex/schema.ts` — added `podcasts` table with `by_doc_lang` index. `adminGenerations` table preserved intact.
- `convex/podcasts.ts` — queries (`getByDocLang`, `listByLang`) and mutations (`upsertPending`, `markReady`, `markError`, `setStatus`).

### Library
- `lib/podcast.ts` — voice IDs (`VOICES.fr`/`VOICES.en`), `ELEVEN_MODEL`, markdown-strip helper, duration estimator, blob key builder, env guards (`isApiKeyConfigured`, `isBlobTokenConfigured`).

### Components
- `components/podcast-player.tsx` — native `<audio>` with custom B&W skin (play/pause, seek bar with mono timestamps, volume on `full` variant). Variants: `inline` (hub expansion) and `full` (episode).
- `components/podcast-list-item.tsx` — hub row: section eyebrow, serif title, 2-line excerpt, status-aware CTA (`Générer` / `Génération…` / `Écouter`). Inline-expand player on click when ready.

### Pages
- `app/[locale]/podcast/page.tsx` — hub: hero (eyebrow `Audio`, serif h1, lead, count), grouped by section with items. `dynamic = "force-dynamic"` so Convex state is always fresh.
- `app/[locale]/podcast/[...slug]/page.tsx` — episode: hero + full-variant player (or generate CTA), link back to doc, transcript via `<Prose>`, prev/next footer.
- `app/[locale]/podcast/[...slug]/generate-button.tsx` — client button that POSTs `/api/podcast/generate` + `router.refresh()`.

### API
- `app/api/podcast/generate/route.ts` — POST handler. Validates input → loads doc via `getDoc()` → strips markdown → checks env keys → Convex `upsertPending` → ElevenLabs `text-to-speech` streaming → `@vercel/blob` `put` (stream piped, `allowOverwrite`) → Convex `markReady`. On error: Convex `markError` + 502. On missing env: 503.

### Nav
- `lib/site.ts` — added `{ key: "podcast", href: "/podcast" }` after `docs`. i18n keys `nav.podcast` already present in `messages/{fr,en}.json` from Phase 1.

## Verification

```
bun run build           → exits 0 (61 docs × 2 locales static; /podcast, /podcast/[...slug], /api/podcast/generate dynamic)
bun run lint            → exits 0, 0 warnings
bunx tsc --noEmit       → exits 0
bunx convex dev --once  → exits 0, schema includes adminGenerations + podcasts
```

Runtime smoke:
- `GET /fr/podcast` → 200
- `GET /fr/podcast/vision/business-plan-2025` → 200
- `POST /api/podcast/generate` with placeholder key → 503 `"ELEVENLABS_API_KEY not configured. Set a real key in Vercel env vars."` ✔

Design leaks: 0 color-tint classes, 0 `rounded-*` classes in owned files.

## Screenshots (`.orchestrator/phase6-screenshots/`)

- `podcast-hub-fr.png` — 1440×900 hub desktop showing sectioned episode list with `Générer` CTAs
- `podcast-hub-mobile-fr.png` — 390×844 mobile hub, stacked rows
- `podcast-episode-fr.png` — 1440×900 episode page with generate-state card (since key is placeholder)
- `podcast-player-detail.png` — 1200×500 crop of episode page focused on the generate UI / byline area

## Pending actions (user must complete)

1. Set real `ELEVENLABS_API_KEY` in Vercel env vars (Creator plan $22/mo for multilingual voice).
2. Set real `BLOB_READ_WRITE_TOKEN` in Vercel env vars (Vercel Blob storage). Can be pulled via `vercel env pull` once provisioned.
3. Optionally swap `VOICES.fr` / `VOICES.en` in `lib/podcast.ts` for preferred ElevenLabs voice IDs (current stubs: `pNInz6obpgDQGcFmaJgB` Adam, `21m00Tnd4PlvqZLbQBg` Rachel).

Until 1 + 2 are set, `/api/podcast/generate` returns 503 and the UI gracefully shows "Générer" without crashing.

## File ownership respected

Owned-only edits:
- `convex/schema.ts` (append `podcasts` table — existing `adminGenerations` untouched)
- `convex/podcasts.ts` (new)
- `lib/podcast.ts` (new)
- `lib/site.ts` (one-line nav insertion — explicitly permitted by spec)
- `components/podcast-player.tsx`, `components/podcast-list-item.tsx` (new)
- `app/[locale]/podcast/**` (new)
- `app/api/podcast/generate/route.ts` (new)

Nothing else touched.
