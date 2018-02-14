const devCfgFn = require('./webpack.dev');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env =>
  devCfgFn(env).then(cfg =>
    merge(cfg, {
      plugins: [new BundleAnalyzerPlugin()],
    }));
