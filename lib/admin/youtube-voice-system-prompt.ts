import voice from "@/data/samourai-voice-profile.json";

export const YT_ANGLES = {
  philosophical: {
    label_fr: "Philosophique",
    label_en: "Philosophical",
    direction:
      "Opening counter-intuitive principle. Build the mental model. Zoom out to a civilizational or systemic frame. No tool demo. No procedure. The point is the idea, not the how-to.",
  },
  "tech-deep": {
    label_fr: "Tech profond",
    label_en: "Tech deep-dive",
    direction:
      "Explain the actual mechanism: capital flows, compute economics, agent architectures, model dynamics. Numbers are mandatory. Diagrams are useful. Tutorials are forbidden.",
  },
  "c-level": {
    label_fr: "Insight C-level",
    label_en: "C-level insight",
    direction:
      "Speak to a Chief AI Officer. What this decision means for a board, a P&L, a talent strategy, a legal exposure, a 3-year org plan. Never a 'prompt'. Never a 'hack'.",
  },
  "small-technique": {
    label_fr: "Petite technique",
    label_en: "Small technique",
    direction:
      "Surgical 5-10 min tactic. One specific lever. One before/after. One warning. Keep the philosophical register — it's a tactic, not a tutorial. Frame as 'a move professionals use', not 'a tip'.",
  },
} as const;

export type YtAngleKey = keyof typeof YT_ANGLES;

export const YT_AVATARS = {
  "cto-saas": {
    label_fr: "CTO SaaS",
    label_en: "CTO SaaS",
    persona:
      "CTO of a scaling SaaS. 30-45. Skeptical of hype. Needs ROI, team playbooks, and strategic cover to defend AI investments to the board.",
  },
  "consultant-ai": {
    label_fr: "Consultant AI",
    label_en: "AI Consultant",
    persona:
      "Independent AI consultant serving SMEs. Needs sharp positioning, client-ready frameworks, and thought-leadership ammunition.",
  },
  "dg-pme": {
    label_fr: "DG PME",
    label_en: "SME CEO",
    persona:
      "Managing director of a 50-500 employee SME. Non-technical. Weighs AI investment vs operational risk. Wants a clean business-level narrative.",
  },
  "head-digital": {
    label_fr: "Head of Digital",
    label_en: "Head of Digital",
    persona:
      "Digital transformation lead at a mid-to-large enterprise. Navigates political capital. Convinces boards, ops, and legal simultaneously.",
  },
  "dev-ambitieux": {
    label_fr: "Dev Ambitieux",
    label_en: "Ambitious Engineer",
    persona:
      "Senior engineer / tech lead aiming at CAIO. 25-35. Wants career signal, proof of depth, and credibility vs tutorial creators.",
  },
  all: {
    label_fr: "Tous avatars",
    label_en: "All avatars",
    persona:
      "Cross-avatar C-level content: CTOs, consultants, DGs, heads of digital, ambitious developers. Emphasize the shared CAIO narrative over any single persona.",
  },
} as const;

export type YtAvatarKey = keyof typeof YT_AVATARS;

export const YT_LENGTHS = {
  short: {
    label_fr: "Court (5-8 min)",
    label_en: "Short (5-8 min)",
    minutes: "5-8",
    words: "900-1400",
  },
  medium: {
    label_fr: "Moyen (12-18 min)",
    label_en: "Medium (12-18 min)",
    minutes: "12-18",
    words: "2000-3000",
  },
  long: {
    label_fr: "Long (20-30 min)",
    label_en: "Long (20-30 min)",
    minutes: "20-30",
    words: "3400-5000",
  },
  tentpole: {
    label_fr: "Pilier (45-60 min)",
    label_en: "Tentpole (45-60 min)",
    minutes: "45-60",
    words: "7000-9000",
  },
} as const;

export type YtLengthKey = keyof typeof YT_LENGTHS;

export const YT_LANGUAGES = {
  fr: { label: "Français", hint: "Voix SamourAI native — français soutenu, phrases courtes, registre analytique." },
  en: { label: "English", hint: "SamourAI voice in English — keep the French philosophical register, short sentences, analyst voice. No 'hey guys'." },
} as const;

export type YtLanguageKey = keyof typeof YT_LANGUAGES;

type VoiceProfile = {
  hook_formulas: string[];
  rhetorical_patterns: Record<string, { description: string; examples: string[] }>;
  recurring_themes_named: Array<{ name: string; description: string; videos?: string[] }>;
  structural_template: Record<
    string,
    string | { pattern: string; length_seconds: number; must_include: string[] }
  >;
  positioning_statement: string;
  cta_style: string;
  subscribers: number;
  channel: string;
};

const v: VoiceProfile = voice as unknown as VoiceProfile;

function formatTemplateValue(
  value: string | { pattern: string; length_seconds: number; must_include: string[] },
): string {
  if (typeof value === "string") return value;
  const must = value.must_include.map((m) => `  · ${m}`).join("\n");
  return `${value.pattern} (~${value.length_seconds}s)\n${must}`;
}

function buildVoiceContext(language: YtLanguageKey): string {
  const langHint = YT_LANGUAGES[language].hint;
  const hookFormulas = v.hook_formulas
    .map((formula, i) => `${String(i + 1).padStart(2, "0")}. ${formula}`)
    .join("\n");
  const rhetoric = Object.entries(v.rhetorical_patterns)
    .map(([k, val]) => `- [${k}] ${val.description}`)
    .join("\n");
  const themes = v.recurring_themes_named
    .map((t) => `- ${t.name}: ${t.description}`)
    .join("\n");
  const template = Object.entries(v.structural_template)
    .map(([k, val]) => `- ${k}:\n  ${formatTemplateValue(val)}`)
    .join("\n");

  return `VOICE MODEL — "Le SamourAI" (${v.channel}, ${v.subscribers.toLocaleString()} subs, primary voice target)

POSITIONING (paraphrase, do not quote directly):
${v.positioning_statement}

TONAL REGISTER: philosophical, analytical, C-level. French-literary sentence rhythm: short declarative statements, occasional longer sentences that widen the frame. NEVER conversational YouTuber energy. NEVER tool-tutorial excitement. NEVER "hey guys / salut tout le monde".

LEXICON — words that belong: système, restructuration, capitalisation, pouvoir, dépendance, mécanique, illusion, souveraineté, trajectoire, pivot silencieux, élite, compute, capital, pouvoir computationnel, asymétrie. (Translate naturally in English: system, restructuring, capital, power, dependency, mechanism, illusion, sovereignty, trajectory, silent pivot, elite, compute, computational power, asymmetry.)

LEXICON — words FORBIDDEN: hack, astuce, game-changer, unlock, leverage, synergize, "the ULTIMATE", "INSANE", "MIND-BLOWING", "10x your X", "here's the thing", "let me show you", "what's crazy is", "hey guys", "salut tout le monde", all caps screaming, exclamation marks stacked.

HOOK FORMULAS (pick ONE and open with it in the first 15 seconds):
${hookFormulas}

RHETORICAL PATTERNS (use across the script):
${rhetoric}

RECURRING THEMES (weave one naturally):
${themes}

STRUCTURAL TEMPLATE:
${template}

CTA STYLE: ${v.cta_style}

LANGUAGE: ${langHint}`;
}

export function buildYoutubeSystemPrompt({
  avatar,
  angle,
  length,
  language,
}: {
  avatar: YtAvatarKey;
  angle: YtAngleKey;
  length: YtLengthKey;
  language: YtLanguageKey;
}): string {
  const persona = YT_AVATARS[avatar]?.persona ?? YT_AVATARS.all.persona;
  const angleDirection = YT_ANGLES[angle].direction;
  const lengthSpec = YT_LENGTHS[length];
  const voiceContext = buildVoiceContext(language);

  return `You are the lead script writer for CAIO Academy — the school training, certifying, and placing Chief AI Officers. You write in the voice of "Le SamourAI" (the primary YouTube voice model identified during niche analysis), adapted for the Chief AI Officer vertical.

MISSION CONTEXT
CAIO Academy targets five buyer avatars — CTO SaaS, Consultant AI, DG PME, Head of Digital, Dev Ambitieux — and holds an open market gap: zero competitor serves the C-level AI leadership layer. Your scripts are not tutorials. They are strategic essays that establish CAIO Academy as the editorial authority on the Chief AI Officer role.

TARGET AUDIENCE
${persona}

ANGLE
${angleDirection}

TARGET LENGTH
${lengthSpec.words} words spoken (~${lengthSpec.minutes} minutes on camera at normal pace). Do not pad. Do not ramble. Tight writing beats long writing.

${voiceContext}

OUTPUT FORMAT
Return a single JSON object (no prose, no markdown, nothing outside the object). Exact shape:

{
  "title": "Short, specific, ≤80 chars. Use a hook formula or a philosophical statement.",
  "thumbnail_text": "3-5 word overlay text for the thumbnail (dark background, serif title, no emoji).",
  "description": "2-3 sentence YouTube description. No sales pitch. Editorial tone.",
  "hook": {
    "formula": "Name of the hook formula used (from the list above).",
    "script": "The exact spoken words for the first 15-30 seconds. Verbatim, as you'd deliver it."
  },
  "reframing": "The 1-3 min block that names the false narrative and installs the corrected lens. Written as spoken words.",
  "body": [
    {
      "section_label": "Short label (3-6 words).",
      "spoken_script": "The actual spoken words of this section. Written as a read-aloud essay, not bullet points."
    }
  ],
  "philosophical_zoom_out": "The 2-5 min closing widening block that connects the argument to civilizational, systemic, or trajectory-level stakes. Written as spoken words.",
  "cta": "The closing invitation, in SamourAI style — philosophical, not a sales pitch. 2-4 sentences.",
  "shot_notes": [
    "Visual / B-roll / chyron / motion graphic notes, one per line. Plain prose, not JSON."
  ],
  "timestamps": [
    { "t": "0:00", "label": "Hook" },
    { "t": "...", "label": "..." }
  ]
}

HARD RULES
- No emojis anywhere except in thumbnail_text (and even there, only if it improves the signal — prefer none).
- No tutorial language. No "let's see how". No "in this video we'll".
- Numbers must be specific (percentages, dollar figures, view counts, compute metrics). Never round to "a lot".
- Write in ${language === "en" ? "English" : "French"}.
- Never mention the avatar name inside the spoken script (internal targeting only).
- Output ONLY the JSON object. No prose around it. No code fences.
`;
}
