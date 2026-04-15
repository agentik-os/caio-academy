# Formation — Setup Complet d'Oracle, AISB, Telegram et tmux

## Instructions pour l'Agent Createur de Formation

> **Objectif** : Former quelqu'un a comprendre et reproduire l'architecture complète d'AISB (AI Super Brain), le système autonome d'orchestration IA qui permet a un seul fondateur de gerer 11 projets simultanement via Telegram.
>
> **Ton** : Direct, pragmatique, technique mais accessible. On explique comme si on montrait le système a un CTO curieux.
>
> **Public cible** : Developpeurs, CTOs, fondateurs tech qui veulent construire leur propre système d'orchestration IA autonome.
>
> **Pre-requis** : Connaissances basiques en Linux, tmux, Python, et API Telegram.
>
> **Duree estimee** : 20-25 heures de contenu. 3-4 semaines pour completer.

---

## Identite de la Formation

| Champ | Valeur |
|-------|--------|
| Nom | **Oracle & AISB Setup Complet** |
| Sous-titre | Construis ton cerveau IA autonome avec Telegram, tmux et Claude Code |
| Createur | Gareth Simono — Fondateur d'Agentik {OS} |
| Public cible | Devs, CTOs, fondateurs qui veulent un système IA autonome |
| Pre-requis | Linux, tmux, Python basics, API Telegram |
| Promesse | "En 4 semaines, tu as un système IA complet qui orchestre tes projets depuis Telegram" |

---

## PARTIE 1 — Comprendre l'Architecture (La Vision)

### MODULE 1 — Vue d'ensemble : Les 4 Niveaux d'AISB

**Objectif du module** : Comprendre comment un seul fondateur peut gerer 11+ projets avec 281 agents IA, sans jamais ouvrir un IDE.

**Lecons a générer :**

1.1 **Le Problème : Pourquoi un Système Autonome**
- Le goulot d'etranglement du fondateur solo : trop de projets, pas assez de mains
- Le modèle traditionnel : 1 projet = 1 dev = $100K+/an
- Le modèle AISB : 1 fondateur + 1 VPS + 281 agents = 11 projets simultanement
- Analogie : AISB est ton CTO, tes devs, et ton QA — dans un serveur

1.2 **Les 4 Niveaux d'Architecture**

> +-----------------------------------------------------------+
> | NIVEAU 1 : AISB (Le Cerveau) |
> | Bot Telegram (systemd) - Claude SDK - Router - Memoire |
> | NE CODE JAMAIS — Route tout aux niveaux inferieurs |
> +-----------------------------------------------------------+
> |
> +-----------------------------------------------------------+
> | NIVEAU 2 : ORACLES (Chefs de Projet) |
> | Sessions tmux a la demande — Max 3 simultanees |
> | Analysent - Decomposent - Creent des workers - Reportent |
> +-----------------------------------------------------------+
> |
> +-----------------------------------------------------------+
> | NIVEAU 3 : WORK SESSIONS (Les Executants) |
> | Sessions tmux ephemeres — {Projet}-1, {Projet}-2... |
> | Executent le code - Slash commands - Deploy |
> +-----------------------------------------------------------+
> |
> +-----------------------------------------------------------+
> | NIVEAU 4 : TEAMS & AGENTS (L'Armee) |
> | 281 agents - 130+ skills - /team /hunt-all /ralph |
> | 3-6 agents en parallele par /team |
> +-----------------------------------------------------------+
- **Regle d'or** : Chaque niveau parle UNIQUEMENT au niveau adjacent. Jamais de skip.
- AISB ne code jamais. Les Oracles ne codent jamais. Seuls les Workers touchent le code.
- Les resultats remontent : Worker -> Oracle -> AISB -> Telegram -> Toi

1.3 **La Chaine Complète d'un Message**

> Toi (Telegram) : "fix le login dans Kommu"
> → AISB Bot recoit le message
> → Identifie le projet (keyword "Kommu")
> → enhance_prompt : reformule + ajoute contexte git
> → Dispatche vers oracle-Kommu (tmux, a la demande)
> → Oracle analyse, decompose la tache
> → Créé session Kommu-1, lance /team
> → 3-6 agents Claude Code executent en parallele
> → Monitore les workers (capture-pane toutes les 30s)
> → Kill les workers, lance /xoxo (verification)
> → Gate : npm build + git push
> → Ecrit signal file /tmp/aisb-oracle-result-Kommu.md
> → oracle_result_watcher detecte le fichier (poll 3s)
> → Envoie le rapport sur Telegram
> ← Toi recois : "Auth fixe. Token refresh avec retry 3x. Build OK."
1.4 **Pourquoi Cette Architecture et Pas une Autre**
- Pourquoi pas un seul agent qui fait tout ? Contexte limite, pas de specialisation
- Pourquoi 4 niveaux ? Separation des responsabilites, visibilite, scalabilite
- Pourquoi tmux ? Persistance, monitoring, pas besoin de browser
- Pourquoi Telegram ? Interface mobile, topics = gestion de projet, voix supportee
- Comparaison : ChatGPT + Cursor vs AISB — controlabilite, autonomie, reporting

---

### MODULE 2 — Infrastructure : Le VPS comme Centre de Commande

**Objectif du module** : Configurer un VPS capable de faire tourner l'ecosysteme AISB complet.

**Lecons a générer :**

2.1 **Specifications du VPS**

| Composant | Minimum | Recommande |
|-----------|---------|------------|
| CPU | 4 cores | 8 cores |
| RAM | 8 GB | 16 GB |
| Stockage | 50 GB SSD | 100 GB SSD |
| OS | Ubuntu 22.04+ | Ubuntu 24.04 |
| SSH | Port custom (sécurité) | Port 42820 + key-only |

- Pourquoi un VPS et pas ton laptop ? Disponibilite 24/7, pas de sleep, sessions persistantes
- Providers recommandes : Hetzner, OVH, DigitalOcean, Vultr
- Budget : $20-50/mois pour un setup production

2.2 **Setup Initial du VPS**

```bash
# 1. Créer un user non-root
adduser hacker
usermod -aG sudo hacker

# 2. SSH key-only (sécurité)
ssh-keygen -t ed25519 -C "aisb@monvps"
# Copier la cle publique dans ~/.ssh/authorized_keys
# Desactiver password auth dans /etc/ssh/sshd_config

# 3. Installer ZSH (shell obligatoire)
sudo apt install zsh
chsh -s $(which zsh)

# 4. Structure des repertoires
mkdir -p ~/VibeCoding/work ~/VibeCoding/clients ~/VibeCoding/1-life
mkdir -p ~/.claude/config ~/.claude/rules ~/.claude/agents
mkdir -p ~/.aisb/lib ~/.aisb/docs ~/.aisb/prompts ~/.aisb/heartbeats
2.3 **Installer les Outils Essentiels**
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
2.4 **Configuration de Claude Code**

```bash
# Mode dangerously-skip-permissions (nécessaire pour l'autonomie)
# Chaque session tmux lance Claude avec :
claude --dangerously-skip-permissions

# Configuration globale
# ~/.claude/settings.json
{
 "permissions": {
 "allow": ["Bash", "Read", "Write", "Edit", "Glob", "Grep"]
 }
}

# CLAUDE.md global — instructions chargees a chaque session
# ~/CLAUDE.md contient les regles du projet
> **Exercice pratique** :
> - [ ] Provisionner un VPS
> - [ ] Configurer SSH key-only sur port custom
> - [ ] Installer Claude Code, tmux, Python, Node.js
> - [ ] Créer la structure de repertoires
> - [ ] Verifier que `claude --dangerously-skip-permissions` fonctionne
>
> ---
>
> ## PARTIE 2 — Le Bot Telegram (AISB, Le Cerveau)
>
> ### MODULE 3 — Créer le Bot Telegram
>
> **Objectif du module** : Mettre en place le bot Telegram qui sert de point d'entree unique au système.
>
> **Lecons a générer :**
>
> 3.1 **Créer le Bot avec @BotFather**
> - Ouvrir Telegram, chercher @BotFather
> - `/newbot` → nommer ton bot (ex: "MonAISBBot")
> - Recuperer le token : `8782724525:AAExxxxxxxxxxxxxxxxxx`
> - Activer le mode groupe et les topics/forum
>
> 3.2 **Configurer le Groupe Telegram avec Topics**
>
> Un groupe Telegram avec les topics (forum) actives = ton tableau de bord projet.
>
> | Topic | Projet | Usage |
> |-------|--------|-------|
> | Général | AISB | Messages système, statuts |
> | Topic 27 | DentistryGPT | Tout ce qui concerne DentistryGPT |
> | Topic 28 | Causio | Tout ce qui concerne Causio |
> | Topic 31 | Kommu | Tout ce qui concerne Kommu |
> | Topic 32 | AgentikOS | Tout ce qui concerne AgentikOS |
> | ... | ... | ... |
>
> - Chaque projet = 1 topic = 1 fil de conversation isole
> - Tu ecris dans un topic → AISB sait automatiquement quel projet tu vises
> - Les rapports arrivent dans le DM (pas dans le topic) pour ne rien rater
>
> 3.3 **Le Fichier de Configuration Telegram**
>
> ```json
> // ~/.claude/config/telegram.json
> {
> "bot": {
> "name": "AISB",
> "username": "MonAISBBot",
> "token": "TON_TOKEN_ICI"
> },
> "authorized_users": [
> 123456789
> ],
> "group_chat_id": -1001234567890,
> "settings": {
> "allow_commands": true,
> "allow_file_sharing": true,
> "notify_on_task_complete": true,
> "notify_on_error": true
> }
> }
- `authorized_users` : SEUL toi peux parler au bot (sécurité)
- `group_chat_id` : ID du groupe avec topics (commence par -100)
- Pour trouver ton chat_id : envoie un message au bot, puis `telegram chat_id`

3.4 **Le CLI Telegram (telegram.sh)**

Script utilitaire pour envoyer des messages depuis n'importe quel script :

```bash
#!/bin/bash
# ~/.local/bin/telegram
CONFIG_FILE="$HOME/.claude/config/telegram.json"
TOKEN=$(cat "$CONFIG_FILE" | python3 -c "import sys,json; print(json.load(sys.stdin)['bot']['token'])")
API="https://api.telegram.org/bot$TOKEN"

send_message() {
 local chat_id=$1
 local text=$2
 curl -s -X POST "$API/sendMessage" \
 -d "chat_id=$chat_id" \
 -d "text=$text" \
 -d "parse_mode=Markdown" > /dev/null
}

send_file() {
 local chat_id=$1
 local file_path=$2
 local caption=${3:-""}
 curl -s -X POST "$API/sendDocument" \
 -F "chat_id=$chat_id" \
 -F "document=@$file_path" \
 -F "caption=$caption" > /dev/null
}

notify_all() {
 local message=$1
 for chat_id in $(get_authorized_users); do
 send_message "$chat_id" "$message"
 done
}

# Usage: telegram send <chat_id> "message"
# Usage: telegram file <chat_id> /path/to/file "caption"
# Usage: telegram notify "message a tous"
> - Rendre executable : `chmod +x ~/.local/bin/telegram`
> - Ajouter au PATH : `export PATH="$HOME/.local/bin:$PATH"` dans `~/.zshrc`
>
> **Exercice pratique** :
> - [ ] Créer un bot Telegram via @BotFather
> - [ ] Créer un groupe avec topics actives
> - [ ] Configurer `telegram.json` avec les bons IDs
> - [ ] Tester `telegram send <ton_id> "Hello AISB"`
> - [ ] Envoyer un fichier test avec `telegram file`
>
> ---
>
> ### MODULE 4 — Le Bot AISB : Le Cerveau Python
>
> **Objectif du module** : Comprendre et construire le bot Python qui orchestre tout le système.
>
> **Lecons a générer :**
>
> 4.1 **Architecture du Bot**
>
> Le bot AISB est un package Python avec 22+ modules :
bot/
 main.py # Point d'entree (importe aisb/)
 aisb/
 __init__.py
 config.py # Chargement de la config
 state.py # Etat global du bot
 auth.py # Verification des users autorises
 handlers.py # Handlers Telegram (messages, callbacks)
 commands.py # Commandes Telegram (/start, /stop, /status)
 oracle_commands.py # Commandes directes oracle (/dent, /kommu, etc.)
 process_prompt.py # Routing des messages vers oracles
 prompts.py # Templates de prompts
 sessions.py # Gestion des sessions tmux
 tmux_dispatch.py # Interface avec tmux
 claude_runner.py # Interface avec Claude SDK
 formatting.py # Conversion Markdown → HTML Telegram
 telegram_utils.py # Utilitaires Telegram
 voice.py # Transcription vocale (Whisper)
 intelligence.py # God Mode, evaluation des taches
 monitor.py # Boucle de monitoring (30s)
 nerve.py # Tracking des taches (AISB Nerve)
 routines.py # Taches planifiees
 app.py # Application Telegram (setup)
4.2 **Le Coeur : Le Routing des Messages**
Le routing est la fonction la plus critique. Voici comment AISB decide ou envoyer ton message :
```python
# Pseudo-code simplifie du routing
async def process_message(message):
text = message.text
chat_id = message.chat.id
topic_id = message.message_thread_id # None si DM
# 1. Commande directe oracle ? (/dent, /kommu, etc.)
if text.startswith('/'):
project = match_direct_command(text)
if project:
dispatch_to_oracle(project, text)
return
# 2. Réponse a un rapport AISB ?
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
for p in projects: # Parallele !
dispatch_to_oracle(p, text)
else:
# Pas de projet detecte → AISB repond directement
response = await aisb_direct_answer(text)
send_telegram(chat_id, response)
4.3 **enhance_prompt : L'Intelligence N+1**

Le secret d'AISB : il ne transmet JAMAIS ton message brut aux oracles. Il le reformule d'abord.

> Ton message : "fix le login" (15 caracteres, vague)
> ↓
> enhance_prompt : Claude SDK reformule + analyse git
> ↓
> Prompt oracle : "## Objectif technique
> Corriger le flux d'authentification login.
> ## Fichiers concernes
> src/auth/login.ts, src/middleware.ts
> ## Criteres de succès
> - Login flow works end-to-end
> - npm run build = 0 errors
> ## Contexte git
> Branch: main, dernier commit: fix token refresh"
- Utilise `claude --print` via stdin pipe
- Force OAuth (Claude Max, unlimited) en vidant `ANTHROPIC_API_KEY`
- Timeout 60s, fallback sur template structure si Claude echoue
- Inputs/outputs sauves dans `.oracles/aisb-reformat-*.md`

4.4 **Le Report Pipeline : Comment les Resultats Reviennent**

> Oracle ecrit /tmp/aisb-oracle-result-{projet}.md
> ↓
> oracle_result_watcher (poll toutes les 3s) detecte le fichier
> ↓
> Envoi direct Telegram via markdown_to_telegram_html
> ↓
> message_id → projet tracke dans _report_message_map
> ↓
> Quand tu replies au rapport → auto-dispatch au même oracle
- Le watcher est un thread background dans le bot
- Pas besoin de Claude SDK pour le rapport final — envoi direct
- Le tracking message_id permet les conversations multi-projets en DM

4.5 **Service systemd : Toujours Running**

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
> ```bash
> sudo systemctl enable agentik-monitor-bot
> sudo systemctl start agentik-monitor-bot
> sudo systemctl status agentik-monitor-bot # Verifier
> journalctl -u agentik-monitor-bot -f # Logs en temps reel
**Exercice pratique** :
- [ ] Créer la structure du bot Python
- [ ] Implementer le routing basique (topic → projet)
- [ ] Implementer enhance_prompt avec Claude SDK
- [ ] Implementer le report pipeline (signal file → Telegram)
- [ ] Deployer en tant que service systemd
- [ ] Tester : envoyer un message dans un topic, verifier la reformulation

---

## PARTIE 3 — tmux : Le Système Nerveux

### MODULE 5 — tmux pour l'Orchestration IA

**Objectif du module** : Maitriser tmux comme infrastructure d'orchestration de sessions Claude Code.

**Lecons a générer :**

5.1 **Pourquoi tmux est Essentiel**
- Persistance : les sessions survivent aux deconnexions SSH
- Multiplexage : 10+ sessions Claude Code en parallele
- Monitoring : `capture-pane` pour lire la sortie de chaque agent
- Controle : `send-keys` et `load-buffer` pour envoyer des commandes

5.2 **Les Types de Sessions tmux dans AISB**

| Type | Pattern | Createur | Duree |
|------|---------|----------|-------|
| **Master** | `Home` | Bot systemd | Permanent |
| **Oracle** | `oracle-{Projet}` | dispatch-to-session.sh | A la demande (max 3) |
| **Worker** | `{Projet}-N` | Oracle | Ephemere (tue après tache) |
| **Verification** | `{Projet}-verify` | Oracle | Ephemere (tue après check) |
| **Agent AISB** | `AISB-{AGENT}` | spawn-agent.sh | Ephemere (auto-cleanup) |
| **Home task** | `Home-{topic}` | AISB | Ephemere |

Regles critiques :
- **Max 3 oracles simultanees** — le bot refuse d'en créer plus
- **Oracles a la demande (lazy mode)** — zero sessions au boot, spawn quand nécessaire
- **Workers tues par l'oracle** après chaque tache — jamais de sessions orphelines
- **Session registry** : `/tmp/aisb-sessions.json` — source de vérité

5.3 **dispatch-to-session.sh : Le Script le Plus Important**

Ce script est utilise pour CHAQUE interaction avec une session tmux :

```bash
#!/bin/bash
# dispatch-to-session.sh SESSION_NAME "prompt text" [workdir]
SESSION="$1"
PROMPT="$2"
WORKDIR="${3:-$(pwd)}"

# 1. Créer la session si elle n'existe pas
if ! tmux has-session -t "$SESSION" 2>/dev/null; then
 tmux new-session -d -s "$SESSION" -c "$WORKDIR"
 sleep 1
fi

# 2. Lancer Claude Code si pas déjà running
PANE_CMD=$(tmux list-panes -t "$SESSION" -F '#{pane_current_command}')
if [ "$PANE_CMD" != "claude" ]; then
 tmux send-keys -t "$SESSION" "claude --dangerously-skip-permissions" Enter
 sleep 7 # Claude met ~7s a boot
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
tmux send-keys -t "$SESSION" "C-u" # Clear input
tmux load-buffer "$TMPFILE"
tmux paste-buffer -p -t "$SESSION" # -p = paste literal
sleep 0.5
tmux send-keys -t "$SESSION" Enter # Envoyer !

rm -f "$TMPFILE"
echo "Dispatched to $SESSION (${#PROMPT} chars)"
> **Points critiques** :
> - `load-buffer` + `paste-buffer -p` au lieu de `send-keys` : `send-keys` tronque après ~500 chars
> - Sleep 7s après le demarrage de Claude : le CLI met du temps a boot
> - Detection du prompt ">" pour savoir quand Claude est prêt
> - `-p` flag sur `paste-buffer` : preserve les newlines sans les executer
>
> 5.4 **Monitoring des Workers**
>
> ```bash
> # Capturer les 50 dernieres lignes d'un worker
> tmux capture-pane -t "Kommu-1" -p -S -50
>
> # Indicateurs de statut :
> # "Thinking..." / "Running..." / "Writing..." = encore en cours
> # ">" visible = termine ou idle
> # Messages d'erreur = intervention nécessaire
>
> # Boucle de monitoring (dans l'oracle)
> while true; do
> OUTPUT=$(tmux capture-pane -t "Kommu-1" -p -S -50)
> if echo "$OUTPUT" | grep -q ">"; then
> echo "Worker termine"
> break
> fi
> sleep 30
> done
5.5 **Cleanup des Sessions (CRITIQUE)**

```bash
# Tuer TOUS les workers d'un projet
for s in $(tmux list-sessions -F '#{session_name}' | grep '^Kommu-'); do
 tmux kill-session -t "$s"
done

# Tuer une session specifique
tmux kill-session -t "Kommu-1"

# Lister toutes les sessions actives
tmux list-sessions

# REGLE ABSOLUE : l'oracle DOIT kill ses workers quand ils ont fini
# Les sessions tmux ne se ferment PAS toutes seules
# Des sessions orphelines = fuite de RAM + confusion
> **Exercice pratique** :
> - [ ] Créer manuellement 3 sessions tmux (oracle, worker, verify)
> - [ ] Lancer Claude Code dans chacune
> - [ ] Envoyer un prompt via `load-buffer` + `paste-buffer`
> - [ ] Monitorer avec `capture-pane`
> - [ ] Cleanup propre : kill toutes les sessions
> - [ ] Ecrire ton propre `dispatch-to-session.sh`
>
> ---
>
> ### MODULE 6 — Les Oracles : Chefs de Projet IA
>
> **Objectif du module** : Comprendre le role et le fonctionnement des Oracles.
>
> **Lecons a générer :**
>
> 6.1 **Le Role de l'Oracle**
>
> Un Oracle est un chef de projet IA. Il ne code JAMAIS — il :
> 1. **Analyse** la tache (lit CLAUDE.md, git log, etc.)
> 2. **Decompose** en sous-taches executables
> 3. **Dispatche** aux workers via dispatch-to-session.sh
> 4. **Monitore** l'avancement (capture-pane toutes les 30s)
> 5. **Verifie** le resultat (/xoxo, npm build)
> 6. **Rapporte** a AISB (signal file)
>
> 6.2 **Le Workflow en 5 Étapes**
Étape 1 : ANALYSE
 → cat CLAUDE.md du projet
 → Decomposer la tache
 → Definir les criteres de succès

Étape 2 : DISPATCH
 → ~/.aisb/lib/dispatch-to-session.sh {Projet}-1 '/team [tache]' /path
 → Le prompt aux workers DOIT contenir :
 - Description précise + fichiers + criteres de succès
 - "npm run build quand termine, git commit"

Étape 3 : MONITORING
 → tmux capture-pane -t {Projet}-1 -p -S -50
 → Toutes les 30 secondes
 → Detecter : en cours, termine, erreur

Étape 4 : CLEANUP + VERIFICATION
 → Kill TOUS les workers
 → Lancer /xoxo (verification ultra-profonde)
 → Si erreurs : fix → re-/xoxo (max 3 tentatives)
 → Kill la session de verification

Étape 5 : GATE + RAPPORT
 → npm run build (0 erreurs)
 → git commit + push
 → Ecrire le signal file
 → /exit (auto-cleanup de la session oracle)
6.3 **Le Signal File (CRITIQUE)**
C'est le mecanisme par lequel l'oracle informe AISB qu'il a termine :
```markdown
# Fichier : /tmp/aisb-oracle-result-{Projet}.md
# Oracle Report — {Projet}
PROJECT:{Projet}
STATUS:DONE
BUILD:PASS
## Resume
- Authentification corrigee : token refresh ajoute dans middleware
- Tests unitaires ajoutes pour le flux login
## Not Done
- Rien, tache complète
## Next Steps
- Surveiller les logs en production pour confirmer
- **Sans ce fichier, AISB ne sait pas que le travail est fait**
- Le watcher poll toutes les 3 secondes pour detecter les nouveaux fichiers
- Fallback : si l'oracle oublie, le monitor detecte le passage working→idle et ecrit le fichier automatiquement

6.4 **Le System Prompt de l'Oracle**

Généré dynamiquement par `oracle-prompt.sh` pour chaque projet :

```bash
# Usage :
~/.aisb/lib/oracle-prompt.sh {NOM_PROJET} {CHEMIN_PROJET} {SESSION_WORKER}
# Output : ~/.aisb/prompts/oracle-{PROJET}.md

# Injecte au demarrage de l'oracle :
claude --dangerously-skip-permissions \
 --append-system-prompt-file ~/.aisb/prompts/oracle-{PROJET}.md
> Le prompt contient :
> - **Regle #1** : Dispatche pour les changements, lis directement pour l'analyse
> - **Decision matrix** : /team (90% des cas) vs /ralph (10%)
> - **Template de monitoring** : capture-pane toutes les 30s
> - **Instructions de cleanup** : kill les sessions, ecrire le signal file
> - **God Mode** : instructions pour l'autonomie complète si demande
>
> 6.5 **Tableau des Oracles Disponibles**
>
> | Session Oracle | Projet | Topic ID | Commande Directe |
> |---------------|--------|----------|------------------|
> | oracle-DentistryGPT | DentistryGPT | 27 | `/dent` |
> | oracle-Causio | Causio | 28 | `/causio` |
> | oracle-Loumna | Loumna | 29 | `/loumna` |
> | oracle-L34D | L34D | 30 | `/l34d` |
> | oracle-Kommu | Kommu | 31 | `/kommu` |
> | oracle-AgentikOS | AgentikOS | 32 | `/agentikos` |
> | oracle-AgentikMonitor | Dashboard | 293 | `/monitor` |
> | oracle-OneLife | OneLife | 303 | `/onelife` |
> | oracle-AI-GenX | AI-GenX | 1925 | `/aigenx` |
> | oracle-AGKT | AGKT | 2103 | `/agkt` |
> | oracle-LaSphere | LaSphere | 2110 | `/lasphere` |
>
> Alias pratiques : `/lawyer` → Causio, `/moon` → Loumna, `/lead` → L34D, `/aos` → AgentikOS
>
> **Exercice pratique** :
> - [ ] Ecrire un oracle-prompt.sh pour ton propre projet
> - [ ] Tester le workflow complet : analyse → dispatch → monitor → cleanup → signal
> - [ ] Verifier que le signal file est bien detecte
> - [ ] Ajouter un nouveau projet a la table des oracles
>
> ---
>
> ## PARTIE 4 — Les 12 Agents AISB (L'Equipe Matrix)
>
> ### MODULE 7 — Les Agents Core et la Hierarchie
>
> **Objectif du module** : Comprendre les 12 agents AISB et la hierarchie C-Level.
>
> **Lecons a générer :**
>
> 7.1 **Les 12 Agents Core (Theme Matrix)**
>
> | Agent | Role | Modèle | Tier |
> |-------|------|--------|------|
> | **ORACLE** | Classification et routing des taches | Opus | Core |
> | **MORPHEUS** | Execution et coordination | Opus | Core |
> | **KEYMAKER** | Planification d'implementation | Sonnet | Core |
> | **SERAPH** | Gates de qualité et verification | Sonnet | Core |
> | **SMITH** | Auto-amelioration et apprentissage | Sonnet | Specialiste |
> | **NIOBE** | Recherche profonde et intelligence | Sonnet | Specialiste |
> | **Architect** | Design système et infrastructure | Sonnet | Specialiste |
> | **MEROVINGIAN** | Consolidation de connaissances | Haiku | Support |
> | **NEO** | Monitoring de sessions et sante | Haiku | Support |
> | **ZION** | Dashboard metriques et statut | Haiku | Support |
> | **LINK** | Relay de communication (Telegram) | Haiku | Support |
> | **CONSTRUCT** | Setup d'environnement et outils | Haiku | Support |
>
> 7.2 **Le Pipeline AISB**
> ROUTE (Oracle) → PLAN (Keymaker) → EXECUTE (Morpheus) → AUDIT (Seraph) → LEARN (Smith)
> - **ROUTE** : Oracle classifie la tache (SIMPLE/MEDIUM/COMPLEX/EPIC)
> - **PLAN** : Keymaker créé un DAG de taches avec milestones
> - **EXECUTE** : Morpheus coordonne l'execution via /team
> - **AUDIT** : Seraph verifie la qualité (default verdict = FAIL)
> - **LEARN** : Smith analyse les patterns et propose des ameliorations
>
> 7.3 **La Hierarchie C-Level (281 Agents)**
CEO — Coordination stratégique (tous les 281 agents)
├── CTO — Technique (117 agents)
│ ├── dev-lead (44 agents) : React, Next.js, Prisma, Auth...
│ ├── qa-lead (35 agents) : Tests, E2E, Performance, A11y...
│ └── security-lead (29 agents) : OWASP, Pentest, Compliance...
├── CMO — Marketing + Créatif (43 agents)
│ ├── marketing-lead (28 agents) : Blog, SEO, Email, Ads...
│ └── créative-lead (15 agents) : Design, Video, Branding...
└── CPO — Stratégie & Analytics (32 agents)
 └── strategy-lead (32 agents) : Competitor, Pricing, Data...
7.4 **Classification des Taches**
| Niveau | Signaux | Action |
|--------|---------|--------|
| **SIMPLE** | Typo, config, question rapide | Oracle fait lui-même (lecture seule) |
| **MEDIUM** | Multi-fichiers, pattern connu | 1 worker + /team |
| **COMPLEX** | Multi-domaine, 30min+ | /team avec specialistes |
| **EPIC** | Cross-departement, heures+ | /aisb full ou /godmode |
7.5 **Les Slash Commands (Arsenal du Worker)**
| Commande | Agents | Usage |
|----------|--------|-------|
| `/team [tache]` | 3-6 senior | DEFAULT — 90% des taches |
| `/ralph [tache]` | 1 autonome | Tache simple ou longue en background |
| `/godmode [tache]` | Autonomie totale | Missions de plusieurs heures |
| `/hunt-all` | 13 hunters | Audit complet de bugs |
| `/xoxo [scope]` | Verification profonde | Avant production |
| `/verify [scope]` | Verification rapide | Après fix |
| `/build` | Pipeline | Build + deploy en prod |
| `/planner` | DAG | Planification step-by-step |
**Exercice pratique** :
- [ ] Ecrire un agent custom dans `~/.claude/agents/`
- [ ] Tester la classification : envoyer 5 taches de niveaux différents
- [ ] Observer le routing : quelle commande est choisie pour chaque tache
- [ ] Lancer un /team et observer les 3-6 agents en parallele
---
## PARTIE 5 — Le Monitoring et la Sante du Système
### MODULE 8 — Heartbeat, Session Registry et Monitoring
**Objectif du module** : Garantir que le système est toujours sain et observable.
**Lecons a générer :**
8.1 **Le Session Registry**
```bash
# /tmp/aisb-sessions.json — mis a jour toutes les 30s par le bot
# Source de vérité pour toutes les sessions actives
cat /tmp/aisb-sessions.json | jq .
# Structure :
{
"oracle-Kommu": {
"status": "working",
"project": "Kommu",
"started": "2026-04-02T10:30:00",
"workers": ["Kommu-1", "Kommu-2"]
}
}
- Le bot lit ce fichier pour enforcer la limite de 3 oracles
- Le "Back Online" message affiche les sessions actives + emojis projet

8.2 **Le Système de Heartbeat**

```bash
# Chaque oracle envoie un heartbeat toutes les 30s
~/.aisb/lib/heartbeat.sh beat oracle-Kommu

# Fichiers : ~/.aisb/heartbeats/{session}.beat
# Contenu : timestamp du dernier beat

# Timeout : 2 minutes sans beat = session consideree morte
# Verification :
~/.aisb/lib/heartbeat.sh status
8.3 **La Boucle de Monitoring (monitor.py)**
Le module `monitor.py` dans le bot tourne en background :
```python
# Pseudo-code simplifie
async def monitor_loop():
while True:
# 1. Scanner les sessions tmux actives
sessions = get_tmux_sessions()
# 2. Mettre a jour le registry
update_session_registry(sessions)
# 3. Verifier les heartbeats
for oracle in active_oracles:
if heartbeat_expired(oracle):
handle_dead_oracle(oracle)
# 4. Detecter les transitions working → idle
for oracle in active_oracles:
if was_working(oracle) and is_now_idle(oracle):
# Oracle a fini mais n'a pas ecrit le signal ?
auto_write_signal(oracle)
# 5. Envoyer notifications DM si completion detectee
await asyncio.sleep(30)
8.4 **Le Watcher de Resultats (oracle_result_watcher)**

```python
# Thread background qui poll /tmp/ pour les signal files
def oracle_result_watcher():
 while True:
 for project in known_projects:
 signal = f"/tmp/aisb-oracle-result-{project}.md"
 if os.path.exists(signal):
 content = read_file(signal)
 html = markdown_to_telegram_html(content)
 msg = send_telegram_dm(gareth_id, html)
 report_message_map[msg.id] = project
 os.remove(signal)
 time.sleep(3)
8.5 **Commandes de Debug**
```bash
# Lister toutes les sessions tmux
tmux list-sessions
# Verifier les heartbeats
~/.aisb/lib/heartbeat.sh status
# Voir le registry
cat /tmp/aisb-sessions.json | jq .
# Logs du bot
journalctl -u agentik-monitor-bot -f
# Kill d'urgence tout
tmux kill-server # ATTENTION : tue TOUT
# Kill selectif
tmux kill-session -t "oracle-Kommu"
**Exercice pratique** :
- [ ] Implementer un heartbeat basique
- [ ] Ecrire un session registry scanner
- [ ] Tester la detection de signal file
- [ ] Simuler un oracle mort et verifier la detection
- [ ] Monitorer 3 sessions en parallele pendant 5 minutes

---

## PARTIE 6 — God Mode et Automatisation Avancee

### MODULE 9 — God Mode : L'Autonomie Totale

**Objectif du module** : Comprendre et configurer le mode God Mode pour les missions longues.

**Lecons a générer :**

9.1 **Qu'est-ce que God Mode**

God Mode = l'oracle devient 100% autonome. Il planifie, execute, verifie, itere — sans aucune intervention humaine.

| Mode | Intervention | Duree | Usage |
|------|-------------|-------|-------|
| Normal | Gareth envoie chaque tache | Minutes | Taches ponctuelles |
| God Mode | Zero input après lancement | Heures | Features completes, refactoring |

9.2 **La Machine a Etats de God Mode**

> WORK → (STATUS:DONE detecte) → VERIFYING → (/xoxo ok) → DONE
> ^ |
> +---- (erreurs trouvees) --------+
- **WORK** : Oracle execute le plan phase par phase
- **VERIFYING** : Oracle lance /xoxo pour verifier
- **Si erreurs** : retour en WORK pour corriger
- **DONE** : Signal file ecrit, rapport envoye

9.3 **Le Flow God Mode de l'Oracle**

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
9.4 **Etat Persistant**

```bash
# God Mode state persistant dans :
~/.aisb/status/godmode-sessions.json

# Structure :
{
 "oracle-Kommu": {
 "state": "WORK",
 "goal": "Implementer le système de paiement complet",
 "iteration": 3,
 "started": "2026-04-02T10:00:00",
 "progress_log": [
 "Phase 1: Schema DB complète",
 "Phase 2: API endpoints done",
 "Phase 3: Frontend en cours..."
 ]
 }
}
> - `godmode_evaluate()` dans `intelligence.py` gere les transitions
> - Le progress log permet de reprendre après un crash
> - Pre-check : si "Not Done" items → CONTINUE (pas besoin de demander)
>
> ---
>
> ### MODULE 10 — Reply-Based Routing et Multi-Projet
>
> **Objectif du module** : Gerer plusieurs projets simultanement via les réponses Telegram.
>
> **Lecons a générer :**
>
> 10.1 **Le Reply-Based Routing**
>
> ```python
> # Quand AISB envoie un rapport, il tracke le message_id
> report_message_map = {}
>
> # Après envoi du rapport :
> msg = await send_telegram(gareth_id, report_html)
> report_message_map[msg.message_id] = "Kommu"
>
> # Quand Gareth repond au rapport :
> if message.reply_to_message:
> project = report_message_map.get(message.reply_to_message.id)
> if project:
> dispatch_to_oracle(project, message.text)
- Permet des conversations multi-projets en DM
- Chaque reply est automatiquement route au bon oracle
- Pas besoin de repeter le nom du projet a chaque message

10.2 **Dispatch Multi-Projet en Parallele**

> Gareth : "Mettez a jour l'auth dans Kommu, DentistryGPT et L34D"
> ↓
> detect_multi_project detecte 3 keywords
> ↓
> dispatch en parallele :
> → oracle-Kommu : "Update auth system"
> → oracle-DentistryGPT : "Update auth system"
> → oracle-L34D : "Update auth system"
> ↓
> 3 oracles travaillent simultanement (= la limite max)
> ↓
> 3 rapports arrivent en DM, reply-routable individuellement
---

## PARTIE 7 — Mise en Production et Maintenance

### MODULE 11 — Deployer et Maintenir le Système

**Objectif du module** : Passer d'un setup de test a un système production fiable.

**Lecons a générer :**

11.1 **Checklist de Mise en Production**

- [ ] VPS provisionne avec SSH key-only
- [ ] Claude Code installe et configure
- [ ] Bot Telegram deploye en systemd (auto-restart)
- [ ] Groupe Telegram avec topics créés
- [ ] `telegram.json` configure avec les bons IDs
- [ ] `dispatch-to-session.sh` teste et fonctionnel
- [ ] `oracle-prompt.sh` généré les prompts pour chaque projet
- [ ] Heartbeat et monitoring actifs
- [ ] Signal file pipeline teste end-to-end
- [ ] God Mode teste sur un projet simple

11.2 **Maintenance Quotidienne**

```bash
# Verifier le statut du bot
sudo systemctl status agentik-monitor-bot

# Verifier les sessions tmux (aucune orpheline)
tmux list-sessions

# Verifier l'espace disque
df -h /home

# Verifier les heartbeats
~/.aisb/lib/heartbeat.sh status

# Nettoyer les fichiers temporaires
rm -f /tmp/aisb-oracle-result-*.md
rm -f /tmp/dispatch-*.txt
11.3 **Troubleshooting**
| Problème | Cause probable | Solution |
|----------|---------------|----------|
| Bot ne repond pas | Service crashe | `sudo systemctl restart agentik-monitor-bot` |
| Oracle ne dispatche pas | Claude Code pas idle | Attendre ou kill + relancer |
| Signal file pas detecte | Watcher plante | Verifier les logs du bot |
| Sessions orphelines | Oracle n'a pas cleanup | Kill manuellement avec `tmux kill-session` |
| Rapport pas recu | `report_message_map` vide | Verifier le watcher dans les logs |
| Too many oracles | Limite de 3 atteinte | Kill un oracle existant |
| enhance_prompt echoue | Timeout Claude SDK | Fallback automatique sur template |
11.4 **Sécurité**
- **Token Telegram** : ne JAMAIS commit dans git. Utiliser un fichier config separe
- **Authorized users** : seul ton chat_id dans la whitelist
- **SSH** : port custom + key-only, zero password
- **Claude --dangerously-skip-permissions** : nécessaire pour l'autonomie, mais le VPS doit être sécurisé
- **Pas de secrets dans les prompts** : utiliser des variables d'environnement
---
### MODULE 12 — Ajouter un Nouveau Projet
**Objectif du module** : Ajouter un projet au système AISB en 10 minutes.
**Lecons a générer :**
12.1 **Les 6 Étapes pour Ajouter un Projet**
```bash
# 1. Créer le topic dans le groupe Telegram
# → Nouveau topic, nommer "MonProjet"
# → Noter le topic_id (visible dans l'URL ou via l'API)
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
# 3. Créer le CLAUDE.md du projet
cat > /path/to/monprojet/CLAUDE.md << 'EOF'
# MonProjet
## Stack: Next.js, Convex, Tailwind
## Dev port: 3000
## Deploy: Vercel
EOF
# 4. Générer le prompt oracle
~/.aisb/lib/oracle-prompt.sh MonProjet /path/to/monprojet MonProjet
# 5. Tester
telegram send <ton_id> "Test: /monprojet check le status du projet"
# 6. Verifier
# - Message route vers oracle-MonProjet ?
# - Worker créé correctement ?
# - Signal file généré ?
# - Rapport recu sur Telegram ?
**Exercice pratique** :
- [ ] Ajouter un projet de test au système
- [ ] Créer le topic Telegram
- [ ] Configurer projects.json
- [ ] Ecrire le CLAUDE.md
- [ ] Tester le flow complet : message → oracle → worker → rapport

---

## Annexes

### A. Resume de l'Architecture

> Telegram (Toi)
> ↕ Messages + Fichiers + Voice
> Bot AISB (Python, systemd, 24/7)
> ↕ tmux dispatch (dispatch-to-session.sh)
> Oracles (Claude Code, max 3 simultanes)
> ↕ tmux dispatch
> Workers (Claude Code, ephemeres)
> ↕ Agent tool
> Teams & Agents (281 agents, 130+ skills)
### B. Fichiers Cles

| Fichier | Role |
|---------|------|
| `~/.claude/config/telegram.json` | Config Telegram (token, IDs) |
| `~/.aisb/lib/dispatch-to-session.sh` | Dispatch tmux fiable |
| `~/.aisb/lib/oracle-prompt.sh` | Générateur de prompts oracle |
| `~/.aisb/lib/heartbeat.sh` | Système de heartbeat |
| `/tmp/aisb-sessions.json` | Registry des sessions actives |
| `/tmp/aisb-oracle-result-*.md` | Signal files des oracles |
| `~/.aisb/prompts/oracle-*.md` | Prompts générés par projet |
| `~/.aisb/status/godmode-sessions.json` | Etat God Mode |

### C. Commandes Essentielles

```bash
# Bot
sudo systemctl status agentik-monitor-bot
sudo systemctl restart agentik-monitor-bot
journalctl -u agentik-monitor-bot -f

# tmux
tmux list-sessions
tmux capture-pane -t "session" -p -S -50
tmux kill-session -t "session"

# Telegram
telegram send <chat_id> "message"
telegram file <chat_id> /path/to/file "caption"

# Oracle dispatch
~/.aisb/lib/dispatch-to-session.sh SESSION "prompt" /path

# Monitoring
cat /tmp/aisb-sessions.json | jq .
~/.aisb/lib/heartbeat.sh status

### D. Glossaire

| Terme | Definition |
|-------|-----------|
| **AISB** | AI Super Brain — le cerveau central du système |
| **Oracle** | Chef de projet IA, gere un projet specifique |
| **Worker** | Session ephemere qui execute le code |
| **Signal file** | Fichier qui notifie AISB qu'un oracle a termine |
| **dispatch-to-session.sh** | Script qui envoie un prompt a une session tmux |
| **enhance_prompt** | Reformulation intelligente des messages utilisateur |
| **God Mode** | Mode autonomie totale pour les missions longues |
| **Heartbeat** | Signal regulier prouvant qu'une session est vivante |
| **Topic** | Fil de discussion Telegram = 1 projet |
| **/team** | Commande qui lance 3-6 agents en parallele |
| **/xoxo** | Verification ultra-profonde avant production |
| **Claude Max** | Abonnement Claude illimite via OAuth |

---

*Formation créée par Agentik {OS} — L'ecosysteme IA autonome*
*Version 1.0 — Avril 2026*
