import VTable from '@suning/v-table';
import Icon from '../icon';
import FilterDropdown from './filterDropdown';
import { buildComponentName } from '../utils';
import SelectionMixin from './mixins/selection';
import PaginationMixin from './mixins/pagination';
import SortMixin from './mixins/sortable';
import FilterMixin from './mixins/filter';
import { getColKey, getRowKey, normalizeCols, normalizeRows, flatRows, isFunction } from './utils';

export default {
  name: buildComponentName('Table'),
  provide() {
    return {
      uRootVM: this,
    };
  },
  components: {
    VTable,
  },
  mixins: [SelectionMixin, PaginationMixin, SortMixin, FilterMixin],
  inheritAttrs: false,
  props: {
    ...VTable.props,
    prefixCls: {
      type: String,
      default: 'ux-table',
    },
    dropdownPrefixCls: {
      type: String,
      default: 'ux-dropdown',
    },
    columns: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    useFixedHeader: {
      type: Boolean,
      default: false,
    },
    rowSelection: {
      type: Object,
      default() {
        return undefined;
      },
    },
    size: {
      type: String,
      default: 'default',
      validate(val) {
        return ['default', 'middle', 'small'].indeOf(val) > -1;
      },
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: [Object, Boolean],
      default: false,
    },
  },
  data() {
    return {
      selectedRowKeys: [],
      innerPager: {},
      sortInfo: {},
      innerFilters: {},
    };
  },
  computed: {
    classes() {
      const { prefixCls } = this;
      return {
        [`${prefixCls}-wrapper`]: true,
      };
    },
    hasPagination() {
      return !!this.pagination;
    },
    normalizeColumns() {
      const { columns } = this;
      const cols = normalizeCols(columns);
      flatRows(cols, 'children', false).forEach((v, i) => {
        const nv = v;
        nv.$$_key = getColKey(v, i);
      });
      return cols;
    },
    flatColumns() {
      const { normalizeColumns } = this;
      return flatRows(normalizeColumns, 'children', false);
    },
    /**
     * 设置checkbox的disabled和checked状态
     */
    normalizeData() {
      const {
        rowKey, value, childColName, rowSelection = {}
      } = this;
      const { getCheckboxProps } = rowSelection;
      const data = normalizeRows(
        value,
        (v) => {
          const nv = v;
          nv.$$_checkboxDisabled = false;
          nv.$$_checkboxChecked = false;
          if (isFunction(getCheckboxProps)) {
            const { defaultChecked = false, disabled = false } = getCheckboxProps(v);
            nv.$$_checkboxDisabled = !!disabled;
            nv.$$_checkboxChecked = !!defaultChecked;
          }
          return nv;
        },
        childColName
      );
      // 所有行绑定key
      flatRows(data, childColName, false).forEach((v, i) => {
        const nv = v;
        nv.$$_key = getRowKey(rowKey, v, i);
      });

      return data;
    },
    isAnyColumnsLeftFixed() {
      const { normalizeColumns } = this;
      const leftColumns = normalizeColumns.filter(v => v.fixed === 'left' || v.fixed === true);
      return leftColumns.length > 0;
    },
    flatData() {
      const { childColName, normalizeData } = this;
      return flatRows(normalizeData, childColName, false);
    },
    filterAndSortData() {
      const {
        normalizeData, sortData, flatColumns, innerFilters
      } = this;
      let filterData = normalizeData;

      // 排序
      filterData = sortData(filterData);

      // 筛选
      const filterKeys = Object.keys(innerFilters);
      if (filterKeys.length > 0) {
        const filterCols = flatColumns.filter(col => filterKeys.indexOf(col.$$_key) > -1);
        filterData = filterCols.reduce((r, col) => {
          const { onFilter } = col;
          const filteredVal = innerFilters[col.$$_key] || [];
          return isFunction(onFilter) && filteredVal.length
            ? r.filter(record => filteredVal.some(v => onFilter(v, record, col)))
            : r;
        }, filterData);
      }
      return filterData;
    },
    pagerNormalizeData() {
      const { filterAndSortData, hasPagination, innerPager } = this;
      let pagerData = filterAndSortData;

      // 分页
      if (hasPagination) {
        const { current, pageSize } = innerPager;
        pagerData = pagerData.slice((current - 1) * pageSize, current * pageSize);
      }

      return pagerData;
    },
    pagerFlatData() {
      const { childColName, pagerNormalizeData } = this;
      return flatRows(pagerNormalizeData, childColName, false);
    },
    changeablePagerFlatData() {
      return this.pagerFlatData.filter(v => !v.$$_checkboxDisabled);
    },
    bindProps() {
      const {
        $props,
        renderRowSelection,
        renderSortAndFilter,
        pagerNormalizeData,
        expandIconColIndex,
      } = this;
      let cols = renderRowSelection();
      const iconColIdx = Math.max(
        Math.min(
          cols[0].key === 'selection-column' ? expandIconColIndex + 1 : expandIconColIndex,
          cols.length - 1
        ),
        0
      );
      cols = renderSortAndFilter(cols);
      return {
        ...$props,
        columns: cols,
        value: pagerNormalizeData,
        expandIconColIndex: iconColIdx,
      };
    },
    defaultSelectedRowKeys() {
      const { flatData } = this;
      return flatData.filter(v => v.$$_checkboxChecked).map(v => v.$$_key);
    },
  },
  watch: {
    columns(nVal) {
      if (nVal) {
        this.initSortInfo();
        this.initFilters();
      }
    },
    filterAndSortData(nVal) {
      if (nVal) {
        const { hasPagination, setInnerPager, innerPager } = this;
        if (hasPagination) {
          setInnerPager({ ...innerPager, total: nVal.length });
        }
      }
    },
    'rowSelection.selectedRowKeys': function selectionW(nVal) {
      if (nVal) {
        this.initSelectedRowkeys();
      }
    },
    pagination(nVal) {
      if (nVal) {
        this.initPager();
      }
    },
  },
  created() {
    this.initSelectedRowkeys();
    this.initPager();
    this.initSortInfo(true);
    this.initFilters();
  },
  methods: {
    getPopupContainer() {
      return this.$el;
    },
    initSelectedRowkeys() {
      const {
        rowSelection = {},
        addSelectedRowKeys,
        setSelectedRowKeys,
        defaultSelectedRowKeys,
      } = this;
      const { selectedRowKeys = [], type } = rowSelection;
      let keys = addSelectedRowKeys(
        [...selectedRowKeys.map(v => String(v))],
        defaultSelectedRowKeys
      );
      if (type === 'radio' && keys.length > 0) {
        keys = [keys[0]];
      }
      setSelectedRowKeys(keys);
    },
    addSelectedRowKeys(selectedKeys = [], keys = []) {
      for (let i = 0, l = keys.length; i < l; i += 1) {
        const key = keys[i];
        if (selectedKeys.indexOf(key) === -1) {
          selectedKeys.push(key);
        }
      }
      return selectedKeys;
    },
    setSelectedRowKeys(keys) {
      this.selectedRowKeys = keys;
    },
    getScopedSlots() {
      const { $scopedSlots } = this;

      const scopedSlots = {};
      if ($scopedSlots.title) {
        scopedSlots.title = props => $scopedSlots.title(props);
      }

      if ($scopedSlots.footer) {
        scopedSlots.footer = props => $scopedSlots.footer(props);
      }

      return scopedSlots;
    },
    onPagerOrFiterOrSortChange() {
      const { innerPager, innerFilters, sortInfo: { column: sortColumn, order: sortOrder } } = this;
      const pager = { ...innerPager };
      delete pager.on;
      let sort = {};
      if (sortColumn && sortOrder) {
        sort = {
          column: sortColumn,
          order: sortOrder,
          field: sortColumn.dataIndex,
          columnKey: sortColumn.$$_key,
        };
      }
      this.$emit('change', [pager, { ...innerFilters }, sort]);
    },
    renderSortAndFilter(cols) {
      const {
        prefixCls,
        dropdownPrefixCls,
        isSortColumn,
        toggleOrder,
        sortInfo: { order },
        innerFilters,
        getPopupContainer,
        onFilterDropdownConfirm,
      } = this;
      return flatRows(cols, 'children', false).map((col) => {
        const nv = { ...col };
        const { filters, sorter } = nv;
        let [sortButton, filterDropdown] = [null, null];
        if (!nv.children && ((Array.isArray(filters) && filters.length > 0) || nv.filterDropdown)) {
          const selectedKeys = innerFilters[nv.$$_key] || [];
          filterDropdown = (
            <FilterDropdown
              dropdownPrefixCls={dropdownPrefixCls}
              column={nv}
              selectedKeys={selectedKeys}
              getPopupContainer={getPopupContainer}
              on-confirm-filter={onFilterDropdownConfirm}
            />
          );
        }
        if (sorter) {
          const isSortCol = isSortColumn(nv);
          let [isAscend, isDescend] = [false, false];
          if (isSortCol) {
            const clz = { [`${prefixCls}-column-sort`]: true };
            nv.className = nv.className ? [nv.className, clz] : clz;
            isAscend = order === 'ascend';
            isDescend = order === 'descend';
          }

          sortButton = (
            <div class={`${prefixCls}-column-sorter`}>
              <span
                class={`${prefixCls}-column-sorter-up ${isAscend ? 'on' : 'off'}`}
                title="↑"
                on-click={() => {
                  toggleOrder(nv, 'ascend');
                }}
              >
                <Icon type="caret_up" />
              </span>
              <span
                class={`${prefixCls}-column-sorter-down ${isDescend ? 'on' : 'off'}`}
                title="↓"
                on-click={() => {
                  toggleOrder(nv, 'descend');
                }}
              >
                <Icon type="caret_down" />
              </span>
            </div>
          );
        }
        const originTitle = nv.title;
        nv.title = () => (
          <span>
            {originTitle}
            {sortButton}
            {filterDropdown}
          </span>
        );
        if (sortButton || filterDropdown) {
          const filterClz = `${prefixCls}-column-has-filters`;
          nv.className = nv.className ? [nv.className, filterClz] : filterClz;
        }
        return nv;
      });
    },
    renderTable() {
      const {
        $attrs, bindProps, $listeners, $slots, getScopedSlots
      } = this;

      const scopedSlots = getScopedSlots();
      return (
        <v-table
          {...{
            scopedSlots,
            attrs: $attrs,
            props: bindProps,
            on: $listeners,
          }}
        >
          <template slot="title">{$slots.title}</template>
          <template slot="empty">{$slots.empty}</template>
          <template slot="footer">{$slots.footer}</template>
        </v-table>
      );
    },
  },
  render() {
    const { classes, renderTable, renderPagination } = this;
    const table = renderTable();
    const pagination = renderPagination();
    return (
      <div class={classes}>
        {table}
        {pagination}
      </div>
    );
  },
};
