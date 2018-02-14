import * as components from './components';

export * from './components';

export function install(Vue) {
  Object.keys(components).forEach((name) => {
    Vue.component(name, components[name]);
  });
}

export default {
  version: '2.0.0',
  install,
  ...components,
};
