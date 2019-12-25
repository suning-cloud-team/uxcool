const path = require('path');
const merge = require('webpack-merge');
const getConfig = require('./base');

const srcPath = path.join(getConfig.uxcoolPath, 'src');

module.exports = (env = {}) => {
  process.env.NODE_ENV = 'development';
  return merge(getConfig(env), {
    mode: 'development',
    entry: {
      [getConfig.pkgName]: path.resolve(srcPath, 'index.js'),
    },
    devtool: false,
  });
};
