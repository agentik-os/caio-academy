"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TocItem = { level: 2 | 3; id: string; text: string };

export function DocsToc({ items, label }: { items: TocItem[]; label: string }) {
  const [activeId, setActiveId] = React.useState<string | null>(items[0]?.id ?? null);

  React.useEffect(() => {
    if (items.length === 0) return;
    const ids = items.map((i) => i.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="sticky top-24 border-t-2 border-[color:var(--color-ink)] pt-6">
      <p className="mb-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
        {label}
      </p>
      <ul className="flex flex-col gap-1 border-l border-[color:var(--color-line)]">
        {items.map((item, i) => {
          const active = item.id === activeId;
          return (
            <li key={`${item.id}-${i}`} className={item.level === 3 ? "pl-6" : "pl-3"}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block border-l-2 py-1 font-sans text-xs leading-relaxed transition-colors duration-150",
                  active
                    ? "-ml-px border-[color:var(--color-ink)] font-semibold text-[color:var(--color-ink)]"
                    : "-ml-px border-transparent text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]",
                )}
                style={{ paddingLeft: item.level === 3 ? 16 : 12 }}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
