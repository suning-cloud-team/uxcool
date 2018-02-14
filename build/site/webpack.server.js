const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const configFn = require('./webpack.dev.js');
const { getRoot } = require('../utils');

const root = getRoot();
const distRoot = path.resolve(root, 'site/dist');

module.exports = configFn({ server: true }).then(config =>
  merge(config, {
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      contentBase: distRoot,
      hot: true,
      noInfo: true,
      stats: 'errors-only',
      open: true,
      openPage: '/index.html',
    },
  }));
