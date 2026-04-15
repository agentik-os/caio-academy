# Course 2 — Agentic Coding: Systems Builder

## Instructions for the Course Création Agent

> **Goal**: Generate a complète, ultra-technical (yet accessible) course on building production AI systems: automation, SaaS, agents, MCP, CLI, monitoring, deployment. Everything Agentik OS does for its clients, taught in a structured format.
>
> **Tone**: Technical but clear. We show code, architectures, real workflows. No vague theory — each module results in a concrete deliverable.
>
> **Format**: Each module = screencast video + source code + hands-on exercise + project to submit.
>
> **Estimated duration**: 30-40 hours of content. 4-6 weeks to complète.
>
> **Price**: $497 standalone / included in the $997 bundle (all 3 courses)

---

## Course Identity

| Field | Value |
|-------|-------|
| Name | **Agentic Coding — Systems Builder** |
| Subtitle | Build production AI systems with Claude Code, MCP & the modern stack |
| Creator | Gareth Simono — Founder of Agentik {OS} |
| Target audience | Developers, technicians, tech entrepreneurs, aspiring CAIOs |
| Prerequisites | Programming basics (JS/TS preferred), terminal, Git. No need to be senior. |
| Promise | "In 6 weeks, you'll know how to build a complète SaaS with authentication, payments, AI agents, and production deployment — the same stack Agentik OS uses for its clients" |
| Upsell | AI Build coaching ($15K-45K) or CAIO Partnership on agentik-os.com |

---

## Complète Module Structure

### MODULE 1 — Claude Code: The Fundamentals

**Objective**: The student masters Claude Code as their primary development tool and understands its architecture.

**Lessons to generate:**

1.1 **What is Claude Code and why it's différent**
- Anthropic's official CLI for agentic development
- Direct filesystem access (native read/write/edit)
- Tool usage (bash, code search, git)
- Agent spawning (sub-agents for parallel work)
- Memory system (persistent context across sessions)
- Hooks and Skills (event-driven automation + reusable capabilities)
- Comparison with Cursor, Windsurf, Copilot — why Claude Code is superior for systems development

1.2 **Installation & Configuration**
- Installation: `npm install -g @anthropic-ai/claude-code`
- Authentication: `claude login`
- First launch in a project
- Essential config files:
 - `~/.claude/settings.json` (global)
 - `~/.claude/CLAUDE.md` (global instructions)
 - `./CLAUDE.md` (project instructions)
 - `./.claude/settings.json` (project settings)
 - `./.claude/rules/*.md` (auto-loaded rules)

1.3 **The CLAUDE.md system — The most important file**
- Structure of an effective CLAUDE.md: Overview, Tech Stack, Project Structure, Design Guidelines, Key Commands, Rules
- Real examples from Agentik OS (simplified version)
- How to iterate on your CLAUDE.md throughout the project
- Exercise: The student creates the CLAUDE.md for their first project

1.4 **Working efficiently with Claude Code**
- Be specific > be vague
- Provide context (file références, components, patterns)
- Let Claude explore (it can read the codebase)
- Use agents for complex tasks
- Self-check: Claude verifies its own output
- Permissions and modes (plan, auto, bypassPermissions)

1.5 **Live demo: Building a component from start to finish**
- Screencast: creating a React component with Claude Code
- From intention to implementation in a single session
- Showing the real workflow: prompt → read existing code → implementation → verification

**Hands-on exercise**: Install Claude Code, configure a project, create a CLAUDE.md, and generate a first component.

---

### MODULE 2 — MCP (Model Context Protocol): The Universal Connector

**Objective**: The student understands MCP, knows how to configure MCP servers, and can connect Claude to any external service.

**Lessons to generate:**

2.1 **What is MCP and why it's revolutionary**
- MCP = "USB for AI" — a universal standard for connecting models to external tools
- Architecture: Claude Code ←→ MCP Server ←→ External Service
- The 3 primitives: Tools (functions), Resources (data), Prompts (templates)
- Why MCP > direct APIs (standardization, discovery, composability)

2.2 **Configuring MCP servers**
- Configuration in `~/.claude/settings.json` (mcpServers)
- Structure: command, args, env
- Examples with popular servers:
 - Playwright (browser automation)
 - PostgreSQL (database access)
 - Filesystem (cross-project file operations)
 - GitHub (repo management)
 - Slack, Gmail, Google Drive, Linear, Notion
- Debugging: logs, common errors, connection verification

2.3 **Composio: The multi-tool integration platform**
- What is Composio: 200+ pre-integrated apps
- Without Composio (4 custom integrations = 40+ hours) vs With (1 MCP server = 30 minutes)
- Installation: `npm install -g composio-core`
- Connecting apps: `composio add github`, `composio add slack`, etc.
- Using in workflows: Claude can send emails, post on LinkedIn, create GitHub issues, etc.

2.4 **Building a custom MCP Server**
- When to build your own (no existing server matches your need)
- Architecture of a TypeScript MCP server:
 - Importing the SDK `@modelcontextprotocol/sdk/server`
 - Declaring tools (name, description, inputSchema)
 - Implementing handlers (tools/list, tools/call)
- Full example: an MCP server that connects to a specific business API
- Testing and debugging
- Publishing (npm, GitHub)

2.5 **Advanced MCP workflows**
- Chaining multiple MCP servers in a workflow
- Example: GitHub → report → Gmail → Slack → Notion → Google Calendar
- Error handling and retries
- Monitoring MCP connections

**Hands-on exercise**: Configure 3 MCP servers (Composio + Playwright + a custom one), create a workflow connecting 2 external services.

---

### MODULE 3 — Skills, Hooks & Commands: Your Custom Arsenal

**Objective**: The student knows how to create reusable skills, automation hooks, and custom commands for Claude Code.

**Lessons to generate:**

3.1 **Skills — Reusable AI capabilities**
- Anatomy of a skill: YAML frontmatter + markdown instructions
- Where to store them: `~/.claude/commands/` (global) or `.claude/commands/` (project)
- User-invokable vs auto-triggered skills
- Examples of essential skills for a CAIO:
 - `/deploy`: deploy to production
 - `/audit`: security & code audit
 - `/blog-write`: generate SEO blog content
 - `/test`: run comprehensive tests
 - `/report`: generate client reports
 - `/social-post`: post to social media

3.2 **How to write an effective skill**
- The frontmatter: name, description, triggers
- The instructions: step-by-step, clear, unambiguous
- Context management: how the skill accesses project files
- Best practices: one skill = one responsibility
- Testing and iterating on your skills

3.3 **Hooks — Event-driven automation**
- Event types:
 - `PreToolUse`: before a tool executes (validation, logging)
 - `PostToolUse`: after (notifications, tracking)
 - `SessionStart`: session start (load context, set environment)
 - `SessionEnd`: session end (save, cleanup)
 - `UserPromptSubmit`: capture prompts for analysis
- Configuration in `.claude/settings.json`: matcher, command
- Concrete examples:
 - Log every modified file
 - Notify via Telegram when a deploy is done
 - Automatically load context at startup
 - Save a session summary at the end

3.4 **Commands — Custom slash commands**
- Creating a file `.claude/commands/name.md`
- Structure: frontmatter + instructions
- Différence between command and skill (explicit user invocation vs auto-trigger)
- Examples: `/audit`, `/deploy`, `/fix`, `/test`

3.5 **Building your complète CAIO toolkit**
- The 10 essential skills/commands
- File organization (recommended folder structure)
- Versioning and sharing your skills (Git, npm)
- The philosophy: every repetitive task = a skill

**Hands-on exercise**: Create 3 custom skills for your project, configure 2 hooks, and document everything.

---

### MODULE 4 — Automation & Cron Systems

**Objective**: The student knows how to automate recurring tasks with cron jobs and autonomous AI pipelines.

**Lessons to generate:**

4.1 **Why automation is the core of the CAIO business**
- What you can automate: blog, social media, SEO monitoring, client reports, health checks, backups, content syndication
- Going from "I do it" to "it does itself" — that's where the value explodes

4.2 **Cron fundamentals**
- Cron syntax: minute, hour, day of month, month, day of week
- Examples: every day at 9am, every 6 hours, the 1st of each month
- `crontab -e`, `crontab -l`
- Logging and debugging cron jobs

4.3 **Automated content pipelines**
- Real example: auto-publish blog articles
 - ZSH script: select a topic → Claude generates the article → generate the image → create the blog file → build & deploy → post to social media → Telegram notification
- Example: automated social publishing (LinkedIn, Twitter, Reddit)
- Example: daily SEO monitoring with alerts

4.4 **Trigger.dev — Background jobs & durable workflows**
- What is Trigger.dev: background job platform for TypeScript
- Use cases: long-running tasks, automatic retries, queues, multi-step workflows
- Setup in a Next.js project
- Examples: email sequences, data processing, webhook handlers

4.5 **Inngest & Pipedream — Alternatives and complementary tools**
- Inngest: event-driven workflows, step functions
- Pipedream: low-code workflows with custom code
- When to use what: decision tree

4.6 **Monitoring & Self-Healing**
- Monitoring your automations (logs, alerts)
- Self-healing: automatic retry, fallbacks, circuit breakers
- Homemade monitoring dashboard (or how to use existing tools)
- Telegram notifications for every critical error

**Hands-on exercise**: Create a cron pipeline that automatically generates and publishes content (blog OR social).

---

### MODULE 5 — Building a SaaS with Next.js 16

**Objective**: The student masters the Next.js framework with App Router for building production web applications.

**Lessons to generate:**

5.1 **Next.js 16 — The référence framework**
- Why Next.js (SSR, SSG, App Router, Server Components, Server Actions)
- Setup: `npx create-next-app@latest` with TypeScript, Tailwind, App Router
- Project structure: `src/app/`, layouts, pages, components
- Turbopack for fast development

5.2 **React 19 — Server Components & Server Actions**
- The Server Components revolution: why it's game-changing
- Server Actions: mutations without API routes
- `"use client"` vs server components by default
- Patterns: when to use what

5.3 **Tailwind CSS v4 + shadcn/ui**
- Tailwind v4 setup (CSS-first config)
- shadcn/ui: accessible, performant, customizable components
- Installation: `npx shadcn@latest init`
- Essential components: Button, Card, Dialog, Form, Table, etc.
- Theming: creating your own theme (dark/light mode)

5.4 **Routing & Layouts**
- App Router: file-system routing
- Nested layouts, route groups `(marketing)/`, `(dashboard)/`
- Dynamic routes `[slug]`, catch-all `[...slug]`
- Loading, error, not-found pages
- Metadata API for SEO

5.5 **Data Fetching & Caching**
- Server Components: fetch directly in components
- `"use cache"` directive (Next.js 16)
- Revalidation: `revalidateTag()`, `revalidatePath()`
- Patterns: when to fetch server-side vs client-side

5.6 **Deploying to Vercel**
- Vercel setup: `vercel --prod --yes --token`
- Environment variables
- Custom domains
- Preview deployments
- Analytics and Web Vitals

**Hands-on exercise**: Scaffold a complète Next.js SaaS with 3 pages, a custom theme, and deploy it to Vercel.

---

### MODULE 6 — Database with Convex

**Objective**: The student knows how to use Convex as a real-time backend for their applications.

**Lessons to generate:**

6.1 **Convex — The next-génération backend**
- What is Convex: reactive, real-time, TypeScript-native database
- Why Convex > Firebase/Supabase for modern SaaS
- Architecture: schema → queries → mutations → actions
- Setup: `npm create convex@latest`

6.2 **Schema Design**
- Defining your tables with `defineSchema()` and `defineTable()`
- Types: `v.string()`, `v.number()`, `v.boolean()`, `v.array()`, `v.object()`
- Relations: références between tables
- Indexes for performance
- Migrations

6.3 **Queries — Reading data**
- `query()`: read-only, reactive functions
- Filters, sorting, pagination
- Real-time subscriptions (components update automatically)
- Patterns: composed queries, conditional queries

6.4 **Mutations — Writing data**
- `mutation()`: transactional write functions
- Insert, update, delete
- Data validation
- Client-side optimistic updates

6.5 **Actions — External logic**
- `action()`: functions that can call external APIs
- When to use action vs mutation
- Scheduling: `ctx.scheduler.runAfter()`
- Convex cron jobs

6.6 **Next.js + Convex integration**
- ConvexProvider setup
- `useQuery()`, `useMutation()`, `useAction()` hooks
- Server-side Convex with `preloadQuery()`
- Recommended architecture patterns

**Hands-on exercise**: Create a complète Convex backend with schema, queries, mutations, and frontend integration.

---

### MODULE 7 — Authentication with Clerk

**Objective**: The student knows how to implement a complète authentication system with Clerk.

**Lessons to generate:**

7.1 **Clerk — Modern auth in 10 minutes**
- What is Clerk: complète auth platform (sign-up, sign-in, user management, organizations)
- Why Clerk > Auth.js/NextAuth (DX, features, support)
- Setup: `npm install @clerk/nextjs`, API keys

7.2 **Next.js integration**
- `ClerkProvider` in the root layout
- Middleware: `clerkMiddleware()` to protect routes
- Pre-built components: `<SignInButton>`, `<UserButton>`, `<SignUp>`
- Custom auth pages

7.3 **User management**
- `currentUser()`, `auth()` server-side
- `useUser()`, `useAuth()` client-side
- Custom metadata (plan, role, préférences)
- Clerk webhooks → Convex (sync users)

7.4 **Organizations & Roles**
- Multi-tenancy with Clerk Organizations
- Custom roles and permissions
- Member invitations
- Admin dashboard

7.5 **Clerk + Convex integration**
- Sync webhook: Clerk → Convex (create/update/delete users)
- Auth in Convex queries/mutations
- Pattern: verify identity in every mutation

**Hands-on exercise**: Add Clerk to the Next.js app, protect routes, sync users with Convex.

---

### MODULE 8 — Payments with Stripe

**Objective**: The student knows how to implement payments, subscriptions, and a customer portal with Stripe.

**Lessons to generate:**

8.1 **Stripe — The online payment standard**
- Setup: API keys, dashboard, test mode
- Concepts: Products, Prices, Customers, Subscriptions, Checkout Sessions

8.2 **Checkout Sessions**
- One-time payments
- Monthly/annual subscriptions
- Redirect to Stripe Checkout
- Handling success/cancel URLs

8.3 **Stripe Webhooks**
- Listening for events: `checkout.session.completed`, `invoice.paid`, `customer.subscription.updated/deleted`
- Signature verification
- Status updates in Convex
- Error handling and retries

8.4 **Customer Portal**
- Self-service portal: subscription management, billing, payment methods
- Configuration in the Stripe dashboard
- Integration in the app

8.5 **Complète pricing page**
- Pricing component with monthly/annual toggle
- Feature comparison table
- CTAs connected to Stripe Checkout
- Managing "subscribed" vs "free" state

8.6 **Full integration: Clerk + Convex + Stripe**
- Complète flow: Sign up (Clerk) → Choose plan (Stripe) → Access features (Convex)
- Sync: Stripe webhooks → Convex mutations → UI update
- Handling edge cases: failed payment, downgrade, cancellation

**Hands-on exercise**: Implement the complète payment flow: pricing page → checkout → webhook → premium access.

---

### MODULE 9 — AI Agent Architecture

**Objective**: The student understands how to design and deploy multi-agent architectures.

**Lessons to generate:**

9.1 **What an AI agent really is**
- Agent = model + tools + decision loop
- Différence between prompt engineering and agent engineering
- Agent patterns: single agent, pipeline, swarm, hierarchical (ORACLE pattern)

9.2 **The ORACLE pattern — Multi-agent orchestration**
- How Agentik OS orchestrates 265+ agents
- Task classification: SIMPLE → MEDIUM → COMPLEX → EPIC
- Intelligent routing: which agent for which task
- Fresh context engineering: each agent receives exactly the context it needs

9.3 **Building a multi-agent system with Claude Code**
- Agent spawning: `Agent(subagent_type, prompt, mode)`
- Background agents: `run_in_background: true`
- Inter-agent communication: `SendMessage()`
- Isolation: worktrees for parallel work
- Patterns: specialist agents, guardian agents, pipeline agents

9.4 **Claude Agent SDK**
- For building custom agents outside of Claude Code
- Architecture: model + tools + orchestration loop
- Integration with MCP servers
- Production deployment

9.5 **Designing an agent architecture for a client**
- Needs audit: which processes to automate
- Design: which agents, which tools, which flow
- Progressive implementation: start small, iterate
- Monitoring: observing agents in production

**Hands-on exercise**: Design and implement a system of 3-5 agents for a real use case (e.g.: content pipeline, support system, automated audit).

---

### MODULE 10 — Production, Deployment & DevOps

**Objective**: The student knows how to deploy and maintain systems in production.

**Lessons to generate:**

10.1 **The VPS as command center**
- Why a VPS (vs serverless alone): cron jobs, persistent agents, monitoring
- Setup: Ubuntu, SSH, ZSH, security hardening
- Project structure on the server

10.2 **CI/CD with GitHub Actions**
- Basic workflow: push → test → build → deploy
- Environment variables and secrets
- Conditional deploy (main only)
- Deploy notifications

10.3 **Monitoring & Observability**
- Automated health checks
- Structured logging
- Telegram alerts for critical errors
- Monitoring dashboard

10.4 **Production security**
- HTTPS, security headers
- Environment variables (never secrets in code)
- Rate limiting
- CORS, CSRF protection
- Dependency auditing

10.5 **Maintenance & Évolution**
- Dependency updates
- Database migrations
- Rollback strategy
- Living documentation (CLAUDE.md always up to date)

**Final project**: Deploy the complète SaaS (Next.js + Convex + Clerk + Stripe + agents) to production with monitoring.

---

## Capstone Project

Throughout the course, the student builds ONE complète SaaS project:

| Stage | Module | Deliverable |
|-------|--------|-------------|
| Setup | 1-2 | Next.js project + Claude Code + MCP configured |
| Backend | 5-6 | Next.js app + Convex with complète schema |
| Auth | 7 | Sign-up/sign-in + user sync |
| Payments | 8 | Pricing page + checkout + webhooks |
| Automation | 3-4 | Custom skills + cron jobs + pipelines |
| Agents | 9 | Integrated multi-agent system |
| Production | 10 | SaaS deployed, monitored, client-ready |

---

## Bonuses & Resources

- GitHub template repo with the complète SaaS starter
- Access to the dev Telegram community
- Source code for all examples
- SaaS launch checklist
- Lifetime updates

## Upsell

> "Want us to build your SaaS with you? Agentik {OS} offers an AI Build service ($15K-45K) where we develop your product from A to Z. agentik-os.com/pricing"

---

**END OF DOCUMENT — Course 2: Agentic Coding — Systems Builder**
