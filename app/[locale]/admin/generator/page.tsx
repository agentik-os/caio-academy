"use client";

import { useEffect, useRef, useState } from "react";

const AVATARS: { value: string; label: string }[] = [
  { value: "all", label: "All avatars" },
  { value: "cto-saas", label: "CTO SaaS" },
  { value: "consultant-ai", label: "Consultant AI" },
  { value: "dg-pme", label: "DG PME" },
  { value: "head-digital", label: "Head of Digital" },
  { value: "dev-ambitieux", label: "Dev Ambitieux" },
];

const PLATFORMS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter / X" },
  { value: "youtube", label: "YouTube" },
  { value: "newsletter", label: "Newsletter" },
];

const TEMPLATES = [
  { value: "hook", label: "Hook" },
  { value: "thread", label: "Thread" },
  { value: "script", label: "Script" },
  { value: "post", label: "Post" },
  { value: "video", label: "Video" },
];

type Idea = {
  title?: string;
  body?: string;
  hashtags?: string[];
  cta?: string;
};

function parseIdeas(raw: string): Idea[] | null {
  const trimmed = raw.trim();
  const start = trimmed.indexOf("[");
  const end = trimmed.lastIndexOf("]");
  if (start < 0 || end < 0 || end <= start) return null;
  const slice = trimmed.slice(start, end + 1);
  try {
    const parsed = JSON.parse(slice);
    return Array.isArray(parsed) ? (parsed as Idea[]) : null;
  } catch {
    return null;
  }
}

export default function GeneratorPage() {
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [checkingGate, setCheckingGate] = useState(true);
  const [gatePassword, setGatePassword] = useState("");
  const [gateError, setGateError] = useState<string | null>(null);

  const [prompt, setPrompt] = useState("");
  const [avatar, setAvatar] = useState("all");
  const [platform, setPlatform] = useState("linkedin");
  const [template, setTemplate] = useState("post");
  const [count, setCount] = useState(10);

  const [streaming, setStreaming] = useState(false);
  const [rawOutput, setRawOutput] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [error, setError] = useState<string | null>(null);
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
    if (!prompt.trim() || streaming) return;
    setError(null);
    setRawOutput("");
    setIdeas([]);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, avatar, platform, template, count }),
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
              const parsed = parseIdeas(accumulated);
              if (parsed) setIdeas(parsed);
            } else if (event === "complete") {
              const parsed = parseIdeas(payload.text ?? accumulated);
              if (parsed) setIdeas(parsed);
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

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Admin / Generator
      </p>
      <h1 className="mb-10 font-serif text-5xl leading-display">
        Content Generator
      </h1>

      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <section>
          <form onSubmit={submitGenerate} className="space-y-6">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                placeholder="Topic, angle, or raw brief…"
                className="w-full border border-line bg-paper px-4 py-3 font-sans text-sm text-ink outline-none focus:border-ink"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                  Template
                </label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                >
                  {TEMPLATES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest">
                  Count
                </label>
                <input
                  type="number"
                  min={3}
                  max={20}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full border border-line bg-paper px-4 py-3 font-mono text-sm text-ink outline-none focus:border-ink"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={streaming || !prompt.trim()}
              className="w-full border border-ink bg-ink px-6 py-4 font-mono text-xs uppercase tracking-widest text-paper disabled:cursor-not-allowed disabled:opacity-40 hover:bg-paper hover:text-ink transition-colors"
            >
              {streaming ? "Generating…" : "Generate"}
            </button>

            {error && (
              <p className="border border-line px-4 py-3 font-mono text-xs text-ink">
                Error: {error}
              </p>
            )}
          </form>

          <div className="mt-12">
            {ideas.length > 0 ? (
              <ul className="space-y-6">
                {ideas.map((idea, i) => (
                  <li
                    key={i}
                    className="border border-line bg-paper p-6"
                  >
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      #{String(i + 1).padStart(2, "0")}
                    </div>
                    {idea.title && (
                      <h3 className="mb-3 font-serif text-2xl leading-tight">
                        {idea.title}
                      </h3>
                    )}
                    {idea.body && (
                      <p className="whitespace-pre-wrap font-sans text-sm leading-prose text-ink">
                        {idea.body}
                      </p>
                    )}
                    {idea.hashtags && idea.hashtags.length > 0 && (
                      <p className="mt-4 font-mono text-xs text-muted-foreground">
                        {idea.hashtags.map((h) => `#${h}`).join(" ")}
                      </p>
                    )}
                    {idea.cta && (
                      <p className="mt-4 border-t border-line pt-3 font-mono text-xs uppercase tracking-widest">
                        CTA: {idea.cta}
                      </p>
                    )}
                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const text = [
                            idea.title ?? "",
                            "",
                            idea.body ?? "",
                            idea.hashtags?.length
                              ? "\n" + idea.hashtags.map((h) => `#${h}`).join(" ")
                              : "",
                          ].join("\n");
                          navigator.clipboard.writeText(text);
                        }}
                        className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : rawOutput ? (
              <pre className="overflow-auto border border-line bg-paper p-4 font-mono text-xs text-ink">
                {rawOutput}
              </pre>
            ) : null}
          </div>
        </section>

        <aside className="border-l border-line pl-8">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Recent
          </h2>
          <p className="font-mono text-xs text-muted-foreground">
            History loads from Convex once the backend is deployed. Generations
            are stored per user.
          </p>
        </aside>
      </div>
    </div>
  );
}
