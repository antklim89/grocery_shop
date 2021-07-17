module.exports = {
    reactStrictMode: true,
    images: {
        domains: [process.env.NEXT_PUBLIC_API_URL],
    },
    async rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/uploads/:path*`,
            },
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
            },
        ];
    },
};
