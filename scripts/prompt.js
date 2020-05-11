const inquirer = require('inquirer');
const { NPM_REGISTRY, SNPM_REGISTRY } = require('./utils');
const { checkSnpmLogin, checkNpmLogin } = require('./login');

const prompt = inquirer.createPromptModule();

function getQuestions() {
  return [
    {
      type: 'list',
      name: 'registryType',
      message: '请选择发布Registry',
      choices: ['snpm', 'npm', 'all'],
      default: 'all',
    },
    {
      type: 'list',
      name: 'publishTarget',
      message: '请选择发布类型',
      choices: ['release', 'only-publish-to-npm', 'only-publish-to-snpm'],
      default: 'release',
    },
  ];
}

function getLoginTip(types = ['snpm', 'npm']) {
  const ts = Array.isArray(types) ? types : [types];
  const tips = [`${'%%'.repeat(20)}\n`];

  if (ts.includes('snpm')) {
    tips.push(`SNPM 尚未登录,请使用 \`npm login --registry ${SNPM_REGISTRY}\` 命令登录 \`SNPM\``);
  }

  if (ts.includes('npm')) {
    tips.push(`NPM 尚未登录,请使用 \`npm login --registry ${NPM_REGISTRY}\` 命令登录 \`NPM\``);
  }
  tips.push(`\n${'%%'.repeat(20)}`);
  return tips.join('\n');
}

async function getLoginPrompt({ registryType, publishTarget }) {
  let isNpmLogin = true;
  let isSnpmLogin = true;
  if (registryType === 'all') {
    [isSnpmLogin, isNpmLogin] = await Promise.all([checkSnpmLogin(), checkNpmLogin()]);
  } else if (registryType === 'npm') {
    isNpmLogin = await checkNpmLogin();
  } else if (registryType === 'snpm') {
    isSnpmLogin = await checkSnpmLogin();
  }

  if (!isNpmLogin || !isSnpmLogin) {
    let tip = '';
    if (!isSnpmLogin && !isNpmLogin) {
      tip = getLoginTip(['snpm', 'npm']);
    } else if (!isSnpmLogin) {
      tip = getLoginTip('snpm');
    } else if (!isNpmLogin) {
      tip = getLoginTip('npm');
    }
    // 输出提示,不可删
    console.log(tip);
    return Promise.reject(new Error('No Login'));
  }
  return {
    registryType,
    publishTarget,
  };
}

// eslint-disable-next-line max-len
module.exports = () => prompt(getQuestions()).then(({ registryType, publishTarget }) => getLoginPrompt({
  registryType,
  publishTarget,
}));
