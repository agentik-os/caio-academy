"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

type Props = {
  docSlug: string;
  lang: "fr" | "en";
  label: string;
  generatingLabel: string;
};

export function GenerateEpisodeButton({ docSlug, lang, label, generatingLabel }: Props) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/podcast/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ docSlug, lang }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body?.error ?? `HTTP ${res.status}`);
        setLoading(false);
        return;
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-paper)] transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {loading ? generatingLabel : label}
      </button>
      {error && (
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em]">
          {error}
        </p>
      )}
    </div>
  );
}
