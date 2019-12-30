/* eslint-disable */
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
function pushChanglog() {
  execSync('git', ['commit', '-a', '-m', 'docs: generate changlog']);
  execSync('git', ['push', 'origin', 'HEAD']);
}

function publish() {
  execSync('lerna', ['publish', 'from-git']);
}
function release() {
  if (!noBuild) {
    compile();
  }
  version();
  push();
  genChangelog().then(() => {
    pushChanglog();
    console.log('pre publish');
    if (!noPublish) {
      publish();
    }
  });
}

if (changelogOnly) {
  genChangelog().then(() => {
    console.log('generate changelog success!');
  });
} else {
  release();
}
// release();
/* eslint-enable */
