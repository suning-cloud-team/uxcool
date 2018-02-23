const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { getRoot, getPackageJSON } = require('../utils');

const postCssCfg = require('../postCss').getContext();

const root = getRoot();
const {
  pkgName, version, uxcool = {}, vueCompileOpts = {}
} = getPackageJSON(path.resolve(root, 'package.json'));
const uxCoolSrcPath = uxcool.srcPath || '';
const distPath = path.resolve(root, uxCoolSrcPath, 'dist');

function getConfig(env = {}) {
  return {
    output: {
      filename: '[name].js',
      path: distPath,
      library: pkgName,
      libraryTarget: 'umd',
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
            preserveWhitespace: vueCompileOpts.preserveWhitespace !== false,
          },
          exclude: /node_modules/,
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
                options: postCssCfg,
              },
              'sass-loader',
            ],
          }),
        },
        {
          test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/fonts/[name].[ext]',
          },
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      new webpack.BannerPlugin(`${env.name ? env.name : pkgName}\nv${version}`),
    ],
    externals: {
      vue: {
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
        root: 'Vue',
      },
    },
    node: {
      Buffer: false,
    },
  };
}

module.exports = env => Promise.resolve(getConfig(env));
