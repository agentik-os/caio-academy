import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SidebarNav, type SidebarNode } from "@/components/sidebar-nav";
import { Prose } from "@/components/prose";
import { routing } from "@/i18n/routing";
import {
  SECTION_META,
  escapeMdx,
  getDoc,
  getDocsTree,
  getNeighbors,
  getStaticDocParams,
} from "@/lib/docs";

export function generateStaticParams() {
  const docs = getStaticDocParams();
  const out: { locale: string; section: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const d of docs) {
      // neutral and matching-locale docs render on both locales via fallback
      // skip opposite-locale-only docs for a given locale (they won't resolve here)
      if (d.lang !== "neutral" && d.lang !== locale) {
        // check if a neutral or matching variant exists for this (section, slug)
        // since docs from getStaticDocParams are unique per (section,slug), we
        // still render the page on the other locale via fallback in getDoc.
      }
      out.push({ locale, section: d.section, slug: d.slug });
    }
  }
  return out;
}

type Locale = "fr" | "en";

const T = {
  fr: {
    prev: "Précédent",
    next: "Suivant",
    onThisPage: "Sur cette page",
    eyebrow: "Documentation",
    backToSection: "Retour",
  },
  en: {
    prev: "Previous",
    next: "Next",
    onThisPage: "On this page",
    eyebrow: "Documentation",
    backToSection: "Back",
  },
} as const;

function extractToc(content: string): { level: 2 | 3; id: string; text: string }[] {
  const toc: { level: 2 | 3; id: string; text: string }[] = [];
  const lines = content.split("\n");
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!m) continue;
    const level = m[1].length === 2 ? 2 : 3;
    const text = m[2].trim().replace(/[`*_]/g, "");
    const id = text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (!id) continue;
    toc.push({ level, id, text });
  }
  return toc.slice(0, 40);
}

function buildSidebar(locale: Locale, activeSection: string): SidebarNode[] {
  const tree = getDocsTree();
  return tree.map((t) => ({
    label: SECTION_META[t.section]?.title[locale] ?? t.section,
    href: `/${locale}/docs/${t.section}`,
    children:
      t.section === activeSection
        ? t.docs
            // unique slugs — prefer locale variant if duplicates exist
            .reduce<typeof t.docs>((acc, d) => {
              if (!acc.find((x) => x.slug === d.slug)) acc.push(d);
              return acc;
            }, [])
            .map((d) => ({
              label: d.title,
              href: `/${locale}/docs/${t.section}/${d.slug}`,
            }))
        : undefined,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, section, slug } = await params;
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const doc = getDoc(section, slug, key);
  if (!doc) return {};
  return { title: doc.title, description: doc.excerpt };
}

export default async function DocDetail({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>;
}) {
  const { locale, section, slug } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const t = T[key];
  const doc = getDoc(section, slug, key);
  if (!doc) notFound();
  const meta = SECTION_META[section];
  if (!meta) notFound();

  const safeSource = escapeMdx(doc.content);
  const { content } = await compileMDX({
    source: safeSource,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: "github-light", keepBackground: false }]],
      },
    },
  });

  const toc = extractToc(doc.content);
  const { prev, next } = getNeighbors(section, slug, key);
  const sidebar = buildSidebar(key, section);

  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--color-paper)] text-[color:var(--color-ink)]">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-10 px-6 py-10 md:py-14">
        <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-72 shrink-0 overflow-y-auto border-r border-[color:var(--color-line)] pr-6 md:block">
          <p className="mb-6 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
            {t.eyebrow}
          </p>
          <SidebarNav items={sidebar} />
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-8">
            <Link
              href={`/docs/${section}`}
              className="mb-3 inline-flex font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)] transition-colors duration-150 hover:text-[color:var(--color-ink)]"
            >
              {meta.title[key]} ·{" "}
              <span className="ml-2 underline-offset-4 hover:underline">← {t.backToSection}</span>
            </Link>
            <h1 className="mt-2 font-serif text-3xl font-black leading-[1.1] tracking-tight md:text-5xl">
              {doc.title}
            </h1>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
            <Prose className="max-w-none">{content}</Prose>

            {toc.length > 0 && (
              <aside className="order-first lg:order-last">
                <div className="sticky top-24 border-t-2 border-[color:var(--color-ink)] pt-6">
                  <p className="mb-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                    {t.onThisPage}
                  </p>
                  <ul className="flex flex-col gap-2 border-l border-[color:var(--color-line)]">
                    {toc.map((item, i) => (
                      <li
                        key={`${item.id}-${i}`}
                        className={item.level === 3 ? "pl-6" : "pl-3"}
                      >
                        <a
                          href={`#${item.id}`}
                          className="font-sans text-xs leading-relaxed text-[color:var(--color-muted)] transition-colors duration-150 hover:text-[color:var(--color-ink)]"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>

          <nav className="mt-16 grid gap-px border-t border-[color:var(--color-line)] bg-[color:var(--color-line)] md:grid-cols-2">
            {prev ? (
              <Link
                href={`/docs/${section}/${prev.slug}`}
                className="bg-[color:var(--color-paper)] p-6 transition-colors duration-150 hover:bg-[color:var(--color-secondary)]"
              >
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                  ← {t.prev}
                </p>
                <p className="mt-2 font-serif text-lg font-bold leading-tight">{prev.title}</p>
              </Link>
            ) : (
              <span className="bg-[color:var(--color-paper)] p-6" />
            )}
            {next ? (
              <Link
                href={`/docs/${section}/${next.slug}`}
                className="bg-[color:var(--color-paper)] p-6 text-right transition-colors duration-150 hover:bg-[color:var(--color-secondary)]"
              >
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                  {t.next} →
                </p>
                <p className="mt-2 font-serif text-lg font-bold leading-tight">{next.title}</p>
              </Link>
            ) : (
              <span className="bg-[color:var(--color-paper)] p-6" />
            )}
          </nav>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
