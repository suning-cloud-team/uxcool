import debug from 'debug';
import chalk from 'chalk';
import path from 'path';
import sass from 'sass';
import Fiber from 'fibers';
import postcss from 'postcss';
import postcssrc from 'postcss-load-config';
import { getRoot } from '../../utils';

const log = debug('tools:transform:sass');
const REG_MODULE_SCSS = /^~/;
const root = getRoot();
const nodeModuleRoot = path.join(root, 'node_modules');
export default (filePath) => new Promise((resolve, reject) => {
  sass.render(
    {
      file: filePath,
      // data: content,
      importer: (url, prev, done) => {
        log(`sass compile: use importer: ${url}, path: ${prev}`);
        if (REG_MODULE_SCSS.test(url)) {
          const modulePath = path.join(nodeModuleRoot, url.replace(REG_MODULE_SCSS, ''));
          log(chalk.blue(`sass compile: replace url to module path: ${modulePath}`));
          done({
            file: modulePath,
          });
        } else {
          const absolutePath = path.join(path.dirname(prev), url);
          log(`sass compile: replace url to absolute path: ${absolutePath}`);
          done({
            file: absolutePath,
          });
        }
      },
      fiber: Fiber,
    },
    (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      postcssrc().then(
        ({ plugins, options }) => postcss(plugins)
          .process(result.css, { from: filePath, to: filePath, ...options })
          .then(({ css }) => {
            resolve(css);
          }, reject),
        reject
      );
    }
  );
});
