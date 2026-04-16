---
title: "Prompt & Context Engineering"
summary: "Deux disciplines complementaires reunies : l'art de formuler des instructions (Prompt Engineering) et la science de gerer l'information disponible pour le LLM (Context Engineering). Le prompt = 10% du contexte. Ce module couvre les 100%."
track: agentic-tech
number: "T1-04"
duration: "40-50h"
audience: "Tous profils travaillant avec des LLMs : developpeurs, product managers, content creators, data scientists"
---

# Prompt & Context Engineering

Deux disciplines complementaires reunies : l'art de formuler des instructions (Prompt Engineering) et la science de gerer l'information disponible pour le LLM (Context Engineering). Le prompt = 10% du contexte. Ce module couvre les 100%.

---

## Objectif du module

A l'issue de ce module, vous aurez une methodologie systematique de conception de prompts, maitriserez l'ingenierie de contexte et la gestion de tokens, et possederez des techniques avancees reproductibles pour garantir la qualite des outputs.

---

## Lecon 1 — Comment les LLMs fonctionnent : tokens, attention, temperature

### Contenu detaille

**Ce que l'ingenieur doit savoir (sans etre chercheur) :**

- **Tokens** : Unite de base du LLM. 1 mot francais = 1.3-1.5 tokens en moyenne. Les modeles ont une fenetre maximale (200K tokens pour Claude Opus).
- **Attention** : Mecanisme qui determine quels tokens influencent la sortie. Les tokens en debut et fin de contexte ont plus d'influence (recency bias + primacy effect).
- **Temperature** : Controle la creativite. 0 = deterministe, 1 = creatif. Pour le code : 0-0.3. Pour le contenu : 0.5-0.8.
- **Hallucinations** : Le modele genere du texte plausible mais faux. Plus frequent quand le contexte est pauvre ou contradictoire.

**Impact sur la qualite des prompts :**

| Facteur | Impact | Strategie |
|---------|--------|-----------|
| Position dans le contexte | Les instructions en debut et fin sont mieux suivies | Mettre les regles critiques en premier ET en dernier |
| Longueur du contexte | Plus c'est long, plus l'attention se dilue | Etre concis, structurer, prioriser |
| Recency bias | Les infos recentes dominent | Repeter les instructions critiques avant la tache |
| Coherence | Contexte contradictoire = hallucinations | Eliminer les conflits, hierarchiser les sources |

### Exercice pratique

Testez l'impact de la position : placez une instruction critique au debut, au milieu, puis a la fin d'un long prompt. Mesurez la conformite de la sortie.

---

## Lecon 2 — Anatomie d'un bon prompt : les 5 composants

### Contenu detaille

**Les 5 composants RCICF :**

1. **Role** — Qui est le LLM ? "Tu es un expert SEO senior avec 15 ans d'experience..."
2. **Contexte** — Quel est l'environnement ? "Le projet est un SaaS B2B en Next.js..."
3. **Instruction** — Que doit-il faire ? "Analyse la page d'accueil et identifie 10 ameliorations SEO..."
4. **Contraintes** — Quelles regles ? "Maximum 200 mots par suggestion. En francais. Pas de jargon."
5. **Format** — Comment structurer la sortie ? "Tableau Markdown avec colonnes : Priorite, Suggestion, Impact, Effort."

**Delimiteurs XML pour la structure :**

```
<role>Expert SEO senior</role>
<context>
Projet SaaS B2B en Next.js, 50K visiteurs/mois, score SEO actuel 67/100
</context>
<instruction>
Analyse et propose 10 ameliorations concretes
</instruction>
```

Les delimiteurs XML aident le modele a distinguer clairement chaque section du prompt.

**Avant/Apres — Exemples concrets :**

| Avant (vague) | Apres (structure) | Gain |
|---------------|-------------------|------|
| "Ameliore le SEO de mon site" | "En tant qu'expert SEO, analyse {URL} et propose 10 actions triees par impact decroissant, format tableau" | 3x plus actionnable |
| "Ecris du code React" | "Cree un composant UserCard en React/TypeScript utilisant Tailwind. Props: name, email, avatar. Exporte comme default." | Code directement utilisable |

### Exercice pratique

Prenez 5 prompts que vous utilisez regulierement. Restructurez-les avec RCICF. Comparez la qualite des sorties.

---

## Lecon 3 — Zero-shot, Few-shot, Chain-of-Thought, Tree-of-Thought

### Contenu detaille

**Les 4 techniques de prompting par complexite :**

| Technique | Quand | Tokens | Precision |
|-----------|-------|--------|-----------|
| **Zero-shot** | Taches simples et claires | Faible | 70-80% |
| **Few-shot** | Taches avec format specifique | Moyen | 85-90% |
| **Chain-of-Thought** | Raisonnement complexe | Eleve | 90-95% |
| **Tree-of-Thought** | Problemes multi-solutions | Tres eleve | 95%+ |

**Zero-shot** : Instructions directes sans exemples.
"Classe ce texte : positif, negatif ou neutre."

**Few-shot** : Fournir 2-5 exemples du format attendu.
"Voici 3 exemples de la structure attendue : [...]. Maintenant, fais pareil pour : [...]"

**Chain-of-Thought** : Demander au modele de raisonner etape par etape.
"Reflechis etape par etape avant de repondre."

**Self-consistency** : Generer plusieurs reponses CoT, puis prendre la reponse majoritaire.

**Reflection** : Demander au modele de critiquer sa propre reponse.
"Maintenant, identifie 3 failles dans ton raisonnement et corrige-les."

### Exercice pratique

Pour un meme probleme complexe (ex: "Quelle architecture de base de donnees pour un SaaS multi-tenant ?"), testez les 4 techniques. Comparez les resultats en termes de qualite et de tokens consommes.

---

## Lecon 4 — System prompts de production et meta-prompting

### Contenu detaille

**Structure d'un system prompt efficace :**

1. Identite et role
2. Contexte du produit/service
3. Regles comportementales (DO/DON'T)
4. Format de sortie par defaut
5. Garde-fous (refus, escalade)
6. Exemples de conversations ideales

**Anti-patterns des system prompts :**
- Trop long (&gt;2000 tokens) : l'attention se dilue
- Contradictoire : "Sois concis" + "Donne des reponses detaillees"
- Trop restrictif : "Ne reponds jamais a..." tue l'utilite
- Pas de priorite : toutes les regles au meme niveau

**Meta-prompting :**

Utiliser un LLM pour generer/ameliorer des prompts :
"Tu es un expert en prompt engineering. Ameliore ce prompt pour qu'il produise des resultats plus precis et actionables : [prompt original]"

Pipeline de prompts chaines :
1. Prompt 1 : Analyser le probleme
2. Prompt 2 : Proposer 3 solutions (utilise la sortie de 1)
3. Prompt 3 : Evaluer les solutions (utilise la sortie de 2)
4. Prompt 4 : Implementer la meilleure (utilise la sortie de 3)

### Exercice pratique

Construisez un system prompt pour un chatbot de support client. Testez-le avec 10 scenarios differents. Iterez jusqu'a ce que les reponses soient satisfaisantes dans 9/10 cas.

---

## Lecon 5 — Le Context Budget et la Progressive Disclosure

### Contenu detaille

**Le contexte comme budget financier :**

Vous avez 200K tokens. Chaque information dans le contexte a un cout. La question n'est pas "que mettre dans le contexte ?" mais "quel est le ROI de chaque token ?".

**Allocation P0-P3 :**

| Priorite | % du budget | Contenu |
|----------|------------|---------|
| P0 | 30% | Instructions systeme, regles critiques |
| P1 | 30% | Code/donnees directement necessaires |
| P2 | 25% | Contexte de support (exemples, references) |
| P3 | 15% | Nice-to-have (historique, metadata) |

**La regle des 60% :**
Ne remplissez jamais plus de 60% de la fenetre de contexte. Les 40% restants servent a la generation de la reponse.

**Progressive Disclosure :**

Ne chargez pas tout d'un coup. Chargez par niveaux :
1. D'abord l'index/structure (noms de fichiers, signatures)
2. Puis le detail des fichiers pertinents
3. Puis les dependances si necessaire

C'est exactement ce que fait Claude Code avec Glob (trouver les fichiers) avant Read (lire le contenu).

### Exercice pratique

Auditez le "context budget" de votre dernier workflow Claude Code. Combien de tokens sont gaspilles en informations non pertinentes ? Proposez un plan d'optimisation.

---

## Lecon 6 — CLAUDE.md, Rules et hierarchie d'instructions

### Contenu detaille

**Architecture multi-niveaux d'instructions :**

```
Niveau 1 : System prompt (Anthropic, non modifiable)
Niveau 2 : ~/.claude/CLAUDE.md (global utilisateur)
Niveau 3 : ~/.claude/rules/*.md (regles globales)
Niveau 4 : ./CLAUDE.md (projet)
Niveau 5 : ./.claude/rules/*.md (regles projet)
Niveau 6 : Prompt de l'utilisateur (session)
```

**Resolution de conflits :** Le niveau le plus specifique gagne. Projet &gt; Global &gt; System.

**Regles conditionnelles :**

Au lieu de charger 5000 tokens de regles a chaque session, utilisez le pattern "read on trigger" :

```markdown
## MANDATORY READ (on-demand)
| Trigger | Read file |
|---------|-----------|
| /linear | ~/.claude/docs/rules-archive/43-linear-pipeline.md |
| /hack   | ~/.claude/docs/rules-archive/24-pentester.md |
```

Economie : 5000 tokens/session en chargement conditionnel.

### Exercice pratique

Refactorez vos fichiers d'instructions Claude Code. Objectif : reduire le token count global de 30% tout en maintenant 100% de conformite.

---

## Lecon 7 — RAG : pipeline complet, chunking et vector databases

### Contenu detaille

**Pipeline RAG complet :**

```
Documents → Ingestion → Chunking → Embedding → Vector DB → Retrieval → Context → LLM → Reponse
```

**Les 3 methodes de chunking :**

1. **Fixed** : Decouper en blocs de N tokens. Simple mais coupe les phrases.
2. **Semantic** : Decouper sur les changements de sujet. Plus intelligent mais plus lent.
3. **Document-aware** : Respecter la structure (titres, paragraphes). Le meilleur compromis.

**Vector databases :**

| Base | Type | Cout | Quand |
|------|------|------|-------|
| ChromaDB | Local | Gratuit | Prototypage, petits datasets |
| pgvector | PostgreSQL | Faible | Deja sur PostgreSQL |
| Pinecone | Cloud | Payant | Production, scale |
| Weaviate | Hybride | Variable | Recherche hybride |

**Metriques d'evaluation (RAGAS) :**
- **Faithfulness** : La reponse est-elle fidele au contexte recupere ?
- **Relevance** : Le contexte recupere est-il pertinent pour la question ?
- **Answer correctness** : La reponse est-elle correcte ?

### Exercice pratique

Construisez un systeme RAG minimal : indexez 10 documents dans ChromaDB, implementez la recherche semantique, et testez avec 20 questions. Mesurez la pertinence.

---

## Lecon 8 — Context Engineering pour agents autonomes

### Contenu detaille

**Le probleme du contexte dans les agents long-running :**

Un agent qui tourne 2 heures accumule du contexte. La fenetre se remplit. Les premieres instructions se diluent. La qualite chute.

**Solutions :**

1. **Fresh Context Template** : A chaque nouvelle sous-tache, l'agent recoit un contexte frais avec uniquement les informations pertinentes.
2. **Scratchpad** : Les agents ecrivent leurs decouvertes dans des fichiers partages, pas dans le contexte.
3. **Compaction strategique** : Resume les echanges anciens avant qu'ils ne soient comprimes automatiquement.
4. **Context router** : Un agent decideur qui selectionne quel contexte charger pour quel sous-agent.

### Exercice pratique

Implementez un Fresh Context Template pour un workflow multi-agents. Mesurez la qualite avant (sans template) et apres (avec template) sur 10 taches identiques.

---

## Lecon 9 — Frameworks reutilisables : RISEN, CO-STAR, RACE, SCRIBE

### Contenu detaille

**Les 5 frameworks de prompts :**

| Framework | Composants | Ideal pour |
|-----------|-----------|-----------|
| **RISEN** | Role, Instructions, Steps, Exclusions, Narrowing | Taches complexes avec contraintes |
| **CO-STAR** | Context, Objective, Style, Tone, Audience, Response | Contenu marketing |
| **RACE** | Role, Action, Context, Examples | Prompts rapides et precis |
| **SCRIBE** | Situation, Complication, Resolution, Instructions, Boundaries, Examples | Problemes analytiques |
| **RCICF** | Role, Context, Instructions, Constraints, Format | Usage general (notre favori) |

### Exercice pratique

Appliquez chaque framework a la meme tache : "Rediger un email de prospection pour un service CAIO". Comparez les resultats et choisissez votre favori.

---

## Lecon 10 — Mesurer, optimiser et compresser le contexte en production

### Contenu detaille

**Metriques cles :**
- Token count par requete (cout direct)
- Cache hit rate (prompt caching)
- First token latency (experience utilisateur)
- Output quality score (metriques custom)

**Techniques de compression :**
1. **Summarization** : Resumer les documents longs avant de les injecter
2. **Distillation** : Extraire uniquement les faits pertinents
3. **Deduplication** : Eliminer les informations redondantes
4. **Chunking selectif** : Ne charger que les chunks pertinents (RAG)

**A/B testing de prompts :**
- Version A vs Version B sur 50+ requetes
- Mesurer : qualite, tokens, latence, cout
- Iterer : garder la meilleure, tester contre une nouvelle variante

### Exercice pratique

Auditez un prompt de production. Mesurez ses metriques actuelles. Optimisez-le pour reduire les tokens de 30% sans perte de qualite. Documentez le processus.

---

## Ce que cette formation apporte

- Methodologie systematique de conception de prompts
- Maitrise de l'ingenierie de contexte et de la gestion de tokens
- Patterns reproductibles pour garantir la qualite des outputs
- Techniques avancees : CoT, few-shot, RAG, progressive disclosure
- Capacite a auditer et ameliorer des prompts existants
