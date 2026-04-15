# Formation 6 — MCP & API Mastery : Connecte Tout a Tout

## Le Playbook de l'Ingenieur Integration

## Instructions pour l'Agent Createur de Formation

> **Objectif** : Générer la formation la plus complète sur comment connecter les outils et services d'IA entre eux. L'eleve maitrise MCP (Model Context Protocol), les REST APIs, GraphQL, les webhooks, OAuth, et les plateformes d'automatisation pour construire n'importe quelle integration. C'est la formation "plomberie" — celle qui fait que tout le reste fonctionne ensemble.
>
> **Ton** : Technique mais clair. Chaque concept est demontre avec du vrai code et de vraies integrations. L'eleve construit des connexions qui marchent, pas du savoir theorique.
>
> **Format** : Chaque module = screencast video + walkthrough de code + exercice pratique + template production-ready.
>
> **Duree estimee** : 25-35 heures de contenu. 5-7 semaines pour completer.
>
> **Prix** : $497 seul / inclus dans le bundle premium

---

## Identite de la Formation

| Champ | Valeur |
|-------|--------|
| Nom | **MCP & API Mastery — Le Playbook de l'Ingenieur Integration** |
| Sous-titre | Connecte l'IA a n'importe quel service, construis n'importe quelle integration, automatise n'importe quel workflow |
| Createur | Gareth Simono — Fondateur d'Agentik {OS} |
| Public cible | Developpeurs, praticiens CAIO, builders d'automatisation, entrepreneurs techniques |
| Pre-requis | Programmation de base (JS/TS de préférence), a l'aise avec le terminal et les concepts HTTP |
| Promesse | "En 7 semaines, tu peux connecter N'IMPORTE QUEL outil a N'IMPORTE QUEL autre outil — via MCP, API, webhook, ou plateforme d'automatisation — et construire des integrations production-grade qui tournent de maniere autonome" |
| Upsell | Service AI Build ($15K-45K) ou CAIO Partnership sur agentik-os.com |

---

## Structure Complète des Modules

### MODULE 1 — L'Etat d'Esprit Integration

**Objectif du module** : L'eleve comprend pourquoi les integrations sont la compétence #1 pour les builders IA et comment penser la connexion entre systèmes.

**Lecons a générer :**

1.1 **Pourquoi les integrations sont le vrai superpouvoir**
- Les modèles IA sont puissants en isolation. Les modèles IA connectes sont inarretables.
- Exemple : Claude seul = assistant intelligent. Claude + GitHub + Slack + Gmail + Notion = membre d'equipe autonome.
- Le secret du CAIO : 80% de la valeur vient de la connexion des outils, pas des outils eux-mêmes.
- L'economie de l'integration : chaque nouvel outil créé N nouvelles opportunites d'integration.

1.2 **Les 5 méthodes de connexion**

| Méthode | Quand l'utiliser | Complexite | Vitesse |
|---------|-----------------|------------|---------|
| **MCP** | Connexions AI-native (Claude Code) | Moyenne | Rapide |
| **REST API** | Standard service-a-service | Moyenne | Moyenne |
| **GraphQL** | Requetes de donnees complexes | Haute | Moyenne |
| **Webhooks** | Event-driven (temps reel) | Basse | Instantanee |
| **Plateformes d'automatisation** | No-code/low-code | Basse | Rapide |

1.3 **Comment evaluer une approche d'integration**
- Le service a un serveur MCP ? → Utilise MCP (le plus rapide pour l'IA)
- Pas de MCP mais une bonne REST API ? → Construis une integration directe
- Besoin d'evenements en temps reel ? → Webhooks
- Juste du prototypage ? → Zapier/Make/n8n
- Besoin de requetes complexes ? → GraphQL si disponible

1.4 **L'architecture d'integration**

L'architecture d'integration d'un système IA repose sur quatre couches complementaires. La **couche MCP** gere les connexions AI-native entre le modèle et les services externes. La **couche API** assure les appels directs aux services via REST ou GraphQL. La **couche Webhook** ecoute les evenements en temps reel emis par les services tiers. Enfin, la **couche Automatisation** orchestre les workflows complexes qui traversent les trois couches precedentes.

---

### MODULE 2 — MCP (Model Context Protocol) en Profondeur

**Objectif du module** : Maitriser MCP — le protocole standard pour connecter les modèles IA aux services externes.

**Lecons a générer :**

2.1 **Qu'est-ce que MCP et pourquoi ca change tout**
- MCP = Model Context Protocol = "USB pour l'IA"
- Standard ouvert, pas specifique a Anthropic
- Les 3 primitives : Tools (fonctions), Resources (donnees), Prompts (templates)
- Architecture : Modèle IA ←→ Serveur MCP ←→ Service Externe
- Pourquoi MCP > appels API bruts (standardisation, decouverte, composabilite)

2.2 **Types de serveurs MCP**

| Type | Protocole | Cas d'usage | Exemple |
|------|-----------|-------------|---------|
| `stdio` | JSON-RPC stdin/stdout | Processus locaux | Système de fichiers, base de donnees |
| `http` | HTTP POST | Serveurs distants | APIs cloud |
| `sse` | Server-Sent Events | Mises a jour en streaming | Donnees temps reel |

2.3 **Configurer les serveurs MCP**
- Configuration dans `.mcp.json` (niveau projet)
- Configuration dans `~/.mcp.json` (global)
- Configuration dans `settings.json` (parametres Claude Code)
- Champs : `type`, `command`, `args`, `env`
- Variables d'environnement et gestion des secrets
- Debug : logs, erreurs courantes, verification de connexion

2.4 **Le catalogue des serveurs MCP essentiels**

| Serveur | Ce qu'il fait | Installation |
|---------|--------------|-------------|
| **Composio** | 200+ integrations d'apps (Slack, Gmail, LinkedIn, etc.) | `composio-mcp` |
| **Playwright** | Automatisation navigateur, screenshots, tests | `@anthropic/mcp-playwright` |
| **PostgreSQL** | Requetes directes a la base de donnees | `mcp-server-postgresql` |
| **Filesystem** | Acces aux fichiers cross-projet | `@modelcontextprotocol/server-filesystem` |
| **GitHub** | Issues, PRs, code, repos | `@modelcontextprotocol/server-github` |
| **Chrome DevTools** | Debugging navigateur | `mcp-chrome-devtools` |
| **Context7** | Documentation a jour des librairies | `@context7/mcp` |
| **Memory/Search** | Memoire semantique persistante | `claude-mem` |
| **Linear** | Gestion de projet, tickets | `mcp-linear` |
| **Notion** | Gestion documentaire | Via Composio |
| **Slack** | Messagerie d'equipe | Via Composio |
| **Gmail** | Envoi/lecture d'emails | Via Composio |

2.5 **Tool search pour les gros serveurs MCP**
- Quand un serveur a 100+ outils (ex. Composio avec 200+ apps)
- Active `toolSearch: true` dans la config du serveur
- Outil `ToolSearch` : recherche et charge les schemas d'outils a la demande
- Reduit le cout en contexte et le temps de demarrage
- Convention de nommage : `mcp__<serveur>__<outil>` (ex. `mcp__github__search_repositories`)

2.6 **MCP dans les sous-agents**
- Chaque agent peut avoir ses propres serveurs MCP
- Configuration dans le frontmatter de l'agent : `mcpServers: [github, postgresql]`
- Isolation : l'agent ne voit que ses serveurs MCP declares
- Pattern : donne a chaque agent exactement les outils dont il a besoin, rien de plus

**Exercice pratique** : Configure 5 serveurs MCP, verifie toutes les connexions, et créé un workflow qui utilise 3 d'entre eux en sequence.

---

### MODULE 3 — Construire des Serveurs MCP Custom

**Objectif du module** : L'eleve peut construire des serveurs MCP pour n'importe quelle API ou service qui n'en a pas encore.

**Lecons a générer :**

3.1 **Quand construire le tien**
- Pas de serveur MCP existant pour le service dont tu as besoin
- Le serveur existant ne couvre pas ton cas d'usage
- Tu veux une integration plus fine ou de la logique custom
- Tu veux publier et partager avec la communaute

3.2 **Architecture d'un serveur MCP (TypeScript)**
```typescript
import { Server } from "@modelcontextprotocol/sdk/server";

const server = new Server({
 name: "my-custom-server",
 version: "1.0.0",
});

// Declarer les outils
server.setRequestHandler("tools/list", async () => ({
 tools: [{
 name: "my_tool",
 description: "Does something useful",
 inputSchema: {
 type: "object",
 properties: {
 query: { type: "string", description: "Search query" }
 },
 required: ["query"]
 }
 }]
}));

// Implementer les handlers
server.setRequestHandler("tools/call", async (request) => {
 if (request.params.name === "my_tool") {
 const result = await doSomething(request.params.arguments.query);
 return { content: [{ type: "text", text: JSON.stringify(result) }] };
 }
});

3.3 **Serveur MCP avec Python (FastMCP)**
- FastMCP : la facon la plus simple de construire des serveurs MCP en Python
- Declaration d'outils par decorateurs
- Génération automatique de schema a partir des type hints
- Quand utiliser Python vs TypeScript

3.4 **Resources et Prompts**
- Resources : expose des donnees que l'IA peut lire (fichiers, enregistrements de base de donnees, config)
- Prompts : templates reutilisables pour les interactions courantes
- Quand utiliser les resources vs les tools

3.5 **Tester et debugger les serveurs MCP**
- MCP Inspector : outil de test visuel
- Analyse des logs
- Bonnes pratiques de gestion d'erreurs
- Test avec Claude Code

3.6 **Publier ton serveur MCP**
- Packager en module npm ou package pip
- Standards de documentation
- Exemples de configuration
- Soumission a la communaute (registre MCP)

**Exercice pratique** : Construis un serveur MCP custom qui se connecte a une vraie API (meteo, crypto, actualites, ou n'importe quel service au choix de l'eleve). Publie-le.

---

### MODULE 4 — Maitriser les REST APIs

**Objectif du module** : L'eleve peut lire n'importe quelle documentation d'API et construire des integrations en quelques minutes.

**Lecons a générer :**

4.1 **Fondamentaux HTTP (rappel en 5 minutes)**
- Méthodes : GET (lire), POST (créer), PUT (mettre a jour), DELETE (supprimer), PATCH (mise a jour partielle)
- Codes de statut : 2xx (succès), 3xx (redirection), 4xx (erreur client), 5xx (erreur serveur)
- Headers : Content-Type, Authorization, Accept
- Formats du body : JSON (99% des cas), form-data (upload de fichiers)

4.2 **Lire une documentation d'API comme un pro**
- Specs OpenAPI/Swagger : comment les lire
- Section authentification en premier (comment entrer)
- Catalogue des endpoints (ce que tu peux faire)
- Exemples requete/réponse (a quoi ca ressemble)
- Rate limits (combien tu peux en faire)
- Exercice : lire 3 vraies docs d'API en 10 minutes chacune

4.3 **Méthodes d'authentification**

| Méthode | Comment ca marche | Quand c'est utilise |
|---------|------------------|---------------------|
| **API Key** | Cle statique dans le header/query | APIs simples (OpenAI, Anthropic) |
| **Bearer Token** | JWT ou token opaque dans le header Authorization | La plupart des APIs modernes |
| **OAuth 2.0** | Flux d'echange de tokens | Acces delegue par l'utilisateur (Google, GitHub) |
| **Basic Auth** | Base64 username:password | APIs legacy |
| **Signature HMAC** | Requetes signees | Webhooks (Stripe, GitHub) |

4.4 **OAuth 2.0 en profondeur**
- Flow Authorization Code (apps web)
- Flow Client Credentials (serveur-a-serveur)
- Refresh tokens (acces longue duree)
- Scopes (permissions granulaires)
- Implementation pratique avec de vraies APIs

4.5 **Construire des integrations API en TypeScript**
- fetch() vs axios vs ky
- Gestion d'erreurs et retries
- Rate limiting (respecter les limites, implementer le backoff)
- Pagination (cursor-based, offset-based)
- Parsing des réponses et type safety
- Stratégies de caching

4.6 **Patterns courants d'API**
- Operations CRUD (Create, Read, Update, Delete)
- Recherche et filtrage
- Operations en batch
- Upload/download de fichiers
- Operations longues (polling vs webhooks)

4.7 **Tester les APIs**
- Postman/Hoppscotch : tests interactifs
- cURL : tests en ligne de commande
- Tests automatises avec Vitest/Jest
- Mock servers pour le développement

**Exercice pratique** : Construis une integration complète avec 3 APIs differentes (GitHub + Stripe + un service au choix). Gere l'auth, la pagination, les erreurs et les rate limits.

---

### MODULE 5 — Webhooks & Architecture Event-Driven

**Objectif du module** : L'eleve maitrise les integrations event-driven avec les webhooks.

**Lecons a générer :**

5.1 **C'est quoi les webhooks (push vs pull)**
- Pull : tu demandes les mises a jour a l'API (polling)
- Push : l'API te DIT quand quelque chose se passe (webhooks)
- Pourquoi push > pull (temps reel, efficace, pas de requetes gaspillees)

5.2 **Architecture webhook**

Le flux webhook suit une chaine lineaire : le **service externe** envoie un HTTP POST vers **ton endpoint**, qui effectue le **traitement** de la payload, puis declenche la **reaction** appropriee (mise a jour de base de donnees, notification, declenchement d'un workflow en aval).

5.3 **Construire des recepteurs de webhooks**
- Routes API Next.js comme endpoints webhook
- Serveur webhook Express.js
- Fonctions serverless Vercel
- Validation des requetes et verification de signature

5.4 **Sécurité des webhooks**
- Verification de signature (HMAC-SHA256)
- Allowlisting d'IP
- Protection contre le replay (validation du timestamp)
- Idempotence (gerer les doublons de livraison)
- Exemple de verification webhook Stripe
- Exemple de verification webhook GitHub

5.5 **Patterns webhook courants**

| Service | Evenements | Cas d'usage |
|---------|-----------|-------------|
| **Stripe** | payment_intent.succeeded, customer.subscription.updated | Traitement des paiements |
| **GitHub** | push, pull_request, issues | CI/CD, notifications |
| **Clerk** | user.created, user.updated, user.deleted | Synchronisation utilisateurs |
| **Linear** | Issue.create, Issue.update | Automatisation de tickets |
| **Shopify** | orders/create, products/update | Automatisation e-commerce |

5.6 **Debugger les webhooks**
- ngrok : exposer localhost a internet pour les tests
- webhook.site : inspecter les payloads entrants
- Logique de retry : que se passe-t-il quand ton serveur est down
- Dead letter queues : ne perds pas les evenements echoues

5.7 **Workflows event-driven**
- Webhook → Queue → Worker → Action
- Utiliser Trigger.dev pour le traitement durable de webhooks
- Utiliser Inngest pour les step functions event-driven
- Chainer les evenements : webhook A declenche l'action B qui envoie le webhook C

**Exercice pratique** : Configure des recepteurs de webhooks pour Stripe et GitHub. Traite les evenements et declenche des actions en aval.

---

### MODULE 6 — Composio : Le Meta-Connecteur

**Objectif du module** : Maitriser Composio comme hub central pour toutes les integrations.

**Lecons a générer :**

6.1 **C'est quoi Composio et pourquoi c'est un game-changer**
- 200+ apps pre-integrees
- Un seul SDK, un seul flow d'auth, un seul serveur MCP
- Sans Composio : construire 4 integrations (40+ heures). Avec Composio : 30 minutes.

6.2 **Installation et configuration**
- Installer : `npm install -g composio-core`
- Ajouter a Claude Code : configuration du serveur MCP
- Connecter des apps : `composio add github`, `composio add slack`, etc.
- Lister les connexions : `composio connections list`

6.3 **Integrations disponibles (top 30)**
- Communication : Slack, Gmail, Discord, Telegram
- Social : LinkedIn, Twitter/X, Instagram, Reddit
- Gestion de projet : Linear, Notion, Asana, Jira
- Outils dev : GitHub, GitLab, Vercel
- CRM : HubSpot, Salesforce
- Calendrier : Google Calendar, Cal.com
- Stockage : Google Drive, Dropbox
- Et 170+ de plus...

6.4 **Construire des workflows avec Composio**
- Exemple : auto-posting sur les reseaux sociaux
- Exemple : reporting client (GitHub → Notion → Gmail)
- Exemple : capture de leads (formulaire → CRM → sequence email)
- Exemple : syndication de contenu (blog → LinkedIn → Twitter → Reddit)

6.5 **Composio + agents Claude Code**
- Chaque agent peut utiliser Composio via MCP
- Pattern : agents specialises avec des outils Composio specifiques
- Exemple : un "agent social media" avec acces a LinkedIn + Twitter + Instagram
- Exemple : un "agent support" avec acces a Linear + Slack + Gmail

**Exercice pratique** : Connecte 5 apps via Composio et construis 2 workflows automatises complets.

---

### MODULE 7 — Plateformes d'Automatisation : n8n, Trigger.dev, Make

**Objectif du module** : Maitriser les meilleures plateformes d'automatisation pour construire des workflows de production.

**Lecons a générer :**

7.1 **n8n — Automatisation open-source, self-hosted**
- Pourquoi n8n : gratuit, self-hosted, workflows illimites
- Editeur visuel de noeuds : construction de workflows en drag-and-drop
- 400+ integrations
- Noeuds code : ecris du JavaScript custom quand tu en as besoin
- Serveur MCP n8n : declenche des workflows depuis Claude Code
- Self-hosting sur VPS : installation et maintenance

7.2 **Trigger.dev — Background jobs natifs TypeScript**
- Pourquoi Trigger.dev : type-safe, execution durable, fait pour les developpeurs
- Definitions de taches, retries, queues
- Scheduling cron
- Jobs longue duree (génération d'images, traitement de donnees)
- Integration avec Next.js
- Quand l'utiliser : background jobs, taches planifiees, workflows multi-étapes complexes

7.3 **Make (Integromat) — Workflows visuels**
- 1500+ integrations d'apps
- Logique de branchement complexe
- Scenarios : builder visuel de workflows
- Quand l'utiliser : workflows conditionnels complexes, non-developpeurs

7.4 **Zapier — L'option simple**
- 6000+ integrations d'apps
- Zaps : trigger → action → action
- Quand l'utiliser : automatisations simples, prototypes rapides
- Limites : cout a l'echelle, complexite limitee

7.5 **Inngest — Step functions event-driven**
- Architecture event-driven
- Execution durable (survit aux echecs)
- Step functions avec retries automatiques
- Quand l'utiliser : workflows event-driven complexes

7.6 **La matrice de decision**

| Besoin | Meilleur outil |
|--------|---------------|
| Gratuit, illimite, self-hosted | n8n |
| TypeScript, jobs de production | Trigger.dev |
| Visuel, branchement complexe | Make |
| Simple, setup rapide | Zapier |
| Event-driven, durable | Inngest |
| AI-native, multi-outils | Composio |

**Exercice pratique** : Construis le même workflow dans n8n ET Trigger.dev. Compare l'expérience.

---

### MODULE 8 — GraphQL (Quand tu en as Besoin)

**Objectif du module** : Comprendre quand et comment utiliser GraphQL pour les integrations.

**Lecons a générer :**

8.1 **GraphQL vs REST — Quand utiliser quoi**
- REST : CRUD standard, requetes simples, la plupart des APIs
- GraphQL : donnees imbriquees complexes, requetes flexibles, APIs specifiques (GitHub, Shopify, Hasura)

8.2 **Fondamentaux GraphQL**
- Queries (lecture), Mutations (ecriture), Subscriptions (temps reel)
- Schema et types
- Variables et fragments
- Introspection : decouvrir l'API depuis elle-même

8.3 **Integrations GraphQL pratiques**
- API GraphQL de GitHub (cas d'usage le plus courant)
- API Storefront de Shopify
- Hasura pour du GraphQL instantane sur PostgreSQL
- Outils : GraphQL Playground, Altair, Insomnia

---

### MODULE 9 — Patterns d'Integration Production

**Objectif du module** : Construire des integrations fiables, maintenables et production-grade.

**Lecons a générer :**

9.1 **Gestion d'erreurs a grande echelle**
- Retry avec backoff exponentiel
- Pattern circuit breaker
- Dead letter queues
- Degradation gracieuse
- Monitoring d'erreurs (Sentry, BetterStack)

9.2 **Rate limiting et throttling**
- Respecter les rate limits des APIs
- Implementer du throttling côté client
- Gestion des requetes par queue
- Caching pour reduire les appels API

9.3 **Bonnes pratiques de sécurité**
- Gestion des secrets (variables d'environnement, jamais dans le code)
- Rotation des tokens
- Principe du moindre privilege
- Signature des requetes
- Logs d'audit

9.4 **Monitoring et observabilite**
- Health checks pour toutes les integrations
- Suivi de la latence
- Monitoring du taux d'erreurs
- Alerting (Telegram, PagerDuty, Slack)
- Dashboard : sante des integrations en un coup d'oeil

9.5 **Documentation et maintenance**
- Documenter chaque integration (quoi, pourquoi, comment, qui maintient)
- Versionner ton code d'integration
- Planifier les deprecations d'API
- Audits de sante reguliers

---

### MODULE 10 — Projet : Construis une Plateforme d'Integration Complète

**Objectif du module** : L'eleve construit une plateforme d'integration production-grade.

**Exigences du projet :**

1. **5 serveurs MCP** configures et fonctionnels (dont 1 construit sur mesure)
2. **3 integrations REST API** avec auth, gestion d'erreurs et rate limiting corrects
3. **2 recepteurs de webhooks** avec verification de signature et traitement idempotent
4. **1 workflow Composio** connectant 3+ services
5. **1 workflow n8n ou Trigger.dev** pour l'automatisation en arriere-plan
6. **Dashboard de monitoring** affichant l'etat de sante de toutes les integrations
7. **Documentation** pour chaque integration
8. **Le tout deploye en production** avec alerting

---

## Resume de la Formation

| Module | Focus | Heures |
|--------|-------|--------|
| 1 | Etat d'Esprit Integration | 2h |
| 2 | MCP en Profondeur | 4h |
| 3 | Construire des Serveurs MCP Custom | 4h |
| 4 | Maitriser les REST APIs | 4h |
| 5 | Webhooks & Evenements | 3h |
| 6 | Hub Composio | 3h |
| 7 | Plateformes d'Automatisation | 4h |
| 8 | GraphQL | 2h |
| 9 | Patterns de Production | 3h |
| 10 | Projet Final | 4h |
| **TOTAL** | **10 modules** | **33h** |

---

## Bonus & Ressources

- Repository template de serveur MCP (starter pour construire des serveurs custom)
- Boilerplate d'integration API (TypeScript, avec auth, retry, rate limiting)
- Template de recepteur webhook (Next.js, avec verification de signature)
- Template de dashboard de sante des integrations (Next.js + Convex)
- Telegram communautaire pour les builders d'integration
- Acces a vie et mises a jour

## Upsell

> "Tu as besoin d'integrations complexes construites pour toi ? Agentik {OS} propose des services AI Build ($15K-45K) pour des plateformes d'integration sur mesure. agentik-os.com/pricing"

---

**FIN DU DOCUMENT — Formation 6 : MCP & API Mastery**
