const execa = require('execa');

const NPM_REGISTRY = 'https://registry.npmjs.org/';
const SNPM_REGISTRY = 'http://snpm.cnsuning.com/';

function execSync(cmd, args = [], options) {
  execa.sync(cmd, args, { stdio: 'inherit', ...options });
}
module.exports = {
  SNPM_REGISTRY,
  NPM_REGISTRY,
  execSync,
};
