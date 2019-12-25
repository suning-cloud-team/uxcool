import path from 'path';
import { series, parallel } from 'gulp';
import rimraf from 'rimraf';
import { getUxCoolPath, normalizeExtraSassContentImportPath } from '../utils';
import {
  compileJS,
  compileVue,
  compileSass,
  copyFont,
  buildDist,
  createComponentScss,
} from './tasks';

const uxcoolPath = getUxCoolPath();
const componentsDir = path.join(uxcoolPath, 'src/components');
const webpackDevCfg = require('../webpack/dev');
const webpackPrdCfg = require('../webpack/prd');

const distDir = path.join(uxcoolPath, 'dist');
const esDir = path.join(uxcoolPath, 'es');
const cjsDir = path.join(uxcoolPath, 'cjs');
const collectESPath = path.join(esDir, 'components.scss');
const collectDistPath = path.join(distDir, 'uxcool.scss');
// extra
const extraDir = path.join(uxcoolPath, 'src/extra');
const collectESExtraPath = path.join(esDir, 'extra.scss');
const collectDistExtraPath = path.join(distDir, 'uxcool-exta.scss');
const webpackDevExtraCfg = require('../webpack/dev-extra');
const webpackPrdExtraCfg = require('../webpack/prd-extra');

function cleanESAndCJS(cb) {
  rimraf.sync(esDir);
  rimraf.sync(cjsDir);
  cb();
}

function createCompileParallel(srcDir, dst, isModule = false, handle) {
  return parallel(
    compileJS(srcDir, dst, isModule, handle),
    compileVue(srcDir, dst, isModule),
    compileSass(srcDir, dst, handle),
    copyFont(srcDir, dst)
  );
}

const compileToES = createCompileParallel(componentsDir, esDir, true);
const compileToCJS = createCompileParallel(componentsDir, cjsDir, false);

// extra components
function normalizeStylePath(file) {
  const nFile = file;
  if (/[/\\]style[/\\][^.]+\.(scss|js)/.test(file.path)) {
    nFile.contents = normalizeExtraSassContentImportPath(file.contents);
  }
}
const compileExtraToES = createCompileParallel(
  extraDir,
  path.join(esDir, 'extra'),
  true,
  normalizeStylePath
);
const compileExtraToCJS = createCompileParallel(
  extraDir,
  path.join(cjsDir, 'extra'),
  false,
  normalizeStylePath
);
compileExtraToCJS.displayName = compileExtraToCJS;
function cleanDist(cb) {
  rimraf.sync(distDir);
  cb();
}

const dist = series(
  cleanDist,
  parallel(
    buildDist(webpackDevCfg()),
    buildDist(webpackPrdCfg()),
    buildDist(webpackDevExtraCfg()),
    buildDist(webpackPrdExtraCfg())
  )
);

const compileModule = series(
  cleanESAndCJS,
  parallel(compileToES, compileToCJS, compileExtraToES, compileExtraToCJS)
);

function cleanCollectStyle(cb) {
  rimraf.sync(collectESPath);
  rimraf.sync(collectDistPath);
  rimraf.sync(collectESExtraPath);
  rimraf.sync(collectDistExtraPath);
  cb();
}
const collectStyle = series(
  cleanCollectStyle,
  createComponentScss(componentsDir, collectESPath, collectDistPath),
  createComponentScss(
    extraDir,
    collectESExtraPath,
    collectDistExtraPath,
    (f) => `@import './extra/${f}';\n`
  )
);

export {
  cleanESAndCJS,
  compileToES,
  compileToCJS,
  cleanDist,
  dist,
  compileModule,
  cleanCollectStyle,
  collectStyle,
};
export default series(compileModule, dist, collectStyle);
// export default () => compileSass(componentsDir, esDir, true);
// export default parallel(compileToES, compileToCJS);
// export default series(cleanESAndCJS, parallel(compileToES));
