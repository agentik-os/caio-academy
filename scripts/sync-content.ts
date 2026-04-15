/**
 * Sync the knowledge-base markdown from the VPS source-of-truth into the repo
 * so Vercel builds can read it. Idempotent — safe to re-run.
 *
 * Sources → Destinations:
 *   /home/hacker/VibeCoding/1-life/05-business/01-caio         → content/caio
 *   /home/hacker/VibeCoding/1-life/05-business/02-vision       → content/business/02-vision
 *   /home/hacker/VibeCoding/1-life/05-business/03-strategy     → content/business/03-strategy
 *   /home/hacker/VibeCoding/1-life/05-business/04-blueprint    → content/business/04-blueprint
 *   /home/hacker/VibeCoding/1-life/05-business/05-execution    → content/business/05-execution
 *   /home/hacker/VibeCoding/1-life/05-business/06-marketing    → content/business/06-marketing
 *   /home/hacker/VibeCoding/1-life/05-business/07-phantom-empire → content/business/07-phantom-empire
 *
 * If a source is absent (e.g. running on Vercel where only the committed
 * content/ exists), that source is skipped. If NO source exists and the
 * destination is also empty, we error.
 */
import fs from "node:fs";
import path from "node:path";

type Mapping = { src: string; dst: string };

const BIZ_ROOT = "/home/hacker/VibeCoding/1-life/05-business";
const REPO_ROOT = process.cwd();

const MAPPINGS: Mapping[] = [
  { src: path.join(BIZ_ROOT, "01-caio"), dst: path.join(REPO_ROOT, "content", "caio") },
  ...[
    "02-vision",
    "03-strategy",
    "04-blueprint",
    "05-execution",
    "06-marketing",
    "07-phantom-empire",
  ].map((d) => ({
    src: path.join(BIZ_ROOT, d),
    dst: path.join(REPO_ROOT, "content", "business", d),
  })),
];

const SKIP_FILES = new Set(["CLAUDE.md", ".DS_Store", "AGENTS.md"]);
const SKIP_DIRS = new Set(["Add", "99-archive", ".claude"]);

function copyTree(src: string, dst: string): { files: number; bytes: number } {
  let files = 0;
  let bytes = 0;
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;
    if (SKIP_FILES.has(entry.name)) continue;
    const sPath = path.join(src, entry.name);
    const dPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      const sub = copyTree(sPath, dPath);
      files += sub.files;
      bytes += sub.bytes;
      continue;
    }
    if (!entry.isFile()) continue;
    // Only sync markdown; ignore HTML, PDF, images, etc.
    if (!entry.name.endsWith(".md")) continue;
    const sStat = fs.statSync(sPath);
    let needsCopy = true;
    if (fs.existsSync(dPath)) {
      const dStat = fs.statSync(dPath);
      if (dStat.size === sStat.size && dStat.mtimeMs >= sStat.mtimeMs) {
        needsCopy = false;
      }
    }
    if (needsCopy) {
      fs.copyFileSync(sPath, dPath);
      fs.utimesSync(dPath, sStat.atime, sStat.mtime);
    }
    files += 1;
    bytes += sStat.size;
  }
  return { files, bytes };
}

function main() {
  const start = Date.now();
  let totalFiles = 0;
  let totalBytes = 0;
  let syncedAny = false;
  for (const { src, dst } of MAPPINGS) {
    if (!fs.existsSync(src)) {
      console.log(`[sync-content] skip (no source): ${src}`);
      continue;
    }
    const { files, bytes } = copyTree(src, dst);
    console.log(
      `[sync-content] ${files.toString().padStart(3)} files, ${(bytes / 1024).toFixed(0).padStart(5)} KB → ${path.relative(REPO_ROOT, dst)}`,
    );
    totalFiles += files;
    totalBytes += bytes;
    syncedAny = true;
  }
  if (!syncedAny) {
    const fallback = path.join(REPO_ROOT, "content");
    if (!fs.existsSync(fallback)) {
      console.error(`[sync-content] no sources present AND no committed content/`);
      process.exit(1);
    }
    console.log(`[sync-content] no sources (Vercel build); using committed content/`);
    return;
  }
  console.log(
    `[sync-content] total: ${totalFiles} files, ${(totalBytes / 1024).toFixed(0)} KB (${Date.now() - start}ms)`,
  );
}

main();
