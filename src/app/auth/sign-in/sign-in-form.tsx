"use client";

import { authClient } from "@/lib/auth-client";
import { Alert, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignInWithSocialProviderButton } from "./sign-in-with-social-provider-button";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const onSuccess = () => router.replace("/dashboard");

  const signInWithEmail = async (values: { email: string; password: string }) =>
    authClient.signIn.email(
      { email: values.email, password: values.password },
      {
        onRequest: () => setIsLoading(true),
        onSuccess,
        onError: (ctx) => {
          setError(ctx.error);
          setIsLoading(false);
        },
      },
    );

  return (
    <form onSubmit={form.onSubmit(signInWithEmail)}>
      <Stack>
        {error ? <Alert color="red">{error.message}</Alert> : null}
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

        <SignInWithSocialProviderButton
          onError={setError}
          onSuccess={onSuccess}
          provider="google"
        />
      </Stack>
    </form>
  );
}
