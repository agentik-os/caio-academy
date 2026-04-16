---
title: "AISB — Omega Full System Setup"
summary: "La formation ultime pour comprendre et reproduire l'architecture complete d'AISB (AI Super Brain) : le systeme autonome d'orchestration IA qui permet a un seul fondateur de gerer 11+ projets simultanement via Telegram, avec 281 agents et 4 niveaux d'architecture."
track: aisb
number: "T4-01"
duration: "20-25h"
audience: "Developpeurs, CTOs, fondateurs tech qui veulent construire leur propre systeme d'orchestration IA autonome"
---

# AISB — Omega Full System Setup

AISB (AI Super Brain) est le systeme autonome d'orchestration IA le plus avance jamais construit par un solo founder. Un message Telegram, et 281 agents se coordonnent pour analyser, coder, tester, auditer, deployer et rapporter — sans intervention humaine. Ce module vous apprend a comprendre chaque couche, puis a construire votre propre version.

---

## Objectif du module

A l'issue de ce module, vous aurez une comprehension totale des 4 niveaux d'architecture AISB, la capacite de reproduire le systeme de zero sur un VPS, et les competences pour orchestrer des dizaines de projets simultanement via un bot Telegram connecte a Claude Code.

---

## Lecon 1 — Vue d'ensemble : les 4 niveaux d'AISB

### Ce que vous allez apprendre

L'architecture complete du systeme AISB en 4 niveaux hierarchiques. Pourquoi cette architecture existe, comment chaque niveau communique avec les autres, et ce qui differencie AISB de tous les autres systemes multi-agents.

### Contenu detaille

**Les 4 niveaux d'architecture AISB :**

```
┌─────────────────────────────────────────────────────────┐
│  NIVEAU 1 — AISB (AI Super Brain)                       │
│  Bot Telegram → Point d'entree unique                   │
│  Enrichissement de prompt, classification, dispatch     │
│  1 instance permanente                                  │
├─────────────────────────────────────────────────────────┤
│  NIVEAU 2 — ORACLES (Chefs de projet)                   │
│  1 Oracle par mission → decompose, coordonne, verifie   │
│  Sessions tmux ephemeres ou persistantes                │
│  Parallelisme : multi-oracles par projet possible       │
├─────────────────────────────────────────────────────────┤
│  NIVEAU 3 — WORKERS (Executants)                        │
│  1 Worker par tache atomique → code, fixe, audite       │
│  Sessions tmux enfants de l'Oracle                      │
│  Sequentiels (code) ou paralleles (audits)              │
├─────────────────────────────────────────────────────────┤
│  NIVEAU 4 — AGENTS & SKILLS (Specialistes)              │
│  281 agents dans ~/.claude/agents/                      │
│  130+ skills dans ~/.claude/commands/                   │
│  Invocables par n'importe quel Worker via Skill tool    │
└─────────────────────────────────────────────────────────┘
```

**Pourquoi 4 niveaux ?**

| Probleme | Solution apportee par le niveau |
|----------|-------------------------------|
| "Je ne veux pas surveiller chaque tache" | AISB (Niv. 1) recoit un message et gere tout |
| "Les missions complexes ont besoin d'un chef" | Oracle (Niv. 2) decompose et coordonne |
| "Chaque tache a besoin d'un contexte frais" | Worker (Niv. 3) = contexte isole et propre |
| "Il faut des competences specifiques" | Agents/Skills (Niv. 4) = expertise a la demande |

**Ce qui differencie AISB des autres systemes multi-agents :**

| Critere | CrewAI / AutoGPT | AISB |
|---------|------------------|------|
| Point d'entree | Script Python | Message Telegram |
| Orchestration | Sequentielle ou simple | Hierarchique 4 niveaux |
| Persistance | En memoire (perd tout au restart) | Sessions tmux + fichiers JSON |
| Audit qualite | Aucun | 16 audits forensiques automatiques |
| Nombre d'agents | 3-10 | 281 |
| Projets simultanes | 1 | 11+ |
| Autonomie | Limitee (boucle infinie frequente) | Controlee (3 Lois, done.json) |
| Communication | stdout/stderr | Fichiers JSON + tmux + Telegram |

**Le principe fondamental : separation des responsabilites**

Chaque niveau parle UNIQUEMENT au niveau adjacent. Jamais de communication N1→N3 directe.

```
AISB ←→ Oracle ←→ Worker ←→ Agent/Skill
  ↕         ↕          ↕
Telegram  .done.json  Skill tool
```

### Exercice pratique

Dessinez l'architecture de votre propre systeme a 4 niveaux. Identifiez : votre point d'entree (Telegram, Slack, Discord ?), combien d'oracles simultanes vous aurez besoin, et quels types de workers seront les plus utilises dans votre contexte.

---

## Lecon 2 — La chaine complete d'un message : de Telegram au code

### Ce que vous allez apprendre

Le parcours complet d'un message utilisateur, depuis l'envoi sur Telegram jusqu'au code deploye en production. Chaque etape, chaque fichier, chaque decision automatique documentee.

### Contenu detaille

**Le parcours d'un message — exemple reel :**

```
Gareth (Telegram) : "Fix le bug d'auth sur Causio — les utilisateurs
                     ne peuvent pas se connecter avec Google"
```

**Etape 1 — Reception par AISB (bot Python)**

```python
# ~/VibeCoding/work/agentik-monitor/bot/main.py
@bot.message_handler(func=lambda m: True)
async def handle_message(message):
    user_id = message.from_user.id
    text = message.text
    
    # Enrichissement du prompt
    enriched = await enrich_prompt(text, user_id)
    # → Ajoute : projet detecte, fichiers recents, contexte utilisateur
    
    # Classification
    complexity = classify(enriched)  # SIMPLE | MEDIUM | COMPLEX | EPIC
    
    # Dispatch
    if complexity == "SIMPLE":
        response = await handle_directly(enriched)
    else:
        session = await dispatch_to_oracle(enriched, project="Causio")
        await bot.reply_to(message, f"Oracle dispatche : {session}")
```

**Etape 2 — Dispatch vers un Oracle (tmux)**

```bash
#!/bin/bash
# ~/.claude/lib/dispatch-to-session.sh
PROJECT="Causio"
SESSION="oracle-Causio-1"

# Creer la session tmux
tmux new-session -d -s "$SESSION" -x 220 -y 50

# Lancer Claude Code avec le prompt enrichi
tmux send-keys -t "$SESSION" "claude --model opus \
  --prompt-file /tmp/oracle-prompt-$SESSION.md" Enter
```

**Etape 3 — L'Oracle decompose la mission**

```
Oracle recoit :
  "Fix le bug d'auth Google sur Causio"
  + contexte : Clerk auth, Next.js 15, Convex backend

Oracle analyse :
  1. Classification : MEDIUM (un seul bug, scope connu)
  2. Fichiers probables : src/app/auth/*, middleware.ts
  3. Plan : 1 Worker recherche → 1 Worker fix → 1 Worker audit

Oracle dispatche Worker 1 :
  Session : Causio-fix-auth-research
  Mission : "Identifie la cause du bug Google OAuth dans Causio.
             Fichiers : src/app/auth/, middleware.ts
             DONE CRITERIA : Root cause identifiee avec fichier:ligne
             VERIFY : cat /tmp/causio-auth-research.md | grep 'ROOT CAUSE'"
```

**Etape 4 — Worker execute**

```
Worker 1 (Research) :
  → Lit src/app/auth/google/callback/route.ts
  → Identifie : ligne 42, redirect_uri incorrect en prod
  → Ecrit findings dans /tmp/causio-auth-research.md
  → Ecrit .done.json : status=done_clean

Oracle lit les findings, synthetise, dispatche Worker 2 :
  Session : Causio-fix-auth-implement
  Mission : "Fix src/app/auth/google/callback/route.ts:42
             Le redirect_uri utilise localhost au lieu de NEXT_PUBLIC_URL
             Change : redirect_uri = process.env.NEXT_PUBLIC_URL + '/auth/google/callback'
             DONE CRITERIA : npm run build exits 0
             VERIFY : npm run build 2>&1 | tail -1"

Worker 2 :
  → Edit le fichier
  → npm run build → OK
  → .done.json : status=done_clean
```

**Etape 5 — Oracle verifie, ship, notifie**

```
Oracle :
  → Verifie le build passe
  → Declenche le ship pipeline (git add, commit, push, deploy)
  → Attend le deploiement Vercel
  → Notifie AISB : "Bug auth Google fixe, deploye, en prod"

AISB → Telegram : "Fix deploye sur Causio. Le bug d'auth Google
                    etait un redirect_uri incorrect (localhost en prod).
                    Corrige dans route.ts:42. Build OK, deploye."
```

**Temps total : 8-15 minutes** (vs 1-3 heures manuellement)

### Exercice pratique

Tracez le parcours d'un message pour VOTRE cas d'usage. Definissez chaque etape : reception, enrichissement, classification, dispatch, execution, verification, notification. Identifiez les fichiers et scripts necessaires a chaque etape.

---

## Lecon 3 — Setup du bot AISB : Python, Claude SDK, Telegram API

### Ce que vous allez apprendre

Comment construire le bot Telegram qui sert de point d'entree a AISB. Configuration Python, integration du Claude SDK, gestion des messages, et enrichissement de prompt.

### Contenu detaille

**Stack technique du bot AISB :**

| Composant | Technologie | Role |
|-----------|------------|------|
| Bot framework | pyTelegramBotAPI (telebot) | Reception et envoi de messages |
| IA | Anthropic Claude SDK (Python) | Traitement des requetes simples |
| Orchestration | subprocess + tmux | Dispatch vers les sessions Claude Code |
| Persistance | JSON files + SQLite | Etat des oracles, memoire utilisateur |
| Monitoring | cron + health checks | Surveillance des sessions actives |

**Structure du projet bot :**

```
agentik-monitor/
├── bot/
│   ├── main.py              # Point d'entree du bot
│   ├── SOUL.md              # Identite et personnalite du bot
│   ├── MEMORY.md            # Memoire persistante utilisateur
│   ├── handlers/
│   │   ├── message.py       # Handler principal des messages
│   │   ├── commands.py      # /start, /status, /cancel
│   │   └── callbacks.py     # Boutons inline Telegram
│   ├── core/
│   │   ├── classifier.py    # Classification SIMPLE/MEDIUM/COMPLEX/EPIC
│   │   ├── enricher.py      # Enrichissement de prompt
│   │   ├── dispatcher.py    # Dispatch vers Oracle (tmux)
│   │   └── notifier.py      # Notifications retour Telegram
│   └── lib/
│       ├── claude_client.py  # Wrapper Claude SDK
│       ├── tmux_manager.py   # Gestion sessions tmux
│       └── state.py          # Gestion etat (JSON/SQLite)
├── .env                      # TELEGRAM_TOKEN, ANTHROPIC_API_KEY
└── requirements.txt
```

**Le classificateur de complexite :**

```python
# bot/core/classifier.py
import anthropic

client = anthropic.Anthropic()

CLASSIFICATION_PROMPT = """
Tu es ORACLE. Classifie cette tache :

SIMPLE : Lecture seule, verification rapide, question simple
MEDIUM : Modification de code, bug fix, feature petit scope
COMPLEX : Multi-domaine, multi-fichiers, 30min+, audit
EPIC : Cross-projet, heures de travail, build complet

Tache : {task}
Contexte projet : {project_context}

Reponds avec UNIQUEMENT un mot : SIMPLE, MEDIUM, COMPLEX, ou EPIC
"""

def classify(task: str, project: str = None) -> str:
    context = get_project_context(project) if project else ""
    
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=10,
        messages=[{
            "role": "user",
            "content": CLASSIFICATION_PROMPT.format(
                task=task,
                project_context=context
            )
        }]
    )
    
    result = response.content[0].text.strip().upper()
    return result if result in ["SIMPLE", "MEDIUM", "COMPLEX", "EPIC"] else "MEDIUM"
```

**L'enrichisseur de prompt :**

```python
# bot/core/enricher.py
def enrich_prompt(raw_message: str, user_id: int) -> str:
    """Ajoute le contexte necessaire au message brut."""
    
    # 1. Detecter le projet mentionne
    project = detect_project(raw_message)
    
    # 2. Charger le contexte projet
    project_dir = get_project_dir(project)
    recent_files = get_recent_modified_files(project_dir, limit=10)
    
    # 3. Charger la memoire utilisateur
    user_prefs = load_user_memory(user_id)
    
    # 4. Construire le prompt enrichi
    enriched = f"""
## Mission
{raw_message}

## Projet
{project} — {project_dir}

## Fichiers recemment modifies
{chr(10).join(recent_files)}

## Contexte utilisateur
{user_prefs}

## Regles
- Autonomie totale (3eme Loi)
- Build doit passer avant tout push
- Notification Telegram a la fin
"""
    return enriched
```

**Le dispatcher vers tmux :**

```python
# bot/core/dispatcher.py
import subprocess

def dispatch_to_oracle(enriched_prompt: str, project: str) -> str:
    """Cree une session tmux Oracle et lance Claude Code."""
    
    # Generer un nom de session unique
    session_name = f"oracle-{project}-{get_next_id(project)}"
    
    # Ecrire le prompt dans un fichier temporaire
    prompt_file = f"/tmp/oracle-prompt-{session_name}.md"
    with open(prompt_file, "w") as f:
        f.write(enriched_prompt)
    
    # Creer la session tmux
    subprocess.run([
        "tmux", "new-session", "-d",
        "-s", session_name,
        "-x", "220", "-y", "50"
    ])
    
    # Lancer Claude Code
    cmd = f"claude --model opus --prompt-file {prompt_file}"
    subprocess.run([
        "tmux", "send-keys", "-t", session_name,
        cmd, "Enter"
    ])
    
    # Enregistrer l'oracle dans le registre
    register_oracle(session_name, project, enriched_prompt)
    
    return session_name
```

### Exercice pratique

Creez un bot Telegram minimal qui recoit un message, le classifie (SIMPLE/MEDIUM/COMPLEX/EPIC), et pour les taches SIMPLE, repond directement via Claude. Pour les taches MEDIUM+, affichez un message "Oracle dispatche" (on implementera le dispatch reel dans la Lecon 4).

---

## Lecon 4 — Oracle et dispatch : tmux, sessions a la demande, file ownership

### Ce que vous allez apprendre

Comment fonctionne le systeme Oracle : creation de sessions tmux a la demande, gestion du file ownership pour eviter les conflits, multi-oracle sur un meme projet, et le cycle de vie complet d'un Oracle.

### Contenu detaille

**Le cycle de vie d'un Oracle :**

```
CREATION          EXECUTION             SHIP              CLOSE
   │                  │                   │                 │
   ▼                  ▼                   ▼                 ▼
dispatch →      decompose →         build OK? →      .done.json →
tmux new →      spawn workers →     git commit →     AISB patrol →
register →      coordinate →        git push →       grace window →
                verify →            deploy →         tmux kill
                                    verify prod
```

**Le registre Oracle (JSON) :**

```json
// ~/.aisb/oracles/Causio-1.json
{
  "id": "Causio-1",
  "session": "oracle-Causio-1",
  "project": "Causio",
  "project_dir": "~/VibeCoding/work/Causio",
  "status": "active",
  "started_at": "2026-04-16T10:00:00Z",
  "mission": "Fix le bug d'auth Google",
  "files_owned": [
    "src/app/auth/google/callback/route.ts",
    "middleware.ts"
  ],
  "workers": [
    {"session": "Causio-fix-auth-research", "status": "done_clean"},
    {"session": "Causio-fix-auth-implement", "status": "active"}
  ],
  "lifecycle": "ephemeral"
}
```

**File ownership — eviter les conflits entre Oracles :**

```
Oracle 1 (Causio-1) :
  files_owned: ["src/app/auth/*", "middleware.ts"]

Oracle 2 (Causio-2) :
  files_owned: ["src/components/dashboard/*"]

Si Oracle 2 essaie de toucher middleware.ts → CONFLIT DETECTE
→ Oracle 2 doit attendre que Oracle 1 finisse
→ Ou negocier via le registre
```

**Le script dispatch-to-session.sh :**

```bash
#!/bin/bash
# ~/.claude/lib/dispatch-to-session.sh
# Usage: dispatch-to-session.sh <session-name> <prompt-file> [model]

SESSION="$1"
PROMPT_FILE="$2"
MODEL="${3:-opus}"

# Verifier si la session existe deja
if tmux has-session -t "$SESSION" 2>/dev/null; then
    echo "Session $SESSION existe deja"
    # Verifier si elle est idle
    if ~/.claude/lib/worker-alive-check.sh "$SESSION"; then
        echo "Session active, envoi du message"
        tmux send-keys -t "$SESSION" "$(cat $PROMPT_FILE)" Enter
    else
        echo "Session idle, re-dispatch"
        tmux kill-session -t "$SESSION"
        tmux new-session -d -s "$SESSION" -x 220 -y 50
        tmux send-keys -t "$SESSION" \
            "claude --model $MODEL --prompt-file $PROMPT_FILE" Enter
    fi
else
    # Creer une nouvelle session
    tmux new-session -d -s "$SESSION" -x 220 -y 50
    tmux send-keys -t "$SESSION" \
        "claude --model $MODEL --prompt-file $PROMPT_FILE" Enter
fi

echo "Dispatched to $SESSION"
```

**Le worker-alive-check.sh :**

```bash
#!/bin/bash
# ~/.claude/lib/worker-alive-check.sh
# Exit 0 = safe to kill (idle/dead)
# Exit 1 = STILL WORKING, do NOT kill

SESSION="$1"

# Verifier si la session existe
if ! tmux has-session -t "$SESSION" 2>/dev/null; then
    exit 0  # Session n'existe pas = safe
fi

# Verifier l'activite CPU du processus
PANE_PID=$(tmux list-panes -t "$SESSION" -F '#{pane_pid}' 2>/dev/null)
if [ -z "$PANE_PID" ]; then
    exit 0
fi

# Verifier si Claude Code est actif (CPU > 1%)
CPU=$(ps -p "$PANE_PID" -o %cpu --no-headers 2>/dev/null | tr -d ' ')
if [ -z "$CPU" ] || (( $(echo "$CPU < 1.0" | bc -l) )); then
    exit 0  # Idle
fi

exit 1  # Still working
```

**Multi-oracle — travailler en parallele :**

```bash
# oracle-check : verifier la disponibilite
~/.claude/lib/oracle-check.sh Causio --available
# → "oracle-Causio-1" (si disponible)
# → "NEW" (si tous occupes, creer oracle-Causio-2)

# oracle-list : voir tous les oracles actifs
~/.claude/lib/oracle-list.sh
# oracle-Causio-1    active   "Fix auth Google"    2h15m
# oracle-DentistryGPT-1  active   "36 tickets Linear"  5h30m
# oracle-Kommu-1     idle     "Build page Kommu"   done
```

### Exercice pratique

Implementez le script `dispatch-to-session.sh` sur votre VPS. Testez-le avec une session tmux simple qui lance Claude Code avec un prompt de test. Ajoutez `worker-alive-check.sh` et verifiez qu'il detecte correctement les sessions actives vs idle.

---

## Lecon 5 — Le systeme de 281 agents : departements, skills et specialistes

### Ce que vous allez apprendre

L'organigramme complet des 281 agents, organises en departements avec une hierarchie C-Suite. Comment creer un agent, definir ses competences, et l'integrer dans l'ecosysteme.

### Contenu detaille

**L'organigramme Agentik OS :**

```
                          ┌─────────┐
                          │   CEO   │
                          │ /ceo    │
                          └────┬────┘
              ┌───────────────┼───────────────┐
         ┌────┴────┐    ┌────┴────┐    ┌────┴────┐
         │   CTO   │    │   CMO   │    │   CPO   │
         │  /cto   │    │  /cmo   │    │  /cpo   │
         └────┬────┘    └────┬────┘    └────┬────┘
              │              │              │
    ┌─────────┼──────┐   ┌──┼──────┐   ┌───┼───────┐
    │         │      │   │  │      │   │   │       │
 Dev Team  Quality  Sec  Content  Ads  Product  Analytics
 ~50       ~30     ~20  ~40     ~30   ~25      ~20
 agents    agents  agents agents agents agents  agents
```

**Les departements et leurs specialistes :**

| Departement | Chef | Nombre d'agents | Exemples de specialistes |
|-------------|------|-----------------|------------------------|
| **Development** | CTO | ~50 | react-specialist, nextjs-developer, convex-expert, database-architect |
| **Quality** | CTO | ~30 | 16 auditeurs forensiques (code, UX, flow, perf, sec...) |
| **Security** | CTO | ~20 | pentester, owasp-auditor, secret-scanner |
| **Content** | CMO | ~40 | seo-expert, blog-writer, copywriter, social-content |
| **Advertising** | CMO | ~30 | ads-strategist, creative-director, campaign-planner |
| **Product** | CPO | ~25 | ux-researcher, product-analyst, feature-designer |
| **Analytics** | CPO | ~20 | data-analyst, roi-calculator, ab-test-designer |
| **Design** | CTO | ~25 | ui-designer, motion-designer, brand-designer |
| **DevOps** | CTO | ~15 | deployer, vercel-expert, dns-manager |

**Anatomie d'un agent :**

```markdown
# ~/.claude/agents/react-specialist/CLAUDE.md

## Identity
You are a senior React specialist with 10+ years of experience.

## Expertise
- React 19+ (Server Components, Actions, use() hook)
- Next.js 15+ (App Router, RSC, Streaming)
- State management (Zustand, Jotai, React Query)
- Testing (Vitest, Playwright, React Testing Library)

## Rules
1. Always use Server Components by default
2. Client Components only when interactivity is required
3. Prefer composition over configuration
4. TypeScript strict mode mandatory

## Tools
- Read, Edit, Write, Bash, Grep, Glob
- Context7 for up-to-date documentation

## Output Format
- Code changes with explanations
- Build verification mandatory
- Git diff summary at the end
```

**Anatomie d'un skill :**

```markdown
# ~/.claude/commands/codeaudit.md

## Identity
CIA-grade deep code audit v3.

## Phases (23 total)
Phase 1: Phantom Detection (dead code, unused imports)
Phase 2: Dependency Dissection (outdated, vulnerable)
...
Phase 23: Final Scoring (/420, normalized /100)

## Scoring Matrix
| Phase | Weight | Max Score |
|-------|--------|-----------|
| Phantom Detection | 2x | 40 |
| Dependency Health | 3x | 60 |
...

## Invocation
Via Skill tool : /codeaudit --files=src/ --scope="auth module"
```

**Creer un nouvel agent :**

```bash
# 1. Creer le repertoire
mkdir -p ~/.claude/agents/mon-agent/

# 2. Creer le fichier CLAUDE.md
cat > ~/.claude/agents/mon-agent/CLAUDE.md << 'EOF'
## Identity
You are [role] specializing in [domain].

## Expertise
- [Competence 1]
- [Competence 2]

## Rules
1. [Regle 1]
2. [Regle 2]

## Output Format
[Format de sortie attendu]
EOF

# 3. Tester l'agent
claude --agent mon-agent "Test avec une tache simple"
```

### Exercice pratique

Creez 3 agents specialises pour vos besoins : un developpeur (adapte a votre stack), un auditeur qualite (avec grille de scoring), et un redacteur (avec votre tone of voice). Testez chacun avec une tache representive de votre quotidien.

---

## Lecon 6 — Le pipeline AISB : ROUTE → KEYMAKER → MORPHEUS → SERAPH → SMITH

### Ce que vous allez apprendre

Le pipeline complet d'execution d'AISB, inspire de la matrice. Chaque etape du pipeline, son role, et comment les 5 agents matriciels se coordonnent pour garantir la qualite.

### Contenu detaille

**Le pipeline AISB en 5 etapes :**

```
┌──────────┐    ┌───────────┐    ┌──────────┐    ┌────────┐    ┌───────┐
│  ROUTE   │ →  │ KEYMAKER  │ →  │ MORPHEUS │ →  │ SERAPH │ →  │ SMITH │
│ Classify │    │   Plan    │    │ Execute  │    │ Audit  │    │ Learn │
│ & Route  │    │ & Design  │    │ & Build  │    │& Verify│    │& Store│
└──────────┘    └───────────┘    └──────────┘    └────────┘    └───────┘
```

**ROUTE — Le classificateur intelligent :**

```python
def route(message: str) -> dict:
    """Classifie et route la tache."""
    
    classification = classify(message)  # SIMPLE/MEDIUM/COMPLEX/EPIC
    project = detect_project(message)
    intent = detect_intent(message)     # fix, build, audit, deploy, research
    
    routing = {
        "SIMPLE": {"handler": "direct", "agents": 0},
        "MEDIUM": {"handler": "single_oracle", "agents": 1},
        "COMPLEX": {"handler": "oracle_team", "agents": 3-5},
        "EPIC": {"handler": "multi_oracle", "agents": 5-15},
    }
    
    return {
        "classification": classification,
        "project": project,
        "intent": intent,
        "routing": routing[classification],
        "pipeline": ["KEYMAKER", "MORPHEUS", "SERAPH", "SMITH"]
    }
```

**KEYMAKER — L'architecte du plan :**

Le Keymaker decompose la mission en taches atomiques, chacune executable par un seul Worker dans un seul contexte.

```
Mission : "Ajouter un systeme de notifications en temps reel a Causio"

Keymaker decompose :
  Milestone 1 : Backend notifications
    Task 1.1 : Schema Convex (notifications table) → convex-expert
    Task 1.2 : Mutation createNotification → convex-expert
    Task 1.3 : Query getUnreadNotifications → convex-expert
  
  Milestone 2 : Frontend notifications
    Task 2.1 : NotificationBell component → react-specialist
    Task 2.2 : NotificationPanel dropdown → react-specialist
    Task 2.3 : Real-time subscription hook → react-specialist
  
  Milestone 3 : Integration et tests
    Task 3.1 : Integration backend ↔ frontend → fullstack
    Task 3.2 : Tests E2E → testing-specialist
  
  Milestone 4 : Audit et deploy
    Task 4.1 : Code audit → /codeaudit
    Task 4.2 : UX audit → /uiuxaudit
    Task 4.3 : Deploy → /push

Regle : Si une tache ne tient pas dans un contexte Claude Code (~200K tokens),
        elle doit etre re-decoupee.
```

**MORPHEUS — L'executeur :**

Morpheus dispatche les taches du plan Keymaker, une par une (code) ou en parallele (audits), en respectant les dependances.

```
Execution sequentielle (code) :
  Task 1.1 → build OK → Task 1.2 → build OK → Task 1.3 → build OK
  Task 2.1 → build OK → Task 2.2 → build OK → Task 2.3 → build OK

Execution parallele (audits) :
  Task 4.1 ──┐
  Task 4.2 ──┼── Tous en parallele
  Task 4.3 ──┘   (chacun dans sa session tmux)
```

**SERAPH — L'auditeur final :**

Seraph execute les audits forensiques et verifie que TOUT est correct avant le ship.

```
Audits SERAPH par type de mission :

| Type de mission | Audits obligatoires | Seuil minimum |
|-----------------|--------------------|--------------:|
| Bug fix         | codeaudit          | 80/100        |
| New feature     | codeaudit + uiuxaudit + flowaudit | 75/100 chacun |
| Refactoring     | codeaudit          | 85/100        |
| Full build      | les 16 audits      | 70/100 chacun |
| Linear tickets  | codeaudit + uiuxaudit + flowaudit + perfaudit | 80/100 chacun |
```

**SMITH — L'apprenant :**

Smith analyse les resultats de chaque mission et stocke les apprentissages pour ameliorer le systeme.

```python
def smith_learn(mission_report: dict):
    """Analyse une mission terminee et extrait les apprentissages."""
    
    learnings = {
        "project": mission_report["project"],
        "duration": mission_report["duration_sec"],
        "errors_encountered": extract_errors(mission_report),
        "patterns_detected": detect_patterns(mission_report),
        "improvements": suggest_improvements(mission_report),
    }
    
    # Stocker dans la memoire agent
    save_to_memory(f"~/.aisb/memory/project/{learnings['project']}/", learnings)
    
    # Mettre a jour les regles si necessaire
    if learnings["errors_encountered"]:
        update_rules(learnings)
```

### Exercice pratique

Implementez une version simplifiee du pipeline ROUTE → KEYMAKER. Ecrivez un classificateur qui detecte le type de tache et un decomposeur qui cree un plan en taches atomiques. Testez avec 3 missions de complexite differente.

---

## Lecon 7 — Les 3 Lois : runtime truth, research mindset, autonomous execution

### Ce que vous allez apprendre

Les 3 Lois fondamentales qui gouvernent le comportement de chaque agent dans AISB. Pourquoi elles existent, comment les implementer, et les incidents qui ont mene a leur creation.

### Contenu detaille

**Les 3 Lois d'Agentik OS :**

```
┌─────────────────────────────────────────────────────┐
│  1ere LOI — RUNTIME TRUTH                           │
│  "Le code ment. Les commentaires mentent.           │
│   Seul le runtime dit la verite."                   │
│                                                     │
│  → Toujours verifier avec des preuves concretes     │
│  → Logs > code, screenshots > descriptions          │
│  → Avant le 3eme changement sur un meme bug :       │
│    OBLIGATOIRE d'avoir des preuves runtime           │
├─────────────────────────────────────────────────────┤
│  2eme LOI — RESEARCH MINDSET                        │
│  "Etre un chercheur, pas un sycophante."            │
│                                                     │
│  → Challenger les hypotheses avant de coder          │
│  → Pousser back avec du raisonnement                │
│  → Trouver les causes racines, pas les symptomes    │
│  → Test de Popper : "Qu'est-ce qui falsifierait     │
│    ma conclusion ?"                                 │
├─────────────────────────────────────────────────────┤
│  3eme LOI — AUTONOMOUS EXECUTION                    │
│  "Challenger + DECIDER + Executer. JAMAIS attendre."│
│                                                     │
│  → Un agent qui pose une question et attend = casse │
│  → Detecter le probleme → Decider la meilleure      │
│    approche → Executer immediatement                │
│  → Le SEUL arret legal : .done.json                 │
└─────────────────────────────────────────────────────┘
```

**L'incident de la 3eme Loi (15 avril 2026) :**

Un Worker recoit la mission "Fix les 36 tickets Linear sur DentistryGPT". Il detecte correctement (2eme Loi) que 25 des tickets sont deja resolus et en attente de review manuelle. Au lieu de decider quoi faire et d'executer, il poste :

```
"Trois options :
1. Fixer les 11 restants et ignorer les 25
2. Fixer les 11 et verifier les 25
3. Tout reprendre de zero
Quelle option ?"
```

Et attend. Pendant 10+ minutes. Gareth ne regarde pas le tmux. Le systeme est bloque.

**La regle qui en decoule :**

```python
# Dans chaque prompt Worker, cette instruction est injectee :

AUTONOMY_RULE = """
INTERDIT dans les sessions Worker :
- "Quelle option ?" / "Confirmer ?" / "Dois-je continuer ?"
- Toute pause qui attend une reponse humaine

OBLIGATOIRE :
1. Detecter le probleme
2. Enoncer le probleme corrige (1-3 lignes)
3. Choisir la meilleure approche (votre recommandation gagne par defaut)
4. Executer immediatement
5. Rapporter APRES que le travail est fait

En cas de doute : DECIDER. Une mauvaise decision qui produit des preuves
vaut 100x mieux qu'une pause qui ne produit rien.
"""
```

**Implementation des 3 Lois dans les prompts agents :**

```markdown
# Template de prompt Worker (injecte automatiquement)

## Les 3 Lois (NON NEGOCIABLES)

### Loi 1 — Runtime Truth
Avant toute conclusion, observe le runtime :
- `npm run build` pour verifier les erreurs
- `console.log` / logs serveur pour le comportement reel
- Screenshots Playwright pour l'etat visuel
- NE JAMAIS faire confiance aux commentaires ou a la doc

### Loi 2 — Research Mindset
- Lis le code AVANT de modifier
- Forme une hypothese AVANT de coder
- Si l'approche du user est mauvaise, dis-le AVANT
- Chaque conclusion doit passer le test de Popper

### Loi 3 — Autonomous Execution
- Tu es dispatche. L'utilisateur ne regarde PAS.
- JAMAIS de question. JAMAIS d'attente.
- Detecte → Decide → Execute → Rapporte
- Seul arret legal : .done.json avec status
```

**Les defaults de decision (quand un Worker hesite) :**

| Situation | Default | Raisonnement |
|-----------|---------|-------------|
| Faire le vrai travail vs verifier l'existant | Faire le travail | Produit plus de valeur |
| Petit batch safe vs grand batch risque | Petit batch | Minimise les risques |
| Ma recommandation vs l'alternative | Ma recommandation | L'agent est l'expert |
| Logger + continuer vs pauser + demander | Logger + continuer | L'autonomie est non-negociable |

### Exercice pratique

Redigez les 3 Lois pour VOTRE systeme, adaptees a votre contexte. Creez un template de prompt Worker qui les injecte automatiquement. Testez avec un scenario ou l'agent devrait normalement poser une question — verifiez qu'il decide et execute au lieu d'attendre.

---

## Lecon 8 — Ship pipeline, done.json et close decision tree

### Ce que vous allez apprendre

Le pipeline de deploiement automatise (ship pipeline), le protocole de fin de mission (done.json), et l'arbre de decision qui determine quand fermer une session Oracle. Le systeme de freeze en cas d'echec de deploiement.

### Contenu detaille

**Le ship pipeline en 12 etapes :**

```
┌─ 1. npm run build (ou script projet) ─── FAIL → status=failed, EXIT
├─ 2. git add (fichiers declares dans files_owned) ─── extra file → ABORT
├─ 3. gitleaks detect --staged ─── secret detecte → ABORT + alerte
├─ 4. git diff --cached --check ─── whitespace → fix ou abort
├─ 5. git commit -m "conventional commit message"
├─ 6. flock ship-<project>.lock ─── serialise entre oracles
├─ 7. Check ship-<project>.frozen ─── frozen → ABORT + alerte
├─ 8. git pull --rebase ─── conflit → ABORT, garde le commit local
├─ 9. git push
├─ 10. Deploy (Vercel / script projet)  ─── FAIL → freeze + alerte
├─ 11. Poll deploy status (max 10min) ─── READY → OK ; ERROR → freeze
└─ 12. Write .done.json avec commit, URL, status
```

**Le schema done.json :**

```json
{
  "oracle": "oracle-Causio-1",
  "project": "Causio",
  "status": "done_clean",
  "started_at": "2026-04-16T10:00:00Z",
  "finished_at": "2026-04-16T10:12:00Z",
  "duration_sec": 720,
  "mission": "Fix le bug d'auth Google",
  "ship": {
    "requested": true,
    "result": "ok",
    "commit": "a1b2c3d",
    "push_url": "https://github.com/org/causio/commit/a1b2c3d",
    "deploy_url": "https://causio.vercel.app",
    "deploy_status": "READY"
  },
  "pending_actions": [],
  "report_path": "/tmp/oracle-report-causio-1.md",
  "lifecycle": "ephemeral"
}
```

**Les 3 status possibles :**

| Status | Signification | Action AISB |
|--------|--------------|-------------|
| `done_clean` | Tout est OK, mission accomplie | Rapport → grace window 5min → fermeture |
| `pending` | Travail fait mais suite necessaire | Rapport → garde l'Oracle → bouton "continuer" |
| `failed` | Bloque, build/test/deploy casse | Rapport + logs → garde l'Oracle → alerte |

**L'arbre de decision de fermeture (AISB patrol) :**

```
AISB patrol (boucle toutes les 60s) :
  │
  ├─ Lit ~/.aisb/state/oracle-*.done.json
  │
  ├─ status == done_clean && ship.result == ok|skipped ?
  │   ├─ OUI → Envoyer rapport Telegram
  │   │        → Verifier skip-close conditions :
  │   │            lifecycle == ephemeral ? → Close immediatement
  │   │            > 3 oracles sur le projet ? → Close immediatement
  │   │            RAM libre < 2GB ? → Close immediatement
  │   │        → Sinon : grace window = now + 5 minutes
  │   │            Si user envoie un message pendant la window → +15min
  │   │            Sinon → tmux kill-session
  │   │
  │   └─ NON → ship.result == failed|frozen ?
  │       ├─ OUI → Rapport + alerte freeze → GARDER l'Oracle vivant
  │       └─ NON → status == pending ?
  │           ├─ OUI → Rapport + pending_actions → bouton "continuer"
  │           └─ NON → status == failed ?
  │               └─ OUI → Logs d'erreur → GARDER vivant
  │
  └─ Pas de .done.json ? → L'Oracle travaille encore, ne rien faire
```

**Le systeme de freeze :**

```bash
# En cas d'echec de deploiement :
touch ~/.aisb/locks/ship-Causio.frozen

# Tous les oracles sur Causio sont bloques de push
# Jusqu'a ce que :
#   1. Le freeze soit leve manuellement
#   2. Ou le probleme soit resolu et le fichier supprime

# Verification dans le ship pipeline :
if [ -f ~/.aisb/locks/ship-${PROJECT}.frozen ]; then
    echo "FROZEN: Deploy precedent a echoue. Push interdit."
    echo "Lever le freeze : rm ~/.aisb/locks/ship-${PROJECT}.frozen"
    exit 1
fi
```

### Exercice pratique

Implementez le ship pipeline en bash. Creez le script `oracle-ship.sh` qui execute les 12 etapes. Testez avec un projet reel : commit, push, deploy (Vercel ou autre). Implementez le done.json et verifiez que le patrol detecte correctement les 3 status.

---

## Lecon 9 — Quality Arsenal : 16 audits forensiques Gestalt-Popper

### Ce que vous allez apprendre

Les 16 audits forensiques du Quality Arsenal, leur methodologie commune (Gestalt-Popper), le systeme de scoring normalise, et comment ils s'integrent dans le pipeline AISB pour garantir la qualite a chaque deploiement.

### Contenu detaille

**Les 16 audits du Quality Arsenal :**

| Audit | Domaine | Phases | Score max | /100 | Question centrale |
|-------|---------|--------|-----------|------|-------------------|
| `/codeaudit` | Code | 23 | /420 | /100 | Le code est-il SOLIDE ? |
| `/flowaudit` | Parcours | 20 | /400 | /100 | L'experience FONCTIONNE-t-elle ? |
| `/uiuxaudit` | Design | 23 | /420 | /100 | L'interface est-elle BELLE ? |
| `/debugaudit` | Runtime | 18 | /360 | /100 | Qu'est-ce qui est CASSE maintenant ? |
| `/featureaudit` | Features | 16 | /320 | /100 | Le produit est-il COMPLET ? |
| `/perfaudit` | Performance | 18 | /360 | /100 | Est-ce assez RAPIDE ? |
| `/secaudit` | Securite | 20 | /400 | /100 | Est-ce SECURISE ? |
| `/a11yaudit` | Accessibilite | 16 | /320 | /100 | Est-ce ACCESSIBLE ? |
| `/seoaudit` | SEO | 20 | /400 | /100 | Est-ce DECOUVRABLE ? |
| `/dataaudit` | Donnees | 16 | /320 | /100 | Les donnees sont-elles INTACTES ? |
| `/apiaudit` | API | 18 | /360 | /100 | L'API est-elle SOLIDE ? |
| `/copyaudit` | Copy | 14 | /280 | /100 | Le texte est-il CLAIR ? |
| `/dxaudit` | DX | 16 | /320 | /100 | La DX est-elle FLUIDE ? |
| `/motionaudit` | Motion | 18 | /360 | /100 | Le mouvement a-t-il un SENS ? |
| `/automationaudit` | Automation | 22 | /330 | /100 | L'automation est-elle FIABLE ? |
| `/logicaudit` | Logique | 20 | /360 | /100 | La logique est-elle OPTIMALE ? |

**La methodologie Gestalt-Popper :**

```
GESTALT (perception holistique) :
  → Regarder le systeme comme un tout
  → Identifier les patterns visuels, structurels, comportementaux
  → "L'ensemble est plus que la somme des parties"
  → Chaque phase evalue un aspect du tout

POPPER (falsification scientifique) :
  → Pour chaque affirmation positive, chercher ce qui la falsifierait
  → "Ce code est securise" → "Qu'est-ce qui prouverait le contraire ?"
  → Pas de "ca a l'air bon" — des preuves refutables
  → Le Hinge Point : le point unique qui changerait tout le score

Combine :
  Gestalt repere les problemes → Popper les prouve → Score objectif
```

**Le systeme de scoring normalise :**

```
Score brut = Somme des scores par phase (chacune ponderee)
Score normalise = (score_brut / score_max) × 100

Exemple /codeaudit :
  Phase 1: Phantom Detection     → 35/40  (poids 2x)
  Phase 2: Dependency Health      → 50/60  (poids 3x)
  ...
  Phase 23: Final Integration     → 15/20  (poids 1x)
  
  Score brut : 340/420
  Score normalise : (340/420) × 100 = 80.9/100

Interpretation :
  90-100 : Excellent — production-ready
  80-89  : Bon — quelques ameliorations mineures
  70-79  : Acceptable — problemes a corriger
  60-69  : Insuffisant — refactoring necessaire
  < 60   : Critique — ne pas deployer
```

**L'auto-fix et l'auto-re-audit :**

```
Audit initial → Score 72/100
  │
  ├─ Problemes identifies (avec fichier:ligne:fix)
  │
  ├─ Auto-fix : l'audit corrige automatiquement les problemes
  │              qu'il peut resoudre sans risque
  │
  ├─ Re-audit : relance les phases impactees par les fixes
  │
  └─ Score final : 88/100 (amelioration de +16 points)
```

**Dispatch des audits par le pipeline :**

```python
# Dispatch parallele des audits (Oracle)
audits_to_run = ["codeaudit", "uiuxaudit", "flowaudit"]

for audit in audits_to_run:
    session = f"{project}-audit-{audit}"
    prompt = f"""
    /{audit} --files={files_changed} --scope="{scope}"
    
    DONE CRITERIA: Audit complete avec score /100
    VERIFY: cat /tmp/{audit}-report.json | jq '.score'
    """
    dispatch_to_session(session, prompt)

# Attendre que tous les audits soient termines
wait_for_all(audits_to_run)

# Verifier les scores
for audit in audits_to_run:
    score = read_score(f"/tmp/{audit}-report.json")
    if score < threshold:
        block_ship(f"Audit {audit} failed: {score}/100 < {threshold}")
```

### Exercice pratique

Lancez 3 audits sur votre projet : `/codeaudit`, `/perfaudit`, et `/secaudit`. Analysez les rapports et identifiez le "Hinge Point" de chaque audit — le probleme unique dont la correction aurait le plus grand impact sur le score. Corrigez les 3 Hinge Points et relancez les audits pour mesurer l'amelioration.

---

## Lecon 10 — Deployer ton propre AISB : de zero a l'autonomie complete

### Ce que vous allez apprendre

Le guide pas-a-pas pour deployer votre propre systeme AISB sur un VPS, de l'installation initiale au premier message Telegram qui declenche un deploiement automatique. Checklist complete, erreurs courantes, et optimisations.

### Contenu detaille

**Prerequis materiels :**

| Composant | Minimum | Recommande | Utilise par AISB reel |
|-----------|---------|-----------|----------------------|
| **VPS** | 4 CPU, 16GB RAM | 8 CPU, 32GB RAM | 8 CPU, 64GB RAM |
| **Stockage** | 100GB SSD | 250GB NVMe | 500GB NVMe |
| **OS** | Ubuntu 22.04+ | Ubuntu 24.04 | Ubuntu 24.04 |
| **Reseau** | 100Mbps | 1Gbps | 1Gbps |
| **SSH** | Port custom, key-only | Port custom, key-only | Port 42820, key-only |

**Le plan d'installation en 10 etapes :**

```
Etape 1 : Setup VPS (securite, SSH, utilisateur)
  ↓
Etape 2 : Installer les outils (Node.js, Python, Claude Code, tmux)
  ↓
Etape 3 : Configurer Claude Code (API key, modele, permissions)
  ↓
Etape 4 : Creer la structure de fichiers AISB
  ↓
Etape 5 : Ecrire les agents de base (3-5 pour commencer)
  ↓
Etape 6 : Creer le bot Telegram
  ↓
Etape 7 : Implementer le classificateur et le dispatcher
  ↓
Etape 8 : Ecrire le ship pipeline
  ↓
Etape 9 : Configurer le patrol (cron)
  ↓
Etape 10 : Premier test end-to-end
```

**Etape 1 — Setup VPS :**

```bash
# Creer l'utilisateur (jamais root pour le travail)
sudo adduser hacker
sudo usermod -aG sudo hacker

# Securiser SSH
sudo sed -i 's/#Port 22/Port 42820/' /etc/ssh/sshd_config
sudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart sshd

# Firewall
sudo ufw allow 42820/tcp
sudo ufw enable
```

**Etape 4 — Structure de fichiers AISB :**

```
~/.aisb/
├── docs/
│   ├── ARCHITECTURE.md        # Ce document
│   ├── ORCHESTRATION.md       # Comment les taches circulent
│   └── CLOUD.md               # Infrastructure cloud
├── state/
│   ├── oracle-Causio-1.done.json
│   └── worker-blocked-*.json
├── oracles/
│   ├── Causio-1.json          # Registre Oracle
│   └── DentistryGPT-1.json
├── locks/
│   ├── ship-Causio.lock       # Serialisation des push
│   └── ship-Causio.frozen     # Freeze apres echec deploy
├── memory/
│   ├── user/                  # Memoire cross-projet
│   ├── project/{name}/        # Memoire par projet
│   └── agent-memory/{type}/   # Memoire par type d'agent
├── scratchpad/                # Echange inter-agents
└── lib/
    ├── dispatch-to-session.sh
    ├── worker-alive-check.sh
    ├── oracle-ship.sh
    ├── oracle-check.sh
    ├── oracle-list.sh
    └── oracle-cleanup.sh

~/.claude/
├── CLAUDE.md                  # Instructions globales
├── rules/                     # Regles always-loaded
│   ├── 000-verification.md
│   ├── 001-smart-routing.md
│   └── ...
├── agents/                    # 281 agents
│   ├── react-specialist/
│   ├── seo-expert/
│   └── ...
├── commands/                  # 130+ skills
│   ├── codeaudit.md
│   ├── uiuxaudit.md
│   └── ...
└── lib/                       # Scripts utilitaires
    ├── clerk-auth-browse.sh
    └── ...
```

**Etape 6 — Bot Telegram minimal :**

```python
#!/usr/bin/env python3
# bot/main.py — Bot AISB minimal

import os
import asyncio
import telebot
from telebot.async_telebot import AsyncTeleBot
from core.classifier import classify
from core.dispatcher import dispatch_to_oracle
from core.enricher import enrich_prompt

TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
ALLOWED_USERS = [int(os.environ["TELEGRAM_USER_ID"])]

bot = AsyncTeleBot(TOKEN)

@bot.message_handler(func=lambda m: m.from_user.id in ALLOWED_USERS)
async def handle(message):
    text = message.text
    
    # Classifier
    level = classify(text)
    
    if level == "SIMPLE":
        # Traiter directement via Claude SDK
        response = await handle_simple(text)
        await bot.reply_to(message, response)
    else:
        # Enrichir et dispatcher
        enriched = enrich_prompt(text, message.from_user.id)
        project = detect_project(text)
        session = dispatch_to_oracle(enriched, project)
        await bot.reply_to(message, 
            f"Oracle dispatche : `{session}`\n"
            f"Complexite : {level}\n"
            f"Je te notifie quand c'est termine.",
            parse_mode="Markdown"
        )

@bot.message_handler(commands=["status"])
async def status(message):
    """Affiche l'etat de tous les oracles actifs."""
    oracles = get_active_oracles()
    text = "Oracles actifs :\n"
    for o in oracles:
        text += f"- `{o['session']}` : {o['mission']} ({o['duration']})\n"
    await bot.reply_to(message, text, parse_mode="Markdown")

asyncio.run(bot.polling())
```

**Etape 9 — Le patrol AISB (cron) :**

```bash
# Crontab entry
* * * * * /home/hacker/.aisb/lib/patrol.sh >> /var/log/aisb-patrol.log 2>&1

# patrol.sh
#!/bin/bash
# Verifie les .done.json et notifie via Telegram

for done_file in ~/.aisb/state/oracle-*.done.json; do
    [ -f "$done_file" ] || continue
    
    status=$(jq -r '.status' "$done_file")
    oracle=$(jq -r '.oracle' "$done_file")
    
    case "$status" in
        "done_clean")
            # Envoyer rapport et programmer la fermeture
            send_telegram_report "$done_file"
            schedule_close "$oracle" 300  # 5 minutes grace
            ;;
        "pending")
            send_telegram_pending "$done_file"
            ;;
        "failed")
            send_telegram_error "$done_file"
            ;;
    esac
done

# Nettoyer les sessions mortes
~/.aisb/lib/oracle-cleanup.sh
```

**Etape 10 — Premier test end-to-end :**

```
1. Envoyer sur Telegram : "Cree un fichier hello.txt dans /tmp avec 'Hello AISB'"

2. Verifier :
   - AISB classifie comme SIMPLE → traite directement
   - Reponse Telegram : "Fichier cree"
   - cat /tmp/hello.txt → "Hello AISB"

3. Envoyer : "Fix le bug de la page d'accueil sur [ton projet]"

4. Verifier :
   - AISB classifie comme MEDIUM → dispatche Oracle
   - tmux ls → oracle-[projet]-1 existe
   - L'Oracle cree un Worker
   - Le Worker fixe le bug, build passe
   - .done.json avec status=done_clean
   - Notification Telegram avec rapport
```

**Les erreurs courantes et solutions :**

| Erreur | Cause | Solution |
|--------|-------|---------|
| "Claude not found" | Claude Code pas dans PATH | `export PATH="$HOME/.claude/bin:$PATH"` dans .zshrc |
| Session tmux vide | Prompt file mal ecrit | Verifier le contenu de /tmp/oracle-prompt-*.md |
| Worker bloque qui attend | 3eme Loi non injectee | Ajouter l'autonomy rule dans le template Worker |
| Deploy freeze permanent | Fichier .frozen pas supprime | `rm ~/.aisb/locks/ship-*.frozen` apres resolution |
| Build fail en boucle | Stuck detection absente | Implementer : meme erreur 3x → approche differente |

### Exercice pratique

Deploiement complet : suivez les 10 etapes pour installer votre propre AISB sur un VPS. Objectif minimal viable : un bot Telegram qui recoit un message, dispatche un Oracle via tmux, et vous notifie quand le travail est termine. Bonus : ajoutez le ship pipeline et le patrol cron.

---

## Ce que cette formation apporte

- Comprehension totale de l'architecture AISB a 4 niveaux
- Capacite de tracer le parcours complet d'un message Telegram → code deploye
- Competence pour construire un bot Telegram connecte a Claude Code
- Maitrise du systeme Oracle/Worker avec tmux et file ownership
- Connaissance des 281 agents et capacite a en creer de nouveaux
- Comprehension du pipeline ROUTE → KEYMAKER → MORPHEUS → SERAPH → SMITH
- Integration des 3 Lois dans chaque agent pour garantir l'autonomie
- Implementation du ship pipeline avec freeze et recovery
- Connaissance operationnelle des 16 audits forensiques Gestalt-Popper
- Un VPS fonctionnel avec votre propre AISB deploye

---

## Ressources complementaires

- Module precedent : Prompt Engineering avance et SDK Claude
- Communaute Kommu pour echanger sur vos systemes d'orchestration
- Repository template AISB-starter (structure de fichiers pre-configuree)
- Documentation Claude Code officielle (claude.ai/docs)
- Guide tmux avance pour l'orchestration multi-sessions
- Collection de templates d'agents (20 agents pre-configures)
- Checklist de deploiement VPS securise (PDF)
- Les 3 Lois d'Agentik OS — document de reference (PDF)
