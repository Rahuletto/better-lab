import million from 'million/compiler';
/** @type {import('next').NextConfig} */

import * as pwa from 'next-pwa';

const withPWA = pwa({
  dest: 'public',
  register: true,
  skipWaiting: true
});

const config = withPWA({
  poweredByHeader: false,
  swcMinify: true,
  reactStrictMode: true,
  compress: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  webpack5: true,
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
});

export default million.next(config, { auto: true });
