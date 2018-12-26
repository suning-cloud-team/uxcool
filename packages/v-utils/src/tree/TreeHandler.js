import { genUid } from '../utils';

function getParentChecked(parent) {
  let parentChecked = false;
  let np = parent;
  // 如果父级disabled, 则使用父级的父级的checked.以此类推
  while (np && np.isDisabled) {
    np = np.parent;
  }

  if (np) {
    parentChecked = np.isChecked;
  }

  return parentChecked;
}

function getNodeStatus(defaultFalsyValue, parentStatus, disabled = false, checkStrict = false) {
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
 * @param {*} children
 * @return -1 :不存在子节点 0:无 子节点被勾选 1: 部分 子节点被勾选 2:全部 子节点被勾选
 */
export function getNodeChildCheckState(children = []) {
  if (children.length === 0) {
    return -1;
  }

  const childrensNoDisabled = children.filter(v => v.isParent || !v.isDisabled);

  if (
    childrensNoDisabled.every((v) => {
      if (v.isDisabled) {
        return v.$$tree_handler_attrs.childCheckState === 2;
      }
      return v.isChecked;
    })
  ) {
    return 2;
  }

  if (
    childrensNoDisabled.some((v) => {
      if (v.isDisabled) {
        return (
          v.$$tree_handler_attrs.childCheckState === 1 ||
          v.$$tree_handler_attrs.childCheckState === 2
        );
      }
      return v.isChecked || v.isHalfChecked;
    })
  ) {
    return 1;
  }

  return 0;
}

function recursive(data = [], treeMap = {}, parent = null, level = 0, checkStrict = false) {
  const ret = [];
  const nTreeMap = treeMap;
  for (let i = 0, l = data.length; i < l; i += 1) {
    const node = data[i];
    const { children, disabled, disableCheckbox } = node;
    const uid = genUid();
    const isDisabled = disabled || disableCheckbox || false;
    const parentChecked = getParentChecked(parent);
    const isChecked = getNodeStatus(!!node.isChecked, parentChecked, isDisabled, checkStrict);

    const nNode = {
      ...node,
      isDisabled,
      isChecked,
      isHalfChecked: false,
      originNode: node,
      $$tree_handler_attrs: {
        uid,
        childCheckState: -1,
        parent,
        level,
      },
    };

    let isParent = false;
    let childNodes = null;
    if (Array.isArray(children) && children.length > 0) {
      childNodes = recursive(children, nTreeMap, nNode, level + 1, checkStrict);
      isParent = true;
      nNode.children = childNodes;
    }

    if (isParent) {
      nNode.childCheckState = getNodeChildCheckState(childNodes || []);
      if (!checkStrict) {
        nNode.isHalfChecked = nNode.childCheckState === 1;
        nNode.isChecked = nNode.childCheckState === 2 ? true : nNode.isChecked;
      }
    }
    nNode.isParent = isParent;
    nTreeMap[uid] = nNode;
    ret.push(nNode);
  }

  return ret;
}

function updateNodeParentChecked(node) {
  const { $$tree_handler_attrs: { parent }, isChecked } = node;
  let np = parent;
  while (np) {
    const childCheckState = getNodeChildCheckState(np.children || []);
    np.$$tree_handler_attrs.childCheckState = childCheckState;
    if (!np.isDisabled) {
      // childCheckState -1 :不存在子节点 0:无 子节点被勾选 1: 部分 子节点被勾选 2:全部 子节点被勾选
      switch (childCheckState) {
        case 0:
          np.isChecked = false;
          np.isHalfChecked = false;
          break;
        case 1:
          np.isChecked = false;
          np.isHalfChecked = true;
          break;
        case 2:
          np.isChecked = true;
          np.isHalfChecked = false;
          break;
        default:
          np.isChecked = !!isChecked;
          np.isHalfChecked = false;
          break;
      }
    }

    np = np.$$tree_handler_attrs.parent;
  }
}

function updateChildrenChecked(node) {
  const nNode = node;
  const { children, isChecked } = nNode;
  if (Array.isArray(children) && children.length > 0) {
    for (let i = 0, l = children.length; i < l; i += 1) {
      const childNode = children[i];
      if (!childNode.isDisabled) {
        childNode.isChecked = !!isChecked;
        childNode.isHalfChecked = false;
      }
      updateChildrenChecked(childNode);
    }
  }

  // 不放在上面if内是为了防止children突然被置空,childCheckState不更新的问题
  nNode.$$tree_handler_attrs.childCheckState = getNodeChildCheckState(children || []);
}

/**
 * @class Tree 工具方法,实现`checkbox`上下级关联显示,主要用户`Table`树形组件或需要上下级关联关系的组件
 */
export default class TreeHandler {
  constructor(data = [], opts = { checkStrict: false }) {
    this.dataSource = data || [];
    this.options = opts || {};
    this.treeMap = {};
    this.tree = this.createTree();
  }
  getTree() {
    return this.tree;
  }
  setDataSource(data = []) {
    this.dataSource = data || [];
    this.treeMap = {};
    const tree = this.createTree();
    this.tree = tree;
    return tree;
  }
  createTree() {
    const { dataSource, treeMap, options: { checkStrict } } = this;
    return recursive(dataSource, treeMap, null, 0, checkStrict);
  }
  handle(node, isChecked) {
    const { options: { checkStrict }, treeMap } = this;
    const { uid } = node.$$tree_handler_attrs || {};
    if (!uid || !treeMap[uid]) {
      throw new Error('The node must be a tree handler node');
    }

    const nNode = treeMap[uid];
    nNode.isChecked = !!isChecked;
    if (nNode.isHalfChecked) {
      nNode.isHalfChecked = false;
    }

    if (!checkStrict) {
      updateChildrenChecked(nNode);
      updateNodeParentChecked(nNode);
    }

    return this.tree;
  }
  getCheckedNodes() {
    const { treeMap } = this;
    return Object.keys(treeMap).reduce((r, k) => {
      const nr = r;
      const node = treeMap[k];
      if (node.isChecked) {
        nr.push(node);
      }
      return nr;
    }, []);
  }
}
