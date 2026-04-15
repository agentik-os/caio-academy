# Course 6 — MCP & API Mastery

## Connect Anything to Anything: The Integration Engineer's Playbook

## Instructions for the Course Creator Agent

> **Objective**: Generate the most comprehensive course on connecting AI tools and services together. The student masters MCP (Model Context Protocol), REST APIs, GraphQL, webhooks, OAuth, and automation platforms to build any integration they can imagine. This is the "plumbing" course — the one that makes everything else work together.
>
> **Tone**: Technical but clear. Every concept is demonstrated with real code and real integrations. The student builds actual working connections, not theoretical knowledge.
>
> **Format**: Each module = video screencast + code walkthrough + hands-on exercise + production-ready template.
>
> **Estimated duration**: 25-35 hours of content. 5-7 weeks to complète.
>
> **Price**: $497 standalone / included in premium bundle

---

## Course Identity

| Field | Value |
|-------|-------|
| Name | **MCP & API Mastery — The Integration Engineer's Playbook** |
| Subtitle | Connect AI to any service, build any integration, automate any workflow |
| Creator | Gareth Simono — Founder of Agentik {OS} |
| Target audience | Developers, CAIO practitioners, automation builders, technical entrepreneurs |
| Prerequisites | Basic programming (JS/TS preferred), comfortable with terminal and HTTP concepts |
| Promise | "In 7 weeks, you can connect ANY tool to ANY other tool — via MCP, API, webhook, or automation platform — and build production-grade integrations that run autonomously" |
| Upsell | AI Build service ($15K-45K) or CAIO Partnership on agentik-os.com |

---

## Complète Module Structure

### MODULE 1 — The Integration Mindset

**Objective**: The student understands why integrations are the #1 skill for AI builders and how to think about connecting systems.

**Lessons to generate:**

1.1 **Why integrations are the real superpower**
- AI models are powerful in isolation. Connected AI models are unstoppable.
- Example: Claude alone = smart assistant. Claude + GitHub + Slack + Gmail + Notion = autonomous team member.
- The CAIO's secret: 80% of the value comes from connecting tools, not from the tools themselves.
- The integration economy: every new tool creates N new integration opportunities.

1.2 **The 5 connection methods**

| Method | When to use | Complexity | Speed |
|--------|------------|------------|-------|
| **MCP** | AI-native connections (Claude Code) | Medium | Fast |
| **REST API** | Standard service-to-service | Medium | Medium |
| **GraphQL** | Complex data queries | High | Medium |
| **Webhooks** | Event-driven (real-time) | Low | Instant |
| **Automation platforms** | No-code/low-code | Low | Fast |

1.3 **How to evaluate an integration approach**
- Does the service have an MCP server? → Use MCP (fastest for AI)
- No MCP but good REST API? → Build direct integration
- Need real-time events? → Webhooks
- Just prototyping? → Zapier/Make/n8n
- Need complex queries? → GraphQL if available

1.4 **The integration architecture**

A well-designed integration system operates across four complementary layers. The **MCP Layer** handles AI-native connections between models and external services. The **API Layer** manages direct service-to-service calls via REST or GraphQL. The **Webhook Layer** listens for real-time events emitted by third-party services. Finally, the **Automation Layer** orchestrates complex workflows that span the three preceding layers.

---

### MODULE 2 — MCP (Model Context Protocol) Deep Dive

**Objective**: Master MCP — the standard protocol for connecting AI models to external services.

**Lessons to generate:**

2.1 **What is MCP and why it changes everything**
- MCP = Model Context Protocol = "USB for AI"
- Open standard, not Anthropic-specific
- The 3 primitives: Tools (functions), Resources (data), Prompts (templates)
- Architecture: AI Model ←→ MCP Server ←→ External Service
- Why MCP > raw API calls (standardization, discovery, composability)

2.2 **MCP server types**

| Type | Protocol | Use case | Example |
|------|----------|----------|---------|
| `stdio` | JSON-RPC stdin/stdout | Local processes | File system, database |
| `http` | HTTP POST | Remote servers | Cloud APIs |
| `sse` | Server-Sent Events | Streaming updates | Real-time data |

2.3 **Configuring MCP servers**
- Configuration in `.mcp.json` (project level)
- Configuration in `~/.mcp.json` (global)
- Configuration in `settings.json` (Claude Code settings)
- Fields: `type`, `command`, `args`, `env`
- Environment variables and secrets management
- Debug: logs, common errors, connection verification

2.4 **The essential MCP servers catalog**

| Server | What it does | Install |
|--------|-------------|---------|
| **Composio** | 200+ app integrations (Slack, Gmail, LinkedIn, etc.) | `composio-mcp` |
| **Playwright** | Browser automation, screenshots, testing | `@anthropic/mcp-playwright` |
| **PostgreSQL** | Direct database queries | `mcp-server-postgresql` |
| **Filesystem** | Cross-project file access | `@modelcontextprotocol/server-filesystem` |
| **GitHub** | Issues, PRs, code, repos | `@modelcontextprotocol/server-github` |
| **Chrome DevTools** | Browser debugging | `mcp-chrome-devtools` |
| **Context7** | Up-to-date library documentation | `@context7/mcp` |
| **Memory/Search** | Persistent semantic memory | `claude-mem` |
| **Linear** | Project management, tickets | `mcp-linear` |
| **Notion** | Document management | Via Composio |
| **Slack** | Team messaging | Via Composio |
| **Gmail** | Email sending/reading | Via Composio |

2.5 **Tool search for large MCP servers**
- When a server has 100+ tools (e.g., Composio with 200+ apps)
- Enable `toolSearch: true` in server config
- `ToolSearch` tool: search and lazy-load tool schemas on demand
- Reduces context cost and startup time
- Naming convention: `mcp__<server>__<tool>` (e.g., `mcp__github__search_repositories`)

2.6 **MCP in subagents**
- Each agent can have its own MCP servers
- Configuration in agent frontmatter: `mcpServers: [github, postgresql]`
- Isolation: agent only sees its declared MCP servers
- Pattern: give each agent exactly the tools it needs, nothing more

**Exercise**: Configure 5 MCP servers, verify all connections, and create a workflow that uses 3 of them in sequence.

---

### MODULE 3 — Building Custom MCP Servers

**Objective**: The student can build MCP servers for any API or service that doesn't have one yet.

**Lessons to generate:**

3.1 **When to build your own**
- No existing MCP server for the service you need
- Existing server doesn't cover your use case
- You want tighter integration or custom logic
- You want to publish and share with the community

3.2 **MCP server architecture (TypeScript)**
```typescript
import { Server } from "@modelcontextprotocol/sdk/server";

const server = new Server({
 name: "my-custom-server",
 version: "1.0.0",
});

// Declare tools
server.setRequestHandler("tools/list", async () => ({
 tools: [{
 name: "my_tool",
 description: "Does something useful",
 inputSchema: {
 type: "object",
 properties: {
 query: { type: "string", description: "Search query" }
 },
 required: ["query"]
 }
 }]
}));

// Implement handlers
server.setRequestHandler("tools/call", async (request) => {
 if (request.params.name === "my_tool") {
 const result = await doSomething(request.params.arguments.query);
 return { content: [{ type: "text", text: JSON.stringify(result) }] };
 }
});

3.3 **MCP server with Python (FastMCP)**
- FastMCP: the easiest way to build MCP servers in Python
- Decorator-based tool declaration
- Automatic schema génération from type hints
- When to use Python vs TypeScript

3.4 **Resources and Prompts**
- Resources: expose data that the AI can read (files, database records, config)
- Prompts: reusable templates for common interactions
- When to use resources vs tools

3.5 **Testing and debugging MCP servers**
- MCP Inspector: visual testing tool
- Log analysis
- Error handling best practices
- Testing with Claude Code

3.6 **Publishing your MCP server**
- Package as npm module or pip package
- Documentation standards
- Configuration examples
- Community submission (MCP registry)

**Exercise**: Build a custom MCP server that connects to a real API (weather, crypto, news, or any service the student chooses). Publish it.

---

### MODULE 4 — REST API Mastery

**Objective**: The student can read any API documentation and build integrations in minutes.

**Lessons to generate:**

4.1 **HTTP fundamentals (5-minute refresher)**
- Methods: GET (read), POST (create), PUT (update), DELETE (remove), PATCH (partial update)
- Status codes: 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error)
- Headers: Content-Type, Authorization, Accept
- Body formats: JSON (99% of cases), form-data (file uploads)

4.2 **Reading API documentation like a pro**
- OpenAPI/Swagger specs: how to read them
- Authentication section first (how to get in)
- Endpoints catalog (what you can do)
- Request/response examples (what it looks like)
- Rate limits (how much you can do)
- Practice: read 3 real API docs in 10 minutes each

4.3 **Authentication methods**

| Method | How it works | When used |
|--------|-------------|-----------|
| **API Key** | Static key in header/query | Simple APIs (OpenAI, Anthropic) |
| **Bearer Token** | JWT or opaque token in Authorization header | Most modern APIs |
| **OAuth 2.0** | Token exchange flow | User-delegated access (Google, GitHub) |
| **Basic Auth** | Base64 username:password | Legacy APIs |
| **HMAC Signature** | Signed requests | Webhooks (Stripe, GitHub) |

4.4 **OAuth 2.0 deep dive**
- Authorization Code flow (web apps)
- Client Credentials flow (server-to-server)
- Refresh tokens (long-lived access)
- Scopes (granular permissions)
- Practical implementation with real APIs

4.5 **Building API integrations in TypeScript**
- fetch() vs axios vs ky
- Error handling and retries
- Rate limiting (respect limits, implement backoff)
- Pagination (cursor-based, offset-based)
- Response parsing and type safety
- Caching stratégies

4.6 **Common API patterns**
- CRUD operations (Create, Read, Update, Delete)
- Search and filtering
- Batch operations
- File upload/download
- Long-running operations (polling vs webhooks)

4.7 **Testing APIs**
- Postman/Hoppscotch: interactive testing
- cURL: command-line testing
- Automated tests with Vitest/Jest
- Mock servers for development

**Exercise**: Build a complète integration with 3 différent APIs (GitHub + Stripe + a service of choice). Handle auth, pagination, errors, and rate limits.

---

### MODULE 5 — Webhooks & Event-Driven Architecture

**Objective**: The student masters event-driven integrations with webhooks.

**Lessons to generate:**

5.1 **What are webhooks (push vs pull)**
- Pull: you ask the API for updates (polling)
- Push: the API tells YOU when something happens (webhooks)
- Why push > pull (real-time, efficient, no wasted requests)

5.2 **Webhook architecture**

The webhook flow follows a linear chain: the **external service** sends an HTTP POST to **your endpoint**, which performs **processing** of the payload, then triggers the appropriate **reaction** (database update, notification, downstream workflow trigger).

5.3 **Building webhook receivers**
- Next.js API routes as webhook endpoints
- Express.js webhook server
- Vercel serverless functions
- Request validation and signature verification

5.4 **Webhook security**
- Signature verification (HMAC-SHA256)
- IP allowlisting
- Replay protection (timestamp validation)
- Idempotency (handle duplicate deliveries)
- Stripe webhook verification example
- GitHub webhook verification example

5.5 **Common webhook patterns**

| Service | Events | Use case |
|---------|--------|----------|
| **Stripe** | payment_intent.succeeded, customer.subscription.updated | Payment processing |
| **GitHub** | push, pull_request, issues | CI/CD, notifications |
| **Clerk** | user.created, user.updated, user.deleted | User sync |
| **Linear** | Issue.create, Issue.update | Ticket automation |
| **Shopify** | orders/create, products/update | E-commerce automation |

5.6 **Webhook debugging**
- ngrok: expose localhost to the internet for testing
- webhook.site: inspect incoming payloads
- Retry logic: what happens when your server is down
- Dead letter queues: don't lose failed events

5.7 **Event-driven workflows**
- Webhook → Queue → Worker → Action
- Using Trigger.dev for durable webhook processing
- Using Inngest for event-driven step functions
- Chaining events: webhook A triggers action B which sends webhook C

**Exercise**: Set up webhook receivers for Stripe and GitHub. Process events and trigger downstream actions.

---

### MODULE 6 — Composio: The Meta-Connector

**Objective**: Master Composio as the central hub for all integrations.

**Lessons to generate:**

6.1 **What is Composio and why it's a game-changer**
- 200+ apps pre-integrated
- One SDK, one auth flow, one MCP server
- Without Composio: build 4 integrations (40+ hours). With Composio: 30 minutes.

6.2 **Setup and configuration**
- Install: `npm install -g composio-core`
- Add to Claude Code: MCP server configuration
- Connect apps: `composio add github`, `composio add slack`, etc.
- List connections: `composio connections list`

6.3 **Available integrations (top 30)**
- Communication: Slack, Gmail, Discord, Telegram
- Social: LinkedIn, Twitter/X, Instagram, Reddit
- Project management: Linear, Notion, Asana, Jira
- Dev tools: GitHub, GitLab, Vercel
- CRM: HubSpot, Salesforce
- Calendar: Google Calendar, Cal.com
- Storage: Google Drive, Dropbox
- And 170+ more...

6.4 **Building workflows with Composio**
- Example: auto-posting to social media
- Example: client reporting (GitHub → Notion → Gmail)
- Example: lead capture (form → CRM → email sequence)
- Example: content syndication (blog → LinkedIn → Twitter → Reddit)

6.5 **Composio + Claude Code agents**
- Each agent can use Composio through MCP
- Pattern: specialized agents with specific Composio tools
- Example: a "social media agent" with access to LinkedIn + Twitter + Instagram
- Example: a "support agent" with access to Linear + Slack + Gmail

**Exercise**: Connect 5 apps through Composio and build 2 complète automated workflows.

---

### MODULE 7 — Automation Platforms: n8n, Trigger.dev, Make

**Objective**: Master the top automation platforms for building production workflows.

**Lessons to generate:**

7.1 **n8n — Open-source, self-hosted automation**
- Why n8n: free, self-hosted, unlimited workflows
- Visual node editor: drag-and-drop workflow building
- 400+ integrations
- Code nodes: write custom JavaScript when needed
- n8n MCP server: trigger workflows from Claude Code
- Self-hosting on VPS: setup and maintenance

7.2 **Trigger.dev — TypeScript-native background jobs**
- Why Trigger.dev: type-safe, durable execution, built for developers
- Task definitions, retries, queues
- Cron scheduling
- Long-running jobs (image génération, data processing)
- Integration with Next.js
- When to use: background jobs, scheduled tasks, complex multi-step workflows

7.3 **Make (Integromat) — Visual workflows**
- 1500+ app integrations
- Complex branching logic
- Scenarios: visual workflow builder
- When to use: complex conditional workflows, non-developers

7.4 **Zapier — The simple option**
- 6000+ app integrations
- Zaps: trigger → action → action
- When to use: simple automations, quick prototypes
- Limitations: cost at scale, limited complexity

7.5 **Inngest — Event-driven step functions**
- Event-driven architecture
- Durable execution (survives failures)
- Step functions with automatic retries
- When to use: complex event-driven workflows

7.6 **The decision matrix**

| Need | Best tool |
|------|-----------|
| Free, unlimited, self-hosted | n8n |
| TypeScript, production jobs | Trigger.dev |
| Visual, complex branching | Make |
| Simple, fast setup | Zapier |
| Event-driven, durable | Inngest |
| AI-native, multi-tool | Composio |

**Exercise**: Build the same workflow in n8n AND Trigger.dev. Compare the expérience.

---

### MODULE 8 — GraphQL (When You Need It)

**Objective**: Understand when and how to use GraphQL for integrations.

**Lessons to generate:**

8.1 **GraphQL vs REST — When to use what**
- REST: standard CRUD, simple queries, most APIs
- GraphQL: complex nested data, flexible queries, specific APIs (GitHub, Shopify, Hasura)

8.2 **GraphQL fundamentals**
- Queries (read), Mutations (write), Subscriptions (real-time)
- Schema and types
- Variables and fragments
- Introspection: discover the API from itself

8.3 **Practical GraphQL integrations**
- GitHub GraphQL API (most common use case)
- Shopify Storefront API
- Hasura for instant GraphQL on PostgreSQL
- Tools: GraphQL Playground, Altair, Insomnia

---

### MODULE 9 — Production Integration Patterns

**Objective**: Build integrations that are reliable, maintainable, and production-grade.

**Lessons to generate:**

9.1 **Error handling at scale**
- Retry with exponential backoff
- Circuit breaker pattern
- Dead letter queues
- Graceful degradation
- Error monitoring (Sentry, BetterStack)

9.2 **Rate limiting and throttling**
- Respecting API rate limits
- Implementing client-side throttling
- Queue-based request management
- Caching to reduce API calls

9.3 **Security best practices**
- Secret management (environment variables, never in code)
- Token rotation
- Least privilege principle
- Request signing
- Audit logging

9.4 **Monitoring and observability**
- Health checks for all integrations
- Latency tracking
- Error rate monitoring
- Alerting (Telegram, PagerDuty, Slack)
- Dashboard: integration health at a glance

9.5 **Documentation and maintenance**
- Document every integration (what, why, how, who maintains it)
- Version your integration code
- Plan for API deprecations
- Regular health audits

---

### MODULE 10 — Project: Build a Complète Integration Platform

**Objective**: The student builds a production-grade integration platform.

**Project requirements:**

1. **5 MCP servers** configured and working (including 1 custom-built)
2. **3 REST API integrations** with proper auth, error handling, rate limiting
3. **2 webhook receivers** with signature verification and idempotent processing
4. **1 Composio-powered workflow** connecting 3+ services
5. **1 n8n or Trigger.dev workflow** for background automation
6. **Monitoring dashboard** showing health status of all integrations
7. **Documentation** for every integration
8. **All deployed in production** with alerting

---

## Course Summary

| Module | Focus | Hours |
|--------|-------|-------|
| 1 | Integration Mindset | 2h |
| 2 | MCP Deep Dive | 4h |
| 3 | Building Custom MCP Servers | 4h |
| 4 | REST API Mastery | 4h |
| 5 | Webhooks & Events | 3h |
| 6 | Composio Hub | 3h |
| 7 | Automation Platforms | 4h |
| 8 | GraphQL | 2h |
| 9 | Production Patterns | 3h |
| 10 | Final Project | 4h |
| **TOTAL** | **10 modules** | **33h** |

---

## Bonus & Resources

- MCP server template repository (starter for building custom servers)
- API integration boilerplate (TypeScript, with auth, retry, rate limiting)
- Webhook receiver template (Next.js, with signature verification)
- Integration health dashboard template (Next.js + Convex)
- Community Telegram for integration builders
- Lifetime access and updates

## Upsell

> "Need complex integrations built for you? Agentik {OS} offers AI Build services ($15K-45K) for custom integration platforms. agentik-os.com/pricing"

---

**END OF DOCUMENT — Course 6: MCP & API Mastery**
