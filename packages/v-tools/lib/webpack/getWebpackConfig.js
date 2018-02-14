const fs = require('fs');
const path = require('path');
const glob = require('glob');
const VueLoaderOptionsPlugin = require('vue-loader-options-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postCssCfg = require('../getPostCssCfg')();
const { getRoot, getPackageName, getBabelrc } = require('../utils');

const root = getRoot();
const exampleDir = 'examples';

const pkgName = getPackageName(path.resolve(root, 'package.json'));
const babelOptions = getBabelrc(path.resolve(__dirname, '../..', '.babelrc'));

function getEntyAndTemplates(globStr) {
  const files = glob.sync(globStr);
  return files.reduce(
    (r, f) => {
      const nr = r;
      const extName = path.extname(f);
      const dirname = path.dirname(f);
      if (extName === '.js') {
        const basename = path.basename(f, '.js');
        const html = path.resolve(dirname, `${basename}.html`);
        if (fs.existsSync(html)) {
          const entryName = `${exampleDir}/${basename}`;
          nr.entry[entryName] = f;
          nr.tpls.push({
            name: `${entryName}.html`,
            entryName,
            template: html,
          });
        }
      }
      return nr;
    },
    {
      entry: {},
      tpls: [],
    }
  );
}

function getResolve() {
  const resolve = {};
  const alias = {};

  let pkgMain = path.resolve(root, 'index.js');
  if (!fs.existsSync(pkgMain)) {
    pkgMain = path.resolve(root, 'src/index.js');
    if (!fs.existsSync(pkgMain)) {
      throw new Error('Webpack resolve error: need index.js or src/index.js exists! ');
    }
  }

  alias[`${pkgName}$`] = pkgMain;
  alias[`${pkgName}`] = root;
  resolve.alias = alias;
  resolve.extensions = ['.js', '.json', '.jsx'];
  return resolve;
}

exports.getConfig = function getConfig() {
  const { entry, tpls } = getEntyAndTemplates(path.resolve(root, exampleDir, '*.js'));
  const webpackResolve = getResolve();
  webpackResolve.alias.vue$ = 'vue/dist/vue.esm.js';
  return {
    entry,
    output: {
      filename: '[name].js',
      path: path.resolve(root, 'dist'),
    },
    resolve: webpackResolve,
    module: {
      rules: [
        {
          test: /\.js(x)?$/,
          loader: 'babel-loader?cacheDirectory',
          options: babelOptions,
          exclude: /node_modules/,
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            js: 'babel-loader',
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
                options: {},
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
      new VueLoaderOptionsPlugin({
        babel: babelOptions,
      }),
      new ExtractTextPlugin('[name].css'),
      ...tpls.map(tpl =>
        new HtmlWebpackPlugin({
          filename: tpl.name,
          template: tpl.template,
          chunks: [tpl.entryName],
        })),
    ],
  };
};
