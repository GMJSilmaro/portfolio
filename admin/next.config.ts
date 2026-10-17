import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Server-backed admin app (not a static export). Deploy separately on Vercel.
  poweredByHeader: false,
}

export default nextConfig
