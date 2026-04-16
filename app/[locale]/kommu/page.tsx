import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const META = {
  fr: {
    title: "Kommu — Formations IA Avancees",
    description:
      "Le programme Kommu : 4 parcours de formation IA complets couvrant la maitrise technique, le business, le contenu et les systemes autonomes.",
    eyebrow: "PROGRAMME KOMMU",
    heading: "Kommu — Formation Action IA",
    lead: "Le programme de formation operationnel pour 2026-2027. Quatre parcours progressifs qui transforment la theorie IA en competences concretes, de la maitrise technique au deploiement de systemes autonomes.",
  },
  en: {
    title: "Kommu — Advanced AI Training",
    description:
      "The Kommu program: 4 complete AI training tracks covering technical mastery, business, content, and autonomous systems.",
    eyebrow: "KOMMU PROGRAM",
    heading: "Kommu — AI Action Training",
    lead: "The operational training program for 2026-2027. Four progressive tracks that turn AI theory into concrete skills, from technical mastery to autonomous system deployment.",
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

/* ─────────────────────────────────────────────────────────────────────────────
   TRACK & MODULE DATA
   ─────────────────────────────────────────────────────────────────────────── */

interface Lesson {
  title: string;
  description: string;
}

interface Module {
  number: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  outcomes: string[];
  audience: string;
}

interface Track {
  id: string;
  name: string;
  tagline: string;
  color: string;
  borderColor: string;
  modules: Module[];
}

const tracks: Track[] = [
  /* ═══════════════════════════════════════════════════════════════════════════
     TRACK 1 — AGENTIC TECH (Technical AI Mastery)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "agentic-tech",
    name: "Agentic Tech",
    tagline: "Maitrise technique de l'IA — Du mindset CAIO au deploiement d'agents autonomes",
    color: "var(--color-ink)",
    borderColor: "var(--color-ink)",
    modules: [
      {
        number: "T1-01",
        title: "Intro : La Philosophie IA",
        description:
          "La courbe d'acceleration de l'intelligence artificielle redefinit les regles du jeu en 2026. Ce module fondateur pose les bases du mindset CAIO : comprendre pourquoi l'IA ne se resume plus a des outils isoles mais constitue un ecosysteme complet — des modeles de langage aux agents autonomes, en passant par les systemes multi-agents orchestres.",
        duration: "6-8h",
        lessons: [
          {
            title: "L'acceleration IA 2024-2028 : comprendre la trajectoire",
            description:
              "Analyse de la courbe d'evolution des modeles IA, de GPT-3 aux systemes multi-agents. Pourquoi 2026 est le point d'inflexion pour les entreprises.",
          },
          {
            title: "Le mindset CAIO : posture, responsabilites, impact",
            description:
              "Definition precise du role de Chief AI Officer. Les 6 responsabilites cles : audit, design, implementation, orchestration, leadership strategique, ROI mesurable.",
          },
          {
            title: "La chaine outils → agents → systemes autonomes",
            description:
              "Comprendre les 3 niveaux de maturite IA : outils ponctuels (ChatGPT), agents specialises (Claude Code), systemes autonomes (Agentik OS avec 267 agents).",
          },
          {
            title: "Framework d'evaluation de la maturite IA",
            description:
              "Grille d'analyse en 5 dimensions pour evaluer ou se situe une organisation sur l'echelle de maturite IA. Auto-diagnostic et plan d'action.",
          },
          {
            title: "La philosophie Agentik OS : delegation intelligente",
            description:
              "Les principes fondateurs : qualite systematique, autonomie controlee, orchestration hierarchique. Comment un fondateur seul gere 11 projets avec 267 agents.",
          },
          {
            title: "Cartographier les cas d'usage IA a fort impact",
            description:
              "Methodologie pour identifier les 20% de taches qui generent 80% de la valeur IA dans une organisation. Exercice pratique d'audit.",
          },
        ],
        outcomes: [
          "Vision strategique de la trajectoire IA 2026-2028",
          "Mindset CAIO : posture, responsabilites, impact organisationnel",
          "Comprehension de la chaine outils → agents → systemes autonomes",
          "Framework d'evaluation de la maturite IA d'une organisation",
        ],
        audience:
          "Dirigeants, managers, decideurs tech souhaitant comprendre l'enjeu strategique de l'IA",
      },
      {
        number: "T1-02",
        title: "Stack System Builder (MCP & API Mastery)",
        description:
          "Le Model Context Protocol est le standard emergent qui connecte les modeles d'IA a vos outils existants. Ce module technique couvre MCP, les REST APIs, les webhooks, OAuth, et les plateformes d'automatisation pour construire n'importe quelle integration production-grade.",
        duration: "10-14h",
        lessons: [
          {
            title: "Les 5 methodes de connexion IA : MCP, REST, GraphQL, Webhooks, Plateformes",
            description:
              "Vue d'ensemble des approches d'integration avec matrice de decision : quand utiliser quoi selon le contexte technique et le niveau d'urgence.",
          },
          {
            title: "MCP en profondeur : serveurs stdio, HTTP et SSE",
            description:
              "Architecture du Model Context Protocol. Les 3 primitives (Tools, Resources, Prompts). Configuration dans .mcp.json, variables d'environnement, debugging.",
          },
          {
            title: "Le catalogue des serveurs MCP essentiels",
            description:
              "Configuration pratique de Composio (200+ apps), Playwright (browser), PostgreSQL, GitHub, Chrome DevTools, Context7, claude-mem et Linear.",
          },
          {
            title: "Construire un serveur MCP custom en TypeScript et Python",
            description:
              "Architecture complete d'un serveur MCP : declaration d'outils, handlers, resources et prompts. Tester avec MCP Inspector, publier sur npm.",
          },
          {
            title: "Maitriser les REST APIs : auth, pagination, rate limiting",
            description:
              "Fondamentaux HTTP, methodes d'authentification (API Key, Bearer, OAuth 2.0, HMAC), construction d'integrations robustes avec gestion d'erreurs.",
          },
          {
            title: "Webhooks et architecture event-driven",
            description:
              "Push vs pull, construction de recepteurs webhooks (Next.js, Vercel), verification de signature, idempotence. Patterns Stripe, GitHub, Clerk.",
          },
          {
            title: "Composio : le meta-connecteur pour 200+ apps",
            description:
              "Installation, connexion d'apps, construction de workflows automatises. Exemples : auto-posting social, reporting client, capture de leads.",
          },
          {
            title: "Plateformes d'automatisation : n8n, Trigger.dev, Make, Inngest",
            description:
              "Comparatif detaille des meilleures plateformes. Matrice de decision selon le besoin : self-hosted, TypeScript-natif, visuel, event-driven.",
          },
          {
            title: "Patterns d'integration production-grade",
            description:
              "Retry avec backoff exponentiel, circuit breaker, dead letter queues, monitoring, documentation. Construire des integrations qui tiennent en prod.",
          },
        ],
        outcomes: [
          "Competences pratiques en construction de serveurs MCP",
          "Capacite a integrer n'importe quel outil dans un workflow IA",
          "Maitrise des patterns d'integration production (auth, retry, monitoring)",
          "Architecture de reference pour un stack IA d'entreprise",
        ],
        audience:
          "Developpeurs, architectes techniques, CTOs voulant construire une infrastructure IA integree",
      },
      {
        number: "T1-03",
        title: "Claude Master Class",
        description:
          "De debutant absolu a expert systeme en 12 semaines. Ce module couvre l'ensemble de l'ecosysteme Claude : du CLI Claude Code pour le developpement assiste par IA, a l'API Claude pour l'integration programmatique, en passant par les agents autonomes et l'orchestration multi-agents.",
        duration: "50-68h",
        lessons: [
          {
            title: "Installation, premiers pas et outils de base (Read, Write, Edit, Bash, Glob, Grep)",
            description:
              "Decouvrir Claude Code, comprendre les 10 outils fondamentaux, construire son premier projet complet de A a Z. Permissions et securite.",
          },
          {
            title: "Le systeme CLAUDE.md et l'ingenierie de contexte",
            description:
              "Hierarchie des fichiers d'instructions, structure d'un CLAUDE.md efficace, rules files modulaires. Optimiser ce que Claude recoit a chaque session.",
          },
          {
            title: "Prompt engineering pour Claude Code et gestion du contexte",
            description:
              "Patterns de prompt qui marchent (direct, contextuel, exploratoire, delegatif). Fenetre de contexte : comprendre, mesurer, optimiser. Compaction.",
          },
          {
            title: "Creer des Skills : capacites reutilisables",
            description:
              "Anatomie d'un SKILL.md, frontmatter complet, variables, multi-fichiers. Creer, tester et deployer des skills professionnelles.",
          },
          {
            title: "Les Hooks : automatisation evenementielle",
            description:
              "16+ types d'evenements, hooks command/prompt/agent/http, codes de sortie, matchers. Cas concrets : logging, notifications, validation automatique.",
          },
          {
            title: "Systeme d'agents et sous-agents specialises",
            description:
              "Agents built-in (Explore, Plan), agents custom avec agent.md, invocation, agents en parallele, memoire d'agent persistante, communication inter-agents.",
          },
          {
            title: "MCP dans Claude Code : connecter Claude au monde",
            description:
              "Configurer des serveurs MCP, tool search pour les gros serveurs, construire un serveur custom, nommage des outils MCP.",
          },
          {
            title: "Architectures multi-agents et God Mode",
            description:
              "Patterns pipeline, fan-out, hierarchique, swarm. Le pattern ORACLE d'Agentik OS. Teams natifs. Agents autonomes : Ralph, Sentinel, God Mode.",
          },
          {
            title: "Automatisation avancee : crons, bots Telegram, self-healing",
            description:
              "Pipelines de contenu automatises, publication sur les reseaux sociaux, bots Telegram, systemes auto-reparateurs, monitoring avec dashboard custom.",
          },
          {
            title: "CI/CD, securite et deploiement en production",
            description:
              "Claude Code dans GitHub Actions, pipeline de deploy complet, gestion des secrets, securite des agents, backup et recovery.",
          },
        ],
        outcomes: [
          "Expertise approfondie de Claude Code CLI et de l'API Claude",
          "Design de workflows autonomes avec agents specialises",
          "Competences en architecture multi-agents et orchestration",
          "Maitrise du systeme de hooks, commandes et skills",
        ],
        audience:
          "Developpeurs IA, ingenieurs systemes, tech leads souhaitant exploiter Claude au maximum",
      },
      {
        number: "T1-04",
        title: "Prompt & Context Engineering",
        description:
          "Deux disciplines complementaires reunies : l'art de formuler des instructions (Prompt Engineering) et la science de gerer l'information disponible pour le LLM (Context Engineering). Le prompt = 10% du contexte. Ce module couvre les 100%.",
        duration: "40-50h",
        lessons: [
          {
            title: "Comment les LLMs fonctionnent : tokens, attention, temperature",
            description:
              "Mecanismes internes impactant la qualite des prompts. Context window, attention decay, recency bias, hallucinations. Ce que l'ingenieur doit savoir.",
          },
          {
            title: "Anatomie d'un bon prompt : les 5 composants",
            description:
              "Role, Contexte, Instruction, Format, Contraintes. Delimiteurs XML, ordre optimal, repetition strategique. Avant/apres avec analyse.",
          },
          {
            title: "Zero-shot, Few-shot, Chain-of-Thought, Tree-of-Thought",
            description:
              "Techniques de prompting par l'exemple et par le raisonnement. Comparaison tokens/precision. Self-consistency et Reflection.",
          },
          {
            title: "System prompts de production et meta-prompting",
            description:
              "Structure d'un system prompt efficace, pipeline de prompts chaines, meta-prompting. Anti-patterns des system prompts.",
          },
          {
            title: "Le Context Budget et la Progressive Disclosure",
            description:
              "Gerer les tokens comme un budget financier. Allocation P0-P3, context router, pattern deux passes. Regle des 60%.",
          },
          {
            title: "CLAUDE.md, Rules et hierarchie d'instructions",
            description:
              "Architecture de fichiers d'instructions multi-niveaux. Regles conditionnelles, resolution de conflits, template universel.",
          },
          {
            title: "RAG : pipeline complet, chunking et vector databases",
            description:
              "Ingestion, chunking (fixed, semantic, document-aware), embedding models, vector DB (ChromaDB, pgvector, Pinecone), reranking.",
          },
          {
            title: "Context Engineering pour agents autonomes",
            description:
              "Fresh Context Template, context decay dans les agents long-running, multi-agent context sharing (scratchpad, message passing).",
          },
          {
            title: "Frameworks reutilisables : RISEN, CO-STAR, RACE, SCRIBE",
            description:
              "Boite a outils de frameworks de prompts pour toutes les situations. Template universel, testing et iteration systematique.",
          },
          {
            title: "Mesurer, optimiser et compresser le contexte en production",
            description:
              "Metriques cles, audit de contexte, A/B testing, techniques de compression (summarization, distillation, deduplication). Anti-patterns.",
          },
        ],
        outcomes: [
          "Methodologie systematique de conception de prompts",
          "Maitrise de l'ingenierie de contexte et de la gestion de tokens",
          "Patterns reproductibles pour garantir la qualite des outputs",
          "Techniques avancees : CoT, few-shot, RAG, progressive disclosure",
          "Capacite a auditer et ameliorer des prompts existants",
        ],
        audience:
          "Tous profils travaillant avec des LLMs : developpeurs, product managers, content creators, data scientists",
      },
      {
        number: "T1-05",
        title: "Building AI Systems : VPS & Production",
        description:
          "Les systemes IA autonomes ont besoin d'une infrastructure qui tourne 24/7. Ce module couvre l'architecture complete des systemes IA en production : de l'API Claude au deploiement VPS, en passant par le RAG, les agents, l'evaluation, le monitoring et le scaling.",
        duration: "46-62h",
        lessons: [
          {
            title: "Architecture des systemes IA : vue d'ensemble et decisions de design",
            description:
              "Les 4 composants (Modele, Donnees, Orchestration, Interface). Types de systemes : single-prompt a multi-agents. Framework de decision architecturale.",
          },
          {
            title: "L'API Claude et le Vercel AI SDK en profondeur",
            description:
              "Messages API, streaming, tool use, structured outputs, vision, prompt caching, batch API. Integration React avec useChat et streamText.",
          },
          {
            title: "Construire une application de chat production-grade",
            description:
              "Architecture frontend/backend, streaming SSE, tool use dans le chat, persistance des conversations avec Convex, authentification Clerk.",
          },
          {
            title: "Construire un agent IA autonome avec tool use",
            description:
              "La boucle agent (plan-execute-observe), design de tools atomiques, auto-correction, recuperation d'erreurs, memoire d'agent.",
          },
          {
            title: "Systemes RAG : de l'ingestion a la generation",
            description:
              "Pipeline complet : chunking, embedding, vector DB, retrieval hybride, construction de contexte, evaluation RAGAS. Patterns avances.",
          },
          {
            title: "Systemes multi-agents et Claude Agent SDK",
            description:
              "Patterns pipeline/fan-out/hierarchique. Le pattern ORACLE. Communication inter-agents. Deployer des agents comme des services.",
          },
          {
            title: "Evaluation, testing et garde-fous",
            description:
              "Evals automatisees, LLM-as-judge, metriques (accuracy, fidelite, pertinence). Garde-fous entree/sortie, defense prompt injection.",
          },
          {
            title: "Deploiement VPS : SSH, Docker, tmux, systemd",
            description:
              "Provisionnement et securisation d'un VPS dedie. Configuration SSH durcie, containers Docker, orchestration de processus, pipelines CI/CD.",
          },
          {
            title: "Monitoring, observabilite et alerting",
            description:
              "Quoi monitorer (latence, erreurs, tokens, qualite). Logging structure, dashboard de monitoring, strategie d'alerting Telegram/Slack.",
          },
          {
            title: "Scaling, securite et optimisation des couts en production",
            description:
              "Caching multi-niveaux, routage de modeles, batch API, scaling horizontal. Securite OWASP, protection des donnees, conformite RGPD.",
          },
        ],
        outcomes: [
          "Infrastructure production-ready pour charges de travail IA",
          "Competences en deploiement, securisation et administration systeme",
          "Patterns d'orchestration de processus IA en continu",
          "Monitoring et observabilite des systemes autonomes",
          "Template d'infrastructure reproductible base sur Agentik OS",
        ],
        audience:
          "DevOps, SRE, developpeurs full-stack, toute personne deployant des systemes IA en production",
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     TRACK 2 — BUSINESS (AI for Business & Leadership)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "business",
    name: "Business",
    tagline: "L'IA pour les dirigeants, la C-Suite et les entrepreneurs CAIO",
    color: "var(--color-ink)",
    borderColor: "var(--color-ink)",
    modules: [
      {
        number: "T2-01",
        title: "AI for Business Owners",
        description:
          "La formation definitive pour les dirigeants d'entreprise qui veulent comprendre l'IA assez profondement pour prendre des decisions strategiques — sans ecrire une seule ligne de code. Strategie business, ROI mesurable, roadmap actionnable.",
        duration: "15-20h",
        lessons: [
          {
            title: "L'IA demystifiee : ce que les dirigeants doivent savoir",
            description:
              "Les 3 types d'IA qui comptent pour le business (generative, predictive, agentique). Pourquoi 2026 est le point d'inflexion. Evaluation honnete des risques.",
          },
          {
            title: "La carte des opportunites IA dans votre business",
            description:
              "Les 7 domaines de valeur immediate (support, contenu, ventes, operations, dev, marketing, strategie). Framework d'audit IA DIY avec calcul de ROI.",
          },
          {
            title: "L'economie de l'IA : ce que ca coute vraiment",
            description:
              "Structure des couts demystifiee. Comparaison equipe traditionnelle vs systeme IA (economies 70-95%). Comment budgetiser sur 12 mois.",
          },
          {
            title: "Recruter et s'associer pour l'IA : evaluer les talents",
            description:
              "Les 4 modeles d'engagement (DIY, freelance, CAIO partnership, agence). Scorecard d'evaluation, questions d'entretien, red/green flags.",
          },
          {
            title: "Strategie IA : construire ta roadmap a 90 jours",
            description:
              "Framework en 3 phases (quick wins → systemes core → scale). Construire son stack IA. Conduite du changement et embarquement de l'equipe.",
          },
          {
            title: "Ethique, legal et gestion des risques IA",
            description:
              "Vie privee et RGPD, droits d'auteur du contenu genere par IA, matrice de risques, creation d'une politique d'utilisation IA en entreprise.",
          },
        ],
        outcomes: [
          "Vision claire des opportunites IA dans son propre business",
          "Budget IA realiste sur 12 mois avec calcul de ROI",
          "Roadmap d'implementation a 90 jours actionnable",
          "Capacite a evaluer et selectionner les bons partenaires IA",
        ],
        audience:
          "CEOs, fondateurs, dirigeants, proprietaires d'entreprise, managers non-techniques",
      },
      {
        number: "T2-02",
        title: "AI for C-Level : Le CAIO au Service de la C-Suite",
        description:
          "11 modules specialises couvrant la relation CAIO avec chaque membre du comite de direction. Du CEO au CRO, en passant par le CFO, le CMO, le COO, le CIO, le CHRO et le CLO — comment l'IA transforme chaque fonction executive.",
        duration: "25-35h",
        lessons: [
          {
            title: "Le CAIO au service du CEO : leadership strategique IA",
            description:
              "Le CAIO comme conseiller strategique. Traduction IA → business, anticipation des tendances, protection des risques. Modele de confiance en 3 phases.",
          },
          {
            title: "CAIO × CTO : gouvernance technique et architecture IA",
            description:
              "Delimiter les responsabilites CAIO vs CTO. Architecture IA, dette technique IA, integration dans le stack existant, securite et compliance.",
          },
          {
            title: "CAIO × CMO : marketing propulse par l'IA",
            description:
              "Automatisation du content marketing, personnalisation a l'echelle, optimisation publicitaire IA, attribution multi-touch, brand voice IA.",
          },
          {
            title: "CAIO × CFO : ROI, budgets et modelisation financiere IA",
            description:
              "Frameworks de calcul du ROI IA, budget de transformation, modelisation predictive des revenus, reduction des couts operationnels mesurable.",
          },
          {
            title: "CAIO × CPO : produit augmente par l'IA",
            description:
              "Features IA dans le produit, personnalisation utilisateur, AI-first product design, evaluation de la valeur ajoutee IA pour les clients.",
          },
          {
            title: "CAIO × COO : operations et automatisation des processus",
            description:
              "Audit des processus automatisables, workflows IA en production, KPIs operationnels, gestion du changement dans les equipes operations.",
          },
          {
            title: "CAIO × CIO : infrastructure, donnees et securite IA",
            description:
              "Strategie data pour l'IA, infrastructure cloud vs on-premise, gouvernance des donnees, conformite reglementaire, cybersecurite IA.",
          },
          {
            title: "CAIO × CHRO : transformation des competences et recrutement",
            description:
              "Impact de l'IA sur les roles existants, plan de montee en competences, recrutement de talents IA, culture d'innovation, ethique RH.",
          },
          {
            title: "CAIO × CLO : cadre juridique et ethique de l'IA",
            description:
              "Reglementation IA (EU AI Act, RGPD), propriete intellectuelle, responsabilite, contrats IA, due diligence fournisseurs, politique interne.",
          },
          {
            title: "CAIO × CRO : revenus et croissance propulses par l'IA",
            description:
              "IA dans le pipeline commercial, scoring predictif, automatisation de la prospection, optimisation du taux de conversion, upsell intelligent.",
          },
          {
            title: "Cohesion C-Suite : orchestrer la transformation IA collective",
            description:
              "Aligner tous les C-Levels autour de la strategie IA. Comite IA, reporting unifie, gestion des conflits de priorite, communication interne.",
          },
        ],
        outcomes: [
          "Maitrise de la relation CAIO avec chaque membre de la C-Suite",
          "Frameworks de communication adaptes a chaque fonction executive",
          "Capacite a traduire les capacites IA en valeur business par departement",
          "Outils de pilotage et metriques pour la transformation IA",
          "Vision holistique de l'impact IA sur l'ensemble de l'organisation",
        ],
        audience:
          "CAIOs en poste ou en devenir, membres de comites de direction, consultants en transformation digitale",
      },
      {
        number: "T2-03",
        title: "AI CAIO Roles : Implementation & Audit",
        description:
          "Comment structurer le role de CAIO dans une organisation : perimetre de responsabilite, methodologie d'audit, implementation des systemes IA, mesure du ROI, et gouvernance continue.",
        duration: "12-16h",
        lessons: [
          {
            title: "Definir le perimetre CAIO : audit vs build vs governance",
            description:
              "Les 3 modes operatoires du CAIO. Quand auditer, quand construire, quand gouverner. Matrice de decision selon la maturite de l'organisation.",
          },
          {
            title: "Methodologie d'audit IA en 5 phases",
            description:
              "Discovery → Mapping → Scoring → Roadmap → Quick Wins. Templates d'audit, grilles d'evaluation, livrables attendus a chaque phase.",
          },
          {
            title: "Implementation : du pilot au systeme en production",
            description:
              "Selectionner le bon premier projet, construire la preuve de concept, mesurer les resultats, scaler vers la production. Gestion des risques.",
          },
          {
            title: "Gouvernance IA : politiques, monitoring, amelioration continue",
            description:
              "Creer un framework de gouvernance IA. Politiques d'utilisation, monitoring de la qualite, revues trimestrielles, evolution de la strategie.",
          },
          {
            title: "Mesurer le ROI IA : metriques et reporting",
            description:
              "Les 4 axes de mesure (temps, couts, revenus, qualite). Dashboard de suivi mensuel, reporting au board, benchmarks par industrie.",
          },
          {
            title: "Le CAIO comme agent de changement",
            description:
              "Gestion du changement organisationnel. Surmonter les resistances, former les equipes, celebrer les victoires, construire la culture IA.",
          },
        ],
        outcomes: [
          "Methodologie d'audit IA structuree et reproductible",
          "Capacite a implementer des systemes IA de l'idee a la production",
          "Framework de gouvernance IA pour l'amelioration continue",
          "Outils de mesure du ROI et de reporting au board",
        ],
        audience:
          "Aspirants CAIOs, consultants IA, directeurs de la transformation, chefs de projet IA",
      },
      {
        number: "T2-04",
        title: "CAIO Sales Master Class",
        description:
          "Transformer ses competences IA en business rentable. Positionnement, prospection, closing, pricing, et construction d'un revenu recurrent en tant que Chief AI Officer freelance ou consultant.",
        duration: "15-20h",
        lessons: [
          {
            title: "Le role de CAIO : comprendre ce que tu vends",
            description:
              "Definition precise vs CTO/consultant/freelance. Les 6 responsabilites cles. L'opportunite financiere avec les vrais chiffres ($4K-15K/mois par client).",
          },
          {
            title: "Positionnement et personal branding CAIO",
            description:
              "Formule de positionnement par niche. Creer son identite CAIO, optimiser LinkedIn, site web minimaliste, contenu qui attire les prospects.",
          },
          {
            title: "Trouver ses premiers clients : les 5 canaux",
            description:
              "LinkedIn outbound, contenu inbound, reseau chaud, partenariats strategiques, plateformes freelance. Scripts et templates pour chaque canal.",
          },
          {
            title: "Le process de vente CAIO en 4 etapes",
            description:
              "Discovery call → Audit gratuit (mini) → Proposition → Close. Scripts detailles, gestion des objections, techniques de closing.",
          },
          {
            title: "Pricing et packaging : construire une offre irresistible",
            description:
              "Les 3 offres (audit, build, partnership). Pricing par la valeur, pas par l'heure. Construire le business case pour le client.",
          },
          {
            title: "Scaler : de freelance a cabinet CAIO",
            description:
              "Automatiser la livraison avec des systemes IA, deleguer avec des sous-traitants, construire un pipeline previsible. De $4K a $50K+/mois.",
          },
        ],
        outcomes: [
          "Positionnement clair et differenciant en tant que CAIO",
          "Pipeline de prospection actif avec scripts et templates",
          "Process de vente complet avec gestion des objections",
          "Modele de pricing rentable et scalable",
        ],
        audience:
          "Freelances tech, consultants, developpeurs qui veulent monetiser l'IA, entrepreneurs",
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     TRACK 3 — CONTENT (AI Content & Marketing)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "content",
    name: "Content",
    tagline: "Creation de contenu et marketing propulses par l'IA — Du texte a la video",
    color: "var(--color-ink)",
    borderColor: "var(--color-ink)",
    modules: [
      {
        number: "T3-01",
        title: "Content Automation : Systemes & Pipelines",
        description:
          "Construire des systemes de creation de contenu automatises qui tournent en autopilote. De la selection du sujet a la publication multi-plateforme, en passant par la generation, l'optimisation et la distribution.",
        duration: "15-20h",
        lessons: [
          {
            title: "Le One-Person Studio : philosophie du createur solo augmente",
            description:
              "Comment un individu avec un laptop et de l'IA peut remplacer un studio de production complet. Les 3 piliers : logique, imagination, maitrise.",
          },
          {
            title: "Architecture d'un pipeline de contenu automatise",
            description:
              "Les 9 etapes : selection du sujet → recherche → plan → redaction → SEO → image → build → deploy → distribution sociale. Chaque etape detaillee.",
          },
          {
            title: "Automatisation avec cron jobs et scripts shell",
            description:
              "Configurer des cron jobs pour la publication quotidienne. Scripts de publication, trackers anti-doublons, gestion des erreurs et retry.",
          },
          {
            title: "Distribution multi-plateforme : LinkedIn, Twitter, Reddit",
            description:
              "Formats specifiques par plateforme. Automatisation via Composio + OAuth. Scheduling aux heures optimales. Tracker de publication.",
          },
          {
            title: "Notifications et monitoring de pipeline",
            description:
              "Bots Telegram pour le suivi, alertes d'erreur, tableau de bord de production. Self-healing : detection et correction automatique des pannes.",
          },
          {
            title: "Workflows n8n et Trigger.dev pour le contenu",
            description:
              "Construire des workflows visuels et code-first pour orchestrer la creation de contenu. Comparaison pratique, templates reutilisables.",
          },
        ],
        outcomes: [
          "Pipeline de contenu automatise fonctionnel en production",
          "Publication multi-plateforme sans intervention manuelle",
          "Systeme de monitoring et d'alerting pour le contenu",
          "Templates de workflows reutilisables pour differents types de contenu",
        ],
        audience:
          "Createurs de contenu, marketeurs, entrepreneurs, community managers, growth hackers",
      },
      {
        number: "T3-02",
        title: "Content Generation : Image, Video, Audio, Web",
        description:
          "Maitriser tous les formats de creation avec l'IA : images professionnelles, videos marketing, musique et podcasts, sites web complets. Le createur solo avec les pouvoirs d'un studio entier.",
        duration: "30-40h",
        lessons: [
          {
            title: "Generation d'images : Midjourney, DALL-E, Gemini Imagen, Flux",
            description:
              "Comparatif des modeles, prompt engineering visuel, styles et consistance, generation a l'echelle. Du concept a l'image production-ready.",
          },
          {
            title: "Generation de video : Runway, Sora, Kling, Hailuo",
            description:
              "Text-to-video, image-to-video, controle de camera, effets visuels. Construire des videos marketing et des contenus sociaux pro.",
          },
          {
            title: "Audio et musique IA : Suno, Udio, ElevenLabs, TTS",
            description:
              "Generation de musique, voice cloning, text-to-speech HD, sound design. Production de podcasts et bandes sonores sans micro ni studio.",
          },
          {
            title: "Redaction IA avancee : blog, newsletter, copywriting",
            description:
              "Techniques de redaction assistee par IA. Maintenir une voix authentique, optimisation SEO, formats longs et courts, A/B testing de copy.",
          },
          {
            title: "Branding et identite visuelle avec l'IA",
            description:
              "Creer une identite de marque complete : logo, palette, typographie, guidelines. Consistance visuelle a travers tous les supports.",
          },
          {
            title: "Construction de sites web avec Claude Code",
            description:
              "Du brief au site deploye en production. Next.js + Tailwind + Vercel. Landing pages, portfolios, sites marketing complets.",
          },
        ],
        outcomes: [
          "Maitrise des principaux outils de generation IA (image, video, audio)",
          "Capacite a produire du contenu professionnel multi-format",
          "Workflow de creation integre du concept a la publication",
          "Competences en branding et identite visuelle assistee par IA",
        ],
        audience:
          "Createurs, entrepreneurs, marketeurs, freelances, filmmakers, podcasters, designers",
      },
      {
        number: "T3-03",
        title: "SEO & GEO : AI Expert en Visibilite",
        description:
          "Maitriser le SEO traditionnel ET le nouveau paysage de recherche IA (Google AI Overviews, ChatGPT search, Perplexity). Construire des systemes qui generent, optimisent et distribuent du contenu a grande echelle pour dominer les deux.",
        duration: "25-35h",
        lessons: [
          {
            title: "Le nouveau paysage de la recherche en 2026",
            description:
              "Google AI Overviews, ChatGPT web search, Perplexity, Bing Copilot. Zero-click searches. Le framework de double optimisation SEO + GEO.",
          },
          {
            title: "Fondations du SEO technique",
            description:
              "Architecture de site, URL structure, maillage interne, Core Web Vitals, mobile-first. Crawlabilite et indexation pour les moteurs traditionnels et IA.",
          },
          {
            title: "GEO : Generative Engine Optimization",
            description:
              "Optimiser pour la citabilite dans les reponses IA. AI crawlers (GPTBot, ClaudeBot), llms.txt, structuration du contenu pour l'extraction IA.",
          },
          {
            title: "Keyword research et strategie de contenu propulsees par l'IA",
            description:
              "Recherche de mots-cles avec des outils IA, clustering thematique, calendrier editorial, prioritisation par opportunite et difficulte.",
          },
          {
            title: "Content creation a l'echelle : programmatic SEO",
            description:
              "Templates de pages, generation de contenu a partir de donnees, pages de localisation, hub & spoke. Systemes qui generent des centaines de pages optimisees.",
          },
          {
            title: "Schema markup, structured data et SEO technique avance",
            description:
              "JSON-LD, schema.org, rich snippets, FAQ schema, breadcrumbs. Audit technique complet : robots.txt, sitemap, canonical, hreflang.",
          },
          {
            title: "Link building et autorite avec l'IA",
            description:
              "Strategies de construction d'autorite assistees par IA. Digital PR, guest posting a l'echelle, analyse de backlinks, E-E-A-T signals.",
          },
          {
            title: "Analytics et mesure du ROI SEO/GEO",
            description:
              "Google Search Console, GA4, suivi des positions, monitoring de la visibilite IA. Dashboard de performance et reporting automatise.",
          },
        ],
        outcomes: [
          "Strategie SEO/GEO complete et actionnable",
          "Capacite a optimiser pour Google ET les moteurs de recherche IA",
          "Systemes de creation de contenu a l'echelle",
          "Competences en SEO technique, schema markup et analytics",
          "Pipeline de contenu automatise avec distribution multi-canal",
        ],
        audience:
          "Marketeurs, professionnels du SEO, createurs de contenu, fondateurs, freelances, agences",
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     TRACK 4 — AISB (Full Autonomous System)
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "aisb",
    name: "AISB",
    tagline: "Construis ton propre cerveau IA autonome avec Oracle, Telegram et tmux",
    color: "var(--color-ink)",
    borderColor: "var(--color-ink)",
    modules: [
      {
        number: "T4-01",
        title: "AISB — Omega Full System Setup",
        description:
          "La formation ultime pour comprendre et reproduire l'architecture complete d'AISB (AI Super Brain) : le systeme autonome d'orchestration IA qui permet a un seul fondateur de gerer 11+ projets simultanement via Telegram, avec 281 agents et 4 niveaux d'architecture.",
        duration: "20-25h",
        lessons: [
          {
            title: "Vue d'ensemble : les 4 niveaux d'AISB",
            description:
              "Niveau 1 (AISB : le cerveau Telegram), Niveau 2 (Oracles : chefs de projet), Niveau 3 (Work Sessions : executants), Niveau 4 (Teams & Agents : l'armee). Regle d'or : chaque niveau parle uniquement au niveau adjacent.",
          },
          {
            title: "La chaine complete d'un message : de Telegram au code",
            description:
              "Toi (Telegram) → AISB Bot → identification projet → enhance_prompt → dispatch Oracle → analyse → workers → code → build → deploy → notification retour.",
          },
          {
            title: "Setup du bot AISB : Python, Claude SDK, Telegram API",
            description:
              "Architecture du bot (systemd daemon), configuration de l'API Telegram, integration Claude SDK, routeur de projets, enhance_prompt, gestion multi-sessions.",
          },
          {
            title: "Oracle et dispatch : tmux, sessions a la demande, file ownership",
            description:
              "Comment les Oracles sont spawnes dans tmux, max 3 simultanes. Classification SIMPLE/MEDIUM/COMPLEX/EPIC. Fresh Context Template. Worker completion protection.",
          },
          {
            title: "Le systeme de 281 agents : departements, skills et specialistes",
            description:
              "6 departements (Dev, QA, Security, Marketing, Creative, Strategy). Hierarchie CEO → C-Levels → Leads → Specialistes. 130+ skills. Comment chaque agent est configure.",
          },
          {
            title: "Le pipeline AISB : ROUTE → KEYMAKER → MORPHEUS → SERAPH → SMITH",
            description:
              "Le flux complet de traitement : routing intelligent, planification (KEYMAKER), execution (MORPHEUS/teams), audit qualite (SERAPH), apprentissage (SMITH).",
          },
          {
            title: "Les 3 Lois : runtime truth, research mindset, autonomous execution",
            description:
              "Loi 1 : seul le runtime dit la verite. Loi 2 : etre un chercheur, pas un yes-man. Loi 3 : challenger + decider + executer, jamais attendre.",
          },
          {
            title: "Ship pipeline, done.json et close decision tree",
            description:
              "Le pipeline de livraison (build → gitleaks → commit → push → deploy → verify). Etats done_clean/pending/failed. Comment AISB decide de fermer une session.",
          },
          {
            title: "Quality Arsenal : 16 audits forensiques Gestalt-Popper",
            description:
              "Les 16 audits (code, flow, UI/UX, debug, feature, perf, sec, a11y, SEO, data, API, copy, DX, motion, automation, logic). Scoring normalise /100. Auto-fix + re-audit.",
          },
          {
            title: "Deployer ton propre AISB : de zero a l'autonomie complete",
            description:
              "Guide pas a pas pour reproduire l'architecture sur ton VPS. Configuration complete, tests, monitoring, premiere mission autonome. Le systeme tourne 24/7.",
          },
        ],
        outcomes: [
          "Comprehension complete de l'architecture AISB a 4 niveaux",
          "Capacite a deployer son propre systeme d'orchestration IA autonome",
          "Maitrise du dispatch, du ship pipeline et de la gestion multi-projets",
          "Configuration de 281 agents avec departements et hierarchie",
          "Systeme de qualite avec 16 audits forensiques automatises",
        ],
        audience:
          "Developpeurs, CTOs, fondateurs tech qui veulent construire leur propre systeme d'orchestration IA autonome",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE COMPONENT
   ─────────────────────────────────────────────────────────────────────────── */

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
      {/* Hero */}
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
          <div className="mt-8 flex flex-wrap gap-3">
            {tracks.map((track) => (
              <a
                key={track.id}
                href={`#${track.id}`}
                className="border border-[color:var(--color-ink)] px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-bg)]"
              >
                {track.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks */}
      {tracks.map((track, trackIndex) => (
        <section
          key={track.id}
          id={track.id}
          className={
            trackIndex < tracks.length - 1
              ? "border-b border-[color:var(--color-line)]"
              : ""
          }
        >
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
            {/* Track header */}
            <div className="mb-10">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                Parcours {trackIndex + 1} sur {tracks.length}
              </p>
              <h2 className="mt-2 font-serif text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
                {track.name}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[color:var(--color-muted)]">
                {track.tagline}
              </p>
              <p className="mt-2 font-sans text-xs text-[color:var(--color-muted)]">
                {track.modules.length} module
                {track.modules.length > 1 ? "s" : ""}
              </p>
            </div>

            {/* Modules */}
            <div className="flex flex-col gap-8">
              {track.modules.map((mod) => (
                <div
                  key={mod.number}
                  className="border border-[color:var(--color-line)] p-8 sm:p-10"
                >
                  {/* Module header */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--color-ink)] font-sans text-[0.65rem] font-bold">
                      {mod.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl font-bold sm:text-2xl">
                        {mod.title}
                      </h3>
                      <p className="font-sans text-xs text-[color:var(--color-muted)]">
                        Duree estimee : {mod.duration}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-[1.7] text-[color:var(--color-muted)]">
                    {mod.description}
                  </p>

                  {/* Lessons */}
                  <div className="mt-6">
                    <h4 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                      Lecons ({mod.lessons.length})
                    </h4>
                    <div className="flex flex-col gap-3">
                      {mod.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.title}
                          className="border-l-2 border-[color:var(--color-line)] pl-4"
                        >
                          <p className="text-sm font-medium">
                            <span className="text-[color:var(--color-muted)]">
                              {lessonIndex + 1}.{" "}
                            </span>
                            {lesson.title}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-[color:var(--color-muted)]">
                            {lesson.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Two-column: outcomes + audience */}
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                        Ce que cette formation apporte
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {mod.outcomes.map((item) => (
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
                        Public cible
                      </h4>
                      <p className="text-sm text-[color:var(--color-muted)]">
                        {mod.audience}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </PageShell>
  );
}
