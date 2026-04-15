# Guide d'Implementation - Explosion Framework

> De l'emotion a l'execution: Le playbook complet pour lancer un mouvement.

---

## Phase 0: Choix de l'Emotion (Semaine 1)

### Decision Framework

```
+------------------------------------------------------------------+
|                    CHOIX DE L'EMOTION PRIMAIRE                    |
+------------------------------------------------------------------+
|                                                                   |
|  QUESTION 1: Qu'est-ce qui me REVOLTE?                           |
|  → Ta colere = ton carburant                                     |
|  → Les banques? Big Tech? Le 9-to-5? L'education?               |
|                                                                   |
|  QUESTION 2: Qu'est-ce que je COMPRENDS que les autres non?      |
|  → Ton avantage unfair                                           |
|  → Tech? Finance? Psychology? Un secteur specifique?             |
|                                                                   |
|  QUESTION 3: A quelle tribu je VEUX appartenir?                  |
|  → Builders? Rebelles? Elites? Createurs? Anonymes?             |
|                                                                   |
|  INTERSECTION = Ton mouvement                                     |
|                                                                   |
+------------------------------------------------------------------+
```

### Mapping Emotion → Execution

| Emotion | Ennemi Naturel | Produit Type | Communaute Type |
|---------|----------------|--------------|-----------------|
| CONTROLE | Big Tech, Gouvernements | Self-hosted, Local-first | Sovereigns, Independents |
| SUPERIORITE | Mediocrite, Mainstream | Certifications, Predictions | Elite clubs, Masterminds |
| APPARTENANCE | Solitude, Isoloment | Communautes, Guildes | Members, Fellows |
| FOMO | Rater le train | Drops, Waitlists | Early adopters, Insiders |
| REBELLION | Le systeme | Alternatives, Manifestes | Resistants, Pirates |
| MYSTERE | L'ennui, Le banal | Experiences, Secrets | Initiates, Seekers |

---

## Phase 1: Foundation (Semaines 2-4)

### 1.1 Creer l'Identite

```
CHECKLIST IDENTITE:
[ ] Nom du mouvement (memorable, pronounceable)
[ ] Nom des membres (___er, ___ist, ___ian)
[ ] Slogan/Tagline (max 7 mots)
[ ] Symbole/Logo (simple, reproductible)
[ ] Couleurs (2-3 max)
[ ] Vocabulaire (5-10 termes uniques)
```

**Exemples:**

| Mouvement | Membres | Slogan | Vocabulaire |
|-----------|---------|--------|-------------|
| Bitcoin | Bitcoiners | "Be your own bank" | HODL, FUD, WAGMI, Sats |
| CrossFit | CrossFitters | "Forging Elite Fitness" | WOD, Box, AMRAP, PR |
| Supreme | Hypebeast | "Born in downtown NYC" | Drop, Cop, L, W |

### 1.2 Definir l'Ennemi

```
CRITERES D'UN BON ENNEMI:
[ ] Assez gros pour etre credible
[ ] Assez flou pour ne pas etre diffamatoire
[ ] Represente une valeur opposee a la tienne
[ ] Les gens peuvent facilement le hair
[ ] Attaquable sans consequences legales

BON: "Big Tech", "Le systeme bancaire", "La pensee mainstream"
MAUVAIS: "Google" (trop specifique), "Jean de la compta" (trop petit)
```

### 1.3 Ecrire le Manifesto

**Structure en 5 parties:**

```
1. LE CONSTAT (Ce qui est casse)
   "Le monde actuel est [probleme]. Les [institutions] nous [verbe negatif]."

2. LA VISION (Ce qu'on merite)
   "Nous croyons en un monde ou [vision positive]."

3. LA SOLUTION (Notre approche)
   "Nous construisons [produit/mouvement] pour [benefice]."

4. L'APPEL (Rejoins-nous)
   "Si tu [condition], tu es des notres."

5. L'URGENCE (Maintenant)
   "Le temps presse. Chaque jour sans agir, [consequence]."
```

---

## Phase 2: MVP du Mouvement (Semaines 4-8)

### 2.1 Landing Page Minimum

```
STRUCTURE LANDING PAGE:

+------------------------------------------------------------------+
|  LOGO + NOM DU MOUVEMENT                                          |
+------------------------------------------------------------------+
|                                                                   |
|  HEADLINE: [Promesse emotionnelle en 7 mots max]                 |
|                                                                   |
|  SUBHEADLINE: [Qui + Quoi + Pourquoi different]                  |
|                                                                   |
|  [       EMAIL INPUT       ] [REJOINDRE LA WAITLIST]             |
|                                                                   |
|  "X personnes sur la waitlist" (social proof)                    |
|                                                                   |
+------------------------------------------------------------------+
|  SECTION: L'Ennemi (ce contre quoi on se bat)                    |
+------------------------------------------------------------------+
|  SECTION: La Vision (le monde qu'on construit)                   |
+------------------------------------------------------------------+
|  SECTION: Qui sommes-nous (manifesto court)                      |
+------------------------------------------------------------------+
|  SECTION: Testimonials (meme inventes au debut)                  |
+------------------------------------------------------------------+
|  [       EMAIL INPUT       ] [REJOINDRE]                         |
+------------------------------------------------------------------+
```

### 2.2 Waitlist Gamifiee

```
MECANIQUE WAITLIST:

1. INSCRIPTION
   → Email capture
   → Position dans la queue (#4,521)
   → Lien de referral unique

2. GAMIFICATION
   → +100 places par referral
   → Leaderboard public
   → Milestones (top 1000, top 100, top 10)
   → Rewards (early access, badge, merch)

3. NURTURING
   → Email bienvenue immediat
   → Email 1: Le manifesto complet
   → Email 2: L'histoire du fondateur (meme anonyme)
   → Email 3: Sneak peek du produit
   → Weekly: "Tu es maintenant #X sur la waitlist"

OUTILS RECOMMANDES:
- Waitlist simple: Waitlist.email, Kickofflabs
- Gamifiee: Viral-loops.com, Gleam.io
- Custom: Convex + Resend
```

### 2.3 Presence Social Minimum

```
SEMAINE 1-4: Twitter/X Setup

[ ] Compte cree (nom du mouvement ou pseudonyme)
[ ] Bio: [Slogan] | [Ce qu'on construit] | [Call to action]
[ ] Header: Visual du mouvement
[ ] Pin tweet: Le manifesto en thread
[ ] 3 tweets/jour:
    - 1x valeur (insight, tip, observation)
    - 1x engagement (question, poll)
    - 1x build in public (progress, behind scenes)

SEMAINE 5-8: Discord Setup

[ ] Serveur cree
[ ] Channels:
    - #manifesto (rules, vision, read-only)
    - #introductions
    - #general
    - #wins (celebrer les victoires)
    - #feedback
[ ] Roles: Founder, Early Supporter, Member
[ ] Verification: Email ou Twitter requis
```

---

## Phase 3: Produit Minimum (Semaines 8-12)

### 3.1 Build le Vehicule

```
PRINCIPE: Le produit est le VEHICULE de l'emotion, pas l'inverse.

QUESTIONS AVANT DE CODER:
[ ] Ce produit delivre-t-il l'emotion choisie?
[ ] Peut-on utiliser le vocabulaire tribal avec?
[ ] Cree-t-il un sentiment d'appartenance?
[ ] Y a-t-il une mecanique de rarete possible?
[ ] Peut-on partager son usage? (social proof naturel)

EXEMPLE:
Emotion: CONTROLE
Produit: Self-hosted AI assistant
Verifions:
- Controle? Oui, c'est sur TON serveur
- Vocabulaire? "Sovereign", "Self-hosted", "Zero cloud"
- Appartenance? "Sovereigns" community
- Rarete? Early access batches
- Partageable? Dashboard screenshot, setup flex
→ VALIDATION OK
```

### 3.2 MVP Features

```
REGLE: 3 features max pour le MVP

FEATURE 1: Core value (70% du temps)
- Ce qui delivre l'emotion principale
- Ce pourquoi les gens payent

FEATURE 2: Community signal (20% du temps)
- Badge, profile, leaderboard
- Ce qui permet de flex

FEATURE 3: Viral loop (10% du temps)
- Referral, share, embed
- Ce qui propage

EXEMPLE Oracle Network:
1. Predictions quotidiennes (core)
2. Track record public + badge (signal)
3. "Share prediction" button (viral)
```

### 3.3 Stack Technique Recommande

```
STACK "MOUVEMENT MAKER":

FRONTEND:
- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)

BACKEND:
- Convex (realtime, serverless)
- Clerk (auth)
- Resend (emails)

PAYMENTS:
- Stripe (subscriptions)
- LemonSqueezy (alternative)

COMMUNAUTE:
- Discord (gratuit, puissant)
- Circle (premium, payant)

ANALYTICS:
- PostHog (open source)
- Plausible (privacy-first)

HOSTING:
- Vercel (frontend)
- Railway (backend si besoin)

TEMPS ESTIME: 4-6 semaines pour MVP
```

---

## Phase 4: Launch (Semaines 12-14)

### 4.1 Pre-Launch (Semaine 12)

```
7 JOURS AVANT:

J-7: Teaser tweet "Something's coming"
J-6: Countdown sur la landing
J-5: Email waitlist "7 jours restants"
J-4: Behind the scenes content
J-3: Reveal du pricing (early bird)
J-2: Testimonials beta testers
J-1: "Demain, tout change"
J-0: LAUNCH
```

### 4.2 Launch Day

```
HEURE PAR HEURE:

06:00 - Wake up, final checks
07:00 - Emails scheduled OK?
08:00 - Disable waitlist, enable signup
09:00 - LAUNCH TWEET (thread)
09:15 - Email blast to waitlist
09:30 - Post on Discord
10:00 - Reddit post (si applicable)
10:30 - Product Hunt (si applicable)
11:00 - LinkedIn post
12:00 - Pause, monitor
14:00 - Reply to tous les commentaires
16:00 - Update thread avec stats
18:00 - Thank you tweet
20:00 - Discord AMA
22:00 - Recap du jour
```

### 4.3 First 100 Customers

```
STRATEGIE "100 FIRST":

SEMAINE 1: Les amis (10-20)
- DM direct aux contacts
- "Hey, je lance X, tu veux etre beta?"
- Pas de pitch, juste l'invitation

SEMAINE 2: La communaute (30-50)
- Discord members qui ont engage
- Twitter followers actifs
- Email opens + clicks

SEMAINE 3: Les referrals (50-100)
- Chaque client = 2 invites gratuites
- Leaderboard des referrers
- Prize pour top referrer

OBJECTIF: 100 clients PAYANTS (meme $1)
= Validation marche
```

---

## Phase 5: Growth (Post-Launch)

### 5.1 Boucle de Contenu

```
CONTENU HEBDOMADAIRE:

LUNDI: Long-form (blog, newsletter)
- Deep dive sur un aspect du mouvement
- 1500-3000 mots
- Partage sur Twitter en thread

MARDI: Engagement
- Poll Twitter
- Question Discord
- AMA informel

MERCREDI: Build in public
- Screenshot metriques
- Behind the scenes
- Wins et fails

JEUDI: Value bomb
- Tutorial, guide, template
- Gratuit, high value
- Lead magnet

VENDREDI: Community spotlight
- Member of the week
- User stories
- Testimonials

WEEKEND: Rest + strategic thinking
```

### 5.2 Mecaniques de Retention

```
BOUCLES DE RETENTION:

1. DAILY HOOKS
   - Daily digest email
   - Daily challenge/prompt
   - Daily leaderboard update

2. WEEKLY RITUALS
   - Weekly call/AMA
   - Weekly newsletter
   - Weekly rewards

3. MONTHLY EVENTS
   - Monthly retrospective
   - Monthly prizes
   - Monthly new feature

4. QUARTERLY MILESTONES
   - Quarterly celebration
   - Quarterly level-up
   - Quarterly roadmap share
```

### 5.3 Monetisation Progressive

```
LADDER DE MONETISATION:

STAGE 1: Validation (0-100 clients)
- Prix bas ($9-29/mois)
- Focus sur feedback
- Pas de profit, juste validation

STAGE 2: Croissance (100-1000 clients)
- Prix moyen ($29-99/mois)
- Tiers differencies
- Upsells intro

STAGE 3: Scale (1000+ clients)
- Premium tier ($199-499/mois)
- Enterprise custom
- Consulting/services

STAGE 4: Diversification
- Communaute payante separee
- Cours/formations
- Events physiques
- Merchandise
```

---

## Phase 6: Scale (Mois 6+)

### 6.1 Embauches Strategiques

```
PREMIERE EMBAUCHE: Community Manager
- Gere Discord/Twitter
- Repond aux questions
- Cree du contenu
- Cout: $2-4K/mois

DEUXIEME EMBAUCHE: Support
- Tickets email
- Onboarding calls
- Documentation
- Cout: $1.5-3K/mois

TROISIEME EMBAUCHE: Dev (si needed)
- Features supplementaires
- Bug fixes
- Scaling
- Cout: $4-8K/mois

REGLE: N'embauche que quand tu es overwhelmed
```

### 6.2 Automatisations

```
AUTOMATISER (par priorite):

1. EMAILS
   - Welcome sequence
   - Onboarding drip
   - Re-engagement
   - Billing (Stripe + Resend)

2. SUPPORT
   - FAQ auto-reply
   - Ticket routing
   - Status updates

3. COMMUNITY
   - Auto-role assignment
   - Welcome messages
   - Milestone celebrations

4. ANALYTICS
   - Weekly reports
   - Churn alerts
   - Usage patterns

OUTILS: Zapier, Make, n8n, Convex actions
```

---

## Checklist Complete

### Pre-Launch

```
FONDATION
[ ] Emotion primaire choisie
[ ] Ennemi defini
[ ] Nom du mouvement
[ ] Nom des membres
[ ] Vocabulaire (5-10 termes)
[ ] Manifesto ecrit
[ ] Logo/visuel cree

PRESENCE
[ ] Landing page live
[ ] Waitlist active
[ ] Twitter compte setup
[ ] Discord serveur pret
[ ] Email sequences ecrites

PRODUIT
[ ] MVP 3 features max
[ ] Pricing defini
[ ] Payment setup (Stripe)
[ ] Onboarding flow

LAUNCH PREP
[ ] Beta testers (10-20)
[ ] Testimonials collectes
[ ] Launch day schedule
[ ] Contingency plan
```

### Post-Launch

```
SEMAINE 1
[ ] 100 signups
[ ] 10 clients payants
[ ] 0 bugs critiques
[ ] Feedback loop active

MOIS 1
[ ] 50 clients payants
[ ] $1K MRR
[ ] Communaute active (50+ membres)
[ ] Contenu regulier

MOIS 3
[ ] 200 clients payants
[ ] $5K MRR
[ ] Premiere embauche
[ ] Product-market fit signals

MOIS 6
[ ] 500 clients payants
[ ] $15K+ MRR
[ ] Equipe de 2-3
[ ] Scaling strategies
```

---

## Templates et Ressources

### Template Email Welcome

```
Subject: Bienvenue chez les [NOM MEMBRES], [PRENOM]

---

Tu viens de rejoindre quelque chose de plus grand qu'un produit.

Tu fais maintenant partie des [NOM MEMBRES] - ceux qui [DESCRIPTION IDENTITE].

Pendant que le reste du monde [CE QUE FAIT LE MAINSTREAM], nous [CE QU'ON FAIT].

Voici ce qui t'attend:

1. [BENEFICE 1]
2. [BENEFICE 2]
3. [BENEFICE 3]

Prochaine etape: [ACTION CLAIRE]

A tres vite,
[SIGNATURE]

P.S. - Si tu as des questions, reponds a cet email. Je lis tout.
```

### Template Thread Launch

```
TWEET 1:
Apres [X] mois de travail, c'est officiel.

[NOM DU PROJET] est live.

[EMOJI] [DESCRIPTION EN UNE LIGNE]

Thread sur pourquoi je l'ai cree et ce que ca va changer:

TWEET 2:
Le probleme:
[DESCRIPTION DU PROBLEME EN 280 CHARS]

TWEET 3:
Ce que j'ai essaye avant:
[SOLUTIONS EXISTANTES ET POURQUOI ELLES SUCKED]

TWEET 4:
La revelation:
[MOMENT EUREKA, POURQUOI C'EST DIFFERENT]

TWEET 5:
Voici [PRODUIT]:
[DESCRIPTION + SCREENSHOT/VIDEO]

TWEET 6:
Pour les premiers [X] jours:
[OFFRE EARLY BIRD]

TWEET 7:
Si ca resonne avec toi, rejoins-nous:
[LIEN]

RT apprecies, chaque partage compte.
```

---

## Metriques a Tracker

### Dashboard Minimum

```
DAILY:
- Signups
- Actifs (DAU)
- MRR
- Churn
- NPS responses

WEEKLY:
- WAU / DAU ratio
- Conversion rate (trial→paid)
- Referral rate
- Content engagement

MONTHLY:
- MRR growth %
- LTV
- CAC
- Payback period
- Community growth
```

### Alerts

```
ALERT SI:
- Churn > 10%/mois
- NPS < 30
- DAU drop > 20%
- Support tickets spike
- Stripe failures
```

---

## Mindset Final

```
+------------------------------------------------------------------+
|                                                                   |
|  RAPPELS QUOTIDIENS:                                             |
|                                                                   |
|  1. L'emotion d'abord, le produit ensuite                        |
|     Le produit est le VEHICULE, pas la destination               |
|                                                                   |
|  2. La communaute EST le moat                                    |
|     Le code peut etre copie, pas la tribu                        |
|                                                                   |
|  3. La controverse calibree amplifie                             |
|     Attaquer les SYSTEMES, pas les PERSONNES                     |
|                                                                   |
|  4. La rarete cree la valeur                                     |
|     Ce qui est rare est desire                                   |
|                                                                   |
|  5. L'identite bat les features                                  |
|     Les gens achetent qui ils deviennent                         |
|                                                                   |
|  6. Ship > Perfect                                               |
|     Un MVP lance > un chef-d'oeuvre jamais sorti                 |
|                                                                   |
|  7. Les 1000 premiers sont les plus durs                         |
|     Apres, ca compound                                           |
|                                                                   |
+------------------------------------------------------------------+
```

---

*Guide cree: Fevrier 2026*
*Framework: Emotion-First Product Design*
*Objectif: Du concept au mouvement en 90 jours*

