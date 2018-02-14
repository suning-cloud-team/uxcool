module.exports = function getNPM() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
};
