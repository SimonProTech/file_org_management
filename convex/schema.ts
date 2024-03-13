import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  organizations: defineTable({
    fileId: v.id('_storage'),
    orgName: v.string(),
    adminId: v.string(),
    adminName: v.string(),
  }).index('by_orgName', ['orgName']),
  files: defineTable({
    fileName: v.string(),
    orgId: v.string(),
    type: v.string(),
    fileAuthor: v.string(),
    fileAuthorImage: v.string(),
    fileId: v.id('_storage'),
    shouldBeDeleted: v.optional(v.boolean()),
    fileTypeQ: v.optional(v.string()),
  }).index('by_orgId', ['orgId'])
    .index('by_shouldBeDeleted', ['shouldBeDeleted']),
  user: defineTable({
    userId: v.string(),
    orgId: v.id('organizations'),
    userName: v.string(),
    userEmail: v.string(),
    userImage: v.string(),
    joinedOrg: v.boolean(),
    role: v.string(),
  }).index('by_userEmail', ['userEmail']),
  favorite: defineTable({
    orgId: v.string(),
    userId: v.string(),
    fileId: v.id('_storage'),
  }).index('by_orgId_userId_fileId', ['orgId', 'fileId', 'userId']),
  notifications: defineTable({
    orgId: v.id('organizations'),
    userId: v.string(),
    message: v.string(),
    wasRead: v.boolean(),
  }),
});
