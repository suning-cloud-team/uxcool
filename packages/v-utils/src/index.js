import warn from 'warning';

export * from './vnode';

export * from './utils';

const warned = {};
export function warning(valid = true, message = '') {
  if (!valid && !warned[message]) {
    warn(false, message);
    warned[message] = true;
  }
}
