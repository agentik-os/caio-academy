import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ConvexHttpClient } from "convex/browser";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/page-shell";
import { Prose } from "@/components/prose";
import { getDoc, getNeighbors } from "@/lib/docs";
import { formatDuration } from "@/lib/podcast";
import { PodcastPlayer } from "@/components/podcast-player";
import { GenerateEpisodeButton } from "./generate-button";
import { api } from "@/convex/_generated/api";

export const dynamic = "force-dynamic";

type Locale = "fr" | "en";

const T = {
  fr: {
    eyebrow: "Podcast",
    byline: "Audio",
    voice: "Voix",
    duration: "Durée",
    readDoc: "Lire le doc complet",
    transcript: "Transcription",
    prev: "Précédent",
    next: "Suivant",
    generate: "Générer cet épisode",
    generating: "Génération en cours…",
    error: "Erreur",
    notYet: "Cet épisode n'a pas encore été généré.",
    backHub: "Retour au podcast",
  },
  en: {
    eyebrow: "Podcast",
    byline: "Audio",
    voice: "Voice",
    duration: "Duration",
    readDoc: "Read the full doc",
    transcript: "Transcript",
    prev: "Previous",
    next: "Next",
    generate: "Generate this episode",
    generating: "Generating…",
    error: "Error",
    notYet: "This episode has not been generated yet.",
    backHub: "Back to podcast",
  },
} as const;

function parseSlug(parts: string[]): { section: string; slug: string } | null {
  if (parts.length < 2) return null;
  const section = parts[0];
  const slug = parts.slice(1).join("/");
  return { section, slug };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const parsed = parseSlug(slug);
  if (!parsed) return { title: "Podcast" };
  const doc = getDoc(parsed.section, parsed.slug, key);
  if (!doc) return { title: "Podcast" };
  return {
    title: `${doc.title} — ${T[key].eyebrow}`,
    description: doc.excerpt,
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const t = T[key];

  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const doc = getDoc(parsed.section, parsed.slug, key);
  if (!doc) notFound();

  const fullSlug = `${parsed.section}/${parsed.slug}`;
  const { prev, next } = getNeighbors(parsed.section, parsed.slug, key);

  let podcast: {
    status: "ready" | "pending" | "error";
    audioUrl: string;
    durationSec: number;
    voiceId: string;
    errorMessage?: string;
  } | null = null;

  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (convexUrl) {
    try {
      const client = new ConvexHttpClient(convexUrl);
      const row = await client.query(api.podcasts.getByDocLang, {
        docSlug: fullSlug,
        lang: key,
      });
      if (row) {
        podcast = {
          status: row.status,
          audioUrl: row.audioUrl,
          durationSec: row.durationSec,
          voiceId: row.voiceId,
          errorMessage: row.errorMessage,
        };
      }
    } catch {
      // leave null, show generate state
    }
  }

  const ready = podcast?.status === "ready" && !!podcast.audioUrl;
  const pending = podcast?.status === "pending";

  return (
    <PageShell>
      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            {t.eyebrow} · {doc.sectionTitle}
          </p>
          <h1 className="max-w-3xl font-serif text-3xl font-black leading-[1.1] tracking-tight md:text-5xl">
            {doc.title}
          </h1>
          {doc.excerpt && (
            <p className="mt-6 max-w-2xl text-lg leading-[1.7] text-[color:var(--color-muted)]">
              {doc.excerpt}
            </p>
          )}

          <div className="mt-10">
            {ready && podcast && (
              <>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                  {t.byline} · {t.duration}: {formatDuration(podcast.durationSec)} · {t.voice}: {podcast.voiceId.slice(0, 8)}…
                </p>
                <PodcastPlayer
                  src={podcast.audioUrl}
                  variant="full"
                  initialDuration={podcast.durationSec}
                />
              </>
            )}
            {pending && (
              <div className="border border-[color:var(--color-line)] p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                  {t.generating}
                </p>
              </div>
            )}
            {!ready && !pending && (
              <div className="border border-[color:var(--color-line)] p-8">
                <p className="mb-4 text-sm text-[color:var(--color-muted)]">
                  {t.notYet}
                </p>
                {podcast?.errorMessage && (
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em]">
                    {t.error}: {podcast.errorMessage}
                  </p>
                )}
                <GenerateEpisodeButton
                  docSlug={fullSlug}
                  lang={key}
                  label={t.generate}
                  generatingLabel={t.generating}
                />
              </div>
            )}
          </div>

          <div className="mt-10">
            <Link
              href={`/docs/${parsed.section}/${parsed.slug}`}
              className="font-sans text-xs font-semibold uppercase tracking-[0.25em] underline"
            >
              {t.readDoc} →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
            {t.transcript}
          </p>
          <Prose>
            {doc.content.split("\n\n").map((block, i) => (
              <p key={i}>{block}</p>
            ))}
          </Prose>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-6 px-6 py-10">
          {prev ? (
            <Link
              href={`/podcast/${prev.section}/${prev.slug}`}
              className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
            >
              ← {t.prev}: {prev.title}
            </Link>
          ) : (
            <Link
              href="/podcast"
              className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
            >
              ← {t.backHub}
            </Link>
          )}
          {next && (
            <Link
              href={`/podcast/${next.section}/${next.slug}`}
              className="text-right font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
            >
              {t.next}: {next.title} →
            </Link>
          )}
        </div>
      </section>
    </PageShell>
  );
}
