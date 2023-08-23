/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lovegunitepool.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
