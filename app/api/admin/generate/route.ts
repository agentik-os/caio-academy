import Anthropic from "@anthropic-ai/sdk";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  AVATARS,
  buildSystemPrompt,
  type AvatarKey,
  type PlatformKey,
  type TemplateKey,
} from "@/lib/admin/system-prompt";
import { api } from "@/convex/_generated/api";

export const runtime = "nodejs";
export const maxDuration = 60;

type Body = {
  prompt?: string;
  avatar?: AvatarKey;
  platform?: PlatformKey;
  template?: TemplateKey;
  count?: number;
};

const PLATFORMS = ["linkedin", "twitter", "youtube", "newsletter"] as const;
const TEMPLATES = ["hook", "thread", "script", "post", "video"] as const;

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

  const prompt = (body.prompt ?? "").trim();
  const avatar = (body.avatar ?? "all") as AvatarKey;
  const platform = (body.platform ?? "linkedin") as PlatformKey;
  const template = (body.template ?? "post") as TemplateKey;
  const count = Math.max(3, Math.min(20, Number(body.count ?? 10)));

  if (!prompt) {
    return NextResponse.json({ error: "prompt_required" }, { status: 400 });
  }
  if (!(avatar in AVATARS)) {
    return NextResponse.json({ error: "bad_avatar" }, { status: 400 });
  }
  if (!PLATFORMS.includes(platform)) {
    return NextResponse.json({ error: "bad_platform" }, { status: 400 });
  }
  if (!TEMPLATES.includes(template)) {
    return NextResponse.json({ error: "bad_template" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "anthropic_key_missing" },
      { status: 500 },
    );
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const systemPrompt = buildSystemPrompt(avatar, platform, template);
  const userMessage = `Generate ${count} distinct content ideas for this brief:\n\n${prompt}\n\nReturn ONLY the JSON array described in the system prompt.`;

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
          max_tokens: 4000,
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
            await client.mutation(api.adminGenerations.create, {
              prompt,
              avatar,
              platform,
              template,
              count,
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
