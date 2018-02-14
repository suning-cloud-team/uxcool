export default {
  props: {
    prefixCls: {
      type: String,
      default: 'v-dialog',
    },
    value: Boolean,
    maskTransitionName: String,
    maskAnimation: String,
    maskStyle: Object,
    maskClosable: {
      type: Boolean,
      default: true,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    transitionName: String,
    animation: String,
    closable: {
      type: Boolean,
      default: true,
    },
    mousePosition: Object,
    dialogStyle: Object,
    dialogClass: [String, Array, Object],
    wrapStyle: Object,
    wrapClass: [String, Array, Object],
    bodyStyle: Object,
    width: String,
    height: String,
    zIndex: [Number, String],
    destroyOnClose: Boolean,
    theme: {
      type: String,
      default: 'light',
    },
  },
};
