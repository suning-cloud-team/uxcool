module.exports = {
  // projects 指定怎么运行jest, 如果多个配置则会在每个路径中运行jest,并且使用路径中jest.config
  projects: ['<rootDir>'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '.+\\.vue$': '<rootDir>/node_modules/vue-jest',
    '.+\\.js(x)?$': '<rootDir>/node_modules/babel-jest',
  },
  snapshotSerializers: ['jest-serializer-vue'],
};
