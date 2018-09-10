import { isArray } from '@suning/v-utils';
import Tree from '../tree';

const {
  getNodeStatus,
  getNodeChildCheckState,
  getParentChecked,
  getOriginNodes,
  getNodeOriginParent,
} = Tree.staticMethod;

export {
  getNodeStatus,
  getNodeChildCheckState,
  getParentChecked,
  getOriginNodes,
  getNodeOriginParent,
};

export function isValidValue(val) {
  return val || val === 0;
}

export const DEFAULT_FIELD_NAMES = {
  label: 'title',
  value: 'key',
  children: 'children',
};

export function normalizeContent(maxLen, content) {
  const l = Number(maxLen);
  if (l <= 0 || typeof content !== 'string' || content.length < l) {
    return content;
  }

  return `${content.slice(0, l)}...`;
}
export function isDisabledNode(node, isCheckable = false) {
  let { disabled } = node;
  if (isCheckable) {
    disabled = disabled || node.disableCheckbox;
  }
  return node ? disabled : true;
}

export function getChildNodeKeys(
  node = {},
  keyName = DEFAULT_FIELD_NAMES.value,
  isCheckable,
  clearDisabled = false
) {
  const ret = [];
  const { children } = node;
  if (isArray(children) && children.length > 0) {
    children.forEach((v) => {
      if (!isDisabledNode(v) || clearDisabled) {
        ret.push(v[keyName]);
      }
      ret.push(...getChildNodeKeys(v, keyName, isCheckable, clearDisabled));
    });
  }
  return ret;
}

export function checkNodeForShowParent(
  node,
  checkedNodeKeyObj = {},
  keyName = DEFAULT_FIELD_NAMES.value
) {
  let { parentNode } = node;

  while (parentNode && isDisabledNode(parentNode)) {
    // eslint-disable-next-line
    parentNode = parentNode.parentNode;
  }

  if (!parentNode) {
    return true;
  }

  return !(parentNode[keyName] in checkedNodeKeyObj);
}

export function getNodeParentKeys(
  node = {},
  keyName = DEFAULT_FIELD_NAMES.value,
  isCheckable,
  clearDisabled = false
) {
  let { parentNode: np } = node;

  const ret = [];
  if (!np) {
    return ret;
  }

  while (np) {
    if (!isDisabledNode(np, isCheckable) || clearDisabled) {
      ret.push(np[keyName]);
    }
    np = np.parentNode;
  }
  return ret;
}

export function calcMultipleSearchInputWidth(inputValue, inputMirror) {
  if (inputValue && inputMirror) {
    return {
      width: `${inputMirror.clientWidth}px`,
    };
  }
  return {};
}
