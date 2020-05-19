import {
  isVNode, isDef, isFunction, isArray, warning
} from '@cloud-sn/v-utils';

export const ICON_OPEN = 'open';

export const ICON_CLOSE = 'close';

export function getNodeKey(node, rowKey, treeStore) {
  let { key } = node;
  if (rowKey) {
    key = isFunction(rowKey) ? rowKey(node) : node[rowKey];
  }

  if (!isDef(key)) {
    warning(
      false,
      'Each record in dataSource of tree should have a unique `key` prop, or set `rowKey` to an unique primary key'
    );
    const { seed } = treeStore;
    const id = seed + 1;
    key = `$$id_${id}`;
    // eslint-disable-next-line
    treeStore.seed = id;
  }

  return key;
}

export function normalizeNode(node = {}, mixin) {
  return { ...node, ...mixin };
}

export function getKeysObj(keys) {
  return keys.reduce((r, k, i) => {
    const nr = r;
    nr[k] = i;
    return nr;
  }, {});
}

export function setStoreKeysByName(store, keyName, value, op, replace, replaceCb, storeKeysCb) {
  const nKeys = isArray(value) ? value : [value];
  const nStore = store;
  if (replace) {
    const old = nStore[keyName];
    nStore[keyName] = nKeys;
    if (isFunction(replaceCb)) {
      replaceCb(nKeys, old);
    }
  } else {
    const list = nStore[keyName];
    const nKeyObj = getKeysObj(nKeys);
    if (op === 'add') {
      nKeys.forEach((k) => {
        if (list.indexOf(k) === -1) {
          list.push(k);
        }
      });
    } else if (op === 'del') {
      nStore[keyName] = list.filter((k) => !(k in nKeyObj));
    }
  }
  if (isFunction(storeKeysCb)) {
    storeKeysCb({ keyName, op, replace });
  }
}

export function getNodeStatus(
  keys = [],
  nodeKey,
  defaultFalsyValue,
  parentStatus,
  disabled = false,
  checkStrict = false
) {
  if (keys.indexOf(nodeKey) > -1) {
    return true;
  }

  if (disabled) {
    return defaultFalsyValue;
  }

  if (parentStatus && !checkStrict) {
    return true;
  }

  return defaultFalsyValue;
}

/**
 *
 * @param {*} childrens
 * @return -1 :不存在子节点 0:无 子节点被勾选 1: 部分 子节点被勾选 2:全部 子节点被勾选
 */
export function getNodeChildCheckState(childrens = []) {
  if (childrens.length === 0) {
    return -1;
  }

  const childrensNoDisabled = childrens.filter((v) => v.isParent || (!v.isDisabled && !v.disableCheckbox));

  if (childrensNoDisabled.length === 0) {
    return 0;
  }

  if (
    childrensNoDisabled.every((v) => {
      if (v.isDisabled || v.disableCheckbox) {
        return v.childCheckState === 2;
      }
      return v.isChecked;
    })
  ) {
    return 2;
  }

  if (
    childrensNoDisabled.some((v) => {
      if (v.isDisabled || v.disableCheckbox) {
        return v.childCheckState === 1 || v.childCheckState === 2;
      }
      return v.isChecked || v.isHalfChecked;
    })
  ) {
    return 1;
  }

  return 0;
}

export function isTreeNode(node = {}) {
  if (!isVNode(node)) {
    return false;
  }
  const { componentOptions } = node;
  return componentOptions && componentOptions.options && componentOptions.options.isTreeNode;
}
export function filterChildrens(childrens = []) {
  return childrens.filter((node) => isTreeNode(node));
}

export function getParentChecked(parent) {
  let parentChecked = false;
  let np = parent;
  // 如果父级disabled, 则使用父级的父级的checked.以此类推
  while (np && (np.isDisabled || np.disableCheckbox)) {
    np = np.parent;
  }

  if (np) {
    parentChecked = np.isChecked;
  }

  return parentChecked;
}

export function getNodeOriginParent(node) {
  const { parent } = node;
  if (!parent) {
    return null;
  }
  return {
    ...parent.originNode,
    parentNode: getNodeOriginParent(parent),
  };
}
export function getOriginNodes(nodesMap = {}, keys = []) {
  return keys
    .map((k) => {
      const node = nodesMap[k];
      return node
        ? {
          ...node.originNode,
          originNode: node.originNode,
          pos: node.pos,
          parentNode: getNodeOriginParent(node),
        }
        : null;
    })
    .filter((node) => !!node);
}

export function setNodeOriginExpand(node) {
  const nNode = node;
  if (!('originExpand' in nNode)) {
    nNode.originExpand = nNode.isExpanded;
  }
  nNode.isExpanded = true;
}

export function removeNodeOriginExpand(node) {
  const nNode = node;
  if ('originExpand' in nNode) {
    nNode.isExpanded = nNode.originExpand;
    delete nNode.originExpand;
  }
}

export function getDragNodeKeys(nodes = []) {
  const keys = [];
  for (let i = 0, l = nodes.length; i < l; i += 1) {
    const node = nodes[i];
    const { key, children } = node;
    keys.push(key);
    if (isArray(children) && children.length > 0) {
      keys.push(...getDragNodeKeys(children));
    }
  }

  return keys;
}

const DRAG_MIN_GAP = 2;
const DRAG_SIDE_RANGE = 0.25;

export function calcDragOverGap(e, el) {
  const { clientY } = e;
  const { top, bottom, height } = el.getBoundingClientRect();
  const offset = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);
  let gap = 'mid';
  if (clientY <= top + offset) {
    gap = 'top';
  } else if (clientY >= bottom - offset) {
    gap = 'bottom';
  }

  return gap;
}
