
/** @type {import('next').NextConfig} */
import runtimeCaching from 'next-pwa/cache.js';
import pwa from 'next-pwa';

const withPWA = pwa({
  dest: 'public',
  runtimeCaching,
  register: true,
  disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
  fallbacks: {
    document: '/_offline',
  },
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
  async redirects() {
    return [
      {
        source: '/academia',
        destination: 'https://academia-pro.vercel.app',
        permanent: true,
      },
    ]
  }
});


export default config;