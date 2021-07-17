console.debug('||process.env.NEXT_PUBLIC_API_URL: \n', process.env.NEXT_PUBLIC_API_URL);

module.exports = {
    reactStrictMode: true,
    images: {
        domains: [process.env.NEXT_PUBLIC_API_URL, '192.168.90.19', 'grocery-shop-strapi.herokuapp.com'],
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
