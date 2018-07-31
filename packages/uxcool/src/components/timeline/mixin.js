export default {
  inject: {
    timelineRoot: {
      default: false,
    },
  },
  computed: {
    isChildren() {
      return !!this.timelineRoot;
    },
    rootPrefixCls() {
      const { isChildren, timelineRoot } = this;
      return isChildren ? timelineRoot.prefixCls : '';
    },
  },
};
