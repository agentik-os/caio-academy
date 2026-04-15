# AI Agent Stack -- Ce Que Tu Livres Concretement

*Le detail technique de ce que le client recoit et comment ca tourne.*

---

## La Stack Complete

### LAYER 1 : INTELLIGENCE (AI Agents)

| Agent | Role |
|-------|------|
| Claude Code (Opus) | Architecture, code complexe, review |
| Claude Code (Sonnet) | Implementation rapide, bulk tasks |
| Ralph | Autonomous dev loop (build + test + iterate) |
| MANIAC | Deep testing (securite, UX, perf, a11y) |
| Forge | Idea-to-MVP pipeline automatise |

### LAYER 2 : FRAMEWORK (Tech Stack)

| Technologie | Role |
|-------------|------|
| Next.js 15 | Frontend + SSR + API routes |
| TypeScript | Type safety everywhere |
| Tailwind + shadcn/ui | Design system pre-construit |
| Convex | Real-time backend, zero config |
| Clerk | Auth complete en 10 minutes |
| Stripe | Paiements, subscriptions |
| Vercel | Deploy en 1 commande |

### LAYER 3 : QUALITY (Garantie)

| Element | Role |
|---------|------|
| MANIAC Testing | 100% couverture avant livraison |
| TypeScript strict | Zero erreur de type |
| CI/CD | Deploy automatique, rollback si probleme |
| Monitoring | Sentry pour erreurs, analytics pour usage |

### LAYER 4 : DELIVERY (Ce que le client recoit)

- Code source complet (GitHub/GitLab)
- Documentation technique
- Guide d'utilisation
- Acces admin a tous les services
- Video walkthrough du produit

---

## Ce Que Tu Construis (par type de projet)

### Type A : SaaS Web Application

**Livrable typique en 4-6 semaines :**

| Composant | Detail | Temps estime |
|-----------|--------|-------------|
| Landing page | Hero, features, pricing, CTA, responsive | 1-2 jours |
| Auth system | Login, signup, forgot password, OAuth | 1 jour (Clerk) |
| Dashboard | Sidebar, navigation, data display | 2-3 jours |
| Core features (3-5) | Fonctionnalites metier specifiques | 5-15 jours |
| Settings | Profile, billing, team management | 2-3 jours |
| Payments | Stripe checkout, subscriptions, portal | 1-2 jours |
| Admin panel | Gestion users, analytics basiques | 2-3 jours |
| Email system | Transactional emails, notifications | 1-2 jours |
| Testing | MANIAC full audit | 2-3 jours |
| Deploy | Production, DNS, SSL, monitoring | 1 jour |
| **TOTAL** | **Produit complet production-ready** | **18-35 jours** |

### Type B : Internal Tool / Dashboard

**Livrable typique en 2-3 semaines :**

| Composant | Detail | Temps |
|-----------|--------|-------|
| Auth + permissions | Role-based access | 1 jour |
| Data integration | API, database, import CSV | 2-3 jours |
| Dashboard views | Charts, tables, KPIs | 3-5 jours |
| CRUD operations | Create, read, update, delete | 2-3 jours |
| Export / reports | PDF, CSV, scheduled emails | 1-2 jours |
| Deploy | Internal hosting ou cloud | 1 jour |
| **TOTAL** | **Outil interne fonctionnel** | **10-15 jours** |

### Type C : Landing Page + Funnel

**Livrable typique en 1-2 semaines :**

| Composant | Detail | Temps |
|-----------|--------|-------|
| Landing page | Conversion-optimized, responsive | 2-3 jours |
| Lead capture | Forms, CRM integration | 1 jour |
| Email sequence | Automated follow-ups | 1-2 jours |
| Analytics | GA4, conversion tracking | 1 jour |
| A/B testing setup | Variants ready | 1 jour |
| SEO | Meta, schema, sitemap | 1 jour |
| **TOTAL** | **Funnel complet** | **7-10 jours** |

### Type D : Mobile App (Expo)

**Livrable typique en 6-8 semaines :**

| Composant | Detail | Temps |
|-----------|--------|-------|
| App structure | Navigation, screens, theme | 2-3 jours |
| Auth | Biometric, social login | 1-2 jours |
| Core features (3-5) | Fonctionnalites specifiques | 10-20 jours |
| Push notifications | Setup + triggers | 1-2 jours |
| Offline support | Local storage, sync | 2-3 jours |
| App Store prep | Screenshots, description, review | 2-3 jours |
| **TOTAL** | **App iOS/Android publiee** | **18-33 jours** |

---

## Le Process de Build (Comment Ca Se Passe)

### SEMAINE 1 : ARCHITECTURE

**Jour 1-2 : Setup projet + architecture**
- Repo, CI/CD, stack, structure
- Database schema
- API design

**Jour 3-5 : Foundation**
- Auth, layout, navigation
- Design system (theme, components)
- Core data models

### SEMAINE 2-3 : BUILD

**Ralph autonome sur les features :**
- Feature 1 : build, test, done
- Feature 2 : build, test, done
- Feature 3 : build, test, done

**Toi :** Review, decisions architecture, feedback client, adjustments

### SEMAINE 4 : POLISH

- MANIAC testing (securite, UX, perf)
- Bug fixes et polish
- Responsive check (9 breakpoints)
- Client feedback integration

### SEMAINE 5 : DEPLOY

- Production deployment
- DNS, SSL, monitoring setup
- Documentation
- Client handover + formation

---

## La Difference Visible Pour Le Client

### Ce que le client VOIT

| Jour | Ce qui se passe |
|------|-----------------|
| **Lundi** | "Gareth, voici mon idee de SaaS pour les dentistes" |
| **Mardi** | Loom video 5min : "Voici l'architecture que je propose. Validez-vous?" |
| **Vendredi** | Loom video 5min : "Le dashboard de base est en place. Voici une demo live." |
| **Lundi suivant** | Loom video 5min : "La feature principale est fonctionnelle. Testez ici: [URL]" |
| **3 semaines plus tard** | Call 30min : "Votre produit est en production. Voici tous les acces. Voici la documentation. On planifie le follow-up dans 2 semaines." |

### Ce que le client NE VOIT PAS

**Lundi (derriere le rideau) :**
- Claude Opus analyse le brief, genere l'architecture
- Forge cree le squelette du projet en 20 minutes
- Ralph commence le build autonome

**Mardi-Jeudi :**
- Ralph tourne 8-12h/jour sur les features
- MANIAC teste chaque feature automatiquement
- Toi tu review, ajustes, prends les decisions d'archi

**Vendredi :**
- Build quasi complet
- Tu enregistres la demo Loom
- Le client pense que tu as une equipe de 5

---

## Garanties Clients

| Garantie | Detail |
|----------|--------|
| **Code quality** | TypeScript strict, zero erreur de type |
| **Testing** | MANIAC audit complet avant livraison |
| **Security** | XSS, SQLi, CSRF testes automatiquement |
| **Performance** | Core Web Vitals dans le vert |
| **Responsive** | Teste sur 9 breakpoints (320px a 4K) |
| **Documentation** | Technique + utilisateur |
| **Support** | 30-60 jours post-livraison inclus |
| **Propriete** | 100% du code appartient au client |

---

## Stack Client Post-Livraison

Ce que le client recoit pour etre autonome :

### Repo GitHub
- Code source complet
- README detaille
- .env.example
- CI/CD configure
- Tests automatises

### Documentation
- Architecture overview
- Database schema
- API documentation
- Deployment guide
- Troubleshooting FAQ

### Acces
- Vercel (hosting)
- Convex (database)
- Clerk (auth)
- Stripe (payments)
- Sentry (monitoring)
- Analytics (GA4/Plausible)

### Formation
- Video walkthrough 30-60min
- Guide utilisateur
- Support async 30-60 jours

---

## Pourquoi Cette Stack (Justification Client)

Quand le client demande "pourquoi Next.js + Convex?" :

"J'ai teste 15+ stacks differentes sur 30+ projets. Celle-ci est la plus rapide a deployer, la plus fiable, et la moins chere a maintenir."

| Technologie | Justification |
|-------------|---------------|
| Next.js | Le standard industrie, supporte par Vercel (imbattable) |
| Convex | Backend real-time sans serveur a gerer (-80% de complexite) |
| Clerk | Auth en 10 minutes au lieu de 2 semaines |
| Stripe | Paiements plug-and-play |
| shadcn/ui | Design system professionnel, personnalisable |

Le tout coute moins de 50 EUR/mois en hosting jusqu'a 10K utilisateurs.

---

*Document cree le 20 fevrier 2026*
