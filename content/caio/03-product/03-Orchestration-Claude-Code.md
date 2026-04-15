# Orchestration Enterprise avec Claude Code — Le Système d'IA Autonome pour le CAIO

> *"Le CAIO ne pilote pas des outils. Il construit des systèmes vivants d'intelligence artificielle qui agissent, apprennent, et se coordonnent de manière autonome."*

---

## Introduction

Ce document est le manuel technique opérationnel que tout Chief AI Officer doit maîtriser pour déployer un système d'IA autonome à l'échelle de l'entreprise en 2026. Il ne s'agit pas d'une introduction à l'IA générative ni d'un survol des possibilités. C'est un guide d'architecture et d'implémentation basé sur Claude Code — la plateforme d'agentic AI d'Anthropic — et sur les patterns d'orchestration que des organisations comme Agentik OS ont développés en production réelle.

Le CAIO qui lit ce document doit comprendre que nous sommes passés d'une ère de "l'IA comme assistant" à une ère de "l'IA comme infrastructure opérationnelle". Claude Code n'est pas un chatbot amélioré. C'est un système d'orchestration multi-agents capable de planifier, d'exécuter, d'auditer, et d'apprendre de manière autonome — à condition d'être correctement architecturé.

Ce module couvre dix domaines fondamentaux : l'architecture des agents, le système de hooks, les skills (compétences), la planification et le scheduling, l'intégration MCP, l'orchestration multi-équipes, l'infrastructure serveur dédiée, les patterns d'intégration métier, le monitoring et l'observabilité, et les pipelines d'automatisation.

---

## 1. Architecture des Agents — Les Briques Fondamentales

### 1.1 Qu'est-ce qu'un Agent Claude Code ?

Un agent dans Claude Code est une instance spécialisée de Claude avec son propre contexte, ses propres outils autorisés, ses propres instructions système, et sa propre fenêtre de contexte isolée. La distinction fondamentale avec un simple appel API à Claude est la suivante : un agent est un acteur autonome persistant dans une architecture d'orchestration, capable de prendre des décisions séquentielles, d'appeler des outils, d'analyser leurs résultats, et de produire des artefacts.

Chaque agent est défini par un fichier Markdown avec un en-tête YAML (frontmatter) qui spécifie son comportement :

```markdown
---
name: analyste-financier
description: >
 Analyse les états financiers, identifie les anomalies, et génère
 des rapports de synthèse pour le CFO. Spécialisé sur IFRS 16 et US GAAP.
 Se déclenche quand on parle de bilan, P&L, cash flow, ou audit financier.
model: claude-opus-4-5
tools: [Read, Bash, Glob, Grep, WebSearch, WebFetch]
memory: project
permissionMode: default
maxTurns: 50
---

# Analyste Financier — Agent Spécialisé

[Corps du système prompt de l'agent...]
> Les champs du frontmatter disponibles en 2026 sont les suivants :
>
> | Champ | Type | Description |
> |-------|------|-------------|
> | `name` | string | Identifiant unique de l'agent |
> | `description` | string | Description utilisée par Claude pour décider quand déléguer |
> | `model` | string | Modèle LLM : claude-opus, claude-sonnet, claude-haiku |
> | `tools` | liste | Outils autorisés : Read, Write, Edit, Bash, Glob, Grep, Agent, WebSearch... |
> | `disallowedTools` | liste | Outils explicitement interdits |
> | `permissionMode` | string | default, plan, acceptEdits, auto, bypassPermissions |
> | `memory` | string | user, project, local — portée de la mémoire persistante |
> | `maxTurns` | entier | Limite de tours de conversation |
> | `hooks` | objet | Hooks spécifiques à cet agent |
> | `mcpServers` | objet | Serveurs MCP dédiés à cet agent |
> | `skills` | liste | Skills à charger pour cet agent |
> | `background` | booléen | L'agent tourne en arrière-plan |
> | `isolation` | string | Niveau d'isolation (worktree, sandbox) |
> | `color` | string | Couleur d'affichage dans l'interface |
>
> ### 1.2 Portées de Définition des Agents
>
> Les agents sont découverts dans trois emplacements, par ordre de priorité :
>
> **Niveau utilisateur global** (`~/.claude/agents/`)
> Les agents définis ici sont disponibles dans tous les projets. C'est là que résident les agents transversaux comme les analystes, les chercheurs, les auditeurs de qualité, et les spécialistes métiers réutilisables.
>
> **Niveau projet** (`.claude/agents/` à la racine du projet)
> Les agents spécifiques à un projet. Dans un projet de développement logiciel, on trouvera ici le `nextjs-developer`, le `convex-expert`, ou le `stripe-expert` configurés avec les conventions spécifiques du projet.
>
> **Niveau plugin** (dans les plugins installés)
> Les plugins peuvent embarquer leurs propres agents qui s'activent quand le plugin est activé.
~/.claude/agents/
├── AISB/ # Équipe AISB (12 agents spécialisés)
│ ├── oracle.md # Routeur intelligent
│ ├── morpheus.md # Exécuteur de code
│ ├── seraph.md # Auditeur qualité
│ ├── keymaker.md # Planificateur DAG
│ ├── niobe.md # Chercheur parallèle
│ └── smith.md # Apprentissage automatique
├── c-level/ # Agents C-Level
│ ├── cto.md # Chief Technology Officer IA
│ ├── cmo.md # Chief Marketing Officer IA
│ ├── cpo.md # Chief Product Officer IA
│ └── ceo.md # Chief Executive Officer IA
├── development/ # 45 agents de développement
│ ├── nextjs-developer.md
│ ├── react-specialist.md
│ ├── convex-expert.md
│ └── ...
├── marketing/ # 25 agents marketing
│ ├── blog-writer.md
│ ├── seo-auditor.md
│ └── ...
├── security/ # Agents sécurité
│ ├── hacker.md
│ └── ...
└── quality/ # Agents qualité
 └── ...
> ### 1.3 Hiérarchie des Agents — La Structure Organisationnelle IA
>
> L'architecture la plus efficace pour l'enterprise AI reproduit une structure organisationnelle humaine. Chez Agentik OS, le système compte 281 agents organisés en six niveaux hiérarchiques :
Niveau 0 : AISB (AI Super Brain)
 └── Interface Telegram : reçoit les instructions de l'humain
 Répartiteur global : route vers l'Oracle du bon projet

Niveau 1 : ORACLE — Le Chef de Projet IA
 └── Reçoit les tâches d'AISB
 Analyse, décompose, délègue
 Ne code jamais directement
 Surveille l'avancement
 Reporte vers AISB

Niveau 2 : C-Level IA (CTO, CMO, CPO, CEO)
 └── Orchestrent leur département respectif
 Chaque C-Level coordonne 30 à 50 agents spécialistes
 Utilisés pour les tâches EPIC (multi-département)

Niveau 3 : Workers / Sessions de Travail
 └── Sessions tmux éphémères ({Projet}-1, {Projet}-2...)
 Exécutent les commandes /team, /ralph, /hunt-all
 Rapportent vers l'Oracle

Niveau 4 : Équipes de Spécialistes (/team)
 └── 3 à 6 agents parallèles par équipe
 Chacun dans sa propre fenêtre de contexte
 Communication via SendMessage et TaskList partagée

Niveau 5 : Sous-Agents Spécialisés
 └── nextjs-developer, convex-expert, stripe-expert...
 281 agents au total, organisés par domaine
 Invoqués par les niveaux supérieurs
> **Application pour le CAIO :** Cette hiérarchie n'est pas arbitraire. Elle reflète un principe fondamental d'organisation des systèmes IA complexes : **la séparation des responsabilités**. Aucun agent ne fait tout. L'Oracle ne code pas. MORPHEUS ne planifie pas. SERAPH n'implémente pas. Cette spécialisation garantit la qualité, la traçabilité, et la scalabilité du système.
>
> ### 1.4 Sous-Agents vs Équipes d'Agents — Choisir le Bon Pattern
>
> Claude Code offre deux patterns fondamentaux pour la délégation parallèle :
>
> **Les Sous-Agents (Subagents)**
> Un sous-agent est lancé au sein d'une session principale. Il travaille dans sa propre fenêtre de contexte, exécute une tâche déléguée, et retourne uniquement le résultat à l'agent principal. La communication est unidirectionnelle (rapport vers l'appelant). Idéal pour des tâches focalisées où seul le résultat compte.
>
> ```python
> # Exemple : délégation de recherche à un sous-agent NIOBE
> Agent(
> subagent_type="niobe",
> model="claude-sonnet-4-5",
> prompt="""
> MISSION : Rechercher les meilleures pratiques d'implémentation IFRS 16
> sous Python en 2026.
>
> Produire : 5 sources Tier 1-2, avec code examples, confidence 0.8+.
> Format : rapport structuré avec recommandations actionnables.
> """
> )
**Les Équipes d'Agents (Agent Teams)**
Une équipe est un ensemble d'agents autonomes partageant une liste de tâches commune et pouvant se communiquer directement entre eux (peer-to-peer). Chaque agent a sa propre session Claude Code. La liste de tâches partagée permet l'auto-coordination. Idéal pour les tâches complexes nécessitant discussion et collaboration inter-agents.

```python
# Étape 1 : Créer l'équipe
TeamCreate(
 team_name="team-audit-financier-q1",
 description="Audit complet des états financiers Q1 2026"
)

# Étape 2 : Créer les tâches avec dépendances
TaskCreate(subject="Analyse du bilan", description="Analyser le bilan au 31/03/2026")
TaskCreate(subject="Analyse P&L", description="Analyser le compte de résultat Q1")
TaskCreate(subject="Analyse cash flow", description="Analyser les flux de trésorerie")
TaskCreate(subject="Rapport de synthèse", description="Synthèse finale — bloquée par les 3 analyses")

# Étape 3 : Lancer les agents en parallèle avec team_name
Agent(subagent_type="analyste-financier", name="agent-bilan",
 team_name="team-audit-financier-q1", model="claude-opus-4-5",
 prompt="Analyser le bilan...")

Agent(subagent_type="analyste-financier", name="agent-pl",
 team_name="team-audit-financier-q1", model="claude-opus-4-5",
 prompt="Analyser le P&L...")
> Le tableau de comparaison pour aider le CAIO à choisir :
>
> | Critère | Sous-Agents | Équipes d'Agents |
> |---------|-------------|-----------------|
> | Communication inter-agents | Non (rapport unique) | Oui (peer-to-peer) |
> | Liste de tâches partagée | Non | Oui (auto-coordination) |
> | Coût en tokens | Plus faible | Plus élevé |
> | Idéal pour | Tâches focalisées | Travail complexe nécessitant collaboration |
> | Visibilité temps réel | Limitée | Totale (tmux split-pane) |
> | Nombre d'agents recommandé | 1-3 | 3-8 |
>
> ### 1.5 Isolation via Git Worktrees
>
> Pour les tâches de développement qui risquent de créer des conflits de fichiers entre agents parallèles, Claude Code supporte l'isolation via Git Worktrees. Chaque agent travaille sur sa propre branche dans son propre répertoire de travail, ce qui élimine les conflits de fichiers.
>
> ```bash
> # Créer des worktrees isolés pour 3 agents parallèles
> git worktree add /tmp/agent-frontend main -b feature/frontend-redesign
> git worktree add /tmp/agent-backend main -b feature/api-v2
> git worktree add /tmp/agent-tests main -b feature/test-coverage
>
> # Chaque agent travaille dans son répertoire isolé
> # Merge final après validation par l'agent qualité
---

## 2. Le Système de Hooks — Automatisation et Contrôle

### 2.1 Comprendre les Hooks

Les hooks sont le mécanisme de contrôle et d'automatisation le plus puissant de Claude Code. Ils permettent d'intercepter chaque événement du cycle de vie d'un agent et d'y associer une action automatique : valider une opération, la bloquer, journaliser, notifier, ou déclencher un processus externe.

Un hook se définit dans un fichier JSON de configuration (`.claude/settings.json` au niveau projet, ou `~/.claude/settings.json` au niveau global) et se compose de trois éléments : l'**événement** à intercepter, le **matcher** (filtre optionnel), et le **handler** (action à exécuter).

```json
{
 "hooks": {
 "PreToolUse": [
 {
 "matcher": "Bash",
 "hooks": [
 {
 "type": "command",
 "command": "/home/hacker/.claude/hooks/validate-bash.sh"
 }
 ]
 }
 ],
 "PostToolUse": [
 {
 "matcher": "Write|Edit",
 "hooks": [
 {
 "type": "command",
 "command": "/home/hacker/.claude/hooks/log-file-changes.sh",
 "async": true
 }
 ]
 }
 ]
 }
}
> ### 2.2 Catalogue Complet des Événements de Hooks
>
> Claude Code expose 20 événements de hooks couvrant l'intégralité du cycle de vie d'un agent :
>
> **Événements de Session**
>
> | Événement | Déclenchement | Usage Enterprise |
> |-----------|---------------|-----------------|
> | `SessionStart` | Démarrage, reprise, ou compaction | Injection de contexte, initialisation variables d'environnement |
> | `SessionEnd` | Fin de session (clear, logout) | Cleanup, rapport final, archivage |
>
> **Événements d'Exécution**
>
> | Événement | Déclenchement | Usage Enterprise |
> |-----------|---------------|-----------------|
> | `UserPromptSubmit` | Soumission d'un prompt utilisateur | Validation de conformité, filtrage sécurité |
> | `PreToolUse` | Avant l'exécution d'un outil | Validation, blocage, modification de l'input |
> | `PermissionRequest` | Demande d'autorisation | Auto-approval ou auto-refus selon règles |
> | `PostToolUse` | Après l'exécution réussie d'un outil | Formatting automatique, tests, journalisation |
> | `PostToolUseFailure` | Après l'échec d'un outil | Alerting, retry logic, escalation |
> | `PermissionDenied` | Permission refusée | Journalisation audit, notification |
> | `Stop` | Claude termine sa réponse | Validation finale, gate qualité |
> | `StopFailure` | Arrêt sur erreur | Alerting, recovery automatique |
>
> **Événements Multi-Agents**
>
> | Événement | Déclenchement | Usage Enterprise |
> |-----------|---------------|-----------------|
> | `SubagentStart` | Lancement d'un sous-agent | Tracking des coûts, logging |
> | `SubagentStop` | Fin d'un sous-agent | Collecte des résultats, audit |
> | `TaskCreated` | Création d'une tâche dans une équipe | Validation de la tâche, gate qualité |
> | `TaskCompleted` | Complétion d'une tâche | Validation avant fermeture, notification |
> | `TeammateIdle` | Un coéquipier est inactif | Forcer la poursuite du travail |
>
> **Événements Asynchrones**
>
> | Événement | Déclenchement | Usage Enterprise |
> |-----------|---------------|-----------------|
> | `InstructionsLoaded` | Chargement des instructions | Validation des configs |
> | `CwdChanged` | Changement de répertoire | Rechargement du contexte projet |
> | `FileChanged` | Modification d'un fichier surveillé | CI/CD triggers, lint automatique |
> | `WorktreeCreate/Remove` | Gestion des worktrees | Tracking des branches parallèles |
>
> ### 2.3 Types de Handlers
>
> Claude Code supporte quatre types de handlers pour les hooks :
>
> **1. Command Handler** — Le plus courant. Exécute un script shell ou une commande.
>
> ```json
> {
> "type": "command",
> "command": "/path/to/script.sh",
> "async": false,
> "shell": "bash",
> "timeout": 30
> }
**2. HTTP Handler** — Envoie un POST HTTP vers un endpoint externe. Idéal pour intégrer des systèmes de monitoring, Slack, ou des APIs internes.

```json
{
 "type": "http",
 "url": "https://monitor.entreprise.com/hooks/claude-event",
 "headers": {
 "Authorization": "Bearer $MONITOR_TOKEN",
 "Content-Type": "application/json"
 },
 "allowedEnvVars": ["MONITOR_TOKEN"],
 "timeout": 10
}
> **3. Prompt Handler** — Utilise un LLM pour évaluer l'événement (validation sémantique).
>
> ```json
> {
> "type": "prompt",
> "prompt": "Évaluer si cette commande bash est conforme à la politique de sécurité : $ARGUMENTS",
> "model": "claude-haiku",
> "timeout": 15
> }
**4. Agent Handler** — Lance un sous-agent Claude pour une vérification approfondie.

```json
{
 "type": "agent",
 "subagent_type": "security-scanner",
 "prompt": "Scanner ce code pour des vulnérabilités de sécurité..."
}
> ### 2.4 Mécanisme de Contrôle — Exit Codes
>
> Le comportement du hook est contrôlé par le code de retour du script et le JSON produit sur stdout :
>
> | Code de Retour | Comportement | Usage |
> |---------------|--------------|-------|
> | `0` | Succès — parse stdout pour directives JSON | Validation réussie |
> | `2` | **Blocage** — envoie stderr à Claude comme feedback | Bloquer une action dangereuse |
> | Autre | Erreur non-bloquante — log en mode verbose | Avertissement |
>
> Un hook `PreToolUse` qui retourne le code 2 **bloque l'exécution de l'outil** et transmet le message d'erreur à Claude, qui peut alors adapter son comportement.
>
> ### 2.5 Exemples d'Implémentation Enterprise
>
> **Hook de conformité RGPD — Bloquer l'accès aux données personnelles**
>
> ```bash
> #!/bin/bash
> # ~/.claude/hooks/rgpd-compliance.sh
>
> INPUT=$(cat)
> TOOL=$(echo "$INPUT" | jq -r '.tool_name')
> CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
> FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
>
> # Détecter l'accès à des répertoires contenant des données personnelles
> if echo "$FILE" | grep -qE '/(users|clients|patients|personal_data)/'; then
> if ! echo "$CMD" | grep -q 'audit'; then
> echo "Accès aux données personnelles bloqué. Utiliser le mode audit uniquement." >&2
> exit 2
> fi
> fi
>
> exit 0
**Hook de journalisation pour audit — Toutes les modifications de fichiers**

```bash
#!/bin/bash
# ~/.claude/hooks/audit-file-changes.sh

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name')
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // "N/A"')
SESSION=$(echo "$INPUT" | jq -r '.session_id')
TIMESTAMP=$(date -Iseconds)

# Journalisation JSONL append-only
echo "{
 \"timestamp\": \"$TIMESTAMP\",
 \"session\": \"$SESSION\",
 \"tool\": \"$TOOL\",
 \"file\": \"$FILE\",
 \"agent\": \"$(echo "$INPUT" | jq -r '.agent_type // "main"')\"
}" >> /var/log/claude-audit/$(date +%Y-%m-%d).jsonl
> **Hook de gate qualité — Bloquer si les tests échouent après modification**
>
> ```bash
> #!/bin/bash
> # ~/.claude/hooks/test-gate.sh
> # PostToolUse sur Write/Edit
>
> INPUT=$(cat)
> FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""')
>
> # Uniquement pour les fichiers TypeScript/JavaScript
> if echo "$FILE" | grep -qE '\.(ts|tsx|js|jsx)$'; then
> # Lancer les tests unitaires
> cd "$CLAUDE_PROJECT_DIR"
> if ! npm run test:unit --silent 2>/dev/null; then
> echo "Tests unitaires échoués après modification de $FILE" >&2
> jq -n '{
> "decision": "block",
> "reason": "Les tests unitaires échouent. Corriger avant de continuer."
> }'
> exit 0
> fi
> fi
**Hook d'alerting Slack — Notification sur erreur critique**

```bash
#!/bin/bash
# ~/.claude/hooks/slack-alert.sh
# Déclenché par PostToolUseFailure

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name')
ERROR=$(echo "$INPUT" | jq -r '.error // "Erreur inconnue"')

# Alerter Slack uniquement pour les outils critiques
if echo "$TOOL" | grep -qE '(deploy|database|payment)'; then
 curl -s -X POST "$SLACK_WEBHOOK_URL" \
 -H "Content-Type: application/json" \
 -d "{
 \"text\": \":rotating_light: Erreur Claude Code\",
 \"blocks\": [{
 \"type\": \"section\",
 \"text\": {
 \"type\": \"mrkdwn\",
 \"text\": \"*Outil :* $TOOL\\n*Erreur :* $ERROR\"
 }
 }]
 }"
fi
> ---
>
> ## 3. Le Système de Skills — Étendre les Capacités des Agents
>
> ### 3.1 Concept des Skills
>
> Les Skills (compétences) sont des modules de comportement réutilisables que Claude Code peut charger à la demande. Contrairement aux agents qui sont des entités persistantes, un Skill est un ensemble d'instructions, de scripts, et de ressources qui s'active quand un agent en a besoin pour accomplir une tâche spécifique.
>
> La philosophie des Skills repose sur la **divulgation progressive** (*progressive disclosure*) :
> 1. Claude scanne d'abord les métadonnées du Skill (description, nom) pour déterminer la pertinence
> 2. Si le Skill correspond à la tâche, Claude charge les instructions complètes
> 3. Enfin, seulement si nécessaire, Claude charge les ressources ou scripts exécutables
>
> Cette approche préserve la fenêtre de contexte en n'injectant que ce qui est réellement utile.
>
> Un Skill est défini dans un fichier Markdown dans `~/.claude/commands/` et s'invoque avec la commande `/nom-du-skill` :
~/.claude/commands/
├── team.md # Équipes d'agents avec tmux
├── hunt-all.md # Chasse aux bugs full-stack (13 agents)
├── hunt-frontend.md # Chasse aux bugs frontend
├── hunt-backend.md # Chasse aux bugs backend
├── godmode.md # Autonomie totale + heartbeat
├── ralph.md # Agent arrière-plan autonome
├── xoxo.md # Vérification ultra-approfondie
├── verify.md # Vérification rapide post-fix
├── e2e.md # Tests end-to-end
├── maniac.md # QA obsessionnelle
├── deepux.md # Analyse UX approfondie
├── planner.md # Planification DAG
├── build.md # Build + deploy production
├── taste-skill.md # Architecture UI anti-générique
├── redesign-skill.md # Audit et upgrade UI
├── linear-fix.md # Résolution tickets Linear
└── ... # 130+ skills au total
> ### 3.2 Anatomie d'un Skill
>
> ```markdown
> ---
> name: analyse-concurrentielle
> description: >
> Analyse concurrentielle approfondie d'un marché ou d'un concurrent spécifique.
> Couvre le positionnement, le pricing, les forces/faiblesses, et les opportunités.
> Utilise quand on demande : "analyse la concurrence", "compare avec X", "benchmark".
> allowed-tools: ["WebSearch", "WebFetch", "Read", "Write"]
> ---
>
> # Skill : Analyse Concurrentielle
>
> <skill-instructions>
>
> ## Protocole d'Analyse (5 phases)
>
> ### Phase 1 : Identification du périmètre
> [Instructions détaillées...]
>
> ### Phase 2 : Collecte des données
> [Instructions détaillées...]
>
> ### Phase 3 : Analyse comparative
> [Instructions détaillées...]
>
> ### Phase 4 : Synthèse et recommandations
> [Instructions détaillées...]
>
> ### Phase 5 : Rapport exécutif
> [Instructions détaillées...]
>
> </skill-instructions>
>
> ## Livrables
> - Rapport Markdown structuré
> - Tableau comparatif
> - Top 3 recommandations stratégiques
### 3.3 Skills Avancés — Le Pattern /godmode

Le Skill `/godmode` illustre la puissance maximale du système. Il transforme Claude en orchestrateur pleinement autonome avec heartbeat, kill switch, et reporting Telegram :

```markdown
---
name: godmode
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Agent",
 "TaskCreate", "TaskUpdate", "TaskList", "TeamCreate",
 "TeamDelete", "SendMessage", "CronCreate", "CronList"]
---

# GOD MODE — Autonomie Totale

Claude devient le décisionnaire. Il planifie, exécute, vérifie, et
itère indéfiniment jusqu'à mission accomplie. Reporting Telegram
automatique. Kill switch disponible à tout moment.

## État Machine
WORK → (STATUS:DONE détecté) → VERIFYING → (/xoxo ok) → DONE
 ↑ |
 └──────── (erreurs trouvées) ────────┘
> ### 3.4 Création d'un Skill Métier Custom
>
> Pour le CAIO, la création de Skills métiers spécifiques à l'industrie est une priorité stratégique. Voici un exemple pour le secteur bancaire :
>
> ```markdown
> ---
> name: analyse-risque-credit
> description: >
> Analyse du risque de crédit selon les normes Bâle III/IV.
> Calcule PD, LGD, EAD, et génère les provisions IFRS 9.
> Déclencher pour : scoring, analyse borrower, stress test.
> allowed-tools: ["Read", "Bash", "Write", "Glob"]
> ---
>
> # Skill : Analyse Risque Crédit (Bâle III/IV + IFRS 9)
>
> <skill-instructions>
>
> ## Étape 1 : Collecte des données
> Lire les fichiers de données borrower dans data/borrowers/
> Format attendu : CSV avec colonnes [id, revenus, dettes, historique, secteur]
>
> ## Étape 2 : Calcul PD (Probability of Default)
> ```python
> # Script de calcul PD via régression logistique
> import pandas as pd
> from sklearn.linear_model import LogisticRegression
>
> # Charger les données...
> # Appliquer le modèle calibré...
## Étape 3 : Provisions IFRS 9
Stage 1 : 12-month ECL pour les expositions performing
Stage 2 : Lifetime ECL pour les expositions en significant credit increase
Stage 3 : Lifetime ECL pour les expositions en défaut

## Étape 4 : Rapport de synthèse
Format : Executive Summary + tableaux de bord régulateur

</skill-instructions>
> ---
>
> ## 4. Cron et Scheduling — L'IA qui Agit Sans Supervision
>
> ### 4.1 Les Trois Modes de Scheduling
>
> Claude Code offre en 2026 trois approches complémentaires pour planifier des tâches récurrentes :
>
> **Mode 1 : Tâches Cloud Planifiées** (`/schedule`)
> Les tâches tournent sur l'infrastructure Anthropic. La machine de l'utilisateur peut être éteinte. Chaque exécution clone le repository GitHub, exécute la tâche dans un environnement isolé, et crée une branche `claude/` avec les modifications.
Caractéristiques :
- Intervalle minimum : 1 heure
- Pas d'accès aux fichiers locaux (clone GitHub à chaque run)
- Connectors MCP configurés par tâche
- Exécution autonome sans prompts de permission
- Survit aux redémarrages
> ```bash
> # Créer une tâche planifiée quotidienne
> /schedule Analyser les PR ouvertes chaque matin à 8h et créer un résumé Slack
>
> # Créer une tâche hebdomadaire
> /schedule Auditer les dépendances NPM chaque lundi et créer une issue GitHub pour les vulnérabilités
**Mode 2 : Tâches Desktop Planifiées**
Les tâches tournent sur la machine de l'utilisateur. Elles ont accès aux fichiers locaux et aux outils locaux. Elles persistent entre les redémarrages de l'application (pas de la session).

> Caractéristiques :
> - Intervalle minimum : 1 minute
> - Accès complet aux fichiers locaux
> - Hérite des serveurs MCP de la configuration
> - Configurable par tâche (permissions)
> - Survit aux redémarrages de l'application
**Mode 3 : `/loop` — Scheduling en Session**
Le plus flexible mais aussi le plus éphémère. La boucle tourne tant que la session est active. Jusqu'à 50 tâches concurrentes par session. Expire après 3 jours par sécurité.

```bash
# Surveiller un service toutes les 5 minutes
/loop every 5 minutes: Vérifier le statut de l'API de paiement et alerter si down

# Analyser les logs toutes les heures
/loop every 1 hour: Parser les logs Nginx et produire un rapport des erreurs 4xx/5xx
> ### 4.2 Tableau Comparatif des Modes de Scheduling
>
> | Critère | Cloud | Desktop | /loop |
> |---------|-------|---------|-------|
> | Intervalle minimum | 1 heure | 1 minute | 1 minute |
> | Machine requise | Non | Oui | Oui |
> | Session requise | Non | Non | Oui |
> | Persistance | Permanente | Permanente | Session |
> | Accès fichiers locaux | Non | Oui | Oui |
> | Accès MCP | Connectors | Config + Connectors | Hérité de la session |
> | Prompts de permission | Non | Configurable | Hérité |
>
> ### 4.3 Patterns d'Automatisation Enterprise Avec le Scheduling
>
> **Pattern 1 : Morning Briefing Automatisé du CAIO**
Tâche cloud, quotidienne, 7h00 :
"Analyser les 24 dernières heures d'activité de tous les projets.
Collecter : nouveaux commits, PRs ouvertes, tests échoués, déploiements,
alertes de monitoring. Synthétiser en un brief exécutif de 1 page.
Poster dans le canal Slack #caio-daily-brief."
> **Pattern 2 : Audit de Sécurité Continu**
Tâche cloud, hebdomadaire, lundi 02h00 :
"Scanner les dépendances NPM/Python de tous les repositories pour des
vulnérabilités (CVE score >= 7). Créer une issue GitHub pour chaque
vulnérabilité critique. Poster un résumé dans Slack #security-alerts."
> **Pattern 3 : Monitoring des KPIs Métier**
Tâche /loop, toutes les 30 minutes :
"Vérifier les KPIs de la plateforme : taux de conversion, latence API,
erreurs 500, MRR estimé. Si un KPI sort de la plage normale, alerter
immédiatement via Telegram avec le contexte et la recommandation."
> **Pattern 4 : Documentation Auto-Synchronisée**
Tâche cloud, déclenchée par merge sur main :
"Après chaque merge, analyser les fichiers modifiés, mettre à jour la
documentation correspondante, vérifier que les exemples de code
fonctionnent toujours, et créer une PR avec les mises à jour de docs."
> ### 4.4 GitHub Actions — CI/CD Piloté par l'IA
>
> Claude Code s'intègre nativement dans les pipelines GitHub Actions, permettant d'intégrer l'intelligence de Claude dans chaque étape du cycle de développement :
>
> ```yaml
> # .github/workflows/claude-review.yml
> name: Code Review IA
>
> on:
> pull_request:
> branches: [main, develop]
>
> jobs:
> claude-review:
> runs-on: ubuntu-latest
> steps:
> - uses: anthropics/claude-code-action@v1
> with:
> anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
> trigger_phrase: "@claude review"
> prompt: |
> Effectuer une revue de code complète de cette PR.
> Vérifier : sécurité, performance, maintenabilité, tests.
> Signaler tout problème bloquant avant merge.
---

## 5. MCP — Model Context Protocol, le Système Nerveux de l'IA Enterprise

### 5.1 Comprendre MCP

Le Model Context Protocol (MCP) est le protocole standard d'Anthropic pour connecter Claude à des sources de données et des outils externes. MCP remplace les intégrations ad hoc par une architecture standardisée où chaque outil externe est exposé comme un "MCP Server" que Claude peut interroger.

L'analogie la plus juste pour le CAIO : MCP est à Claude ce que les API REST sont aux applications web. C'est le langage commun qui permet à Claude de parler à n'importe quel système externe de manière cohérente.

> Architecture MCP :
>
> ┌─────────────┐ MCP Protocol ┌─────────────────┐
> │ Claude │ ◄──────────────────► │ MCP Server │
> │ (Client) │ │ (Slack, DB, │
> └─────────────┘ │ Linear, etc.) │
> └─────────────────┘
### 5.2 Configuration des Serveurs MCP

La configuration MCP se fait dans `.mcp.json` au niveau projet ou dans `~/.claude.json` au niveau global :

```json
{
 "mcpServers": {
 "slack": {
 "command": "npx",
 "args": ["@modelcontextprotocol/server-slack"],
 "env": {
 "SLACK_BOT_TOKEN": "$SLACK_BOT_TOKEN",
 "SLACK_TEAM_ID": "$SLACK_TEAM_ID"
 }
 },
 "linear": {
 "command": "npx",
 "args": ["@linear/linear-mcp-server"],
 "env": {
 "LINEAR_API_KEY": "$LINEAR_API_KEY"
 }
 },
 "postgres": {
 "command": "npx",
 "args": ["@modelcontextprotocol/server-postgres",
 "postgresql://user:pass@localhost/entreprise_db"]
 },
 "github": {
 "command": "npx",
 "args": ["@modelcontextprotocol/server-github"],
 "env": {
 "GITHUB_TOKEN": "$GITHUB_TOKEN"
 }
 },
 "composio": {
 "command": "npx",
 "args": ["composio-mcp@latest"],
 "env": {
 "COMPOSIO_API_KEY": "$COMPOSIO_API_KEY"
 }
 }
 }
}
> ### 5.3 Catalogue des Intégrations MCP Enterprise
>
> **Communications et Collaboration**
>
> | Plateforme | Capacités via MCP |
> |------------|-------------------|
> | **Slack** | Envoyer messages, lire canaux, gérer réactions, créer rappels |
> | **Telegram** | Envoyer DM et canaux, gérer bots, historique de messages |
> | **Discord** | Modération, messages, webhooks |
> | **Email** | Lecture, envoi, gestion de threads (Gmail, Outlook) |
> | **Teams** | Messages, meetings, fichiers SharePoint |
>
> **Gestion de Projet et Développement**
>
> | Plateforme | Capacités via MCP |
> |------------|-------------------|
> | **Linear** | CRUD tickets, sprints, rapports, commentaires avec screenshots |
> | **GitHub** | PRs, issues, code review, actions, commits, branches |
> | **Jira** | Stories, épics, sprints, transitions de statut |
> | **Notion** | Pages, bases de données, documents |
> | **Google Drive** | Lecture/écriture documents, Sheets, Slides |
>
> **Bases de Données et Backend**
>
> | Plateforme | Capacités via MCP |
> |------------|-------------------|
> | **PostgreSQL** | Requêtes SQL complètes, schéma, migrations |
> | **Convex** | Fonctions serverless, queries temps réel, mutations |
> | **Supabase** | CRUD, auth, storage, realtime |
> | **MongoDB** | Queries, aggregations, index management |
> | **Redis** | Cache, pub/sub, sessions |
>
> **Finance et CRM**
>
> | Plateforme | Capacités via MCP |
> |------------|-------------------|
> | **Stripe** | Paiements, abonnements, remboursements, analytics |
> | **Salesforce** | Leads, opportunités, comptes, rapports |
> | **HubSpot** | CRM, marketing automation, analytics |
>
> **Infrastructure et Monitoring**
>
> | Plateforme | Capacités via MCP |
> |------------|-------------------|
> | **Vercel** | Déploiements, logs, domaines, analytics |
> | **AWS** | EC2, S3, Lambda, CloudWatch |
> | **Datadog** | Métriques, logs, alertes, dashboards |
> | **PagerDuty** | Incidents, alertes, escalation |
>
> ### 5.4 Composio — L'Accès à 500+ Applications en Un Seul MCP
>
> Composio est une plateforme d'intégration qui expose 500+ applications via un seul serveur MCP. Pour le CAIO, c'est la solution la plus pragmatique pour connecter rapidement Claude à l'écosystème d'outils d'entreprise sans avoir à configurer chaque MCP individuellement.
>
> ```json
> {
> "mcpServers": {
> "composio": {
> "command": "npx",
> "args": ["composio-mcp@latest"],
> "env": {
> "COMPOSIO_API_KEY": "votre-clé-composio"
> }
> }
> }
> }
Une fois configuré, Claude peut interagir avec Slack, GitHub, Linear, Gmail, Salesforce, HubSpot, et 495 autres applications sans configuration supplémentaire.

### 5.5 Création d'un Serveur MCP Custom

Pour les systèmes internes non couverts par les MCPs existants, le CAIO peut faire développer un MCP Server custom :

```typescript
// mcp-server-erp-interne/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
 name: "erp-interne",
 version: "1.0.0"
});

// Exposer les données ERP à Claude
server.setRequestHandler(ListToolsRequestSchema, async () => ({
 tools: [
 {
 name: "get_commandes",
 description: "Récupérer les commandes clients par période",
 inputSchema: {
 type: "object",
 properties: {
 date_debut: { type: "string", description: "Format YYYY-MM-DD" },
 date_fin: { type: "string", description: "Format YYYY-MM-DD" },
 client_id: { type: "string", description: "Optionnel" }
 },
 required: ["date_debut", "date_fin"]
 }
 },
 {
 name: "update_statut_commande",
 description: "Mettre à jour le statut d'une commande",
 inputSchema: {
 type: "object",
 properties: {
 commande_id: { type: "string" },
 statut: { type: "string",
 enum: ["en_attente", "en_cours", "livrée", "annulée"] }
 },
 required: ["commande_id", "statut"]
 }
 }
 ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
 if (request.params.name === "get_commandes") {
 // Connexion à l'ERP interne et récupération des données
 const data = await erpClient.getCommandes(request.params.arguments);
 return { content: [{ type: "text", text: JSON.stringify(data) }] };
 }
 // ...autres handlers
});

const transport = new StdioServerTransport();
await server.connect(transport);
> ---
>
> ## 6. Orchestration Multi-Équipes — Le Système tmux + Oracle
>
> ### 6.1 L'Architecture AISB — 4 Niveaux de Délégation
>
> L'architecture d'orchestration enterprise la plus complète opérationnelle en 2026 est le système AISB (AI Super Brain) d'Agentik OS. Elle illustre comment structurer un système IA autonome qui gère 11 projets simultanément avec des centaines d'agents :
┌─────────────────────────────────────────────────────────────┐
│ NIVEAU 0 : GARETH (Humain) │
│ Interface Telegram (DM + Topics) │
└─────────────────────────────┬───────────────────────────────┘
 │ Messages Telegram
┌─────────────────────────────▼───────────────────────────────┐
│ NIVEAU 1 : AISB Bot │
│ Python + Claude SDK | systemd | 22 modules │
│ Router | Memory | Formatter | Voice | Reports │
└──────────┬──────────────────────────────────────────────────┘
 │ dispatch-to-session.sh (tmux)
 ┌──────▼──────┬─────────────┬──────────────┐
 │ │ │ │
┌───▼───┐ ┌───▼───┐ ┌───▼───┐ ┌───▼───┐
│oracle-│ │oracle-│ │oracle-│ │oracle-│ NIVEAU 2 :
│Kommu │ │Causio │ │AgentikOS│ │Dent.. │ ORACLES
└───┬───┘ └───┬───┘ └───┬───┘ └───┬───┘ (on-demand)
 │ │ │ │
 {Proj}-1 {Proj}-1 {Proj}-1 {Proj}-1 NIVEAU 3 :
 /team /ralph /hunt-all /team WORKERS
 │
 3-6 agents spécialistes NIVEAU 4 :
 (nextjs-dev, clerk-expert, etc.) ÉQUIPES
> **Règle d'Or :** Personne ne saute un niveau. AISB ne code jamais. Les Oracles ne codent jamais. Les Workers ne reportent pas directement à Gareth.
>
> ### 6.2 Mécanisme de Dispatch — dispatch-to-session.sh
>
> Le cœur du système d'orchestration est un script shell qui gère la création et l'alimentation des sessions tmux :
>
> ```bash
> #!/bin/bash
> # ~/.aisb/lib/dispatch-to-session.sh
>
> SESSION_NAME=$1 # ex: "oracle-Kommu" ou "Kommu-1"
> PROMPT=$2 # Le prompt à envoyer
> WORK_DIR=$3 # Répertoire de travail
>
> # 1. Créer la session tmux si elle n'existe pas
> if ! tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
> tmux new-session -d -s "$SESSION_NAME" -c "$WORK_DIR"
> # Démarrer Claude Code avec bypass des permissions
> tmux send-keys -t "$SESSION_NAME" \
> "claude --dangerously-skip-permissions" Enter
> sleep 5 # Attendre que Claude démarre
> fi
>
> # 2. Aplatir le prompt (les newlines cassent tmux)
> FLAT_PROMPT=$(echo "$PROMPT" | tr '\n' ' ')
>
> # 3. Charger dans le buffer tmux (fiable pour les prompts longs)
> echo "$FLAT_PROMPT" > /tmp/prompt_buffer.txt
> tmux load-buffer /tmp/prompt_buffer.txt
> tmux paste-buffer -t "$SESSION_NAME"
>
> # 4. Soumettre le prompt
> tmux send-keys -t "$SESSION_NAME" Enter
>
> rm /tmp/prompt_buffer.txt
**Pourquoi tmux + load-buffer ?** La méthode `tmux send-keys` tronque les prompts longs (>500 caractères). `load-buffer` + `paste-buffer` est fiable pour des prompts de plusieurs milliers de caractères.

### 6.3 Le Workflow en 5 Étapes de l'Oracle

Chaque Oracle suit un protocole strict en 5 étapes pour traiter une tâche :

> ÉTAPE 1 — ANALYSE
> ├── Lire CLAUDE.md (contexte projet)
> ├── Comprendre la tâche complète
> ├── Décomposer en sous-tâches
> └── Définir les critères de succès
>
> ÉTAPE 2 — DISPATCH
> └── ~/.aisb/lib/dispatch-to-session.sh {Projet}-1 \
> '/team [prompt complet avec contexte]' /chemin/projet
>
> ÉTAPE 3 — MONITORING
> └── tmux capture-pane -t "{Projet}-1" -p -S -50
> (toutes les 30 secondes)
> Indicateurs :
> - "Thinking..."/"Running..." = encore en cours
> - Prompt visible "" = terminé ou en attente
> - Messages d'erreur = intervention nécessaire
>
> ÉTAPE 4 — CLÔTURE + VÉRIFICATION
> ├── tmux kill-session -t {Projet}-1
> └── ~/.aisb/lib/dispatch-to-session.sh {Projet}-verify \
> '/xoxo Vérifier tout le travail effectué' /chemin/projet
>
> ÉTAPE 5 — GATE DE VÉRIFICATION
> ├── npm run build = 0 erreurs
> ├── git commit + push
> ├── Écrire /tmp/aisb-oracle-result-{projet}.md (signal AISB)
> └── /exit (auto-cleanup de la session Oracle)
### 6.4 Communication Inter-Agents — Le Système Mailbox

Pour la communication entre agents qui ne partagent pas une session d'équipe, AISB dispose d'un système de mailbox asynchrone :

```bash
# Envoyer un message entre agents
~/.aisb/mailbox/send.sh SERAPH MORPHEUS "Build terminé, veuillez auditer"

# Structure du message
{
 "from": "SERAPH",
 "to": "MORPHEUS",
 "timestamp": "2026-04-06T10:30:00Z",
 "message": "Build terminé, veuillez auditer",
 "priority": "normal"
}

# Lire la boîte de réception
~/.aisb/mailbox/read.sh MORPHEUS

# Stockage : ~/.aisb/mailbox/{AGENT}.jsonl
> Dans le contexte d'une équipe (Agent Teams), la communication est plus directe via `SendMessage` :
>
> ```python
> # Communication peer-to-peer entre coéquipiers
> SendMessage(
> to="backend-developer",
> summary="API prête pour intégration",
> message="""
> L'endpoint /api/v2/factures est déployé.
> Schéma de réponse :
> {
> "factures": Facture[],
> "total": number,
> "page": number
> }
> Tu peux commencer l'intégration frontend.
> """
> )
>
> # Broadcast à toute l'équipe
> SendMessage(
> to="*",
> summary="Changement de schéma",
> message="Le champ 'client_id' devient 'clientUuid' dans toutes les tables. "
> "Mettre à jour votre code en conséquence."
> )
### 6.5 Prévention des Conflits — File Ownership

Dans un système multi-agents parallèles, la gestion des conflits de fichiers est critique. Les patterns pour les éviter :

**Pattern 1 : Déclaration de propriété explicite**

Chaque agent déclare dans son prompt les fichiers qu'il possède :

> ## Fichiers dont tu es propriétaire (NE TOUCHER QUE CEUX-CI)
> - src/app/dashboard/ # Dashboard complet
> - src/components/dashboard/ # Composants dashboard
> - src/lib/dashboard-utils.ts # Utilitaires dashboard
>
> ## Fichiers appartenant à d'autres agents (NE PAS MODIFIER)
> - src/app/auth/ # Propriété de agent-auth
> - src/app/api/ # Propriété de agent-api
**Pattern 2 : Worktrees Git pour isolation complète**

```bash
# Chaque agent travaille sur sa propre branche/répertoire
git worktree add /tmp/workspace-agent-dashboard main -b feature/dashboard-v2
git worktree add /tmp/workspace-agent-auth main -b feature/auth-revamp

# Merge après validation par l'agent Guardian
> **Pattern 3 : Locks AISB**
>
> ```bash
> # Verrouiller une tâche pour éviter le travail en double
> ~/.aisb/bin/aisb-locks --acquire "task-dashboard-redesign" --ttl 7200
>
> # TTL auto-expire après 2 heures
> # Auto-steal si le détenteur est mort (pas de heartbeat)
---

## 7. Architecture Serveur Dédié — L'Infrastructure d'un Système IA 24/7

### 7.1 Pourquoi un Serveur Dédié ?

Un laptop ou un poste de travail ne peut pas faire tourner un système IA enterprise de manière fiable. Les raisons sont multiples : manque de disponibilité 24/7, gestion d'énergie qui met en veille les processus, impossibilité d'exposer des webhooks stables, et contraintes de ressources partagées avec d'autres applications.

Un VPS dédié — même modeste — résout tous ces problèmes. Le système Agentik OS tourne sur un VPS avec les spécifications suivantes :

> VPS de Production Agentik OS :
> ├── IP : 72.61.197.216
> ├── Port SSH : 42820 (non-standard pour sécurité)
> ├── Utilisateur : hacker (non-root, principe du moindre privilège)
> ├── Shell : ZSH
> ├── Init : systemd (gestion des services)
> ├── Projets : /home/hacker/VibeCoding/
> └── Home : /home/hacker/
### 7.2 Services Critiques — systemd

La fiabilité du système repose sur systemd qui garantit le redémarrage automatique des services critiques :

```ini
# /etc/systemd/system/agentik-monitor-bot.service
[Unit]
Description=AISB Telegram Bot — AI Orchestration Brain
After=network.target
Wants=network-online.target

[Service]
Type=simple
User=hacker
WorkingDirectory=/home/hacker/VibeCoding/work/agentik-monitor/bot
ExecStart=/usr/bin/python3 main.py
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal
Environment=PYTHONUNBUFFERED=1
# Variables d'environnement chargées depuis le fichier .env
EnvironmentFile=/home/hacker/VibeCoding/work/agentik-monitor/bot/.env

[Install]
WantedBy=multi-user.target
> ```bash
> # Commandes de gestion du service
> systemctl start agentik-monitor-bot
> systemctl stop agentik-monitor-bot
> systemctl status agentik-monitor-bot
> systemctl enable agentik-monitor-bot # Démarrage automatique au boot
> journalctl -u agentik-monitor-bot -f # Logs en temps réel
### 7.3 Gestion des Sessions tmux — Persistance et Reprise

tmux est l'épine dorsale de la persistance des sessions d'agents. Contrairement aux processus classiques, les sessions tmux survivent aux déconnexions SSH :

```bash
# Nomenclature des sessions (convention Agentik OS)
# oracle-{Projet} → Oracles (créés à la demande)
# {Projet}-N → Workers éphémères (tués après la tâche)
# AISB-{AGENT} → Agents AISB spécialisés
# Home → Session principale AISB (toujours active)

# Opérations courantes
tmux list-sessions # Lister toutes les sessions
tmux attach -t oracle-Kommu # Se connecter à une session
tmux new-session -d -s oracle-Kommu -c /path # Créer en arrière-plan
tmux kill-session -t Kommu-1 # Tuer une session worker
tmux capture-pane -t oracle-Kommu -p -S -50 # Capturer 50 dernières lignes

# Nettoyage automatique des sessions orphelines
for s in $(tmux list-sessions -F '#S' | grep '^Kommu-'); do
 tmux kill-session -t "$s"
done
> ### 7.4 Heartbeat et Surveillance des Agents
>
> Un système de heartbeat garantit la détection rapide des agents défaillants :
>
> ```bash
> # ~/.aisb/lib/heartbeat.sh
>
> heartbeat_beat() {
> local SESSION=$1
> echo "$(date -Iseconds)" > ~/.aisb/heartbeats/${SESSION}.beat
> }
>
> heartbeat_check() {
> local SESSION=$1
> local TIMEOUT=120 # 2 minutes sans heartbeat = mort
>
> if [ ! -f ~/.aisb/heartbeats/${SESSION}.beat ]; then
> echo "DEAD: No heartbeat file for $SESSION"
> return 1
> fi
>
> LAST_BEAT=$(cat ~/.aisb/heartbeats/${SESSION}.beat)
> LAST_EPOCH=$(date -d "$LAST_BEAT" +%s)
> NOW_EPOCH=$(date +%s)
> DIFF=$((NOW_EPOCH - LAST_EPOCH))
>
> if [ $DIFF -gt $TIMEOUT ]; then
> echo "DEAD: $SESSION hasn't beat in ${DIFF}s (timeout: ${TIMEOUT}s)"
> return 1
> fi
> echo "ALIVE: $SESSION (last beat ${DIFF}s ago)"
> }
>
> heartbeat_status() {
> for BEAT_FILE in ~/.aisb/heartbeats/*.beat; do
> SESSION=$(basename "$BEAT_FILE" .beat)
> heartbeat_check "$SESSION"
> done
> }
### 7.5 Arsenal d'Outils — Les 128+ Outils de Sécurité et Développement

Un serveur dédié permet d'installer et de maintenir un arsenal d'outils persistants. Agentik OS maintient 128+ outils organisés en 7 catégories :

> L1 — Reconnaissance (16 outils)
> ├── nmap : scan réseau
> ├── subfinder : découverte sous-domaines
> ├── httpx : probe HTTP
> ├── dnsx : analyse DNS
> ├── tlsx : analyse TLS/SSL
> ├── amass : cartographie d'infrastructure
> └── ...
>
> L2 — Scanning et Crawling (16 outils)
> ├── nuclei : 9000+ templates de vulnérabilités
> ├── ffuf : fuzzing web
> ├── katana : crawling web avancé
> └── ...
>
> L3 — Analyse Approfondie (12 outils)
> ├── trufflehog : détection de secrets dans le code
> ├── gitleaks : analyse des repositories Git
> ├── dalfox : XSS scanner avancé
> └── ...
>
> L4 — Tests de Credentials (12 outils)
> L5 — Exploitation (8 outils)
> L6 — Post-Exploitation (6 outils)
> L7 — Reporting (PDF generator, Telegram, dashboards)
Pour le CAIO, cet arsenal représente la capacité à auditer en continu la posture de sécurité de l'organisation sans dépendre d'équipes humaines disponibles 24/7.

---

## 8. Patterns d'Intégration Métier

### 8.1 Pipeline Linear — Gestion de Projet IA

Linear est le système de gestion de projet privilégié pour les équipes qui utilisent Claude Code en production. L'intégration native permet un cycle complet de résolution de tickets :

> Ticket Linear créé (feedback utilisateur ou bug report)
> │
> ▼
> AISB reçoit via webhook ou polling
> │
> ▼
> Oracle analyse : lit description + télécharge screenshots
> │
> ▼
> Worker implémente le fix (Playwright BEFORE screenshot)
> │
> ▼
> Playwright AFTER screenshot → comparaison visuelle
> │
> ▼
> Guardian vérifie : 5 questions de validation
> │
> ▼
> Commentaire Linear avec rapport complet (template strict)
> │
> ▼
> Gate qualité Oracle → ticket marqué Done
**Template de commentaire Linear (non négociable)**

```markdown
## Rapport de Vérification du Fix

**Ticket :** {ID} - {titre}
**Commit :** {hash}
**Date :** {YYYY-MM-DD}
**Vérifié par :** Claude AI (protocole 10 points)

### Ce qui a été demandé
{Citation exacte de la description du ticket}

### État Avant
- **Page :** {URL}
- **Élément :** {sélecteur CSS ou description}
- **État visuel :** {état AVANT — analyse du screenshot}
- **Erreurs console :** {N} erreurs

### État Après
- **État visuel :** {état APRÈS — analyse du screenshot}
- **Erreurs console :** {N} erreurs
- **Changement appliqué :** {fichier:lignes, description}

### Comparaison Avant/Après
| Aspect | Avant | Après | Conforme ? |
|--------|-------|-------|-----------|
| {élément} | {ancien état} | {nouvel état} | OUI/NON |
| Erreurs console | {N} | {N} | AMÉLIORÉ/IDENTIQUE |

### Vérification Manuelle
**URL :** {URL dev ou prod}
**Quoi vérifier :** {description précise pour le reviewer humain}

### Checklist de Validation
- [x] Screenshot AVANT capturé et analysé
- [x] Screenshot APRÈS capturé et comparé
- [x] Changement visuel conforme à la demande
- [x] Zéro nouvelle erreur console
- [x] Aucune régression visuelle sur la même page
- [x] Build réussi (npm run build = 0 erreurs)

### Statut : RÉSOLU
> ### 8.2 Pipeline GitHub — Développement Continu
>
> ```yaml
> # .github/workflows/claude-full-pipeline.yml
> name: Pipeline Complet Claude Code
>
> on:
> push:
> branches: [main]
> pull_request:
> branches: [main, develop]
>
> jobs:
> # Review automatique des PRs
> claude-review:
> runs-on: ubuntu-latest
> if: github.event_name == 'pull_request'
> steps:
> - uses: anthropics/claude-code-action@v1
> with:
> anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
> prompt: |
> Revue complète : sécurité (OWASP Top 10), performance,
> maintenabilité, couverture de tests. Bloquer si CRITIQUE.
>
> # Audit de sécurité sur les pushes vers main
> security-audit:
> runs-on: ubuntu-latest
> if: github.ref == 'refs/heads/main'
> steps:
> - uses: anthropics/claude-code-action@v1
> with:
> anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
> prompt: |
> Scanner les nouveaux fichiers pour des vulnérabilités.
> Créer une issue GitHub si CVE score >= 7.
>
> # Mise à jour automatique de la documentation
> doc-update:
> runs-on: ubuntu-latest
> if: github.ref == 'refs/heads/main'
> steps:
> - uses: anthropics/claude-code-action@v1
> with:
> anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
> prompt: |
> Analyser les fichiers modifiés dans ce commit.
> Mettre à jour la documentation correspondante.
> Créer une PR si des mises à jour sont nécessaires.
### 8.3 Pipeline Vercel — Déploiement Piloté par l'IA

```bash
# Script de déploiement Vercel géré par un agent
deploy_to_vercel() {
 local PROJECT_DIR=$1
 local ENV=$2 # "production" ou "preview"

 cd "$PROJECT_DIR"

 # 1. Build de vérification
 if ! npm run build 2>&1 | tee /tmp/build-output.txt; then
 echo "Build échoué. Déploiement annulé." >&2
 return 1
 fi

 # 2. Tests de régression rapides
 if ! npm run test:ci --silent; then
 echo "Tests échoués. Déploiement annulé." >&2
 return 1
 fi

 # 3. Déploiement Vercel (token obligatoire pour VPS headless)
 VERCEL_TOKEN=$(grep '^VERCEL_TOKEN=' .env.local | cut -d= -f2)
 VERCEL_TEAM=$(grep '^VERCEL_TEAM=' .env.local | cut -d= -f2)

 if [ "$ENV" = "production" ]; then
 npx vercel --prod --yes \
 --token "$VERCEL_TOKEN" \
 --scope "$VERCEL_TEAM"
 else
 npx vercel --yes \
 --token "$VERCEL_TOKEN" \
 --scope "$VERCEL_TEAM"
 fi

 # 4. Vérification du déploiement
 DEPLOY_URL=$(npx vercel ls --token "$VERCEL_TOKEN" | head -2 | tail -1 | awk '{print $2}')
 HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DEPLOY_URL")

 if [ "$HTTP_STATUS" != "200" ]; then
 echo "Déploiement échoué. Status HTTP : $HTTP_STATUS" >&2
 return 1
 fi

 echo "Déployé avec succès : https://$DEPLOY_URL"
}
> ### 8.4 Pipeline Convex — Backend Serverless IA
>
> Convex est le backend temps réel de prédilection pour les applications IA. L'intégration avec Claude Code permet des mises à jour de schéma et de fonctions entièrement orchestrées :
>
> ```bash
> # Déploiement Convex géré par un agent
> deploy_convex() {
> local PROJECT_DIR=$1
>
> cd "$PROJECT_DIR"
>
> # Validation du schéma Convex
> if ! npx convex typecheck 2>/dev/null; then
> echo "Erreurs TypeScript dans les fonctions Convex." >&2
> return 1
> fi
>
> # Déploiement
> if ! npx convex deploy --yes 2>&1 | tee /tmp/convex-deploy.txt; then
> echo "Déploiement Convex échoué." >&2
> cat /tmp/convex-deploy.txt >&2
> return 1
> fi
>
> echo "Convex déployé avec succès."
> }
### 8.5 Pipeline Stripe — Automatisation Facturation

```python
# Agent de surveillance Stripe
# Déclenché par hook CronCreate ou /loop

import anthropic
import stripe

def surveiller_stripe():
 """
 Surveiller les événements Stripe anormaux :
 - Spike de remboursements
 - Tentatives de paiement échouées
 - Changements de plan suspects
 """
 client = anthropic.Anthropic()

 # Récupérer les événements Stripe des 24 dernières heures
 events = stripe.Event.list(
 limit=100,
 created={"gte": int(time.time()) - 86400}
 )

 # Analyser avec Claude
 response = client.messages.create(
 model="claude-opus-4-5",
 max_tokens=1000,
 messages=[{
 "role": "user",
 "content": f"""
 Analyser ces événements Stripe pour détecter des anomalies :
 {json.dumps([e.to_dict() for e in events.data], indent=2)}

 Identifier :
 1. Taux de remboursement anormal (>5%)
 2. Patterns de fraude potentiels
 3. Clients à risque d'attrition
 4. Opportunités d'upsell

 Recommandations actionnables pour chaque anomalie détectée.
 """
 }]
 )

 return response.content[0].text
> ### 8.6 Intégration Cal.com — Scheduling Automatisé
>
> ```python
> # Agent de gestion des rendez-vous
> # Via MCP Composio connecté à Cal.com
>
> def gerer_rendez_vous():
> """
> Analyser les rendez-vous de la semaine et :
> - Préparer des briefings pré-réunion
> - Envoyer des rappels personnalisés
> - Créer des notes de réunion post-call
> """
> # Via Claude avec MCP Cal.com
> response = claude.messages.create(
> model="claude-opus-4-5",
> messages=[{
> "role": "user",
> "content": """
> Récupérer tous les rendez-vous des 7 prochains jours.
> Pour chaque rendez-vous :
> 1. Créer un briefing avec l'historique du client (via CRM)
> 2. Préparer 3 points clés à aborder
> 3. Envoyer le briefing par email 1 heure avant
> 4. Après chaque réunion, créer un résumé et les actions à suivre
> """
> }],
> # Le MCP Cal.com et le MCP CRM sont disponibles dans la session
> )
---

## 9. Monitoring et Observabilité — Voir ce que Font Vos Agents

### 9.1 Le Système AISB Nerve — Tracking Centralisé

AISB Nerve est le registre central qui trace l'activité de tous les agents en temps réel. Chaque agent actif s'y enregistre et émet des mises à jour régulières :

```bash
# Enregistrer un agent au démarrage
aisb-nerve register "oracle-Kommu" \
 --type "oracle" \
 --project "Kommu" \
 --task "Fix Linear KOM-42"

# Émettre une mise à jour de progression
aisb-nerve progress emit \
 --session "oracle-Kommu" \
 --pct 45 \
 --status "Implémentation du fix en cours"

# Signaler la complétion
aisb-nerve complète \
 --session "oracle-Kommu" \
 --status "DONE" \
 --summary "Fix KOM-42 appliqué, build passé, déployé"

# Désenregistrer à la fin
aisb-nerve deregister "oracle-Kommu"

# Vue d'ensemble de tous les agents actifs
aisb-nerve status
> ### 9.2 Dashboard de Monitoring Next.js + Convex + Clerk
>
> Le dashboard Agentik Monitor illustre comment construire un centre de contrôle pour un système multi-agents :
Architecture Dashboard :

┌─────────────────────────────────────────────────────────┐
│ AGENTIK MONITOR │
│ dashboard.agentik-os.com │
├─────────────────────────────────────────────────────────┤
│ │
│ [Vue Oracles Actifs] [Sessions Workers] │
│ ┌──────────────┐ ┌──────────────┐ │
│ │oracle-Kommu │ │Kommu-1 │ │
│ │oracle-Causio │ │Causio-2 │ │
│ │oracle-AgOS │ │AgOS-1 ⏳ │ │
│ └──────────────┘ └──────────────┘ │
│ │
│ [Heartbeats en Temps Réel] │
│ oracle-Kommu : ████████████ 30s ago ALIVE │
│ oracle-Causio : ████████████ 15s ago ALIVE │
│ │
│ [Pipeline des Résultats] │
│ 13:42 - Kommu: Linear KOM-42 résolu │
│ 13:38 - Causio: Feature X déployée │
│ 13:25 - AgOS: SEO audit complété │
│ │
│ [Métriques Système] │
│ CPU: 23% | RAM: 4.2GB | Sessions: 3 │
│ Agents actifs: 7 | Uptime: 14j 6h 23m │
└─────────────────────────────────────────────────────────┘
> **Stack technique :**
> - **Frontend :** Next.js 16 (App Router) + React 19 + Tailwind CSS v4
> - **Backend :** Convex (temps réel, serverless)
> - **Auth :** Clerk (multi-tenant, B2B)
> - **Déploiement :** Vercel
>
> ```typescript
> // convex/agents.ts — Schema Convex pour le tracking des agents
> import { defineTable, defineSchema } from "convex/server";
> import { v } from "convex/values";
>
> export default defineSchema({
> agentSessions: defineTable({
> sessionName: v.string(),
> type: v.union(v.literal("oracle"), v.literal("worker"),
> v.literal("aisb"), v.literal("specialist")),
> project: v.string(),
> task: v.string(),
> status: v.union(v.literal("active"), v.literal("idle"),
> v.literal("completed"), v.literal("failed")),
> progressPct: v.number(),
> lastHeartbeat: v.number(), // Unix timestamp
> startedAt: v.number(),
> completedAt: v.optional(v.number()),
> result: v.optional(v.string()),
> }).index("by_project", ["project"]).index("by_status", ["status"]),
>
> auditLog: defineTable({
> timestamp: v.number(),
> actor: v.string(),
> action: v.string(),
> project: v.string(),
> details: v.string(),
> durationMs: v.optional(v.number()),
> }).index("by_project", ["project"]).index("by_timestamp", ["timestamp"]),
> });
### 9.3 Alerting Telegram — Notification Intelligente

Le système d'alerting Telegram d'AISB illustre un pattern de notification intelligent qui évite le spam tout en garantissant que les alertes critiques sont vues :

```python
# aisb/reporting.py — Formatage et envoi des rapports

def format_oracle_report(project: str, status: str, summary: str,
 changes: list, next_steps: list) -> str:
 """
 Formatter un rapport Oracle au format Telegram HTML (Design C).
 """
 icon = "" if status == "DONE" else ""
 date = datetime.utcnow().strftime("%Y-%m-%d · %H:%M UTC")

 changes_text = "\n".join([f"• {c}" for c in changes])
 next_text = "\n".join([f"• {n}" for n in next_steps])

 return f"""<b>{icon} AISB › {project} Terminé</b>
<code>{date} · oracle-{project}</code>

<blockquote>{summary}</blockquote>

<blockquote> Modifications
{changes_text}</blockquote>

<blockquote> Prochaines Étapes
{next_text}</blockquote>"""


def send_telegram_alert(bot_token: str, chat_id: str,
 message: str, parse_mode: str = "HTML") -> dict:
 """Envoyer une alerte Telegram avec gestion des erreurs."""
 url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
 payload = {
 "chat_id": chat_id,
 "text": message,
 "parse_mode": parse_mode,
 "disable_web_page_preview": True
 }

 response = requests.post(url, json=payload, timeout=10)
 response.raise_for_status()

 result = response.json()
 # Tracker le message_id pour le routing des réponses
 return {
 "message_id": result["result"]["message_id"],
 "project": project
 }
> ### 9.4 Audit Trail — Journalisation Complète
>
> Chaque action significative du système est journalisée dans un format JSONL append-only pour la traçabilité et la conformité :
>
> ```bash
> # Format du trail d'audit
> # ~/.aisb/audit/YYYY-MM-DD.jsonl
>
> {
> "timestamp": "2026-04-06T10:30:00Z",
> "actor": "oracle-Kommu",
> "action": "dispatch_worker",
> "project": "Kommu",
> "details": "Dispatché Kommu-1 pour fix Linear KOM-42",
> "duration_ms": null,
> "session_id": "tmux:Kommu-1"
> }
> {
> "timestamp": "2026-04-06T10:45:22Z",
> "actor": "Kommu-1",
> "action": "complète",
> "project": "Kommu",
> "details": "Fix KOM-42 appliqué. Build: PASS. Tests: 47/47.",
> "duration_ms": 922000,
> "session_id": "tmux:Kommu-1"
> }
>
> # Consultation du trail
> ~/.aisb/bin/aisb-audit Kommu --date 2026-04-06
> ~/.aisb/bin/aisb-audit --all --since 7d --format csv
### 9.5 SMITH — Le Moteur d'Apprentissage Automatique

SMITH est l'agent d'amélioration continue du système. Il analyse les patterns des tâches complétées et suggère des évolutions pour améliorer les performances :

```bash
# Enregistrer un apprentissage après chaque tâche
smith learn "Pattern : Les bugs d'auth Clerk sont souvent causés par
 des cookies expirés. Toujours vérifier le middleware en premier." \
 "auth"

# Lancer un cycle d'évolution complet
smith evolve # Analyse les apprentissages et génère des améliorations

# Consulter les patterns appris
smith patterns --category auth
smith patterns --category deployment

# Suggestions d'amélioration
smith suggest # Top 5 améliorations recommandées par l'IA

# Stockage : ~/.aisb/smith/learnings.jsonl
> ---
>
> ## 10. Pipelines d'Automatisation — Les Usines à Valeur
>
> ### 10.1 Pipeline Blog IA Complet — De l'Idée à la Publication
>
> Ce pipeline illustre comment automatiser entièrement la production de contenu de haute qualité :
PHASE 1 : GÉNÉRATION DU SUJET
├── Agent NIOBE : recherche des tendances du secteur
│ └── WebSearch × 4 angles + cross-référencement
├── Agent de stratégie : sélectionne le sujet optimal
│ └── Scoring : SEO potential × brand fit × novelty
└── Output : brief détaillé avec angle, mots-clés, structure

PHASE 2 : RÉDACTION
├── Agent blog-researcher : recherche approfondie
│ └── 10+ sources Tier 1-2, data récente, exemples concrets
├── Agent blog-writer : rédaction (~2500 mots)
│ └── Ton de marque, structure SEO, CTA intégrés
└── Agent blog-reviewer : révision critique
 └── Exactitude factuelle, cohérence, qualité prose

PHASE 3 : SEO & MÉDIAS
├── Agent seo-content : optimisation méta + keywords
│ └── Title tag, meta description, schema.org
├── Agent image-generator : génération image hero
│ └── Gemini Imagen 4 avec style guide Caffeine
└── Agent seo-schema : markup Article JSON-LD

PHASE 4 : PUBLICATION
├── Agent blog-publisher : push vers CMS (Next.js MDX)
├── Agent social-media : adaptation pour chaque plateforme
│ ├── LinkedIn : article long format (1500 mots)
│ ├── Twitter/X : thread (9 tweets, hook viral)
│ └── Reddit : post natif par subreddit cible
└── Agent analytics : tracking UTM + monitoring 48h

DURÉE TOTALE : 15-25 minutes
FRÉQUENCE : Quotidienne ou à la demande
> **Script d'automatisation complète :**
>
> ```bash
> #!/bin/bash
> # auto-publish.sh — Pipeline blog complet
>
> TOPIC=${1:-"tendances-ia-entreprise"}
> DATE=$(date +%Y-%m-%d)
> SLUG="${DATE}-${TOPIC}"
>
> echo "==> Démarrage pipeline blog : $SLUG"
>
> # Phase 1 : Génération
> claude --dangerously-skip-permissions --print \
> --system "Tu es un générateur de brief de contenu IA..." \
> --user "Générer un brief pour : $TOPIC" \
> > /tmp/brief-${SLUG}.md
>
> # Phase 2 : Rédaction (agent parallèle)
> ~/.aisb/lib/dispatch-to-session.sh "blog-${DATE}" \
> "/team Rédiger un article complet sur $TOPIC en suivant le brief dans /tmp/brief-${SLUG}.md.
> Output : src/content/blog/${SLUG}.mdx avec frontmatter SEO complet." \
> /home/hacker/VibeCoding/work/agentik-os-site
>
> # Phase 3 : Monitoring et publication
> ./scripts/monitor-and-publish.sh "blog-${DATE}" "$SLUG"
> ### 10.2 Pipeline Code → Review → Test → Deploy

> DÉCLENCHÉ PAR : merge sur 'develop' ou commande manuelle
>
> ÉTAPE 1 — CODE REVIEW (Agent SERAPH)
> ├── Audit sécurité : OWASP Top 10, injection, secrets
> ├── Audit qualité : TypeScript strict, couverture tests
> ├── Audit performance : N+1 queries, bundle size
> └── Verdict : PASS (82/100+) → continuer | FAIL → reporter
>
> ÉTAPE 2 — TESTS (Agent test-automator)
> ├── Tests unitaires : npm run test:unit
> ├── Tests d'intégration : npm run test:integration
> ├── Tests E2E : Playwright sur les flows critiques
> │ └── Login, paiement, dashboard principal
> └── Rapport : X/Y tests passés, coverage X%
>
> ÉTAPE 3 — BUILD (Agent deployment-engineer)
> ├── npm run build (TypeScript strict, 0 erreurs)
> ├── npx convex deploy (si backend modifié)
> └── Bundle analysis : vérification de la taille
>
> ÉTAPE 4 — DEPLOY (Agent deployment-engineer)
> ├── Preview deploy sur Vercel (URL unique)
> ├── Smoke tests sur preview URL
> │ └── HTTP 200, pas d'erreurs JS console
> └── Production deploy si smoke tests OK
>
> ÉTAPE 5 — VÉRIFICATION POST-DEPLOY
> ├── Playwright sur prod URL : flows critiques
> ├── Monitoring 15 minutes (erreurs 500, latence)
> └── Notification Telegram : Déployé + URL prod
>
> DURÉE TOTALE : 8-15 minutes
### 10.3 Pipeline de Scanning Sécurité

```bash
#!/bin/bash
# security-scan-pipeline.sh — Scan complet d'un domaine

TARGET=$1
OUTPUT_DIR="/home/hacker/VibeCoding/work/hacks/targets/${TARGET}"
DATE=$(date +%Y-%m-%d)

mkdir -p "$OUTPUT_DIR"

echo "==> Phase 1 : Reconnaissance"
# Sous-domaines
subfinder -d "$TARGET" -o "$OUTPUT_DIR/subdomains.txt" -silent

# DNS
dnsx -l "$OUTPUT_DIR/subdomains.txt" -a -aaaa -cname \
 -o "$OUTPUT_DIR/dns.json" -json -silent

# Ports ouverts
nmap -iL "$OUTPUT_DIR/subdomains.txt" \
 -p 80,443,8080,8443,3000,8000 \
 -oJ "$OUTPUT_DIR/ports.json" -T4

echo "==> Phase 2 : Scanning Vulnérabilités"
# Nuclei avec templates critiques
nuclei -l "$OUTPUT_DIR/subdomains.txt" \
 -t cves/ -t exposures/ -t misconfiguration/ \
 -severity critical,high \
 -o "$OUTPUT_DIR/nuclei-findings.txt" \
 -silent

echo "==> Phase 3 : Analyse IA des Résultats"
claude --dangerously-skip-permissions --print \
 --system "Tu es un expert en cybersécurité. Analyse ces résultats de scan." \
 --user "$(cat $OUTPUT_DIR/nuclei-findings.txt)" \
 > "$OUTPUT_DIR/ai-analysis.md"

echo "==> Phase 4 : Génération du Rapport"
generate-pdf --file "$OUTPUT_DIR/ai-analysis.md" \
 --title "Rapport Sécurité : $TARGET" \
 --send

echo "==> Scan complet. Rapport envoyé via Telegram."
> ### 10.4 Pipeline Marketing Automation
DÉCLENCHEURS :
- Nouveau lead entrant (webhook Stripe / Cal.com)
- Abonnement expiré (Stripe webhook)
- Inactivité > 7 jours (cron quotidien)

FLOW POUR NOUVEAU LEAD :
├── Agent CRM : créer fiche prospect dans HubSpot
├── Agent personalisation : analyser profil LinkedIn + site web
├── Agent email-copywriter : rédiger email d'onboarding personnalisé
│ └── Ton adapté au secteur, références pertinentes
├── Agent calendly : proposer 3 créneaux disponibles
└── Agent slack : notifier l'équipe commerciale

FLOW POUR ABONNEMENT EXPIRÉ :
├── Agent analytics : analyser l'utilisation (features utilisées, fréquence)
├── Agent segmentation : classifier (churned / at-risk / pause)
├── Agent email-copywriter : win-back email selon segment
│ ├── Churned : offre de retour -20% 48h
│ ├── At-risk : appel découverte proposé
│ └── Pause : reactivation simple
└── Agent crm : mettre à jour statut HubSpot

MÉTRIQUES SUIVIES (Dashboard) :
- Taux d'ouverture des emails IA vs emails manuels
- Conversion lead → client
- Churn rate avant/après automation
- ROI des séquences automatisées

---

## Conclusion — La Feuille de Route du CAIO pour l'Orchestration IA

### Maturité Progressive — 4 Niveaux

**Niveau 1 — Assisté (0-3 mois)**
Un seul agent Claude Code par tâche. L'humain valide chaque étape. Les hooks de base sont en place (logging, blocage des commandes dangereuses). Pas de scheduling automatique.

*Exemples : agent de revue de code, agent de rédaction de blog, agent d'analyse concurrentielle.*

**Niveau 2 — Semi-Autonome (3-6 mois)**
Équipes de 3-5 agents sur des projets complexes. Scheduling quotidien pour les rapports et audits de routine. Premier pipeline automatisé (blog ou CI/CD). Oracle unique par projet.

*Exemples : /team pour les tickets Linear, pipeline blog automatisé, audit de sécurité hebdomadaire.*

**Niveau 3 — Autonome (6-12 mois)**
Architecture AISB complète avec plusieurs Oracles en parallèle. God Mode pour les missions multi-heures sans supervision. Dashboard de monitoring en production. Intégration MCP avec 5-10 systèmes métiers.

*Exemples : gestion autonome de 3-5 projets simultanément, escalade automatique vers Telegram.*

**Niveau 4 — IA Enterprise (12+ mois)**
281 agents spécialisés couvrant tous les domaines. Scheduling cloud pour les tâches critiques 24/7. SMITH en production pour l'auto-amélioration du système. Architecture multi-tenant pour plusieurs projets clients.

*Exemples : équivalent Agentik OS — 11 projets clients gérés autonomement.*

### Les 10 Principes du CAIO Orchestrateur

1. **Séparation des responsabilités.** Aucun agent ne fait tout. Planifier, exécuter, auditer, et apprendre sont des rôles distincts.

2. **Hiérarchie stricte.** Les messages montent et descendent dans la chaîne. Pas de sauts de niveaux.

3. **Vérification avant completion.** Jamais de "c'est fait" sans preuve. Build = 0 erreurs, tests passés, déploiement vérifié.

4. **Propriété des fichiers.** Dans un système multi-agents, chaque fichier appartient à un seul agent. Pas de conflits.

5. **Hooks pour la gouvernance.** Toute action critique passe par un hook de validation. L'IA n'est jamais sans garde-fous.

6. **MCP pour l'intégration.** Les systèmes métiers ne s'interrogent pas directement. MCP est le protocole universel.

7. **Scheduling pour la continuité.** Les tâches récurrentes ne dépendent pas de la présence humaine.

8. **Logs pour la conformité.** Chaque action est tracée en JSONL immuable pour l'audit et la régulation.

9. **Alerting intelligent.** Les notifications Telegram/Slack ne polluent pas. Elles alertent sur les anomalies réelles.

10. **Apprentissage continu.** SMITH analyse les patterns et améliore le système. Chaque tâche complétée rend le suivant meilleur.

---

*Ce document constitue le module technique avancé du programme de formation CAIO d'Agentik OS. Il est basé sur l'architecture de production opérationnelle depuis 2026 et les documentation officielles Claude Code (code.claude.com). Les exemples de code sont tirés du système réel.*

---

**Sources et Références**

- Documentation officielle Claude Code Agent Teams : code.claude.com/docs/en/agent-teams
- Documentation Hooks Claude Code : code.claude.com/docs/en/hooks
- Documentation Sub-Agents Claude Code : code.claude.com/docs/en/sub-agents
- Documentation Scheduled Tasks : code.claude.com/docs/en/web-scheduled-tasks
- Composio MCP — 500+ intégrations : composio.dev
- Architecture AISB d'Agentik OS : ~/.aisb/docs/ARCHITECTURE.md
- Orchestration AISB : ~/.aisb/docs/ORCHESTRATION.md
