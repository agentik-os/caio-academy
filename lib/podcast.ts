export const VOICES = {
  fr: "pNInz6obpgDQGcFmaJgB",
  en: "21m00Tnd4PlvqZLbQBg",
} as const;

export const ELEVEN_MODEL = "eleven_multilingual_v2";

export function isApiKeyConfigured(): boolean {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return false;
  if (key === "xi_REPLACE_ME") return false;
  return key.length > 8;
}

export function isBlobTokenConfigured(): boolean {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return false;
  if (token === "vercel_blob_REPLACE_ME") return false;
  return token.length > 8;
}

export function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/[*_~>]+/g, " ")
    .replace(/\|/g, " ")
    .replace(/^\s*[-+]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateDurationSec(charCount: number): number {
  const charsPerSec = 15;
  return Math.max(1, Math.round(charCount / charsPerSec));
}

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function podcastBlobKey(docSlug: string, lang: "fr" | "en"): string {
  return `podcasts/${lang}/${docSlug}.mp3`;
}
