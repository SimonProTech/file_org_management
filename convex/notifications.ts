import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createNotification = mutation({
  args: {
    orgId: v.id('organizations'),
    message: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => ctx.db.insert('notifications', {
    orgId: args.orgId,
    message: args.message,
    wasRead: false,
    userId: args.userId,
  }),
});

export const getNotifications = query({
  args: {
    userId: v.string(),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.orgId === '' || !args.orgId) {
      return [];
    }

    return ctx.db.query('notifications')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .filter((q) => q.eq(q.field('orgId'), args.orgId))
      .filter((q) => q.eq(q.field('wasRead'), false))
      .collect();
  },
});

export const markNotificationAsReaded = mutation({
  args: {
    userId: v.string(),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    console.log(args);
  },
});
