import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { routing } from "@/i18n/routing";
import { AVATARS } from "@/lib/avatars";
import { getAllFormations, TRACK_LABELS, type Formation } from "@/lib/formations";
import { FormationsFilter } from "@/components/formations-filter";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Locale = "fr" | "en";

const CONTENT = {
  fr: {
    metaTitle: "Formations",
    metaDescription:
      "Catalogue complet : 11 modules C-Suite, 10 courses EN, 13 formations FR — certifiables, bilingues, mis à jour trimestriellement.",
    eyebrow: "Catalogue",
    title: "Formations.",
    lead: (n: number) =>
      `${n} modules · 3 tracks · certifiables. Les concepts restent stables, la stack est mise à jour chaque trimestre.`,
    track: "Track",
    avatar: "Avatar",
    search: "Recherche",
    all: "Tous",
    empty: "Aucune formation ne correspond à ces filtres.",
    view: "Voir",
    searchPlaceholder: "Titre, mot-clé…",
  },
  en: {
    metaTitle: "Programmes",
    metaDescription:
      "Full catalogue: 11 C-Suite modules, 10 EN courses, 13 FR programmes — certifiable, bilingual, updated quarterly.",
    eyebrow: "Catalogue",
    title: "Programmes.",
    lead: (n: number) =>
      `${n} modules · 3 tracks · certifiable. Concepts stay stable, the stack is refreshed every quarter.`,
    track: "Track",
    avatar: "Avatar",
    search: "Search",
    all: "All",
    empty: "No programme matches these filters.",
    view: "Open",
    searchPlaceholder: "Title, keyword…",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) in CONTENT ? (locale as Locale) : "fr"];
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function FormationsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in CONTENT ? (locale as Locale) : "fr";
  const c = CONTENT[key];

  const all = getAllFormations();
  const cards = all.map((f: Formation) => ({
    slug: f.slug,
    track: f.track,
    lang: f.lang,
    title: f.title,
    summary: f.summary,
    avatar: f.avatar,
  }));

  const trackLabels = {
    "c-suite": TRACK_LABELS["c-suite"][key],
    "course-en": TRACK_LABELS["course-en"][key],
    "formation-fr": TRACK_LABELS["formation-fr"][key],
  };

  const avatarOptions = AVATARS.map((a) => ({ slug: a.slug, label: a.title[key] }));

  return (
    <PageShell>
      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            {c.eyebrow}
          </p>
          <h1 className="max-w-5xl font-serif text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            {c.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-[1.7] text-[color:var(--color-muted)] md:text-xl">
            {c.lead(all.length)}
          </p>
        </div>
      </section>

      <section className="border-b border-[color:var(--color-line)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <FormationsFilter
            formations={cards}
            avatarOptions={avatarOptions}
            trackLabels={trackLabels}
            labels={{
              track: c.track,
              avatar: c.avatar,
              search: c.search,
              all: c.all,
              empty: c.empty,
              view: c.view,
              searchPlaceholder: c.searchPlaceholder,
            }}
          />
        </div>
      </section>
    </PageShell>
  );
}
