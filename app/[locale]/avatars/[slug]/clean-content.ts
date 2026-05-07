// PDF-extracted files carry noisy page artifacts and lack heading markup.
// This pipeline:
//   1. Strips known PDF chrome (running headers, page numbers, ISO dates),
//      drops the body H1 line that duplicates the page hero, and demotes any
//      remaining stray body `#` ATX H1 by one level so the hero stays the
//      only H1 (paragraph-level promotion happens in Pass 2 — Pass 1 only
//      touches LITERAL `# X` markdown source lines, never the `## N Title`
//      headings Pass 2 produces).
//   2. Paragraph-level promotion of "1.2 Title" / "2.5.1 Title" into
//      ##/###/#### with TOC region detection (drop duplicates), table-row
//      sequence rejection, page-number tail and continuation-punctuation
//      filtering, and a "0.x → H2" depth override.
//   3. Collapses blank-line runs.
//   4. Escapes MDX-hostile characters outside code fences.
export function cleanContent(raw: string, exactBodyTitle?: string): string {
  const SECTION_RE = /^\s*(\d+(?:\.\d+){0,3})\s+(.+?)\s*$/;
  const CODE_LINE_RE =
    /^\s*(?:import\s|export\s|const\s|let\s|var\s|function\s|interface\s|type\s|return\s|await\s|async\s|class\s|\}|\);)/;
  // Continuation-end punctuation: title fragment that wraps from prev/next
  // line. Includes em-dash (–), comma, colon, semicolon, French quotes,
  // single quote, open paren, and trailing hyphen/dash with nothing after.
  const CONTINUATION_END_RE = /[,:;«»'(–]\s*$|[-—]\s*$/;
  // Page-number style title tail e.g. "/ 74", "\\ 32".
  const PAGE_NUM_TITLE_RE = /^[\/\\]\s*\d+\s*$/;
  // Double-numbered title: "1.1 - Le gap…" inside the captured title field.
  const TITLE_HEAD_SUBNUM_RE = /^(\d+(?:\.\d+){0,3})\s*[-—]\s+/;
  // UI-106: leading dash inside the captured title (e.g. SECTION_RE on
  // "1.5 - Livrable" yields title="- Livrable"). Strip to normalize all
  // promoted heading titles to one format ("X.Y Title", never "X.Y - Title").
  const LEADING_DASH_RE = /^\s*[-—–]\s+/;
  // UI-103: template placeholder syntax "[Nom du système]" / "[1 phrase + 1
  // chiffre business]" — must never become a heading.
  const PLACEHOLDER_RE = /\[\s*[^\]]+\s*\]/;
  // UI-102: metadata continuation that follows a Module heading without a
  // blank line. These are well-known formatting patterns from the source PDF
  // (`Durée : 1h00`, `Format : workshop`, `Volume : 12 vidéos`); they must
  // not block heading promotion.
  const METADATA_CONT_RE = /^(?:Dur[ée]e|Format|Volume|Duration)\s*:/i;
  // Body H1 line that duplicates the page hero (caught explicitly in Pass 1).
  const BODY_H1_AVATAR_RE = /^#\s+Avatar CAIO\s*[—–-]\s+/i;

  // UI-101: fuzzy title normalization for dedup. TOC and body sometimes carry
  // off-by-one numbering (TOC "1.6 Livrable" vs body "1.5 - Livrable …") —
  // matching on number+title fails. Number-agnostic key: strip any leading
  // dash, then strip a leading "X.Y - " section-number prefix (REQUIRED dash;
  // we must not strip bare leading numbers like "30 / 60 / 90 day checklist"
  // that are content, not section indicators). Lowercase + collapse whitespace.
  const normalizeTitle = (s: string): string =>
    s
      .replace(/^[\s\-—–]+/, "")
      .replace(/^\d+(?:\.\d+){0,3}\s*[-—–]\s+/, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  // UI-105: detect avatar-title tail duplication. When the body PDF carries
  // headings that re-include the avatar role at the end (e.g.
  // "0.2 Avatar - le CTO SaaS, CTO SaaS"), the trailing ", X" duplicates the
  // hero text. Build a regex from `exactBodyTitle` (e.g. "Le CTO SaaS")
  // stripped of leading articles ("Le", "La", "L'", "The") so we match the
  // role token alone.
  const avatarTail = exactBodyTitle
    ? exactBodyTitle.replace(/^(Le|La|Les|L'|The)\s+/i, "").trim()
    : "";
  const escapeRegex = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const AVATAR_TAIL_RE = avatarTail
    ? new RegExp(`,\\s*${escapeRegex(avatarTail)}\\s*$`, "i")
    : null;

  // --- Pass 1: strip PDF chrome line-by-line + demote body H1 ----------------
  const stripped: string[] = [];
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t) {
      stripped.push("");
      continue;
    }
    // Drop body H1 `# Avatar CAIO — le X (FR/EN)` — it duplicates the page
    // hero. Generic regex covers all 5 avatars + locales.
    if (BODY_H1_AVATAR_RE.test(t)) continue;
    // Belt-and-braces: also strip any `# <exact-title>` line that matches
    // the page hero text verbatim.
    if (
      exactBodyTitle &&
      /^#\s+/.test(t) &&
      t.replace(/^#+\s*/, "").trim() === exactBodyTitle.trim()
    ) {
      continue;
    }
    // Form-feed-only line pollution from PDF extraction.
    if (/^\s*\f\s*$/.test(line)) continue;
    if (/^AGENTIK OS$/i.test(t)) continue;
    // Looser Agentik footer: `Agentik {OS}`, `Agentik OS`, the suffixed
    // `Agentik {OS} - agentik-os.com` variant, AND the prose-tail variant
    // `Agentik OS - agentik-os.com Parcours, Registry, …`.
    if (/^Agentik\s*\{?OS\}?\s*-\s*agentik-os\.com(\s|$)/i.test(t)) continue;
    if (/^Agentik\s*\{?OS\}?\s*(-\s*agentik-os\.com)?$/i.test(t)) continue;
    if (/^Agentik\s*\{OS\}/i.test(t)) continue;
    if (/^Agentik OS$/i.test(t)) continue;
    // Looser CAIO Academy chrome: `CAI O ACADE MY`, `CAI O ACAD E MY`, and
    // other space variants.
    if (/^CAI\s*O\s*ACAD\s*E?\s*MY/i.test(t)) continue;
    if (/^CAIO Academy\s*[—–-]/i.test(t)) continue;
    if (/^Avatar \d+\s*[·.\-]/i.test(t)) continue;
    // PDF cover sub-track titles that survive the chrome filter
    // (e.g. "Without Code Track", "Architect Track", "From Dev to CAIO Track",
    //  "AI Strategy Without Code Track", "CAIO Monetization Track").
    if (/^(?:Architect|Without Code|AI Strategy|From Dev to CAIO|CAIO Monetization|AI Executive Decision Maker)\s+Track\s*$/i.test(t)) continue;
    if (/Track\s*$/.test(t) && t.length < 50 && !/^\d/.test(t)) continue;
    if (/^\d{1,3}$/.test(t) && t.length <= 3) continue;
    // Page-number footers like "6 / 74", "3 / 43" — they ARE single-int
    // SECTION_RE candidates and would otherwise pollute the single-int list
    // detector and trigger false rejections of legitimate body Module H2s.
    if (/^\s*\d{1,3}\s*\/\s*\d{1,3}\s*$/.test(line)) continue;
    // Source: blockquote (covers `> Source:` AND bare `Source:`).
    if (/^>?\s*Source:\s/i.test(t)) continue;
    if (/^\d{4}-\d{2}-\d{2}$/.test(t)) continue;
    if (/^(Contents|Table of contents|Table des matières)$/i.test(t)) continue;
    // Demote stray body `# X` H1 (single hash, not `##` etc.) by one level so
    // the page hero <h1> stays unique. CommonMark allows up to 3 leading
    // spaces before `#`, so we must match those too — PDF-extracted code
    // blocks ship with `<space># 1. Scaffold ...` patterns that otherwise
    // render as `<h1>` and pollute the heading hierarchy.
    if (/^\s{0,3}#(?!#)\s+/.test(line)) {
      stripped.push(line.replace(/^(\s{0,3})#(?!#)\s+/, "$1## "));
      continue;
    }
    stripped.push(line);
  }

  // --- Pass 2: paragraph-level promotion + group orphan code lines ---------

  // Pre-scan A — TOC region: build NORMALIZED-TITLE → indices map (UI-101
  // fuzzy dedup). Section-numbered lines whose normalized title appears more
  // than once are TOC/body pairs (often with off-by-one numbering between
  // TOC and body). Drop all but the LAST occurrence — body always comes
  // after TOC in the source PDF, so "last" prefers the body copy. This also
  // resolves UI-104 (Module 08 anomaly) by keeping the body occurrence over
  // the TOC one even when titles differ in numbering or trailing modifier.
  const sectionOccurrences = new Map<string, number[]>();
  for (let i = 0; i < stripped.length; i++) {
    const m = SECTION_RE.exec(stripped[i]);
    if (!m) continue;
    const key = normalizeTitle(m[2]);
    if (!key) continue;
    const arr = sectionOccurrences.get(key) ?? [];
    arr.push(i);
    sectionOccurrences.set(key, arr);
  }
  const tocDropIndices = new Set<number>();
  for (const indices of sectionOccurrences.values()) {
    if (indices.length > 1) {
      for (let k = 0; k < indices.length - 1; k++) tocDropIndices.add(indices[k]);
    }
  }

  // Pre-scan B — single-int list detector: indices of "1 X", "2 X", "3 X"
  // candidates. If another single-int candidate appears within ±20 lines, the
  // candidate is part of a table-row / FAQ list — reject the whole sequence.
  // EXCLUDE TOC fragments (titles starting with "- " or ending in continuation
  // punctuation) — they're never real headings and would otherwise pollute the
  // detector, causing legit body module headings (e.g. "1 Module 01 - …") to
  // be falsely rejected when a TOC table happens to have wrap-leftover lines
  // like " 04 - Engaging teams …" within ±20 lines.
  const singleIntSet = new Set<number>();
  for (let i = 0; i < stripped.length; i++) {
    const m = SECTION_RE.exec(stripped[i]);
    if (!m || m[1].includes(".")) continue;
    const candidateTitle = m[2].trim();
    if (LEADING_DASH_RE.test(candidateTitle)) continue;
    if (CONTINUATION_END_RE.test(candidateTitle)) continue;
    singleIntSet.add(i);
  }
  const isInSingleIntList = (i: number): boolean => {
    for (let j = Math.max(i - 20, 0); j <= Math.min(i + 20, stripped.length - 1); j++) {
      if (j !== i && singleIntSet.has(j)) return true;
    }
    return false;
  };

  const promoted: string[] = [];
  let inFence = false;
  let codeBuffer: string[] = [];

  const flushCodeBuffer = () => {
    if (codeBuffer.length === 0) return;
    // Only wrap if we have at least 2 lines of code-shaped content; otherwise
    // a single "}" or "const x" is more likely noise — drop it.
    if (codeBuffer.length >= 2) {
      promoted.push("");
      promoted.push("```ts");
      for (const c of codeBuffer) promoted.push(c.trimStart());
      promoted.push("```");
      promoted.push("");
    }
    codeBuffer = [];
  };

  for (let i = 0; i < stripped.length; i++) {
    const line = stripped[i];
    if (line.startsWith("```")) {
      flushCodeBuffer();
      inFence = !inFence;
      promoted.push(line);
      continue;
    }
    if (inFence) {
      promoted.push(line);
      continue;
    }

    const t = line.trim();
    const sec = t ? SECTION_RE.exec(line) : null;

    if (sec) {
      flushCodeBuffer();
      const number = sec[1];
      let title = sec[2].trim();

      // === Promotion guards (every reject below traces to an audit finding) ===
      // (j) TOC region: normalized title appears later → drop, body wins.
      const isToc = tocDropIndices.has(i);
      // (b) too-short title (< 3 chars).
      const tooShort = title.length < 3;
      // (c) page-number tail "/ 74" or starts with `/`/`\`.
      const isPageNumTail = /^[\/\\]/.test(title) || PAGE_NUM_TITLE_RE.test(title);
      // (d) continuation punctuation at end (sentence wrapped from prev line).
      const continuesNext = CONTINUATION_END_RE.test(title);
      // (k) UI-103: template placeholder syntax ("[Nom du système]") — these
      // are fill-in-the-blank tokens from the source markdown, never real
      // headings.
      const hasPlaceholder = PLACEHOLDER_RE.test(title);
      // (a) paragraph-level promotion: blank line above AND blank line below.
      const prevTrim = i > 0 ? stripped[i - 1].trim() : "";
      const nextTrim = i + 1 < stripped.length ? stripped[i + 1].trim() : "";
      const blankAbove = prevTrim === "";
      // UI-102: relax blankBelow when the next line is a known module
      // metadata continuation (`Durée : 1h00 · Format … · Volume …`). These
      // tight-line PDF blocks were causing Modules 01/02/04 to demote to <p>
      // while Modules 03/05/06/07/08 (which had a blank line before their
      // metadata) promoted correctly. Treat the metadata line as if it were
      // a blank: it's a recognized scaffold, not prose continuation.
      const blankBelow = nextTrim === "" || METADATA_CONT_RE.test(nextTrim);
      // (e) table-row / FAQ list sequence — single-int with siblings nearby.
      const inSingleIntList = !number.includes(".") && isInSingleIntList(i);

      const reject =
        isToc || tooShort || isPageNumTail || continuesNext || hasPlaceholder ||
        !blankAbove || !blankBelow || inSingleIntList;

      if (!reject) {
        // (f) strip in-title leading sub-section number ("1.2 1.1 -" → "1.2").
        const innerNum = TITLE_HEAD_SUBNUM_RE.exec(title);
        if (innerNum) title = title.replace(TITLE_HEAD_SUBNUM_RE, "").trim();
        // (f2) UI-106: strip plain leading dash ("- Livrable" → "Livrable").
        // SECTION_RE captures "1.5" then lets the dash bleed into the title;
        // normalize so all promoted headings render as "## NUMBER TITLE",
        // never "## NUMBER - TITLE".
        title = title.replace(LEADING_DASH_RE, "").trim();
        // (l) UI-105: strip avatar-title tail duplication ("…, CTO SaaS"
        // when avatar = "Le CTO SaaS").
        if (AVATAR_TAIL_RE) title = title.replace(AVATAR_TAIL_RE, "").trim();

        // (g) depth override: 0.x → H2 (pre-chapter); single int → H2;
        //     1.1 → H3; 1.1.1+ → H4.
        let depth: number;
        if (/^0\./.test(number)) depth = 2;
        else if (!number.includes(".")) depth = 2;
        else {
          const dots = (number.match(/\./g) || []).length;
          depth = dots === 1 ? 3 : 4;
        }
        const hashes = "#".repeat(depth);
        promoted.push("");
        promoted.push(`${hashes} ${number} ${title}`);
        promoted.push("");
        continue;
      }
      // fall through to plain treatment if rejected
    }

    if (CODE_LINE_RE.test(line)) {
      codeBuffer.push(line);
      continue;
    }

    if (codeBuffer.length > 0) flushCodeBuffer();
    promoted.push(line);
  }
  flushCodeBuffer();

  // --- Pass 3: collapse blank-line runs --------------------------------------
  let text = promoted.join("\n").replace(/\n{3,}/g, "\n\n");

  // --- Pass 4: escape MDX-hostile characters outside code fences ------------
  const outLines: string[] = [];
  inFence = false;
  for (const line of text.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      outLines.push(line);
      continue;
    }
    if (inFence) {
      outLines.push(line);
      continue;
    }
    const safe = line
      .replace(/\{/g, "&#123;")
      .replace(/\}/g, "&#125;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    outLines.push(safe);
  }
  text = outLines.join("\n");

  return text;
}
