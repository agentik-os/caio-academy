import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/page-shell";
import { Prose } from "@/components/prose";
import { routing } from "@/i18n/routing";
import {
  getAllFormations,
  getFormation,
  getFormationContent,
  getFormationNeighbors,
  TRACK_LABELS,
} from "@/lib/formations";

export function generateStaticParams() {
  const all = getAllFormations();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const f of all) {
      params.push({ locale, slug: f.slug });
    }
  }
  return params;
}

type Locale = "fr" | "en";

const T = {
  fr: {
    prev: "Précédent",
    next: "Suivant",
    onThisPage: "Sections",
    cta: "S'inscrire à la Beta",
    ctaHref: "/beta",
    track: "Track",
    lang: "Langue",
  },
  en: {
    prev: "Previous",
    next: "Next",
    onThisPage: "Sections",
    cta: "Join the Beta",
    ctaHref: "/beta",
    track: "Track",
    lang: "Language",
  },
} as const;

function extractToc(content: string): { level: 2 | 3; id: string; text: string }[] {
  const toc: { level: 2 | 3; id: string; text: string }[] = [];
  const lines = content.split("\n");
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!m) continue;
    const level = m[1].length === 2 ? 2 : 3;
    const text = m[2].trim();
    const id = text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    toc.push({ level, id, text });
  }
  return toc.slice(0, 30);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = getFormation(slug);
  if (!f) return {};
  return { title: f.title, description: f.summary };
}

export default async function FormationDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const formation = getFormation(slug);
  if (!formation) notFound();

  const source = getFormationContent(slug) ?? `# ${formation.title}\n\n${formation.summary}`;
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: "github-light", keepBackground: false }]],
      },
    },
  });

  const toc = extractToc(source);
  const t = T[key];
  const { prev, next } = getFormationNeighbors(slug);
  const trackLabel = TRACK_LABELS[formation.track][key];

  return (
    <PageShell>
      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 md:py-28">
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            {trackLabel}
          </p>
          <h1 className="max-w-5xl font-serif text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {formation.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-[1.7] text-[color:var(--color-muted)]">
            {formation.summary}
          </p>
        </div>
      </section>

      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_280px]">
          <Prose className="max-w-none">{content}</Prose>

          <aside className="order-first lg:order-last">
            <div className="sticky top-24 flex flex-col gap-8 border-t-2 border-[color:var(--color-ink)] pt-8">
              <div>
                <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                  {t.track}
                </p>
                <p className="mt-2 font-sans text-sm">{trackLabel}</p>
              </div>
              <div>
                <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                  {t.lang}
                </p>
                <p className="mt-2 font-sans text-sm uppercase tracking-wider">{formation.lang}</p>
              </div>
              {toc.length > 0 && (
                <div>
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
              )}
              <Link
                href={t.ctaHref}
                className="mt-4 inline-flex items-center border border-[color:var(--color-ink)] px-4 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-150 hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]"
              >
                {t.cta} →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <nav className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto flex max-w-7xl items-stretch gap-px bg-[color:var(--color-line)]">
          <Link
            href={`/formations/${prev.slug}`}
            className="flex-1 bg-[color:var(--color-paper)] p-6 transition-colors duration-150 hover:bg-[color:var(--color-secondary)]"
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              ← {t.prev}
            </p>
            <p className="mt-2 font-serif text-lg font-bold leading-tight">{prev.title}</p>
          </Link>
          <Link
            href={`/formations/${next.slug}`}
            className="flex-1 bg-[color:var(--color-paper)] p-6 text-right transition-colors duration-150 hover:bg-[color:var(--color-secondary)]"
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              {t.next} →
            </p>
            <p className="mt-2 font-serif text-lg font-bold leading-tight">{next.title}</p>
          </Link>
        </div>
      </nav>
    </PageShell>
  );
}
