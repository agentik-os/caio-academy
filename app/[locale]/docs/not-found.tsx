import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

type Locale = "fr" | "en";

const T = {
  fr: {
    eyebrow: "Erreur 404",
    title: "Page introuvable",
    lead: "Cette page n'existe pas ou a été déplacée. Utilisez l'un des liens ci-dessous pour reprendre votre lecture.",
    backToDocs: "Retour à la documentation",
    backToHome: "Retour à l'accueil",
  },
  en: {
    eyebrow: "Error 404",
    title: "Page not found",
    lead: "This page doesn't exist or has been moved. Use one of the links below to continue reading.",
    backToDocs: "Back to documentation",
    backToHome: "Back to home",
  },
} as const;

export default async function DocsNotFound() {
  const locale = (await getLocale()) as Locale;
  const key: Locale = locale in T ? locale : "fr";
  const t = T[key];
  return (
    <article className="flex min-h-[50vh] flex-col items-start justify-center">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
        {t.eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
        {t.title}
      </h1>
      <p className="mt-6 max-w-prose font-serif text-lg leading-relaxed text-[color:var(--color-ink)]">
        {t.lead}
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/docs"
          className="border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-paper)] transition-colors hover:bg-[color:var(--color-paper)] hover:text-[color:var(--color-ink)]"
        >
          {t.backToDocs}
        </Link>
        <Link
          href="/"
          className="border border-[color:var(--color-ink)] px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]"
        >
          {t.backToHome}
        </Link>
      </div>
    </article>
  );
}
