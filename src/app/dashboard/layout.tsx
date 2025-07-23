import { headers } from "next/headers";
import { DashboardAppShell } from "./dashboard-app-shell";
import { auth, checkAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await checkAuth();

  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  });

  if (!organizations.length) {
    return redirect("/onboarding");
  }

  const activeOrganization =
    organizations.find((org) => org.id === session.activeOrganizationId) ??
    organizations[0];

  return (
    <DashboardAppShell
      organizations={organizations.map((org) => ({
        id: org.id,
        name: org.name,
      }))}
      activeOrganization={{
        id: activeOrganization.id,
        name: activeOrganization.name,
      }}
      user={user}
    >
      {children}
    </DashboardAppShell>
  );
}
