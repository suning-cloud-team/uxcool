const path = require('path');
console.log(path.resolve(__dirname, '..', 'packages'));
module.exports = {
  settings: {
    // 'import/resolver': {
    //   webpack: {
    //     config: {
    //       resolve: {
    //         alias,
    //       },
    //     },
    //   },
    // },
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: '../packages/uxcool/',
      },
    ],
    'import/core-modules': [
      '@cloud-sn/uxcool',
      '@uxcool/uxcool-table-search-form',
      'date-fns',
      '@cloud-sn/v-utils',
    ],
  },
};
