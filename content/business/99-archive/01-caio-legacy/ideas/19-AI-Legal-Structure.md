# Structure Juridique IA : SAS, Ltd, ou C-Corp ?

> Comparaison pratique des structures juridiques pour une startup IA.
> Recommandation personnalisee pour Gareth, avec chiffres concrets.

---

## Vue d'Ensemble : Les 3 Options

```
+-- COMPARAISON RAPIDE --------------------------------------------+
|                                                                    |
|  SAS (France)          Ltd (UK)           C-Corp (Delaware, US)   |
|  +--------------+      +--------------+   +--------------+        |
|  | JEI + CIR    |      | Simple, cheap|   | VCs US adorent|       |
|  | Aides massives|     | 19-25% IS    |   | YC obligatoire|       |
|  | Charges hautes|     | Post-Brexit  |   | Double taxe   |       |
|  | Admin lourde  |      | Pas de CIR   |   | Compliance $$ |       |
|  +--------------+      +--------------+   +--------------+        |
|                                                                    |
|  RECOMMANDE POUR       RECOMMANDE POUR    RECOMMANDE POUR         |
|  Debut en France       Marche UK/global   Levee US, YC            |
|  Avec aides publiques  Equipe anglophone  Series A+ US            |
|                                                                    |
+--------------------------------------------------------------------+
```

---

## Option 1 : SAS en France

### Structure

| Parametre | Detail |
|-----------|--------|
| Forme juridique | Societe par Actions Simplifiee (SAS) |
| Capital minimum | 1 EUR (mais 1 000 - 10 000 EUR recommande) |
| Nombre d'associes | 1 minimum (SASU si solo) |
| Dirigeant | President (mandataire social) |
| Statuts | Librement rediges (grande flexibilite) |
| Immatriculation | Greffe du Tribunal de Commerce |
| Cout de creation | 500-2 000 EUR (en ligne) ou 3 000-5 000 EUR (avec avocat) |

### Fiscalite

| Impot/Charge | Taux | Detail |
|-------------|------|--------|
| Impot sur les societes (IS) | 15% (< 42.5K) puis 25% | Taux reduit PME |
| Charges sociales (president) | ~45% du salaire brut | 65% si dividendes > 10% du capital |
| TVA | 20% | Franchise TVA si CA < 36.8K |
| CFE | Variable | Cotisation fonciere des entreprises |
| CVAE | Variable | Si CA > 500K |

### Avantages Specifiques : JEI + CIR

```
+-- STATUT JEI (JEUNE ENTREPRISE INNOVANTE) -----------------------+
|                                                                    |
|  CONDITIONS :                                                      |
|  |-- Enterprise de moins de 8 ans                                 |
|  |-- PME (< 250 salaries, CA < 50M EUR)                          |
|  |-- 15% minimum des charges en R&D                               |
|  |-- Detenue a 50%+ par des personnes physiques                   |
|  |-- Activite reellement nouvelle                                 |
|                                                                    |
|  AVANTAGES :                                                       |
|  |-- Exoneration charges sociales 50% pendant 8 ans              |
|  |   (sur salaires des chercheurs/ingenieurs)                     |
|  |-- Exoneration IS : 100% annee 1, 50% annee 2                  |
|  |-- Exoneration CFE et CVAE                                     |
|  +-- Exoneration taxe fonciere (si proprietaire)                  |
|                                                                    |
|  CALCUL POUR UNE STARTUP IA :                                     |
|  |-- Salaire brut ingenieur : 50K EUR/an                         |
|  |-- Charges normales : ~22 500 EUR                               |
|  |-- Charges avec JEI : ~11 250 EUR                               |
|  |-- Economie par ingenieur : ~11 250 EUR/an                     |
|  +-- Pour 3 ingenieurs : ~33 750 EUR/an d'economie               |
|                                                                    |
+--------------------------------------------------------------------+

+-- CREDIT IMPOT RECHERCHE (CIR) ----------------------------------+
|                                                                    |
|  PRINCIPE :                                                        |
|  |-- 30% des depenses de R&D remboursees par l'Etat              |
|  |-- Pour les 100 premiers millions de depenses R&D              |
|  |-- Remboursable IMMEDIATEMENT pour les PME de moins de 2 ans   |
|                                                                    |
|  DEPENSES ELIGIBLES :                                              |
|  |-- Salaires des chercheurs/ingenieurs R&D                      |
|  |-- Amortissement du materiel de recherche                       |
|  |-- Sous-traitance R&D (labos agrees, max 3x le salaire)       |
|  |-- Frais de brevets                                             |
|  |-- Veille technologique (jusqu'a 60K EUR)                      |
|                                                                    |
|  CALCUL POUR UNE STARTUP IA (1 fondateur + 2 ingenieurs) :       |
|  |-- Salaires R&D : 150K EUR                                     |
|  |-- Frais de fonctionnement forfaitaires : 75K EUR (50%)        |
|  |-- Total assiette : 225K EUR                                   |
|  |-- CIR = 30% x 225K = 67 500 EUR/an                           |
|  +-- REMBOURSE EN CASH si PME < 2 ans                            |
|                                                                    |
+--------------------------------------------------------------------+
```

### Economie Totale SAS + JEI + CIR (Annee 1)

| Source d'Economie | Montant |
|-------------------|---------|
| CIR (30% R&D) | 67 500 EUR |
| JEI charges sociales | 33 750 EUR |
| JEI exoneration IS | Variable (100% an 1) |
| Bourse French Tech (one-shot) | 30 000 EUR |
| **TOTAL** | **~131 250 EUR/an** |

---

## Option 2 : Ltd au Royaume-Uni

### Structure

| Parametre | Detail |
|-----------|--------|
| Forme juridique | Private Company Limited by Shares (Ltd) |
| Capital minimum | 1 GBP |
| Nombre de directeurs | 1 minimum |
| Immatriculation | Companies House |
| Cout de creation | 12-50 GBP (en ligne) |
| Delai | 24-48 heures |

### Fiscalite

| Impot/Charge | Taux | Detail |
|-------------|------|--------|
| Corporation Tax | 19% (< 50K profit) a 25% (> 250K) | Marginal relief entre 50K-250K |
| Employer NI | 13.8% au-dessus de 9 100 GBP | Charges sociales employeur |
| TVA (VAT) | 20% | Seuil enregistrement : 90K GBP |
| Dividendes (personnel) | 8.75% - 39.35% | Selon tranche |

### Avantages

| Avantage | Detail |
|----------|--------|
| Simplicite administrative | Companies House efficient, tout en ligne |
| Charges sociales basses | 13.8% vs 45% en France |
| EIS/SEIS | Avantage fiscal pour les investisseurs (pas la startup) |
| Ecosysteme London | Plus de VCs, plus international |
| Langue anglaise | Naturel pour le marche global |

### Inconvenients

| Inconvenient | Impact |
|--------------|--------|
| Pas de CIR equivalent | Perte de ~67K EUR/an vs France |
| Post-Brexit | Complications visa, acces marche EU |
| Pas de JEI | Pas d'exoneration charges sociales |
| IR-35 | Complexite si tu es aussi contracteur |
| Cout de la vie Londres | 1.5-2x Paris |

---

## Option 3 : C-Corp au Delaware (USA)

### Structure

| Parametre | Detail |
|-----------|--------|
| Forme juridique | Delaware C Corporation |
| Incorporation | Delaware Division of Corporations |
| Agent enregistre | Obligatoire (150-300 USD/an) |
| Cout de creation | 89 USD (state) + 500-1500 USD (Stripe Atlas) |
| Delai | 1-3 jours |

### Fiscalite

| Impot/Charge | Taux | Detail |
|-------------|------|--------|
| Federal Corporate Tax | 21% | Flat rate |
| Delaware Franchise Tax | 175-200K USD/an | Selon methode de calcul |
| State Income Tax | 0% (Delaware) | Mais nexus dans d'autres etats |
| FICA (charges sociales) | 7.65% employer + 7.65% employee | Social Security + Medicare |
| Double taxation | Oui | US + France si resident fiscal francais |

### Stripe Atlas : La Voie Rapide

| Inclus dans Stripe Atlas | Cout |
|--------------------------|------|
| Incorporation Delaware | 500 USD (one-time) |
| Agent enregistre (1 an) | Inclus |
| EIN (numero fiscal) | Inclus |
| Compte bancaire (Mercury) | Inclus |
| Cap table (Carta) | Inclus |
| Templates legaux | Inclus |
| Renouvellement annuel | 100 USD/an |

### Quand C'est Necessaire

```
TU AS BESOIN D'UN C-CORP SI :
|-- Tu candidats a Y Combinator (obligatoire)
|-- Tu leves aupres de VCs americains (95% exigent un C-Corp)
|-- Tu as des clients US significatifs
|-- Tu veux des stock options US (ISO)
+-- Tu prevois une exit aux US

TU N'AS PAS BESOIN D'UN C-CORP SI :
|-- Tu restes en Europe
|-- Tu leves aupres de VCs europeens uniquement
|-- Tu es solo et bootstrapped
+-- Ton marche est europeen
```

---

## Comparaison Chiffree (Scenario : 1 Fondateur, 2 Ingenieurs, 150K EUR Salaires R&D)

| Poste | SAS (France) | Ltd (UK) | C-Corp (US) |
|-------|-------------|----------|-------------|
| Charges sociales (3 pers.) | 67 500 EUR | 20 700 EUR | 11 475 EUR |
| Avec JEI (-50% charges) | 33 750 EUR | N/A | N/A |
| Impot societes (sur 50K profit) | 7 500 EUR | 9 500 GBP | 10 500 USD |
| CIR (remboursement) | -67 500 EUR | 0 | 0 |
| Cout admin annuel | 5 000 EUR | 2 000 GBP | 3 000 USD |
| **Cout net annuel** | **-21 250 EUR** | **32 200 GBP** | **24 975 USD** |

```
RESULTAT :

SAS + JEI + CIR = TU RECOIS DE L'ARGENT (-21K EUR)
L'Etat francais te PAIE pour faire de la R&D.

Ltd UK = Tu paies 32K GBP
C-Corp US = Tu paies 25K USD

LA SAS GAGNE DE 50-55K EUR par rapport aux alternatives.
Sur 3 ans = 150-165K EUR d'avantage cumule.
```

---

## La Strategie du "Flip"

### SAS Maintenant, C-Corp Plus Tard

```
+-- STRATEGIE RECOMMANDEE POUR GARETH -----------------------------+
|                                                                    |
|  ANNEE 1-2 : SAS EN FRANCE                                       |
|  |-- Profiter du JEI + CIR (130K+ EUR/an d'aides)               |
|  |-- Construire le produit avec le maximum de cash                |
|  |-- Pas de complication internationale                           |
|  +-- Revenue a 30K+ MRR                                          |
|                                                                    |
|  ANNEE 2-3 : EVALUER                                              |
|  |-- Si levee US necessaire : flip en C-Corp Delaware             |
|  |-- Si levee EU suffisante : rester en SAS                       |
|  |-- Si bootstrap : rester en SAS (aides = cash gratuit)          |
|                                                                    |
|  FLIP = CREER C-CORP US QUI ACQUIERT LA SAS                      |
|  |-- La C-Corp US devient la holding                              |
|  |-- La SAS FR devient filiale (garde le CIR + JEI)              |
|  |-- Les VCs US investissent dans la C-Corp                       |
|  |-- Cout du flip : 15 000 - 50 000 EUR (avocats)               |
|  +-- Duree : 2-4 mois                                            |
|                                                                    |
+--------------------------------------------------------------------+
```

---

## Protection de la Propriete Intellectuelle

### Brevets

| Type | Cout | Delai | Utile pour |
|------|------|-------|------------|
| Brevet francais (INPI) | 3 000-8 000 EUR | 18-24 mois | Protection France |
| Brevet europeen (OEB) | 15 000-30 000 EUR | 3-5 ans | Protection Europe |
| Brevet US (USPTO) | 10 000-25 000 USD | 2-4 ans | Protection US |
| PCT (international) | 5 000-10 000 EUR | 30 mois puis national | Reserve des droits mondiaux |

```
POUR UNE STARTUP IA :
|-- Les brevets sur les ALGORITHMES sont difficiles (mais pas impossibles)
|-- Les brevets sur les METHODES (workflow, pipeline) sont plus faciles
|-- Le SECRET COMMERCIAL est souvent plus efficace que le brevet
|-- Les VCs aiment voir des brevets (signal de defensibilite)
+-- RECOMMANDATION : deposer 1-2 brevets methode, garder le reste en secret
```

### Marques

| Action | Cout | Delai |
|--------|------|-------|
| Marque francaise (INPI) | 190 EUR (1 classe) | 5-6 mois |
| Marque europeenne (EUIPO) | 850 EUR (1 classe) | 5-6 mois |
| Marque US (USPTO) | 250-350 USD | 8-12 mois |

### RGPD : Considerations IA

| Obligation | Detail | Action |
|-----------|--------|--------|
| Base legale | Consentement ou interet legitime | Consentement explicite pour donnees personnelles |
| Droit a l'effacement | L'utilisateur peut demander suppression | Implementer un pipeline de deletion |
| Portabilite | L'utilisateur peut exporter ses donnees | API d'export en JSON |
| DPO | Obligatoire si traitement a grande echelle | Externaliser (2-5K EUR/an) |
| AIPD | Analyse d'Impact si risque eleve | Document de 20-50 pages |
| Transparence IA | Expliquer les decisions automatisees | Interface "pourquoi cette recommandation" |

---

## BSA/BSPCE : Interesser l'Equipe

### Comparaison

| Instrument | BSPCE | BSA | Stock Options (US) |
|-----------|-------|-----|---------------------|
| Beneficiaires | Salaries, mandataires | Tous (advisors, freelances) | Employees |
| Fiscalite | Flat tax 30% | Revenu + plus-value | AMT risk + capital gains |
| Cout d'attribution | Quasi-nul | Prix d'emission | Strike price |
| Conditions | SAS < 15 ans, 25%+ personnes physiques | Aucune | C-Corp |
| Vesting standard | 4 ans, cliff 1 an | Variable | 4 ans, cliff 1 an |
| Pool recommande | 10-15% | 2-5% pour advisors | 10-20% |

---

## Recommandation Finale pour Gareth

```
+-- DECISION ARBRE -------------------------------------------------+
|                                                                    |
|  ES-TU SEUL ET BOOTSTRAPPED?                                     |
|  |-- OUI --> SASU (SAS Unipersonnelle) + JEI                     |
|  |           |                                                    |
|  |           AS-TU 15%+ DE R&D?                                  |
|  |           |-- OUI --> CIR en plus (67K+ EUR/an)              |
|  |           +-- NON --> Augmente la R&D pour qualifier          |
|  |                                                                |
|  |-- NON (tu as un associe) --> SAS + JEI + CIR                 |
|                                                                    |
|  DANS 18-24 MOIS :                                                |
|  |                                                                |
|  LEVES-TU AUX US?                                                |
|  |-- OUI --> Flip en C-Corp Delaware (garder SAS comme filiale)  |
|  +-- NON --> Rester en SAS, profiter des aides                   |
|                                                                    |
+--------------------------------------------------------------------+

RESUME POUR GARETH :
1. Creer une SASU maintenant (1-2 semaines)
2. Demander le statut JEI (1-2 mois)
3. Preparer le CIR avec expert-comptable (trimestre 1)
4. Deposer marque EUIPO (850 EUR)
5. Evaluer le flip C-Corp dans 18-24 mois
```

### Budget Juridique Initial

| Poste | Cout |
|-------|------|
| Creation SASU (en ligne, type Legalstart) | 500-800 EUR |
| Expert-comptable (CIR + JEI) | 200-400 EUR/mois |
| Depot marque EUIPO | 850 EUR |
| Assurance RC Pro | 300-600 EUR/an |
| **Total annee 1** | **~5 000 EUR** |

---

*Structure Juridique IA v1.0 -- Mars 2026*
*Disclaimer : Ceci n'est pas un avis juridique. Consulter un avocat specialise en droit des startups.*
