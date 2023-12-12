import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { hash, verify } from "argon2";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email("Incorrect email!"),
        first_name: z.string(),
        last_name: z.string(),
        username: z
          .string()
          .min(2, "An username must be 2 characters or longer")
          .max(16, "An username must be less than 16 characters long."),
        password: z
          .string()
          .min(6, "Password must be atleast 6 characters long"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const firstNameCheck = new RegExp(/[!@#$%^&*(),.?"":{}|<>]/).test(
        input.first_name
      );
      const lastNameCheck = new RegExp(/[!@#$%^&*(),.?"":{}|<>]/).test(
        input.last_name
      );
      if (firstNameCheck || lastNameCheck) {
        throw new TRPCError({
          code: "PARSE_ERROR",
          message: "Special characters in first or last name are not allowed.",
        });
      }
      const isFirstUser = (await ctx.db.user.findMany({})).length === 0;

      if (
        await ctx.db.user.findFirst({
          where: {
            email: input.email,
          },
        })
      ) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An user already exists with that email.",
        });
      }
      const hashedPassword = await hash(input.password);
      const user = await ctx.db.user.create({
        data: {
          first_name: input.first_name,
          last_name: input.last_name,
          username: input.username,
          email: input.email,
          password: hashedPassword,
          connections: {},
          role: isFirstUser ? "Admin" : "User",
        },
      });
      ctx.session.user = user;
      await ctx.session.save();
      return {
        message: "Successfully registered",
      };
    }),
  checkExist: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: { email: input.email },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Account not found.",
        });
      }
      return {
        message: "Account found with that email",
      };
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email provided"),
        password: z
          .string()
          .min(6, "Minimum 6 characters password")
          .max(16, "Password must be 16 characters long"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Account not found with that email",
        });
      }
      const comparedPassword = await verify(user.password, input.password);
      if (!comparedPassword) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password!",
        });
      }
      ctx.session.user = user;
      await ctx.session.save();
      return {
        message: "Logged in successfully",
      };
    }),
  user: protectedProcedure.query(({ ctx }) => {
    return {
      user: ctx.session.user,
    };
  }),
  logout: protectedProcedure.query(({ ctx }) => {
    ctx.session.destroy();
    return {
      message: "Logged out successfully!",
    };
  }),
});
