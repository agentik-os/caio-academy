"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { PodcastPlayer } from "@/components/podcast-player";

type Status = "ready" | "pending" | "error" | "none";

export type PodcastItemData = {
  docSlug: string;
  section: string;
  sectionTitle: string;
  title: string;
  excerpt: string;
  href: string;
  status: Status;
  audioUrl?: string;
  durationSec?: number;
};

type Props = {
  item: PodcastItemData;
  locale: "fr" | "en";
  labels: {
    generate: string;
    generating: string;
    ready: string;
    error: string;
    open: string;
  };
};

export function PodcastListItem({ item, locale, labels }: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const ready = item.status === "ready" && !!item.audioUrl;
  const pending = item.status === "pending";

  async function onGenerate() {
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/podcast/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ docSlug: item.docSlug, lang: locale }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body?.error ?? `HTTP ${res.status}`);
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <li className="border-b border-[color:var(--color-line)]">
      <div className="flex flex-col gap-4 py-6 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
            {item.sectionTitle}
          </p>
          <Link
            href={item.href}
            className="mt-2 inline-block font-serif text-xl font-bold leading-tight tracking-tight hover:underline md:text-2xl"
          >
            {item.title}
          </Link>
          {item.excerpt && (
            <p className="mt-2 max-w-2xl text-sm leading-[1.65] text-[color:var(--color-muted)]">
              {item.excerpt}
            </p>
          )}
          {errorMsg && (
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-ink)]">
              {labels.error}: {errorMsg}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {ready ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className={cn(
                "border border-[color:var(--color-ink)] px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.2em]",
                expanded
                  ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                  : "bg-[color:var(--color-paper)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]",
              )}
            >
              {labels.ready}
            </button>
          ) : pending || submitting ? (
            <span className="border border-[color:var(--color-line)] px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              {labels.generating}
            </span>
          ) : (
            <button
              type="button"
              onClick={onGenerate}
              disabled={submitting}
              className="border border-[color:var(--color-ink)] bg-[color:var(--color-paper)] px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)] disabled:opacity-50"
            >
              {labels.generate}
            </button>
          )}
          <Link
            href={item.href}
            className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
          >
            {labels.open} →
          </Link>
        </div>
      </div>

      {expanded && ready && item.audioUrl && (
        <div className="pb-6">
          <PodcastPlayer
            src={item.audioUrl}
            variant="inline"
            initialDuration={item.durationSec ?? 0}
          />
        </div>
      )}
    </li>
  );
}
