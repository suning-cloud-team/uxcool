import get from 'lodash/get';
import { isVNode, isFunction, isPlainObject } from '@suning/v-utils';
import { getNormalizeContent } from './utils';
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
        dataIndex, align, className, cellRender, onCell
      } = column;
      // const val = !dataIndex ? '' : get(record, dataIndex) || '';
      let val = '';
      if (dataIndex) {
        const v = get(record, dataIndex);
        val = v === undefined || v === null ? '' : v;
      }
      let cellProps = {
        content: val,
        className,
      };

      // align cell content
      if (align) {
        cellProps.style = { textAlign: align };
      }

      if (isFunction(onCell)) {
        cellProps = { ...cellProps, ...onCell(record, rowIdx, column, colIdx) };
      }

      if (isFunction(cellRender)) {
        const rv = cellRender.call(
          { $createElement: this.$createElement },
          val,
          record,
          rowIdx,
          column,
          colIdx
        );
        // Object
        if (rv && isPlainObject(rv) && !isVNode(rv)) {
          cellProps = { ...cellProps, ...rv };
          // } else if (isVNode(rv) || typeof rv === 'string' || typeof rv === 'number') {
        } else if (rv !== undefined && rv !== null) {
          cellProps.content = rv;
        }
      }

      return cellProps;
    },
  },
  render() {
    const {
      $createElement,
      rowPrefixCls: prefixCls,
      fixed,
      getCellProps,
      column,
      indent,
      indentSize,
      expandIcon,
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
    // 解决使用JSX或$createElement,生成 title时,由于table和fixed table共用VNode,导致不渲染的问题,
    // VNodes must be unique.(https://vuejs.org/v2/guide/render-function.html#Constraints)
    const normalizeContent = getNormalizeContent($createElement, column.$$_fixed, fixed, content);
    const tdElement = (
      <td class={className} style={style} {...{ attrs: cellProps, on }}>
        {indentElement}
        {expandIcon}
        {normalizeContent}
      </td>
    );
    return tdElement;
  },
};
