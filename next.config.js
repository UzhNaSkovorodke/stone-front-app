/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: false,
}
module.exports = nextConfig

const path = require('path')

module.exports = {
  async redirects() {
    return [
      {
        source: '/lk',
        destination: '/lk/favorites',
        permanent: true,
      },
    ]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      include: [path.resolve(__dirname, 'src/shared'), path.resolve(__dirname, 'src/features')],
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    domains: [
      'cms.stonehedgecompany.com',
      'stonehedgecompany.com',
      'stonehedgecompany.comnull',
      'stonehedgecompany.comundefined',
      'cms.stonehedgecompany.comundefined',
      'stone.ru',
      'stone.runull',
      'stone.ruundefined',
      '166ba6ce-eee2-43f1-87a4-b80ece869977.selcdn.net',
    ],
    formats: ['image/webp'],
  },
}

