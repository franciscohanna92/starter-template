"use client";

import { authClient } from "@/lib/auth-client";
import { Select } from "@mantine/core";
import { useRouter } from "next/navigation";

export const OrganizationSelect = () => {
  const router = useRouter();
  const organizations = authClient.useListOrganizations();
  const activeOrganization = authClient.useActiveOrganization();

  const options =
    organizations.data?.map((org) => ({
      value: org.id,
      label: org.name,
    })) ?? [];

  return (
    <Select
      label="Organization"
      clearable={false}
      searchable={false}
      value={activeOrganization.data?.id}
      onChange={async (value) => {
        if (value === "new") {
          alert("new");
          return router.push("/onboarding");
        }

        const { error } = await authClient.organization.setActive({
          organizationId: value,
        });

        if (error) {
          alert("Failed to set active organization");
          return;
        }

        window.location.reload();
        return;
      }}
      placeholder="Select organization"
      data={[...options, { value: "new", label: "Create new organization" }]}
    />
  );
};
