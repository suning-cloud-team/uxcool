import debug from 'debug';
import path from 'path';
import { src, dest } from 'gulp';
import through2 from 'through2';
import transformVue from '../transforms/transformVue';

const log = debug('tools:compile:vue');

export default (basePath, dst, isModule = false) => function compileVue() {
  return src(path.join(basePath, '**/*.vue'), { base: basePath })
    .pipe(
      through2.obj((chunk, enc, cb) => {
        const file = chunk;
        log(`${file.path} compile start...`);
        const content = file.contents.toString(enc);
        transformVue(content, file.path, isModule)
          .then((code) => {
            file.contents = Buffer.from(code.replace(/\.(vue|jsx)/g, '.js'), enc);
            file.path = file.path.replace(/\.vue$/, '.js');
            cb(null, file);
          })
          .catch(cb)
          .finally(() => {
            log(`${file.path} compile end...`);
          });
      })
    )
    .pipe(dest(dst));
};
