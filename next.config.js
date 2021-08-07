module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            process.env.NEXT_PUBLIC_API_URL,
            '192.168.90.19',
            'localhost',
            'grocery-shop-strapi.herokuapp.com',
            'ucarecdn.com',
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
        });
        return config;
    },
    webpackDevMiddleware: (config) => {
        return config;
    },
};

