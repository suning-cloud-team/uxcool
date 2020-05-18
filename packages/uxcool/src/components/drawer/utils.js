import { isNaN, isNumber } from '@cloud-sn/v-utils';

export function genUid() {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise, no-mixed-operators
    const r = ((dt + Math.random() * 16) % 16) | 0;
    dt = Math.floor(dt / 16);
    // eslint-disable-next-line no-bitwise,
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function noop() {}

export function isNumeric(value) {
  return !isNaN(value) && isNumber(value);
}

export function hasScrollBar() {
  return document.body.clientWidth < window.innerWidth;
}

export function getVisibleDrawerCnt(drawers = {}) {
  return Object.keys(drawers).filter((k) => drawers[k]).length;
}

export function hasVisibleDrawer(drawers = {}) {
  return getVisibleDrawerCnt(drawers) >= 1;
}

export function getDoc() {
  return window ? window.document.body : {};
}
