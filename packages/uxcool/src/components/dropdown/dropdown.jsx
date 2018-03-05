import VDropdown from '@suning/v-dropdown';
import { warning, updateVNodeProps, getVNodeOptions } from '@suning/v-utils';
import { buildComponentName } from '../utils';

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
    bindProps() {
      const { $props, actions, normalizeTransitionName } = this;
      return {
        ...$props,
        transitionName: normalizeTransitionName,
        trigger: actions,
      };
    },
  },
  render() {
    const {
      $listeners, $slots, prefixCls, disabled, bindProps, closeOnSelect
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
    const { data: triggerData } = triggerNode;
    triggerData.class = [triggerData.class, `${prefixCls}-trigger`];
    updateVNodeProps(triggerNode, {
      disabled() {
        return disabled;
      },
    });
    const overlayNode = overlay[0];
    updateVNodeProps(overlayNode, {
      mode() {
        return 'vertical';
      },
    });
    const opts = getVNodeOptions(overlayNode);

    let { multiple } = opts.propsData || { multiple: false };
    multiple = multiple === '' || multiple;
    let closeOverlay = closeOnSelect;
    if (multiple) {
      closeOverlay = false;
    }
    bindProps.closeOnSelect = closeOverlay;

    return (
      <VDropdown {...{ props: bindProps, on: $listeners }}>
        <template slot="trigger">{triggerNode}</template>
        <template slot="overlay">{overlayNode}</template>
      </VDropdown>
    );
  },
};
