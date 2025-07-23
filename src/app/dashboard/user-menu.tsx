"use client";

import { authClient } from "@/lib/auth-client";
import {
  AccordionChevron,
  Avatar,
  Button,
  Menu,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { CheckIcon, PlusIcon } from "@phosphor-icons/react";
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr";
import { User } from "better-auth";
import { Organization } from "better-auth/plugins/organization";
import { useRouter } from "next/navigation";

export const UserMenu = ({
  user,
  organizations,
  activeOrganization,
}: {
  user: User;
  organizations: Pick<Organization, "id" | "name">[];
  activeOrganization: Pick<Organization, "id" | "name">;
}) => {
  const router = useRouter();
  // const session = authClient.useSession();
  // const organizations = authClient.useListOrganizations();
  // const activeOrganization = authClient.useActiveOrganization();

  const setActiveOrganization = async (organizationId: string) => {
    const { error } = await authClient.organization.setActive({
      organizationId,
    });

    if (error) {
      alert("Failed to set active organization");
      return;
    }

    window.location.reload();
    return;
  };

  return (
    <Menu
      width="target"
      styles={(theme) => ({
        dropdown: {
          boxShadow: theme.shadows.md,
          borderRadius: theme.spacing.xs,
        },
        item: {
          borderRadius: "none",
        },
      })}
    >
      <Menu.Target>
        <Button
          variant="subtle"
          color="gray"
          styles={() => ({
            root: { paddingLeft: 6, border: "none" },
            label: { width: "100%" },
          })}
        >
          <Group justify="space-between" w="100%">
            <Group gap="xs">
              <Avatar
                allowedInitialsColors={["gray"]}
                name={activeOrganization.name}
                color="initials"
                bg="gray.2"
                size="sm"
                radius="sm"
              />
              {activeOrganization.name}
            </Group>
            <AccordionChevron />
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Group px="sm" py="xs">
          <Avatar
            allowedInitialsColors={["gray"]}
            name={activeOrganization.name}
            color="initials"
            bg="gray.2"
            size="md"
            radius="sm"
          />
          <Stack gap={2}>
            <Text size="sm" fw={500}>
              {activeOrganization.name}
            </Text>
            <Text size="xs" fw={500} c="gray.6">
              Free Plan · 1 member
            </Text>
          </Stack>
        </Group>
        <Menu.Divider />
        <Menu.Label>My Organizations</Menu.Label>
        {organizations.map((org) => (
          <Menu.Item
            onClick={() => setActiveOrganization(org.id)}
            rightSection={
              org.id === activeOrganization.id ? <CheckIcon /> : null
            }
            key={org.id}
          >
            {org.name}
          </Menu.Item>
        ))}
        <Menu.Item leftSection={<PlusIcon />}>Create New</Menu.Item>
        <Menu.Divider />
        <Menu.Label>{user.email}</Menu.Label>
        <Menu.Item leftSection={<SignOutIcon size={16} />}>Sign Out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
