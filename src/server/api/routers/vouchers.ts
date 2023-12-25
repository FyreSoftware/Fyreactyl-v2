import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const voucherRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.voucher.findMany({});

    return {
      data,
    };
  }),
  create: protectedProcedure
    .input(
      z.object({
        code: z.string().max(10, "Code cannot be longer than 10 characters"),
        coins: z.number(),
        amount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newVoucher = await ctx.db.voucher.create({
        data: {
          code: input.code,
          currency: input.coins,
          amount: input.amount,
        },
      });

      return {
        message: "Created voucher successfully!",
      };
    }),
  delete: protectedProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const voucher = await ctx.db.voucher.findFirst({
        where: {
          code: input.code,
        },
      });
      if (!voucher) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Did not find a voucher with that code.",
        });
      }

      await ctx.db.voucher.delete({
        where: {
          code: voucher.code,
        },
      });
      return {
        message: "Deleted voucher!",
      };
    }),
  redeem: protectedProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const voucher = await ctx.db.voucher.findFirst({
        where: {
          code: input.code,
        },
      });
      if (!voucher) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Did not find a voucher with that code.",
        });
      }
      if (ctx.session.user.redeemedVouchers.includes(voucher.code)) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You already redeemed this code!",
        });
      }
      if (voucher.amount > 1) {
        await ctx.db.voucher.update({
          where: {
            code: voucher.code,
          },
          data: {
            amount: voucher.amount - 1,
          },
        });
      } else {
        await ctx.db.voucher.delete({
          where: {
            code: input.code,
          },
        });
      }
      const userUpdate = await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          coins: ctx.session.user.coins + voucher.currency,
          redeemedVouchers: [
            voucher.code,
            ...ctx.session.user.redeemedVouchers,
          ],
        },
      });
      ctx.session.user = userUpdate;
      await ctx.session.save();

      return {
        message: "Redeemed voucher successfully!",
      };
    }),
});
