import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { escapeMdx } from "./formations";

export type KommuModule = {
  slug: string;
  track: string;
  number: string;
  title: string;
  summary: string;
  duration: string;
  audience: string;
  filePath: string;
};

const KOMMU_ROOT = path.join(process.cwd(), "content", "caio", "kommu-modules");

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
  return trimmed || "Module du programme Kommu.";
}

let _cache: KommuModule[] | null = null;

export function getAllKommuModules(): KommuModule[] {
  if (_cache) return _cache;
  const result: KommuModule[] = [];
  let files: string[] = [];
  try {
    files = fs.readdirSync(KOMMU_ROOT).filter((f) => f.endsWith(".md")).sort();
  } catch {
    return result;
  }
  for (const file of files) {
    const filePath = path.join(KOMMU_ROOT, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = matter(raw);
    const title = (parsed.data.title as string) || extractTitle(parsed.content);
    const summary = (parsed.data.summary as string) || extractSummary(parsed.content);
    const track = (parsed.data.track as string) || "agentic-tech";
    const number = (parsed.data.number as string) || "";
    const duration = (parsed.data.duration as string) || "";
    const audience = (parsed.data.audience as string) || "";
    const baseName = file.replace(/\.md$/, "");
    const slug = slugify(baseName);
    result.push({ slug, track, number, title, summary, duration, audience, filePath });
  }
  _cache = result;
  return result;
}

export function getKommuModule(slug: string): KommuModule | null {
  return getAllKommuModules().find((m) => m.slug === slug) ?? null;
}

export function getKommuModuleContent(slug: string): string | null {
  const m = getKommuModule(slug);
  if (!m) return null;
  try {
    const raw = fs.readFileSync(m.filePath, "utf-8");
    return escapeMdx(matter(raw).content);
  } catch {
    return null;
  }
}

export function getKommuModuleNeighbors(slug: string): {
  prev: KommuModule;
  next: KommuModule;
} {
  const all = getAllKommuModules();
  const index = all.findIndex((m) => m.slug === slug);
  if (index === -1) throw new Error(`Kommu module not found: ${slug}`);
  const prev = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];
  return { prev, next };
}

export const TRACK_LABELS: Record<string, { fr: string; en: string }> = {
  "agentic-tech": { fr: "Parcours Agentic Tech", en: "Agentic Tech Track" },
  business: { fr: "Parcours Business", en: "Business Track" },
  content: { fr: "Parcours Content", en: "Content Track" },
  aisb: { fr: "Parcours AISB", en: "AISB Track" },
};
