/**
 * Sync CAIO knowledge base from the source-of-truth directory (on VPS) into
 * the repo so Vercel builds can read it. Idempotent: safe to re-run.
 *
 * Source:      /home/hacker/VibeCoding/1-life/05-business/01-caio
 * Destination: <repo>/content/caio
 *
 * If the source directory is absent (e.g. running on Vercel where only the
 * committed `content/caio` exists), this script is a no-op and exits 0.
 */
import fs from "node:fs";
import path from "node:path";

const SOURCE = "/home/hacker/VibeCoding/1-life/05-business/01-caio";
const DEST = path.join(process.cwd(), "content", "caio");

const SKIP_FILES = new Set(["CLAUDE.md", ".DS_Store"]);

function copyTree(src: string, dst: string): { files: number; bytes: number } {
  let files = 0;
  let bytes = 0;
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
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
  if (!fs.existsSync(SOURCE)) {
    console.log(`[sync-content] source not present (${SOURCE}); using committed content/`);
    if (!fs.existsSync(DEST)) {
      console.error(`[sync-content] no source AND no committed content at ${DEST}`);
      process.exit(1);
    }
    return;
  }
  const start = Date.now();
  const { files, bytes } = copyTree(SOURCE, DEST);
  const ms = Date.now() - start;
  console.log(
    `[sync-content] ${files} files, ${(bytes / 1024).toFixed(0)} KB → ${path.relative(process.cwd(), DEST)} (${ms}ms)`,
  );
}

main();
