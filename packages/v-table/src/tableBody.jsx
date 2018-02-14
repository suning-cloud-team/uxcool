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
    const {
      fixed, $refs, rowRefName, expandRowRefName
    } = this;
    this.saveRef(rowRefName, $refs[rowRefName]);
    if (!fixed) {
      this.saveRef(expandRowRefName, $refs[expandRowRefName]);
    }
  },
  methods: {
    renderRows(rowDatas, indent, rowProps, needExpand = true, ancestorKeys = []) {
      const {
        prefixCls,
        rowKey,
        cols,
        fixed,
        rowRefName,
        renderExpandRows,
        getNeedIndentSpaced,
      } = this;
      const nRowProps = rowProps;
      const needIndentSpaced = getNeedIndentSpaced(rowDatas);
      return rowDatas.map((record) => {
        const { idx } = nRowProps;
        const key = getRowKey(rowKey, record, idx);
        const nextAcestorKeys = [...ancestorKeys, key];
        const rows = [
          <table-row
            rowPrefixCls={`${prefixCls}-row`}
            ref={rowRefName}
            refInFor
            key={key}
            cols={cols}
            record={record}
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
        rows.push(...renderExpandRows(record, indent, nRowProps, nextAcestorKeys));
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
