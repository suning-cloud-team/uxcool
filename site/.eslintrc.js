const alias = require('../build/site/alias');

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
  rules: {
    'vue/html-self-closing': 0,
  },
};
