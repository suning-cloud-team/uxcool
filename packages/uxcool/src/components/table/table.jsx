import VTable from '@suning/v-table';
import { buildComponentName } from '../utils';
import SelectionMixin from './mixins/selection';
import PaginationMixin from './mixins/pagination';
import { getRowKey, normalizeRows, flatRows, isFunction } from './utils';

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
  mixins: [SelectionMixin, PaginationMixin],
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
      return [...this.columns];
    },
    /**
     * 获取checkbox的disabled和checked状态
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
    pagerNormalizeData() {
      const { normalizeData, hasPagination, innerPager } = this;
      let pagerData = normalizeData;
      if (hasPagination) {
        const { current, pageSize } = innerPager;
        pagerData = normalizeData.slice((current - 1) * pageSize, current * pageSize);
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
        $props, renderRowSelection, pagerNormalizeData, expandIconColIndex
      } = this;
      const cols = renderRowSelection();
      const iconColIdx = Math.max(
        Math.min(
          cols[0].key === 'selection-column' ? expandIconColIndex + 1 : expandIconColIndex,
          cols.length - 1
        ),
        0
      );
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
    value(nVal) {
      if (nVal) {
        const { setInnerPager, innerPager } = this;
        setInnerPager({ ...innerPager, total: nVal.length });
      }
    },
    'rowSelection.selectedRowKeys': function selectionW(nVal) {
      if (nVal) {
        this.initSelectedRowkeys();
      }
    },
    pagination() {
      console.log('before', this.innerPager.current);
      this.initPager();
      console.log('after', this.innerPager.current);
    },
  },
  created() {
    this.initSelectedRowkeys();
    this.initPager();
  },
  methods: {
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
      const { innerPager } = this;
      const pager = { ...innerPager };
      delete pager.on;
      this.$emit('change', [pager]);
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
