import VTable from '@suning/v-table';
import Icon from '../icon';
import Spin from '../spin';
import FilterDropdown from './filterDropdown';
import { buildComponentName } from '../utils';
import SelectionMixin from './mixins/selection';
import PaginationMixin from './mixins/pagination';
import SortMixin from './mixins/sortable';
import FilterMixin from './mixins/filter';
import ApiMixin from './mixins/api';
import {
  getColKey, getRowKey, normalizeCols, normalizeRows, flatRows, isFunction
} from './utils';

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
  mixins: [SelectionMixin, PaginationMixin, SortMixin, FilterMixin, ApiMixin],
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
    rowSelection: {
      type: Object,
      default() {
        return undefined;
      },
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'middle', 'small'].indexOf(val) > -1;
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
    loading: {
      type: [Object, Boolean],
      default: false,
    },
    expandIconAsCell: {
      type: Boolean,
      default: null,
    },
    theme: {
      type: String,
      default: 'light',
      validator(val) {
        return ['light', 'dark'].indexOf(val) > -1;
      },
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
      const { prefixCls, theme } = this;
      return {
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-${theme}`]: true,
      };
    },
    hasRowSelection() {
      return !!this.rowSelection;
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
    // TODO: 目前的table实现都是通过计算属性渲染的，而拖拽等操作需要组件层面修改用于渲染的属性。
    // 为了减少新增功能影响范围，新添加一个属性用于保存原始配置映射，直接修改原始数据，
    // 后期需要在data中添加一个原始数据的深拷贝变量，所有的操作及数据渲染都基于这个变量，而不是原始数据
    columnMap() {
      const { columns, childColName } = this;
      const originCols = normalizeCols(columns, null, childColName, false);
      const flatCols = flatRows(originCols, childColName, false);
      const map = flatCols.reduce((prev, cur, i) => {
        const key = getColKey(cur, i);
        const result = prev;
        result[key] = cur;
        return result;
      }, {});

      return map;
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
          nv.$$_selected = false;
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
      const leftColumns = normalizeColumns.filter((v) => v.fixed === 'left' || v.fixed === true);
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
        const filterCols = flatColumns.filter((col) => filterKeys.indexOf(col.$$_key) > -1);
        filterData = filterCols.reduce((r, col) => {
          const { onFilter } = col;
          const filteredVal = innerFilters[col.$$_key] || [];
          return isFunction(onFilter) && filteredVal.length
            ? r.filter((record) => filteredVal.some((v) => onFilter(v, record, col)))
            : r;
        }, filterData);
      }
      return filterData;
    },
    pagerNormalizeData() {
      const {
        filterAndSortData,
        hasPagination,
        innerPager: { current, pageSize },
        hasRowSelection,
        selectedRowKeys,
      } = this;
      let pagerData = filterAndSortData;

      if (hasRowSelection) {
        // 确定数据行是否选中
        pagerData = pagerData.map((v) => {
          const nv = v;
          if (selectedRowKeys.indexOf(v.$$_key) > -1) {
            nv.$$_selected = true;
          } else {
            nv.$$_selected = false;
          }
          return nv;
        });
      }

      // 分页
      // pagerData.length > pageSize 服务端分页后,前端不再切分数据
      if (hasPagination && pagerData.length > pageSize) {
        pagerData = pagerData.slice((current - 1) * pageSize, current * pageSize);
      }

      return pagerData;
    },
    pagerFlatData() {
      const { childColName, pagerNormalizeData } = this;
      return flatRows(pagerNormalizeData, childColName, false);
    },
    changeablePagerFlatData() {
      return this.pagerFlatData.filter((v) => !v.$$_checkboxDisabled);
    },
    tableClasses() {
      const {
        prefixCls, size, bordered, pagerNormalizeData, hideHeader
      } = this;
      return {
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-bordered`]: bordered,
        [`${prefixCls}-empty`]: pagerNormalizeData.length === 0,
        [`${prefixCls}-without-column-header`]: hideHeader,
      };
    },
    bindProps() {
      const {
        $props,
        renderRowSelection,
        renderSortAndFilter,
        pagerNormalizeData,
        expandIconColIndex,
        expandIconAsCell,
        expandedRowRender,
        spinLoading,
        emptyText,
      } = this;
      let cols = renderRowSelection();

      const iconColIdx = cols.length > 0
        ? Math.max(
          Math.min(
            cols[0].key === 'selection-column' ? expandIconColIndex + 1 : expandIconColIndex,
            cols.length - 1
          ),
          0
        )
        : expandIconColIndex;

      cols = renderSortAndFilter(cols);
      return {
        ...$props,
        columns: cols,
        value: pagerNormalizeData,
        expandIconColIndex: iconColIdx,
        expandIconAsCell: !!expandedRowRender && expandIconAsCell !== false,
        emptyText: spinLoading.spinning ? '' : emptyText,
      };
    },
    defaultSelectedRowKeys() {
      const { flatData } = this;
      return flatData.filter((v) => v.$$_checkboxChecked).map((v) => v.$$_key);
    },
    spinLoading() {
      const { loading } = this;
      let ret = loading;
      if (typeof loading === 'boolean') {
        ret = {
          spinning: loading,
        };
      }
      return ret;
    },
    spinClasses() {
      const {
        prefixCls, spinLoading, hasPagination, normalizeData
      } = this;
      const spinPagerClass = hasPagination && normalizeData.length > 0
        ? `${prefixCls}-with-pagination`
        : `${prefixCls}-without-pagination`;

      return spinLoading.spinning
        ? {
          [spinPagerClass]: true,
          [`${prefixCls}-spin-holder`]: true,
        }
        : '';
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
        const {
          hasPagination, pagination, normalizeData, setInnerPager, innerPager
        } = this;
        if (hasPagination) {
          // 当用户筛选数据时
          if (normalizeData.length !== nVal.length) {
            setInnerPager({ ...innerPager, total: nVal.length });
          } else if (typeof pagination !== 'boolean' && typeof pagination.total === 'number') {
            // 当用户设置了total属性, 重置时以用户设置的为准
            setInnerPager({ ...innerPager, total: pagination.total });
          } else {
            setInnerPager({ ...innerPager, total: nVal.length });
          }
        }
      }
    },
    'rowSelection.selectedRowKeys': function selectionW(nVal) {
      if (nVal) {
        this.initSelectedRowkeys();
      }
    },
    pagination: {
      handler(nVal) {
        if (nVal) {
          this.initPager();
        }
      },
      deep: true,
    },
  },
  created() {
    this.initSelectedRowkeys(true);
    this.initPager();
    this.initSortInfo(true);
    this.initFilters();
  },
  methods: {
    getPopupContainer() {
      return this.$el;
    },
    initSelectedRowkeys(init = false) {
      const {
        rowSelection = {},
        addSelectedRowKeys,
        setSelectedRowKeys,
        defaultSelectedRowKeys,
      } = this;
      const { selectedRowKeys = [], type } = rowSelection;
      let keys = selectedRowKeys.map((v) => String(v));
      if (init) {
        keys = addSelectedRowKeys(keys, defaultSelectedRowKeys);
      }
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

      const scopedSlots = { ...$scopedSlots };
      if ($scopedSlots.title) {
        scopedSlots.title = (props) => $scopedSlots.title(props);
      }

      if ($scopedSlots.footer) {
        scopedSlots.footer = (props) => $scopedSlots.footer(props);
      }

      return scopedSlots;
    },
    onPagerOrFiterOrSortChange() {
      const {
        innerPager,
        innerFilters,
        sortInfo: { column: sortColumn, order: sortOrder },
      } = this;
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
      this.$emit('change', pager, { ...innerFilters }, sort);
    },
    onColWidthResize(newWidth, oldWidth, col, event) {
      const { columnMap } = this;
      const column = columnMap[col.$$_key];
      if (column) {
        // FIXME: 目前的实现只能直接修改原始数据才能实现宽度变化
        column.width = newWidth;
      }
      // 将列副本传出去
      this.$emit('column-width-resize', newWidth, oldWidth, column ? { ...column } : null, event);
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
      return normalizeCols(
        cols,
        (col) => {
          const nv = col;
          const { filters, sorter, title } = nv;
          let [sortButton, filterDropdown] = [null, null];
          const isCanFilter = (Array.isArray(filters) && filters.length > 0) || nv.filterDropdown;
          // 只支持最内层元素过滤
          if (!nv.children && isCanFilter) {
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

          // http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/237
          if (isFunction(title)) {
            nv.title = title(this.$createElement);
          }

          if (sortButton || filterDropdown) {
            nv.title = (
              <span>
                {nv.title}
                {sortButton}
                {filterDropdown}
              </span>
            );
            const filterClz = `${prefixCls}-column-has-filters`;
            nv.className = nv.className ? [nv.className, filterClz] : filterClz;
          }
          return nv;
        },
        'children',
        true
      );
    },
    renderTable() {
      const {
        $attrs,
        tableClasses,
        bindProps,
        $listeners,
        $slots,
        getScopedSlots,
        onColWidthResize,
      } = this;

      const scopedSlots = getScopedSlots();
      const on = { ...$listeners, 'column-width-resize': onColWidthResize };

      return (
        <v-table
          class={tableClasses}
          {...{
            scopedSlots,
            attrs: $attrs,
            props: bindProps,
            on,
            ref: 'tableRef',
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
    const {
      prefixCls, classes, spinClasses, spinLoading, renderTable, renderPagination
    } = this;
    const table = renderTable();
    const topPager = renderPagination('top');
    const bottomPager = renderPagination('bottom');
    const props = { ...spinLoading, spinClass: [spinLoading.spinClass, spinClasses] };
    return (
      <div class={classes}>
        <Spin {...{ class: { [`${prefixCls}-loading`]: spinLoading.spinning }, props }}>
          {topPager}
          {table}
          {bottomPager}
        </Spin>
      </div>
    );
  },
};
