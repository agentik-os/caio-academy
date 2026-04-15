# Formation 2 — Agentic Coding : Systems Builder

## Instructions pour l'Agent Createur de Formation

> **Objectif** : Générer une formation complète et ultra-technique (mais accessible) pour apprendre a construire des systèmes IA de production : automatisation, SaaS, agents, MCP, CLI, monitoring, deploiement. Tout ce qu'Agentik OS fait pour ses clients, enseigne dans un format structure.
>
> **Ton** : Technique mais clair. On montre du code, des architectures, des workflows reels. Pas de theorie vague — chaque module aboutit a un livrable concret.
>
> **Format** : Chaque module = video screencast + code source + exercice hands-on + projet a rendre.
>
> **Duree estimee** : 30-40 heures de contenu. 4-6 semaines pour completer.
>
> **Prix** : $497 seul / inclus dans le bundle a $997 (les 3 formations)

---

## Identite de la Formation

| Champ | Valeur |
|-------|--------|
| Nom | **Agentic Coding — Systems Builder** |
| Sous-titre | Construis des systèmes IA de production avec Claude Code, MCP & le stack moderne |
| Createur | Gareth Simono — Fondateur d'Agentik {OS} |
| Public cible | Developpeurs, techniciens, entrepreneurs tech, aspirants CAIO |
| Pre-requis | Bases de programmation (JS/TS préféré), terminal, Git. Pas besoin d'être senior. |
| Promesse | "En 6 semaines, tu sais construire un SaaS complet avec authentification, paiements, agents IA, et deploiement production — le même stack qu'Agentik OS utilise pour ses clients" |
| Upsell | Accompagnement AI Build ($15K-45K) ou CAIO Partnership sur agentik-os.com |

---

## Structure Complète des Modules

### MODULE 1 — Claude Code : Les Fondamentaux

**Objectif** : L'eleve maitrise Claude Code comme outil principal de développement et comprend son architecture.

**Lecons a générer :**

1.1 **Qu'est-ce que Claude Code et pourquoi c'est différent**
- CLI officiel d'Anthropic pour le dev agentic
- Acces direct au filesystem (lecture/ecriture/edition native)
- Utilisation d'outils (bash, recherche code, git)
- Spawning d'agents (sous-agents pour travail parallele)
- Système de memoire (contexte persistant entre sessions)
- Hooks et Skills (automation evenementielle + capabilities reutilisables)
- Comparaison avec Cursor, Windsurf, Copilot — pourquoi Claude Code est superior pour le dev système

1.2 **Installation & Configuration**
- Installation : `npm install -g @anthropic-ai/claude-code`
- Authentification : `claude login`
- Premier lancement dans un projet
- Les fichiers de config essentiels :
 - `~/.claude/settings.json` (global)
 - `~/.claude/CLAUDE.md` (instructions globales)
 - `./CLAUDE.md` (instructions projet)
 - `./.claude/settings.json` (settings projet)
 - `./.claude/rules/*.md` (regles auto-chargees)

1.3 **Le système CLAUDE.md — Le fichier le plus important**
- Structure d'un CLAUDE.md efficace : Overview, Tech Stack, Project Structure, Design Guidelines, Key Commands, Rules
- Exemples reels tire d'Agentik OS (version simplifiee)
- Comment iterer sur son CLAUDE.md au fil du projet
- Exercice : L'eleve créé le CLAUDE.md de son premier projet

1.4 **Travailler efficacement avec Claude Code**
- Être specifique > être vague
- Donner du contexte (références fichiers, composants, patterns)
- Laisser Claude explorer (il peut lire le codebase)
- Utiliser les agents pour les taches complexes
- Le self-check : Claude verifie son propre output
- Les permissions et modes (plan, auto, bypassPermissions)

1.5 **Demo live : Construire un composant de A a Z**
- Screencast : créer un composant React avec Claude Code
- De l'intention a l'implementation en une seule session
- Montrer le workflow reel : prompt → lecture du code existant → implementation → verification

**Exercice pratique** : Installer Claude Code, configurer un projet, créer un CLAUDE.md, et générer un premier composant.

---

### MODULE 2 — MCP (Model Context Protocol) : Le Connecteur Universel

**Objectif** : L'eleve comprend MCP, sait configurer des serveurs MCP, et peut connecter Claude a n'importe quel service externe.

**Lecons a générer :**

2.1 **Qu'est-ce que MCP et pourquoi c'est revolutionnaire**
- MCP = "USB pour l'IA" — un standard universel pour connecter les modèles a des outils externes
- Architecture : Claude Code ←→ MCP Server ←→ Service Externe
- Les 3 primitives : Tools (fonctions), Resources (donnees), Prompts (templates)
- Pourquoi MCP > API directes (standardisation, decouverte, composabilite)

2.2 **Configurer des serveurs MCP**
- Configuration dans `~/.claude/settings.json` (mcpServers)
- Structure : command, args, env
- Exemples avec les serveurs populaires :
 - Playwright (automatisation navigateur)
 - PostgreSQL (acces BDD)
 - Filesystem (operations fichiers cross-projet)
 - GitHub (gestion repo)
 - Slack, Gmail, Google Drive, Linear, Notion
- Debug : logs, erreurs courantes, verification de connexion

2.3 **Composio : La plateforme d'integration multi-outils**
- Qu'est-ce que Composio : 200+ apps pre-integrees
- Sans Composio (4 integrations custom = 40+ heures) vs Avec (1 MCP server = 30 minutes)
- Installation : `npm install -g composio-core`
- Connexion d'apps : `composio add github`, `composio add slack`, etc.
- Utilisation dans les workflows : Claude peut envoyer des emails, poster sur LinkedIn, créer des issues GitHub, etc.

2.4 **Construire un MCP Server custom**
- Quand construire le tien (aucun serveur existant ne correspond a ton besoin)
- Architecture d'un MCP server TypeScript :
 - Import du SDK `@modelcontextprotocol/sdk/server`
 - Declaration des tools (nom, description, inputSchema)
 - Implementation des handlers (tools/list, tools/call)
- Exemple complet : un MCP server qui se connecte a une API business specifique
- Tests et debug
- Publication (npm, GitHub)

2.5 **Workflows MCP avances**
- Chainer plusieurs MCP servers dans un workflow
- Exemple : GitHub → rapport → Gmail → Slack → Notion → Google Calendar
- Gestion des erreurs et retry
- Monitoring des connexions MCP

**Exercice pratique** : Configurer 3 MCP servers (Composio + Playwright + un custom), créer un workflow qui connecte 2 services externes.

---

### MODULE 3 — Skills, Hooks & Commands : Ton Arsenal Personnalise

**Objectif** : L'eleve sait créer des skills reutilisables, des hooks d'automatisation, et des commandes custom pour Claude Code.

**Lecons a générer :**

3.1 **Skills — Capabilities IA reutilisables**
- Anatomie d'une skill : frontmatter YAML + instructions markdown
- Ou les stocker : `~/.claude/commands/` (global) ou `.claude/commands/` (projet)
- Skills user-invokable vs auto-triggered
- Exemples de skills essentielles pour un CAIO :
 - `/deploy` : deployer en production
 - `/audit` : audit sécurité & code
 - `/blog-write` : générer du contenu blog SEO
 - `/test` : lancer des tests complets
 - `/report` : générer des rapports clients
 - `/social-post` : poster sur les reseaux sociaux

3.2 **Comment ecrire une skill efficace**
- Le frontmatter : name, description, triggers
- Les instructions : step-by-step, claires, sans ambiguite
- Gestion du contexte : comment la skill accede aux fichiers du projet
- Best practices : une skill = une responsabilite
- Tester et iterer sur ses skills

3.3 **Hooks — Automatisation evenementielle**
- Les types d'evenements :
 - `PreToolUse` : avant qu'un outil s'execute (validation, logging)
 - `PostToolUse` : après (notifications, tracking)
 - `SessionStart` : debut de session (charger contexte, set environnement)
 - `SessionEnd` : fin de session (sauvegarder, cleanup)
 - `UserPromptSubmit` : capture des prompts pour analyse
- Configuration dans `.claude/settings.json` : matcher, command
- Exemples concrets :
 - Logger chaque fichier modifie
 - Notifier par Telegram quand un deploy est fait
 - Charger du contexte automatiquement au demarrage
 - Enregistrer un resume de session a la fin

3.4 **Commands — Slash commands personnalisees**
- Créer un fichier `.claude/commands/nom.md`
- Structure : frontmatter + instructions
- Différence entre command et skill (invocation user explicite vs auto-trigger)
- Exemples : `/audit`, `/deploy`, `/fix`, `/test`

3.5 **Construire ton toolkit CAIO complet**
- Les 10 skills/commands indispensables
- Organisation des fichiers (structure de dossiers recommandee)
- Versionner et partager tes skills (Git, npm)
- La philosophie : chaque tache repetitive = une skill

**Exercice pratique** : Créer 3 skills custom pour ton projet, configurer 2 hooks, et documenter le tout.

---

### MODULE 4 — Automatisation & Cron Systems

**Objectif** : L'eleve sait automatiser des taches recurrentes avec des cron jobs et des pipelines IA autonomes.

**Lecons a générer :**

4.1 **Pourquoi l'automatisation est le coeur du business CAIO**
- Ce qu'on peut automatiser : blog, social media, SEO monitoring, rapports clients, health checks, backups, syndication de contenu
- Le passage de "je fais" a "ca se fait tout seul" — c'est la que la valeur explose

4.2 **Les fondamentaux du Cron**
- Syntaxe cron : minute, heure, jour du mois, mois, jour de la semaine
- Exemples : tous les jours a 9h, toutes les 6h, le 1er de chaque mois
- `crontab -e`, `crontab -l`
- Logging et debug des cron jobs

4.3 **Pipelines de contenu automatises**
- Exemple reel : auto-publish blog articles
 - Script ZSH : selectionner un sujet → Claude généré l'article → générer l'image → créer le fichier blog → build & deploy → poster sur les reseaux → notification Telegram
- Exemple : publication sociale automatisee (LinkedIn, Twitter, Reddit)
- Exemple : monitoring SEO quotidien avec alertes

4.4 **Trigger.dev — Background jobs & workflows durables**
- Qu'est-ce que Trigger.dev : plateforme de jobs background pour TypeScript
- Cas d'usage : taches longues, retries automatiques, queues, workflows multi-étapes
- Setup dans un projet Next.js
- Exemples : email sequences, data processing, webhook handlers

4.5 **Inngest & Pipedream — Alternatives et complementarites**
- Inngest : event-driven workflows, step functions
- Pipedream : low-code workflows avec code custom
- Quand utiliser quoi : decision tree

4.6 **Monitoring & Self-Healing**
- Surveiller tes automations (logs, alertes)
- Self-healing : retry automatique, fallbacks, circuit breakers
- Dashboard de monitoring maison (ou comment utiliser des outils existants)
- Notifications Telegram pour chaque erreur critique

**Exercice pratique** : Créer un pipeline cron qui généré et publie du contenu automatiquement (blog OU social).

---

### MODULE 5 — Construire un SaaS avec Next.js 16

**Objectif** : L'eleve maitrise le framework Next.js avec App Router pour construire des applications web de production.

**Lecons a générer :**

5.1 **Next.js 16 — Le framework de référence**
- Pourquoi Next.js (SSR, SSG, App Router, Server Components, Server Actions)
- Setup : `npx create-next-app@latest` avec TypeScript, Tailwind, App Router
- Structure de projet : `src/app/`, layouts, pages, components
- Turbopack pour le dev rapide

5.2 **React 19 — Server Components & Server Actions**
- La revolution Server Components : pourquoi c'est game-changing
- Server Actions : mutations sans API routes
- `"use client"` vs composants serveur par defaut
- Patterns : quand utiliser quoi

5.3 **Tailwind CSS v4 + shadcn/ui**
- Setup Tailwind v4 (CSS-first config)
- shadcn/ui : components accessibles, performants, personnalisables
- Installation : `npx shadcn@latest init`
- Les composants essentiels : Button, Card, Dialog, Form, Table, etc.
- Theming : créer ton propre theme (dark/light mode)

5.4 **Routing & Layouts**
- App Router : file-system routing
- Layouts imbriques, groups de routes `(marketing)/`, `(dashboard)/`
- Dynamic routes `[slug]`, catch-all `[...slug]`
- Loading, error, not-found pages
- Metadata API pour le SEO

5.5 **Data Fetching & Caching**
- Server Components : fetch directement dans les composants
- `"use cache"` directive (Next.js 16)
- Revalidation : `revalidateTag()`, `revalidatePath()`
- Patterns : quand fetch côté serveur vs client

5.6 **Deploiement sur Vercel**
- Setup Vercel : `vercel --prod --yes --token`
- Variables d'environnement
- Domains custom
- Preview deployments
- Analytics et Web Vitals

**Exercice pratique** : Scaffolder un SaaS Next.js complet avec 3 pages, un theme custom, et le deployer sur Vercel.

---

### MODULE 6 — Base de Donnees avec Convex

**Objectif** : L'eleve sait utiliser Convex comme backend temps-reel pour ses applications.

**Lecons a générer :**

6.1 **Convex — Le backend nouvelle génération**
- Qu'est-ce que Convex : BDD reactive, temps-reel, TypeScript-native
- Pourquoi Convex > Firebase/Supabase pour les SaaS modernes
- Architecture : schema → queries → mutations → actions
- Setup : `npm create convex@latest`

6.2 **Schema Design**
- Definir tes tables avec `defineSchema()` et `defineTable()`
- Types : `v.string()`, `v.number()`, `v.boolean()`, `v.array()`, `v.object()`
- Relations : références entre tables
- Indexes pour la performance
- Migrations

6.3 **Queries — Lire les donnees**
- `query()` : fonctions read-only, reactives
- Filtres, tri, pagination
- Subscriptions temps-reel (les composants se mettent a jour automatiquement)
- Patterns : queries composees, queries conditionnelles

6.4 **Mutations — Ecrire les donnees**
- `mutation()` : fonctions d'ecriture transactionnelles
- Insert, update, delete
- Validation des donnees
- Optimistic updates côté client

6.5 **Actions — Logique externe**
- `action()` : fonctions qui peuvent appeler des APIs externes
- Quand utiliser action vs mutation
- Schedulage : `ctx.scheduler.runAfter()`
- Cron jobs Convex

6.6 **Integration Next.js + Convex**
- ConvexProvider setup
- `useQuery()`, `useMutation()`, `useAction()` hooks
- Server-side Convex avec `preloadQuery()`
- Patterns d'architecture recommandes

**Exercice pratique** : Créer un backend Convex complet avec schema, queries, mutations, et integration frontend.

---

### MODULE 7 — Authentification avec Clerk

**Objectif** : L'eleve sait implementer un système d'authentification complet avec Clerk.

**Lecons a générer :**

7.1 **Clerk — Auth moderne en 10 minutes**
- Qu'est-ce que Clerk : plateforme d'auth complète (sign-up, sign-in, user management, organizations)
- Pourquoi Clerk > Auth.js/NextAuth (dx, features, support)
- Setup : `npm install @clerk/nextjs`, cles API

7.2 **Integration Next.js**
- `ClerkProvider` dans le root layout
- Middleware : `clerkMiddleware()` pour proteger les routes
- Composants pre-faits : `<SignInButton>`, `<UserButton>`, `<SignUp>`
- Pages d'auth custom

7.3 **Gestion des utilisateurs**
- `currentUser()`, `auth()` côté serveur
- `useUser()`, `useAuth()` côté client
- Metadata custom (plan, role, préférences)
- Webhooks Clerk → Convex (sync users)

7.4 **Organizations & Roles**
- Multi-tenancy avec Clerk Organizations
- Roles et permissions custom
- Invitation de membres
- Dashboard admin

7.5 **Integration Clerk + Convex**
- Webhook de sync : Clerk → Convex (création/update/delete users)
- Auth dans les queries/mutations Convex
- Pattern : verifier l'identite dans chaque mutation

**Exercice pratique** : Ajouter Clerk a l'app Next.js, proteger les routes, synchroniser les users avec Convex.

---

### MODULE 8 — Paiements avec Stripe

**Objectif** : L'eleve sait implementer des paiements, abonnements, et un customer portal avec Stripe.

**Lecons a générer :**

8.1 **Stripe — La référence du paiement en ligne**
- Setup : cles API, dashboard, mode test
- Concepts : Products, Prices, Customers, Subscriptions, Checkout Sessions

8.2 **Checkout Sessions**
- One-time payments
- Subscriptions mensuelles/annuelles
- Redirect vers Stripe Checkout
- Gestion des success/cancel URLs

8.3 **Webhooks Stripe**
- Ecouter les evenements : `checkout.session.completed`, `invoice.paid`, `customer.subscription.updated/deleted`
- Verification de signature
- Mise a jour du statut dans Convex
- Gestion des erreurs et retries

8.4 **Customer Portal**
- Portal en self-service : gestion abonnement, facturation, méthodes de paiement
- Configuration dans le dashboard Stripe
- Integration dans l'app

8.5 **Pricing page complète**
- Composant pricing avec toggle mensuel/annuel
- Feature comparison table
- CTA connectes a Stripe Checkout
- Gestion du state "subscribed" vs "free"

8.6 **Integration complète : Clerk + Convex + Stripe**
- Flow complet : Sign up (Clerk) → Choose plan (Stripe) → Access features (Convex)
- Sync : Stripe webhooks → Convex mutations → UI update
- Gestion des edge cases : paiement echoue, downgrade, annulation

**Exercice pratique** : Implementer le flow de paiement complet : pricing page → checkout → webhook → acces premium.

---

### MODULE 9 — Architecture d'Agents IA

**Objectif** : L'eleve comprend comment concevoir et deployer des architectures multi-agents.

**Lecons a générer :**

9.1 **Qu'est-ce qu'un agent IA (vraiment)**
- Agent = modèle + outils + boucle de decision
- Différence entre prompt engineering et agent engineering
- Les patterns d'agents : single agent, pipeline, swarm, hierarchique (ORACLE pattern)

9.2 **Le pattern ORACLE — Orchestration multi-agents**
- Comment Agentik OS orchestre 265+ agents
- Classification des taches : SIMPLE → MEDIUM → COMPLEX → EPIC
- Routing intelligent : quel agent pour quelle tache
- Fresh context engineering : chaque agent recoit exactement le contexte dont il a besoin

9.3 **Construire un système multi-agents avec Claude Code**
- Agent spawning : `Agent(subagent_type, prompt, mode)`
- Agents en background : `run_in_background: true`
- Communication inter-agents : `SendMessage()`
- Isolation : worktrees pour le travail parallele
- Patterns : specialist agents, guardian agents, pipeline agents

9.4 **Claude Agent SDK**
- Pour construire des agents custom en dehors de Claude Code
- Architecture : model + tools + orchestration loop
- Integration avec MCP servers
- Deploiement en production

9.5 **Concevoir une architecture d'agents pour un client**
- Audit des besoins : quels processus automatiser
- Design : quels agents, quels outils, quel flow
- Implementation progressive : commencer petit, iterer
- Monitoring : observer les agents en production

**Exercice pratique** : Designer et implementer un système de 3-5 agents pour un use case reel (ex: pipeline de contenu, système de support, audit automatise).

---

### MODULE 10 — Production, Deploiement & DevOps

**Objectif** : L'eleve sait deployer et maintenir des systèmes en production.

**Lecons a générer :**

10.1 **Le VPS comme centre de commandes**
- Pourquoi un VPS (vs serverless seul) : cron jobs, agents persistants, monitoring
- Setup : Ubuntu, SSH, ZSH, securisation
- Structure de projets sur le serveur

10.2 **CI/CD avec GitHub Actions**
- Workflow basique : push → test → build → deploy
- Variables d'environnement et secrets
- Deploy conditionnel (main only)
- Notifications de deploy

10.3 **Monitoring & Observabilite**
- Health checks automatises
- Logging structure
- Alertes Telegram pour les erreurs critiques
- Dashboard de monitoring

10.4 **Sécurité en production**
- HTTPS, headers de sécurité
- Variables d'environnement (jamais de secrets dans le code)
- Rate limiting
- CORS, CSRF protection
- Audit de dependances

10.5 **Maintenance & Évolution**
- Updates de dependances
- Migrations de BDD
- Rollback strategy
- Documentation vivante (CLAUDE.md toujours a jour)

**Projet final** : Deployer le SaaS complet (Next.js + Convex + Clerk + Stripe + agents) en production avec monitoring.

---

## Projets Fil Rouge

Tout au long de la formation, l'eleve construit UN projet SaaS complet :

| Étape | Module | Livrable |
|-------|--------|----------|
| Setup | 1-2 | Projet Next.js + Claude Code + MCP configure |
| Backend | 5-6 | App Next.js + Convex avec schema complet |
| Auth | 7 | Inscription/connexion + user sync |
| Paiements | 8 | Pricing page + checkout + webhooks |
| Automatisation | 3-4 | Skills custom + cron jobs + pipelines |
| Agents | 9 | Système multi-agents integre |
| Production | 10 | SaaS deploye, monitore, prêt pour les clients |

---

## Bonus & Ressources

- Repo GitHub template avec le starter SaaS complet
- Acces a la communaute Telegram dev
- Code source de tous les exemples
- Checklist de lancement SaaS
- Updates a vie

## Upsell

> "Tu veux qu'on construise ton SaaS avec toi ? Agentik {OS} propose un service AI Build ($15K-45K) ou on développé ton produit de A a Z. agentik-os.com/pricing"

---

**FIN DU DOCUMENT — Formation 2 : Agentic Coding — Systems Builder**
