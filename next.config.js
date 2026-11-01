/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep production builds from replacing assets used by the live dev server.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vumbnail.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'getweekly.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/how-it-works',
        destination: '/#how-it-works',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig


