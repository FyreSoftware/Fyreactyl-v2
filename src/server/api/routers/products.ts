import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { calculateDate } from "~/server/utils/functions";

export const productRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.product.findMany({});

    return {
      data,
    };
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAvailableModules: publicProcedure.query(({ ctx }) => {
    // TODO: implement this with ProductModule when support is added for other services than pterodactyl
    return {
      modules: ["Pterodactyl"],
    };
  }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z
          .string()
          .max(24, "Product name cannot be longer than 24 characters"),
        description: z
          .string()
          .max(100, "Description cannot be longer than 100 characters"),
        price: z.number(),
        type: z.enum(["OneTime", "Weekly", "Monthly", "Yearly"]),
        buyable: z.boolean(),
        specifications: z.object({
          cpu: z.number(),
          ram: z.number(),
          disk: z.number(),
          databases: z.number(),
          backups: z.number(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Did not find a product with that id.",
        });
      }

      await ctx.db.product.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          buyable: input.buyable,
          type: input.type,
          specifications: input.specifications,
        },
      });

      return {
        message: "Updated product successfully!",
      };
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .max(24, "Product name cannot be longer than 24 characters"),
        description: z
          .string()
          .max(100, "Description cannot be longer than 100 characters"),
        price: z.number(),
        buyable: z.boolean(),
        type: z.enum(["OneTime", "Weekly", "Monthly", "Yearly"]),
        specifications: z.object({
          cpu: z.number(),
          ram: z.number(),
          disk: z.number(),
          databases: z.number(),
          backups: z.number(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.product.create({
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          type: input.type,
          buyable: input.buyable,
          module: "Pterodactyl",
          specifications: input.specifications,
        },
      });

      return {
        message: "Created product successfully!",
      };
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Did not find a product with that ID.",
        });
      }

      await ctx.db.product.delete({
        where: {
          id: product.id,
        },
      });
      return {
        message: "Deleted product!",
      };
    }),
  buy: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "Did not find a product with that ID. If you bought it in the store, please contact an administrator.",
        });
      }
      if (ctx.session.user.coins < product.price) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have enough coins to buy this.",
        });
      }

      const productForUser = {
        name: product.name,
        description: product.description,
        price: product.price,
        type: product.type,
        start_date: new Date(),
        end_date:
          product.type !== "OneTime" ? calculateDate(product.type) : null,
      };
      const userProducts = ctx.session.user.products ?? [];
      userProducts.push(productForUser);

      const userUpdate = await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          coins: ctx.session.user.coins - product.price,
          products: userProducts,
        },
      });
      ctx.session.user = userUpdate;
      ctx.session.save();

      return {
        message: "Redeemed voucher successfully!",
      };
    }),
});
