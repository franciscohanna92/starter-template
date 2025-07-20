import { auth } from "@/lib/auth";
import { Button, Stack, Title, Text } from "@mantine/core";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const signOut = async () => {
  "use server";
  await auth.api.signOut({ headers: await headers() });
  return redirect("/auth/sign-in");
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <Stack mt="xl">
      <Title>Profile</Title>
      <Text>Currently logged in as {session.user.email}</Text>
      <Button variant="default" onClick={signOut}>
        Sign out
      </Button>
    </Stack>
  );
}
