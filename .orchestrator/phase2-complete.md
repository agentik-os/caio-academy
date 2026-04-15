# Phase 2 — Design System (B&W Whitepaper) · COMPLETE

**Worker:** oracle-CAIO-Academy-phase2
**Finished:** 2026-04-15 (Third Law autonomous)
**Status:** done_clean

---

## Summary

Complete whitepaper-grade B&W design system landed on top of the Phase 1 scaffold. Zero accent color. Sharp edges everywhere. Inter + Playfair Display + JetBrains Mono. Full dark-mode inversion via `next-themes`. All 14 required components shipped. `/fr/design-system` playground renders the full kit.

---

## Files Created / Rewritten

### Core design tokens
- **`app/globals.css`** — complete rewrite. Strict B&W `@theme` block: `--color-ink`, `--color-paper`, `--color-muted`, `--color-line`, `--color-line-strong`. All shadcn tokens mapped to ink/paper. All `--radius-*` set to `0` (sharp edges, even through shadcn components). `.dark` selector inverts ink↔paper, muted → `#999`, line → `#1a1a1a`. Base layer styles h1–h6 as serif with tight leading, body as sans 1.7, sharpens selection, kills link underlines in favor of border-b control.
- **`app/[locale]/layout.tsx`** — added `JetBrains_Mono` via `next/font/google` with `--font-mono` variable. Wrapped `NextIntlClientProvider` with `ThemeProvider` (attribute="class", defaultTheme="light", enableSystem=false). `suppressHydrationWarning` on `<html>` to allow `next-themes` class swap.
- **`app/[locale]/page.tsx`** — rewritten home stub. Hero with eyebrow caps, serif 7xl title, muted lead, ink + outline CTAs; stats strip with 3 `Stat` blocks (`5 avatars · 1M€ An 3 · Beta II`). Uses `PageShell`.
- **`app/[locale]/design-system/page.tsx`** — `_design` renamed to `design-system` because Next.js 13+ treats `_` prefix as private (not routable). `robots: { index:false, follow:false }`. Seven playground sections: Swatches, Typography, Buttons, Stats, Prose, Code, Sidebar.

### Components (14)
| File | Role |
|---|---|
| `components/theme-provider.tsx` | next-themes client wrapper |
| `components/dark-mode-toggle.tsx` | Sun/Moon Lucide icon, hydration-safe via `useSyncExternalStore` |
| `components/locale-toggle.tsx` | `FR / EN` pill using `@/i18n/navigation` `useRouter().replace` |
| `components/cta-button.tsx` | `CtaButton` + `CtaLink` with `ink` / `outline` variants × sm/md/lg |
| `components/site-header.tsx` | Sticky top-16, backdrop-blur, serif logo, nav center, toggles + CTA right |
| `components/site-footer.tsx` | 4-col grid (tagline, sitemap, resources, legal) + bottom bar |
| `components/sidebar-nav.tsx` | Collapsible tree, depth-indented, active = ink border-l + bold |
| `components/prose.tsx` | Arbitrary-variant Tailwind for MDX output, 68ch max, ink-on-paper |
| `components/code-block.tsx` | Bordered figure + filename caption + copy button (Copy/Check icons) |
| `components/search-bar.tsx` | Cmd/Ctrl-K listener, shadcn Dialog trigger, stub body |
| `components/section.tsx` | Page section with eyebrow caps + serif title + muted lead |
| `components/stat.tsx` | Serif 6xl number + suffix + caps label, ink left border |
| `components/page-shell.tsx` | header + `<main>` + footer |
| `components/doc-shell.tsx` | header + sticky w-72 sidebar + main + footer |

### Lib
- **`lib/site.ts`** — `siteName`, `siteUrl`, `navItems` (keys = i18n keys), `socialLinks`, `legalLinks`.
- **`lib/utils.ts`** — untouched (shadcn `cn`).

### i18n
- **`messages/fr.json`** & **`messages/en.json`** — rewritten with full keyset: `site`, `nav` (7 items + beta), `hero` (title/lead/cta_primary/cta_secondary), `stats`, `footer` (tagline/sitemap/resources/legal/rights/made), `legal` (3 items), `design`.

### shadcn UI hardening
- Ran `sed` across `components/ui/*.tsx` to strip all `\brounded-(sm|md|lg|xl|2xl|3xl|full)\b` class occurrences. Combined with `--radius*: 0` in globals.css → sharp edges everywhere, even on library components we don't yet use.

### Package
- `next-themes@^0.4.6` was already declared in `package.json` (Phase 1). No new deps added.

---

## Key Decisions (logged for Phase 3+)

1. **`_design` → `design-system`** — Next.js excludes `_`-prefixed folders from routing. Renamed; `robots:noindex` meta ensures it stays out of search results, and it's not linked from public nav.
2. **shadcn tokens kept, values rewritten** — instead of ripping out shadcn-style CSS vars, mapped every one of them to ink/paper/line/muted. Keeps shadcn/ui components usable (Dialog, Tabs, etc.) while enforcing the B&W palette globally.
3. **`--radius*: 0` + sed strip** — belt-and-braces. The theme tokens make radii visually 0 even if a `rounded-*` class slipped through; the sed pass makes the grep done-criteria pass.
4. **`useSyncExternalStore` for theme hydration** — avoids the lint `react-hooks/set-state-in-effect` error from the standard `useEffect(() => setMounted(true), [])` pattern.
5. **Base-UI `DialogTrigger` takes `render=`, not `asChild`** — shadcn components in this repo are built on `@base-ui/react`, not Radix. Adjusted `SearchBar` accordingly.
6. **No Storybook** — the `/design-system` page is the visual playground. Karpathy: simplicity first.
7. **`ThemeProvider` with `enableSystem={false}`** — whitepaper default is light; dark is an explicit user preference, not an OS guess.

---

## Verification

```
=== BUILD ===  ✓ compiled, ✓ tsc, ✓ static generation (/fr, /en, /fr/design-system, /en/design-system)
=== LINT  ===  ✓ 0 errors / 0 warnings
=== TSC   ===  ✓ no errors
=== COLOR LEAK ===  ✓ 0 matches (blue|red|green|... |slate)-[0-9]
=== ROUNDED    ===  ✓ 0 matches rounded-(sm|md|lg|xl|2xl|3xl|full)
=== COMPONENTS ===  14 TSX files in components/ + components/ui preserved
=== SCREENSHOTS ===  home-fr-light, home-en-light, home-fr-dark, home-fr-mobile, design-system
```

---

## Screenshots (`.orchestrator/phase2-screenshots/`)

| File | Viewport | Purpose |
|---|---|---|
| `home-fr-light.png` | 1440×900 full-page | FR home, light mode |
| `home-en-light.png` | 1440×900 full-page | EN home, light mode (proves locale toggle) |
| `home-fr-dark.png`  | 1440×900 full-page | FR home, dark mode — confirms true ink↔paper inversion |
| `home-fr-mobile.png`| 390×844 full-page | Mobile responsive |
| `design-system.png` | 1440×2400 full-page | Full component playground |

Visual audit:
- ✅ Zero accent color. Pure black/white/muted grey throughout.
- ✅ Sharp edges (no rounded corners on any element).
- ✅ No shadows. Borders + space only.
- ✅ Serif headings (Playfair 900/700), sans body (Inter 400), mono code (JetBrains).
- ✅ Loose body leading (1.7), tight heading leading (1.1).
- ✅ Dark mode fully inverts with readable muted text (`#999` > `#666`).

---

## Handoff to Phase 3

Phase 3 (Pages: Home content + Vision + Business Plan) inherits:
- `PageShell` / `DocShell` layouts — just drop `<Section>` children in.
- `Prose` component — point MDX output at it.
- `Stat`, `CtaButton`, `CtaLink` — ready for metric-heavy sections.
- Typography scale is locked: `h1=7xl serif 900`, `h2=4xl/5xl serif 700`, `h3=2xl serif 700`, body `text-base leading-[1.7]`.
- i18n keys already in `messages/{fr,en}.json` for nav + hero + footer + legal. Phase 3 will add `vision.*` and `business.*` namespaces.
- `/design-system` stays as the visual regression baseline for later audits (`/uiuxaudit` will use it).

Not yet wired (intentional — scope belongs to later phases):
- `SearchBar` is a stub (Fuse.js = Phase 8)
- `SidebarNav` is a prop-driven component; doc tree generation = Phase 5 (MDX ingest)
- Clerk auth middleware = Phase 7
- Podcast player + ElevenLabs = Phase 6
- Convex mutations = later content generator phase
