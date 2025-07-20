import { Box, Divider, Text, Title } from "@mantine/core";
import Link from "next/link";
import SignUpForm from "./sign-up-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    return redirect("/auth/profile");
  }

  return (
    <Box w="400px" mt="xl">
      <Title>Sign Up</Title>
      <Divider my="lg" />
      <SignUpForm />
      <Divider my="lg" />
      <Text>
        Already have an account? <Link href="/auth/sign-in">Sign in here</Link>
      </Text>
    </Box>
  );
}
