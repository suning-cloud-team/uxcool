import Trigger from '@suning/v-trigger';
import placements from './placements';

export default {
  name: 'Dropdown',
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
  },
  computed: {
    popupVisible() {
      return this.value;
    },
  },
  methods: {
    onPopupVisibleChange() {},
  },
  render() {
    const {
      $slots,
      prefixCls,
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
    } = this;

    const props = {
      prefixCls,
      popupClass: overlayClass,
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

    const overlayNode = overlay[0];
    // const { class: className } = overlayNode.data;
    // overlayNode.data.class = { ...className, [`${prefixCls}-trigger`]: true };
    const { propsData: overlayAttrs } = overlayNode.componentOptions;
    overlayNode.componentOptions.propsData = {
      ...overlayAttrs,
      prefixCls: `${prefixCls}-menu`,
      mode: 'vertical',
    };

    return (
      <Trigger {...{ props, on }}>
        <template slot="trigger">{$slots.trigger}</template>
        <template slot="popup">{overlay}</template>
      </Trigger>
    );
  },
};
