/**
 * Static search index for /[locale]/docs — produced at prebuild.
 * Fuse.js wiring happens client-side in Phase 8; this file only writes JSON.
 */
import fs from "node:fs";
import path from "node:path";
import { getAllDocs, SECTION_META } from "../lib/docs";

type Entry = {
  id: string;
  title: string;
  section: string;
  sectionKey: string;
  lang: "fr" | "en" | "neutral";
  excerpt: string;
  url: string;
};

function build(): Entry[] {
  const all = getAllDocs();
  const entries: Entry[] = [];
  for (const d of all) {
    const meta = SECTION_META[d.section];
    const sectionTitleFr = meta?.title.fr ?? d.section;
    const sectionTitleEn = meta?.title.en ?? d.section;

    // Emit one entry per locale the doc is reachable in.
    const locales: ("fr" | "en")[] =
      d.lang === "neutral" ? ["fr", "en"] : d.lang === "fr" ? ["fr"] : ["en"];

    for (const loc of locales) {
      entries.push({
        id: `${loc}/${d.section}/${d.slug}`,
        title: d.title,
        section: loc === "fr" ? sectionTitleFr : sectionTitleEn,
        sectionKey: d.section,
        lang: d.lang,
        excerpt: d.excerpt.slice(0, 240),
        url: `/${loc}/docs/${d.section}/${d.slug}`,
      });
    }
  }
  return entries;
}

function main() {
  const entries = build();
  const outDir = path.join(process.cwd(), "public");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "search-index.json");
  fs.writeFileSync(outPath, JSON.stringify(entries, null, 2) + "\n");
  console.log(`[search-index] wrote ${entries.length} entries → ${outPath}`);
}

main();
