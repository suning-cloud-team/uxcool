import { isFunction, recursiveSort } from '../utils';

export default {
  computed: {
    defaultSortColumn() {
      const { flatColumns } = this;
      return flatColumns.filter((v) => v.defaultSortOrder)[0];
    },
    sortColumns() {
      const { flatColumns } = this;
      return flatColumns.filter((v) => 'sortOrder' in v);
    },
  },
  methods: {
    isSortColumn(column) {
      const { sortInfo: { column: sortColumn } } = this;
      if (!sortColumn || !column) {
        return false;
      }

      return sortColumn.$$_key === column.$$_key;
    },
    setSortInfo(sortInfo) {
      this.sortInfo = sortInfo;
    },
    initSortInfo(useDefaultSortOrder = false) {
      const {
        defaultSortColumn, sortColumns, sortInfo, setSortInfo
      } = this;
      let sort = sortInfo;
      // 受控模式
      if (sortColumns.length > 0) {
        const col = sortColumns.filter((v) => v.sortOrder)[0] || { order: null };
        sort = {
          column: col,
          order: col.sortOrder,
        };
      } else if (useDefaultSortOrder) {
        if (defaultSortColumn) {
          sort = {
            column: defaultSortColumn,
            order: defaultSortColumn.defaultSortOrder,
          };
        }
      }
      setSortInfo(sort);
    },
    sortData(data = []) {
      const { childColName, sortInfo: { column: sortColumn, order } } = this;
      const nData = [...data];
      if (!sortColumn || !order || !isFunction(sortColumn.sorter)) {
        return nData;
      }
      const { sorter } = sortColumn;
      const sortFn = (a, b) => {
        const r = sorter(a, b);
        if (r !== 0) {
          return order === 'descend' ? -r : r;
        }
        return r;
      };
      return recursiveSort(nData, sortFn, childColName);
    },
    toggleOrder(column, order) {
      const {
        isSortColumn,
        sortInfo: { order: sortOrder },
        setSortInfo,
        onPagerOrFiterOrSortChange,
      } = this;
      let r = {
        column: null,
        order: null,
      };
      if (isSortColumn(column)) {
        if (order !== sortOrder) {
          r = {
            column,
            order,
          };
        }
      } else {
        r = {
          column,
          order,
        };
      }
      setSortInfo(r);
      onPagerOrFiterOrSortChange();
    },
  },
};
