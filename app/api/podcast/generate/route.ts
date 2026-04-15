import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { getDoc } from "@/lib/docs";
import {
  VOICES,
  ELEVEN_MODEL,
  isApiKeyConfigured,
  isBlobTokenConfigured,
  stripMarkdown,
  estimateDurationSec,
  podcastBlobKey,
} from "@/lib/podcast";
import { api } from "@/convex/_generated/api";

export const runtime = "nodejs";
export const maxDuration = 300;

type Body = { docSlug?: string; lang?: "fr" | "en" };

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { docSlug, lang } = body;
  if (!docSlug || !lang || (lang !== "fr" && lang !== "en")) {
    return NextResponse.json(
      { error: "Missing or invalid docSlug/lang" },
      { status: 400 },
    );
  }

  const [section, ...rest] = docSlug.split("/");
  const slug = rest.join("/");
  if (!section || !slug) {
    return NextResponse.json({ error: "docSlug must be section/slug" }, { status: 400 });
  }

  const doc = getDoc(section, slug, lang);
  if (!doc) {
    return NextResponse.json({ error: "Doc not found" }, { status: 404 });
  }

  if (!isApiKeyConfigured()) {
    return NextResponse.json(
      {
        error:
          "ELEVENLABS_API_KEY not configured. Set a real key in Vercel env vars.",
      },
      { status: 503 },
    );
  }

  if (!isBlobTokenConfigured()) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN not configured. Set a real Vercel Blob token in env vars.",
      },
      { status: 503 },
    );
  }

  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_CONVEX_URL not configured" },
      { status: 503 },
    );
  }

  const script = stripMarkdown(doc.content);
  const charCount = script.length;
  const voiceId = VOICES[lang];

  const convex = new ConvexHttpClient(convexUrl);

  try {
    await convex.mutation(api.podcasts.upsertPending, {
      docSlug,
      lang,
      charCount,
      voiceId,
    });
  } catch (e) {
    return NextResponse.json(
      { error: `Convex write failed: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 },
    );
  }

  try {
    const ttsRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY as string,
          "content-type": "application/json",
          accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: script,
          model_id: ELEVEN_MODEL,
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      },
    );
    if (!ttsRes.ok || !ttsRes.body) {
      const msg = await ttsRes.text().catch(() => "");
      throw new Error(`ElevenLabs ${ttsRes.status}: ${msg.slice(0, 200)}`);
    }

    const { put } = await import("@vercel/blob");
    const blobKey = podcastBlobKey(docSlug, lang);
    const blob = await put(blobKey, ttsRes.body, {
      access: "public",
      contentType: "audio/mpeg",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      allowOverwrite: true,
    });

    const durationSec = estimateDurationSec(charCount);

    await convex.mutation(api.podcasts.markReady, {
      docSlug,
      lang,
      audioUrl: blob.url,
      durationSec,
    });

    return NextResponse.json({
      ok: true,
      audioUrl: blob.url,
      durationSec,
      charCount,
    });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    try {
      await convex.mutation(api.podcasts.markError, {
        docSlug,
        lang,
        errorMessage,
      });
    } catch {
      // swallow secondary failure
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 502 },
    );
  }
}
