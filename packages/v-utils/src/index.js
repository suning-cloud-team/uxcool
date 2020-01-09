import warn from 'warning';

export * from './easing';

export * from './vnode';

export * from './utils';

export * from './dom';

export { default as browser } from './browser';

export { default as CollapseTransition } from './transition/collapseTransition';

export * from './ssr';

export * from './tree/index';

const warned = {};

export function warning(valid = true, message = '', ...args) {
  if (!valid && !warned[message]) {
    warn(false, message, ...args);
    warned[message] = true;
  }
}

export { default as emitter } from './mixins/emitter';
