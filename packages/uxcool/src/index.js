import { install } from './components/index';

export { default } from './components/index';

require.context('./components', true, /^\.\/[^_][\w-]+\/style\/index\.js$/);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}
