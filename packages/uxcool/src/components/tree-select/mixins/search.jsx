export default {
  data() {
    return {
      isFilterNotFound: false,
    };
  },
  methods: {
    onSearch() {
      const { $refs: { treeRef }, searchInputValue } = this;
      if (treeRef) {
        const filterNodes = treeRef.filter(searchInputValue);
        this.isFilterNotFound = searchInputValue && filterNodes.length === 0;
      }
    },
    setSearchInputValue(value, trigger = true, changeVisible = true) {
      const {
        onSearch,
        innerVisible,
        setInnerVisible,
        searchInputValue,
        forceUpdateTriggerAlign,
      } = this;
      this.searchInputValue = value;
      if (!innerVisible && changeVisible) {
        setInnerVisible(true);
      }
      onSearch(value);
      if (trigger) {
        this.$emit('search', value);
      }
      if (searchInputValue !== value) {
        forceUpdateTriggerAlign();
      }
    },
    clearSearchInputValue(checkAutoClear = true) {
      const { autoClearSearchValue, setSearchInputValue } = this;

      if (checkAutoClear && !autoClearSearchValue) {
        return;
      }
      setSearchInputValue('', true, false);
    },
    renderNotFound() {
      const { prefixCls, isFilterNotFound, notFoundContent } = this;
      return isFilterNotFound ? (
        <span class={`${prefixCls}-not-found`}>{notFoundContent}</span>
      ) : null;
    },
  },
};
