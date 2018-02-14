const path = require('path');
const { getRoot } = require('../utils');

const root = getRoot();

const srcPath = path.resolve(root, 'site/src');

module.exports = {
  vue$: 'vue/dist/vue.runtime.esm.js',
  '@': srcPath,
  '@suning/uxcool': path.resolve(root),
};
