import warn from 'warning';
import { COMPONENT_NAME_PREFIX } from './constants';

export function buildComponentName(name) {
  return `${COMPONENT_NAME_PREFIX}${name}`;
}

export function noop() {}

export function isFlexSupported() {
  if (window && window.document && window.document.documentElement) {
    const { documentElement } = window.document;
    return ['flex', 'webkitFlex', 'Flex', 'msFlex'].some(v => v in documentElement.style);
  }
  return false;
}

const warned = {};
export function warning(valid = true, message = '') {
  if (!valid && !warned[message]) {
    warn(false, message);
    warned[message] = true;
  }
}
