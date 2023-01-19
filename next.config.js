const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        minimumCacheTTL: 60,
    },
    i18n,
};

module.exports = nextConfig;
