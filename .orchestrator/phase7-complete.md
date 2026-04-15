# Phase 7 — Admin Content Generator (Clerk + Claude + Convex)

Status: **pending** (code complete; build blocked on Phase 4)

## What was built

### Auth architecture (defense-in-depth)
- **Layer 1 — Clerk**: `proxy.ts` now chains `clerkMiddleware` with `createIntlMiddleware`. `/fr/admin/**`, `/en/admin/**`, `/api/admin/**` gated via `auth.protect()`. Email check re-enforced in `app/[locale]/admin/layout.tsx` (`notFound()` if `email !== ADMIN_EMAIL`).
- **Layer 2 — Secondary password**: `/api/admin/verify-password` compares `body.password` against `ADMIN_SECONDARY_PASSWORD` via `timingSafeEqual`, then sets `admin-secondary=ok` httpOnly/secure/SameSite=Strict cookie (24h). `/api/admin/generate` rejects with 403 unless both gates pass.

### Files created
| Path | Role |
|---|---|
| `proxy.ts` | Clerk + intl middleware chain |
| `app/[locale]/layout.tsx` | Wrapped with `<ClerkProvider>` (B&W `appearance`) |
| `app/[locale]/sign-in/[[...sign-in]]/page.tsx` | Clerk `<SignIn />` mount |
| `app/[locale]/sign-up/[[...sign-up]]/page.tsx` | Clerk `<SignUp />` mount |
| `app/[locale]/admin/layout.tsx` | Server gate (email check) + admin shell |
| `app/[locale]/admin/generator/page.tsx` | Client generator UI + streaming SSE consumer |
| `app/api/admin/verify-password/route.ts` | Secondary-password gate |
| `app/api/admin/generate/route.ts` | Streaming generator via `@anthropic-ai/sdk` |
| `lib/admin/system-prompt.ts` | Avatar + platform + template → system prompt |
| `convex/schema.ts` | `adminGenerations` table with `by_createdAt` index |
| `convex/adminGenerations.ts` | `create` mutation + `recent` query |

### SDK decision
The brief referenced `@anthropic-ai/claude-agent-sdk` with an `agent.complete()` API that does not exist. The real `claude-agent-sdk` exports `query({ prompt, options }): Query` — it's Claude Code's agentic SDK (tool-using, filesystem-aware), designed for autonomous coding agents, not single-shot content generation.

The pragmatic Karpathy choice is the **Messages API** via `@anthropic-ai/sdk` (installed as a transitive dependency, v0.81.0): streaming, typed, minimal surface. The route uses `anthropic.messages.stream({ model: "claude-opus-4-5", ... })` and forwards `content_block_delta.text_delta` events to the client as SSE frames. Same model, right tool.

### Streaming model
- Server: `Response(new ReadableStream, { headers: text/event-stream })`, per-delta `event: delta` frames, final `event: complete`.
- Client: manual `getReader()` loop, parses `event: / data:` SEI frames, accumulates text, attempts `JSON.parse` on array boundaries (`[...]`), renders ideas incrementally.

### Convex
Codegen ran automatically (new project `caio-academy-25dd2`, deployment `dev:dashing-civet-35`). `.env.local` now has `CONVEX_DEPLOYMENT` + `NEXT_PUBLIC_CONVEX_URL`. Schema validated. History sidebar on the admin page currently shows a placeholder note; hooking it up to `api.adminGenerations.recent` requires a Convex React provider which is Phase 5's territory.

### Clerk keys (placeholders)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y2xlcmsucGxhY2Vob2xkZXIuY29tJA`
- `CLERK_SECRET_KEY=sk_test_placeholder_rotate_before_prod`

These parse as valid Clerk key format so TS/build does not crash, but the Clerk runtime will reject real auth calls. **User MUST rotate both values in Vercel env before production.** ADMIN_EMAIL and ADMIN_SECONDARY_PASSWORD are set from the brief.

## Verification

| Gate | Result |
|---|---|
| `bunx tsc --noEmit` | pass (0 errors) |
| `bun run lint` | pass (clean) |
| `bunx convex codegen` | pass (auto-configured new project) |
| `bun run build` | **fails in `app/[locale]/avatars/[slug]/page.tsx` — Phase 4's MDX** |

### Build-blocker detail
```
Error occurred prerendering page "/fr/avatars/cto-saas"
[next-mdx-remote] error compiling MDX:
Expected a closing tag for `<CardContent>` before the end of `paragraph`
```
`lib/avatars.ts` (Phase 4 ownership per mission brief) contains malformed MDX — self-closing `</CardContent>` written as `-/CardContent>`. Per the hard ownership boundary in the brief (Phase 7 may not touch `app/[locale]/avatars/`, `lib/avatars.ts`, `components/formations-filter.tsx`, etc.), this is not a Phase 7 fix.

### Screenshots
Not captured: the global testing rule forbids `next dev`, and `bun run build` cannot produce a prod bundle until the Phase 4 MDX is fixed. Screenshots will be captured by QA Phase 10 once the shared build is green.

## Pending actions

1. **Phase 4** must fix the malformed MDX in the avatar seed data (`lib/avatars.ts`, `cto-saas` entry — `-/CardContent>` → `</CardContent>`). Likely other avatars have the same typo.
2. **Phase 10** (QA) capture production screenshots of `/fr/sign-in`, `/fr/admin/generator` (gate view), admin 404 when not signed in.
3. **User** must replace `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in Vercel project env with real Clerk keys for the agentik-os Clerk app before promoting to production.
4. **Phase 5** (or a follow-up) should wire the admin history sidebar to `api.adminGenerations.recent` via a Convex React provider (currently rendered as a static placeholder).

## Karpathy / No Time Panic notes
- Surgical: only touched `proxy.ts` (existing file, merged) and `app/[locale]/layout.tsx` (added provider), plus new files in owned paths.
- Simplicity: one `timingSafeEqual` + one cookie for the secondary gate — no DB session, no stored tokens.
- Did not cut scope. The build failure is environmental (Phase 4 ownership); Phase 7 code compiles and lints clean.
