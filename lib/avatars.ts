import fs from "node:fs";
import path from "node:path";

export type AvatarMeta = {
  slug: string;
  priority: number;
  filePathFR: string;
  filePathEN: string;
  // Curated summary (avoids PDF extraction artifacts for hero/sidebar)
  title: { fr: string; en: string };
  role: { fr: string; en: string };
  pains: { fr: string; en: string };
  transformation: { fr: string; en: string };
  price: { fr: string; en: string };
  summary: { fr: string; en: string };
};

const AVATAR_ROOT =
  "/home/hacker/VibeCoding/1-life/05-business/01-caio/02-avatars";

export const AVATARS: AvatarMeta[] = [
  {
    slug: "cto-saas",
    priority: 1,
    filePathFR: `${AVATAR_ROOT}/01-CTO-SaaS-FR.md`,
    filePathEN: `${AVATAR_ROOT}/01-CTO-SaaS-EN.md`,
    title: { fr: "Le CTO SaaS", en: "The SaaS CTO" },
    role: {
      fr: "CTO d'une scale-up SaaS, 30-200 personnes, qui doit passer de livreur de code à pilote d'une stratégie AI au niveau board.",
      en: "CTO of a 30–200 person SaaS scale-up, moving from shipping code to leading an AI strategy at board level.",
    },
    pains: {
      fr: "Le board demande une vision AI, pas un roadmap technique. L'équipe demande des outils, pas des slides. Le CTO tient la jonction sans repère.",
      en: "The board wants an AI vision, not a tech roadmap. The team wants tools, not slides. The CTO holds the junction with no reference model.",
    },
    transformation: {
      fr: "Passer de CTO-implémenteur à CAIO-architecte : lire l'organisation comme un système, prioriser les use cases par ROI, orchestrer agents et humains.",
      en: "Shift from implementer-CTO to architect-CAIO: read the organisation as a system, prioritise use cases by ROI, orchestrate agents and humans.",
    },
    price: { fr: "€3 500 — Founding Cohort", en: "€3,500 — Founding Cohort" },
    summary: {
      fr: "Priorité 1. Le CTO qui bascule en CAIO. Cible principale de la Founding Cohort 2026.",
      en: "Priority 1. The CTO who pivots into CAIO. Primary Founding Cohort 2026 target.",
    },
  },
  {
    slug: "consultant-ai",
    priority: 2,
    filePathFR: `${AVATAR_ROOT}/02-Consultant-AI-FR.md`,
    filePathEN: `${AVATAR_ROOT}/02-Consultant-AI-EN.md`,
    title: { fr: "Le Consultant AI", en: "The AI Consultant" },
    role: {
      fr: "Consultant ou freelance tech qui vend déjà des missions AI et veut monter le ticket en passant de prestataire à CAIO externalisé.",
      en: "Consultant or tech freelancer already selling AI engagements who wants to lift ticket size by moving from supplier to fractional CAIO.",
    },
    pains: {
      fr: "Plafond de verre à €8-12k/mois. Missions perçues comme interchangeables. Pas de cadre pour pitcher un rôle stratégique plutôt qu'un livrable.",
      en: "Hitting a €8-12k/month ceiling. Engagements perceived as interchangeable. No framework to pitch a strategic role instead of a deliverable.",
    },
    transformation: {
      fr: "Construire une offre CAIO externalisé à €4-15k/mois. Packaging, pricing, Registry, positionnement. Passer de jobbing à portefeuille.",
      en: "Build a fractional CAIO offering at €4-15k/month. Packaging, pricing, Registry, positioning. Move from job-by-job to a portfolio.",
    },
    price: { fr: "€3 500 — Founding Cohort", en: "€3,500 — Founding Cohort" },
    summary: {
      fr: "Priorité 2. Consultant AI qui structure son offre CAIO et double son ticket moyen.",
      en: "Priority 2. AI consultant who structures a CAIO offering and doubles average ticket.",
    },
  },
  {
    slug: "dg-pme",
    priority: 3,
    filePathFR: `${AVATAR_ROOT}/03-DG-PME-FR.md`,
    filePathEN: `${AVATAR_ROOT}/03-DG-PME-EN.md`,
    title: { fr: "Le DG de PME", en: "The SMB General Manager" },
    role: {
      fr: "DG ou CEO d'une PME 20-300 personnes, non-tech, qui sent que l'AI est un enjeu existentiel mais ne sait pas où commencer ni à qui déléguer.",
      en: "GM or CEO of a 20–300 person non-tech SMB, feels AI is existential yet has no entry point and no clear person to delegate to.",
    },
    pains: {
      fr: "Discours AI partout, résultat nulle part. Peur de rater le train, peur d'investir à perte. Pas de CAIO interne, pas de budget pour un BigCo consulting.",
      en: "AI talk everywhere, results nowhere. Fear of missing out and fear of burning capital. No internal CAIO, no budget for BigCo consulting.",
    },
    transformation: {
      fr: "Comprendre comment structurer une fonction AI dans sa boîte : qui recruter, quoi externaliser, quels outils mesurer, quels risques couvrir.",
      en: "Learn how to structure an AI function in-house: who to hire, what to outsource, which tools to measure, which risks to cover.",
    },
    price: {
      fr: "€67/mois Public — workshops sur-mesure €12-15k",
      en: "€67/month Public — tailored workshops €12-15k",
    },
    summary: {
      fr: "Priorité 3. Le décideur qui achète un workshop et recrute un CAIO externalisé.",
      en: "Priority 3. The decision-maker who buys a workshop and hires a fractional CAIO.",
    },
  },
  {
    slug: "head-digital",
    priority: 4,
    filePathFR: `${AVATAR_ROOT}/04-Head-Digital-FR.md`,
    filePathEN: `${AVATAR_ROOT}/04-Head-Digital-EN.md`,
    title: {
      fr: "Le Head of Digital",
      en: "The Head of Digital",
    },
    role: {
      fr: "Head of Digital ou Chief Digital Officer dans un groupe mid-market, chargé d'orchestrer la transformation AI sans mandat CAIO formalisé.",
      en: "Head of Digital or Chief Digital Officer in a mid-market group, asked to run the AI transformation without a formal CAIO mandate.",
    },
    pains: {
      fr: "Mandat flou entre CTO, CDO et COO. Responsable de l'AI sans avoir les leviers. Besoin d'un cadre pour clarifier le périmètre et imposer la gouvernance.",
      en: "Fuzzy mandate between CTO, CDO and COO. Accountable for AI without the levers. Needs a framework to clarify scope and impose governance.",
    },
    transformation: {
      fr: "Se repositionner en CAIO interne : gouvernance, charte éthique, pilotage ROI par direction métier, rapport trimestriel au comex.",
      en: "Reposition as an internal CAIO: governance, ethics charter, ROI steering per business unit, quarterly comex report.",
    },
    price: {
      fr: "€3 500 Formation — €500/mois Mastermind",
      en: "€3,500 course — €500/month Mastermind",
    },
    summary: {
      fr: "Priorité 4. Cadre dirigeant digital qui transforme son rôle en CAIO interne.",
      en: "Priority 4. Digital executive who converts their role into an internal CAIO.",
    },
  },
  {
    slug: "dev-ambitieux",
    priority: 5,
    filePathFR: `${AVATAR_ROOT}/05-Dev-Ambitieux-FR.md`,
    filePathEN: `${AVATAR_ROOT}/05-Dev-Ambitieux-EN.md`,
    title: { fr: "Le Dev Ambitieux", en: "The Ambitious Dev" },
    role: {
      fr: "Développeur senior 3-8 ans d'expérience qui veut basculer du code à la stratégie et viser un poste de CAIO d'ici 24 mois.",
      en: "Senior developer with 3–8 years of experience who wants to pivot from code to strategy and land a CAIO role within 24 months.",
    },
    pains: {
      fr: "Plafond de verre dev : salaire bloqué, stack qui change tous les 18 mois, pas d'accès au board. Cherche un path qui donne de l'effet de levier.",
      en: "Dev career plateau: flat salary, stack churn every 18 months, no board access. Looking for a path that compounds leverage.",
    },
    transformation: {
      fr: "Devenir ambassadeur : passer de dev à architecte d'AI Systems, publier, enseigner, alimenter le Registry, générer des referrals payants.",
      en: "Become an ambassador: move from dev to AI Systems architect, publish, teach, feed the Registry, generate paid referrals.",
    },
    price: {
      fr: "€67/mois Public — Mastermind €500/mois",
      en: "€67/month Public — Mastermind €500/month",
    },
    summary: {
      fr: "Priorité 5. Le futur ambassadeur qui alimente la machine de referrals.",
      en: "Priority 5. The future ambassador who fuels the referral machine.",
    },
  },
];

export function getAvatar(slug: string): AvatarMeta | null {
  return AVATARS.find((a) => a.slug === slug) ?? null;
}

export function getAvatarContent(slug: string, locale: "fr" | "en"): string | null {
  const avatar = getAvatar(slug);
  if (!avatar) return null;
  const filePath = locale === "en" ? avatar.filePathEN : avatar.filePathFR;
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

export function getAvatarNeighbors(slug: string): {
  prev: AvatarMeta;
  next: AvatarMeta;
} {
  const index = AVATARS.findIndex((a) => a.slug === slug);
  const prev = AVATARS[(index - 1 + AVATARS.length) % AVATARS.length];
  const next = AVATARS[(index + 1) % AVATARS.length];
  return { prev, next };
}

// keep path import from being tree-shaken in edge cases
export const __paths = { AVATAR_ROOT, path };
