const fs = require('fs');
const stripJSONComments = require('strip-json-comments');

// 根目录
exports.getRoot = () => process.cwd();

// 根据路径获取文件内容
function getFileContentByPath(filePath, transform = content => content) {
  return transform(fs.readFileSync(filePath));
}
exports.getFileContentByPath = getFileContentByPath;

function getPackageJSON(pkgJsonPath) {
  return getFileContentByPath(pkgJsonPath, (content) => {
    let ret = content;
    try {
      ret = JSON.parse(content);
    } catch (e) {
      e.message = `ERROR: getPackageName function ${e.message}`;
      throw e;
    }
    return ret;
  });
}

exports.getPackageJSON = getPackageJSON;

exports.getPackageName = pkgJsonPath => getPackageJSON(pkgJsonPath).name;

exports.getBabelrc = babelrcPath =>
  getFileContentByPath(babelrcPath, (content) => {
    let ret = stripJSONComments(content.toString('utf8'));
    try {
      ret = JSON.parse(ret);
    } catch (e) {
      e.message = `ERROR: getBabelrc function ${e.message}`;
      throw e;
    }
    return ret;
  });
