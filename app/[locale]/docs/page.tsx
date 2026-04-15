import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getSectionsIndex } from "@/lib/docs";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Locale = "fr" | "en";

const T = {
  fr: {
    metaTitle: "Documentation",
    metaDescription:
      "Base de connaissance CAIO Academy — vision, avatars, produit, playbook, opérations.",
    eyebrow: "Base de connaissance",
    title: "Documentation",
    lead: "Tout le savoir-faire CAIO Academy en accès libre. Dix sections, une seule source de vérité.",
    browse: "Parcourir",
    docs: "docs",
  },
  en: {
    metaTitle: "Documentation",
    metaDescription:
      "CAIO Academy knowledge base — vision, avatars, product, playbook, operations.",
    eyebrow: "Knowledge base",
    title: "Documentation",
    lead: "The entire CAIO Academy corpus, publicly readable. Ten sections, one source of truth.",
    browse: "Browse",
    docs: "docs",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = T[(locale as Locale) in T ? (locale as Locale) : "fr"];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function DocsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const t = T[key];
  const sections = getSectionsIndex(key);
  const total = sections.reduce((n, s) => n + s.count, 0);

  return (
    <div className="flex flex-col gap-12">
      <header className="border-b border-[color:var(--color-line)] pb-10">
        <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
          {t.eyebrow}
        </p>
        <h1 className="max-w-4xl font-serif text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-[1.7] text-[color:var(--color-muted)]">
          {t.lead}
        </p>
        <p className="mt-3 font-sans text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
          {sections.length} sections · {total} {t.docs}
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-px bg-[color:var(--color-line)] md:grid-cols-2">
        {sections.map((s) => (
          <li key={s.key} className="bg-[color:var(--color-paper)]">
            <Link
              href={`/docs/${s.key}`}
              className="group flex h-full flex-col gap-3 p-6 transition-colors duration-150 hover:bg-[color:var(--color-secondary)]"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-black leading-none text-[color:var(--color-muted)]">
                  {String(s.order).padStart(2, "0")}
                </span>
                <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                  {s.count} {t.docs}
                </span>
              </div>
              <h2 className="font-serif text-xl font-bold leading-tight tracking-tight md:text-2xl">
                {s.title}
              </h2>
              <p className="font-sans text-sm leading-[1.6] text-[color:var(--color-muted)]">
                {s.tagline}
              </p>
              <span className="mt-auto font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-ink)]">
                {t.browse} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
