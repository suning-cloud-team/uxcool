import raf from 'raf';
import isPlainObject from 'lodash/isPlainObject';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isNaN from 'lodash/isNaN';
import debounce from 'lodash/debounce';
import toArray from 'lodash/toArray';
import castArray from 'lodash/castArray';
import set from 'lodash/set';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import isEqualWith from 'lodash/isEqualWith';

export function noop() {}

export function isDef(v) {
  return v !== null && v !== undefined;
}
export function isFunction(fn) {
  return typeof fn === 'function';
}

export function isArray(arr) {
  return Array.isArray(arr);
}

export function leftPad(str, len = 2, fill = '0') {
  let nStr = String(str);

  while (nStr.length < len) {
    nStr = `${fill}${nStr}`;
  }
  return nStr;
}

export {
  raf,
  isPlainObject,
  isNumber,
  isString,
  isNaN,
  debounce,
  toArray,
  castArray,
  set as setValueByPath,
  get as getValueByPath,
  isEqual,
  isEqualWith,
};
