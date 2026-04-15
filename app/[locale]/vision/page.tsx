import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { Prose } from "@/components/prose";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Locale = "fr" | "en";

const CONTENT = {
  fr: {
    metaTitle: "Vision",
    metaDescription:
      "L'architecture 10 ans de CAIO Academy : trois piliers, path millionnaire An 1-3, exit strategy et manifesto du rôle CAIO.",
    hero: {
      eyebrow: "Vision",
      title: "L'architecture de l'empire 10 ans.",
      lead: "Un écosystème complet qui fabrique, certifie et place les Chief AI Officers de demain — et qui vend les systèmes qu'ils utilisent. Horizon : 2026-2035.",
    },
    pillars: {
      eyebrow: "Les trois piliers",
      title: "AgentikOS · CAIO Academy · Gareth.",
      lead: "CAIO Academy est le pilier humain. AgentikOS est le pilier produit. Gareth est le point de départ — et le pilier qui devient remplaçable en An 5.",
      items: [
        {
          name: "AgentikOS",
          role: "Le produit.",
          body: "Le système d'exploitation d'agents AI pour entreprises — orchestration, monitoring, dashboards ROI. Chaque alumni de la Founding Cohort peut utiliser, revendre et installer AgentikOS chez ses clients. C'est le pilier défensif qui survit aux changements de stack.",
        },
        {
          name: "CAIO Academy",
          role: "L'humain.",
          body: "La formation, la certification et le placement. Cinq avatars, trois tiers, un Registry B2B. Les alumni deviennent ambassadeurs — chaque promotion en génère quatre à six referrals payants sur les douze mois suivants.",
        },
        {
          name: "Gareth",
          role: "Le fondateur.",
          body: "Voix éditoriale, animateur des masterminds, chasseur des premières entreprises pilotes du Registry. En An 5, le rôle devient optionnel grâce à une équipe senior (Community Manager, Expert Tech, Head of Partnerships B2B) et des process documentés.",
        },
      ],
    },
    path: {
      eyebrow: "Path millionnaire",
      title: "An 1 → An 2 → An 3.",
      lead: "An 1 valide le produit avec la Beta payante à €1,500 et la Founding Cohort €3,500. An 2 escalade la machine formation. An 3 bascule : le Registry B2B Subscription devient l'actif principal, les workshops haut de gamme montent à €15k moyen, le Mastermind Premium double.",
      years: [
        {
          year: "An 1 — 2026",
          headline: "€215-250k",
          subtitle: "Validation PMF.",
          body: "Beta cohorte de 15 personnes à €1,500, 48 ventes Founding Cohort à €3,500, 20 membres Mastermind. Objectif volontairement recadré sur le haut-ticket.",
        },
        {
          year: "An 2 — 2027",
          headline: "€620k",
          subtitle: "Scale Founding Cohort.",
          body: "120 ventes Formation €3,500, 30 membres Mastermind, 5 Premium, premiers placements CAIO, 8 workshops B2B à €12k moyen.",
        },
        {
          year: "An 3 — 2028",
          headline: "€1 050k",
          subtitle: "Registry devient l'actif.",
          body: "200 ventes à €3,000 (prix stabilisé), 30 standard + 10 Premium Mastermind, 30 entreprises abonnées Registry à €1,000/mois, 20 workshops à €15k moyen.",
        },
      ],
    },
    exit: {
      eyebrow: "Exit strategy",
      title: "Valorisation An 6 : €2-15M.",
      lead: "Trois scénarios en An 6 (2031). La fenêtre optimale de vente se situe An 5 à An 7. Avant An 4, les multiples restent bas (track record trop court). Après An 7, risque de plateau si la croissance passe sous 15 %/an.",
    },
    manifestoTitle: "Pourquoi le rôle CAIO existe maintenant.",
  },
  en: {
    metaTitle: "Vision",
    metaDescription:
      "The 10-year architecture of CAIO Academy: three pillars, Year 1-3 millionaire path, exit strategy, and the manifesto behind the CAIO role.",
    hero: {
      eyebrow: "Vision",
      title: "The 10-year empire architecture.",
      lead: "A complete ecosystem that trains, certifies, and places tomorrow's Chief AI Officers — and sells the systems they use. Horizon: 2026-2035.",
    },
    pillars: {
      eyebrow: "The three pillars",
      title: "AgentikOS · CAIO Academy · Gareth.",
      lead: "CAIO Academy is the human pillar. AgentikOS is the product pillar. Gareth is the starting point — and the pillar that becomes replaceable by Year 5.",
      items: [
        {
          name: "AgentikOS",
          role: "The product.",
          body: "The AI-agent operating system for companies — orchestration, monitoring, ROI dashboards. Every Founding Cohort alumnus can use, resell, and install AgentikOS at their clients. It's the defensive pillar that survives stack turnover.",
        },
        {
          name: "CAIO Academy",
          role: "The humans.",
          body: "Training, certification, and placement. Five avatars, three tiers, a B2B Registry. Alumni become ambassadors — each class generates four to six paying referrals over the next twelve months.",
        },
        {
          name: "Gareth",
          role: "The founder.",
          body: "Editorial voice, mastermind host, hunter of the first pilot Registry companies. By Year 5 the role becomes optional thanks to a senior team (Community Manager, Tech Lead, Head of B2B Partnerships) and documented processes.",
        },
      ],
    },
    path: {
      eyebrow: "Millionaire path",
      title: "Year 1 → Year 2 → Year 3.",
      lead: "Year 1 validates the product with the €1,500 paid Beta and the €3,500 Founding Cohort. Year 2 scales the training machine. Year 3 tips: the B2B Registry Subscription becomes the main asset, premium workshops climb to €15k average, and Mastermind Premium doubles.",
      years: [
        {
          year: "Year 1 — 2026",
          headline: "€215-250k",
          subtitle: "PMF validation.",
          body: "Beta cohort of 15 people at €1,500, 48 Founding Cohort sales at €3,500, 20 Mastermind members. Target intentionally re-centred on the high ticket.",
        },
        {
          year: "Year 2 — 2027",
          headline: "€620k",
          subtitle: "Founding Cohort scale.",
          body: "120 €3,500 course sales, 30 Mastermind members, 5 Premium, first CAIO placements, 8 B2B workshops at €12k average.",
        },
        {
          year: "Year 3 — 2028",
          headline: "€1,050k",
          subtitle: "Registry becomes the asset.",
          body: "200 course sales at €3,000 (stabilised price), 30 Standard + 10 Premium Mastermind, 30 Registry B2B subscribers at €1,000/month, 20 workshops at €15k average.",
        },
      ],
    },
    exit: {
      eyebrow: "Exit strategy",
      title: "Year-6 valuation: €2-15M.",
      lead: "Three scenarios in Year 6 (2031). The optimal selling window sits between Year 5 and Year 7. Before Year 4, multiples stay low (track record too short). After Year 7, plateau risk if growth falls below 15% / year.",
    },
    manifestoTitle: "Why the CAIO role exists now.",
  },
} satisfies Record<Locale, unknown>;

const EXIT_ROWS_FR = [
  {
    option: "Option A — Vente complète (An 6)",
    value: "€7-10M",
    range: "Fourchette basse €2-5M · haute €12-15M",
    note: "50-60 % cash, 30-40 % earn-out, 10-20 % actions acquéreur.",
  },
  {
    option: "Option B — Conservation + dividendes",
    value: "€190-400k/an nets",
    range: "Cumul 10 ans : €2,5-4M nets",
    note: "Lifestyle premium, charge mentale continue.",
  },
  {
    option: "Option C — Hybride (vente 51-70 %)",
    value: "€3,6M cash",
    range: "Cumul 7 ans : €6-10M",
    note: "Role CEO conservé, re-achat possible en An 8-10.",
  },
];

const EXIT_ROWS_EN = [
  {
    option: "Option A — Full sale (Year 6)",
    value: "€7-10M",
    range: "Low end €2-5M · high end €12-15M",
    note: "50-60% cash, 30-40% earn-out, 10-20% acquirer equity.",
  },
  {
    option: "Option B — Keep + dividends",
    value: "€190-400k/yr net",
    range: "10-year cumulative: €2.5-4M net",
    note: "Premium lifestyle, ongoing mental load.",
  },
  {
    option: "Option C — Hybrid (sell 51-70%)",
    value: "€3.6M cash",
    range: "7-year cumulative: €6-10M",
    note: "CEO role retained, buy-back option Year 8-10.",
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

export default async function VisionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const key: Locale = (locale as Locale) in CONTENT ? (locale as Locale) : "fr";
  const c = CONTENT[key];
  const exitRows = key === "en" ? EXIT_ROWS_EN : EXIT_ROWS_FR;

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

      <Section eyebrow={c.pillars.eyebrow} title={c.pillars.title} lead={c.pillars.lead}>
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {c.pillars.items.map((p) => (
            <article
              key={p.name}
              className="flex flex-col border-t border-[color:var(--color-ink)] pt-8"
            >
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                {p.role}
              </p>
              <h3 className="font-serif text-2xl font-bold leading-tight tracking-tight">
                {p.name}
              </h3>
              <p className="mt-4 text-base leading-[1.7] text-[color:var(--color-muted)]">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow={c.path.eyebrow} title={c.path.title} lead={c.path.lead}>
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {c.path.years.map((y) => (
            <article
              key={y.year}
              className="border-l-2 border-[color:var(--color-ink)] pl-6"
            >
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                {y.year}
              </p>
              <div className="mt-4 font-serif text-5xl font-black tracking-tight">
                {y.headline}
              </div>
              <p className="mt-3 font-serif text-lg font-bold">{y.subtitle}</p>
              <p className="mt-4 text-sm leading-[1.7] text-[color:var(--color-muted)]">
                {y.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow={c.exit.eyebrow} title={c.exit.title} lead={c.exit.lead}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b-2 border-[color:var(--color-ink)] py-4 pr-6 text-left font-sans text-xs font-semibold uppercase tracking-wider">
                  {key === "en" ? "Scenario" : "Scénario"}
                </th>
                <th className="border-b-2 border-[color:var(--color-ink)] py-4 pr-6 text-left font-sans text-xs font-semibold uppercase tracking-wider">
                  {key === "en" ? "Target" : "Cible"}
                </th>
                <th className="border-b-2 border-[color:var(--color-ink)] py-4 pr-6 text-left font-sans text-xs font-semibold uppercase tracking-wider">
                  {key === "en" ? "Range" : "Fourchette"}
                </th>
                <th className="border-b-2 border-[color:var(--color-ink)] py-4 text-left font-sans text-xs font-semibold uppercase tracking-wider">
                  {key === "en" ? "Structure" : "Structure"}
                </th>
              </tr>
            </thead>
            <tbody>
              {exitRows.map((r) => (
                <tr key={r.option} className="align-top">
                  <td className="border-b border-[color:var(--color-line)] py-5 pr-6 font-serif text-base font-bold">
                    {r.option}
                  </td>
                  <td className="border-b border-[color:var(--color-line)] py-5 pr-6 font-serif text-lg font-bold">
                    {r.value}
                  </td>
                  <td className="border-b border-[color:var(--color-line)] py-5 pr-6 text-sm text-[color:var(--color-muted)]">
                    {r.range}
                  </td>
                  <td className="border-b border-[color:var(--color-line)] py-5 text-sm text-[color:var(--color-muted)]">
                    {r.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow={key === "en" ? "Manifesto" : "Manifeste"} title={c.manifestoTitle}>
        {key === "fr" ? (
          <Prose>
            <p>
              Le rôle <em>Chief AI Officer</em> est en train de se structurer — et il va durer.
              Les entreprises ne cherchent pas un dev AI de plus. Elles cherchent quelqu’un qui
              sait lire une organisation comme un système, choisir les bons outils, les mettre en
              production, mesurer leur ROI, et pitcher ça à un board qui ne parle pas SQL.
            </p>
            <p>
              C’est un rôle transverse. Moitié stratégie, moitié exécution. Il n’est formé nulle
              part. Les écoles de commerce enseignent la stratégie mais pas les agents. Les écoles
              d’ingénieurs enseignent le code mais pas la gouvernance. Les formations LinkedIn
              Learning à €19/mois enseignent le prompt, pas le système. Personne ne tient la
              jonction — et celui qui la tient en premier définit ce que le rôle veut dire.
            </p>
            <p>
              On ne construit pas une identité autour de Convex, Composio ou Claude Code. Les
              outils changent. Dans 18 mois, la moitié de la stack recommandée en 2025 aura
              pivoté. L’identité est autour du <em>rôle</em>, et le curriculum est mis à jour
              trimestriellement. Principe : on enseigne les concepts, on met à jour les outils.
            </p>
            <p>
              Cinq avatars, un seul écosystème, trois tiers de prix. Le gratuit remplit le
              pipeline. Le €67/mois crée la frustration productive. Le €3,500 délivre la
              transformation. Le €500/mois construit le récurrent stable. Chaque passage est
              motivé par une valeur incomplète intentionnelle au tier précédent — pas par de la
              rétention artificielle, par de la progression naturelle.
            </p>
            <p>
              L’actif final n’est ni la formation, ni le contenu, ni même les systèmes. C’est le{" "}
              <em>Registry</em> : un réseau fermé de profils certifiés connecté aux entreprises
              qui recrutent un CAIO. En An 3, cet actif vaut €360k d’ARR et constitue le moat
              défensif que personne ne peut copier sans trois ans d’avance.
            </p>
            <p>
              Le seul vrai risque dans ce plan, c’est de <em>trop réfléchir</em> et pas assez
              exécuter.
            </p>
          </Prose>
        ) : (
          <Prose>
            <p>
              The <em>Chief AI Officer</em> role is becoming a structured profession — and it will
              last. Companies aren’t looking for one more AI engineer. They’re looking for someone
              who can read an organisation as a system, pick the right tools, ship them to
              production, measure ROI, and pitch it to a board that doesn’t speak SQL.
            </p>
            <p>
              It’s a cross-functional role. Half strategy, half execution. Nobody trains for it.
              Business schools teach strategy but not agents. Engineering schools teach code but
              not governance. €19/month LinkedIn Learning courses teach prompts, not systems.
              Nobody owns the junction — and whoever owns it first defines what the role means.
            </p>
            <p>
              We don’t build an identity around Convex, Composio, or Claude Code. The tools
              change. In 18 months, half the stack recommended in 2025 will have pivoted. The
              identity sits around the <em>role</em>, and the curriculum is refreshed quarterly.
              The principle: we teach the concepts, we update the tools.
            </p>
            <p>
              Five avatars, one ecosystem, three price tiers. The free tier fills the pipeline.
              The €67/month tier creates productive frustration. The €3,500 tier delivers the
              transformation. The €500/month tier builds the stable recurring layer. Every
              upgrade is driven by intentionally incomplete value at the prior tier — not by
              artificial retention, but by natural progression.
            </p>
            <p>
              The end-state asset isn’t the course, the content, or even the systems. It’s the{" "}
              <em>Registry</em>: a closed network of certified profiles connected to companies
              hiring a CAIO. By Year 3, this asset is worth €360k of ARR and forms the defensive
              moat nobody can copy without a three-year head start.
            </p>
            <p>
              The only real risk in this plan is <em>overthinking</em> and under-executing.
            </p>
          </Prose>
        )}
      </Section>
    </PageShell>
  );
}
