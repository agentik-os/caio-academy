"use client";

import * as React from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SearchBar() {
  const [open, setOpen] = React.useState(false);

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 border border-[color:var(--color-line)] px-3 text-xs text-[color:var(--color-muted)] transition-colors duration-150 hover:text-[color:var(--color-ink)]"
            aria-label="Search"
          >
            <Search className="size-3.5" aria-hidden />
            <span>Search</span>
            <kbd className="border border-[color:var(--color-line)] px-1 font-mono text-[0.65rem]">
              ⌘K
            </kbd>
          </button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-bold">Search</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <input
            type="search"
            placeholder="Type to search across the whitepaper..."
            className="w-full border border-[color:var(--color-line)] bg-transparent px-3 py-2.5 font-sans text-sm outline-none focus:border-[color:var(--color-ink)]"
            autoFocus
          />
          <p className="mt-4 text-xs text-[color:var(--color-muted)]">
            Full-text search is wired up in a later phase.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
