import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const META = {
  fr: {
    title: "Kommu — Formations IA Avancées",
    description:
      "Le programme de formation opérationnel Kommu : 5 modules pour maîtriser l'IA en entreprise, du mindset CAIO au déploiement VPS.",
    eyebrow: "PROGRAMME KOMMU",
    heading: "Kommu — Formation Action IA",
    lead: "Le programme de formation opérationnel pour 2026-2027. Cinq modules progressifs qui transforment la théorie IA en compétences concrètes, du mindset stratégique au déploiement de systèmes autonomes.",
  },
  en: {
    title: "Kommu — Advanced AI Training",
    description:
      "The Kommu operational training program: 5 modules to master AI in business, from CAIO mindset to VPS deployment.",
    eyebrow: "KOMMU PROGRAM",
    heading: "Kommu — AI Action Training",
    lead: "The operational training program for 2026-2027. Five progressive modules that turn AI theory into concrete skills, from strategic mindset to autonomous system deployment.",
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

const modules = [
  {
    number: "01",
    title: "Intro : La Philosophie IA",
    description:
      "La courbe d'accélération de l'intelligence artificielle redéfinit les règles du jeu en 2026. Ce module fondateur pose les bases du mindset CAIO : comprendre pourquoi l'IA ne se résume plus à des outils isolés mais constitue un écosystème complet — des modèles de langage aux agents autonomes, en passant par les systèmes multi-agents orchestrés. Vous découvrirez ce qui sépare les entreprises qui exploitent réellement l'IA de celles qui se contentent d'en parler. La philosophie Agentik OS — délégation intelligente, qualité systématique, autonomie contrôlée — sert de fil conducteur pour comprendre pourquoi le rôle de Chief AI Officer existe maintenant et comment il transforme la gouvernance technologique.",
    apporte: [
      "Vision stratégique de la trajectoire IA 2026-2028",
      "Mindset CAIO : posture, responsabilités, impact organisationnel",
      "Compréhension de la chaîne outils → agents → systèmes autonomes",
      "Framework d'évaluation de la maturité IA d'une organisation",
    ],
    plan: [
      "Réaliser un audit de maturité IA de son entreprise",
      "Cartographier les cas d'usage IA à fort impact",
      "Définir le périmètre du rôle CAIO en interne",
    ],
    audience: "Dirigeants, managers, décideurs tech souhaitant comprendre l'enjeu stratégique de l'IA",
  },
  {
    number: "02",
    title: "Stack System Builder (MCP)",
    description:
      "Le Model Context Protocol est le standard émergent qui connecte les modèles d'IA à vos outils existants. Ce module technique vous apprend à construire votre propre stack IA en utilisant MCP comme couche d'intégration universelle. Vous comprendrez comment un serveur MCP expose des outils, des ressources et des prompts aux modèles de langage, permettant à Claude, GPT ou tout autre LLM d'interagir directement avec vos bases de données, APIs et systèmes internes. L'architecture de référence Agentik OS — avec ses 267 agents et ses 130+ skills — sert d'exemple concret de ce qu'un stack MCP mature peut accomplir en production.",
    apporte: [
      "Compétences pratiques en construction de serveurs MCP",
      "Capacité à intégrer n'importe quel outil existant dans un workflow IA",
      "Compréhension de l'écosystème agent-outil et de ses patterns",
      "Architecture de référence pour un stack IA d'entreprise",
    ],
    plan: [
      "Installer et configurer son premier serveur MCP",
      "Connecter 3 outils existants de l'entreprise via MCP",
      "Construire un workflow MCP de bout en bout en production",
      "Documenter l'architecture pour l'équipe technique",
    ],
    audience: "Développeurs, architectes techniques, CTOs voulant construire une infrastructure IA intégrée",
  },
  {
    number: "03",
    title: "Claude Master Class",
    description:
      "Maîtriser Claude ne se limite pas à écrire des prompts dans une interface web. Ce module avancé couvre l'ensemble de l'écosystème Claude : du CLI Claude Code pour le développement assisté par IA, à l'API Claude pour l'intégration programmatique, en passant par les patterns d'agents autonomes et l'orchestration multi-agents. Vous apprendrez à concevoir des workflows où plusieurs agents collaborent, à utiliser le système de hooks pour automatiser des comportements, à créer vos propres commandes et skills, et à gérer la mémoire et le contexte à grande échelle. Le passage du simple assistant conversationnel au système multi-agents orchestré est le saut qualitatif que ce module rend accessible.",
    apporte: [
      "Expertise approfondie de Claude Code CLI et de l'API Claude",
      "Design de workflows autonomes avec agents spécialisés",
      "Compétences en architecture multi-agents et orchestration",
      "Maîtrise du système de hooks, commandes et skills",
    ],
    plan: [
      "Configurer Claude Code avec un environnement de développement optimisé",
      "Créer ses premiers agents spécialisés avec des règles et des skills",
      "Déployer un workflow multi-agents en production",
      "Mettre en place un système de mémoire persistante inter-sessions",
    ],
    audience: "Développeurs IA, ingénieurs systèmes, tech leads souhaitant exploiter Claude au maximum",
  },
  {
    number: "04",
    title: "Prompt & Context Engineering",
    description:
      "L'ingénierie de prompt est une discipline à part entière, pas un simple exercice de rédaction. Ce module couvre la science de la conception de prompts et la gestion du contexte : architecture de system prompts, patterns few-shot, chaîne de pensée structurée, gestion de la fenêtre de contexte, fichiers CLAUDE.md, système de rules, disclosure progressive et optimisation des tokens. Vous apprendrez à construire des systèmes de prompts reproductibles qui garantissent une qualité constante, à gérer le contexte quand il dépasse les limites du modèle, et à mesurer objectivement la qualité de vos outputs. La différence entre un prompt amateur et un système de prompts professionnel est la même qu'entre un script shell et une architecture logicielle.",
    apporte: [
      "Méthodologie systématique de conception de prompts",
      "Maîtrise de l'ingénierie de contexte et de la gestion de tokens",
      "Patterns reproductibles pour garantir la qualité des outputs",
      "Techniques avancées : chain-of-thought, few-shot, progressive disclosure",
      "Capacité à auditer et améliorer des prompts existants",
    ],
    plan: [
      "Créer un système de prompts structuré pour son organisation",
      "Optimiser la gestion du contexte sur des projets réels",
      "Mesurer et améliorer la qualité des outputs avec des métriques",
      "Construire une bibliothèque de prompts réutilisables et documentés",
    ],
    audience: "Tous profils travaillant avec des LLMs : développeurs, product managers, content creators, data scientists",
  },
  {
    number: "05",
    title: "Building AI Systems : VPS Setup",
    description:
      "Les systèmes IA autonomes ont besoin d'une infrastructure qui tourne 24/7, pas d'un laptop ouvert sur un bureau. Ce module pratique couvre le provisionnement et la sécurisation d'un VPS pour les charges de travail IA : configuration SSH durcie, gestion des containers Docker, orchestration de processus avec tmux, monitoring des ressources, déploiement Vercel, et mise en place de pipelines CI/CD adaptés aux projets IA. L'infrastructure Agentik OS — un VPS qui fait tourner 267 agents en continu avec gestion automatique des sessions, locks de déploiement et monitoring temps réel — sert de template concret. Le passage de \"ça marche sur mon poste\" à \"ça tourne en production de manière fiable\" est exactement ce que ce module enseigne.",
    apporte: [
      "Infrastructure production-ready pour charges de travail IA",
      "Compétences en déploiement, sécurisation et administration système",
      "Patterns d'orchestration de processus IA en continu",
      "Monitoring et observabilité des systèmes autonomes",
      "Template d'infrastructure reproductible basé sur Agentik OS",
    ],
    plan: [
      "Provisionner et sécuriser un VPS dédié aux workloads IA",
      "Configurer Docker, tmux et les outils d'orchestration",
      "Déployer un premier agent autonome en production",
      "Mettre en place le monitoring et les alertes",
    ],
    audience: "DevOps, SRE, développeurs full-stack, toute personne déployant des systèmes IA en production",
  },
];

export default async function KommuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const k: Locale = (locale as Locale) in META ? (locale as Locale) : "fr";
  const c = META[k];

  return (
    <PageShell>
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
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-col gap-8">
            {modules.map((mod) => (
              <div
                key={mod.number}
                className="border border-[color:var(--color-line)] p-8 sm:p-10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex h-10 w-10 items-center justify-center border border-[color:var(--color-ink)] font-sans text-sm font-bold">
                    {mod.number}
                  </span>
                  <h3 className="font-serif text-xl font-bold sm:text-2xl">
                    {mod.title}
                  </h3>
                </div>

                <p className="text-base leading-[1.7] text-[color:var(--color-muted)]">
                  {mod.description}
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                      Ce que cette formation apporte
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {mod.apporte.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[color:var(--color-ink)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                      {"Plan d'action concret"}
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {mod.plan.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[color:var(--color-ink)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-6 font-sans text-xs text-[color:var(--color-muted)]">
                  Public cible : {mod.audience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
