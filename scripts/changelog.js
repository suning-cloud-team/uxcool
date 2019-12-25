const path = require('path');
const cc = require('conventional-changelog');
const fs = require('fs-extra');
const through2 = require('through2');
const pump = require('pump');
const concatStream = require('concat-stream');
const prettier = require('prettier');

const pkgPath = path.join(__dirname, '../packages/uxcool');

const file = path.join(__dirname, '../CHANGELOG.md');

function makeBumpOnlyFilter(content) {
  if (!content.split('\n').some((line) => line.startsWith('-'))) {
    const message = '**Note:** Version bump only for package @suning/uxcool';

    return [content, message].join('\n');
  }
  return content;
}

function getConventionalStream() {
  return cc(
    {
      preset: 'angular',
      pkg: {
        path: pkgPath,
        transform(pkg) {
          const nPkg = pkg;
          if (!nPkg || !nPkg.repository || !nPkg.repository.url) {
            nPkg.repository = {
              url: 'http://opensource.cnsuning.com/uxcool/lerna-uxcool.git',
            };
          }
          return nPkg;
        },
      },
      lernaPackage: '@suning/[^@]+',
    },
    { linkCompare: false },
    null,
    null
    // {
    //   transform(...args) {
    //     console.log('write %o', ...args);
    //   },
    // }
  );
}

function buildChangeLog() {
  return concatStream((chunk) => {
    const enc = 'utf8';
    const options = { parser: 'markdown' };
    // console.log('abc', chunk.toString('utf8'));
    const fileContent = fs.readFileSync(file);
    const formatFileContent = prettier.format(fileContent.toString(enc), options);
    const formatContent = prettier.format(makeBumpOnlyFilter(chunk.toString(enc)), options);

    // 简单的防止重复
    if (formatFileContent.indexOf(formatContent) === -1) {
      fs.writeFileSync(
        file,
        prettier.format(
          Buffer.concat([Buffer.from(formatContent), fileContent]).toString(enc),
          options
        )
      );
    }
    // ;
  });
}
module.exports = function changelog() {
  return new Promise((resolve, reject) => {
    pump(getConventionalStream(), buildChangeLog(), (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve('finish');
    });
  });
};
