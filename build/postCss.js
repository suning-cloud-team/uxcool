const autoprefixer = require('autoprefixer');

const browsers = ['>= 5%', 'last 2 versions', 'ie >=9'];

module.exports = {
  getPostCssCfg: () => ({
    ident: 'postcss',
    plugins: () => [
      autoprefixer({
        browsers,
      }),
    ],
  }),
  getContext: () => ({
    config: {
      ctx: {
        autoprefixer: browsers,
      },
    },
  }),
};
