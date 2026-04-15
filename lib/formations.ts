import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Track = "c-suite" | "course-en" | "formation-fr";
export type Lang = "fr" | "en";

export type Formation = {
  slug: string;
  track: Track;
  lang: Lang;
  title: string;
  summary: string;
  avatar?: string;
  filePath: string;
};

const CAIO_ROOT = path.join(process.cwd(), "content", "caio");
const DIRS: { track: Track; lang: Lang; dir: string; prefix: string }[] = [
  { track: "c-suite", lang: "fr", dir: `${CAIO_ROOT}/04-c-suite-training`, prefix: "c-suite" },
  { track: "course-en", lang: "en", dir: `${CAIO_ROOT}/05-courses-en`, prefix: "course" },
  { track: "formation-fr", lang: "fr", dir: `${CAIO_ROOT}/06-formations-fr`, prefix: "formation" },
];

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractTitle(body: string): string {
  const m = body.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : "Untitled";
}

function extractSummary(body: string): string {
  // Strip frontmatter already removed by gray-matter
  // Skip headers, blockquotes, tables, and short lines; take first prose paragraph.
  const lines = body.split("\n");
  let paragraph = "";
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      if (paragraph.length > 80) break;
      paragraph = "";
      continue;
    }
    if (t.startsWith("#")) continue;
    if (t.startsWith(">")) continue;
    if (t.startsWith("|")) continue;
    if (t.startsWith("---")) continue;
    if (t.startsWith("-") || t.startsWith("*")) continue;
    paragraph += (paragraph ? " " : "") + t;
    if (paragraph.length > 220) break;
  }
  const trimmed = paragraph.replace(/\s+/g, " ").trim();
  if (trimmed.length > 220) return trimmed.slice(0, 217) + "...";
  return trimmed || "Formation CAIO Academy.";
}

// Manual avatar mapping — which avatar(s) benefit most from each module.
// Kept light: primary avatar only, so the filter is meaningful.
const AVATAR_HINTS: { match: RegExp; avatar: string }[] = [
  { match: /sales|revenue|growth|referral/i, avatar: "consultant-ai" },
  { match: /ceo|cfo|coo|cohesion|cio|chro|clo/i, avatar: "dg-pme" },
  { match: /cmo|seo|digital/i, avatar: "head-digital" },
  { match: /cto|claude|mcp|api|stack|context|prompt|agentic|systems builder|aisb|oracle/i, avatar: "cto-saas" },
  { match: /creator|business owners|ai for business/i, avatar: "dev-ambitieux" },
];

function inferAvatar(title: string, track: Track): string | undefined {
  if (track === "c-suite") return "dg-pme";
  for (const { match, avatar } of AVATAR_HINTS) {
    if (match.test(title)) return avatar;
  }
  return undefined;
}

let _cache: Formation[] | null = null;

export function getAllFormations(): Formation[] {
  if (_cache) return _cache;
  const result: Formation[] = [];
  for (const { track, lang, dir, prefix } of DIRS) {
    let files: string[] = [];
    try {
      files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    } catch {
      continue;
    }
    for (const file of files) {
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = matter(raw);
      const title = (parsed.data.title as string) || extractTitle(parsed.content);
      const summary = (parsed.data.summary as string) || extractSummary(parsed.content);
      const baseName = file.replace(/\.md$/, "");
      const slug = `${prefix}-${slugify(baseName)}`;
      const avatar =
        (parsed.data.avatar as string) || inferAvatar(title + " " + baseName, track);
      result.push({ slug, track, lang, title, summary, avatar, filePath });
    }
  }
  _cache = result;
  return result;
}

export function getFormation(slug: string): Formation | null {
  return getAllFormations().find((f) => f.slug === slug) ?? null;
}

export function getFormationContent(slug: string): string | null {
  const f = getFormation(slug);
  if (!f) return null;
  try {
    const raw = fs.readFileSync(f.filePath, "utf-8");
    return escapeMdx(matter(raw).content);
  } catch {
    return null;
  }
}

// Source markdown files aren't strict MDX — escape `{`, `}` and stray `<` so
// next-mdx-remote's acorn parser doesn't try to evaluate JSX/expressions.
export function escapeMdx(source: string): string {
  const lines = source.split("\n");
  let inFence = false;
  const out: string[] = [];
  for (const line of lines) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    const safe = line
      .replace(/\{/g, "&#123;")
      .replace(/\}/g, "&#125;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    out.push(safe);
  }
  return out.join("\n");
}

export function getFormationNeighbors(slug: string): {
  prev: Formation;
  next: Formation;
} {
  const f = getFormation(slug);
  if (!f) throw new Error(`Formation not found: ${slug}`);
  const peers = getAllFormations().filter((x) => x.track === f.track);
  const index = peers.findIndex((x) => x.slug === slug);
  const prev = peers[(index - 1 + peers.length) % peers.length];
  const next = peers[(index + 1) % peers.length];
  return { prev, next };
}

export const TRACK_LABELS = {
  "c-suite": { fr: "C-Suite", en: "C-Suite" },
  "course-en": { fr: "Course EN", en: "Course EN" },
  "formation-fr": { fr: "Formation FR", en: "Formation FR" },
} as const;
