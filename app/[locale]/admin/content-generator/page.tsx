"use client";

import { useEffect, useState } from "react";

/* ── constants ─────────────────────────────────────────────── */

const TONES = [
  { value: "philosophical", label: "Philosophical" },
  { value: "technical", label: "Technical" },
  { value: "storytelling", label: "Storytelling" },
  { value: "systems-thinking", label: "Systems Thinking" },
  { value: "leadership", label: "Leadership" },
] as const;

const LANGUAGES = [
  { value: "FR", label: "FR" },
  { value: "EN", label: "EN" },
] as const;

const AUDIENCES = [
  { value: "c-suite", label: "C-Suite" },
  { value: "consultants", label: "Consultants" },
  { value: "developers", label: "Developers" },
  { value: "general", label: "General" },
] as const;

const PRESETS = [
  { value: "blank", label: "Blank" },
  { value: "thought-leadership", label: "Thought Leadership" },
  { value: "case-study", label: "Case Study" },
  { value: "framework", label: "Framework" },
  { value: "contrarian", label: "Contrarian" },
] as const;

type Tone = (typeof TONES)[number]["value"];
type Lang = (typeof LANGUAGES)[number]["value"];
type Audience = (typeof AUDIENCES)[number]["value"];
type Preset = (typeof PRESETS)[number]["value"];

/* ── template generator (pure) ─────────────────────────────── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function openingPrompt(tone: Tone, preset: Preset): string {
  const toneMap: Record<Tone, string> = {
    philosophical:
      "<!-- Open with a fundamental question about the nature of this topic. Why does it matter at a civilizational level? -->",
    technical:
      "<!-- Start with a concrete technical observation or metric that grounds the reader. -->",
    storytelling:
      "<!-- Begin with a vivid scene or moment that draws the reader in. Make it personal. -->",
    "systems-thinking":
      "<!-- Describe the system as it exists today. What are the feedback loops? Where is the leverage point? -->",
    leadership:
      "<!-- Open with a leadership dilemma or inflection point that your audience has faced. -->",
  };

  if (preset === "contrarian") {
    return "<!-- Start with the conventional wisdom everyone accepts. Then break it. -->";
  }

  return toneMap[tone];
}

function templateSections(preset: Preset): string {
  switch (preset) {
    case "blank":
      return [
        "## Section 1",
        "",
        "<!-- Your content here -->",
        "",
        "## Section 2",
        "",
        "<!-- Your content here -->",
      ].join("\n");

    case "thought-leadership":
      return [
        "## The Shift Nobody Saw Coming",
        "",
        "<!-- Describe the paradigm shift. What changed? Why now? -->",
        "",
        "## What This Means in Practice",
        "",
        "<!-- Bridge from abstract insight to concrete implications. Use 2-3 examples. -->",
        "",
        "## The Deeper Question",
        "",
        "<!-- Elevate beyond the immediate topic. What does this reveal about how we work/think/build? -->",
      ].join("\n");

    case "case-study":
      return [
        "## The Problem",
        "",
        "<!-- Describe the situation before intervention. Be specific: numbers, context, stakes. -->",
        "",
        "## The Analysis",
        "",
        "<!-- What did you discover when you dug deeper? What was the root cause? -->",
        "",
        "## The Insight",
        "",
        "<!-- What non-obvious lesson emerged? How does it generalize? -->",
        "",
        "## Implications",
        "",
        "<!-- What should the reader do differently after reading this? -->",
      ].join("\n");

    case "framework":
      return [
        "## Why Existing Models Fall Short",
        "",
        "<!-- Brief critique of current thinking. What gap does your framework fill? -->",
        "",
        "## The Framework",
        "",
        "<!-- Introduce the model. Name it. Explain each component (3-5 parts max). -->",
        "",
        "### Component 1",
        "",
        "<!-- Explain + example -->",
        "",
        "### Component 2",
        "",
        "<!-- Explain + example -->",
        "",
        "### Component 3",
        "",
        "<!-- Explain + example -->",
        "",
        "## Applying the Framework",
        "",
        "<!-- Walk through a real scenario using all components together. -->",
      ].join("\n");

    case "contrarian":
      return [
        "## The Conventional Wisdom",
        "",
        '<!-- State the accepted truth clearly. "Everyone believes X because Y." -->',
        "",
        "## Why It's Wrong",
        "",
        "<!-- Present evidence, data, or reasoning that dismantles the assumption. -->",
        "",
        "## The Better Mental Model",
        "",
        "<!-- Offer your alternative. Make it concrete and actionable. -->",
        "",
        "## What Changes When You See It This Way",
        "",
        "<!-- Show the practical consequences of adopting the new view. -->",
      ].join("\n");
  }
}

function closingLine(audience: Audience, lang: Lang): string {
  const map: Record<Audience, Record<Lang, string>> = {
    "c-suite": {
      EN: "The organizations that understand this first will define the next decade.",
      FR: "Les organisations qui comprendront cela en premier definiront la prochaine decennie.",
    },
    consultants: {
      EN: "The frameworks we use shape the futures we can imagine.",
      FR: "Les cadres que nous utilisons faconnent les futurs que nous pouvons imaginer.",
    },
    developers: {
      EN: "The best code is the code that changes how people think.",
      FR: "Le meilleur code est celui qui change la facon dont les gens pensent.",
    },
    general: {
      EN: "The future belongs to those who see the system, not just the parts.",
      FR: "L'avenir appartient a ceux qui voient le systeme, pas seulement les parties.",
    },
  };
  return map[audience][lang];
}

function generateMarkdown(
  topic: string,
  tone: Tone,
  lang: Lang,
  audience: Audience,
  wordCount: number,
  preset: Preset,
): string {
  const approxParagraphs = Math.max(2, Math.round(wordCount / 150));

  return [
    "---",
    `title: "${topic}"`,
    `summary: ""`,
    `lang: ${lang}`,
    `audience: ${audience}`,
    `tone: ${tone}`,
    `target_words: ${wordCount}`,
    "---",
    "",
    `# ${topic}`,
    "",
    openingPrompt(tone, preset),
    "",
    `<!-- Target: ~${wordCount} words (~${approxParagraphs} substantial paragraphs) -->`,
    "",
    templateSections(preset),
    "",
    "## Key Takeaway",
    "",
    "<!-- Your main insight in 1-2 sentences. What should the reader remember tomorrow? -->",
    "",
    "---",
    "",
    `*${closingLine(audience, lang)}*`,
    "",
  ].join("\n");
}

/* ── component ─────────────────────────────────────────────── */

export default function ContentGeneratorPage() {
  /* password gate */
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [checkingGate, setCheckingGate] = useState(true);
  const [gatePassword, setGatePassword] = useState("");
  const [gateError, setGateError] = useState<string | null>(null);

  /* form state */
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("philosophical");
  const [lang, setLang] = useState<Lang>("EN");
  const [audience, setAudience] = useState<Audience>("c-suite");
  const [wordCount, setWordCount] = useState(1000);
  const [preset, setPreset] = useState<Preset>("thought-leadership");
  const [order, setOrder] = useState(1);

  /* output */
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  /* gate check */
  useEffect(() => {
    const hasCookie = document.cookie
      .split(";")
      .some((c) => c.trim().startsWith("admin-secondary=ok"));
    setGateUnlocked(hasCookie);
    setCheckingGate(false);
  }, []);

  async function submitGate(e: React.FormEvent) {
    e.preventDefault();
    setGateError(null);
    const res = await fetch("/api/admin/verify-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: gatePassword }),
    });
    if (res.status === 204) {
      setGateUnlocked(true);
      setGatePassword("");
    } else {
      setGateError("Invalid password.");
    }
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;
    const md = generateMarkdown(topic, tone, lang, audience, wordCount, preset);
    setOutput(md);
    setCopied(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const slug = slugify(topic) || "article";
    const filename = `${String(order).padStart(2, "0")}-${slug}-${lang}.md`;
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* derived */
  const slug = slugify(topic) || "article";
  const filename = `${String(order).padStart(2, "0")}-${slug}-${lang}.md`;

  /* ── loading state ── */

  if (checkingGate) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Loading...
        </p>
      </div>
    );
  }

  /* ── password gate ── */

  if (!gateUnlocked) {
    return (
      <div className="mx-auto max-w-md px-6 py-16">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Secondary gate
        </p>
        <h1 className="mb-8 font-serif text-4xl leading-display">
          Enter admin password
        </h1>
        <form onSubmit={submitGate} className="space-y-4">
          <input
            type="password"
            value={gatePassword}
            onChange={(e) => setGatePassword(e.target.value)}
            autoFocus
            placeholder="password"
            className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
          />
          {gateError && (
            <p className="font-mono text-xs text-ink">{gateError}</p>
          )}
          <button
            type="submit"
            className="w-full border border-ink bg-ink px-4 py-3 font-mono text-xs uppercase tracking-widest text-paper hover:bg-paper hover:text-ink transition-colors"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  /* ── main page ── */

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Admin / Content Generator
      </p>
      <h1 className="mb-10 font-serif text-5xl leading-display">
        Blog Article Generator
      </h1>

      {/* file path preview */}
      <div className="mb-8 border border-line bg-paper px-4 py-3">
        <p className="font-mono text-xs text-muted-foreground">
          Target file:{" "}
          <span className="text-ink">
            content/caio/11-content/{filename}
          </span>
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <section>
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* topic */}
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Article title or topic..."
                className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
              />
            </div>

            {/* selects grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                  Preset Template
                </label>
                <select
                  value={preset}
                  onChange={(e) => setPreset(e.target.value as Preset)}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                >
                  {PRESETS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as Tone)}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                >
                  {TONES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                  Language
                </label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as Lang)}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                  Target Audience
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as Audience)}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                >
                  {AUDIENCES.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                  Word Count
                </label>
                <input
                  type="number"
                  min={800}
                  max={2000}
                  step={100}
                  value={wordCount}
                  onChange={(e) => setWordCount(Number(e.target.value))}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                  Order Number
                </label>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!topic.trim()}
              className="w-full border border-ink bg-ink px-6 py-4 font-mono text-xs uppercase tracking-widest text-paper disabled:cursor-not-allowed disabled:opacity-40 hover:bg-paper hover:text-ink transition-colors"
            >
              Generate Template
            </button>
          </form>

          {/* output */}
          {output && (
            <div className="mt-12">
              <div className="mb-4 flex gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors"
                >
                  {copied ? "Copied!" : "Copy Markdown"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors"
                >
                  Download .md
                </button>
              </div>
              <textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                rows={24}
                className="w-full border border-line bg-paper px-4 py-3 font-mono text-xs text-ink outline-none focus:border-ink"
              />
            </div>
          )}
        </section>

        <aside className="border-l border-line pl-8">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Presets Guide
          </h2>
          <ul className="space-y-4">
            <li>
              <p className="font-mono text-xs font-medium text-ink">Thought Leadership</p>
              <p className="font-mono text-xs text-muted-foreground">
                Philosophy and vision pieces. Opens with a paradigm shift, builds to a deeper
                question.
              </p>
            </li>
            <li>
              <p className="font-mono text-xs font-medium text-ink">Case Study</p>
              <p className="font-mono text-xs text-muted-foreground">
                Problem, analysis, insight. Best for concrete examples with data.
              </p>
            </li>
            <li>
              <p className="font-mono text-xs font-medium text-ink">Framework</p>
              <p className="font-mono text-xs text-muted-foreground">
                Introduce a mental model. Name it, break it into 3-5 components, show it in action.
              </p>
            </li>
            <li>
              <p className="font-mono text-xs font-medium text-ink">Contrarian</p>
              <p className="font-mono text-xs text-muted-foreground">
                Challenge conventional wisdom. State the accepted truth, then dismantle it.
              </p>
            </li>
            <li>
              <p className="font-mono text-xs font-medium text-ink">Blank</p>
              <p className="font-mono text-xs text-muted-foreground">
                Empty structure with two sections. Full creative freedom.
              </p>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
