const path = require('path');
const merge = require('webpack-merge');
const getConfig = require('./base');

const { uxcoolPath, pkgName } = getConfig;
const srcPath = path.resolve(uxcoolPath, 'src');

module.exports = (env = {}) => {
  process.env.NODE_ENV = 'production';
  return merge(getConfig(env), {
    mode: 'production',
    entry: {
      [`${pkgName}.min`]: path.resolve(srcPath, 'index.js'),
    },
  });
};
