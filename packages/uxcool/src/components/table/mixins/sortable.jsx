import { isFunction, recursiveSort } from '../utils';

export default {
  computed: {
    defaultSortColumn() {
      const { flatColumns } = this;
      return flatColumns.filter(v => v.defaultSortOrder)[0];
    },
    sortColumns() {
      const { flatColumns } = this;
      return flatColumns.filter(v => 'sortOrder' in v && v.sortOrder);
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
      const { defaultSortColumn, sortColumns, setSortInfo } = this;
      let sort = {
        column: null,
        order: null,
      };
      if (sortColumns.length > 0) {
        const col = sortColumns[0];
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
