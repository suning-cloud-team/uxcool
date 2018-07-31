export default {
  inject: ['collapseRoot'],
  computed: {
    isChildren() {
      return !!this.collapseRoot;
    },
    rootPrefixCls() {
      const { isChildren, collapseRoot } = this;
      return isChildren ? collapseRoot.prefixCls : '';
    },
    rootActiveKeys() {
      const { isChildren, collapseRoot } = this;
      return isChildren ? collapseRoot.innerActiveKeys : [];
    },
    rootAccordion() {
      const { isChildren, collapseRoot } = this;
      return isChildren ? collapseRoot.accordion : false;
    },
    rootDestroyInactivePanel() {
      const { isChildren, collapseRoot } = this;
      return isChildren ? collapseRoot.destroyInactivePanel : false;
    },
  },
  methods: {
    onRootHeaderClick(key, e) {
      const { isChildren, collapseRoot } = this;
      if (isChildren) {
        collapseRoot.onHeaderClick(key, e);
      }
    },
  },
};
