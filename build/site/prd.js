const webpack = require('webpack');
const merge = require('webpack-merge');
const rimraf = require('rimraf');
const configFn = require('./webpack.base');

module.exports = (env) => {
  process.env.NODE_ENV = 'production';
  return configFn(env).then((config) => {
    rimraf.sync(config.output.path);
    return merge(config, {
      plugins: [
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'production',
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
      ],
    });
  });
};
