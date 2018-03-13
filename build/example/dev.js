const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rimraf = require('rimraf');

const postCssUtils = require('../postCss');
const { getRoot, getPackageJSON } = require('../utils');
const alias = require('./alias');

const root = getRoot();
const { vueCompileOpts = {} } = getPackageJSON(path.resolve(root, 'package.json'));
const srcPath = path.resolve(root, 'examples');
const distPath = path.resolve(root, 'examples/dist');

// support babel-plugin-import
const babelOpts = {
  extends: path.resolve(root, '.babelrc'),
  plugins: [
    [
      'import',
      {
        libraryName: '@suning/uxcool',
        customName(methodName) {
          const name = /^ux-/.test(methodName) ? methodName.replace(/^ux-/, '') : methodName;
          return path.join('@suning/uxcool', 'src/components', name);
        },
        style: true,
      },
    ],
  ],
};

// const postCssCfg = postCssUtils.getPostCssCfg();
const postCssCtx = postCssUtils.getContext();
const vueStyleCfg = [
  'vue-style-loader',
  {
    loader: 'css-loader',
  },
  {
    loader: 'postcss-loader',
    options: postCssCtx,
  },
  'sass-loader',
];

function getConfig(env) {
  if (!env.server) {
    rimraf.sync(distPath);
  }
  return {
    entry: {
      vendor: ['vue', 'echarts'],
      single: path.resolve(srcPath, 'index.js'),
      global: path.resolve(srcPath, 'global.js'),
    },
    output: {
      filename: '[name].[hash].js',
      path: distPath,
    },
    resolve: {
      alias,
      extensions: ['.js', '.json', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.js(x)?$/,
          loader: 'babel-loader?cacheDirectory',
          exclude: /node_modules/,
          options: babelOpts,
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            preserveWhitespace: vueCompileOpts.preserveWhitespace !== false,
            postcss: postCssCtx,
            loaders: {
              css: vueStyleCfg,
              scss: vueStyleCfg,
              js: {
                loader: 'babel-loader',
                options: babelOpts,
              },
            },
          },
        },
        {
          test: /\.(s)?css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {},
              },
              {
                loader: 'postcss-loader',
                options: postCssCtx,
              },
              'sass-loader',
            ],
          }),
        },
        {
          test: /\.(woff2?|ttf|eot|svg)/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '/fonts/[name].[hash:7].[ext]',
          },
        },
      ],
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      }),
      new ExtractTextPlugin('example.css'),
      new HtmlWebpackPlugin({
        title: 'example',
        filename: 'index.html',
        chunks: ['vendor', 'single'],
        template: path.resolve(srcPath, 'index.html'),
      }),
      new HtmlWebpackPlugin({
        title: 'example',
        filename: 'global.html',
        chunks: ['vendor', 'global'],
        template: path.resolve(srcPath, 'global.html'),
      }),
    ],
  };
}

module.exports = (env = {}) => Promise.resolve(getConfig(env));
