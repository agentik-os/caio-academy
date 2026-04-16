import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Locale = "fr" | "en";

const T = {
  fr: {
    eyebrow: "Blog",
    title: "Blog",
    tagline: "Reflexions sur l'IA, le leadership et la transformation.",
    read: "Lire",
    min: "min",
    empty: "Aucun article pour le moment.",
  },
  en: {
    eyebrow: "Blog",
    title: "Blog",
    tagline: "Reflections on AI, leadership, and transformation.",
    read: "Read",
    min: "min",
    empty: "No articles yet.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  return {
    title: T[key].title,
    description: T[key].tagline,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const t = T[key];
  const posts = getBlogPosts(key);

  return (
    <div>
      {/* Hero */}
      <header className="mb-12 border-b border-[color:var(--color-line)] pb-8">
        <p className="mb-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
          {t.eyebrow}
        </p>
        <h1 className="font-serif text-4xl font-black tracking-tight md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 max-w-xl font-sans text-base text-[color:var(--color-muted)]">
          {t.tagline}
        </p>
      </header>

      {/* Grid */}
      {posts.length === 0 ? (
        <p className="text-[color:var(--color-muted)]">{t.empty}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-[color:var(--color-line)] p-6 transition-colors duration-150 hover:bg-[color:var(--color-secondary)]"
            >
              <p className="mb-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                {post.readingTime} {t.min} &middot;{" "}
                {post.lang === "neutral" ? "FR/EN" : post.lang.toUpperCase()}
              </p>
              <h2 className="mb-2 font-serif text-lg font-bold leading-snug tracking-tight line-clamp-2 md:text-xl">
                {post.title}
              </h2>
              <p className="mb-4 font-sans text-sm leading-relaxed text-[color:var(--color-muted)] line-clamp-3">
                {post.summary}
              </p>
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)] transition-colors duration-150 group-hover:text-[color:var(--color-ink)]">
                {t.read} &rarr;
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
