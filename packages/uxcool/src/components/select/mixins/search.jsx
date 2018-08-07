import { isFunction } from '@suning/v-utils';
import { DefaultFilterOption, recursiveSearch } from '../utils';

export default {
  methods: {
    setSearchInputValue(value, trigger = true, changeVisible = true) {
      const {
        isCombobox,
        innerVisible,
        searchInputValue,
        setInnerValue,
        setInnerVisible,
        forceUpdateTriggerAlign,
      } = this;
      this.searchInputValue = value;
      if (!innerVisible && changeVisible) {
        setInnerVisible(true);
      }
      if (trigger) {
        this.$emit('search', value);
      }
      if (searchInputValue !== value) {
        forceUpdateTriggerAlign();
      }

      if (isCombobox && trigger) {
        setInnerValue(value);
      }
    },
    clearSearchInputValue() {
      const { setSearchInputValue, filterOption } = this;
      setSearchInputValue('', filterOption !== false, false);
    },
    searchFilterOptions(options = []) {
      const { searchInputValue, optionFilterProp, filterOption } = this;
      if (!searchInputValue || filterOption === false) {
        return options;
      }
      const filterFn = isFunction(filterOption)
        ? filterOption
        : DefaultFilterOption(optionFilterProp);
      return recursiveSearch(options, searchInputValue, filterFn);
    },
  },
};
