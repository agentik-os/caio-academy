"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type SearchEntry = {
  id: string;
  title: string;
  section: string;
  sectionKey: string;
  lang: "fr" | "en";
  excerpt: string;
  url: string;
};

export function DocsSearch({
  locale,
  placeholder,
  label,
  empty,
  hint,
}: {
  locale: "fr" | "en";
  placeholder: string;
  label: string;
  empty: string;
  hint: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [index, setIndex] = React.useState<SearchEntry[] | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  React.useEffect(() => {
    if (!open || index) return;
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchEntry[]) => setIndex(data))
      .catch(() => setIndex([]));
  }, [open, index]);

  const results = React.useMemo(() => {
    if (!index) return [];
    const q = query.trim().toLowerCase();
    const scoped = index.filter((e) => e.lang === locale);
    if (!q) return scoped.slice(0, 30);
    return scoped
      .filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.excerpt.toLowerCase().includes(q) ||
          e.section.toLowerCase().includes(q),
      )
      .slice(0, 40);
  }, [index, query, locale]);

  function go(url: string) {
    setOpen(false);
    setQuery("");
    const stripped = url.replace(/^\/(fr|en)/, "") || "/";
    router.push(stripped);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 border border-[color:var(--color-line)] px-3 text-xs text-[color:var(--color-muted)] transition-colors duration-150 hover:text-[color:var(--color-ink)]"
            aria-label={label}
          >
            <Search className="size-3.5" aria-hidden />
            <span>{label}</span>
            <kbd className="border border-[color:var(--color-line)] px-1 font-mono text-[0.65rem]">
              ⌘K
            </kbd>
          </button>
        }
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{label}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[color:var(--color-muted)]"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full border border-[color:var(--color-line)] bg-transparent py-2.5 pl-10 pr-3 font-sans text-sm outline-none focus:border-[color:var(--color-ink)]"
              autoFocus
            />
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {index === null ? (
              <p className="px-2 py-6 text-center font-sans text-xs text-[color:var(--color-muted)]">
                …
              </p>
            ) : results.length === 0 ? (
              <p className="px-2 py-6 text-center font-sans text-xs text-[color:var(--color-muted)]">
                {empty}
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-[color:var(--color-line)]">
                {results.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => go(r.url)}
                      className="group flex w-full flex-col gap-1 px-2 py-3 text-left transition-colors duration-150 hover:bg-[color:var(--color-secondary)]"
                    >
                      <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                        {r.section}
                      </span>
                      <span className="font-serif text-sm font-bold leading-snug">
                        {r.title}
                      </span>
                      {r.excerpt && (
                        <span className="line-clamp-2 font-sans text-xs text-[color:var(--color-muted)]">
                          {r.excerpt}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
            {hint}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
