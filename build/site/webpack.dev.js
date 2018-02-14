const webpack = require('webpack');
const merge = require('webpack-merge');
const rimraf = require('rimraf');
const configFn = require('./webpack.base');

module.exports = (env = {}) => {
  process.env.NODE_ENV = 'development';
  return configFn(env).then((config) => {
    if (!env.server) {
      rimraf.sync(config.output.path);
    }
    return merge(config, {
      output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
      },
      plugins: [
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'development',
        }),
      ],
    });
  });
};
