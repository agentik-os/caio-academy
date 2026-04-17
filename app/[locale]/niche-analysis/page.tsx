import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { Stat } from "@/components/stat";
import { routing } from "@/i18n/routing";
import {
  nicheAnalysis,
  samouraiVoice,
  getChannelOrder,
  formatNumber,
  type ChannelSummary,
} from "@/lib/niche-analysis";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Locale = "fr" | "en";

const CONTENT = {
  fr: {
    metaTitle: "Niche Analysis YouTube — CAIO Academy",
    metaDescription:
      "Analyse forensique de 322 vidéos et 63 outliers sur 7 chaînes IA francophones et anglophones. Positionnement Chief AI Officer, modèle vocal Le SamourAI, stratégie ICE.",
    eyebrow: "Niche Analysis",
    title: "Le champ de bataille YouTube IA.",
    lead: "322 vidéos scannées. 63 outliers. Zéro concurrent sur la verticale Chief AI Officer. Ce document est la carte stratégique de la chaîne.",
    updated: "Mis à jour",
    kpiLabels: {
      channels: "Chaînes analysées",
      videos: "Vidéos scannées",
      outliers: "Outliers (≥ 2× médiane)",
      views: "Vues cumulées",
      niche: "Niche",
      gap: "Gap identifié",
      voice: "Modèle vocal principal",
    },
    sections: {
      tips: {
        eyebrow: "Recommandations",
        title: "14 actions ICE-scorées.",
        lead: "Chaque action est évaluée sur Impact × Confiance × Facilité. Commence par le haut, exécute en séquence.",
      },
      topics: {
        eyebrow: "Topics",
        title: "Performance par thème.",
        lead: "Taux d'outlier = proportion de vidéos dépassant 2× la médiane locale. Regarde ce qui performe avant de choisir un angle.",
      },
      patterns: {
        eyebrow: "Titres",
        title: "Structures de titre qui gagnent.",
        lead: "La moyenne de vues par pattern, sur l'ensemble du corpus. Le \"Comprehensive course\" (4h+) écrase tout.",
      },
      outliers: {
        eyebrow: "Top 30",
        title: "Les vidéos qui percent.",
        lead: "Trié par ratio vs médiane locale. Clique pour ouvrir chaque outlier sur YouTube.",
      },
      thumbnails: {
        eyebrow: "Thumbnails",
        title: "Ce qui fonctionne à l'œil nu.",
      },
      hooks: {
        eyebrow: "Hooks",
        title: "5 structures d'ouverture validées.",
        lead: "Les 30 premières secondes déterminent 80% du watch time. Ces structures se retrouvent systématiquement chez les outliers.",
        avoid: "À bannir",
      },
      channels: {
        eyebrow: "Deep dives",
        title: "Analyse chaîne par chaîne.",
        lead: "Samourai en premier — c'est le modèle vocal CAIO. Les autres sont des références de technique et de volume.",
        subs: "abonnés",
        videos: "vidéos",
        avgViews: "vues moyennes",
        median: "médiane",
        whatWorks: "Ce qui fonctionne",
        whatDoesntWork: "Ce qui ne fonctionne pas",
      },
      samouraiVoice: {
        eyebrow: "Voice model",
        title: "La voix SamourAI — décodée.",
        lead: "Positionnement, rhétorique, structure, lexique, CTA. C'est la grille qui alimente le Content Generator.",
        positioning: "Positionnement",
        themes: "Thèmes récurrents",
        hookFormulas: "Formules de hook",
        structure: "Structure type",
        cta: "Style CTA",
        rhetoric: "Patterns rhétoriques",
      },
      gap: {
        eyebrow: "Gap analysis",
        title: "Où personne ne joue.",
        competitors: "Ce que font les concurrents",
        nobody: "Ce que personne ne fait",
        edge: "Avantage CAIO",
      },
      strategy: {
        eyebrow: "Plan d'exécution",
        title: "Cette semaine · Ce mois · Ce trimestre.",
        lead: "Trois horizons. Chaque ligne est une action datée, pas une idée.",
        week: "Cette semaine",
        month: "Ce mois",
        quarter: "Ce trimestre",
      },
      integrity: {
        eyebrow: "Data integrity",
        title: "Transparence sur les limites.",
      },
    },
    openYoutube: "Ouvrir sur YouTube",
    primaryBadge: "Modèle vocal",
  },
  en: {
    metaTitle: "YouTube Niche Analysis — CAIO Academy",
    metaDescription:
      "Forensic analysis of 322 videos and 63 outliers across 7 FR/EN AI channels. Chief AI Officer positioning, Le SamourAI voice model, ICE-scored strategy.",
    eyebrow: "Niche Analysis",
    title: "The YouTube AI battlefield.",
    lead: "322 videos scanned. 63 outliers. Zero competitor on the Chief AI Officer vertical. This is the channel's strategic map.",
    updated: "Updated",
    kpiLabels: {
      channels: "Channels analyzed",
      videos: "Videos scanned",
      outliers: "Outliers (≥ 2× median)",
      views: "Total views",
      niche: "Niche",
      gap: "Gap identified",
      voice: "Primary voice model",
    },
    sections: {
      tips: {
        eyebrow: "Recommendations",
        title: "14 ICE-scored actions.",
        lead: "Each action is scored Impact × Confidence × Ease. Start at the top, execute in order.",
      },
      topics: {
        eyebrow: "Topics",
        title: "Performance by theme.",
        lead: "Outlier rate = share of videos beating 2× local median. Pick the angle AFTER looking at this.",
      },
      patterns: {
        eyebrow: "Titles",
        title: "Title structures that win.",
        lead: "Average views per pattern, full corpus. The \"Comprehensive course\" (4h+) crushes everything.",
      },
      outliers: {
        eyebrow: "Top 30",
        title: "The videos that broke through.",
        lead: "Sorted by ratio vs local median. Click to open each outlier on YouTube.",
      },
      thumbnails: {
        eyebrow: "Thumbnails",
        title: "What works at a glance.",
      },
      hooks: {
        eyebrow: "Hooks",
        title: "5 proven opening structures.",
        lead: "The first 30 seconds drive 80% of watch time. These structures recur across every outlier.",
        avoid: "Avoid",
      },
      channels: {
        eyebrow: "Deep dives",
        title: "Channel by channel.",
        lead: "Samourai first — the CAIO voice model. Others are craft and volume references.",
        subs: "subscribers",
        videos: "videos",
        avgViews: "avg views",
        median: "median",
        whatWorks: "What works",
        whatDoesntWork: "What doesn't",
      },
      samouraiVoice: {
        eyebrow: "Voice model",
        title: "The SamourAI voice — decoded.",
        lead: "Positioning, rhetoric, structure, lexicon, CTA. The grid that powers the Content Generator.",
        positioning: "Positioning",
        themes: "Recurring themes",
        hookFormulas: "Hook formulas",
        structure: "Template structure",
        cta: "CTA style",
        rhetoric: "Rhetorical patterns",
      },
      gap: {
        eyebrow: "Gap analysis",
        title: "Where nobody plays.",
        competitors: "What competitors do",
        nobody: "What nobody does",
        edge: "CAIO edge",
      },
      strategy: {
        eyebrow: "Execution plan",
        title: "This week · This month · This quarter.",
        lead: "Three horizons. Each line is a dated action, not an idea.",
        week: "This week",
        month: "This month",
        quarter: "This quarter",
      },
      integrity: {
        eyebrow: "Data integrity",
        title: "Honest about the limits.",
      },
    },
    openYoutube: "Open on YouTube",
    primaryBadge: "Voice model",
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

export default async function NicheAnalysisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in CONTENT ? (locale as Locale) : "fr";
  const c = CONTENT[key];

  const { kpis, iceTips, topicPerformance, titlePatterns, top30Outliers, thumbnailPatterns, hookAnalysis, channelSummaries, gapAnalysis, strategy, dataIntegrity, updatedAt } = nicheAnalysis;

  const channelOrder = getChannelOrder();

  const updatedDate = new Date(updatedAt).toLocaleDateString(
    locale === "en" ? "en-US" : "fr-FR",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <PageShell>
      {/* HERO */}
      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24 md:py-36">
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            {c.eyebrow} · {c.updated} {updatedDate}
          </p>
          <h1 className="max-w-5xl font-serif text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {c.title}
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[color:var(--color-muted)] sm:text-lg md:text-xl">
            {c.lead}
          </p>
        </div>
      </section>

      {/* KPI GRID */}
      <section className="border-b border-[color:var(--color-line)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
            <Stat value={kpis.channelsAnalyzed} label={c.kpiLabels.channels} />
            <Stat value={kpis.videosScanned} label={c.kpiLabels.videos} />
            <Stat value={kpis.outliersIdentified} label={c.kpiLabels.outliers} />
            <Stat
              value={formatNumber(kpis.totalViewsAnalyzed)}
              label={c.kpiLabels.views}
            />
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <KpiBlock label={c.kpiLabels.niche} value={kpis.niche} />
            <KpiBlock label={c.kpiLabels.gap} value={kpis.gapIdentified} />
            <KpiBlock label={c.kpiLabels.voice} value={kpis.primaryVoiceModel} />
          </div>
        </div>
      </section>

      {/* ICE TIPS */}
      <Section
        eyebrow={c.sections.tips.eyebrow}
        title={c.sections.tips.title}
        lead={c.sections.tips.lead}
      >
        <ol className="divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
          {iceTips.map((tip) => (
            <li key={tip.rank} className="grid grid-cols-12 gap-4 py-6">
              <div className="col-span-12 md:col-span-1">
                <div className="font-serif text-3xl font-black">{tip.rank}</div>
              </div>
              <div className="col-span-12 md:col-span-8">
                <div className="font-serif text-xl font-bold leading-tight">
                  {tip.action}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {tip.reasoning}
                </p>
              </div>
              <div className="col-span-12 flex items-start justify-start gap-6 md:col-span-3 md:justify-end">
                <IceCell label="I" value={tip.impact} />
                <IceCell label="C" value={tip.confidence} />
                <IceCell label="E" value={tip.ease} />
                <div className="border-l border-[color:var(--color-ink)] pl-4">
                  <div className="font-serif text-2xl font-black">{tip.ice}</div>
                  <div className="font-sans text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                    ICE
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* TOPIC PERFORMANCE */}
      <Section
        eyebrow={c.sections.topics.eyebrow}
        title={c.sections.topics.title}
        lead={c.sections.topics.lead}
      >
        <div className="overflow-x-auto border border-[color:var(--color-line)]">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-[color:var(--color-paper-alt,transparent)]">
              <tr className="border-b border-[color:var(--color-line)] text-left">
                <Th>Topic</Th>
                <Th right>Videos</Th>
                <Th right>Outliers</Th>
                <Th right>Rate</Th>
                <Th right>Avg views</Th>
              </tr>
            </thead>
            <tbody>
              {topicPerformance.map((t) => (
                <tr
                  key={t.topic}
                  className="border-b border-[color:var(--color-line)] last:border-b-0"
                >
                  <Td>{t.topic}</Td>
                  <Td right>{t.count}</Td>
                  <Td right>{t.outliers}</Td>
                  <Td right>
                    <span
                      className={
                        t.rate >= 25
                          ? "font-bold"
                          : t.rate === 0
                            ? "text-[color:var(--color-muted)]"
                            : undefined
                      }
                    >
                      {t.rate.toFixed(1)}%
                    </span>
                  </Td>
                  <Td right>{formatNumber(t.avgViews)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* TITLE PATTERNS */}
      <Section
        eyebrow={c.sections.patterns.eyebrow}
        title={c.sections.patterns.title}
        lead={c.sections.patterns.lead}
      >
        <div className="overflow-x-auto border border-[color:var(--color-line)]">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[color:var(--color-line)] text-left">
                <Th>Pattern</Th>
                <Th right>Count</Th>
                <Th right>Avg views</Th>
                <Th right>Share</Th>
              </tr>
            </thead>
            <tbody>
              {titlePatterns.map((p) => {
                const total = titlePatterns.reduce((s, x) => s + x.count, 0);
                const share = total > 0 ? (p.count / total) * 100 : 0;
                return (
                  <tr
                    key={p.pattern}
                    className="border-b border-[color:var(--color-line)] last:border-b-0"
                  >
                    <Td>{p.pattern}</Td>
                    <Td right>{p.count}</Td>
                    <Td right>
                      <span className="font-semibold">
                        {formatNumber(p.avgViews)}
                      </span>
                    </Td>
                    <Td right>{share.toFixed(1)}%</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* TOP 30 OUTLIERS */}
      <Section
        eyebrow={c.sections.outliers.eyebrow}
        title={c.sections.outliers.title}
        lead={c.sections.outliers.lead}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {top30Outliers.map((v) => (
            <a
              key={v.id}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-[color:var(--color-line)] transition hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]"
            >
              <div className="relative aspect-video w-full overflow-hidden border-b border-[color:var(--color-line)] bg-black">
                <Image
                  src={v.thumbnail}
                  alt={v.title}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute left-0 top-0 bg-black px-2 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                  #{v.rank}
                </div>
                <div className="absolute right-0 top-0 bg-white px-2 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-black">
                  {v.ratio.toFixed(1)}×
                </div>
              </div>
              <div className="p-5">
                <div className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)] group-hover:text-[color:var(--color-paper)]">
                  {v.channel} · {formatNumber(v.views)} views
                </div>
                <div className="font-serif text-base font-bold leading-snug">
                  {v.title}
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* THUMBNAIL PATTERNS */}
      <Section
        eyebrow={c.sections.thumbnails.eyebrow}
        title={c.sections.thumbnails.title}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
              {locale === "en" ? "Winning patterns" : "Patterns qui gagnent"}
            </h3>
            <ul className="space-y-3">
              {thumbnailPatterns.winning_patterns.map((p, i) => (
                <li
                  key={i}
                  className="flex gap-4 border-l-2 border-[color:var(--color-ink)] pl-4"
                >
                  <span className="font-serif text-base leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
              {locale === "en" ? "Losing patterns" : "Patterns à éviter"}
            </h3>
            <ul className="space-y-3">
              {thumbnailPatterns.losing_patterns.map((p, i) => (
                <li
                  key={i}
                  className="flex gap-4 border-l-2 border-[color:var(--color-muted)] pl-4 text-[color:var(--color-muted)]"
                >
                  <span className="font-serif text-base leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* HOOK ANALYSIS */}
      <Section
        eyebrow={c.sections.hooks.eyebrow}
        title={c.sections.hooks.title}
        lead={c.sections.hooks.lead}
      >
        <ol className="space-y-8">
          {hookAnalysis.winning_structures.map((h, i) => (
            <li
              key={h.name}
              className="grid grid-cols-12 gap-6 border-t border-[color:var(--color-line)] pt-8 first:border-t-0 first:pt-0"
            >
              <div className="col-span-12 md:col-span-1">
                <div className="font-serif text-4xl font-black">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="col-span-12 md:col-span-11">
                <h3 className="font-serif text-2xl font-bold">{h.name}</h3>
                <p className="mt-2 leading-relaxed text-[color:var(--color-muted)]">
                  {h.description}
                </p>
                <blockquote className="mt-5 border-l-2 border-[color:var(--color-ink)] pl-5 font-serif text-base italic leading-relaxed">
                  {h.example}
                </blockquote>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-16 border-t border-[color:var(--color-line)] pt-8">
          <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            {c.sections.hooks.avoid}
          </h3>
          <ul className="space-y-2">
            {hookAnalysis.avoid.map((a, i) => (
              <li key={i} className="text-base leading-relaxed text-[color:var(--color-muted)]">
                — {a}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* CHANNEL DEEP DIVES */}
      <Section
        eyebrow={c.sections.channels.eyebrow}
        title={c.sections.channels.title}
        lead={c.sections.channels.lead}
      >
        <div className="space-y-16">
          {channelOrder.map((slug) => {
            const ch = channelSummaries[slug] as ChannelSummary;
            return (
              <article
                key={slug}
                className="border-t border-[color:var(--color-ink)] pt-10"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl font-black tracking-tight md:text-4xl">
                      {ch.name}
                    </h3>
                    <div className="mt-2 font-sans text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                      @{slug}
                    </div>
                  </div>
                  {slug === "SamouraiDansant" && (
                    <div className="border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[color:var(--color-paper)]">
                      {c.primaryBadge}
                    </div>
                  )}
                </div>
                <div className="mt-8 grid grid-cols-2 gap-y-8 md:grid-cols-4">
                  <Stat
                    value={formatNumber(ch.subscribers)}
                    label={c.sections.channels.subs}
                  />
                  <Stat value={ch.totalVideos} label={c.sections.channels.videos} />
                  <Stat
                    value={formatNumber(ch.avgViews)}
                    label={c.sections.channels.avgViews}
                  />
                  <Stat
                    value={formatNumber(ch.medianViews)}
                    label={c.sections.channels.median}
                  />
                </div>
                {ch.description && (
                  <p className="mt-8 max-w-3xl leading-relaxed text-[color:var(--color-muted)]">
                    {ch.description}
                  </p>
                )}
                <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
                  <div>
                    <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em]">
                      {c.sections.channels.whatWorks}
                    </h4>
                    <ul className="space-y-2">
                      {ch.whatWorks.slice(0, 6).map((w, i) => (
                        <li
                          key={i}
                          className="border-l-2 border-[color:var(--color-ink)] pl-3 text-sm leading-relaxed"
                        >
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                      {c.sections.channels.whatDoesntWork}
                    </h4>
                    <ul className="space-y-2">
                      {ch.whatDoesntWork.slice(0, 6).map((w, i) => (
                        <li
                          key={i}
                          className="border-l-2 border-[color:var(--color-muted)] pl-3 text-sm leading-relaxed text-[color:var(--color-muted)]"
                        >
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* SAMOURAI VOICE MODEL */}
      <Section
        eyebrow={c.sections.samouraiVoice.eyebrow}
        title={c.sections.samouraiVoice.title}
        lead={c.sections.samouraiVoice.lead}
      >
        <div className="space-y-14">
          <div>
            <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
              {c.sections.samouraiVoice.positioning}
            </h3>
            <p className="max-w-3xl whitespace-pre-line font-serif text-lg leading-relaxed">
              {samouraiVoice.positioning_statement}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
              {c.sections.samouraiVoice.themes}
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {samouraiVoice.recurring_themes_named.map((t) => (
                <div
                  key={t.name}
                  className="border border-[color:var(--color-line)] p-5"
                >
                  <div className="font-serif text-base font-bold">{t.name}</div>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
                    {t.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
              {c.sections.samouraiVoice.hookFormulas}
            </h3>
            <ol className="space-y-6">
              {samouraiVoice.hook_formulas.map((h, i) => (
                <li
                  key={i}
                  className="grid grid-cols-12 gap-4 border-t border-[color:var(--color-line)] pt-5 first:border-t-0 first:pt-0"
                >
                  <div className="col-span-12 font-serif text-xl font-bold md:col-span-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <blockquote className="font-serif italic leading-relaxed">
                      « {h} »
                    </blockquote>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                {c.sections.samouraiVoice.structure}
              </h3>
              <dl className="space-y-4">
                {Object.entries(samouraiVoice.structural_template).map(([k, v]) => {
                  const rendered = renderTemplateValue(v);
                  return (
                    <div key={k}>
                      <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em]">
                        {k.replace(/_/g, " ")}
                      </dt>
                      <dd className="mt-1 whitespace-pre-line text-sm leading-relaxed text-[color:var(--color-muted)]">
                        {rendered}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
            <div>
              <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                {c.sections.samouraiVoice.rhetoric}
              </h3>
              <ul className="space-y-4">
                {Object.entries(samouraiVoice.rhetorical_patterns).map(([k, v]) => (
                  <li key={k}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em]">
                      {k}
                    </div>
                    <div className="mt-1 text-sm leading-relaxed text-[color:var(--color-muted)]">
                      {v.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
              {c.sections.samouraiVoice.cta}
            </h3>
            <p className="max-w-3xl font-serif text-lg italic leading-relaxed">
              {samouraiVoice.cta_style}
            </p>
          </div>
        </div>
      </Section>

      {/* GAP ANALYSIS */}
      <Section
        eyebrow={c.sections.gap.eyebrow}
        title={c.sections.gap.title}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <GapColumn
            title={c.sections.gap.competitors}
            items={gapAnalysis.whatCompetitorsDo}
            muted
          />
          <GapColumn
            title={c.sections.gap.nobody}
            items={gapAnalysis.whatNobodyDoes}
          />
          <GapColumn
            title={c.sections.gap.edge}
            items={gapAnalysis.caioEdge}
            emphasis
          />
        </div>
      </Section>

      {/* STRATEGY */}
      <Section
        eyebrow={c.sections.strategy.eyebrow}
        title={c.sections.strategy.title}
        lead={c.sections.strategy.lead}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <StrategyColumn title={c.sections.strategy.week} items={strategy.thisWeek} />
          <StrategyColumn
            title={c.sections.strategy.month}
            items={strategy.thisMonth}
          />
          <StrategyColumn
            title={c.sections.strategy.quarter}
            items={strategy.thisQuarter}
          />
        </div>
      </Section>

      {/* DATA INTEGRITY */}
      <Section
        eyebrow={c.sections.integrity.eyebrow}
        title={c.sections.integrity.title}
        bordered={false}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
              {locale === "en" ? "Full catalog" : "Catalogue complet"}
            </h4>
            <ul className="space-y-1 text-sm">
              {dataIntegrity.channelsAtFullCatalog.map((c0, i) => (
                <li key={i}>— {c0}</li>
              ))}
            </ul>
            <h4 className="mb-3 mt-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
              {locale === "en" ? "50-video cap (Apify default)" : "Cap 50 vidéos (Apify)"}
            </h4>
            <ul className="space-y-1 text-sm">
              {dataIntegrity.channelsAt50Cap.map((c0, i) => (
                <li key={i}>— {c0}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
              {locale === "en" ? "Transcript coverage" : "Couverture transcripts"}
            </h4>
            <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
              {dataIntegrity.transcriptCoverage}
            </p>
            <h4 className="mb-3 mt-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
              {locale === "en" ? "Note" : "Note"}
            </h4>
            <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
              {dataIntegrity.note}
            </p>
          </div>
        </div>
      </Section>

      {/* CTA FOOTER */}
      <section className="border-t border-[color:var(--color-line)] bg-[color:var(--color-ink)] py-20 text-[color:var(--color-paper)]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="max-w-3xl font-serif text-3xl font-black leading-tight md:text-5xl">
            {locale === "en"
              ? "The data is the map. The Content Generator is the ship."
              : "Les données sont la carte. Le Content Generator est le navire."}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed opacity-80">
            {locale === "en"
              ? "Turn this analysis into a SamourAI-voice script in under 60 seconds."
              : "Transforme cette analyse en script SamourAI en moins de 60 secondes."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/${locale}/admin/youtube-script`}
              className="inline-flex items-center border border-[color:var(--color-paper)] bg-[color:var(--color-paper)] px-6 py-3 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink)] transition hover:bg-transparent hover:text-[color:var(--color-paper)]"
            >
              {locale === "en" ? "Open Content Generator" : "Ouvrir le Content Generator"}
            </Link>
            <Link
              href={`/${locale}/formations`}
              className="inline-flex items-center border border-[color:var(--color-paper)] px-6 py-3 font-sans text-sm font-semibold uppercase tracking-[0.2em] transition hover:bg-[color:var(--color-paper)] hover:text-[color:var(--color-ink)]"
            >
              {locale === "en" ? "See programmes" : "Voir les formations"}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function renderTemplateValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const v = value as {
      pattern?: string;
      length_seconds?: number;
      must_include?: string[];
    };
    const parts: string[] = [];
    if (v.pattern) {
      parts.push(
        v.length_seconds ? `${v.pattern} (~${v.length_seconds}s)` : v.pattern,
      );
    }
    if (v.must_include?.length) {
      for (const m of v.must_include) parts.push(`• ${m}`);
    }
    return parts.join("\n");
  }
  return String(value);
}

function KpiBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-[color:var(--color-ink)] pl-6">
      <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
        {label}
      </div>
      <div className="mt-2 font-serif text-xl font-bold leading-tight">{value}</div>
    </div>
  );
}

function IceCell({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-serif text-lg font-bold">{value}</div>
      <div className="font-sans text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
        {label}
      </div>
    </div>
  );
}

function Th({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: boolean;
}) {
  return (
    <th
      className={`px-4 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-muted)] ${right ? "text-right" : ""}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: boolean;
}) {
  return (
    <td className={`px-4 py-3 ${right ? "text-right" : ""}`}>{children}</td>
  );
}

function GapColumn({
  title,
  items,
  muted,
  emphasis,
}: {
  title: string;
  items: string[];
  muted?: boolean;
  emphasis?: boolean;
}) {
  return (
    <div
      className={
        emphasis
          ? "border-2 border-[color:var(--color-ink)] p-6"
          : "border border-[color:var(--color-line)] p-6"
      }
    >
      <h3
        className={`mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] ${muted ? "text-[color:var(--color-muted)]" : ""}`}
      >
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((it, i) => (
          <li key={i} className="text-sm leading-relaxed">
            — {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StrategyColumn({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="border border-[color:var(--color-line)] p-6">
      <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em]">
        {title}
      </h3>
      <ol className="space-y-4">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3">
            <span className="font-serif text-xl font-black">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm leading-relaxed">{it}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
