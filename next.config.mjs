import million from 'million/compiler';
/** @type {import('next').NextConfig} */

import pwa from 'next-pwa';
const withPWA = pwa({
  dest: 'public',
});

const config = withPWA({
  poweredByHeader: false,
  swcMinify: true,
  reactStrictMode: true,
  compress: true,
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
});

export default million.next(config, { auto: true });
