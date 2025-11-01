import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/nextjspwaexample',
  images: {
    unoptimized: true,
  },
  turbopack: {},
};

export default nextConfig;
