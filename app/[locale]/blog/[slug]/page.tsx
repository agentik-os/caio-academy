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
import { escapeMdx } from "@/lib/docs";
import { getBlogPost, getBlogStaticParams } from "@/lib/blog";

export function generateStaticParams() {
  const slugs = getBlogStaticParams();
  const out: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const s of slugs) {
      out.push({ locale, slug: s.slug });
    }
  }
  return out;
}

type Locale = "fr" | "en";

const T = {
  fr: {
    blog: "Blog",
    onThisPage: "Sur cette page",
    back: "Retour au blog",
    min: "min de lecture",
  },
  en: {
    blog: "Blog",
    onThisPage: "On this page",
    back: "Back to blog",
    min: "min read",
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
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const post = getBlogPost(slug, key);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const t = T[key];
  const post = getBlogPost(slug, key);
  if (!post) notFound();

  const safeSource = escapeMdx(post.content);
  const { content } = await compileMDX({
    source: safeSource,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [rehypePrettyCode, { theme: "github-light", keepBackground: false }],
        ],
      },
    },
  });

  const toc = extractToc(post.content);

  return (
    <article className="flex flex-col">
      {/* Header */}
      <header className="mb-8 border-b border-[color:var(--color-line)] pb-6">
        <nav className="mb-4 flex flex-wrap items-center gap-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
          <Link href="/blog" className="hover:text-[color:var(--color-ink)]">
            {t.blog}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-[color:var(--color-ink)]">{post.title}</span>
        </nav>
        <h1 className="font-serif text-3xl font-black leading-[1.1] tracking-tight md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
          {post.readingTime} {t.min} &middot;{" "}
          {post.lang === "neutral" ? "FR/EN" : post.lang.toUpperCase()}
        </p>
      </header>

      {/* Content + TOC */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
        <Prose className="min-w-0 max-w-none break-words">{content}</Prose>

        {toc.length > 0 && (
          <aside className="order-first lg:order-last">
            <DocsToc items={toc} label={t.onThisPage} />
          </aside>
        )}
      </div>

      {/* Back link */}
      <div className="mt-16 border-t border-[color:var(--color-line)] pt-8">
        <Link
          href="/blog"
          className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)] transition-colors duration-150 hover:text-[color:var(--color-ink)]"
        >
          &larr; {t.back}
        </Link>
      </div>
    </article>
  );
}
