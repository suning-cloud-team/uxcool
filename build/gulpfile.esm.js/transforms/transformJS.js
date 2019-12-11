import { transformAsync } from '@babel/core';

export default async (content, isModule = false) => {
  const options = {
    rootMode: 'upward',
    overrides: [
      {
        presets: [['@babel/preset-env', { modules: isModule ? false : 'commonjs' }]],
        plugins: ['add-module-exports'],
      },
    ],
  };
  const ret = await transformAsync(content, options);
  return ret.code;
};
