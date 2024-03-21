import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createUserAndAddToOrganization = mutation({
  args: {
    orgId: v.id('organizations'),
    userId: v.optional(v.string()),
    userName: v.string(),
    userImage: v.optional(v.string()),
    userEmail: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => ctx.db.insert('user', {
    userId: args.userId || '',
    orgId: args.orgId,
    userName: args.userName,
    userImage: args.userImage || '',
    role: args.role,
    userEmail: args.userEmail,
    joinedOrg: false,
  }),
});

export const getAllUsersAddedToOrganization = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const allUsersId = await ctx.db.query('user').filter((q) => q.eq(q.field('orgId'), args.orgId)).collect();
    return allUsersId.filter((user) => user.userId);
  },
});

export const getUserAddedToOrganization = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const all = await ctx.db.query('user').filter((q) => q.eq(q.field('userEmail'), args.userEmail)).filter((q) => q.eq(q.field('joinedOrg'), false)).collect();

    const promisedAllData = all.map(async (org) => {
      const organization = await ctx.db.query('organizations').filter((q) => q.eq(q.field('_id'), org.orgId)).first();

      return {
        ...org,
        organization,
      };
    });
    return Promise.all(promisedAllData);
  },
});

export const getUserFromOrganization = query({
  args: {
    orgId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.query('user')
      .filter((q) => q.eq(q.field('orgId'), args.orgId))
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .filter((q) => q.eq(q.field('joinedOrg'), true))
      .first();
    return user;
  },
});

export const joinOrganization = mutation({
  args: {
    objId: v.id('user'),
    userId: v.string(),
    userImage: v.string(),
  },
  handler: async (ctx, args) => ctx.db.patch(args.objId, {
    joinedOrg: true,
    userId: args.userId,
    userImage: args.userImage,
  }),
});
