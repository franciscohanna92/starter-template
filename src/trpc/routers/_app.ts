import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  hello: protectedProcedure.query(({ ctx }) => {
    return `Hello ${ctx.user.name}`;
  }),
});

export type AppRouter = typeof appRouter;
