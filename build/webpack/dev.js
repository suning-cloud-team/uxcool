const path = require('path');
const merge = require('webpack-merge');
const getConfig = require('./base');
const { getUxCoolPath, getPkg, getRoot } = require('../utils');

const pkg = getPkg(getRoot());
const srcPath = path.join(getUxCoolPath(), 'src');

module.exports = (env = {}) => {
  process.env.NODE_ENV = 'development';
  return merge(getConfig(env), {
    mode: 'development',
    entry: {
      [pkg.pkgName]: path.resolve(srcPath, 'index.js'),
    },
    devtool: false,
  });
};
