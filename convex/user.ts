import { v } from 'convex/values';
import { ExpressionOrValue } from 'convex/server';
import { mutation, query } from './_generated/server';
import { Id } from './_generated/dataModel';

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
