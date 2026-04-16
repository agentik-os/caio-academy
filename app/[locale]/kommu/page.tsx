import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllKommuModules, TRACK_LABELS } from "@/lib/kommu";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const META = {
  fr: {
    title: "Kommu — Formations IA Avancees",
    description:
      "Le programme Kommu : 4 parcours de formation IA complets couvrant la maitrise technique, le business, le contenu et les systemes autonomes.",
    eyebrow: "PROGRAMME KOMMU",
    heading: "Kommu — Formation Action IA",
    lead: "Le programme de formation operationnel pour 2026-2027. Quatre parcours progressifs qui transforment la theorie IA en competences concretes, de la maitrise technique au deploiement de systemes autonomes.",
    modules: "modules",
    duration: "Duree",
    audience: "Public",
    cta: "Decouvrir le module",
    ctaBeta: "S'inscrire a la Beta",
    ctaBetaHref: "/beta",
    stats: {
      modules: "13 modules",
      hours: "280+ heures",
      tracks: "4 parcours",
      lessons: "90+ lecons",
    },
  },
  en: {
    title: "Kommu — Advanced AI Training",
    description:
      "The Kommu program: 4 complete AI training tracks covering technical mastery, business, content, and autonomous systems.",
    eyebrow: "KOMMU PROGRAM",
    heading: "Kommu — AI Action Training",
    lead: "The operational training program for 2026-2027. Four progressive tracks that turn AI theory into concrete skills, from technical mastery to autonomous system deployment.",
    modules: "modules",
    duration: "Duration",
    audience: "Audience",
    cta: "Explore module",
    ctaBeta: "Join the Beta",
    ctaBetaHref: "/beta",
    stats: {
      modules: "13 modules",
      hours: "280+ hours",
      tracks: "4 tracks",
      lessons: "90+ lessons",
    },
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

export default async function KommuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const k: Locale = (locale as Locale) in META ? (locale as Locale) : "fr";
  const c = META[k];

  const allModules = getAllKommuModules();

  // Group modules by track
  const trackOrder = ["agentic-tech", "business", "content", "aisb"];
  const modulesByTrack = new Map<string, typeof allModules>();
  for (const mod of allModules) {
    const list = modulesByTrack.get(mod.track) ?? [];
    list.push(mod);
    modulesByTrack.set(mod.track, list);
  }

  return (
    <PageShell>
      {/* Hero */}
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

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Object.values(c.stats).map((stat) => (
              <div
                key={stat}
                className="border border-[color:var(--color-line)] px-4 py-3 text-center"
              >
                <p className="font-sans text-lg font-black">{stat}</p>
              </div>
            ))}
          </div>

          {/* Track quick nav */}
          <div className="mt-8 flex flex-wrap gap-3">
            {trackOrder.map((trackId) => {
              const label = TRACK_LABELS[trackId]?.[k] ?? trackId;
              return (
                <a
                  key={trackId}
                  href={`#${trackId}`}
                  className="border border-[color:var(--color-ink)] px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-bg)]"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tracks & Modules */}
      {trackOrder.map((trackId, trackIndex) => {
        const modules = modulesByTrack.get(trackId) ?? [];
        if (modules.length === 0) return null;
        const trackLabel = TRACK_LABELS[trackId]?.[k] ?? trackId;

        return (
          <section
            key={trackId}
            id={trackId}
            className={
              trackIndex < trackOrder.length - 1
                ? "border-b border-[color:var(--color-line)]"
                : ""
            }
          >
            <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
              {/* Track header */}
              <div className="mb-10">
                <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                  Parcours {trackIndex + 1} sur {trackOrder.length}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
                  {trackLabel}
                </h2>
                <p className="mt-2 font-sans text-xs text-[color:var(--color-muted)]">
                  {modules.length} {c.modules}
                </p>
              </div>

              {/* Module cards */}
              <div className="flex flex-col gap-6">
                {modules.map((mod) => (
                  <Link
                    key={mod.slug}
                    href={`/kommu/${mod.slug}`}
                    className="group border border-[color:var(--color-line)] p-6 sm:p-8 transition-colors duration-150 hover:border-[color:var(--color-ink)]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--color-ink)] font-sans text-[0.65rem] font-bold">
                        {mod.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-xl font-bold sm:text-2xl group-hover:underline">
                          {mod.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-4 font-sans text-xs text-[color:var(--color-muted)]">
                          {mod.duration && (
                            <span>
                              {c.duration} : {mod.duration}
                            </span>
                          )}
                        </div>
                        <p className="mt-3 text-sm leading-[1.7] text-[color:var(--color-muted)]">
                          {mod.summary}
                        </p>
                        {mod.audience && (
                          <p className="mt-2 text-xs text-[color:var(--color-muted)]">
                            <span className="font-semibold uppercase tracking-wider">
                              {c.audience} :
                            </span>{" "}
                            {mod.audience}
                          </p>
                        )}
                        <p className="mt-4 inline-flex items-center font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--color-ink)] group-hover:underline">
                          {c.cta} &rarr;
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 text-center">
          <h2 className="font-serif text-2xl font-black tracking-tight sm:text-3xl">
            {k === "fr"
              ? "Pret a transformer votre approche de l'IA ?"
              : "Ready to transform your AI approach?"}
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base text-[color:var(--color-muted)]">
            {k === "fr"
              ? "13 modules, 280+ heures de formation, de la philosophie IA au deploiement de systemes autonomes complets."
              : "13 modules, 280+ hours of training, from AI philosophy to full autonomous system deployment."}
          </p>
          <Link
            href={c.ctaBetaHref}
            className="mt-8 inline-flex items-center border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-6 py-3 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-paper)] transition-colors duration-150 hover:bg-transparent hover:text-[color:var(--color-ink)]"
          >
            {c.ctaBeta} &rarr;
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
