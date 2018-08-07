import pick from 'lodash/pick';
import assign from 'lodash/assign';
import { isFunction, isDef } from './utils';

const DATA_KEYS = [
  'class',
  'staticClass',
  'style',
  'attrs',
  'props',
  'domProps',
  'on',
  'nativeOn',
  'directives',
  'scopedSlots',
  'slot',
  'ref',
  'key',
];

export function isVNode(node = {}) {
  if (node === null || typeof node !== 'object' || !node.constructor) {
    return false;
  }
  return !!('componentOptions' in node && 'tag' in node && 'ns' in node);
}

export function isTextNode(node) {
  return isDef(node) && isDef(node.text) && node.isComment === false;
}

function mutateKey(key) {
  return `${key}-cloned-cid`;
}

function extractData(vnode, isComp) {
  const data = pick(vnode.data, DATA_KEYS);
  if (isComp) {
    const cOpts = vnode.componentOptions;
    assign(data, {
      props: cOpts.propsData,
      on: cOpts.listeners,
    });
  }

  if (data.key) {
    data.key = mutateKey(data.key);
  }

  return data;
}

export { DATA_KEYS as VNODE_DATA_KEYS, extractData as extractVNodeData };

export function cloneVNode(vnode, newData = {}, deep = true) {
  if (!isVNode(vnode) && !isTextNode(vnode)) {
    return vnode;
  }
  // use the context that the original vnode was created in.
  const h = vnode.context && vnode.context.$createElement;
  const isComp = !!vnode.componentOptions;
  const isText = !vnode.tag; // this will also match comments but those will be dropped, essentially
  const children = isComp ? vnode.componentOptions.children : vnode.children;

  if (isText) return vnode.text;

  const data = assign(extractData(vnode, isComp), newData);

  const tag = isComp ? vnode.componentOptions.Ctor : vnode.tag;

  let childNodes = children;
  if (deep) {
    childNodes = children ? children.map(c => cloneVNode(c)) : undefined;
  }
  return h(tag, data, childNodes);
}

export function getVNodeOptions(node) {
  if (!isVNode(node)) {
    return null;
  }

  return node.componentOptions;
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

export function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

export function isVueComponent(vnode) {
  return !!vnode.componentOptions;
}

// 是否是指定类型的VNode
export function isSameTypeVNode(vnode, optionName = '') {
  if (!isVNode(vnode)) {
    return false;
  }
  const { componentOptions: cp } = vnode;
  return !!(cp && cp.Ctor && cp.Ctor.options && cp.Ctor.options[optionName]);
}
