import { authClient } from "@/lib/auth-client";
import { Button, Group } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";

type SocialProvider = "google" | "facebook" | "twitter";

export function SignInWithSocialProviderButton({
  onError,
  onSuccess,
}: {
  onError: (error: Error) => void;
  onSuccess: () => void;
  provider: SocialProvider;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    await authClient.signIn.social(
      { provider: "google", callbackURL: "/dashboard" },
      {
        onRequest: () => setIsLoading(true),
        onSuccess,
        onError: (ctx) => {
          setIsLoading(false);
          onError(ctx.error);
        },
      },
    );
  };

  return (
    <Button variant="default" loading={isLoading} onClick={signIn}>
      <Group gap="xs">
        <Image
          src="https://developers.google.com/static/identity/images/g-logo.png"
          width={20}
          height={20}
          alt="Google Logo"
        />
        Continue with Google
      </Group>
    </Button>
  );
}
