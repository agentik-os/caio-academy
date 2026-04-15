# CAIO Academy Website - Mission Brief

> **Oracle**: oracle-CAIO-Academy
> **Classification**: EPIC (multi-jour, multi-phase)
> **Standard**: Qualité 10/10, production-ready, investor-grade

---

## VISION

Site complet et public de **CAIO Academy** (Agentik OS product) — LA référence sur comment devenir Chief AI Officer en 2026-2028.

Fil conducteur pour investors, clients, candidats formation. 100% transparent : vision, business plan, pricing, path €1M, formations, avatars. Tout est visible, rien de caché.

Source de vérité : `/home/hacker/VibeCoding/1-life/05-business/01-caio/` (290+ md files).

---

## STACK TECHNIQUE (NON-NÉGOCIABLE)

| Couche | Choix | Version |
|---|---|---|
| Framework | Next.js 16 App Router | latest via Context7 |
| Styling | Tailwind CSS v4 | latest |
| UI Kit | shadcn/ui + Lucide | latest |
| DB/Backend | Convex | latest |
| Auth | Clerk (admin-only pour /admin/generator) | latest |
| i18n | next-intl (FR primary + EN) | latest |
| Markdown | next-mdx-remote + rehype-pretty-code | latest |
| TTS Podcast | ElevenLabs API (on-demand lazy gen) | latest |
| Storage podcast | Vercel Blob | latest |
| Content Gen SDK | @anthropic-ai/claude-agent-sdk | latest |
| Search | Fuse.js (client-side fuzzy) | latest |
| Runtime | Bun | latest |
| Deploy | Vercel | Production |
| Repo | github.com/agentik-os/caio-academy | Public |
| Git account | agentik-os / x@agentik-os.com | - |
| Domaine | caio.agentik-os.com (user connecte après) | - |

---

## STYLE DESIGN (NON-NÉGOCIABLE)

**Whitepaper minimalist B&W** — identique aux PDFs CAIO Academy.

- Palette : noir pur `#000`, blanc pur `#FFF`, gris `#666` pour accents, ZÉRO couleur
- Typo : Inter (sans) pour body + **serif bold pour titres** (Playfair Display ou similar)
- Espace : large, aéré, prose serrée (max-w-prose pour texte)
- Transitions : subtiles, aucune animation flashy
- Zero emoji, zero decorative bullshit
- Dark mode inversé (option toggle) : blanc → noir

Inspiration : anthropic.com, stripe.com/press, linear.app, framer.com (niveau éditorial).

**Aucun color accent.** Full B&W strict. Le contraste et la typographie suffisent.

---

## ARCHITECTURE DU SITE (10 sections principales)

### 1. `/` — Home
- Hero : "Former, certifier et placer les Chief AI Officers de demain"
- 3 piliers visuels : Teach / Certify / Place
- Proof : path €1M An 3, 5 avatars, Beta Phase II live
- CTA : "Rejoindre la waitlist Beta" + "Voir les formations"

### 2. `/vision` — Vision
- 10-year empire architecture (3 piliers AgentikOS/Dafnck/Gareth)
- Path millionnaire An 1 → 2 → 3
- Exit strategy math (1-15M EUR valorisation)
- Manifesto "Pourquoi le role CAIO existe maintenant"

### 3. `/business-plan` — Business Plan (100% transparent)
- 3 tiers : €67/m Fondation / €3,500 Founding Cohort / €500/m Mastermind
- Premium €1,500/m + Registry B2B €1,000/m
- Unit economics : CAC, LTV, payback
- Funnel math par avatar
- Revenue projections 3 ans

### 4. `/avatars` — 5 Avatars Clients
- CTO SaaS (prio 1) — détail persona, parcours, outcome
- Consultant AI (prio 2)
- DG PME (prio 3)
- Head of Digital (prio 4)
- Dev Ambitieux (prio 5, ambassadeur)
- Switch FR/EN par avatar

### 5. `/formations` — Catalogue Formations
- 11 C-Suite modules (CEO → CRO + Cohesion)
- 13 Formations FR
- 10 Courses EN
- 3 Product docs (System CAIO, Orchestration)
- Filter par niveau, durée, avatar cible

### 6. `/system-caio` — Le Produit
- Whitepaper System CAIO (FR + EN switchable)
- Orchestration Claude Code explained
- Architecture technique
- Démos vidéo/screenshot

### 7. `/roadmap` — Execution
- Beta Phase II (12 semaines, 15 personnes)
- Milestones An 1-2-3
- Status live ("En cours", "Planned", "Done")

### 8. `/podcast` — Podcast Hub
- 1 épisode audio par document (290+ docs)
- Généré à la demande via ElevenLabs (lazy)
- Cache sur Vercel Blob
- Player inline + download
- Voix : grave masculine FR + claire féminine EN (2 voix)
- Transcript affiché en prose
- **ElevenLabs plan recommandé** : Creator $22/mois puis Pro $99 si traction

### 9. `/admin/generator` — Content Generator (ADMIN ONLY)
- Protection Clerk : email `x@agentik-os.com` uniquement
- Secondary gate : password `l;'"` (API-level)
- Claude Code SDK integration (@anthropic-ai/claude-agent-sdk)
- UI : prompt input + avatar selector + platform selector (LinkedIn/Twitter/YouTube/Newsletter)
- Output : 5-20 content ideas sur demande, aligned CAIO avatars + vision
- Templates : hook, thread, script, post, video
- Historique des générations (Convex)

### 10. `/playbook` — Marketing & Outils
- Marketing Tools Arsenal (depuis 01-caio/08-marketing/)
- Commandes /mk-* référencées
- Ads strategy
- Content strategy par plateforme

---

## FEATURES TRANSVERSES

### i18n (FR primary + EN)
- Toggle langue dans header
- next-intl routing `/fr/...` et `/en/...`
- Contenu avatars/formations bilingue (les .md FR et EN déjà existants)

### Search
- Barre recherche globale (Ctrl+K)
- Fuse.js indexe tous les docs
- Résultats instantanés avec preview

### Markdown rendering
- Tout le contenu vient des .md dans `/home/hacker/VibeCoding/1-life/05-business/01-caio/`
- SSG : pages pré-rendues au build
- Headings → ID anchors pour TOC
- Code blocks avec rehype-pretty-code (mais minimaliste B&W)
- Tables, blockquotes, lists stylés whitepaper

### Navigation
- Sidebar tree collapsible (reprend structure 05-business/01-caio/)
- Breadcrumbs en top
- Prev/Next article footer

### SEO + OG
- Meta tags par page
- OG image dynamique (next/og) avec titre + CAIO Academy logo
- sitemap.xml
- robots.txt
- Schema.org Organization + Course

### Analytics
- Vercel Analytics
- Plausible ou similar (privacy-first)

---

## INGESTION CONTENU (290 docs)

Script qui :
1. Parse tous les `.md` de `/home/hacker/VibeCoding/1-life/05-business/01-caio/`
2. Extrait frontmatter / title / content
3. Génère l'index Fuse.js au build time
4. Crée les routes Next.js dynamiques `[section]/[slug]`
5. Pas de duplication : le site lit directement depuis `1-life/` (symlink ou sync script)

---

## PHASES D'EXÉCUTION

### Phase 1 : Scaffolding (Jour 1, 4-6h)
- /new-project wizard avec tous les defaults décidés
- Git init + repo github.com/agentik-os/caio-academy
- Vercel linked
- .env.local avec tokens placeholders
- Tmux `oracle-CAIO-Academy` + Telegram topic
- Register dans projects.json

### Phase 2 : Design System (Jour 1-2, 4h)
- Theme B&W whitepaper dans globals.css
- Typography (Inter + serif bold) chargées via next/font
- Components de base : Header, Footer, Sidebar, Prose, CodeBlock, Search
- Dark mode toggle
- Responsive breakpoints

### Phase 3 : Pages principales (Jour 2-3, 8h)
- Home avec hero + 3 piliers + proof + CTA
- Vision page
- Business Plan page (transparency totale)
- Roadmap page

### Phase 4 : Avatars + Formations (Jour 3-4, 8h)
- 5 pages avatars (FR+EN)
- Catalogue formations filtrable
- Pages formation individuelles (dynamic routes)

### Phase 5 : Markdown ingestion (Jour 4-5, 6h)
- Script de sync `1-life/05-business/01-caio/` → site content
- Routes dynamiques pour tous les docs
- TOC auto, prev/next, search index

### Phase 6 : Podcast Hub (Jour 5-6, 8h)
- ElevenLabs API integration
- Convex table `podcasts` (doc_slug, audio_url, duration, generated_at)
- Lazy generation : check cache → si null, appelle ElevenLabs → store Vercel Blob
- Player component avec waveform
- Voice pair FR/EN

### Phase 7 : Content Generator SDK (Jour 6-7, 6h)
- Route `/admin/generator` protégée Clerk
- `@anthropic-ai/claude-agent-sdk` integration
- UI : prompt + avatar + platform + template
- Convex action pour call SDK
- Historique générations
- Secondary password gate

### Phase 8 : i18n + Search (Jour 7-8, 4h)
- next-intl config
- Messages FR/EN
- Fuse.js search avec keyboard shortcut Ctrl+K

### Phase 9 : SEO + OG + Analytics (Jour 8, 2h)
- Metadata helpers
- Dynamic OG images
- sitemap.xml
- Vercel Analytics + Plausible

### Phase 10 : QA + Deploy (Jour 8-9, 4h)
- /codeaudit
- /uiuxaudit
- /a11yaudit
- /perfaudit
- /seoaudit
- Fix toutes les findings
- Deploy prod Vercel
- Telegram notification au groupe OneLife + CAIO-Academy topic

---

## QUALITY GATES (NO-COMPROMISE)

Avant de marquer DONE :
- [ ] `bun run build` = 0 errors
- [ ] `bun run lint` = 0 warnings
- [ ] `bunx convex deploy` = success
- [ ] Lighthouse > 95 sur Perf / A11y / SEO / Best Practices
- [ ] Responsive OK mobile + tablet + 4K
- [ ] Dark mode fonctionne partout
- [ ] Toutes les 290 docs accessibles via navigation
- [ ] Podcast audio fonctionne (au moins sur 3 docs en test)
- [ ] Content generator génère output valide
- [ ] Tests E2E playwright pass
- [ ] `git push` + Vercel deploy = HTTP 200 sur preview URL
- [ ] Screenshots BEFORE/AFTER sur Telegram pour validation user

---

## RESSOURCES

### Source de vérité contenu
`/home/hacker/VibeCoding/1-life/05-business/01-caio/` (290 docs)

### Source de vérité pricing & stratégie
`/home/hacker/VibeCoding/1-life/05-business/01-caio/01-vision/01-Business-Plan-2025.md`
`/home/hacker/VibeCoding/1-life/05-business/Add/caio-business-plan.html`

### PDF reference pour style whitepaper
`/home/hacker/VibeCoding/1-life/tools/pdf-generator/src/whitepaper/theme.ts`

### Design reference externe
- anthropic.com (typographie + espaces)
- stripe.com/press (whitepaper B&W)
- linear.app (subtle transitions)
- framer.com/docs (markdown rendering)

### Existing projects pour pattern
- DentistryGPT : `/home/hacker/VibeCoding/clients/DentistryGPT/`
- Kommu : `/home/hacker/VibeCoding/work/Kommu/`

---

## BUDGET ELEVENLABS

Estimation : Creator Plan $22/mo = 100k chars/month = ~3 podcasts générés par jour en lazy mode.

Upgrade progressif :
- 0-30 jours : Creator $22 (test usage)
- 30-90 jours : Pro $99 si trafic + 100 podcasts/mois
- 90+ jours : Scale $330 si traction forte

Voix recommandées :
- FR masculine grave : "Adam" (ou équivalent FR)
- EN féminine claire : "Rachel"

---

## COMMUNICATION

### Telegram Topic : CAIO-Academy
- Tous les progress updates du build
- Screenshots BEFORE/AFTER par phase
- Notifications completion par phase
- Alerts si build broken

### Tmux session : oracle-CAIO-Academy
- Oracle principal
- Spawn work sessions `CAIO-Academy-phaseN` pour chaque phase
- Monitoring live via tmux split-pane

---

## DONE CRITERIA GLOBAL

Le site est considéré LIVE quand :
1. `curl -I https://caio.agentik-os.com` → HTTP 200
2. Home + Vision + Business Plan + Avatars + Formations + Roadmap + Podcast + Generator accessibles
3. FR ET EN switch fonctionnel
4. Search global trouve au moins 1 résultat sur "CAIO"
5. Au moins 1 podcast généré via ElevenLabs et audible
6. Content generator produit 5 ideas valides en <10s
7. Lighthouse scores ≥ 95/95/95/100
8. Screenshot final posté sur Telegram topic CAIO-Academy

---

**NO TIME PANIC** : Qualité > vitesse. Tokens illimités. 100h = OK. Plusieurs jours = OK. Zero shortcut.

**Karpathy Principles** : Think before coding, simplicity first, surgical changes, goal-driven verification.
