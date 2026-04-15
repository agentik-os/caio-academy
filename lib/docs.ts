import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type DocLang = "fr" | "en" | "neutral";

export type DocFile = {
  filePath: string;
  section: string;
  sectionRaw: string;
  sectionTitle: string;
  slug: string;
  title: string;
  lang: DocLang;
  order: number;
  excerpt: string;
  content: string;
};

export type DocTree = {
  section: string;
  sectionTitle: string;
  order: number;
  docs: DocFile[];
};

const CAIO_ROOT = "/home/hacker/VibeCoding/1-life/05-business/01-caio";

export const SECTION_META: Record<
  string,
  { title: { fr: string; en: string }; tagline: { fr: string; en: string } }
> = {
  vision: {
    title: { fr: "Vision", en: "Vision" },
    tagline: {
      fr: "Business plan, trajectoire revenu, stratégie d'exit.",
      en: "Business plan, revenue trajectory, exit strategy.",
    },
  },
  avatars: {
    title: { fr: "Avatars", en: "Avatars" },
    tagline: {
      fr: "Les 5 profils clients — fiches bilingues détaillées.",
      en: "The 5 client profiles — detailed bilingual briefs.",
    },
  },
  product: {
    title: { fr: "Produit", en: "Product" },
    tagline: {
      fr: "Curriculum, tarification, certification.",
      en: "Curriculum, pricing, certification.",
    },
  },
  "c-suite-training": {
    title: { fr: "C-Suite Training", en: "C-Suite Training" },
    tagline: {
      fr: "11 modules exécutifs pour dirigeants.",
      en: "11 executive modules for C-level leaders.",
    },
  },
  "courses-en": {
    title: { fr: "Courses (EN)", en: "Courses (EN)" },
    tagline: {
      fr: "10 formations anglophones pour consultants et CTOs.",
      en: "10 English-language courses for consultants and CTOs.",
    },
  },
  "formations-fr": {
    title: { fr: "Formations (FR)", en: "French Programmes" },
    tagline: {
      fr: "13 formations francophones — PME, digital, développeurs.",
      en: "13 French-language programmes — SMBs, digital, developers.",
    },
  },
  playbook: {
    title: { fr: "Playbook", en: "Playbook" },
    tagline: {
      fr: "Arsenal marketing, opérations, tactiques.",
      en: "Marketing arsenal, operations, tactics.",
    },
  },
  marketing: {
    title: { fr: "Marketing", en: "Marketing" },
    tagline: {
      fr: "Stratégie d'acquisition et de contenu.",
      en: "Acquisition and content strategy.",
    },
  },
  launch: {
    title: { fr: "Launch", en: "Launch" },
    tagline: {
      fr: "Funnels de vente, CAC/LTV, math du lancement.",
      en: "Sales funnels, CAC/LTV, launch math.",
    },
  },
  operations: {
    title: { fr: "Operations", en: "Operations" },
    tagline: {
      fr: "Structure juridique, stack, scaling, métriques.",
      en: "Legal structure, stack, scaling, metrics.",
    },
  },
};

const SECTIONS: { raw: string; key: string; order: number }[] = [
  { raw: "01-vision", key: "vision", order: 1 },
  { raw: "02-avatars", key: "avatars", order: 2 },
  { raw: "03-product", key: "product", order: 3 },
  { raw: "04-c-suite-training", key: "c-suite-training", order: 4 },
  { raw: "05-courses-en", key: "courses-en", order: 5 },
  { raw: "06-formations-fr", key: "formations-fr", order: 6 },
  { raw: "07-playbook", key: "playbook", order: 7 },
  { raw: "08-marketing", key: "marketing", order: 8 },
  { raw: "09-launch", key: "launch", order: 9 },
  { raw: "10-operations", key: "operations", order: 10 },
];

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripPrefix(name: string): { clean: string; order: number } {
  const m = name.match(/^(\d+)[-_\s]+(.+)$/);
  if (m) return { clean: m[2], order: parseInt(m[1], 10) };
  return { clean: name, order: 999 };
}

function detectLang(baseName: string, body: string): DocLang {
  if (/-FR$/i.test(baseName)) return "fr";
  if (/-EN$/i.test(baseName)) return "en";
  // heuristic: frequent French-only stop words
  const frHits = (body.match(/\b(le|la|les|des|une|pour|avec|c'est|est|sont|nous|vous)\b/gi) || []).length;
  const enHits = (body.match(/\b(the|and|with|is|are|of|for|we|you|this)\b/gi) || []).length;
  if (frHits > enHits * 1.3) return "fr";
  if (enHits > frHits * 1.3) return "en";
  return "neutral";
}

function extractTitle(body: string, fallback: string): string {
  const m = body.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : fallback;
}

function extractExcerpt(body: string): string {
  const lines = body.split("\n");
  let para = "";
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      if (para.length > 60) break;
      para = "";
      continue;
    }
    if (t.startsWith("#") || t.startsWith(">") || t.startsWith("|") || t.startsWith("---")) continue;
    if (t.startsWith("-") || t.startsWith("*")) continue;
    para += (para ? " " : "") + t;
    if (para.length > 200) break;
  }
  const cleaned = para.replace(/\s+/g, " ").trim();
  if (cleaned.length > 200) return cleaned.slice(0, 197) + "...";
  return cleaned || "";
}

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

let _cache: DocFile[] | null = null;

export function getAllDocs(): DocFile[] {
  if (_cache) return _cache;
  const result: DocFile[] = [];

  for (const section of SECTIONS) {
    const dir = path.join(CAIO_ROOT, section.raw);
    let files: string[] = [];
    try {
      files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "CLAUDE.md");
    } catch {
      continue;
    }

    for (const file of files) {
      const filePath = path.join(dir, file);
      let raw: string;
      try {
        raw = fs.readFileSync(filePath, "utf-8");
      } catch {
        continue;
      }
      const parsed = matter(raw);
      const baseName = file.replace(/\.md$/, "");
      const { clean, order } = stripPrefix(baseName);
      const langSuffix = clean.replace(/-(FR|EN)$/i, "");
      const slug = slugify(langSuffix);
      const lang = detectLang(baseName, parsed.content);
      const title =
        (parsed.data.title as string) ||
        extractTitle(parsed.content, clean.replace(/[-_]/g, " "));
      const excerpt = (parsed.data.summary as string) || extractExcerpt(parsed.content);

      result.push({
        filePath,
        section: section.key,
        sectionRaw: section.raw,
        sectionTitle: SECTION_META[section.key]?.title.fr ?? section.key,
        slug,
        title,
        lang,
        order,
        excerpt,
        content: parsed.content,
      });
    }
  }

  _cache = result;
  return result;
}

export function getDocsTree(): DocTree[] {
  const all = getAllDocs();
  return SECTIONS.map((s) => {
    const docs = all
      .filter((d) => d.section === s.key)
      .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
    return {
      section: s.key,
      sectionTitle: SECTION_META[s.key]?.title.fr ?? s.key,
      order: s.order,
      docs,
    };
  }).filter((t) => t.docs.length > 0);
}

export function getSectionDocs(sectionKey: string, locale: "fr" | "en"): DocFile[] {
  const all = getAllDocs();
  const inSection = all.filter((d) => d.section === sectionKey);
  // If a slug has a locale-specific version matching `locale`, skip the neutral or opposite variant.
  const bySlug = new Map<string, DocFile[]>();
  for (const d of inSection) {
    const arr = bySlug.get(d.slug) ?? [];
    arr.push(d);
    bySlug.set(d.slug, arr);
  }
  const out: DocFile[] = [];
  for (const [, variants] of bySlug) {
    const locSpecific = variants.find((v) => v.lang === locale);
    if (locSpecific) {
      out.push(locSpecific);
      continue;
    }
    const neutral = variants.find((v) => v.lang === "neutral");
    if (neutral) {
      out.push(neutral);
      continue;
    }
    // fallback: first variant (opposite locale)
    out.push(variants[0]);
  }
  return out.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getDoc(
  sectionKey: string,
  slug: string,
  locale: "fr" | "en",
): DocFile | null {
  const all = getAllDocs();
  const variants = all.filter((d) => d.section === sectionKey && d.slug === slug);
  if (variants.length === 0) return null;
  return (
    variants.find((v) => v.lang === locale) ??
    variants.find((v) => v.lang === "neutral") ??
    variants[0]
  );
}

export function getNeighbors(
  sectionKey: string,
  slug: string,
  locale: "fr" | "en",
): { prev: DocFile | null; next: DocFile | null } {
  const docs = getSectionDocs(sectionKey, locale);
  const idx = docs.findIndex((d) => d.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? docs[idx - 1] : null,
    next: idx < docs.length - 1 ? docs[idx + 1] : null,
  };
}

export function getSectionsIndex(locale: "fr" | "en") {
  const tree = getDocsTree();
  return tree.map((t) => ({
    key: t.section,
    title: SECTION_META[t.section]?.title[locale] ?? t.section,
    tagline: SECTION_META[t.section]?.tagline[locale] ?? "",
    order: t.order,
    count: getSectionDocs(t.section, locale).length,
  }));
}

export function getStaticDocParams(): { section: string; slug: string; lang: DocLang }[] {
  const all = getAllDocs();
  // unique by (section, slug) — we'll generate per locale at page level
  const seen = new Set<string>();
  const out: { section: string; slug: string; lang: DocLang }[] = [];
  for (const d of all) {
    const k = `${d.section}/${d.slug}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ section: d.section, slug: d.slug, lang: d.lang });
  }
  return out;
}
