import { getAllDocs, type DocFile, type DocLang } from "./docs";

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  lang: DocLang;
  content: string;
  readingTime: number;
  order: number;
};

function toBlogPost(doc: DocFile): BlogPost {
  const wordCount = doc.content.split(/\s+/).length;
  return {
    slug: doc.slug,
    title: doc.title,
    summary: doc.excerpt.length > 200 ? doc.excerpt.slice(0, 197) + "..." : doc.excerpt,
    lang: doc.lang,
    content: doc.content,
    readingTime: Math.max(1, Math.ceil(wordCount / 200)),
    order: doc.order,
  };
}

function getContentDocs(): DocFile[] {
  return getAllDocs().filter((d) => d.section === "content");
}

/**
 * Group bilingual pairs by order number (FR and EN share the same numeric prefix).
 * Pick the best variant per locale: locale-specific > neutral > opposite.
 */
export function getBlogPosts(locale: "fr" | "en"): BlogPost[] {
  const inSection = getContentDocs();

  // Group by order (shared between FR/EN pairs)
  const byOrder = new Map<number, DocFile[]>();
  for (const d of inSection) {
    const arr = byOrder.get(d.order) ?? [];
    arr.push(d);
    byOrder.set(d.order, arr);
  }

  const out: BlogPost[] = [];
  for (const [, variants] of byOrder) {
    const pick =
      variants.find((v) => v.lang === locale) ??
      variants.find((v) => v.lang === "neutral") ??
      variants[0];
    out.push(toBlogPost(pick));
  }

  // Sort by order descending (newest first)
  return out.sort((a, b) => b.order - a.order);
}

export function getBlogPost(slug: string, locale: "fr" | "en"): BlogPost | null {
  const inSection = getContentDocs();

  // Find doc with this slug
  const direct = inSection.find((d) => d.slug === slug);
  if (!direct) return null;

  // Find all docs with same order (the bilingual pair)
  const variants = inSection.filter((d) => d.order === direct.order);

  const pick =
    variants.find((v) => v.lang === locale) ??
    variants.find((v) => v.lang === "neutral") ??
    variants[0];

  return toBlogPost(pick);
}

export function getBlogStaticParams(): { slug: string }[] {
  const inSection = getContentDocs();
  const seen = new Set<string>();
  const out: { slug: string }[] = [];
  for (const d of inSection) {
    if (seen.has(d.slug)) continue;
    seen.add(d.slug);
    out.push({ slug: d.slug });
  }
  return out;
}
