import CheckboxAll from '../checkboxAll.vue';
import Checkbox from '../checkbox.vue';

export default {
  computed: {
    isAllCheckboxDisabled() {
      const { flatData } = this;
      return flatData.every(v => v.$$_checkboxDisabled);
    },
    selectionColumn() {
      const {
        flatData,
        rowSelection,
        isAnyColumnsLeftFixed,
        isAllCheckboxDisabled,
        getPopupContainer,
      } = this;
      console.log('flatData', flatData);
      const {
        fixed, type, selections, hideDefaultSelections
      } = rowSelection || {};
      const col = {
        key: 'selection-column',
        fixed: fixed || isAnyColumnsLeftFixed,
        cellRender(_, record, rowIdx) {
          return <Checkbox type={type} disabled={record.$$_checkboxDisabled} rowIdx={rowIdx} />;
        },
      };

      if (type !== 'radio') {
        col.title = (
          <CheckboxAll
            data={flatData}
            disabled={isAllCheckboxDisabled}
            selections={selections}
            hideDefaultSelections={hideDefaultSelections}
            getPopupContainer={getPopupContainer}
          />
        );
      }

      return col;
    },
  },
  methods: {
    getPopupContainer() {
      return this.$el;
    },
    renderRowSelection() {
      const { normalizeColumns, selectionColumn, rowSelection } = this;
      const columns = [...normalizeColumns];
      if (rowSelection) {
        columns.unshift(selectionColumn);
      }

      return columns;
    },
  },
};
