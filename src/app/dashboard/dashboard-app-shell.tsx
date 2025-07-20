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

export function DashboardAppShell({
  user,
  children,
}: {
  user: User;
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
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShellHeader>
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={sidebar.toggle}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </AppShellHeader>
      <AppShellNavbar p="md">
        {/* User menu */}
        <Menu withArrow position="right">
          <Menu.Target>
            <Button
              mt="auto"
              leftSection={<UserCircleIcon weight="duotone" size={24} />}
              variant="default"
            >
              {user.name}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              rightSection={<SignOutIcon weight="bold" />}
              onClick={signOut}
            >
              <Text> Sign out</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </AppShellNavbar>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
