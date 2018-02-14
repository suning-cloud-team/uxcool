const alias = require('../build/example/alias');

module.exports = {
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias,
          },
        },
      },
    },
  },
};
