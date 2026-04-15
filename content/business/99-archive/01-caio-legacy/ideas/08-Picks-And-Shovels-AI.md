# Picks and Shovels: L'Infrastructure IA qui Fait des Milliards

> Au lieu de construire des apps IA, construire les outils pour ceux qui construisent des apps IA. Evaluation, deployment, observabilite, prompt management.

---

## Le Concept

Pendant la ruee vers l'or, ce sont les vendeurs de pioches et de pelles qui sont devenus riches, pas les chercheurs d'or. Le meme principe s'applique a la ruee vers l'IA. Au lieu de construire la 10 000eme app de chatbot, tu construis les outils dont TOUS les builders d'IA ont besoin.

```
+------------------------------------------------------------------+
|                    LA COUCHE INFRASTRUCTURE                       |
+------------------------------------------------------------------+
|                                                                    |
|  COUCHE APPLICATION (ce que les gens voient)                      |
|  +-- Chatbots, assistants, generateurs de contenu                |
|  +-- 100 000+ apps IA en competition                              |
|  +-- Marges faibles, turnover eleve                               |
|                                                                    |
|  ================================================================ |
|                                                                    |
|  COUCHE INFRASTRUCTURE (ce que tu construis)                      |
|  +-- Evaluation & Testing                                         |
|  +-- Deployment & Scaling                                         |
|  +-- Observabilite & Monitoring                                   |
|  +-- Prompt Management                                            |
|  +-- Fine-tuning Infrastructure                                   |
|  +-- Vector DB & Search                                           |
|                                                                    |
|  Avantages:                                                       |
|  [+] Moins de competition (technique = barriere d'entree)        |
|  [+] Chaque nouvelle app IA = nouveau client potentiel           |
|  [+] Revenus recurrents (infrastructure = necessaire)            |
|  [+] Moat technique (difficile a reproduire)                     |
|  [+] Scalable (usage-based pricing = marginal cost ~0)           |
+------------------------------------------------------------------+
```

### Les 6 Opportunites d'Infrastructure

| Categorie | Probleme | Exemples Existants | Valorisation |
|-----------|----------|-------------------|-------------|
| Evaluation/Testing | "Mon agent IA fait-il bien son job?" | Braintrust, Arize | Braintrust: 100M+ |
| Observabilite | "Que se passe-t-il dans mes LLM calls?" | Langfuse, Helicone | Langfuse: 30M+ |
| Prompt Management | "Comment gerer mes prompts en production?" | PromptLayer, Humanloop | Humanloop: 50M+ |
| Vector DB | "Ou stocker mes embeddings?" | Pinecone, Weaviate, Qdrant | Pinecone: 750M+ |
| Fine-tuning | "Comment adapter un LLM a mon cas?" | Together AI, Anyscale | Together: 1.25Mrd |
| Deployment | "Comment deployer mes agents en prod?" | Modal, Replicate | Modal: 400M+ |

---

## Pourquoi Maintenant (2026)

| Facteur | Impact |
|---------|--------|
| Explosion du nombre d'apps IA | Chaque app a besoin d'infra: plus d'apps = plus de clients |
| Maturite des LLMs = passage en production | Les POCs deviennent des produits = besoin d'outils de production |
| Problemes de qualite IA | Les entreprises DOIVENT evaluer et monitorer leurs LLMs |
| Regulation (AI Act EU) | Besoin de tracabilite, auditabilite, conformite |
| Cout des LLMs sous controle | Les builders IA ont besoin d'optimiser les couts = besoin d'observabilite |
| Investisseurs cherchent l'infra | Le "picks and shovels" est le narratif prefere des VCs |

```
CYCLE D'ADOPTION DE L'INFRA IA:

  2023: POCs et experimentations
        --> Pas besoin d'infra (scripts ad hoc suffisent)

  2024: Premiers produits en production
        --> Debut du besoin (monitoring basique)

  2025: Adoption massive en entreprise
        --> Besoin critique (evaluation, compliance, scaling)

  2026: Maturite du marche  <--- MAINTENANT
        --> Infrastructure = differenciateur concurrentiel
        --> Les outils deviennent OBLIGATOIRES, pas optionnels
```

---

## Taille du Marche

| Segment | Valeur 2025 | CAGR | Valeur 2028 |
|---------|------------|------|------------|
| AI Infrastructure Market | 28 Mrd USD | +35% | 69 Mrd USD |
| MLOps Tools | 4.2 Mrd USD | +40% | 11.5 Mrd USD |
| AI Observability | 1.8 Mrd USD | +50% | 6.1 Mrd USD |
| Vector DB Market | 1.5 Mrd USD | +55% | 5.6 Mrd USD |
| AI Testing/Evaluation | 800M USD | +60% | 3.3 Mrd USD |
| **Total Adressable** | **36.3 Mrd USD** | | **95.5 Mrd USD** |

**SAM (portion serviceable):** 2% = 726M USD
**SOM realiste annee 1:** 500K EUR (0.07% du SAM)

---

## Choix de la Niche: AI Evaluation and Testing

Parmi les 6 opportunites, le segment le plus accessible pour un solo founder est l'evaluation et le testing d'agents IA. Voici pourquoi:

```
+------------------------------------------------------------------+
|              POURQUOI AI EVAL/TESTING                              |
+------------------------------------------------------------------+
|                                                                    |
|  PROBLEME: Les devs deployent des agents IA sans savoir          |
|  s'ils fonctionnent correctement. Pas de "unit tests" pour l'IA. |
|                                                                    |
|  IMPACT:                                                          |
|  +-- Hallucinations en production = perte de confiance client     |
|  +-- Regressions silencieuses = bugs invisibles                  |
|  +-- Pas de benchmark = impossible de comparer les modeles        |
|  +-- Pas de CI/CD pour l'IA = deployments au hasard              |
|                                                                    |
|  SOLUTION:                                                        |
|  +-- Framework d'evaluation automatise                            |
|  +-- Tests de regression pour prompts/agents                      |
|  +-- Benchmarks custom par cas d'usage                            |
|  +-- Integration CI/CD (GitHub Actions, etc.)                     |
|  +-- Dashboard de qualite en temps reel                           |
|                                                                    |
|  AVANTAGE COMPETITIF:                                             |
|  [+] Moins capital-intensif que vector DB ou deployment           |
|  [+] Buildable solo en 2-3 mois                                  |
|  [+] Open-source core + cloud premium = adoption rapide          |
|  [+] AI Act exige de l'evaluation = demande reglementaire        |
+------------------------------------------------------------------+
```

---

## Modele de Monetisation

### Open-Source Core + Cloud Premium

| Tier | Prix | Features |
|------|------|---------|
| Open Source | 0 EUR | Core eval framework, CLI, basic metrics |
| Pro | 49 EUR/mois | Cloud dashboard, CI/CD integration, alerts |
| Team | 149 EUR/mois | Collaboration, RBAC, custom metrics, API |
| Enterprise | 499-2000 EUR/mois | SSO, SLA, dedicated support, compliance reports |

### Revenue Model: Usage-Based

```
+------------------------------------------------------------------+
|              PRICING (USAGE-BASED)                                 |
+------------------------------------------------------------------+
|                                                                    |
|  METRIQUES DE FACTURATION:                                        |
|  +-- Nombre d'evaluations/mois                                   |
|  +-- Nombre d'agents monitores                                   |
|  +-- Volume de donnees de test                                    |
|  +-- Nombre d'utilisateurs dans l'equipe                         |
|                                                                    |
|  TIERS INCLUS:                                                    |
|  Free:       100 evals/mois, 1 agent                              |
|  Pro:        5 000 evals/mois, 10 agents                          |
|  Team:       50 000 evals/mois, 50 agents                         |
|  Enterprise: Illimite, custom                                     |
|                                                                    |
|  EXPANSION REVENUE:                                               |
|  Un client qui grandit utilise plus d'evals                       |
|  --> Revenue augmente sans effort commercial                      |
|  --> Net Revenue Retention: 120-140% (typique infra)              |
+------------------------------------------------------------------+
```

### Projections

| Mois | Open Source Users | Payants | MRR | ARR |
|------|------------------|---------|-----|-----|
| 3 | 200 | 5 | 500 | 6K |
| 6 | 1 000 | 30 | 3 500 | 42K |
| 9 | 3 000 | 80 | 10 000 | 120K |
| 12 | 8 000 | 200 | 25 000 | 300K |
| 18 | 20 000 | 500 | 60 000 | 720K |
| 24 | 50 000 | 1 200 | 140 000 | 1.68M |

---

## Timeline vers 1M EUR

```
+------------------------------------------------------------------+
|                    CHEMIN VERS 1M EUR ARR                         |
+------------------------------------------------------------------+
|                                                                    |
|  Mois 1-3: BUILD                                                 |
|  [=====---------------------------------------------] 10%        |
|  - Construire le framework open-source (core eval)               |
|  - Publier sur GitHub + npm                                       |
|  - Premiers 200 stars GitHub                                      |
|  - MRR: 0-500 EUR                                                |
|                                                                    |
|  Mois 4-6: COMMUNITY                                             |
|  [============--------------------------------------] 25%         |
|  - Ecrire la doc, tutoriels, blog posts                           |
|  - Lancer la version cloud (Pro tier)                             |
|  - Premiers clients payants                                       |
|  - MRR: 3 500 EUR                                                |
|                                                                    |
|  Mois 7-12: GROWTH                                               |
|  [======================----------------------------] 45%         |
|  - Integrations CI/CD (GitHub Actions, GitLab, Jenkins)          |
|  - Team tier + features collaboration                             |
|  - Conference talks, blog viral, Product Hunt                    |
|  - MRR: 25 000 EUR                                               |
|                                                                    |
|  Mois 13-18: SCALE                                               |
|  [===================================--------------] 70%          |
|  - Enterprise tier + compliance features                          |
|  - Premiers gros comptes (>500 EUR/mois)                         |
|  - Lever des fonds ou rester bootstrap                            |
|  - MRR: 60 000 EUR                                               |
|                                                                    |
|  Mois 19-24: 1M ARR                                              |
|  [=============================================-----] 90%        |
|  - Expansion internationale                                      |
|  - Marketplace d'integrations                                    |
|  - MRR: 85K+ EUR = 1M+ ARR                                       |
+------------------------------------------------------------------+
```

**1M EUR de revenus cumules:** atteint vers mois 20-22
**1M EUR ARR:** atteint vers mois 22-24

---

## Risques et Mitigations

| Risque | Probabilite | Impact | Mitigation |
|--------|------------|--------|------------|
| Anthropic/OpenAI build leur propre eval | Elevee | Critique | Multi-model (agnostique), features avancees qu'ils ne feront pas |
| Adoption open-source lente | Moyenne | Fort | Marketing: blog posts techniques, tutorials, conference talks |
| Competitor open-source fork | Moyenne | Moyen | Cloud + community + velocity = avantage |
| Complexite technique trop elevee | Faible | Fort | Commencer simple, iterer avec le feedback |
| Monter enterprise sales seul | Moyenne | Moyen | Self-serve d'abord, enterprise quand MRR > 30K |
| Burn rate si levee de fonds | Faible | Fort | Rester bootstrap tant que possible |

---

## Plan d'Action 90 Jours

### Semaine 1-4: Build the Core

| Semaine | Action | Livrable |
|---------|--------|----------|
| 1 | Definir le scope du framework (API surface, metrics, format) | RFC document |
| 2 | Build: core evaluation engine (Python/TypeScript) | Package npm/pip fonctionnel |
| 3 | Build: CLI tool + basic metrics (accuracy, hallucination, latency) | CLI utilisable |
| 4 | Build: result visualization (HTML report) | Report auto-genere |

### Semaine 5-8: Open Source Launch

| Semaine | Action | Livrable |
|---------|--------|----------|
| 5 | Ecrire la doc (README, getting started, examples) | Doc complete |
| 6 | Publier sur GitHub + npm/pip + Product Hunt | Repo public |
| 7 | Ecrire 3 blog posts techniques | Posts publies (blog + dev.to) |
| 8 | Partager sur HN, Reddit r/MachineLearning, Twitter | 200+ GitHub stars |

### Semaine 9-12: Cloud Version

| Semaine | Action | Livrable |
|---------|--------|----------|
| 9 | Build: cloud dashboard (Next.js + API) | Dashboard live |
| 10 | Build: GitHub Actions integration + CI/CD webhook | Integration CI/CD |
| 11 | Lancer le tier Pro (49 EUR/mois) + onboarder 5 early adopters | 5 clients payants |
| 12 | Bilan: stars, downloads, MRR, feedback | Plan Q2 |

### Exemples de Metriques d'Evaluation

```
+------------------------------------------------------------------+
|              METRIQUES CORE DU FRAMEWORK                          |
+------------------------------------------------------------------+
|                                                                    |
|  QUALITE                                                          |
|  +-- Factual Accuracy (vs ground truth)                           |
|  +-- Hallucination Rate                                           |
|  +-- Relevance Score                                              |
|  +-- Coherence Score                                              |
|  +-- Completeness                                                 |
|                                                                    |
|  SECURITE                                                         |
|  +-- Prompt Injection Resistance                                  |
|  +-- PII Leakage Detection                                       |
|  +-- Toxicity Score                                               |
|  +-- Bias Detection                                               |
|                                                                    |
|  PERFORMANCE                                                      |
|  +-- Latency (p50, p95, p99)                                     |
|  +-- Token Usage (input/output)                                   |
|  +-- Cost per Request                                             |
|  +-- Throughput                                                   |
|                                                                    |
|  REGRESSION                                                       |
|  +-- Output Diff (vs previous version)                            |
|  +-- Score Trends Over Time                                       |
|  +-- A/B Comparison (model vs model)                              |
+------------------------------------------------------------------+
```

---

## Exemples de Reference (Concurrents et Inspirations)

| Entreprise | Focus | Levee | Valorisation | Modele |
|-----------|-------|-------|-------------|--------|
| Braintrust | AI Eval | 36M USD | 100M+ | Open-source + cloud |
| Langfuse | LLM Observability | 12M USD | 50M+ | Open-source + cloud |
| Helicone | LLM Monitoring | 10M USD | 40M+ | Cloud SaaS |
| Arize AI | ML Observability | 38M USD | 150M+ | Enterprise SaaS |
| Weights & Biases | ML Experiment Tracking | 200M USD | 1.25Mrd | Freemium + enterprise |
| Pinecone | Vector DB | 138M USD | 750M+ | Cloud SaaS |

**Lecon:** open-source core + cloud premium est le playbook qui marche dans l'infra IA. Toutes ces boites l'ont fait.

---

*Fichier cree: Mars 2026*
*Modele: Infrastructure IA (Picks and Shovels)*
*Objectif: 1M ARR en 22-24 mois via open-source + cloud premium*
