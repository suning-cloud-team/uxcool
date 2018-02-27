import VTable from '@suning/v-table';
import { buildComponentName } from '../utils';
import SelectMixin from './mixins/selection';
import { normalizeRows, flatRows, isFunction } from './utils';

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
        return null;
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
      const { value, childColName, rowSelection } = this;
      const { getCheckboxProps } = rowSelection || {};
      console.log('value', value);
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
      const { childColName, normalizeData } = this;
      return flatRows(normalizeData, childColName);
    },
    bindProps() {
      const { $props, renderRowSelection, normalizeData } = this;
      const cols = renderRowSelection();
      return { ...$props, columns: cols, value: normalizeData };
    },
  },
  methods: {
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
