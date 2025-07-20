import { Box, Divider, Title, Text } from "@mantine/core";
import Link from "next/link";
import { SignInForm } from "./sign-in-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <Box w="400px" mt="xl">
      <Title>Sign In</Title>
      <Divider my="lg" />
      <SignInForm />
      <Divider my="lg" />
      <Text>
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up">Sign up here</Link>.
      </Text>
    </Box>
  );
}
