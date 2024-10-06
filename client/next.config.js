import process from 'node:process';


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'standalone',
  env: {
    URL: process.env.URL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/server/_/:path*',
        destination: `${process.env.SERVER_URL}/_/:path*/`,
      },
      {
        source: '/server/api/:path*',
        destination: `${process.env.SERVER_URL}/api/:path*/`,
      },
    ];
},
};

export default nextConfig;
