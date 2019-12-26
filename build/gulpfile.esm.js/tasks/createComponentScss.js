import path from 'path';
import fs from 'fs-extra';
import globby from 'globby';
import debug from 'debug';

const log = debug('tools:create:scss');

function defaultScssContentGenFn(f) {
  return `@import './${f}';\n`;
}
// eslint-disable-next-line max-len
export default (basePath, collectDst, dst, scssContentGenFn = defaultScssContentGenFn) => async function createComponentScss() {
  const files = await globby('[^_]*/style/index.scss', { cwd: basePath });
  log('files =>', files.join(','));
  const content = files.reduce((r, f) => {
    let nr = r;
    nr += scssContentGenFn(f);
    return nr;
  }, '');
  log('scss content =>', content);
  const scssFileName = path.basename(collectDst);

  const dstContent = [
    "@import '../es/style/index.scss';",
    `@import '../es/${scssFileName}';`,
  ].join('\n');
  await Promise.all([fs.outputFile(collectDst, content), fs.outputFile(dst, dstContent)]);
};
