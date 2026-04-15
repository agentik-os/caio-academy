# CRM IA pour Freelances: Simple, Intelligent, Automatise

> Pas Salesforce. Pas HubSpot. Le CRM fait pour toi, freelance.
> Auto follow-up, generateur de propositions, monitoring projet, prevision revenus.
> Parce que 50 millions de freelances utilisent des spreadsheets ou rien du tout.

---

## Vision

Le freelance est un paradoxe : il gere des clients comme une entreprise, mais n'a pas les outils d'une entreprise. Salesforce coute 75 EUR/mois/utilisateur et demande un admin. HubSpot gratuit est limité, la version pro coute 800+ EUR/mois. Pipedrive et les autres sont concus pour des equipes de vente, pas pour un humain seul.

Resultat : la majorite des freelances gerent leurs clients avec un spreadsheet, des notes mentales, et l'angoisse permanente d'avoir oublie de relancer quelqu'un.

CRM IA pour Freelances est construit FROM SCRATCH pour le solo. Simple a utiliser (pas de pipeline de vente complexe), intelligent (l'IA fait le travail de suivi), et integre (facturation, projets, revenus en un seul endroit).

```
+------------------------------------------------------------------+
|                    CRM IA FREELANCE                               |
|                                                                   |
|  LE PROBLEME DU FREELANCE :                                      |
|                                                                   |
|  +--------+  +--------+  +--------+  +--------+                 |
|  | Trouver|  | Gerer  |  | Livrer |  | Facturer|                |
|  | Clients|  | Relat. |  | Projets|  |         |                |
|  +---+----+  +---+----+  +---+----+  +---+-----+                |
|      |           |           |           |                        |
|      +-----------+-----------+-----------+                        |
|                      |                                            |
|          TOUT CA DANS SA TETE                                     |
|          (ou un Google Sheet brouillon)                           |
|                                                                   |
|  NOTRE SOLUTION : UN SEUL OUTIL QUI FAIT TOUT                   |
|                                                                   |
|  +--------------------------------------------------+            |
|  | CRM IA Freelance                                  |            |
|  | Relations + Projets + Facturation + Intelligence |            |
|  +--------------------------------------------------+            |
+------------------------------------------------------------------+
```

---

## Fonctionnalites Principales

### 1. Auto Follow-Up

Le coeur du produit. L'IA sait quand relancer :

```
+-- FOLLOW-UPS INTELLIGENTS ---------------------------------------+
|                                                                   |
|  [!] URGENT (action requise maintenant)                          |
|  - Marie D. (TechCorp) : devis envoye il y a 8 jours,          |
|    aucune reponse. Draft de relance pret.                        |
|                                                                   |
|  [+] CETTE SEMAINE                                                |
|  - Jean P. : projet termine il y a 30 jours,                    |
|    bon moment pour demander un feedback/temoignage               |
|  - Sophie L. : pas de contact depuis 45 jours,                  |
|    client fidele, maintenir la relation                          |
|                                                                   |
|  [OK] EN BONNE VOIE                                              |
|  - Lucas M. : derniere interaction il y a 5 jours (normal)      |
|  - Startup X : projet en cours, prochain milestone dans 10j     |
|                                                                   |
|  DRAFTS PRETS A ENVOYER :                                        |
|  -> Marie : "Bonjour Marie, je reviens vers vous concernant..." |
|  -> Jean : "Salut Jean, j'espere que le projet fonctionne..."   |
|  -> Sophie : "Sophie, ca fait un moment ! Comment avance..."    |
+------------------------------------------------------------------+
```

Regles de follow-up apprises par l'IA :

| Situation | Timing Optimal | Template |
|-----------|---------------|----------|
| Devis envoye | J+3, J+7, J+14 | Relance progressive |
| Projet termine | J+7 (feedback), J+30 (upsell) | Satisfaction + proposition |
| Client dormant | 45 jours sans contact | Maintien de relation |
| Anniversaire collaboration | Annuel | Celebration + offre speciale |
| Changement de poste (LinkedIn) | Detection auto | Felicitations |

### 2. Generateur de Propositions

| Etape | Automatise |
|-------|-----------|
| Brief client | Template de questionnaire a envoyer |
| Structure | Sections generees selon le type de projet |
| Pricing | Suggestions basees sur tes prix historiques |
| Timeline | Estimation basee sur projets similaires |
| Mise en page | PDF professionnel genere automatiquement |
| Suivi | Notification quand le client ouvre la proposition |

```
+-- GENERATEUR DE PROPOSITION ------------------------------------+
|                                                                  |
|  CLIENT : TechCorp                                               |
|  PROJET : Redesign site web                                     |
|  BUDGET ESTIME : 8 000 - 12 000 EUR                            |
|                                                                  |
|  HISTORIQUE AVEC CE CLIENT :                                     |
|  - 2 projets precedents (total 15 000 EUR)                     |
|  - Satisfaction : 9/10                                           |
|  - Paie en temps : Oui (moyenne 12 jours)                       |
|                                                                  |
|  PROPOSITION GENEREE :                                           |
|  - Phase 1 : Audit UX (1 500 EUR, 1 semaine)                   |
|  - Phase 2 : Design (4 000 EUR, 3 semaines)                    |
|  - Phase 3 : Integration (3 500 EUR, 2 semaines)               |
|  - Total : 9 000 EUR, 6 semaines                               |
|                                                                  |
|  [!] Suggestion : prix 10% au-dessus de tes derniers projets   |
|  similaires. Tu sous-factures habituellement.                   |
+------------------------------------------------------------------+
```

### 3. Monitoring de Projet

Dashboard par projet actif :

| Metrique | Client A | Client B | Client C |
|----------|----------|----------|----------|
| Budget total | 8 000 EUR | 3 000 EUR | 12 000 EUR |
| Facture | 4 000 EUR | 3 000 EUR | 4 000 EUR |
| Reste a facturer | 4 000 EUR | 0 EUR | 8 000 EUR |
| Jours restants | 15 | 0 (termine) | 35 |
| Sante projet | [OK] | [OK] | [!] En retard |

Alertes automatiques :
- Budget consomme a 80% avec 50% du travail restant
- Deadline dans 5 jours, estimation depassement
- Client n'a pas repondu depuis 7 jours (bloquant)

### 4. Suggestions d'Upsell

```
+-- OPPORTUNITES D'UPSELL ----------------------------------------+
|                                                                  |
|  Jean P. (TechCorp) - Probabilite : 72%                        |
|  -> Projet actuel : site web                                    |
|  -> Upsell potentiel : SEO, maintenance mensuelle               |
|  -> Raison : il a mentionne le SEO en call (note du 12 mars)   |
|  -> Action : proposer un audit SEO a 800 EUR                    |
|                                                                  |
|  Sophie L. (Startup Y) - Probabilite : 55%                      |
|  -> Dernier projet : app mobile v1                              |
|  -> Upsell potentiel : v2, analytics dashboard                  |
|  -> Raison : 6 mois depuis la v1, timing classique pour v2     |
|  -> Action : envoyer un message "comment ca se passe ?"         |
+------------------------------------------------------------------+
```

### 5. Prevision de Revenus

```
+-- TABLEAU DE BORD FINANCIER ------------------------------------+
|                                                                  |
|  MOIS EN COURS (Mars 2026)                                      |
|  Revenu confirme    [=================---]  8 500 EUR           |
|  Objectif           [====================]  12 000 EUR          |
|  Pipeline probable  [=========-----------]  4 500 EUR           |
|                                                                  |
|  PREVISION 3 MOIS :                                              |
|  Avril  : 11 000 EUR (2 projets confirmes + 1 probable)        |
|  Mai    : 8 000 EUR (1 projet confirme + pipeline)              |
|  Juin   : 6 000 EUR (pipeline seulement)                        |
|                                                                  |
|  [!] Juin est en dessous de ton objectif de 10K.                |
|  -> Recommandation : prospecter 5 nouveaux leads cette semaine. |
|                                                                  |
|  METRIQUES ANNUELLES :                                           |
|  CA cumule 2026 : 24 500 EUR                                    |
|  Objectif annuel : 120 000 EUR                                   |
|  Progression      [====----------------]  20%                    |
+------------------------------------------------------------------+
```

### 6. Suivi de Facturation

| Facture | Client | Montant | Envoyee | Payee | Retard |
|---------|--------|---------|---------|-------|--------|
| #041 | TechCorp | 4 000 EUR | 1 Mars | 12 Mars | Non |
| #042 | Startup Y | 3 000 EUR | 5 Mars | En attente | Non |
| #043 | Agency Z | 2 500 EUR | 10 Mars | En attente | Non |
| #038 | Client X | 1 800 EUR | 15 Fev | EN RETARD | 15 jours |

Relance automatique pour factures en retard (draft + notification).

### 7. Fiche Client Intelligente

Pas un formulaire statique. Un profil vivant :

| Champ | Valeur | Source |
|-------|--------|--------|
| Nom | Marie Dupont | Manuel |
| Entreprise | TechCorp | Manuel |
| Depuis | Mars 2024 | Auto (premier email) |
| Projets | 3 (total 23 000 EUR) | Auto (factures) |
| LTV | 23 000 EUR | Auto |
| Satisfaction | 8.5/10 | Auto (feedback) |
| Delai paiement moyen | 12 jours | Auto (factures) |
| Derniere interaction | Il y a 5 jours | Auto (email) |
| Notes cles | "Prefere les calls courts, decision rapide" | Manuel |
| Risque churn | Faible (2/10) | Auto (patterns) |

### 8. Import Email Automatique

Connexion Gmail/Outlook. Le CRM peuple automatiquement :
- Nouveaux contacts depuis les emails
- Historique de conversation par client
- Detection de projets potentiels ("on aurait besoin de...")
- Detection de problemes ("ca ne marche pas")

---

## Architecture Technique

```
+------------------------------------------------------------------+
|                ARCHITECTURE CRM IA FREELANCE                      |
|                                                                   |
|  +------------------+     +------------------+                    |
|  | Next.js PWA      |     | Gmail/Outlook    |                    |
|  | (Dashboard CRM)  |     | (Import auto)    |                    |
|  +--------+---------+     +--------+---------+                    |
|           |                        |                              |
|           v                        v                              |
|  +------------------------------------------+                    |
|  |            Convex Backend                  |                    |
|  |  - Clients, Projets, Factures             |                    |
|  |  - Follow-up engine (scheduled functions) |                    |
|  |  - Pipeline, previsions                   |                    |
|  +--------------------+---------------------+                    |
|                       |                                           |
|                       v                                           |
|              +------------------+                                 |
|              | Claude Sonnet    |                                  |
|              | - Follow-up drafts                                |
|              | - Proposition gen.                                |
|              | - Upsell detection                                |
|              | - Revenue forecast                                |
|              +------------------+                                 |
+------------------------------------------------------------------+
```

| Composant | Technologie | Role |
|-----------|-------------|------|
| Frontend | Next.js PWA | CRM interface, mobile-friendly |
| Backend | Convex | Stockage, cron (follow-ups), real-time |
| IA | Claude Sonnet | Drafts, propositions, insights |
| Email | Gmail API / Microsoft Graph | Import automatique |
| PDF | React-PDF | Generation de propositions |
| Facturation | Integration Stripe / export CSV | Suivi paiements |
| Auth | Clerk | Login |
| Paiement | Stripe | Abonnement SaaS |

---

## Modele Economique

### Pricing

| Plan | Prix | Inclus |
|------|------|--------|
| Gratuit | 0 EUR | 10 clients, suivi basique, pas d'IA |
| Pro | 35 EUR/mois | Illimite, auto follow-up, propositions, previsions |
| Agency | 79 EUR/mois | Pro + multi-freelance, white-label proposals, API |

### Marche Cible

```
+-- TAM / SAM / SOM ----------------------------------------------+
|                                                                  |
|  TAM (Total Addressable Market)                                  |
|  50M+ freelances dans le monde x 35 EUR = 21B EUR/an           |
|                                                                  |
|  SAM (Serviceable Addressable Market)                            |
|  5M freelances tech/creatifs francophones et anglophones        |
|  = 2.1B EUR/an                                                   |
|                                                                  |
|  SOM (Serviceable Obtainable Market - An 3)                      |
|  8 000 abonnes x 35 EUR x 12 = 3.36M EUR/an                   |
|  = 0.16% du SAM                                                 |
+------------------------------------------------------------------+
```

---

## Analyse Concurrentielle

| Concurrent | Cible | Prix | Ce qui manque |
|------------|-------|------|---------------|
| Salesforce | Enterprise | 75+ EUR/user | Complexite insupportable pour solo |
| HubSpot | PME/Startups | 0-800+ EUR/mois | Version gratuite limitee, pro trop cher |
| Pipedrive | Teams vente | 15 EUR/user | Pipeline de vente, pas adapte freelance |
| Bonsai | Freelances | 25 EUR/mois | Basique, pas d'IA, UX datee |
| Hectic | Freelances | 0-24 EUR/mois | Pas d'IA, pas de previsions |
| HoneyBook | Creatifs | 32 EUR/mois | USA-centric, pas d'IA strategique |

```
+-- POSITIONNEMENT ------------------------------------------------+
|                                                                  |
|  Pour equipes <----------------------------> Pour solos         |
|                                                                  |
|  Salesforce [X]                                                  |
|       HubSpot [X]                                                |
|            Pipedrive [X]                                         |
|                                                                  |
|                    HoneyBook [X]                                  |
|                         Bonsai [X]                                |
|                              Hectic [X]                           |
|                                                                  |
|                                    CRM IA FREELANCE [X]          |
|                                    (IA native + solo focus)      |
|                                                                  |
|  Passif <------------------------------------------> Proactif   |
+------------------------------------------------------------------+
```

---

## Roadmap MVP (90 Jours)

### Phase 1 : CRM Base (Jours 1-30)

| Semaine | Livrable |
|---------|----------|
| S1-S2 | CRUD clients + projets + facturation basique |
| S2-S3 | Dashboard revenus (confirme, pipeline, objectif) |
| S3-S4 | Import Gmail (auto-population contacts) |
| S4 | Follow-up engine v1 (regles basiques de timing) |

### Phase 2 : Intelligence (Jours 31-60)

| Semaine | Livrable |
|---------|----------|
| S5-S6 | Auto follow-up IA (Claude drafts) |
| S6-S7 | Generateur de propositions (template + Claude) |
| S7-S8 | Prevision de revenus (simple projection) |
| S8 | Monitoring sante projet (alertes) |

### Phase 3 : Lancement (Jours 61-90)

| Semaine | Livrable |
|---------|----------|
| S9-S10 | Detection upsell + fiche client intelligente |
| S10-S11 | Stripe + plans free/pro |
| S11 | Landing page + demo video |
| S12 | Beta (100 freelances), iteration |

---

## Projections de Revenus

| Periode | Utilisateurs | Abonnes | MRR | ARR |
|---------|-------------|---------|-----|-----|
| Mois 3 | 300 | 30 | 1 050 EUR | 12 600 EUR |
| Mois 6 | 2 000 | 200 | 7 000 EUR | 84 000 EUR |
| Mois 12 | 8 000 | 800 | 28 000 EUR | 336 000 EUR |
| An 2 | 25 000 | 2 500 | 87 500 EUR | 1 050 000 EUR |
| An 3 | 60 000 | 6 000 | 210 000 EUR | 2 520 000 EUR |

### Couts

| Poste | Mois 1-6 | Mois 7-12 |
|-------|----------|-----------|
| Claude API | 300 EUR/mois | 3 000 EUR/mois |
| Gmail API | Gratuit | 100 EUR/mois |
| Infrastructure | 80 EUR/mois | 400 EUR/mois |
| Marketing | 500 EUR/mois | 3 000 EUR/mois |
| **Total** | **880 EUR/mois** | **6 500 EUR/mois** |

### Point de Rentabilite

A 880 EUR de couts : **~25 abonnes Pro**. Atteignable en 6-8 semaines.

---

## Risques et Mitigations

| Risque | Mitigation |
|--------|------------|
| Freelances ne veulent pas payer pour un CRM | Free tier genereux, ROI evident (1 client perdu = 10x le prix) |
| HubSpot lance un mode freelance | Avance IA, specialisation, simplicite |
| Privacy (acces email) | Zero retention, chiffrement, transparence |
| Marche fragmente (pays, devises, fiscalites) | V1 France/EUR, expansion progressive |

---

*Document cree : Mars 2026*
*Categorie : Produit IA - CRM Freelance*
*Statut : Marche massif, sous-servi, rentabilite rapide*
