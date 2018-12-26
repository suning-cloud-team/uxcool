import { getRefName, getRowKey, getFlatColumns } from './utils';
import SubMixin from './mixins/sub';
import ExpanderMixin from './mixins/expander';
import TableRow from './tableRow';

export default {
  name: 'TableBody',
  components: {
    TableRow,
  },
  mixins: [SubMixin, ExpanderMixin],
  computed: {
    rowRefName() {
      return getRefName(this.fixed, 'tableRowRef');
    },
    expandRowRefName() {
      return getRefName(this.fixed, 'expandRowsRef');
    },
    cols() {
      return getFlatColumns(this);
    },
  },
  mounted() {
    this.saveRowRef();
  },
  updated() {
    this.saveRowRef();
  },
  methods: {
    saveRowRef() {
      const {
        fixed,
        $refs,
        elementRefs,
        rowRefName,
        expandRowRefName,
        expandedRowRender,
        rootScopedSlots,
        updateRowHeightAndScrollPosition,
      } = this;

      let changeCnt = 0;
      if (!(rowRefName in elementRefs) || !elementRefs[rowRefName]) {
        this.saveRef(rowRefName, $refs[rowRefName]);
        changeCnt += 1;
      }

      if (!fixed) {
        if (
          (!!expandedRowRender || rootScopedSlots.expand) &&
          (!(expandRowRefName in elementRefs) || !elementRefs[expandRowRefName])
        ) {
          this.saveRef(expandRowRefName, $refs[expandRowRefName]);
          changeCnt += 1;
        }
      }

      if (changeCnt > 0) {
        updateRowHeightAndScrollPosition();
      }
    },
    /**
     * 渲染数据行
     * @param {Array} rowDatas 数据
     * @param {Number} indent 层级
     * @param {Object} rowProps 行的额外属性
     * @param {Boolean} needExpand 是否可展开
     * @param {Array} ancestorKeys 当前行的所有父级, 用于判断当前行的隐藏和显示
     */
    renderRows(rowDatas, indent, rowProps, needExpand = true, ancestorKeys = []) {
      const {
        prefixCls,
        rowKey,
        cols,
        fixed,
        rowRefName,
        renderExpandRows,
        // getNeedIndentSpaced,
      } = this;
      const nRowProps = rowProps;
      // const needIndentSpaced = getNeedIndentSpaced(rowDatas);
      const needIndentSpaced = true;
      return rowDatas.map((record) => {
        const { idx } = nRowProps;
        const nRecord = { ...record };
        const key = getRowKey(rowKey, nRecord, idx);
        const nextAcestorKeys = [...ancestorKeys, key];
        const rows = [
          <table-row
            rowPrefixCls={`${prefixCls}-row`}
            ref={rowRefName}
            refInFor
            key={key}
            cols={cols}
            record={nRecord}
            rowIdx={idx}
            fixed={fixed}
            uid={key}
            ancestorKeys={ancestorKeys}
            indent={indent}
            needExpand={needExpand}
            needIndentSpaced={needIndentSpaced}
          />,
        ];
        nRowProps.idx += 1;
        rows.push(...renderExpandRows(nRecord, indent, nRowProps, nextAcestorKeys));
        return rows;
      });
    },
  },
  render() {
    const {
      prefixCls, records, renderRows, childColName
    } = this;
    const needExpand = records.some(v => v[childColName] && v[childColName].length);
    const rowProps = { idx: 0 };
    return (
      <tbody class={`${prefixCls}-tbody`}>{renderRows(records, 0, rowProps, needExpand, [])}</tbody>
    );
  },
};
