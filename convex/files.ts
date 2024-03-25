import { v } from 'convex/values';
import { internalMutation, mutation, query } from './_generated/server';

export const createFile = mutation({
  args: {
    fileName: v.string(),
    orgId: v.string(),
    fileId: v.id('_storage'),
    fileAuthor: v.string(),
    fileAuthorImage: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => ctx.db.insert('files', {
    fileName: args.fileName,
    fileId: args.fileId,
    orgId: args.orgId,
    type: args.type,
    fileAuthor: args.fileAuthor,
    fileAuthorImage: args.fileAuthorImage,
  }),
});

export const allFiles = query({
  args: {
    orgId: v.string(),
    shouldBeDeleted: v.optional(v.boolean()),
    favorite: v.optional(v.boolean()),
    fileTypeQ: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let files = await ctx.db.query('files')
      .withIndex('by_orgId', (q) => q.eq('orgId', args.orgId))
      .collect();

    if (args.fileTypeQ) {
      files = files.filter((file) => file.type === args.fileTypeQ);
    }

    if (args.favorite) {
      const fav = await ctx.db.query('favorite')
        .withIndex('by_orgId_userId_fileId', (q) => q.eq('orgId', args.orgId)).collect();

      files = files.filter((x) => fav.some((y) => y.fileId === x.fileId));
    }

    if (args.shouldBeDeleted) {
      files = files.filter((x) => x.shouldBeDeleted);
    } else {
      files = files.filter((x) => !x.shouldBeDeleted);
    }
    return files;
  },
});

export const deleteFile = mutation({
  args: {
    id: v.id('files'),
    fileId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      shouldBeDeleted: true,
    });
  },
});

export const restoreFile = mutation({
  args: {
    id: v.id('files'),
    orgId: v.string(),
    fileId: v.id('_storage'),
  },
  handler: async (ctx, args) => await ctx.db.patch(args.id, {
    shouldBeDeleted: false,
  }),

});

export const permDelete = mutation({
  args: {
    id: v.id('files'),
    fileId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const deleteF = await ctx.db.delete(args.id);
    const deleteImageFileFromStorage = await ctx.storage.delete(args.fileId);
    await Promise.all([deleteF, deleteImageFileFromStorage]);
  },
});

export const removeFileAutomatically = internalMutation({
  args: {},
  handler: async (ctx) => {
    const allFilesThatShouldBeDeleted = await
    ctx.db
      .query('files')
      .withIndex('by_shouldBeDeleted', (q) => q.eq('shouldBeDeleted', true))
      .collect();

    await Promise.all(allFilesThatShouldBeDeleted.map(async (x) => {
      await ctx.storage.delete(x.fileId);
      return ctx.db.delete(x._id);
    }));
  },
});

export const filesType = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const allFilesByOrg = await ctx.db.query('files')
      .withIndex('by_orgId', (q) => q.eq('orgId', args.orgId)).collect();
    const allTypes = allFilesByOrg.map((file) => file.type);

    await Promise.all([allTypes]);
    return [...new Set(allTypes)];
  },
});

export const getFileUrl = query({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => ctx.storage.getUrl(args.storageId),
});

export const generateUploadUrl = mutation(async (ctx) => await ctx.storage.generateUploadUrl());
