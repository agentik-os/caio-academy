import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  adminGenerations: defineTable({
    prompt: v.string(),
    avatar: v.string(),
    platform: v.string(),
    template: v.string(),
    count: v.number(),
    output: v.string(),
    userId: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  podcasts: defineTable({
    docSlug: v.string(),
    lang: v.union(v.literal("fr"), v.literal("en")),
    audioUrl: v.string(),
    durationSec: v.number(),
    voiceId: v.string(),
    charCount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("ready"),
      v.literal("error"),
    ),
    errorMessage: v.optional(v.string()),
    generatedAt: v.number(),
  }).index("by_doc_lang", ["docSlug", "lang"]),
});
