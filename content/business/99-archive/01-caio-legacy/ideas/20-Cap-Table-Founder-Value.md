# Cap Table : Comment Garder le Maximum de ta Boite

> Design de cap table pour maximiser la valeur fondateur.
> Dilution, SAFE, equity, liquidation preferences, vesting.
> Chaque pourcentage compte. Chaque terme compte.

---

## Cap Table : L'Evolution Type

### Du Jour 1 a la Series B

```
+-- EVOLUTION CAP TABLE (SCENARIO TYPE) ---------------------------+
|                                                                    |
|  JOUR 1 : CREATION                                                |
|  [====================================================] 100%     |
|  Fondateur : 100%                                                 |
|                                                                    |
|  APRES ESOP (pool options)                                        |
|  [=============================================]-------] 100%     |
|  Fondateur : 90%    ESOP : 10%                                   |
|                                                                    |
|  APRES SEED (2M EUR a 12M pre-money)                             |
|  [===================================]----]------]      100%     |
|  Fondateur : 75.5%   ESOP : 10%   Seed : 14.3%                  |
|  (14M post-money, 2M/14M = 14.3%)                                |
|                                                                    |
|  APRES SERIES A (10M a 50M pre-money)                             |
|  [============================]---]----]------]         100%     |
|  Fondateur : 60.4%  ESOP: 13%  Seed: 11.4%  A: 16.7%           |
|  (ESOP refresh 3%, dilution proportionnelle)                      |
|                                                                    |
|  APRES SERIES B (25M a 150M pre-money)                            |
|  [======================]---]---]----]------]           100%     |
|  Fondateur : 49.3%  ESOP: 13%  Seed: 9.3%  A: 13.6%  B: 14.3% |
|                                                                    |
+--------------------------------------------------------------------+
```

### Tableau Chiffre

| Etape | Fondateur | ESOP | Seed | Series A | Series B | Valo Post |
|-------|-----------|------|------|----------|----------|-----------|
| Creation | 100% | - | - | - | - | - |
| + ESOP | 90% | 10% | - | - | - | - |
| + Seed (2M) | 75.5% | 10% | 14.3% | - | - | 14M |
| + Series A (10M) | 60.4% | 13% | 11.4% | 16.7% | - | 60M |
| + Series B (25M) | 49.3% | 13% | 9.3% | 13.6% | 14.3% | 175M |

### Valeur de la Part Fondateur a Chaque Etape

| Etape | % Fondateur | Valo Post-Money | Valeur Part Fondateur |
|-------|-------------|-----------------|----------------------|
| Creation | 100% | - | 0 (pas de marche) |
| Seed | 75.5% | 14M EUR | 10.6M EUR |
| Series A | 60.4% | 60M EUR | 36.2M EUR |
| Series B | 49.3% | 175M EUR | 86.3M EUR |

```
INSIGHT CLE :
Ta part diminue en POURCENTAGE (100% -> 49%)
mais augmente en VALEUR (0 -> 86M EUR)

C'EST LA SEULE RAISON DE LEVER :
La dilution est acceptable SI elle multiplie la valeur totale.

REGLE : Ne dilue que si 1% post-levee > 1% pre-levee en valeur.
```

---

## SAFE vs Equity Round

### Qu'est-ce qu'un SAFE

```
SAFE = Simple Agreement for Future Equity

PRINCIPE :
|-- L'investisseur donne de l'argent MAINTENANT
|-- Il recoit des actions PLUS TARD (au prochain round)
|-- Le prix est determine par un CAP (plafond de valorisation)
|-- OU un DISCOUNT (reduction sur le prix du prochain round)
+-- Invente par YC, standard mondial en pre-seed/seed

EXEMPLE :
|-- SAFE de 500K avec un cap de 10M post-money
|-- Au prochain round a 30M post-money :
|   L'investisseur SAFE convertit a 10M (pas 30M)
|   Il obtient 5% (500K / 10M) au lieu de 1.7% (500K / 30M)
+-- L'investisseur est recompense pour avoir pris le risque tot
```

### SAFE vs Equity : Comparaison

| Critere | SAFE | Equity Round |
|---------|------|-------------|
| Complexite | Simple (5 pages) | Complexe (pacte 50+ pages) |
| Cout legal | 0-2K EUR | 10-30K EUR |
| Duree negociation | 1-2 semaines | 2-3 mois |
| Board seat | Non | Souvent oui |
| Droits investisseur | Minimaux | Extensifs |
| Valorisation | Cap (plafond) | Fixe |
| Dilution | Incertaine jusqu'a conversion | Connue immediatement |
| Quand l'utiliser | Pre-seed, petit seed | Seed > 2M, Series A |

### Types de SAFE

| Type | Cap | Discount | Quand |
|------|-----|----------|-------|
| SAFE Post-Money Cap | Oui | Non | Standard YC, le plus courant |
| SAFE Pre-Money Cap | Oui | Non | Europe, plus ancien |
| SAFE Discount Only | Non | 15-25% | Rare, risque pour le fondateur |
| SAFE Cap + Discount | Oui | 15-20% | Le meilleur pour l'investisseur |
| MFN SAFE | Non | Non | Convertit aux termes du prochain SAFE |

```
ATTENTION AUX SAFE POST-MONEY :

SAFE POST-MONEY (style YC) :
|-- La dilution est FIXE et CONNUE
|-- 500K sur un cap de 10M = exactement 5%
|-- Meme si tu leves 3 SAFE de 500K chacun = 15% de dilution
+-- C'est TRANSPARENT mais les SAFE s'empilent

PIEGE : 5 SAFE de 500K avec un cap de 10M = 25% de dilution
AVANT MEME le seed round. Attention a ne pas empiler.
```

---

## Les Termes Toxiques a Eviter

### Liquidation Preferences

```
+-- LIQUIDATION PREFERENCES : LE PIEGE #1 -------------------------+
|                                                                    |
|  DEFINITION : En cas de vente, les investisseurs sont payes       |
|  EN PREMIER, avant le fondateur.                                  |
|                                                                    |
|  1x NON-PARTICIPATING (standard, acceptable) :                    |
|  |-- Investisseur recupere 1x son investissement                  |
|  |-- OU sa part proportionnelle (le plus eleve)                   |
|  |-- Pas les deux                                                 |
|  +-- Alignement fondateur-investisseur                            |
|                                                                    |
|  1x PARTICIPATING (dangereux) :                                    |
|  |-- Investisseur recupere 1x son investissement                  |
|  |-- ET sa part proportionnelle du reste                           |
|  |-- Double-dip : il est paye deux fois                           |
|  +-- Desaligne les interets                                       |
|                                                                    |
|  2x PARTICIPATING (toxique) :                                      |
|  |-- Investisseur recupere 2x son investissement                  |
|  |-- ET sa part proportionnelle du reste                           |
|  +-- REFUSE TOUJOURS                                              |
|                                                                    |
+--------------------------------------------------------------------+
```

### Exemple Chiffre

```
SCENARIO : Vente de la boite a 20M EUR
Investisseur : 3M investis, 20% de la boite

AVEC 1x NON-PARTICIPATING (OK) :
|-- Option A : 1x = 3M EUR
|-- Option B : 20% x 20M = 4M EUR
|-- Il choisit B : 4M EUR
|-- Fondateur (80%) : 16M EUR

AVEC 1x PARTICIPATING (mauvais) :
|-- Etape 1 : 1x = 3M EUR (off the top)
|-- Reste : 17M EUR
|-- Etape 2 : 20% x 17M = 3.4M EUR
|-- Total investisseur : 6.4M EUR
|-- Fondateur : 13.6M EUR (2.4M de moins!)

AVEC 2x PARTICIPATING (toxique) :
|-- Etape 1 : 2x = 6M EUR (off the top)
|-- Reste : 14M EUR
|-- Etape 2 : 20% x 14M = 2.8M EUR
|-- Total investisseur : 8.8M EUR
|-- Fondateur : 11.2M EUR (4.8M de moins!)
```

### Autres Termes a Surveiller

| Terme | Acceptable | Dangereux | Toxique |
|-------|-----------|-----------|---------|
| Liquidation preference | 1x non-participating | 1x participating | 2x+ ou participating |
| Anti-dilution | Broad-based weighted avg | Narrow-based | Full ratchet |
| Board seats | 1 siege investisseur | 2 sieges | Majorite investisseurs |
| Drag-along | Majorite qualifiee (75%+) | Majorite simple | VC seul peut forcer |
| Vesting fondateur | 4 ans, cliff 1 an | 4 ans, cliff 2 ans | Vesting > 4 ans |
| Pro-rata rights | Oui (bon pour alignement) | Excessifs (super pro-rata) | Pay-to-play |
| Information rights | Trimestriel | Mensuel | Hebdomadaire |

---

## Pro-Rata Rights : Aligner les Interets

### Pourquoi c'est BON pour le Fondateur

```
PRO-RATA = Le droit pour un investisseur d'investir dans les
rounds suivants pour maintenir son pourcentage.

POURQUOI C'EST POSITIF :
|-- L'investisseur seed qui a du pro-rata va POUSSER pour
|   que ta Series A reussisse (il veut reinvestir)
|-- Ca cree des investisseurs engages sur le long terme
|-- Ca signale aux autres VCs : "cet investisseur double down"
+-- C'est STANDARD et ATTENDU

QUAND C'EST UN PROBLEME :
|-- Si TROP d'investisseurs ont du pro-rata
|-- Ca "bouffe" l'allocation de la Series A
|-- Le nouveau lead investor n'a pas assez de place
+-- Solution : negocier un cap sur le pro-rata (ex: max 50% du round)
```

---

## Vesting du Fondateur

### Pourquoi Meme le Fondateur Doit Vester

```
OBJECTION : "C'est MA boite, pourquoi vester mes propres actions?"

REPONSE :
|-- Les VCs l'exigent (signal de commitment)
|-- Si tu quittes au bout de 6 mois, tu ne merites pas 100%
|-- Ca protege aussi TOI si tu as un co-fondateur qui part
+-- C'est la norme, pas une punition

STRUCTURE STANDARD FONDATEUR :
|-- 4 ans de vesting total
|-- 1 an de cliff (pas d'actions si tu pars avant 1 an)
|-- Puis vesting mensuel ou trimestriel
|-- Acceleration simple en cas de vente (single trigger)
|   OU double trigger (vente + licenciement)
|
|-- RECOMMANDATION : Double trigger acceleration
|   (tu gardes tout si la boite est vendue ET tu es vire)
```

### Simulation Vesting Fondateur (90% au depart)

| Mois | Actions Vestees | % Fondateur Effectif |
|------|----------------|---------------------|
| 0-12 (cliff) | 0% | 0% (si depart = 0) |
| 12 | 25% = 22.5% | 22.5% |
| 18 | 37.5% = 33.75% | 33.75% |
| 24 | 50% = 45% | 45% |
| 36 | 75% = 67.5% | 67.5% |
| 48 | 100% = 90% | 90% (full) |

---

## ESOP : Le Pool d'Options

### Dimensionnement

| Stage | Taille ESOP Recommandee | Pour Qui |
|-------|------------------------|----------|
| Creation | 10-15% | Reserve pour futurs employees |
| Seed | 10-15% (refresh 3-5% si deja entame) | Premiers employes cles |
| Series A | 15-20% total | Management + ingenieurs seniors |
| Series B | 15-20% total | Refresh pour retention |

### Allocation Type ESOP

| Role | % Typique (en seed) | Vesting |
|------|---------------------|---------|
| Premier employe (senior) | 1-3% | 4 ans, cliff 1 an |
| Ingenieur senior (#2-5) | 0.5-1.5% | 4 ans, cliff 1 an |
| Ingenieur junior | 0.1-0.5% | 4 ans, cliff 1 an |
| Designer senior | 0.3-1% | 4 ans, cliff 1 an |
| Head of Marketing | 0.5-1.5% | 4 ans, cliff 1 an |
| Advisor | 0.25-0.5% | 2 ans, cliff 6 mois |

```
PIEGE ESOP :

Les VCs veulent que l'ESOP soit cree AVANT leur investissement.
Ca veut dire que la dilution ESOP est supportee par LE FONDATEUR SEUL.

EXEMPLE :
|-- Pre-ESOP : Fondateur 100%
|-- Creation ESOP 15% : Fondateur 85%
|-- Seed 15% : Fondateur 72.25% (85% x 85%)
|
|-- Si ESOP etait cree APRES le seed :
|-- Fondateur 85% (seed)
|-- ESOP 15% dilue tout le monde : Fondateur 72.25%, VC 12.75%
|-- Meme resultat pour le fondateur, mais le VC est aussi dilue
|
|-- LES VCs INSISTENT pour que ce soit AVANT = tu paies la dilution
|-- NEGOCIE : ESOP le plus petit possible en seed (10%), refresh en A
```

---

## Simulateur Cap Table

### Scenario Gareth : Du Jour 1 a l'Exit

```
+-- SIMULATION COMPLETE --------------------------------------------+
|                                                                    |
|  CREATION (SASU)                                                  |
|  Gareth : 10 000 actions = 100%                                   |
|                                                                    |
|  + ESOP (10%)                                                     |
|  Gareth : 10 000 = 90.9%                                         |
|  ESOP : 1 000 = 9.1%                                             |
|  Total : 11 000 actions                                           |
|                                                                    |
|  + SEED (2M EUR, 12M pre-money = 14M post-money)                 |
|  Nouvelles actions : 11 000 x (2/12) = 1 833                     |
|  Gareth : 10 000 = 77.9%                                         |
|  ESOP : 1 000 = 7.8%                                             |
|  Seed : 1 833 = 14.3%                                            |
|  Total : 12 833 actions                                           |
|                                                                    |
|  + SERIES A (8M EUR, 45M pre-money = 53M post-money)             |
|  + ESOP refresh 5%                                                |
|  Nouvelles actions ESOP : 675 (5% du nouveau total)              |
|  Nouvelles actions Series A : 2 034 (15.1%)                      |
|  Gareth : 10 000 = 64.3%                                         |
|  ESOP : 1 675 = 10.8%                                            |
|  Seed : 1 833 = 11.8%                                            |
|  Series A : 2 034 = 13.1%                                        |
|  Total : 15 542 actions                                           |
|                                                                    |
|  EXIT A 100M EUR                                                  |
|  (1x non-participating, pas de preference exotique)               |
|  Gareth : 64.3% x 100M = 64.3M EUR                              |
|  ESOP : 10.8% x 100M = 10.8M EUR                                |
|  Seed : 11.8% x 100M = 11.8M EUR (5.9x retour)                 |
|  Series A : 13.1% x 100M = 13.1M EUR (1.6x retour)             |
|                                                                    |
|  EXIT A 500M EUR                                                  |
|  Gareth : 64.3% x 500M = 321.5M EUR                             |
|                                                                    |
+--------------------------------------------------------------------+
```

---

## Les Regles d'Or du Cap Table

| Regle | Detail |
|-------|--------|
| 1. Ne jamais depasser 25% de dilution en seed | Tu dois garder 70%+ apres le seed |
| 2. ESOP petit au debut, refresh ensuite | 10% au seed, refresh 3-5% a chaque round |
| 3. Eviter les cap tables complexes | Plus de 5 lignes en seed = red flag |
| 4. 1x non-participating uniquement | Tout le reste est toxique |
| 5. Pro-rata oui, super pro-rata non | Alignement sans bloquer les futurs rounds |
| 6. Vesting fondateur standard | 4 ans cliff 1 an, double trigger acceleration |
| 7. Pas de dette convertible a interet compose | Ca s'empile et te dilue silencieusement |
| 8. Un seul lead investor par round | Trop de chefs = ingerance |
| 9. Board : fondateur + 1 VC + 1 independant | Garder le controle du board |
| 10. Documenter TOUT | Chaque action, chaque SAFE, chaque BSA |

---

## Outils de Gestion Cap Table

| Outil | Cout | Usage |
|-------|------|-------|
| Carta | Gratuit -> 2 500 USD/an | Standard US, cap table + equity management |
| Ledgy | Gratuit -> 1 200 EUR/an | Standard Europe, BSPCE compatible |
| Capdesk | Gratuit -> 600 EUR/an | UK/Europe |
| Google Sheets | Gratuit | Suffisant en pre-seed, pas apres |
| SeedLegals (UK) | Pay-per-use | Docs legaux + cap table basique |

---

## Actions pour Gareth

| Priorite | Action | Quand |
|----------|--------|-------|
| 1 | Creer un Google Sheet cap table (avant toute levee) | Maintenant |
| 2 | Definir ESOP pool a 10% | A la creation SAS |
| 3 | Si SAFE : utiliser le template YC post-money | Au premier angel |
| 4 | Prendre un avocat startup AVANT de signer | Au premier term sheet |
| 5 | Migrer vers Ledgy des que > 3 lignes au cap table | Seed round |
| 6 | Negocier 1x non-participating systematiquement | Chaque round |
| 7 | Mettre en place le vesting fondateur | Au seed |
| 8 | Documenter chaque emission d'actions | Toujours |

---

## Glossaire Rapide

| Terme | Definition |
|-------|-----------|
| Pre-money | Valorisation AVANT l'investissement |
| Post-money | Valorisation APRES l'investissement (pre + montant leve) |
| Dilution | Reduction du % de chaque actionnaire apres emission de nouvelles actions |
| SAFE | Simple Agreement for Future Equity (convertit plus tard) |
| ESOP | Employee Stock Option Pool (reserve pour l'equipe) |
| Cliff | Periode avant laquelle aucune action ne veste |
| Vesting | Acquisition progressive des actions sur une periode |
| Liquidation preference | Priorite de paiement en cas de vente |
| Pro-rata | Droit de reinvestir pour maintenir son % |
| Anti-dilution | Protection de l'investisseur contre les down rounds |
| Full ratchet | Anti-dilution agressive (TOXIQUE) |
| Drag-along | Droit de forcer tous les actionnaires a vendre |
| Tag-along | Droit de vendre aux memes conditions que les autres |

---

*Cap Table Guide v1.0 -- Mars 2026*
*"Chaque pourcentage que tu donnes, tu ne le recuperes jamais."*
