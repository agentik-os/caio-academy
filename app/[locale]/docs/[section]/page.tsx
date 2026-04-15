import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SECTION_META, getDocsTree, getSectionDocs } from "@/lib/docs";

export function generateStaticParams() {
  const tree = getDocsTree();
  const out: { locale: string; section: string }[] = [];
  for (const locale of routing.locales) {
    for (const t of tree) {
      out.push({ locale, section: t.section });
    }
  }
  return out;
}

type Locale = "fr" | "en";

const T = {
  fr: { back: "Documentation", read: "Lire", docs: "documents" },
  en: { back: "Documentation", read: "Read", docs: "documents" },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}): Promise<Metadata> {
  const { locale, section } = await params;
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const meta = SECTION_META[section];
  if (!meta) return {};
  return { title: meta.title[key], description: meta.tagline[key] };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const t = T[key];
  const meta = SECTION_META[section];
  if (!meta) notFound();
  const docs = getSectionDocs(section, key);

  return (
    <div className="flex flex-col gap-10">
      <header className="border-b border-[color:var(--color-line)] pb-8">
        <Link
          href="/docs"
          className="mb-5 inline-flex font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)] transition-colors duration-150 hover:text-[color:var(--color-ink)]"
        >
          ← {t.back}
        </Link>
        <h1 className="max-w-4xl font-serif text-3xl font-black leading-[1.05] tracking-tight md:text-5xl">
          {meta.title[key]}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-[1.7] text-[color:var(--color-muted)]">
          {meta.tagline[key]}
        </p>
        <p className="mt-3 font-sans text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
          {docs.length} {t.docs}
        </p>
      </header>

      <ul className="divide-y divide-[color:var(--color-line)]">
        {docs.map((d, i) => (
          <li key={d.slug}>
            <Link
              href={`/docs/${section}/${d.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 py-6 transition-colors duration-150 hover:bg-[color:var(--color-secondary)]"
            >
              <span className="pl-2 font-serif text-xl font-black leading-none text-[color:var(--color-muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h2 className="font-serif text-lg font-bold leading-tight tracking-tight md:text-2xl">
                  {d.title}
                </h2>
                {d.excerpt && (
                  <p className="mt-1.5 font-sans text-sm leading-[1.6] text-[color:var(--color-muted)] line-clamp-2">
                    {d.excerpt}
                  </p>
                )}
              </div>
              <span className="hidden pr-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-ink)] md:inline">
                {t.read} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
