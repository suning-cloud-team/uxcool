const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendErrorsPlugin = require('@soda/friendly-errors-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const sass = require('sass');

const {
  getRoot, getUxCoolPath, hasMultipleCores, getPkg
} = require('../utils');

function createCSSLoaders(extra = false, isModule = false, isPrd = false) {
  const loaders = [];

  loaders.push(
    extra
      ? {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: !isPrd,
        },
      }
      : {
        loader: 'vue-style-loader',
      }
  );

  const cssLoaderOpts = {
    // stylePostLoader injected by vue-loader + posscss-loader,
    // ignore sass-loader
    // https://github.com/webpack-contrib/css-loader/issues/228#issuecomment-312885975
    importLoaders: 2,
  };

  if (isModule) {
    cssLoaderOpts.modules = {
      localIdentName: '[name]_[local]_[hash:base64:5]',
    };
  }
  loaders.push({
    loader: 'css-loader',
    options: cssLoaderOpts,
  });

  loaders.push({
    loader: 'postcss-loader',
  });

  loaders.push({
    loader: 'sass-loader',
    options: {
      implementation: sass,
      // sass-loader < 8
      // sassOptions: {
      //   fiber: require('fibers'),
      // }
    },
  });

  return loaders;
}
const context = getRoot();
const uxcoolPath = getUxCoolPath();
const pkg = getPkg(context);
const uxcoolPkg = getPkg(uxcoolPath);

function getConfig() {
  const isPrd = process.env.NODE_ENV === 'production';
  const resolveModules = [
    'node_modules',
    path.resolve(context, 'node_modules'),
    path.resolve(uxcoolPath, 'node_modules'),
  ];
  const isMultipleCores = !!hasMultipleCores();
  const useThreads = isPrd && isMultipleCores;

  const outputDir = path.resolve(uxcoolPath, 'dist');
  // const shouldExtra = !!isPrd;
  const shouldExtra = true;
  const config = {
    mode: 'development',
    output: {
      path: outputDir,
      filename: '[name].js',
      library: pkg.pkgName,
      libraryTarget: 'umd',
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      modules: resolveModules,
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js',
      },
    },
    resolveLoader: {
      modules: resolveModules,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: useThreads
            ? [
              'thread-loader',
              {
                loader: 'babel-loader',
                options: {
                  rootMode: 'upward',
                },
              },
            ]
            : [
              {
                loader: 'babel-loader',
                options: {
                  rootMode: 'upward',
                },
              },
            ],
          exclude(filePath) {
            return /node_modules/.test(filePath);
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              whitespace: 'condense',
            },
          },
        },
        {
          test: /\.s?css$/,
          oneOf: [
            {
              use: createCSSLoaders(shouldExtra, false, isPrd),
            },
            {
              test: /\.module\.\w+$/,
              use: createCSSLoaders(shouldExtra, true, isPrd),
            },
          ],
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
      new VueLoaderPlugin(),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new CaseSensitivePathsPlugin(),
      new FriendErrorsPlugin(),
      new webpack.BannerPlugin({
        banner: `[name]\n\nv${uxcoolPkg.version}`,
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: isMultipleCores,
          cache: true,
          extractComments: false,
          terserOptions: {
            compress: {
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true,
            },
            mangle: {
              safari10: true,
            },
          },
        }),
      ],
    },
    node: {
      setImmediate: false,
      Buffer: false,
    },
    externals: {
      vue: {
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
        root: 'Vue',
      },
      // 'date-fns': {
      //   commonjs: 'date-fns',
      //   commonjs2: 'date-fns',
      //   amd: 'date-fns',
      //   root: 'dateFns',
      // },
    },
    stats: {
      errors: false,
      children: false,
      entrypoints: true,
    },
  };

  if (shouldExtra) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      })
    );
  }

  if (isPrd) {
    config.plugins.push(
      new OptimizeCssnanoPlugin({
        cssnanoOptions: {
          preset: ['default', {}],
        },
      })
    );
  }

  return config;
}

module.exports = getConfig;
