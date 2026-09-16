import type { NextConfig } from "next";

// Served from the root of the custom domain (gmjsilmaro.dev), so no basePath
// or assetPrefix. Adding one would make /_next assets 404.
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
