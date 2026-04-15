import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { CtaLink } from "@/components/cta-button";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Locale = "fr" | "en";
type Status = "done" | "live" | "planned";

const STATUS_LABELS: Record<Locale, Record<Status, string>> = {
  fr: { done: "Livré", live: "En cours", planned: "Planifié" },
  en: { done: "Done", live: "Live", planned: "Planned" },
};

const CONTENT = {
  fr: {
    metaTitle: "Roadmap",
    metaDescription:
      "La roadmap publique de CAIO Academy. Beta Phase II en cours, jalons An 1-3, priorités des prochaines semaines. Construit en public.",
    hero: {
      eyebrow: "Exécution",
      title: "Construit en public.",
      lead: "Chaque jalon est daté, chaque statut est honnête. La Beta Phase II est en cours : 12 semaines, 15 personnes, cohorte fermée à €1 500. Les chiffres ci-dessous sont mis à jour à chaque passage de phase.",
    },
    beta: {
      eyebrow: "Beta Phase II — live",
      title: "12 semaines, 15 personnes, accès à vie en échange d'input.",
      lead: "La Beta II sert trois choses : valider le pricing €3 500 (stabilisé après), récolter 15 testimonials et case studies, et finaliser le curriculum v1 avec le feedback direct de la cohorte.",
      stats: [
        { value: "12", label: "Semaines" },
        { value: "15", label: "Personnes max" },
        { value: "€1 500", label: "Prix Beta (accès à vie)" },
        { value: "€22 500", label: "Critère de passage" },
      ],
      checklist: {
        title: "Programme de la Beta II.",
        items: [
          "Landing page Beta lancée, cohorte constituée",
          "6 semaines de programme live, puis build de 6 semaines",
          "Système #3 (Dashboard ROI AI) construit avec la cohorte",
          "15 testimonials et case studies récoltés",
          "Feedback intégré dans la v1 du curriculum",
        ],
      },
    },
    milestones: {
      eyebrow: "Jalons",
      title: "An 1 · An 2 · An 3.",
      lead: "Séquençage précis. Chaque phase a un objectif unique et mesurable. On ne passe pas à la suivante sans avoir atteint le critère de validation.",
    },
    next: {
      eyebrow: "Prochaines 4 semaines",
      title: "Ce qui est chassé maintenant.",
      lead: "Priorités actives sur avril-mai 2026. Mis à jour chaque semaine.",
      items: [
        "Clôturer la cohorte Beta II (15 places confirmées)",
        "Documenter les systèmes #1 et #2 en posts LinkedIn (hebdo)",
        "Newsletter The CAIO Brief — rythme mardi stabilisé",
        "Ouvrir la landing page Founding Cohort €3 500 (Q3 2026)",
      ],
    },
    cta: {
      title: "Candidater à la Beta Phase II.",
      body: "15 places. Priorité aux avatars CTO SaaS et Consultant AI. Input direct sur le curriculum final en échange de l'accès à vie.",
      label: "Candidater",
    },
  },
  en: {
    metaTitle: "Roadmap",
    metaDescription:
      "The public roadmap of CAIO Academy. Beta Phase II live, Year 1-3 milestones, and next-weeks priorities. Built in public.",
    hero: {
      eyebrow: "Execution",
      title: "Built in public.",
      lead: "Every milestone is dated, every status is honest. Beta Phase II is live: 12 weeks, 15 people, closed cohort at €1,500. The numbers below are refreshed at each phase gate.",
    },
    beta: {
      eyebrow: "Beta Phase II — live",
      title: "12 weeks, 15 people, lifetime access in exchange for input.",
      lead: "Beta II serves three goals: validate the €3,500 price point (stabilised afterwards), collect 15 testimonials and case studies, and finalise curriculum v1 from direct cohort feedback.",
      stats: [
        { value: "12", label: "Weeks" },
        { value: "15", label: "People cap" },
        { value: "€1,500", label: "Beta price (lifetime)" },
        { value: "€22,500", label: "Phase-gate target" },
      ],
      checklist: {
        title: "Beta II programme.",
        items: [
          "Beta landing page live, cohort assembled",
          "6 weeks live programme, then 6-week build phase",
          "System #3 (AI ROI Dashboard) built with the cohort",
          "15 testimonials and case studies collected",
          "Feedback integrated into curriculum v1",
        ],
      },
    },
    milestones: {
      eyebrow: "Milestones",
      title: "Year 1 · Year 2 · Year 3.",
      lead: "Precise sequencing. Each phase has a single measurable goal. We don't move to the next until the validation criterion is met.",
    },
    next: {
      eyebrow: "Next 4 weeks",
      title: "What's hunted now.",
      lead: "Active priorities for April-May 2026. Refreshed weekly.",
      items: [
        "Close the Beta II cohort (15 confirmed seats)",
        "Document systems #1 and #2 in weekly LinkedIn posts",
        "The CAIO Brief newsletter — Tuesday cadence stabilised",
        "Open the €3,500 Founding Cohort landing page (Q3 2026)",
      ],
    },
    cta: {
      title: "Apply to Beta Phase II.",
      body: "15 seats. Priority to SaaS CTO and AI Consultant avatars. Direct input on the final curriculum in exchange for lifetime access.",
      label: "Apply now",
    },
  },
} satisfies Record<Locale, unknown>;

const MILESTONES_FR: Array<{
  group: string;
  items: Array<{ phase: string; label: string; body: string; status: Status }>;
}> = [
  {
    group: "An 1 — 2026",
    items: [
      {
        phase: "Phase I",
        label: "Autorité (M1-M3)",
        body: "Positionnement LinkedIn activé, newsletter CAIO Brief lancée, 3 posts / semaine, systèmes #1 et #2 construits en public, Discord CAIO Network ouvert. Critère : 500 abonnés newsletter.",
        status: "done",
      },
      {
        phase: "Phase II",
        label: "Beta (M4-M6)",
        body: "Cohorte 15 personnes à €1 500, 6 semaines live puis 6 semaines build, système #3 livré avec la cohorte, 15 testimonials. Critère : €22 500 encaissés.",
        status: "live",
      },
      {
        phase: "Phase III",
        label: "Lancement (M6-M9)",
        body: "Founding Cohort €3 500 ouverte (100 premières places), Mastermind €500/m (30 max), CAIO Registry créé, premiers contacts B2B. Critère : €15k / mois récurrents.",
        status: "planned",
      },
      {
        phase: "Phase IV",
        label: "Flywheel (M9-M12)",
        body: "Premiers placements CAIO via Registry, premier workshop B2B, review complète du modèle, ouverture waitlist An 2. Objectif : ~€215k encaissés.",
        status: "planned",
      },
    ],
  },
  {
    group: "An 2 — 2027",
    items: [
      {
        phase: "Q1 An 2",
        label: "Consolidation",
        body: "Recrutement Community Manager, recherche premier Expert Tech, cadence régulière Founding Cohort.",
        status: "planned",
      },
      {
        phase: "Q2 An 2",
        label: "Premium & pilotes Registry",
        body: "Ouverture Mastermind Premium €1 500/m (5 places), premier workshop B2B test, 2 premiers pilotes Registry.",
        status: "planned",
      },
      {
        phase: "Q3-Q4 An 2",
        label: "SEO + Head of Partnerships",
        body: "SEO qui décolle (500 visites / mois), ouverture canal YouTube/podcast, recrutement Head of Partnerships B2B, préparation campagne Registry An 3.",
        status: "planned",
      },
    ],
  },
  {
    group: "An 3 — 2028",
    items: [
      {
        phase: "Q1 An 3",
        label: "Registry à scale",
        body: "Head of Partnerships opérationnel, objectif 10 entreprises Registry signées Q1, Mastermind Premium passe à 8 places.",
        status: "planned",
      },
      {
        phase: "Q2-Q3 An 3",
        label: "Prix stabilisé + alumni formateurs",
        body: "Formation stabilisée à €3 000, module advanced lancé, premiers alumni deviennent formateurs, workshops Premium €20-25k sur grands comptes.",
        status: "planned",
      },
      {
        phase: "Q4 An 3",
        label: "Cap €1M franchi",
        body: "Bilan An 3, revue stratégique An 4-5 : vente (Option A), conservation (Option B) ou hybride (Option C).",
        status: "planned",
      },
    ],
  },
];

const MILESTONES_EN: Array<{
  group: string;
  items: Array<{ phase: string; label: string; body: string; status: Status }>;
}> = [
  {
    group: "Year 1 — 2026",
    items: [
      {
        phase: "Phase I",
        label: "Authority (M1-M3)",
        body: "LinkedIn positioning live, CAIO Brief newsletter launched, 3 posts / week, systems #1 and #2 built in public, CAIO Network Discord open. Gate: 500 newsletter subscribers.",
        status: "done",
      },
      {
        phase: "Phase II",
        label: "Beta (M4-M6)",
        body: "15-person cohort at €1,500, 6 weeks live then 6 weeks build, system #3 shipped with the cohort, 15 testimonials. Gate: €22,500 collected.",
        status: "live",
      },
      {
        phase: "Phase III",
        label: "Launch (M6-M9)",
        body: "Founding Cohort €3,500 opened (first 100 seats), Mastermind €500/m (30 cap), CAIO Registry created, first B2B contacts. Gate: €15k / month recurring.",
        status: "planned",
      },
      {
        phase: "Phase IV",
        label: "Flywheel (M9-M12)",
        body: "First CAIO placements via Registry, first B2B workshop, full model review, Year 2 waitlist open. Target: ~€215k collected.",
        status: "planned",
      },
    ],
  },
  {
    group: "Year 2 — 2027",
    items: [
      {
        phase: "Q1 Year 2",
        label: "Consolidation",
        body: "Community Manager hired, first Tech Lead sourced, steady Founding Cohort cadence.",
        status: "planned",
      },
      {
        phase: "Q2 Year 2",
        label: "Premium & Registry pilots",
        body: "Mastermind Premium €1,500/m opens (5 seats), first B2B workshop test, first 2 Registry pilots.",
        status: "planned",
      },
      {
        phase: "Q3-Q4 Year 2",
        label: "SEO + Head of Partnerships",
        body: "SEO kicks in (500 visits / month), YouTube/podcast channel opens, Head of B2B Partnerships hired, Year 3 Registry campaign prepared.",
        status: "planned",
      },
    ],
  },
  {
    group: "Year 3 — 2028",
    items: [
      {
        phase: "Q1 Year 3",
        label: "Registry at scale",
        body: "Head of Partnerships in motion, target 10 Registry companies signed in Q1, Mastermind Premium moves to 8 seats.",
        status: "planned",
      },
      {
        phase: "Q2-Q3 Year 3",
        label: "Stabilised price + alumni trainers",
        body: "Programme stabilised at €3,000, advanced module launched, first alumni become trainers, Premium workshops €20-25k on large accounts.",
        status: "planned",
      },
      {
        phase: "Q4 Year 3",
        label: "€1M mark crossed",
        body: "Year 3 review, Year 4-5 strategic review: sell (Option A), keep (Option B), hybrid (Option C).",
        status: "planned",
      },
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[(locale as Locale) in CONTENT ? (locale as Locale) : "fr"];
  return { title: c.metaTitle, description: c.metaDescription };
}

function StatusBadge({ status, locale }: { status: Status; locale: Locale }) {
  const label = STATUS_LABELS[locale][status];
  const base =
    "inline-flex items-center gap-2 border px-2 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.15em]";
  const variant =
    status === "live"
      ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
      : status === "done"
        ? "border-[color:var(--color-ink)] text-[color:var(--color-ink)]"
        : "border-[color:var(--color-line-strong)] text-[color:var(--color-muted)]";
  return (
    <span className={`${base} ${variant}`}>
      <span
        aria-hidden
        className={
          "inline-block h-1.5 w-1.5 " +
          (status === "live"
            ? "bg-[color:var(--color-paper)]"
            : status === "done"
              ? "bg-[color:var(--color-ink)]"
              : "bg-[color:var(--color-muted)]")
        }
      />
      {label}
    </span>
  );
}

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in CONTENT ? (locale as Locale) : "fr";
  const c = CONTENT[key];
  const milestones = key === "en" ? MILESTONES_EN : MILESTONES_FR;

  return (
    <PageShell>
      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            {c.hero.eyebrow}
          </p>
          <h1 className="max-w-5xl font-serif text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            {c.hero.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-[1.7] text-[color:var(--color-muted)] md:text-xl">
            {c.hero.lead}
          </p>
        </div>
      </section>

      <Section eyebrow={c.beta.eyebrow} title={c.beta.title} lead={c.beta.lead}>
        <div className="mb-10 flex justify-start">
          <StatusBadge status="live" locale={key} />
        </div>
        <div className="grid gap-10 md:grid-cols-4">
          {c.beta.stats.map((s) => (
            <div
              key={s.label}
              className="border-l border-[color:var(--color-ink)] pl-5"
            >
              <div className="font-serif text-4xl font-black tracking-tight">{s.value}</div>
              <div className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 max-w-3xl border-t border-[color:var(--color-ink)] pt-8">
          <h3 className="font-serif text-xl font-bold tracking-tight">
            {c.beta.checklist.title}
          </h3>
          <ol className="mt-6 space-y-3 text-base leading-[1.7]">
            {c.beta.checklist.items.map((item, i) => (
              <li key={item} className="flex gap-4">
                <span className="font-serif text-lg font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[color:var(--color-muted)]">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section eyebrow={c.milestones.eyebrow} title={c.milestones.title} lead={c.milestones.lead}>
        <div className="space-y-20">
          {milestones.map((g) => (
            <div key={g.group}>
              <h3 className="mb-10 border-b border-[color:var(--color-ink)] pb-3 font-serif text-2xl font-bold tracking-tight">
                {g.group}
              </h3>
              <ol className="space-y-10">
                {g.items.map((m, i) => (
                  <li
                    key={m.phase + m.label}
                    className="grid gap-6 md:grid-cols-[auto_auto_1fr] md:gap-10"
                  >
                    <div className="font-serif text-3xl font-black tracking-tight text-[color:var(--color-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-[12rem]">
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                        {m.phase}
                      </p>
                      <p className="mt-1 font-serif text-xl font-bold tracking-tight">
                        {m.label}
                      </p>
                      <div className="mt-3">
                        <StatusBadge status={m.status} locale={key} />
                      </div>
                    </div>
                    <p className="text-base leading-[1.7] text-[color:var(--color-muted)]">
                      {m.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={c.next.eyebrow} title={c.next.title} lead={c.next.lead}>
        <ul className="grid gap-4 md:grid-cols-2">
          {c.next.items.map((item, i) => (
            <li
              key={item}
              className="flex items-baseline gap-6 border-t border-[color:var(--color-line-strong)] pt-5"
            >
              <span className="font-serif text-3xl font-black tracking-tight text-[color:var(--color-muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base leading-[1.7]">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
            {c.cta.title}
          </h2>
          <p className="mt-6 text-base leading-[1.7] text-[color:var(--color-muted)]">
            {c.cta.body}
          </p>
          <div className="mt-10 flex justify-center">
            <CtaLink href={`/${locale}/beta`} variant="ink" size="lg">
              {c.cta.label}
            </CtaLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
