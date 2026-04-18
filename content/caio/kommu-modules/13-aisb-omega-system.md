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

```mermaid
graph TB
    subgraph N1["NIVEAU 1 — AISB (AI Super Brain)"]
        direction LR
        A1[Bot Telegram] --> A2[Enrichissement de prompt]
        A2 --> A3[Classification]
        A3 --> A4[Dispatch]
    end

    subgraph N2["NIVEAU 2 — ORACLES (Chefs de projet)"]
        direction LR
        B1[Analyse] --> B2[Decomposition]
        B2 --> B3[Coordination]
        B3 --> B4[Verification]
    end

    subgraph N3["NIVEAU 3 — WORKERS (Executants)"]
        direction LR
        C1[Code] --> C2[Fix]
        C2 --> C3[Audit]
        C3 --> C4[Deploy]
    end

    subgraph N4["NIVEAU 4 — AGENTS & SKILLS (Specialistes)"]
        direction LR
        D1[281 agents] --> D2[130+ skills]
        D2 --> D3[16 audits forensiques]
    end

    N1 -->|"dispatch-to-session.sh"| N2
    N2 -->|"tmux sessions"| N3
    N3 -->|"Skill tool / Agent tool"| N4
    N4 -->|"Resultats"| N3
    N3 -->|".done.json"| N2
    N2 -->|"Signal file"| N1
```

**Le detail de chaque niveau :**

| Niveau | Composant | Nombre d'instances | Duree de vie | Communication |
|--------|-----------|-------------------|--------------|---------------|
| 1 | AISB Bot (Python) | 1 permanent | 24/7 via systemd | Telegram API |
| 2 | Oracles (Claude Code) | 1-3 simultanees | A la demande | tmux + signal files |
| 3 | Workers (Claude Code) | 1-6 par Oracle | Ephemere (tue apres tache) | tmux + .done.json |
| 4 | Agents/Skills | 281 disponibles | Invocables a la demande | Skill tool / Agent tool |

**Pourquoi 4 niveaux ?**

| Probleme | Solution apportee par le niveau |
|----------|-------------------------------|
| "Je ne veux pas surveiller chaque tache" | AISB (Niv. 1) recoit un message et gere tout |
| "Les missions complexes ont besoin d'un chef" | Oracle (Niv. 2) decompose et coordonne |
| "Chaque tache a besoin d'un contexte frais" | Worker (Niv. 3) = contexte isole et propre |
| "Il faut des competences specifiques" | Agents/Skills (Niv. 4) = expertise a la demande |

**Le principe fondamental : separation des responsabilites**

Chaque niveau parle UNIQUEMENT au niveau adjacent. Jamais de communication directe N1 vers N3.

```mermaid
graph LR
    T[Toi - Telegram] <-->|Messages| AISB
    AISB <-->|dispatch| Oracle
    Oracle <-->|tmux| Worker
    Worker <-->|Skill tool| Agent

    style T fill:#4a9eff,color:white
    style AISB fill:#ff6b6b,color:white
    style Oracle fill:#ffa726,color:white
    style Worker fill:#66bb6a,color:white
    style Agent fill:#ab47bc,color:white
```

**Les regles d'or :**

- AISB ne code JAMAIS — il route et enrichit
- Les Oracles ne codent JAMAIS — ils decomposent, coordonnent et verifient
- Seuls les Workers touchent le code
- Les resultats REMONTENT : Worker -> Oracle -> AISB -> Telegram -> Toi
- Maximum 3 Oracles simultanees (au-dela, le bot refuse)

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
| Deploiement | Aucun | Ship pipeline complet (build, push, deploy, verify) |
| Apprentissage | Aucun | SMITH analyse les patterns et ameliore le systeme |

### Exercice pratique

Dessinez l'architecture de votre propre systeme a 4 niveaux. Identifiez : votre point d'entree (Telegram, Slack, Discord ?), combien d'oracles simultanes vous aurez besoin, et quels types de workers seront les plus utilises dans votre contexte.

---

## Lecon 2 — La chaine complete d'un message : de Telegram au code

### Ce que vous allez apprendre

Le parcours complet d'un message utilisateur, depuis l'envoi sur Telegram jusqu'au code deploye en production. Chaque etape, chaque fichier, chaque decision automatique documentee.

### Contenu detaille

**Le parcours d'un message — diagramme de sequence :**

```mermaid
sequenceDiagram
    participant G as Gareth (Telegram)
    participant B as AISB Bot (Python)
    participant E as enhance_prompt (Claude SDK)
    participant O as Oracle (tmux)
    participant W as Worker (tmux)
    participant V as Vercel (Deploy)

    G->>B: "Fix le bug d'auth sur Causio"
    B->>B: Detecte projet: Causio
    B->>E: Message brut + contexte projet
    E-->>B: Prompt enrichi (fichiers, git, criteres)
    B->>B: Classifie: MEDIUM
    B->>O: dispatch-to-session.sh oracle-Causio
    B-->>G: "Oracle dispatche, je te notifie"

    O->>O: Analyse CLAUDE.md + git log
    O->>O: Decompose en sous-taches
    O->>W: dispatch Worker Causio-1
    W->>W: Lit le code, identifie le bug
    W->>W: Applique le fix
    W->>W: npm run build = OK
    W-->>O: .done.json (done_clean)

    O->>O: Verifie le build
    O->>O: git commit + push
    O->>V: Deploy Vercel
    V-->>O: Deploy READY
    O->>O: Ecrit signal file

    B->>B: Detecte signal file (poll 3s)
    B-->>G: "Bug auth fixe. Deploye en prod."
```

**Etape 1 — Reception par AISB (bot Python)**

Le bot Telegram tourne en permanent via systemd. Quand un message arrive :

```python
# Pseudo-code simplifie du routing
async def process_message(message):
    text = message.text
    topic_id = message.message_thread_id  # None si DM

    # 1. Commande directe oracle ? (/dent, /kommu, etc.)
    if text.startswith('/'):
        project = match_direct_command(text)
        if project:
            dispatch_to_oracle(project, text)
            return

    # 2. Reponse a un rapport AISB ?
    if message.reply_to_message:
        project = report_message_map.get(message.reply_to_message.id)
        if project:
            dispatch_to_oracle(project, text)
            return

    # 3. Message dans un topic ? → Identifier le projet
    if topic_id:
        project = projects_json.get(topic_id)
        if project:
            enhanced = await enhance_prompt(text, project)
            dispatch_to_oracle(project, enhanced)
            return

    # 4. DM avec keyword projet ?
    projects = detect_multi_project(text)
    if len(projects) == 1:
        dispatch_to_oracle(projects[0], text)
    elif len(projects) > 1:
        for p in projects:  # Parallele !
            dispatch_to_oracle(p, text)
    else:
        # Pas de projet detecte → AISB repond directement
        response = await aisb_direct_answer(text)
        send_telegram(chat_id, response)
```

**Etape 2 — enhance_prompt : l'intelligence N+1**

Le secret d'AISB : il ne transmet JAMAIS le message brut aux oracles. Il le reformule d'abord via Claude SDK.

```
Ton message : "fix le login" (15 caracteres, vague)
↓
enhance_prompt : Claude SDK reformule + analyse git
↓
Prompt oracle :
  "## Objectif technique
   Corriger le flux d'authentification login.
   ## Fichiers concernes
   src/auth/login.ts, src/middleware.ts
   ## Criteres de succes
   - Login flow works end-to-end
   - npm run build = 0 errors
   ## Contexte git
   Branch: main, dernier commit: fix token refresh"
```

Caracteristiques techniques :
- Utilise `claude --print` via stdin pipe
- Force OAuth (Claude Max, unlimited) en vidant `ANTHROPIC_API_KEY`
- Timeout 60s, fallback sur template structure si Claude echoue
- Inputs/outputs sauves dans `.oracles/aisb-reformat-*.md`

**Etape 3 — L'Oracle decompose la mission**

L'Oracle recoit le prompt enrichi et suit un protocole strict en 5 etapes (detail en Lecon 4).

**Etape 4 — Le Worker execute**

Le Worker recoit une mission atomique avec :
- Description precise + fichiers + criteres de succes
- Done criteria mesurables (ex: "npm run build exits 0")
- Verify command (ex: "npm run build 2>&1 | tail -1")
- Les 3 Lois injectees dans le prompt

**Etape 5 — Le report pipeline**

```mermaid
graph LR
    O[Oracle] -->|"ecrit"| SF["/tmp/aisb-oracle-result-Projet.md"]
    W[Watcher thread] -->|"poll 3s"| SF
    W -->|"detecte"| FMT[markdown_to_telegram_html]
    FMT -->|"formate"| TG[Telegram DM]
    TG -->|"message_id tracke"| MAP[report_message_map]
    MAP -->|"reply routing"| O2[Meme Oracle]

    style SF fill:#fff3e0
    style TG fill:#4a9eff,color:white
```

Le watcher est un thread background dans le bot qui poll `/tmp/` toutes les 3 secondes. Quand il detecte un signal file :
1. Il lit le contenu Markdown
2. Le convertit en HTML Telegram via `markdown_to_telegram_html`
3. L'envoie en DM a Gareth
4. Tracke le `message_id` dans `report_message_map` pour le reply-routing

**Temps total typique : 8-15 minutes** (vs 1-3 heures manuellement)

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

**Architecture modulaire du bot :**

```mermaid
graph TB
    subgraph BOT["Bot AISB (Python)"]
        direction TB
        MAIN[main.py] --> HANDLERS[handlers.py]
        MAIN --> COMMANDS[commands.py]
        MAIN --> MONITOR[monitor.py]

        HANDLERS --> PROCESS[process_prompt.py]
        PROCESS --> AUTH[auth.py]
        PROCESS --> SESSIONS[sessions.py]
        PROCESS --> PROMPTS[prompts.py]

        SESSIONS --> TMUX[tmux_dispatch.py]
        SESSIONS --> CLAUDE[claude_runner.py]

        MONITOR --> NERVE[nerve.py]
        MONITOR --> ROUTINES[routines.py]

        MAIN --> FORMATTING[formatting.py]
        MAIN --> VOICE[voice.py]
        MAIN --> INTELLIGENCE[intelligence.py]
        MAIN --> TELEGRAM_UTILS[telegram_utils.py]
    end

    TG[Telegram API] <--> MAIN
    TMUX_SYS[Sessions tmux] <--> TMUX
    CLAUDE_SDK[Claude SDK] <--> CLAUDE

    style BOT fill:#f5f5f5
    style TG fill:#4a9eff,color:white
    style TMUX_SYS fill:#66bb6a,color:white
    style CLAUDE_SDK fill:#ab47bc,color:white
```

**Structure du projet bot :**

```
agentik-monitor/
├── bot/
│   ├── main.py              # Point d'entree du bot
│   ├── SOUL.md              # Identite et personnalite du bot
│   ├── MEMORY.md            # Memoire persistante utilisateur
│   ├── aisb/
│   │   ├── __init__.py
│   │   ├── config.py        # Chargement de la config
│   │   ├── state.py         # Etat global du bot
│   │   ├── auth.py          # Verification des users autorises
│   │   ├── handlers.py      # Handlers Telegram (messages, callbacks)
│   │   ├── commands.py      # Commandes Telegram (/start, /status)
│   │   ├── oracle_commands.py # Commandes directes (/dent, /kommu)
│   │   ├── process_prompt.py  # Routing des messages vers oracles
│   │   ├── prompts.py       # Templates de prompts
│   │   ├── sessions.py      # Gestion des sessions tmux
│   │   ├── tmux_dispatch.py # Interface avec tmux
│   │   ├── claude_runner.py # Interface avec Claude SDK
│   │   ├── formatting.py    # Markdown → HTML Telegram
│   │   ├── telegram_utils.py # Utilitaires Telegram
│   │   ├── voice.py         # Transcription vocale (Whisper)
│   │   ├── intelligence.py  # God Mode, evaluation des taches
│   │   ├── monitor.py       # Boucle de monitoring (30s)
│   │   ├── nerve.py         # Tracking des taches (AISB Nerve)
│   │   ├── routines.py      # Taches planifiees
│   │   └── app.py           # Application Telegram (setup)
├── .env                     # TELEGRAM_TOKEN, ANTHROPIC_API_KEY
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

**Le service systemd : toujours running**

```ini
# /etc/systemd/system/agentik-monitor-bot.service
[Unit]
Description=AISB Telegram Bot
After=network.target

[Service]
Type=simple
User=hacker
WorkingDirectory=/home/hacker/VibeCoding/work/agentik-monitor/bot
ExecStart=/usr/bin/python3 main.py
Restart=always
RestartSec=10
Environment=PYTHONPATH=/home/hacker/VibeCoding/work/agentik-monitor/bot

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable agentik-monitor-bot
sudo systemctl start agentik-monitor-bot
sudo systemctl status agentik-monitor-bot  # Verifier
journalctl -u agentik-monitor-bot -f       # Logs en temps reel
```

**Configuration Telegram avec Topics :**

Le groupe Telegram avec Topics actives = votre tableau de bord projet.

| Topic | Projet | Usage |
|-------|--------|-------|
| General | AISB | Messages systeme, statuts |
| Topic 27 | DentistryGPT | Tout ce qui concerne DentistryGPT |
| Topic 28 | Causio | Tout ce qui concerne Causio |
| Topic 31 | Kommu | Tout ce qui concerne Kommu |
| Topic 32 | AgentikOS | Tout ce qui concerne AgentikOS |

Chaque projet = 1 topic = 1 fil de conversation isole. Le bot detecte automatiquement le projet a partir du `topic_id`.

### Exercice pratique

Creez un bot Telegram minimal qui recoit un message, le classifie (SIMPLE/MEDIUM/COMPLEX/EPIC), et pour les taches SIMPLE, repond directement via Claude. Pour les taches MEDIUM+, affichez un message "Oracle dispatche" (on implementera le dispatch reel dans la Lecon 4).

---

## Lecon 4 — Oracle et dispatch : tmux, sessions a la demande, file ownership

### Ce que vous allez apprendre

Comment fonctionne le systeme Oracle : creation de sessions tmux a la demande, gestion du file ownership pour eviter les conflits, multi-oracle sur un meme projet, et le cycle de vie complet d'un Oracle.

### Contenu detaille

**Le cycle de vie d'un Oracle :**

```mermaid
stateDiagram-v2
    [*] --> Created: dispatch-to-session.sh
    Created --> Analyzing: Claude Code demarre
    Analyzing --> Dispatching: Tache decomposee
    Dispatching --> Monitoring: Workers lances
    Monitoring --> Verifying: Workers termines
    Monitoring --> Monitoring: capture-pane (30s)
    Verifying --> Shipping: /xoxo OK
    Verifying --> Dispatching: Erreurs trouvees
    Shipping --> Done: Build + Push + Deploy OK
    Shipping --> Failed: Deploy echoue
    Done --> [*]: .done.json (done_clean)
    Failed --> [*]: .done.json (failed) + freeze
```

**Le registre Oracle (JSON) :**

```json
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

**Le workflow Oracle en 5 etapes :**

```mermaid
graph TB
    subgraph E1["ETAPE 1 — ANALYSE"]
        A1[Lire CLAUDE.md] --> A2[Comprendre la tache]
        A2 --> A3[Decomposer en sous-taches]
        A3 --> A4[Definir criteres de succes]
    end

    subgraph E2["ETAPE 2 — DISPATCH"]
        B1["dispatch-to-session.sh {Projet}-1"] --> B2["Prompt avec contexte complet"]
        B2 --> B3["Done criteria + verify command"]
    end

    subgraph E3["ETAPE 3 — MONITORING"]
        C1["tmux capture-pane (30s)"] --> C2{Status?}
        C2 -->|"En cours"| C1
        C2 -->|"Termine"| E4
        C2 -->|"Erreur"| C3[Intervention]
    end

    subgraph E4["ETAPE 4 — CLEANUP + VERIFICATION"]
        D1[Kill workers] --> D2["/xoxo verification"]
        D2 --> D3{Erreurs?}
        D3 -->|"Oui (max 3x)"| E2
        D3 -->|"Non"| E5
    end

    subgraph E5["ETAPE 5 — GATE + RAPPORT"]
        F1[npm run build] --> F2[git commit + push]
        F2 --> F3[Ecrire signal file]
        F3 --> F4["/exit"]
    end

    E1 --> E2
    E2 --> E3
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

**Le script dispatch-to-session.sh (le plus important du systeme) :**

```bash
#!/bin/bash
# ~/.aisb/lib/dispatch-to-session.sh
# Usage: dispatch-to-session.sh SESSION_NAME "prompt text" [workdir]
SESSION="$1"
PROMPT="$2"
WORKDIR="${3:-$(pwd)}"

# 1. Creer la session si elle n'existe pas
if ! tmux has-session -t "$SESSION" 2>/dev/null; then
    tmux new-session -d -s "$SESSION" -c "$WORKDIR"
    sleep 1
fi

# 2. Lancer Claude Code si pas deja running
PANE_CMD=$(tmux list-panes -t "$SESSION" -F '#{pane_current_command}')
if [ "$PANE_CMD" != "claude" ]; then
    tmux send-keys -t "$SESSION" "claude --dangerously-skip-permissions" Enter
    sleep 7  # Claude met ~7s a boot
fi

# 3. Attendre que Claude soit idle (le prompt ">" visible)
for i in $(seq 1 60); do
    CAPTURE=$(tmux capture-pane -t "$SESSION" -p -S -3)
    if echo "$CAPTURE" | grep -q ">"; then
        break
    fi
    sleep 2
done

# 4. Ecrire le prompt dans un fichier temp
TMPFILE=$(mktemp /tmp/dispatch-XXXXXX.txt)
printf '%s' "$PROMPT" > "$TMPFILE"

# 5. Coller via load-buffer (fiable pour les longs prompts)
tmux send-keys -t "$SESSION" Escape
tmux send-keys -t "$SESSION" "C-u"  # Clear input
tmux load-buffer "$TMPFILE"
tmux paste-buffer -p -t "$SESSION"  # -p = paste literal
sleep 0.5
tmux send-keys -t "$SESSION" Enter  # Envoyer !

rm -f "$TMPFILE"
echo "Dispatched to $SESSION (${#PROMPT} chars)"
```

**Points critiques :**
- `load-buffer` + `paste-buffer -p` au lieu de `send-keys` : `send-keys` tronque apres ~500 chars
- Sleep 7s apres le demarrage de Claude : le CLI met du temps a boot
- Detection du prompt ">" pour savoir quand Claude est pret
- `-p` flag sur `paste-buffer` : preserve les newlines sans les executer

**Le worker-alive-check.sh :**

```bash
#!/bin/bash
# ~/.claude/lib/worker-alive-check.sh
# Exit 0 = safe to kill (idle/dead)
# Exit 1 = STILL WORKING, do NOT kill

SESSION="$1"

if ! tmux has-session -t "$SESSION" 2>/dev/null; then
    exit 0  # Session n'existe pas = safe
fi

PANE_PID=$(tmux list-panes -t "$SESSION" -F '#{pane_pid}' 2>/dev/null)
if [ -z "$PANE_PID" ]; then
    exit 0
fi

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
# oracle-Causio-1        active   "Fix auth Google"       2h15m
# oracle-DentistryGPT-1  active   "36 tickets Linear"     5h30m
# oracle-Kommu-1         idle     "Build page Kommu"      done
```

**Tableau des Oracles disponibles (configuration reelle Agentik OS) :**

| Session Oracle | Projet | Topic ID | Commande Directe |
|---------------|--------|----------|------------------|
| oracle-DentistryGPT | DentistryGPT | 27 | `/dent` |
| oracle-Causio | Causio | 28 | `/causio` |
| oracle-Loumna | Loumna | 29 | `/loumna` |
| oracle-L34D | L34D | 30 | `/l34d` |
| oracle-Kommu | Kommu | 31 | `/kommu` |
| oracle-AgentikOS | AgentikOS | 32 | `/agentikos` |
| oracle-AgentikMonitor | Dashboard | 293 | `/monitor` |
| oracle-OneLife | OneLife | 303 | `/onelife` |
| oracle-AI-GenX | AI-GenX | 1925 | `/aigenx` |
| oracle-AGKT | AGKT | 2103 | `/agkt` |
| oracle-LaSphere | LaSphere | 2110 | `/lasphere` |

Alias pratiques : `/lawyer` → Causio, `/moon` → Loumna, `/lead` → L34D, `/aos` → AgentikOS

**Ajouter un nouveau projet au systeme :**

```bash
# 1. Creer le topic dans le groupe Telegram
#    → Nouveau topic, nommer "MonProjet"
#    → Noter le topic_id

# 2. Ajouter dans projects.json
{
  "topic_id": 999,
  "name": "MonProjet",
  "path": "/home/hacker/VibeCoding/work/monprojet",
  "oracle_session": "oracle-MonProjet",
  "icon": "rocket",
  "aliases": ["monprojet", "mp"],
  "direct_command": "/monprojet"
}

# 3. Creer le CLAUDE.md du projet
# 4. Generer le prompt oracle
~/.aisb/lib/oracle-prompt.sh MonProjet /path/to/monprojet MonProjet

# 5. Tester le flow complet
```

### Exercice pratique

Implementez le script `dispatch-to-session.sh` sur votre VPS. Testez-le avec une session tmux simple qui lance Claude Code avec un prompt de test. Ajoutez `worker-alive-check.sh` et verifiez qu'il detecte correctement les sessions actives vs idle.

---

## Lecon 5 — Le systeme de 281 agents : departements, skills et specialistes

### Ce que vous allez apprendre

L'organigramme complet des 281 agents, organises en departements avec une hierarchie C-Suite. Comment creer un agent, definir ses competences, et l'integrer dans l'ecosysteme.

### Contenu detaille

**L'organigramme Agentik OS :**

```mermaid
graph TB
    CEO["CEO<br/>Coordination strategique"]

    CEO --> CTO["CTO<br/>~117 agents"]
    CEO --> CMO["CMO<br/>~43 agents"]
    CEO --> CPO["CPO<br/>~32 agents"]

    CTO --> DEV["dev-lead<br/>~50 agents"]
    CTO --> QA["qa-lead<br/>~30 agents"]
    CTO --> SEC["security-lead<br/>~20 agents"]
    CTO --> DESIGN["design-lead<br/>~17 agents"]

    CMO --> CONTENT["marketing-lead<br/>~28 agents"]
    CMO --> CREATIVE["creative-lead<br/>~15 agents"]

    CPO --> STRATEGY["strategy-lead<br/>~32 agents"]

    DEV --> D1[react-specialist]
    DEV --> D2[nextjs-developer]
    DEV --> D3[convex-expert]
    DEV --> D4[database-architect]
    DEV --> D5["+ 46 autres"]

    QA --> Q1[e2e-runner]
    QA --> Q2[lighthouse-auditor]
    QA --> Q3[accessibility-auditor]
    QA --> Q4["+ 27 autres"]

    SEC --> S1[pentester]
    SEC --> S2[owasp-checker]
    SEC --> S3[secret-scanner]
    SEC --> S4["+ 17 autres"]

    CONTENT --> M1[blog-writer]
    CONTENT --> M2[seo-expert]
    CONTENT --> M3[email-copywriter]
    CONTENT --> M4["+ 25 autres"]

    STRATEGY --> ST1[competitor-analyzer]
    STRATEGY --> ST2[data-analyst]
    STRATEGY --> ST3[pricing-optimizer]
    STRATEGY --> ST4["+ 29 autres"]

    style CEO fill:#ff6b6b,color:white
    style CTO fill:#ffa726,color:white
    style CMO fill:#4a9eff,color:white
    style CPO fill:#66bb6a,color:white
```

**Les departements et leurs specialistes :**

| Departement | Chef | Nombre d'agents | Exemples de specialistes |
|-------------|------|-----------------|------------------------|
| **Development** | CTO | ~50 | react-specialist, nextjs-developer, convex-expert, database-architect |
| **Quality** | CTO | ~30 | 16 auditeurs forensiques (code, UX, flow, perf, sec...) |
| **Security** | CTO | ~20 | pentester, owasp-auditor, secret-scanner |
| **Design** | CTO | ~17 | ui-designer, motion-designer, brand-designer |
| **Content** | CMO | ~28 | seo-expert, blog-writer, copywriter, social-content |
| **Creative** | CMO | ~15 | ads-strategist, creative-director, campaign-planner |
| **Strategy** | CPO | ~32 | competitor-analyzer, data-analyst, pricing-optimizer |

**Les 12 agents core AISB (theme Matrix) :**

| Agent | Role | Modele | Tier |
|-------|------|--------|------|
| **ORACLE** | Classification et routing des taches | Opus | Core |
| **MORPHEUS** | Execution et coordination | Opus | Core |
| **KEYMAKER** | Planification d'implementation | Sonnet | Core |
| **SERAPH** | Gates de qualite et verification | Sonnet | Core |
| **SMITH** | Auto-amelioration et apprentissage | Sonnet | Specialiste |
| **NIOBE** | Recherche profonde et intelligence | Sonnet | Specialiste |
| **Architect** | Design systeme et infrastructure | Sonnet | Specialiste |
| **MEROVINGIAN** | Consolidation de connaissances | Haiku | Support |
| **NEO** | Monitoring de sessions et sante | Haiku | Support |
| **ZION** | Dashboard metriques et statut | Haiku | Support |
| **LINK** | Relay de communication (Telegram) | Haiku | Support |
| **CONSTRUCT** | Setup d'environnement et outils | Haiku | Support |

**Classification des taches :**

| Niveau | Signaux | Action |
|--------|---------|--------|
| **SIMPLE** | Typo, config, question rapide | Oracle fait lui-meme (lecture seule) |
| **MEDIUM** | Multi-fichiers, pattern connu | 1 worker + /team |
| **COMPLEX** | Multi-domaine, 30min+ | /team avec specialistes |
| **EPIC** | Cross-departement, heures+ | /aisb full ou /godmode |

**Anatomie d'un agent :**

```markdown
# ~/.claude/agents/react-specialist/CLAUDE.md

## Identity
You are a senior React specialist with 10+ years of experience.

## Expertise
- React 19+ (Server Components, Actions, use() hook)
- Next.js 16+ (App Router, RSC, Streaming)
- State management (Zustand, Jotai, React Query)

## Rules
1. Always use Server Components by default
2. Client Components only when interactivity is required
3. TypeScript strict mode mandatory

## Tools
- Read, Edit, Write, Bash, Grep, Glob
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

## Invocation
Via Skill tool : /codeaudit --files=src/ --scope="auth module"
```

**Les slash commands (arsenal du worker) :**

| Commande | Agents | Usage |
|----------|--------|-------|
| `/team [tache]` | 3-6 senior | DEFAULT — 90% des taches |
| `/ralph [tache]` | 1 autonome | Tache simple ou longue en background |
| `/godmode [tache]` | Autonomie totale | Missions de plusieurs heures |
| `/hunt-all` | 13 hunters | Audit complet de bugs |
| `/xoxo [scope]` | Verification profonde | Avant production |
| `/verify [scope]` | Verification rapide | Apres fix |
| `/build` | Pipeline | Build + deploy en prod |
| `/planner` | DAG | Planification step-by-step |

### Exercice pratique

Creez 3 agents specialises pour vos besoins : un developpeur (adapte a votre stack), un auditeur qualite (avec grille de scoring), et un redacteur (avec votre tone of voice). Testez chacun avec une tache representative de votre quotidien.

---

## Lecon 6 — Le pipeline AISB : ROUTE, KEYMAKER, MORPHEUS, SERAPH, SMITH

### Ce que vous allez apprendre

Le pipeline complet d'execution d'AISB, inspire de la matrice. Chaque etape du pipeline, son role, et comment les 5 agents matriciels se coordonnent pour garantir la qualite.

### Contenu detaille

**Le pipeline AISB en 5 etapes :**

```mermaid
graph LR
    R["ROUTE<br/>(ORACLE)<br/>Classify & Route"] --> K["KEYMAKER<br/>Plan & Design<br/>DAG de taches"]
    K --> M["MORPHEUS<br/>Execute & Build<br/>/team dispatch"]
    M --> SE["SERAPH<br/>Audit & Verify<br/>Default = FAIL"]
    SE -->|"PASS"| SM["SMITH<br/>Learn & Store<br/>Patterns"]
    SE -->|"FAIL"| M

    style R fill:#ff6b6b,color:white
    style K fill:#ffa726,color:white
    style M fill:#4a9eff,color:white
    style SE fill:#66bb6a,color:white
    style SM fill:#ab47bc,color:white
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
        "COMPLEX": {"handler": "oracle_team", "agents": "3-5"},
        "EPIC": {"handler": "multi_oracle", "agents": "5-15"},
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
    Task 3.1 : Integration backend <-> frontend → fullstack
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

Execution parallele (audits) :
  Task 4.1 ──┐
  Task 4.2 ──┼── Tous en parallele (chacun dans sa session tmux)
  Task 4.3 ──┘
```

**SERAPH — L'auditeur final :**

Seraph execute les audits forensiques et verifie que TOUT est correct avant le ship. Son default verdict est FAIL — il faut prouver la qualite, pas l'absence de problemes.

| Type de mission | Audits obligatoires | Seuil minimum |
|-----------------|--------------------|--------------:|
| Bug fix         | codeaudit          | 80/100        |
| New feature     | codeaudit + uiuxaudit + flowaudit | 75/100 chacun |
| Refactoring     | codeaudit          | 85/100        |
| Full build      | les 16 audits      | 70/100 chacun |
| Linear tickets  | codeaudit + uiuxaudit + flowaudit + perfaudit | 80/100 chacun |

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

```mermaid
graph TB
    subgraph L1["1ere LOI — RUNTIME TRUTH"]
        direction LR
        L1A["Le code ment"] --> L1B["Les commentaires mentent"]
        L1B --> L1C["Seul le runtime dit la verite"]
    end

    subgraph L2["2eme LOI — RESEARCH MINDSET"]
        direction LR
        L2A["Challenger les hypotheses"] --> L2B["Trouver les causes racines"]
        L2B --> L2C["Test de Popper sur chaque conclusion"]
    end

    subgraph L3["3eme LOI — AUTONOMOUS EXECUTION"]
        direction LR
        L3A["Detecter le probleme"] --> L3B["DECIDER la meilleure approche"]
        L3B --> L3C["Executer IMMEDIATEMENT"]
    end

    L1 --> L2
    L2 --> L3

    style L1 fill:#ff6b6b,color:white
    style L2 fill:#ffa726,color:white
    style L3 fill:#66bb6a,color:white
```

**1ere Loi — Runtime Truth**

- Toujours verifier avec des preuves concretes
- Logs > code, screenshots > descriptions
- Avant le 3eme changement sur un meme bug : OBLIGATOIRE d'avoir des preuves runtime
- `npm run build` pour verifier les erreurs
- `console.log` / logs serveur pour le comportement reel
- Screenshots Playwright pour l'etat visuel
- NE JAMAIS faire confiance aux commentaires ou a la doc

**2eme Loi — Research Mindset**

- Etre un chercheur, pas un sycophante
- Challenger les hypotheses avant de coder
- Pousser back avec du raisonnement
- Trouver les causes racines, pas les symptomes
- Test de Popper : "Qu'est-ce qui falsifierait ma conclusion ?"

**3eme Loi — Autonomous Execution**

**L'incident fondateur (15 avril 2026) :**

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

```mermaid
graph TD
    START[Agent detecte un probleme] --> ANALYZE[Analyser le probleme]
    ANALYZE --> STATE["Enoncer le probleme corrige<br/>(1-3 lignes)"]
    STATE --> DECIDE["Choisir la meilleure approche<br/>(votre recommandation gagne)"]
    DECIDE --> EXECUTE[Executer IMMEDIATEMENT]
    EXECUTE --> REPORT["Rapporter APRES<br/>(pas avant)"]

    FORBIDDEN["INTERDIT :<br/>- 'Quelle option ?'<br/>- 'Confirmer ?'<br/>- 'Dois-je continuer ?'<br/>- Toute pause"]

    style FORBIDDEN fill:#ff0000,color:white
    style DECIDE fill:#66bb6a,color:white
    style EXECUTE fill:#4a9eff,color:white
```

**Les defaults de decision (quand un Worker hesite) :**

| Situation | Default | Raisonnement |
|-----------|---------|-------------|
| Faire le vrai travail vs verifier l'existant | Faire le travail | Produit plus de valeur |
| Petit batch safe vs grand batch risque | Petit batch | Minimise les risques |
| Ma recommandation vs l'alternative | Ma recommandation | L'agent est l'expert |
| Logger + continuer vs pauser + demander | Logger + continuer | L'autonomie est non-negociable |

**Le fallback protocol (cas vraiment ambigu) :**

Si un agent est genuinement bloque (credentials manquants, operation destructive), il ecrit un fichier JSON :

```json
{
  "session": "Causio-fix-auth",
  "blocked_at": "2026-04-16T10:30:00Z",
  "question": "Ce qui est ambigu",
  "best_guess": "Ce que je pense etre la bonne reponse",
  "fallback_action": "Ce que je fais en attendant",
  "can_resume_without_answer": true
}
```

Puis execute le fallback. Le patrol AISB detecte le fichier et notifie l'utilisateur. L'agent ne s'arrete JAMAIS.

### Exercice pratique

Redigez les 3 Lois pour VOTRE systeme, adaptees a votre contexte. Creez un template de prompt Worker qui les injecte automatiquement. Testez avec un scenario ou l'agent devrait normalement poser une question — verifiez qu'il decide et execute au lieu d'attendre.

---

## Lecon 8 — Ship pipeline, done.json et close decision tree

### Ce que vous allez apprendre

Le pipeline de deploiement automatise (ship pipeline), le protocole de fin de mission (done.json), et l'arbre de decision qui determine quand fermer une session Oracle. Le systeme de freeze en cas d'echec de deploiement.

### Contenu detaille

**Le ship pipeline en 12 etapes :**

```mermaid
graph TB
    S1["1. npm run build"] -->|FAIL| FAILED["status=failed, EXIT"]
    S1 -->|OK| S2["2. git add (files_owned)"]
    S2 -->|"extra file"| ABORT1["ABORT"]
    S2 -->|OK| S3["3. gitleaks detect --staged"]
    S3 -->|"secret detecte"| ABORT2["ABORT + alerte"]
    S3 -->|OK| S4["4. git diff --cached --check"]
    S4 -->|OK| S5["5. git commit"]
    S5 --> S6["6. flock ship-project.lock"]
    S6 --> S7{"7. ship-project.frozen?"}
    S7 -->|"OUI"| ABORT3["ABORT + alerte"]
    S7 -->|"NON"| S8["8. git pull --rebase"]
    S8 -->|"conflit"| ABORT4["ABORT, garde commit"]
    S8 -->|OK| S9["9. git push"]
    S9 --> S10["10. Deploy Vercel"]
    S10 -->|FAIL| FREEZE["FREEZE + alerte"]
    S10 -->|OK| S11["11. Poll deploy (max 10min)"]
    S11 -->|READY| S12["12. Write .done.json"]
    S11 -->|ERROR| FREEZE

    style FAILED fill:#ff0000,color:white
    style ABORT1 fill:#ff6b6b,color:white
    style ABORT2 fill:#ff6b6b,color:white
    style ABORT3 fill:#ff6b6b,color:white
    style ABORT4 fill:#ff6b6b,color:white
    style FREEZE fill:#ff9800,color:white
    style S12 fill:#66bb6a,color:white
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

```mermaid
graph TD
    PATROL["AISB Patrol<br/>(boucle 60s)"] --> READ["Lire oracle-*.done.json"]
    READ --> CHECK{status?}

    CHECK -->|done_clean| SHIP_CHECK{"ship.result?"}
    SHIP_CHECK -->|"ok/skipped"| REPORT["Envoyer rapport Telegram"]
    SHIP_CHECK -->|"failed/frozen"| KEEP_ALIVE["GARDER Oracle vivant<br/>+ alerte freeze"]

    REPORT --> SKIP{"Skip-close?"}
    SKIP -->|"lifecycle=ephemeral"| CLOSE_NOW["Close immediatement"]
    SKIP -->|">3 oracles"| CLOSE_NOW
    SKIP -->|"RAM < 2GB"| CLOSE_NOW
    SKIP -->|"Normal"| GRACE["Grace window 5min"]

    GRACE --> USER_MSG{"User message<br/>pendant window?"}
    USER_MSG -->|"OUI"| EXTEND["+15min"]
    USER_MSG -->|"NON"| KILL["tmux kill-session"]

    CHECK -->|pending| PENDING["Rapport + pending_actions<br/>+ bouton 'continuer'"]
    CHECK -->|failed| ERROR["Logs d'erreur<br/>GARDER vivant"]

    style CLOSE_NOW fill:#66bb6a,color:white
    style KILL fill:#66bb6a,color:white
    style KEEP_ALIVE fill:#ff6b6b,color:white
    style ERROR fill:#ff6b6b,color:white
```

**Le systeme de freeze :**

En cas d'echec de deploiement :
```bash
touch ~/.aisb/locks/ship-Causio.frozen

# Tous les oracles sur Causio sont bloques de push
# Jusqu'a ce que le freeze soit leve manuellement :
rm ~/.aisb/locks/ship-Causio.frozen
```

Politique par defaut : **freeze, ne pas rollback**. Le rollback automatique est lui-meme destructif et peut masquer la vraie cause (variable d'environnement manquante, panne Vercel, etc.).

**Quand le ship pipeline est active :**

| Mission contient | ship = true |
|-----------------|-------------|
| `ship`, `deploy`, `push`, `merge` | Oui |
| `/linear fix` (resolution tickets) | Oui (toujours) |
| Audits (`/codeaudit`, `/uiuxaudit`) | Non (lecture seule) |
| Recherche, exploration, planning | Non |

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

```mermaid
graph LR
    subgraph GESTALT["GESTALT (perception holistique)"]
        G1["Regarder le systeme<br/>comme un tout"]
        G2["Identifier les patterns<br/>visuels, structurels"]
        G3["L'ensemble > somme<br/>des parties"]
    end

    subgraph POPPER["POPPER (falsification)"]
        P1["Pour chaque affirmation<br/>positive"]
        P2["Chercher ce qui<br/>la falsifierait"]
        P3["Pas de 'ca a l'air bon'<br/>— des preuves"]
    end

    subgraph HINGE["HINGE POINT"]
        H1["Le point unique<br/>qui changerait tout"]
        H2["10x scrutiny sur<br/>ce point"]
    end

    GESTALT --> |"repere les problemes"| POPPER
    POPPER --> |"les prouve"| HINGE
    HINGE --> SCORE["Score objectif /100"]

    style GESTALT fill:#4a9eff,color:white
    style POPPER fill:#ff6b6b,color:white
    style HINGE fill:#ffa726,color:white
    style SCORE fill:#66bb6a,color:white
```

**Le systeme de scoring normalise :**

```
Score brut = Somme des scores par phase (chacune ponderee)
Score normalise = (score_brut / score_max) x 100

Exemple /codeaudit :
  Phase 1:  Phantom Detection     → 35/40  (poids 2x)
  Phase 2:  Dependency Health      → 50/60  (poids 3x)
  ...
  Phase 23: Final Integration     → 15/20  (poids 1x)

  Score brut : 340/420
  Score normalise : (340/420) x 100 = 80.9/100

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
  ├─ Auto-fix : l'audit corrige les problemes sans risque
  │
  ├─ Re-audit : relance les phases impactees
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

## Lecon 10 — Monitoring, heartbeat et God Mode

### Ce que vous allez apprendre

Le systeme de monitoring en temps reel d'AISB, le heartbeat pour detecter les agents defaillants, le God Mode pour les missions autonomes de plusieurs heures, et le reply-based routing pour les conversations multi-projets.

### Contenu detaille

**Le systeme de monitoring :**

```mermaid
graph TB
    subgraph MONITOR["Boucle de monitoring (30s)"]
        M1["Scanner sessions tmux"] --> M2["Mettre a jour le registry"]
        M2 --> M3["Verifier les heartbeats"]
        M3 --> M4["Detecter transitions working to idle"]
        M4 --> M5["Envoyer notifications"]
        M5 -->|"sleep 30s"| M1
    end

    REG["/tmp/aisb-sessions.json"] <--> M2
    HB["~/.aisb/heartbeats/*.beat"] <--> M3
    M5 --> TG["Telegram DM"]

    style MONITOR fill:#f5f5f5
    style TG fill:#4a9eff,color:white
```

**Le Session Registry :**

```json
{
  "oracle-Kommu": {
    "status": "working",
    "project": "Kommu",
    "started": "2026-04-02T10:30:00",
    "workers": ["Kommu-1", "Kommu-2"]
  }
}
```

**Le systeme de heartbeat :**

```bash
# Chaque oracle envoie un heartbeat toutes les 30s
~/.aisb/lib/heartbeat.sh beat oracle-Kommu

# Timeout : 2 minutes sans beat = session consideree morte
~/.aisb/lib/heartbeat.sh status
```

**God Mode — l'autonomie totale :**

God Mode transforme l'oracle en agent 100% autonome. Il planifie, execute, verifie, itere — sans aucune intervention humaine.

| Mode | Intervention | Duree | Usage |
|------|-------------|-------|-------|
| Normal | L'utilisateur envoie chaque tache | Minutes | Taches ponctuelles |
| God Mode | Zero input apres lancement | Heures | Features completes, refactoring |

**La machine a etats de God Mode :**

```mermaid
stateDiagram-v2
    [*] --> PLANNING: Lancement God Mode
    PLANNING --> WORKING: Plan cree par /planner

    WORKING --> VERIFYING: Phase terminee
    VERIFYING --> WORKING: Erreurs trouvees (max 3x)
    VERIFYING --> NEXT_PHASE: /xoxo OK

    NEXT_PHASE --> WORKING: Phase suivante
    NEXT_PHASE --> SHIPPING: Toutes phases terminees

    SHIPPING --> DONE: Build + Push + Deploy OK
    SHIPPING --> FAILED: Echec deploy

    DONE --> [*]: .done.json (done_clean)
    FAILED --> [*]: .done.json (failed)
```

Le flow God Mode :
1. READ : cat CLAUDE.md + Vision/*.md
2. PLAN : /planner (25 taches/phase, description 80+ chars)
3. EXECUTE phase par phase :
   a) Dispatch chaque tache via dispatch-to-session.sh
   b) Monitor workers
   c) KILL TOUTES les sessions workers quand done
   d) Verifier /xoxo, kill verify session
   e) npm run build, git commit
   f) Phase suivante
4. FINISH : signal file + /exit

**Reply-based routing (conversations multi-projets) :**

```python
# Quand AISB envoie un rapport, il tracke le message_id
report_message_map = {}

# Apres envoi du rapport :
msg = await send_telegram(gareth_id, report_html)
report_message_map[msg.message_id] = "Kommu"

# Quand l'utilisateur repond au rapport :
if message.reply_to_message:
    project = report_message_map.get(message.reply_to_message.id)
    if project:
        dispatch_to_oracle(project, message.text)
```

Cela permet des conversations multi-projets en DM : chaque reply est automatiquement route au bon oracle, sans besoin de repeter le nom du projet.

**Dispatch multi-projet en parallele :**

```
"Mettez a jour l'auth dans Kommu, DentistryGPT et L34D"
↓
detect_multi_project detecte 3 keywords
↓
dispatch en parallele :
→ oracle-Kommu : "Update auth system"
→ oracle-DentistryGPT : "Update auth system"
→ oracle-L34D : "Update auth system"
↓
3 rapports arrivent en DM, reply-routable individuellement
```

### Exercice pratique

Implementez un heartbeat basique et un session registry scanner. Testez la detection de signal file. Simulez un oracle mort et verifiez la detection. Configurez God Mode sur un projet simple et observez le cycle complet.

---

## Lecon 11 — Hooks, MCP et scheduling : l'automatisation avancee

### Ce que vous allez apprendre

Le systeme de hooks de Claude Code pour intercepter et automatiser chaque action, le protocole MCP pour connecter Claude a des systemes externes, et les 3 modes de scheduling pour les taches recurrentes.

### Contenu detaille

**Le systeme de hooks :**

Les hooks sont le mecanisme de controle le plus puissant de Claude Code. Ils interceptent chaque evenement du cycle de vie d'un agent.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "~/.claude/hooks/validate-bash.sh"
        }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{
          "type": "command",
          "command": "~/.claude/hooks/log-file-changes.sh",
          "async": true
        }]
      }
    ]
  }
}
```

**Les evenements de hooks disponibles :**

| Evenement | Declenchement | Usage |
|-----------|---------------|-------|
| `SessionStart` | Demarrage ou reprise | Injection de contexte |
| `UserPromptSubmit` | Soumission d'un prompt | Validation de conformite |
| `PreToolUse` | Avant execution d'un outil | Validation, blocage |
| `PostToolUse` | Apres execution reussie | Formatting, tests, logs |
| `PostToolUseFailure` | Apres echec d'un outil | Alerting, retry |
| `Stop` | Claude termine sa reponse | Gate qualite |
| `SubagentStart` | Lancement d'un sous-agent | Tracking des couts |
| `TaskCompleted` | Completion d'une tache | Validation |

**Le protocole MCP (Model Context Protocol) :**

MCP est le protocole standard d'Anthropic pour connecter Claude a des sources de donnees externes.

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-slack"],
      "env": { "SLACK_BOT_TOKEN": "$SLACK_BOT_TOKEN" }
    },
    "linear": {
      "command": "npx",
      "args": ["@linear/linear-mcp-server"],
      "env": { "LINEAR_API_KEY": "$LINEAR_API_KEY" }
    },
    "postgres": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres",
               "postgresql://user:pass@localhost/db"]
    }
  }
}
```

**Les 3 modes de scheduling :**

| Mode | Intervalle min | Machine requise | Persistance |
|------|---------------|----------------|-------------|
| Cloud (`/schedule`) | 1 heure | Non | Permanente |
| Desktop | 1 minute | Oui | Permanente |
| `/loop` (session) | 1 minute | Oui | Session uniquement |

**Patterns d'automatisation enterprise :**

| Pattern | Mode | Frequence | Action |
|---------|------|-----------|--------|
| Morning Briefing | Cloud | Quotidien 7h | Synthese multi-departement |
| Audit securite | Cloud | Hebdo lundi 2h | Scanner deps NPM/Python |
| Monitoring KPI | /loop | 30 min | Verifier KPIs, alerter si hors seuil |
| Doc auto-sync | Cloud | Sur merge main | Mettre a jour la documentation |

### Exercice pratique

Configurez 3 hooks pour votre projet : un `PreToolUse` qui bloque les commandes destructives, un `PostToolUse` qui log les modifications de fichiers, et un `Stop` qui verifie que le build passe. Testez chaque hook et verifiez qu'il fonctionne correctement.

---

## Lecon 12 — Deployer ton propre AISB : de zero a l'autonomie complete

### Ce que vous allez apprendre

Le guide pas-a-pas pour deployer votre propre systeme AISB sur un VPS, de l'installation initiale au premier message Telegram qui declenche un deploiement automatique.

### Contenu detaille

**Prerequis materiels :**

| Composant | Minimum | Recommande | Utilise par AISB reel |
|-----------|---------|-----------|----------------------|
| **VPS** | 4 CPU, 16GB RAM | 8 CPU, 32GB RAM | 8 CPU, 64GB RAM |
| **Stockage** | 100GB SSD | 250GB NVMe | 500GB NVMe |
| **OS** | Ubuntu 22.04+ | Ubuntu 24.04 | Ubuntu 24.04 |
| **SSH** | Port custom, key-only | Port custom, key-only | Port 42820, key-only |

**Le plan d'installation en 10 etapes :**

```mermaid
graph TB
    S1["1. Setup VPS<br/>(securite, SSH, user)"] --> S2["2. Installer outils<br/>(Node, Python, Claude, tmux)"]
    S2 --> S3["3. Configurer Claude Code<br/>(API key, permissions)"]
    S3 --> S4["4. Creer structure AISB<br/>(~/.aisb/, ~/.claude/)"]
    S4 --> S5["5. Ecrire agents de base<br/>(3-5 pour commencer)"]
    S5 --> S6["6. Creer bot Telegram<br/>(handlers, routing)"]
    S6 --> S7["7. Implementer classifier<br/>+ dispatcher"]
    S7 --> S8["8. Ecrire ship pipeline<br/>(oracle-ship.sh)"]
    S8 --> S9["9. Configurer patrol<br/>(cron)"]
    S9 --> S10["10. Test end-to-end<br/>(Telegram → code → deploy)"]

    style S1 fill:#ff6b6b,color:white
    style S6 fill:#4a9eff,color:white
    style S10 fill:#66bb6a,color:white
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

**Etape 2 — Installer les outils :**

```bash
# Claude Code CLI
curl -fsSL https://claude.ai/install.sh | sh
# tmux (version recente)
sudo apt install tmux
# Python 3.11+
sudo apt install python3 python3-pip python3-venv
# Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs
# jq (parsing JSON)
sudo apt install jq
# Outils supplementaires
pip install python-telegram-bot anthropic
```

**Etape 4 — Structure de fichiers AISB :**

```
~/.aisb/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── ORCHESTRATION.md
│   └── CLOUD.md
├── state/
│   ├── oracle-Causio-1.done.json
│   └── worker-blocked-*.json
├── oracles/
│   ├── Causio-1.json
│   └── DentistryGPT-1.json
├── locks/
│   ├── ship-Causio.lock
│   └── ship-Causio.frozen
├── memory/
│   ├── user/
│   ├── project/{name}/
│   └── agent-memory/{type}/
├── scratchpad/
└── lib/
    ├── dispatch-to-session.sh
    ├── worker-alive-check.sh
    ├── oracle-ship.sh
    ├── oracle-check.sh
    ├── oracle-list.sh
    └── oracle-cleanup.sh

~/.claude/
├── CLAUDE.md
├── rules/
│   ├── 000-verification.md
│   ├── 001-smart-routing.md
│   └── ...
├── agents/
│   ├── react-specialist/
│   ├── seo-expert/
│   └── ...
├── commands/
│   ├── codeaudit.md
│   ├── uiuxaudit.md
│   └── ...
└── lib/
    └── clerk-auth-browse.sh
```

**Etape 9 — Le patrol AISB (cron) :**

```bash
# Crontab entry
* * * * * /home/hacker/.aisb/lib/patrol.sh >> /var/log/aisb-patrol.log 2>&1

# patrol.sh
#!/bin/bash
for done_file in ~/.aisb/state/oracle-*.done.json; do
    [ -f "$done_file" ] || continue
    status=$(jq -r '.status' "$done_file")
    oracle=$(jq -r '.oracle' "$done_file")
    case "$status" in
        "done_clean")
            send_telegram_report "$done_file"
            schedule_close "$oracle" 300
            ;;
        "pending")
            send_telegram_pending "$done_file"
            ;;
        "failed")
            send_telegram_error "$done_file"
            ;;
    esac
done
~/.aisb/lib/oracle-cleanup.sh
```

**Etape 10 — Premier test end-to-end :**

```
1. Envoyer sur Telegram : "Cree un fichier hello.txt dans /tmp avec 'Hello AISB'"

2. Verifier :
   - AISB classifie comme SIMPLE → traite directement
   - Reponse Telegram : "Fichier cree"

3. Envoyer : "Fix le bug de la page d'accueil sur [ton projet]"

4. Verifier :
   - AISB classifie comme MEDIUM → dispatche Oracle
   - tmux ls → oracle-[projet]-1 existe
   - L'Oracle cree un Worker, le Worker fixe le bug
   - .done.json avec status=done_clean
   - Notification Telegram avec rapport
```

**Les erreurs courantes et solutions :**

| Erreur | Cause | Solution |
|--------|-------|---------|
| "Claude not found" | Pas dans PATH | `export PATH="$HOME/.claude/bin:$PATH"` dans .zshrc |
| Session tmux vide | Prompt file mal ecrit | Verifier /tmp/oracle-prompt-*.md |
| Worker bloque qui attend | 3eme Loi non injectee | Ajouter l'autonomy rule dans le template |
| Deploy freeze permanent | .frozen pas supprime | `rm ~/.aisb/locks/ship-*.frozen` |
| Build fail en boucle | Stuck detection absente | Meme erreur 3x → approche differente |

**Niveaux de maturite du systeme :**

| Niveau | Periode | Description |
|--------|---------|-------------|
| 1 — Assiste | 0-3 mois | 1 agent par tache, validation humaine, hooks de base |
| 2 — Semi-autonome | 3-6 mois | Equipes 3-5 agents, scheduling quotidien, 1er pipeline |
| 3 — Autonome | 6-12 mois | Architecture AISB complete, God Mode, dashboard monitoring |
| 4 — IA Enterprise | 12+ mois | 281 agents, scheduling cloud 24/7, SMITH en production |

### Exercice pratique

Deploiement complet : suivez les 10 etapes pour installer votre propre AISB sur un VPS. Objectif minimal viable : un bot Telegram qui recoit un message, dispatche un Oracle via tmux, et vous notifie quand le travail est termine.

---

## Les 10 principes du CAIO orchestrateur

Ces principes sont le resultat de mois d'operation du systeme AISB en production. Ils s'appliquent a tout systeme d'orchestration IA multi-agents.

**1. Separation des responsabilites.**
Aucun agent ne fait tout. Planifier, executer, auditer, et apprendre sont des roles distincts. L'Oracle ne code pas. MORPHEUS ne planifie pas. SERAPH n'implemente pas.

**2. Hierarchie stricte.**
Les messages montent et descendent dans la chaine. Pas de sauts de niveaux. Un Worker ne rapporte jamais directement a AISB.

**3. Verification avant completion.**
Jamais de "c'est fait" sans preuve. Build = 0 erreurs, tests passes, deploiement verifie. Le done.json contient le commit hash, l'URL de deploy, et le status.

**4. Propriete des fichiers.**
Dans un systeme multi-agents, chaque fichier appartient a un seul agent. Pas de conflits. Le registre Oracle declare `files_owned` pour chaque mission.

**5. Hooks pour la gouvernance.**
Toute action critique passe par un hook de validation. L'IA n'est jamais sans garde-fous. `PreToolUse` sur Bash = validation obligatoire.

**6. MCP pour l'integration.**
Les systemes metiers ne s'interrogent pas directement. MCP est le protocole universel. Un seul MCP Composio peut connecter 500+ applications.

**7. Scheduling pour la continuite.**
Les taches recurrentes ne dependent pas de la presence humaine. Morning briefings, audits de securite, monitoring KPI — tout tourne en automatique.

**8. Logs pour la conformite.**
Chaque action est tracee en JSONL immuable pour l'audit et la regulation. Le trail d'audit est append-only et horodate.

**9. Alerting intelligent.**
Les notifications Telegram ne polluent pas. Elles alertent sur les anomalies reelles. Le reply-routing permet des conversations contextuelles sans bruit.

**10. Apprentissage continu.**
SMITH analyse les patterns et ameliore le systeme. Chaque tache completee rend la suivante meilleure. Les learnings sont stockes par projet et par categorie.

---

## Glossaire AISB

| Terme | Definition |
|-------|-----------|
| **AISB** | AI Super Brain — le cerveau central du systeme, bot Python tournant en permanent |
| **Oracle** | Chef de projet IA, session tmux qui decompose, coordonne et verifie les missions |
| **Worker** | Session tmux ephemere qui execute le code, creee par un Oracle |
| **Signal file** | Fichier `/tmp/aisb-oracle-result-{Projet}.md` qui notifie AISB qu'un oracle a termine |
| **dispatch-to-session.sh** | Script qui envoie un prompt a une session tmux via `load-buffer` |
| **enhance_prompt** | Reformulation intelligente des messages utilisateur via Claude SDK |
| **God Mode** | Mode autonomie totale pour les missions longues, avec heartbeat et kill switch |
| **Heartbeat** | Signal regulier (30s) prouvant qu'une session est vivante, timeout a 2 minutes |
| **Topic** | Fil de discussion Telegram = 1 projet. Le bot detecte le projet a partir du topic_id |
| **done.json** | Fichier JSON ecrit par l'Oracle a la fin de sa mission (status: done_clean/pending/failed) |
| **Ship pipeline** | Pipeline de deploiement en 12 etapes : build, test, commit, push, deploy, verify |
| **Freeze** | Blocage des deploys apres un echec. Leve manuellement apres resolution |
| **Quality Arsenal** | 16 audits forensiques Gestalt-Popper couvrant code, UX, perf, securite, etc. |
| **Hinge Point** | Dans un audit, le point unique dont la correction a le plus grand impact sur le score |
| **Gestalt-Popper** | Methodologie combinant perception holistique (Gestalt) et falsification (Popper) |
| **/team** | Commande qui lance 3-6 agents en parallele avec liste de taches partagee |
| **/xoxo** | Verification ultra-profonde avant production (post-fix quality gate) |
| **ROUTE** | Phase 1 du pipeline — classification et routing des taches par ORACLE |
| **KEYMAKER** | Phase 2 du pipeline — planification et decomposition en DAG de taches |
| **MORPHEUS** | Phase 3 du pipeline — execution parallele avec equipes d'agents |
| **SERAPH** | Phase 4 du pipeline — audit qualite, verdict par defaut = FAIL |
| **SMITH** | Phase 5 du pipeline — apprentissage et consolidation memoire |
| **File ownership** | Declaration des fichiers possedes par chaque Oracle pour eviter les conflits |
| **Worker-alive-check** | Script qui verifie si un worker est actif (CPU > 1%) avant de le tuer |
| **Patrol** | Boucle cron (60s) qui lit les done.json et decide de la fermeture des sessions |
| **Grace window** | Delai de 5 minutes avant fermeture d'une session done_clean |
| **Claude Max** | Abonnement Claude illimite via OAuth, utilise pour tous les agents |
| **MCP** | Model Context Protocol — standard Anthropic pour connecter Claude a des outils externes |
| **Hook** | Script execute automatiquement sur un evenement Claude Code (PreToolUse, PostToolUse, etc.) |
| **Composio** | Plateforme d'integration exposant 500+ applications via un seul serveur MCP |
| **reply-routing** | Mecanisme ou la reponse a un rapport Telegram est automatiquement routee au bon Oracle |
| **3 Lois** | Runtime Truth, Research Mindset, Autonomous Execution — regles non-negociables |

---

## Fichiers cles du systeme

| Fichier | Role |
|---------|------|
| `~/.claude/config/telegram.json` | Config Telegram (token, IDs, topics) |
| `~/.aisb/lib/dispatch-to-session.sh` | Dispatch tmux fiable (load-buffer) |
| `~/.aisb/lib/oracle-ship.sh` | Pipeline de deploiement en 12 etapes |
| `~/.aisb/lib/oracle-prompt.sh` | Generateur de prompts oracle par projet |
| `~/.aisb/lib/heartbeat.sh` | Systeme de heartbeat (beat/check/status) |
| `~/.aisb/lib/worker-alive-check.sh` | Verification activite CPU d'un worker |
| `~/.aisb/lib/oracle-check.sh` | Disponibilite oracle (reuse vs new) |
| `~/.aisb/lib/oracle-cleanup.sh` | Nettoyage des sessions orphelines |
| `~/.aisb/lib/patrol.sh` | Boucle cron de surveillance des done.json |
| `/tmp/aisb-sessions.json` | Registry des sessions actives |
| `/tmp/aisb-oracle-result-*.md` | Signal files des oracles |
| `~/.aisb/oracles/{Projet}-{id}.json` | Registre Oracle avec files_owned |
| `~/.aisb/state/oracle-*.done.json` | Status de completion des oracles |
| `~/.aisb/locks/ship-{Projet}.lock` | Lock de serialisation des push |
| `~/.aisb/locks/ship-{Projet}.frozen` | Freeze apres echec deploy |
| `~/.aisb/prompts/oracle-*.md` | Prompts generes par projet |
| `~/.aisb/heartbeats/{session}.beat` | Fichiers de heartbeat |
| `~/.aisb/status/godmode-sessions.json` | Etat God Mode persistant |
| `~/.aisb/memory/project/{name}/` | Memoire persistante par projet |
| `~/.aisb/smith/learnings.jsonl` | Apprentissages SMITH |

---

## Commandes essentielles

```bash
# Bot
sudo systemctl status agentik-monitor-bot
sudo systemctl restart agentik-monitor-bot
journalctl -u agentik-monitor-bot -f

# tmux
tmux list-sessions
tmux capture-pane -t "session" -p -S -50
tmux kill-session -t "session"

# Telegram CLI
telegram send <chat_id> "message"
telegram file <chat_id> /path/to/file "caption"

# Oracle dispatch
~/.aisb/lib/dispatch-to-session.sh SESSION "prompt" /path

# Monitoring
cat /tmp/aisb-sessions.json | jq .
~/.aisb/lib/heartbeat.sh status
~/.aisb/lib/oracle-list.sh

# Cleanup
~/.aisb/lib/oracle-cleanup.sh
rm -f /tmp/aisb-oracle-result-*.md
rm -f /tmp/dispatch-*.txt
```

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
- Maitrise des hooks, MCP et scheduling pour l'automatisation avancee
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
