import CheckboxAll from '../checkboxAll.vue';
import Checkbox from '../checkbox.vue';

export default {
  computed: {
    isAllCheckboxDisabled() {
      const { flatData } = this;
      return flatData.every(v => v.$$_checkboxDisabled);
    },
    checkboxColumn() {
      const {
        flatData, rowSelection, isAnyColumnsLeftFixed, isAllCheckboxDisabled
      } = this;
      console.log('flatRow', flatData);
      const { fixed, type } = rowSelection || {};
      const col = {
        key: 'selection-column',
        fixed: fixed || isAnyColumnsLeftFixed,
        cellRender(_, record, rowIdx) {
          return <Checkbox type={type} disabled={record.$$_checkboxDisabled} rowIdx={rowIdx} />;
        },
      };

      if (type !== 'radio') {
        col.title = <CheckboxAll data={flatData} disabled={isAllCheckboxDisabled} />;
      }

      return col;
    },
  },
  methods: {
    renderRowSelection() {
      const { normalizeColumns, checkboxColumn, rowSelection } = this;
      const columns = [...normalizeColumns];
      if (rowSelection) {
        columns.unshift(checkboxColumn);
      }

      return columns;
    },
  },
};
