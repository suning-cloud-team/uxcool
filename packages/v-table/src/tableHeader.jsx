import { getKey, getRefName, isFunction, getNormalizeContent } from './utils';
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
