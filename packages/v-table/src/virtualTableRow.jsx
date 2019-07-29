import { isFunction, chainFns } from './utils';
import SubMixin from './mixins/sub';
import ExpandIcon from './expandIcon.vue';
import TableCell from './tableCell';

export default {
  components: {
    ExpandIcon,
    TableCell,
  },

  mixins: [SubMixin],

  props: {
    // 用来更新size
    uid: {
      type: String,
      required: true,
    },

    rowPrefixCls: {
      type: String,
      default: '',
    },

    // 用于判断当前row还在不在渲染池中，减少不必要的计算
    index: {
      type: Number,
      required: true,
    },

    // itemSize为0就认为是未知高度
    itemSize: {
      type: Number,
      default: 0,
    },

    rowIdx: {
      type: Number,
      default: -1,
    },

    record: {
      type: Object,
      default() {
        return {};
      },
    },

    cols: {
      type: Array,
      default() {
        return [];
      },
    },

    indent: {
      type: Number,
      default: 0,
    },

    type: {
      type: String,
      default: 'row',
    },

    needExpand: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    size() {
      const {
        uid,
        scrollData: { validSizes, sizes },
      } = this;
      return validSizes[uid] ? sizes[uid] : 0;
    },

    isHover() {
      const { currentHoverRow } = this;
      return this.uid === currentHoverRow;
    },

    isSelected() {
      return this.record.$$_selected;
    },

    isExpanded() {
      const { expanderRowKeys, uid } = this;
      return expanderRowKeys.indexOf(uid) > -1;
    },

    isExpandable() {
      const { record, expandedRowRender, childColName } = this;
      return !!(record[childColName] && record[childColName].length) || !!expandedRowRender;
    },

    classes() {
      const { rowPrefixCls, isHover, isSelected } = this;

      return {
        [rowPrefixCls]: true,
        [`${rowPrefixCls}-hover`]: isHover,
        [`${rowPrefixCls}-selected`]: isSelected,
      };
    },

    rowStyle() {
      const { fixed, size, itemSize } = this;
      // 左右固定表格的高度由中间表格来决定
      if (fixed) {
        if (itemSize || size) {
          return {
            height: `${itemSize || size}px`,
          };
        }
      }
      return {};
    },
  },

  created() {
    const { rootVM, onForceUpdate } = this;

    rootVM.$on('scroll:forceUpdate', onForceUpdate);
    this.$once('hook:beforeDestroy', () => {
      rootVM.$off('scroll:forceUpdate', onForceUpdate);
    });
  },

  mounted() {
    this.updateSize();
  },

  methods: {
    updateSize(force = false) {
      if (this.itemSize || this.fixed || (!force && this.size)) {
        return;
      }

      this.$nextTick(() => {
        const {
          scrollData: { startIndex, endIndex },
          index,
          uid,
        } = this;
        if (startIndex <= index && index < endIndex) {
          const { height } = this.$el.getBoundingClientRect();
          const size = Math.round(height);

          if (size && this.size !== size) {
            const { scrollData, rootVM, $set: set } = this;

            if (rootVM.$_undefinedSizeMap[uid]) {
              rootVM.$_undefinedSizeMap[uid] = undefined;
              rootVM.$_undefinedSizeCount -= 1;
            }
            set(scrollData.validSizes, uid, true);
            set(scrollData.sizes, uid, size);
          }
        }
      });
    },

    onForceUpdate() {
      this.updateSize(true);
    },

    handleExpandChange(e, expanded) {
      const { record, rowIdx, uid } = this;
      this.rootVM.handleExpandChange(e, expanded, record, rowIdx, uid);
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

    renderExpandIcon() {
      const {
        rowPrefixCls, isExpanded, isExpandable, handleExpandChange, type
      } = this;

      const needIndentSpaced = type === 'row';

      return (
        <ExpandIcon
          iconPrefixCls={rowPrefixCls}
          isExpanded={isExpanded}
          isCanExpandRow={isExpandable}
          needIndentSpaced={needIndentSpaced}
          on-expand={handleExpandChange}
        />
      );
    },

    renderExpandIconAsCell() {
      const { rowPrefixCls, renderExpandIcon } = this;
      return <td class={`${rowPrefixCls}-expand-icon-cell`}>{renderExpandIcon()}</td>;
    },

    reBindRowEvents(on = {}) {
      const {
        expandRowByClick,
        type,
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
          fn = chainFns(originFn, type === 'row' && isAnyColumnsFixed ? nFn : null);
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

    hasExpandIcon(colIdx) {
      const {
        fixed, expandIconAsCell, expandIconColIndex, hideExpandTreeIcon
      } = this;
      const isExpandIcon = fixed !== 'right' && !expandIconAsCell && !hideExpandTreeIcon;
      return isExpandIcon && String(colIdx) === String(expandIconColIndex);
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
        type,
        needExpand,
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
            (indent !== 0 || needExpand) && type === 'row' && hasExpandIcon(i) && renderExpandIcon()
          }
        />
      ));
    },
  },

  render() {
    const {
      type,
      fixed,
      record,
      rowIdx,
      indent,
      rowStyle,
      classes,
      rowClass,
      onRow,
      expandIconAsCell,
      reBindRowEvents,
      renderCells,
      renderExpandIconAsCell,
    } = this;

    let rowProps = {};

    if (type === 'row' && isFunction(onRow)) {
      rowProps = { ...onRow(record, rowIdx) };
    }

    const rowClassName = isFunction(rowClass) ? rowClass(record, rowIdx, indent) : rowClass;
    const {
      className, style, on, ...otherProps
    } = rowProps;

    const cells = renderCells();
    const events = reBindRowEvents(on);

    if (fixed !== 'right' && type === 'row' && expandIconAsCell) {
      cells.unshift(renderExpandIconAsCell());
    }

    return (
      <tr
        class={[classes, className, rowClassName]}
        style={[style, rowStyle]}
        {...{ attrs: otherProps, on: events }}
      >
        {cells}
      </tr>
    );
  },
};
