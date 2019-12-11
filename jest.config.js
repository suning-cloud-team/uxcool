module.exports = {
  // projects 指定怎么运行jest, 如果多个配置则会在每个路径中运行jest,并且使用路径中jest.config
  projects: ['<rootDir>'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '.+\\.vue$': require.resolve('vue-jest'),
    '\\.jsx?$': [require.resolve('babel-jest'), { rootMode: 'upward' }],
  },
  transformIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jest-environment-jsdom-fifteen',
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  testURL: 'http://localhost',
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};
