import { EnvSchema } from './lib/env.js';


const { SERVER_URL } = EnvSchema.parse(process.env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'standalone',
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/pb/_/',
        destination: `${SERVER_URL}/_/`,
      },
      {
        source: '/pb/_/:path*',
        destination: `${SERVER_URL}/_/:path*`,
      },
      {
        source: '/pb/api/:path*',
        destination: `${SERVER_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
