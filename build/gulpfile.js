const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const chalk = require('chalk');
const debug = require('debug');
const gulp = require('gulp');
const through2 = require('through2');
const gulpFile = require('gulp-file');
const rimraf = require('rimraf');
const sass = require('node-sass');
const postcss = require('postcss');
const babel = require('babel-core');
const { createDefaultCompiler, assemble } = require('@vue/component-compiler');
const stripJSONComments = require('strip-json-comments');
const { getPostCssCfg } = require('./postCss');

const { getRoot, getPackageJSON, normalizeExtraSassContentImportPath } = require('./utils');

// debug.enable('*');
const log = debug('tools:gulpfile');

const root = getRoot();

const nodeModuleRoot = path.resolve(root, 'node_modules');
const pkgJSON = getPackageJSON(path.resolve(root, 'package.json'));
const { pkgName, uxcool = {}, vueCompileOpts = {} } = pkgJSON;
const babelrc = fs.readFileSync(path.resolve(root, '.babelrc'), {
  encoding: 'utf8',
});
const uxcoolSrcPath = uxcool.srcPath;
const componentsPath = path.resolve(root, uxcoolSrcPath, 'src/components');
const extraComponentsPath = path.resolve(root, uxcoolSrcPath, 'src/extra');
const distDir = path.resolve(root, uxcoolSrcPath, 'dist');
const esDir = path.resolve(root, uxcoolSrcPath, 'es');
const libDir = path.resolve(root, uxcoolSrcPath, 'cjs');
const postcssCfg = getPostCssCfg();

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
        postcss(postcssCfg.plugins())
          .process(result.css, postcss)
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
  const opts = Object.assign({}, JSON.parse(stripJSONComments(babelrc)));

  // 当不编译为 es module 时 默认输出 commonjs
  if (!esModule) {
    opts.presets[0][1].modules = 'commonjs';
    opts.plugins = (opts.plugins || []).concat(['add-module-exports']);
  }

  return new Promise((resolve, reject) => {
    try {
      const ret = babel.transform(file, opts);
      resolve(ret.code);
    } catch (e) {
      reject(e);
    }
  });
}

function vueTransform(options) {
  const compiler = createDefaultCompiler(options);
  return {
    transform(source, fileName) {
      const descriptor = compiler.compileToDescriptor(fileName, source);
      return Promise.resolve(assemble(compiler, fileName, descriptor, { styleInjector: 'function(){}' }));
    },
  };
}

function transformVue(content, filePath, esModule) {
  const transformOpts = {
    template: {
      compilerOptions: {
        preserveWhitespace: vueCompileOpts.preserveWhitespace !== false,
        warn(msg) {
          console.warn(chalk.yellow(`Error compiling template:\n${msg}\n${filePath}\n`)); // eslint-disable-line
        },
      },
      isProduction: true,
    },
  };
  return vueTransform(transformOpts)
    .transform(content, filePath)
    .then(({ code }) => transformJS(code, esModule));
}

function compile(basePath, esModule = false, extraPath) {
  let tgt = esModule ? esDir : libDir;
  tgt = extraPath ? path.resolve(tgt, extraPath) : tgt;
  rimraf.sync(tgt);

  // style scss
  gulp
    .src(path.resolve(basePath, '**/*.scss'), { base: basePath })
    .pipe(through2.obj(function p(chunk, enc, next) {
      const file = chunk;
      const originFile = file.clone();
      log(`${getCompileTaskName(esModule)} task: ${file.path} compile`);
      if (extraPath) {
        originFile.contents = normalizeExtraSassContentImportPath(originFile.contents, enc);
      }
      this.push(originFile);
      if (/[/\\]style[/\\]index.scss/.test(file.path)) {
        log(`${getCompileTaskName(esModule)} style task: ${file.path} compile`);
        transformSCSS(file.path)
          .then((css) => {
            file.contents = Buffer.from(css, enc);
            file.path = file.path.replace(/\.scss$/, '.css');
            this.push(file);
            next();
          })
          .catch(e => next(`SCSS transfrom error: ${e.message}`));
      } else {
        next();
      }
    }))
    .pipe(gulp.dest(tgt));

  // transform vue
  gulp
    .src(path.resolve(basePath, '**/*.vue'), { base: basePath })
    .pipe(through2.obj(function p(chunk, enc, next) {
      const file = chunk;
      log(`${getCompileTaskName(esModule)} task: ${file.path} compile`);
      const content = file.contents.toString(enc);
      transformVue(content, file.path, esModule).then((code) => {
        file.contents = Buffer.from(code.replace(/\.(vue|jsx)/g, '.js'), enc);
        file.path = file.path.replace(/\.vue$/, '.js');
        this.push(file);
        next();
      });
    }))
    .pipe(gulp.dest(tgt));

  // js
  gulp
    .src(path.resolve(basePath, '**/*.js?(x)'), { base: basePath })
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
          // style 目录下的js
          if (/[/\\]style[/\\]index.js/.test(file.path)) {
            log(`${getCompileTaskName(esModule)} style/js task: ${file.path} compile`);
            if (content.indexOf('.scss') !== -1) {
              file.contents = Buffer.from(code.replace(/\.scss/g, '.css'), enc);
              file.path = file.path.replace(/index\.js/, 'css.js');
              this.push(file);
            }
          }
          next();
        })
        .catch((e) => {
          console.log('JS transform error: ', e);
        });
    }))
    .pipe(gulp.dest(tgt));

  // fonts
  gulp
    .src(path.resolve(root, uxcoolSrcPath, 'src/**/fonts/*.@(eot|svg|ttf|woff)'), {
      base: basePath,
    })
    .pipe(gulp.dest(tgt));
}

function dist(configPath) {
  rimraf.sync(distDir);
  const webpackCfgPath = path.resolve(root, configPath);
  let webpackConfig = require(webpackCfgPath); // eslint-disable-line
  if (!webpackConfig) {
    log('webpackconfig is null, use {}');
    webpackConfig = {};
  }
  if (typeof webpackConfig === 'function') {
    webpackConfig = webpackConfig();
  }
  Promise.all(webpackConfig.map(fn => fn())).then((cfgs) => {
    log('webpackConfig %o', cfgs);
    webpack(cfgs, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(err || stats.hasErrors());
        return;
      }
      console.log('webpack done!');
    });
  });
}

function getStyleFileName(basePath) {
  return path.basename(basePath);
}

function buildStyle(basePath) {
  const fileNames = glob.sync('[^_]*/style/index.scss', { cwd: basePath });
  let extraPath = '';
  let distStyleName = `${pkgName}.scss`;
  const styleName = getStyleFileName(basePath);

  if (styleName !== 'components') {
    extraPath = styleName;
    distStyleName = `${pkgName}-${styleName}.scss`;
  }
  const content = fileNames.reduce((r, f) => {
    let nr = r;
    nr += `@import './${extraPath}${extraPath ? '/' : ''}${f}';\n`;
    return nr;
  }, '');

  gulpFile(`${styleName}.scss`, content, { src: true }).pipe(gulp.dest(esDir));

  const pkgContent = `@import '../es/style/index.scss';\n@import '../es/${styleName}.scss'`;
  gulpFile(distStyleName, pkgContent).pipe(gulp.dest(distDir));
}

gulp.task('dist', () => {
  dist('build/webpack/all.js');
});

gulp.task('compile', ['compile-to-es'], () => {
  compile(componentsPath);
  compile(extraComponentsPath, false, 'extra');
});

gulp.task('compile-to-es', () => {
  compile(componentsPath, true);
  compile(extraComponentsPath, true, 'extra');
});

gulp.task('style', () => {
  buildStyle(componentsPath);

  buildStyle(extraComponentsPath);
});

gulp.task('compile-js-style', ['compile', 'style']);

gulp.task('default', ['compile', 'dist', 'style']);
