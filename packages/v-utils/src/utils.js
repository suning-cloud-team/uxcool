import isPlainObject from 'lodash/isPlainObject';
import isNumber from 'lodash/isNumber';
import raf from 'raf';

export function isDef(v) {
  return v !== null && v !== undefined;
}
export function isFunction(fn) {
  return typeof fn === 'function';
}

export function isArray(arr) {
  return Array.isArray(arr);
}

// export function isPlainObject(obj) {
//   return Object.prototype.toString.call(obj) === '[object Object]';
// }

export { raf, isPlainObject, isNumber };
