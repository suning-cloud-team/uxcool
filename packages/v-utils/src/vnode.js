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
