const path = require('path');

module.exports = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async rewrites() {
    return [
      // Rewrite everything else to use `pages/index`
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },
};
