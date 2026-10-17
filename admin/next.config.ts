import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Server-backed private admin (not a static export). Deploy separately on Vercel.
  poweredByHeader: false,
  serverExternalPackages: ['geoip-lite'],
}

export default nextConfig
