const path = require('path');
const merge = require('webpack-merge');
const getConfig = require('./prd');

const { getUxCoolPath, getPkg, getRoot } = require('../utils');

const pkg = getPkg(getRoot());
const srcPath = path.join(getUxCoolPath(), 'src');

module.exports = (env = {}) => merge.strategy({
  entry: 'replace',
})(getConfig(env), {
  entry: {
    [`${pkg.pkgName}-extra.min`]: path.resolve(srcPath, 'extra.js'),
  },
  output: {
    library: `${pkg.pkgName}Extra`,
  },
  externals: {
    jsplumb: {
      commonjs: 'jsPlumb',
      commonjs2: 'jsPlumb',
      amd: 'jsPlumb',
      // jsPlumb 没有default 导出,全局使用时会出现问题
      root: 'self',
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
});
