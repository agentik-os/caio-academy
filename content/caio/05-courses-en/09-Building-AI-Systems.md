# Course — Building AI Systems

## Design, Architect & Deploy Production-Grade AI Applications

## Instructions for the Course Creator Agent

> **Objective**: Generate the definitive course on building real AI systems — not just using AI tools, but engineering complète AI-powered products, platforms, and autonomous systems. The student learns system design, architecture patterns, model orchestration, RAG, evaluation, monitoring, and production deployment. This is the engineering course — where software meets AI at scale.
>
> **Tone**: Senior engineer teaching. Clear, opinionated, based on production expérience. Every concept is backed by real architecture decisions and trade-offs. No hand-waving — if we recommend something, we explain why.
>
> **Format**: Each module = architecture diagram + code implementation + deployment guide + production checklist. The student builds a real system throughout the course.
>
> **Estimated duration**: 45-60 hours of content. 8-12 weeks to complète.
>
> **Price**: $697 standalone / included in premium bundle
>
> **Prerequisite knowledge**: Programming (TypeScript/Python), basic understanding of APIs, familiarity with AI concepts. Course 4 (Claude Code Masterclass) recommended but not required.

---

## Course Identity

| Field | Value |
|-------|-------|
| Name | **Building AI Systems — From Architecture to Production** |
| Subtitle | Design, build, and deploy AI systems that work at scale |
| Creator | Gareth Simono — Founder of Agentik {OS} (265 agents in production) |
| Target audience | Software engineers, full-stack developers, technical founders, aspiring AI engineers, CAIO practitioners |
| Prerequisites | Comfortable with TypeScript or Python, APIs, and terminal. Basic AI understanding. |
| Promise | "In 12 weeks, you can architect, build, and deploy a production AI system — from a single chatbot to a multi-agent platform with RAG, evaluation, and monitoring" |
| Credibility | Built by the founder who architected Agentik OS: 265 autonomous agents, 190+ skills, serving real clients in production |
| Upsell | AI Build service ($15K-45K) or CAIO Partnership on agentik-os.com |

---

## Architecture of the Course — 4 Phases

> PHASE 1 — FOUNDATIONS (Weeks 1-3)
> "I understand AI system architecture and can make informed design decisions"
> Modules 1-5
>
> PHASE 2 — CORE ENGINEERING (Weeks 4-6)
> "I can build AI-powered applications with proper architecture"
> Modules 6-10
>
> PHASE 3 — ADVANCED PATTERNS (Weeks 7-9)
> "I master multi-agent systems, RAG, evaluation, and complex pipelines"
> Modules 11-16
>
> PHASE 4 — PRODUCTION & SCALE (Weeks 10-12)
> "I deploy, monitor, and scale AI systems in production"
> Modules 17-22
---

# ═══════════════════════════════════════════════
# PHASE 1 — FOUNDATIONS
# "I understand AI system design"
# Weeks 1-3 | 10-14 hours
# ═══════════════════════════════════════════════

### MODULE 1 — AI Systems Architecture: The Big Picture

**Objective**: The student understands what makes an AI system différent from traditional software and can reason about architectural trade-offs.

**Lessons to generate:**

1.1 **What is an AI system (vs traditional software)**
- Traditional software: deterministic input → deterministic output
- AI system: probabilistic input → probabilistic output → feedback loop
- The 4 components every AI system has: Model, Data, Orchestration, Interface
- Why AI systems are harder: non-determinism, evaluation difficulty, cost management, latency
- Why AI systems are worth it: they can handle ambiguity, scale cognitive work, and improve over time

1.2 **The AI system stack**
> ┌─────────────────────────────────────┐
> │ USER INTERFACE │
> │ (Web, Mobile, API, CLI, Chat) │
> ├─────────────────────────────────────┤
> │ ORCHESTRATION LAYER │
> │ (Routing, Agents, Pipelines, RAG) │
> ├─────────────────────────────────────┤
> │ MODEL LAYER │
> │ (Claude, GPT, Gemini, Open Source) │
> ├─────────────────────────────────────┤
> │ DATA LAYER │
> │ (Vector DB, SQL, Cache, Files) │
> ├─────────────────────────────────────┤
> │ INFRASTRUCTURE LAYER │
> │ (Compute, Storage, Monitoring) │
> └─────────────────────────────────────┘
1.3 **Types of AI systems**

| Type | Complexity | Example | When to use |
|------|-----------|---------|-------------|
| **Single-prompt** | Low | Customer support chatbot | One question → one answer |
| **Chain/Pipeline** | Medium | Content génération pipeline | Multi-step sequential processing |
| **RAG (Retrieval-Augmented)** | Medium-High | Knowledge base assistant | Need to answer from specific data |
| **Agent** | High | Code assistant, research agent | Autonomous decision-making |
| **Multi-agent** | Very High | Agentik OS (265 agents) | Complex orchestrated workflows |
| **Autonomous system** | Extreme | Self-running content engine | 24/7 operation with no human input |

1.4 **Architecture decision framework**
- Start simple, add complexity only when needed
- The "do I need AI for this?" test (sometimes a regex is enough)
- Latency budget: how fast does it need to respond?
- Cost budget: how much can you spend per request?
- Quality bar: what accuracy level is acceptable?
- Scale requirements: 10 requests/day or 10,000/hour?

1.5 **Common AI system anti-patterns**
- Over-engineering: building a multi-agent system when a single prompt works
- Under-evaluating: shipping without measuring quality
- Ignoring costs: burning through API credits with no budget awareness
- No fallbacks: system fails completely when the model is down
- Prompt spaghetti: 10,000-word system prompts that nobody can maintain

**Exercise**: Diagram the architecture of an AI system you want to build. Identify: model layer, data layer, orchestration layer, interface layer, and list your top 3 design trade-offs.

---

### MODULE 2 — LLM Fundamentals for System Builders

**Objective**: The student understands how LLMs work at the level needed to build reliable systems on top of them.

**Lessons to generate:**

2.1 **How LLMs actually work (engineer's mental model)**
- Token prediction: given a sequence, predict the next token
- Context window: the "working memory" (how much the model can see at once)
- Temperature: randomness dial (0 = deterministic, 1 = créative)
- Top-p / Top-k: controlling the probability distribution
- Why this matters for system design: reproducibility, caching, cost

2.2 **The model landscape in 2026**

| Model | Provider | Context | Best for | API cost |
|-------|----------|---------|----------|----------|
| Claude Opus 4.6 | Anthropic | 200K (1M available) | Complex reasoning, code, analysis | $$$ |
| Claude Sonnet 4.6 | Anthropic | 200K | Daily dev, balanced tasks | $$ |
| Claude Haiku 4.5 | Anthropic | 200K | Fast tasks, classification | $ |
| GPT-4.1 | OpenAI | 1M | Général purpose, wide ecosystem | $$ |
| o3 / o4-mini | OpenAI | 200K | Reasoning, math, logic | $$$ / $ |
| Gemini 3 Pro | Google | 2M | Ultra-long context, multimodal | $$ |
| Gemini 3 Flash | Google | 1M | Fast, cheap, good quality | $ |
| Llama 4 | Meta | 128K | Self-hosted, privacy | Free (compute) |
| Mistral Large | Mistral | 128K | EU compliance, self-hosted | $$ / Free |
| DeepSeek R2 | DeepSeek | 128K | Reasoning, open-source | $ |

2.3 **Multi-model strategy**
- Why use multiple models (cost optimization, capability matching, fallbacks)
- Router pattern: simple tasks → cheap model, complex → expensive model
- Fallback chains: if model A fails, try model B
- Consensus pattern: ask 3 models, take the majority answer
- Cost tracking: measure and optimize spend per task type

2.4 **Token economics**
- Input tokens vs output tokens (différent prices)
- Prompt caching (reuse prefix, save 90% on repeated calls)
- Batch API (50% cheaper for non-urgent tasks)
- Context window management (smaller context = cheaper + faster)
- The cost formula: `tokens × price_per_token × requests_per_day × 30`

2.5 **Model capabilities and limitations**
- What models are GREAT at: text génération, analysis, classification, code, translation, summarization
- What models are BAD at: math (use tools), real-time data (use search), counting, exact string matching
- Tool use: extend model capabilities with functions
- Structured outputs: force JSON/schema compliance
- Vision: image understanding (Claude, GPT-4o, Gemini)

**Exercise**: For the system you designed in Module 1, choose the optimal model(s). Calculate estimated monthly cost at your expected scale.

---

### MODULE 3 — The Anthropic SDK & Claude API Deep Dive

**Objective**: Master the Claude API — messages, streaming, tool use, structured outputs, vision, caching.

**Lessons to generate:**

3.1 **SDK setup and authentication**
```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
 apiKey: process.env.ANTHROPIC_API_KEY,
});
> - TypeScript SDK: `@anthropic-ai/sdk`
> - Python SDK: `anthropic`
> - Authentication: API keys from console.anthropic.com
> - Environment variable management
>
> 3.2 **The Messages API — Core interaction**
> ```typescript
> const response = await client.messages.create({
> model: "claude-sonnet-4-6-20250514",
> max_tokens: 4096,
> system: "You are a helpful assistant.",
> messages: [
> { role: "user", content: "Explain quantum computing in 3 sentences." }
> ],
> });
- System prompt: persistent instructions
- Messages array: conversation history
- max_tokens: control response length
- stop_sequences: custom stop conditions
- temperature: creativity control
- Response parsing: content blocks, stop_reason, usage

3.3 **Streaming responses**
```typescript
const stream = client.messages.stream({
 model: "claude-sonnet-4-6-20250514",
 max_tokens: 4096,
 messages: [{ role: "user", content: "Write a story." }],
});

for await (const event of stream) {
 if (event.type === "content_block_delta") {
 process.stdout.write(event.delta.text);
 }
}
> - Why stream: better UX (user sees response building)
> - Server-Sent Events (SSE) for web apps
> - Token-by-token vs chunk-based streaming
> - Error handling in streams
>
> 3.4 **Tool use (function calling)**
> ```typescript
> const tools = [
> {
> name: "get_weather",
> description: "Get current weather for a location",
> input_schema: {
> type: "object" as const,
> properties: {
> location: { type: "string", description: "City name" },
> },
> required: ["location"],
> },
> },
> ];
>
> const response = await client.messages.create({
> model: "claude-sonnet-4-6-20250514",
> max_tokens: 1024,
> tools,
> messages: [{ role: "user", content: "What's the weather in Paris?" }],
> });
> // Handle tool_use blocks, execute function, return tool_result
- Defining tools with JSON Schema
- The tool use loop: request → tool_use → execute → tool_result → continue
- Parallel tool calls: Claude can call multiple tools at once
- Error handling: what happens when a tool fails
- Best practices: clear descriptions, sensible defaults, validation

3.5 **Structured outputs**
- Force Claude to return valid JSON
- Schema enforcement for reliable parsing
- Enum constraints for classification tasks
- Nested objects for complex data structures
- Validation: always validate even with schema enforcement

3.6 **Vision (image understanding)**
```typescript
const response = await client.messages.create({
 model: "claude-sonnet-4-6-20250514",
 max_tokens: 1024,
 messages: [{
 role: "user",
 content: [
 { type: "image", source: { type: "base64", media_type: "image/png", data: base64Image } },
 { type: "text", text: "Describe this image in detail." },
 ],
 }],
});
> - Supported formats: PNG, JPEG, GIF, WebP
> - Base64 vs URL input
> - Use cases: document analysis, screenshot understanding, chart reading
> - Cost: images consume tokens based on size
>
> 3.7 **Prompt caching**
> - Cache long system prompts or référence documents
> - Save up to 90% on repeated calls with the same prefix
> - Cache control: `cache_control: { type: "ephemeral" }`
> - When to use: RAG systems, agents with long instructions, batch processing
>
> 3.8 **Batch API**
> - Process thousands of requests at 50% discount
> - Asynchronous: submit batch, poll for results
> - Use cases: content génération at scale, data processing, evaluation
> - Implementation: create batch → wait → retrieve results
>
> 3.9 **Extended thinking**
> - Let Claude "think" before responding (chain-of-thought)
> - Better for complex reasoning, math, multi-step problems
> - Budget tokens for thinking vs response
> - When to use vs when it's overkill
>
> **Exercise**: Build a complète API wrapper class with: basic messages, streaming, tool use (3 tools), structured outputs, vision, and error handling. This becomes the foundation for the rest of the course.
>
> ---
>
> ### MODULE 4 — System Prompts & Prompt Engineering at Scale
>
> **Objective**: Master the art and science of system prompts for production AI systems.
>
> **Lessons to generate:**
>
> 4.1 **System prompt architecture**
> - The system prompt is the "DNA" of your AI system
> - Structure: Identity → Instructions → Constraints → Format → Examples
> - Length vs performance trade-off (shorter = faster + cheaper, longer = more control)
> - Versioning: treat system prompts like code (Git, changelogs, testing)
>
> 4.2 **The production system prompt template**
# Role & Identity
You are [ROLE]. You work for [COMPANY].

# Core Instructions
When a user asks you to [TASK]:
1. First, [STEP 1]
2. Then, [STEP 2]
3. Finally, [STEP 3]

# Output Format
Always respond in this format:
- [FIELD 1]: [description]
- [FIELD 2]: [description]

# Constraints
- NEVER [thing to avoid]
- ALWAYS [thing to always do]
- If unsure, [fallback behavior]

# Examples
User: [example input]
Assistant: [example output]
4.3 **Prompt engineering techniques for systems**
| Technique | What it does | When to use |
|-----------|-------------|-------------|
| **Few-shot** | Provide 2-5 examples | Classification, formatting |
| **Chain-of-thought** | "Think step by step" | Complex reasoning |
| **Role assignment** | "You are an expert in..." | Domain-specific tasks |
| **Constraint anchoring** | "NEVER do X, ALWAYS do Y" | Safety, consistency |
| **Output templating** | "Respond in this JSON format" | Structured outputs |
| **Self-verification** | "Check your answer before responding" | Accuracy-critical tasks |
| **Decomposition** | "Break this into sub-tasks" | Complex multi-step problems |
4.4 **Managing prompt complexity**
- Modular prompts: split into reusable sections
- Conditional sections: include/exclude based on context
- Dynamic prompts: inject relevant context at runtime
- Prompt registry: centralized storage for all prompts
- A/B testing: compare prompt versions with metrics
4.5 **Common prompt failures and fixes**
- Model ignores instructions → Move critical instructions to the beginning AND end
- Inconsistent output format → Add strict format examples + validation
- Hallucination → Add "only use information from the provided context"
- Too verbose → Add "be concise, max 3 sentences"
- Wrong tone → Add examples of desired tone
- Refuses valid requests → Adjust constraints, add explicit permissions
4.6 **Prompt testing and evaluation**
- Create a test suite for each system prompt (10-50 test cases)
- Automated evaluation: run tests on every prompt change
- Regression testing: ensure changes don't break existing functionality
- Human evaluation: sample outputs for quality review
- The prompt changelog: document every change and why
**Exercise**: Write a production system prompt for a customer support agent. Include: role, instructions, format, constraints, 5 examples. Create 20 test cases and run them.
---
### MODULE 5 — Data Layer: Databases, Vectors & Knowledge
**Objective**: The student understands the data architecture for AI systems.
**Lessons to generate:**
5.1 **Data types in AI systems**
| Data type | Storage | Use case |
|-----------|---------|----------|
| **Structured data** | PostgreSQL, Convex | User data, transactions, config |
| **Unstructured text** | Vector DB + object storage | Documents, articles, knowledge |
| **Embeddings** | Vector DB (Pinecone, Chroma, Weaviate) | Semantic search, RAG |
| **Conversation history** | Database + cache | Chat memory, context |
| **Model outputs** | Database + logging | Evaluation, debugging |
| **Files** | Object storage (S3, R2) | PDFs, images, uploads |
5.2 **Vector databases explained**
- What are embeddings: converting text to numbers that capture meaning
- Semantic search: find similar content by meaning, not keywords
- Vector DB options:
- **Pinecone**: managed, scalable, production-ready
- **Chroma**: open-source, lightweight, great for prototyping
- **Weaviate**: open-source, feature-rich, hybrid search
- **Qdrant**: open-source, Rust-based, fast
- **pgvector**: PostgreSQL extension (embed in your existing DB)
- Choosing the right one: scale, cost, managed vs self-hosted
5.3 **Embedding models**
- OpenAI `text-embedding-3-small` / `text-embedding-3-large`
- Voyage AI embeddings (optimized for code, legal, etc.)
- Open-source: `nomic-embed-text`, `bge-large`
- Dimensions: 256 (fast, small) to 3072 (accurate, large)
- Choosing: task-specific embeddings outperform général ones
5.4 **Building a knowledge base**
- Document ingestion pipeline: upload → chunk → embed → store
- Chunking stratégies: fixed-size, semantic, recursive, document-aware
- Metadata: always store source, date, type alongside embeddings
- Indexing: HNSW, IVF, flat — trade-offs between speed and accuracy
- Updates: how to keep the knowledge base fresh
5.5 **Conversation memory**
- Short-term: current session context (in-memory or cache)
- Long-term: persistent memory across sessions (database)
- Sliding window: keep last N messages
- Summary memory: periodically summarize and compress
- Retrieval memory: search past conversations by relevance
5.6 **Convex as the AI system backend**
- Why Convex works well for AI systems:
- Reactive queries (real-time UI updates)
- TypeScript-native (type-safe from DB to UI)
- Actions for external API calls (model inference)
- Scheduled functions for background processing
- Built-in file storage
- Schema design for AI systems
- Storing and querying conversation history
- Managing user data and préférences
**Exercise**: Set up a vector database (Chroma or pgvector), create an embedding pipeline for 100 documents, and build a semantic search function.
---
# ═══════════════════════════════════════════════
# PHASE 2 — CORE ENGINEERING
# "I can build AI-powered applications"
# Weeks 4-6 | 12-16 hours
# ═══════════════════════════════════════════════
### MODULE 6 — Building a Chat Application
**Objective**: Build a production-quality chat application with streaming, memory, and tool use.
**Lessons to generate:**
6.1 **Chat architecture**
User → Frontend (React) → API Route (Next.js) → Claude API → Stream back
 ↕
 Database (Convex)
 (conversations, messages, users)
6.2 **Frontend: React chat interface**
- Message list with streaming display
- Input with send button and keyboard shortcuts
- Markdown rendering for AI responses
- Code syntax highlighting
- Loading states and error handling
- Mobile-responsive layout
6.3 **Backend: Next.js API routes with streaming**
- Server-sent events for streaming responses
- Vercel AI SDK integration (`ai` package)
- `streamText()` for streaming Claude responses
- Conversation history management
- Rate limiting per user
6.4 **Adding tool use to the chat**
- Define tools the chat can use (search, calculate, look up data)
- Tool execution on the server side
- Displaying tool calls and results in the UI
- Multi-turn tool use conversations
6.5 **Conversation persistence**
- Saving conversations to Convex
- Loading conversation history
- Conversation list sidebar
- Search across conversations
- Export and delete conversations
6.6 **Authentication and user management**
- Clerk for user authentication
- Per-user conversation isolation
- Usage tracking and limits
- Admin panel for monitoring
**Exercise**: Build and deploy a complète chat application with streaming, 3 tools, conversation persistence, and authentication.
---
### MODULE 7 — Building an AI Agent
**Objective**: Build an autonomous AI agent that can plan, execute, and self-correct.
**Lessons to generate:**
7.1 **Agent architecture**
User Input → Planner → Tool Selection → Execution → Observation →
 ↑ ↓
 └──────────── Self-Correction ─────────────┘
7.2 **The agent loop**
```typescript
async function agentLoop(task: string, tools: Tool[], maxSteps = 10) {
const messages = [{ role: "user", content: task }];
for (let step = 0; step < maxSteps; step++) {
const response = await client.messages.create({
model: "claude-sonnet-4-6-20250514",
tools,
messages,
});
// Check if agent is done
if (response.stop_reason === "end_turn") {
return extractFinalAnswer(response);
}
// Execute tool calls
for (const block of response.content) {
if (block.type === "tool_use") {
const result = await executeTool(block.name, block.input);
messages.push(
{ role: "assistant", content: response.content },
{ role: "user", content: [{ type: "tool_result", tool_use_id: block.id, content: result }] }
);
}
}
}
}
7.3 **Planning and decomposition**
- Let the agent break tasks into sub-tasks
- Planning prompts: "Before executing, outline your plan in 3-5 steps"
- Re-planning: "If your plan isn't working, revise it"
- The plan-execute-observe-reflect cycle

7.4 **Tool design for agents**
- Tools should be atomic (do one thing well)
- Clear descriptions (the agent reads these to decide which tool to use)
- Input validation (don't trust the agent's inputs blindly)
- Error messages that help the agent self-correct
- Essential tool categories: search, read, write, compute, communicate

7.5 **Self-correction and error recovery**
- The agent should detect its own errors
- Retry with différent approach (not the same thing 3 times)
- Escalation: when to ask the human for help
- Guard rails: maximum steps, timeout, cost limits
- The "stuck detection" pattern: if no progress in 3 steps, change approach

7.6 **Agent memory**
- Working memory: current task context
- Episodic memory: what the agent has done before (past sessions)
- Semantic memory: knowledge the agent has learned
- Implementation: database + vector search + context injection

**Exercise**: Build an agent with 5 tools (web search, file read/write, calculator, database query) that can autonomously research a topic and produce a report.

---

### MODULE 8 — RAG Systems (Retrieval-Augmented Génération)

**Objective**: Build a production RAG system that answers questions from your own data.

**Lessons to generate:**

8.1 **What is RAG and why it matters**
- The problem: LLMs don't know your specific data
- The solution: retrieve relevant documents, inject into context, generate answer
- RAG vs fine-tuning: RAG is faster, cheaper, and more flexible
- When to use RAG: knowledge bases, documentation, internal data, customer support

8.2 **RAG architecture**
> User Query → Embed Query → Vector Search → Retrieve Top-K Documents →
> Construct Prompt (System + Context + Query) → LLM → Answer
8.3 **Document ingestion pipeline**
- Step 1: Load documents (PDF, Markdown, HTML, DOCX, CSV)
- Step 2: Clean and preprocess (remove headers, normalize formatting)
- Step 3: Chunk (split into meaningful segments)
- Step 4: Embed (convert to vectors)
- Step 5: Store (vector DB + metadata)
- Step 6: Index (for fast retrieval)

8.4 **Chunking stratégies (critical for quality)**

| Strategy | How it works | Best for |
|----------|-------------|----------|
| **Fixed-size** | Split every N characters/tokens | Simple, predictable |
| **Recursive** | Split by paragraphs, then sentences | Général purpose |
| **Semantic** | Split at topic boundaries | Technical documents |
| **Document-aware** | Respect headers, sections, pages | Structured docs |
| **Sliding window** | Overlapping chunks | Context continuity |

- Chunk size: 500-1000 tokens is the sweet spot
- Overlap: 10-20% between chunks preserves context
- Always store chunk metadata: source, page, section, date

8.5 **Retrieval stratégies**

| Strategy | How it works | When to use |
|----------|-------------|-------------|
| **Semantic search** | Vector similarity (cosine) | Default approach |
| **Keyword search** | BM25, TF-IDF | Exact matches, technical terms |
| **Hybrid** | Semantic + keyword combined | Best quality (recommended) |
| **Re-ranking** | Retrieve N, re-rank to top K | High-quality requirements |
| **Multi-query** | Generate multiple query variants | Complex questions |
| **HyDE** | Generate hypothetical answer, search with it | When queries are vague |

8.6 **Context construction**
- How many chunks to include (3-10 is typical)
- Ordering: most relevant first? Chronological?
- Citation tracking: tell the LLM to cite sources
- Context window management: don't overflow
- The "golden retrieval" test: does the answer exist in the retrieved chunks?

8.7 **RAG evaluation**
- Retrieval quality: are we finding the right documents? (Recall@K, Precision@K)
- Génération quality: is the answer correct and well-sourced?
- Faithfulness: does the answer stick to the retrieved context (no hallucination)?
- End-to-end: does the system answer user questions correctly?
- RAGAS framework: automated RAG evaluation

8.8 **Advanced RAG patterns**
- Parent-child chunking: retrieve child, inject parent for context
- Query decomposition: break complex questions into sub-queries
- Self-RAG: let the model decide when to retrieve
- Corrective RAG: verify retrieval quality, re-retrieve if needed
- Multi-modal RAG: images + text retrieval

**Exercise**: Build a complète RAG system for a knowledge base of 500+ documents. Implement: ingestion, chunking, embedding, retrieval, génération, and evaluation. Deploy as an API.

---

### MODULE 9 — Building with Vercel AI SDK

**Objective**: Master the Vercel AI SDK for building AI applications in Next.js.

**Lessons to generate:**

9.1 **What is the Vercel AI SDK**
- Unified API for AI model providers (Anthropic, OpenAI, Google, etc.)
- React hooks for streaming UI (`useChat`, `useCompletion`)
- Edge-ready (runs on Vercel Edge Functions)
- Provider switching: change models with one line

9.2 **Core functions**
```typescript
import { generateText, streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

// Simple génération
const { text } = await generateText({
 model: anthropic("claude-sonnet-4-6-20250514"),
 prompt: "Explain quantum computing",
});

// Streaming
const result = streamText({
 model: anthropic("claude-sonnet-4-6-20250514"),
 messages: conversationHistory,
 tools: myTools,
});
9.3 **React integration**
```typescript
"use client";
import { useChat } from "@ai-sdk/react";
export function Chat() {
const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
api: "/api/chat",
});
// Render chat UI...
}
9.4 **Tool integration with AI SDK**
- Define tools with Zod schemas (type-safe!)
- Server-side tool execution
- Multi-step tool use
- Streaming tool call results

9.5 **Structured outputs with AI SDK**
```typescript
import { generateObject } from "ai";
import { z } from "zod";

const { object } = await generateObject({
 model: anthropic("claude-sonnet-4-6-20250514"),
 schema: z.object({
 sentiment: z.enum(["positive", "negative", "neutral"]),
 confidence: z.number().min(0).max(1),
 summary: z.string(),
 }),
 prompt: "Analyze this review: ...",
});
9.6 **Multi-provider setup**
- Use Claude for reasoning, GPT for embeddings, Gemini for vision
- Provider fallbacks: if one is down, use another
- Cost routing: cheap model for simple tasks, expensive for complex
**Exercise**: Rebuild the chat application from Module 6 using Vercel AI SDK. Add structured outputs and multi-provider support.
---
### MODULE 10 — Claude Code Agent SDK
**Objective**: Build custom agents using the Claude Agent SDK for deployment outside of Claude Code.
**Lessons to generate:**
10.1 **What is the Agent SDK**
- Build autonomous agents that run as services
- Same power as Claude Code agents, but deployable anywhere
- Python and TypeScript support
- Built on the Claude API with agent orchestration patterns
10.2 **Agent SDK architecture**
Agent SDK
├── Model (Claude API)
├── Tools (custom function definitions)
├── Orchestration (planning, execution, observation loop)
├── Memory (conversation history, persistent state)
└── Deployment (server, serverless, edge)
10.3 **Building an agent with the SDK**
- Define the agent: model, tools, system prompt
- Implement tools as functions
- The conversation loop: user → agent → tool → result → agent → response
- Memory management: what to keep, what to forget
- Error handling and recovery
10.4 **Deploying agents as services**
- HTTP API: agent as a REST endpoint
- WebSocket: real-time agent interaction
- Background worker: agent runs autonomously
- Cron-triggered: agent runs on a schedule
- Serverless: agent scales to zero when idle
10.5 **Agent-to-agent communication**
- Multi-agent architectures with the SDK
- Message passing between agents
- Shared state and coordination
- The orchestrator pattern: one agent manages others
**Exercise**: Build and deploy 3 agents using the SDK: a research agent, a writing agent, and an orchestrator that coordinates them.
---
# ═══════════════════════════════════════════════
# PHASE 3 — ADVANCED PATTERNS
# "I master complex AI architectures"
# Weeks 7-9 | 12-16 hours
# ═══════════════════════════════════════════════
### MODULE 11 — Multi-Agent Systems
**Objective**: Design and implement multi-agent systems with specialized agents, routing, and coordination.
**Lessons to generate:**
11.1 **Multi-agent architecture patterns**
| Pattern | How it works | When to use |
|---------|-------------|-------------|
| **Pipeline** | Agent A → Agent B → Agent C | Sequential processing |
| **Fan-out** | Orchestrator → N parallel agents | Independent sub-tasks |
| **Hierarchical** | Manager → Leads → Specialists | Complex organizations |
| **Swarm** | Peer-to-peer communication | Exploratory tasks |
| **Debate** | Two agents argue, third decides | High-stakes decisions |
11.2 **The ORACLE pattern (from Agentik OS)**
- ORACLE = the orchestrator that classifies, routes, and coordinates
- Classification: SIMPLE → MEDIUM → COMPLEX → EPIC
- Routing: match tasks to the best specialist agent
- Fresh context: each agent gets exactly the context it needs
- Stuck detection: if an agent loops, change approach
- Decisions logging: track all routing decisions for debugging
11.3 **Designing specialist agents**
- One agent = one responsibility (Single Responsibility Principle)
- Clear input/output contracts
- Defined tool sets (each agent only sees relevant tools)
- Performance metrics per agent
- Example: Agentik OS has 265 specialists across 6 departments
11.4 **Agent communication**
- Direct messaging: one agent sends to another
- Shared state: agents read/write to a common store
- Event-driven: agents react to events from other agents
- Blackboard: shared workspace where agents contribute
- Choosing the right pattern for your use case
11.5 **Coordination challenges**
- Race conditions: two agents modifying the same resource
- Deadlocks: agents waiting for each other
- Cost explosion: runaway agents burning API credits
- Quality control: ensuring agent outputs meet standards
- Solutions: locks, timeouts, budgets, guardian agents
**Exercise**: Build a 5-agent system with: orchestrator, researcher, writer, reviewer, and publisher. The orchestrator assigns tasks, agents work in parallel where possible, and the reviewer validates before the publisher ships.
---
### MODULE 12 — AI Evaluation & Testing
**Objective**: Build comprehensive evaluation systems to measure and improve AI quality.
**Lessons to generate:**
12.1 **Why evaluation is the hardest part**
- AI outputs are non-deterministic — same input, différent output
- "Looks good" is not a metric
- Without eval, you're shipping blind
- Eval-driven development: write evals FIRST, then improve
12.2 **Types of evaluation**
| Type | What it measures | How |
|------|-----------------|-----|
| **Automated evals** | Correctness, format, factuality | Code-based checks |
| **LLM-as-judge** | Quality, relevance, helpfulness | Use Claude to evaluate Claude |
| **Human evaluation** | Nuance, préférence, edge cases | Manual review |
| **A/B testing** | User préférence at scale | Compare two versions live |
| **Regression testing** | Did changes break anything? | Run eval suite on every change |
12.3 **Building an eval suite**
- Test cases: 50-200 input/expected-output pairs
- Automated checks: format validation, keyword presence, length limits
- LLM-as-judge: separate Claude instance rates quality 1-5
- Golden answers: human-written référence answers for comparison
- Edge cases: deliberately tricky inputs to test robustness
12.4 **Evaluation metrics**
| Metric | What it measures | Formula |
|--------|-----------------|---------|
| **Accuracy** | Correct answers / total | correct / total |
| **Faithfulness** | Sticks to provided context | faithful / total (LLM judge) |
| **Relevance** | Answer addresses the question | relevant / total (LLM judge) |
| **Toxicity** | Harmful content | toxic / total (classifier) |
| **Latency** | Response time | p50, p95, p99 |
| **Cost** | Spend per request | total_tokens × price |
12.5 **Continuous evaluation**
- Run evals on every prompt change
- Run evals on every model update
- Dashboard: track metrics over time
- Alerts: notify when quality drops
- Regression prevention: block deploys that reduce quality
12.6 **Evaluation frameworks**
- Build your own (recommended for customization)
- Braintrust: evaluation platform with logging
- LangSmith: LangChain's evaluation tool
- Promptfoo: open-source prompt evaluation CLI
- RAGAS: specifically for RAG evaluation
**Exercise**: Build a complète eval suite for the chat application from Module 6. Include: 50 test cases, automated checks, LLM-as-judge, and a quality dashboard.
---
### MODULE 13 — Prompt Caching, Optimization & Cost Control
**Objective**: Optimize AI system performance and cost at scale.
**Lessons to generate:**
13.1 **Prompt caching stratégies**
- Claude's cache_control: cache static system prompt prefix
- Cache hit savings: 90% on cached portions
- What to cache: system prompts, référence documents, tool definitions
- What NOT to cache: dynamic user input, conversation history
- TTL management: how long caches live
13.2 **Cost optimization techniques**
| Technique | Savings | Effort |
|-----------|---------|--------|
| Use cheaper models for simple tasks | 60-80% | Low |
| Prompt caching | Up to 90% on cached content | Low |
| Batch API for non-urgent tasks | 50% | Low |
| Reduce context size | 30-50% | Medium |
| Pre-filter with cheap classifier | 40-60% | Medium |
| Cache common responses | Variable | Medium |
13.3 **Latency optimization**
- Streaming: perceived latency = time to first token
- Model selection: Haiku < Sonnet < Opus in latency
- Parallel requests: fan out to multiple models simultaneously
- Edge deployment: closer to users = faster
- Pre-computation: generate common answers ahead of time
13.4 **Rate limiting and throttling**
- API rate limits by provider
- Client-side queuing
- Retry with exponential backoff
- Circuit breaker: stop calling a failing API
- Graceful degradation: fallback responses when rate limited
13.5 **Monitoring costs in production**
- Track tokens per request, per user, per feature
- Daily/weekly/monthly cost dashboards
- Budget alerts (Telegram, email)
- Per-user cost limits
- The cost attribution problem: which feature costs the most?
**Exercise**: Implement prompt caching and cost monitoring for the systems built in previous modules. Set up alerts when daily spending exceeds thresholds.
---
### MODULE 14 — Guardrails, Safety & Alignment
**Objective**: Build AI systems that are safe, aligned, and resistant to misuse.
**Lessons to generate:**
14.1 **Input guardrails**
- Content moderation: detect and block harmful inputs
- Injection detection: prevent prompt injection attacks
- Rate limiting: per-user, per-IP request limits
- Input validation: length limits, format checks, language detection
- PII detection: identify and handle personal information
14.2 **Output guardrails**
- Content filtering: detect harmful, biased, or inappropriate outputs
- Hallucination detection: check claims against known facts
- Format validation: ensure output matches expected schema
- Confidence scoring: flag low-confidence responses for human review
- Citation verification: are sources real and accurate?
14.3 **Prompt injection defense**
- What is prompt injection: user input that overrides system instructions
- Types: direct ("ignore previous instructions"), indirect (injected via retrieved content)
- Defenses:
- Input sanitization: strip suspicious patterns
- Delimiter isolation: clearly separate system/user content
- Output validation: verify the output matches expectations
- Separate models: use one model to check another's output
- Constitutional AI: model self-evaluates against principles
14.4 **Content policies**
- Define what your system should and shouldn't discuss
- Implement as system prompt constraints + output validation
- Appeal process: when the system incorrectly blocks a request
- Logging: track all policy violations for review
14.5 **Human-in-the-loop patterns**
- Confidence thresholds: auto-respond above 0.8, escalate below
- Review queues: humans review flagged outputs before sending
- Feedback loops: user corrections improve future responses
- Approval workflows: human approves before AI executes actions
**Exercise**: Implement input and output guardrails for the chat application. Test with 20 adversarial inputs (prompt injection, harmful content, edge cases).
---
### MODULE 15 — Workflows & Pipelines
**Objective**: Build complex multi-step AI workflows and data pipelines.
**Lessons to generate:**
15.1 **Workflow patterns**
| Pattern | Structure | Example |
|---------|-----------|---------|
| **Sequential** | Step A → B → C | Content génération pipeline |
| **Parallel** | A + B + C → merge | Multi-source research |
| **Conditional** | If X → A, else → B | Intent-based routing |
| **Loop** | Repeat until condition | Iterative refinement |
| **Map-reduce** | Split → process each → combine | Batch document analysis |
15.2 **Building with Trigger.dev**
- Durable execution: survives failures, picks up where it left off
- Step functions: each step runs independently
- Retries: automatic retry with backoff
- Queues: manage concurrent execution
- Scheduling: cron jobs for recurring workflows
15.3 **Building with Inngest**
- Event-driven: workflows triggered by events
- Step functions with built-in error handling
- Fan-out: parallel step execution
- Sleep and wait: pause workflow until condition met
- Human-in-the-loop: wait for human approval
15.4 **Content génération pipeline (real example)**
1. Topic selection (scheduled cron)
2. Research (Claude + web search)
3. Outline génération (Claude)
4. Article writing (Claude Opus)
5. SEO optimization (Claude + keywords)
6. Image génération (Gemini Imagen)
7. Build & deploy (Next.js + Vercel)
8. Social distribution (Composio)
9. Notification (Telegram)
15.5 **Error handling in pipelines**
- Retry policies: which steps to retry, how many times
- Dead letter queues: store failed items for manual review
- Compensation: undo previous steps if a later step fails
- Alerting: notify on pipeline failures
- Monitoring: track pipeline health and throughput
**Exercise**: Build a complète content génération pipeline that runs on a schedule, handles errors gracefully, and sends notifications.
---
### MODULE 16 — Real-Time AI Systems
**Objective**: Build AI systems that operate in real-time with streaming, WebSockets, and reactive updates.
**Lessons to generate:**
16.1 **Real-time architecture patterns**
- Server-Sent Events (SSE): one-way streaming (API → client)
- WebSockets: bidirectional real-time communication
- Convex subscriptions: reactive database queries
- Long-polling: fallback for environments without WebSocket support
16.2 **Streaming AI responses**
- Token-by-token streaming for chat interfaces
- Streaming structured data (partial JSON updates)
- Server-side rendering with streaming
- Client-side handling: buffering, parsing, rendering
16.3 **Real-time dashboards**
- Convex reactive queries: UI updates automatically when data changes
- Agent status monitoring: which agents are running, their progress
- Live metrics: response times, error rates, costs
- Notification streams: real-time alerts in the browser
16.4 **Real-time collaboration**
- Multiple users interacting with the same AI system
- Shared conversation threads
- Collaborative editing with AI assistance
- Conflict resolution: handling concurrent modifications
**Exercise**: Add real-time features to the chat application: streaming responses, live typing indicators, and a monitoring dashboard showing system health.
---
# ═══════════════════════════════════════════════
# PHASE 4 — PRODUCTION & SCALE
# "I deploy and scale AI systems"
# Weeks 10-12 | 12-16 hours
# ═══════════════════════════════════════════════
### MODULE 17 — Production Deployment
**Objective**: Deploy AI systems to production with reliability, security, and observability.
**Lessons to generate:**
17.1 **Deployment architecture**
User → CDN (Cloudflare/Vercel) → Edge Function → AI API
 ↕
 Database (Convex/PostgreSQL)
 ↕
 Vector DB (Pinecone/Chroma)
 ↕
 Background Workers (Trigger.dev)

17.2 **Vercel deployment**
- Next.js deployment best practices
- Environment variables management
- Edge functions for low-latency AI inference
- Preview deployments for testing
- Production monitoring and analytics

17.3 **VPS deployment (for agents and cron)**
- When you need a VPS: persistent agents, cron jobs, heavy computation
- Setup: Ubuntu, SSH, ZSH, security hardening
- tmux for persistent sessions
- systemd for daemon processes
- Docker for isolation

17.4 **CI/CD for AI systems**
- GitHub Actions workflow: test → eval → build → deploy
- Run evaluation suite on every PR
- Block merges that reduce quality metrics
- Staged rollouts: canary deployments for prompt changes
- Rollback procedures: revert quickly when things go wrong

17.5 **Security in production**
- API key management: never in code, always in environment
- Authentication: every endpoint requires auth
- Rate limiting: per-user, per-endpoint
- Input validation: sanitize everything
- Output filtering: prevent data leaks
- CORS, CSP, HTTPS: standard web security

---

### MODULE 18 — Monitoring & Observability

**Objective**: Know exactly what's happening in your AI system at all times.

**Lessons to generate:**

18.1 **What to monitor in AI systems**

| Metric | Why | Alert threshold |
|--------|-----|-----------------|
| **Latency** (p50, p95, p99) | User expérience | p95 > 5s |
| **Error rate** | System health | > 1% |
| **Token usage** | Cost control | > daily budget |
| **Quality score** | Output quality | < baseline - 10% |
| **Cache hit rate** | Cost efficiency | < 50% |
| **Active users** | Business metrics | Anomaly detection |
| **Agent completion rate** | Agent reliability | < 90% |

18.2 **Logging for AI systems**
- Request/response logging (with PII redaction)
- Tool call logging: what tools were called, with what inputs
- Decision logging: why did the system make this choice?
- Performance logging: timing for each step
- Cost logging: tokens used per request
- Structured logging format: JSON with consistent fields

18.3 **Building a monitoring dashboard**
- Real-time metrics with Convex reactive queries
- Historical data with time-series visualization
- Alerting integration: Telegram, Slack, PagerDuty
- Cost tracker: daily, weekly, monthly spend by feature
- Quality tracker: eval scores over time

18.4 **Debugging AI systems**
- Reproduce the issue: exact input → exact output
- Check the prompt: was the system prompt correct?
- Check the context: was the right information retrieved?
- Check the model: was the right model called?
- Check the tools: did tool calls return expected results?
- Trace the full pipeline: input → every step → output

18.5 **Alerting strategy**
- Severity levels: info → warning → critical → page
- Alert fatigue prevention: don't alert on everything
- Runbook per alert: what to do when you get paged
- Escalation paths: engineer → lead → on-call
- Post-mortems: document and learn from incidents

**Exercise**: Build a complète monitoring dashboard for the systems built in this course. Include: latency, errors, costs, quality scores, and Telegram alerting.

---

### MODULE 19 — Scaling AI Systems

**Objective**: Handle growing traffic, data, and complexity.

**Lessons to generate:**

19.1 **Scaling stratégies**

| Challenge | Solution |
|-----------|----------|
| Too many requests | Queue + workers, rate limiting, caching |
| Too expensive | Model routing, caching, batch processing |
| Too slow | Edge deployment, streaming, pre-computation |
| Too much data | Chunked ingestion, incremental indexing |
| Too complex | Microservices, domain-specific agents |

19.2 **Horizontal scaling**
- Stateless API servers (scale horizontally behind load balancer)
- Worker pools for background processing
- Database connection pooling
- CDN for static assets and cached responses

19.3 **Caching at every level**
- Response caching: identical queries return cached answers
- Semantic caching: similar queries return cached answers (vector similarity)
- Embedding caching: don't re-embed the same document
- LLM result caching: cache Claude responses for identical inputs

19.4 **Cost scaling**
- Model routing: use the cheapest model that works for each task
- Batch processing: accumulate requests, process in bulk (50% savings)
- Token budget per user/feature
- Automatic downgrade under load (Opus → Sonnet → Haiku)

19.5 **Data scaling**
- Incremental indexing: only process new/changed documents
- Partitioning: split vector DB by domain/customer
- Archiving: move old data to cold storage
- Cleanup: remove stale embeddings and metadata

---

### MODULE 20 — AI System Security

**Objective**: Harden AI systems against attacks and misuse.

**Lessons to generate:**

20.1 **AI-specific attack vectors**
- Prompt injection (direct and indirect)
- Data poisoning (malicious documents in RAG)
- Model extraction (stealing your system prompt)
- Denial of wallet (causing expensive API calls)
- Social engineering (manipulating AI to reveal secrets)

20.2 **Defense stratégies**
- Defense in depth: multiple layers of protection
- Input sanitization + output validation + monitoring
- Separate privilege levels for différent tools
- Audit logging for all AI interactions
- Regular security reviews and pen testing

20.3 **Data protection**
- PII handling: detect, mask, or reject personal information
- Data retention policies: how long to keep conversation logs
- Encryption: at rest and in transit
- Access control: who can see what data
- Compliance: GDPR, CCPA, HIPAA considerations

---

### MODULE 21 — Fine-Tuning & Custom Models (When You Need Them)

**Objective**: Understand when and how to fine-tune models for specific use cases.

**Lessons to generate:**

21.1 **Fine-tuning vs prompting vs RAG**

| Approach | Best for | Cost | Effort | Flexibility |
|----------|----------|------|--------|-------------|
| **Prompting** | Most tasks | Low | Low | High |
| **RAG** | Knowledge-specific tasks | Medium | Medium | High |
| **Fine-tuning** | Style/format/domain tasks | High | High | Low |

21.2 **When to fine-tune**
- Consistent output format that prompting can't achieve
- Domain-specific language (medical, legal, technical)
- Reducing latency (smaller fine-tuned model vs larger général model)
- Cost optimization at massive scale
- When NOT to: if prompting + RAG can solve it, don't fine-tune

21.3 **Fine-tuning process**
- Data preparation: input/output pairs (minimum 100, ideally 1000+)
- Format: JSONL with messages array
- Training: use provider's fine-tuning API (OpenAI, Together AI)
- Evaluation: compare fine-tuned vs base model on eval suite
- Iteration: adjust data, retrain, re-evaluate

21.4 **Open-source model fine-tuning**
- LoRA/QLoRA: efficient fine-tuning (trains tiny adapters, not full model)
- Unsloth: 2x faster fine-tuning with 60% less memory
- Hugging Face: model hub, training infrastructure
- Together AI / Modal: cloud-based fine-tuning
- Deployment: vLLM, Ollama, or cloud inference

---

### MODULE 22 — Final Project: Build & Deploy a Complète AI System

**Objective**: The student builds and deploys a production-grade AI system from scratch.

**Project requirements:**

1. **Architecture document**: system diagram, model choices, data flow, cost estimate
2. **Core application**: Next.js + Convex + Clerk with AI-powered features
3. **RAG system**: knowledge base with 200+ documents, semantic search, quality evaluation
4. **Agent system**: at least 3 agents with tool use, planning, and self-correction
5. **Evaluation suite**: 50+ test cases, automated evals, quality dashboard
6. **Production deployment**: Vercel + VPS for background workers
7. **Monitoring**: latency, errors, costs, quality — with Telegram alerting
8. **Security**: input/output guardrails, auth, rate limiting
9. **Documentation**: architecture decisions, API docs, runbook
10. **Demo video**: 5-minute walkthrough of the system in action

**Evaluation criteria:**
- System runs reliably for 7 days without manual intervention
- Evaluation scores meet defined quality thresholds
- Costs are tracked and within budget
- Monitoring catches simulated failures
- Security resists 10 adversarial test cases
- Code is clean, documented, and maintainable

---

## Course Summary

| Phase | Weeks | Modules | Hours | Focus |
|-------|-------|---------|-------|-------|
| Foundations | 1-3 | 1-5 | 10-14h | Architecture, LLMs, API, prompts, data |
| Core Engineering | 4-6 | 6-10 | 12-16h | Chat apps, agents, RAG, AI SDK, Agent SDK |
| Advanced Patterns | 7-9 | 11-16 | 12-16h | Multi-agent, evaluation, optimization, safety, workflows, real-time |
| Production & Scale | 10-12 | 17-22 | 12-16h | Deployment, monitoring, scaling, security, fine-tuning, final project |
| **TOTAL** | **12** | **22** | **46-62h** | **Production-grade AI system builder** |

---

## Bonus & Resources

- Complète starter template: Next.js + Convex + Clerk + Claude API + RAG + Agent
- Architecture decision templates (for documenting your own systems)
- Eval suite template (50 test cases + automation scripts)
- Monitoring dashboard template (Next.js + Convex)
- Cost calculator spreadsheet
- Security checklist (50 items)
- Community Telegram for AI system builders
- Monthly architecture review sessions
- Lifetime access and updates

## Upsell

> "Want us to build your AI system? Agentik {OS} offers AI Build services ($15K-45K) for custom production AI systems, and CAIO Partnerships ($4K-15K/month) for ongoing AI leadership. agentik-os.com/pricing"

---

**END OF DOCUMENT — Course: Building AI Systems — From Architecture to Production**
