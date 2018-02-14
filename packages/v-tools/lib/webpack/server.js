const webpack = require('webpack');
const merge = require('webpack-merge');
const {
  getConfig
} = require('./getWebpackConfig');


const config = getConfig();

module.exports = merge(config, {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: config.output.path,
    hot: true,
    noInfo: false,
    stats: 'errors-only'
  }
});
