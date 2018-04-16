import { getVNodeOptions, warning } from '@suning/v-utils';
import Trigger from '@suning/v-trigger';
import placements from './placements';

export default {
  name: 'Dropdown',
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String,
      default: 'v-dropdown',
    },
    value: {
      type: Boolean,
      default: false,
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
    placement: {
      type: String,
      default: 'bottomLeft',
    },
    trigger: {
      type: Array,
      default() {
        return ['hover'];
      },
    },
    getPopupContainer: {
      type: Function,
      default: null,
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      default: 'light',
      validate(val) {
        return ['light', 'dark'].indexOf(val) > -1;
      },
    },
  },
  data() {
    return {
      popupVisible: false,
    };
  },
  watch: {
    value(nVal, oVal) {
      if (nVal !== oVal) {
        this.setPopupVisible(nVal);
      }
    },
  },
  created() {
    this.setPopupVisible(this.value);
  },
  methods: {
    setPopupVisible(visible) {
      this.popupVisible = visible;
    },
    onPopupVisibleChange(visible) {
      this.setPopupVisible(visible);
      this.$emit('input', visible);
      this.$emit('visible-change', visible);
    },
    onClick(e) {
      const { closeOnSelect, setPopupVisible } = this;
      if (closeOnSelect) {
        setPopupVisible(false);
      }
      this.$emit('overlay-click', e);
    },
  },
  render() {
    const {
      $slots,
      $attrs,
      prefixCls,
      theme,
      overlayClass,
      overlayStyle,
      align,
      trigger,
      placement,
      transitionName,
      animation,
      popupVisible,
      onPopupVisibleChange,
      getPopupContainer,
      onClick,
    } = this;

    const props = {
      prefixCls,
      popupClass: [overlayClass, `${prefixCls}-${theme}`],
      popupStyle: overlayStyle,
      builtinPlacements: placements,
      actions: trigger,
      popupPlacement: placement,
      popupAlign: align,
      popupTransitionName: transitionName,
      popupAnimation: animation,
      visible: popupVisible,
      getPopupContainer,
    };
    const on = {
      'on-popup-visible-change': onPopupVisibleChange,
    };

    const { overlay } = $slots;
    if (!overlay) {
      warning(false, 'You need an `overlay` slot element.');
      return null;
    }
    const overlayNode = overlay[0];
    const componentOptions = getVNodeOptions(overlayNode);

    if (componentOptions) {
      const { propsData: overlayAttrs } = componentOptions;
      componentOptions.propsData = {
        ...overlayAttrs,
        prefixCls: `${prefixCls}-menu`,
      };
    }
    const nodeData = overlayNode.data || {};
    overlayNode.data = nodeData;
    nodeData.on = { ...nodeData.on, click: onClick };
    return (
      <Trigger {...{ attrs: $attrs, props, on }}>
        <template slot="trigger">{$slots.trigger}</template>
        <template slot="popup">{overlay}</template>
      </Trigger>
    );
  },
};
