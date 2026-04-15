# Metrics Dashboard hebdomadaire -- CAIO Academy

> Source de verite des KPIs operationnels weekly et monthly. Chaque vendredi 17h, Gareth (puis l'equipe en An 2) compile ces metriques et les compare aux cibles. Si une metrique est dans le rouge pendant 2 semaines consecutives, declenchement d'un plan de recovery specifique.

---

## Pourquoi un dashboard hebdomadaire et pas mensuel

Les revues mensuelles sont trop tardives. En 30 jours, une derive d'audience ou de conversion devient une situation critique. La cadence hebdomadaire capture les signaux faibles 4x plus tot et permet d'ajuster le message, le rythme ou le funnel avant que la perte soit structurelle. La revue mensuelle existe aussi mais sert a la synthese strategique, pas a l'operationnel.

---

## KPIs hebdomadaires -- TOP OF FUNNEL

| Metrique | Cible An 1 | Source | Commentaire |
|----------|-----------|--------|-------------|
| Impressions LinkedIn cumulees (7j) | 50k minimum | LinkedIn Analytics | Au moins 5k par post, 3 posts par semaine |
| Nouveaux abonnes LinkedIn (7j) | +20 minimum | LinkedIn Analytics | Growth organique sans ads |
| Engagement rate moyen par post | 5%+ | LinkedIn Analytics | Si <3% pendant 3 semaines = signal rouge |
| Visites landing CAIO Academy (7j) | 200 minimum M4+ | Vercel Analytics + Plausible | Trafic total toutes pages |
| Nouveaux abonnes newsletter (7j) | +30 minimum M4+ | Beehiiv | Incluant referral si actif |
| Visiteurs YouTube / Podcast (7j) | +50 minimum M9+ | YouTube Analytics | Apres lancement canal secondaire |

---

## KPIs hebdomadaires -- MIDDLE OF FUNNEL

| Metrique | Cible An 1 | Source | Commentaire |
|----------|-----------|--------|-------------|
| DMs envoyes (7j) | 10 qualifies | Airtable tracker manuel | Personnalises, vers avatars CTO SaaS + Consultant AI |
| Taux de reponse DMs | 30%+ | Airtable | Si <15% = pivot du script |
| RDV qualification realises (7j) | 2 minimum | Calendly + Airtable | 30 minutes chacun |
| Candidatures beta recues (pendant recruitment) | Phase 2 : 5+/sem | Typeform ou Airtable form | Qualite > quantite |
| Taux ouverture newsletter | 40%+ | Beehiiv | Benchmark B2B premium |
| CTR newsletter vers landing | 8%+ | Beehiiv | Indicateur d'engagement profond |

---

## KPIs hebdomadaires -- BOTTOM OF FUNNEL

| Metrique | Cible An 1 | Source | Commentaire |
|----------|-----------|--------|-------------|
| Ventes beta €1,500 (Phase 2 Mois 5-6) | 3-5 / sem | Stripe | 15 au total en 3-4 semaines |
| Ventes Formation €3,500 (Mois 7+) | 2 / sem minimum | Stripe | Cumul objectif 48 en 6 mois |
| Nouveaux membres Mastermind €500 | 1 / sem minimum | Stripe | Apres Mois 7 |
| Nouveaux membres Mastermind Premium €1,500 | A partir Mois 10 | Stripe | 1 par mois initial |
| Abonnements Communaute €67/m | 5 nouveaux / sem | Stripe | Signal faible d'engagement |

---

## KPIs hebdomadaires -- RETENTION ET SANTE

| Metrique | Cible | Source | Commentaire |
|----------|-------|--------|-------------|
| Churn Communaute €67/m (mensuel) | <8% | Stripe | Si >10% pendant 2 mois = revoir valeur |
| Churn Mastermind €500/m | <5% | Stripe | Tres critique pour projections An 2+ |
| Presence aux calls mastermind | 70%+ | Zoom reports | Indicateur avance de churn |
| NPS mensuel cohorte active | 8+/10 | Typeform mensuel | Score <7 = probleme structurel |
| Ticket support email (delai reponse moyen) | <24h | Gmail tracker | Experience utilisateur |
| Taux de completion formation (alumni) | 60%+ | Circle / Next.js analytics | Benchmark industrie : 40-50% |

---

## KPIs financiers hebdomadaires

| Metrique | Cible | Source |
|----------|-------|--------|
| CA brut (7j) | Variable par phase | Stripe dashboard |
| MRR en fin de semaine | Cumul mastermind + communaute | Stripe + Pennylane |
| Cash sur compte pro Qonto | >6 mois charges fixes | Qonto dashboard |
| Frais Stripe cumulatif (7j) | <2.5% du CA | Stripe |

---

## KPIs strategiques mensuels

Ces metriques sont revues une fois par mois, le dernier vendredi du mois a 17h, avec une revue comparative vs mois precedent et vs objectifs trimestriels.

| Metrique | Cible An 1 | Source |
|----------|-----------|--------|
| Taille liste newsletter | 500 M3, 1 000 M6, 1 500 M9, 1 920 M12 | Beehiiv |
| Abonnes LinkedIn | 3k M3, 5k M6, 7k M9, 10k M12 | LinkedIn |
| MRR total (communaute + mastermind) | 2k M6, 8k M9, 15k M12 | Stripe |
| CAC moyen formation (calcule) | <€200 | Formule manuelle |
| LTV/CAC ratio | >20x | Formule manuelle |
| Taux de conversion newsletter vers formation | 2.5% | Beehiiv + Stripe croise |
| Taux de conversion beta vers formation | 50% | Airtable + Stripe |
| Alumni qui ont monetise leur formation (declaratif) | 30% M12 | Survey trimestriel |

---

## Dashboard format

Le dashboard est tenu dans une page Notion dediee, accessible par Gareth et l'equipe. Format : une table par categorie (TOP, MIDDLE, BOTTOM, RETENTION, FINANCE), une colonne par semaine des 8 dernieres semaines, code couleur vert/orange/rouge selon proximite de la cible. Mise a jour chaque vendredi 17h par Gareth (ou le Community Manager en An 2) en maximum 30 minutes grace aux automations Zapier/Make vers Airtable.

Une capture PDF du dashboard est archivee chaque mois dans `02-vision/execution-plans/archives/` pour suivi historique et analyse retrospective.

---

## Signaux d'alerte et plans de recovery

| Signal rouge | Duree avant action | Action |
|--------------|---------------------|--------|
| Engagement LinkedIn <3% par post | 3 semaines | Revue editorial line, A/B test nouveaux formats |
| 0 nouvelle vente formation | 2 semaines | Activation DMs intenses + revue pricing |
| Churn mastermind >8% | 1 mois | Save calls immediats, revue valeur delivree |
| NPS <7 | 1 mesure | Interviews 5 membres, identification cause racine |
| CAC >€500 | 1 mois | Audit funnel, revue qualite des leads |
| Cash <3 mois charges | Immediat | Gel des investissements non-essentiels |

---

## Ritual de revue

**Vendredi 17h-17h30 :** compilation des chiffres, mise a jour Notion, identification des 3 priorites de la semaine suivante.

**Vendredi 17h30-18h :** redaction d'un mini-rapport de 5 lignes pour le Journal Operations (Notion), avec les wins de la semaine, les alertes actives, et les decisions a prendre.

**Premier vendredi du mois :** revue strategique etendue (1h30), analyse des tendances, ajustements des cibles trimestrielles si necessaire.

**Fin de trimestre :** revue complete de 3h, documentation des leçons apprises dans `.orchestrator/decisions.md`, planification du trimestre suivant.

---

*Document operationnel vivant. Mise a jour hebdomadaire de la section KPIs, revision structurelle trimestrielle.*
