"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { DocsSidebar, type DocsSidebarSection } from "./docs-sidebar";
import { DocsSearch } from "./docs-search";

type Locale = "fr" | "en";

type Strings = {
  search: string;
  placeholder: string;
  empty: string;
  hint: string;
  eyebrow: string;
  open: string;
  close: string;
};

export function DocsMobileNav({
  sections,
  locale,
  strings,
}: {
  sections: DocsSidebarSection[];
  locale: Locale;
  strings: Strings;
}) {
  const [open, setOpen] = React.useState(false);

  // Lock body scroll while the drawer is open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="mb-6 flex items-center justify-between border-b border-[color:var(--color-line)] pb-4 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 items-center gap-2 border border-[color:var(--color-line-strong)] px-4 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink)]"
          aria-expanded={open}
          aria-controls="docs-mobile-drawer"
        >
          <Menu className="h-4 w-4" aria-hidden />
          {strings.open}
        </button>
        <div className="flex-1 pl-4">
          <DocsSearch
            locale={locale}
            label={strings.search}
            placeholder={strings.placeholder}
            empty={strings.empty}
            hint={strings.hint}
          />
        </div>
      </div>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-[90] bg-black/60 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            id="docs-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={strings.eyebrow}
            className="fixed inset-y-0 right-0 z-[100] flex h-full w-[85vw] max-w-xs flex-col overflow-y-auto border-l border-[color:var(--color-line)] bg-[color:var(--color-paper)] px-5 py-5 shadow-2xl md:hidden"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                {strings.eyebrow}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center border border-[color:var(--color-line)] text-[color:var(--color-ink)]"
                aria-label={strings.close}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mb-5">
              <DocsSearch
                locale={locale}
                label={strings.search}
                placeholder={strings.placeholder}
                empty={strings.empty}
                hint={strings.hint}
              />
            </div>
            <div onClick={() => setOpen(false)}>
              <DocsSidebar sections={sections} eyebrow={strings.eyebrow} />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
