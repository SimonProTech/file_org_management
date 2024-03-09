import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';

export const addToFavorite = mutation({
  args: {
    orgId: v.string(),
    userId: v.string(),
    fileId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const checkIfFavorite = await ctx.db.query('favorite')
      .withIndex('by_orgId_userId_fileId', (q) => q.eq('orgId', args.orgId)).collect();

    const check = checkIfFavorite.some((x) => x.fileId === args.fileId);

    if (check) {
      throw new ConvexError('Product is already added to favorites');
    }

    await ctx.db.insert('favorite', {
      orgId: args.orgId,
      fileId: args.fileId,
      userId: args.userId,
    });
  },
});

export const unfavorite = mutation({
  args: {
    orgId: v.string(),
    fileId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const allfilesByOrg = await ctx.db
      .query('favorite')
      .withIndex('by_orgId_userId_fileId', (q) => q.eq('orgId', args.orgId))
      .collect();

    allfilesByOrg.map(async (file) => {
      if (file.fileId === args.fileId) {
        return ctx.db.delete(file._id);
      }
      return file;
    });
  },
});
