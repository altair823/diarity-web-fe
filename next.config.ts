import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  output: 'export',
}

export default nextConfig

module.exports = {
  output: 'standalone',
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
}
