export default {
  model: {
    prop: 'visible',
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ux-drawer',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'left',
      validator(val) {
        return ['top', 'left', 'right', 'bottom'].indexOf(val) > -1;
      },
    },
    getContainer: {
      type: Function,
      default: null,
    },
    level: {
      type: [String, Array],
      default: 'all',
    },
    // duration: {
    //   type: String,
    //   default: '.3s',
    // },
    // ease: {
    //   type: String,
    //   default: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    // },
    handler: {
      type: [Boolean, Function],
      default: false,
    },
    showMask: {
      type: Boolean,
      default: true,
    },
    maskStyle: {
      type: Object,
      default: null,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    wrapperClass: {
      type: [String, Object, Array],
      default: '',
    },
    width: {
      type: [String, Number],
      default: '',
    },
    height: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      innerVisible: false,
    };
  },
};
