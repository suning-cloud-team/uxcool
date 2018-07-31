export default {
  inject: {
    treeSelectRoot: {
      default: false,
    },
  },
  computed: {
    isChildren() {
      return !!this.treeSelectRoot;
    },
    rootPrefixCls() {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.prefixCls : '';
    },
    rootSize() {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.size : '';
    },
    rootDisabled() {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.disabled : false;
    },
    rootTriggerRef() {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.triggerRef : false;
    },
    rootInnerVisible() {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.innerVisible : false;
    },
    rootSelectionValue() {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.selectionValue : [];
    },
    rootAllowClear() {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.allowClear : [];
    },
    rootClearDisabled() {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.clearDisabled : true;
    },
    rootIsMultiple() {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.isMultiple : false;
    },
    rootTreeCheckable() {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.treeCheckable : false;
    },
    rootSearchInputValue() {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.searchInputValue : false;
    },
    rootSearchPlaceholder() {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.searchPlaceholder : false;
    },
  },
  methods: {
    onSelectorClear(e) {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.onClear(e) : false;
    },
    onSearchInput(e, value) {
      const { isChildren, treeSelectRoot } = this;
      return isChildren ? treeSelectRoot.setSearchInputValue(value) : false;
    },
  },
};
