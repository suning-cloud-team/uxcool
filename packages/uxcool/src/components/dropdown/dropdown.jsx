import Trigger from '@suning/v-trigger';
import { isArray, warning, isVueComponent, extractVNodeData, cloneVNode } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import placements from './placements';

function isMenuCmp(vnode) {
  if (!isVueComponent(vnode)) return false;
  const { Ctor } = vnode.componentOptions;
  // ux-menu, v-menu
  return Ctor.extendOptions.name.indexOf('Menu') > -1;
}

export default {
  name: buildComponentName('Dropdown'),
  inheritAttrs: false,
  model: {
    prop: 'visible',
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ux-dropdown',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    trigger: {
      type: [Array, String],
      default: 'hover',
    },
    getPopupContainer: {
      type: Function,
      default: null,
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    placement: {
      type: String,
      default: 'bottomLeft',
    },
    mouseEnterDelay: {
      type: Number,
      // ms
      default: 150,
    },
    mouseLeaveDelay: {
      type: Number,
      // ms
      default: 100,
    },
    transitionName: {
      type: String,
      default: '',
    },
    animation: {
      type: String,
      default: '',
    },
    overlayClass: {
      type: [String, Array, Object],
      default: '',
    },
    overlayStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    align: {
      type: Object,
      default() {
        return {};
      },
    },
    matchTriggerWidth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerVisible: false,
      triggerWidth: null,
    };
  },
  computed: {
    actions() {
      const { disabled, trigger } = this;
      if (disabled) {
        return [];
      }
      return isArray(trigger) ? trigger : [trigger];
    },
    dropdownTransition() {
      const { transitionName, placement } = this;
      let transition = transitionName;
      if (!transition) {
        transition = placement.indexOf('top') > -1 ? 'slide-down' : 'slide-up';
      }
      return transition;
    },
    popupStyle() {
      const { matchTriggerWidth, triggerWidth } = this;

      return triggerWidth
        ? { [matchTriggerWidth ? 'width' : 'min-width']: `${triggerWidth}px` }
        : null;
    },
  },
  watch: {
    visible(nVal) {
      this.setInnerVisible(nVal);
    },
  },
  created() {
    this.setInnerVisible(this.visible);
  },
  methods: {
    setOverlayWidth() {
      const { $el } = this;
      this.triggerWidth = $el.offsetWidth;
    },
    setInnerVisible(visible) {
      this.innerVisible = visible;
    },
    onPopupVisibleChange(visible) {
      this.setInnerVisible(visible);
      this.$emit('input', visible);
      this.$emit('visible-change', visible);
      if (visible) {
        this.setOverlayWidth();
      }
    },
    onClick(e) {
      const { setInnerVisible, closeOnSelect } = this;
      if (closeOnSelect) {
        setInnerVisible(false);
      }
      this.$emit('overlay-click', e);
    },
    validateTriggerAndOverlay() {
      const { $slots: { overlay, trigger } } = this;

      if (process.env.NODE_ENV !== 'production') {
        if (!trigger) {
          warning(false, 'You need an `trigger` slot element!');
          return false;
        }

        if (!overlay) {
          warning(false, 'You need an `overlay` slot element!');
          return false;
        }
      }
      return true;
    },
    getTriggerAndOverlayNode() {
      const {
        $slots: { trigger: [triggerNode], overlay: [overlayNode] },
        prefixCls,
        disabled,
        onClick,
      } = this;
      const triggerData = extractVNodeData(triggerNode, isVueComponent(triggerNode));

      const nTriggerNode = cloneVNode(
        triggerNode,
        {
          class: [triggerData.class, `${prefixCls}-trigger`],
          props: {
            ...triggerData.props,
          },
          attrs: {
            ...triggerData.attrs,
            disabled,
          },
        },
        false
      );

      const overlayData = extractVNodeData(overlayNode, isVueComponent(overlayNode));
      const nOverlayProps = {};
      // menu组件时
      if (isMenuCmp(overlayNode)) {
        nOverlayProps.mode = 'vertical';
        nOverlayProps.isDropdownMenu = true;
        nOverlayProps.prefixCls = `${prefixCls}-menu`;
      }

      const { click: originClick } = overlayData.on || {};
      const overlayClick = originClick ? [originClick, onClick] : onClick;

      const nOverlayNode = cloneVNode(
        overlayNode,
        {
          props: {
            ...overlayData.props,
            ...nOverlayProps,
          },
          on: {
            ...overlayData.on,
            click: overlayClick,
          },
        },
        false
      );

      return {
        trigger: nTriggerNode,
        overlay: nOverlayNode,
      };
    },
    renderTrigger() {
      const {
        $attrs,
        prefixCls,
        popupStyle,
        overlayClass,
        overlayStyle,
        onPopupVisibleChange,
        placement,
        actions,
        align,
        dropdownTransition,
        animation,
        innerVisible,
        getPopupContainer,
        getTriggerAndOverlayNode,
      } = this;
      const { trigger, overlay } = getTriggerAndOverlayNode();
      const props = {
        prefixCls,
        popupClass: [overlayClass],
        popupStyle: { ...popupStyle, ...overlayStyle },
        builtinPlacements: placements,
        popupPlacement: placement,
        actions,
        popupAlign: align,
        popupTransitionName: dropdownTransition,
        popupAnimation: animation,
        visible: innerVisible,
        getPopupContainer,
      };
      const on = {
        'popup-visible-change': onPopupVisibleChange,
      };
      return (
        <Trigger
          {...{
            attrs: $attrs,
            props,
            on,
          }}
        >
          <template slot="trigger">{trigger}</template>
          <template slot="popup">{overlay}</template>
        </Trigger>
      );
    },
  },
  render() {
    const { validateTriggerAndOverlay, renderTrigger } = this;

    if (!validateTriggerAndOverlay()) {
      return null;
    }

    return renderTrigger();
  },
};
