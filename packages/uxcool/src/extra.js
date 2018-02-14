import { install } from './extra/index';

export { default } from './extra/index';

require.context('./extra', true, /^\.\/[^_][\w-]+\/style\/index\.js$/);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}
