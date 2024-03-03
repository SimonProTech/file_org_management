import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const generateUploadUrl = mutation(async (ctx) => await ctx.storage.generateUploadUrl());

export const createFile = mutation({
  args: {
    fileName: v.string(),
    orgId: v.string(),
    fileId: v.id('_storage'),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('files', {
      fileName: args.fileName,
      fileId: args.fileId,
      orgId: args.orgId,
      type: args.type,
    });
  },
});

export const allFiles = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const files = await ctx.db.query('files')
      .withIndex('by_orgId', (q) => q.eq('orgId', args.orgId))
      .collect();
    return files;
  },
});
