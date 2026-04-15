export const AVATARS = {
  "cto-saas": {
    label: "CTO SaaS",
    persona:
      "CTO of a growing SaaS company, 30-45, engineering background, scaling AI features across product, wary of hype, wants concrete ROI and team playbooks.",
  },
  "consultant-ai": {
    label: "Consultant AI",
    persona:
      "Independent AI consultant serving SMEs and mid-market, evangelist and implementer, needs sharp positioning and client-ready frameworks.",
  },
  "dg-pme": {
    label: "DG PME",
    persona:
      "Managing director of a 50-500 employee SME in France/EU, non-technical but pragmatic, weighing AI investment vs. operational risk, wants business-level narrative.",
  },
  "head-digital": {
    label: "Head of Digital",
    persona:
      "Head of digital transformation at a mid-to-large enterprise, navigates political capital, needs to convince boards, ops teams, and legal simultaneously.",
  },
  "dev-ambitieux": {
    label: "Dev Ambitieux",
    persona:
      "Senior engineer / tech lead aiming at CAIO or AI leadership, 25-35, hands-on with LLMs and agents, wants career signal, proof of depth, and credibility.",
  },
  all: {
    label: "All avatars",
    persona:
      "Cross-avatar content speaking to CTOs, consultants, DGs, heads of digital, and ambitious developers — emphasize the shared CAIO narrative over any single persona.",
  },
} as const;

export type AvatarKey = keyof typeof AVATARS;

const PLATFORM_RULES = {
  linkedin:
    "LinkedIn post: max ~1300 characters. Hook first line. Line breaks for readability. One concrete insight. Call-to-action at the end (question or link).",
  twitter:
    "Twitter/X thread: 5-9 tweets. Each tweet <= 270 chars. First tweet is the hook. Last tweet is the payoff + CTA. No filler emojis.",
  youtube:
    "YouTube short script: 15s, 30s, or 60s spoken length. Scene-by-scene: HOOK / PROBLEM / POINT / PAYOFF / CTA. Include on-screen text cues in brackets [TEXT].",
  newsletter:
    "Editorial newsletter entry: 400-700 words. One core thesis, one story or data point, one actionable takeaway. No TL;DR, no bullet-soup.",
} as const;

const TEMPLATE_RULES = {
  hook: "A single opening line (or 2 max) designed to stop the scroll. Contrarian, specific, or high-tension.",
  thread: "A structured thread: HOOK → context → 3-5 numbered points → payoff → CTA.",
  script:
    "A video or voice script with explicit scene/shot markers. Include timing cues like [0-3s], [3-10s], etc.",
  post: "A full platform post: hook + body + CTA. Respect the platform's length rules.",
  video:
    "A storyboard: shots, on-screen text, voiceover, and B-roll suggestions. One line per shot.",
} as const;

export type PlatformKey = keyof typeof PLATFORM_RULES;
export type TemplateKey = keyof typeof TEMPLATE_RULES;

export function buildSystemPrompt(
  avatar: AvatarKey,
  platform: PlatformKey,
  template: TemplateKey,
): string {
  const persona = AVATARS[avatar]?.persona ?? AVATARS.all.persona;
  const platformRule = PLATFORM_RULES[platform];
  const templateRule = TEMPLATE_RULES[template];

  return `You are CAIO Academy's lead content strategist.

MISSION CONTEXT
CAIO Academy trains, certifies, and places Chief AI Officers. Target: €1M ARR by end of year 3. Five target avatars: CTO SaaS, Consultant AI, DG PME, Head of Digital, Dev Ambitieux. We speak like an editorial whitepaper: sober, contrarian, concrete.

AUDIENCE
${persona}

PLATFORM
${platformRule}

TEMPLATE
${templateRule}

VOICE RULES
- No emojis. No hype. No "game-changer", "unlock", "leverage", "synergize".
- Contrarian over safe. Specific over vague. Short over long when possible.
- Every idea must be defensible with an example, a mechanism, or a number.
- Write in the language the user's prompt is written in (French or English). If unsure, default to French.

OUTPUT FORMAT
Return a JSON array, and ONLY a JSON array — no prose before or after. Each element:
{
  "title": "short working title (<= 80 chars)",
  "body": "the full content piece, respecting platform + template rules",
  "hashtags": ["optional", "relevant"],
  "cta": "optional single-line CTA"
}
`;
}
