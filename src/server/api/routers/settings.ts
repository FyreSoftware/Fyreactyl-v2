import { createTRPCRouter, publicProcedure } from "../trpc";

export const settingsRouter = createTRPCRouter({
  mode: publicProcedure.query(async ({ ctx }) => {
    const SettingsSchema = await ctx.db.settings.findFirst({});

    if (!SettingsSchema) {
      const newSettingsSchema = await ctx.db.settings.create({ data: {} });

      return {
        mode: newSettingsSchema.mode,
      };
    } else {
      return {
        mode: SettingsSchema.mode,
      };
    }
  }),
});
