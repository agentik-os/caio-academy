import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { Stat } from "@/components/stat";
import { CtaLink } from "@/components/cta-button";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Locale = "fr" | "en";

const CONTENT = {
  fr: {
    metaTitle: "CAIO Academy — Former, certifier et placer les Chief AI Officers",
    metaDescription:
      "L'école de référence pour le rôle CAIO en 2026-2028. Whitepaper transparent, business plan public, formations bilingues FR/EN.",
    hero: {
      eyebrow: "Whitepaper · Beta Phase II · 2026",
      title: "Former, certifier et placer les Chief AI Officers de demain.",
      lead: "Pas une école de code. Pas une formation AI générique. Un écosystème complet qui fabrique, certifie et place les Chief AI Officers de demain — et qui vend les systèmes qu'ils utilisent.",
      ctaPrimary: "Rejoindre la Beta",
      ctaSecondary: "Voir les formations",
    },
    pillars: {
      eyebrow: "Méthode",
      title: "Teach · Certify · Place",
      items: [
        {
          label: "Teach",
          title: "On enseigne le rôle, pas les outils.",
          body: "Cinq parcours personnalisés par avatar, un abonnement €67/mois pour la théorie, un high-ticket €3,500 pour les trois builds réels. Les outils changent — le rôle CAIO, lui, va durer.",
          link: "Voir les formations",
          href: "/formations",
        },
        {
          label: "Certify",
          title: "Un certificat qui reflète un build réel.",
          body: "Chaque Founding Cohort livre trois systèmes en production : monitoring AI, orchestration d'agents, dashboard ROI. Le certificat est la preuve de l'exécution, pas l'inscription.",
          link: "Lire la vision",
          href: "/vision",
        },
        {
          label: "Place",
          title: "Le CAIO Registry comme actif de long terme.",
          body: "Un réseau fermé de profils certifiés, connectés aux entreprises qui cherchent un Chief AI Officer. Commission par placement + abonnement B2B à €1,000/mois à partir d'An 2.",
          link: "Lire le business plan",
          href: "/business-plan",
        },
      ],
    },
    stats: {
      eyebrow: "État",
      title: "Où en est l'écosystème.",
      lead: "Chiffres publics. Mis à jour à chaque jalon.",
      items: [
        { value: "5", label: "Avatars cibles" },
        { value: "1", suffix: "M€", label: "Objectif An 3" },
        { value: "II", label: "Beta Phase en cours" },
      ],
    },
    why: {
      eyebrow: "Contexte",
      title: "Pourquoi le rôle CAIO existe maintenant.",
      leftTitle: "2025-2026 : la fenêtre est ouverte.",
      leftBody:
        "Les recherches sur le rôle Chief AI Officer ont explosé de plus de 800 % entre 2023 et 2025. Les entreprises cherchent des CAIOs mais ne savent pas encore comment les qualifier. La certification n'existe pas. Celui qui la crée en premier gagne. Dans 18 mois, les places de référent seront prises.",
      rightTitle: "2027-2028 : la compétition arrive.",
      rightBody:
        "Coursera, Google et Microsoft via LinkedIn Learning vont massifier des certifications « AI Leadership ». Les formations génériques à €67/mois seront sous pression. Notre différentiel tient à un écosystème fermé — formation → certification → placement → systèmes — que les plateformes horizontales ne peuvent pas répliquer.",
    },
    finalCta: {
      title: "Rejoindre la waitlist Beta.",
      body: "12 semaines · 15 personnes · cohorte fermée · accès à vie à la formation et input direct sur le curriculum final en échange.",
      cta: "Candidater à la Beta",
    },
  },
  en: {
    metaTitle: "CAIO Academy — Train, certify, and place Chief AI Officers",
    metaDescription:
      "The reference school for the CAIO role, 2026-2028. Transparent whitepaper, open business plan, bilingual FR/EN courses.",
    hero: {
      eyebrow: "Whitepaper · Beta Phase II · 2026",
      title: "Train, certify, and place tomorrow's Chief AI Officers.",
      lead: "Not a coding school. Not a generic AI program. A complete ecosystem that trains, certifies, and places tomorrow's Chief AI Officers — and sells the systems they use.",
      ctaPrimary: "Join the Beta",
      ctaSecondary: "Browse courses",
    },
    pillars: {
      eyebrow: "Method",
      title: "Teach · Certify · Place",
      items: [
        {
          label: "Teach",
          title: "We teach the role, not the tools.",
          body: "Five paths tailored to each avatar, a €67/month membership for the theory, and a €3,500 flagship for three real builds. Tools change — the CAIO role will last.",
          link: "Browse courses",
          href: "/formations",
        },
        {
          label: "Certify",
          title: "A certificate that reflects a real build.",
          body: "Every Founding Cohort ships three production systems: AI monitoring, agent orchestration, ROI dashboard. The certificate is proof of execution, not of enrolment.",
          link: "Read the vision",
          href: "/vision",
        },
        {
          label: "Place",
          title: "The CAIO Registry as a long-term asset.",
          body: "A closed network of certified profiles, connected to companies hiring a Chief AI Officer. Placement commissions plus a €1,000/month B2B subscription starting Year 2.",
          link: "Read the business plan",
          href: "/business-plan",
        },
      ],
    },
    stats: {
      eyebrow: "State",
      title: "Where the ecosystem stands.",
      lead: "Public numbers. Updated at every milestone.",
      items: [
        { value: "5", label: "Target avatars" },
        { value: "1", suffix: "M€", label: "Year-3 target" },
        { value: "II", label: "Beta Phase live" },
      ],
    },
    why: {
      eyebrow: "Context",
      title: "Why the CAIO role exists now.",
      leftTitle: "2025-2026: the window is open.",
      leftBody:
        "Searches for the Chief AI Officer role grew more than 800% between 2023 and 2025. Companies are looking for CAIOs but don't yet know how to qualify them. The certification doesn't exist. Whoever creates it first wins. In 18 months, the reference seats will be taken.",
      rightTitle: "2027-2028: competition arrives.",
      rightBody:
        "Coursera, Google and Microsoft via LinkedIn Learning will mass-produce \"AI Leadership\" certificates. Generic €67/month programmes will come under pressure. Our edge is a closed ecosystem — training → certification → placement → systems — that horizontal platforms cannot replicate.",
    },
    finalCta: {
      title: "Join the Beta waitlist.",
      body: "12 weeks · 15 people · closed cohort · lifetime access to the course and direct input on the final curriculum in exchange.",
      cta: "Apply to the Beta",
    },
  },
} satisfies Record<Locale, unknown>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) in CONTENT ? (locale as Locale) : "fr"];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in CONTENT ? (locale as Locale) : "fr";
  const c = CONTENT[key];

  return (
    <PageShell>
      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-7xl px-6 py-32 md:py-40">
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            {c.hero.eyebrow}
          </p>
          <h1 className="max-w-5xl font-serif text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            {c.hero.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-[1.7] text-[color:var(--color-muted)] md:text-xl">
            {c.hero.lead}
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <CtaLink href={`/${locale}/beta`} variant="ink" size="lg">
              {c.hero.ctaPrimary}
            </CtaLink>
            <CtaLink href={`/${locale}/formations`} variant="outline" size="lg">
              {c.hero.ctaSecondary}
            </CtaLink>
          </div>
        </div>
      </section>

      <Section eyebrow={c.pillars.eyebrow} title={c.pillars.title}>
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {c.pillars.items.map((p) => (
            <article
              key={p.label}
              className="flex flex-col border-t border-[color:var(--color-ink)] pt-8"
            >
              <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                {p.label}
              </p>
              <h3 className="font-serif text-2xl font-bold leading-tight tracking-tight">
                {p.title}
              </h3>
              <p className="mt-4 flex-1 text-base leading-[1.7] text-[color:var(--color-muted)]">
                {p.body}
              </p>
              <a
                href={`/${locale}${p.href}`}
                className="mt-6 self-start border-b border-[color:var(--color-ink)] pb-0.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 hover:border-transparent"
              >
                {p.link} →
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow={c.stats.eyebrow} title={c.stats.title} lead={c.stats.lead}>
        <div className="grid gap-10 md:grid-cols-3">
          {c.stats.items.map((s) => (
            <Stat
              key={s.label}
              value={s.value}
              suffix={"suffix" in s ? s.suffix : undefined}
              label={s.label}
            />
          ))}
        </div>
      </Section>

      <Section eyebrow={c.why.eyebrow} title={c.why.title}>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="mb-4 font-serif text-xl font-bold tracking-tight">
              {c.why.leftTitle}
            </h3>
            <p className="text-base leading-[1.7] text-[color:var(--color-muted)]">
              {c.why.leftBody}
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-serif text-xl font-bold tracking-tight">
              {c.why.rightTitle}
            </h3>
            <p className="text-base leading-[1.7] text-[color:var(--color-muted)]">
              {c.why.rightBody}
            </p>
          </div>
        </div>
      </Section>

      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-3xl px-6 py-28 text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
            {c.finalCta.title}
          </h2>
          <p className="mt-6 text-base leading-[1.7] text-[color:var(--color-muted)]">
            {c.finalCta.body}
          </p>
          <div className="mt-10 flex justify-center">
            <CtaLink href={`/${locale}/beta`} variant="ink" size="lg">
              {c.finalCta.cta}
            </CtaLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
