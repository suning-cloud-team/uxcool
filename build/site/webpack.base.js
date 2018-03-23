const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postCssUtils = require('../postCss');
const { getRoot, getPackageJSON } = require('../utils');
const alias = require('./alias');

const root = getRoot();
const { vueCompileOpts = {} } = getPackageJSON(path.resolve(root, 'package.json'));
const srcPath = path.resolve(root, 'site/src');
const distPath = path.resolve(root, 'site/dist');
const codePath = path.resolve(srcPath, 'code');

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

const sassCfg = [
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
      extensions: ['.js', '.json', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.js(x)?$/,
          loader: 'babel-loader?cacheDirectory',
          exclude: /node_modules/,
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: [/node_modules/, codePath],
          options: {
            postcss: postCssCtx,
            preserveWhitespace: vueCompileOpts.preserveWhitespace !== false,
            loaders: {
              css: vueStyleCfg,
              scss: vueStyleCfg,
            },
          },
        },
        {
          test: /\.(s)?css$/,
          use:
            process.env.NODE_ENV === 'production'
              ? ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: sassCfg,
              })
              : ['style-loader', ...sassCfg],
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
        {
          test: /\.vue/,
          include: [codePath],
          loader: 'raw-loader',
        },
      ],
    },
    plugins: [
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

module.exports = () =>
  Promise.resolve(merge(getConfig(), {
    plugins: process.env.NODE_ENV === 'production' ? [new ExtractTextPlugin('site.css')] : [],
  }));
