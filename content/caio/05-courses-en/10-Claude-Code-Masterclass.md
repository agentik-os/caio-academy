# Course — Claude Code Masterclass

## From Absolute Beginner to System Expert in 12 Weeks

## Instructions for the Course Création Agent

> **Goal**: Generate THE world-référence training on Claude Code. Someone who has never touched Claude Code must be able to become an absolute expert capable of building their own autonomous systems, their own agents, their own automations, and their own monitoring dashboards. Everything must be covered. Zero blind spots.
>
> **Tone**: Pedagogical and progressive. We start from zero, we finish at expert. Each concept is explained, demonstrated, then put into practice. The tone is direct, practical, never condescending. We respect the beginner while pushing toward expertise.
>
> **Format**: 4 levels (Beginner → Foundational → Intermediate → Expert). Each module = video screencast + source code + hands-on exercise + validation quiz + concrete project. Expert levels include complète end-to-end projects.
>
> **Estimated duration**: 50-70 hours of content. 10-12 weeks to complète.
>
> **Price**: $697 standalone / included in a premium bundle
>
> **Updates**: Living course. Quarterly updates to cover new features.

---

## Course Identity

| Field | Value |
|-------|-------|
| Name | **Claude Code Masterclass — From Zero to Autonomous System** |
| Subtitle | The most comprehensive training in the world on Claude Code |
| Creator | Gareth Simono — Founder of Agentik {OS} (265 agents, 190+ skills in production) |
| Target audience | Complète beginners, developers, tech entrepreneurs, CAIOs, freelancers |
| Prerequisites | Know how to use a computer. That's it. We truly start from zero. |
| Promise | "In 12 weeks, you go from 'what is Claude Code?' to 'I have my own ecosystem of autonomous agents working for me 24/7'" |
| Credibility | Created by the founder of Agentik OS who operates 265 agents in production, 190+ skills, and manages clients with a 100% Claude Code system |

---

## Course Architecture — 4 Levels

> LEVEL 1 — BEGINNER (Weeks 1-2)
> "I'm discovering Claude Code and making my first interactions"
> Modules 1-4
>
> LEVEL 2 — FOUNDATIONAL (Weeks 3-5)
> "I master the core tools and configure my environment"
> Modules 5-10
>
> LEVEL 3 — INTERMEDIATE (Weeks 6-8)
> "I create my own skills, hooks, agents, and automations"
> Modules 11-17
>
> LEVEL 4 — EXPERT (Weeks 9-12)
> "I build my own autonomous systems and deploy to production"
> Modules 18-25
---

# ═══════════════════════════════════════════════
# LEVEL 1 — BEGINNER
# "I'm discovering Claude Code"
# Weeks 1-2 | 8-10 hours
# ═══════════════════════════════════════════════

### MODULE 1 — What Is Claude Code?

**Objective**: The student understands what Claude Code is, why it's différent from ChatGPT/Cursor/Copilot, and what it can do.

**Lessons to generate:**

1.1 **AI Before Claude Code — The Problem**
- ChatGPT: isolated conversation, no access to your files, no execution
- Copilot: autocompletion, no autonomy, no system-level vision
- Cursor/Windsurf: augmented IDE, but still controlled by the human step by step
- The fundamental problem: these tools ASSIST. Claude Code ACTS.

1.2 **Claude Code — The Development Agent**
- Definition: Anthropic's official CLI for agentic development
- What "agentic" means: Claude makes decisions, executes, verifies, corrects — in a loop
- The 6 superpowers:
 1. Direct filesystem access (read, write, edit files)
 2. Shell command execution (bash, git, npm, etc.)
 3. Intelligent code search (grep, glob)
 4. Spawning specialized agents (parallel sub-agents)
 5. Persistent memory (remembers between sessions)
 6. Infinite extensibility (skills, hooks, MCP, custom agents)

1.3 **WOW Demo — What Claude Code Can Do**
- Video: build a complète landing page in 5 minutes
- Video: debug a complex bug by autonomously exploring the code
- Video: deploy a site to production with a single sentence
- Video: launch 5 agents in parallel to test an entire site
- The student understands the POTENTIAL before learning the details

1.4 **Honest Comparison with Alternatives**

| Feature | ChatGPT | Copilot | Cursor | Claude Code |
|---------|---------|---------|--------|-------------|
| File access | No | Active file | Project | Full filesystem |
| Shell execution | No | No | Limited | Full |
| Autonomous agents | No | No | No | Yes (parallel) |
| Persistent memory | Limited | No | Limited | Yes (multi-session) |
| Reusable skills | No | No | No | Yes (190+) |
| Automation hooks | No | No | No | Yes (16+ events) |
| MCP (connectors) | No | No | No | Yes (unlimited) |
| Multi-model | No | No | Yes | Yes |
| Native terminal | No | No | No | Yes |
| Open source | No | No | No | Yes (CLI) |

1.5 **Who Uses Claude Code and Why**
- Solo developers who want a team's productivity
- Startups who want to move fast without hiring
- CAIOs who build systems for their clients
- Companies automating complex workflows
- The Agentik OS case: 1 person, 265 agents, multiple clients

**Exercise**: The student watches the 4 demos and writes in 3 sentences what they would like to build with Claude Code.

---

### MODULE 2 — Installation & First Launch

**Objective**: The student has Claude Code installed and working on their machine, and has had their first successful interaction.

**Lessons to generate:**

2.1 **System Prerequisites**
- macOS, Linux, or Windows (via WSL2)
- Node.js 18+ (step-by-step installation for each OS)
- Terminal: iTerm2 (Mac), Windows Terminal (Windows), any Linux terminal
- Git (step-by-step installation)
- A text editor (VS Code recommended, optional)

2.2 **Installing Claude Code**
```bash
npm install -g @anthropic-ai/claude-code
> - Verification: `claude --version`
> - Troubleshooting common errors (permissions, Node version, proxy)
> - Update: `npm update -g @anthropic-ai/claude-code`
>
> 2.3 **Authentication**
> - `claude login` — sign in with a Claude.ai account (the simplest way)
> - Alternative: API key (for programmatic use)
> - Create an account on console.anthropic.com
> - Generate an API key
> - `export ANTHROPIC_API_KEY=sk-ant-...`
> - Alternative: AWS Bedrock, Google Vertex AI, Microsoft Foundry
> - Verify that authentication works
>
> 2.4 **First Session**
> ```bash
> mkdir my-first-project
> cd my-first-project
> claude
- The terminal interface: understanding what you see
- Send your first message: "Create a file hello.js that prints Hello World"
- Watch Claude ACT: read the terminal, see which tools are used
- Permissions: understanding why Claude asks for permission and when to say yes
- Quit: `Ctrl+C` or type "exit"

2.5 **The Claude Code Interface — Full Tour**
- The prompt area (at the bottom)
- The tool calls (in the middle) — reading Claude's actions
- The results (output)
- The status bar (at the top) — model, cost, context
- Special commands: `/help`, `/cost`, `/status`, `/compact`, `/clear`
- Essential keyboard shortcuts:
 - `Ctrl+C`: interrupt Claude
 - `Escape`: cancel the current menu
 - `Tab`: autocompletion
 - `Ctrl+L`: clear the screen
 - `Ctrl+Z`: undo the last file modification

**Exercise**: Install Claude Code, start a session, ask Claude to create 3 différent files, observe the permissions.

---

### MODULE 3 — Core Tools

**Objective**: The student understands the 10 fundamental tools of Claude Code and knows when each is used.

**Lessons to generate:**

3.1 **Read — Reading Files**
- Claude can read any file on the machine
- Images (PNG, JPG), PDFs, Jupyter notebooks, source code
- Parameters: `file_path`, `offset`, `limit` (for large files), `pages` (for PDFs)
- When Claude uses it: exploring existing code, understanding context
- Demo: "Read the package.json file and tell me which dependencies are installed"

3.2 **Write — Creating Files**
- Creates or overwrites a complète file
- Asks for permission (security)
- When Claude uses it: creating new files, complète rewrites
- Never use for small modifications (→ Edit)
- Demo: "Create a React Button component in src/components/Button.tsx"

3.3 **Edit — Modifying Files**
- Targeted replacement in an existing file (old_string → new_string)
- More précise than Write (sends only the diff, not the entire file)
- `replace_all` to replace all occurrences
- When Claude uses it: fixing a bug, adding a line, renaming a variable
- Demo: "Change the button color from blue to red in styles.css"

3.4 **Bash — Executing Commands**
- Claude can execute ANY shell command
- npm, git, python, curl, docker, etc.
- Configurable timeout (default 120s, max 600s)
- `run_in_background` for long-running commands
- When Claude uses it: installing packages, running builds, testing, deploying
- Demo: "Install the dependencies and start the dev server"

3.5 **Glob — Finding Files**
- Pattern-based search (like `find` but faster)
- Patterns: `**/*.tsx`, `src/components/**/*.ts`, `*.config.*`
- Results sorted by modification date
- When Claude uses it: finding all files of a type, discovering the structure
- Demo: "Find all TypeScript files in the project"

3.6 **Grep — Searching Content**
- Regex search within file contents (based on ripgrep)
- Modes: `files_with_matches` (paths), `content` (lines), `count`
- Context: `-A`, `-B`, `-C` for surrounding lines
- When Claude uses it: finding where a function is used, searching for a pattern
- Demo: "Search for all uses of useEffect in the project"

3.7 **WebFetch — Fetching Web Content**
- Download content from a URL
- Useful for documentation, APIs, références
- Demo: "Go read the shadcn/ui documentation on their website"

3.8 **WebSearch — Web Search**
- Search the web (like Google)
- To find solutions, documentation, examples
- Demo: "Search how to configure Tailwind CSS v4 with Next.js"

3.9 **NotebookEdit — Jupyter Notebooks**
- Modify Jupyter notebook cells (.ipynb)
- Add, edit, delete cells
- Supports code and markdown

3.10 **Agent — Delegating to a Sub-Agent**
- Launch a specialized agent for a complex task
- The sub-agent has its own context and tools
- Can run in parallel (`run_in_background`)
- When Claude uses it: multi-file tasks, deep searches, tests
- Demo: "Analyze all the project code and give me a quality report"

**Validation quiz**: 10 questions "Which tool would you use to..." with justification.

**Exercise**: The student gives 10 instructions to Claude Code and identifies which tool is used each time. Observation journal.

---

### MODULE 4 — Your First Complète Project

**Objective**: The student builds a complète project from A to Z with Claude Code, using all the basic tools.

**Lessons to generate:**

4.1 **Choosing a Suitable Project**
- Suggestions: personal portfolio, to-do app, static blog, landing page
- Criteria: simple enough for a beginner, complète enough to touch all tools
- The guided project for this module: **a responsive landing page with a contact form**

4.2 **Scaffolding with Claude Code**
- "Create a Next.js project with TypeScript and Tailwind CSS"
- Watch Claude: npm create, configuration, file structure
- Understand what Claude did and why

4.3 **Building Page by Page**
- Home page: hero section, features, CTA
- Contact page: form, validation
- Layout: navbar, footer
- At each step: observe the tools, understand the flow

4.4 **Handling Errors**
- When Claude makes a mistake (and it will)
- How to correct it: be specific, give context, show the error
- "The button isn't displaying correctly, here's what I see..."
- When to interrupt (`Ctrl+C`) and redirect

4.5 **Run, Test, Deploy**
- `npm run dev` — see the result locally
- Fix visual issues
- Production build: `npm run build`
- Deploy on Vercel (or other)

**Deliverable project**: Deployed landing page online. The student takes before/after screenshots of their corrections.

---

# ═══════════════════════════════════════════════
# LEVEL 2 — FOUNDATIONAL
# "I master the core tools"
# Weeks 3-5 | 12-15 hours
# ═══════════════════════════════════════════════

### MODULE 5 — The CLAUDE.md System — Your Most Important File

**Objective**: The student understands and masters the CLAUDE.md configuration system at all levels.

**Lessons to generate:**

5.1 **What Is CLAUDE.md and Why It's Crucial**
- CLAUDE.md = the permanent instructions for Claude in your project
- Without CLAUDE.md: Claude doesn't know your project, your conventions, your préférences
- With CLAUDE.md: Claude works EXACTLY the way you want, every session
- Analogy: CLAUDE.md is the brief you give a new developer on day 1

5.2 **The CLAUDE.md Hierarchy (priority high → low)**
1. Session instructions (CLI flags)
2. `.claude/CLAUDE.md` (project)
3. `.claude/rules/*.md` (project rules)
4. `CLAUDE.md` at the project root
5. `~/.claude/CLAUDE.md` (global, all projects)
6. `~/.claude/rules/*.md` (global rules)
- How priority works: the most specific wins
- When to use each level

5.3 **Structure of an Effective CLAUDE.md**
```markdown
# Project Name

## Overview
Project description, goal, target audience.

## Tech Stack
- Framework, language, database
- Specific versions

## Project Structure
src/
 app/ # Pages and routes
 components/ # Reusable components
 lib/ # Utilities and helpers

## Design Guidelines
- Colors, typography, visual conventions
- Style rules (dark mode, spacing, etc.)

## Key Commands
- `npm run dev` — Dev server
- `npm run build` — Production build
- `npm test` — Tests

## Rules
- No emojis in code
- TypeScript strict
- Mobile-first
> 5.4 **Rules Files — Modular Rules**
> - `~/.claude/rules/` (global) and `.claude/rules/` (project)
> - Each file = a rule or a set of related rules
> - Auto-loaded at every session
> - Naming convention: `00-critical.md`, `10-style.md`, `20-testing.md`
> - Real examples from Agentik OS: self-check, concise responses, language rules, smart routing
>
> 5.5 **Context Engineering — Optimizing What Claude Receives**
> - The context budget: every token counts
> - Keep CLAUDE.md < 50KB
> - Move details into rules files (loaded on demand)
> - Progressive disclosure: summary at the top, details below
> - Do NOT put in CLAUDE.md: git history, API docs, source code
> - DO put in CLAUDE.md: conventions, architecture, decisions, constraints
>
> 5.6 **Iterating on Your CLAUDE.md**
> - Start minimal, add as you go
> - Every time Claude makes a repeated error → add a rule
> - Every time Claude asks for info it should know → add it
> - Quarterly review: remove obsolete rules
>
> **Exercise**: The student creates a complète CLAUDE.md for their Module 4 project, with at least 3 rules files.
>
> ---
>
> ### MODULE 6 — Prompt Engineering for Claude Code
>
> **Objective**: The student knows how to formulate prompts that produce exactly the desired result, on the first try.
>
> **Lessons to generate:**
>
> 6.1 **Fundamental Principles**
> - **Specificity > Generality**: "Add a login button in the navbar that opens a Clerk modal" > "Add auth"
> - **Context > Instruction**: référence existing files, components, patterns
> - **Objective > Method**: say WHAT not HOW (unless the method matters)
> - **Decompose > Stack**: one task at a time for complex subjects
>
> 6.2 **Prompt Patterns That Work**
>
> | Pattern | Example | When to Use |
> |---------|---------|-------------|
> | **Direct** | "Fix the bug in auth.ts line 45" | Simple, localized task |
> | **Contextual** | "Following the pattern in UserCard.tsx, create TeamCard.tsx" | Consistency with existing code |
> | **Exploratory** | "Explore the src/lib/ folder and explain the architecture to me" | Discovery, understanding |
> | **Iterative** | "The button is too wide on mobile. Adjust to max-width 200px" | Progressive corrections |
> | **Architectural** | "We need to add a notification system. Propose 3 approaches." | Design, decisions |
> | **Delegative** | "Launch an agent to audit the project's security" | Complex/parallel tasks |
> | **Batch** | "Rename all camelCase functions to snake_case in src/utils/" | Repetitive operations |
>
> 6.3 **Anti-Patterns to Avoid**
> - "Make me a website" (too vague)
> - Pasting code without context (Claude can read the files)
> - Asking for 10 things in a single prompt (decompose)
> - Repeating the same instruction if it doesn't work (change approach)
> - "Can you..." (yes it can, tell it to DO it)
>
> 6.4 **Advanced Context Engineering**
> - Provide the right référence files: "Look at src/components/Button.tsx for the style"
> - Specify constraints: "Use Tailwind only, no custom CSS"
> - Give examples: "The expected format is like in tests/example.test.ts"
> - Use @mentions (VS Code) to référence files
> - The "before/after" technique: "Currently it does X, I want it to do Y"
>
> 6.5 **Advanced Prompts — Expert Techniques**
> - **Chain of thought**: "Think step by step before implementing"
> - **Role playing**: "You are a security expert. Audit this code."
> - **Negative constraint**: "Do NOT modify the config.ts file"
> - **Integrated validation**: "After the change, run the tests to verify"
> - **Multi-step**: "1. Read the current component. 2. Identify the issues. 3. Propose solutions. 4. Implement the best one."
>
> 6.6 **Communicating with Claude — The Nuances**
> - When Claude makes an error: be précise about what's wrong
> - When the result is partial: "Continue" or "The X part is missing"
> - When you want to change approach: "Cancel, let's do Y instead"
> - When you want to understand: "Explain why you chose this approach"
> - Positive feedback: validating good approaches helps Claude calibrate
>
> **Exercise**: The student writes 10 prompts for 10 différent tasks, executes them, notes the result (success/failure), and improves the prompts that failed.
>
> ---
>
> ### MODULE 7 — Permissions and Security
>
> **Objective**: The student understands the permission system, knows how to configure it, and works securely.
>
> **Lessons to generate:**
>
> 7.1 **Why Permissions Exist**
> - Claude Code can do EVERYTHING on your machine
> - Permissions are the guardrail between intention and execution
> - Philosophy: Claude asks, you approve (or not)
>
> 7.2 **Permission Modes**
>
> | Mode | Behavior | When to Use |
> |------|----------|-------------|
> | `default` | Asks for sensitive actions | Normal usage |
> | `acceptEdits` | Auto-accepts file edits | Trust in modifications |
> | `dontAsk` | Auto-refuses permissions | Read-only mode |
> | `bypassPermissions` | Accepts everything (except .git, .claude) | Autonomous agents (with caution) |
> | `plan` | Read-only, exploration | Design and analysis |
>
> 7.3 **Fine-Grained Permission Configuration**
> ```json
> {
> "permissions": {
> "allow": [
> "Bash(npm *)", // All npm commands
> "Bash(git *)", // All git commands
> "Write(src/**)", // Write in src/ only
> "WebFetch(domain:github.com)" // Fetch GitHub only
> ],
> "deny": [
> "Bash(rm -rf *)", // NEVER recursive delete
> "Write(.env*)" // NEVER write secrets
> ]
> }
> }
7.4 **Security Best Practices**
- Never put secrets in CLAUDE.md
- Use environment variables for tokens/keys
- Don't grant `bypassPermissions` except for trusted agents
- Review Bash commands before approving (especially `rm`, `git push`, `curl`)
- Use `.claude/settings.local.json` for local settings (gitignored)

7.5 **Advanced Permission Rules**
- File patterns: `Write(src/**/*.ts)` — write only to .ts files in src
- Command patterns: `Bash(pnpm *)` — pnpm only
- MCP patterns: `mcp__github__*` — all GitHub MCP tools
- Agent patterns: `Agent(code-reviewer)` — only the code-reviewer

**Exercise**: The student configures a set of permissions for their project that allows normal dev work but blocks dangerous actions.

---

### MODULE 8 — Git & Version Control with Claude Code

**Objective**: The student knows how to use Git effectively with Claude Code.

**Lessons to generate:**

8.1 **Claude Code and Git — Native Integration**
- Claude automatically detects Git repos
- It sees the status, branches, history
- It can commit, branch, merge, push
- The `gitStatus` is loaded at every session

8.2 **Recommended Git Workflow**
- Always work on a feature branch
- Atomic commits: one feature per commit
- Descriptive commit messages (Claude generates them well)
- PR with complète description

8.3 **Git Commands via Claude Code**
- "Make a commit with a descriptive message"
- "Create a branch feature/login and switch to it"
- "Show me the diff since the last commit"
- "Create a Pull Request on GitHub"
- Best practices: never force push without asking, always new commit vs amend

8.4 **Git Worktrees — Isolated Parallel Work**
- What is a worktree: isolated copy of the repo in a temporary folder
- Why: work on 2 features in parallel without conflict
- How:
 - `claude --worktree feature-name` (CLI)
 - `claude --isolation worktree` (isolated session)
 - In an agent: `isolation: "worktree"`
- Automatic cleanup if there are no changes
- Use case: launch a test agent in a worktree while you dev in main

8.5 **Multi-Account Git**
- Configure différent Git accounts per project
- Use différent SSH keys
- The pattern: `.gitconfig` with `includeIf`
- Agentik OS example: 4 différent Git accounts depending on the project

**Exercise**: The student creates a branch, makes 3 commits with Claude Code, and creates a PR on GitHub.

---

### MODULE 9 — Model Selection & Cost Management

**Objective**: The student knows which model to use when, and how to optimize costs.

**Lessons to generate:**

9.1 **Available Models in Claude Code**

| Model | ID | Context | Strength | Speed | Cost |
|-------|----|---------|----------|-------|------|
| **Opus 4.6** | `claude-opus-4-6` | 200K (1M available) | Deep reasoning, complex code, analysis | Slower | $$$ |
| **Sonnet 4.6** | `claude-sonnet-4-6` | 200K | Quality/speed balance | Medium | $$ |
| **Haiku 4.5** | `claude-haiku-4-5` | 200K | Simple tasks, fast | Fast | $ |

9.2 **When to Use Which Model**
- **Opus**: complex code, difficult debugging, architecture, decisions, critical agents
- **Sonnet**: daily development, features, refactoring
- **Haiku**: code exploration, simple searches, read-only agents
- Golden rule: start with Sonnet, escalate to Opus when the task is complex

9.3 **Switching Models**
- In session: no direct command, but Fast mode switches to quick mode
- CLI: `claude --model sonnet`
- Settings: `"model": "sonnet"` in settings.json
- Per agent: `model: haiku` in the agent definition
- Per skill: `model: opus` in the skill frontmatter

9.4 **Managing Costs**
- `/cost` — see the current session cost
- Token tracker in the status bar
- Optimization stratégies:
 - Use Haiku for exploration agents
 - Limit context (don't read unnecessary files)
 - `/compact` to free context instead of restarting
 - Break large tasks into smaller sessions

9.5 **Billing Plans**
- Claude Pro ($20/month): 5x more usage
- Claude Max ($100/month): 20x more
- Claude Max ($200/month): unlimited
- Direct API: pay-per-token (for programmatic use)
- How to choose: if you use Claude Code every day, Max pays for itself

**Exercise**: The student performs the same task with Opus, Sonnet, and Haiku, compares quality/speed/cost, and defines their strategy.

---

### MODULE 10 — The Context Window — Understanding and Optimizing

**Objective**: The student understands the concept of context, knows when it saturates, and how to optimize it.

**Lessons to generate:**

10.1 **What Is Context?**
- Context = Claude's "working memory" during ONE session
- Everything consumes context: your CLAUDE.md, your messages, tool results, code read
- Limit: 200K tokens (approximately 500 pages of text)
- When context is full: Claude forgets the beginning of the conversation

10.2 **What Consumes Context (and How Much)**
- CLAUDE.md + rules files: loaded at startup (a few thousand tokens)
- Each message sent and each response: accumulates
- Each file read (Read): added to context
- Each search result (Grep/Glob): added
- Available skill descriptions: loaded if relevant
- MCP tool descriptions: loaded at startup

10.3 **Signs That Context Is Saturating**
- Claude "forgets" instructions from the beginning of the conversation
- Responses become repetitive or generic
- Claude re-asks for information it already had
- System message: automatic compaction

10.4 **Optimization Stratégies**
- `/compact`: Claude summarizes the conversation, freeing context
- `/clear`: start from scratch (CLAUDE.md is reloaded)
- Short, focused sessions > long général conversations
- Don't Read unnecessary files ("read me ALL the project files" = bad idea)
- Use sub-agents (each has its own context)
- Break into sessions: "Session 1: research. Session 2: implementation."

10.5 **Automatic Compaction**
- At ~95% capacity, Claude automatically compacts
- It summarizes old messages to keep recent ones
- CLAUDE.md instructions and rules are ALWAYS preserved
- Manual `/compact`: force compaction when things start drifting

10.6 **Extended Thinking / Ultra Think**
- For tasks requiring deep reasoning
- Claude "thinks longer" before responding
- Useful for: complex debugging, architecture, critical decisions
- Consumes more tokens but gives better results

**Exercise**: The student observes their context consumption across 3 différent sessions, identifies saturation points, and applies optimization stratégies.

---

# ═══════════════════════════════════════════════
# LEVEL 3 — INTERMEDIATE
# "I create my own tools"
# Weeks 6-8 | 15-18 hours
# ═══════════════════════════════════════════════

### MODULE 11 — Creating Skills (Reusable Capabilities)

**Objective**: The student knows how to create, test, and deploy professional Claude Code skills.

**Lessons to generate:**

11.1 **Skills — The Concept**
- A skill = a documented and reusable capability
- Analogy: a playbook you give an employee for a specific task
- Examples: `/deploy`, `/audit`, `/blog-write`, `/test`, `/report`
- Skills vs Prompts: a skill is structured, testable, shareable

11.2 **Anatomy of a Skill — The SKILL.md File**
```yaml
---
name: deploy-production
description: Deploy the current project to Vercel production with verification
user-invocable: true
allowed-tools: Bash, Read, Glob
model: inherit
argument-hint: "[--skip-tests]"
---

# Deploy to Production

## Steps
1. Run `pnpm build` to verify the build
2. If build fails, show the error and stop
3. Run `vercel --prod --yes --token "$VERCEL_TOKEN"`
4. Wait for deployment URL
5. Verify the deployment is live with a fetch
6. Report success or failure
11.3 **All Frontmatter Fields**
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Unique name (lowercase, hyphens, max 64 chars) |
| `description` | string | When to use this skill (Claude uses this to auto-invoke) |
| `disable-model-invocation` | bool | `true` = only invocable by the user |
| `user-invocable` | bool | `false` = only invocable by Claude |
| `allowed-tools` | string | Allowed tools (comma-separated) |
| `model` | string | `sonnet`, `opus`, `haiku`, `inherit` |
| `effort` | string | `low`, `medium`, `high`, `max` |
| `context` | string | `fork` = isolated sub-agent |
| `agent` | string | Sub-agent type (`Explore`, `Plan`, etc.) |
| `argument-hint` | string | Displayed in autocompletion |
| `hooks` | object | Hooks specific to this skill |
11.4 **Variables Available in Skills**
$ARGUMENTS # All arguments as a string
$ARGUMENTS[0] # First argument
$0, $1, $2 # Shortcuts
${CLAUDE_SESSION_ID} # Session ID
${CLAUDE_SKILL_DIR} # Skill directory
11.5 **Where to Place Skills**
- `~/.claude/skills/skill-name/SKILL.md` — global (all projects)
- `.claude/skills/skill-name/SKILL.md` — project-specific
- `~/.claude/commands/name.md` — legacy (still works)
- `.claude/commands/name.md` — legacy project
- Skills in `skills/` are the recommended format (more structure)
11.6 **Advanced Skills — Techniques**
- **Multi-file**: SKILL.md + support.md + templates/
- **Skill that invokes other skills**: orchestration
- **Conditional skill**: "If the project uses Next.js, do X. If Vue, do Y."
- **Skill with validation**: hooks in the frontmatter to validate the result
- **Shareable skill**: publish on GitHub, install with `/follow`
11.7 **Testing and Debugging Skills**
- Invoke: `/skill-name` in Claude Code
- Debug: `Ctrl+O` for verbose mode
- Iterate: modify the SKILL.md, re-invoke
- Validate: does the skill produce the expected result every time?
**Exercise**: The student creates 5 skills for their project: deploy, test, lint, format, audit. Each with complète frontmatter.
---
### MODULE 12 — Hooks — Event-Driven Automation
**Objective**: The student masters the hook system to automate actions on every Claude Code event.
**Lessons to generate:**
12.1 **Hooks — The Concept**
- A hook = an action that triggers automatically when an event occurs
- Analogy: Claude Code's GitHub Actions
- Example: every time Claude modifies a file → log the change
12.2 **The 16+ Event Types**
| Event | When | Matcher | Can Block? |
|-------|------|---------|------------|
| `SessionStart` | Session begins | `startup`, `resume`, `clear`, `compact` | Yes |
| `InstructionsLoaded` | CLAUDE.md loaded | loading type | No |
| `UserPromptSubmit` | Before Claude processes the message | N/A | Yes |
| `PreToolUse` | Before tool execution | tool name | Yes |
| `PermissionRequest` | Permission dialog | tool name | Yes |
| `PostToolUse` | After tool success | tool name | Yes |
| `PostToolUseFailure` | After tool failure | tool name | No |
| `Notification` | Notification sent | notification type | No |
| `SubagentStart` | Sub-agent begins | agent type | No |
| `SubagentStop` | Sub-agent ends | agent type | No |
| `Stop` | Claude finishes responding | N/A | Yes |
| `StopFailure` | API error at end of turn | error type | No |
| `TaskCompleted` | Task completed | N/A | Yes |
| `ConfigChange` | Config change | config type | Yes |
| `PreCompact` | Before compaction | `manual`, `auto` | No |
| `PostCompact` | After compaction | `manual`, `auto` | No |
| `SessionEnd` | Session ends | end type | No |
12.3 **Hook Types**
**Command hook** (the most common):
```json
{
"type": "command",
"command": "echo 'File modified: ${toolInput.file_path}' >> /tmp/changes.log",
"timeout": 600
}
**Prompt hook** (Claude evaluates):
```json
{
 "type": "prompt",
 "prompt": "Verify that this change respects the project conventions"
}
> **Agent hook** (sub-agent verifies):
> ```json
> {
> "type": "agent",
> "prompt": "Verify that the tests pass after this change",
> "timeout": 60
> }
**HTTP hook** (external call):
```json
{
 "type": "http",
 "url": "http://localhost:8080/webhook",
 "headers": { "Authorization": "Bearer $TOKEN" }
}
12.4 **Exit Codes**
- `exit 0`: the action continues. Stdout is added to Claude's context
- `exit 2`: the action is BLOCKED. Stderr is returned to Claude as feedback
- Other: the action continues, stderr is logged in verbose mode
12.5 **Matchers — Filtering Events**
```json
"matcher": "Bash" // Exact match
"matcher": "Edit|Write" // Multiple (pipe)
"matcher": "mcp__github__.*" // Regex
"matcher": "" // Match ALL (empty)
12.6 **Configuration in settings.json**
```json
{
 "hooks": {
 "SessionStart": [
 {
 "type": "command",
 "command": "echo 'Session started' | tee -a ~/.claude/sessions.log"
 }
 ],
 "PostToolUse": [
 {
 "matcher": "Write|Edit",
 "hooks": [{
 "type": "command",
 "command": "echo '$(date): ${toolInput.file_path}' >> /tmp/claude-changes.log"
 }]
 }
 ],
 "SessionEnd": [
 {
 "type": "command",
 "command": "bash ~/.claude/lib/nerve-session-end-hook.sh"
 }
 ]
 }
}
12.7 **Concrete Use Cases**
- Log every modified file (audit trail)
- Send a Telegram notification when a deploy is done
- Automatically load context at startup
- Block modifications to certain critical files
- Save a session summary at the end
- Validate code before each commit
- Record session metrics (duration, tools used, costs)
**Exercise**: The student configures 4 hooks: SessionStart (log), PostToolUse on Write (notification), PreToolUse on Bash to block `rm -rf`, SessionEnd (summary).
---
### MODULE 13 — The Agent System (Sub-Agents)
**Objective**: The student knows how to create and use specialized agents to delegate complex tasks.
**Lessons to generate:**
13.1 **Sub-Agents — The Concept**
- A sub-agent = a specialized Claude with its own context and tools
- Each agent has specific instructions, restricted tools, a clear role
- Analogy: a team where each member has a specialty
13.2 **Built-in Agents**
| Agent | Model | Tools | Usage |
|-------|-------|-------|-------|
| `Explore` | Haiku | Read-only | Rapid codebase exploration |
| `Plan` | Inherited | Read-only | Planning, design |
| `général-purpose` | Inherited | All | Complex multi-step tasks |
13.3 **Creating a Custom Agent**
File structure:
.claude/agents/code-reviewer/
└── agent.md
> `agent.md` file:
> ```yaml
> ---
> name: code-reviewer
> description: Reviews code for quality, security, and best practices
> tools: Read, Grep, Glob, Bash
> model: sonnet
> permissionMode: default
> maxTurns: 20
> memory: project
> ---
>
> # Code Reviewer Agent
>
> You are an expert code reviewer. When invoked:
> 1. Read the files that changed (use git diff)
> 2. Check for security vulnerabilities
> 3. Check for code quality issues
> 4. Check for performance problems
> 5. Generate a structured report
13.4 **All Agent Frontmatter Fields**

| Field | Description |
|-------|-------------|
| `name` | Unique identifier |
| `description` | When to delegate to this agent |
| `tools` | Allowed tools (allowlist) |
| `disallowedTools` | Forbidden tools (denylist) |
| `model` | Model to use |
| `permissionMode` | Permission mode |
| `maxTurns` | Maximum number of turns |
| `skills` | Skills to pre-load |
| `mcpServers` | Accessible MCP servers |
| `hooks` | Specific hooks |
| `memory` | Memory scope (`user`, `project`, `local`) |
| `background` | `true` = always in background |
| `effort` | Effort level |
| `isolation` | `worktree` = isolated in a Git worktree |

13.5 **Invoking an Agent**
- Automatic: Claude decides based on the description
- Explicit: "Use the code-reviewer agent to check this code"
- @mention: `@code-reviewer review the auth changes`
- CLI: `claude --agent code-reviewer`
- Settings: `"agent": "code-reviewer"`

13.6 **Parallel Agents**
- Launch multiple agents simultaneously
- Each works independently
- `run_in_background: true` — you keep working meanwhile
- Notification when the agent finishes
- Use case: launch a tester, a reviewer, and a security scanner in parallel

13.7 **Persistent Agent Memory**
- `memory: user` → `~/.claude/agent-memory/agent-name/`
- `memory: project` → `.claude/agent-memory/agent-name/`
- `memory: local` → `.claude/agent-memory-local/agent-name/`
- The agent can read/write in its memory folder
- MEMORY.md: the first 200 lines are loaded into context
- Use case: an agent that learns the project's patterns over time

13.8 **Inter-Agent Communication**
- `SendMessage(to: "agent-name")` — send a message to a running agent
- The agent responds in its context
- Pattern: orchestrator → specialists → report

**Exercise**: The student creates 3 custom agents: a reviewer (read-only), a fixer (editing), and a tester (bash). They make them work on the same code.

---

### MODULE 14 — MCP (Model Context Protocol) — Connecting Claude to the World

**Objective**: The student understands MCP, knows how to configure servers, and can connect Claude to any service.

**Lessons to generate:**

14.1 **MCP — The Universal Standard**
- MCP = Model Context Protocol = "USB for AI"
- Allows Claude to connect to external services (APIs, databases, tools)
- Open standard, not Anthropic-specific
- 3 primitives: Tools (functions), Resources (data), Prompts (templates)

14.2 **Types of MCP Servers**

| Type | Protocol | Use Case |
|------|----------|----------|
| `stdio` | JSON-RPC stdin/stdout | Local processes |
| `http` | HTTP POST | Remote servers |
| `sse` | Server-Sent Events | Streaming updates |

14.3 **Configuring an MCP Server**

In `.mcp.json` (project) or `~/.mcp.json` (global):
```json
{
 "mcpServers": {
 "github": {
 "type": "stdio",
 "command": "npx",
 "args": ["-y", "@modelcontextprotocol/server-github"],
 "env": { "GITHUB_TOKEN": "ghp_..." }
 }
 }
}
> Or in `settings.json` → `mcpServers`.
>
> 14.4 **Essential MCP Servers**
>
> | Server | What It Does | Installation |
> |--------|-------------|-------------|
> | **Composio** | 200+ apps (Slack, Gmail, LinkedIn, etc.) | `composio-mcp` |
> | **Playwright** | Browser automation, screenshots | `@anthropic/mcp-playwright` |
> | **PostgreSQL** | Direct database queries | `mcp-server-postgresql` |
> | **Filesystem** | Cross-project file access | `@modelcontextprotocol/server-filesystem` |
> | **GitHub** | Issues, PRs, code | `@modelcontextprotocol/server-github` |
> | **Memory/Search** | Persistent memory, semantic search | `claude-mem` |
> | **Chrome DevTools** | Browser debugging | `mcp-chrome-devtools` |
> | **Context7** | Up-to-date library documentation | `@context7/mcp` |
>
> 14.5 **Tool Search — For Large MCP Servers**
> - When an MCP server has 100+ tools (e.g., Composio)
> - Instead of loading all schemas → lazy loading
> - Configuration: `"toolSearch": true` in the server config
> - `ToolSearch` tool: search and load tools on demand
>
> 14.6 **Building a Custom MCP Server**
> - TypeScript SDK: `@modelcontextprotocol/sdk`
> - Minimal structure:
> 1. Create a Server
> 2. Declare tools (name, description, inputSchema)
> 3. Implement handlers (tools/list, tools/call)
> - Publish on npm to share
> - Use case: connect an internal API to Claude Code
>
> 14.7 **MCP Tool Naming**
mcp__<server>__<tool>
mcp__github__search_repositories
mcp__composio__SLACK_SEND_MESSAGE
> - Claude can call these tools directly in the conversation
> - Configurable permissions: `"allow": ["mcp__github__*"]`
>
> **Exercise**: The student configures 3 MCP servers (Playwright + a service of their choice + a basic custom one) and builds a workflow that uses all of them.
>
> ---
>
> ### MODULE 15 — Persistent Memory
>
> **Objective**: The student understands and uses the memory system so that Claude remembers between sessions.
>
> **Lessons to generate:**
>
> 15.1 **Types of Memory in Claude Code**
> - **CLAUDE.md**: explicit, manual, versioned memory
> - **Auto-memory**: automatic, semantic, local memory
> - **Agent memory**: per-agent, persistent memory
> - **Rules files**: permanent rules
> - Each type has its use
>
> 15.2 **Auto-Memory — How It Works**
> - Claude automatically records important interactions
> - Storage: SQLite + Chroma (vector DB) locally
> - Semantic search: find information by meaning, not by keyword
> - Command `/memory` to view and edit
> - Disable: `claude --disable-auto-memory`
>
> 15.3 **Persistent Agent Memory (Detailed)**
> - Each agent can have its own memory folder
> - 3 scopes:
> - `user`: `~/.claude/agent-memory/<agent>/` (global)
> - `project`: `.claude/agent-memory/<agent>/` (project, versioned)
> - `local`: `.claude/agent-memory-local/<agent>/` (project, gitignored)
> - `MEMORY.md`: memory index, first 200 lines auto-loaded
> - The agent can create other files (reports, logs, data)
>
> 15.4 **claude-mem Plugin — Advanced Memory**
> - SQLite + Chroma plugin for semantic search
> - Automatic hooks: SessionStart, PostToolUse, SessionEnd
> - MCP tools: `search(query)`, `get_observations(ids)`, `timeline(id)`
> - Web UI: `http://localhost:37777`
> - Ideal for long sessions on complex projects
>
> 15.5 **Memory Stratégies**
> - What to memorize: architecture decisions, préférences, recurring patterns
> - What NOT to memorize: specific code (it changes), Git history (it already exists)
> - Recommended pattern: CLAUDE.md for guidelines + auto-memory for history + agent memory for specialists
>
> **Exercise**: The student configures memory for their project, runs 3 separate sessions, and verifies that context persists correctly.
>
> ---
>
> ### MODULE 16 — IDE Integrations (VS Code & JetBrains)
>
> **Objective**: The student knows how to use Claude Code in their preferred IDE.
>
> **Lessons to generate:**
>
> 16.1 **VS Code Extension**
> - Installation from the Marketplace
> - Chat in the sidebar: conversation with Claude inside VS Code
> - @mentions: référence files, functions, symbols
> - Code actions: Claude in the context menu
> - Integrated terminal: Claude Code directly in the VS Code terminal
> - Shortcut: `Cmd+K Cmd+I` (Mac) / `Ctrl+K Ctrl+I` (Windows/Linux)
>
> 16.2 **JetBrains Plugin**
> - Installation from the IDE Marketplace
> - Support: IntelliJ, PyCharm, WebStorm, CLion, etc.
> - Chat sidebar, terminal integration
> - Same features as VS Code
>
> 16.3 **Pure Terminal vs IDE — When to Use Which**
> - Terminal: system tasks, parallel agents, automations, deployments
> - IDE: visual modifications, code exploration, debugging with visual context
> - Both: complementary, not exclusive
> - Recommendation: master the terminal first, add the IDE later
>
> ---
>
> ### MODULE 17 — Advanced Commands & Shortcuts
>
> **Objective**: The student knows all the commands and shortcuts to be ultra-efficient.
>
> **Lessons to generate:**
>
> 17.1 **Complète Built-in Commands**
>
> | Command | Action |
> |---------|--------|
> | `/help` | Full help |
> | `/compact` | Compact the context |
> | `/clear` | New session |
> | `/memory` | View/edit memory |
> | `/cost` | Session cost |
> | `/context` | Context usage |
> | `/debug` | Session debug |
> | `/hooks` | Browse hooks |
> | `/agents` | Manage agents |
> | `/permissions` | Configure permissions |
> | `/skills` | List skills |
> | `/settings` | View active settings |
> | `/status` | Session status |
> | `/statusline` | Configure the status bar |
> | `/theme` | Change theme |
>
> 17.2 **Bundled Skills (Built-in)**
> - `/batch <instruction>` — parallel modifications across the codebase
> - `/simplify [focus]` — code review and fixes
> - `/loop [interval] <command>` — repeat on interval
> - `/debug [description]` — session troubleshooting
> - `/claude-api` — load the Claude API référence
>
> 17.3 **Complète Keyboard Shortcuts**
>
> | Shortcut | Action |
> |----------|--------|
> | `Ctrl+C` | Interrupt Claude |
> | `Escape` | Exit current menu |
> | `Ctrl+L` | Clear screen |
> | `Ctrl+R` | Search history |
> | `Ctrl+O` | Toggle verbose (debug) |
> | `Ctrl+B` | Send to background |
> | `Ctrl+Z` | Undo file modification |
> | `Tab` | Autocompletion |
>
> 17.4 **Custom Keybindings**
> ```json
> // ~/.claude/keybindings.json
> {
> "keyBindings": [
> {
> "key": "ctrl+shift+d",
> "command": "dispatch",
> "context": "prompt",
> "args": { "skill": "deploy" }
> }
> ]
> }
17.5 **Complète CLI Flags**
```bash
claude # Interactive session
claude "prompt" # One-shot
claude --model sonnet # Choose model
claude --agent code-reviewer # Use an agent
claude --worktree feature # Isolate in a worktree
claude --disable-auto-memory # Without auto memory
claude --debug # Full debug mode
claude --api-key sk-ant-... # Direct API key
claude --settings custom.json # Custom settings
echo "prompt" | claude --prompt - # Stdin
claude --version # Version
> **Exercise**: The student configures 3 custom keybindings and uses all built-in commands at least once.
>
> ---
>
> # ═══════════════════════════════════════════════
> # LEVEL 4 — EXPERT
> # "I build my own systems"
> # Weeks 9-12 | 18-25 hours
> # ═══════════════════════════════════════════════
>
> ### MODULE 18 — Multi-Agent Architectures
>
> **Objective**: The student knows how to design complex multi-agent architectures like Agentik OS.
>
> **Lessons to generate:**
>
> 18.1 **Architecture Patterns**
>
> | Pattern | Description | Use Case |
> |---------|-------------|----------|
> | **Single agent** | One Claude, all tasks | Small projects |
> | **Pipeline** | Agent A → Agent B → Agent C | Linear workflows |
> | **Fan-out** | 1 orchestrator → N parallel specialists | Bug hunting, audits |
> | **Hierarchical** | CEO → Managers → Specialists | Complex systems (Agentik OS) |
> | **Swarm** | Autonomous agents, peer-to-peer communication | Exploratory exploration |
>
> 18.2 **The ORACLE Pattern (Agentik OS)**
> - ORACLE = the central orchestrator (you or main Claude)
> - Classification: SIMPLE → MEDIUM → COMPLEX → EPIC
> - Routing: each task goes to the right agent
> - Fresh context: each agent receives exactly the context it needs
> - Decisions log: trace all routing decisions
>
> 18.3 **Designing an Agent Ecosystem**
> - Identify roles: what types of tasks?
> - Define specialists: one agent = one responsibility
> - Design flows: who talks to whom, in what order
> - Define interfaces: what inputs/outputs between agents
> - Test iteratively: start with 3 agents, add progressively
>
> 18.4 **The Agentik OS Example — 265 Agents**
> - 6 departments: Dev (54), QA (35), Security (28), Marketing (28), Créative (15), Strategy (32)
> - Hierarchy: CEO → CTO/CMO/CPO → Leads → Specialists
> - Orchestration: ORACLE classifies and routes
> - Use case: `/hunt` launches 15 agents in parallel to find all bugs
> - Result: 1 person operates a system that does the work of 20+
>
> 18.5 **Native Teams — Cooperative Multi-Agent**
> - `claude --team researcher,coder,reviewer` — launch a team
> - Each member works in parallel
> - Communication via `SendMessage`
> - Guardian pattern: one agent verifies the others' work
> - `/team` skill for orchestration
>
> **Exercise**: The student designs and implements an architecture of 5 agents for a use case of their choice (e.g., content pipeline, QA system, customer support workflow).
>
> ---
>
> ### MODULE 19 — Advanced Automation Systems
>
> **Objective**: The student builds complète automation pipelines that run 24/7.
>
> **Lessons to generate:**
>
> 19.1 **Cron Jobs — The Foundation of VPS Automation**
> - Complète cron syntax with all patterns
> - `crontab -e`, `crontab -l`
> - Logging: redirect stdout/stderr to files
> - Monitoring cron jobs: ensure they're running
>
> 19.2 **Automated Content Pipeline (Real Agentik OS Case)**
> - `auto-publish.sh`: select topic → Claude generates the article → generate image (Gemini Imagen) → create blog file → build Next.js → deploy Vercel → post LinkedIn/Twitter/Reddit (Composio) → Telegram notification
> - Each step detailed with source code
> - Error handling: retry 3x, fallback, alerts
> - Result: daily publication without human intervention
>
> 19.3 **Posting to Social Media Automatically**
> - `post-to-social.js`: LinkedIn, Reddit, Twitter via Composio + OAuth
> - `.social-posted.json`: tracker to avoid duplicates
> - Platform-specific formats (LinkedIn long-form, Twitter thread, Reddit post)
> - Scheduling: publish at optimal times
>
> 19.4 **Telegram Bots with Claude Code**
> - Create a Telegram bot: BotFather, get the token
> - Library `telegram.sh`: send_message, send_file, notify_all
> - Notifications: alert on deploys, errors, results
> - Commands: receive orders via Telegram, execute with Claude Code
> - The Agentik OS Nova bot: how it works
>
> 19.5 **Self-Healing — Self-Repairing Systems**
> - Automatic health checks (cron every 5 minutes)
> - Anomaly detection (CPU, memory, disk, processes)
> - Automatic actions: restart service, clear cache, scale up
> - Graduated alerts: warning → critical → auto-fix → notification
> - Circuit breaker: stop retrying if it fails 3 times
>
> 19.6 **Monitoring with Custom Dashboard**
> - Build a dashboard with Next.js + Convex
> - Real-time metrics: service health, last deploy, errors
> - Charts: uptime, performance, costs
> - Visual and Telegram alerts
> - The Agentik OS pattern: AISB Nerve → Neo → Zion → Telegram
>
> **Exercise**: The student builds a complète automated pipeline: content génération + publication + notification. It runs on cron on their machine.
>
> ---
>
> ### MODULE 20 — Building a Monitoring Dashboard
>
> **Objective**: The student builds their own dashboard to monitor their systems, agents, and automations.
>
> **Lessons to generate:**
>
> 20.1 **Dashboard Architecture**
> - Frontend: Next.js 16 + Tailwind + shadcn/ui
> - Backend: Convex (real-time, reactive)
> - Auth: Clerk (protect access)
> - Data: cron jobs feeding Convex with metrics
>
> 20.2 **Convex Schema for Monitoring**
> ```typescript
> // Example tables
> defineSchema({
> services: defineTable({
> name: v.string(),
> status: v.string(), // "healthy" | "warning" | "critical"
> lastCheck: v.number(),
> metrics: v.object({
> cpu: v.number(),
> memory: v.number(),
> uptime: v.number(),
> }),
> }),
> deployments: defineTable({
> project: v.string(),
> url: v.string(),
> timestamp: v.number(),
> status: v.string(),
> }),
> cronJobs: defineTable({
> name: v.string(),
> schedule: v.string(),
> lastRun: v.number(),
> lastStatus: v.string(),
> nextRun: v.number(),
> }),
> alerts: defineTable({
> type: v.string(),
> message: v.string(),
> severity: v.string(),
> timestamp: v.number(),
> resolved: v.boolean(),
> }),
> })
20.3 **Feeding the Dashboard**
- Cron jobs executing health checks
- Results sent to Convex via HTTP mutations
- Real-time: the dashboard updates automatically (Convex subscriptions)
- Pattern: check → mutation → dashboard update → alert if needed

20.4 **Dashboard Interface**
- Status cards per service (green/orange/red)
- Deployment timeline
- Cron job list with their status
- Real-time alert feed
- Performance charts (optional)

20.5 **Intelligent Alerting**
- Configurable alert rules
- Severity: info → warning → critical
- Channels: dashboard + Telegram + email
- Deduplication: no spam for the same alert
- Automatic resolution when the service returns to normal

**Exercise**: The student builds a minimalist dashboard with 3 monitored services, deployed on Vercel, with Telegram alerts.

---

### MODULE 21 — Autonomous Agents (God Mode)

**Objective**: The student knows how to create agents that work completely autonomously for hours.

**Lessons to generate:**

21.1 **The Autonomous Agent Concept**
- Autonomous = it decides, executes, verifies, corrects, iterates — without intervention
- Différence from a normal agent: no human feedback in the loop
- Risks: guardrails are needed (permissions, limits, monitoring)
- Use cases: exhaustive testing, code audits, content génération, migrations

21.2 **Ralph — The Autonomous Dev Agent**
- The Ralph pattern from Agentik OS
- Launch: `/ralph [task]`
- It runs in background, writes code, builds, tests, fixes, iterates
- Status: `.ralph/status.md`
- Continue: `/ralph --continue`
- Architecture: native Agent with `run_in_background: true` and `mode: bypassPermissions`

21.3 **Sentinel — The Persistent Testing Agent**
- Continuous test loop: test → detect bug → fix → re-test → repeat
- Checkpoints: saves state after each action (survives context limits)
- Multi-session: can resume where it left off (`--resume`)
- Telegram notifications: progress and results
- No time limit

21.4 **God Mode — Complète Autonomous Orchestration**
- Claude BECOMES the decision-maker: plans, executes, verifies, iterates indefinitely
- Heartbeat: health monitoring, kill switch if needed
- Telegram reporting: regular updates
- When to use: tasks you want to launch and forget
- When NOT to use: sensitive tasks, tasks with irreversible consequences

21.5 **Guardrails for Autonomous Agents**
- maxTurns: limit the number of turns
- Restricted permissions: no force push, no cascade delete
- Monitoring: SubagentStop hook to be notified
- Kill switch: ability to stop at any time
- Logging: trace all actions for review

**Exercise**: The student creates an autonomous agent that performs a full audit of their project (security, quality, performance) and generates a report. The agent runs in background while they do something else.

---

### MODULE 22 — CI/CD & Advanced Deployment

**Objective**: The student knows how to integrate Claude Code into CI/CD pipelines and automate deployments.

**Lessons to generate:**

22.1 **Claude Code in GitHub Actions**
```yaml
- uses: anthropic/claude-code@v1
 with:
 prompt: "Review this PR and leave a comment"
 repository: ${{ github.repository }}
- Use cases: automatic PR review, lint fixes, docs génération, release notes

22.2 **Complète Deploy Pipeline**
- Push → Tests → Build → Preview deploy → E2E tests → Prod deploy → Notification
- Vercel deploy: `vercel --prod --yes --token`
- Railway deploy for backends
- Automatic rollback if tests fail

22.3 **Multi-Provider**
- AWS Bedrock: `claude --bedrock`
- Google Vertex AI: `claude --vertex-ai`
- For enterprises with specific cloud constraints

---

### MODULE 23 — Security & Production Best Practices

**Objective**: The student deploys secure and robust systems.

**Lessons to generate:**

23.1 **Secrets Security**
- NEVER put secrets in CLAUDE.md or code
- Environment variables: `.env.local` (gitignored)
- `<private>` tags for sensitive content (not recorded in memory)
- API key rotation
- Dependency audit: `npm audit`

23.2 **Agent Security**
- Principle of least privilege: each agent gets the minimum necessary tools
- Isolation: worktrees for agents that modify code
- Review: PostToolUse hooks to verify modifications
- Logs: trace all actions for audit

23.3 **VPS Security**
- SSH key-only (no password)
- Firewall: iptables/ufw
- Fail2ban: block brute force attempts
- Regular updates
- Non-root user for everything

23.4 **Backup & Recovery**
- Git as primary code backup
- Automatic database backup (cron)
- VPS snapshots
- Documented recovery procédure
- Regular recovery testing

---

### MODULE 24 — Final Project — Your Complète Ecosystem

**Objective**: The student builds and deploys their own mini-ecosystem in the style of Agentik OS.

**Final project requirements:**

1. **Complète CLAUDE.md**: detailed project instructions with rules files
2. **5 custom skills**: deploy, test, audit, report, publish
3. **4 hooks**: SessionStart, PostToolUse (logging), Stop (notification), SessionEnd (summary)
4. **3 custom agents**: reviewer (read-only), builder (editing), tester (execution)
5. **2 MCP servers**: Composio + 1 custom or specific
6. **1 automated pipeline**: cron job that performs a useful task automatically
7. **1 monitoring dashboard**: Next.js + Convex with at least 2 monitored services
8. **1 Telegram bot**: to receive notifications and send commands
9. **Deployed to production**: Vercel for the frontend, VPS for crons and agents

**Evaluation**:
- The system runs autonomously for 24 hours without intervention
- Notifications arrive on Telegram
- The dashboard shows up-to-date data
- The agents produce useful results
- The code is clean, documented, secure

---

### MODULE 25 — Going Further — The Claude Ecosystem

**Objective**: The student knows the entire ecosystem around Claude Code to keep progressing.

**Lessons to generate:**

25.1 **Claude Agent SDK**
- For building agents OUTSIDE of Claude Code
- Python and TypeScript SDKs
- Architecture: model + tools + orchestration loop
- Deployment: servers, serverless, edge
- When to use: when you want an agent integrated into your own product

25.2 **Claude API**
- `@anthropic-ai/sdk` (TypeScript) / `anthropic` (Python)
- Messages API, tool use, streaming, structured outputs
- Vision (images), PDF parsing
- Batch API for mass processing
- Prompt caching to optimize costs

25.3 **The Shareable Skills Ecosystem**
- How to share your skills on GitHub
- `/follow URL` to install skills from someone else
- Contributing to the community
- Popular skill repositories

25.4 **Staying Current and Updates**
- Follow Claude Code releases (changelog)
- The community: forums, Discord, GitHub Issues
- New features to watch: cloud IDE, mobile, real-time collaboration
- How to adapt your ecosystem to new features

25.5 **Becoming a Trainer / Mentor**
- Share your skills and agents
- Create content about Claude Code
- Mentor other users
- Contribute to open source

---

## Course Summary

| Level | Weeks | Modules | Hours | Skills Acquired |
|-------|-------|---------|-------|-----------------|
| Beginner | 1-2 | 1-4 | 8-10h | Installation, first projects, basic tools |
| Foundational | 3-5 | 5-10 | 12-15h | CLAUDE.md, prompt engineering, permissions, git, models, context |
| Intermediate | 6-8 | 11-17 | 15-18h | Skills, hooks, agents, MCP, memory, IDE, commands |
| Expert | 9-12 | 18-25 | 18-25h | Multi-agents, automation, monitoring, autonomous agents, CI/CD, security, complète project |
| **TOTAL** | **12** | **25** | **53-68h** | **Autonomous Claude Code Expert** |

---

## Bonuses & Resources

- **GitHub template repo**: starter project with CLAUDE.md, skills, hooks, agents pre-configured
- **Cheat sheet PDF**: all commands, shortcuts, patterns on 2 pages
- **Telegram community**: support, mutual help, skill sharing
- **Monthly office hours**: live Q&A with the instructor
- **Quarterly updates**: new modules for new features
- **Lifetime access**: once purchased, always accessible

## Upsell

> "Want personalized guidance to build your ecosystem? Agentik {OS} offers a CAIO Partnership program. agentik-os.com/pricing"

---

**END OF DOCUMENT — Claude Code Masterclass Course: From Zero to Autonomous System**
