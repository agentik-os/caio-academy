"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";

type NavItem = { key: string; href: string; label: string };

export function SiteHeaderMobileMenu({
  items,
  beta,
  openLabel,
  closeLabel,
}: {
  items: NavItem[];
  beta: { href: string; label: string };
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center border border-[color:var(--color-line-strong)] text-[color:var(--color-ink)] md:hidden"
        aria-expanded={open}
        aria-controls="site-mobile-drawer"
        aria-label={openLabel}
      >
        <Menu className="h-4 w-4" aria-hidden />
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-[90] bg-black/60 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            id="site-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={openLabel}
            className="fixed inset-y-0 right-0 z-[100] flex h-full w-[85vw] max-w-xs flex-col overflow-y-auto border-l border-[color:var(--color-line)] bg-[color:var(--color-paper)] px-5 py-5 shadow-2xl md:hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                Menu
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center border border-[color:var(--color-line)] text-[color:var(--color-ink)]"
                aria-label={closeLabel}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav aria-label="Mobile primary">
              <ul className="flex flex-col gap-1">
                {items.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center border-b border-[color:var(--color-line)] py-3 font-serif text-lg font-bold tracking-tight text-[color:var(--color-ink)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6">
              <Link
                href={beta.href}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 w-full items-center justify-center bg-[color:var(--color-ink)] px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-paper)]"
              >
                {beta.label}
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
