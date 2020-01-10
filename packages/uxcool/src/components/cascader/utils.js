import { isFunction } from '@suning/v-utils';

export const SPLIT_STR = '\u0001';

export const DEFAULT_FIELD_NAMES = {
  label: 'label',
  value: 'value',
  children: 'children',
};

export function getCascaderKey(value, level) {
  return `${level}${SPLIT_STR}${value}`;
}

export function delay(fn, wait) {
  if (!isFunction(fn)) {
    return null;
  }
  return setTimeout(fn, wait);
}
