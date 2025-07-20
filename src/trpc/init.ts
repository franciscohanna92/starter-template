import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import { ZodError } from "zod";

export const createTRPCContext = cache(async (opts: { headers: Headers }) => {
  const authSession = await auth.api.getSession({
    headers: opts.headers,
  });

  const source = opts.headers.get("x-trpc-source") ?? "unknown";
  console.log(">>> tRPC Request from", source, "by", authSession?.user.email);

  /**
   * @see: https://trpc.io/docs/server/context
   */
  return {
    db,
    user: authSession?.user,
  };
});

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
