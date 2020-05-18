const yargs = require('yargs');
const genChangelog = require('./changelog');
const { execSync, NPM_REGISTRY, SNPM_REGISTRY } = require('./utils');
const prompt = require('./prompt');

yargs.parserConfiguration({
  'boolean-negation': false,
});
const { argv } = yargs.boolean(['changelog-only', 'no-publish', 'no-build']);

const { 'changelog-only': changelogOnly, 'no-publish': noPublish, 'no-build': noBuild } = argv;

/* eslint-disable no-console */
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

function publishToSNpm() {
  console.log('-----------------publish to SNPM--------------------');
  execSync('lerna', ['publish', 'from-git', '--registry', SNPM_REGISTRY]);
}

function publishToNpm() {
  console.log('-----------------publish to NPM--------------------');
  process.env['npm_config_@cloud-sn:registry'] = NPM_REGISTRY;
  execSync('lerna', ['publish', 'from-package', '--registry', NPM_REGISTRY]);
}

function release(type) {
  if (!noBuild) {
    compile();
  }
  return genChangelog('generate').then((changlogVersion) => {
    pushChanglog(changlogVersion);
    version();
    push();
    console.log('pre publish');
    if (!noPublish) {
      const publishFns = [];
      if (type === 'all') {
        publishFns.push(publishToSNpm, publishToNpm);
      } else if (type === 'snpm') {
        publishFns.push(publishToSNpm);
      } else if (type === 'npm') {
        publishFns.push(publishToNpm);
      }
      publishFns.forEach((fn) => fn());
    }
  });
}

if (changelogOnly) {
  genChangelog('test').then((changlogVersion) => {
    console.log(`generate ${changlogVersion} changelog success!`);
  });
} else {
  prompt()
    .then(({ publishTarget, registryType }) => {
      switch (publishTarget) {
        case 'release':
          release(registryType);
          break;
        case 'only-publish-to-npm':
          publishToNpm();
          break;
        case 'only-publish-to-snpm':
          publishToSNpm();
          break;
        default:
          break;
      }
    })
    .catch((e) => {
      console.error('Publish Error: %s', e.message);
    });
}
/* eslint-enable no-console */
