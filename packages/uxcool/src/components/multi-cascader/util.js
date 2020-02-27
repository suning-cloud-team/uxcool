export const SPLIT_STR = '\u0001';

export const DEFAULT_FIELD_NAMES = {
  label: 'label',
  value: 'value',
  children: 'children',
};

// 使用value路径来生成唯一id
export function genCascaderKey(valuePath) {
  return valuePath.join(SPLIT_STR);
}

// 根据valuePath判断某个节点是否可能另一个节点的祖先节点
export function maybeAncestorOf(ancestorPath, path) {
  // 将路径转成字符串比较字符串是否以另一个字符串开头
  const ancestorPathStr = ancestorPath.join(SPLIT_STR) + SPLIT_STR;
  const pathStr = path.join(SPLIT_STR) + SPLIT_STR;

  return pathStr.startsWith(ancestorPathStr);
}

export function getParentChecked(parent) {
  let checked = false;

  let p = parent;

  // 父级如果disable，则取父级的父级checked状态
  while (p && p.disabled) {
    p = p.parent;
  }

  if (p) {
    checked = p.isChecked;
  }

  return checked;
}

export function getNodeChecked(
  checkedKeyMap,
  nodeKey,
  defaultValue,
  parentStatus,
  disabled = false,
  checkStrict = false
) {
  if (checkedKeyMap[nodeKey]) {
    return true;
  }

  if (disabled) {
    return defaultValue;
  }

  if (parentStatus && !checkStrict) {
    return true;
  }

  return defaultValue;
}

/**
 *
 * @param {*} children
 * @return -1: 不存在子节点   0:无子节点被勾选  1:部分子节点被勾选 2: 全部子节点都被勾选
 *
 */
export function getNodeChildCheckState(children = []) {
  if (children.length === 0) {
    return -1;
  }

  // 非叶子节点及非禁用状态叶子节点才会影响父级勾选状态
  const validChildren = children.filter((item) => item.isParent || !item.disabled);

  if (validChildren.length === 0) {
    return 0;
  }

  // eslint-disable-next-line max-len
  const isAllChecked = validChildren.every((item) => (item.disabled ? item.childCheckState === 2 : item.isChecked));
  if (isAllChecked) {
    return 2;
  }

  const isIndeterminate = validChildren.some((item) => {
    if (item.disabled) {
      return item.childCheckState === 1 || item.childCheckState === 2;
    }
    return item.isChecked || item.isIndeterminate;
  });

  if (isIndeterminate) {
    return 1;
  }

  return 0;
}

export function flatten(tree = [], childrenField = 'children', result = []) {
  tree.forEach((item) => {
    result.push(item);
    const children = item[childrenField];
    flatten(children, childrenField, result);
  });

  return result;
}
