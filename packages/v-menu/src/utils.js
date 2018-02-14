let uidSeed = 0;

export function noop() {}

export function getRootMenu(inst) {
  let parent = inst.$parent;
  while (parent && !parent.isRoot) {
    parent = parent.$parent;
  }
  if (!parent) {
    throw new Error('未找到menu根元素!');
  }
  return parent;
}

// 获取所有后代元素
export function getAllDescendants(inst) {
  const ret = new Set();

  function recursive(children) {
    if (children.length) {
      children.forEach((c) => {
        ret.add(c);
        recursive(c.$children);
      });
    }
  }
  recursive(inst.$children);
  return ret;
}

export function getEventName(inst) {
  const { eventName = '' } = inst.$parent;
  return inst.name || `${eventName ? `${eventName}_` : ''}${inst.$options.name}_${inst.uuid}`;
}

export function genUUID() {
  uidSeed += 1;
  return uidSeed;
}

export function isWrapComponent(cmp) {
  return cmp.isWrap;
}

// 获取组件在组件树中的层级
export function getComponentLevel(inst) {
  if (inst.isRoot) {
    return 0;
  }
  let level = 1;
  let parent = inst.$parent;
  while (parent && !parent.isRoot) {
    const { name } = parent.$options;
    if (name !== 'Menu' && name !== 'MenuItemGroup' && !isWrapComponent(parent)) {
      level += 1;
    }
    parent = parent.$parent;
  }
  return level;
}

function isSubMenu(inst) {
  return inst.$options.name === 'SubMenu';
}

// 获取当前元素最上层的SubMenu元素
export function getRootSubMenu(inst) {
  let rootSubMenu = isSubMenu(inst) ? inst : null;
  let parent = inst.$parent;
  while (parent && !parent.isRoot) {
    if (isSubMenu(parent)) {
      rootSubMenu = parent;
    }
    parent = parent.$parent;
  }
  return rootSubMenu;
}
