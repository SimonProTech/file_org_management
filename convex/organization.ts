import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const generateUploadUrl = mutation(async (ctx) => await ctx.storage.generateUploadUrl());

export const createOrg = mutation({
  args: {
    orgName: v.string(),
    adminName: v.string(),
    fileId: v.id('_storage'),
    adminId: v.string(),

  },
  handler: async (ctx, args) => {
    const findOrg = await ctx.db.query('organizations')
      .withIndex('by_orgName', (q) => q.eq('orgName', args.orgName)).first();

    if (findOrg) {
      throw new ConvexError('Organization already exists');
    }

    await ctx.db.insert('organizations', {
      orgName: args.orgName,
      fileId: args.fileId,
      adminId: args.adminId,
      adminName: args.adminName,
    });
  },
});

export const getOrganization = query({
  args: {
    orgId: v.string(),
  },
  handler: (ctx, args) => {
    const task = ctx.db.query('organizations').filter((q) => q.eq(q.field('_id'), args.orgId)).first();
    return task;
  },
});

export const getAllOrganization = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const users = await ctx.db.query('user').filter((q) => q.eq(q.field('userId'), args.userId)).filter((q) => q.eq(q.field('joinedOrg'), true)).collect();

    const orgIds = users.map((user) => user.orgId);
    const uniqueOrgIds = [...new Set(orgIds)];

    const organizations = await Promise.all(uniqueOrgIds.map(async (orgId) => {
      const org = await ctx.db.query('organizations').filter((q) => q.eq(q.field('_id'), orgId)).first();
      return org;
    }));

    return organizations.filter((org) => org !== undefined);
  },
});
