export default {
  methods: {
    getTagsFilterOptions(options = []) {
      const { optionMap, innerValue, searchInputValue } = this;
      const nOptionMap = { ...optionMap };
      const tagsOptions = [...options];
      const extraOptions = innerValue
        .filter(v => !(v in nOptionMap) && (!searchInputValue || String(v).indexOf(searchInputValue) > -1))
        .map((v) => {
          // 只需要标示有这个值即可
          nOptionMap[v] = 1;
          return { value: v, label: v, content: v };
      });
      tagsOptions.push(...extraOptions);
      if (searchInputValue && !(searchInputValue in nOptionMap)) {
        tagsOptions.unshift({
          value: searchInputValue,
          label: searchInputValue,
          content: searchInputValue,
        });
      }

      return tagsOptions;
    },
  },
};
