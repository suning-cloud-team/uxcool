import { isFunction } from './utils';

export function isVNode(node = {}) {
  if (node === null || typeof node !== 'object' || !node.constructor) {
    return false;
  }
  return !!('componentOptions' in node && 'tag' in node && 'ns' in node);
}

export function getVNodeOptions(node) {
  if (!isVNode(node)) {
    return {};
  }

  const componentOptions = node.componentOptions || {};
  return componentOptions;
}

export function updateVNodeProps(node, handler = {}) {
  if (!isVNode(node)) {
    return node;
  }
  const nNode = node;
  const { componentOptions } = nNode;
  let props = {};
  if (componentOptions) {
    props = componentOptions.propsData;
  } else {
    nNode.data = nNode.data || {};
    nNode.data.attrs = nNode.data.attrs || {};
    props = nNode.data.attrs;
  }

  Object.keys(handler).forEach((k) => {
    const fn = handler[k];
    if (isFunction(fn)) {
      props[k] = fn(props[k], k);
    }
  });

  return node;
}
