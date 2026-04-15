"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type SidebarNode = {
  label: string;
  href?: string;
  children?: SidebarNode[];
};

export function SidebarNav({ items }: { items: SidebarNode[] }) {
  return (
    <nav aria-label="Documentation">
      <ul className="space-y-0">
        {items.map((node, i) => (
          <SidebarItem key={i} node={node} depth={0} />
        ))}
      </ul>
    </nav>
  );
}

function SidebarItem({ node, depth }: { node: SidebarNode; depth: number }) {
  const pathname = usePathname();
  const hasChildren = !!node.children?.length;
  const active = !!node.href && pathname === node.href;
  const [open, setOpen] = React.useState(
    hasChildren &&
      !!node.href &&
      (pathname === node.href || pathname.startsWith(node.href + "/")),
  );

  if (!hasChildren && node.href) {
    return (
      <li>
        <Link
          href={node.href}
          className={cn(
            "block border-l py-1.5 text-sm transition-colors duration-150",
            active
              ? "border-[color:var(--color-ink)] font-semibold text-[color:var(--color-ink)]"
              : "border-transparent text-[color:var(--color-muted)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]",
          )}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
        >
          {node.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-1.5 py-1.5 text-left text-xs font-semibold uppercase tracking-wider text-[color:var(--color-ink)]"
        style={{ paddingLeft: `${depth * 12}px` }}
      >
        <ChevronRight
          className={cn(
            "size-3 transition-transform duration-150",
            open && "rotate-90",
          )}
          aria-hidden
        />
        <span>{node.label}</span>
      </button>
      {open && hasChildren && (
        <ul className="space-y-0">
          {node.children!.map((child, i) => (
            <SidebarItem key={i} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}
