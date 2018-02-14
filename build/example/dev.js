const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rimraf = require('rimraf');

const postCssUtils = require('../postCss');
const { getRoot } = require('../utils');
const alias = require('./alias');

const root = getRoot();
const srcPath = path.resolve(root, 'examples');
const distPath = path.resolve(root, 'examples/dist');

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
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            postcss: postCssCtx,
            loaders: {
              css: vueStyleCfg,
              scss: vueStyleCfg,
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
