import { type PrismaClient, type Prisma } from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { type IronSession } from "iron-session";
import { roles, type UserRole } from "~/utils/roles";
import { type IronSessionObject } from "~/utils/session";

export const checkPermissions = (
  ctx: {
    db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
    session: IronSession<IronSessionObject>;
  },
  permissions: string[]
) => {
  if (!ctx.session || !ctx.session.user) {
    return;
  }
  const role = ctx.session.user.role as UserRole;

  const permissionsForRole = roles[role] as string[];

  if (!permissionsForRole.length && permissions.length > 0) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You do not have the correct permissions.",
    });
  }

  const check = permissions.some((r) => permissionsForRole.includes(r));

  if (!check) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You do not have the correct permissions.",
    });
  }
};
