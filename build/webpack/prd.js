const path = require('path');
const merge = require('webpack-merge');
const getConfig = require('./base');

const { getUxCoolPath, getPkg, getRoot } = require('../utils');

const pkg = getPkg(getRoot());
const srcPath = path.join(getUxCoolPath(), 'src');

module.exports = (env = {}) => {
  process.env.NODE_ENV = 'production';
  return merge(getConfig(env), {
    mode: 'production',
    entry: {
      [`${pkg.pkgName}.min`]: path.resolve(srcPath, 'index.js'),
    },
  });
};
