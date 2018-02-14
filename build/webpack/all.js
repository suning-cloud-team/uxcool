const path = require('path');
const merge = require('webpack-merge');

const prdCfgFn = require('./prd');
const devCfgFn = require('./dev');

const { getRoot, getPackageJSON } = require('../utils');

const root = getRoot();
const { pkgName } = getPackageJSON(path.resolve(root, 'package.json'));
const srcPath = path.resolve(root, 'src');

const asyncFns = [
  {
    type: 'prd',
    fn: prdCfgFn,
  },
  {
    type: 'dev',
    fn: devCfgFn,
  },
];

const extraCfgs = asyncFns.map(v => (env = {}) =>
  v.fn(Object.assign({}, { name: `${pkgName}Extra` }, env)).then(cfg =>
    merge.strategy({
      entry: 'replace',
    })(cfg, {
      entry: {
        [v.type === 'prd' ? `${pkgName}-extra.min` : `${pkgName}-extra`]: path.resolve(
          srcPath,
          'extra.js'
        ),
      },
      output: {
        library: `${pkgName}Extra`,
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
    })));
module.exports = [prdCfgFn, devCfgFn, ...extraCfgs];
