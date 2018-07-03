export default {
  inject: {
    listRoot: {
      default: false,
    },
  },
  computed: {
    isChildren() {
      return !!this.listRoot;
    },
    rootPrefixCls() {
      const { isChildren, listRoot } = this;
      return isChildren ? listRoot.prefixCls : '';
    },
  },
};
