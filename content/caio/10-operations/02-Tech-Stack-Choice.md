# Choix de la plateforme technique -- CAIO Academy

> Source de verite sur la stack technique de CAIO Academy. Phase I (MVP, An 1) sur outils SaaS assembles. Phase II (An 2+) custom Next.js quand les 200 etudiants justifient le build. L'audit 2026-04-14 a releve l'absence de choix verrouille, risque de 2 mois de setup tech non budgetise.

---

## Principe directeur : MVP d'abord, custom ensuite

La tentation du founder-builder est de tout coder soi-meme des le Jour 1. Pour CAIO Academy, c'est une erreur strategique. Le premier risque a mitiger n'est pas "l'outil n'est pas assez beau", c'est "le produit ne trouve pas son marche". Chaque journee passee a coder la plateforme plutot qu'a publier sur LinkedIn et a parler aux 15 beta-testeurs est une journee perdue pour la validation commerciale.

La regle est simple : tant que le CA mensuel n'est pas superieur a **€30k recurrent**, on reste sur des outils SaaS assembles. Au-dessus de ce seuil, le gain en experience utilisateur, en marge (fin des abonnements SaaS), et en controle justifient le build custom.

---

## Phase I -- MVP (M1 a M18) : Stack SaaS assemblee

La stack Phase I est composee uniquement d'outils eprouves, largement utilises par les formateurs premium francophones, avec des integrations natives pour limiter le friction technique.

### Paiement et facturation

**Stripe** est la brique centrale. Gestion des paiements one-shot (beta €1,500, formation €3,500), des abonnements recurrents (mastermind €500 et €1,500), des plans de paiement echelonnes (3x et 6x via Stripe Installments). Coût : 1.4% + €0.25 par transaction EU. Integration native avec la quasi totalite des plateformes de formation et de newsletter.

**Pennylane** pour la facturation automatisee et la synchronisation avec l'expert-comptable. Coût : €29/m (plan solo) a €59/m (plan pro). Remplace les exports CSV manuels de Stripe vers Excel.

### Plateforme de formation et communaute

**Circle.so** ou equivalent francophone **Podia** pour heberger la formation (videos, modules, progression), la communaute privee (channels, threads, DMs), et gerer les acces par tier. Circle est le choix recommande car son integration Stripe est excellente et son design est proche des standards 2025. Coût : **$99/m (plan Business)** a **$399/m (plan Enterprise)** quand la communaute depasse 1 000 membres.

Alternative Discord pour la partie communaute gratuite CAIO Network, plus simple pour les early adopters techniques, avec bots d'onboarding et role-based permissions. Le Discord reste en parallele de Circle pendant toute la Phase I pour ne pas fragmenter l'audience existante.

### Newsletter

**Beehiiv** pour "The CAIO Brief" : meilleure deliverabilite que Substack ou Mailchimp sur le marche B2B francophone en 2025, analytics avancees, monetisation possible via sponsorship quand la liste depasse 5 000 abonnes. Coût : **gratuit jusqu'a 2 500 abonnes**, puis **$49/m** (plan Grow) a **$99/m** (plan Scale).

### Landing pages et site public

**Next.js 15 deploye sur Vercel** pour la page d'accueil CAIO Academy, les landing pages par avatar (5 pages), les pages legales (CGV, CGU, Politique de confidentialite). Hebergement gratuit sur Vercel tant que le trafic reste sous 100 GB/mois de bandwidth. Pas besoin de CMS complexe en Phase I : tout est hard-codee en TypeScript, mise a jour par commit GitHub.

### CRM leger

**Airtable** pour tracker les 500 prospects LinkedIn, les candidatures beta, les alumni, les entreprises Registry. Base de donnees visuelle, integration Zapier/Make avec Stripe et Beehiiv. Coût : **gratuit jusqu'a 1 000 records**, puis **$20/m** (plan Team) a **$45/m** (plan Business).

### Workspace operationnel

**Notion** comme workspace central de Gareth : plans strategiques, SOP (Standard Operating Procedures), calendrier editorial LinkedIn, base de connaissance alumni, retrospectives hebdomadaires. Coût : **gratuit (plan Personal Pro)** tant que Gareth reste seul, **$10/m par utilisateur** quand le premier assistant rejoint l'equipe en An 2.

### Automatisation

**Make.com** ou **Zapier** pour connecter Stripe vers Airtable vers Beehiiv vers Circle, automatiser les sequences d'onboarding, les rappels de paiement, les digests hebdomadaires. Coût : **$16-29/m** pour 10 000 operations mensuelles, suffisant en Phase I.

### Video et live calls

**Loom** pour les videos courtes d'onboarding, les debriefs async avec les beta-testeurs, le feedback video personnalise. Coût : **gratuit (plan Starter)** jusqu'a 25 videos, **$12/m** pour illimite.

**Zoom Pro** pour les calls live mastermind (€500/m et Premium €1,500/m), les RDV de qualification, les workshops B2B. Coût : **€13.99/m** pour les meetings jusqu'a 30 heures.

### Budget total Phase I

| Poste | Coût mensuel moyen | Coût annuel |
|-------|---------------------|-------------|
| Stripe (frais transactionnels) | ~€300 | ~€3 600 |
| Pennylane | €59 | €708 |
| Circle.so | $150 (~€140) | €1 680 |
| Beehiiv (apres M6) | $49-99 (~€70) | €840 |
| Vercel | €0 | €0 |
| Airtable | $45 (~€42) | €504 |
| Notion | €0 | €0 |
| Make.com | $29 (~€27) | €324 |
| Loom + Zoom | €26 | €312 |
| **Total** | **~€715/m** | **~€8 000/an** |

Ce budget est largement absorbable des le deuxieme mois d'operation (15 beta x €1,500 = €22 500). La marge brute operationnelle Phase I est estimee a **88-92%**, ce qui laisse une capacite d'investissement massive dans l'acquisition et le contenu.

---

## Phase II -- Custom Next.js + Convex (M18+)

Des que le seuil de **€30k MRR soutenu pendant 3 mois** est franchi (estime M15-M18), le projet bascule sur un build custom. Les raisons sont triples : economie sur les abonnements SaaS (environ €8k/an recuperes), controle total de l'experience utilisateur (design premium aligne sur le positionnement CAIO), et ouverture de fonctionnalites specifiques impossibles en SaaS (Registry backend avec API pour entreprises, dashboard analytics personnalise alumni, outils AI integres pour les etudiants).

### Stack Phase II recommandee

**Frontend et app principale :** Next.js 16+ App Router, TypeScript strict, Tailwind v4, shadcn/ui + Studio Premium, deploiement Vercel. Cette stack est deja celle de Dafnck Studio (client principal de Gareth) et permet de reutiliser les composants et patterns existants.

**Backend et base de donnees :** Convex. Realtime subscriptions pour la communaute, queries reactives pour le dashboard etudiant, mutations transactionnelles pour les paiements, file-based routing pour les fonctions backend. Convex elimine le besoin d'une infrastructure backend classique et convient parfaitement a un produit a volume modere (500-5 000 utilisateurs actifs).

**Authentification :** Clerk. Gestion complete des comptes, des sessions, des magic links, des SSO Google et LinkedIn (critique pour les avatars CAIO), des permissions par tier (tier 1 communaute, tier 2 formation, tier 3 mastermind, tier 3+ Premium). Coût : gratuit jusqu'a 10 000 MAU, puis scalable a partir de $25/m.

**Paiement :** Stripe reste en Phase II, avec Stripe Billing pour les abonnements complexes et les upgrades/downgrades de tier en self-service.

**Community :** Migration progressive depuis Circle vers composants custom sur Next.js + Convex. Forum de discussion avec threads, DMs en realtime, notifications push, integration native avec les modules de formation (commentaires inline par leçon).

**Video :** Mux ou Cloudflare Stream pour l'hebergement des videos de formation, avec DRM light et analytics de watch time par eleve (signal faible de churn).

**Registry backend :** API REST sur Convex exposant les profils certifies anonymisees aux entreprises abonnees. Dashboard entreprise pour chercher par skills, experience, disponibilite. Systeme de brief-to-match automatise.

### Budget Phase II (An 2)

Le coût mensuel d'exploitation tombe a **€150-300/m** (Vercel Pro €20, Convex Pro $25-50, Clerk Pro $25, Mux $50-100, Stripe frais toujours presents), auxquels s'ajoute l'investissement initial de build estime a **€15-30k** (250-500 heures de dev a €60/h si externalise, ou 2-3 mois de temps Gareth si internalise). Ce build se paye en 12-18 mois par les economies SaaS + gain de conversion lie a l'UX premium (hypothese +10-15% de conversion beta vers formation).

---

## Decision matrix Phase I vs Phase II

| Critere | Phase I (SaaS) | Phase II (Custom) |
|---------|----------------|---------------------|
| Time to market | 2-4 semaines | 2-4 mois |
| Coût initial | €0 setup | €15-30k |
| Coût mensuel | €700 | €200 |
| Flexibilite UX | Limitee | Totale |
| Registry API | Impossible | Natif |
| Dependance fournisseur | Elevee | Nulle |
| Dette technique | Nulle | A gerer |
| Recommendation | **An 1** | **An 2+ a partir de €30k MRR** |

---

## Plan de migration Phase I vers Phase II

La migration se fait progressivement sur 3-4 mois, sans disruption du service existant :

Mois 1 : Build du nouveau site public Next.js + landing pages par avatar + migration SEO avec redirections 301. Les inscriptions Stripe restent sur l'infrastructure Phase I.

Mois 2 : Build de l'authentification Clerk et du dashboard etudiant. Les nouveaux inscrits sont crees automatiquement dans les deux systemes (Circle + nouvel app) pendant la periode de transition. Messagerie conservee sur Circle le temps de construire la messagerie native.

Mois 3 : Migration progressive des modules de formation vers le nouveau player video. Les modules deja suivis par les etudiants restent accessibles sur Circle pendant 90 jours pour ne rien casser.

Mois 4 : Lancement du Registry B2B avec API complete. Communication aux premieres entreprises testing partners. Sunset de Circle une fois que tous les utilisateurs actifs ont migre.

---

## Gouvernance des donnees et portabilite

Des la Phase I, toutes les donnees critiques doivent etre exportables en masse pour preparer la Phase II sans vendor lock-in :

- Export quotidien automatise des clients Stripe vers Airtable et Google Drive (backup)
- Export mensuel des membres Circle vers Airtable via Zapier
- Export hebdomadaire des abonnes Beehiiv vers Airtable
- Backup weekly de la base Airtable complete vers un CSV sur Google Drive

Cette hygiene garantit que la migration Phase II ne perd aucune donnee historique et que Gareth reste proprietaire de ses actifs digitaux quels que soient les choix d'outils futurs.

---

*Revision annuelle ou des que le MRR depasse €30k de maniere soutenue.*
