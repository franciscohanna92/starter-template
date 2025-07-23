import { headers } from "next/headers";
import { auth, checkAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Center } from "@mantine/core";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();

  // const organizations = await auth.api.listOrganizations({
  //   headers: await headers(),
  // });

  // if (organizations.length) {
  // await auth.api.setActiveOrganization({
  //   body: { organizationId: organizations[0].id },
  //   headers: await headers(),
  // });

  //   return redirect("/dashboard");
  // }

  return <Center>{children}</Center>;
}
