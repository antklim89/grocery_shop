import process from 'node:process';


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'standalone',
  env: {
    URL: process.env.URL,
    SERVER_URL: process.env.SERVER_URL,
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/server/_/',
        destination: `${process.env.SERVER_URL}/_/`,
      },
      {
        source: '/server/_/:path*',
        destination: `${process.env.SERVER_URL}/_/:path*`,
      },
      {
        source: '/server/api/:path*',
        destination: `${process.env.SERVER_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
