# Course — The Agentik Stack: Setup, Build & Ship

## From Zero to Production Dashboard with Next.js 16, Convex, Clerk, Stripe & Claude Code

## Instructions for the Course Creator Agent

> **Objective**: Generate the definitive course on setting up and using the exact production stack that Agentik OS uses for all its client projects. The student goes from an empty folder to a fully deployed, authenticated, payment-enabled dashboard — then learns the complète product pipeline (vision → PRD → brand → UX → plan → build → verify) to ship products with Claude Code orchestrating everything.
>
> **Tone**: Hands-on, step-by-step, zero ambiguity. Every instruction is copy-paste ready. Screenshots recommended at each step. The student should NEVER be stuck wondering "what next?"
>
> **Format**: Each module = video screencast + step-by-step guide + code snippets + verification checklist. No theory without practice.
>
> **Estimated duration**: 40-55 hours of content. 8-10 weeks to complète.
>
> **Price**: $697 standalone / included in premium bundle

---

## Course Identity

| Field | Value |
|-------|-------|
| Name | **The Agentik Stack — Setup, Build & Ship** |
| Subtitle | The exact production stack and pipeline behind Agentik OS — from empty folder to deployed product |
| Creator | Gareth Simono — Founder of Agentik {OS} |
| Target audience | Developers, technical founders, CAIOs, aspiring AI builders |
| Prerequisites | Basic programming, comfortable with terminal, Git basics |
| Promise | "In 10 weeks, you have the same stack, same pipeline, and same workflow as Agentik OS — capable of shipping production products with AI-powered development" |
| Stack | Next.js 16 + Convex + Clerk + Stripe + Vercel + shadcn/ui + Tailwind v4 + Claude Code |

---

## The Stack at a Glance

> ┌─────────────────────────────────────────────────────────┐
> │ FRONTEND │
> │ Next.js 16 (App Router, RSC, Server Actions) │
> │ Tailwind CSS v4 + shadcn/ui + tweakcn themes │
> │ Framer Motion 12 (animations) │
> │ Lucide React (icons) │
> ├─────────────────────────────────────────────────────────┤
> │ BACKEND │
> │ Convex (real-time DB, queries, mutations, actions) │
> │ Clerk (auth, JWT integration with Convex) │
> │ Stripe (payments, subscriptions, webhooks) │
> ├─────────────────────────────────────────────────────────┤
> │ DEPLOYMENT │
> │ Vercel (frontend + edge functions) │
> │ Convex Cloud (backend, auto-scaled) │
> ├─────────────────────────────────────────────────────────┤
> │ DEVELOPMENT │
> │ Claude Code (AI-powered development) │
> │ Product Pipeline (/vision → /prd → /build → /check) │
> │ Linear (feedback & ticket management) │
> └─────────────────────────────────────────────────────────┘
---

# ═══════════════════════════════════════════════
# PART 1 — THE STACK SETUP
# "I have everything installed and configured"
# Weeks 1-3 | 12-16 hours
# ═══════════════════════════════════════════════

### MODULE 1 — Accounts & API Keys: The Foundation

**Objective**: The student has all accounts created and all API keys ready before writing a single line of code.

**Lessons to generate:**

1.1 **Create all required accounts**

| Service | URL | What you need | Free tier? |
|---------|-----|---------------|------------|
| **Vercel** | vercel.com | GitHub-connected account | Yes |
| **Convex** | convex.dev | GitHub or Google auth | Yes (generous) |
| **Clerk** | clerk.com | Email account | Yes (10K MAU) |
| **Stripe** | stripe.com | Email + bank info (for payments) | Yes (test mode) |
| **GitHub** | github.com | For code hosting | Yes |
| **Claude** | claude.ai or console.anthropic.com | For Claude Code | Pro $20/mo recommended |

Step-by-step for each: create account, verify email, complète onboarding.

1.2 **Generate and organize your API keys**

| Key | Where to find it | Env var name |
|-----|-----------------|--------------|
| **Convex Dev URL** | Convex dashboard → Settings | `NEXT_PUBLIC_CONVEX_URL` |
| **Convex Deploy Key** | Convex dashboard → Settings → Deploy key | `CONVEX_DEPLOY_KEY` |
| **Clerk Publishable Key** | Clerk dashboard → API Keys | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` |
| **Clerk Secret Key** | Clerk dashboard → API Keys | `CLERK_SECRET_KEY` |
| **Clerk JWT Issuer Domain** | Clerk dashboard → JWT Templates | `CLERK_JWT_ISSUER_DOMAIN` |
| **Stripe Publishable Key** | Stripe dashboard → Developers → API Keys | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| **Stripe Secret Key** | Stripe dashboard → Developers → API Keys | `STRIPE_SECRET_KEY` |
| **Stripe Webhook Secret** | Stripe dashboard → Webhooks → Signing secret | `STRIPE_WEBHOOK_SECRET` |
| **Vercel Token** | Vercel dashboard → Settings → Tokens | `VERCEL_TOKEN` |

1.3 **Set up your `.env.local` file**
```env
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOY_KEY=prod:your-deploy-key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx

# Stripe (use test keys first!)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Vercel
VERCEL_TOKEN=xxx

# Optional
RESEND_API_KEY=re_xxx # For transactional emails
1.4 **Security rules for API keys**
- NEVER commit `.env.local` to Git (it's in `.gitignore` by default)
- Use test keys during development (Stripe test mode)
- Rotate keys if they're ever exposed
- Use Vercel environment variables for production
**Verification checklist**:
- [ ] All 6 accounts created and verified
- [ ] All API keys generated and saved in `.env.local`
- [ ] `.env.local` is in `.gitignore`
---
### MODULE 2 — Project Scaffolding with Next.js 16
**Objective**: The student has a working Next.js 16 project with the correct configuration.
**Lessons to generate:**
2.1 **Create the project**
```bash
npx create-next-app@latest my-dashboard \
--typescript \
--tailwind \
--app \
--src-dir \
--turbopack \
--import-alias "@/*"
cd my-dashboard
2.2 **Project structure explained**
> my-dashboard/
> ├── src/
> │ ├── app/
> │ │ ├── layout.tsx # Root layout (providers, fonts)
> │ │ ├── page.tsx # Homepage
> │ │ ├── globals.css # Tailwind + custom styles
> │ │ ├── (dashboard)/ # Dashboard route group
> │ │ │ ├── layout.tsx # Dashboard layout (sidebar, nav)
> │ │ │ ├── page.tsx # Dashboard home
> │ │ │ └── settings/
> │ │ │ └── page.tsx
> │ │ └── (marketing)/ # Public pages
> │ │ ├── layout.tsx # Marketing layout (navbar, footer)
> │ │ └── page.tsx # Landing page
> │ ├── components/
> │ │ ├── ui/ # shadcn/ui components
> │ │ └── shared/ # Custom shared components
> │ └── lib/
> │ └── utils.ts # Utility functions
> ├── convex/ # Convex backend
> │ ├── schema.ts # Database schema
> │ ├── auth.config.ts # Clerk JWT config
> │ └── functions/ # Queries, mutations, actions
> ├── public/
> ├── .env.local
> ├── next.config.ts
> ├── tailwind.config.ts (v4: CSS-based)
> └── package.json
2.3 **App Router fundamentals**
- Route groups: `(dashboard)` and `(marketing)` for différent layouts
- Layouts: shared UI that wraps pages (navbar, sidebar, footer)
- Server Components by default — use `"use client"` only when needed
- Metadata API: SEO-friendly titles and descriptions per page
- Loading and error states: `loading.tsx`, `error.tsx`, `not-found.tsx`

2.4 **Configure Next.js for production**
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
> **Verification**: `pnpm dev` runs without errors, you see the Next.js default page at `localhost:3000`.
>
> ---
>
> ### MODULE 3 — Design System: shadcn/ui + Tailwind v4 + tweakcn
>
> **Objective**: The student has a beautiful, consistent design system ready to use.
>
> **Lessons to generate:**
>
> 3.1 **Install shadcn/ui**
> ```bash
> pnpm dlx shadcn@latest init
- Style: New York
- Base color: choose your préférence
- CSS variables: yes
- This creates `components.json` and `src/components/ui/`

3.2 **Install essential components**
```bash
pnpm dlx shadcn@latest add button card input label select textarea dialog dropdown-menu table badge separator tabs avatar sheet command popover tooltip
> - These are the components you'll use in 90% of dashboards
> - Each component is in `src/components/ui/` — fully customizable
>
> 3.3 **Apply a theme from tweakcn**
> - Go to https://tweakcn.com
> - Browse themes (Caffeine, Zinc, Slate, Rose, etc.)
> - Click "Copy" on your chosen theme
> - Apply: `pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/[theme-name].json`
> - This overwrites your CSS variables with the chosen palette
> - Dark mode is included automatically
>
> 3.4 **Tailwind CSS v4 setup**
> - v4 uses CSS-first configuration (no more `tailwind.config.js`)
> - Custom tokens in `globals.css`:
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
3.5 **Dark mode with next-themes**
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
3.6 **Icon system with Lucide React**
```bash
pnpm add lucide-react
> - 1500+ icons, tree-shakeable
> - Usage: `import { Home, Settings, Users } from "lucide-react"`
> - Consistent sizing: `<Home className="size-5" />`
>
> **Verification**: The app shows your chosen theme in dark mode with shadcn/ui components rendering correctly.
>
> ---
>
> ### MODULE 4 — Convex Backend: Real-Time Database
>
> **Objective**: The student has Convex configured as the backend with a working schema, queries, and mutations.
>
> **Lessons to generate:**
>
> 4.1 **Install and initialize Convex**
> ```bash
> pnpm add convex
> npx convex dev
- This creates the `convex/` directory
- Links to your Convex project in the cloud
- Starts the dev server (watches for changes)

4.2 **Define your schema**
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

 // Add your domain tables here
 projects: defineTable({
 userId: v.id("users"),
 name: v.string(),
 description: v.optional(v.string()),
 status: v.union(v.literal("active"), v.literal("archived")),
 createdAt: v.number(),
 updatedAt: v.number(),
 }).index("by_user", ["userId"]),
});
4.3 **Write queries (read data)**
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
4.4 **Write mutations (write data)**
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
4.5 **Write actions (external API calls)**
```typescript
// convex/actions.ts
import { action } from "./_generated/server";
import { v } from "convex/values";
export const sendEmail = action({
args: { to: v.string(), subject: v.string(), body: v.string() },
handler: async (ctx, args) => {
// Call external API (Resend, SendGrid, etc.)
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
4.6 **Real-time in the frontend**
```typescript
"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ProjectsList({ userId }: { userId: string }) {
 // This re-renders AUTOMATICALLY when data changes
 const projects = useQuery(api.projects.getProjects, { userId });
 const createProject = useMutation(api.projects.createProject);

 if (!projects) return <div>Loading...</div>;

 return (
 <div>
 {projects.map((p) => (
 <div key={p._id}>{p.name}</div>
 ))}
 <button onClick={() => createProject({ userId, name: "New Project" })}>
 Add Project
 </button>
 </div>
 );
}
4.7 **Convex cron jobs**
```typescript
// convex/crons.ts
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";
const crons = cronJobs();
crons.daily("daily-report", { hourUTC: 9, minuteUTC: 0 }, internal.reports.generateDaily);
crons.interval("health-check", { minutes: 5 }, internal.monitoring.healthCheck);
export default crons;
**Verification**: Schema deployed, queries return data, mutations write data, real-time updates work in the UI.

---

### MODULE 5 — Authentication with Clerk + Convex JWT

**Objective**: The student has full authentication with Clerk integrated into Convex via JWT.

**Lessons to generate:**

5.1 **Install Clerk**
```bash
pnpm add @clerk/nextjs
5.2 **Configure Clerk middleware**
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
5.3 **Set up Clerk JWT for Convex**
- In Clerk dashboard → JWT Templates → Create new
- Name: `convex`
- Claims: `{ "sub": "{{user.id}}" }`
- Copy the Issuer URL

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
5.4 **ConvexProvider + ClerkProvider setup**
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
5.5 **Clerk webhook → Convex user sync**
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
5.6 **Authenticated Convex queries**
```typescript
// convex/projects.ts — with auth check
import { query } from "./_generated/server";
export const myProjects = query({
handler: async (ctx) => {
const identity = await ctx.auth.getUserIdentity();
if (!identity) throw new Error("Unauthenticated");
const user = await ctx.db
.query("users")
.withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
.unique();
if (!user) throw new Error("User not found");
return await ctx.db
.query("projects")
.withIndex("by_user", (q) => q.eq("userId", user._id))
.collect();
},
});
**Verification**: Sign up → user created in Convex → authenticated queries work → sign out → routes protected.

---

### MODULE 6 — Payments with Stripe

**Objective**: The student has Stripe checkout, subscriptions, webhooks, and customer portal working.

**Lessons to generate:**

6.1 **Install Stripe**
```bash
pnpm add stripe
6.2 **Create products and prices in Stripe**
- Stripe dashboard → Products → Add product
- Create: Free plan (price: $0), Pro plan ($29/mo), Enterprise ($99/mo)
- Copy the Price IDs for each plan
6.3 **Checkout session création**
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
6.4 **Stripe webhook → Convex sync**
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
6.5 **Customer Portal**
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
6.6 **Pricing page component**
- Toggle monthly/annual
- Feature comparison table
- CTA buttons → Stripe Checkout
- Show current plan if logged in

**Verification**: Test mode checkout → webhook fires → user plan updated in Convex → customer portal accessible.

---

### MODULE 7 — Deployment: Vercel + Convex Production

**Objective**: The student deploys frontend (Vercel) and backend (Convex) to production.

**Lessons to generate:**

7.1 **Deploy Convex to production**
```bash
npx convex deploy
> - Sets up production environment
> - Separate from development (différent data)
> - Copy the production URL
>
> 7.2 **Deploy to Vercel**
> ```bash
> vercel --prod --yes --token "$VERCEL_TOKEN"
- Connect GitHub repo for auto-deploy on push
- Set environment variables in Vercel dashboard
- Custom domain configuration

7.3 **Environment variables in production**
- Vercel dashboard → Settings → Environment Variables
- Add ALL env vars from `.env.local`
- Use PRODUCTION keys (not test keys) for Stripe
- Clerk production instance

7.4 **Webhook URLs in production**
- Update Clerk webhook URL: `https://yourdomain.com/api/webhooks/clerk`
- Update Stripe webhook URL: `https://yourdomain.com/api/webhooks/stripe`
- Verify signatures work in production

7.5 **Post-deploy verification checklist**
- [ ] Homepage loads
- [ ] Sign up works → user created in Convex
- [ ] Dashboard loads for authenticated users
- [ ] Stripe checkout works (test mode first, then live)
- [ ] Webhooks fire correctly
- [ ] Custom domain with SSL

---

### MODULE 8 — Building Your First Dashboard

**Objective**: The student builds a complète dashboard UI with Claude Code.

**Lessons to generate:**

8.1 **Dashboard layout architecture**
> Dashboard Layout
> ├── Sidebar (navigation)
> │ ├── Logo
> │ ├── Nav links (Home, Projects, Analytics, Settings)
> │ └── User menu (profile, sign out)
> ├── Header (breadcrumbs, actions)
> └── Main content area
> └── Page-specific content
8.2 **Ask Claude Code step by step**
- "Create a dashboard layout with sidebar navigation using shadcn/ui Sheet for mobile and fixed sidebar for desktop"
- "Add a projects list page with a data table using shadcn/ui Table"
- "Create a project detail page with tabs: Overview, Settings, Activity"
- "Add a settings page with profile form and subscription management"
- "Build an analytics overview with metric cards and charts"

8.3 **Key patterns for dashboards**
- Server Components for data fetching (no loading spinners)
- Client Components for interactive elements (forms, modals)
- Optimistic updates with Convex `useMutation`
- Real-time data with Convex `useQuery` (auto-refreshes)
- Responsive: sidebar → sheet on mobile

8.4 **Common dashboard components to build**
- Metric cards (KPI display)
- Data tables with sorting, filtering, pagination
- Forms with validation (React Hook Form + Zod)
- Modals for create/edit flows
- Toast notifications for feedback
- Loading skeletons
- Empty states

**Exercise**: Build a complète dashboard with 4 pages: Overview, Projects, Analytics, Settings. All connected to Convex, authenticated with Clerk.

---

# ═══════════════════════════════════════════════
# PART 2 — THE PRODUCT PIPELINE
# "I ship products like Agentik OS does"
# Weeks 4-7 | 14-18 hours
# ═══════════════════════════════════════════════

### MODULE 9 — Claude Code as Your Development Partner

**Objective**: The student uses Claude Code effectively for all development tasks.

**Lessons to generate:**

9.1 **Setting up CLAUDE.md for your project**
- Project overview, tech stack, structure
- Design guidelines (theme, colors, fonts)
- Key commands (dev, build, deploy)
- Rules and constraints
- Port number, deployment info

9.2 **The conversation-driven development workflow**
- Start with intent: "I want to add a feature that..."
- Let Claude explore: "Read the existing code in src/app/(dashboard)/"
- Iterate: "The button is too wide on mobile, fix it"
- Verify: "Run the build to check for errors"
- Deploy: "Deploy to Vercel production"

9.3 **When to use Claude Code vs code yourself**
- Use Claude Code: scaffolding, repetitive code, refactoring, debugging, deployment
- Code yourself: complex business logic you understand better, créative design decisions
- Rule: if you can describe it clearly in words, Claude Code can build it

---

### MODULE 10 — /vision: Define Your Product Identity

**Objective**: The student creates a complète product vision document.

**Lessons to generate:**

10.1 **What /vision does**
- Enters Plan Mode (no code, pure discovery)
- Asks deep Socratic questions about WHO, HOW, WHAT NOT
- Generates VISION.md with: internal compass, personas, design principles
- This is the SOUL of your product — everything flows from here

10.2 **The vision discovery process**
- Who is this product for? (specific, not "everyone")
- What emotion should users feel? (confident, relieved, empowered?)
- What does this product NOT do? (boundaries are as important as features)
- Who are the 3 personas? (primary, secondary, edge case)
- What are the 5 design principles? (guide every UI decision)

10.3 **Using /vision in practice**
> /vision
- Answer every question thoughtfully
- Don't rush — this document guides everything
- Review and iterate on the output
- Save as `docs/VISION.md`

**Exercise**: Run /vision for the student's own product idea. Create a complète VISION.md.

---

### MODULE 11 — /prd: Product Requirements Documentation

**Objective**: The student generates a complète product documentation suite.

**Lessons to generate:**

11.1 **What /prd generates (11 files)**
- `PRD.md` — Product Requirements Document
- `FEATURES.md` — Feature specifications
- `USER-STORIES.md` — User stories (as a [role], I want to [action])
- `TECH-STACK.md` — Technology choices and justifications
- `MILESTONES.md` — Phased delivery plan
- `API-SPEC.md` — API contract definitions
- `DATA-MODEL.md` — Database schema design
- `UI-SPEC.md` — Key screens and flows
- `TESTING.md` — Test strategy
- `DEPLOYMENT.md` — Deployment architecture
- `RISKS.md` — Risk register

11.2 **Running /prd**
> /prd
- Reads VISION.md first (if it exists)
- Asks clarifying questions
- Generates all 11 files in `docs/`
- Each file is AI-agent-ready (structured for Claude Code to execute)

11.3 **Reviewing and refining the PRD**
- Check feature priorities — are they right?
- Check data model — does it match your needs?
- Check milestones — realistic timelines?
- Edit and re-run sections if needed

**Exercise**: Generate a complète PRD suite for the student's product.

---

### MODULE 12 — /brand-identity: Visual Identity System

**Objective**: The student creates a complète brand identity with design tokens.

**Lessons to generate:**

12.1 **What /brand-identity creates**
- Brand discovery (Kapferer Brand Identity Prism)
- 2-3 switchable visual variants
- Typography system (font pairings)
- Color system (oklch-based, dark/light)
- Voice and tone guidelines
- Logo direction
- AI prompt templates (for consistent image génération)
- Design tokens (CSS variables, Tailwind config)
- Component previews
- Deploys as interactive brand book on Vercel

12.2 **Running /brand-identity**
> /brand-identity
- Uses multi-agent orchestration (architect + designer + guardian)
- Generates complète brand book with live previews
- Exports design tokens for immédiate use in your project

12.3 **Applying brand tokens to your project**
- Copy design tokens into `globals.css`
- Update shadcn/ui theme
- Apply to all components

---

### MODULE 13 — /deepux: UX Redesign Engine

**Objective**: The student can run a full UX audit and redesign.

**Lessons to generate:**

13.1 **What /deepux does**
- Heuristic audit (10 usability heuristics)
- Persona simulation (tests UI as each persona)
- Information architecture review
- 11-layer parallel redesign (layout, typography, color, spacing, motion, etc.)
- Before/after visual comparison
- Uses team of agents (architect + implementers + guardian)

13.2 **Running /deepux**
> /deepux
- Takes screenshots of current state (baseline)
- Analyzes against design principles from VISION.md
- Redesigns with brand tokens enforcement
- Guardian verifies all deliverables
- Zero mocked data — 100% live backend

13.3 **When to use /deepux**
- After initial build (polish the MVP)
- When users complain about UX
- Before a major launch
- Quarterly UX refresh

---

### MODULE 14 — /planner: Implementation Planning

**Objective**: The student creates structured implementation plans.

**Lessons to generate:**

14.1 **What /planner creates**
- `tracker.json` — structured task decomposition
- Milestones → Slices → Tasks hierarchy
- Dependency graph (what must be done first)
- Time estimates per task
- Team assignment (which agent handles what)

14.2 **Running /planner**
> /planner # Full plan from PRD
> /planner mini # Quick plan for a single feature
> /planner global # Cross-project planning
> /planner resume # Continue from where you left off
14.3 **Executing the plan**
- Tasks are designed to fit in one Claude Code context window
- Each task has clear inputs, outputs, and acceptance criteria
- Progress tracked in tracker.json
- Drift detection: planner alerts if you're going off-plan

---

### MODULE 15 — /build, /new, /forge: The Full Pipelines

**Objective**: The student understands all pipeline commands and when to use each.

**Lessons to generate:**

15.1 **Pipeline comparison**

| Command | Starting point | Pipeline | Best for |
|---------|---------------|----------|----------|
| `/new` | Empty folder | Scaffold → Vision → PRD → Brand → DeepUX → Plan → Build → Verify | Brand new products |
| `/build` | Existing project | Vision → PRD → Brand → DeepUX → Plan → Build → Verify | Adding to existing code |
| `/forge` | Idea only | Deep Read → Discovery → Brand → PRD → Smart Stack → Team Build → Auto QA | Rapid MVP (idea → working product) |

15.2 **Running /new (complète pipeline)**
> /new
- Scaffolds project (Next.js + Convex + Clerk + Stripe)
- Runs /vision → /prd → /brand-identity → /deepux → /planner → executes → /check
- End result: deployed, tested, production-ready product

15.3 **Running /build (existing project)**
> /build
- Detects existing artifacts (VISION.md, PRD, etc.)
- Resumes where you left off
- Skips phases that are already done

15.4 **Running /forge (idea to MVP)**
> /forge
- Reads everything first (deep codebase analysis)
- Discovery phase (what exists, what's needed)
- Auto-selects optimal stack
- Team build (parallel agents)
- Auto QA (guardian verification)

---

### MODULE 16 — /check, /verify, /linear-setup: Quality & Feedback

**Objective**: The student deploys, verifies, and sets up feedback loops.

**Lessons to generate:**

16.1 **/check — Deploy + Verify pipeline**
> /check
- Pre-deploy: TypeScript check, uncommitted changes
- Deploy: Convex backend + Vercel frontend
- Verify: backend health, desktop UI, mobile UI
- Compare: screenshot vs Linear ticket expectations

16.2 **/verify — Quick page check**
> /verify https://yourdomain.com/dashboard
- Console errors, network failures, basic functionality
- Quick sanity check without full deploy

16.3 **/linear-setup — Feedback system**
> /linear-setup
- Installs feedback widget (floating button)
- API routes for submitting feedback
- Public feedback page
- Labels and categories in Linear
- MCP integration (Claude Code can manage tickets)

16.4 **/linear-fix — Fix tickets with AI**
> /linear-fix
- Fetches open tickets from Linear
- You choose which to fix
- AI fixes with verification across 6 dimensions
- Posts results back to Linear

---

# ═══════════════════════════════════════════════
# PART 3 — ADVANCED: YOUR OWN SYSTEMS
# "I build custom systems and automations"
# Weeks 8-10 | 12-16 hours
# ═══════════════════════════════════════════════

### MODULE 17 — Custom Dashboard with Monitoring

**Objective**: The student builds a custom monitoring dashboard for their systems.

**Lessons to generate:**

17.1 **Architecture**
- Next.js frontend with real-time Convex subscriptions
- Convex tables: services, deployments, cronJobs, alerts
- Cron jobs that check health and write to Convex
- Telegram notifications for alerts

17.2 **Service monitoring**
- Health check endpoints
- Status cards (green/yellow/red)
- Uptime tracking
- Response time graphs

17.3 **Deployment tracking**
- Log every deployment (project, URL, timestamp, status)
- Deployment timeline view
- Quick rollback from dashboard

17.4 **Alert system**
- Configurable alert rules
- Telegram integration for critical alerts
- Alert history and resolution tracking

---

### MODULE 18 — Cron Systems & Automation

**Objective**: The student builds automated pipelines that run on schedule.

**Lessons to generate:**

18.1 **Convex cron jobs**
- Daily, hourly, interval-based scheduling
- Internal functions only (not exposed to clients)
- Error handling and retry logic

18.2 **VPS cron jobs (for heavier tasks)**
- crontab setup
- Shell scripts that call Claude Code or APIs
- Logging and monitoring
- Examples: content publishing, social media posting, report génération

18.3 **Self-healing systems**
- Health checks that auto-restart failed services
- Retry with exponential backoff
- Circuit breakers
- Escalation to Telegram when auto-fix fails

---

### MODULE 19 — Claude Code Skills & Agents for Your Project

**Objective**: The student creates custom skills and agents for their specific workflow.

**Lessons to generate:**

19.1 **Project-specific skills**
- `/deploy` — deploy your project
- `/test` — run your tests
- `/audit` — audit your code
- `/report` — generate metrics report
- `/fix` — fix common issues

19.2 **Custom agents for your domain**
- Reviewer agent: checks code quality
- Tester agent: runs comprehensive tests
- Monitor agent: checks production health
- Content agent: generates domain-specific content

19.3 **Automating your entire workflow**
- Combine skills + agents + cron = autonomous development system
- Example: nightly test run → fix failures → deploy if green → notify

---

### MODULE 20 — Advanced Patterns & Scaling

**Objective**: The student knows how to scale their stack and handle production traffic.

**Lessons to generate:**

20.1 **Convex performance optimization**
- Index design for fast queries
- Pagination for large datasets
- Caching stratégies
- Optimistic updates for snappy UI

20.2 **Next.js performance**
- Server Components by default (zero client JS)
- Dynamic imports for heavy components
- Image optimization with next/image
- Edge functions for low-latency APIs

20.3 **Multi-tenant architecture**
- Clerk Organizations for team management
- Data isolation per organization in Convex
- Role-based access control

20.4 **Monitoring in production**
- Vercel Analytics + Speed Insights
- Convex dashboard for backend metrics
- Custom monitoring with the dashboard from Module 17
- Error tracking (Sentry integration)

---

### MODULE 21 — Project Final: Ship Your Product

**Objective**: The student ships a complète product using the full Agentik Stack.

**Project requirements:**

1. **Complète stack**: Next.js 16 + Convex + Clerk + Stripe + Vercel
2. **Design system**: shadcn/ui + tweakcn theme + dark mode
3. **Product pipeline**: VISION.md + PRD + brand tokens applied
4. **Dashboard**: at least 4 pages with real data
5. **Authentication**: sign up, sign in, protected routes, user sync
6. **Payments**: pricing page, checkout, webhook sync, customer portal
7. **2 custom skills**: project-specific Claude Code skills
8. **Monitoring**: at least basic health checks with alerts
9. **Deployed**: live on custom domain with SSL
10. **Feedback**: Linear widget installed and working

---

## Course Summary

| Part | Weeks | Modules | Hours | Focus |
|------|-------|---------|-------|-------|
| Stack Setup | 1-3 | 1-8 | 12-16h | Accounts, Next.js, shadcn, Convex, Clerk, Stripe, Vercel, Dashboard |
| Product Pipeline | 4-7 | 9-16 | 14-18h | Claude Code, /vision, /prd, /brand, /deepux, /planner, /build, /check |
| Advanced | 8-10 | 17-21 | 12-16h | Monitoring, cron, custom skills/agents, scaling, final project |
| **TOTAL** | **10** | **21** | **38-50h** | **Full Agentik Stack mastery** |

---

## Bonus & Resources

- **Starter template repo**: Next.js + Convex + Clerk + Stripe pre-configured
- **CLAUDE.md template**: production-ready project instructions
- **shadcn/ui component cheat sheet**: all components with usage examples
- **Env vars checklist**: every key you need organized by service
- **Deployment checklist**: 30-item pre-launch verification
- **Community Telegram**: support, showcase, updates
- **Lifetime access**: all future updates included

## Upsell

> "Want us to build your product? Agentik {OS} offers AI Build ($15K-45K) for custom product development, and CAIO Partnership ($4K-15K/month) for ongoing AI leadership. agentik-os.com/pricing"

---

**END OF DOCUMENT — Course: The Agentik Stack — Setup, Build & Ship**
