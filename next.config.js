module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', '192.168.90.19'],
    },
    async rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: `${process.env.API_URL}/uploads/:path*`,
            },
            {
                source: '/api/:path*',
                destination: `${process.env.API_URL}/api/:path*`,
            },
        ];
    },
};
