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
    'import/core-modules': ['@suning/uxcool', '@suning/v-utils'],
  },
  rules: {
    'vue/html-self-closing': 0,
  },
};
