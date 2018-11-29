import { isSameTypeVNode, getVNodeText } from '@suning/v-utils';

let uidSeed = 0;

function isMenuNode(vm) {
  return isSameTypeVNode(vm.$vnode, 'isMenuType');
}
function isSubMenuNode(vm) {
  return isSameTypeVNode(vm.$vnode, 'isSubMenuType');
}

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
  const ret = [];

  function recursive(children) {
    if (children.length) {
      children.forEach((c) => {
        ret.push(c);
        recursive(c.$children);
      });
    }
  }
  recursive(inst.$children);
  return ret;
}

export function getEventName(inst) {
  const { eventName = '' } = inst.$parent;
  return inst.name || inst.name === 0
    ? inst.name
    : `${eventName ? `${eventName}_` : ''}${inst.$options.name}_${inst.uuid}`;
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
  while (parent) {
    if (isSubMenuNode(parent)) {
      level += 1;
    }
    // const { name } = parent.$options;
    // if (name !== 'Menu' && name !== 'MenuItemGroup' && !isWrapComponent(parent)) {
    //   level += 1;
    // }
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

const popupPlacementMap = {
  horizontal: 'bottomLeft',
  vertical: 'rightTop',
};

export function getPopupPlacement(mode) {
  return popupPlacementMap[mode];
}

export function isTopSubMenu(vm) {
  let parent = vm.$parent;

  while (parent) {
    if (isMenuNode(parent)) {
      break;
    }
    parent = parent.$parent;
  }

  return parent ? parent.isRoot : false;
}

export function getItemSubMenuNames(vm) {
  const names = [];
  let parent = vm.$parent;

  while (parent) {
    if (isSubMenuNode(parent)) {
      names.push(parent.eventName);
    }
    parent = parent.$parent;
  }

  return names;
}

export function getAllItemSubMenuNames(selectedItems = []) {
  const ret = {};

  for (let i = 0, l = selectedItems.length; i < l; i += 1) {
    const names = getItemSubMenuNames(selectedItems[i]);
    for (let j = 0, ll = names.length; j < ll; j += 1) {
      ret[names[j]] = 1;
    }
  }
  return Object.keys(ret);
}

export function getItemParentSubMenus(vm) {
  const ret = [];
  let parent = vm.$parent;

  while (parent) {
    if (isSubMenuNode(parent)) {
      ret.push(parent);
    }
    parent = parent.$parent;
  }

  return ret;
}

export function getTitle(slotTitle, title) {
  const vnodeTitle = getVNodeText(slotTitle);
  return (vnodeTitle || []).length === 0 ? title : vnodeTitle;
}
