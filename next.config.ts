import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // One 404 page for the whole site (each language has its own root layout).
  experimental: { globalNotFound: true },
}

export default nextConfig
