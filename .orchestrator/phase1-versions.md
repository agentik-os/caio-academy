# Phase 1 — Resolved Package Versions

Queried via `npm view <pkg> version` on 2026-04-15 12:59 UTC.

## Core framework
| Package | Version |
|---|---|
| next | 16.2.3 |
| react | 19.2.5 |
| react-dom | 19.2.5 |
| tailwindcss | 4.2.2 |
| @tailwindcss/postcss | (pinned by create-next-app) |

## Backend / Auth
| Package | Version |
|---|---|
| convex | 1.35.1 |
| @clerk/nextjs | 7.2.0 |

## i18n / content
| Package | Version |
|---|---|
| next-intl | 4.9.1 |
| next-mdx-remote | latest |
| rehype-pretty-code | latest |
| shiki | latest |
| remark-gfm | latest |
| gray-matter | latest |
| fuse.js | latest |

## Integrations
| Package | Version |
|---|---|
| @elevenlabs/elevenlabs-js | 2.43.0 |
| @anthropic-ai/claude-agent-sdk | 0.2.109 |
| @vercel/blob | latest |
| @vercel/analytics | latest |
| lucide-react | latest |

## Toolchain
| Tool | Version |
|---|---|
| bun | 1.3.3 |
| node | 22.22.0 |
| gh | authenticated as agentik-os |
| vercel CLI | installed, token from ~/.aisb/config/vercel-tokens.json (team agentik-oss-projects) |

Final resolved versions will be captured from `package.json` after `bun install` completes.
