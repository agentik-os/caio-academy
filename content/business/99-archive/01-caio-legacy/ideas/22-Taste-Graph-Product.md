# Taste Graph: Le Curateur Personnel Cross-Domaine

> Ton gout en jazz predit que tu aimeras l'architecture brutaliste.
> Ton amour pour Murakami suggere que tu adoreras Wong Kar-wai.
> Taste Graph construit ta carte de gout unique et te fait decouvrir a travers les domaines.

---

## Vision

Les algorithmes de recommandation sont brises. Spotify te recommande plus du meme artiste. Netflix te montre plus du meme genre. Chaque plateforme vit dans son silo.

Taste Graph est different. Il construit une **empreinte de gout** (taste fingerprint) qui transcende les domaines. Parce que les gens qui aiment le minimalisme japonais en design aiment souvent aussi le jazz modal, la cuisine kaiseki, et les films de Wim Wenders. Ce n'est pas une coincidence - c'est un pattern esthetique profond.

```
+------------------------------------------------------------------+
|                       TASTE GRAPH                                 |
|                                                                   |
|  TON GOUT = Un graphe multi-dimensionnel unique                  |
|                                                                   |
|  +--------+   +--------+   +--------+   +--------+              |
|  | Musique|   | Cinema |   | Livres |   | Art    |              |
|  +---+----+   +---+----+   +---+----+   +---+----+              |
|      |            |            |            |                     |
|      +-----+------+-----+-----+-----+------+                     |
|            |             |           |                            |
|            v             v           v                            |
|      +-----------+  +----------+  +----------+                   |
|      | Empreinte |  | Patterns |  | Decouv.  |                   |
|      | de Gout   |  | Cross-   |  | Cross-   |                   |
|      | Unique    |  | Domaine  |  | Domaine  |                   |
|      +-----------+  +----------+  +----------+                   |
|                                                                   |
|  "Tu aimes Coltrane + Tarkovski + Murakami = profil              |
|   'contemplation structuree' -> essaie Agnes Martin (art)"       |
+------------------------------------------------------------------+
```

---

## Fonctionnalites Principales

### 1. Onboarding Visuel (Swipe Aesthetique)

Comme Tinder mais pour tes gouts. Series de 50 images/sons/extraits a swiper :

| Domaine | Format du Swipe |
|---------|----------------|
| Musique | Extraits de 15 secondes |
| Art visuel | Images d'oeuvres, photos, design |
| Architecture | Photos d'interieur/exterieur |
| Mode | Looks, textures, silhouettes |
| Gastronomie | Plats, presentations, ingredients |
| Voyages | Lieux, ambiances, paysages |
| Litterature | Extraits de 3 lignes + couvertures |

Resultat : une carte de gout initiale en 5 minutes.

### 2. Import Multi-Plateforme

| Source | Donnees Importees |
|--------|-------------------|
| Spotify | Top artistes, genres, audio features |
| Goodreads | Livres lus, notes, genres |
| Netflix / Letterboxd | Films et series, notes |
| Instagram | Posts likes (analyse visuelle) |
| Pinterest | Boards (analyse esthetique) |
| Apple Music | Historique d'ecoute |

### 3. Empreinte de Gout (Taste Fingerprint)

Un profil multi-dimensionnel :

```
+-- TON TASTE FINGERPRINT ----------------------------------------+
|                                                                   |
|  Complexite      [==================--]  90%                     |
|  Minimalisme     [===============-----]  75%                     |
|  Emotion         [====================]  100%                    |
|  Tradition       [==========----------]  50%                     |
|  Avant-garde     [================----]  80%                     |
|  Sensoriel       [==============------]  70%                     |
|  Narratif        [=================---]  85%                     |
|  Abstrait        [============--------]  60%                     |
|                                                                   |
|  Archetype dominant : "Le Contemplatif Curieux"                  |
|  Profils similaires : 3.2% de la population                     |
+------------------------------------------------------------------+
```

### 4. Magie Cross-Domaine

La fonctionnalite coeur. Exemples de connexions :

| Si tu aimes... | Tu aimeras probablement... | Pourquoi |
|----------------|---------------------------|----------|
| Jazz modal (Miles Davis) | Architecture brutaliste | Structure dans le minimalisme |
| Murakami (litterature) | Wong Kar-wai (cinema) | Melancolie contemplative, quotidien poetise |
| Cuisine fermentee | Musique ambient | Patience, transformation lente, subtilite |
| Design scandinave | Poesie haiku | Economie de moyens, beaute dans la simplicite |
| Photographie de rue | Free jazz | Improvisation, capture du moment |

### 5. Anti-Algorithme (Explications Transparentes)

Chaque recommandation vient avec une explication :

```
+-- RECOMMANDATION ------------------------------------------------+
|                                                                   |
|  "Agnes Martin - Peintures minimalistes"                         |
|                                                                   |
|  POURQUOI :                                                       |
|  - Ton profil montre une affinite forte pour le minimalisme      |
|    (75%) et la contemplation (90%)                                |
|  - 87% des gens qui aiment Coltrane + Tarkovski aiment           |
|    Agnes Martin                                                   |
|  - Connexion : la repetition structuree comme meditation         |
|                                                                   |
|  CONFIANCE : 82%                                                  |
|  SOURCE : Cross-domaine (musique + cinema -> art visuel)         |
+------------------------------------------------------------------+
```

### 6. Discovery Feed

Un flux quotidien de 3-5 decouvertes cross-domaine. Pas un algorithme qui enferme dans une bulle, mais un systeme qui pousse vers l'inconnu pertinent.

### 7. Taste Evolution

Suivi de l'evolution de tes gouts dans le temps :
- Tendances mensuelles
- Nouvelles affinites detectees
- Domaines inexplores qui pourraient te plaire
- "Il y a 6 mois tu etais 60% minimaliste, maintenant 80%"

### 8. Partage Social

- Carte de gout partageable (image generee)
- Compatibilite de gout avec des amis
- "Ton overlap avec Marie : 73% en musique, 45% en cinema"

---

## Architecture Technique

```
+------------------------------------------------------------------+
|                  ARCHITECTURE TASTE GRAPH                          |
|                                                                   |
|  +------------------+                                             |
|  | Next.js PWA      |     Import Layer                           |
|  | (Frontend)       |     +------------------+                    |
|  +--------+---------+     | Spotify API      |                    |
|           |               | Goodreads API    |                    |
|           v               | Letterboxd API   |                    |
|  +------------------+     | Instagram Graph  |                    |
|  | API Gateway      |<----+ Pinterest API    |                    |
|  | (Hono/Workers)   |     +------------------+                    |
|  +--------+---------+                                             |
|           |                                                       |
|     +-----+------+                                                |
|     |            |                                                |
|  +--+---+   +---+--------+                                       |
|  |Claude|   |Embedding   |                                       |
|  |Haiku |   |Models      |                                       |
|  |(NLP) |   |(CLIP/CLAP) |                                       |
|  +------+   +---+--------+                                       |
|                  |                                                 |
|            +-----+------+                                         |
|            |            |                                         |
|       +----+----+  +---+--------+                                 |
|       |Pinecone |  |Graph DB    |                                 |
|       |Vectors  |  |Neo4j/Memgr |                                 |
|       +---------+  +------------+                                 |
+------------------------------------------------------------------+
```

| Composant | Technologie | Role |
|-----------|-------------|------|
| Frontend | Next.js PWA | Swipe UI, discovery feed, profil |
| API | Hono sur Cloudflare Workers | Routing, cache, rate limiting |
| Embeddings | CLIP (images), CLAP (audio) | Representation multi-modale |
| Similarite | Pinecone | Recherche de voisins proches cross-domaine |
| Graphe | Neo4j Aura Free / Memgraph | Relations cross-domaine, patterns |
| NLP | Claude Haiku | Explications, synthese de profil |
| Import | APIs tierces | Spotify, Goodreads, etc. |
| Auth | Clerk | Social login (important pour import) |
| Paiement | Stripe | Abonnements |

### Modele d'Embeddings Cross-Domaine

Le coeur technique : un espace d'embedding partage ou musique, art, texte et images coexistent.

```
Approach : Transfer Learning
1. Embeddings par domaine (CLIP pour images, CLAP pour audio, text-embedding pour texte)
2. Projection dans un espace partage via un modele de mapping appris
3. Collaborative filtering enrichit les connexions cross-domaine
4. Feedback utilisateur affine les poids
```

---

## Modele Economique

### Pricing

| Plan | Prix | Inclus |
|------|------|--------|
| Free | 0 EUR | 1 domaine, swipe onboarding, profil basique |
| Explorer | 15 EUR/mois | Tous domaines, discovery feed, import illimite |
| Connoisseur | 29 EUR/mois | Explorer + export, API, taste evolution, social |

### Metriques Cles

| Metrique | Objectif |
|----------|----------|
| DAU/MAU | > 25% (engagement fort) |
| Retention J30 | > 40% |
| Conversion free -> paid | 6% |
| Temps moyen par session | > 8 min |
| NPS | > 50 |

---

## Analyse Concurrentielle

| Concurrent | Ce qu'il fait | Ce qui manque |
|------------|--------------|---------------|
| Spotify Discover | Recommande de la musique | Un seul domaine, algorithme opaque |
| Netflix | Recommande films/series | Un seul domaine, optimise pour le binge |
| Goodreads | Recommande des livres | Communautaire, pas d'IA, un seul domaine |
| Taste.io | Recommande films | Films seulement, pas cross-domaine |
| Likewise | Multi-plateforme | Agglomere des listes, pas de cross-domaine intelligent |

```
+------------------------------------------------------------------+
|  CARTE CONCURRENTIELLE                                            |
|                                                                   |
|  Mono-domaine <---------------------------> Cross-domaine        |
|                                                                   |
|  Spotify [X]        Likewise [X]                                  |
|  Netflix [X]                                                      |
|  Goodreads [X]                                                    |
|  Taste.io [X]                                                     |
|                                         TASTE GRAPH [X]          |
|                                                                   |
|  Algorithme opaque <----------------------> Transparent          |
+------------------------------------------------------------------+
```

Notre avantage unique : **personne ne fait du cross-domaine transparent**.

---

## Roadmap MVP (90 Jours)

### Phase 1 : Fondations (Jours 1-30)

| Semaine | Livrable |
|---------|----------|
| S1-S2 | Swipe onboarding (images + extraits audio) avec 200 items |
| S2-S3 | Pipeline d'embedding (CLIP pour images, text-embedding pour texte) |
| S3-S4 | Profil de gout basique (8 dimensions + archetype) |
| S4 | Import Spotify (premier domaine externe) |

### Phase 2 : Cross-Domaine (Jours 31-60)

| Semaine | Livrable |
|---------|----------|
| S5-S6 | Espace d'embedding partage (mapping cross-domaine) |
| S6-S7 | Moteur de recommandation cross-domaine (v1) |
| S7-S8 | Explications transparentes (Claude Haiku) |
| S8 | Import Goodreads + Letterboxd |

### Phase 3 : Lancement (Jours 61-90)

| Semaine | Livrable |
|---------|----------|
| S9-S10 | Discovery feed quotidien |
| S10-S11 | Stripe + plans free/explorer |
| S11 | Landing page, waitlist |
| S12 | Beta privee (500 users), iteration |

---

## Projections de Revenus

### Hypotheses

| Parametre | Valeur |
|-----------|--------|
| Prix moyen | 18 EUR/mois |
| Conversion free -> paid | 6% |
| Churn mensuel | 7% |
| Viralite (partage de profil) | +20% users/mois organique |

### Projections

| Periode | Users gratuits | Abonnes | MRR | ARR |
|---------|---------------|---------|-----|-----|
| Mois 3 | 2 000 | 120 | 2 160 EUR | 25 920 EUR |
| Mois 6 | 8 000 | 480 | 8 640 EUR | 103 680 EUR |
| Mois 12 | 30 000 | 1 800 | 32 400 EUR | 388 800 EUR |
| An 2 | 100 000 | 6 000 | 108 000 EUR | 1 296 000 EUR |
| An 3 | 300 000 | 18 000 | 324 000 EUR | 3 888 000 EUR |

### Couts

| Poste | Mois 1-6 | Mois 7-12 |
|-------|----------|-----------|
| Embeddings (API) | 300 EUR/mois | 3 000 EUR/mois |
| Pinecone | 70 EUR/mois | 250 EUR/mois |
| Claude Haiku | 100 EUR/mois | 1 000 EUR/mois |
| Infrastructure | 50 EUR/mois | 300 EUR/mois |
| Marketing | 500 EUR/mois | 3 000 EUR/mois |
| **Total** | **1 020 EUR/mois** | **7 550 EUR/mois** |

---

## Risques et Mitigations

| Risque | Mitigation |
|--------|------------|
| APIs tierces ferment l'acces | Diversifier les sources, scraping legal en backup |
| Cross-domaine pas assez precis | Fallback sur collaborative filtering pur |
| Marche de niche (curieux esthetiques) | Commencer niche, elargir vers mainstream |
| Cout d'embeddings | Modeles open-source (CLIP local) des que le volume justifie |
| Spotify/Netflix copient la feature | Notre avantage : specialisation + transparence |

---

## Pourquoi Maintenant

1. CLIP et les modeles multi-modaux rendent le cross-domaine possible
2. Les gens sont fatigues des algorithmes opaques (mouvement anti-algo)
3. La culture de la curation personnelle explose (playlists, boards, listes)
4. Pas de concurrent direct dans le cross-domaine transparent
5. Le partage de "profil de gout" est inherement viral

---

*Document cree : Mars 2026*
*Categorie : Produit IA - Curation Personnelle*
*Statut : Concept innovant - R&D cross-domaine necessaire*
