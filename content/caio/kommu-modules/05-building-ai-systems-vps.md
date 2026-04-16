---
title: "Building AI Systems : VPS & Production"
summary: "Les systemes IA autonomes ont besoin d'une infrastructure qui tourne 24/7. Ce module couvre l'architecture complete des systemes IA en production : de l'API Claude au deploiement VPS, en passant par le RAG, les agents, l'evaluation, le monitoring et le scaling."
track: agentic-tech
number: "T1-05"
duration: "46-62h"
audience: "DevOps, SRE, developpeurs full-stack, toute personne deployant des systemes IA en production"
---

# Building AI Systems : VPS & Production

Les systemes IA autonomes ont besoin d'une infrastructure qui tourne 24/7. Ce module couvre l'architecture complete des systemes IA en production : de l'API Claude au deploiement VPS, en passant par le RAG, les agents, l'evaluation, le monitoring et le scaling.

---

## Objectif du module

A l'issue de ce module, vous aurez une infrastructure production-ready pour vos charges de travail IA, des competences en deploiement et administration systeme, et un template d'infrastructure reproductible base sur Agentik OS.

---

## Lecon 1 — Architecture des systemes IA : vue d'ensemble et decisions de design

### Contenu detaille

**Les 4 composants de tout systeme IA :**

1. **Modele** — Quel LLM ? Quelle taille ? Quel cout ?
2. **Donnees** — D'ou vient le contexte ? Comment est-il structure ?
3. **Orchestration** — Qui decide quoi faire ? Comment les agents communiquent ?
4. **Interface** — Comment l'utilisateur interagit ? API ? Chat ? Telegram ?

**Types de systemes par complexite :**

| Type | Complexite | Exemple | Cout/mois |
|------|-----------|---------|-----------|
| Single-prompt | Faible | Chatbot FAQ | $10-50 |
| Pipeline | Moyenne | Blog automatise | $50-200 |
| Agent autonome | Haute | Code reviewer | $200-500 |
| Multi-agents | Tres haute | Agentik OS (267 agents) | $500-2000 |

**Framework de decision architecturale :**

Questions a se poser :
- Le systeme tourne-t-il 24/7 ou a la demande ?
- Combien d'utilisateurs simultanes ?
- Quelle latence acceptable ? (&lt;1s ? &lt;10s ? &lt;1min ?)
- Quel budget mensuel maximum ?
- Quelles donnees sensibles sont manipulees ?

### Exercice pratique

Dessinez l'architecture de votre prochain systeme IA. Identifiez les 4 composants, les decisions de design, et les compromis.

---

## Lecon 2 — L'API Claude et le Vercel AI SDK en profondeur

### Contenu detaille

**L'API Claude — Fonctionnalites cles :**

| Feature | Usage | Gain |
|---------|-------|------|
| Messages API | Conversations structurees | Base de tout |
| Streaming | Affichage token par token | UX temps reel |
| Tool Use | Le modele appelle des fonctions | Actions concretes |
| Structured Outputs | JSON type | Donnees exploitables |
| Vision | Analyse d'images | Screenshots, documents |
| Prompt Caching | Cache les longs prompts | -90% de cout sur les prefixes |
| Batch API | Traitement en lot | -50% de cout, throughput eleve |
| Extended Thinking | Raisonnement profond | Taches complexes |

**Prompt Caching — L'optimisation #1 :**

Si votre system prompt fait 5000 tokens et que vous envoyez 100 requetes/heure, le cache economise 495,000 tokens/heure (99% de reduction sur les prefixes).

Configuration :
```json
{
  "system": [
    { "type": "text", "text": "...", "cache_control": { "type": "ephemeral" } }
  ]
}
```

**Vercel AI SDK :**

Integration React optimisee :
- `useChat` : Hook pour les interfaces de chat
- `streamText` : Streaming cote serveur
- `generateText` : Generation complete (pas de streaming)
- `generateObject` : Generation JSON typee

### Exercice pratique

Construisez une API qui utilise les 5 features principales : streaming, tool use, vision, prompt caching et structured outputs. Mesurez le cout avant/apres le cache.

---

## Lecon 3 — Construire une application de chat production-grade

### Contenu detaille

**Architecture frontend/backend :**

```
Frontend (Next.js)
  useChat() → /api/chat → Claude API
  Streaming SSE ← 
  
Backend (Convex)
  conversations table
  messages table
  users table (Clerk)
```

**Les 7 elements d'un chat production-grade :**

1. Streaming avec affichage progressif
2. Persistance des conversations (Convex/PostgreSQL)
3. Authentification (Clerk)
4. Tool use dans le chat (actions concretes)
5. Rate limiting (Upstash Redis)
6. Gestion d'erreurs gracieuse
7. Interface responsive (mobile + desktop)

### Exercice pratique

Construisez une application de chat complete avec : auth Clerk, persistance Convex, streaming Claude, et 3 tools (recherche web, generation d'image, envoi d'email). Deployez sur Vercel.

---

## Lecon 4 — Construire un agent IA autonome avec tool use

### Contenu detaille

**La boucle agent (plan-execute-observe) :**

```
1. PLAN — Analyser la tache, decomposer en etapes
2. EXECUTE — Appeler les outils necessaires
3. OBSERVE — Analyser les resultats
4. DECIDE — Continuer, ajuster, ou terminer
→ Retour a 1 si pas termine
```

**Design de tools atomiques :**

Chaque tool doit faire UNE chose :
- `read_file(path)` — pas `read_and_parse_file(path, format)`
- `search_web(query)` — pas `search_and_summarize(query)`
- `send_email(to, subject, body)` — pas `draft_and_send_email(context)`

Pourquoi : le modele compose les tools. Si chaque tool est atomique, il peut les combiner de maniere creative.

**Memoire d'agent :**

Types de memoire :
- **Court terme** : Contexte de la conversation (fenetre)
- **Moyen terme** : Scratchpad (fichiers temporaires)
- **Long terme** : Base de donnees vectorielle (ChromaDB, claude-mem)

### Exercice pratique

Construisez un agent qui : (1) recoit une URL, (2) scrape le contenu, (3) analyse les concurrents SEO, (4) genere un rapport, (5) envoie par email. L'agent doit gerer les erreurs et retry automatiquement.

---

## Lecon 5 — Systemes RAG : de l'ingestion a la generation

### Contenu detaille

**Pipeline RAG complet :**

1. **Ingestion** : Charger les documents (PDF, Markdown, HTML, CSV)
2. **Preprocessing** : Nettoyer, normaliser, deduplicater
3. **Chunking** : Decouper en morceaux de 500-1000 tokens
4. **Embedding** : Vectoriser chaque chunk (voyage-3, text-embedding-3-small)
5. **Stockage** : Inserer dans la vector DB
6. **Retrieval** : Chercher les K chunks les plus pertinents
7. **Context construction** : Assembler le prompt avec les chunks
8. **Generation** : Envoyer a Claude pour la reponse

**Recherche hybride (le meilleur des 2 mondes) :**

Combiner la recherche semantique (vectors) et lexicale (BM25) :
- Semantique trouve les concepts similaires
- Lexicale trouve les mots exacts
- Le reranker (Cohere, cross-encoder) trie les resultats combines

### Exercice pratique

Construisez un systeme RAG qui repond aux questions sur la documentation de votre entreprise. Indexez 50+ documents, implementez la recherche hybride, et evaluez avec 30 questions/reponses connues.

---

## Lecon 6 — Systemes multi-agents et Claude Agent SDK

### Contenu detaille

**Le Claude Agent SDK :**

SDK officiel pour construire des agents en Python/TypeScript :
- Definition d'agents avec des outils
- Communication inter-agents
- Gestion de la memoire
- Patterns pipeline/fan-out/hierarchique

**Le pattern ORACLE en production :**

```
Oracle Agent
  ├── Worker Agent 1 (code)
  ├── Worker Agent 2 (test)
  ├── Worker Agent 3 (deploy)
  └── Audit Agent (qualite)
```

L'Oracle ne code jamais. Il decompose, dispatche, verifie. Chaque worker est specialise et autonome.

### Exercice pratique

Implementez un systeme multi-agents avec 3 agents : un chercheur, un redacteur, et un editeur. Le systeme produit un article de blog optimise SEO de bout en bout.

---

## Lecon 7 — Evaluation, testing et garde-fous

### Contenu detaille

**Evals automatisees :**

| Type d'eval | Ce qu'on mesure | Outil |
|-------------|----------------|-------|
| Exactitude | Reponse correcte ? | Comparaison avec ground truth |
| Fidelite | Fidele au contexte ? | LLM-as-judge |
| Pertinence | Pertinent pour la question ? | LLM-as-judge |
| Toxicite | Contenu inapproprie ? | Classificateur de toxicite |
| Format | Structure correcte ? | Validation JSON/schema |

**Garde-fous entree/sortie :**
- Entree : Detection de prompt injection, filtrage de contenu
- Sortie : Validation de format, detection de hallucinations, filtrage PII
- Circuit breaker : Si le taux d'erreur depasse un seuil, couper l'acces

### Exercice pratique

Construisez un systeme d'evaluation pour votre agent. Creez 50 cas de test avec reponses attendues. Automatisez l'execution et le scoring.

---

## Lecon 8 — Deploiement VPS : SSH, Docker, tmux, systemd

### Contenu detaille

**Provisionnement d'un VPS :**

1. Choisir un fournisseur (Hetzner, OVH, DigitalOcean)
2. Commander un VPS (8 vCPU, 16GB RAM, 200GB SSD = ~$40/mois)
3. Securiser SSH (cle uniquement, port custom, fail2ban)
4. Installer les outils (Node.js, Docker, tmux, Claude Code)

**tmux — Le multiplexeur de terminal :**

Pourquoi tmux est essentiel pour l'IA :
- Les agents tournent dans des sessions persistantes
- Vous pouvez avoir 10+ sessions en parallele
- Les sessions survivent aux deconnexions SSH
- Vous pouvez monitorer les agents en temps reel

**systemd — Services persistants :**

Pour les bots et services qui doivent tourner 24/7 :
```ini
[Unit]
Description=AISB Telegram Bot
After=network.target

[Service]
User=hacker
WorkingDirectory=/home/hacker/VibeCoding/work/agentik-monitor/bot
ExecStart=/usr/bin/python3 main.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

### Exercice pratique

Provisionnez un VPS. Securisez SSH. Installez Claude Code. Deployez un bot Telegram qui repond aux commandes. Configurez-le en service systemd.

---

## Lecon 9 — Monitoring, observabilite et alerting

### Contenu detaille

**Quoi monitorer :**

| Metrique | Seuil d'alerte | Action |
|----------|---------------|--------|
| Latence API | &gt;10s | Verifier le modele/network |
| Taux d'erreur | &gt;5% | Diagnostiquer les erreurs |
| Tokens/heure | &gt;budget | Verifier les requetes |
| RAM VPS | &gt;85% | Nettoyer ou upgrader |
| Disk | &gt;90% | Rotation des logs |
| Uptime service | &lt;99.5% | Relancer le service |

**Strategie d'alerting :**
- **P0 (critique)** : Service down → Telegram immediate + son
- **P1 (important)** : Taux d'erreur eleve → Telegram dans 5 min
- **P2 (info)** : Budget approchant → Email quotidien

### Exercice pratique

Configurez un dashboard de monitoring pour votre VPS. Implementez 3 alertes Telegram : service down, taux d'erreur eleve, espace disque faible.

---

## Lecon 10 — Scaling, securite et optimisation des couts en production

### Contenu detaille

**Optimisation des couts :**

| Technique | Reduction | Effort |
|-----------|----------|--------|
| Prompt caching | 80-90% | Faible |
| Batch API | 50% | Moyen |
| Routage de modeles (Haiku/Sonnet/Opus) | 70% | Moyen |
| Caching des reponses (Redis) | 30-50% | Moyen |
| Rate limiting intelligent | 20-40% | Faible |

**Securite OWASP pour les systemes IA :**
- Injection de prompt (la nouvelle SQL injection)
- Fuite de contexte (system prompt dans la sortie)
- Exfiltration de donnees (le modele envoie des PII)
- Abus de tool use (le modele execute des commandes dangereuses)

### Exercice pratique

Optimisez les couts de votre systeme IA. Implementez prompt caching, routage de modeles, et caching Redis. Mesurez la reduction de cout sur 7 jours.

---

## Ce que cette formation apporte

- Infrastructure production-ready pour charges de travail IA
- Competences en deploiement, securisation et administration systeme
- Patterns d'orchestration de processus IA en continu
- Monitoring et observabilite des systemes autonomes
- Template d'infrastructure reproductible base sur Agentik OS
