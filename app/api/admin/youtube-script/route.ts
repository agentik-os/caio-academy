import Anthropic from "@anthropic-ai/sdk";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  YT_ANGLES,
  YT_AVATARS,
  YT_LANGUAGES,
  YT_LENGTHS,
  buildYoutubeSystemPrompt,
  type YtAngleKey,
  type YtAvatarKey,
  type YtLanguageKey,
  type YtLengthKey,
} from "@/lib/admin/youtube-voice-system-prompt";
import { api } from "@/convex/_generated/api";

export const runtime = "nodejs";
export const maxDuration = 120;

type Body = {
  topic?: string;
  angle?: YtAngleKey;
  avatar?: YtAvatarKey;
  length?: YtLengthKey;
  language?: YtLanguageKey;
};

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress;
  if (!process.env.ADMIN_EMAIL || email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const jar = await cookies();
  if (jar.get("admin-secondary")?.value !== "ok") {
    return NextResponse.json({ error: "password_required" }, { status: 403 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const topic = (body.topic ?? "").trim();
  const angle = (body.angle ?? "philosophical") as YtAngleKey;
  const avatar = (body.avatar ?? "all") as YtAvatarKey;
  const length = (body.length ?? "medium") as YtLengthKey;
  const language = (body.language ?? "fr") as YtLanguageKey;

  if (!topic) {
    return NextResponse.json({ error: "topic_required" }, { status: 400 });
  }
  if (!(angle in YT_ANGLES)) {
    return NextResponse.json({ error: "bad_angle" }, { status: 400 });
  }
  if (!(avatar in YT_AVATARS)) {
    return NextResponse.json({ error: "bad_avatar" }, { status: 400 });
  }
  if (!(length in YT_LENGTHS)) {
    return NextResponse.json({ error: "bad_length" }, { status: 400 });
  }
  if (!(language in YT_LANGUAGES)) {
    return NextResponse.json({ error: "bad_language" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "anthropic_key_missing" },
      { status: 500 },
    );
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const systemPrompt = buildYoutubeSystemPrompt({ avatar, angle, length, language });

  const userMessage = `Write one YouTube script for the following brief. Respect every rule in the system prompt, especially the JSON-only output.

BRIEF:
${topic}

ANGLE: ${angle} — ${YT_ANGLES[angle].direction}
TARGET LENGTH: ${YT_LENGTHS[length].words} spoken words (~${YT_LENGTHS[length].minutes} minutes)
LANGUAGE: ${language === "en" ? "English" : "Français"}

Return ONLY the JSON object.`;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
        );
      };

      let fullText = "";
      try {
        const response = await anthropic.messages.stream({
          model: "claude-opus-4-5",
          max_tokens: 8000,
          system: systemPrompt,
          messages: [{ role: "user", content: userMessage }],
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            fullText += event.delta.text;
            send("delta", { text: event.delta.text });
          }
        }

        send("complete", { text: fullText });

        try {
          const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
          if (convexUrl) {
            const client = new ConvexHttpClient(convexUrl);
            await client.mutation(api.youtubeScripts.create, {
              topic,
              angle,
              avatar,
              length,
              language,
              output: fullText,
              userId,
            });
          }
        } catch (err) {
          send("warn", {
            message: `convex_save_failed: ${(err as Error).message}`,
          });
        }
      } catch (err) {
        send("error", { message: (err as Error).message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
