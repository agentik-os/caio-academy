"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export function LocaleToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const swap = (next: "fr" | "en") => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex h-9 border border-[color:var(--color-line)] text-xs font-medium uppercase tracking-wider"
    >
      {(["fr", "en"] as const).map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => swap(l)}
            aria-pressed={active}
            className={
              active
                ? "bg-[color:var(--color-ink)] px-3 text-[color:var(--color-paper)]"
                : "px-3 transition-colors duration-150 hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]"
            }
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
