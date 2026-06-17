import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {},
  },
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
