const childProcess = require('child_process');
const getRunCmdEnv = require('./getRunCmdEnv');

module.exports = function runCmd(cmd, _args, fn) {
  const args = _args || [];
  const runner = childProcess.spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
    env: getRunCmdEnv()
  });

  return new Promise((resolve) => {
    runner.on('close', (code) => {
      if (fn) {
        fn(code);
      }
      resolve();
    });
  });
};
