"use client";

import { useEffect, useRef, useState } from "react";

const ANGLES = [
  { value: "philosophical", label: "Philosophique · Philosophical" },
  { value: "tech-deep", label: "Tech profond · Tech deep-dive" },
  { value: "c-level", label: "Insight C-level · C-level insight" },
  { value: "small-technique", label: "Petite technique · Small technique" },
];

const AVATARS = [
  { value: "all", label: "Tous · All avatars" },
  { value: "cto-saas", label: "CTO SaaS" },
  { value: "consultant-ai", label: "Consultant AI" },
  { value: "dg-pme", label: "DG PME" },
  { value: "head-digital", label: "Head of Digital" },
  { value: "dev-ambitieux", label: "Dev Ambitieux" },
];

const LENGTHS = [
  { value: "short", label: "Court · 5-8 min" },
  { value: "medium", label: "Moyen · 12-18 min" },
  { value: "long", label: "Long · 20-30 min" },
  { value: "tentpole", label: "Pilier · 45-60 min" },
];

const LANGUAGES = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
];

type Script = {
  title?: string;
  thumbnail_text?: string;
  description?: string;
  hook?: { formula?: string; script?: string };
  reframing?: string;
  body?: Array<{ section_label?: string; spoken_script?: string }>;
  philosophical_zoom_out?: string;
  cta?: string;
  shot_notes?: string[];
  timestamps?: Array<{ t?: string; label?: string }>;
};

function extractJson(raw: string): Script | null {
  const trimmed = raw.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start < 0 || end < 0 || end <= start) return null;
  const slice = trimmed.slice(start, end + 1);
  try {
    const parsed = JSON.parse(slice);
    if (parsed && typeof parsed === "object") return parsed as Script;
    return null;
  } catch {
    return null;
  }
}

function scriptToPlainText(s: Script): string {
  const parts: string[] = [];
  if (s.title) parts.push(`# ${s.title}`);
  if (s.thumbnail_text) parts.push(`Thumbnail: ${s.thumbnail_text}`);
  if (s.description) parts.push(`Description: ${s.description}`);
  parts.push("");
  if (s.hook) {
    parts.push(`## HOOK${s.hook.formula ? ` — ${s.hook.formula}` : ""}`);
    if (s.hook.script) parts.push(s.hook.script);
    parts.push("");
  }
  if (s.reframing) {
    parts.push("## REFRAMING");
    parts.push(s.reframing);
    parts.push("");
  }
  if (s.body?.length) {
    for (const b of s.body) {
      parts.push(`## ${b.section_label ?? "SECTION"}`);
      if (b.spoken_script) parts.push(b.spoken_script);
      parts.push("");
    }
  }
  if (s.philosophical_zoom_out) {
    parts.push("## ZOOM OUT");
    parts.push(s.philosophical_zoom_out);
    parts.push("");
  }
  if (s.cta) {
    parts.push("## CTA");
    parts.push(s.cta);
    parts.push("");
  }
  if (s.timestamps?.length) {
    parts.push("## TIMESTAMPS");
    for (const ts of s.timestamps) parts.push(`${ts.t ?? ""} — ${ts.label ?? ""}`);
    parts.push("");
  }
  if (s.shot_notes?.length) {
    parts.push("## SHOT NOTES");
    for (const note of s.shot_notes) parts.push(`- ${note}`);
  }
  return parts.join("\n");
}

export default function YoutubeScriptPage() {
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [checkingGate, setCheckingGate] = useState(true);
  const [gatePassword, setGatePassword] = useState("");
  const [gateError, setGateError] = useState<string | null>(null);

  const [topic, setTopic] = useState("");
  const [angle, setAngle] = useState("philosophical");
  const [avatar, setAvatar] = useState("all");
  const [length, setLength] = useState("medium");
  const [language, setLanguage] = useState("fr");

  const [streaming, setStreaming] = useState(false);
  const [rawOutput, setRawOutput] = useState("");
  const [script, setScript] = useState<Script | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

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

  async function submitGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim() || streaming) return;
    setError(null);
    setRawOutput("");
    setScript(null);
    setCopied(false);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/admin/youtube-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, angle, avatar, length, language }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? `HTTP ${res.status}`);
        setStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx;
        while ((idx = buffer.indexOf("\n\n")) !== -1) {
          const chunk = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          const lines = chunk.split("\n");
          let event = "message";
          let data = "";
          for (const line of lines) {
            if (line.startsWith("event: ")) event = line.slice(7);
            else if (line.startsWith("data: ")) data = line.slice(6);
          }
          if (!data) continue;
          try {
            const payload = JSON.parse(data);
            if (event === "delta") {
              accumulated += payload.text ?? "";
              setRawOutput(accumulated);
              const parsed = extractJson(accumulated);
              if (parsed) setScript(parsed);
            } else if (event === "complete") {
              const parsed = extractJson(payload.text ?? accumulated);
              if (parsed) setScript(parsed);
            } else if (event === "error") {
              setError(payload.message ?? "Unknown error");
            }
          } catch {
            // skip malformed
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError((err as Error).message);
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function copyScript() {
    if (!script) return;
    navigator.clipboard.writeText(scriptToPlainText(script));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (checkingGate) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Loading…
        </p>
      </div>
    );
  }

  if (!gateUnlocked) {
    return (
      <div className="mx-auto max-w-md px-6 py-16">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Secondary gate
        </p>
        <h1 className="mb-8 font-serif text-4xl leading-tight">
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Admin / YouTube Script · SamourAI voice
      </p>
      <h1 className="mb-4 font-serif text-5xl leading-tight">Content Generator</h1>
      <p className="mb-10 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground">
        Générateur de scripts YouTube dans la voix &laquo;&nbsp;Le SamourAI&nbsp;&raquo;,
        adaptée au positionnement Chief AI Officer. Le prompt système intègre
        le profil vocal extrait de la chaîne (hooks, rhétorique, thèmes, CTA).
      </p>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <section>
          <form onSubmit={submitGenerate} className="space-y-6">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                Topic / Brief
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={6}
                placeholder="Ex: Pourquoi OpenAI ne gagnera pas la guerre du compute — analyse des chiffres et du vrai goulot d'étranglement."
                className="w-full border border-line bg-paper px-4 py-3 font-sans text-sm text-ink outline-none focus:border-ink"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                  Angle
                </label>
                <select
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                >
                  {ANGLES.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                  Avatar
                </label>
                <select
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                >
                  {AVATARS.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                  Length
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                >
                  {LENGTHS.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={streaming || !topic.trim()}
              className="w-full border border-ink bg-ink px-6 py-4 font-mono text-xs uppercase tracking-widest text-paper disabled:cursor-not-allowed disabled:opacity-40 hover:bg-paper hover:text-ink transition-colors"
            >
              {streaming ? "Writing…" : "Generate script"}
            </button>

            {error && (
              <p className="border border-line px-4 py-3 font-mono text-xs text-ink">
                Error: {error}
              </p>
            )}
          </form>

          <div className="mt-10 border-t border-line pt-8">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Voice reminder
            </h3>
            <ul className="space-y-2 font-sans text-xs leading-relaxed text-muted-foreground">
              <li>— No emojis. No hype vocabulary.</li>
              <li>— Hook before 15 seconds. Numbers must be specific.</li>
              <li>— Philosophical register, analyst voice.</li>
              <li>— Output is a structured JSON script.</li>
            </ul>
          </div>
        </section>

        <section>
          {script ? (
            <article className="border border-line bg-paper p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Script · {angle} · {length} · {language.toUpperCase()}
                  </div>
                  {script.title && (
                    <h2 className="font-serif text-3xl leading-tight">
                      {script.title}
                    </h2>
                  )}
                </div>
                <button
                  type="button"
                  onClick={copyScript}
                  className="shrink-0 border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {script.thumbnail_text && (
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Thumbnail: <span className="text-ink normal-case">{script.thumbnail_text}</span>
                </p>
              )}
              {script.description && (
                <p className="mb-6 border-l-2 border-ink pl-4 font-sans text-sm italic leading-relaxed text-muted-foreground">
                  {script.description}
                </p>
              )}

              {script.hook && (
                <section className="mt-6">
                  <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Hook {script.hook.formula ? `· ${script.hook.formula}` : ""}
                  </h3>
                  <p className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                    {script.hook.script}
                  </p>
                </section>
              )}

              {script.reframing && (
                <section className="mt-8">
                  <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Reframing
                  </h3>
                  <p className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                    {script.reframing}
                  </p>
                </section>
              )}

              {script.body?.map((b, i) => (
                <section key={i} className="mt-8">
                  <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} · {b.section_label ?? "Section"}
                  </h3>
                  <p className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                    {b.spoken_script}
                  </p>
                </section>
              ))}

              {script.philosophical_zoom_out && (
                <section className="mt-8">
                  <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Zoom out
                  </h3>
                  <p className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                    {script.philosophical_zoom_out}
                  </p>
                </section>
              )}

              {script.cta && (
                <section className="mt-8 border-t border-line pt-6">
                  <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    CTA
                  </h3>
                  <p className="whitespace-pre-wrap font-sans text-base italic leading-relaxed">
                    {script.cta}
                  </p>
                </section>
              )}

              {script.timestamps && script.timestamps.length > 0 && (
                <section className="mt-8">
                  <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Timestamps
                  </h3>
                  <ul className="space-y-1 font-mono text-xs">
                    {script.timestamps.map((ts, i) => (
                      <li key={i}>
                        <span className="inline-block w-14 text-muted-foreground">
                          {ts.t}
                        </span>
                        {ts.label}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {script.shot_notes && script.shot_notes.length > 0 && (
                <section className="mt-8">
                  <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Shot notes
                  </h3>
                  <ul className="space-y-1 font-sans text-xs leading-relaxed text-muted-foreground">
                    {script.shot_notes.map((note, i) => (
                      <li key={i}>— {note}</li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
          ) : rawOutput ? (
            <pre className="overflow-auto border border-line bg-paper p-4 font-mono text-xs text-ink">
              {rawOutput}
            </pre>
          ) : (
            <div className="border border-dashed border-line p-12 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Script will appear here
              </p>
              <p className="mt-4 max-w-sm mx-auto font-sans text-sm leading-relaxed text-muted-foreground">
                The SamourAI voice profile is injected automatically. Describe
                the topic, pick the angle, and hit generate.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
