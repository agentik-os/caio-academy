import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DocsSidebar, type DocsSidebarSection } from "@/components/docs/docs-sidebar";
import { DocsSearch } from "@/components/docs/docs-search";
import { DocsMobileNav } from "@/components/docs/docs-mobile-nav";
import { SECTION_META, getDocsTree, getSectionDocs } from "@/lib/docs";

type Locale = "fr" | "en";

const T = {
  fr: {
    eyebrow: "Documentation",
    search: "Rechercher",
    placeholder: "Chercher un article, une section…",
    empty: "Aucun résultat.",
    hint: "⌘K pour ouvrir · Échap pour fermer",
    open: "Menu",
    close: "Fermer",
  },
  en: {
    eyebrow: "Documentation",
    search: "Search",
    placeholder: "Search articles, sections…",
    empty: "No results.",
    hint: "⌘K to open · Esc to close",
    open: "Menu",
    close: "Close",
  },
} as const;

function buildSections(locale: Locale): DocsSidebarSection[] {
  const tree = getDocsTree();
  return tree.map((t) => {
    const docs = getSectionDocs(t.section, locale);
    return {
      key: t.section,
      title: SECTION_META[t.section]?.title[locale] ?? t.section,
      href: `/${locale}/docs/${t.section}`,
      docs: docs.map((d) => ({
        slug: d.slug,
        title: d.title,
        href: `/${locale}/docs/${t.section}/${d.slug}`,
      })),
    };
  });
}

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const t = T[key];
  const sections = buildSections(key);

  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--color-paper)] text-[color:var(--color-ink)]">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-[88rem] flex-1 gap-8 px-6 py-8 md:py-10 lg:gap-12">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 self-start overflow-y-auto border-r border-[color:var(--color-line)] py-4 pr-6 md:block">
          <div className="mb-6">
            <DocsSearch
              locale={key}
              label={t.search}
              placeholder={t.placeholder}
              empty={t.empty}
              hint={t.hint}
            />
          </div>
          <DocsSidebar sections={sections} eyebrow={t.eyebrow} />
        </aside>
        <main className="min-w-0 flex-1 py-4">
          <DocsMobileNav
            sections={sections}
            locale={key}
            strings={{
              search: t.search,
              placeholder: t.placeholder,
              empty: t.empty,
              hint: t.hint,
              eyebrow: t.eyebrow,
              open: t.open,
              close: t.close,
            }}
          />
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
