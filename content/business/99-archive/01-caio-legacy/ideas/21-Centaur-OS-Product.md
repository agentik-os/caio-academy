# Centaur OS: Plateforme d'Intelligence Decisionnelle

> Pas un chatbot. Un systeme qui connait tes valeurs, tes objectifs, tes contraintes.
> Et qui t'aide a prendre de meilleures decisions, chaque jour.

---

## Vision

La plupart des gens prennent des decisions majeures avec leur instinct, puis rationalisent apres coup. Les meilleurs decideurs au monde (Bezos, Dalio, Munger) utilisent des frameworks systematiques et tiennent un journal de decisions.

Centaur OS democratise cette approche. C'est un copilote decisionnel qui :

1. Connait ton profil profond (valeurs, objectifs, biais connus)
2. Propose le bon framework pour chaque type de decision
3. Rappelle tes decisions passees et leurs resultats
4. Suit les outcomes dans le temps
5. Identifie tes patterns (biais recurrents, angles morts)

```
+------------------------------------------------------------------+
|                         CENTAUR OS                                |
|                                                                   |
|  TOI (contexte) + FRAMEWORKS + HISTORIQUE = MEILLEURE DECISION   |
|                                                                   |
|  +----------+     +------------+     +-----------+               |
|  | Profil   |---->| Analyse    |---->| Decision  |               |
|  | Personnel|     | Framework  |     | Assistee  |               |
|  +----------+     +------------+     +-----------+               |
|       |                                    |                      |
|       v                                    v                      |
|  +----------+                        +-----------+               |
|  | Valeurs  |                        | Outcome   |               |
|  | Objectifs|                        | Tracking  |               |
|  | Biais    |                        | + Review  |               |
|  +----------+                        +-----------+               |
+------------------------------------------------------------------+
```

Le nom "Centaur" vient du concept Kasparov : humain + machine > machine seule. L'IA ne decide pas pour toi. Elle t'aide a decider mieux.

---

## Fonctionnalites Principales

### 1. Journal de Decisions

Chaque decision majeure est loguee avec un format structure :

| Champ | Description |
|-------|-------------|
| Contexte | Situation, pression, deadline |
| Options | Minimum 3 alternatives |
| Framework utilise | Quel modele mental applique |
| Decision finale | Ce qui a ete choisi |
| Raisonnement | Pourquoi cette option |
| Confiance | Score 1-10 au moment de la decision |
| Date de review | Quand evaluer le resultat |

### 2. Bibliotheque de Frameworks

| Framework | Quand l'utiliser |
|-----------|-----------------|
| First Principles | Decision complexe, besoin de repartir de zero |
| Regret Minimization | Choix de vie, decisions irreversibles |
| Pre-Mortem | Projets, lancements, decisions a haut risque |
| Inversion | Quand on est bloque, penser a l'envers |
| 10/10/10 | Perspective temporelle (10 min / 10 mois / 10 ans) |
| Eisenhower Matrix | Priorisation urgent vs important |
| Second-Order Thinking | Consequences a long terme |
| Opportunity Cost | Comparaison de ce qu'on sacrifie |

L'IA suggere automatiquement le framework le plus pertinent selon le type de decision.

### 3. Pattern Matching Historique

```
+------------------------------------------------------------------+
|  PATTERN DETECTE                                                  |
|                                                                   |
|  "La derniere fois que tu as fait face a une decision            |
|   d'embauche urgente (Mars 2025), tu as choisi la rapidite       |
|   plutot que la qualite. Resultat : turnover a 3 mois."          |
|                                                                   |
|  Suggestion : Utiliser le framework Pre-Mortem cette fois.        |
|  Confiance historique sur ce type de decision : 4/10              |
+------------------------------------------------------------------+
```

### 4. Suivi des Outcomes

Chaque decision a une date de review. Le systeme rappelle :
- Quel etait le contexte original
- Ce qui a ete decide et pourquoi
- Le resultat reel vs le resultat anticipe
- Le score de confiance initial vs la realite

### 5. Revue Hebdomadaire de Decisions

Chaque dimanche, un rapport automatique :
- Decisions prises cette semaine
- Decisions en attente de review
- Patterns identifies (biais recurrents)
- Score global de qualite decisionnelle

### 6. Profil de Decideur

Le systeme construit progressivement un profil :

| Dimension | Mesure |
|-----------|--------|
| Biais identifies | Confirmation, ancrage, disponibilite... |
| Forces | Types de decisions ou tu excelles |
| Faiblesses | Types ou tu sous-performes |
| Vitesse vs qualite | Tendance a decider trop vite ou trop lentement |
| Confiance calibration | Tes scores de confiance sont-ils fiables ? |

### 7. Mode Crise

Pour les decisions urgentes (< 24h) :
- Checklist rapide en 5 questions
- Framework simplifie
- Rappel des 3 biais les plus frequents
- Decision loguee meme en mode rapide

---

## Architecture Technique

```
+------------------------------------------------------------------+
|                    ARCHITECTURE CENTAUR OS                         |
|                                                                   |
|  CLIENT (Web App / Mobile)                                        |
|  |                                                                |
|  v                                                                |
|  +------------------+     +------------------+                    |
|  | Next.js Frontend |<--->| API Layer (Hono) |                    |
|  +------------------+     +------------------+                    |
|                                |                                  |
|                    +-----------+-----------+                      |
|                    |                       |                      |
|              +----------+           +----------+                  |
|              | Claude   |           | Vector   |                  |
|              | API      |           | DB       |                  |
|              | (Sonnet) |           | (Chroma) |                  |
|              +----------+           +----------+                  |
|                    |                       |                      |
|                    v                       v                      |
|              +----------+           +----------+                  |
|              | Contexte |           | Decisions|                  |
|              | Personnel|           | Index    |                  |
|              +----------+           +----------+                  |
|                                                                   |
|  STOCKAGE                                                         |
|  +------------------+     +------------------+                    |
|  | Convex (Backend) |     | Chroma (Vectors) |                    |
|  | - Decisions      |     | - Embeddings     |                    |
|  | - Outcomes       |     | - Similarity     |                    |
|  | - Profil         |     | - Patterns       |                    |
|  +------------------+     +------------------+                    |
+------------------------------------------------------------------+
```

| Composant | Technologie | Justification |
|-----------|-------------|---------------|
| Frontend | Next.js + Tailwind | App web reactive, PWA mobile |
| Backend | Convex | Real-time, serverless, schema type |
| IA | Claude API (Sonnet) | Raisonnement structure, cout raisonnable |
| Vecteurs | Chroma / Pinecone | Recherche de similarite pour patterns |
| Auth | Clerk | Auth simple, social login |
| Paiement | Stripe | Abonnements mensuels |

---

## Modele Economique

### Pricing

| Plan | Prix | Limites |
|------|------|---------|
| Gratuit | 0 EUR | 5 decisions/mois, 3 frameworks, pas de pattern matching |
| Pro | 29 EUR/mois | Illimite, tous frameworks, pattern matching, revue hebdo |
| Team | 79 EUR/mois | Pro + partage d'equipe, dashboard collectif, API |

### Metriques Cles

| Metrique | Objectif An 1 |
|----------|---------------|
| CAC | < 30 EUR |
| LTV | > 300 EUR (10+ mois retention) |
| Churn mensuel | < 5% |
| ARPU | 35 EUR |
| Marge brute | > 80% |

---

## Analyse Concurrentielle

```
+------------------------------------------------------------------+
|  POSITIONNEMENT CENTAUR OS                                        |
|                                                                   |
|  Axe X : Generaliste <---------> Specialise (Decisions)          |
|  Axe Y : Passif (outil) <------> Actif (coach)                  |
|                                                                   |
|  ChatGPT [X]                                                      |
|  (generaliste, passif)                                            |
|                                                                   |
|              Notion AI [X]                                        |
|              (generaliste, semi-passif)                           |
|                                                                   |
|                              CENTAUR OS [X]                       |
|                              (specialise, actif)                  |
|                                                                   |
|                    Cloverpop [X]                                  |
|                    (specialise, passif, entreprise)               |
+------------------------------------------------------------------+
```

| Concurrent | Forces | Faiblesses | Notre avantage |
|------------|--------|------------|----------------|
| ChatGPT | Polyvalent, connu | Pas de memoire, pas de frameworks, pas de suivi | Systeme complet avec tracking |
| Notion AI | Integre dans workflow | IA superficielle, pas de decision tracking | Specialise decisions |
| Cloverpop | Decision management | Enterprise only (1000+ EUR/mois), complexe | Accessible, prix individuel |
| Coach humain | Profondeur relationnelle | 200+ EUR/heure, pas disponible 24/7 | 24/7, 29 EUR/mois, historique complet |

---

## Roadmap MVP (90 Jours)

### Phase 1 : Fondations (Jours 1-30)

| Semaine | Livrable |
|---------|----------|
| S1-S2 | Setup projet (Next.js + Convex + Clerk + Stripe) |
| S2-S3 | Journal de decisions : creation, edition, liste |
| S3-S4 | 8 frameworks integres avec guide interactif |
| S4 | Onboarding : profil valeurs + objectifs |

### Phase 2 : Intelligence (Jours 31-60)

| Semaine | Livrable |
|---------|----------|
| S5-S6 | Integration Claude API : suggestion de framework |
| S6-S7 | Vector DB : indexation des decisions passees |
| S7-S8 | Pattern matching : detection de similarites |
| S8 | Outcome tracking : rappels + evaluation |

### Phase 3 : Lancement (Jours 61-90)

| Semaine | Livrable |
|---------|----------|
| S9-S10 | Revue hebdomadaire automatique |
| S10-S11 | Stripe integration, plans free/pro |
| S11-S12 | Landing page, beta privee (100 users) |
| S12 | Lancement Product Hunt |

```
+-- ROADMAP 90 JOURS ---------------------------------------------+
|                                                                   |
|  PHASE 1 (J1-30)   [====================] 100%  Fondations      |
|  PHASE 2 (J31-60)  [====================] 100%  Intelligence    |
|  PHASE 3 (J61-90)  [====================] 100%  Lancement       |
|                                                                   |
|  MVP = Journal + 8 Frameworks + Pattern Matching + Revue Hebdo   |
+------------------------------------------------------------------+
```

---

## Projections de Revenus

### Hypotheses

| Parametre | Valeur |
|-----------|--------|
| Prix moyen | 35 EUR/mois |
| Taux conversion free -> pro | 8% |
| Churn mensuel | 5% |
| Croissance organique | +15% utilisateurs/mois |

### Projections

| Periode | Utilisateurs gratuits | Abonnes payants | MRR | ARR |
|---------|----------------------|-----------------|-----|-----|
| Mois 3 | 500 | 40 | 1 400 EUR | 16 800 EUR |
| Mois 6 | 2 000 | 160 | 5 600 EUR | 67 200 EUR |
| Mois 12 | 8 000 | 640 | 22 400 EUR | 268 800 EUR |
| An 2 | 25 000 | 2 000 | 70 000 EUR | 840 000 EUR |
| An 3 | 60 000 | 4 800 | 168 000 EUR | 2 016 000 EUR |

### Couts Principaux

| Poste | Mois 1-6 | Mois 7-12 |
|-------|----------|-----------|
| Claude API | 200 EUR/mois | 2 000 EUR/mois |
| Infrastructure (Convex, Vercel) | 50 EUR/mois | 200 EUR/mois |
| Marketing | 500 EUR/mois | 2 000 EUR/mois |
| **Total** | **750 EUR/mois** | **4 200 EUR/mois** |

### Point de Rentabilite

Avec 750 EUR de couts fixes : **~22 abonnes payants** (mois 2-3 du lancement).

---

## Pourquoi Maintenant

1. Les LLM sont assez bons pour le raisonnement structure (Claude Sonnet)
2. Les vector DB rendent le pattern matching accessible et abordable
3. Le mouvement "rational decision-making" (Thinking in Bets, Annie Duke) grandit
4. Aucun produit grand public ne fait ca - le marche est vide
5. Le cout de construction est bas (1 dev + APIs)

---

## Risques et Mitigations

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Retention faible (pas assez de decisions) | Haut | Elargir aux micro-decisions, integrer habitudes |
| ChatGPT ajoute du memory/tracking | Moyen | Avance specialisation, UX dediee, data portability |
| Cout API explose | Moyen | Cache agressif, batch processing, modeles locaux |
| Marche de niche trop petit | Moyen | Expansion vers teams/entreprises (plan 79 EUR) |

---

*Document cree : Mars 2026*
*Categorie : Produit IA - Intelligence Decisionnelle*
*Statut : Concept valide - Pret pour MVP*
