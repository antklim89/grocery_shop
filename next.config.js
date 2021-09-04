module.exports = {
    reactStrictMode: true,
    compress: true,
    images: {
        domains: [
            process.env.NEXT_PUBLIC_API_URL.replace(/http(s|):\/\/([\w\d.]*)(:|)(\d*)/, '$2'),
            '192.168.90.19',
            'localhost',
            process.env.NEXT_PUBLIC_IMAGE_URL,
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

