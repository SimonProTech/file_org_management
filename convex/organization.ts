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

    const checkHowManyOrgsBelongToUser = await ctx.db.query('organizations')
      .filter((q) => q.eq(q.field('adminId'), args.adminId))
      .collect();

    if (checkHowManyOrgsBelongToUser.length >= 2) {
      throw new ConvexError('Reached too many organizations. You can only have two organizations.');
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
    const users = await ctx.db.query('user')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .filter((q) => q.eq(q.field('joinedOrg'), true))
      .collect();

    const orgIds = [...new Set(users.map((user) => user.orgId))];

    const userOrganizations = await Promise.all(orgIds.map(async (orgId) => {
      const org = await ctx.db.query('organizations')
        .filter((q) => q.eq(q.field('_id'), orgId))
        .first();
      return org;
    }));

    const adminOrganizations = await ctx.db.query('organizations')
      .filter((q) => q.eq(q.field('adminId'), args.userId))
      .collect();

    return [...userOrganizations, ...adminOrganizations];
  },
});

export const changeOrganizationName = mutation({
  args: {
    organizationId: v.id('organizations'),
    userId: v.string(),
    orgName: v.string(),
  },
  handler: async (ctx, args) => {
    const org = await ctx.db.get(args.organizationId);

    if (!org) {
      throw new ConvexError('Could not find organization');
    }

    if (org.adminId === args.userId) {
      await ctx.db.patch(org._id, {
        orgName: args.orgName,
      });
      return true;
    }
    throw new ConvexError('User is not authorized to change organization name');
  },
});

export const removeOrganization = mutation({
  args: {
    organizationId: v.id('organizations'),
    adminId: v.string(),
  },
  handler: async (ctx, args) => {
    const org = await ctx.db.query('organizations')
      .filter((q) => q.eq(q.field('adminId'), args.adminId))
      .filter((q) => q.eq(q.field('_id'), args.organizationId))
      .first();

    if (org) {
      await ctx.storage.delete(org.fileId);
      return ctx.db.delete(org._id);
    }
    return false;
  },
});

export const updateImageOrganization = mutation({
  args: {
    organizationId: v.id('organizations'),
    adminId: v.string(),
    fileId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const organization = await ctx.db.get(args.organizationId);

    if (!organization) {
      throw new ConvexError('Organization not found.');
    }

    if (organization.adminId !== args.adminId) {
      throw new ConvexError('You are not allowed to change org. image.');
    }

    return ctx.db.patch(organization._id, {
      fileId: args.fileId,
    });
  },
});
