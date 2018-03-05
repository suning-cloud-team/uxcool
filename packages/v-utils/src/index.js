import warn from 'warning';

export * from './vnode';

export function isFunction(fn) {
  return typeof fn === 'function';
}

const warned = {};
export function warning(valid = true, message = '') {
  if (!valid && !warned[message]) {
    warn(false, message);
    warned[message] = true;
  }
}
