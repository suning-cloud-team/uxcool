const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

module.exports = () => {
  const config = require('../webpack/server.js');
  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, {
    contentBase: config.output.path,
    hot: true,
    noInfo: false,
    stats: 'errors-only'
  });
  server.listen(8000, 'localhost', () => {
    console.log('server start port: 8000');
  });
};
