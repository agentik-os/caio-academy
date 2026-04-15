import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Prose } from "@/components/prose";
import { routing } from "@/i18n/routing";
import { escapeMdx } from "@/lib/docs";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const META = {
  fr: {
    title: "Playbook Marketing",
    description:
      "L'arsenal marketing de CAIO Academy. Outils, tactiques et scripts d'acquisition.",
    eyebrow: "Playbook",
    heading: "Arsenal Marketing — Outils & Tactiques",
    lead: "L'inventaire complet des outils marketing, tactiques d'acquisition et scripts opérationnels.",
  },
  en: {
    title: "Marketing Playbook",
    description:
      "CAIO Academy's marketing arsenal. Acquisition tools, tactics and scripts.",
    eyebrow: "Playbook",
    heading: "Marketing Arsenal — Tools & Tactics",
    lead: "The complete inventory of marketing tools, acquisition tactics and operating scripts.",
  },
} as const;

type Locale = "fr" | "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const k: Locale = (locale as Locale) in META ? (locale as Locale) : "fr";
  return { title: META[k].title, description: META[k].description };
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const k: Locale = (locale as Locale) in META ? (locale as Locale) : "fr";
  const c = META[k];

  const file = path.join(
    process.cwd(),
    "content",
    "caio",
    "08-marketing",
    "01-Marketing-Tools-Arsenal.md",
  );
  const source = fs.readFileSync(file, "utf8");
  const { content } = await compileMDX({
    source: escapeMdx(source),
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

  return (
    <PageShell>
      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20 md:py-28">
          <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
            {c.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {c.heading}
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg md:text-xl">
            {c.lead}
          </p>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
          <Prose className="min-w-0 max-w-none break-words">{content}</Prose>
        </div>
      </section>
    </PageShell>
  );
}
