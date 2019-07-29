import { isPxOrPercentage, isFunction, getFlatColumns } from './utils';
import SubMixin from './mixins/sub';
import ColGroup from './colGroup.vue';
import VirtualTableRow from './virtualTableRow';

export default {
  name: 'VirtualBasicTable',
  components: {
    ColGroup,
    VirtualTableRow,
  },
  mixins: [SubMixin],
  props: {
    pool: {
      type: Array,
      required: true,
    },

    itemSize: {
      type: Number,
      default: 0,
    },

    needExpand: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const { prefixCls, fixed, scroll } = this;
      return {
        [`${prefixCls}-fixed`]: fixed || scroll.x,
      };
    },
    style() {
      const { fixed, scroll } = this;
      const style = {};
      if (!fixed && scroll.x) {
        style.tableLayout = 'fixed';
        if (typeof scroll.x === 'boolean') {
          style.width = '100%';
        } else {
          style.width = isPxOrPercentage(scroll.x) ? scroll.x : `${scroll.x}px`;
        }
      }
      return style;
    },

    cols() {
      return getFlatColumns(this);
    },
  },
  methods: {
    renderRows() {
      const {
        prefixCls,
        expandedRowClassName,
        cols,
        fixed,
        expandIconAsCell,
        needExpand,
        itemSize,
      } = this;

      return this.pool.map(({ item, nr }) => {
        const {
          key, rowIdx, record, level, type, renderFn
        } = item;
        const rowPrefixCls = type === 'row' ? `${prefixCls}-row` : `${prefixCls}-expanded-row`;
        const className =
          type !== 'row' && isFunction(expandedRowClassName)
            ? expandedRowClassName(record, rowIdx, level - 1)
            : '';

        // 复用原先table逻辑，非展开行在tableRow中判断在cells的vode数组头部加入expandIconCell，展开行在当前组件cols头部加入空td
        let columns = cols;

        if (type !== 'row') {
          let content;

          if (fixed === 'right' || !isFunction(renderFn)) {
            content = '';
          } else {
            content =
              type === 'expand-row'
                ? renderFn(record, rowIdx, level)
                : renderFn({ record, rowIdx, indent: level });
          }

          columns = [
            {
              cellRender() {
                return {
                  colspan: cols.length,
                  content,
                };
              },
            },
          ];

          if (fixed !== 'right' && expandIconAsCell) {
            columns.unshift({
              cellRender() {
                return '';
              },
            });
          }
        }

        return (
          <virtual-table-row
            class={className}
            fixed={fixed}
            uid={key}
            rowPrefixCls={rowPrefixCls}
            index={nr.index}
            itemSize={itemSize}
            rowIdx={rowIdx}
            record={record}
            cols={columns}
            indent={level}
            type={type}
            needExpand={needExpand}
            key={key}
          />
        );
      });
    },
  },
  render() {
    const {
      classes, style, fixed, renderRows, prefixCls
    } = this;

    return (
      <table class={classes} style={style}>
        <col-group fixed={fixed} />
        <tbody class={`${prefixCls}-tbody`}>{renderRows()}</tbody>
      </table>
    );
  },
};
