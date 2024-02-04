import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { settingsRouter } from "./routers/settings";
import { voucherRouter } from "./routers/vouchers";
import { productRouter } from "./routers/products";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  settings: settingsRouter,
  vouchers: voucherRouter,
  products: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
