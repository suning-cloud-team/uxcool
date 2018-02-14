const { resolve } = require('path');
const rollup = require('rollup');
const rollupVue = require('rollup-plugin-vue');
const rollupBabel = require('rollup-plugin-babel');
const rollupCommon = require('rollup-plugin-commonjs');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupSass = require('rollup-plugin-sass');

const builds = [];
const config = {
  input: resolve(__dirname, '../src/index.js'),
  output: {
    file: resolve(__dirname, '../dist/lib/uxcool.js'),
    format: 'es',
    name: 'uxcool',
  },
  plugins: [rollupVue(), rollupBabel(), rollupNodeResolve(), rollupCommon()],
  external(id) {
    // console.log('id===>', id);
    return (
      id in
      {
        'omit.js': 1,
        // './components/test/index': 1
      }
    );
  },
};

const styleConfig = {
  // input: resolve(__dirname, '../src/css.js'),
  input: resolve(__dirname, '../src/components/test/style/index.js'),
  // output: {
  //   file: resolve(__dirname, '../dist/lib/uxcool.css')
  // },
  plugins: [
    rollupSass({
      // output: resolve(__dirname, '../dist/lib/uxcool.css')
      output: resolve(__dirname, '../dist/lib/test/style/index.css'),
    }),
  ],
};
builds.push(config);

rollup
  .rollup(config)
  .then((bundle) => {
    bundle.write(config.output);
  })
  .catch(console.error);
