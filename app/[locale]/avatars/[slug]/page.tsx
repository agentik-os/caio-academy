import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/page-shell";
import { Prose } from "@/components/prose";
import { routing } from "@/i18n/routing";
import { AVATARS, getAvatar, getAvatarContent, getAvatarNeighbors } from "@/lib/avatars";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const a of AVATARS) {
      params.push({ locale, slug: a.slug });
    }
  }
  return params;
}

type Locale = "fr" | "en";

const T = {
  fr: {
    eyebrow: "Avatar",
    priority: "Priorité",
    role: "Rôle",
    pains: "Douleurs",
    transformation: "Transformation",
    price: "Prix cible",
    prev: "Précédent",
    next: "Suivant",
    cta: "Voir les formations adaptées",
  },
  en: {
    eyebrow: "Avatar",
    priority: "Priority",
    role: "Role",
    pains: "Pain points",
    transformation: "Transformation",
    price: "Target price",
    prev: "Previous",
    next: "Next",
    cta: "See matching programmes",
  },
} as const;

// PDF-extracted files carry noisy page artifacts. Strip them conservatively.
function cleanContent(raw: string): string {
  const lines = raw.split("\n");
  const kept: string[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      kept.push("");
      continue;
    }
    if (/^AGENTIK OS$/i.test(t)) continue;
    if (/^Agentik \{OS\}$/i.test(t)) continue;
    if (/^Agentik OS$/i.test(t)) continue;
    if (/^CAI ?O ACAD E MY/i.test(t)) continue;
    if (/^\d{1,3}$/.test(t) && t.length <= 3) continue;
    if (/^Source:\s/i.test(t)) continue;
    if (/^\d{4}-\d{2}-\d{2}$/.test(t)) continue;
    kept.push(line);
  }
  // Collapse triple blank lines
  let text = kept.join("\n").replace(/\n{3,}/g, "\n\n");
  // Escape MDX-hostile characters line-by-line (outside code fences)
  const outLines: string[] = [];
  let inFence = false;
  for (const line of text.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      outLines.push(line);
      continue;
    }
    if (inFence) {
      outLines.push(line);
      continue;
    }
    const safe = line
      .replace(/\{/g, "&#123;")
      .replace(/\}/g, "&#125;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    outLines.push(safe);
  }
  text = outLines.join("\n");
  return text;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const avatar = getAvatar(slug);
  if (!avatar) return {};
  return {
    title: avatar.title[key],
    description: avatar.summary[key],
  };
}

export default async function AvatarDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in T ? (locale as Locale) : "fr";
  const avatar = getAvatar(slug);
  if (!avatar) notFound();

  const raw = getAvatarContent(slug, key);
  const source = raw ? cleanContent(raw) : `# ${avatar.title[key]}\n\n${avatar.summary[key]}`;

  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  const t = T[key];
  const { prev, next } = getAvatarNeighbors(slug);

  return (
    <PageShell>
      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            {t.eyebrow} · {t.priority} {avatar.priority}
          </p>
          <h1 className="max-w-5xl font-serif text-4xl font-black leading-[1.1] tracking-tight md:text-6xl">
            {avatar.title[key]}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-[1.7] text-[color:var(--color-muted)]">
            {avatar.summary[key]}
          </p>
        </div>
      </section>

      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_320px]">
          <Prose className="max-w-none">{content}</Prose>

          <aside className="order-first lg:order-last">
            <div className="sticky top-24 flex flex-col gap-8 border-t-2 border-[color:var(--color-ink)] pt-8">
              <MetaRow label={t.role} value={avatar.role[key]} />
              <MetaRow label={t.pains} value={avatar.pains[key]} />
              <MetaRow label={t.transformation} value={avatar.transformation[key]} />
              <MetaRow label={t.price} value={avatar.price[key]} />
              <Link
                href={`/formations?avatar=${avatar.slug}`}
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
            href={`/avatars/${prev.slug}`}
            className="flex-1 bg-[color:var(--color-paper)] p-6 transition-colors duration-150 hover:bg-[color:var(--color-secondary)]"
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              ← {t.prev}
            </p>
            <p className="mt-2 font-serif text-lg font-bold">{prev.title[key]}</p>
          </Link>
          <Link
            href={`/avatars/${next.slug}`}
            className="flex-1 bg-[color:var(--color-paper)] p-6 text-right transition-colors duration-150 hover:bg-[color:var(--color-secondary)]"
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              {t.next} →
            </p>
            <p className="mt-2 font-serif text-lg font-bold">{next.title[key]}</p>
          </Link>
        </div>
      </nav>
    </PageShell>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
        {label}
      </p>
      <p className="mt-2 font-sans text-sm leading-[1.6] text-[color:var(--color-ink)]">{value}</p>
    </div>
  );
}
