import isPlainObject from 'lodash/isPlainObject';

export function isFunction(fn) {
  return typeof fn === 'function';
}

export function isArray(arr) {
  return Array.isArray(arr);
}

// export function isPlainObject(obj) {
//   return Object.prototype.toString.call(obj) === '[object Object]';
// }

export { isPlainObject };
