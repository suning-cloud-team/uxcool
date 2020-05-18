import {
  isSameTypeVNode,
  isArray,
  cloneVNode,
  isDef,
  isFunction,
  warning,
  extractVNodeData,
  isVueComponent,
} from '@cloud-sn/v-utils';

export function isValidValue(value) {
  return isDef(value) && value !== '';
}
export function buildOptionsFromSlot(nodes = []) {
  const ret = [];

  for (let i = 0, l = nodes.length; i < l; i += 1) {
    const node = nodes[i];
    if (isSameTypeVNode(node, 'isOptionGroupType')) {
      const { componentOptions: cp, data: { attrs } } = node;
      const props = cp.propsData;
      if (process.env.NODE_ENV !== 'production' && !isDef(props.label)) {
        warning(
          false,
          'OptionGroup invalid prop: type check failed for prop "label". Expected String,got undefined .'
        );
      }
      ret.push({
        ...attrs,
        ...props,
        label: props.label,
        children: buildOptionsFromSlot(cp.children),
      });
    } else if (isSameTypeVNode(node, 'isOptionType')) {
      const { componentOptions: cp, data: { attrs } } = node;
      const props = cp.propsData;
      if (process.env.NODE_ENV !== 'production' && !isDef(props.value)) {
        warning(
          false,
          'Option invalid prop: type check failed for prop "value". Expected String, Number ,got undefined .'
        );
      }
      ret.push({
        ...attrs,
        ...props,
        value: props.value,
        label: props.label || '',
        labelNode: cp.children,
        disabled: 'disabled' in props && props.disabled !== false,
      });
    }
  }
  return ret;
}

export function isUnRenderOption(option) {
  return 'UNRENDER_OTPION' in option && option.UNRENDER_OTPION === true;
}
export function isOptionGroup(option) {
  return 'children' in option;
}

export function cloneLabelNodes(vnodes) {
  return isArray(vnodes) ? vnodes.map((node) => cloneVNode(node)) : cloneVNode(vnodes);
}

export function normalizeContent(maxLen, content) {
  const l = Number(maxLen);
  if (l <= 0 || typeof content !== 'string' || content.length < l) {
    return content;
  }

  return `${content.slice(0, l)}...`;
}

export function DefaultFilterOption(filterProp) {
  return (inputValue, option) => {
    if (option.disabled) {
      return false;
    }
    const optionValue = String(option[filterProp]) || '';
    return optionValue.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  };
}

export function recursiveSearch(options = [], inputValue, filterFn) {
  const ret = [];
  for (let i = 0, l = options.length; i < l; i += 1) {
    const option = options[i];
    if (isOptionGroup(option)) {
      const { children } = option;
      const nChildren = recursiveSearch(children || [], inputValue, filterFn);
      if (nChildren.length > 0) {
        ret.push({ ...option, children: nChildren });
      }
    } else if (filterFn(inputValue, option.originNode)) {
      ret.push(option);
    }
  }
  return ret;
}

export function buildOptionOriginNode(name, optionMap) {
  if (!isDef(name)) {
    return {};
  }
  if (name in optionMap) {
    const { originNode } = optionMap[name];
    const {
      label, value, title, disabled
    } = originNode;
    const nLabel = label || value;
    return {
      ...originNode,
      disabled: !!disabled,
      title: title || nLabel,
      label: nLabel,
      value,
    };
  }
  return {
    disabled: false,
    title: name,
    label: name,
    value: name,
  };
}

export function calcMultipleSearchInputWidth(inputValue, inputMirror) {
  if (inputValue && inputMirror) {
    return {
      width: `${inputMirror.clientWidth}px`,
    };
  }
  return {};
}

function getRegByTokens(tokens = []) {
  return new RegExp(`^[^${tokens.join('')}]+[${tokens.join('')}]`);
}
export function includeSeparators(value = '', tokens = []) {
  const reg = getRegByTokens(tokens);
  return reg.test(value);
}

export function getOptionLabelMap(optionMap = {}) {
  return Object.keys(optionMap).reduce((r, k) => {
    const nr = r;
    const option = optionMap[k];
    nr[option.label || k] = option;
    return nr;
  }, {});
}

export function splitValueBySeparator(value = '', tokens = []) {
  const splitReg = new RegExp(`[${tokens.join('')}]`);
  return value.split(splitReg).filter((v) => !!v);
}

export function getComboboxValue(value = '', optionMap = {}, optionLabelProp = 'value') {
  const comboboxValue = isArray(value) ? value[0] : value;
  let label = '';
  if (comboboxValue) {
    if (optionLabelProp === 'value') {
      label = comboboxValue;
    } else {
      // optionLabelProp = label;
      const option = optionMap[comboboxValue];
      if (option) {
        label = option.label; //eslint-disable-line
      } else {
        label = comboboxValue;
      }
    }
  }
  return label;
}

export function getOptionOriginNode(optionMap = {}) {
  return Object.keys(optionMap).map((k) => {
    const option = optionMap[k];
    return option.originNode;
  });
}

export function genInputElement(inputNode, data = {}) {
  const overlayData = extractVNodeData(inputNode, isVueComponent(inputNode));

  const { input: originInput } = overlayData.on || {};
  const { input: onInput } = data.on || {};
  const inputFn = isFunction(onInput) ? (_, e) => onInput(e) : () => {};
  const inputInput = originInput ? [originInput, inputFn] : inputFn;
  const ref = data.ref || inputNode.data.ref;
  return cloneVNode(
    inputNode,
    {
      class: [overlayData.class, data.class],
      props: {
        ...overlayData.props,
        ...data.props,
      },
      on: {
        ...overlayData.on,
        input: inputInput,
      },
      ref,
    },
    false
  );
}
