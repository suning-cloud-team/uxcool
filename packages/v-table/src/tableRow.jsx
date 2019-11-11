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
    isSelected() {
      return this.record.$$_selected;
    },
    // expanderRow.jsx中isCanExpandRow判断不够完整，不想动整体结构，新加一个计算属性 xql 2019/11/11
    isExpandable() {
      const { hasExpandRowRenderOrSlot, record, childColName } = this;
      return hasExpandRowRenderOrSlot || (record[childColName] && record[childColName].length > 0);
    },
    isDragOverTop() {
      const { dragPosition, dragOverRowId, uid } = this;
      return uid === dragOverRowId && dragPosition === 'top';
    },
    isDragOverInner() {
      const { dragPosition, dragOverRowId, uid } = this;
      return uid === dragOverRowId && dragPosition === 'inner';
    },
    isDragOverBottom() {
      const { dragPosition, dragOverRowId, uid } = this;
      return uid === dragOverRowId && dragPosition === 'bottom';
    },
    isAllowDrag() {
      const { allowDrag, record, expandRow } = this;
      // expandRow不允许拖拽
      return !expandRow && !(isFunction(allowDrag) && allowDrag(record) === false);
    },
    isAllowDrop() {
      const {
        allowDrop,
        record,
        expandRow,
        isDragOverBottom,
        isDragOverTop,
        hasExpandRowRenderOrSlot,
        isExpanded,
        isExpandable,
        dragRow,
        dragPosition,
      } = this;
      // FIXME: 目前只考虑最多存在一个expandRow的情况，
      // expandRow只允许在底部drop，
      // 非expandRow如果有expandedRowRender或slot="expand"，展开状态只允许在顶部drop,非展开状态允许drop;如果不含扩展行，则允许drop

      // 防止用户多传expanderRowKeys导致光凭isExpand判断错误
      const isRowExpanded = isExpanded && isExpandable;
      const isExpandRowAllowed = expandRow && isDragOverBottom;
      const isNoneExpandRowAllowed =
        !expandRow && (!hasExpandRowRenderOrSlot || !isRowExpanded || isDragOverTop);

      return (
        (isExpandRowAllowed || isNoneExpandRowAllowed) &&
        !(
          isFunction(allowDrop) &&
          // 给用户暴露当前行，拖拽行，拖拽位置，当前行是否展开等参数
          allowDrop(record, dragRow, dragPosition, isRowExpanded) === false
        )
      );
    },
    classes() {
      const {
        uid,
        rowPrefixCls,
        isHover,
        isSelected,
        dragRowId,
        dragOverRowId,
        isAllowDrag,
        isAllowDrop,
        isDragOverInner,
        isDragOverTop,
        isDragOverBottom,
      } = this;
      return {
        [rowPrefixCls]: true,
        [`${rowPrefixCls}-hover`]: isHover,
        [`${rowPrefixCls}-selected`]: isSelected,
        'dragover-inner': isAllowDrop && isDragOverInner,
        'dragover-top': isAllowDrop && isDragOverTop,
        'dragover-bottom': isAllowDrop && isDragOverBottom,
        'not-allow-drag': uid === dragRowId && !isAllowDrag,
        'not-allow-drop': uid === dragOverRowId && !isAllowDrop,
      };
    },
    rowStyle() {
      const {
        fixed,
        rowIdx,
        fixedTableHeight: { rows },
      } = this;
      if (!fixed || !Object.keys(rows).length) {
        return null;
      }
      return getRowStyle(rowIdx, rows);
    },
    expandRowStyle() {
      const {
        fixed,
        uid,
        fixedTableHeight: { expandRows },
      } = this;

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
        fixed,
        expandRow,
        uid,
        rowIdx,
        fixedTableHeight: { expandRows, rows },
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

    onDragStart(e) {
      const {
        isAllowDrag,
        onTableRowDragStart,
        uid,
        isExpanded,
        isExpandable,
        handleExpandChange,
      } = this;
      if (!isAllowDrag) {
        e.preventDefault();
        return;
      }

      // 折叠当前节点
      if (isExpanded && isExpandable) {
        handleExpandChange(e, false);
      }

      // for firefox
      e.dataTransfer.setData('text/plain', uid);
      onTableRowDragStart(e, uid, this);
    },
    onDragOver(e) {
      e.preventDefault();
      const { onTableRowDragOver, uid } = this;

      onTableRowDragOver(e, uid, this);
    },
    onDragEnter(e) {
      const { onTableRowDragEnter, uid } = this;

      onTableRowDragEnter(e, uid, this);
    },
    onDragLeave(e) {
      const { uid, onTableRowDragLeave } = this;

      onTableRowDragLeave(e, uid, this);
    },
    onDragEnd(e) {
      const { uid, onTableRowDragEnd } = this;
      e.dataTransfer.clearData('text/plain');
      onTableRowDragEnd(e, uid, this);
    },
    onDrop(e) {
      const { uid, isAllowDrop, onTableRowDrop } = this;
      e.stopPropagation();

      if (!isAllowDrop) {
        e.preventDefault();
        return;
      }
      onTableRowDrop(e, uid, this);
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
        onDragStart,
        onDragEnter,
        onDragLeave,
        onDragOver,
        onDragEnd,
        onDrop,
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

      if (!('dragstart' in nOn)) {
        nOn.dragstart = null;
      }
      if (!('dragover' in nOn)) {
        nOn.dragover = null;
      }
      if (!('dragenter' in nOn)) {
        nOn.dragenter = null;
      }
      if (!('dragleave' in nOn)) {
        nOn.dragleave = null;
      }
      if (!('dragend' in nOn)) {
        nOn.dragend = null;
      }
      if (!('drop' in nOn)) {
        nOn.drop = null;
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
        } else if (k === 'dragstart') {
          fn = chainFns(originFn, onDragStart);
        } else if (k === 'dragover') {
          fn = chainFns(originFn, onDragOver);
        } else if (k === 'dragenter') {
          fn = chainFns(originFn, onDragEnter);
        } else if (k === 'dragleave') {
          fn = chainFns(originFn, onDragLeave);
        } else if (k === 'dragend') {
          fn = chainFns(originFn, onDragEnd);
        } else if (k === 'drop') {
          fn = chainFns(originFn, onDrop);
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
      rowClass,
      classes,
      rowStyle,
      expandRowStyle,
      renderCells,
      onRow,
      record,
      rowIdx,
      indent,
      reBindRowEvents,
      expandIconAsCell,
      renderExpandIconAsCell,
      draggable,
      isAllowDrag,
    } = this;

    const nRowStyle = expandRow ? expandRowStyle : rowStyle;
    let rowProps = {};

    if (!expandRow && isFunction(onRow)) {
      rowProps = { ...rowProps, ...onRow(record, rowIdx) };
    }
    const rowClassName = isFunction(rowClass) ? rowClass(record, rowIdx, indent) : rowClass;
    const {
      className, style, on, ...otherProps
    } = rowProps;
    const events = reBindRowEvents(on);

    if (draggable && isAllowDrag) {
      otherProps.draggable = true;
    } else {
      // 防止生成draggable特性
      delete otherProps.draggable;
    }

    const cells = renderCells();

    if (fixed !== 'right' && !expandRow && expandIconAsCell) {
      cells.unshift(renderExpandIconAsCell());
    }

    return (
      <tr
        v-show={visible}
        class={[classes, className, rowClassName]}
        style={[style, nRowStyle]}
        {...{ attrs: otherProps, on: events }}
      >
        {cells}
      </tr>
    );
  },
};
