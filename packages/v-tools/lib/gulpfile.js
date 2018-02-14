const webpack = require('webpack');
const deepMerge = require('deepmerge');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const debug = require('debug');
const gulp = require('gulp');
const through2 = require('through2');
const rimraf = require('rimraf');
const sass = require('node-sass');
const postcss = require('postcss');
const babel = require('babel-core');
const vueTransform = require('rollup-plugin-vue');

const { getConfig } = require('./webpack/getWebpackConfig');
const getPostCssCfg = require('./getPostCssCfg');

const { getRoot, getBabelrc, getPackageJSON } = require('./utils');

const log = debug('tools:gulpfile');
// debug.enabled('tools:*');
const root = getRoot();
const nodeModuleRoot = path.resolve(root, 'node_modules');
log(`Root: ${root}, nodeModuleRoot: ${nodeModuleRoot}`);
const babelrc = getBabelrc(path.resolve(__dirname, '..', '.babelrc'));
const pkgJSON = getPackageJSON(path.resolve(root, 'package.json'));
const vueCompileOpts = pkgJSON.vueCompileOpts || {};

log(`DIRNAME: ${__dirname}`);
const srcStr = 'src';
const cssStr = 'css';
const srcDir = path.resolve(root, srcStr);
const cssDir = path.resolve(root, cssStr);

// dist
const assetsDir = path.resolve(root, 'assets');
const esDir = path.resolve(root, 'es');
const cjsDir = path.resolve(root, 'cjs');

const postcssCfg = getPostCssCfg();

function cleanJSCompile() {
  if (fs.existsSync(esDir)) {
    rimraf.sync(esDir);
  }

  if (fs.existsSync(cjsDir)) {
    rimraf.sync(cjsDir);
  }
}

function cleanCSSCompile() {
  if (fs.existsSync(assetsDir)) {
    rimraf.sync(path.resolve(assetsDir));
  }
}

function clean() {
  cleanCSSCompile();
  cleanJSCompile();
}

function getCompileTaskName(esModule) {
  return esModule ? 'compile-to-es' : 'compile';
}

const REG_MODULE_SCSS = /^~/;

function transformSCSS(file) {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        file,
        importer(url, prev, done) {
          log(`sass compile: use importer: ${url}, path: ${prev}`);
          if (REG_MODULE_SCSS.test(url)) {
            const modulePath = path.resolve(nodeModuleRoot, url.replace(REG_MODULE_SCSS, ''));
            log(`sass compile: replace url to module path: ${modulePath}`);
            done({
              file: modulePath,
            });
          } else {
            const absolutePath = path.resolve(path.dirname(prev), url);
            log(`sass compile: replace url to absolute path: ${absolutePath}`);
            done({
              file: absolutePath,
            });
          }
        },
      },
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        log('sass compile result: %o', result);
        postcss(postcssCfg.plugins)
          .process(result.css, { from: '' })
          .then((r) => {
            resolve(r.css);
          })
          .catch((e) => {
            reject(e);
          });
      }
    );
  });
}

function transformJS(file, esModule = false) {
  // const opts = Object.assign({}, JSON.parse(stripJSONComments(babelrc)));
  const opts = deepMerge({}, babelrc);
  // 当不编译为 es module 时 默认输出 commonjs
  if (!esModule) {
    opts.presets[0][1].modules = 'commonjs';
    opts.plugins = (opts.plugins || []).concat(['add-module-exports']);
  }

  log('transformJs opts: %o', opts);

  return new Promise((resolve, reject) => {
    try {
      const ret = babel.transform(file, opts);
      resolve(ret.code);
    } catch (e) {
      reject(e);
    }
  });
}

function transformVue(content, filePath, esModule) {
  const transformOpts = {
    compileOptions: {
      preserveWhitespace: vueCompileOpts.preserveWhitespace !== false,
      warn(msg) {
        console.warn(chalk.yellow(`Error compiling template:\n${msg}\n${filePath}\n`)); // eslint-disable-line
      },
    },
  };

  return vueTransform(transformOpts)
    .transform(content, filePath)
    .then(({ code }) => transformJS(code, esModule));
}

function compileVue(target, esModule) {
  // transform vue
  gulp
    .src(path.resolve(srcDir, '**/*.vue'))
    .pipe(through2.obj(function p(chunk, enc, next) {
      const file = chunk;
      log(`${getCompileTaskName(esModule)} task: ${file.path} compile`);
      const content = file.contents.toString(enc);
      transformVue(content, file.path, esModule)
        .then((code) => {
          file.contents = Buffer.from(code.replace(/\.(vue|jsx)/g, '.js'), enc);
          file.path = file.path.replace(/\.vue$/, '.js');
          this.push(file);
          next();
        })
        .catch((e) => {
          next(chalk.yellow(`Vue transform error: ${e.message}`));
        });
    }))
    .pipe(gulp.dest(target));
}

function compileJs(target, esModule) {
  // js
  gulp
    .src(path.resolve(srcDir, '**/*.js?(x)'))
    .pipe(through2.obj(function p(chunk, enc, next) {
      const file = chunk;
      log(`${getCompileTaskName(esModule)} task: ${file.path} compile`);
      const content = file.contents.toString(enc);
      transformJS(content, esModule)
        .then((code) => {
          const originFile = file.clone();
          originFile.contents = Buffer.from(code.replace(/\.(vue|jsx)/g, '.js'), enc);
          originFile.path = originFile.path.replace(/\.jsx$/, '.js');
          this.push(originFile);
          next();
        })
        .catch((e) => {
          next(chalk.yellow(`JS transform error: ${e.message}`));
        });
    }))
    .pipe(gulp.dest(target));
}

function copyFonts(target) {
  const globStr = '**/fonts/*.@(eot|svg|ttf|woff)';
  // fonts
  gulp.src([path.resolve(cssDir, globStr), path.resolve(srcDir, globStr)]).pipe(gulp.dest(target));
}

function compileScss(target) {
  const globStr = '**/*.scss';
  const REG_INDEX_SCSS = new RegExp(`[/\\\\](?:${cssStr}|${srcStr})[/\\\\]index.scss`);
  // style scss
  gulp
    .src([path.resolve(cssDir, globStr), path.resolve(srcDir, globStr)])
    .pipe(through2.obj(function p(chunk, enc, next) {
      const file = chunk;
      log(`CompileScss task: ${file.path} compile`);
      this.push(file.clone());

      if (REG_INDEX_SCSS.test(file.path)) {
        log(`CompileIndexScss ${REG_INDEX_SCSS} ${file.path}`);
        transformSCSS(file.path)
          .then((css) => {
            file.contents = Buffer.from(css, enc);
            file.path = file.path.replace(/\.scss$/, '.css');
            this.push(file);
            next();
          })
          .catch(e => next(chalk.yellow(`SCSS transfrom error: ${e.message}`)));
      } else {
        next();
      }
    }))
    .pipe(gulp.dest(target));
}

function compile(esModule = false) {
  const tgt = esModule ? esDir : cjsDir;

  compileVue(tgt, esModule);

  compileJs(tgt, esModule);
}

function genCSS() {
  copyFonts(assetsDir);
  compileScss(assetsDir);
}

function dist() {
  log('Progress:  build dist  begin');
  const webpackConfig = getConfig();
  webpack(webpackConfig, () => {
    console.log('webpack build end!!');
  });
}

gulp.task('clean', clean);

gulp.task('cleanCSSCompile', cleanCSSCompile);
gulp.task('cleanJSCompile', cleanJSCompile);

gulp.task('css', ['cleanCSSCompile'], () => {
  genCSS();
});

gulp.task('cjs', ['cleanJSCompile'], () => {
  compile();
});

gulp.task('es', ['cjs'], () => {
  compile(true);
});

gulp.task('compile', ['es', 'css']);

gulp.task('dist', dist);

gulp.task('default', ['compile']);
