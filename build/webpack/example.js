const path = require('path');
const merge = require('webpack-merge');
const rimraf = require('rimraf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getRoot } = require('../utils');
const getConfig = require('./base');

const root = getRoot();
const srcPath = path.join(root, 'examples');
const distPath = path.join(root, 'examples/dist');
const resolveModules = [
  'node_modules',
  path.join(root, 'node_modules'),
  path.join(srcPath, 'node_modules'),
];
module.exports = (env = {}) => {
  process.env.NODE_ENV = 'development';
  if (!env.server) {
    rimraf.sync(distPath);
  }
  return merge.smart(getConfig(env), {
    mode: 'development',
    entry: {
      main: path.join(srcPath, 'index.js'),
    },
    output: {
      filename: '[name].[hash].js',
      path: distPath,
      libraryTarget: 'var',
    },
    resolve: {
      alias: {
        '@': srcPath,
      },
      extensions: ['.js', '.json', '.jsx'],
      modules: resolveModules,
    },
    resolveLoader: {
      modules: resolveModules,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                rootMode: 'upward',
                overrides: [
                  {
                    plugins: [
                      [
                        'babel-plugin-import',
                        {
                          libraryName: '@suning/uxcool',
                          customName(methodName) {
                            const name = /^ux-/.test(methodName)
                              ? methodName.replace(/^ux-/, '')
                              : methodName;
                            return path.join('@suning/uxcool', 'src/components', name);
                            // return path.join('@suning/uxcool', 'es', name);
                          },
                          style: true,
                        },
                      ],
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'example',
        filename: 'index.html',
        chunks: ['main'],
        template: path.resolve(srcPath, 'index.html'),
      }),
    ],
    externals: {
      vue: 'Vue',
      // 'date-fns': 'dateFns',
    },
  });
};
