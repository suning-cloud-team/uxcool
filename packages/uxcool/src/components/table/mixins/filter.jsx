import { isFunction } from '@suning/v-utils';

export default {
  computed: {
    filteredValueColumns() {
      const { flatColumns } = this;
      // 只支持最下层的列,及没有下级且有filterValue的列
      return flatColumns.filter(v => !v.children && 'filteredValue' in v);
    },
  },
  methods: {
    setFilters(filters) {
      this.innerFilters = filters;
    },
    initFilters() {
      const { filteredValueColumns, innerFilters, setFilters } = this;

      const nFilters = filteredValueColumns.reduce(
        (r, v) => {
          const nr = r;
          const val = v.filteredValue;
          if (val) {
            nr[v.$$_key] = Array.isArray(val) ? val : [val];
          } else {
            nr[v.$$_key] = null;
          }
          return nr;
        },
        { ...innerFilters }
      );
      setFilters(nFilters);
    },
    onFilterDropdownConfirm(column, selectedKeys) {
      const {
        pagination,
        hasPagination,
        innerFilters,
        innerPager,
        setFilters,
        onPagerOrFiterOrSortChange,
      } = this;
      const nFilters = { ...innerFilters, [column.$$_key]: selectedKeys };
      if (hasPagination) {
        // 重置当前页码
        innerPager.current = 1;
        if (isFunction(pagination.onChange)) {
          pagination.onChange(innerPager.current, innerPager.pageSize);
        }
      }
      setFilters(nFilters);
      onPagerOrFiterOrSortChange();
    },
  },
};
