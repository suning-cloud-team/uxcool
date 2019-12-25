import { createDefaultCompiler, assemble } from '@vue/component-compiler';
import debug from 'debug';

import transformJS from './transformJS';

const log = debug('tools:transform:vue');
function compileVue(options) {
  const compiler = createDefaultCompiler(options);
  return {
    transform(fileName, content) {
      log(`transform: ${fileName}`);
      const descriptor = compiler.compileToDescriptor(fileName, content);
      return assemble(compiler, fileName, descriptor, { styleInjector: 'function(){}' });
    },
  };
}

export default async (content, fileName, isModule = false) => {
  const options = {
    template: {
      compilerOptions: {
        whitespace: 'condense',
      },
      isProduction: true,
    },
  };
  const { code } = compileVue(options).transform(fileName, content);
  return transformJS(code, isModule);
};
