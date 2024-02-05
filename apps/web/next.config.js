/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'feb.umri.ac.id',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
