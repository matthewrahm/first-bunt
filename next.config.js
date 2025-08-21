/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['prod.spline.design'],
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];
    return config;
  },
}

module.exports = nextConfig
