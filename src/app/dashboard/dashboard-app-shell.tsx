"use client";

import { authClient } from "@/lib/auth-client";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Burger,
  Button,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { User } from "better-auth";
import { useRouter } from "next/navigation";
import { SignOutIcon, UserCircleIcon } from "@phosphor-icons/react";
import { UserMenu } from "./user-menu";
import { Organization } from "better-auth/plugins";

export function DashboardAppShell({
  user,
  organizations,
  activeOrganization,
  children,
}: {
  user: User;
  organizations: Pick<Organization, "id" | "name">[];
  activeOrganization: Pick<Organization, "id" | "name">;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [opened, sidebar] = useDisclosure(false);

  const signOut = () =>
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/auth/sign-in"),
        onError: () => alert("Failed to sign out..."),
      },
    });

  return (
    <AppShell
      // header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      {/* <AppShellHeader>
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={sidebar.toggle}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </AppShellHeader> */}
      <AppShellNavbar p="xs">
        <UserMenu
          user={user}
          organizations={organizations}
          activeOrganization={activeOrganization}
        />
      </AppShellNavbar>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
