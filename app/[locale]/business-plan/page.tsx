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
    metaTitle: "Business Plan",
    metaDescription:
      "Le business plan 100 % public de CAIO Academy : tiers, add-ons, économie unitaire, funnel par avatar et projections trois ans.",
    hero: {
      eyebrow: "Business",
      title: "Le plan d'affaires, 100 % transparent.",
      lead: "Tout est public. Tarifs, économie unitaire, projections. Pas de « Contact Sales » pour découvrir le prix, pas de conditions cachées. Si vous êtes sur cette page, vous avez déjà les mêmes chiffres que nous.",
    },
    tiers: {
      eyebrow: "Tiers",
      title: "Trois tiers, un seul écosystème.",
      lead: "Le gratuit remplit le pipeline. Le €67/mois crée la frustration productive. Le €3,500 délivre la transformation. Le €500/mois construit le récurrent stable.",
      items: [
        {
          name: "Fondation",
          price: "€67",
          period: "/mois",
          tagline: "La formation théorique, résiliable.",
          bullets: [
            "5 parcours personnalisés (1 par avatar)",
            "8 modules par parcours avec livrables",
            "1 système template en version light",
            "Accès à la communauté CAIO Network",
            "Newsletter The CAIO Brief",
            "Mises à jour trimestrielles du contenu",
          ],
          cta: "Voir les formations",
          href: "/formations",
          note: "Valeur réelle, intentionnellement incomplète. Le système complet est dans le tier Founding Cohort.",
        },
        {
          name: "Founding Cohort",
          price: "€3 500",
          period: "one-shot",
          tagline: "La formation complète, accès à vie.",
          bullets: [
            "Tout le tier Fondation inclus",
            "Build #1 : Système de monitoring AI",
            "Build #2 : Orchestration d'agents guidée",
            "Build #3 : Dashboard ROI AI from scratch",
            "Tous les templates et systèmes complets",
            "Certificat CAIO Academy",
            "Accès au CAIO Registry (profil visible)",
          ],
          cta: "Rejoindre la Beta",
          href: "/beta",
          note: "Plan 3 × €1 250 ou 6 × €650 disponibles. Prix stabilisé à €3 000 après An 1.",
          highlight: true,
        },
        {
          name: "Mastermind",
          price: "€500",
          period: "/mois",
          tagline: "Le socle récurrent, 30 membres max.",
          bullets: [
            "2 calls collectifs / mois (90 min chacun)",
            "Hot seat bi-mensuel : review de ton projet",
            "Accès aux nouveaux systèmes dès sortie",
            "Réseau de leads partagé entre membres",
            "Thread privé avec réponse sous 48 h",
            "Co-création et review de tes offres",
          ],
          cta: "Candidater au Mastermind",
          href: "/roadmap",
          note: "30 membres = €15 000 / mois. La limite est une contrainte volontaire qui crée la rareté.",
        },
      ],
    },
    addons: {
      eyebrow: "Add-ons",
      title: "Les piliers revenus An 2-3.",
      items: [
        {
          name: "Mastermind Premium",
          price: "€1 500",
          period: "/mois",
          cap: "10 membres max",
          body: "1:1 mensuel avec Gareth, intros warm dans le Registry, priorité placement. Candidature + entretien obligatoire. Adressé aux alumni seniors qui monétisent déjà leur formation (€5-15k / mois).",
        },
        {
          name: "Registry B2B Subscription",
          price: "€1 000",
          period: "/mois",
          cap: "Cible : 30 entreprises An 3",
          body: "Accès illimité aux profils certifiés, mise en relation priorisée, analytics de marché CAIO, commission placement réduite à 10 % (vs 20 % hors abonnement). €360k d'ARR en fin An 3.",
        },
        {
          name: "Workshops B2B",
          price: "€8 000-25 000",
          period: "/ session",
          cap: "PME-ETI 50-500 employés",
          body: "Formation C-suite sur la gouvernance AI, 2-3 jours sur site. 8 workshops en An 2 à €12k moyen, 20 en An 3 à €15k moyen. Marge nette 70 % après frais de déplacement.",
        },
        {
          name: "Systèmes à l'unité",
          price: "€297-997",
          period: "one-shot",
          cap: "Gumroad + vente directe",
          body: "Monitoring AI à €297, Orchestration d'agents complète à €497, pack complet trois systèmes à €997. Self-service, aucune intervention de Gareth au-delà de la maintenance trimestrielle.",
        },
      ],
    },
    economics: {
      eyebrow: "Économie unitaire",
      title: "Ce que chaque euro dépensé rapporte.",
      lead: "Chiffres moyens pondérés sur les deux avatars prioritaires (CTO SaaS et Consultant AI). Voir la ligne « gaps » ci-dessous pour les métriques non encore mesurées.",
      items: [
        { value: "€300-400", label: "CAC moyen An 3" },
        { value: "€9,5-21,5k", label: "LTV 12 mois (avatars prio.)" },
        { value: "20x+", label: "Ratio LTV / CAC" },
        { value: "70%", label: "Marge nette workshops" },
      ],
    },
    funnel: {
      eyebrow: "Funnel par avatar",
      title: "Cinq profils, une priorité claire.",
      lead: "Deux avatars en acquisition active (le CTO SaaS et le Consultant AI). La DG PME vient par recommandation après le mois 6. Le Dev Ambitieux joue un rôle d'ambassadeur volume.",
    },
    projections: {
      eyebrow: "Projections trois ans",
      title: "Du validation PMF au cap du million.",
    },
    gaps: {
      eyebrow: "Transparence",
      title: "Ce qu'on n'a pas encore mesuré.",
      body: "La Beta Phase I (2025) a validé le pricing à €1 500 sur 15 personnes mais n'a pas encore produit de données stables sur le payback réel, le churn Mastermind sur 12 mois, ni le taux de conversion Registry B2B. Les chiffres ci-dessus sont construits sur des hypothèses documentées dans le plan An 3 — ils seront mis à jour à chaque jalon.",
    },
    cta: {
      title: "Lire le path vers €1M.",
      body: "Les quatre leviers qui font franchir le cap An 3, leurs hypothèses critiques, et la sensibilité du modèle si les lignes cassent partiellement.",
      label: "Voir la vision",
      href: "/vision",
    },
  },
  en: {
    metaTitle: "Business Plan",
    metaDescription:
      "CAIO Academy's 100% public business plan: tiers, add-ons, unit economics, funnel per avatar, and three-year projections.",
    hero: {
      eyebrow: "Business",
      title: "The business plan, 100% transparent.",
      lead: "Everything is public. Prices, unit economics, projections. No \"Contact Sales\" to see a price, no hidden conditions. If you're on this page, you already have the same numbers we do.",
    },
    tiers: {
      eyebrow: "Tiers",
      title: "Three tiers, one ecosystem.",
      lead: "Free fills the pipeline. €67/month creates productive frustration. €3,500 delivers the transformation. €500/month builds the stable recurring layer.",
      items: [
        {
          name: "Foundation",
          price: "€67",
          period: "/month",
          tagline: "Theory tier, cancellable.",
          bullets: [
            "5 paths tailored to each avatar",
            "8 modules per path with deliverables",
            "1 template system (light version)",
            "Access to the CAIO Network community",
            "The CAIO Brief newsletter",
            "Quarterly content updates",
          ],
          cta: "Browse courses",
          href: "/formations",
          note: "Real value, intentionally incomplete. The full system lives in the Founding Cohort tier.",
        },
        {
          name: "Founding Cohort",
          price: "€3,500",
          period: "one-shot",
          tagline: "Full programme, lifetime access.",
          bullets: [
            "Everything in Foundation included",
            "Build #1: AI monitoring system",
            "Build #2: guided agent orchestration",
            "Build #3: AI ROI dashboard from scratch",
            "All templates and full systems",
            "CAIO Academy certificate",
            "CAIO Registry access (visible profile)",
          ],
          cta: "Join the Beta",
          href: "/beta",
          note: "3 × €1,250 or 6 × €650 payment plans available. Price stabilises to €3,000 after Year 1.",
          highlight: true,
        },
        {
          name: "Mastermind",
          price: "€500",
          period: "/month",
          tagline: "Recurring layer, 30 members max.",
          bullets: [
            "2 group calls / month (90 min each)",
            "Bi-monthly hot seat: project review",
            "Early access to new systems",
            "Shared lead network between members",
            "Private thread, 48-hour response",
            "Co-creation and offer review",
          ],
          cta: "Apply to Mastermind",
          href: "/roadmap",
          note: "30 members = €15,000 / month. The cap is a deliberate constraint that creates scarcity.",
        },
      ],
    },
    addons: {
      eyebrow: "Add-ons",
      title: "The Year 2-3 revenue pillars.",
      items: [
        {
          name: "Mastermind Premium",
          price: "€1,500",
          period: "/month",
          cap: "10 members max",
          body: "Monthly 1:1 with Gareth, warm intros in the Registry, placement priority. Application + interview required. Aimed at senior alumni already monetising their training (€5-15k / month).",
        },
        {
          name: "B2B Registry Subscription",
          price: "€1,000",
          period: "/month",
          cap: "Target: 30 companies by Year 3",
          body: "Unlimited access to certified profiles, prioritised match-making, CAIO market analytics, placement commission dropped to 10% (vs 20% off-subscription). €360k ARR by Year 3.",
        },
        {
          name: "B2B Workshops",
          price: "€8,000-25,000",
          period: "/ session",
          cap: "SME-to-mid 50-500 employees",
          body: "C-suite training on AI governance, 2-3 days on site. 8 workshops in Year 2 at €12k average, 20 in Year 3 at €15k average. 70% net margin after travel costs.",
        },
        {
          name: "Standalone systems",
          price: "€297-997",
          period: "one-shot",
          cap: "Gumroad + direct sale",
          body: "AI monitoring at €297, full agent orchestration at €497, three-system bundle at €997. Self-service, zero intervention from Gareth beyond quarterly maintenance.",
        },
      ],
    },
    economics: {
      eyebrow: "Unit economics",
      title: "What every euro spent returns.",
      lead: "Weighted averages on the two priority avatars (SaaS CTO and AI Consultant). See the \"gaps\" line below for metrics not yet measured.",
      items: [
        { value: "€300-400", label: "Average CAC Year 3" },
        { value: "€9.5-21.5k", label: "12-month LTV (priority avatars)" },
        { value: "20x+", label: "LTV / CAC ratio" },
        { value: "70%", label: "Workshop net margin" },
      ],
    },
    funnel: {
      eyebrow: "Funnel per avatar",
      title: "Five profiles, one clear priority.",
      lead: "Two avatars in active acquisition (SaaS CTO and AI Consultant). SME CEO comes by referral after month 6. Ambitious Dev plays a volume-ambassador role.",
    },
    projections: {
      eyebrow: "Three-year projections",
      title: "From PMF validation to the million mark.",
    },
    gaps: {
      eyebrow: "Transparency",
      title: "What we haven't measured yet.",
      body: "Beta Phase I (2025) validated pricing at €1,500 across 15 people but hasn't yet produced stable data on real payback, 12-month Mastermind churn, or the B2B Registry conversion rate. The numbers above are built on hypotheses documented in the Year 3 plan — they'll be updated at every milestone.",
    },
    cta: {
      title: "Read the path to €1M.",
      body: "The four levers that cross the Year 3 mark, their critical assumptions, and the model's sensitivity when lines break partially.",
      label: "Read the vision",
      href: "/vision",
    },
  },
} satisfies Record<Locale, unknown>;

const FUNNEL_FR = [
  {
    avatar: "CTO SaaS",
    channel: "LinkedIn + Meetups tech",
    message: "« Ce que ta stack ne t'a pas appris »",
    entry: "€3 500",
    ltv: "€9 500",
    priority: "#1",
  },
  {
    avatar: "Consultant AI",
    channel: "Malt / Comet / LinkedIn",
    message: "« Multiplie ton TJM × 2 en 90 jours »",
    entry: "€3 500 + Premium",
    ltv: "€21 500",
    priority: "#2",
  },
  {
    avatar: "DG PME",
    channel: "Réseau / recommandation",
    message: "« Votre concurrent AI vous dépasse »",
    entry: "Workshop B2B",
    ltv: "€30 000+",
    priority: "#3 (après M6)",
  },
  {
    avatar: "Head of Digital",
    channel: "LinkedIn + podcasts management",
    message: "« Pilote l'AI sans savoir coder »",
    entry: "€67 / mois",
    ltv: "€5 000",
    priority: "#4",
  },
  {
    avatar: "Dev Ambitieux",
    channel: "Twitter/X + Discord",
    message: "« De dev à CAIO en 12 mois »",
    entry: "Gratuit → plan 6×",
    ltv: "€3 800",
    priority: "#5 (ambassadeur)",
  },
];

const FUNNEL_EN = [
  {
    avatar: "SaaS CTO",
    channel: "LinkedIn + tech meet-ups",
    message: "\"What your stack never taught you\"",
    entry: "€3,500",
    ltv: "€9,500",
    priority: "#1",
  },
  {
    avatar: "AI Consultant",
    channel: "Malt / Comet / LinkedIn",
    message: "\"Double your day rate in 90 days\"",
    entry: "€3,500 + Premium",
    ltv: "€21,500",
    priority: "#2",
  },
  {
    avatar: "SME CEO",
    channel: "Network / referral",
    message: "\"Your AI competitor is pulling ahead\"",
    entry: "B2B workshop",
    ltv: "€30,000+",
    priority: "#3 (after M6)",
  },
  {
    avatar: "Head of Digital",
    channel: "LinkedIn + management podcasts",
    message: "\"Steer AI without coding\"",
    entry: "€67 / month",
    ltv: "€5,000",
    priority: "#4",
  },
  {
    avatar: "Ambitious Dev",
    channel: "Twitter/X + Discord",
    message: "\"From dev to CAIO in 12 months\"",
    entry: "Free → 6× plan",
    ltv: "€3,800",
    priority: "#5 (ambassador)",
  },
];

const PROJECTIONS_FR = [
  {
    year: "An 1 — 2026",
    revenue: "€215-250k",
    drivers: [
      "Beta cohorte 15 × €1 500 → €22 500",
      "48 ventes Founding Cohort €3 500 → €168 000",
      "20 membres Mastermind × 6 mois → €60 000",
    ],
    milestone: "Validation PMF, volontairement recadré sur le haut-ticket.",
  },
  {
    year: "An 2 — 2027",
    revenue: "€620k",
    drivers: [
      "120 ventes Formation €3 500 → €420 000",
      "30 membres Standard + 5 Premium → €270 000",
      "10 placements CAIO → €115 000",
      "8 workshops B2B à €12k → €96 000",
    ],
    milestone: "Scale Founding Cohort, ouverture Mastermind Premium, 5 pilotes Registry.",
  },
  {
    year: "An 3 — 2028",
    revenue: "€1 050k",
    drivers: [
      "200 ventes à €3 000 → €600 000",
      "30 Standard + 10 Premium → €360 000",
      "30 entreprises Registry × 12 mois → €360 000",
      "20 workshops B2B à €15k → €300 000",
      "30 placements × €5k → €150 000",
      "200 packs systèmes × €997 → €199 400",
    ],
    milestone: "Registry devient l'actif principal, cap €1M franchi.",
  },
];

const PROJECTIONS_EN = [
  {
    year: "Year 1 — 2026",
    revenue: "€215-250k",
    drivers: [
      "Beta cohort 15 × €1,500 → €22,500",
      "48 Founding Cohort sales €3,500 → €168,000",
      "20 Mastermind members × 6 months → €60,000",
    ],
    milestone: "PMF validation, intentionally re-centred on the high ticket.",
  },
  {
    year: "Year 2 — 2027",
    revenue: "€620k",
    drivers: [
      "120 €3,500 course sales → €420,000",
      "30 Standard + 5 Premium members → €270,000",
      "10 CAIO placements → €115,000",
      "8 B2B workshops at €12k → €96,000",
    ],
    milestone: "Founding Cohort scale, Mastermind Premium opens, 5 Registry pilots.",
  },
  {
    year: "Year 3 — 2028",
    revenue: "€1,050k",
    drivers: [
      "200 sales at €3,000 → €600,000",
      "30 Standard + 10 Premium → €360,000",
      "30 Registry companies × 12 months → €360,000",
      "20 B2B workshops at €15k → €300,000",
      "30 placements × €5k → €150,000",
      "200 system bundles × €997 → €199,400",
    ],
    milestone: "Registry becomes the main asset, €1M mark crossed.",
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

export default async function BusinessPlanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in CONTENT ? (locale as Locale) : "fr";
  const c = CONTENT[key];
  const funnelRows = key === "en" ? FUNNEL_EN : FUNNEL_FR;
  const projections = key === "en" ? PROJECTIONS_EN : PROJECTIONS_FR;

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

      <Section eyebrow={c.tiers.eyebrow} title={c.tiers.title} lead={c.tiers.lead}>
        <div className="grid gap-8 md:grid-cols-3">
          {c.tiers.items.map((t) => (
            <article
              key={t.name}
              className={
                "flex flex-col border p-8 transition-colors duration-150 " +
                (t.highlight
                  ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-paper)] hover:text-[color:var(--color-ink)]"
                  : "border-[color:var(--color-line-strong)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]")
              }
            >
              <h3 className="font-serif text-2xl font-bold tracking-tight">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-5xl font-black tracking-tight">{t.price}</span>
                <span className="font-sans text-sm font-semibold uppercase tracking-wider opacity-70">
                  {t.period}
                </span>
              </div>
              <p className="mt-4 font-serif text-base font-bold">{t.tagline}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm leading-[1.6]">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-px w-3 bg-current opacity-60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-[1.6] opacity-70">{t.note}</p>
              <div className="mt-8">
                <CtaLink
                  href={`/${locale}${t.href}`}
                  variant={t.highlight ? "outline" : "ink"}
                  size="md"
                  className={t.highlight ? "border-[color:var(--color-paper)] bg-transparent text-[color:var(--color-paper)] hover:bg-[color:var(--color-paper)] hover:text-[color:var(--color-ink)]" : ""}
                >
                  {t.cta}
                </CtaLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow={c.addons.eyebrow} title={c.addons.title}>
        <div className="grid gap-6 md:grid-cols-2">
          {c.addons.items.map((a) => (
            <article
              key={a.name}
              className="border border-[color:var(--color-line-strong)] p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-serif text-xl font-bold tracking-tight">{a.name}</h3>
                <div className="font-serif text-2xl font-black tracking-tight">
                  {a.price}
                  <span className="ml-1 font-sans text-xs font-semibold uppercase tracking-wider text-[color:var(--color-muted)]">
                    {a.period}
                  </span>
                </div>
              </div>
              <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                {a.cap}
              </p>
              <p className="mt-4 text-sm leading-[1.7] text-[color:var(--color-muted)]">
                {a.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow={c.economics.eyebrow} title={c.economics.title} lead={c.economics.lead}>
        <div className="grid gap-10 md:grid-cols-4">
          {c.economics.items.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>

      <Section eyebrow={c.funnel.eyebrow} title={c.funnel.title} lead={c.funnel.lead}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {[
                  key === "en" ? "Avatar" : "Avatar",
                  key === "en" ? "Primary channel" : "Canal principal",
                  key === "en" ? "Key message" : "Message clé",
                  key === "en" ? "Entry tier" : "Tier d'entrée",
                  "LTV",
                  key === "en" ? "Priority" : "Priorité",
                ].map((h) => (
                  <th
                    key={h}
                    className="border-b-2 border-[color:var(--color-ink)] py-4 pr-4 text-left font-sans text-xs font-semibold uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {funnelRows.map((r) => (
                <tr key={r.avatar} className="align-top">
                  <td className="border-b border-[color:var(--color-line)] py-4 pr-4 font-serif text-base font-bold">
                    {r.avatar}
                  </td>
                  <td className="border-b border-[color:var(--color-line)] py-4 pr-4 text-[color:var(--color-muted)]">
                    {r.channel}
                  </td>
                  <td className="border-b border-[color:var(--color-line)] py-4 pr-4 italic text-[color:var(--color-muted)]">
                    {r.message}
                  </td>
                  <td className="border-b border-[color:var(--color-line)] py-4 pr-4 font-mono text-xs">
                    {r.entry}
                  </td>
                  <td className="border-b border-[color:var(--color-line)] py-4 pr-4 font-serif font-bold">
                    {r.ltv}
                  </td>
                  <td className="border-b border-[color:var(--color-line)] py-4 font-mono text-xs">
                    {r.priority}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow={c.projections.eyebrow} title={c.projections.title}>
        <div className="grid gap-10 md:grid-cols-3">
          {projections.map((p) => (
            <article key={p.year} className="border-t border-[color:var(--color-ink)] pt-8">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                {p.year}
              </p>
              <div className="mt-4 font-serif text-5xl font-black tracking-tight">
                {p.revenue}
              </div>
              <ul className="mt-6 space-y-2 text-sm leading-[1.6]">
                {p.drivers.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-px w-3 bg-[color:var(--color-ink)] opacity-60"
                    />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-serif text-sm font-bold italic text-[color:var(--color-muted)]">
                {p.milestone}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow={c.gaps.eyebrow} title={c.gaps.title}>
        <p className="max-w-3xl text-base leading-[1.7] text-[color:var(--color-muted)]">
          {c.gaps.body}
        </p>
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
            <CtaLink href={`/${locale}${c.cta.href}`} variant="ink" size="lg">
              {c.cta.label}
            </CtaLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
