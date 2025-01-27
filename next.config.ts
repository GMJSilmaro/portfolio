import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
  trailingSlash: true,
};

export default nextConfig;
