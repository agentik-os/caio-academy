import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Prose } from "@/components/prose";
import { DocsToc, type TocItem } from "@/components/docs/docs-toc";
import { routing } from "@/i18n/routing";
import {
  SECTION_META,
  escapeMdx,
  getDoc,
  getNeighbors,
  getStaticDocParams,
} from "@/lib/docs";

export function generateStaticParams() {
  const docs = getStaticDocParams();
  const out: { locale: string; section: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const d of docs) {
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
    backToSection: "Retour",
  },
  en: {
    prev: "Previous",
    next: "Next",
    onThisPage: "On this page",
    backToSection: "Back",
  },
} as const;

function extractToc(content: string): TocItem[] {
  const toc: TocItem[] = [];
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

  // Strip the leading `# Title` so we don't render two identical H1s
  // (one in the page header, one at the top of the prose body).
  const bodySource = doc.content.replace(/^\s*#\s+[^\n]+\n+/, "");
  const safeSource = escapeMdx(bodySource);
  const { content } = await compileMDX({
    source: safeSource,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: { light: "github-light", dark: "github-dark" },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });

  const toc = extractToc(doc.content);
  const { prev, next } = getNeighbors(section, slug, key);

  return (
    <article className="flex flex-col">
      <header className="mb-8 border-b border-[color:var(--color-line)] pb-6">
        <nav className="mb-4 flex flex-wrap items-center gap-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
          <Link href="/docs" className="hover:text-[color:var(--color-ink)]">
            Docs
          </Link>
          <span aria-hidden>/</span>
          <Link href={`/docs/${section}`} className="hover:text-[color:var(--color-ink)]">
            {meta.title[key]}
          </Link>
        </nav>
        <h1 className="font-serif text-3xl font-black leading-[1.1] tracking-tight md:text-4xl">
          {doc.title}
        </h1>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
        <Prose className="min-w-0 max-w-[72ch] break-words">{content}</Prose>

        {toc.length > 0 && (
          <aside className="order-first lg:order-last">
            <DocsToc items={toc} label={t.onThisPage} />
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
            <p className="mt-2 font-serif text-base font-bold leading-tight">{prev.title}</p>
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
            <p className="mt-2 font-serif text-base font-bold leading-tight">{next.title}</p>
          </Link>
        ) : (
          <span className="bg-[color:var(--color-paper)] p-6" />
        )}
      </nav>
    </article>
  );
}
