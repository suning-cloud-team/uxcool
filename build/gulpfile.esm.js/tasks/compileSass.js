import debug from 'debug';
import path from 'path';
import through2 from 'through2';
import { src, dest } from 'gulp';
import transformSass from '../transforms/transformSass';

const log = debug('tools:compile:sass');
export default (basePath, dst) => () => src(path.join(basePath, '**/*.scss'), { base: basePath })
  .pipe(
    through2.obj(function t(chunk, enc, cb) {
      const file = chunk;
      this.push(file.clone());
      log(`${file.path} compile start...`);
      // const content = file.contents.toString(enc);
      if (/[/\\]style[/\\]index.scss/.test(file.path)) {
        transformSass(file.path)
          .then((css) => {
            file.contents = Buffer.from(css, enc);
            file.path = file.path.replace(/\.scss$/, '.css');
            cb(null, file);
          })
          .catch(cb)
          .finally(() => {
            log(`${file.path} compile end...`);
          });
      } else {
        cb();
      }
    })
  )
  .pipe(dest(dst));
