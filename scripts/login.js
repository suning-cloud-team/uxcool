const { execSync, NPM_REGISTRY, SNPM_REGISTRY } = require('./utils');

function checkLogin(registry = NPM_REGISTRY) {
  let isLogin = false;

  try {
    execSync('npm', ['whoami', '--registry', registry]);
    isLogin = true;
  } catch (e) {
    console.error('check login error: %s \n', e.message);
    isLogin = false;
  }

  return isLogin;
}

function checkSnpmLogin() {
  return checkLogin(SNPM_REGISTRY);
}
exports.checkSnpmLogin = checkSnpmLogin;

function checkNpmLogin() {
  return checkLogin(NPM_REGISTRY);
}

exports.checkNpmLogin = checkNpmLogin;
