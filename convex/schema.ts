import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  organizations: defineTable({
    fileId: v.id('_storage'),
    orgName: v.string(),
    adminId: v.string(),
  }).index('by_orgName', ['orgName']),
  files: defineTable({
    fileName: v.string(),
    orgId: v.string(),
    type: v.string(),
    fileId: v.id('_storage'),
    shouldBeDeleted: v.optional(v.boolean()),
    fileTypeQ: v.optional(v.string()),
  }).index('by_orgId', ['orgId'])
    .index('by_shouldBeDeleted', ['shouldBeDeleted']),
  users: defineTable({
    userId: v.string(),
    userName: v.string(),
    userEmail: v.string(),
    userImage: v.string(),
    role: v.string(),
  }).index('by_userId', ['userId']),
  favorite: defineTable({
    orgId: v.string(),
    userId: v.string(),
    fileId: v.id('_storage'),
  }).index('by_orgId_userId_fileId', ['orgId', 'fileId', 'userId']),
});
