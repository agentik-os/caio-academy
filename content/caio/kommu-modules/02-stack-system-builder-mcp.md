---
title: "Stack System Builder (MCP & API Mastery)"
summary: "Le Model Context Protocol est le standard emergent qui connecte les modeles d'IA a vos outils existants. Ce module technique couvre MCP, les REST APIs, les webhooks, OAuth, et les plateformes d'automatisation pour construire n'importe quelle integration production-grade."
track: agentic-tech
number: "T1-02"
duration: "10-14h"
audience: "Developpeurs, architectes techniques, CTOs voulant construire une infrastructure IA integree"
---

# Stack System Builder (MCP & API Mastery)

Le Model Context Protocol est le standard emergent qui connecte les modeles d'IA a vos outils existants. Ce module technique couvre MCP, les REST APIs, les webhooks, OAuth, et les plateformes d'automatisation pour construire n'importe quelle integration production-grade.

---

## Objectif du module

A l'issue de ce module, vous saurez construire des serveurs MCP custom, integrer n'importe quel outil dans un workflow IA, et deployer des integrations production-grade avec retry, monitoring et documentation.

---

## Lecon 1 — Les 5 methodes de connexion IA : MCP, REST, GraphQL, Webhooks, Plateformes

### Ce que vous allez apprendre

Vue d'ensemble des approches d'integration avec matrice de decision : quand utiliser quoi selon le contexte technique et le niveau d'urgence.

### Contenu detaille

**Matrice de decision des 5 methodes :**

| Methode | Complexite | Temps de setup | Cas d'usage ideal | Limite |
|---------|-----------|----------------|-------------------|--------|
| **MCP** | Moyenne | 30min-2h | Connexion IA &harr; service | Standard emergent |
| **REST API** | Faible-Moyenne | 1-4h | CRUD, integrations classiques | Synchrone, pas temps reel |
| **GraphQL** | Moyenne-Haute | 2-8h | Requetes complexes, frontend | Overhead de schema |
| **Webhooks** | Faible | 30min-1h | Notifications, evenements | Unidirectionnel |
| **Plateformes** | Tres faible | 10-30min | Prototypage rapide | Cout, dependance |

**Quand utiliser quoi :**
- MCP : quand vous connectez un LLM a un service (c'est le standard)
- REST : quand vous construisez une API classique ou consommez une API tierce
- GraphQL : quand le frontend a besoin de flexibilite sur les donnees
- Webhooks : quand un service doit vous notifier (Stripe, GitHub, Clerk)
- Plateformes (n8n, Make) : quand vous prototypez avant de coder

### Exercice pratique

Pour 3 integrations que vous voulez construire, identifiez la methode optimale en utilisant la matrice de decision. Justifiez votre choix.

---

## Lecon 2 — MCP en profondeur : serveurs stdio, HTTP et SSE

### Ce que vous allez apprendre

Architecture du Model Context Protocol. Les 3 primitives (Tools, Resources, Prompts). Configuration dans .mcp.json, variables d'environnement, debugging.

### Contenu detaille

**Architecture MCP :**

```
Claude Code (Client MCP)
    |
    |--- stdio/HTTP/SSE ---
    |
Serveur MCP
    |
    |--- API/SDK/DB ---
    |
Service Externe (GitHub, Slack, DB...)
```

**Les 3 primitives MCP :**

1. **Tools** — Fonctions que le LLM peut appeler. Parametres types, descriptions pour le modele.
   - Exemple : `create_issue(title, body, labels)` pour GitHub
   - Le modele decide quand appeler quel outil en fonction du contexte

2. **Resources** — Donnees accessibles en lecture. URI standardisees.
   - Exemple : `github://repos/owner/repo/issues` pour lister les issues
   - Le modele peut les lire pour construire du contexte

3. **Prompts** — Templates de prompts reutilisables avec arguments.
   - Exemple : `code-review(diff, guidelines)` pour un review structure
   - Compose le prompt optimal pour une tache donnee

**Les 3 transports :**

| Transport | Usage | Quand |
|-----------|-------|-------|
| **stdio** | Process local | Serveur MCP sur la meme machine |
| **HTTP+SSE** | Reseau | Serveur MCP distant, multi-clients |
| **Streamable HTTP** | Reseau moderne | Nouveau standard, remplace SSE |

**Configuration dans Claude Code :**

```json
// ~/.claude/settings.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "ghp_..." }
    }
  }
}
```

**Debugging MCP :**
- `MCP Inspector` : outil visuel pour tester les serveurs
- Logs dans Claude Code : observer les appels d'outils
- Test manuel : appeler les endpoints directement

### Exercice pratique

Configurez 3 serveurs MCP dans votre Claude Code : GitHub, Playwright et un filesystem server. Verifiez que chaque outil fonctionne.

---

## Lecon 3 — Le catalogue des serveurs MCP essentiels

### Ce que vous allez apprendre

Configuration pratique de Composio (200+ apps), Playwright (browser), PostgreSQL, GitHub, Chrome DevTools, Context7, claude-mem et Linear.

### Contenu detaille

**Les serveurs MCP que tout CAIO doit maitriser :**

| Serveur | Nb d'outils | Usage principal |
|---------|-------------|-----------------|
| **Composio** | 2000+ | Meta-connecteur : Slack, Gmail, Calendar, Notion, etc. |
| **GitHub** | 30+ | Issues, PRs, code, repos |
| **Playwright** | 15+ | Automatisation browser, screenshots, tests |
| **PostgreSQL** | 10+ | Requetes SQL, schema, migrations |
| **Context7** | 3 | Documentation a jour de n'importe quelle librairie |
| **claude-mem** | 6 | Memoire persistante cross-sessions |
| **Linear** | 20+ | Gestion de projet, tickets, sprints |
| **Slack** | 30+ | Messages, channels, recherche |

**Configuration Composio (le meta-connecteur) :**

Composio connecte 200+ applications via une seule integration MCP. Au lieu de configurer 10 serveurs MCP separes, vous en configurez 1 :

```json
{
  "composio": {
    "command": "npx",
    "args": ["-y", "composio-core", "mcp"],
    "env": { "COMPOSIO_API_KEY": "..." }
  }
}
```

Ensuite, connectez les apps via l'interface Composio : OAuth pour Slack, Gmail, Calendar, etc.

**Playwright pour l'automatisation browser :**

Cas d'usage concrets :
- Screenshots de pages web pour l'audit
- Remplissage automatique de formulaires
- Scraping de donnees structurees
- Tests end-to-end automatises
- Capture de preuves (before/after)

### Exercice pratique

Configurez Composio et connectez au moins 3 applications (Gmail, Slack, Google Calendar). Testez chaque connexion avec une commande Claude Code.

---

## Lecon 4 — Construire un serveur MCP custom en TypeScript et Python

### Ce que vous allez apprendre

Architecture complete d'un serveur MCP : declaration d'outils, handlers, resources et prompts. Tester avec MCP Inspector, publier sur npm.

### Contenu detaille

**Structure d'un serveur MCP TypeScript :**

```
my-mcp-server/
  src/
    index.ts          # Point d'entree + declaration des outils
    tools/            # Handlers pour chaque outil
    resources/        # Handlers pour les resources
  package.json
  tsconfig.json
```

**Les etapes de creation :**

1. Initialiser le projet avec le SDK MCP
2. Declarer les outils avec schemas Zod/JSON Schema
3. Implementer les handlers
4. Tester avec MCP Inspector
5. Configurer dans Claude Code
6. (Optionnel) Publier sur npm

**Anatomie d'un outil MCP :**

Chaque outil a :
- Un **nom** unique (snake_case)
- Une **description** claire (le modele l'utilise pour decider quand appeler)
- Un **schema d'entree** (parametres types)
- Un **handler** (la fonction qui s'execute)
- Un **schema de sortie** (optionnel mais recommande)

**Bonnes pratiques :**
- Noms d'outils descriptifs : `get_user_by_email` pas `getUser`
- Descriptions qui expliquent QUAND utiliser : "Use this tool when the user asks about their account settings"
- Parametres optionnels avec valeurs par defaut
- Gestion d'erreurs avec messages clairs
- Logs pour le debugging

**Publier sur npm :**

```bash
npm login
npm publish --access public
```

Ensuite, n'importe qui peut l'utiliser : `npx -y @votre-org/mon-serveur-mcp`

### Exercice pratique

Construisez un serveur MCP qui se connecte a un service de votre choix (API meteo, base de donnees locale, service interne). Testez-le avec MCP Inspector puis configurez-le dans Claude Code.

---

## Lecon 5 — Maitriser les REST APIs : auth, pagination, rate limiting

### Ce que vous allez apprendre

Fondamentaux HTTP, methodes d'authentification (API Key, Bearer, OAuth 2.0, HMAC), construction d'integrations robustes avec gestion d'erreurs.

### Contenu detaille

**Les 4 methodes d'authentification API :**

| Methode | Securite | Complexite | Cas d'usage |
|---------|----------|-----------|-------------|
| **API Key** | Faible | Tres faible | APIs internes, services simples |
| **Bearer Token** | Moyenne | Faible | APIs modernes (Stripe, OpenAI) |
| **OAuth 2.0** | Haute | Haute | APIs user-scoped (Google, GitHub) |
| **HMAC** | Haute | Moyenne | Webhooks (signature verification) |

**Pagination — Les 3 patterns :**

1. **Offset** : `?page=2&limit=20` — Simple mais fragile (insertions/suppressions)
2. **Cursor** : `?cursor=abc123&limit=20` — Robust, performant
3. **Keyset** : `?after_id=123&limit=20` — Pour les grands datasets

**Rate limiting — Strategies de survie :**

- Lire les headers : `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- Implementer un retry avec backoff exponentiel
- Cacher les reponses quand possible
- Batching des requetes si l'API le supporte

**Construction d'une integration robuste :**

Checklist pour chaque integration API :
- Authentification configuree et tokens securises
- Retry avec backoff exponentiel (max 3 retries)
- Timeout configure (30s par defaut)
- Logging de chaque requete/reponse
- Gestion des erreurs 4xx et 5xx differenciee
- Rate limiting respecte

### Exercice pratique

Integrez l'API Stripe : listez les produits, creez un client, generez un lien de paiement. Implementez retry et gestion d'erreurs.

---

## Lecon 6 — Webhooks et architecture event-driven

### Ce que vous allez apprendre

Push vs pull, construction de recepteurs webhooks (Next.js, Vercel), verification de signature, idempotence. Patterns Stripe, GitHub, Clerk.

### Contenu detaille

**Push vs Pull :**
- **Pull** (polling) : vous demandez regulierement "quelque chose a change ?" — gaspillage de resources
- **Push** (webhook) : le service vous notifie quand quelque chose change — efficace, temps reel

**Construire un recepteur webhook en Next.js :**

Les 5 etapes obligatoires :
1. Creer la route API (`/api/webhooks/stripe`)
2. Lire le body brut (pas le JSON parse)
3. Verifier la signature avec le secret
4. Parser le payload
5. Traiter l'evenement de maniere idempotente

**Idempotence — Pourquoi c'est critique :**

Un webhook peut etre envoye plusieurs fois (retry). Votre handler doit produire le meme resultat, que l'evenement arrive 1 ou 5 fois.

Pattern : stocker l'ID de l'evenement, verifier s'il a deja ete traite, skip si oui.

**Patterns par service :**

| Service | Secret header | Algo de signature | Payload |
|---------|--------------|-------------------|---------|
| Stripe | `stripe-signature` | HMAC SHA256 | JSON |
| GitHub | `x-hub-signature-256` | HMAC SHA256 | JSON |
| Clerk | `svix-signature` | Svix (Ed25519) | JSON |

### Exercice pratique

Construisez un recepteur webhook Stripe qui gere les evenements `checkout.session.completed` et `customer.subscription.updated`. Deployez sur Vercel.

---

## Lecon 7 — Composio : le meta-connecteur pour 200+ apps

### Ce que vous allez apprendre

Installation, connexion d'apps, construction de workflows automatises. Exemples : auto-posting social, reporting client, capture de leads.

### Contenu detaille

**Pourquoi Composio :**

Au lieu de :
- Configurer un serveur MCP par service
- Gerer l'authentification OAuth pour chaque app
- Maintenir 10+ integrations separees

Avec Composio :
- 1 serveur MCP, 200+ apps
- OAuth gere automatiquement
- Actions pre-construites et testees

**Les categories d'apps Composio :**

| Categorie | Apps | Nb d'actions |
|-----------|------|-------------|
| Communication | Slack, Gmail, Discord, Telegram | 100+ |
| Productivite | Notion, Google Drive, Calendar | 80+ |
| Dev & Code | GitHub, Linear, Jira | 60+ |
| CRM & Sales | HubSpot, Salesforce | 40+ |
| Social | Twitter, LinkedIn, Instagram | 50+ |
| Finance | Stripe, QuickBooks | 30+ |

**Workflow concret : pipeline de contenu automatise**

1. **Trigger** : Nouveau contenu dans Google Docs
2. **Action 1** : Lire le contenu avec Composio
3. **Action 2** : Optimiser avec Claude (prompt SEO)
4. **Action 3** : Publier sur le blog (API custom)
5. **Action 4** : Poster sur LinkedIn (Composio)
6. **Action 5** : Poster sur Twitter (Composio)
7. **Action 6** : Envoyer une notification Slack (Composio)

### Exercice pratique

Construisez un workflow complet avec Composio : quand un email arrive dans Gmail avec le label "leads", extraire les informations et creer une entree dans Notion.

---

## Lecon 8 — Plateformes d'automatisation : n8n, Trigger.dev, Make, Inngest

### Ce que vous allez apprendre

Comparatif detaille des meilleures plateformes. Matrice de decision selon le besoin : self-hosted, TypeScript-natif, visuel, event-driven.

### Contenu detaille

**Comparatif des 4 plateformes :**

| Critere | n8n | Trigger.dev | Make | Inngest |
|---------|-----|-------------|------|---------|
| Type | Visuel | Code-first | Visuel | Code-first |
| Language | JS (nodes) | TypeScript | No-code | TypeScript |
| Self-hosted | Oui | Oui | Non | Non |
| Prix | Gratuit (SH) | Gratuit (SH) | Payant | Payant |
| Complexite | Moyenne | Haute | Faible | Moyenne |
| Cas d'usage | Workflows generaux | Jobs background IA | Automations simples | Event-driven |

**Quand utiliser quoi :**

- **n8n** : Vous voulez un editeur visuel self-hosted. Ideal pour les non-developpeurs techniques.
- **Trigger.dev** : Vous etes developpeur TypeScript et vous voulez des jobs background robustes pour l'IA (retry, queues, cron).
- **Make** : Prototypage rapide, equipes non-techniques, budget disponible.
- **Inngest** : Architecture event-driven, workflows complexes avec etapes conditionnelles.

### Exercice pratique

Choisissez une plateforme et construisez un workflow : "Chaque lundi a 9h, generer un rapport de performance et l'envoyer par email."

---

## Lecon 9 — Patterns d'integration production-grade

### Ce que vous allez apprendre

Retry avec backoff exponentiel, circuit breaker, dead letter queues, monitoring, documentation. Construire des integrations qui tiennent en prod.

### Contenu detaille

**Les 5 patterns essentiels :**

1. **Retry avec backoff exponentiel**
   - 1ere tentative : immediate
   - 2eme : attendre 1s
   - 3eme : attendre 2s
   - 4eme : attendre 4s
   - Max 5 tentatives, puis dead letter queue

2. **Circuit breaker**
   - Si &gt;5 erreurs consecutives : ouvrir le circuit (stop les appels)
   - Attendre 30s, puis tester avec 1 requete
   - Si succes : refermer le circuit
   - Si echec : rouvrir pour 60s

3. **Dead letter queue**
   - Messages qui echouent apres tous les retries
   - Stockes pour inspection manuelle
   - Alerting quand la queue depasse un seuil

4. **Health checks**
   - Endpoint `/health` pour chaque service
   - Verification toutes les 60s
   - Alerting (Telegram, Slack) si down

5. **Documentation API**
   - OpenAPI/Swagger pour chaque endpoint
   - Exemples de requetes et reponses
   - Changelog des versions

### Exercice pratique

Prenez une de vos integrations existantes. Ajoutez : retry avec backoff, circuit breaker, logging structure, et un health check. Deployez et monitorez pendant 24h.

**Templates fournis :**
- Pattern retry TypeScript (copier-coller)
- Circuit breaker implementation
- Health check endpoint template
- Monitoring dashboard (Grafana JSON)

---

## Ce que cette formation apporte

- Competences pratiques en construction de serveurs MCP
- Capacite a integrer n'importe quel outil dans un workflow IA
- Maitrise des patterns d'integration production (auth, retry, monitoring)
- Architecture de reference pour un stack IA d'entreprise

---

## Ressources complementaires

- Module suivant : Claude Master Class
- Documentation MCP officielle (Context7)
- Catalogue Composio des 200+ integrations
- Templates de serveurs MCP (GitHub)
