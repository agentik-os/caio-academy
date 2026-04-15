# Formation — Context Engineering : L'Architecture Invisible de l'IA

## Instructions pour l'Agent Createur de Formation

> **Objectif** : Former des professionnels de l'IA a maitriser le Context Engineering — la discipline qui determine ce que l'IA sait, quand elle le sait, et comment elle l'utilise. C'est la différence entre un prompt qui marche "parfois" et un système IA qui delivre a chaque fois.
>
> **Ton** : Direct, pragmatique, inspire par l'expérience terrain. Pas de bullshit corporate. On parle comme un ingenieur qui a construit des systèmes IA en production.
>
> **Format** : Chaque module = theorie + exemples concrets + exercices pratiques + templates reutilisables.
>
> **Duree estimee** : 20-25 heures de contenu. 3-4 semaines pour completer.
>
> **Prix** : $697 seul / inclus dans le bundle CAIO a $1,497

---

## Identite de la Formation

| Champ | Valeur |
|-------|--------|
| Nom | **Context Engineering** |
| Sous-titre | L'Architecture Invisible qui Fait ou Defait tes Systèmes IA |
| Createur | Gareth Simono — Fondateur d'Agentik {OS} |
| Public cible | Devs IA, CAIO, architectes système, tech leads qui buildent avec des LLMs |
| Pre-requis | Avoir utilise un LLM (Claude, GPT, etc.), comprendre les bases du prompting |
| Promesse | "En 4 semaines, tu sais designer, optimiser et maintenir le contexte de n'importe quel système IA — du chatbot simple au pipeline multi-agents" |
| Niveau | Intermediaire a avance |
| Certification | Context Engineering Specialist — delivree par Agentik {OS} |

---

## Table des Matieres

- **PARTIE 1** — Comprendre le Context Engineering (Modules 1-3)
- **PARTIE 2** — Architecturer le Contexte (Modules 4-7)
- **PARTIE 3** — RAG et Knowledge Architecture (Modules 8-11)
- **PARTIE 4** — Context Engineering pour Agents (Modules 12-14)
- **PARTIE 5** — Optimisation et Production (Modules 15-17)
- **Annexes** — Glossaire, Cheat Sheet, Ressources

---

# PARTIE 1 — Comprendre le Context Engineering

---

## MODULE 1 — Qu'est-ce que le Context Engineering ?

**Objectif du module** : Comprendre pourquoi le Context Engineering est une discipline a part entiere, distincte du Prompt Engineering, et pourquoi c'est la compétence #1 pour quiconque construit avec des LLMs en 2026.

### 1.1 La Definition

Le Context Engineering, c'est l'art et la science de **designer, assembler et gerer l'ensemble des informations** qu'un système IA recoit pour accomplir une tache.

Le prompt que tu ecris ? C'est 10% du contexte. Le reste :

> ┌─────────────────────────────────────────────────┐
> │ CONTEXT WINDOW │
> │ │
> │ ┌─────────────┐ ┌──────────────────────────┐ │
> │ │ System │ │ Conversation History │ │
> │ │ Prompt │ │ (previous messages) │ │
> │ │ (5-15%) │ │ (20-40%) │ │
> │ └─────────────┘ └──────────────────────────┘ │
> │ │
> │ ┌─────────────┐ ┌──────────────────────────┐ │
> │ │ User │ │ Tool Results / RAG │ │
> │ │ Message │ │ (retrieved docs, API │ │
> │ │ (5-10%) │ │ responses, code files) │ │
> │ └─────────────┘ │ (30-50%) │ │
> │ └──────────────────────────┘ │
> │ ┌──────────────────────────────────────────┐ │
> │ │ Memory / Rules / Metadata (5-15%) │ │
> │ └──────────────────────────────────────────┘ │
> └─────────────────────────────────────────────────┘
### 1.2 Context Engineering vs Prompt Engineering

| | Prompt Engineering | Context Engineering |
|---|---|---|
| **Focus** | Comment formuler la requete | Quelle information rendre disponible |
| **Scope** | Le message utilisateur | L'ensemble du context window |
| **Analogie** | Ecrire une bonne question d'examen | Designer le programme scolaire complet |
| **Compétences** | Redaction, formulation | Architecture info, data engineering, système |
| **Impact** | +20-30% de qualité sur un prompt | +200-500% de qualité sur un système |
| **Scalabilite** | Prompt par prompt | Système entier |

Le prompt engineering, c'est apprendre a poser la bonne question. Le context engineering, c'est s'assurer que le LLM a toutes les bonnes réponses disponibles AVANT que tu poses la question.

### 1.3 Pourquoi Ca Compte Maintenant

Trois raisons :

1. **Les context windows explosent** — 200K tokens (Claude), 1M tokens (Gemini), 2M a venir. Plus de place = plus de decisions a prendre sur quoi mettre dedans.
2. **Les agents autonomes** — Un agent qui tourne 30 minutes a besoin d'un contexte évolué, pas d'un prompt statique. Le contexte change a chaque étape.
3. **Le cout** — A $3-15 par million de tokens en input, mal gerer ton contexte c'est bruler du cash. Un contexte optimise = 50-80% d'economies.

### 1.4 Le Context Engineering Stack

> ┌───────────────────────────────────┐
> │ APPLICATION LAYER │
> │ (Agent logic, UI, orchestration) │
> ├───────────────────────────────────┤
> │ CONTEXT ASSEMBLY LAYER │
> │ (What gets included, in what │
> │ order, with what priority) │
> ├───────────────────────────────────┤
> │ RETRIEVAL LAYER │
> │ (RAG, search, memory lookup, │
> │ tool calls, file reads) │
> ├───────────────────────────────────┤
> │ STORAGE LAYER │
> │ (Vector DB, SQL, files, APIs, │
> │ conversation store) │
> ├───────────────────────────────────┤
> │ SOURCE LAYER │
> │ (Documents, code, user data, │
> │ real-time feeds, knowledge) │
> └───────────────────────────────────┘
**Exercice** : Prends un de tes systèmes IA existants. Dessine le schema de son contexte. D'ou vient chaque morceau d'information ? Quel pourcentage du context window occupe chaque source ?

---

## MODULE 2 — Comment les LLMs Consomment le Contexte

**Objectif du module** : Comprendre les mecanismes internes qui determinent comment un LLM traite le contexte — et pourquoi l'ordre, la position et la quantité comptent autant que le contenu.

### 2.1 Le Context Window — Ta Contrainte Fondamentale

Le context window, c'est la "memoire de travail" du LLM. Tout ce qu'il sait pour générer sa réponse doit tenir dedans.

| Modèle | Context Window | Equivalent texte |
|--------|---------------|-----------------|
| GPT-4o | 128K tokens | ~96K mots / ~300 pages |
| Claude Opus 4 | 200K tokens | ~150K mots / ~500 pages |
| Claude (extended) | 1M tokens | ~750K mots / ~2500 pages |
| Gemini 2.5 Pro | 1M tokens | ~750K mots / ~2500 pages |

Un token != un mot. En anglais, ~1.3 token/mot. En francais, ~1.5 token/mot (accents, mots plus longs).

### 2.2 Attention Decay — Le Problème du Milieu

Les LLMs n'accordent pas la même attention a tout le contexte. C'est le phenomene "Lost in the Middle" (Liu et al., 2023) :

> Attention
> ▲
> │ ████ ████
> │ █████ █████
> │ ██████ ██████
> │ ████████ ████████
> │ ██████████ ██████████
> │ ████████████ ████████████
> │ ██████████████ ██████████████
> │ ████████████████████████████████████████████
> └────────────────────────────────────────────► Position
> DEBUT MILIEU FIN
> (forte) (faible) (forte)
**Regle pratique** : Les informations critiques vont au DEBUT (system prompt) ou a la FIN (dernier message). Le milieu du contexte est la "zone morte".

### 2.3 Recency Bias

Le LLM donne naturellement plus de poids aux informations recentes (fin du contexte). Ca veut dire :

- Les derniers messages de la conversation ecrasent les premiers
- Un tool result recent prime sur une instruction ancienne
- Le dernier fichier lu influence plus que le premier

**Implication** : Si tu veux qu'une regle soit toujours respectee, mets-la a DEUX endroits — dans le system prompt (debut) ET dans un rappel pres de la fin.

### 2.4 Context Window ≠ Context Effective

Avoir 200K tokens de context window ne veut pas dire que 200K tokens d'information seront bien traites :

| Context Window Utilise | Qualité des Réponses |
|------------------------|---------------------|
| 0-25% | Excellente — tout est bien traite |
| 25-50% | Très bonne — leger decline |
| 50-75% | Correcte — perte notable sur le milieu |
| 75-100% | Degradee — information perdue, hallucinations possibles |

**Best practice** : Vise une utilisation de 30-60% du context window max. Laisse toujours de la marge.

### 2.5 Le Cout du Contexte

Chaque token d'input a un cout. Et ca s'additionne vite :

> Exemple — Agent qui tourne 50 fois par jour :
>
> System prompt : 2,000 tokens
> Rules : 5,000 tokens
> Memory : 3,000 tokens
> RAG results : 10,000 tokens
> Conversation : 5,000 tokens
> ─────────────────────────────
> Total par appel : 25,000 tokens
>
> 50 appels/jour × 25,000 = 1,250,000 tokens/jour
> × 30 jours = 37,500,000 tokens/mois
>
> A $3/M tokens (Claude Sonnet) = $112.50/mois
> A $15/M tokens (Claude Opus) = $562.50/mois
Optimise ton contexte de 40% et tu economises $225/mois en Opus. Sur un an, $2,700.

**Exercice** : Calcule le cout mensuel du contexte de ton système IA actuel. Identifie les 3 plus gros postes de depense en tokens.

---

## MODULE 3 — Les Sources de Contexte

**Objectif du module** : Cartographier toutes les sources d'information qui peuvent alimenter le contexte d'un LLM, et comprendre quand utiliser chacune.

### 3.1 Taxonomie des Sources

> SOURCES DE CONTEXTE
> ├── STATIQUES (definies a l'avance)
> │ ├── System prompt
> │ ├── Instructions système (CLAUDE.md, rules/)
> │ ├── Few-shot examples
> │ └── Schema definitions (tools, functions)
> │
> ├── DYNAMIQUES (assemblees au runtime)
> │ ├── User message (la requete)
> │ ├── Conversation history
> │ ├── RAG results (documents retrieves)
> │ ├── Tool/function results
> │ ├── Memory (short-term, long-term)
> │ └── Real-time data (APIs, feeds)
> │
> └── META (informations sur le contexte)
> ├── Timestamps
> ├── User metadata (role, permissions)
> ├── Session metadata
> └── Context budget remaining
### 3.2 Le System Prompt — La Fondation

Le system prompt definit QUI est l'IA et COMMENT elle se comporte. C'est le socle :

```markdown
## Bon system prompt (structure)

1. IDENTITE — Qui tu es (role, expertise, personnalite)
2. REGLES — Ce que tu fais toujours / jamais
3. FORMAT — Comment tu structures tes réponses
4. CONNAISSANCES — Ce que tu sais sur le contexte (projet, user, etc.)
5. EXEMPLES — 1-2 examples de réponse ideale
> **Anti-pattern** : Un system prompt de 50,000 tokens avec toute la doc du projet. Le LLM se noie.
>
> **Best practice** : System prompt de 1,000-5,000 tokens max. Le reste va dans des sources dynamiques chargees a la demande.
>
> ### 3.3 Conversation History — La Memoire Court-terme
>
> La conversation history donne le contexte immédiat. Mais elle grossit a chaque echange.
>
> | Stratégie | Description | Quand l'utiliser |
> |-----------|-------------|-----------------|
> | Full history | Tout garder | Conversations courtes (<20 messages) |
> | Sliding window | Garder les N derniers messages | Conversations longues, taches repetitives |
> | Summarization | Resumer les anciens messages | Conversations très longues (>50 messages) |
> | Selective | Garder seulement les messages pertinents | Conversations multi-sujets |
>
> ### 3.4 Tool Results — Le Contexte Execute
>
> Quand un LLM appelle un outil (read file, search, API call), le resultat est injecte dans le contexte. C'est souvent la plus grosse source :
>
> ```json
> {
> "role": "tool",
> "tool_use_id": "toolu_123",
> "content": "// contenu du fichier lu — peut faire 5,000+ tokens"
> }
**Problème** : Un `Read` sur un fichier de 2000 lignes injecte ~8,000 tokens. 5 lectures = 40,000 tokens de contexte consommes.

**Solution** : Lire seulement les lignes pertinentes (`offset`, `limit`), ou pre-filtrer avant de lire.

### 3.5 RAG — Le Contexte Retrieve

Le RAG (Retrieval-Augmented Génération) injecte des documents pertinents depuis une base de connaissances. C'est le sujet des Modules 8-11 — on y revient en detail.

### 3.6 Memory — Le Contexte Persistant

La memoire permet au LLM de "se souvenir" entre les sessions :

| Type | Duree | Exemple |
|------|-------|---------|
| Short-term | 1 session | Conversation history |
| Episodic | Multi-sessions | "La derniere fois on a fixe le bug auth" |
| Semantic | Permanent | "Le user préféré les réponses concises" |
| Procedural | Permanent | "Toujours lancer npm run build après un edit" |

**Exercice** : Pour ton système IA, liste chaque source de contexte, estime son volume en tokens, et determine si elle est statique ou dynamique.

---

# PARTIE 2 — Architecturer le Contexte

---

## MODULE 4 — Le Context Budget

**Objectif du module** : Apprendre a gerer les tokens comme un budget financier — allocation, priorites, compression — pour maximiser la valeur de chaque token dans le context window.

### 4.1 Le Budget Mindset

Pense au context window comme un budget :

> CONTEXT BUDGET: 200,000 tokens (Claude Opus 4)
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
>
> ALLOCATION:
> ┌──────────────────────┬─────────┬─────────────┐
> │ Poste │ Budget │ % du total │
> ├──────────────────────┼─────────┼─────────────┤
> │ System prompt │ 3,000 │ 1.5% │
> │ Rules & instructions │ 8,000 │ 4% │
> │ Memory │ 5,000 │ 2.5% │
> │ RAG / docs retrieves │ 20,000 │ 10% │
> │ Tool results │ 30,000 │ 15% │
> │ Conversation history │ 20,000 │ 10% │
> │ User message │ 2,000 │ 1% │
> │ ─── RESERVE ─── │ 12,000 │ 6% │
> │ ─── OUTPUT ─── │ 8,000 │ 4% │
> │ ─── MARGE ─── │ 92,000 │ 46% │
> └──────────────────────┴─────────┴─────────────┘
**Regle des 60%** : Ne jamais utiliser plus de 60% du context window en input. Ca laisse de la place pour la génération ET evite la degradation de qualité.

### 4.2 Prioritisation du Contexte

Tout le contexte n'a pas la même valeur. Utilise une matrice de priorite :

| Priorite | Categorie | Action |
|----------|-----------|--------|
| P0 — Critique | System prompt, regles core, user message | Toujours present |
| P1 — Important | Memory pertinente, RAG top results | Present si budget > 30% |
| P2 — Utile | Conversation history, exemples | Present si budget > 50% |
| P3 — Nice-to-have | Metadata, context additionnel | Present si budget > 70% |

### 4.3 Le Token Counter — Ton Meilleur Ami

Avant d'envoyer au LLM, COMPTE les tokens. Toujours.

```python
# Avec tiktoken (OpenAI) ou anthropic SDK
import anthropic

client = anthropic.Anthropic()

# Compter les tokens d'un message
result = client.messages.count_tokens(
 model="claude-opus-4-20250514",
 messages=[{"role": "user", "content": context}],
 system=system_prompt
)
print(f"Input tokens: {result.input_tokens}")
> ```typescript
> // Approximation rapide : 1 token ≈ 4 caracteres (anglais)
> // 1 token ≈ 3.5 caracteres (francais)
> function estimateTokens(text: string, lang: 'en' | 'fr' = 'en'): number {
> const ratio = lang === 'fr' ? 3.5 : 4;
> return Math.ceil(text.length / ratio);
> }
### 4.4 Stratégies d'Allocation Dynamique

Le budget n'est pas fixe — il s'adapte a la tache :

> TACHE SIMPLE (question directe):
> System prompt: 2K | User msg: 500 | Memory: 1K | Total: ~3.5K
>
> TACHE COMPLEXE (debug multi-fichier):
> System prompt: 3K | Rules: 8K | Files: 40K | History: 10K | Total: ~61K
>
> TACHE AGENT (pipeline autonome):
> System prompt: 5K | Rules: 10K | Memory: 5K | Tools: 50K+ | Total: ~70K+
**Exercice** : Créé un budget de contexte pour 3 cas d'usage de ton système IA. Definis les allocations P0-P3 pour chaque cas.

---

## MODULE 5 — Progressive Disclosure

**Objectif du module** : Maitriser l'art de ne charger que l'information pertinente au bon moment — le "lazy loading" du contexte.

### 5.1 Le Principe

Tu ne charges pas toute une application web d'un coup. Tu lazy-load les images, tu code-split les modules. Le contexte, c'est pareil.

> ANTI-PATTERN: Tout charger d'un coup
> ┌─────────────────────────────────────────┐
> │ System prompt + TOUTE la doc + │
> │ TOUTE la conversation + TOUTES les │
> │ regles + TOUTE la memoire │
> │ = 150,000 tokens │
> │ = $2.25 par requete en Opus │
> │ = qualité degradee │
> └─────────────────────────────────────────┘
>
> PATTERN: Charger progressivement
> ┌────────────────────┐
> │ Core context (5K) │ ← Toujours present
> ├────────────────────┤
> │ + Rules pertinentes│ ← Si la tache les requiert
> │ (2K-5K) │
> ├────────────────────┤
> │ + RAG results │ ← Declenche par la requete
> │ (5K-15K) │
> ├────────────────────┤
> │ + Tool results │ ← Declenche par l'agent
> │ (variable) │
> └────────────────────┘
### 5.2 Stratégies de Progressive Disclosure

| Stratégie | Mecanisme | Exemple |
|-----------|-----------|---------|
| **Lazy Rules** | Charger les regles seulement si la tache les requiert | Regles de deploiement chargees seulement si `deploy` est dans le message |
| **Tiered Memory** | Charger d'abord un resume, puis les details si nécessaire | Resume du projet → fichiers specifiques |
| **Query-driven RAG** | Retriever seulement les docs pertinents a la question | Recherche vectorielle sur la requete utilisateur |
| **On-demand Tools** | Decrire les outils mais ne pas pre-executer | L'agent decide quels outils appeler |
| **Summarized History** | Resume ancien + messages recents verbatim | "Contexte: on debug l'auth" + derniers 5 messages |

### 5.3 Implementation : Le Context Router

```typescript
interface ContextSource {
 name: string;
 priority: 'P0' | 'P1' | 'P2' | 'P3';
 estimatedTokens: number;
 condition?: (query: string, metadata: any) => boolean;
 loader: () => Promise<string>;
}

function assembleContext(
 sources: ContextSource[],
 query: string,
 budget: number,
 metadata: any
): string[] {
 // 1. Filtrer les sources par condition
 const applicable = sources.filter(
 s => !s.condition || s.condition(query, metadata)
 );

 // 2. Trier par priorite
 const sorted = applicable.sort(
 (a, b) => a.priority.localeCompare(b.priority)
 );

 // 3. Ajouter tant que le budget le permet
 let remaining = budget;
 const selected: string[] = [];

 for (const source of sorted) {
 if (source.estimatedTokens <= remaining) {
 selected.push(await source.loader());
 remaining -= source.estimatedTokens;
 }
 }

 return selected;
}
> ### 5.4 Le Pattern "Deux Passes"
>
> Pour les taches complexes, utilise deux appels LLM :
PASSE 1 (cheap model, petit contexte):
 "Voici la question de l'utilisateur. De quelles informations
 as-tu besoin pour y répondre ? Liste les fichiers, docs,
 ou donnees necessaires."

PASSE 2 (bon model, contexte cible):
 "Voici la question + exactement les infos que tu as demandees."
> Ca coute un appel de plus mais le contexte de la passe 2 est chirurgical.
>
> **Exercice** : Implemente un context router basique pour un de tes projets. Definis 5 sources avec des conditions de chargement differentes.
>
> ---
>
> ## MODULE 6 — CLAUDE.md et Fichiers d'Instructions
>
> **Objectif du module** : Maitriser l'art d'ecrire des fichiers d'instructions système qui scalent — la fondation de tout système IA bien configure.
>
> ### 6.1 Qu'est-ce qu'un CLAUDE.md ?
>
> Un fichier `CLAUDE.md` est un fichier d'instructions que Claude Code charge automatiquement au debut de chaque session. C'est le system prompt persistant du projet.
Hierarchie de chargement (Claude Code):
~/.claude/CLAUDE.md ← Instructions globales (toutes sessions)
~/project/CLAUDE.md ← Instructions projet (racine)
~/project/.claude/CLAUDE.md ← Instructions projet (dossier .claude)
~/project/src/CLAUDE.md ← Instructions sous-dossier
> ### 6.2 Anatomie d'un Bon CLAUDE.md
>
> ```markdown
> # Nom du Projet — Description Courte
>
> ## Stack Technique
> - Framework: Next.js 16
> - DB: PostgreSQL via Prisma
> - Auth: Clerk
> - Deploy: Vercel
>
> ## Regles Critiques
> 1. **Toujours** lancer `npm run build` avant de dire "done"
> 2. **Jamais** modifier les fichiers dans /generated/
> 3. **Toujours** utiliser TypeScript strict
>
> ## Architecture
> src/
> app/ # App Router pages
> components/ # React components
> lib/ # Utility functions
> server/ # Server-side logic
>
> ## Conventions
> - Nommage: kebab-case pour les fichiers, PascalCase pour les components
> - Commits: conventional commits (feat:, fix:, chore:)
> - Tests: chaque feature a un test dans __tests__/
>
> ## Erreurs Connues
> - Le build echoue si NEXT_PUBLIC_API_URL n'est pas set
> - Prisma generate doit tourner avant le build
### 6.3 Les 7 Regles d'un CLAUDE.md Efficace

| # | Regle | Pourquoi |
|---|-------|----------|
| 1 | **Court** — Max 100 lignes | Le LLM le charge a chaque requete. 500 lignes = gaspillage |
| 2 | **Actionnable** — Des regles, pas des descriptions | "Fais X" > "Le projet utilise X" |
| 3 | **Structure** — Headers clairs, tables, listes | Le LLM parse mieux le markdown structure |
| 4 | **Priorise** — L'essentiel en premier | Attention decay : le debut est mieux traite |
| 5 | **Liens** — Pointer vers les docs detaillees | "Voir docs/ARCHITECTURE.md" plutot que tout copier |
| 6 | **Mis a jour** — Reflete l'etat actuel du code | Un CLAUDE.md obsolete cause des bugs |
| 7 | **Teste** — Verifie que le LLM le suit | Si une regle est ignoree, reformule-la |

### 6.4 Anti-patterns Courants

```markdown
# ANTI-PATTERN 1: Le roman
Un CLAUDE.md de 3000 lignes avec l'historique complet du projet,
les decisions d'architecture, les notes de reunion...
→ Le LLM se noie. Garde ca dans des fichiers separes.

# ANTI-PATTERN 2: Le vague
"Fais du bon code"
"Sois professionnel"
→ Inutile. Le LLM fait déjà ca par defaut.

# ANTI-PATTERN 3: Le contradictoire
Ligne 10: "Utilise toujours des arrow functions"
Ligne 45: "Préféré les function declarations"
→ Le LLM va ignorer l'un des deux, au hasard.

# ANTI-PATTERN 4: Le statique
CLAUDE.md ecrit il y a 6 mois, jamais mis a jour.
Le stack a change, les conventions aussi.
→ Mets a jour a chaque changement majeur.
> ### 6.5 Template CLAUDE.md Universel
>
> ```markdown
> # {Projet} — {Description en 10 mots}
>
> {Stack en 1 ligne} | Port: {port} | Deploy: {plateforme}
>
> ## Regles (toujours appliquer)
> 1. {Regle critique #1}
> 2. {Regle critique #2}
> 3. {Regle critique #3}
>
> ## Structure
> {Arbre simplifie des dossiers cles}
>
> ## Commandes
> | Action | Commande |
> |--------|----------|
> | Dev | {commande dev} |
> | Build | {commande build} |
> | Test | {commande test} |
> | Deploy | {commande deploy} |
>
> ## Conventions
> - {Convention #1}
> - {Convention #2}
>
> ## Docs (charger si nécessaire)
> - Architecture: docs/ARCHITECTURE.md
> - API: docs/API.md
> - Design: docs/DESIGN.md
**Exercice** : Reecris le CLAUDE.md d'un de tes projets en suivant le template ci-dessus. Limite-le a 80 lignes. Mesure le nombre de tokens avant/après.

---

## MODULE 7 — Rules et Hierarchie d'Instructions

**Objectif du module** : Comprendre comment structurer des regles sur plusieurs niveaux pour des systèmes IA complexes — du global au local, du général au specifique.

### 7.1 La Hierarchie des Instructions

Les instructions ne sont pas toutes au même niveau. Comme le CSS, il y a une cascade :

> SPECIFICITE CROISSANTE (le plus specifique gagne)
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
>
> ┌─────────────────────────────────┐
> │ 1. GLOBAL RULES │ ~/.claude/rules/*.md
> │ (s'appliquent a tout) │ Ex: "Toujours en anglais"
> ├─────────────────────────────────┤
> │ 2. PROJECT INSTRUCTIONS │ CLAUDE.md a la racine
> │ (specifiques au projet) │ Ex: "Stack: Next.js 16"
> ├─────────────────────────────────┤
> │ 3. DIRECTORY RULES │ CLAUDE.md dans un sous-dossier
> │ (specifiques au dossier) │ Ex: "Ce dossier = API only"
> ├─────────────────────────────────┤
> │ 4. INLINE INSTRUCTIONS │ Dans le message utilisateur
> │ (specifiques a la requete) │ Ex: "Ecris ca en Python"
> └─────────────────────────────────┘
### 7.2 Le Repertoire Rules

Pour les systèmes complexes, un seul fichier ne suffit pas. On utilise un repertoire de regles :

> ~/.claude/rules/
> ├── 00-identity.md # Qui est l'IA (role, personnalite)
> ├── 01-core-rules.md # Regles toujours actives
> ├── 10-code-style.md # Conventions de code
> ├── 20-git-workflow.md # Regles Git
> ├── 30-deploy-rules.md # Regles de deploiement
> ├── 40-testing-rules.md # Regles de test
> └── 99-language.md # Regles de langue
**Convention de nommage** :
- `00-09` : Identite et regles core (toujours charges)
- `10-29` : Conventions techniques
- `30-49` : Workflows et processus
- `50-69` : Integration et outils
- `90-99` : Meta-regles (langue, format)

### 7.3 Le Problème du Volume

Plus tu as de regles, plus tu consommes de tokens :

> Cas reel — Agentik OS:
> 36 fichiers de regles
> 5,591 lignes
> ~44,000 tokens charges a chaque session
>
> A $15/M tokens (Opus) = $0.66 par session juste pour les regles
> 50 sessions/jour = $33/jour = $990/mois juste en regles
**Solution** : Regles conditionnelles qui ne se chargent que si necessaires.

### 7.4 Regles Conditionnelles

```markdown
<!-- rules/30-deploy.md -->
# Deploiement

> Ces regles s'appliquent UNIQUEMENT quand le message contient
> "deploy", "vercel", "production", ou "push"

1. Toujours utiliser --token pour Vercel (VPS headless)
2. Verifier npm run build = 0 erreurs AVANT de deployer
3. Tester l'URL de prod après deploiement
> Un bon system peut scanner le message utilisateur et ne charger que les regles pertinentes — exactement le Progressive Disclosure du Module 5.
>
> ### 7.5 Resolution de Conflits
>
> Quand deux regles se contredisent :
>
> | Regle | L'emporte |
> |-------|-----------|
> | Global dit "anglais", Projet dit "francais" | **Projet** (plus specifique) |
> | Projet dit "no tests", Inline dit "ecris un test" | **Inline** (plus specifique) |
> | Deux regles globales contradictoires | **Derniere chargee** (recency bias) |
>
> **Best practice** : Evite les contradictions. Utilise la hierarchie pour specialiser, pas pour contredire.
>
> **Exercice** : Organise les instructions de ton système IA en 4 niveaux hierarchiques. Identifie les contradictions eventuelles et resous-les.
>
> ---
>
> # PARTIE 3 — RAG et Knowledge Architecture
>
> ---
>
> ## MODULE 8 — RAG : Le Pipeline Complet
>
> **Objectif du module** : Comprendre et implementer un pipeline RAG de bout en bout — du document brut au contexte injecte dans le LLM.
>
> ### 8.1 Qu'est-ce que le RAG ?
>
> RAG = Retrieval-Augmented Génération. Au lieu de tout mettre dans le context window, tu stockes les connaissances dans une base externe et tu ne retrieves que ce qui est pertinent pour la question.
SANS RAG:
┌─────────────────────────────────────┐
│ LLM Context Window │
│ ┌─────────────────────────────────┐ │
│ │ TOUTE la documentation │ │
│ │ (500,000 tokens) │ │
│ │ Ne rentre pas │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘

AVEC RAG:
┌──────────┐ ┌──────────┐ ┌──────────────────────┐
│ Question │ → │ Retriever│ → │ LLM Context Window │
│ │ │ (search) │ │ ┌──────────────────┐ │
│ │ │ │ │ │ Top 5 passages │ │
│ │ │ │ │ │ pertinents │ │
│ │ │ │ │ │ (5,000 tokens) │ │
│ │ │ │ │ │ Rentre ! │ │
│ │ │ │ │ └──────────────────┘ │
└──────────┘ └──────────┘ └──────────────────────┘
> ### 8.2 Le Pipeline RAG en 6 Étapes
DOCUMENTS CHUNK EMBED STORE
────────── → ─────────── → ────────── → ──────────
 PDF, MD, Decouper Convertir Sauvegarder
 Code, HTML en morceaux en vecteurs dans une DB
 vectorielle

QUERY RETRIEVE AUGMENT GENERATE
────────── → ─────────── → ────────── → ──────────
 Question Chercher les Injecter Le LLM
 de l'user chunks dans le généré sa
 similaires contexte réponse
> ### 8.3 Étape par Étape
>
> **1. Ingestion** — Collecter les documents sources
> ```python
> # Sources typiques
> sources = [
> "docs/*.md", # Documentation
> "src/**/*.ts", # Code source
> "wiki/*.html", # Wiki interne
> "slack-export.json", # Messages Slack
> "emails/*.eml", # Emails
> ]
**2. Chunking** — Decouper en morceaux (Module 9 en detail)
```python
# Chunk simple par paragraphe
chunks = text.split("\n\n")
> **3. Embedding** — Convertir en vecteurs (Module 10 en detail)
> ```python
> from openai import OpenAI
> client = OpenAI()
>
> response = client.embeddings.create(
> input="Texte a embedder",
> model="text-embedding-3-small"
> )
> vector = response.data[0].embedding # [0.023, -0.012, ...]
**4. Storage** — Stocker dans une vector DB
```python
import chromadb

client = chromadb.Client()
collection = client.create_collection("docs")

collection.add(
 documents=["chunk 1", "chunk 2"],
 ids=["id1", "id2"],
 metadatas=[{"source": "readme.md"}, {"source": "api.md"}]
)
> **5. Retrieval** — Chercher les chunks pertinents
> ```python
> results = collection.query(
> query_texts=["Comment configurer l'auth ?"],
> n_results=5
> )
> # Retourne les 5 chunks les plus similaires
**6. Augmentation** — Injecter dans le prompt
```python
context = "\n---\n".join(results["documents"][0])

prompt = f"""Voici le contexte pertinent:

{context}

---

Question: {user_question}

Reponds en te basant UNIQUEMENT sur le contexte ci-dessus."""
> ### 8.4 Metriques RAG
>
> | Metrique | Definition | Cible |
> |----------|-----------|-------|
> | **Recall@k** | % de docs pertinents retrieves dans le top-k | > 80% |
> | **Precision@k** | % de docs retrieves qui sont pertinents | > 60% |
> | **MRR** (Mean Reciprocal Rank) | Position moyenne du premier resultat pertinent | > 0.7 |
> | **Latency** | Temps de retrieval | < 200ms |
> | **Context Relevance** | Le LLM juge-t-il le contexte utile ? | > 85% |
>
> **Exercice** : Implemente un pipeline RAG basique avec ChromaDB sur un dossier de documentation de ton projet. Mesure le Recall@5 sur 10 questions test.
>
> ---
>
> ## MODULE 9 — Chunking Stratégies
>
> **Objectif du module** : Maitriser les differentes stratégies de decoupage de documents — le chunking est le facteur #1 de qualité du RAG.
>
> ### 9.1 Pourquoi le Chunking Compte
>
> Un mauvais chunking = des resultats RAG pourris, même avec le meilleur embedding model.
DOCUMENT ORIGINAL:
"L'authentification utilise JWT. Les tokens expirent après 24h.
Le refresh token dure 30 jours. En cas d'erreur 401, le client
doit automatiquement tenter un refresh."

MAUVAIS CHUNK (coupe au milieu):
Chunk 1: "L'authentification utilise JWT. Les tokens expirent après 24h."
Chunk 2: "Le refresh token dure 30 jours. En cas d'erreur 401, le client"
Chunk 3: "doit automatiquement tenter un refresh."
→ Chunk 3 seul est incomprehensible

BON CHUNK (semantique):
Chunk 1: "L'authentification utilise JWT. Les tokens expirent après 24h.
 Le refresh token dure 30 jours. En cas d'erreur 401, le client
 doit automatiquement tenter un refresh."
→ L'information complète est dans un seul chunk
> ### 9.2 Les 5 Stratégies de Chunking
>
> | Stratégie | Description | Taille typique | Quand l'utiliser |
> |-----------|-------------|---------------|-----------------|
> | **Fixed-size** | Couper tous les N tokens | 256-1024 tokens | Texte non structure, logs |
> | **Overlap** | Fixed-size + chevauchement | 512 tokens, overlap 50 | Texte narratif continu |
> | **Semantic** | Couper aux changements de sujet | Variable | Documentation, articles |
> | **Recursive** | Essayer \n\n, puis \n, puis espace | Variable | Markdown, code |
> | **Document-aware** | Respecter la structure du doc | Variable | Code, HTML, JSON |
>
> ### 9.3 Fixed-Size Chunking
>
> Le plus simple. Tu coupes tous les N caracteres/tokens.
>
> ```python
> def fixed_size_chunk(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
> chunks = []
> start = 0
> while start < len(text):
> end = start + chunk_size
> chunks.append(text[start:end])
> start = end - overlap # chevauchement
> return chunks
**Avantage** : Simple, previsible.
**Inconvenient** : Coupe au milieu des phrases, des paragraphes, des fonctions.

### 9.4 Semantic Chunking

Le plus intelligent. Detecte les changements de sujet.

```python
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

def semantic_chunk(sentences: list[str], threshold: float = 0.5) -> list[str]:
 embeddings = model.encode(sentences)
 chunks = []
 current_chunk = [sentences[0]]

 for i in range(1, len(sentences)):
 similarity = np.dot(embeddings[i], embeddings[i-1])
 if similarity < threshold:
 # Changement de sujet → nouveau chunk
 chunks.append(" ".join(current_chunk))
 current_chunk = []
 current_chunk.append(sentences[i])

 chunks.append(" ".join(current_chunk))
 return chunks
> ### 9.5 Document-Aware Chunking
>
> Pour le code et le markdown, respecte la structure :
>
> ```python
> # Chunking Markdown par sections
> def chunk_markdown(text: str) -> list[str]:
> chunks = []
> current = []
>
> for line in text.split('\n'):
> if line.startswith('## ') and current:
> chunks.append('\n'.join(current))
> current = []
> current.append(line)
>
> if current:
> chunks.append('\n'.join(current))
> return chunks
>
> # Chunking Code par fonctions
> # Utilise tree-sitter pour parser l'AST
> # et decouper par fonction/classe
### 9.6 Le Chunk Ideal

| Parametre | Valeur recommandee | Pourquoi |
|-----------|-------------------|----------|
| Taille min | 100 tokens | Trop petit = pas assez de contexte |
| Taille max | 1,000 tokens | Trop gros = noie l'information |
| Taille ideale | 300-500 tokens | Bon ratio signal/bruit |
| Overlap | 10-20% | Evite de perdre le contexte aux frontieres |
| Metadata | Source, page, section, date | Permet le filtrage et le reranking |

**Exercice** : Prends un document de 50 pages. Chunke-le avec 3 stratégies differentes (fixed, semantic, document-aware). Compare les resultats de retrieval sur 5 questions.

---

## MODULE 10 — Vector Databases et Embedding Models

**Objectif du module** : Choisir le bon embedding model et la bonne vector database pour ton cas d'usage — et comprendre comment les combiner.

### 10.1 Comment Marchent les Embeddings ?

Un embedding convertit du texte en vecteur numérique (liste de nombres). Des textes similaires ont des vecteurs proches.

> "Le chat dort sur le canape" → [0.23, -0.45, 0.67, ...]
> "Le félin sommeille sur le sofa" → [0.21, -0.43, 0.69, ...]
> → Cosine similarity: 0.95 (très similaire)
>
> "La voiture roule vite" → [-0.12, 0.78, -0.34, ...]
> → Cosine similarity: 0.12 (très différent)
### 10.2 Comparatif Embedding Models (2026)

| Model | Dimensions | Qualité (MTEB) | Cout | Speed |
|-------|-----------|----------------|------|-------|
| text-embedding-3-small (OpenAI) | 1536 | Bonne | $0.02/M tokens | Rapide |
| text-embedding-3-large (OpenAI) | 3072 | Très bonne | $0.13/M tokens | Moyen |
| voyage-3 (Anthropic/Voyage) | 1024 | Excellente | $0.06/M tokens | Rapide |
| voyage-code-3 (Voyage) | 1024 | Top pour code | $0.06/M tokens | Rapide |
| all-MiniLM-L6-v2 (Open) | 384 | Correcte | Gratuit (local) | Très rapide |
| nomic-embed-text (Open) | 768 | Bonne | Gratuit (local) | Rapide |

**Regle** : Pour du code, utilise voyage-code-3. Pour du texte général, text-embedding-3-small suffit pour 90% des cas.

### 10.3 Comparatif Vector Databases

| DB | Type | Ideal pour | Scalabilite | Cout |
|----|------|-----------|-------------|------|
| **ChromaDB** | Embedded | Prototypage, petits projets | <1M docs | Gratuit |
| **pgvector** | Extension PostgreSQL | Déjà PostgreSQL en prod | <10M docs | Gratuit |
| **Pinecone** | Managed cloud | Production, zero ops | Illimite | $70+/mois |
| **Qdrant** | Self-hosted/cloud | Performance, filtrage | <100M docs | Gratuit/Paid |
| **Weaviate** | Self-hosted/cloud | Multi-modal | <100M docs | Gratuit/Paid |
| **FAISS** | Library (Meta) | Recherche pure, pas de persistence | Illimite | Gratuit |

### 10.4 Arbre de Decision

> Combien de documents ?
> ├── < 10,000 → ChromaDB (simple, rapide a setup)
> ├── 10K - 1M
> │ ├── Déjà PostgreSQL ? → pgvector
> │ ├── Besoin de filtrage complexe ? → Qdrant
> │ └── Zero ops ? → Pinecone
> └── > 1M → Pinecone ou Qdrant Cloud
### 10.5 Implementation Pratique : pgvector

```sql
-- Setup pgvector
CREATE EXTENSION vector;

CREATE TABLE documents (
 id SERIAL PRIMARY KEY,
 content TEXT,
 embedding vector(1536), -- dimension de ton model
 metadata JSONB,
 created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour la recherche rapide
CREATE INDEX ON documents
 USING ivfflat (embedding vector_cosine_ops)
 WITH (lists = 100);

-- Recherche des 5 docs les plus similaires
SELECT content, metadata,
 1 - (embedding <=> $1) AS similarity
FROM documents
ORDER BY embedding <=> $1
LIMIT 5;
> ### 10.6 Reranking — L'Étape Bonus
>
> Le retrieval retourne les top-k resultats. Le reranking les reordonne avec un modèle plus précis :
>
> ```python
> # Étape 1: Retrieval rapide (embedding similarity) → top 20
> initial_results = vector_db.query(query, k=20)
>
> # Étape 2: Reranking précis (cross-encoder) → top 5
> from sentence_transformers import CrossEncoder
> reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
>
> pairs = [(query, doc.content) for doc in initial_results]
> scores = reranker.predict(pairs)
>
> # Trier par score de reranking
> reranked = sorted(zip(initial_results, scores), key=lambda x: x[1], reverse=True)
> final_results = reranked[:5]
**Exercice** : Setup une vector DB (ChromaDB ou pgvector) et indexe la documentation d'un framework que tu utilises. Compare les resultats avec et sans reranking.

---

## MODULE 11 — Knowledge Bases et Memory Systems

**Objectif du module** : Designer des systèmes de memoire pour LLMs qui persistent entre les sessions et evoluent avec le temps.

### 11.1 Les 4 Types de Memoire

Comme le cerveau humain, un système IA a besoin de différents types de memoire :

> ┌─────────────────────────────────────────────────────┐
> │ MEMORY ARCHITECTURE │
> │ │
> │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
> │ │ WORKING │ │ EPISODIC │ │ SEMANTIC │ │
> │ │ MEMORY │ │ MEMORY │ │ MEMORY │ │
> │ │ │ │ │ │ │ │
> │ │ Context │ │ "Last time │ │ "User likes │ │
> │ │ window │ │ we debugged│ │ TypeScript │ │
> │ │ actuel │ │ the auth │ │ and prefers │ │
> │ │ │ │ module" │ │ concise" │ │
> │ │ Duree: 1 req│ │ Duree: mois │ │ Duree: perm. │ │
> │ └─────────────┘ └─────────────┘ └─────────────┘ │
> │ │
> │ ┌─────────────────────────────────────────────────┐ │
> │ │ PROCEDURAL MEMORY │ │
> │ │ "Toujours lancer build avant deploy" │ │
> │ │ "Le projet utilise pnpm, pas npm" │ │
> │ │ Duree: permanente (rules, instructions) │ │
> │ └─────────────────────────────────────────────────┘ │
> └─────────────────────────────────────────────────────┘
### 11.2 Implementation de la Memoire

**Short-term (Working Memory)** — Le context window actuel
> # C'est automatique — c'est la conversation en cours
**Episodic Memory** — Ce qui s'est passe dans les sessions precedentes
```markdown
<!-- MEMORY.md -->
# Project Memory

## Key Decisions
- 2026-03-15: Migre de REST a GraphQL pour l'API publique
- 2026-03-20: Choisi Clerk plutot que Auth.js pour l'auth

## Known Issues
- Le build timeout sur CI si > 50 tests paralleles
- L'API rate-limited a 100 req/min sur le plan free
> **Semantic Memory** — Connaissances generales sur l'utilisateur/projet
> ```markdown
> <!-- user-préférences.md -->
> ## User Préférences
> - Préféré les réponses concises (1-5 lignes pour les taches simples)
> - Utilise TypeScript strict partout
> - Deploy sur Vercel avec token
> - Langue: anglais par defaut, resume en francais
**Procedural Memory** — Comment faire les choses
```markdown
<!-- rules/deploy.md -->
# Procédure de Deploiement
1. npm run build (doit être 0 erreurs)
2. npx vercel --prod --yes --token $VERCEL_TOKEN
3. Attendre 2 min
4. curl https://monsite.com → HTTP 200
5. Notifier via Telegram
> ### 11.3 Le Pattern Memory File
>
> Un fichier MEMORY.md a la racine du projet, mis a jour automatiquement :
>
> ```markdown
> # Project Memory — Auto-updated
>
> ## User Préférences
> <!-- Auto-detected from interactions -->
> - Prefers dark mode examples
> - Uses pnpm
> - Deploys to Vercel
>
> ## Technical Decisions
> <!-- Logged from conversations -->
> - [2026-03-15] Chose PostgreSQL over MongoDB for relational data
> - [2026-03-20] Migrated auth from Auth.js to Clerk
>
> ## Known Bugs
> - Image upload fails on files > 5MB (S3 config issue)
> - Dark mode flicker on page load (theme provider timing)
>
> ## Patterns Learned
> - Always check .env.local exists before build
> - Run prisma generate after any schema change
### 11.4 Memory Consolidation

La memoire accumule des doublons et du bruit. Il faut la consolider regulierement :

> AVANT CONSOLIDATION (50 entries):
> - "User prefers TypeScript" (x3 — doublon)
> - "Migrated to Clerk on March 20" (correct)
> - "Using Auth.js for auth" (FAUX — obsolete)
> - "Build takes 45 seconds" (FAUX — maintenant 90s)
>
> Après CONSOLIDATION (25 entries):
> - "User prefers TypeScript"
> - "Auth: Clerk (migrated from Auth.js on 2026-03-20)"
> - "Build takes ~90 seconds (as of 2026-04-01)"
**Processus** :
1. Dedupliquer les entries similaires
2. Resoudre les contradictions (garder le plus recent)
3. Supprimer les infos obsoletes
4. Convertir les dates relatives en absolues

**Exercice** : Créé un fichier MEMORY.md pour ton projet principal. Categorise chaque entry (episodic, semantic, procedural). Planifie une stratégie de consolidation.

---

# PARTIE 4 — Context Engineering pour Agents

---

## MODULE 12 — Contexte pour Agents Autonomes

**Objectif du module** : Comprendre les besoins specifiques en contexte des agents IA autonomes — ceux qui executent des taches multi-étapes sans intervention humaine.

### 12.1 Agent vs Chatbot : Besoins Différents

| Dimension | Chatbot | Agent Autonome |
|-----------|---------|---------------|
| Duree | 1 requete | Minutes a heures |
| Interactions | User → LLM → User | LLM → Tool → LLM → Tool → ... |
| Contexte | Statique par requete | Évolué a chaque étape |
| Erreurs | L'user corrige | L'agent doit s'auto-corriger |
| Tools | 0-5 tools | 10-100+ tools |
| Decision | Simple (répondre) | Complexe (planifier, executer, verifier) |

### 12.2 Le Contexte d'un Agent

Un agent autonome a besoin de :

> AGENT CONTEXT
> ├── IDENTITY (qui suis-je, quel est mon role)
> ├── MISSION (quelle est ma tache précise)
> ├── CONSTRAINTS (regles, limites, interdictions)
> ├── TOOLS (quels outils j'ai, comment les utiliser)
> ├── MEMORY (ce que j'ai fait/appris jusque la)
> ├── STATE (ou j'en suis dans la tache)
> └── EXIT CONDITIONS (quand est-ce que j'ai fini)
### 12.3 Tool Descriptions — Le Contexte le Plus Coute

Chaque tool a une description JSON qui consomme du contexte :

```json
{
 "name": "read_file",
 "description": "Reads a file from the local filesystem",
 "parameters": {
 "file_path": {
 "type": "string",
 "description": "The absolute path to the file"
 },
 "offset": {
 "type": "integer",
 "description": "Line number to start reading from"
 },
 "limit": {
 "type": "integer",
 "description": "Number of lines to read"
 }
 }
}
> Un agent avec 50 tools = facilement 10,000-20,000 tokens rien qu'en descriptions d'outils.
>
> **Optimisation** : Ne charger que les outils pertinents a la tache.
>
> ```python
> # Au lieu de charger 50 tools:
> tools = all_tools # 50 tools, ~15,000 tokens
>
> # Charger seulement les tools pertinents:
> if task_type == "code_edit":
> tools = [read_file, edit_file, grep, glob, bash] # 5 tools, ~2,000 tokens
> elif task_type == "deploy":
> tools = [bash, read_file] # 2 tools, ~800 tokens
### 12.4 Le Fresh Context Template

Quand tu spawn un agent, il part de zero. Tu dois lui donner tout ce dont il a besoin dans un seul message :

```markdown
## Mission: Fix le bug d'authentification
## Purpose: Les users ne peuvent pas se connecter depuis la mise a jour
## Context: Next.js 16 + Clerk, deploy sur Vercel, repo ~/project/
## What's Done:
- Identifie que le bug vient de src/middleware.ts
- Le token JWT n'est pas renouvele correctement
## Current Task:
- Fichier: src/middleware.ts, ligne 42
- Le `getAuth()` retourne null quand le cookie a expire
- Ajouter un check null + redirect vers /sign-in
## Key Decisions:
- On garde Clerk (pas de migration)
- La session dure 24h max
## Files in Scope:
- src/middleware.ts (edit)
- src/app/(auth)/sign-in/page.tsx (read only)
## Definition of Done:
- Le middleware handle le cas null
- npm run build = 0 erreurs
- L'user est redirige vers /sign-in si session expiree
> ### 12.5 Context Decay dans les Agents Long-Running
>
> Plus un agent tourne longtemps, plus son contexte degrade :
DEBUT (t=0):
 Context: 20,000 tokens
 Pertinence: 95%

Après 20 TOOL CALLS (t=10min):
 Context: 120,000 tokens
 Pertinence: 40%
 → Le contexte initial est "pousse" vers le milieu
 → Les tool results dominent
 → L'agent "oublie" sa mission originale
> **Solution** : Injecter des rappels periodiques :
> ```python
> if len(messages) % 10 == 0:
> messages.append({
> "role": "user",
> "content": f"RAPPEL: Ta mission est {mission}. Tu en es a l'étape {current_step}/{total_steps}."
> })
**Exercice** : Ecris un Fresh Context Template pour un agent de ton choix. Inclus tous les 7 elements (identity, mission, constraints, tools, memory, state, exit conditions).

---

## MODULE 13 — Multi-Agent Context Sharing

**Objectif du module** : Designer les mecanismes de partage de contexte entre agents qui travaillent en parallele ou en sequence sur une même tache.

### 13.1 Le Problème

Chaque agent a son propre context window. Ils ne partagent rien par defaut :

> AGENT A AGENT B
> ┌──────────────┐ ┌──────────────┐
> │ Contexte A │ │ Contexte B │
> │ (isole) │ │ (isole) │
> │ │ ←─────── │ │
> │ "J'ai trouve │ Pas de │ "Je ne sais │
> │ le bug dans │ partage │ pas ou est │
> │ auth.ts" │ │ le bug" │
> └──────────────┘ └──────────────┘
### 13.2 Patterns de Partage

| Pattern | Description | Quand l'utiliser |
|---------|-------------|-----------------|
| **Scratchpad** | Fichier partage sur disque | Agents sequentiels, resultats intermediaires |
| **Message Passing** | Un orchestrateur relaye les infos | Agents paralleles coordonnes |
| **Shared Memory** | Base de donnees/fichier commun | Equipe d'agents long-running |
| **Context Injection** | L'orchestrateur pre-charge le contexte pertinent | Agents spawnes avec contexte complet |
| **Event Bus** | Pub/sub de resultats | Systèmes asynchrones, pipelines |

### 13.3 Le Pattern Scratchpad

Le plus simple et le plus efficace pour des agents sequentiels :

> ORCHESTRATEUR
> │
> ▼
> AGENT 1 (Research)
> │ → Ecrit dans scratchpad/findings.md
> ▼
> AGENT 2 (Implementation)
> │ ← Lit scratchpad/findings.md
> │ → Ecrit dans scratchpad/changes.md
> ▼
> AGENT 3 (Verification)
> │ ← Lit scratchpad/findings.md + scratchpad/changes.md
> │ → Ecrit dans scratchpad/verdict.md
> ▼
> ORCHESTRATEUR
> ← Lit scratchpad/verdict.md
```python
SCRATCHPAD_DIR = "/tmp/scratchpad"

# Agent 1 ecrit ses trouvailles
def agent_research(task):
 findings = do_research(task)
 write_file(f"{SCRATCHPAD_DIR}/findings.md", findings)

# Agent 2 lit et implemente
def agent_implement(task):
 findings = read_file(f"{SCRATCHPAD_DIR}/findings.md")
 changes = implement_based_on(findings)
 write_file(f"{SCRATCHPAD_DIR}/changes.md", changes)
> ### 13.4 Le Pattern Coordinator Synthesis
>
> L'orchestrateur ne delegue pas l'understanding — il synthetise :
 MAUVAIS:
Orchestrateur → Agent A: "Trouve le bug"
Agent A → Orchestrateur: "Bug dans auth.ts:42"
Orchestrateur → Agent B: "L'agent A a trouve un bug, fixe-le"
 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 Delegation de l'understanding !

 BON:
Orchestrateur → Agent A: "Trouve le bug"
Agent A → Orchestrateur: "Bug dans auth.ts:42, getAuth() retourne null"
Orchestrateur SYNTHETISE, puis:
Orchestrateur → Agent B: "Fix auth.ts ligne 42: getAuth() retourne null
 quand le cookie expire. Ajoute un null check avant user.id.
 Si null, return NextResponse.redirect('/sign-in').
 Done = build passe + user redirige si session expiree."
> ### 13.5 Context Budget en Multi-Agent
>
> Plus d'agents = plus de contexte total consomme :
SINGLE AGENT:
 1 context × 50K tokens = 50K tokens total

MULTI-AGENT (3 agents):
 Orchestrateur: 30K tokens
 Agent 1: 40K tokens
 Agent 2: 35K tokens
 Agent 3: 45K tokens
 ────────────────────
 Total: 150K tokens (3x plus cher)
> La contrepartie : chaque agent a un contexte CIBLE, donc une meilleure qualité. Le trade-off cout/qualité vaut souvent le coup.
>
> **Exercice** : Designe un système multi-agent (3 agents) pour une tache de ton choix. Definis le mecanisme de partage de contexte et le budget total.
>
> ---
>
> ## MODULE 14 — Le Système AISB comme Exemple Reel
>
> **Objectif du module** : Etudier un système de production reel — comment Agentik OS gere le contexte pour 281 agents autonomes.
>
> ### 14.1 Vue d'Ensemble
>
> Agentik OS utilise Claude Code avec un ecosysteme de 267+ agents specialises, organises en departements :
CEO (Oracle)
├── CTO — 117 agents (Dev, QA, Security)
├── CMO — 48 agents (Content, SEO, Ads, Social)
└── CPO — 32 agents (Product, Analytics, Strategy)
> Chaque agent a besoin de contexte. Le challenge : gerer ~44,000 tokens de regles et instructions qui se chargent A CHAQUE session.
>
> ### 14.2 Architecture du Contexte AISB
CONTEXT LAYERS
━━━━━━━━━━━━━━

Layer 1: GLOBAL (~/.claude/CLAUDE.md)
 → Identite, regles critiques, routing
 → ~3,000 tokens
 → Charge: TOUJOURS

Layer 2: GLOBAL RULES (~/.claude/rules/*.md)
 → 36 fichiers de regles
 → ~44,000 tokens (problème!)
 → Charge: TOUJOURS (a optimiser)

Layer 3: PROJECT (CLAUDE.md du projet)
 → Stack, conventions, structure
 → ~2,000-5,000 tokens
 → Charge: TOUJOURS dans le projet

Layer 4: MEMORY (MEMORY.md + fichiers)
 → Préférences, decisions, connaissances
 → ~3,000-10,000 tokens
 → Charge: SELECTIVE (pertinence)

Layer 5: DOCS (docs/, architecture, etc.)
 → Documentation technique
 → ~5,000-50,000 tokens
 → Charge: A LA DEMANDE
> ### 14.3 Le Problème des 44K Tokens de Rules
>
> Agentik OS a decouvert que 36 fichiers de regles = 44,000 tokens charges a chaque requete. A $15/M tokens en Opus :
44,000 tokens × $15/M = $0.66 par session
50 sessions/jour = $33/jour
$990/mois JUSTE pour les regles
> **Solution implementee** : Audit et compression des regles, progressive disclosure, regles conditionnelles. Objectif : reduire de 69%.
>
> ### 14.4 Le Fresh Context Template en Action
>
> Quand Oracle (le routeur central) spawn un agent, il utilise ce template :
>
> ```markdown
> ## Mission: {1-2 line summary}
> ## Purpose: {why this matters}
> ## Context: {project dir, dev URL, stack}
> ## What's Done: {bullet list of completed work}
> ## Current Task: {specific file paths, line numbers, exact changes}
> ## Key Decisions: {from .orchestrator/decisions.md}
> ## Files in Scope: {ownership boundaries}
> ## Relevant Memories: {pre-selected, NOT all memories}
L'element critique : **"Relevant Memories"** — Oracle pre-selectionne les memories pertinentes au lieu de tout charger.

### 14.5 Le Memory System a 3 Tiers

> ┌─────────────────────────────────┐
> │ USER MEMORY │
> │ ~/.aisb/memory/user/ │
> │ Cross-project, préférences │
> │ "Gareth préféré les réponses │
> │ concises en anglais" │
> ├─────────────────────────────────┤
> │ PROJECT MEMORY │
> │ ~/.aisb/memory/project/{name}/ │
> │ Architecture, decisions │
> │ "Ce projet utilise Convex, │
> │ pas PostgreSQL" │
> ├─────────────────────────────────┤
> │ LOCAL MEMORY │
> │ ~/.aisb/memory/local/ │
> │ Machine-specific │
> │ "VPS 72.61.197.216, │
> │ SSH port 42820" │
> └─────────────────────────────────┘
> ### 14.6 Le Pipeline de Routing du Contexte

> USER MESSAGE
> │
> ▼
> ORACLE (classifie)
> │
> ├── SIMPLE → Do it yourself (context minimal)
> │
> ├── MEDIUM → Spawn 1 agent (Fresh Context Template)
> │
> ├── COMPLEX → /team (multiple agents, scratchpad)
> │ ├── Agent 1 → scratchpad/findings.md
> │ ├── Agent 2 → scratchpad/impl.md
> │ └── Agent 3 → scratchpad/verify.md
> │
> └── EPIC → /aisb full pipeline
> ROUTE → KEYMAKER (plan) → MORPHEUS (execute)
> → SERAPH (audit) → SMITH (learn)
### 14.7 Lecons Apprises (Production)

| Lecon | Detail |
|-------|--------|
| **Moins = Mieux** | 44K tokens de rules degrade la qualité. Vise <15K |
| **Le milieu est mort** | Les infos critiques vont en debut ou fin du contexte |
| **Memory selective** | Charger TOUTE la memoire = bruit. Pre-selectionner |
| **Fresh > Continue** | Un agent frais avec bon contexte bat un agent fatigue |
| **Coordinator reads** | L'orchestrateur doit COMPRENDRE, pas just relayer |
| **Budget conscient** | Chaque token a un cout. Mesure, optimise, itere |

**Exercice** : Dessine l'architecture de contexte de ton système IA ideal, inspire par le modèle AISB. Combien de layers ? Quels mecanismes de chargement ?

---

# PARTIE 5 — Optimisation et Production

---

## MODULE 15 — Mesurer et Optimiser le Contexte

**Objectif du module** : Mettre en place des metriques et des outils pour mesurer l'efficacite de ton contexte et l'optimiser continuellement.

### 15.1 Les Metriques Cles

| Metrique | Definition | Comment mesurer | Cible |
|----------|-----------|----------------|-------|
| **Context Utilization Rate** | % du context window utilise | input_tokens / max_tokens | 30-60% |
| **Context Relevance Score** | % du contexte reellement utile | LLM-as-judge | > 80% |
| **Token Cost Per Query** | Cout en tokens par requete | Somme input + output | Minimiser |
| **Retrieval Recall** | % des infos pertinentes trouvees | Eval set humain | > 80% |
| **Instruction Following Rate** | % des regles respectees | Test automatise | > 95% |
| **Waste Ratio** | % de tokens non utilises | (total - useful) / total | < 20% |

### 15.2 Audit du Contexte

```python
# Script d'audit de contexte
def audit_context(messages, system_prompt):
 """Analyse chaque composant du contexte."""

 report = {
 "system_prompt_tokens": count_tokens(system_prompt),
 "total_input_tokens": sum(count_tokens(m) for m in messages),
 "components": []
 }

 for msg in messages:
 component = {
 "role": msg["role"],
 "tokens": count_tokens(msg["content"]),
 "percentage": 0, # calculated after
 }
 report["components"].append(component)

 total = report["total_input_tokens"]
 for c in report["components"]:
 c["percentage"] = round(c["tokens"] / total * 100, 1)

 return report

# Exemple de sortie:
# system_prompt: 3,200 tokens (6.4%)
# user messages: 2,100 tokens (4.2%)
# tool results: 35,000 tokens (70%) ← Problème
# assistant msgs: 9,700 tokens (19.4%)
> ### 15.3 Le Dashboard de Contexte
CONTEXT HEALTH DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━

Utilization: ████████████░░░░░░░░ 58% (good)
Relevance: █████████████████░░░ 85% (good)
Waste: ███░░░░░░░░░░░░░░░░ 15% (good)
Cost/query: $0.42 (target: <$0.50)

TOP CONSUMERS:
 Tool results: 35,000 tokens (70%) ️
 System prompt: 3,200 tokens (6%)
 Rules: 8,000 tokens (16%)
 Conversation: 2,100 tokens (4%)
 Memory: 1,700 tokens (3%)

RECOMMENDATIONS:
 1. Reduce tool result size (read specific lines, not full files)
 2. Compress conversation history (summarize older messages)
 3. Consider tiered rules loading
> ### 15.4 A/B Testing du Contexte
>
> Comme le CRO pour les landing pages, tu peux A/B tester ton contexte :
>
> ```python
> import random
>
> def get_system_prompt(variant: str) -> str:
> if variant == "A":
> return DETAILED_SYSTEM_PROMPT # 5,000 tokens
> elif variant == "B":
> return CONCISE_SYSTEM_PROMPT # 1,500 tokens
>
> # Pour chaque requete
> variant = random.choice(["A", "B"])
> prompt = get_system_prompt(variant)
>
> # Log les resultats
> log_experiment(
> variant=variant,
> response_quality=judge_quality(response), # LLM-as-judge
> tokens_used=response.usage.input_tokens,
> cost=calculate_cost(response.usage),
> latency=response_time
> )
**Exercice** : Mets en place un audit de contexte pour ton système IA. Identifie les 3 plus grosses sources de gaspillage et propose un plan d'optimisation.

---

## MODULE 16 — Context Compression Techniques

**Objectif du module** : Maitriser les techniques de compression de contexte pour reduire les couts et ameliorer la qualité sans perdre d'information critique.

### 16.1 Pourquoi Compresser ?

> AVANT COMPRESSION:
> Context: 80,000 tokens
> Cout: $1.20/requete (Opus)
> Qualité: 72% (trop de bruit)
>
> Après COMPRESSION:
> Context: 30,000 tokens
> Cout: $0.45/requete (-62%)
> Qualité: 89% (+23%, moins de bruit)
Moins de contexte ≠ moins de qualité. Souvent, c'est l'inverse.

### 16.2 Techniques de Compression

| Technique | Reduction | Effort | Quand l'utiliser |
|-----------|-----------|--------|-----------------|
| **Summarization** | 60-80% | Moyen | Conversation history, longs documents |
| **Selective Loading** | 40-70% | Faible | Rules, memory, docs |
| **Distillation** | 50-70% | Eleve | Instructions repetitives |
| **Deduplication** | 10-30% | Faible | Memory, tool results |
| **Truncation** | Variable | Faible | Tool results (premiers/derniers N lignes) |
| **Schema Compression** | 20-40% | Moyen | Tool descriptions, JSON schemas |

### 16.3 Summarization Progressive

Au lieu de garder toute la conversation, resume les anciens messages :

> MESSAGES ORIGINAUX (20 messages, 15,000 tokens):
> User: "Comment on configure l'auth ?"
> Assistant: [500 tokens d'explication sur Clerk]
> User: "OK et pour les middleware ?"
> Assistant: [800 tokens sur les middleware]
> ... (16 autres messages)
>
> Après SUMMARIZATION (3,000 tokens):
> [RESUME DES ECHANGES PRECEDENTS]:
> L'utilisateur configure l'authentification avec Clerk.
> Decisions prises:
> - Clerk comme provider (pas Auth.js)
> - Middleware sur /app/* et /api/*
> - Session duration: 24h
> - Refresh token: 30 jours
>
> [5 DERNIERS MESSAGES VERBATIM]:
> User: "Et pour le rate limiting ?"
> ...
```python
def compress_history(messages: list, keep_recent: int = 5) -> list:
 if len(messages) <= keep_recent:
 return messages

 old_messages = messages[:-keep_recent]
 recent_messages = messages[-keep_recent:]

 # Utilise un LLM cheap pour resumer
 summary = summarize_with_llm(
 old_messages,
 instruction="Resume les points cles de cette conversation en bullet points."
 )

 return [
 {"role": "system", "content": f"[Resume des echanges precedents]:\n{summary}"},
 *recent_messages
 ]
> ### 16.4 Distillation d'Instructions
>
> Prends des instructions verbeuses et distille-les en regles compactes :
>
> ```markdown
> # AVANT (verbose — 2,000 tokens):
> Quand tu ecris du code TypeScript dans ce projet, il est très
> important que tu utilises toujours le mode strict de TypeScript.
> Cela signifie que tu dois t'assurer que toutes les variables ont
> un type explicite, que tu n'utilises jamais "any" sauf en dernier
> recours, et que tu actives toutes les options strict dans le
> tsconfig.json. De plus, quand tu créés des composants React...
> [500 lignes de plus]
>
> # Après (distille — 300 tokens):
> ## TypeScript Rules
> - Strict mode ON (noImplicitAny, strictNullChecks)
> - Never use `any` — use `unknown` + type guards
> - Explicit return types on exported functions
> - Interface > Type (unless union/intersection needed)
>
> ## React Rules
> - Functional components only
> - Props interface above component
> - Custom hooks in /hooks/
> - Server Components by default
### 16.5 Tool Result Compression

Les tool results sont souvent les plus gros consommateurs :

```python
# Lire un fichier entier (8,000 tokens)
read_file("src/app/layout.tsx")

# Lire seulement les lignes pertinentes (500 tokens)
read_file("src/app/layout.tsx", offset=30, limit=20)

# Rechercher et retourner le contenu complet
grep("auth", output_mode="content") # Peut retourner 10,000 tokens

# Rechercher et retourner seulement les fichiers
grep("auth", output_mode="files_with_matches") # ~200 tokens
# Puis lire seulement les fichiers pertinents
> **Exercice** : Prends un contexte de 50,000+ tokens dans ton système. Applique chaque technique de compression et mesure le ratio de reduction. Compare la qualité des réponses avant/après.
>
> ---
>
> ## MODULE 17 — Anti-patterns et Erreurs Courantes
>
> **Objectif du module** : Identifier et eviter les erreurs les plus frequentes en Context Engineering — celles qui coutent cher et degradent la qualité.
>
> ### 17.1 Les 10 Anti-patterns du Context Engineering
>
> #### 1. Context Stuffing
 "Plus de contexte = meilleure réponse"

REALITE: Au-dela de 50-60% du context window, la qualité BAISSE.
Le LLM se noie dans l'information. Le signal se perd dans le bruit.

FIX: Moins mais mieux. Chaque token doit meriter sa place.
> #### 2. Stale Context
 CLAUDE.md ecrit il y a 6 mois, jamais mis a jour.
 Memory qui référence des fichiers supprimes.
 Instructions pour un framework qu'on a remplace.

FIX: Audit mensuel du contexte. Delete ce qui est obsolete.
> #### 3. Missing Context
 L'agent ne sait pas que le projet utilise TypeScript strict.
 Il généré du JavaScript loose. Tu corriges a la main.

FIX: Chaque convention importante = une instruction explicite.
 Si le LLM fait la même erreur 3x, c'est un problème de contexte.
> #### 4. Context Pollution
 Les tool results de la requete precedente polluent la suivante.
 L'agent parle d'un fichier qu'il a lu avant, pas de celui
 que tu viens de lui demander.

FIX: Clean context entre les taches. Ou spawn un agent frais.
> #### 5. Instruction Conflicts
 Regle globale: "Toujours ecrire les tests d'abord"
 Regle projet: "On n'a pas de tests dans ce projet"

 Le LLM fait n'importe quoi, alternant entre les deux.

FIX: La hierarchie doit être claire. Specifique > Général.
 Pas de contradictions.
> #### 6. Context Blindness
 Tu ne sais pas ce qui est dans le contexte de ton agent.
 Tu ne comptes pas les tokens.
 Tu ne mesures pas le cout.

FIX: Instrumente. Mesure. Monitore. (Module 15)
> #### 7. One-Size-Fits-All Context
 Le même contexte pour toutes les taches.
 Question simple → 50,000 tokens de contexte.
 Tache complexe → 50,000 tokens de contexte.

FIX: Contexte adaptatif. Simple = minimal. Complex = enrichi.
> #### 8. Memory Hoarding
 Sauvegarder TOUT dans la memoire.
 3,000 entries dont 2,500 sont du bruit.
 Le LLM charge tout et se noie.

FIX: Consolidation reguliere. Keep les 20% qui sont utiles.
 Delete le reste.
> #### 9. Tool Description Bloat
 100 tools decrits en detail = 30,000 tokens.
 L'agent n'en utilise que 5.

FIX: Charger seulement les tools pertinents a la tache.
 Ou utiliser un "tool router" qui selectionne dynamiquement.
> #### 10. Copy-Paste Context
 Copier-coller des blocs de texte dans le system prompt
 sans les adapter. "Ca marchait dans l'autre projet."

FIX: Chaque contexte est design pour SON cas d'usage.
 Adapte, ne copie pas.
> ### 17.2 Checklist de Sante du Contexte
>
> Avant chaque mise en production, verifie :
>
> | Check | Question | Pass/Fail |
> |-------|----------|-----------|
> | Budget | Le contexte utilise < 60% du context window ? | |
> | Pertinence | Chaque source de contexte est nécessaire ? | |
> | Fraicheur | Toutes les instructions sont a jour ? | |
> | Coherence | Pas de contradictions entre les regles ? | |
> | Priorisation | Les infos critiques sont en debut ou fin ? | |
> | Cout | Le cout par requete est acceptable ? | |
> | Qualité | Le LLM suit les instructions correctement ? | |
> | Mesure | Les metriques de contexte sont en place ? | |
>
> ### 17.3 Le Cycle d'Amelioration Continue
 ┌─────────┐
 │ MESURER │
 │ (audit) │
 └────┬────┘
 │
 ┌──────▼──────┐
 │ IDENTIFIER │
 │ (problèmes)│
 └──────┬──────┘
 │
 ┌──────▼──────┐
 │ OPTIMISER │
 │ (compress, │
 │ reorganize│
 │ prune) │
 └──────┬──────┘
 │
 ┌──────▼──────┐
 │ TESTER │
 │ (A/B test, │
 │ eval set) │
 └──────┬──────┘
 │
 ┌──────▼──────┐
 │ DEPLOYER │
 │ (prod) │
 └──────┬──────┘
 │
 └──────→ retour a MESURER
> **Exercice final** : Fais un audit complet de ton système IA en utilisant la checklist ci-dessus. Pour chaque "Fail", ecris un plan d'action avec deadline.
>
> ---
>
> # ANNEXES
>
> ---
>
> ## Annexe A — Glossaire
>
> | Terme | Definition |
> |-------|-----------|
> | **Attention Decay** | Perte de qualité de traitement pour les informations au milieu du context window |
> | **Chunking** | Decoupage de documents en morceaux pour le stockage vectoriel |
> | **Context Assembly** | Processus d'assemblage des differentes sources de contexte avant envoi au LLM |
> | **Context Budget** | Allocation planifiee des tokens du context window entre les differentes sources |
> | **Context Pollution** | Presence d'informations irrelevantes ou obsoletes dans le contexte |
> | **Context Window** | Nombre maximum de tokens qu'un LLM peut traiter en une requete |
> | **Cross-Encoder** | Modèle qui evalue la pertinence d'un document par rapport a une requete (reranking) |
> | **Embedding** | Representation vectorielle d'un texte dans un espace numérique |
> | **Episodic Memory** | Memoire des evenements et expériences passes (sessions precedentes) |
> | **Few-shot** | Exemples inclus dans le prompt pour guider le comportement du LLM |
> | **Fresh Context** | Contexte pre-assemble pour un agent nouvellement spawn |
> | **Lost in the Middle** | Phenomene ou les LLMs traitent mal les informations au centre du context window |
> | **Progressive Disclosure** | Technique de chargement conditionnel du contexte selon les besoins |
> | **RAG** | Retrieval-Augmented Génération — injection de documents retrieves dans le contexte |
> | **Recency Bias** | Tendance du LLM a donner plus de poids aux informations recentes (fin du contexte) |
> | **Reranking** | Re-classement des resultats de retrieval avec un modèle plus précis |
> | **Scratchpad** | Fichier partage entre agents pour communiquer des resultats intermediaires |
> | **Semantic Memory** | Connaissances generales permanentes (faits, préférences, decisions) |
> | **System Prompt** | Instructions initiales qui definissent le comportement du LLM |
> | **Token** | Unite de base du texte pour un LLM (~4 caracteres en anglais, ~3.5 en francais) |
> | **Vector Database** | Base de donnees optimisee pour stocker et rechercher des embeddings |
> | **Working Memory** | Le context window actuel d'une requete |
>
> ---
>
> ## Annexe B — Cheat Sheet Context Engineering
╔══════════════════════════════════════════════════════════════╗
║ CONTEXT ENGINEERING CHEAT SHEET ║
╠══════════════════════════════════════════════════════════════╣
║ ║
║ REGLE #1: Le prompt = 10% du contexte. Design les 90%. ║
║ ║
║ BUDGET: ║
║ → Vise 30-60% du context window max ║
║ → System prompt: <5,000 tokens ║
║ → Rules: <15,000 tokens ║
║ → Laisse 40%+ de marge ║
║ ║
║ PLACEMENT: ║
║ → Critique → DEBUT (system prompt) ║
║ → Important → FIN (dernier message) ║
║ → Nice-to-have → MILIEU (zone morte) ║
║ ║
║ PROGRESSIVE DISCLOSURE: ║
║ → Charger le minimum par defaut ║
║ → Enrichir a la demande ║
║ → 2 passes si nécessaire (plan → execute) ║
║ ║
║ RAG: ║
║ → Chunks: 300-500 tokens idealement ║
║ → Top-5 results + reranking ║
║ → Metadata pour filtrage ║
║ ║
║ AGENTS: ║
║ → Fresh Context Template pour chaque agent ║
║ → Rappels periodiques de la mission ║
║ → Scratchpad pour le partage inter-agents ║
║ ║
║ ANTI-PATTERNS: ║
║ → Context stuffing (trop de contexte) ║
║ → Stale context (instructions obsoletes) ║
║ → Missing context (conventions implicites) ║
║ → Tool description bloat (trop de tools) ║
║ ║
║ MESURER: ║
║ → Tokens par requete ║
║ → Cout par requete ║
║ → Context utilization rate (30-60%) ║
║ → Instruction following rate (>95%) ║
║ ║
╚══════════════════════════════════════════════════════════════╝

---

## Annexe C — Ressources

| Ressource | URL | Description |
|-----------|-----|-------------|
| Lost in the Middle (paper) | arxiv.org/abs/2307.03172 | L'etude originale sur l'attention decay |
| MTEB Leaderboard | huggingface.co/spaces/mteb | Classement des embedding models |
| ChromaDB Docs | docs.trychroma.com | Vector DB la plus simple a demarrer |
| Claude Docs | docs.anthropic.com | Documentation officielle Claude |
| Agentik OS | agentik-os.com | La plateforme qui applique tout ca en production |

---

## Annexe D — Templates Telechargeables

1. **Context Budget Template** — Spreadsheet pour planifier l'allocation de tokens
2. **CLAUDE.md Template** — Le template universel du Module 6
3. **Fresh Context Template** — Template pour spawner des agents (Module 12)
4. **Context Audit Checklist** — La checklist du Module 17
5. **RAG Evaluation Set** — 20 questions test pour evaluer la qualité du retrieval

---

*Formation créée par Agentik {OS} — Version 1.0 — Avril 2026*
