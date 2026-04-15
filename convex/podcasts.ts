import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const langValidator = v.union(v.literal("fr"), v.literal("en"));
const statusValidator = v.union(
  v.literal("pending"),
  v.literal("ready"),
  v.literal("error"),
);

export const getByDocLang = query({
  args: { docSlug: v.string(), lang: langValidator },
  handler: async (ctx, { docSlug, lang }) => {
    return await ctx.db
      .query("podcasts")
      .withIndex("by_doc_lang", (q) =>
        q.eq("docSlug", docSlug).eq("lang", lang),
      )
      .first();
  },
});

export const listByLang = query({
  args: { lang: langValidator },
  handler: async (ctx, { lang }) => {
    const rows = await ctx.db.query("podcasts").collect();
    return rows.filter((r) => r.lang === lang);
  },
});

export const upsertPending = mutation({
  args: {
    docSlug: v.string(),
    lang: langValidator,
    charCount: v.number(),
    voiceId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("podcasts")
      .withIndex("by_doc_lang", (q) =>
        q.eq("docSlug", args.docSlug).eq("lang", args.lang),
      )
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, {
        status: "pending",
        errorMessage: undefined,
        charCount: args.charCount,
        voiceId: args.voiceId,
        generatedAt: Date.now(),
      });
      return existing._id;
    }
    return await ctx.db.insert("podcasts", {
      docSlug: args.docSlug,
      lang: args.lang,
      audioUrl: "",
      durationSec: 0,
      voiceId: args.voiceId,
      charCount: args.charCount,
      status: "pending",
      generatedAt: Date.now(),
    });
  },
});

export const markReady = mutation({
  args: {
    docSlug: v.string(),
    lang: langValidator,
    audioUrl: v.string(),
    durationSec: v.number(),
  },
  handler: async (ctx, { docSlug, lang, audioUrl, durationSec }) => {
    const existing = await ctx.db
      .query("podcasts")
      .withIndex("by_doc_lang", (q) =>
        q.eq("docSlug", docSlug).eq("lang", lang),
      )
      .first();
    if (!existing) return null;
    await ctx.db.patch(existing._id, {
      status: "ready",
      audioUrl,
      durationSec,
      generatedAt: Date.now(),
    });
    return existing._id;
  },
});

export const markError = mutation({
  args: {
    docSlug: v.string(),
    lang: langValidator,
    errorMessage: v.string(),
  },
  handler: async (ctx, { docSlug, lang, errorMessage }) => {
    const existing = await ctx.db
      .query("podcasts")
      .withIndex("by_doc_lang", (q) =>
        q.eq("docSlug", docSlug).eq("lang", lang),
      )
      .first();
    if (!existing) return null;
    await ctx.db.patch(existing._id, {
      status: "error",
      errorMessage,
    });
    return existing._id;
  },
});

export const setStatus = mutation({
  args: {
    docSlug: v.string(),
    lang: langValidator,
    status: statusValidator,
  },
  handler: async (ctx, { docSlug, lang, status }) => {
    const existing = await ctx.db
      .query("podcasts")
      .withIndex("by_doc_lang", (q) =>
        q.eq("docSlug", docSlug).eq("lang", lang),
      )
      .first();
    if (!existing) return null;
    await ctx.db.patch(existing._id, { status });
    return existing._id;
  },
});
