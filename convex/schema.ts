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
});
