# Formation — Construire des Systèmes IA

## Concevoir, Architecturer & Deployer des Applications IA Production-Grade

## Instructions pour l'Agent Createur de Formation

> **Objectif** : Générer LA formation definitive sur la construction de vrais systèmes IA — pas juste utiliser des outils IA, mais engineer des produits, plateformes et systèmes autonomes complets alimentes par l'IA. L'eleve apprend le system design, les patterns d'architecture, l'orchestration de modèles, le RAG, l'evaluation, le monitoring, et le deploiement en production. C'est la formation engineering — la ou le logiciel rencontre l'IA a l'echelle.
>
> **Ton** : Ingenieur senior qui enseigne. Clair, opinionne, base sur l'expérience production. Chaque concept est soutenu par de vraies decisions d'architecture et leurs trade-offs. Pas de hand-waving — si on recommande quelque chose, on explique pourquoi.
>
> **Format** : Chaque module = diagramme d'architecture + implementation code + guide de deploiement + checklist production. L'eleve construit un vrai système tout au long de la formation.
>
> **Duree estimee** : 45-60 heures de contenu. 8-12 semaines pour completer.
>
> **Prix** : $697 seul / inclus dans le bundle premium
>
> **Pre-requis** : Programmation (TypeScript/Python), comprehension de base des API, familiarite avec les concepts IA. Formation 4 (Claude Code Masterclass) recommandee mais pas obligatoire.

---

## Identite de la Formation

| Champ | Valeur |
|-------|--------|
| Nom | **Construire des Systèmes IA — De l'Architecture a la Production** |
| Sous-titre | Concois, construis et deploie des systèmes IA qui fonctionnent a l'echelle |
| Createur | Gareth Simono — Fondateur d'Agentik {OS} (265 agents en production) |
| Public cible | Ingenieurs logiciel, developpeurs full-stack, fondateurs techniques, aspirants ingenieurs IA, praticiens CAIO |
| Pre-requis | A l'aise avec TypeScript ou Python, les API et le terminal. Comprehension de base de l'IA. |
| Promesse | "En 12 semaines, tu sais architecturer, construire et deployer un système IA en production — d'un simple chatbot a une plateforme multi-agents avec RAG, evaluation et monitoring" |
| Credibilite | Construit par le fondateur qui a architecture Agentik OS : 265 agents autonomes, 190+ skills, servant de vrais clients en production |
| Upsell | Service AI Build ($15K-45K) ou CAIO Partnership sur agentik-os.com |

---

## Architecture de la Formation — 4 Phases

> PHASE 1 — FONDATIONS (Semaines 1-3)
> "Je comprends l'architecture des systèmes IA et je peux prendre des decisions de design eclairees"
> Modules 1-5
>
> PHASE 2 — ENGINEERING FONDAMENTAL (Semaines 4-6)
> "Je sais construire des applications alimentees par l'IA avec une architecture propre"
> Modules 6-10
>
> PHASE 3 — PATTERNS AVANCES (Semaines 7-9)
> "Je maitrise les systèmes multi-agents, le RAG, l'evaluation et les pipelines complexes"
> Modules 11-16
>
> PHASE 4 — PRODUCTION & SCALE (Semaines 10-12)
> "Je deploie, monitore et scale des systèmes IA en production"
> Modules 17-22
---

# ═══════════════════════════════════════════════
# PHASE 1 — FONDATIONS
# "Je comprends le design des systèmes IA"
# Semaines 1-3 | 10-14 heures
# ═══════════════════════════════════════════════

### MODULE 1 — Architecture des Systèmes IA : La Vue d'Ensemble

**Objectif** : L'eleve comprend ce qui différencié un système IA d'un logiciel traditionnel et peut raisonner sur les trade-offs architecturaux.

**Lecons a générer :**

1.1 **Qu'est-ce qu'un système IA (vs un logiciel traditionnel)**
- Logiciel traditionnel : input deterministe → output deterministe
- Système IA : input probabiliste → output probabiliste → boucle de feedback
- Les 4 composants de tout système IA : Modèle, Donnees, Orchestration, Interface
- Pourquoi les systèmes IA sont plus complexes : non-determinisme, difficulte d'evaluation, gestion des couts, latence
- Pourquoi les systèmes IA valent le coup : ils gerent l'ambiguite, scalent le travail cognitif, et s'ameliorent avec le temps

1.2 **Le stack d'un système IA**
> ┌─────────────────────────────────────┐
> │ INTERFACE UTILISATEUR │
> │ (Web, Mobile, API, CLI, Chat) │
> ├─────────────────────────────────────┤
> │ COUCHE D'ORCHESTRATION │
> │ (Routing, Agents, Pipelines, RAG) │
> ├─────────────────────────────────────┤
> │ COUCHE Modèle │
> │ (Claude, GPT, Gemini, Open Source) │
> ├─────────────────────────────────────┤
> │ COUCHE DONNEES │
> │ (Vector DB, SQL, Cache, Fichiers) │
> ├─────────────────────────────────────┤
> │ COUCHE INFRASTRUCTURE │
> │ (Compute, Stockage, Monitoring) │
> └─────────────────────────────────────┘
1.3 **Types de systèmes IA**

| Type | Complexite | Exemple | Quand l'utiliser |
|------|-----------|---------|------------------|
| **Single-prompt** | Basse | Chatbot support client | Une question → une réponse |
| **Chain/Pipeline** | Moyenne | Pipeline de génération de contenu | Traitement sequentiel multi-étapes |
| **RAG (Retrieval-Augmented)** | Moyenne-Haute | Assistant base de connaissances | Répondre a partir de donnees specifiques |
| **Agent** | Haute | Assistant code, agent de recherche | Prise de decision autonome |
| **Multi-agent** | Très Haute | Agentik OS (265 agents) | Workflows orchestres complexes |
| **Système autonome** | Extreme | Moteur de contenu auto-pilot | Fonctionnement 24/7 sans intervention humaine |

1.4 **Framework de decision architecturale**
- Commencer simple, ajouter de la complexite seulement quand c'est nécessaire
- Le test "est-ce que j'ai vraiment besoin d'IA pour ca ?" (parfois un regex suffit)
- Budget de latence : a quelle vitesse ca doit répondre ?
- Budget de couts : combien tu peux depenser par requete ?
- Barre de qualité : quel niveau de precision est acceptable ?
- Exigences de scale : 10 requetes/jour ou 10 000/heure ?

1.5 **Anti-patterns courants des systèmes IA**
- Over-engineering : construire un système multi-agents quand un seul prompt suffit
- Sous-evaluation : livrer sans mesurer la qualité
- Ignorer les couts : cramer les credits API sans conscience budgetaire
- Pas de fallbacks : le système plante complètement quand le modèle est down
- Prompt spaghetti : des system prompts de 10 000 mots que personne ne peut maintenir

**Exercice** : Diagramme l'architecture d'un système IA que tu veux construire. Identifie : couche modèle, couche donnees, couche orchestration, couche interface, et liste tes 3 principaux trade-offs de design.

---

### MODULE 2 — Fondamentaux LLM pour les Builders de Systèmes

**Objectif** : L'eleve comprend comment les LLM fonctionnent au niveau nécessaire pour construire des systèmes fiables par-dessus.

**Lecons a générer :**

2.1 **Comment les LLM fonctionnent vraiment (modèle mental de l'ingenieur)**
- Prediction de tokens : etant donne une sequence, predire le prochain token
- Context window : la "memoire de travail" (combien le modèle peut voir d'un coup)
- Temperature : le curseur d'aleatoire (0 = deterministe, 1 = créatif)
- Top-p / Top-k : controler la distribution de probabilite
- Pourquoi c'est important pour le system design : reproductibilite, caching, cout

2.2 **Le paysage des modèles en 2026**

| Modèle | Fournisseur | Contexte | Ideal pour | Cout API |
|--------|-------------|----------|------------|----------|
| Claude Opus 4.6 | Anthropic | 200K (1M disponible) | Raisonnement complexe, code, analyse | $$$ |
| Claude Sonnet 4.6 | Anthropic | 200K | Dev quotidien, taches equilibrees | $$ |
| Claude Haiku 4.5 | Anthropic | 200K | Taches rapides, classification | $ |
| GPT-4.1 | OpenAI | 1M | Usage général, ecosysteme large | $$ |
| o3 / o4-mini | OpenAI | 200K | Raisonnement, maths, logique | $$$ / $ |
| Gemini 3 Pro | Google | 2M | Contexte ultra-long, multimodal | $$ |
| Gemini 3 Flash | Google | 1M | Rapide, pas cher, bonne qualité | $ |
| Llama 4 | Meta | 128K | Self-hosted, vie privee | Gratuit (compute) |
| Mistral Large | Mistral | 128K | Conformite EU, self-hosted | $$ / Gratuit |
| DeepSeek R2 | DeepSeek | 128K | Raisonnement, open-source | $ |

2.3 **Stratégie multi-modèles**
- Pourquoi utiliser plusieurs modèles (optimisation des couts, matching des capacites, fallbacks)
- Pattern de routage : taches simples → modèle pas cher, complexes → modèle premium
- Chaines de fallback : si le modèle A echoue, essaie le modèle B
- Pattern de consensus : demande a 3 modèles, prends la réponse majoritaire
- Suivi des couts : mesurer et optimiser les depenses par type de tache

2.4 **Economie des tokens**
- Input tokens vs output tokens (prix différents)
- Prompt caching (reutiliser le prefixe, economiser 90% sur les appels repetes)
- Batch API (50% moins cher pour les taches non urgentes)
- Gestion du context window (contexte plus petit = moins cher + plus rapide)
- La formule de cout : `tokens × prix_par_token × requetes_par_jour × 30`

2.5 **Capacites et limites des modèles**
- Ce que les modèles font BIEN : génération de texte, analyse, classification, code, traduction, resume
- Ce que les modèles font MAL : maths (utilise des outils), donnees temps reel (utilise la recherche), comptage, matching exact de chaines
- Tool use : etendre les capacites du modèle avec des fonctions
- Structured outputs : forcer la conformite JSON/schema
- Vision : comprehension d'images (Claude, GPT-4o, Gemini)

**Exercice** : Pour le système que tu as designe au Module 1, choisis le(s) modèle(s) optimal(aux). Calcule le cout mensuel estime a l'echelle attendue.

---

### MODULE 3 — Le SDK Anthropic & Claude API en Profondeur

**Objectif** : Maitriser l'API Claude — messages, streaming, tool use, structured outputs, vision, caching.

**Lecons a générer :**

3.1 **Setup du SDK et authentification**
```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
 apiKey: process.env.ANTHROPIC_API_KEY,
});
> - SDK TypeScript : `@anthropic-ai/sdk`
> - SDK Python : `anthropic`
> - Authentification : cles API depuis console.anthropic.com
> - Gestion des variables d'environnement
>
> 3.2 **L'API Messages — Interaction principale**
> ```typescript
> const response = await client.messages.create({
> model: "claude-sonnet-4-6-20250514",
> max_tokens: 4096,
> system: "You are a helpful assistant.",
> messages: [
> { role: "user", content: "Explain quantum computing in 3 sentences." }
> ],
> });
- System prompt : instructions persistantes
- Tableau de messages : historique de conversation
- max_tokens : controler la longueur de la réponse
- stop_sequences : conditions d'arret personnalisees
- temperature : controle de la creativite
- Parsing de la réponse : content blocks, stop_reason, usage

3.3 **Réponses en streaming**
```typescript
const stream = client.messages.stream({
 model: "claude-sonnet-4-6-20250514",
 max_tokens: 4096,
 messages: [{ role: "user", content: "Write a story." }],
});

for await (const event of stream) {
 if (event.type === "content_block_delta") {
 process.stdout.write(event.delta.text);
 }
}
> - Pourquoi streamer : meilleure UX (l'utilisateur voit la réponse se construire)
> - Server-Sent Events (SSE) pour les web apps
> - Streaming token par token vs par chunks
> - Gestion des erreurs dans les streams
>
> 3.4 **Tool use (function calling)**
> ```typescript
> const tools = [
> {
> name: "get_weather",
> description: "Get current weather for a location",
> input_schema: {
> type: "object" as const,
> properties: {
> location: { type: "string", description: "City name" },
> },
> required: ["location"],
> },
> },
> ];
>
> const response = await client.messages.create({
> model: "claude-sonnet-4-6-20250514",
> max_tokens: 1024,
> tools,
> messages: [{ role: "user", content: "What's the weather in Paris?" }],
> });
> // Gerer les blocks tool_use, executer la fonction, retourner tool_result
- Definir des tools avec JSON Schema
- La boucle de tool use : requete → tool_use → executer → tool_result → continuer
- Appels de tools paralleles : Claude peut appeler plusieurs tools en même temps
- Gestion des erreurs : que se passe-t-il quand un tool echoue
- Bonnes pratiques : descriptions claires, valeurs par defaut sensees, validation

3.5 **Structured outputs**
- Forcer Claude a retourner du JSON valide
- Application de schema pour un parsing fiable
- Contraintes enum pour les taches de classification
- Objets imbriques pour les structures de donnees complexes
- Validation : toujours valider même avec l'application de schema

3.6 **Vision (comprehension d'images)**
```typescript
const response = await client.messages.create({
 model: "claude-sonnet-4-6-20250514",
 max_tokens: 1024,
 messages: [{
 role: "user",
 content: [
 { type: "image", source: { type: "base64", media_type: "image/png", data: base64Image } },
 { type: "text", text: "Describe this image in detail." },
 ],
 }],
});
> - Formats supportes : PNG, JPEG, GIF, WebP
> - Input base64 vs URL
> - Cas d'usage : analyse de documents, comprehension de screenshots, lecture de graphiques
> - Cout : les images consomment des tokens en fonction de leur taille
>
> 3.7 **Prompt caching**
> - Cacher les longs system prompts ou documents de référence
> - Economiser jusqu'a 90% sur les appels repetes avec le même prefixe
> - Controle du cache : `cache_control: { type: "ephemeral" }`
> - Quand l'utiliser : systèmes RAG, agents avec de longues instructions, traitement par lots
>
> 3.8 **Batch API**
> - Traiter des milliers de requetes a 50% de reduction
> - Asynchrone : soumettre le batch, poll pour les resultats
> - Cas d'usage : génération de contenu a l'echelle, traitement de donnees, evaluation
> - Implementation : créer le batch → attendre → recuperer les resultats
>
> 3.9 **Extended thinking**
> - Laisser Claude "reflechir" avant de répondre (chain-of-thought)
> - Meilleur pour le raisonnement complexe, les maths, les problèmes multi-étapes
> - Budget de tokens pour la reflexion vs la réponse
> - Quand l'utiliser vs quand c'est excessif
>
> **Exercice** : Construis une classe wrapper API complète avec : messages basiques, streaming, tool use (3 tools), structured outputs, vision, et gestion des erreurs. Ceci devient la fondation pour le reste de la formation.
>
> ---
>
> ### MODULE 4 — System Prompts & Prompt Engineering a l'Echelle
>
> **Objectif** : Maitriser l'art et la science des system prompts pour les systèmes IA en production.
>
> **Lecons a générer :**
>
> 4.1 **Architecture des system prompts**
> - Le system prompt est l'"ADN" de ton système IA
> - Structure : Identite → Instructions → Contraintes → Format → Exemples
> - Trade-off longueur vs performance (plus court = plus rapide + moins cher, plus long = plus de controle)
> - Versioning : traiter les system prompts comme du code (Git, changelogs, tests)
>
> 4.2 **Le template de system prompt production**
# Role & Identite
Tu es [ROLE]. Tu travailles pour [ENTREPRISE].

# Instructions Principales
Quand un utilisateur te demande de [TACHE] :
1. D'abord, [Étape 1]
2. Ensuite, [Étape 2]
3. Enfin, [Étape 3]

# Format de Sortie
Reponds toujours dans ce format :
- [CHAMP 1] : [description]
- [CHAMP 2] : [description]

# Contraintes
- JAMAIS [chose a eviter]
- TOUJOURS [chose a toujours faire]
- En cas de doute, [comportement par defaut]

# Exemples
Utilisateur : [exemple d'input]
Assistant : [exemple d'output]
4.3 **Techniques de prompt engineering pour les systèmes**
| Technique | Ce que ca fait | Quand l'utiliser |
|-----------|---------------|------------------|
| **Few-shot** | Fournir 2-5 exemples | Classification, formatage |
| **Chain-of-thought** | "Reflechis étape par étape" | Raisonnement complexe |
| **Role assignment** | "Tu es un expert en..." | Taches specifiques a un domaine |
| **Constraint anchoring** | "JAMAIS X, TOUJOURS Y" | Sécurité, coherence |
| **Output templating** | "Reponds dans ce format JSON" | Structured outputs |
| **Self-verification** | "Verifie ta réponse avant de répondre" | Taches critiques en precision |
| **Decomposition** | "Decompose en sous-taches" | Problèmes complexes multi-étapes |
4.4 **Gerer la complexite des prompts**
- Prompts modulaires : decouper en sections reutilisables
- Sections conditionnelles : inclure/exclure selon le contexte
- Prompts dynamiques : injecter le contexte pertinent au runtime
- Registre de prompts : stockage centralise pour tous les prompts
- A/B testing : comparer les versions de prompts avec des metriques
4.5 **Echecs courants de prompts et corrections**
- Le modèle ignore les instructions → Placer les instructions critiques au debut ET a la fin
- Format de sortie inconsistant → Ajouter des exemples de format stricts + validation
- Hallucination → Ajouter "utilise uniquement les informations du contexte fourni"
- Trop verbeux → Ajouter "sois concis, maximum 3 phrases"
- Mauvais ton → Ajouter des exemples du ton souhaite
- Refuse des requetes valides → Ajuster les contraintes, ajouter des permissions explicites
4.6 **Test et evaluation des prompts**
- Créer une suite de tests pour chaque system prompt (10-50 cas de test)
- Evaluation automatisee : executer les tests a chaque changement de prompt
- Tests de regression : s'assurer que les changements ne cassent pas les fonctionnalites existantes
- Evaluation humaine : echantillonner les outputs pour une revue qualité
- Le changelog de prompts : documenter chaque changement et pourquoi
**Exercice** : Ecris un system prompt production pour un agent de support client. Inclus : role, instructions, format, contraintes, 5 exemples. Créé 20 cas de test et execute-les.
---
### MODULE 5 — Couche Donnees : Bases de Donnees, Vecteurs & Connaissances
**Objectif** : L'eleve comprend l'architecture de donnees pour les systèmes IA.
**Lecons a générer :**
5.1 **Types de donnees dans les systèmes IA**
| Type de donnees | Stockage | Cas d'usage |
|----------------|----------|-------------|
| **Donnees structurees** | PostgreSQL, Convex | Donnees utilisateur, transactions, config |
| **Texte non structure** | Vector DB + object storage | Documents, articles, connaissances |
| **Embeddings** | Vector DB (Pinecone, Chroma, Weaviate) | Recherche semantique, RAG |
| **Historique de conversation** | Base de donnees + cache | Memoire de chat, contexte |
| **Outputs du modèle** | Base de donnees + logging | Evaluation, debugging |
| **Fichiers** | Object storage (S3, R2) | PDF, images, uploads |
5.2 **Les bases de donnees vectorielles expliquees**
- Qu'est-ce que les embeddings : convertir du texte en nombres qui capturent le sens
- Recherche semantique : trouver du contenu similaire par le sens, pas par mots-cles
- Options de vector DB :
- **Pinecone** : manage, scalable, production-ready
- **Chroma** : open-source, leger, ideal pour le prototypage
- **Weaviate** : open-source, riche en fonctionnalites, recherche hybride
- **Qdrant** : open-source, base sur Rust, rapide
- **pgvector** : extension PostgreSQL (integrer dans ta DB existante)
- Choisir le bon : echelle, cout, manage vs self-hosted
5.3 **Modèles d'embedding**
- OpenAI `text-embedding-3-small` / `text-embedding-3-large`
- Voyage AI embeddings (optimises pour le code, le juridique, etc.)
- Open-source : `nomic-embed-text`, `bge-large`
- Dimensions : 256 (rapide, petit) a 3072 (précis, grand)
- Choisir : les embeddings specifiques a la tache surpassent les generaux
5.4 **Construire une base de connaissances**
- Pipeline d'ingestion de documents : upload → chunk → embed → stocker
- Stratégies de chunking : taille fixe, semantique, recursif, sensible au document
- Metadata : toujours stocker la source, la date, le type avec les embeddings
- Indexation : HNSW, IVF, flat — trade-offs entre vitesse et precision
- Mises a jour : comment garder la base de connaissances a jour
5.5 **Memoire de conversation**
- Court terme : contexte de session courante (en memoire ou cache)
- Long terme : memoire persistante entre les sessions (base de donnees)
- Fenetre glissante : garder les N derniers messages
- Memoire par resume : resumer et compresser periodiquement
- Memoire par retrieval : chercher dans les conversations passees par pertinence
5.6 **Convex comme backend de système IA**
- Pourquoi Convex fonctionne bien pour les systèmes IA :
- Queries reactives (mises a jour UI en temps reel)
- TypeScript-natif (type-safe de la DB a l'UI)
- Actions pour les appels API externes (inference du modèle)
- Fonctions planifiees pour le traitement en arriere-plan
- Stockage de fichiers integre
- Design de schema pour les systèmes IA
- Stocker et querier l'historique de conversation
- Gerer les donnees et préférences utilisateur
**Exercice** : Configure une base de donnees vectorielle (Chroma ou pgvector), créé un pipeline d'embedding pour 100 documents, et construis une fonction de recherche semantique.
---
# ═══════════════════════════════════════════════
# PHASE 2 — ENGINEERING FONDAMENTAL
# "Je sais construire des applications alimentees par l'IA"
# Semaines 4-6 | 12-16 heures
# ═══════════════════════════════════════════════
### MODULE 6 — Construire une Application de Chat
**Objectif** : Construire une application de chat de qualité production avec streaming, memoire et tool use.
**Lecons a générer :**
6.1 **Architecture du chat**
Utilisateur → Frontend (React) → API Route (Next.js) → Claude API → Stream retour
 ↕
 Base de donnees (Convex)
 (conversations, messages, utilisateurs)
6.2 **Frontend : Interface de chat React**
- Liste de messages avec affichage en streaming
- Input avec bouton d'envoi et raccourcis clavier
- Rendu Markdown pour les réponses IA
- Coloration syntaxique du code
- Etats de chargement et gestion des erreurs
- Layout responsive mobile
6.3 **Backend : Routes API Next.js avec streaming**
- Server-sent events pour les réponses en streaming
- Integration du Vercel AI SDK (package `ai`)
- `streamText()` pour streamer les réponses Claude
- Gestion de l'historique de conversation
- Rate limiting par utilisateur
6.4 **Ajouter le tool use au chat**
- Definir les tools que le chat peut utiliser (recherche, calcul, consultation de donnees)
- Execution des tools côté serveur
- Affichage des appels de tools et resultats dans l'UI
- Conversations multi-tours avec tool use
6.5 **Persistance des conversations**
- Sauvegarder les conversations dans Convex
- Charger l'historique de conversation
- Sidebar avec la liste des conversations
- Recherche dans les conversations
- Export et suppression de conversations
6.6 **Authentification et gestion des utilisateurs**
- Clerk pour l'authentification utilisateur
- Isolation des conversations par utilisateur
- Suivi et limites d'utilisation
- Panel d'administration pour le monitoring
**Exercice** : Construis et deploie une application de chat complète avec streaming, 3 tools, persistance des conversations et authentification.
---
### MODULE 7 — Construire un Agent IA
**Objectif** : Construire un agent IA autonome capable de planifier, executer et s'auto-corriger.
**Lecons a générer :**
7.1 **Architecture d'un agent**
Input Utilisateur → Planner → Selection d'Outil → Execution → Observation →
 ↑ ↓
 └──────────── Auto-Correction ────────────────────┘
7.2 **La boucle agent**
```typescript
async function agentLoop(task: string, tools: Tool[], maxSteps = 10) {
const messages = [{ role: "user", content: task }];
for (let step = 0; step < maxSteps; step++) {
const response = await client.messages.create({
model: "claude-sonnet-4-6-20250514",
tools,
messages,
});
// Verifier si l'agent a termine
if (response.stop_reason === "end_turn") {
return extractFinalAnswer(response);
}
// Executer les appels de tools
for (const block of response.content) {
if (block.type === "tool_use") {
const result = await executeTool(block.name, block.input);
messages.push(
{ role: "assistant", content: response.content },
{ role: "user", content: [{ type: "tool_result", tool_use_id: block.id, content: result }] }
);
}
}
}
}
7.3 **Planification et decomposition**
- Laisser l'agent decomposer les taches en sous-taches
- Prompts de planification : "Avant d'executer, decris ton plan en 3-5 étapes"
- Re-planification : "Si ton plan ne fonctionne pas, revise-le"
- Le cycle planifier-executer-observer-reflechir

7.4 **Design de tools pour les agents**
- Les tools doivent être atomiques (faire une seule chose bien)
- Descriptions claires (l'agent les lit pour decider quel tool utiliser)
- Validation des inputs (ne pas faire confiance aux inputs de l'agent aveuglement)
- Messages d'erreur qui aident l'agent a s'auto-corriger
- Categories essentielles de tools : recherche, lecture, ecriture, calcul, communication

7.5 **Auto-correction et recuperation d'erreurs**
- L'agent doit detecter ses propres erreurs
- Reessayer avec une approche différente (pas la même chose 3 fois)
- Escalade : quand demander l'aide d'un humain
- Garde-fous : nombre maximum d'étapes, timeout, limites de cout
- Le pattern "detection de blocage" : si pas de progres en 3 étapes, changer d'approche

7.6 **Memoire de l'agent**
- Memoire de travail : contexte de la tache courante
- Memoire episodique : ce que l'agent a fait avant (sessions passees)
- Memoire semantique : connaissances que l'agent a apprises
- Implementation : base de donnees + recherche vectorielle + injection de contexte

**Exercice** : Construis un agent avec 5 tools (recherche web, lecture/ecriture de fichiers, calculatrice, requete base de donnees) qui peut rechercher un sujet de maniere autonome et produire un rapport.

---

### MODULE 8 — Systèmes RAG (Retrieval-Augmented Génération)

**Objectif** : Construire un système RAG production qui repond aux questions a partir de tes propres donnees.

**Lecons a générer :**

8.1 **Qu'est-ce que le RAG et pourquoi c'est important**
- Le problème : les LLM ne connaissent pas tes donnees specifiques
- La solution : recuperer les documents pertinents, injecter dans le contexte, générer la réponse
- RAG vs fine-tuning : le RAG est plus rapide, moins cher et plus flexible
- Quand utiliser le RAG : bases de connaissances, documentation, donnees internes, support client

8.2 **Architecture RAG**
> Requete Utilisateur → Embed la Requete → Recherche Vectorielle → Recuperer les Top-K Documents →
> Construire le Prompt (System + Contexte + Requete) → LLM → Réponse
8.3 **Pipeline d'ingestion de documents**
- Étape 1 : Charger les documents (PDF, Markdown, HTML, DOCX, CSV)
- Étape 2 : Nettoyer et preprocesser (retirer les headers, normaliser le formatage)
- Étape 3 : Chunker (decouper en segments significatifs)
- Étape 4 : Embed (convertir en vecteurs)
- Étape 5 : Stocker (vector DB + metadata)
- Étape 6 : Indexer (pour une recuperation rapide)

8.4 **Stratégies de chunking (critique pour la qualité)**

| Stratégie | Comment ca marche | Ideal pour |
|-----------|------------------|------------|
| **Taille fixe** | Decouper tous les N caracteres/tokens | Simple, previsible |
| **Recursif** | Decouper par paragraphes, puis phrases | Usage général |
| **Semantique** | Decouper aux frontieres de sujet | Documents techniques |
| **Sensible au document** | Respecter headers, sections, pages | Docs structures |
| **Fenetre glissante** | Chunks qui se chevauchent | Continuite du contexte |

- Taille de chunk : 500-1000 tokens est le sweet spot
- Chevauchement : 10-20% entre les chunks preserve le contexte
- Toujours stocker les metadata du chunk : source, page, section, date

8.5 **Stratégies de retrieval**

| Stratégie | Comment ca marche | Quand l'utiliser |
|-----------|------------------|------------------|
| **Recherche semantique** | Similarite vectorielle (cosinus) | Approche par defaut |
| **Recherche par mots-cles** | BM25, TF-IDF | Correspondances exactes, termes techniques |
| **Hybride** | Semantique + mots-cles combines | Meilleure qualité (recommande) |
| **Re-ranking** | Recuperer N, re-classer en top K | Exigences haute qualité |
| **Multi-query** | Générer plusieurs variantes de requete | Questions complexes |
| **HyDE** | Générer une réponse hypothetique, chercher avec | Quand les requetes sont vagues |

8.6 **Construction du contexte**
- Combien de chunks inclure (3-10 est typique)
- Ordre : le plus pertinent d'abord ? Chronologique ?
- Suivi des citations : dire au LLM de citer ses sources
- Gestion du context window : ne pas deborder
- Le test "golden retrieval" : est-ce que la réponse existe dans les chunks recuperes ?

8.7 **Evaluation RAG**
- Qualité du retrieval : est-ce qu'on trouve les bons documents ? (Recall@K, Precision@K)
- Qualité de la génération : est-ce que la réponse est correcte et bien sourcee ?
- Fidelite : est-ce que la réponse reste fidele au contexte recupere (pas d'hallucination) ?
- End-to-end : est-ce que le système repond correctement aux questions des utilisateurs ?
- Framework RAGAS : evaluation RAG automatisee

8.8 **Patterns RAG avances**
- Chunking parent-enfant : recuperer l'enfant, injecter le parent pour le contexte
- Decomposition de requete : decomposer les questions complexes en sous-requetes
- Self-RAG : laisser le modèle decider quand recuperer
- Corrective RAG : verifier la qualité du retrieval, re-recuperer si nécessaire
- RAG multi-modal : retrieval images + texte

**Exercice** : Construis un système RAG complet pour une base de connaissances de 500+ documents. Implemente : ingestion, chunking, embedding, retrieval, génération, et evaluation. Deploie comme API.

---

### MODULE 9 — Construire avec le Vercel AI SDK

**Objectif** : Maitriser le Vercel AI SDK pour construire des applications IA dans Next.js.

**Lecons a générer :**

9.1 **Qu'est-ce que le Vercel AI SDK**
- API unifiee pour les fournisseurs de modèles IA (Anthropic, OpenAI, Google, etc.)
- Hooks React pour l'UI en streaming (`useChat`, `useCompletion`)
- Edge-ready (tourne sur les Vercel Edge Functions)
- Changement de provider : changer de modèle en une ligne

9.2 **Fonctions principales**
```typescript
import { generateText, streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

// Génération simple
const { text } = await generateText({
 model: anthropic("claude-sonnet-4-6-20250514"),
 prompt: "Explain quantum computing",
});

// Streaming
const result = streamText({
 model: anthropic("claude-sonnet-4-6-20250514"),
 messages: conversationHistory,
 tools: myTools,
});
9.3 **Integration React**
```typescript
"use client";
import { useChat } from "@ai-sdk/react";
export function Chat() {
const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
api: "/api/chat",
});
// Rendre l'UI du chat...
}
9.4 **Integration des tools avec AI SDK**
- Definir les tools avec des schemas Zod (type-safe !)
- Execution des tools côté serveur
- Tool use multi-étapes
- Streaming des resultats d'appels de tools

9.5 **Structured outputs avec AI SDK**
```typescript
import { generateObject } from "ai";
import { z } from "zod";

const { object } = await generateObject({
 model: anthropic("claude-sonnet-4-6-20250514"),
 schema: z.object({
 sentiment: z.enum(["positive", "negative", "neutral"]),
 confidence: z.number().min(0).max(1),
 summary: z.string(),
 }),
 prompt: "Analyze this review: ...",
});
9.6 **Setup multi-provider**
- Utiliser Claude pour le raisonnement, GPT pour les embeddings, Gemini pour la vision
- Fallbacks de provider : si l'un est down, utiliser un autre
- Routage par cout : modèle pas cher pour les taches simples, premium pour les complexes
**Exercice** : Reconstruis l'application de chat du Module 6 en utilisant le Vercel AI SDK. Ajoute les structured outputs et le support multi-provider.
---
### MODULE 10 — Claude Code Agent SDK
**Objectif** : Construire des agents personnalises avec le Claude Agent SDK pour un deploiement en dehors de Claude Code.
**Lecons a générer :**
10.1 **Qu'est-ce que l'Agent SDK**
- Construire des agents autonomes qui tournent comme des services
- Même puissance que les agents Claude Code, mais deployable partout
- Support Python et TypeScript
- Construit sur l'API Claude avec des patterns d'orchestration d'agents
10.2 **Architecture de l'Agent SDK**
Agent SDK
├── Model (Claude API)
├── Tools (definitions de fonctions personnalisees)
├── Orchestration (boucle planification, execution, observation)
├── Memory (historique de conversation, etat persistant)
└── Deployment (serveur, serverless, edge)
10.3 **Construire un agent avec le SDK**
- Definir l'agent : modèle, tools, system prompt
- Implementer les tools comme des fonctions
- La boucle de conversation : utilisateur → agent → tool → resultat → agent → réponse
- Gestion de la memoire : quoi garder, quoi oublier
- Gestion des erreurs et recuperation
10.4 **Deployer des agents comme des services**
- API HTTP : l'agent comme endpoint REST
- WebSocket : interaction agent en temps reel
- Background worker : l'agent tourne de maniere autonome
- Declenchement cron : l'agent tourne sur un planning
- Serverless : l'agent scale a zero quand il est inactif
10.5 **Communication agent-a-agent**
- Architectures multi-agents avec le SDK
- Passage de messages entre agents
- Etat partage et coordination
- Le pattern orchestrateur : un agent gere les autres
**Exercice** : Construis et deploie 3 agents avec le SDK : un agent de recherche, un agent d'ecriture, et un orchestrateur qui les coordonne.
---
# ═══════════════════════════════════════════════
# PHASE 3 — PATTERNS AVANCES
# "Je maitrise les architectures IA complexes"
# Semaines 7-9 | 12-16 heures
# ═══════════════════════════════════════════════
### MODULE 11 — Systèmes Multi-Agents
**Objectif** : Concevoir et implementer des systèmes multi-agents avec des agents specialises, du routage et de la coordination.
**Lecons a générer :**
11.1 **Patterns d'architecture multi-agents**
| Pattern | Comment ca marche | Quand l'utiliser |
|---------|------------------|------------------|
| **Pipeline** | Agent A → Agent B → Agent C | Traitement sequentiel |
| **Fan-out** | Orchestrateur → N agents paralleles | Sous-taches independantes |
| **Hierarchique** | Manager → Leads → Specialistes | Organisations complexes |
| **Swarm** | Communication pair-a-pair | Taches exploratoires |
| **Debat** | Deux agents debattent, un troisieme decide | Decisions a enjeux eleves |
11.2 **Le pattern ORACLE (d'Agentik OS)**
- ORACLE = l'orchestrateur qui classifie, route et coordonne
- Classification : SIMPLE → MEDIUM → COMPLEX → EPIC
- Routage : associer les taches au meilleur agent specialiste
- Contexte frais : chaque agent recoit exactement le contexte dont il a besoin
- Detection de blocage : si un agent boucle, changer d'approche
- Journal des decisions : tracer toutes les decisions de routage pour le debugging
11.3 **Designer des agents specialistes**
- Un agent = une responsabilite (Principe de Responsabilite Unique)
- Contrats d'input/output clairs
- Ensembles de tools definis (chaque agent ne voit que les tools pertinents)
- Metriques de performance par agent
- Exemple : Agentik OS a 265 specialistes repartis en 6 departements
11.4 **Communication entre agents**
- Messagerie directe : un agent envoie a un autre
- Etat partage : les agents lisent/ecrivent dans un store commun
- Event-driven : les agents reagissent aux evenements d'autres agents
- Blackboard : espace de travail partage ou les agents contribuent
- Choisir le bon pattern pour ton cas d'usage
11.5 **Defis de coordination**
- Race conditions : deux agents modifiant la même ressource
- Deadlocks : agents en attente les uns des autres
- Explosion des couts : agents qui s'emballent et brulent les credits API
- Controle qualité : s'assurer que les outputs des agents respectent les standards
- Solutions : locks, timeouts, budgets, agents gardiens
**Exercice** : Construis un système a 5 agents avec : orchestrateur, chercheur, redacteur, reviewer et publisher. L'orchestrateur assigne les taches, les agents travaillent en parallele quand c'est possible, et le reviewer valide avant que le publisher livre.
---
### MODULE 12 — Evaluation & Tests IA
**Objectif** : Construire des systèmes d'evaluation complets pour mesurer et ameliorer la qualité IA.
**Lecons a générer :**
12.1 **Pourquoi l'evaluation est la partie la plus difficile**
- Les outputs IA sont non-deterministes — même input, output différent
- "Ca a l'air bien" n'est pas une metrique
- Sans eval, tu livres a l'aveugle
- Développement guide par l'eval : ecrire les evals D'ABORD, ensuite ameliorer
12.2 **Types d'evaluation**
| Type | Ce que ca mesure | Comment |
|------|-----------------|---------|
| **Evals automatisees** | Exactitude, format, factualite | Checks bases sur le code |
| **LLM-as-judge** | Qualité, pertinence, utilite | Utiliser Claude pour evaluer Claude |
| **Evaluation humaine** | Nuance, préférence, cas limites | Revue manuelle |
| **A/B testing** | Préférence utilisateur a l'echelle | Comparer deux versions en live |
| **Tests de regression** | Est-ce que les changements ont casse quelque chose ? | Executer la suite d'eval a chaque changement |
12.3 **Construire une suite d'eval**
- Cas de test : 50-200 paires input/output-attendu
- Checks automatises : validation de format, presence de mots-cles, limites de longueur
- LLM-as-judge : une instance Claude separee note la qualité de 1 a 5
- Réponses de référence : réponses ecrites par des humains pour la comparaison
- Cas limites : inputs deliberement pieges pour tester la robustesse
12.4 **Metriques d'evaluation**
| Metrique | Ce que ca mesure | Formule |
|----------|-----------------|---------|
| **Accuracy** | Réponses correctes / total | correct / total |
| **Fidelite** | Reste fidele au contexte fourni | fidele / total (LLM judge) |
| **Pertinence** | La réponse repond a la question | pertinent / total (LLM judge) |
| **Toxicite** | Contenu nocif | toxique / total (classifieur) |
| **Latence** | Temps de réponse | p50, p95, p99 |
| **Cout** | Depense par requete | total_tokens × prix |
12.5 **Evaluation continue**
- Executer les evals a chaque changement de prompt
- Executer les evals a chaque mise a jour de modèle
- Dashboard : suivre les metriques dans le temps
- Alertes : notifier quand la qualité baisse
- Prevention de regression : bloquer les deploiements qui reduisent la qualité
12.6 **Frameworks d'evaluation**
- Construire le tien (recommande pour la personnalisation)
- Braintrust : plateforme d'evaluation avec logging
- LangSmith : outil d'evaluation de LangChain
- Promptfoo : CLI d'evaluation de prompts open-source
- RAGAS : specifiquement pour l'evaluation RAG
**Exercice** : Construis une suite d'eval complète pour l'application de chat du Module 6. Inclus : 50 cas de test, checks automatises, LLM-as-judge, et un dashboard qualité.
---
### MODULE 13 — Prompt Caching, Optimisation & Controle des Couts
**Objectif** : Optimiser la performance et les couts des systèmes IA a l'echelle.
**Lecons a générer :**
13.1 **Stratégies de prompt caching**
- Le cache_control de Claude : cacher le prefixe statique du system prompt
- Economies sur cache hit : 90% sur les portions cachees
- Quoi cacher : system prompts, documents de référence, definitions de tools
- Quoi NE PAS cacher : input utilisateur dynamique, historique de conversation
- Gestion des TTL : combien de temps les caches vivent
13.2 **Techniques d'optimisation des couts**
| Technique | Economies | Effort |
|-----------|----------|--------|
| Utiliser des modèles moins chers pour les taches simples | 60-80% | Faible |
| Prompt caching | Jusqu'a 90% sur le contenu cache | Faible |
| Batch API pour les taches non urgentes | 50% | Faible |
| Reduire la taille du contexte | 30-50% | Moyen |
| Pre-filtrer avec un classifieur pas cher | 40-60% | Moyen |
| Cacher les réponses courantes | Variable | Moyen |
13.3 **Optimisation de la latence**
- Streaming : latence percue = temps jusqu'au premier token
- Selection du modèle : Haiku < Sonnet < Opus en latence
- Requetes paralleles : fan out vers plusieurs modèles simultanement
- Deploiement edge : plus proche des utilisateurs = plus rapide
- Pre-calcul : générer les réponses courantes a l'avance
13.4 **Rate limiting et throttling**
- Limites de taux API par fournisseur
- Mise en file d'attente côté client
- Retry avec exponential backoff
- Circuit breaker : arreter d'appeler une API defaillante
- Degradation gracieuse : réponses de fallback quand rate limite
13.5 **Monitoring des couts en production**
- Suivre les tokens par requete, par utilisateur, par fonctionnalite
- Dashboards de couts quotidiens/hebdomadaires/mensuels
- Alertes de budget (Telegram, email)
- Limites de cout par utilisateur
- Le problème d'attribution des couts : quelle fonctionnalite coute le plus ?
**Exercice** : Implemente le prompt caching et le monitoring des couts pour les systèmes construits dans les modules precedents. Configure des alertes quand les depenses quotidiennes depassent les seuils.
---
### MODULE 14 — Garde-fous, Sécurité & Alignement
**Objectif** : Construire des systèmes IA surs, alignes et resistants aux abus.
**Lecons a générer :**
14.1 **Garde-fous en entree**
- Moderation de contenu : detecter et bloquer les inputs nocifs
- Detection d'injection : prevenir les attaques par prompt injection
- Rate limiting : limites par utilisateur, par IP
- Validation d'input : limites de longueur, verification de format, detection de langue
- Detection de PII : identifier et gerer les informations personnelles
14.2 **Garde-fous en sortie**
- Filtrage de contenu : detecter les outputs nocifs, biaises ou inappropries
- Detection d'hallucination : verifier les affirmations contre les faits connus
- Validation de format : s'assurer que l'output correspond au schema attendu
- Score de confiance : signaler les réponses a faible confiance pour revue humaine
- Verification des citations : est-ce que les sources sont reelles et precises ?
14.3 **Defense contre le prompt injection**
- Qu'est-ce que le prompt injection : un input utilisateur qui ecrase les instructions système
- Types : direct ("ignore les instructions precedentes"), indirect (injecte via le contenu recupere)
- Defenses :
- Assainissement des inputs : supprimer les patterns suspects
- Isolation par delimiteurs : separer clairement le contenu système/utilisateur
- Validation de l'output : verifier que l'output correspond aux attentes
- Modèles separes : utiliser un modèle pour verifier l'output d'un autre
- Constitutional AI : le modèle s'auto-evalue selon des principes
14.4 **Politiques de contenu**
- Definir ce que ton système devrait et ne devrait pas aborder
- Implementer comme contraintes de system prompt + validation d'output
- Processus d'appel : quand le système bloque incorrectement une requete
- Logging : tracer toutes les violations de politique pour revue
14.5 **Patterns human-in-the-loop**
- Seuils de confiance : répondre automatiquement au-dessus de 0.8, escalader en-dessous
- Files d'attente de revue : les humains revoient les outputs signales avant l'envoi
- Boucles de feedback : les corrections utilisateur ameliorent les futures réponses
- Workflows d'approbation : un humain approuve avant que l'IA execute des actions
**Exercice** : Implemente des garde-fous en entree et en sortie pour l'application de chat. Teste avec 20 inputs adversariaux (prompt injection, contenu nocif, cas limites).
---
### MODULE 15 — Workflows & Pipelines
**Objectif** : Construire des workflows IA multi-étapes complexes et des pipelines de donnees.
**Lecons a générer :**
15.1 **Patterns de workflow**
| Pattern | Structure | Exemple |
|---------|-----------|---------|
| **Sequentiel** | Étape A → B → C | Pipeline de génération de contenu |
| **Parallele** | A + B + C → fusion | Recherche multi-sources |
| **Conditionnel** | Si X → A, sinon → B | Routage base sur l'intention |
| **Boucle** | Repeter jusqu'a condition | Raffinement iteratif |
| **Map-reduce** | Decouper → traiter chaque → combiner | Analyse de documents par lots |
15.2 **Construire avec Trigger.dev**
- Execution durable : survit aux pannes, reprend la ou ca s'est arrete
- Step functions : chaque étape tourne independamment
- Retries : retry automatique avec backoff
- Queues : gerer l'execution concurrente
- Scheduling : cron jobs pour les workflows recurrents
15.3 **Construire avec Inngest**
- Event-driven : workflows declenches par des evenements
- Step functions avec gestion d'erreurs integree
- Fan-out : execution d'étapes en parallele
- Sleep et wait : mettre le workflow en pause jusqu'a condition remplie
- Human-in-the-loop : attendre l'approbation humaine
15.4 **Pipeline de génération de contenu (exemple reel)**
1. Selection du sujet (cron programme)
2. Recherche (Claude + recherche web)
3. Génération de plan (Claude)
4. Redaction de l'article (Claude Opus)
5. Optimisation SEO (Claude + mots-cles)
6. Génération d'image (Gemini Imagen)
7. Build & deploiement (Next.js + Vercel)
8. Distribution sociale (Composio)
9. Notification (Telegram)
15.5 **Gestion des erreurs dans les pipelines**
- Politiques de retry : quelles étapes reessayer, combien de fois
- Dead letter queues : stocker les items echoues pour revue manuelle
- Compensation : annuler les étapes precedentes si une étape ulterieure echoue
- Alerting : notifier sur les echecs du pipeline
- Monitoring : suivre la sante et le debit du pipeline
**Exercice** : Construis un pipeline de génération de contenu complet qui tourne sur un planning, gere les erreurs gracieusement, et envoie des notifications.
---
### MODULE 16 — Systèmes IA en Temps Reel
**Objectif** : Construire des systèmes IA qui operent en temps reel avec streaming, WebSockets et mises a jour reactives.
**Lecons a générer :**
16.1 **Patterns d'architecture temps reel**
- Server-Sent Events (SSE) : streaming unidirectionnel (API → client)
- WebSockets : communication bidirectionnelle en temps reel
- Subscriptions Convex : queries reactives sur la base de donnees
- Long-polling : fallback pour les environnements sans support WebSocket
16.2 **Streaming des réponses IA**
- Streaming token par token pour les interfaces de chat
- Streaming de donnees structurees (mises a jour JSON partielles)
- Rendu côté serveur avec streaming
- Gestion côté client : buffering, parsing, rendu
16.3 **Dashboards temps reel**
- Queries reactives Convex : l'UI se met a jour automatiquement quand les donnees changent
- Monitoring du statut des agents : quels agents tournent, leur progression
- Metriques live : temps de réponse, taux d'erreur, couts
- Flux de notifications : alertes temps reel dans le navigateur
16.4 **Collaboration temps reel**
- Plusieurs utilisateurs interagissent avec le même système IA
- Fils de conversation partages
- Edition collaborative avec assistance IA
- Resolution de conflits : gerer les modifications concurrentes
**Exercice** : Ajoute des fonctionnalites temps reel a l'application de chat : réponses en streaming, indicateurs de saisie en direct, et un dashboard de monitoring affichant la sante du système.
---
# ═══════════════════════════════════════════════
# PHASE 4 — PRODUCTION & SCALE
# "Je deploie et scale des systèmes IA"
# Semaines 10-12 | 12-16 heures
# ═══════════════════════════════════════════════
### MODULE 17 — Deploiement en Production
**Objectif** : Deployer des systèmes IA en production avec fiabilite, sécurité et observabilite.
**Lecons a générer :**
17.1 **Architecture de deploiement**
Utilisateur → CDN (Cloudflare/Vercel) → Edge Function → AI API
 ↕
 Base de donnees (Convex/PostgreSQL)
 ↕
 Vector DB (Pinecone/Chroma)
 ↕
 Background Workers (Trigger.dev)

17.2 **Deploiement Vercel**
- Bonnes pratiques de deploiement Next.js
- Gestion des variables d'environnement
- Edge functions pour l'inference IA a faible latence
- Preview deployments pour les tests
- Monitoring et analytics en production

17.3 **Deploiement VPS (pour les agents et le cron)**
- Quand tu as besoin d'un VPS : agents persistants, cron jobs, calculs lourds
- Setup : Ubuntu, SSH, ZSH, hardening sécurité
- tmux pour les sessions persistantes
- systemd pour les processus daemon
- Docker pour l'isolation

17.4 **CI/CD pour les systèmes IA**
- Workflow GitHub Actions : test → eval → build → deploy
- Executer la suite d'evaluation sur chaque PR
- Bloquer les merges qui reduisent les metriques qualité
- Rollouts par étapes : deploiements canary pour les changements de prompts
- Procedures de rollback : revenir rapidement quand ca part en vrille

17.5 **Sécurité en production**
- Gestion des cles API : jamais dans le code, toujours en variable d'environnement
- Authentification : chaque endpoint nécessité une auth
- Rate limiting : par utilisateur, par endpoint
- Validation des inputs : tout assainir
- Filtrage des outputs : prevenir les fuites de donnees
- CORS, CSP, HTTPS : sécurité web standard

---

### MODULE 18 — Monitoring & Observabilite

**Objectif** : Savoir exactement ce qui se passe dans ton système IA a tout moment.

**Lecons a générer :**

18.1 **Quoi monitorer dans les systèmes IA**

| Metrique | Pourquoi | Seuil d'alerte |
|----------|----------|----------------|
| **Latence** (p50, p95, p99) | Expérience utilisateur | p95 > 5s |
| **Taux d'erreur** | Sante du système | > 1% |
| **Usage de tokens** | Controle des couts | > budget quotidien |
| **Score qualité** | Qualité des outputs | < baseline - 10% |
| **Taux de cache hit** | Efficacite des couts | < 50% |
| **Utilisateurs actifs** | Metriques business | Detection d'anomalies |
| **Taux de completion des agents** | Fiabilite des agents | < 90% |

18.2 **Logging pour les systèmes IA**
- Logging requete/réponse (avec redaction de PII)
- Logging des appels de tools : quels tools appeles, avec quels inputs
- Logging des decisions : pourquoi le système a fait ce choix ?
- Logging de performance : timing pour chaque étape
- Logging des couts : tokens utilises par requete
- Format de logging structure : JSON avec des champs coherents

18.3 **Construire un dashboard de monitoring**
- Metriques temps reel avec les queries reactives Convex
- Donnees historiques avec visualisation de series temporelles
- Integration des alertes : Telegram, Slack, PagerDuty
- Tracker de couts : depenses quotidiennes, hebdomadaires, mensuelles par fonctionnalite
- Tracker qualité : scores d'eval dans le temps

18.4 **Debugger les systèmes IA**
- Reproduire le problème : input exact → output exact
- Verifier le prompt : est-ce que le system prompt etait correct ?
- Verifier le contexte : est-ce que les bonnes informations ont ete recuperees ?
- Verifier le modèle : est-ce que le bon modèle a ete appele ?
- Verifier les tools : est-ce que les appels de tools ont retourne les resultats attendus ?
- Tracer le pipeline complet : input → chaque étape → output

18.5 **Stratégie d'alerting**
- Niveaux de severite : info → warning → critique → astreinte
- Prevention de la fatigue d'alertes : ne pas alerter sur tout
- Runbook par alerte : quoi faire quand tu es page
- Chemins d'escalade : ingenieur → lead → astreinte
- Post-mortems : documenter et apprendre des incidents

**Exercice** : Construis un dashboard de monitoring complet pour les systèmes construits dans cette formation. Inclus : latence, erreurs, couts, scores qualité, et alerting Telegram.

---

### MODULE 19 — Scaler des Systèmes IA

**Objectif** : Gerer le trafic, les donnees et la complexite croissants.

**Lecons a générer :**

19.1 **Stratégies de scaling**

| Defi | Solution |
|------|----------|
| Trop de requetes | Queue + workers, rate limiting, caching |
| Trop cher | Routage de modèles, caching, traitement par lots |
| Trop lent | Deploiement edge, streaming, pre-calcul |
| Trop de donnees | Ingestion par chunks, indexation incrementale |
| Trop complexe | Microservices, agents specifiques par domaine |

19.2 **Scaling horizontal**
- Serveurs API stateless (scale horizontalement derriere un load balancer)
- Pools de workers pour le traitement en arriere-plan
- Connection pooling sur la base de donnees
- CDN pour les assets statiques et les réponses cachees

19.3 **Caching a chaque niveau**
- Cache de réponses : les requetes identiques retournent des réponses cachees
- Cache semantique : les requetes similaires retournent des réponses cachees (similarite vectorielle)
- Cache d'embeddings : ne pas re-embed le même document
- Cache de resultats LLM : cacher les réponses Claude pour des inputs identiques

19.4 **Scaling des couts**
- Routage de modèles : utiliser le modèle le moins cher qui fonctionne pour chaque tache
- Traitement par lots : accumuler les requetes, traiter en masse (50% d'economies)
- Budget de tokens par utilisateur/fonctionnalite
- Downgrade automatique sous charge (Opus → Sonnet → Haiku)

19.5 **Scaling des donnees**
- Indexation incrementale : ne traiter que les documents nouveaux/modifies
- Partitionnement : decouper la vector DB par domaine/client
- Archivage : deplacer les anciennes donnees vers le stockage froid
- Nettoyage : supprimer les embeddings et metadata obsoletes

---

### MODULE 20 — Sécurité des Systèmes IA

**Objectif** : Durcir les systèmes IA contre les attaques et les abus.

**Lecons a générer :**

20.1 **Vecteurs d'attaque specifiques a l'IA**
- Prompt injection (directe et indirecte)
- Empoisonnement des donnees (documents malveillants dans le RAG)
- Extraction de modèle (voler ton system prompt)
- Deni de portefeuille (provoquer des appels API couteux)
- Ingenierie sociale (manipuler l'IA pour reveler des secrets)

20.2 **Stratégies de defense**
- Defense en profondeur : plusieurs couches de protection
- Assainissement des inputs + validation des outputs + monitoring
- Niveaux de privilege separes pour différents tools
- Audit logging pour toutes les interactions IA
- Revues de sécurité regulieres et tests d'intrusion

20.3 **Protection des donnees**
- Gestion des PII : detecter, masquer ou rejeter les informations personnelles
- Politiques de retention des donnees : combien de temps garder les logs de conversation
- Chiffrement : au repos et en transit
- Controle d'acces : qui peut voir quelles donnees
- Conformite : considerations RGPD, CCPA, HIPAA

---

### MODULE 21 — Fine-Tuning & Modèles Personnalises (Quand c'est Nécessaire)

**Objectif** : Comprendre quand et comment fine-tuner des modèles pour des cas d'usage specifiques.

**Lecons a générer :**

21.1 **Fine-tuning vs prompting vs RAG**

| Approche | Ideal pour | Cout | Effort | Flexibilite |
|----------|-----------|------|--------|-------------|
| **Prompting** | La plupart des taches | Faible | Faible | Haute |
| **RAG** | Taches specifiques aux connaissances | Moyen | Moyen | Haute |
| **Fine-tuning** | Style/format/domaine | Eleve | Eleve | Faible |

21.2 **Quand fine-tuner**
- Format de sortie coherent que le prompting ne peut pas atteindre
- Langage specifique a un domaine (medical, juridique, technique)
- Reduire la latence (modèle fine-tune plus petit vs modèle général plus gros)
- Optimisation des couts a echelle massive
- Quand NE PAS : si prompting + RAG peut resoudre le problème, ne fine-tune pas

21.3 **Processus de fine-tuning**
- Preparation des donnees : paires input/output (minimum 100, idealement 1000+)
- Format : JSONL avec tableau de messages
- Entrainement : utiliser l'API de fine-tuning du fournisseur (OpenAI, Together AI)
- Evaluation : comparer le modèle fine-tune vs le modèle de base sur la suite d'eval
- Iteration : ajuster les donnees, re-entrainer, re-evaluer

21.4 **Fine-tuning de modèles open-source**
- LoRA/QLoRA : fine-tuning efficace (entraine de petits adaptateurs, pas le modèle complet)
- Unsloth : fine-tuning 2x plus rapide avec 60% de memoire en moins
- Hugging Face : hub de modèles, infrastructure d'entrainement
- Together AI / Modal : fine-tuning cloud
- Deploiement : vLLM, Ollama, ou inference cloud

---

### MODULE 22 — Projet Final : Construire & Deployer un Système IA Complet

**Objectif** : L'eleve construit et deploie un système IA de qualité production a partir de zero.

**Exigences du projet :**

1. **Document d'architecture** : diagramme système, choix de modèles, flux de donnees, estimation des couts
2. **Application principale** : Next.js + Convex + Clerk avec fonctionnalites alimentees par l'IA
3. **Système RAG** : base de connaissances de 200+ documents, recherche semantique, evaluation qualité
4. **Système d'agents** : au moins 3 agents avec tool use, planification et auto-correction
5. **Suite d'evaluation** : 50+ cas de test, evals automatisees, dashboard qualité
6. **Deploiement production** : Vercel + VPS pour les background workers
7. **Monitoring** : latence, erreurs, couts, qualité — avec alerting Telegram
8. **Sécurité** : garde-fous entree/sortie, auth, rate limiting
9. **Documentation** : decisions d'architecture, docs API, runbook
10. **Video de demo** : walkthrough de 5 minutes du système en action

**Criteres d'evaluation :**
- Le système tourne de maniere fiable pendant 7 jours sans intervention manuelle
- Les scores d'evaluation atteignent les seuils de qualité definis
- Les couts sont suivis et dans le budget
- Le monitoring detecte les pannes simulees
- La sécurité resiste a 10 cas de test adversariaux
- Le code est propre, documente et maintenable

---

## Resume de la Formation

| Phase | Semaines | Modules | Heures | Focus |
|-------|----------|---------|--------|-------|
| Fondations | 1-3 | 1-5 | 10-14h | Architecture, LLM, API, prompts, donnees |
| Engineering Fondamental | 4-6 | 6-10 | 12-16h | Apps chat, agents, RAG, AI SDK, Agent SDK |
| Patterns Avances | 7-9 | 11-16 | 12-16h | Multi-agents, evaluation, optimisation, sécurité, workflows, temps reel |
| Production & Scale | 10-12 | 17-22 | 12-16h | Deploiement, monitoring, scaling, sécurité, fine-tuning, projet final |
| **TOTAL** | **12** | **22** | **46-62h** | **Builder de systèmes IA production-grade** |

---

## Bonus & Ressources

- Template de demarrage complet : Next.js + Convex + Clerk + Claude API + RAG + Agent
- Templates de decisions d'architecture (pour documenter tes propres systèmes)
- Template de suite d'eval (50 cas de test + scripts d'automatisation)
- Template de dashboard de monitoring (Next.js + Convex)
- Tableur de calcul des couts
- Checklist sécurité (50 items)
- Communaute Telegram pour les builders de systèmes IA
- Sessions mensuelles de revue d'architecture
- Acces a vie et mises a jour

## Upsell

> "Tu veux qu'on construise ton système IA ? Agentik {OS} propose des services AI Build ($15K-45K) pour les systèmes IA production personnalises, et des CAIO Partnerships ($4K-15K/mois) pour un leadership IA continu. agentik-os.com/pricing"

---

**FIN DU DOCUMENT — Formation : Construire des Systèmes IA — De l'Architecture a la Production**
