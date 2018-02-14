import * as extra from './components';

export * from './components';

export function install(Vue) {
  Object.keys(extra).forEach((name) => {
    Vue.component(name, extra[name]);
  });
}

export default {
  version: '2.0.0',
  install,
  ...extra,
};
