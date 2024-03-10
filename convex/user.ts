import { v } from 'convex/values';
import { mutation } from './_generated/server';

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
  }),
});
