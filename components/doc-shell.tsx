import * as React from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { SidebarNav, type SidebarNode } from "./sidebar-nav";

export function DocShell({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: SidebarNode[];
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--color-paper)] text-[color:var(--color-ink)]">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-12 px-6 py-12">
        <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-72 shrink-0 overflow-y-auto border-r border-[color:var(--color-line)] pr-6 md:block">
          <SidebarNav items={sidebar} />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}
