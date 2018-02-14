const path = require('path');

const pathAlais = process.platform === 'win32' ? 'Path' : 'PATH';

module.exports = function getRunCmdEnv() {
  const env = {};
  Object.keys(process.env).forEach((key) => {
    if (/^path$/i.test(key)) {
      env[pathAlais] = process.env[key];
    } else {
      env[key] = process.env[key];
    }
  });
  // make sure `antd-tools/node_modules/.bin` in the PATH env
  const nodeModulesBinDir = path.join(__dirname, '../node_modules/.bin');
  env[pathAlais] = env[pathAlais] ? `${nodeModulesBinDir}${path.delimiter}${env[pathAlais]}` : nodeModulesBinDir;
  return env;
};
