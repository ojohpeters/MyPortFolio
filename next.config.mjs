/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project so Next doesn't get confused by
  // stray lockfiles in parent directories.
  outputFileTracingRoot: import.meta.dirname,
  // Guarantee the avatar is bundled into the OG-image serverless function so
  // it can be read with fs at runtime (public/ isn't shipped to functions).
  outputFileTracingIncludes: {
    "/opengraph-image": ["./app/avatar.png"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
