"use client";

import { authClient } from "@/lib/auth-client";
import { Alert, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) =>
    authClient.signIn.email(
      { email: values.email, password: values.password },
      {
        onRequest: () => setIsLoading(true),
        onSuccess: () => router.replace("/dashboard"),
        onError: (ctx) => {
          setError(ctx.error.message);
          setIsLoading(false);
        },
      },
    );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        {error ? <Alert color="red">{error}</Alert> : null}
        <TextInput
          label="Email"
          type="email"
          withAsterisk
          disabled={isLoading}
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          type="password"
          disabled={isLoading}
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
        <Button loading={isLoading} type="submit">
          Sign In
        </Button>
      </Stack>
    </form>
  );
}
