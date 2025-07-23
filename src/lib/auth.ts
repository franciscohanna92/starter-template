import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/lib/generated/prisma";
import { env } from "@/env";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { organization } from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  plugins: [organization()],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});

export const checkAuth = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return redirect("/auth/sign-in");
  }

  return session;
};
