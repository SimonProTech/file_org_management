import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createOrg = mutation({
  args: {
    orgName: v.string(),
    fileId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('organizations', {
      orgName: args.orgName,
      fileId: args.fileId,
    });
  },
});

export const getAllOrganization = query({
  args: {},
  handler: async (ctx, args) => ctx.db.query('organizations').collect(),
});

export const generateUploadUrl = mutation(async (ctx) => await ctx.storage.generateUploadUrl());
