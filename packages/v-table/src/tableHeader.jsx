import { isFunction } from '@cloud-sn/v-utils';
import { getKey, getRefName, getNormalizeContent } from './utils';
import SubMixin from './mixins/sub';
import ExpanderMixin from './mixins/expander';

export default {
  name: 'TableHeader',
  mixins: [SubMixin, ExpanderMixin],
  computed: {
    rows() {
      const {
        fixed, headerRows, leftHeaderRows, rightHeaderRows
      } = this;
      let rows = headerRows;
      if (fixed === 'left') {
        rows = leftHeaderRows;
      } else if (fixed === 'right') {
        rows = rightHeaderRows;
      }
      return rows;
    },
    theadRefName() {
      return getRefName(this.fixed, 'tableTheadRef');
    },
    headRowStyle() {
      const { fixed, fixedTableHeight, rows } = this;
      const { thead } = fixedTableHeight;
      const style = {};
      if (thead) {
        style.height = thead === 'auto' ? 'auto' : `${thead / rows.length}px`;
      }
      return fixed ? style : null;
    },
    tableWrapEl() {
      return this.rootVM.$refs.tableWrapRef;
    },
    resizeLineEl() {
      return this.rootVM.$refs.resizeLineRef;
    },
  },
  mounted() {
    const { $refs, theadRefName } = this;
    this.saveRef(theadRefName, $refs[theadRefName]);
  },
  methods: {
    renderRow(row, rowIdx) {
      const { renderCells, onHeaderRow, headRowStyle } = this;
      let rowProps = {};
      if (isFunction(onHeaderRow)) {
        rowProps = { ...rowProps, ...onHeaderRow(row.map(v => v.column), rowIdx) };
      }
      const { className, style, ...otherProps } = rowProps;
      return (
        <tr class={className} style={[style, headRowStyle]} {...{ attrs: otherProps }}>
          {renderCells(row, rowIdx)}
        </tr>
      );
    },
    renderRows() {
      const {
        rows, renderRow, expandIconAsCell, fixed, renderHeaderExpandIconCell
      } = this;
      const datas = [...rows];
      if (fixed !== 'right' && expandIconAsCell && datas[0]) {
        const row = [...datas[0]];
        row.unshift(renderHeaderExpandIconCell(datas.length));
        datas[0] = row;
      }
      return datas.map(renderRow);
    },
    getCellProps(cell, rowIdx, colIdx) {
      const { column, ...otherProps } = cell;
      const { onHeaderCell } = column;
      let p = { ...otherProps };
      if (column.align) {
        p.style = { textAlign: column.align };
      }
      if (typeof onHeaderCell === 'function') {
        p = { ...p, ...onHeaderCell(column, rowIdx, colIdx) };
      }

      // 只有最底层单元格才允许拖拽改变列宽
      if (column.resizable && (!column.children || column.children.length === 0)) {
        const { onResizerMouseDown, prefixCls } = this;
        const { className } = p;
        p.className = className
          ? [className, `${prefixCls}-resizable-th`]
          : `${prefixCls}-resizable-th`;

        const on = {
          mousedown: (event) => {
            // 有些列没有key字段，依赖上层table组件设置$$_key
            onResizerMouseDown(column.key || column.$$_key, event);
          },
        };
        const resizeHandler = <div class={`${prefixCls}-th-resizer`} {...{ on }} />;

        if (Array.isArray(p.title)) {
          p.title.push(resizeHandler);
        } else {
          p.title = [p.title, resizeHandler];
        }
      }
      delete p.key;
      return p;
    },
    renderCell(cell, rowIdx, colIdx) {
      const { $createElement, getCellProps, fixed } = this;
      const {
        className, style, on, title, ...cellProps
      } = getCellProps(cell, rowIdx, colIdx);
      const { column } = cell;
      const { colspan = 1 } = cellProps;
      if (colspan === 0) {
        return null;
      }
      // 解决使用JSX或$createElement,生成 title时,由于table和fixed table共用VNode,导致不渲染的问题,
      // VNodes must be unique.(https://vuejs.org/v2/guide/render-function.html#Constraints)
      const normalizeTitle = getNormalizeContent($createElement, column.$$_fixed, fixed, title);
      return (
        <th
          class={className}
          style={style}
          {...{ attrs: cellProps, on }}
          key={getKey(cell.column, colIdx)}
        >
          {normalizeTitle}
        </th>
      );
    },
    renderCells(row = [], rowIdx) {
      const { renderCell } = this;
      return row.map((cell, i) => renderCell(cell, rowIdx, i));
    },
    onResizerMouseDown(key, e) {
      e.preventDefault();
      const { target, clientX } = e;
      const th = target.parentNode;

      const {
        minResizeColWidth, tableWrapEl, resizeLineEl, rootVM
      } = this;
      const { left: tableLeft, width: tableWidth } = tableWrapEl.getBoundingClientRect();
      const { left: thLeft, width: thWidth } = th.getBoundingClientRect();

      const originX = clientX;
      const offset = thLeft - tableLeft;
      const minLeft = offset + minResizeColWidth;
      const originLeft = offset + thWidth;
      let left = originLeft;

      resizeLineEl.style.left = `${originLeft}px`;
      rootVM.$emit('toggle-resize-line-visible', true);

      const onMouseMove = ({ clientX: currentX }) => {
        const delta = currentX - originX;
        left = Math.max(Math.min(tableWidth - 1, originLeft + delta), minLeft);
        resizeLineEl.style.left = `${left}px`;
      };

      const onMouseUp = (evt) => {
        const delta = left - originLeft;
        const newWidth = thWidth + delta;

        rootVM.$emit('toggle-resize-line-visible', false);
        rootVM.$emit('resize-column-width', evt, newWidth, thWidth, key);
        document.removeEventListener('mousemove', onMouseMove, false);
        document.removeEventListener('mouseup', onMouseUp, false);
      };

      document.addEventListener('mousemove', onMouseMove, false);
      document.addEventListener('mouseup', onMouseUp, false);
    },
  },
  render() {
    const { prefixCls, renderRows, theadRefName } = this;
    return (
      <thead ref={theadRefName} class={`${prefixCls}-thead`}>
        {renderRows()}
      </thead>
    );
  },
};
