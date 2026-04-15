import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ConvexHttpClient } from "convex/browser";
import { PageShell } from "@/components/page-shell";
import { routing } from "@/i18n/routing";
import { getSectionDocs, SECTION_META } from "@/lib/docs";
import { PodcastListItem, type PodcastItemData } from "@/components/podcast-list-item";
import { api } from "@/convex/_generated/api";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Locale = "fr" | "en";

const T = {
  fr: {
    metaTitle: "Podcast",
    metaDescription:
      "Chaque document CAIO Academy en version audio. Généré à la demande.",
    eyebrow: "Audio",
    title: "Podcast.",
    lead: "Chaque doc CAIO Academy en version audio. Générez à la demande, écoutez ensuite.",
    count: "épisodes",
    generate: "Générer",
    generating: "Génération…",
    ready: "Écouter",
    error: "Erreur",
    open: "Épisode",
    sectionsLabel: "Sections",
    emptyState:
      "Aucun épisode n'a encore été généré. Cliquez sur « Générer » pour créer l'audio à la demande.",
  },
  en: {
    metaTitle: "Podcast",
    metaDescription:
      "Every CAIO Academy doc as an audio episode. Generated on demand.",
    eyebrow: "Audio",
    title: "Podcast.",
    lead: "Every CAIO Academy doc as an audio episode. Generate on demand, listen in.",
    count: "episodes",
    generate: "Generate",
    generating: "Generating…",
    ready: "Listen",
    error: "Error",
    open: "Episode",
    sectionsLabel: "Sections",
    emptyState:
      "No episodes generated yet. Click \"Generate\" to create the audio on demand.",
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

async function loadPodcastIndex(lang: Locale) {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return new Map<string, { status: string; audioUrl: string; durationSec: number }>();
  try {
    const client = new ConvexHttpClient(url);
    const rows = await client.query(api.podcasts.listByLang, { lang });
    const map = new Map<string, { status: string; audioUrl: string; durationSec: number }>();
    for (const r of rows) {
      map.set(r.docSlug, {
        status: r.status,
        audioUrl: r.audioUrl,
        durationSec: r.durationSec,
      });
    }
    return map;
  } catch {
    return new Map<string, { status: string; audioUrl: string; durationSec: number }>();
  }
}

export default async function PodcastHub({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const t = T[key];

  const sectionsKeys = Object.keys(SECTION_META);
  const allSections = sectionsKeys.map((sKey) => {
    const docs = getSectionDocs(sKey, key);
    return {
      key: sKey,
      title: SECTION_META[sKey]?.title[key] ?? sKey,
      docs,
    };
  }).filter((s) => s.docs.length > 0);

  const podcastMap = await loadPodcastIndex(key);

  const items: { sectionKey: string; sectionTitle: string; data: PodcastItemData }[] = [];
  for (const s of allSections) {
    for (const d of s.docs) {
      const fullSlug = `${d.section}/${d.slug}`;
      const podcast = podcastMap.get(fullSlug);
      const status: PodcastItemData["status"] = podcast
        ? (podcast.status as PodcastItemData["status"])
        : "none";
      items.push({
        sectionKey: s.key,
        sectionTitle: s.title,
        data: {
          docSlug: fullSlug,
          section: s.key,
          sectionTitle: s.title,
          title: d.title,
          excerpt: d.excerpt,
          href: `/podcast/${fullSlug}`,
          status,
          audioUrl: podcast?.audioUrl,
          durationSec: podcast?.durationSec,
        },
      });
    }
  }

  const total = items.length;
  const ready = items.filter((i) => i.data.status === "ready").length;

  return (
    <PageShell>
      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            {t.eyebrow}
          </p>
          <h1 className="max-w-5xl font-serif text-4xl font-black leading-[1.05] tracking-tight md:text-7xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-[1.7] text-[color:var(--color-muted)]">
            {t.lead}
          </p>
          <p className="mt-3 font-sans text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
            {total} {t.count} · {ready} {t.ready.toLowerCase()}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16">
          {allSections.map((s) => {
            const sectionItems = items.filter((i) => i.sectionKey === s.key);
            if (sectionItems.length === 0) return null;
            return (
              <div key={s.key} className="mb-16">
                <h2 className="mb-2 border-b border-[color:var(--color-line)] pb-4 font-serif text-2xl font-bold tracking-tight md:text-3xl">
                  {s.title}
                </h2>
                <ul>
                  {sectionItems.map((it) => (
                    <PodcastListItem
                      key={it.data.docSlug}
                      item={it.data}
                      locale={key}
                      labels={{
                        generate: t.generate,
                        generating: t.generating,
                        ready: t.ready,
                        error: t.error,
                        open: t.open,
                      }}
                    />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
