import ExpandIcon from '../expandIcon.vue';

export default {
  components: {
    ExpandIcon,
  },
  props: {
    needExpand: {
      type: Boolean,
      default: true,
    },
    needIndentSpaced: {
      type: Boolean,
      default: false,
    },
    ancestorKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    expandRow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isExpanded() {
      const { expanderRowKeys, uid } = this;
      return expanderRowKeys.indexOf(uid) > -1;
    },
    isCanExpandRow() {
      const { record, expandedRowRender, childColName } = this;
      // record.children -> record[childColName] 2019/7/25 by xql
      // 这个判断条件感觉不够完整，少了slot="expand"这种场景
      return !!(record[childColName] && record[childColName].length) || !!expandedRowRender;
    },
    visible() {
      const { expanderRowKeys, ancestorKeys } = this;
      return ancestorKeys.length === 0 || ancestorKeys.every(v => expanderRowKeys.indexOf(v) > -1);
    },
  },
  beforeDestroy() {
    this.handleExpandChange(null, false);
  },
  methods: {
    hasExpandIcon(colIdx) {
      const {
        fixed, expandIconAsCell, expandIconColIndex, hideExpandTreeIcon
      } = this;
      const isExpandIcon = fixed !== 'right' && !expandIconAsCell && !hideExpandTreeIcon;
      return isExpandIcon && String(colIdx) === String(expandIconColIndex);
    },
    handleExpandChange(e, expanded) {
      const {
        uid, isCanExpandRow, record, rowIdx
      } = this;
      if (isCanExpandRow) {
        this.rootVM.handleExpandChange(e, expanded, record, rowIdx, uid);
      }
    },
    renderExpandIcon() {
      const {
        rowPrefixCls,
        isExpanded,
        needIndentSpaced,
        isCanExpandRow,
        handleExpandChange,
      } = this;
      return (
        <ExpandIcon
          iconPrefixCls={rowPrefixCls}
          isExpanded={isExpanded}
          isCanExpandRow={isCanExpandRow}
          needIndentSpaced={needIndentSpaced}
          on-expand={handleExpandChange}
        />
      );
    },
    renderExpandIconAsCell() {
      const { rowPrefixCls, expandIconAsCell, renderExpandIcon } = this;
      if (expandIconAsCell) {
        return <td class={`${rowPrefixCls}-expand-icon-cell`}>{renderExpandIcon()}</td>;
      }
      return null;
    },
  },
};
