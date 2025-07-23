import { headers } from "next/headers";
import { DashboardAppShell } from "./dashboard-app-shell";
import { auth, checkAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await checkAuth();

  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  });

  if (!organizations.length) {
    return redirect("/onboarding");
  }

  return <DashboardAppShell user={user}>{children}</DashboardAppShell>;
}
