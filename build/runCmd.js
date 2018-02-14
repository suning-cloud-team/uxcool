const childProcess = require('child_process');

module.exports = function runCmd(cmd, _args, fn) {
  const args = _args || [];
  const runner = childProcess.spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
    env: exports.getRunCmdEnv()
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
