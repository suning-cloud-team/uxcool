import VDropdown from '@suning/v-dropdown';
import { isVNode, warning, isFunction } from '@suning/v-utils';
import { buildComponentName } from '../utils';

function updateVNodeProps(
  node,
  propNames = [],
  cb = prop => prop
) {
  if (!isVNode(node)) {
    return node;
  }
  const componentOptions = node.componentOptions;
  let attrs = {};
  if (componentOptions) {
    attrs = componentOptions.propData;
    props.forEach();
  } else {
    attrs = node.data.attrs;
  }

  propNames.forEach((v) => {
    if (isFunction(cb)) {
      attrs[v] = cb(attrs[v]);
    }
  });

  return node;
}
export default {
  name: buildComponentName('Dropdown'),
  props: {
    ...VDropdown.props,
    prefixCls: {
      type: String,
      default: 'ux-dropdown',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mouseEnterDelay: {
      type: Number,
      default: 0.15,
    },
    mouseLeaveDelay: {
      type: Number,
      default: 0.1,
    },
  },
  computed: {
    actions() {
      const { trigger, disabled } = this;
      if (disabled) {
        return [];
      }
      let actions = trigger;
      if (!Array.isArray(trigger)) {
        actions = [trigger];
      }
      return actions;
    },
    normalizeTransitionName() {
      const { transitionName, placement } = this;
      let name = transitionName;
      if (!name) {
        if (placement.indexOf('top') >= 0) {
          name = 'slide-down';
        } else {
          name = 'slide-up';
        }
      }
      return name;
    },
  },
  render() {
    const {
      $slots, disabled, actions, normalizeTransitionName
    } = this;

    const { trigger, overlay } = $slots;
    if (!trigger) {
      warning(false, 'You need an `trigger` slot element.');
      return null;
    }
    if (!overlay) {
      warning(false, 'You need an `overlay` slot element.');
      return null;
    }
    const triggerNode = trigger[0];
    // updateVNodeProps(triggerNode,['prefixCls'])

    const overlayNode = overlay[0];
    return <div>abc</div>;
  },
};
