import debug from 'debug';

let UUID_SEED = 0;

export function noop() {}

export function logFactory(name) {
  return debug(name);
}

export function getCmpParent(vm) {
  let parent = vm.$parent;
  while (parent) {
    if (parent.isSelect || parent.isOptionGroup) {
      break;
    }
    parent = parent.$parent;
  }
  if (!parent) {
    throw new Error('OptionGroup 和 Option组件必须包含在OptionGroup或Select组件中 ');
  }
  return parent;
}

export function genUUID() {
  UUID_SEED += 1;
  return UUID_SEED;
}

export function toArray(val) {
  let ret = val;
  if (!val) {
    ret = [];
  } else if (!Array.isArray(val)) {
    ret = [val];
  }
  return ret;
}

export function defaultFilterOptiontFn(inputVal, option, filterPropName = 'value') {
  if (option.disabled) {
    return false;
  }
  let filterPropVal = String(option[filterPropName]);
  if (filterPropName === 'label') {
    filterPropVal = option.label || String(option.value);
  }
  return filterPropVal.indexOf(inputVal) > -1;
}

export function calcMultipleSearchInputWidth(inputValue, inputMirror) {
  if (inputValue && inputMirror) {
    return {
      width: `${inputMirror.clientWidth}px`,
    };
  }
  return {};
}
