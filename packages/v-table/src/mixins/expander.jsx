import { isFunction } from '../utils';

export default {
  methods: {
    getNeedIndentSpaced(records) {
      const { childColName } = this;
      return records.some(v => !!(v[childColName] && v[childColName].length));
    },
    handleExpandRow(renderFn, rowkey, record, indent, rowProps, ancestorKeys) {
      const {
        prefixCls,
        expandIconAsCell,
        cols,
        fixed,
        expandedRowClassName,
        expandRowRefName,
      } = this;
      const { idx } = rowProps;

      const parentKey = ancestorKeys[ancestorKeys.length - 1];
      const key = `${parentKey}-${rowkey}`;
      const className = isFunction(expandedRowClassName)
        ? expandedRowClassName(record, idx, indent - 1)
        : '';

      const columns = [
        {
          cellRender() {
            return {
              colspan: cols.length,
              content: fixed !== 'right' ? renderFn(record, idx, indent) : '',
            };
          },
        },
      ];

      if (expandIconAsCell && fixed !== 'right') {
        columns.unshift({
          cellRender() {
            return '';
          },
        });
      }

      return (
        <table-row
          rowPrefixCls={`${prefixCls}-expanded-row`}
          ref={expandRowRefName}
          refInFor
          key={key}
          class={className}
          cols={columns}
          rowIdx={idx}
          fixed={fixed}
          uid={key}
          ancestorKeys={ancestorKeys}
          indent={indent}
          expand-row
        />
      );
    },
    renderExpandRow(record, indent, rowProps, ancestorKeys) {
      const { expandedRowRender, handleExpandRow } = this;

      return handleExpandRow(
        rowIdx => (isFunction(expandedRowRender) ? expandedRowRender(record, rowIdx, indent) : ''),
        'expand-row',
        record,
        indent,
        rowProps,
        ancestorKeys
      );
    },
    renderExpandSlotRow(record, indent, rowProps, ancestorKeys) {
      const { rootScopedSlots, handleExpandRow } = this;

      const { expand: expandSlotRenderFn } = rootScopedSlots;
      return handleExpandRow(
        rowIdx =>
          (isFunction(expandSlotRenderFn) ? expandSlotRenderFn({ record, rowIdx, indent }) : ''),
        'expand-slot-row',
        record,
        indent,
        rowProps,
        ancestorKeys
      );
    },
    renderExpandRows(record, indent, rowProps, ancestorKeys) {
      const {
        rootScopedSlots,
        childColName,
        renderRows,
        expandedRowRender,
        renderExpandRow,
      } = this;
      const childrens = record[childColName];
      const rows = [];

      if (expandedRowRender) {
        rows.push(renderExpandRow(record, indent + 1, rowProps, ancestorKeys));
      }

      if (rootScopedSlots.expand) {
        rows.push(this.renderExpandSlotRow(record, indent + 1, rowProps, ancestorKeys));
      }

      if (childrens && childrens.length) {
        rows.push(...renderRows(childrens, indent + 1, rowProps, true, ancestorKeys));
      }
      return rows;
    },
    renderHeaderExpandIconCell(rowspan) {
      const { prefixCls } = this;

      const cell = {
        key: `${prefixCls}-expand-icon-cell`,
        className: `${prefixCls}-expand-icon-th`,
        title: '',
        rowspan,
      };
      cell.column = cell;
      return cell;
    },
  },
};
