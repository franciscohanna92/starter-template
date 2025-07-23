"use client";

import { authClient } from "@/lib/auth-client";
import { Alert, Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import slugify from "slugify";

export function CreateOrganizationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: "",
    },
  });

  const signInWithEmail = async (values: { name: string }) => {
    await authClient.organization.create(
      {
        name: values.name,
        slug: slugify(values.name),
        logo: "",
        keepCurrentActiveOrganization: false,
      },
      {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          alert("Organization created successfully!");
          router.replace("/dashboard");
        },
        onError: (ctx) => {
          setError(ctx.error);
          setIsLoading(false);
        },
        onFinish: () => setIsLoading(false),
      },
    );
  };

  return (
    <form onSubmit={form.onSubmit(signInWithEmail)}>
      <Stack>
        {error ? <Alert color="red">{error.message}</Alert> : null}
        <TextInput
          label="Organization Name"
          withAsterisk
          disabled={isLoading}
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <Button loading={isLoading} type="submit">
          Create
        </Button>
      </Stack>
    </form>
  );
}
