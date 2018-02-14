const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postCssUtils = require('../postCss');
const { getRoot } = require('../utils');
const alias = require('./alias');

const root = getRoot();
const srcPath = path.resolve(root, 'site/src');
const distPath = path.resolve(root, 'site/dist');

const postCssCtx = postCssUtils.getContext();
const vueStyleCfg = [
  'vue-style-loader',
  {
    loader: 'css-loader',
    options: {
      a: 1,
    },
  },
  {
    loader: 'postcss-loader',
    options: postCssCtx,
  },
  'sass-loader',
];

function getConfig() {
  return {
    entry: {
      site: path.resolve(srcPath, 'site.js'),
      vendor: [
        'vue',
        'vuex',
        'vue-router',
        'jsplumb',
        'jquery',
        'echarts',
        'dagre',
        'highlightjs',
        'clipboard',
        'babel-polyfill',
      ],
    },
    output: {
      filename: '[name].[hash].js',
      path: distPath,
      chunkFilename: '[id].[hash].js',
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
          exclude: /node_modules/,
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
                options: {
                  minimize: process.env.NODE_ENV === 'production',
                },
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
            name: 'static/[name].[hash:7].[ext]',
          },
        },
        {
          test: /\.(png|jpeg)/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'static/[name].[ext]',
          },
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('site.css'),
      new HtmlWebpackPlugin({
        title: 'MyApp',
        filename: 'index.html',
        template: path.resolve(srcPath, 'index.html'),
        favicon: path.resolve(srcPath, './favicon.ico'),
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      }),
    ],
    // externals: {
    //   // jsplumb没有层级, 实例需直接挂载在window上
    //   jsplumb: 'self',
    //   jquery: 'jQuery',
    //   echarts: 'echarts',
    //   dagre: 'dagre',
    // },
  };
}

module.exports = () => Promise.resolve(getConfig());
