module.exports = {
  // projects 指定怎么运行jest, 如果多个配置则会在每个路径中运行jest,并且使用路径中jest.config
  projects: ['<rootDir>'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  moduleNameMapper: {
    '@suning/v-datepicker/es/locale/([^/]+)': '<rootDir>/packages/v-datepicker/src/locale/$1',
    '@suning/v-tooltip/es/placements$': '<rootDir>/packages/v-tooltip/src/placements.js',
    '@suning/(v-(?!test-utils)[^/]+)': '<rootDir>/packages/$1/src/',
  },
  transform: {
    '.+\\.vue$': require.resolve('vue-jest'),
    '\\.jsx?$': [require.resolve('babel-jest'), { rootMode: 'upward' }],
  },
  transformIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jest-environment-jsdom-fifteen',
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  collectCoverageFrom: [
    'packages/uxcool/src/components/**/*.{js,vue,jsx}',
    // 'packages/v-datepicker/@(cjs|es|src)/**/*.{js,vue,jsx}',
    'packages/v-*/src/**/*.{js,vue,jsx}',
    '!**/__tests__/**',
    '!**/style/index.js',
    '!**/locale/*.js',
    '!**/virtual-list/**',
    // '!**/mixins/**',
  ],
  testURL: 'http://localhost',
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};
