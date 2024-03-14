import { ConvexError, v } from 'convex/values';
import { createMetadataExportsCode } from 'next/dist/build/webpack/loaders/metadata/discover';
import { internalMutation, mutation, query } from './_generated/server';
import { Doc } from './_generated/dataModel';

export const createNotification = mutation({
  args: {
    orgId: v.id('organizations'),
    message: v.string(),
    users: v.array(v.object({
      id: v.string(),
      wasRead: v.boolean(),
    })),
  },
  handler: async (ctx, args) => ctx.db.insert('notifications', {
    orgId: args.orgId,
    message: args.message,
    wasRead: false,
    users: args.users,
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

    const notifications = await ctx.db.query('notifications')
      .filter((q) => q.eq(q.field('orgId'), args.orgId))
      .order('desc')
      .collect();

    const hasUnreadNotifications = notifications.filter((x) => x.users.some((d) => d.id === args.userId));

    return hasUnreadNotifications;
  },
});

export const markNotificationAsRode = mutation({
  args: {
    notificationId: v.id('notifications'),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const notification = await ctx.db.get(args.notificationId);
    if (!notification) {
      throw new ConvexError(' Notifications not found');
    }

    const markWhenUserClick = notification.users.map(async (user) => {
      await ctx.db.patch(notification._id, {
        users: [{
          id: user.id,
          wasRead: true,
        }],
      });
      return {
        rode: true,
      };
    });

    const markWasReadByAll = notification.users.filter(async (item) => {
      if (item.wasRead) {
        return false;
      }
      await ctx.db.patch(notification._id, {
        wasRead: true,
      });
      return {
        allUsersRode: true,
      };
    });
    await Promise.all(markWhenUserClick);
    await Promise.all(markWasReadByAll);
    return true;
  },
});

export const removeNotificationsAfterOneWeekIfAllUsersSaw = internalMutation({
  args: {},
  handler: async (ctx) => {
    const allNotifications = await ctx.db.query('notifications').filter((q) => q.eq(q.field('wasRead'), true)).collect();
    return Promise.all(allNotifications.map(
      async (notification) => ctx.db.delete(notification._id),
    ));
  },
});
