import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    topic: v.string(),
    angle: v.string(),
    avatar: v.string(),
    length: v.string(),
    language: v.string(),
    output: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("youtubeScripts", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const recent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const rows = await ctx.db
      .query("youtubeScripts")
      .withIndex("by_createdAt")
      .order("desc")
      .take(limit ?? 20);
    return rows;
  },
});
