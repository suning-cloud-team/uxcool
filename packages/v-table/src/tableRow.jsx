import { isFunction, chainFns, getRowStyle } from './utils';
import SubMixin from './mixins/sub';
import ExpanderRowMixin from './mixins/expanderRow';
import TableCell from './tableCell';

export default {
  name: 'TableRow',
  components: {
    TableCell,
  },
  mixins: [SubMixin, ExpanderRowMixin],
  props: {
    rowPrefixCls: {
      type: String,
      default: '',
    },
    cols: {
      type: Array,
      default() {
        return [];
      },
    },
    record: {
      type: Object,
      default() {
        return {};
      },
    },
    rowIdx: {
      type: Number,
      default: -1,
    },
    uid: {
      type: String,
      default: '',
    },
    indent: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    isHover() {
      const { currentHoverRow } = this;
      return this.uid === currentHoverRow;
    },
    classes() {
      const { rowPrefixCls, isHover } = this;
      return {
        [rowPrefixCls]: true,
        [`${rowPrefixCls}-hover`]: isHover,
      };
    },
    rowStyle() {
      const { fixed, rowIdx, fixedTableHeight: { rows } } = this;
      if (!fixed || !Object.keys(rows).length) {
        return null;
      }
      return getRowStyle(rowIdx, rows);
    },
    expandRowStyle() {
      const { fixed, uid, fixedTableHeight: { expandRows } } = this;

      if (!fixed || !Object.keys(expandRows).length) {
        return null;
      }

      return getRowStyle(uid, expandRows);
    },
  },
  watch: {
    visible(nVal, oVal) {
      if (nVal && nVal !== oVal) {
        this.$nextTick().then(() => {
          this.updateExpandRowsHeight();
        });
      }
    },
  },
  methods: {
    updateExpandRowsHeight() {
      const {
        fixed, expandRow, uid, rowIdx, fixedTableHeight: { expandRows, rows }
      } = this;
      if (!fixed) {
        const height = this.$el.getBoundingClientRect().height || 'auto';
        if (expandRow) {
          expandRows[uid] = height;
        } else {
          rows[rowIdx] = height;
        }
      }
    },
    onClick(e) {
      const { isExpanded, handleExpandChange } = this;
      handleExpandChange(e, !isExpanded);
    },
    handleRowHover(row) {
      this.rootVM.handleRowHover(row);
    },
    onMouseEnter() {
      this.handleRowHover(this.uid);
    },
    onMouseLeave() {
      this.handleRowHover(null);
    },
    renderCells() {
      const {
        rowPrefixCls,
        fixed,
        record,
        cols,
        rowIdx,
        indent,
        hasExpandIcon,
        renderExpandIcon,
        needExpand,
        expandRow,
      } = this;
      return cols.map((col, i) => (
        <table-cell
          rowPrefixCls={rowPrefixCls}
          fixed={fixed}
          record={record}
          rowIdx={rowIdx}
          colIdx={i}
          column={col}
          indent={indent}
          expand-icon={
            (indent !== 0 || needExpand) && !expandRow && hasExpandIcon(i) && renderExpandIcon()
          }
        />
      ));
    },
    reBindRowEvents(on = {}) {
      const {
        expandRowByClick,
        expandRow,
        isAnyColumnsFixed,
        record,
        rowIdx,
        onClick,
        onMouseEnter,
        onMouseLeave,
      } = this;
      const nOn = on;
      if (!('mouseenter' in nOn)) {
        nOn.mouseenter = null;
      }
      if (!('mouseleave' in nOn)) {
        nOn.mouseleave = null;
      }

      if (expandRowByClick && !('click' in nOn)) {
        nOn.click = null;
      }
      return Object.keys(nOn).reduce((r, k) => {
        const nr = r;
        const originFn = nOn[k];
        let fn = null;
        if (k === 'mouseenter' || k === 'mouseleave') {
          const nFn = k === 'mouseenter' ? onMouseEnter : onMouseLeave;
          fn = chainFns(originFn, !expandRow && isAnyColumnsFixed ? nFn : null);
        } else if (k === 'click') {
          fn = chainFns(originFn, expandRowByClick ? onClick : null);
        } else {
          fn = chainFns(originFn);
        }
        if (fn) {
          nr[k] = function n(e) {
            fn.call(null, e, record, rowIdx);
          };
        }
        return nr;
      }, {});
    },
  },
  render() {
    const {
      fixed,
      visible,
      expandRow,
      classes,
      rowStyle,
      expandRowStyle,
      renderCells,
      onRow,
      record,
      rowIdx,
      reBindRowEvents,
      expandIconAsCell,
      renderExpandIconAsCell,
    } = this;

    const nRowStyle = expandRow ? expandRowStyle : rowStyle;
    let rowProps = {};

    if (!expandRow && isFunction(onRow)) {
      rowProps = { ...rowProps, ...onRow(record, rowIdx) };
    }

    const {
      className, style, on, ...otherProps
    } = rowProps;
    const events = reBindRowEvents(on);

    const cells = renderCells();

    if (fixed !== 'right' && !expandRow && expandIconAsCell) {
      cells.unshift(renderExpandIconAsCell());
    }
    return (
      <tr
        v-show={visible}
        class={[classes, className]}
        style={[style, nRowStyle]}
        {...{ attrs: otherProps, on: events }}
      >
        {cells}
      </tr>
    );
  },
};
