import debug from 'debug';
import through2 from 'through2';
import { src, dest } from 'gulp';
import transformJS from '../transforms/transformJS';

const log = debug('tools:compile:js');
export default (basePath, dst, isModule = false, handle) => function compileJS() {
  return src(['**/*.js?(x)', '!**/__tests__/**'], {
    cwd: basePath,
  })
    .pipe(
      through2.obj(function t(chunk, enc, cb) {
        const file = chunk;
        const content = file.contents.toString(enc);

        log(`${file.path} compile start ...`);
        transformJS(content, isModule)
          .then((code) => {
            // style 目录下的js
            if (/[/\\]style[/\\]index\.js/.test(file.path)) {
              log(`style js ${file.path} compile`);
              const cssFile = file.clone();
              cssFile.contents = Buffer.from(code.replace(/\.scss/g, '.css'), enc);
              cssFile.path = file.path.replace(/index\.js/, 'css.js');
              if (typeof handle === 'function') {
                handle(cssFile);
              }
              this.push(cssFile);
            } else {
              file.contents = Buffer.from(code.replace(/\.(vue|jsx)/g, '.js'), enc);
              file.path = file.path.replace(/\.jsx$/, '.js');
            }
            if (typeof handle === 'function') {
              handle(file);
            }
            cb(null, file);
          })
          .catch(cb)
          .finally(() => {
            log(`${file.path} compile end ...`);
          });
      })
    )
    .pipe(dest(dst));
};
