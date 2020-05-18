import { warning } from '@cloud-sn/v-utils';
import { COMPONENT_NAME_PREFIX } from './constants';

export function buildComponentName(name) {
  return `${COMPONENT_NAME_PREFIX}${name}`;
}

export function getComponentPrefix() {
  return COMPONENT_NAME_PREFIX.toLowerCase();
}

export function noop() {}

export function isFlexSupported() {
  if (window && window.document && window.document.documentElement) {
    const { documentElement } = window.document;
    return ['flex', 'webkitFlex', 'Flex', 'msFlex'].some((v) => v in documentElement.style);
  }
  return false;
}

export { warning };
