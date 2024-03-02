import { v } from 'convex/values';
import { mutation } from './_generated/server';

const createOrg = mutation({
  args: { orgName: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('organizations', {
      name: args.orgName,
    });
  },
});

export default createOrg;
