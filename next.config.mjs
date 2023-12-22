/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  swcMinify: true,
  reactStrictMode: true,
  compress: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
};

export default config;
