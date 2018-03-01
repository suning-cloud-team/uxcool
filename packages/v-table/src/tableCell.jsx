import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import { isVNode, isFunction } from './utils';
import SubMixin from './mixins/sub';

export default {
  name: 'TableCell',
  mixins: [SubMixin],
  props: {
    rowPrefixCls: {
      type: String,
      default: '',
    },
    record: {
      type: Object,
      default() {
        return {};
      },
    },
    column: {
      type: Object,
      default() {
        return {};
      },
    },
    rowIdx: {
      type: Number,
      default: -1,
    },
    colIdx: {
      type: Number,
      default: -1,
    },
    indent: {
      type: Number,
      default: -1,
    },
    expandIcon: {
      type: [Object, Boolean],
      default: false,
    },
  },
  methods: {
    getCellProps() {
      const {
        column, record, colIdx, rowIdx
      } = this;
      const {
        dataIndex, className, cellRender, onCell
      } = column;
      const val = !dataIndex ? '' : get(record, dataIndex) || '';
      let cellProps = {
        content: val,
        className,
      };

      if (isFunction(onCell)) {
        cellProps = { ...cellProps, ...onCell(record, rowIdx, colIdx, column) };
      }

      if (isFunction(cellRender)) {
        const rv = cellRender.call(
          { $createElement: this.$createElement },
          val,
          record,
          rowIdx,
          colIdx,
          column
        );
        // Object
        if (rv && isPlainObject(rv) && !isVNode(rv)) {
          cellProps = { ...cellProps, ...rv };
        } else if (isVNode(rv) || typeof rv === 'string' || typeof rv === 'number') {
          cellProps.content = rv;
        }
      }

      return cellProps;
    },
  },
  render() {
    const {
      rowPrefixCls: prefixCls, getCellProps, indent, indentSize, expandIcon
    } = this;
    const {
      dangerouslySetInnerHTML,
      content = '',
      className,
      style = {},
      on,
      ...cellProps
    } = getCellProps();
    const { colspan = 1, rowspan = 1 } = cellProps;

    // 不渲染被设定为colspan和rowspan设定为0的单元格
    if (colspan === 0 || rowspan === 0) {
      return null;
    }

    const indentElement = expandIcon ? (
      <span
        class={`${prefixCls}-indent indent-level-${indent}`}
        style={{ paddingLeft: `${indent * indentSize}px` }}
      />
      ) : null;
    // 由于添加html内容需要一个额外标签, 可能会影响实际页面元素布局, 暂不提供html方式
    // const tdElement = dangerouslySetInnerHTML ? (
    //   <td class={className} style={style} {...{ attrs: cellProps, on }}>
    //     <span domProps={{ innerHTML: content }} />
    //   </td>
    //   ) : (
    //   <td class={className} style={style} {...{ attrs: cellProps, on }}>
    //     {content}
    //   </td>
    // );

    const tdElement = (
      <td class={className} style={style} {...{ attrs: cellProps, on }}>
        {indentElement}
        {expandIcon}
        {content}
      </td>
    );
    return tdElement;
  },
};
