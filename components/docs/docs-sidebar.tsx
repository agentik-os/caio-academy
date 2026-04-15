"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type DocsSidebarSection = {
  key: string;
  title: string;
  href: string;
  docs: { slug: string; title: string; href: string }[];
};

export function DocsSidebar({
  sections,
  eyebrow,
}: {
  sections: DocsSidebarSection[];
  eyebrow: string;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6">
      <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
        {eyebrow}
      </p>
      <ul className="flex flex-col gap-1">
        {sections.map((section) => (
          <SidebarSection key={section.key} section={section} pathname={pathname} />
        ))}
      </ul>
    </nav>
  );
}

function SidebarSection({
  section,
  pathname,
}: {
  section: DocsSidebarSection;
  pathname: string;
}) {
  const sectionActive =
    pathname === section.href || pathname.startsWith(section.href + "/");
  const [open, setOpen] = React.useState(sectionActive);

  React.useEffect(() => {
    if (sectionActive) setOpen(true);
  }, [sectionActive]);

  return (
    <li>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Collapse" : "Expand"}
          className="flex size-6 items-center justify-center text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
        >
          <ChevronRight
            className={cn("size-3 transition-transform duration-150", open && "rotate-90")}
            aria-hidden
          />
        </button>
        <Link
          href={section.href.replace(/^\/(fr|en)/, "")}
          className={cn(
            "flex-1 py-1 font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-150",
            sectionActive
              ? "text-[color:var(--color-ink)]"
              : "text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]",
          )}
        >
          {section.title}
        </Link>
      </div>
      {open && section.docs.length > 0 && (
        <ul className="ml-3 border-l border-[color:var(--color-line)] py-1">
          {section.docs.map((doc) => {
            const active = pathname === doc.href;
            return (
              <li key={doc.slug}>
                <Link
                  href={doc.href.replace(/^\/(fr|en)/, "")}
                  className={cn(
                    "block border-l-2 py-1.5 pl-3 pr-2 font-sans text-sm leading-snug transition-colors duration-150",
                    active
                      ? "-ml-px border-[color:var(--color-ink)] font-semibold text-[color:var(--color-ink)]"
                      : "-ml-px border-transparent text-[color:var(--color-muted)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]",
                  )}
                >
                  {doc.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
