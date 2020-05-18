const path = require('path');
const cc = require('conventional-changelog');
const fs = require('fs-extra');
const pump = require('pump');
const concatStream = require('concat-stream');
const prettier = require('prettier');
const inquirer = require('inquirer');
const semver = require('semver');
const readPkg = require('read-pkg');

const prompt = inquirer.createPromptModule();

const pkgPath = path.join(__dirname, '../packages/uxcool');

const file = path.join(__dirname, '../CHANGELOG.md');

function getUXCoolVersion() {
  const { version } = readPkg.sync({ cwd: path.join(__dirname, '../packages/uxcool') });
  return version;
}

function makeBumpOnlyFilter(content) {
  if (!content.split('\n').some((line) => /^[-*]\s/.test(line))) {
    const message = '**Note:** Version bump only for package @cloud-sn/uxcool';

    return [content, message].join('\n');
  }
  return content;
}

function getConventionalStream(from, version) {
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
              // url: 'https://github.com/cloud-SN1/uxcool.git',
            };
          }
          return nPkg;
        },
      },
      lernaPackage: '@cloud-sn/uxcool',
    },
    { linkCompare: false, version },
    {
      from,
    },
    null
    // {
    //   transform(...args) {
    //     console.log('write %o', ...args);
    //   },
    // }
  );
}

function buildChangeLog(type) {
  return concatStream((chunk) => {
    const enc = 'utf8';
    const options = { parser: 'markdown' };
    // console.log('abc', chunk.toString('utf8'));
    const fileContent = fs.readFileSync(file);
    const formatFileContent = prettier.format(fileContent.toString(enc), options);
    const formatContent = prettier.format(makeBumpOnlyFilter(chunk.toString(enc)), options);

    // 简单的防止重复
    if (formatFileContent.indexOf(formatContent) === -1) {
      const output = prettier.format(
        Buffer.concat([Buffer.from(formatContent), fileContent]).toString(enc),
        options
      );
      if (type === 'test') {
        process.stdout.write(output);
      } else {
        fs.writeFileSync(file, output);
      }
    }
    // ;
  });
}
function getQuestions(type, oldVer, newVer) {
  return [
    {
      type: 'input',
      name: 'changlogCommitFrom',
      message: '输入Changlog起始点(Commit Hash 或 Tag Version)',
      default: oldVer,
      validate(value) {
        if (!value) {
          return '请输入 Commit Hash 或 Tag Version';
        }
        return true;
      },
      filter(value) {
        if (/^@/.test(value)) {
          return value;
        }
        if (semver.valid(value)) {
          return `@cloud-sn/uxcool@${value}`;
        }
        return value;
      },
    },
    {
      type: 'input',
      name: 'changlogVersion',
      message: '请输入 Changlog 版本',
      default: newVer,
      validate(value) {
        if (type === 'generate') {
          if (!semver.valid(value)) {
            return '请输入正确的版本';
          }
        }
        return true;
      },
    },
  ];
}

module.exports = function changelog(type = 'generate') {
  const oldVer = getUXCoolVersion();
  const newVer = semver.inc(oldVer, 'prerelease');
  return new Promise((resolve, reject) => {
    prompt(getQuestions(type, oldVer, newVer)).then((answers) => {
      const { changlogCommitFrom, changlogVersion } = answers;
      pump(
        getConventionalStream(changlogCommitFrom, changlogVersion),
        buildChangeLog(type),
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(changlogVersion);
        }
      );
    });
  });
};
