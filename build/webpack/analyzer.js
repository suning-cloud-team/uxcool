const path = require('path');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const getConfig = require('./prd');

const { getRoot } = require('../utils');

const root = getRoot();
const srcPath = path.resolve(root, 'src');

function extraAnalyzer(env) {
  return getConfig(env).then((cfg) => merge.strategy({
    entry: 'replace',
  })(cfg, {
    entry: {
      uxCool: path.resolve(srcPath, 'extra.js'),
    },
    plugins: [new BundleAnalyzerPlugin()],
    externals: {
      jsplumb: {
        commonjs: 'jsplumb',
        commonjs2: 'jsplumb',
        amd: 'jsplumb',
        root: 'jsplumb',
      },
      jquery: {
        commonjs: 'jQuery',
        commonjs2: 'jQuery',
        amd: 'jQuery',
        root: '$',
      },
      echarts: {
        commonjs: 'echarts',
        commonjs2: 'echarts',
        amd: 'echarts',
        root: 'echarts',
      },
      dagre: {
        commonjs: 'dagre',
        commonjs2: 'dagre',
        amd: 'dagre',
        root: 'dagre',
      },
    },
  }));
}

function prdAnalyzer(env) {
  return merge(getConfig(env), {
    plugins: [new BundleAnalyzerPlugin()],
  });
}
module.exports = (env) => prdAnalyzer(env);
