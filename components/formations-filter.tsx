"use client";

import * as React from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type FormationCard = {
  slug: string;
  track: "c-suite" | "course-en" | "formation-fr";
  lang: "fr" | "en";
  title: string;
  summary: string;
  avatar?: string;
};

type AvatarOption = { slug: string; label: string };

type Props = {
  formations: FormationCard[];
  avatarOptions: AvatarOption[];
  trackLabels: Record<FormationCard["track"], string>;
  labels: {
    track: string;
    avatar: string;
    search: string;
    all: string;
    empty: string;
    view: string;
    searchPlaceholder: string;
  };
};

type TrackFilter = FormationCard["track"] | "all";

export function FormationsFilter({ formations, avatarOptions, trackLabels, labels }: Props) {
  const [track, setTrack] = React.useState<TrackFilter>("all");
  const [avatar, setAvatar] = React.useState<string>("all");
  const [query, setQuery] = React.useState<string>("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return formations.filter((f) => {
      if (track !== "all" && f.track !== track) return false;
      if (avatar !== "all" && f.avatar !== avatar) return false;
      if (q && !f.title.toLowerCase().includes(q) && !f.summary.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [formations, track, avatar, query]);

  const trackKeys: TrackFilter[] = ["all", "c-suite", "course-en", "formation-fr"];

  return (
    <div>
      <div className="mb-12 flex flex-col gap-6 border-y border-[color:var(--color-line)] py-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
            {labels.track}
          </span>
          <div className="flex flex-wrap gap-2">
            {trackKeys.map((key) => {
              const label = key === "all" ? labels.all : trackLabels[key as FormationCard["track"]];
              const active = track === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTrack(key)}
                  className={cn(
                    "border px-3 py-1 font-sans text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-150",
                    active
                      ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                      : "border-[color:var(--color-line)] text-[color:var(--color-muted)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
            {labels.avatar}
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setAvatar("all")}
              className={cn(
                "border px-3 py-1 font-sans text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-150",
                avatar === "all"
                  ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                  : "border-[color:var(--color-line)] text-[color:var(--color-muted)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]",
              )}
            >
              {labels.all}
            </button>
            {avatarOptions.map((opt) => {
              const active = avatar === opt.slug;
              return (
                <button
                  key={opt.slug}
                  type="button"
                  onClick={() => setAvatar(opt.slug)}
                  className={cn(
                    "border px-3 py-1 font-sans text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-150",
                    active
                      ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                      : "border-[color:var(--color-line)] text-[color:var(--color-muted)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]",
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:min-w-[260px]">
          <label
            htmlFor="formations-search"
            className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]"
          >
            {labels.search}
          </label>
          <input
            id="formations-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="border border-[color:var(--color-line)] bg-transparent px-3 py-2 font-sans text-sm text-[color:var(--color-ink)] outline-none transition-colors duration-150 placeholder:text-[color:var(--color-muted)] focus:border-[color:var(--color-ink)]"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center font-sans text-sm text-[color:var(--color-muted)]">
          {labels.empty}
        </p>
      ) : (
        <ul className="grid gap-px bg-[color:var(--color-line)] md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((f) => (
            <li key={f.slug} className="bg-[color:var(--color-paper)]">
              <Link
                href={`/formations/${f.slug}`}
                className="flex h-full flex-col justify-between gap-6 p-8 transition-colors duration-150 hover:bg-[color:var(--color-secondary)]"
              >
                <div>
                  <p className="mb-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                    {trackLabels[f.track]}
                  </p>
                  <h3 className="font-serif text-xl font-bold leading-tight tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.65] text-[color:var(--color-muted)]">
                    {f.summary}
                  </p>
                </div>
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em]">
                  {labels.view} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
