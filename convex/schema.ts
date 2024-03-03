import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  organizations: defineTable({
    fileId: v.id('_storage'),
    orgName: v.string(),
  }),
  files: defineTable({
    fileName: v.string(),
    orgId: v.string(),
    type: v.string(),
    fileId: v.id('_storage'),
  }).index('by_orgId', ['orgId']),
});
