---
title: "Claude Master Class"
summary: "De debutant absolu a expert systeme en 12 semaines. Ce module couvre l'ensemble de l'ecosysteme Claude : du CLI Claude Code pour le developpement assiste par IA, a l'API Claude pour l'integration programmatique, en passant par les agents autonomes et l'orchestration multi-agents."
track: agentic-tech
number: "T1-03"
duration: "50-68h"
audience: "Developpeurs IA, ingenieurs systemes, tech leads souhaitant exploiter Claude au maximum"
---

# Claude Master Class

De debutant absolu a expert systeme en 12 semaines. Ce module couvre l'ensemble de l'ecosysteme Claude : du CLI Claude Code pour le developpement assiste par IA, a l'API Claude pour l'integration programmatique, en passant par les agents autonomes et l'orchestration multi-agents.

---

## Objectif du module

A l'issue de ce module, vous maitriserez Claude Code en profondeur, saurez concevoir des workflows autonomes avec agents specialises, et serez capable d'orchestrer des systemes multi-agents en production.

---

## Lecon 1 — Installation, premiers pas et outils de base

### Ce que vous allez apprendre

Decouvrir Claude Code, comprendre les 10 outils fondamentaux, construire son premier projet complet de A a Z. Permissions et securite.

### Contenu detaille

**Les 10 outils fondamentaux de Claude Code :**

| Outil | Usage | Exemple |
|-------|-------|---------|
| **Read** | Lire des fichiers | Lire un composant React |
| **Write** | Creer des fichiers | Creer un nouveau composant |
| **Edit** | Modifier des fichiers | Corriger un bug precis |
| **Bash** | Executer des commandes | `npm run build`, `git status` |
| **Glob** | Rechercher des fichiers | Trouver tous les `*.tsx` |
| **Grep** | Rechercher dans le contenu | Trouver les usages d'une fonction |
| **Agent** | Spawner des sous-agents | Deleguer une recherche |
| **WebSearch** | Rechercher sur le web | Documentation a jour |
| **WebFetch** | Telecharger une page | Lire une doc en ligne |
| **TodoWrite** | Suivre les taches | Organiser le travail |

**Installation en 3 minutes :**

```bash
npm install -g @anthropic-ai/claude-code
claude login
cd mon-projet
claude
```

**Le cycle de travail Claude Code :**

1. Vous decrivez ce que vous voulez
2. Claude lit le code existant (Glob, Grep, Read)
3. Claude propose un plan
4. Claude implemente (Write, Edit, Bash)
5. Claude verifie (tests, build, visual check)
6. Vous validez ou demandez des ajustements

**Permissions et securite :**
- Mode `plan` : Claude propose, vous approuvez
- Mode `auto` : Claude execute sans demander (pour les experts)
- Mode `bypassPermissions` : tout est autorise (CI/CD)
- Toujours verifier les commandes Bash potentiellement destructrices

### Exercice pratique

Installez Claude Code. Creez un nouveau projet Next.js. Demandez a Claude de creer une landing page complete avec hero, features, pricing et footer. Temps cible : 15 minutes.

---

## Lecon 2 — Le systeme CLAUDE.md et l'ingenierie de contexte

### Ce que vous allez apprendre

Hierarchie des fichiers d'instructions, structure d'un CLAUDE.md efficace, rules files modulaires. Optimiser ce que Claude recoit a chaque session.

### Contenu detaille

**La hierarchie des fichiers d'instructions :**

```
~/.claude/CLAUDE.md              → Instructions globales (tous les projets)
~/.claude/rules/*.md             → Regles globales auto-chargees
./CLAUDE.md                      → Instructions projet (ce repo)
./.claude/rules/*.md             → Regles projet auto-chargees
./.claude/settings.json          → Config projet (permissions, MCP)
```

**Structure d'un CLAUDE.md efficace :**

1. **Overview** — Qu'est-ce que ce projet ? Stack technique ? Etat actuel ?
2. **Commands** — Comment lancer le dev, build, test
3. **Architecture** — Structure des dossiers, patterns utilises
4. **Rules** — Ce que Claude DOIT faire et NE DOIT PAS faire
5. **Conventions** — Nommage, style, patterns du projet

**L'erreur #1 :** Un CLAUDE.md de 500 lignes que Claude ne lit pas entierement. La regle : chaque instruction doit etre actionnable et necessaire. Si Claude n'en a pas besoin a chaque session, mettez-la dans un rule file conditionnel.

**Rules files modulaires :**

```markdown
<!-- ~/.claude/rules/no-pixels.md -->
# CSS Rule
Never use pixel units. Always use rem or Tailwind classes.
```

Ces fichiers sont charges automatiquement a chaque session. Utilisez-les pour les regles qui s'appliquent toujours.

### Exercice pratique

Creez un CLAUDE.md pour votre projet principal. Incluez : overview, commands, architecture, 5 regles critiques. Testez : Claude suit-il les regles quand vous lui demandez de coder ?

---

## Lecon 3 — Prompt engineering pour Claude Code et gestion du contexte

### Ce que vous allez apprendre

Patterns de prompt qui marchent (direct, contextuel, exploratoire, delegatif). Fenetre de contexte : comprendre, mesurer, optimiser. Compaction.

### Contenu detaille

**Les 4 types de prompts Claude Code :**

1. **Direct** : "Fix le bug dans UserCard.tsx ligne 42" — Pour les taches precises
2. **Contextuel** : "Ce composant crashe quand l'utilisateur n'a pas de photo de profil. Analyse et fixe." — Pour les bugs
3. **Exploratoire** : "Comment fonctionne le systeme d'authentification dans ce projet ?" — Pour comprendre
4. **Delegatif** : "Construis le systeme de notifications avec email + in-app + Telegram" — Pour les features complexes

**La fenetre de contexte :**

- Claude Code a une fenetre de ~200K tokens (Opus)
- Chaque fichier lu, chaque resultat de commande consomme des tokens
- Quand la fenetre approche de la limite, Claude "compacte" : resume les messages anciens

**Strategies d'optimisation :**
- Lire seulement les parties de fichier necessaires (`offset`, `limit`)
- Eviter les commandes qui produisent des sorties enormes
- Utiliser des agents pour isoler les recherches longues
- Structurer le travail en sessions focalisees (1 feature = 1 session)

### Exercice pratique

Experimentez les 4 types de prompts sur un meme projet. Notez les differences de qualite et de temps. Identifiez quel type fonctionne le mieux pour quelles situations.

---

## Lecon 4 — Creer des Skills : capacites reutilisables

### Ce que vous allez apprendre

Anatomie d'un SKILL.md, frontmatter complet, variables, multi-fichiers. Creer, tester et deployer des skills professionnelles.

### Contenu detaille

**Qu'est-ce qu'un Skill ?**

Un skill est un fichier Markdown qui donne a Claude Code une capacite specialisee, invocable par l'utilisateur via `/nom-du-skill`. C'est comme une "application" pour Claude Code.

**Structure d'un skill :**

```markdown
---
description: Brief description shown in skill list
user-invocable: true
---

# Mon Skill

Instructions detaillees que Claude suit quand ce skill est invoque.
```

**Frontmatter obligatoire :**
- `description` : 1 ligne, apparait dans la liste des skills
- `user-invocable` : `true` si l'utilisateur peut l'invoquer directement

**Exemple : skill de blog SEO**

Un skill qui :
1. Recherche les derniers articles concurrents
2. Genere un plan optimise SEO
3. Redige l'article complet
4. Optimise les meta tags
5. Cree les images avec un outil IA

**Bonnes pratiques :**
- 1 skill = 1 responsabilite claire
- Instructions structurees (etapes numerotees)
- Variables pour la personnalisation (`$URL`, `$KEYWORD`)
- Criteres de succes explicites ("DONE quand : article redige + meta tags + 3 images")

### Exercice pratique

Creez un skill qui automatise une tache repetitive de votre workflow. Testez-le 5 fois. Ameliorez-le a chaque iteration.

---

## Lecon 5 — Les Hooks : automatisation evenementielle

### Ce que vous allez apprendre

16+ types d'evenements, hooks command/prompt/agent/http, codes de sortie, matchers. Cas concrets : logging, notifications, validation automatique.

### Contenu detaille

**Qu'est-ce qu'un Hook ?**

Un hook est un script shell qui s'execute automatiquement quand un evenement specifique se produit dans Claude Code. C'est l'equivalent des git hooks pour l'IA.

**Evenements disponibles :**

| Evenement | Quand | Usage typique |
|-----------|-------|---------------|
| `PreToolUse` | Avant chaque outil | Validation, logging |
| `PostToolUse` | Apres chaque outil | Notifications, cleanup |
| `UserPromptSubmit` | Quand l'utilisateur envoie un message | Enrichissement de prompt |
| `SessionStart` | Debut de session | Chargement de contexte |
| `SessionEnd` | Fin de session | Sauvegarde de memoire |

**Configuration dans settings.json :**

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "command": "echo 'File written: $FILE_PATH' >> /tmp/claude-log.txt"
    }]
  }
}
```

**Cas concrets :**
- Logger chaque commande Bash executee
- Envoyer une notification Telegram quand un build echoue
- Valider automatiquement que les fichiers .env ne sont pas commites
- Charger le contexte du projet a chaque debut de session
- Sauvegarder un resume de session dans une base de donnees

### Exercice pratique

Configurez 3 hooks : (1) un logger qui enregistre chaque commande Bash, (2) une notification Telegram quand Claude ecrit un fichier, (3) un validateur qui refuse les fichiers contenant des secrets.

---

## Lecon 6 — Systeme d'agents et sous-agents specialises

### Ce que vous allez apprendre

Agents built-in (Explore, Plan), agents custom avec agent.md, invocation, agents en parallele, memoire d'agent persistante, communication inter-agents.

### Contenu detaille

**Types d'agents :**

1. **Agents built-in** : Explore (recherche codebase), Plan (architecture), general-purpose
2. **Agents custom** : Definis dans `~/.claude/agents/nom.md` avec des instructions specifiques
3. **Agents de departement** : Organises par fonction (dev, QA, marketing, securite)

**Creer un agent custom :**

```markdown
<!-- ~/.claude/agents/seo-auditor.md -->
---
description: "Audits SEO with 25-phase analysis"
tools: [Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch]
---

# SEO Auditor Agent

Instructions detaillees pour l'audit SEO...
```

**Agents en parallele :**

Quand 2+ taches sont independantes, lancez-les en parallele :

```
Agent({ description: "Research auth patterns", prompt: "..." })
Agent({ description: "Research DB schema", prompt: "..." })
// Les deux tournent en meme temps
```

**Communication inter-agents :**

Via SendMessage pour les agents du meme team, ou via le scratchpad (`~/.aisb/scratchpad/`) pour les agents de sessions differentes.

### Exercice pratique

Creez 3 agents custom pour votre projet : un chercheur, un implementeur, et un testeur. Testez-les individuellement, puis orchestrez-les ensemble.

---

## Lecon 7 — MCP dans Claude Code : connecter Claude au monde

### Ce que vous allez apprendre

Configurer des serveurs MCP, tool search pour les gros serveurs, construire un serveur custom, nommage des outils MCP.

### Contenu detaille

Ce module approfondit l'usage de MCP specifiquement dans le contexte de Claude Code :

- **Configuration projet vs globale** : quand mettre les MCP servers dans le projet vs dans les settings globaux
- **Tool search** : quand un serveur a 200+ outils (Composio), Claude utilise ToolSearch pour charger les schemas a la demande
- **Debugging** : comment diagnostiquer un serveur MCP qui ne repond pas
- **Performance** : serveurs MCP qui ralentissent le startup (stdio vs HTTP)
- **Securite** : ne jamais exposer des credentials dans les arguments MCP

### Exercice pratique

Integrez un nouveau service dans votre workflow Claude Code via MCP. Construisez un mini serveur MCP qui expose 3 outils utiles pour votre projet.

---

## Lecon 8 — Architectures multi-agents et God Mode

### Ce que vous allez apprendre

Patterns pipeline, fan-out, hierarchique, swarm. Le pattern ORACLE d'Agentik OS. Teams natifs. Agents autonomes : Ralph, Sentinel, God Mode.

### Contenu detaille

**Les 4 patterns d'architecture multi-agents :**

| Pattern | Quand | Exemple |
|---------|-------|---------|
| **Pipeline** | Taches sequentielles | Recherche → Plan → Code → Test |
| **Fan-out** | Taches paralleles independantes | 5 fichiers a modifier en meme temps |
| **Hierarchique** | Coordination complexe | Oracle → Workers → Sub-agents |
| **Swarm** | Exploration large | 10 agents qui cherchent des bugs |

**Le pattern ORACLE (Agentik OS) :**

L'Oracle est un agent qui ne code JAMAIS — il decompose, dispatche, verifie :

```
Mission → Decomposition → Dispatch workers → Monitor → Verify → Report
```

Regles de l'Oracle :
- Ne jamais ecrire de code
- Toujours verifier le travail des workers
- Re-dispatcher si le resultat ne passe pas l'audit
- Reporter le resultat final

**God Mode :**

L'ultime pattern d'autonomie : Claude devient le "user" — il planifie, decide, execute, verifie, itere indefiniment jusqu'a la completion de la mission. Zero intervention humaine requise.

### Exercice pratique

Implementez le pattern hierarchique : creez un agent orchestrateur qui dispatche 3 taches a 3 workers differents, attend les resultats, et produit un rapport consolide.

---

## Lecon 9 — Automatisation avancee : crons, bots Telegram, self-healing

### Ce que vous allez apprendre

Pipelines de contenu automatises, publication sur les reseaux sociaux, bots Telegram, systemes auto-reparateurs, monitoring avec dashboard custom.

### Contenu detaille

**Automatisation avec cron + Claude Code :**

```bash
# Toutes les heures : verifier l'etat des deploiements
0 * * * * claude -p "Check all project deployments and alert on failures" >> /var/log/claude-monitor.log
```

**Bot Telegram comme interface IA :**

Architecture :
1. Bot Telegram (Python/Node) ecoute les messages
2. Messages enrichis avec le contexte projet
3. Claude Code execute la tache
4. Resultat renvoye sur Telegram

Cas d'usage : commander des deploys, lancer des audits, recevoir des rapports — tout depuis son telephone.

**Self-healing :**

Pattern : monitoring → detection d'anomalie → diagnostic automatique → fix → verification → notification

Exemple concret : si un deploy echoue, le systeme :
1. Detecte l'echec (webhook Vercel)
2. Analyse les logs d'erreur
3. Identifie la cause (build error, env var manquante)
4. Tente un fix automatique
5. Re-deploy
6. Notifie le resultat

### Exercice pratique

Configurez un bot Telegram minimal qui accepte des commandes et les transmet a Claude Code. Testez avec : "build status", "deploy latest", "check errors".

---

## Lecon 10 — CI/CD, securite et deploiement en production

### Ce que vous allez apprendre

Claude Code dans GitHub Actions, pipeline de deploy complet, gestion des secrets, securite des agents, backup et recovery.

### Contenu detaille

**Claude Code dans GitHub Actions :**

```yaml
- name: Claude Code Review
  uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    prompt: "Review this PR for security issues and code quality"
```

**Pipeline de deploy complet :**

1. Push → GitHub Actions
2. Claude Code review (securite + qualite)
3. Tests automatises (Playwright)
4. Build verification
5. Deploy staging
6. Smoke tests
7. Deploy production
8. Post-deploy verification

**Securite des agents :**
- Ne jamais stocker de secrets dans les fichiers de config
- Utiliser des variables d'environnement
- Scanner les commits pour les secrets (gitleaks)
- Limiter les permissions des agents au minimum necessaire
- Auditer regulierement les acces

### Exercice pratique

Configurez un pipeline GitHub Actions complet pour votre projet avec : lint, build, test, deploy staging, deploy prod. Ajoutez une etape Claude Code pour le code review automatique.

---

## Ce que cette formation apporte

- Expertise approfondie de Claude Code CLI et de l'API Claude
- Design de workflows autonomes avec agents specialises
- Competences en architecture multi-agents et orchestration
- Maitrise du systeme de hooks, commandes et skills

---

## Ressources complementaires

- Module suivant : Prompt & Context Engineering
- Documentation Claude Code officielle
- Repository d'exemples de skills et agents
- Communaute Kommu pour partager vos creations
