import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://developers.google.com/**")],
  },
};

export default nextConfig;
