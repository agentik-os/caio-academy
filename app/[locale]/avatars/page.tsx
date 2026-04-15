import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { routing } from "@/i18n/routing";
import { AVATARS } from "@/lib/avatars";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Locale = "fr" | "en";

const CONTENT = {
  fr: {
    metaTitle: "Avatars",
    metaDescription:
      "Les cinq avatars cibles de CAIO Academy : CTO SaaS, Consultant AI, DG de PME, Head of Digital, Dev Ambitieux.",
    eyebrow: "Personas",
    title: "5 avatars cibles.",
    lead: "Le programme s'adresse à cinq profils prioritaires. Chaque avatar correspond à un niveau d'achat, un parcours de formation et une stratégie d'acquisition dédiés.",
    readProfile: "Lire le profil",
  },
  en: {
    metaTitle: "Avatars",
    metaDescription:
      "CAIO Academy's five target avatars: SaaS CTO, AI Consultant, SMB GM, Head of Digital, Ambitious Dev.",
    eyebrow: "Personas",
    title: "5 target avatars.",
    lead: "The programme serves five priority profiles. Each avatar maps to a purchase tier, a training path and a dedicated acquisition strategy.",
    readProfile: "Read the profile",
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

export default async function AvatarsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getTranslations();
  const key: Locale = (locale as Locale) in CONTENT ? (locale as Locale) : "fr";
  const c = CONTENT[key];

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
            {c.lead}
          </p>
        </div>
      </section>

      <Section>
        <ul className="grid gap-px bg-[color:var(--color-line)] md:grid-cols-2 lg:grid-cols-3">
          {AVATARS.map((a) => (
            <li key={a.slug} className="bg-[color:var(--color-paper)]">
              <Link
                href={`/avatars/${a.slug}`}
                className="flex h-full flex-col justify-between gap-8 p-8 transition-colors duration-150 hover:bg-[color:var(--color-secondary)]"
              >
                <div>
                  <div className="mb-6 font-serif text-6xl font-black text-[color:var(--color-muted)]">
                    {String(a.priority).padStart(2, "0")}
                  </div>
                  <h2 className="font-serif text-2xl font-bold leading-tight tracking-tight">
                    {a.title[key]}
                  </h2>
                  <p className="mt-4 text-sm leading-[1.65] text-[color:var(--color-muted)]">
                    {a.summary[key]}
                  </p>
                </div>
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em]">
                  {c.readProfile} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
}
