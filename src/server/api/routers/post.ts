import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { checkPermissions } from "~/server/utils/checkPermissions";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().min(10) })
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      checkPermissions(ctx, ["Fortnite"]);
      return ctx.db.announcement.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.announcement.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
