#!/usr/bin/env node
/**
 * build-whitepapers.mjs — White Paper PDF Generator
 *
 * Reads a manifest of markdown sources + per-doc metadata, renders each
 * through scripts/whitepaper-template.html, and produces an A4 white-paper PDF
 * via weasyprint (system binary).
 *
 * Usage:
 *   node scripts/build-whitepapers.mjs --help
 *   node scripts/build-whitepapers.mjs --all
 *   node scripts/build-whitepapers.mjs --id 01-Roadmap-to-100k
 *   node scripts/build-whitepapers.mjs --src content/foo.md --out public/whitepapers/x.pdf \
 *                                       --title "..." --subtitle "..." --series "..."
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import MarkdownIt from "markdown-it";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const TEMPLATE_PATH = path.join(__dirname, "whitepaper-template.html");
const MANIFEST_PATH = path.join(__dirname, "whitepaper-manifest.json");
const OUT_DIR = path.join(ROOT, "public", "whitepapers");

const args = parseArgs(process.argv.slice(2));

if (args.help || (!args.all && !args.id && !args.src)) {
  printHelp();
  process.exit(args.help ? 0 : 1);
}

main().catch((err) => {
  console.error("[build-whitepapers] FATAL:", err);
  process.exit(1);
});

async function main() {
  ensureDir(OUT_DIR);
  ensureWeasyprint();

  if (args.all) {
    const manifest = loadManifest();
    let ok = 0, fail = 0;
    for (const entry of manifest) {
      try {
        await buildOne(entry);
        ok++;
      } catch (e) {
        console.error(`  ✗ ${entry.id}: ${e.message}`);
        fail++;
      }
    }
    console.log(`\n[build-whitepapers] done: ${ok} ok, ${fail} failed (${manifest.length} total)`);
    process.exit(fail ? 1 : 0);
  } else if (args.id) {
    const manifest = loadManifest();
    const entry = manifest.find((m) => m.id === args.id);
    if (!entry) throw new Error(`Manifest entry not found: ${args.id}`);
    await buildOne(entry);
  } else if (args.src) {
    const entry = {
      id: args.id || path.basename(args.src, ".md"),
      src: args.src,
      out: args.out || path.join(OUT_DIR, `${path.basename(args.src, ".md")}.pdf`),
      title: args.title || path.basename(args.src, ".md"),
      subtitle: args.subtitle || "",
      series: args.series || "Document stratégique",
      author: args.author || "CAIO Academy",
      edition: args.edition || "Édition 2026",
    };
    await buildOne(entry);
  }
}

async function buildOne(entry) {
  const srcAbs = path.isAbsolute(entry.src) ? entry.src : path.join(ROOT, entry.src);
  const outAbs = path.isAbsolute(entry.out) ? entry.out : path.join(ROOT, entry.out);
  if (!fs.existsSync(srcAbs)) throw new Error(`source not found: ${srcAbs}`);

  console.log(`[build] ${entry.id}`);
  console.log(`  src: ${path.relative(ROOT, srcAbs)}`);
  console.log(`  out: ${path.relative(ROOT, outAbs)}`);

  const mdSource = fs.readFileSync(srcAbs, "utf-8");
  const stripped = stripFrontmatter(mdSource);

  const md = new MarkdownIt({
    html: true,
    linkify: false,
    typographer: true,
    breaks: false,
  });

  // Add IDs to h1/h2/h3 for TOC anchoring
  const headings = [];
  let headingIdx = 0;
  const defaultRender = md.renderer.rules.heading_open || function (t, i, o, e, s) { return s.renderToken(t, i, o); };
  md.renderer.rules.heading_open = function (tokens, idx, opts, env, self) {
    const tok = tokens[idx];
    const level = parseInt(tok.tag.slice(1), 10);
    if (level <= 3) {
      const inline = tokens[idx + 1];
      const text = inline && inline.children
        ? inline.children.filter(c => c.type === "text" || c.type === "code_inline").map(c => c.content).join("").trim()
        : "";
      const id = `h-${++headingIdx}-${slugify(text)}`;
      tok.attrJoin("id", id);
      headings.push({ level, text, id });
    }
    return defaultRender(tokens, idx, opts, env, self);
  };

  // Custom blockquote renderer to detect callouts (start with **NOTE**, **TIP**, **WARN**)
  const defaultBQOpen = md.renderer.rules.blockquote_open || function (t,i,o,e,s){return s.renderToken(t,i,o)};
  md.renderer.rules.blockquote_open = function (tokens, idx, opts, env, self) {
    // Look ahead for opening text
    let nextText = "";
    for (let k = idx + 1; k < tokens.length; k++) {
      if (tokens[k].type === "inline" && tokens[k].content) { nextText = tokens[k].content; break; }
    }
    if (/^\*\*(NOTE|TIP|INFO|ATTENTION|AVERTISSEMENT|WARN|EXEMPLE)\*\*/i.test(nextText.trim())) {
      tokens[idx].attrJoin("class", "callout");
    }
    return defaultBQOpen(tokens, idx, opts, env, self);
  };

  const bodyHtml = md.render(stripped);

  // Build TOC (h1 + h2 only — h3 makes it noisy in white paper context)
  const tocItems = headings.filter(h => h.level === 1 || h.level === 2);
  const tocHtml = tocItems.map((h) => {
    const cls = h.level === 1 ? "h2-item" : "h3-item";
    return `    <li class="${cls}"><span>${escapeHtml(h.text)}</span><span class="toc-page-num"></span></li>`;
  }).join("\n");

  const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");
  const date = entry.date || todayFr();

  const filled = template
    .replaceAll("{{TITLE}}", escapeHtml(entry.title))
    .replaceAll("{{SUBTITLE}}", escapeHtml(entry.subtitle || ""))
    .replaceAll("{{SERIES}}", escapeHtml(entry.series || "Document stratégique"))
    .replaceAll("{{AUTHOR}}", escapeHtml(entry.author || "CAIO Academy"))
    .replaceAll("{{DATE}}", escapeHtml(date))
    .replaceAll("{{EDITION}}", escapeHtml(entry.edition || "Édition 2026"))
    .replace("{{TOC}}", tocHtml)
    .replace("{{BODY}}", bodyHtml);

  // Write temp HTML
  const tmpHtml = path.join(OUT_DIR, `.tmp-${entry.id}.html`);
  fs.writeFileSync(tmpHtml, filled, "utf-8");

  ensureDir(path.dirname(outAbs));

  // Run weasyprint
  const t0 = Date.now();
  const r = spawnSync("weasyprint", [tmpHtml, outAbs, "--quiet"], { stdio: ["ignore", "inherit", "inherit"] });
  if (r.status !== 0) {
    throw new Error(`weasyprint exited ${r.status}`);
  }

  // Cleanup tmp
  try { fs.unlinkSync(tmpHtml); } catch {}

  const stat = fs.statSync(outAbs);
  console.log(`  ✓ ${(stat.size / 1024).toFixed(1)} KB in ${((Date.now() - t0) / 1000).toFixed(1)}s\n`);
}

/* ─────────────────  helpers  ───────────────── */

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error(`Manifest missing: ${MANIFEST_PATH}`);
  }
  const raw = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  if (!Array.isArray(raw)) throw new Error("Manifest must be an array");
  return raw;
}

function stripFrontmatter(md) {
  if (md.startsWith("---")) {
    const end = md.indexOf("\n---", 3);
    if (end !== -1) return md.slice(end + 4).replace(/^\s*\n/, "");
  }
  return md;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function ensureWeasyprint() {
  try {
    execFileSync("weasyprint", ["--version"], { stdio: "ignore" });
  } catch (e) {
    throw new Error("weasyprint binary not found in PATH. Install via: pip install weasyprint");
  }
}

function todayFr() {
  const d = new Date();
  const months = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function slugify(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "section";
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") out.help = true;
    else if (a === "--all") out.all = true;
    else if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) { out[key] = next; i++; }
      else { out[key] = true; }
    }
  }
  return out;
}

function printHelp() {
  console.log(`
build-whitepapers.mjs — Generate white-paper PDFs from markdown via weasyprint

USAGE:
  node scripts/build-whitepapers.mjs [OPTIONS]

MODES:
  --all                       Build every entry in scripts/whitepaper-manifest.json
  --id <manifest-id>          Build a single entry from the manifest by id
  --src <path.md>             Build from an arbitrary markdown file
                              (combine with --out / --title / --subtitle / --series)

OPTIONS (when using --src):
  --out <file.pdf>            Output PDF path (default: public/whitepapers/<basename>.pdf)
  --title <text>              Cover title
  --subtitle <text>           Cover subtitle
  --series <text>             Series label (eg "Stratégie", "Produit")
  --author <text>             Author (default: CAIO Academy)
  --edition <text>            Edition tag (default: Édition 2026)

REQUIREMENTS:
  - markdown-it (npm)
  - weasyprint (system binary, e.g. pip install weasyprint)

EXAMPLES:
  node scripts/build-whitepapers.mjs --all
  node scripts/build-whitepapers.mjs --id 01-Roadmap-to-100k
  node scripts/build-whitepapers.mjs --src content/foo.md --title "Foo" --subtitle "Bar" --series "Stratégie"
`);
}
