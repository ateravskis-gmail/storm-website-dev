/** @type {import('next').NextConfig} */
const nextConfig = {
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


