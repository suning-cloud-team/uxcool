const path = require('path');
const fs = require('fs');
// const stripJSONComments = require('strip-json-comments');
const os = require('os');

const REG_SASS_COMPONENT_IMPORT = /^(\s*@import\s+['"](?:(?:\.+\/)+)?)(components\/)([^'"]+['"];)\s*$/gm;

// 根目录
function getRoot() {
  return path.resolve(__dirname, '..');
}
exports.getRoot = getRoot;

exports.getUxCoolPath = () => {
  const root = getRoot();
  return path.join(root, 'packages/uxcool');
};

function getFileContentByPath(filePath, transform = (content) => content) {
  return transform(fs.readFileSync(filePath));
}
// 根据路径获取文件内容
exports.getFileContentByPath = getFileContentByPath;

exports.getPackageJSON = (pkgJsonPath) => exports.getFileContentByPath(pkgJsonPath, (content) => {
  let ret = content;
  try {
    ret = JSON.parse(content);
  } catch (e) {
    e.message = `ERROR: getPackageName function ${e.message}`;
    throw e;
  }
  return ret;
});

exports.normalizeExtraSassContentImportPath = function normalizeExtraSassContentImportPath(
  sassContent,
  enc
) {
  const content = sassContent.toString(enc);
  return Buffer.from(
    content.replace(REG_SASS_COMPONENT_IMPORT, (a, b, c, d) => `${b}${d}`),
    enc
  );
};

// exports.getBabelrc = (babelrcPath) => getFileContentByPath(babelrcPath, (content) => {
//   let ret = stripJSONComments(content.toString('utf8'));
//   try {
//     ret = JSON.parse(ret);
//   } catch (e) {
//     e.message = `ERROR: getBabelrc function ${e.message}`;
//     throw e;
//   }
//   return ret;
// });

exports.hasMultipleCores = () => {
  try {
    return os.cpus().length > 1;
  } catch (e) {
    return false;
  }
};
