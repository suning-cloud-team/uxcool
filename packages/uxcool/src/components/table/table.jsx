import VTable from '@suning/v-table';
import { buildComponentName } from '../utils';
import SelectMixin from './mixins/selection';
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
  mixins: [SelectMixin],
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
    footer: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectedRowKeys: [],
    };
  },
  computed: {
    classes() {
      const { prefixCls } = this;
      return {
        [`${prefixCls}-wrapper`]: true,
      };
    },
    normalizeColumns() {
      return [...this.columns];
    },
    /**
     * 获取checkbox的disabled和checked状态
     */
    normalizeData() {
      const { value, childColName, rowSelection = {} } = this;
      const { getCheckboxProps } = rowSelection;
      return normalizeRows(
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
    },
    isAnyColumnsLeftFixed() {
      const { normalizeColumns } = this;
      const leftColumns = normalizeColumns.filter(v => v.fixed === 'left' || v.fixed === true);
      return leftColumns.length > 0;
    },
    flatData() {
      const { childColName, normalizeData, rowKey } = this;
      return flatRows(normalizeData, childColName, false).map((v, i) => {
        const nv = v;
        nv.$$_key = getRowKey(rowKey, v, i);
        return nv;
      });
    },
    changeableFlatData() {
      return this.flatData.filter(v => !v.$$_checkboxDisabled);
    },
    bindProps() {
      const {
        $props, renderRowSelection, normalizeData, expandIconColIndex
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
        value: normalizeData,
        expandIconColIndex: iconColIdx,
      };
    },
    defaultSelectedRowKeys() {
      const { flatData } = this;
      return flatData.filter(v => v.$$_checkboxChecked).map(v => v.$$_key);
    },
  },
  watch: {
    'rowSelection.selectedRowKeys': function selectionW(nVal) {
      if (nVal) {
        console.log('selectedRow', nVal);
        this.initSelectedRowkeys();
      }
    },
  },
  created() {
    this.initSelectedRowkeys();
  },
  methods: {
    initSelectedRowkeys() {
      const {
        rowSelection = {},
        addSelectedRowKeys,
        setSelectedRowKeys,
        defaultSelectedRowKeys,
      } = this;
      const keys = addSelectedRowKeys(
        [...(rowSelection.selectedRowKeys || []).map(v => String(v))],
        defaultSelectedRowKeys
      );
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
    const { classes, renderTable } = this;
    const table = renderTable();
    return <div class={classes}>{table}</div>;
  },
};
