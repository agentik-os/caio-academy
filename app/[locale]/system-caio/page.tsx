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
    title: "Système CAIO",
    description:
      "Architecture Système et Orchestration IA par rôle C-Suite. Le whitepaper complet du CAIO.",
    eyebrow: "Whitepaper",
    heading: "Système CAIO — Architecture & Orchestration",
    lead: "Le guide complet pour orchestrer une intelligence artificielle distribuée à l'échelle du C-Suite.",
  },
  en: {
    title: "CAIO System",
    description:
      "System architecture and AI orchestration by C-Suite role. The complete CAIO whitepaper.",
    eyebrow: "Whitepaper",
    heading: "CAIO System — Architecture & Orchestration",
    lead: "The complete guide to orchestrating distributed AI at C-Suite scale.",
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

export default async function SystemCaioPage({
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
    "03-product",
    "01-System-CAIO-Whitepaper.md",
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
