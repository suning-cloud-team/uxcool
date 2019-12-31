/* eslint-disable */
const path = require('path');
const execa = require('execa');
const yargs = require('yargs');
const genChangelog = require('./changelog');
yargs.parserConfiguration({
  'boolean-negation': false,
});
const argv = yargs.boolean(['changelog-only', 'no-publish', 'no-build']).argv;

const { 'changelog-only': changelogOnly, 'no-publish': noPublish, 'no-build': noBuild } = argv;

console.log('var', changelogOnly, noPublish, noBuild);
function execSync(cmd, args = [], options) {
  execa.sync(cmd, args, { stdio: 'inherit', ...options });
}

function compile() {
  execSync('yarn', ['run', 'build']);
}

function version() {
  execSync('lerna', ['version', '--no-push']);
}

function push() {
  execSync('git', ['push', '--follow-tags', 'origin', 'HEAD']);
}
function pushChanglog(changlogVersion) {
  execSync('git', ['commit', '-a', '-m', `docs: generate ${changlogVersion} changlog`]);
}

function publish() {
  execSync('lerna', ['publish', 'from-git']);
}
function release() {
  if (!noBuild) {
    compile();
  }
  genChangelog('generate').then((changlogVersion) => {
    pushChanglog(changlogVersion);
    version();
    push();
    console.log('pre publish');
    if (!noPublish) {
      publish();
    }
  });
}

if (changelogOnly) {
  genChangelog('test').then((changlogVersion) => {
    console.log(`generate ${changlogVersion} changelog success!`);
  });
} else {
  release();
}
// release();
/* eslint-enable */
