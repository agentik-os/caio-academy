# Formation — Claude Code Masterclass

## De Debutant Absolu a Expert Système en 12 Semaines

## Instructions pour l'Agent Createur de Formation

> **Objectif** : Générer LA formation de référence mondiale sur Claude Code. Quelqu'un qui n'a jamais touche Claude Code doit pouvoir devenir un expert absolu capable de construire ses propres systèmes autonomes, ses propres agents, ses propres automatisations, et ses propres dashboards de monitoring. Tout doit être couvert. Zero angle mort.
>
> **Ton** : Pedagogue et progressif. On commence a zero, on finit expert. Chaque concept est explique, demontre, puis mis en pratique. Le ton est direct, pratique, jamais condescendant. On respecte le debutant tout en poussant vers l'expertise.
>
> **Format** : 4 niveaux (Debutant → Fondamental → Intermediaire → Expert). Chaque module = video screencast + code source + exercice pratique + quiz de validation + projet concret. Les niveaux Expert incluent des projets complets de bout en bout.
>
> **Duree estimee** : 50-70 heures de contenu. 10-12 semaines pour completer.
>
> **Prix** : $697 seul / inclus dans un bundle premium
>
> **Mise a jour** : Formation vivante. Updates trimestriels pour couvrir les nouvelles features.

---

## Identite de la Formation

| Champ | Valeur |
|-------|--------|
| Nom | **Claude Code Masterclass — De Zero a Système Autonome** |
| Sous-titre | La formation la plus complète au monde sur Claude Code |
| Createur | Gareth Simono — Fondateur d'Agentik {OS} (265 agents, 190+ skills en production) |
| Public cible | Debutants complets, developpeurs, entrepreneurs tech, CAIOs, freelances |
| Pre-requis | Savoir utiliser un ordinateur. C'est tout. On commence vraiment a zero. |
| Promesse | "En 12 semaines, tu passes de 'c'est quoi Claude Code ?' a 'j'ai mon propre ecosysteme d'agents autonomes qui travaillent pour moi 24/7'" |
| Credibilite | Créé par le fondateur d'Agentik OS qui opere 265 agents en production, 190+ skills, et gere des clients avec un système 100% Claude Code |

---

## Architecture de la Formation — 4 Niveaux

> NIVEAU 1 — DEBUTANT (Semaines 1-2)
> "Je decouvre Claude Code et je fais mes premieres interactions"
> Modules 1-4
>
> NIVEAU 2 — FONDAMENTAL (Semaines 3-5)
> "Je maitrise les outils core et je configure mon environnement"
> Modules 5-10
>
> NIVEAU 3 — INTERMEDIAIRE (Semaines 6-8)
> "Je créé mes propres skills, hooks, agents et automatisations"
> Modules 11-17
>
> NIVEAU 4 — EXPERT (Semaines 9-12)
> "Je construis mes propres systèmes autonomes et je deploie en production"
> Modules 18-25
---

# ═══════════════════════════════════════════════
# NIVEAU 1 — DEBUTANT
# "Je decouvre Claude Code"
# Semaines 1-2 | 8-10 heures
# ═══════════════════════════════════════════════

### MODULE 1 — Qu'est-ce que Claude Code ?

**Objectif** : L'eleve comprend ce qu'est Claude Code, pourquoi c'est différent de ChatGPT/Cursor/Copilot, et ce que ca permet de faire.

**Lecons a générer :**

1.1 **L'IA avant Claude Code — Le problème**
- ChatGPT : conversation isolee, pas d'acces a tes fichiers, pas d'execution
- Copilot : autocompletion, pas d'autonomie, pas de vision système
- Cursor/Windsurf : IDE augmente, mais toujours controle par l'humain étape par étape
- Le problème fondamental : ces outils ASSISTENT. Claude Code AGIT.

1.2 **Claude Code — L'agent de développement**
- Definition : CLI officiel d'Anthropic pour le développement agentic
- Ce que "agentic" signifie : Claude prend des decisions, execute, verifie, corrige — en boucle
- Les 6 super-pouvoirs :
 1. Acces direct au filesystem (lire, ecrire, editer des fichiers)
 2. Execution de commandes shell (bash, git, npm, etc.)
 3. Recherche intelligente dans le code (grep, glob)
 4. Spawning d'agents specialises (sous-agents paralleles)
 5. Memoire persistante (se souvient entre les sessions)
 6. Extensibilite infinie (skills, hooks, MCP, agents custom)

1.3 **Demo WOW — Ce que Claude Code peut faire**
- Video : construire une landing page complète en 5 minutes
- Video : debugger un bug complexe en explorant le code de maniere autonome
- Video : deployer un site en production avec une seule phrase
- Video : lancer 5 agents en parallele pour tester un site entier
- L'eleve comprend le POTENTIEL avant d'apprendre les details

1.4 **Comparaison honnete avec les alternatives**

| Feature | ChatGPT | Copilot | Cursor | Claude Code |
|---------|---------|---------|--------|-------------|
| Acces fichiers | Non | Fichier actif | Projet | Filesystem complet |
| Execution shell | Non | Non | Limite | Complet |
| Agents autonomes | Non | Non | Non | Oui (paralleles) |
| Memoire persistante | Limite | Non | Limite | Oui (multi-session) |
| Skills reutilisables | Non | Non | Non | Oui (190+) |
| Hooks automatisation | Non | Non | Non | Oui (16+ events) |
| MCP (connecteurs) | Non | Non | Non | Oui (illimite) |
| Multi-model | Non | Non | Oui | Oui |
| Terminal natif | Non | Non | Non | Oui |
| Open source | Non | Non | Non | Oui (CLI) |

1.5 **Qui utilise Claude Code et pourquoi**
- Developpeurs solo qui veulent la productivite d'une equipe
- Startups qui veulent aller vite sans recruter
- CAIOs qui construisent des systèmes pour leurs clients
- Entreprises qui automatisent des workflows complexes
- Le cas Agentik OS : 1 personne, 265 agents, clients multiples

**Exercice** : L'eleve regarde les 4 demos et ecrit en 3 phrases ce qu'il aimerait construire avec Claude Code.

---

### MODULE 2 — Installation & Premier Lancement

**Objectif** : L'eleve a Claude Code installe et fonctionnel sur sa machine, et a eu sa premiere interaction reussie.

**Lecons a générer :**

2.1 **Pre-requis système**
- macOS, Linux ou Windows (via WSL2)
- Node.js 18+ (installation pas a pas pour chaque OS)
- Terminal : iTerm2 (Mac), Windows Terminal (Windows), tout terminal Linux
- Git (installation pas a pas)
- Un editeur de texte (VS Code recommande, optionnel)

2.2 **Installation de Claude Code**
```bash
npm install -g @anthropic-ai/claude-code
> - Verification : `claude --version`
> - Troubleshooting des erreurs courantes (permissions, Node version, proxy)
> - Mise a jour : `npm update -g @anthropic-ai/claude-code`
>
> 2.3 **Authentification**
> - `claude login` — connexion avec compte Claude.ai (le plus simple)
> - Alternative : API key (pour usage programmatique)
> - Créer un compte sur console.anthropic.com
> - Générer une API key
> - `export ANTHROPIC_API_KEY=sk-ant-...`
> - Alternative : AWS Bedrock, Google Vertex AI, Microsoft Foundry
> - Verification que l'auth fonctionne
>
> 2.4 **Premiere session**
> ```bash
> mkdir mon-premier-projet
> cd mon-premier-projet
> claude
- L'interface terminal : comprendre ce qu'on voit
- Envoyer son premier message : "Créé un fichier hello.js qui affiche Hello World"
- Observer Claude AGIR : lire le terminal, voir les outils utilises
- Les permissions : comprendre pourquoi Claude demande la permission et quand dire oui
- Quitter : `Ctrl+C` ou taper "exit"

2.5 **L'interface Claude Code — Tour complet**
- La zone de prompt (en bas)
- Les tool calls (au milieu) — lire les actions de Claude
- Les resultats (output)
- Le status bar (en haut) — modèle, cout, contexte
- Commandes speciales : `/help`, `/cost`, `/status`, `/compact`, `/clear`
- Raccourcis clavier essentiels :
 - `Ctrl+C` : interrompre Claude
 - `Escape` : annuler le menu actuel
 - `Tab` : autocompletion
 - `Ctrl+L` : nettoyer l'ecran
 - `Ctrl+Z` : annuler la derniere modification de fichier

**Exercice** : Installer Claude Code, lancer une session, demander a Claude de créer 3 fichiers différents, observer les permissions.

---

### MODULE 3 — Les Outils de Base (Core Tools)

**Objectif** : L'eleve comprend les 10 outils fondamentaux de Claude Code et sait quand chacun est utilise.

**Lecons a générer :**

3.1 **Read — Lire des fichiers**
- Claude peut lire n'importe quel fichier sur la machine
- Images (PNG, JPG), PDFs, Jupyter notebooks, code source
- Parametres : `file_path`, `offset`, `limit` (pour les gros fichiers), `pages` (pour les PDFs)
- Quand Claude l'utilise : explorer le code existant, comprendre le contexte
- Demo : "Lis le fichier package.json et dis-moi quelles dependances sont installees"

3.2 **Write — Créer des fichiers**
- Créé ou ecrase un fichier complet
- Demande la permission (sécurité)
- Quand Claude l'utilise : créer de nouveaux fichiers, reecritures completes
- Ne jamais utiliser pour des petites modifications (→ Edit)
- Demo : "Créé un composant React Button dans src/components/Button.tsx"

3.3 **Edit — Modifier des fichiers**
- Remplacement cible dans un fichier existant (old_string → new_string)
- Plus précis que Write (envoie seulement le diff, pas le fichier entier)
- `replace_all` pour remplacer toutes les occurrences
- Quand Claude l'utilise : corriger un bug, ajouter une ligne, renommer une variable
- Demo : "Change la couleur du bouton de bleu a rouge dans styles.css"

3.4 **Bash — Executer des commandes**
- Claude peut executer N'IMPORTE QUELLE commande shell
- npm, git, python, curl, docker, etc.
- Timeout configurable (defaut 120s, max 600s)
- `run_in_background` pour les commandes longues
- Quand Claude l'utilise : installer des packages, lancer des builds, tester, deployer
- Demo : "Installe les dependances et lance le serveur de dev"

3.5 **Glob — Trouver des fichiers**
- Recherche par pattern (comme `find` mais plus rapide)
- Patterns : `**/*.tsx`, `src/components/**/*.ts`, `*.config.*`
- Resultat trie par date de modification
- Quand Claude l'utilise : trouver tous les fichiers d'un type, decouvrir la structure
- Demo : "Trouve tous les fichiers TypeScript dans le projet"

3.6 **Grep — Chercher dans le contenu**
- Recherche par regex dans le contenu des fichiers (base sur ripgrep)
- Modes : `files_with_matches` (chemins), `content` (lignes), `count`
- Contexte : `-A`, `-B`, `-C` pour les lignes autour
- Quand Claude l'utilise : trouver ou une fonction est utilisee, chercher un pattern
- Demo : "Cherche toutes les utilisations de useEffect dans le projet"

3.7 **WebFetch — Recuperer du contenu web**
- Telecharger le contenu d'une URL
- Utile pour documentation, APIs, références
- Demo : "Va lire la documentation de shadcn/ui sur leur site"

3.8 **WebSearch — Recherche web**
- Recherche sur le web (comme Google)
- Pour trouver des solutions, de la documentation, des exemples
- Demo : "Cherche comment configurer Tailwind CSS v4 avec Next.js"

3.9 **NotebookEdit — Jupyter Notebooks**
- Modifier des cellules de notebook Jupyter (.ipynb)
- Ajouter, editer, supprimer des cellules
- Supporte code et markdown

3.10 **Agent — Deleguer a un sous-agent**
- Lancer un agent spécialisé pour une tache complexe
- Le sous-agent a son propre contexte et ses propres outils
- Peut tourner en parallele (`run_in_background`)
- Quand Claude l'utilise : taches multi-fichiers, recherches profondes, tests
- Demo : "Analyse tout le code du projet et fais-moi un rapport qualité"

**Quiz de validation** : 10 questions "Quel outil utiliserais-tu pour..." avec justification.

**Exercice** : L'eleve donne 10 instructions a Claude Code et identifie quel outil est utilise a chaque fois. Journal d'observation.

---

### MODULE 4 — Ton Premier Projet Complet

**Objectif** : L'eleve construit un projet complet de A a Z avec Claude Code, en utilisant tous les outils de base.

**Lecons a générer :**

4.1 **Choisir un projet adapte**
- Suggestions : portfolio personnel, to-do app, blog statique, landing page
- Criteres : assez simple pour un debutant, assez complet pour toucher tous les outils
- Le projet guide de ce module : **une landing page responsive avec formulaire de contact**

4.2 **Scaffolding avec Claude Code**
- "Créé un projet Next.js avec TypeScript et Tailwind CSS"
- Observer Claude : npm create, configuration, structure de fichiers
- Comprendre ce que Claude a fait et pourquoi

4.3 **Construire page par page**
- Page d'accueil : hero section, features, CTA
- Page contact : formulaire, validation
- Layout : navbar, footer
- A chaque étape : observer les outils, comprendre le flow

4.4 **Gerer les erreurs**
- Quand Claude fait une erreur (et il en fera)
- Comment corriger : être specifique, donner du contexte, montrer l'erreur
- "Le bouton ne s'affiche pas correctement, voici ce que je vois..."
- Quand interrompre (`Ctrl+C`) et rediriger

4.5 **Lancer, tester, deployer**
- `npm run dev` — voir le resultat en local
- Corriger les problèmes visuels
- Build de production : `npm run build`
- Deployer sur Vercel (ou autre)

**Projet a rendre** : Landing page deployee en ligne. L'eleve prend des screenshots avant/après ses corrections.

---

# ═══════════════════════════════════════════════
# NIVEAU 2 — FONDAMENTAL
# "Je maitrise les outils core"
# Semaines 3-5 | 12-15 heures
# ═══════════════════════════════════════════════

### MODULE 5 — Le Système CLAUDE.md — Ton Fichier le Plus Important

**Objectif** : L'eleve comprend et maitrise le système de configuration CLAUDE.md a tous les niveaux.

**Lecons a générer :**

5.1 **Qu'est-ce que CLAUDE.md et pourquoi c'est crucial**
- CLAUDE.md = les instructions permanentes pour Claude dans ton projet
- Sans CLAUDE.md : Claude ne connait pas ton projet, tes conventions, tes préférences
- Avec CLAUDE.md : Claude travaille EXACTEMENT comme tu veux, a chaque session
- Analogie : CLAUDE.md est le brief qu'on donne a un nouveau developpeur le jour 1

5.2 **La hierarchie des CLAUDE.md (priorite haute → basse)**
1. Instructions de session (CLI flags)
2. `.claude/CLAUDE.md` (projet)
3. `.claude/rules/*.md` (regles projet)
4. `CLAUDE.md` a la racine du projet
5. `~/.claude/CLAUDE.md` (global, tous les projets)
6. `~/.claude/rules/*.md` (regles globales)
- Comment la priorite fonctionne : le plus specifique gagne
- Quand utiliser chaque niveau

5.3 **Structure d'un CLAUDE.md efficace**
```markdown
# Nom du Projet

## Overview
Description du projet, objectif, public cible.

## Tech Stack
- Framework, langage, base de donnees
- Versions specifiques

## Project Structure
src/
 app/ # Pages et routes
 components/ # Composants reutilisables
 lib/ # Utilitaires et helpers

## Design Guidelines
- Couleurs, typographie, conventions visuelles
- Regles de style (dark mode, spacing, etc.)

## Key Commands
- `npm run dev` — Serveur de dev
- `npm run build` — Build production
- `npm test` — Tests

## Rules
- Pas d'emojis dans le code
- TypeScript strict
- Mobile-first
> 5.4 **Les rules files — Regles modulaires**
> - `~/.claude/rules/` (global) et `.claude/rules/` (projet)
> - Chaque fichier = une regle ou un ensemble de regles liees
> - Auto-chargees a chaque session
> - Convention de nommage : `00-critical.md`, `10-style.md`, `20-testing.md`
> - Exemples reels d'Agentik OS : self-check, concise responses, language rules, smart routing
>
> 5.5 **Context engineering — Optimiser ce que Claude recoit**
> - Le budget contexte : chaque token compte
> - Garder le CLAUDE.md < 50KB
> - Deplacer les details dans des rules files (charges a la demande)
> - Progressive disclosure : resume en haut, details en dessous
> - Ne PAS mettre dans CLAUDE.md : historique git, docs d'API, code source
> - METTRE dans CLAUDE.md : conventions, architecture, decisions, contraintes
>
> 5.6 **Iterer sur son CLAUDE.md**
> - Commencer minimal, ajouter au fur et a mesure
> - A chaque fois que Claude fait une erreur repetee → ajouter une regle
> - A chaque fois que Claude demande une info qu'il devrait savoir → l'ajouter
> - Review trimestriel : supprimer les regles obsoletes
>
> **Exercice** : L'eleve créé un CLAUDE.md complet pour son projet du Module 4, avec au moins 3 rules files.
>
> ---
>
> ### MODULE 6 — Prompt Engineering pour Claude Code
>
> **Objectif** : L'eleve sait formuler des prompts qui produisent exactement le resultat voulu, du premier coup.
>
> **Lecons a générer :**
>
> 6.1 **Les principes fondamentaux**
> - **Specificite > Generalite** : "Ajoute un bouton de connexion dans la navbar qui ouvre un modal Clerk" > "Ajoute l'auth"
> - **Contexte > Instruction** : referencier les fichiers, composants, patterns existants
> - **Objectif > Méthode** : dire QUOI pas COMMENT (sauf quand la méthode compte)
> - **Decomposer > Empiler** : une tache a la fois pour les sujets complexes
>
> 6.2 **Les patterns de prompt qui marchent**
>
> | Pattern | Exemple | Quand l'utiliser |
> |---------|---------|------------------|
> | **Direct** | "Corrige le bug dans auth.ts ligne 45" | Tache simple, localisee |
> | **Contextuel** | "En suivant le pattern de UserCard.tsx, créé TeamCard.tsx" | Coherence avec l'existant |
> | **Exploratoire** | "Explore le dossier src/lib/ et explique-moi l'architecture" | Decouverte, comprehension |
> | **Iteratif** | "Le bouton est trop large sur mobile. Ajuste a max-width 200px" | Corrections progressives |
> | **Architectural** | "On doit ajouter un système de notifications. Propose 3 approches." | Design, decisions |
> | **Delegatif** | "Lance un agent pour auditer la sécurité du projet" | Taches complexes/paralleles |
> | **Batch** | "Renomme toutes les fonctions camelCase en snake_case dans src/utils/" | Operations repetitives |
>
> 6.3 **Les anti-patterns a eviter**
> - "Fais-moi un site web" (trop vague)
> - Coller du code sans contexte (Claude peut lire les fichiers)
> - Demander 10 choses en un seul prompt (decomposer)
> - Repeter la même instruction si ca ne marche pas (changer d'approche)
> - "Tu peux..." (oui il peut, dis-lui de le FAIRE)
>
> 6.4 **Context engineering avance**
> - Donner les bons fichiers de référence : "Regarde src/components/Button.tsx pour le style"
> - Specifier les contraintes : "Utilise Tailwind uniquement, pas de CSS custom"
> - Donner des exemples : "Le format attendu est comme dans tests/example.test.ts"
> - Utiliser les @mentions (VS Code) pour referencier des fichiers
> - La technique du "before/after" : "Actuellement ca fait X, je veux que ca fasse Y"
>
> 6.5 **Prompts avances — Techniques d'expert**
> - **Chain of thought** : "Reflechis étape par étape avant d'implementer"
> - **Role playing** : "Tu es un expert sécurité. Audite ce code."
> - **Contrainte negative** : "Ne modifie PAS le fichier config.ts"
> - **Validation integree** : "Après le changement, lance les tests pour verifier"
> - **Multi-step** : "1. Lis le composant actuel. 2. Identifie les problèmes. 3. Propose des solutions. 4. Implemente la meilleure."
>
> 6.6 **Communiquer avec Claude — Les nuances**
> - Quand Claude fait une erreur : être précis sur ce qui ne va pas
> - Quand le resultat est partiel : "Continue" ou "Il manque la partie X"
> - Quand on veut changer d'approche : "Annule, on va plutot faire Y"
> - Quand on veut comprendre : "Explique pourquoi tu as choisi cette approche"
> - Le feedback positif : valider les bonnes approches aide Claude a calibrer
>
> **Exercice** : L'eleve ecrit 10 prompts pour 10 taches differentes, les execute, note le resultat (succès/echec), et ameliore les prompts qui ont echoue.
>
> ---
>
> ### MODULE 7 — Les Permissions et la Sécurité
>
> **Objectif** : L'eleve comprend le système de permissions, sait le configurer, et travaille en sécurité.
>
> **Lecons a générer :**
>
> 7.1 **Pourquoi les permissions existent**
> - Claude Code peut TOUT faire sur ta machine
> - Les permissions sont le garde-fou entre l'intention et l'execution
> - Philosophie : Claude demande, tu approuves (ou pas)
>
> 7.2 **Les modes de permission**
>
> | Mode | Comportement | Quand l'utiliser |
> |------|-------------|------------------|
> | `default` | Demande pour les actions sensibles | Usage normal |
> | `acceptEdits` | Accepte auto les edits de fichiers | Confiance sur les modifications |
> | `dontAsk` | Refuse auto les permissions | Mode lecture seule |
> | `bypassPermissions` | Accepte tout (sauf .git, .claude) | Agents autonomes (avec precaution) |
> | `plan` | Mode lecture seule, exploration | Design et analyse |
>
> 7.3 **Configurer les permissions finement**
> ```json
> {
> "permissions": {
> "allow": [
> "Bash(npm *)", // Toutes les commandes npm
> "Bash(git *)", // Toutes les commandes git
> "Write(src/**)", // Ecriture dans src/ seulement
> "WebFetch(domain:github.com)" // Fetch GitHub seulement
> ],
> "deny": [
> "Bash(rm -rf *)", // JAMAIS de suppression recursive
> "Write(.env*)" // JAMAIS ecrire les secrets
> ]
> }
> }
7.4 **Bonnes pratiques de sécurité**
- Ne jamais mettre de secrets dans CLAUDE.md
- Utiliser des variables d'environnement pour les tokens/cles
- Ne pas donner `bypassPermissions` sauf pour les agents de confiance
- Verifier les commandes Bash avant d'approuver (surtout `rm`, `git push`, `curl`)
- Utiliser `.claude/settings.local.json` pour les settings locaux (gitignored)

7.5 **Les permission rules avancees**
- Patterns de fichiers : `Write(src/**/*.ts)` — ecriture uniquement sur les .ts dans src
- Patterns de commandes : `Bash(pnpm *)` — seulement pnpm
- Patterns MCP : `mcp__github__*` — tous les outils GitHub MCP
- Patterns d'agents : `Agent(code-reviewer)` — seulement le code-reviewer

**Exercice** : L'eleve configure un ensemble de permissions pour son projet qui autorise le dev normal mais bloque les actions dangereuses.

---

### MODULE 8 — Git & Versionning avec Claude Code

**Objectif** : L'eleve sait utiliser Git efficacement avec Claude Code.

**Lecons a générer :**

8.1 **Claude Code et Git — Integration native**
- Claude detecte automatiquement les repos Git
- Il voit le status, les branches, l'historique
- Il peut committer, brancher, merge, pusher
- Le `gitStatus` est charge a chaque session

8.2 **Workflow Git recommande**
- Toujours travailler sur une branche feature
- Commits atomiques : une fonctionnalite par commit
- Messages de commit descriptifs (Claude les généré bien)
- PR avec description complète

8.3 **Commandes Git via Claude Code**
- "Fais un commit avec un message descriptif"
- "Créé une branche feature/login et switch dessus"
- "Montre-moi le diff depuis le dernier commit"
- "Créé une Pull Request sur GitHub"
- Les best practices : ne jamais force push sans demander, toujours nouveau commit vs amend

8.4 **Git Worktrees — Travail parallele isole**
- Qu'est-ce qu'un worktree : copie isolee du repo dans un dossier temporaire
- Pourquoi : travailler sur 2 features en parallele sans conflit
- Comment :
 - `claude --worktree feature-name` (CLI)
 - `claude --isolation worktree` (session isolee)
 - Dans un agent : `isolation: "worktree"`
- Cleanup automatique si pas de changements
- Use case : lancer un agent de test dans un worktree pendant que tu dev dans le main

8.5 **Multi-compte Git**
- Configurer différents comptes Git par projet
- Utiliser des SSH keys differentes
- Le pattern : `.gitconfig` avec `includeIf`
- Exemple Agentik OS : 4 comptes Git différents selon le projet

**Exercice** : L'eleve créé une branche, fait 3 commits avec Claude Code, et créé une PR sur GitHub.

---

### MODULE 9 — Selection de Modèle & Gestion des Couts

**Objectif** : L'eleve sait quel modèle utiliser quand, et comment optimiser ses couts.

**Lecons a générer :**

9.1 **Les modèles disponibles dans Claude Code**

| Modèle | ID | Contexte | Force | Vitesse | Cout |
|--------|----|----------|-------|---------|------|
| **Opus 4.6** | `claude-opus-4-6` | 200K (1M dispo) | Raisonnement profond, code complexe, analyse | Plus lent | $$$ |
| **Sonnet 4.6** | `claude-sonnet-4-6` | 200K | Equilibre qualité/vitesse | Moyen | $$ |
| **Haiku 4.5** | `claude-haiku-4-5` | 200K | Taches simples, rapide | Rapide | $ |

9.2 **Quand utiliser quel modèle**
- **Opus** : code complexe, debugging difficile, architecture, decisions, agents critiques
- **Sonnet** : développement quotidien, features, refactoring
- **Haiku** : exploration de code, recherches simples, agents de lecture
- Regle d'or : commencer par Sonnet, escalader vers Opus quand la tache est complexe

9.3 **Changer de modèle**
- En session : pas de commande directe, mais le mode Fast bascule en mode rapide
- CLI : `claude --model sonnet`
- Settings : `"model": "sonnet"` dans settings.json
- Par agent : `model: haiku` dans la definition de l'agent
- Par skill : `model: opus` dans le frontmatter de la skill

9.4 **Gerer les couts**
- `/cost` — voir le cout de la session actuelle
- Token tracker dans le status bar
- Stratégies d'optimisation :
 - Utiliser Haiku pour les agents d'exploration
 - Limiter le contexte (ne pas lire des fichiers inutiles)
 - `/compact` pour liberer du contexte au lieu de relancer
 - Decomposer les grosses taches en petites sessions

9.5 **Plans de facturation**
- Claude Pro ($20/mois) : 5x plus d'usage
- Claude Max ($100/mois) : 20x plus
- Claude Max ($200/mois) : unlimited
- API directe : pay-per-token (pour les usages programmatiques)
- Comment choisir : si tu utilises Claude Code tous les jours, Max est rentabilise

**Exercice** : L'eleve fait la même tache avec Opus, Sonnet et Haiku, compare qualité/vitesse/cout, et definit sa stratégie.

---

### MODULE 10 — La Fenetre de Contexte — Comprendre et Optimiser

**Objectif** : L'eleve comprend le concept de contexte, sait quand il sature, et comment l'optimiser.

**Lecons a générer :**

10.1 **Qu'est-ce que le contexte ?**
- Le contexte = la "memoire de travail" de Claude pendant UNE session
- Tout consomme du contexte : ton CLAUDE.md, tes messages, les resultats des outils, le code lu
- Limite : 200K tokens (environ 500 pages de texte)
- Quand le contexte est plein : Claude oublie le debut de la conversation

10.2 **Ce qui consomme du contexte (et combien)**
- CLAUDE.md + rules files : charges au demarrage (quelques milliers de tokens)
- Chaque message envoye et chaque réponse : cumule
- Chaque fichier lu (Read) : ajoute au contexte
- Chaque resultat de recherche (Grep/Glob) : ajoute
- Les descriptions de skills disponibles : charges si pertinentes
- Les descriptions d'outils MCP : charges au demarrage

10.3 **Signes que le contexte sature**
- Claude "oublie" des instructions du debut de la conversation
- Les réponses deviennent repetitives ou generiques
- Claude re-demande des infos qu'il avait déjà
- Message système : compaction automatique

10.4 **Stratégies d'optimisation**
- `/compact` : Claude resume la conversation, liberant du contexte
- `/clear` : recommencer a zero (le CLAUDE.md est recharge)
- Sessions courtes et focalisees > longues conversations generales
- Ne pas faire Read de fichiers inutiles ("lis-moi TOUS les fichiers du projet" = mauvaise idee)
- Utiliser des sous-agents (chacun a son propre contexte)
- Decomposer en sessions : "Session 1 : recherche. Session 2 : implementation."

10.5 **La compaction automatique**
- A ~95% de capacite, Claude compacte automatiquement
- Il resume les anciens messages pour garder les recents
- Les instructions CLAUDE.md et rules sont TOUJOURS preservees
- `/compact` manuel : forcer la compaction quand on sent que ca derive

10.6 **Extended Thinking / Ultra Think**
- Pour les taches qui necessitent un raisonnement profond
- Claude "pense plus longtemps" avant de répondre
- Utile pour : debugging complexe, architecture, decisions critiques
- Consomme plus de tokens mais donne de meilleurs resultats

**Exercice** : L'eleve observe sa consommation de contexte sur 3 sessions differentes, identifie les points de saturation, et applique les stratégies d'optimisation.

---

# ═══════════════════════════════════════════════
# NIVEAU 3 — INTERMEDIAIRE
# "Je créé mes propres outils"
# Semaines 6-8 | 15-18 heures
# ═══════════════════════════════════════════════

### MODULE 11 — Créer des Skills (Capacites Reutilisables)

**Objectif** : L'eleve sait créer, tester et deployer des skills Claude Code professionnelles.

**Lecons a générer :**

11.1 **Skills — Le concept**
- Une skill = une capacite documentee et reutilisable
- Analogie : un playbook qu'on donne a un employe pour une tache specifique
- Exemples : `/deploy`, `/audit`, `/blog-write`, `/test`, `/report`
- Skills vs Prompts : une skill est structuree, testable, partageable

11.2 **Anatomie d'une skill — Le fichier SKILL.md**
```yaml
---
name: deploy-production
description: Deploy the current project to Vercel production with verification
user-invocable: true
allowed-tools: Bash, Read, Glob
model: inherit
argument-hint: "[--skip-tests]"
---

# Deploy to Production

## Steps
1. Run `pnpm build` to verify the build
2. If build fails, show the error and stop
3. Run `vercel --prod --yes --token "$VERCEL_TOKEN"`
4. Wait for deployment URL
5. Verify the deployment is live with a fetch
6. Report success or failure
11.3 **Tous les champs du frontmatter**
| Champ | Type | Description |
|-------|------|-------------|
| `name` | string | Nom unique (lowercase, hyphens, max 64 chars) |
| `description` | string | Quand utiliser cette skill (Claude utilise ca pour auto-invoquer) |
| `disable-model-invocation` | bool | `true` = seulement invocable par l'utilisateur |
| `user-invocable` | bool | `false` = seulement invocable par Claude |
| `allowed-tools` | string | Outils autorises (comma-separated) |
| `model` | string | `sonnet`, `opus`, `haiku`, `inherit` |
| `effort` | string | `low`, `medium`, `high`, `max` |
| `context` | string | `fork` = sous-agent isole |
| `agent` | string | Type de sous-agent (`Explore`, `Plan`, etc.) |
| `argument-hint` | string | Affiche dans l'autocompletion |
| `hooks` | object | Hooks specifiques a cette skill |
11.4 **Variables disponibles dans les skills**
$ARGUMENTS # Tous les arguments en string
$ARGUMENTS[0] # Premier argument
$0, $1, $2 # Raccourcis
${CLAUDE_SESSION_ID} # ID de session
${CLAUDE_SKILL_DIR} # Dossier de la skill
11.5 **Ou placer les skills**
- `~/.claude/skills/nom-skill/SKILL.md` — global (tous les projets)
- `.claude/skills/nom-skill/SKILL.md` — projet specifique
- `~/.claude/commands/nom.md` — legacy (fonctionne toujours)
- `.claude/commands/nom.md` — legacy projet
- Les skills dans `skills/` sont le format recommande (plus de structure)
11.6 **Skills avancees — Techniques**
- **Multi-fichiers** : SKILL.md + support.md + templates/
- **Skill qui invoque d'autres skills** : orchestration
- **Skill conditionnelle** : "Si le projet utilise Next.js, fais X. Si Vue, fais Y."
- **Skill avec validation** : hooks dans le frontmatter pour valider le resultat
- **Skill partageable** : publier sur GitHub, installer avec `/follow`
11.7 **Tester et debugger ses skills**
- Invoquer : `/nom-skill` dans Claude Code
- Debugger : `Ctrl+O` pour le mode verbose
- Iterer : modifier le SKILL.md, re-invoquer
- Valider : la skill produit le resultat attendu a chaque fois ?
**Exercice** : L'eleve créé 5 skills pour son projet : deploy, test, lint, format, audit. Chacune avec frontmatter complet.
---
### MODULE 12 — Les Hooks — Automatisation Evenementielle
**Objectif** : L'eleve maitrise le système de hooks pour automatiser des actions a chaque evenement Claude Code.
**Lecons a générer :**
12.1 **Hooks — Le concept**
- Un hook = une action qui se declenche automatiquement quand un evenement se produit
- Analogie : les GitHub Actions de Claude Code
- Exemple : a chaque fois que Claude modifie un fichier → logger le changement
12.2 **Les 16+ types d'evenements**
| Evenement | Quand | Matcher | Peut bloquer ? |
|-----------|-------|---------|----------------|
| `SessionStart` | Debut de session | `startup`, `resume`, `clear`, `compact` | Oui |
| `InstructionsLoaded` | Chargement CLAUDE.md | type de chargement | Non |
| `UserPromptSubmit` | Avant que Claude traite le message | N/A | Oui |
| `PreToolUse` | Avant l'execution d'un outil | nom de l'outil | Oui |
| `PermissionRequest` | Dialogue de permission | nom de l'outil | Oui |
| `PostToolUse` | Après succès d'un outil | nom de l'outil | Oui |
| `PostToolUseFailure` | Après echec d'un outil | nom de l'outil | Non |
| `Notification` | Notification envoyee | type de notif | Non |
| `SubagentStart` | Debut de sous-agent | type d'agent | Non |
| `SubagentStop` | Fin de sous-agent | type d'agent | Non |
| `Stop` | Claude finit de répondre | N/A | Oui |
| `StopFailure` | Erreur API en fin de tour | type d'erreur | Non |
| `TaskCompleted` | Tache terminee | N/A | Oui |
| `ConfigChange` | Changement de config | type de config | Oui |
| `PreCompact` | Avant compaction | `manual`, `auto` | Non |
| `PostCompact` | Après compaction | `manual`, `auto` | Non |
| `SessionEnd` | Fin de session | type de fin | Non |
12.3 **Types de hooks**
**Command hook** (le plus courant) :
```json
{
"type": "command",
"command": "echo 'Fichier modifie: ${toolInput.file_path}' >> /tmp/changes.log",
"timeout": 600
}
**Prompt hook** (Claude evalue) :
```json
{
 "type": "prompt",
 "prompt": "Verifie que ce changement respecte les conventions du projet"
}
> **Agent hook** (sous-agent verifie) :
> ```json
> {
> "type": "agent",
> "prompt": "Verifie que les tests passent après ce changement",
> "timeout": 60
> }
**HTTP hook** (appel externe) :
```json
{
 "type": "http",
 "url": "http://localhost:8080/webhook",
 "headers": { "Authorization": "Bearer $TOKEN" }
}
12.4 **Les codes de sortie**
- `exit 0` : l'action continue. Le stdout est ajoute au contexte de Claude
- `exit 2` : l'action est BLOQUEE. Le stderr est retourne a Claude comme feedback
- Autre : l'action continue, le stderr est logue en verbose
12.5 **Matchers — Filtrer les evenements**
```json
"matcher": "Bash" // Exact match
"matcher": "Edit|Write" // Multiple (pipe)
"matcher": "mcp__github__.*" // Regex
"matcher": "" // Match ALL (vide)
12.6 **Configuration dans settings.json**
```json
{
 "hooks": {
 "SessionStart": [
 {
 "type": "command",
 "command": "echo ' Session demarree' | tee -a ~/.claude/sessions.log"
 }
 ],
 "PostToolUse": [
 {
 "matcher": "Write|Edit",
 "hooks": [{
 "type": "command",
 "command": "echo ' $(date): ${toolInput.file_path}' >> /tmp/claude-changes.log"
 }]
 }
 ],
 "SessionEnd": [
 {
 "type": "command",
 "command": "bash ~/.claude/lib/nerve-session-end-hook.sh"
 }
 ]
 }
}
12.7 **Use cases concrets**
- Logger chaque fichier modifie (audit trail)
- Envoyer une notification Telegram quand un deploy est fait
- Charger du contexte automatiquement au demarrage
- Bloquer les modifications sur certains fichiers critiques
- Sauvegarder un resume de session a la fin
- Valider le code avant chaque commit
- Enregistrer les metriques de session (duree, outils utilises, couts)
**Exercice** : L'eleve configure 4 hooks : SessionStart (log), PostToolUse sur Write (notification), PreToolUse sur Bash pour bloquer `rm -rf`, SessionEnd (resume).
---
### MODULE 13 — Le Système d'Agents (Sous-Agents)
**Objectif** : L'eleve sait créer et utiliser des agents specialises pour deleguer des taches complexes.
**Lecons a générer :**
13.1 **Sous-agents — Le concept**
- Un sous-agent = un Claude spécialisé avec son propre contexte et ses propres outils
- Chaque agent a des instructions specifiques, des outils restreints, un role clair
- Analogie : une equipe ou chaque membre a une specialite
13.2 **Les agents built-in**
| Agent | Modèle | Outils | Usage |
|-------|--------|--------|-------|
| `Explore` | Haiku | Lecture seule | Exploration rapide du codebase |
| `Plan` | Herite | Lecture seule | Planification, design |
| `général-purpose` | Herite | Tous | Taches complexes multi-étapes |
13.3 **Créer un agent custom**
Structure de fichiers :
.claude/agents/code-reviewer/
└── agent.md
> Fichier `agent.md` :
> ```yaml
> ---
> name: code-reviewer
> description: Reviews code for quality, security, and best practices
> tools: Read, Grep, Glob, Bash
> model: sonnet
> permissionMode: default
> maxTurns: 20
> memory: project
> ---
>
> # Code Reviewer Agent
>
> You are an expert code reviewer. When invoked:
> 1. Read the files that changed (use git diff)
> 2. Check for security vulnerabilities
> 3. Check for code quality issues
> 4. Check for performance problems
> 5. Generate a structured report
13.4 **Tous les champs du frontmatter agent**

| Champ | Description |
|-------|-------------|
| `name` | Identifiant unique |
| `description` | Quand deleguer a cet agent |
| `tools` | Outils autorises (allowlist) |
| `disallowedTools` | Outils interdits (denylist) |
| `model` | Modèle a utiliser |
| `permissionMode` | Mode de permissions |
| `maxTurns` | Nombre max de tours |
| `skills` | Skills a pre-charger |
| `mcpServers` | Serveurs MCP accessibles |
| `hooks` | Hooks specifiques |
| `memory` | Scope memoire (`user`, `project`, `local`) |
| `background` | `true` = toujours en background |
| `effort` | Niveau d'effort |
| `isolation` | `worktree` = isole dans un worktree Git |

13.5 **Invoquer un agent**
- Automatique : Claude decide selon la description
- Explicite : "Utilise l'agent code-reviewer pour verifier ce code"
- @mention : `@code-reviewer regarde les changements d'auth`
- CLI : `claude --agent code-reviewer`
- Settings : `"agent": "code-reviewer"`

13.6 **Agents en parallele**
- Lancer plusieurs agents simultanement
- Chacun travaille de maniere independante
- `run_in_background: true` — tu continues a travailler pendant
- Notification quand l'agent termine
- Use case : lancer un testeur, un reviewer et un security scanner en parallele

13.7 **Memoire d'agent persistante**
- `memory: user` → `~/.claude/agent-memory/nom-agent/`
- `memory: project` → `.claude/agent-memory/nom-agent/`
- `memory: local` → `.claude/agent-memory-local/nom-agent/`
- L'agent peut lire/ecrire dans son dossier memoire
- MEMORY.md : les 200 premieres lignes sont chargees dans le contexte
- Use case : un agent qui apprend les patterns du projet au fil du temps

13.8 **Communication inter-agents**
- `SendMessage(to: "agent-name")` — envoyer un message a un agent en cours
- L'agent repond dans son contexte
- Pattern : orchestrateur → specialistes → rapport

**Exercice** : L'eleve créé 3 agents custom : un reviewer (lecture seule), un fixer (edition), et un tester (bash). Il les fait travailler sur le même code.

---

### MODULE 14 — MCP (Model Context Protocol) — Connecter Claude au Monde

**Objectif** : L'eleve comprend MCP, sait configurer des serveurs, et peut connecter Claude a n'importe quel service.

**Lecons a générer :**

14.1 **MCP — Le standard universel**
- MCP = Model Context Protocol = "USB pour l'IA"
- Permet a Claude de se connecter a des services externes (APIs, BDD, outils)
- Standard ouvert, pas specifique a Anthropic
- 3 primitives : Tools (fonctions), Resources (donnees), Prompts (templates)

14.2 **Types de serveurs MCP**

| Type | Protocole | Use case |
|------|-----------|----------|
| `stdio` | JSON-RPC stdin/stdout | Processus locaux |
| `http` | HTTP POST | Serveurs distants |
| `sse` | Server-Sent Events | Mises a jour en streaming |

14.3 **Configurer un serveur MCP**

Dans `.mcp.json` (projet) ou `~/.mcp.json` (global) :
```json
{
 "mcpServers": {
 "github": {
 "type": "stdio",
 "command": "npx",
 "args": ["-y", "@modelcontextprotocol/server-github"],
 "env": { "GITHUB_TOKEN": "ghp_..." }
 }
 }
}
> Ou dans `settings.json` → `mcpServers`.
>
> 14.4 **Les serveurs MCP essentiels**
>
> | Serveur | Ce qu'il fait | Installation |
> |---------|---------------|-------------|
> | **Composio** | 200+ apps (Slack, Gmail, LinkedIn, etc.) | `composio-mcp` |
> | **Playwright** | Automatisation navigateur, screenshots | `@anthropic/mcp-playwright` |
> | **PostgreSQL** | Requetes BDD directes | `mcp-server-postgresql` |
> | **Filesystem** | Acces fichiers cross-projet | `@modelcontextprotocol/server-filesystem` |
> | **GitHub** | Issues, PRs, code | `@modelcontextprotocol/server-github` |
> | **Memory/Search** | Memoire persistante, recherche semantique | `claude-mem` |
> | **Chrome DevTools** | Debug navigateur | `mcp-chrome-devtools` |
> | **Context7** | Documentation a jour de librairies | `@context7/mcp` |
>
> 14.5 **Tool Search — Pour les gros serveurs MCP**
> - Quand un serveur MCP a 100+ outils (ex: Composio)
> - Au lieu de charger tous les schemas → lazy loading
> - Configuration : `"toolSearch": true` dans la config du serveur
> - `ToolSearch` tool : chercher et charger les outils a la demande
>
> 14.6 **Construire un MCP server custom**
> - SDK TypeScript : `@modelcontextprotocol/sdk`
> - Structure minimale :
> 1. Créer un Server
> 2. Declarer les tools (nom, description, inputSchema)
> 3. Implementer les handlers (tools/list, tools/call)
> - Publier sur npm pour le partager
> - Use case : connecter une API interne a Claude Code
>
> 14.7 **Nommage des outils MCP**
mcp__<serveur>__<outil>
mcp__github__search_repositories
mcp__composio__SLACK_SEND_MESSAGE
> - Claude peut appeler ces outils directement dans la conversation
> - Permissions configurables : `"allow": ["mcp__github__*"]`
>
> **Exercice** : L'eleve configure 3 serveurs MCP (Playwright + un service de son choix + un custom basique) et fait un workflow qui les utilise tous.
>
> ---
>
> ### MODULE 15 — La Memoire Persistante
>
> **Objectif** : L'eleve comprend et utilise le système de memoire pour que Claude se souvienne entre les sessions.
>
> **Lecons a générer :**
>
> 15.1 **Les types de memoire dans Claude Code**
> - **CLAUDE.md** : memoire explicite, manuelle, versionnee
> - **Auto-memory** : memoire automatique, semantique, locale
> - **Agent memory** : memoire par agent, persistante
> - **Rules files** : regles permanentes
> - Chaque type a son usage
>
> 15.2 **Auto-memory — Comment ca marche**
> - Claude enregistre automatiquement les interactions importantes
> - Stockage : SQLite + Chroma (vector DB) en local
> - Recherche semantique : retrouver des infos par sens, pas par mot-cle
> - Commande `/memory` pour voir et editer
> - Desactiver : `claude --disable-auto-memory`
>
> 15.3 **Memoire d'agent persistante (detaille)**
> - Chaque agent peut avoir son propre dossier memoire
> - 3 scopes :
> - `user` : `~/.claude/agent-memory/<agent>/` (global)
> - `project` : `.claude/agent-memory/<agent>/` (projet, versionne)
> - `local` : `.claude/agent-memory-local/<agent>/` (projet, gitignored)
> - `MEMORY.md` : index de la memoire, 200 premieres lignes chargees auto
> - L'agent peut créer d'autres fichiers (reports, logs, donnees)
>
> 15.4 **Plugin claude-mem — Memoire avancee**
> - Plugin SQLite + Chroma pour la recherche semantique
> - Hooks automatiques : SessionStart, PostToolUse, SessionEnd
> - Outils MCP : `search(query)`, `get_observations(ids)`, `timeline(id)`
> - Web UI : `http://localhost:37777`
> - Ideal pour les sessions longues sur des projets complexes
>
> 15.5 **Stratégies de memoire**
> - Ce qu'il faut memoriser : decisions d'architecture, préférences, patterns recurents
> - Ce qu'il ne faut PAS memoriser : code specifique (il change), historique Git (il existe déjà)
> - Pattern recommande : CLAUDE.md pour les guidelines + auto-memory pour l'historique + agent memory pour les specialists
>
> **Exercice** : L'eleve configure la memoire pour son projet, fait 3 sessions separees, et verifie que le contexte persiste correctement.
>
> ---
>
> ### MODULE 16 — Integrations IDE (VS Code & JetBrains)
>
> **Objectif** : L'eleve sait utiliser Claude Code dans son IDE préféré.
>
> **Lecons a générer :**
>
> 16.1 **Extension VS Code**
> - Installation depuis le Marketplace
> - Chat dans la sidebar : conversation avec Claude dans VS Code
> - @mentions : référencer des fichiers, fonctions, symboles
> - Actions de code : Claude dans le menu contextuel
> - Terminal integre : Claude Code directement dans le terminal VS Code
> - Raccourci : `Cmd+K Cmd+I` (Mac) / `Ctrl+K Ctrl+I` (Windows/Linux)
>
> 16.2 **Plugin JetBrains**
> - Installation depuis le Marketplace IDE
> - Support : IntelliJ, PyCharm, WebStorm, CLion, etc.
> - Chat sidebar, terminal integration
> - Mêmes fonctionnalites que VS Code
>
> 16.3 **Terminal pur vs IDE — Quand utiliser quoi**
> - Terminal : taches système, agents paralleles, automations, deploiements
> - IDE : modifications visuelles, exploration de code, debugging avec context visuel
> - Les deux : complementaires, pas exclusifs
> - Recommandation : maitriser le terminal d'abord, ajouter l'IDE ensuite
>
> ---
>
> ### MODULE 17 — Commandes Avancees & Raccourcis
>
> **Objectif** : L'eleve connait toutes les commandes et raccourcis pour être ultra-efficace.
>
> **Lecons a générer :**
>
> 17.1 **Commandes built-in completes**
>
> | Commande | Action |
> |----------|--------|
> | `/help` | Aide complète |
> | `/compact` | Compacter le contexte |
> | `/clear` | Nouvelle session |
> | `/memory` | Voir/editer la memoire |
> | `/cost` | Cout de la session |
> | `/context` | Usage du contexte |
> | `/debug` | Debug de session |
> | `/hooks` | Parcourir les hooks |
> | `/agents` | Gerer les agents |
> | `/permissions` | Configurer les permissions |
> | `/skills` | Lister les skills |
> | `/settings` | Voir les settings actifs |
> | `/status` | Statut de session |
> | `/statusline` | Configurer la barre de statut |
> | `/theme` | Changer le theme |
>
> 17.2 **Skills bundlees (built-in)**
> - `/batch <instruction>` — modifications paralleles dans le codebase
> - `/simplify [focus]` — review de code et corrections
> - `/loop [interval] <commande>` — repeter sur intervalle
> - `/debug [description]` — troubleshooting de session
> - `/claude-api` — charger la référence API Claude
>
> 17.3 **Raccourcis clavier complets**
>
> | Raccourci | Action |
> |-----------|--------|
> | `Ctrl+C` | Interrompre Claude |
> | `Escape` | Quitter le menu actuel |
> | `Ctrl+L` | Nettoyer l'ecran |
> | `Ctrl+R` | Recherche dans l'historique |
> | `Ctrl+O` | Toggle verbose (debug) |
> | `Ctrl+B` | Mettre en background |
> | `Ctrl+Z` | Annuler modif fichier |
> | `Tab` | Autocompletion |
>
> 17.4 **Keybindings custom**
> ```json
> // ~/.claude/keybindings.json
> {
> "keyBindings": [
> {
> "key": "ctrl+shift+d",
> "command": "dispatch",
> "context": "prompt",
> "args": { "skill": "deploy" }
> }
> ]
> }
17.5 **Flags CLI complets**
```bash
claude # Session interactive
claude "prompt" # One-shot
claude --model sonnet # Choisir le modèle
claude --agent code-reviewer # Utiliser un agent
claude --worktree feature # Isoler dans un worktree
claude --disable-auto-memory # Sans memoire auto
claude --debug # Mode debug complet
claude --api-key sk-ant-... # API key directe
claude --settings custom.json # Settings custom
echo "prompt" | claude --prompt - # Stdin
claude --version # Version
> **Exercice** : L'eleve configure 3 keybindings custom et utilise toutes les commandes built-in au moins une fois.
>
> ---
>
> # ═══════════════════════════════════════════════
> # NIVEAU 4 — EXPERT
> # "Je construis mes propres systèmes"
> # Semaines 9-12 | 18-25 heures
> # ═══════════════════════════════════════════════
>
> ### MODULE 18 — Architectures Multi-Agents
>
> **Objectif** : L'eleve sait concevoir des architectures multi-agents complexes comme Agentik OS.
>
> **Lecons a générer :**
>
> 18.1 **Les patterns d'architecture**
>
> | Pattern | Description | Use case |
> |---------|-------------|----------|
> | **Single agent** | Un Claude, toutes les taches | Petits projets |
> | **Pipeline** | Agent A → Agent B → Agent C | Workflows lineaires |
> | **Fan-out** | 1 orchestrateur → N specialistes paralleles | Bug hunting, audits |
> | **Hierarchique** | CEO → Managers → Specialistes | Systèmes complexes (Agentik OS) |
> | **Swarm** | Agents autonomes, communication peer-to-peer | Exploration exploratoire |
>
> 18.2 **Le pattern ORACLE (Agentik OS)**
> - ORACLE = l'orchestrateur central (toi ou Claude principal)
> - Classification : SIMPLE → MEDIUM → COMPLEX → EPIC
> - Routing : chaque tache va au bon agent
> - Fresh context : chaque agent recoit exactement le contexte dont il a besoin
> - Decisions log : tracer toutes les decisions de routing
>
> 18.3 **Concevoir un ecosysteme d'agents**
> - Identifier les roles : quels types de taches ?
> - Definir les specialistes : un agent = une responsabilite
> - Concevoir les flows : qui parle a qui, dans quel ordre
> - Definir les interfaces : quels inputs/outputs entre agents
> - Tester iterativement : commencer avec 3 agents, ajouter au fur et a mesure
>
> 18.4 **L'exemple Agentik OS — 265 agents**
> - 6 departements : Dev (54), QA (35), Security (28), Marketing (28), Créative (15), Strategy (32)
> - Hierarchie : CEO → CTO/CMO/CPO → Leads → Specialistes
> - Orchestration : ORACLE classifie et route
> - Cas d'usage : `/hunt` lance 15 agents en parallele pour trouver tous les bugs
> - Resultat : 1 personne opere un système qui fait le travail de 20+
>
> 18.5 **Teams natifs — Multi-agent cooperatif**
> - `claude --team researcher,coder,reviewer` — lancer une equipe
> - Chaque membre travaille en parallele
> - Communication via `SendMessage`
> - Guardian pattern : un agent verifie le travail des autres
> - `/team` skill pour l'orchestration
>
> **Exercice** : L'eleve conçoit et implemente une architecture de 5 agents pour un use case de son choix (ex: pipeline de contenu, système de QA, workflow de support client).
>
> ---
>
> ### MODULE 19 — Systèmes d'Automatisation Avances
>
> **Objectif** : L'eleve construit des pipelines d'automatisation complets qui tournent 24/7.
>
> **Lecons a générer :**
>
> 19.1 **Cron jobs — La base de l'automatisation VPS**
> - Syntaxe cron complète avec tous les patterns
> - `crontab -e`, `crontab -l`
> - Logging : rediriger stdout/stderr vers des fichiers
> - Monitoring des cron jobs : s'assurer qu'ils tournent
>
> 19.2 **Pipeline de contenu automatise (cas reel Agentik OS)**
> - `auto-publish.sh` : selectionner sujet → Claude généré l'article → générer l'image (Gemini Imagen) → créer le fichier blog → build Next.js → deploy Vercel → poster LinkedIn/Twitter/Reddit (Composio) → notification Telegram
> - Chaque étape detaillee avec code source
> - Gestion des erreurs : retry 3x, fallback, alertes
> - Resultat : publication quotidienne sans intervention humaine
>
> 19.3 **Poster sur les reseaux sociaux automatiquement**
> - `post-to-social.js` : LinkedIn, Reddit, Twitter via Composio + OAuth
> - `.social-posted.json` : tracker pour eviter les doublons
> - Formats specifiques par plateforme (LinkedIn long-form, Twitter thread, Reddit post)
> - Scheduling : publier a des heures optimales
>
> 19.4 **Bots Telegram avec Claude Code**
> - Créer un bot Telegram : BotFather, obtenir le token
> - Library `telegram.sh` : send_message, send_file, notify_all
> - Notifications : alerter sur les deploys, erreurs, resultats
> - Commandes : recevoir des ordres via Telegram, executer avec Claude Code
> - Le bot Nova d'Agentik OS : comment il fonctionne
>
> 19.5 **Self-healing — Systèmes auto-reparateurs**
> - Health checks automatiques (cron toutes les 5 minutes)
> - Detection d'anomalies (CPU, memoire, disque, processus)
> - Actions automatiques : restart service, clear cache, scale up
> - Alertes graduees : warning → critical → auto-fix → notification
> - Circuit breaker : arreter de retry si ca echoue 3 fois
>
> 19.6 **Monitoring avec dashboard custom**
> - Construire un dashboard Next.js + Convex
> - Metriques en temps reel : sante des services, dernier deploy, erreurs
> - Graphiques : uptime, performance, couts
> - Alertes visuelles et Telegram
> - Le pattern d'Agentik OS : AISB Nerve → Neo → Zion → Telegram
>
> **Exercice** : L'eleve construit un pipeline automatise complet : génération de contenu + publication + notification. Il tourne en cron sur sa machine.
>
> ---
>
> ### MODULE 20 — Construire un Dashboard de Monitoring
>
> **Objectif** : L'eleve construit son propre dashboard pour monitorer ses systèmes, ses agents, et ses automations.
>
> **Lecons a générer :**
>
> 20.1 **Architecture du dashboard**
> - Frontend : Next.js 16 + Tailwind + shadcn/ui
> - Backend : Convex (temps reel, reactive)
> - Auth : Clerk (proteger l'acces)
> - Data : cron jobs qui alimentent Convex en metriques
>
> 20.2 **Schema Convex pour le monitoring**
> ```typescript
> // Exemple de tables
> defineSchema({
> services: defineTable({
> name: v.string(),
> status: v.string(), // "healthy" | "warning" | "critical"
> lastCheck: v.number(),
> metrics: v.object({
> cpu: v.number(),
> memory: v.number(),
> uptime: v.number(),
> }),
> }),
> deployments: defineTable({
> project: v.string(),
> url: v.string(),
> timestamp: v.number(),
> status: v.string(),
> }),
> cronJobs: defineTable({
> name: v.string(),
> schedule: v.string(),
> lastRun: v.number(),
> lastStatus: v.string(),
> nextRun: v.number(),
> }),
> alerts: defineTable({
> type: v.string(),
> message: v.string(),
> severity: v.string(),
> timestamp: v.number(),
> resolved: v.boolean(),
> }),
> })
20.3 **Alimenter le dashboard**
- Cron jobs qui executent des health checks
- Resultats envoyes a Convex via mutations HTTP
- Temps reel : le dashboard se met a jour automatiquement (subscriptions Convex)
- Pattern : check → mutation → dashboard update → alert si besoin

20.4 **Interface du dashboard**
- Cards de status par service (vert/orange/rouge)
- Timeline des deployments
- Liste des cron jobs avec leur status
- Flux d'alertes en temps reel
- Graphiques de performance (optionnel)

20.5 **Alerting intelligent**
- Regles d'alerte configurables
- Severite : info → warning → critical
- Canaux : dashboard + Telegram + email
- Deduplication : pas de spam pour la même alerte
- Resolution automatique quand le service revient a la normale

**Exercice** : L'eleve construit un dashboard minimaliste avec 3 services monitores, deploye sur Vercel, avec alertes Telegram.

---

### MODULE 21 — Agents Autonomes (God Mode)

**Objectif** : L'eleve sait créer des agents qui travaillent de maniere complètement autonome pendant des heures.

**Lecons a générer :**

21.1 **Le concept d'agent autonome**
- Autonome = il decide, execute, verifie, corrige, itere — sans intervention
- Différence avec un agent normal : pas de feedback humain dans la boucle
- Risques : il faut des garde-fous (permissions, limites, monitoring)
- Use cases : tests exhaustifs, audits de code, génération de contenu, migrations

21.2 **Ralph — L'agent de dev autonome**
- Le pattern Ralph d'Agentik OS
- Lancement : `/ralph [tache]`
- Il tourne en background, ecrit du code, build, teste, fixe, itere
- Status : `.ralph/status.md`
- Continue : `/ralph --continue`
- Architecture : Agent natif avec `run_in_background: true` et `mode: bypassPermissions`

21.3 **Sentinel — L'agent de test persistant**
- Boucle de test continue : teste → detecte un bug → fixe → re-teste → repeat
- Checkpoints : sauvegarde l'etat après chaque action (survit aux limites de contexte)
- Multi-session : peut reprendre d'ou il s'est arrete (`--resume`)
- Notifications Telegram : progres et resultats
- Pas de limite de temps

21.4 **God Mode — Orchestration autonome complète**
- Claude DEVIENT le decideur : planifie, execute, verifie, itere indefiniment
- Heartbeat : monitoring de sante, kill switch si besoin
- Reporting Telegram : updates reguliers
- Quand l'utiliser : taches que tu veux lancer et oublier
- Quand NE PAS l'utiliser : taches sensibles, taches avec des consequences irreversibles

21.5 **Garde-fous pour les agents autonomes**
- maxTurns : limiter le nombre de tours
- Permissions restreintes : pas de force push, pas de delete en cascade
- Monitoring : hook SubagentStop pour être notifie
- Kill switch : pouvoir arreter a tout moment
- Logging : tracer toutes les actions pour review

**Exercice** : L'eleve créé un agent autonome qui fait un audit complet de son projet (sécurité, qualité, performance) et généré un rapport. L'agent tourne en background pendant qu'il fait autre chose.

---

### MODULE 22 — CI/CD & Deploiement Avance

**Objectif** : L'eleve sait integrer Claude Code dans des pipelines CI/CD et automatiser les deploiements.

**Lecons a générer :**

22.1 **Claude Code dans GitHub Actions**
```yaml
- uses: anthropic/claude-code@v1
 with:
 prompt: "Review cette PR et laisse un commentaire"
 repository: ${{ github.repository }}
- Use cases : review automatique de PR, fix de lint, génération de docs, release notes

22.2 **Pipeline de deploy complet**
- Push → Tests → Build → Deploy preview → Tests E2E → Deploy prod → Notification
- Vercel deploy : `vercel --prod --yes --token`
- Railway deploy pour les backends
- Rollback automatique si les tests echouent

22.3 **Multi-provider**
- AWS Bedrock : `claude --bedrock`
- Google Vertex AI : `claude --vertex-ai`
- Pour les entreprises avec des contraintes cloud specifiques

---

### MODULE 23 — Sécurité & Bonnes Pratiques en Production

**Objectif** : L'eleve deploie des systèmes securises et robustes.

**Lecons a générer :**

23.1 **Sécurité des secrets**
- JAMAIS de secrets dans CLAUDE.md ou le code
- Variables d'environnement : `.env.local` (gitignored)
- Tags `<private>` pour le contenu sensible (pas enregistre en memoire)
- Rotation des cles API
- Audit des dependances : `npm audit`

23.2 **Sécurité des agents**
- Principe du moindre privilege : chaque agent a le minimum d'outils necessaires
- Isolation : worktrees pour les agents qui modifient du code
- Review : hooks PostToolUse pour verifier les modifications
- Logs : tracer toutes les actions pour audit

23.3 **Sécurité du VPS**
- SSH key-only (pas de password)
- Firewall : iptables/ufw
- Fail2ban : bloquer les tentatives de brute force
- Updates regulieres
- User non-root pour tout

23.4 **Backup & Recovery**
- Git comme backup principal du code
- Backup BDD automatique (cron)
- Snapshots VPS
- Procédure de recovery documentee
- Test de recovery regulier

---

### MODULE 24 — Projet Final — Ton Ecosysteme Complet

**Objectif** : L'eleve construit et deploie son propre mini-ecosysteme a la maniere d'Agentik OS.

**Cahier des charges du projet final :**

1. **CLAUDE.md complet** : instructions projet detaillees avec rules files
2. **5 skills custom** : deploy, test, audit, report, publish
3. **4 hooks** : SessionStart, PostToolUse (logging), Stop (notification), SessionEnd (resume)
4. **3 agents custom** : reviewer (lecture), builder (edition), tester (execution)
5. **2 MCP servers** : Composio + 1 custom ou specifique
6. **1 pipeline automatise** : cron job qui fait une tache utile automatiquement
7. **1 dashboard de monitoring** : Next.js + Convex avec au moins 2 services monitores
8. **1 bot Telegram** : pour recevoir des notifications et envoyer des commandes
9. **Deploye en production** : Vercel pour le frontend, VPS pour les crons et agents

**Evaluation** :
- Le système tourne en autonomie pendant 24h sans intervention
- Les notifications arrivent sur Telegram
- Le dashboard montre des donnees a jour
- Les agents produisent des resultats utiles
- Le code est propre, documente, sécurisé

---

### MODULE 25 — Aller Plus Loin — L'Ecosysteme Claude

**Objectif** : L'eleve connait tout l'ecosysteme autour de Claude Code pour continuer a progresser.

**Lecons a générer :**

25.1 **Claude Agent SDK**
- Pour construire des agents HORS de Claude Code
- Python et TypeScript SDKs
- Architecture : model + tools + orchestration loop
- Deploiement : serveurs, serverless, edge
- Quand l'utiliser : quand tu veux un agent integre dans ton propre produit

25.2 **Claude API**
- `@anthropic-ai/sdk` (TypeScript) / `anthropic` (Python)
- Messages API, tool use, streaming, structured outputs
- Vision (images), PDF parsing
- Batch API pour le traitement en masse
- Prompt caching pour optimiser les couts

25.3 **L'ecosysteme de skills partageables**
- Comment partager ses skills sur GitHub
- `/follow URL` pour installer les skills d'un autre
- Contribuer a la communaute
- Les repositories de skills populaires

25.4 **Veille et updates**
- Suivre les releases de Claude Code (changelog)
- La communaute : forums, Discord, GitHub Issues
- Les nouveautes a surveiller : cloud IDE, mobile, collaboration temps-reel
- Comment adapter son ecosysteme aux nouvelles features

25.5 **Devenir formateur / mentor**
- Partager ses skills et agents
- Créer du contenu sur Claude Code
- Mentorer d'autres utilisateurs
- Contribuer a l'open source

---

## Recapitulatif de la Formation

| Niveau | Semaines | Modules | Heures | Compétences acquises |
|--------|----------|---------|--------|---------------------|
| Debutant | 1-2 | 1-4 | 8-10h | Installation, premiers projets, outils de base |
| Fondamental | 3-5 | 5-10 | 12-15h | CLAUDE.md, prompt engineering, permissions, git, modèles, contexte |
| Intermediaire | 6-8 | 11-17 | 15-18h | Skills, hooks, agents, MCP, memoire, IDE, commandes |
| Expert | 9-12 | 18-25 | 18-25h | Multi-agents, automatisation, monitoring, agents autonomes, CI/CD, sécurité, projet complet |
| **TOTAL** | **12** | **25** | **53-68h** | **Expert Claude Code autonome** |

---

## Bonus & Ressources

- **Repo GitHub template** : starter project avec CLAUDE.md, skills, hooks, agents pre-configures
- **Cheat sheet PDF** : toutes les commandes, raccourcis, patterns en 2 pages
- **Community Telegram** : support, entraide, partage de skills
- **Office hours mensuels** : Q&A live avec le formateur
- **Updates trimestriels** : nouveaux modules pour les nouvelles features
- **Acces a vie** : une fois achete, toujours acces

## Upsell

> "Tu veux un accompagnement personnalise pour construire ton ecosysteme ? Agentik {OS} propose un accompagnement CAIO Partnership. agentik-os.com/pricing"

---

**FIN DU DOCUMENT — Formation Claude Code Masterclass : De Zero a Système Autonome**
