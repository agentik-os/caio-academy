import { execSync } from "node:child_process";
import { writeFileSync, unlinkSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

export const VOICES = {
  fr: "alloy" as const,
  en: "onyx" as const,
};

export const TTS_MODEL = "tts-1-hd";
const MAX_CHARS = 4000;

export function isApiKeyConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY;
  return !!key && key.length > 20 && key.startsWith("sk-");
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

export function chunkText(text: string, maxLen: number = MAX_CHARS): string[] {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  let current = "";
  for (const s of sentences) {
    if (current.length + s.length + 1 > maxLen && current.length > 0) {
      chunks.push(current.trim());
      current = s;
    } else {
      current += (current ? " " : "") + s;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

export async function callOpenAITTS(
  text: string,
  voice: string,
): Promise<Buffer> {
  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: TTS_MODEL,
      voice,
      input: text,
      response_format: "mp3",
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI TTS ${res.status}: ${err}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

export async function generatePodcastMp3(
  text: string,
  voice: string,
): Promise<Buffer> {
  const chunks = chunkText(text);
  if (chunks.length === 1) {
    return callOpenAITTS(chunks[0], voice);
  }

  const tmpDir = "/tmp/podcast-chunks";
  if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true });
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const chunkFiles: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const buf = await callOpenAITTS(chunks[i], voice);
    const fp = path.join(tmpDir, `${id}_${i}.mp3`);
    writeFileSync(fp, buf);
    chunkFiles.push(fp);
  }

  const listFile = path.join(tmpDir, `${id}.txt`);
  writeFileSync(
    listFile,
    chunkFiles.map((f) => `file '${f}'`).join("\n"),
  );
  const outFile = path.join(tmpDir, `${id}_final.mp3`);
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${listFile}" -c copy "${outFile}" 2>/dev/null`,
  );

  const finalBuf = require("node:fs").readFileSync(outFile);

  // cleanup
  for (const f of chunkFiles) unlinkSync(f);
  unlinkSync(listFile);
  unlinkSync(outFile);

  return finalBuf;
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
