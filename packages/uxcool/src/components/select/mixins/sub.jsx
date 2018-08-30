export default {
  inject: {
    selectNRoot: {
      default: false,
    },
  },
  computed: {
    isChildren() {
      return !!this.selectNRoot;
    },
    rootPrefixCls() {
      const { selectNRoot, isChildren } = this;
      return isChildren ? selectNRoot.prefixCls : '';
    },
    rootSize() {
      const { selectNRoot, isChildren } = this;
      return isChildren ? selectNRoot.size : '';
    },
    rootInnerVisible() {
      const { selectNRoot, isChildren } = this;
      return isChildren ? selectNRoot.innerVisible : false;
    },
    rootDisabled() {
      const { selectNRoot, isChildren } = this;
      return isChildren ? selectNRoot.disabled : false;
    },
    rootAllowClear() {
      const { selectNRoot, isChildren } = this;
      return isChildren ? selectNRoot.allowClear : false;
    },
    rootIsCombobox() {
      const { selectNRoot, isChildren } = this;
      return isChildren ? selectNRoot.isCombobox : false;
    },
    rootIsMultiple() {
      const { selectNRoot, isChildren } = this;
      return isChildren ? selectNRoot.isMultipleOrTags : false;
    },
    rootSearchInputValue() {
      const { selectNRoot, isChildren } = this;
      return isChildren ? selectNRoot.searchInputValue : false;
    },
    rootClearDisabled() {
      const { selectNRoot, isChildren } = this;
      return isChildren ? selectNRoot.clearDisabled : true;
    },
    rootTokenSeparators() {
      const { selectNRoot, isChildren } = this;
      return isChildren ? selectNRoot.tokenSeparators : [];
    },
    rootGetInputElement() {
      const { selectNRoot, isChildren } = this;
      return isChildren ? selectNRoot.getInputElement : null;
    },
  },
  methods: {
    onTokenSeparator(value) {
      const { isChildren, selectNRoot } = this;
      return isChildren ? selectNRoot.onTokenSeparator(value) : false;
    },
    onSearchInput(e, value) {
      const { isChildren, selectNRoot } = this;
      return isChildren ? selectNRoot.setSearchInputValue(value) : false;
    },
    onSelectorClear(e) {
      const { isChildren, selectNRoot } = this;
      return isChildren ? selectNRoot.onClear(e) : false;
    },
  },
};
