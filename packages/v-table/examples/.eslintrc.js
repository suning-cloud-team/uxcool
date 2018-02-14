const path = require('path');
module.exports = {
  settings: {
    'import/resolver': {
      webpack: {
        resolve: {
          alias: {
            '@suning/v-table$': path.join(__dirname, '../src/index.js'),
            '@suning/v-table': path.join(__dirname, '..'),
          },
        },
      },
    },
  },
};
