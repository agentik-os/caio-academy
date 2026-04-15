# Formation — Le Stack Agentik : Setup, Build & Ship

## De Zero a un Dashboard en Production avec Next.js 16, Convex, Clerk, Stripe & Claude Code

## Instructions pour l'Agent Createur de Formation

> **Objectif** : Générer LA formation definitive sur la mise en place et l'utilisation du stack de production exact qu'Agentik OS utilise pour tous ses projets clients. L'eleve part d'un dossier vide et arrive a un dashboard entierement deploye, authentifie, avec paiements actifs — puis apprend le pipeline produit complet (vision → PRD → brand → UX → plan → build → verify) pour livrer des produits avec Claude Code qui orchestre tout.
>
> **Ton** : Hands-on, étape par étape, zero ambiguite. Chaque instruction est prête a copier-coller. Captures d'ecran recommandees a chaque étape. L'eleve ne doit JAMAIS se demander "et maintenant ?"
>
> **Format** : Chaque module = screencast video + guide étape par étape + snippets de code + checklist de verification. Pas de theorie sans pratique.
>
> **Duree estimee** : 40-55 heures de contenu. 8-10 semaines pour completer.
>
> **Prix** : $697 seul / inclus dans le bundle premium

---

## Identite de la Formation

| Champ | Valeur |
|-------|--------|
| Nom | **Le Stack Agentik — Setup, Build & Ship** |
| Sous-titre | Le stack de production exact et le pipeline derriere Agentik OS — d'un dossier vide a un produit deploye |
| Createur | Gareth Simono — Fondateur d'Agentik {OS} |
| Public cible | Developpeurs, fondateurs techniques, CAIOs, aspirants builders IA |
| Pre-requis | Bases en programmation, a l'aise avec le terminal, bases Git |
| Promesse | "En 10 semaines, tu as le même stack, le même pipeline, et le même workflow qu'Agentik OS — capable de livrer des produits en production avec du développement propulse par l'IA" |
| Stack | Next.js 16 + Convex + Clerk + Stripe + Vercel + shadcn/ui + Tailwind v4 + Claude Code |

---

## Le Stack en un Coup d'Oeil

> ┌─────────────────────────────────────────────────────────┐
> │ FRONTEND │
> │ Next.js 16 (App Router, RSC, Server Actions) │
> │ Tailwind CSS v4 + shadcn/ui + themes tweakcn │
> │ Framer Motion 12 (animations) │
> │ Lucide React (icones) │
> ├─────────────────────────────────────────────────────────┤
> │ BACKEND │
> │ Convex (DB temps reel, queries, mutations, actions) │
> │ Clerk (auth, integration JWT avec Convex) │
> │ Stripe (paiements, abonnements, webhooks) │
> ├─────────────────────────────────────────────────────────┤
> │ DEPLOIEMENT │
> │ Vercel (frontend + edge functions) │
> │ Convex Cloud (backend, auto-scale) │
> ├─────────────────────────────────────────────────────────┤
> │ Développement │
> │ Claude Code (développement propulse par l'IA) │
> │ Pipeline Produit (/vision → /prd → /build → /check) │
> │ Linear (feedback & gestion de tickets) │
> └─────────────────────────────────────────────────────────┘
---

# ═══════════════════════════════════════════════
# PARTIE 1 — LE SETUP DU STACK
# "J'ai tout installe et configure"
# Semaines 1-3 | 12-16 heures
# ═══════════════════════════════════════════════

### MODULE 1 — Comptes & Cles API : Les Fondations

**Objectif** : L'eleve a tous ses comptes créés et toutes ses cles API prêtes avant d'ecrire la moindre ligne de code.

**Lecons a générer :**

1.1 **Créer tous les comptes necessaires**

| Service | URL | Ce qu'il te faut | Tier gratuit ? |
|---------|-----|------------------|----------------|
| **Vercel** | vercel.com | Compte connecte a GitHub | Oui |
| **Convex** | convex.dev | Auth GitHub ou Google | Oui (genereux) |
| **Clerk** | clerk.com | Compte email | Oui (10K MAU) |
| **Stripe** | stripe.com | Email + infos bancaires (pour les paiements) | Oui (mode test) |
| **GitHub** | github.com | Pour heberger le code | Oui |
| **Claude** | claude.ai ou console.anthropic.com | Pour Claude Code | Pro $20/mois recommande |

Étape par étape pour chacun : créer le compte, verifier l'email, completer l'onboarding.

1.2 **Générer et organiser tes cles API**

| Cle | Ou la trouver | Nom de la variable d'env |
|-----|---------------|--------------------------|
| **Convex Dev URL** | Dashboard Convex → Settings | `NEXT_PUBLIC_CONVEX_URL` |
| **Convex Deploy Key** | Dashboard Convex → Settings → Deploy key | `CONVEX_DEPLOY_KEY` |
| **Clerk Publishable Key** | Dashboard Clerk → API Keys | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` |
| **Clerk Secret Key** | Dashboard Clerk → API Keys | `CLERK_SECRET_KEY` |
| **Clerk JWT Issuer Domain** | Dashboard Clerk → JWT Templates | `CLERK_JWT_ISSUER_DOMAIN` |
| **Stripe Publishable Key** | Dashboard Stripe → Developers → API Keys | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| **Stripe Secret Key** | Dashboard Stripe → Developers → API Keys | `STRIPE_SECRET_KEY` |
| **Stripe Webhook Secret** | Dashboard Stripe → Webhooks → Signing secret | `STRIPE_WEBHOOK_SECRET` |
| **Vercel Token** | Dashboard Vercel → Settings → Tokens | `VERCEL_TOKEN` |

1.3 **Configurer ton fichier `.env.local`**
```env
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOY_KEY=prod:your-deploy-key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx

# Stripe (utilise les cles de test d'abord !)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Vercel
VERCEL_TOKEN=xxx

# Optionnel
RESEND_API_KEY=re_xxx # Pour les emails transactionnels
1.4 **Regles de sécurité pour les cles API**
- JAMAIS committer `.env.local` dans Git (c'est dans `.gitignore` par defaut)
- Utiliser les cles de test pendant le développement (Stripe mode test)
- Faire tourner les cles si elles sont exposees
- Utiliser les variables d'environnement Vercel pour la production
**Checklist de verification** :
- [ ] Les 6 comptes sont créés et verifies
- [ ] Toutes les cles API sont générées et sauvees dans `.env.local`
- [ ] `.env.local` est dans `.gitignore`
---
### MODULE 2 — Scaffolding du Projet avec Next.js 16
**Objectif** : L'eleve a un projet Next.js 16 fonctionnel avec la bonne configuration.
**Lecons a générer :**
2.1 **Créer le projet**
```bash
npx create-next-app@latest my-dashboard \
--typescript \
--tailwind \
--app \
--src-dir \
--turbopack \
--import-alias "@/*"
cd my-dashboard
2.2 **Structure du projet expliquee**
> my-dashboard/
> ├── src/
> │ ├── app/
> │ │ ├── layout.tsx # Layout racine (providers, fonts)
> │ │ ├── page.tsx # Page d'accueil
> │ │ ├── globals.css # Tailwind + styles custom
> │ │ ├── (dashboard)/ # Groupe de routes dashboard
> │ │ │ ├── layout.tsx # Layout dashboard (sidebar, nav)
> │ │ │ ├── page.tsx # Accueil dashboard
> │ │ │ └── settings/
> │ │ │ └── page.tsx
> │ │ └── (marketing)/ # Pages publiques
> │ │ ├── layout.tsx # Layout marketing (navbar, footer)
> │ │ └── page.tsx # Landing page
> │ ├── components/
> │ │ ├── ui/ # Composants shadcn/ui
> │ │ └── shared/ # Composants partages custom
> │ └── lib/
> │ └── utils.ts # Fonctions utilitaires
> ├── convex/ # Backend Convex
> │ ├── schema.ts # Schema de la base de donnees
> │ ├── auth.config.ts # Config JWT Clerk
> │ └── functions/ # Queries, mutations, actions
> ├── public/
> ├── .env.local
> ├── next.config.ts
> ├── tailwind.config.ts (v4: base CSS)
> └── package.json
2.3 **Fondamentaux de l'App Router**
- Groupes de routes : `(dashboard)` et `(marketing)` pour des layouts différents
- Layouts : UI partagee qui enveloppe les pages (navbar, sidebar, footer)
- Server Components par defaut — utilise `"use client"` uniquement quand nécessaire
- Metadata API : titres et descriptions SEO-friendly par page
- Etats de chargement et d'erreur : `loading.tsx`, `error.tsx`, `not-found.tsx`

2.4 **Configurer Next.js pour la production**
```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
 formats: ["image/avif", "image/webp"],
 },
 compress: true,
 poweredByHeader: false,
 reactStrictMode: true,
 experimental: {
 optimizePackageImports: ["lucide-react", "framer-motion"],
 },
};

export default nextConfig;
> **Verification** : `pnpm dev` tourne sans erreurs, tu vois la page par defaut Next.js sur `localhost:3000`.
>
> ---
>
> ### MODULE 3 — Design System : shadcn/ui + Tailwind v4 + tweakcn
>
> **Objectif** : L'eleve a un design system beau et coherent prêt a l'emploi.
>
> **Lecons a générer :**
>
> 3.1 **Installer shadcn/ui**
> ```bash
> pnpm dlx shadcn@latest init
- Style : New York
- Couleur de base : choisis ta préférence
- Variables CSS : oui
- Ca créé `components.json` et `src/components/ui/`

3.2 **Installer les composants essentiels**
```bash
pnpm dlx shadcn@latest add button card input label select textarea dialog dropdown-menu table badge separator tabs avatar sheet command popover tooltip
> - Ce sont les composants que tu utiliseras dans 90% des dashboards
> - Chaque composant est dans `src/components/ui/` — entierement personnalisable
>
> 3.3 **Appliquer un theme depuis tweakcn**
> - Va sur https://tweakcn.com
> - Parcours les themes (Caffeine, Zinc, Slate, Rose, etc.)
> - Clique "Copy" sur le theme choisi
> - Applique : `pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/[nom-du-theme].json`
> - Ca ecrase tes variables CSS avec la palette choisie
> - Le dark mode est inclus automatiquement
>
> 3.4 **Setup Tailwind CSS v4**
> - v4 utilise une configuration CSS-first (plus de `tailwind.config.js`)
> - Tokens custom dans `globals.css` :
> ```css
> @import "tailwindcss";
> @import "tw-animate-css";
>
> @custom-variant dark (&:is(.dark *));
>
> @theme inline {
> --color-primary: oklch(0.9247 0.0524 66.1732);
> --color-background: oklch(0.1776 0 0);
> --font-sans: var(--font-gt-planar), system-ui, sans-serif;
> --font-mono: var(--font-geist-mono), monospace;
> }
3.5 **Dark mode avec next-themes**
```bash
pnpm add next-themes
> ```typescript
> // src/components/providers/theme-provider.tsx
> "use client";
> import { ThemeProvider as NextThemesProvider } from "next-themes";
>
> export function ThemeProvider({ children }: { children: React.ReactNode }) {
> return (
> <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
> {children}
> </NextThemesProvider>
> );
> }
3.6 **Système d'icones avec Lucide React**
```bash
pnpm add lucide-react
> - 1500+ icones, tree-shakeable
> - Usage : `import { Home, Settings, Users } from "lucide-react"`
> - Taille coherente : `<Home className="size-5" />`
>
> **Verification** : L'app affiche ton theme choisi en dark mode avec les composants shadcn/ui qui rendent correctement.
>
> ---
>
> ### MODULE 4 — Backend Convex : Base de Donnees Temps Reel
>
> **Objectif** : L'eleve a Convex configure comme backend avec un schema fonctionnel, des queries et des mutations.
>
> **Lecons a générer :**
>
> 4.1 **Installer et initialiser Convex**
> ```bash
> pnpm add convex
> npx convex dev
- Ca créé le repertoire `convex/`
- Se connecte a ton projet Convex dans le cloud
- Demarre le serveur de dev (surveille les changements)

4.2 **Definir ton schema**
```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
 users: defineTable({
 clerkId: v.string(),
 email: v.string(),
 name: v.optional(v.string()),
 imageUrl: v.optional(v.string()),
 plan: v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise")),
 stripeCustomerId: v.optional(v.string()),
 stripeSubscriptionId: v.optional(v.string()),
 createdAt: v.number(),
 })
 .index("by_clerk_id", ["clerkId"])
 .index("by_email", ["email"])
 .index("by_stripe_customer", ["stripeCustomerId"]),

 // Ajoute tes tables de domaine ici
 projects: defineTable({
 userId: v.id("users"),
 name: v.string(),
 description: v.optional(v.string()),
 status: v.union(v.literal("active"), v.literal("archived")),
 createdAt: v.number(),
 updatedAt: v.number(),
 }).index("by_user", ["userId"]),
});
4.3 **Ecrire des queries (lire des donnees)**
```typescript
// convex/users.ts
import { query } from "./_generated/server";
import { v } from "convex/values";
export const getUser = query({
args: { clerkId: v.string() },
handler: async (ctx, args) => {
return await ctx.db
.query("users")
.withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
.unique();
},
});
export const getProjects = query({
args: { userId: v.id("users") },
handler: async (ctx, args) => {
return await ctx.db
.query("projects")
.withIndex("by_user", (q) => q.eq("userId", args.userId))
.order("desc")
.collect();
},
});
4.4 **Ecrire des mutations (ecrire des donnees)**
```typescript
// convex/projects.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createProject = mutation({
 args: {
 userId: v.id("users"),
 name: v.string(),
 description: v.optional(v.string()),
 },
 handler: async (ctx, args) => {
 return await ctx.db.insert("projects", {
 ...args,
 status: "active",
 createdAt: Date.now(),
 updatedAt: Date.now(),
 });
 },
});
4.5 **Ecrire des actions (appels API externes)**
```typescript
// convex/actions.ts
import { action } from "./_generated/server";
import { v } from "convex/values";
export const sendEmail = action({
args: { to: v.string(), subject: v.string(), body: v.string() },
handler: async (ctx, args) => {
// Appeler une API externe (Resend, SendGrid, etc.)
const response = await fetch("https://api.resend.com/emails", {
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
"Content-Type": "application/json",
},
body: JSON.stringify({
from: "noreply@yourdomain.com",
to: args.to,
subject: args.subject,
html: args.body,
}),
});
return await response.json();
},
});
4.6 **Temps reel dans le frontend**
```typescript
"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ProjectsList({ userId }: { userId: string }) {
 // Ca se re-render AUTOMATIQUEMENT quand les donnees changent
 const projects = useQuery(api.projects.getProjects, { userId });
 const createProject = useMutation(api.projects.createProject);

 if (!projects) return <div>Chargement...</div>;

 return (
 <div>
 {projects.map((p) => (
 <div key={p._id}>{p.name}</div>
 ))}
 <button onClick={() => createProject({ userId, name: "Nouveau Projet" })}>
 Ajouter un Projet
 </button>
 </div>
 );
}
4.7 **Cron jobs Convex**
```typescript
// convex/crons.ts
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";
const crons = cronJobs();
crons.daily("daily-report", { hourUTC: 9, minuteUTC: 0 }, internal.reports.generateDaily);
crons.interval("health-check", { minutes: 5 }, internal.monitoring.healthCheck);
export default crons;
**Verification** : Schema deploye, les queries retournent des donnees, les mutations ecrivent des donnees, les mises a jour temps reel fonctionnent dans l'UI.

---

### MODULE 5 — Authentification avec Clerk + Convex JWT

**Objectif** : L'eleve a une authentification complète avec Clerk integree a Convex via JWT.

**Lecons a générer :**

5.1 **Installer Clerk**
```bash
pnpm add @clerk/nextjs
5.2 **Configurer le middleware Clerk**
```typescript
// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
const isPublicRoute = createRouteMatcher([
"/",
"/pricing",
"/about",
"/sign-in(.*)",
"/sign-up(.*)",
"/api/webhooks(.*)",
]);
export default clerkMiddleware(async (auth, req) => {
if (!isPublicRoute(req)) {
await auth.protect();
}
});
export const config = {
matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
5.3 **Configurer le JWT Clerk pour Convex**
- Dans le dashboard Clerk → JWT Templates → Créer nouveau
- Nom : `convex`
- Claims : `{ "sub": "{{user.id}}" }`
- Copier l'Issuer URL

```typescript
// convex/auth.config.ts
export default {
 providers: [
 {
 domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
 applicationID: "convex",
 },
 ],
};
5.4 **Setup ConvexProvider + ClerkProvider**
```typescript
// src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<ClerkProvider>
<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
<ThemeProvider>
{children}
</ThemeProvider>
</ConvexProviderWithClerk>
</ClerkProvider>
);
}
5.5 **Webhook Clerk → Sync utilisateur Convex**
```typescript
// src/app/api/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
 const body = await req.text();
 const headersList = await headers();

 const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
 const evt = wh.verify(body, {
 "svix-id": headersList.get("svix-id")!,
 "svix-timestamp": headersList.get("svix-timestamp")!,
 "svix-signature": headersList.get("svix-signature")!,
 });

 if (evt.type === "user.created") {
 await convex.mutation(api.users.createUser, {
 clerkId: evt.data.id,
 email: evt.data.email_addresses[0]?.email_address ?? "",
 name: `${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim(),
 imageUrl: evt.data.image_url ?? "",
 });
 }

 return new Response("OK", { status: 200 });
}
5.6 **Queries Convex authentifiees**
```typescript
// convex/projects.ts — avec verification d'auth
import { query } from "./_generated/server";
export const myProjects = query({
handler: async (ctx) => {
const identity = await ctx.auth.getUserIdentity();
if (!identity) throw new Error("Non authentifie");
const user = await ctx.db
.query("users")
.withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
.unique();
if (!user) throw new Error("Utilisateur non trouve");
return await ctx.db
.query("projects")
.withIndex("by_user", (q) => q.eq("userId", user._id))
.collect();
},
});
**Verification** : Inscription → utilisateur créé dans Convex → queries authentifiees fonctionnent → deconnexion → routes protegees.

---

### MODULE 6 — Paiements avec Stripe

**Objectif** : L'eleve a le checkout Stripe, les abonnements, les webhooks et le portail client fonctionnels.

**Lecons a générer :**

6.1 **Installer Stripe**
```bash
pnpm add stripe
6.2 **Créer les produits et les prix dans Stripe**
- Dashboard Stripe → Products → Add product
- Créer : Plan Free (prix : $0), Plan Pro ($29/mois), Enterprise ($99/mois)
- Copier les Price IDs pour chaque plan
6.3 **Création de la session checkout**
```typescript
// src/app/api/stripe/checkout/route.ts
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: Request) {
const { priceId, userId, email } = await req.json();
const session = await stripe.checkout.sessions.create({
mode: "subscription",
payment_method_types: ["card"],
customer_email: email,
line_items: [{ price: priceId, quantity: 1 }],
success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
metadata: { userId },
});
return Response.json({ url: session.url });
}
6.4 **Webhook Stripe → Sync Convex**
```typescript
// src/app/api/webhooks/stripe/route.ts
import Stripe from "stripe";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
 const body = await req.text();
 const sig = req.headers.get("stripe-signature")!;
 const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);

 switch (event.type) {
 case "checkout.session.completed": {
 const session = event.data.object;
 await convex.mutation(api.users.updateSubscription, {
 stripeCustomerId: session.customer as string,
 stripeSubscriptionId: session.subscription as string,
 plan: "pro",
 });
 break;
 }
 case "customer.subscription.deleted": {
 const sub = event.data.object;
 await convex.mutation(api.users.updateSubscription, {
 stripeCustomerId: sub.customer as string,
 plan: "free",
 });
 break;
 }
 }

 return new Response("OK", { status: 200 });
}
6.5 **Portail Client**
```typescript
// src/app/api/stripe/portal/route.ts
export async function POST(req: Request) {
const { customerId } = await req.json();
const session = await stripe.billingPortal.sessions.create({
customer: customerId,
return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/settings`,
});
return Response.json({ url: session.url });
}
6.6 **Composant de la page pricing**
- Toggle mensuel/annuel
- Tableau comparatif des features
- Boutons CTA → Stripe Checkout
- Afficher le plan actuel si connecte

**Verification** : Checkout en mode test → webhook se declenche → plan utilisateur mis a jour dans Convex → portail client accessible.

---

### MODULE 7 — Deploiement : Vercel + Convex Production

**Objectif** : L'eleve deploie le frontend (Vercel) et le backend (Convex) en production.

**Lecons a générer :**

7.1 **Deployer Convex en production**
```bash
npx convex deploy
> - Configure l'environnement de production
> - Separe du développement (donnees differentes)
> - Copier l'URL de production
>
> 7.2 **Deployer sur Vercel**
> ```bash
> vercel --prod --yes --token "$VERCEL_TOKEN"
- Connecter le repo GitHub pour l'auto-deploy sur push
- Configurer les variables d'environnement dans le dashboard Vercel
- Configuration du domaine custom

7.3 **Variables d'environnement en production**
- Dashboard Vercel → Settings → Environment Variables
- Ajouter TOUTES les variables d'env de `.env.local`
- Utiliser les cles de PRODUCTION (pas les cles de test) pour Stripe
- Instance Clerk de production

7.4 **URLs des webhooks en production**
- Mettre a jour l'URL du webhook Clerk : `https://tondomaine.com/api/webhooks/clerk`
- Mettre a jour l'URL du webhook Stripe : `https://tondomaine.com/api/webhooks/stripe`
- Verifier que les signatures fonctionnent en production

7.5 **Checklist de verification post-deploy**
- [ ] La page d'accueil se charge
- [ ] L'inscription fonctionne → utilisateur créé dans Convex
- [ ] Le dashboard se charge pour les utilisateurs authentifies
- [ ] Le checkout Stripe fonctionne (mode test d'abord, puis live)
- [ ] Les webhooks se declenchent correctement
- [ ] Domaine custom avec SSL

---

### MODULE 8 — Construire Ton Premier Dashboard

**Objectif** : L'eleve construit une UI de dashboard complète avec Claude Code.

**Lecons a générer :**

8.1 **Architecture du layout dashboard**
> Layout Dashboard
> ├── Sidebar (navigation)
> │ ├── Logo
> │ ├── Liens nav (Accueil, Projets, Analytiques, Parametres)
> │ └── Menu utilisateur (profil, deconnexion)
> ├── Header (fil d'Ariane, actions)
> └── Zone de contenu principal
> └── Contenu specifique a la page
8.2 **Demander a Claude Code étape par étape**
- "Créé un layout de dashboard avec navigation sidebar en utilisant shadcn/ui Sheet pour mobile et sidebar fixe pour desktop"
- "Ajoute une page de liste de projets avec un data table utilisant shadcn/ui Table"
- "Créé une page de detail projet avec des tabs : Vue d'ensemble, Parametres, Activite"
- "Ajoute une page de parametres avec un formulaire de profil et la gestion de l'abonnement"
- "Construis une vue d'ensemble analytique avec des cartes de metriques et des graphiques"

8.3 **Patterns cles pour les dashboards**
- Server Components pour le data fetching (pas de spinners de chargement)
- Client Components pour les elements interactifs (formulaires, modales)
- Mises a jour optimistes avec Convex `useMutation`
- Donnees temps reel avec Convex `useQuery` (auto-refresh)
- Responsive : sidebar → sheet sur mobile

8.4 **Composants de dashboard courants a construire**
- Cartes de metriques (affichage KPI)
- Data tables avec tri, filtrage, pagination
- Formulaires avec validation (React Hook Form + Zod)
- Modales pour les flux de création/edition
- Notifications toast pour le feedback
- Squelettes de chargement
- Etats vides

**Exercice** : Construis un dashboard complet avec 4 pages : Vue d'ensemble, Projets, Analytiques, Parametres. Tout connecte a Convex, authentifie avec Clerk.

---

# ═══════════════════════════════════════════════
# PARTIE 2 — LE PIPELINE PRODUIT
# "Je livre des produits comme Agentik OS"
# Semaines 4-7 | 14-18 heures
# ═══════════════════════════════════════════════

### MODULE 9 — Claude Code comme Partenaire de Développement

**Objectif** : L'eleve utilise Claude Code efficacement pour toutes les taches de développement.

**Lecons a générer :**

9.1 **Configurer CLAUDE.md pour ton projet**
- Vue d'ensemble du projet, stack technique, structure
- Guidelines de design (theme, couleurs, fonts)
- Commandes cles (dev, build, deploy)
- Regles et contraintes
- Numero de port, infos de deploiement

9.2 **Le workflow de développement conversationnel**
- Commence par l'intention : "Je veux ajouter une feature qui..."
- Laisse Claude explorer : "Lis le code existant dans src/app/(dashboard)/"
- Itere : "Le bouton est trop large sur mobile, corrige-le"
- Verifie : "Lance le build pour checker les erreurs"
- Deploie : "Deploie sur Vercel en production"

9.3 **Quand utiliser Claude Code vs coder toi-même**
- Utilise Claude Code : scaffolding, code repetitif, refactoring, debugging, deploiement
- Code toi-même : logique business complexe que tu comprends mieux, decisions de design creatives
- Regle : si tu peux le decrire clairement en mots, Claude Code peut le construire

---

### MODULE 10 — /vision : Definir l'Identite de Ton Produit

**Objectif** : L'eleve créé un document de vision produit complet.

**Lecons a générer :**

10.1 **Ce que /vision fait**
- Entre en Plan Mode (pas de code, decouverte pure)
- Pose des questions socratiques profondes sur QUI, COMMENT, QUOI NE PAS FAIRE
- Généré VISION.md avec : boussole interne, personas, principes de design
- C'est l'AME de ton produit — tout decoule d'ici

10.2 **Le processus de decouverte de vision**
- Pour qui est ce produit ? (specifique, pas "tout le monde")
- Quelle emotion les utilisateurs doivent ressentir ? (confiance, soulagement, puissance ?)
- Que fait ce produit PAS ? (les limites sont aussi importantes que les features)
- Qui sont les 3 personas ? (primaire, secondaire, cas limite)
- Quels sont les 5 principes de design ? (guident chaque decision UI)

10.3 **Utiliser /vision en pratique**
> /vision
- Reponds a chaque question avec reflexion
- Ne te precipite pas — ce document guide tout
- Revois et itere sur le resultat
- Sauvegarde en tant que `docs/VISION.md`

**Exercice** : Lance /vision pour l'idee de produit de l'eleve. Créé un VISION.md complet.

---

### MODULE 11 — /prd : Documentation des Exigences Produit

**Objectif** : L'eleve généré une suite de documentation produit complète.

**Lecons a générer :**

11.1 **Ce que /prd généré (11 fichiers)**
- `PRD.md` — Document d'Exigences Produit
- `FEATURES.md` — Specifications des features
- `USER-STORIES.md` — User stories (en tant que [role], je veux [action])
- `TECH-STACK.md` — Choix technologiques et justifications
- `MILESTONES.md` — Plan de livraison par phases
- `API-SPEC.md` — Definitions des contrats API
- `DATA-MODEL.md` — Design du schema de base de donnees
- `UI-SPEC.md` — Ecrans cles et flux
- `TESTING.md` — Stratégie de test
- `DEPLOYMENT.md` — Architecture de deploiement
- `RISKS.md` — Registre des risques

11.2 **Lancer /prd**
> /prd
- Lit VISION.md d'abord (s'il existe)
- Pose des questions de clarification
- Généré les 11 fichiers dans `docs/`
- Chaque fichier est prêt pour un agent IA (structure pour que Claude Code execute)

11.3 **Revoir et affiner le PRD**
- Verifie les priorites des features — sont-elles correctes ?
- Verifie le modèle de donnees — correspond-il a tes besoins ?
- Verifie les milestones — timelines realistes ?
- Edite et relance des sections si nécessaire

**Exercice** : Généré une suite PRD complète pour le produit de l'eleve.

---

### MODULE 12 — /brand-identity : Système d'Identite Visuelle

**Objectif** : L'eleve créé une identite de marque complète avec des design tokens.

**Lecons a générer :**

12.1 **Ce que /brand-identity créé**
- Decouverte de marque (Prisme d'Identite de Marque de Kapferer)
- 2-3 variantes visuelles interchangeables
- Système typographique (paires de fonts)
- Système de couleurs (base oklch, dark/light)
- Guidelines de voix et de ton
- Direction de logo
- Templates de prompts IA (pour une génération d'images coherente)
- Design tokens (variables CSS, config Tailwind)
- Previews de composants
- Deploie comme brand book interactif sur Vercel

12.2 **Lancer /brand-identity**
> /brand-identity
- Utilise une orchestration multi-agents (architecte + designer + guardian)
- Généré un brand book complet avec des previews live
- Exporte des design tokens pour utilisation immédiate dans ton projet

12.3 **Appliquer les tokens de marque a ton projet**
- Copie les design tokens dans `globals.css`
- Mets a jour le theme shadcn/ui
- Applique a tous les composants

---

### MODULE 13 — /deepux : Moteur de Redesign UX

**Objectif** : L'eleve peut lancer un audit UX complet et un redesign.

**Lecons a générer :**

13.1 **Ce que /deepux fait**
- Audit heuristique (10 heuristiques d'utilisabilite)
- Simulation de persona (teste l'UI en tant que chaque persona)
- Revue de l'architecture de l'information
- Redesign parallele a 11 couches (layout, typographie, couleur, espacement, motion, etc.)
- Comparaison visuelle avant/après
- Utilise une equipe d'agents (architecte + implementeurs + guardian)

13.2 **Lancer /deepux**
> /deepux
- Prend des captures d'ecran de l'etat actuel (baseline)
- Analyse par rapport aux principes de design de VISION.md
- Redesigne avec application des tokens de marque
- Le guardian verifie tous les livrables
- Zero donnees mockees — 100% backend live

13.3 **Quand utiliser /deepux**
- Après le build initial (polir le MVP)
- Quand les utilisateurs se plaignent de l'UX
- Avant un lancement majeur
- Rafraichissement UX trimestriel

---

### MODULE 14 — /planner : Planification de l'Implementation

**Objectif** : L'eleve créé des plans d'implementation structures.

**Lecons a générer :**

14.1 **Ce que /planner créé**
- `tracker.json` — decomposition structuree des taches
- Hierarchie Milestones → Slices → Tasks
- Graphe de dependances (ce qui doit être fait en premier)
- Estimations de temps par tache
- Attribution d'equipe (quel agent gere quoi)

14.2 **Lancer /planner**
> /planner # Plan complet a partir du PRD
> /planner mini # Plan rapide pour une seule feature
> /planner global # Planification cross-projet
> /planner resume # Reprendre la ou tu t'es arrete
14.3 **Executer le plan**
- Les taches sont concues pour tenir dans une fenetre de contexte Claude Code
- Chaque tache a des inputs clairs, des outputs et des criteres d'acceptation
- Progression suivie dans tracker.json
- Detection de derive : le planner alerte si tu devies du plan

---

### MODULE 15 — /build, /new, /forge : Les Pipelines Complets

**Objectif** : L'eleve comprend toutes les commandes de pipeline et quand utiliser chacune.

**Lecons a générer :**

15.1 **Comparaison des pipelines**

| Commande | Point de depart | Pipeline | Ideal pour |
|----------|----------------|----------|------------|
| `/new` | Dossier vide | Scaffold → Vision → PRD → Brand → DeepUX → Plan → Build → Verify | Nouveaux produits from scratch |
| `/build` | Projet existant | Vision → PRD → Brand → DeepUX → Plan → Build → Verify | Ajouter a du code existant |
| `/forge` | Juste une idee | Deep Read → Discovery → Brand → PRD → Smart Stack → Team Build → Auto QA | MVP rapide (idee → produit fonctionnel) |

15.2 **Lancer /new (pipeline complet)**
> /new
- Scaffolde le projet (Next.js + Convex + Clerk + Stripe)
- Lance /vision → /prd → /brand-identity → /deepux → /planner → execute → /check
- Resultat final : produit deploye, teste, prêt pour la production

15.3 **Lancer /build (projet existant)**
> /build
- Detecte les artifacts existants (VISION.md, PRD, etc.)
- Reprend la ou tu t'es arrete
- Saute les phases déjà completees

15.4 **Lancer /forge (idee vers MVP)**
> /forge
- Lit tout d'abord (analyse profonde du codebase)
- Phase de decouverte (ce qui existe, ce qui est nécessaire)
- Selection automatique du stack optimal
- Build en equipe (agents paralleles)
- QA automatique (verification par le guardian)

---

### MODULE 16 — /check, /verify, /linear-setup : Qualité & Feedback

**Objectif** : L'eleve deploie, verifie et met en place des boucles de feedback.

**Lecons a générer :**

16.1 **/check — Pipeline Deploy + Verify**
> /check
- Pre-deploy : check TypeScript, changements non commites
- Deploy : backend Convex + frontend Vercel
- Verify : sante du backend, UI desktop, UI mobile
- Compare : capture d'ecran vs attentes du ticket Linear

16.2 **/verify — Check rapide de page**
> /verify https://tondomaine.com/dashboard
- Erreurs console, echecs reseau, fonctionnalite de base
- Verification rapide de sante sans deploy complet

16.3 **/linear-setup — Système de feedback**
> /linear-setup
- Installe le widget de feedback (bouton flottant)
- Routes API pour soumettre du feedback
- Page de feedback publique
- Labels et categories dans Linear
- Integration MCP (Claude Code peut gerer les tickets)

16.4 **/linear-fix — Corriger des tickets avec l'IA**
> /linear-fix
- Recupere les tickets ouverts depuis Linear
- Tu choisis lequel corriger
- L'IA corrige avec verification sur 6 dimensions
- Poste les resultats dans Linear

---

# ═══════════════════════════════════════════════
# PARTIE 3 — AVANCE : TES PROPRES Systèmes
# "Je construis des systèmes et automatisations custom"
# Semaines 8-10 | 12-16 heures
# ═══════════════════════════════════════════════

### MODULE 17 — Dashboard Custom avec Monitoring

**Objectif** : L'eleve construit un dashboard de monitoring custom pour ses systèmes.

**Lecons a générer :**

17.1 **Architecture**
- Frontend Next.js avec souscriptions Convex temps reel
- Tables Convex : services, deployments, cronJobs, alerts
- Cron jobs qui verifient la sante et ecrivent dans Convex
- Notifications Telegram pour les alertes

17.2 **Monitoring de services**
- Endpoints de health check
- Cartes de status (vert/jaune/rouge)
- Suivi de l'uptime
- Graphiques de temps de réponse

17.3 **Suivi des deploiements**
- Logger chaque deploiement (projet, URL, timestamp, status)
- Vue timeline des deploiements
- Rollback rapide depuis le dashboard

17.4 **Système d'alertes**
- Regles d'alerte configurables
- Integration Telegram pour les alertes critiques
- Historique des alertes et suivi de resolution

---

### MODULE 18 — Systèmes Cron & Automatisation

**Objectif** : L'eleve construit des pipelines automatises qui tournent selon un planning.

**Lecons a générer :**

18.1 **Cron jobs Convex**
- Planification quotidienne, horaire, basee sur un intervalle
- Fonctions internes uniquement (pas exposees aux clients)
- Gestion d'erreurs et logique de retry

18.2 **Cron jobs VPS (pour les taches plus lourdes)**
- Setup du crontab
- Scripts shell qui appellent Claude Code ou des APIs
- Logging et monitoring
- Exemples : publication de contenu, posting sur les reseaux sociaux, génération de rapports

18.3 **Systèmes auto-reparateurs**
- Health checks qui redemarrent automatiquement les services en echec
- Retry avec backoff exponentiel
- Circuit breakers
- Escalade vers Telegram quand l'auto-fix echoue

---

### MODULE 19 — Skills & Agents Claude Code pour Ton Projet

**Objectif** : L'eleve créé des skills et agents custom pour son workflow specifique.

**Lecons a générer :**

19.1 **Skills specifiques au projet**
- `/deploy` — deployer ton projet
- `/test` — lancer tes tests
- `/audit` — auditer ton code
- `/report` — générer un rapport de metriques
- `/fix` — corriger les problèmes courants

19.2 **Agents custom pour ton domaine**
- Agent reviewer : verifie la qualité du code
- Agent testeur : lance des tests exhaustifs
- Agent moniteur : verifie la sante en production
- Agent contenu : généré du contenu specifique au domaine

19.3 **Automatiser tout ton workflow**
- Combiner skills + agents + cron = système de développement autonome
- Exemple : test nocturne → corriger les echecs → deployer si vert → notifier

---

### MODULE 20 — Patterns Avances & Scaling

**Objectif** : L'eleve sait comment scaler son stack et gerer le trafic de production.

**Lecons a générer :**

20.1 **Optimisation des performances Convex**
- Design d'index pour des queries rapides
- Pagination pour les grands datasets
- Stratégies de cache
- Mises a jour optimistes pour une UI reactive

20.2 **Performance Next.js**
- Server Components par defaut (zero JS client)
- Imports dynamiques pour les composants lourds
- Optimisation d'images avec next/image
- Edge functions pour des APIs a faible latence

20.3 **Architecture multi-tenant**
- Clerk Organizations pour la gestion d'equipes
- Isolation des donnees par organisation dans Convex
- Controle d'acces base sur les roles

20.4 **Monitoring en production**
- Vercel Analytics + Speed Insights
- Dashboard Convex pour les metriques backend
- Monitoring custom avec le dashboard du Module 17
- Suivi d'erreurs (integration Sentry)

---

### MODULE 21 — Projet Final : Livrer Ton Produit

**Objectif** : L'eleve livre un produit complet en utilisant le Stack Agentik au complet.

**Exigences du projet :**

1. **Stack complet** : Next.js 16 + Convex + Clerk + Stripe + Vercel
2. **Design system** : shadcn/ui + theme tweakcn + dark mode
3. **Pipeline produit** : VISION.md + PRD + tokens de marque appliques
4. **Dashboard** : au moins 4 pages avec des donnees reelles
5. **Authentification** : inscription, connexion, routes protegees, sync utilisateur
6. **Paiements** : page pricing, checkout, sync webhook, portail client
7. **2 skills custom** : skills Claude Code specifiques au projet
8. **Monitoring** : au minimum des health checks basiques avec alertes
9. **Deploye** : en ligne sur un domaine custom avec SSL
10. **Feedback** : widget Linear installe et fonctionnel

---

## Resume de la Formation

| Partie | Semaines | Modules | Heures | Focus |
|--------|----------|---------|--------|-------|
| Setup du Stack | 1-3 | 1-8 | 12-16h | Comptes, Next.js, shadcn, Convex, Clerk, Stripe, Vercel, Dashboard |
| Pipeline Produit | 4-7 | 9-16 | 14-18h | Claude Code, /vision, /prd, /brand, /deepux, /planner, /build, /check |
| Avance | 8-10 | 17-21 | 12-16h | Monitoring, cron, skills/agents custom, scaling, projet final |
| **TOTAL** | **10** | **21** | **38-50h** | **Maitrise complète du Stack Agentik** |

---

## Bonus & Ressources

- **Repo template de demarrage** : Next.js + Convex + Clerk + Stripe pre-configure
- **Template CLAUDE.md** : instructions de projet prêtes pour la production
- **Cheat sheet composants shadcn/ui** : tous les composants avec exemples d'utilisation
- **Checklist de variables d'env** : chaque cle dont tu as besoin organisee par service
- **Checklist de deploiement** : 30 points de verification pre-lancement
- **Telegram communaute** : support, showcase, mises a jour
- **Acces a vie** : toutes les mises a jour futures incluses

## Upsell

> "Tu veux qu'on construise ton produit ? Agentik {OS} propose AI Build ($15K-45K) pour le développement de produits custom, et CAIO Partnership ($4K-15K/mois) pour un leadership IA en continu. agentik-os.com/pricing"

---

**FIN DU DOCUMENT — Formation : Le Stack Agentik — Setup, Build & Ship**
