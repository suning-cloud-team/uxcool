const webpack = require('webpack');
const path = require('path');
const configFn = require('./base');
const merge = require('webpack-merge');

const { getRoot, getPackageJSON } = require('../utils');

const root = getRoot();
const { pkgName } = getPackageJSON(path.resolve(root, 'package.json'));
const srcPath = path.resolve(root, 'src');

module.exports = (env = {}) => {
  process.env.NODE_ENV = 'production';
  return configFn(env).then(config =>
    merge(config, {
      entry: {
        [`${pkgName}.min`]: path.resolve(srcPath, 'index.js'),
      },
      plugins: [
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'production',
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
      ],
    }));
};
