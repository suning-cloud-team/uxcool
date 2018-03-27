import warn from 'warning';

export * from './vnode';

export * from './utils';

export * from './dom';

const warned = {};
export function warning(valid = true, message = '', ...args) {
  if (!valid && !warned[message]) {
    warn(false, message, ...args);
    warned[message] = true;
  }
}
