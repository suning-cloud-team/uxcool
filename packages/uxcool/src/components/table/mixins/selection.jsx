import { isFunction } from '../utils';
import CheckboxAll from '../checkboxAll.vue';
import Checkbox from '../checkbox.vue';

export default {
  computed: {
    isAllCheckboxDisabled() {
      const { changeablePagerFlatData } = this;
      return changeablePagerFlatData.length === 0;
    },
    selectionColumnClasses() {
      const { prefixCls, rowSelection = {} } = this;
      return {
        [`${prefixCls}-selection-column`]: true,
        [`${prefixCls}-selection-column-custom`]: rowSelection.selections,
      };
    },
    selectionColumn() {
      const {
        changeablePagerFlatData,
        rowSelection = {},
        isAnyColumnsLeftFixed,
        isAllCheckboxDisabled,
        getPopupContainer,
        selectionColumnClasses,
        handleAllSelectionChange,
        handleSelectionChange,
      } = this;
      const {
        fixed, type, selections, hideDefaultSelections
      } = rowSelection;
      const col = {
        key: 'selection-column',
        fixed: fixed || isAnyColumnsLeftFixed,
        className: selectionColumnClasses,
        cellRender(_, record) {
          return (
            <Checkbox
              type={type}
              disabled={record.$$_checkboxDisabled}
              record={record}
              on-change={handleSelectionChange}
            />
          );
        },
      };

      if (type !== 'radio') {
        col.title = (
          <CheckboxAll
            data={changeablePagerFlatData}
            disabled={isAllCheckboxDisabled}
            selections={selections}
            hideDefaultSelections={hideDefaultSelections}
            getPopupContainer={getPopupContainer}
            on-change={handleAllSelectionChange}
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
    onRowSelectionChange(selectedRowKeys, {
      type, record, checked, changedRowKeys
    }) {
      const {
        selectedRowKeys: prevSelectRowKeys,
        flatData,
        rowSelection,
        setSelectedRowKeys,
      } = this;
      setSelectedRowKeys(selectedRowKeys);

      const selectedRows = flatData.filter(v => selectedRowKeys.indexOf(v.$$_key) > -1);
      if (isFunction(rowSelection.onChange)) {
        rowSelection.onChange(selectedRowKeys, selectedRows, { type, checked }, prevSelectRowKeys);
      }

      if (isFunction(rowSelection[type])) {
        if (type === 'onSelect') {
          rowSelection.onSelect(record, checked, selectedRows);
        } else if (type === 'onSelectAll') {
          rowSelection.onSelectAll(
            checked,
            selectedRows,
            flatData.filter(v => changedRowKeys.indexOf(v.$$_key) > -1),
            selectedRowKeys,
            prevSelectRowKeys
          );
        } else if (type === 'onSelectInvert') {
          rowSelection.onSelectInvert(selectedRows, selectedRowKeys, prevSelectRowKeys);
        }
      }
    },
    handleAllSelectionChange(op) {
      const { changeablePagerFlatData, onRowSelectionChange } = this;
      let selectedRowKeys = [...this.selectedRowKeys];
      const changeableFlatDataKeys = changeablePagerFlatData.map(v => v.$$_key);
      const p = {
        type: op,
        checked: false,
        changedRowKeys: [],
      };
      switch (op) {
        case 'all':
          p.changedRowKeys = changeableFlatDataKeys.filter(k => selectedRowKeys.indexOf(k) === -1);
          p.type = 'onSelectAll';
          p.checked = true;
          selectedRowKeys.push(...p.changedRowKeys);
          break;
        case 'removeAll':
          p.changedRowKeys = changeableFlatDataKeys.filter(k => selectedRowKeys.indexOf(k) > -1);
          p.type = 'onSelectAll';
          p.checked = false;
          selectedRowKeys = selectedRowKeys.filter(k => changeableFlatDataKeys.indexOf(k) === -1);
          break;
        case 'invert':
          p.changedRowKeys = changeableFlatDataKeys;
          selectedRowKeys = changeableFlatDataKeys.filter(k => selectedRowKeys.indexOf(k) === -1);
          p.type = 'onSelectInvert';
          break;
        default:
          break;
      }
      onRowSelectionChange(selectedRowKeys, p);
    },
    handleSelectionChange(record, e) {
      const { onRowSelectionChange, rowSelection: { type } } = this;
      const { checked } = e.target;
      let selectedRowKeys = [...this.selectedRowKeys];
      const key = record.$$_key;
      if (type !== 'radio') {
        const idx = selectedRowKeys.indexOf(key);
        if (checked) {
          if (idx === -1) {
            selectedRowKeys.push(key);
          }
        } else if (idx !== -1) {
          selectedRowKeys.splice(idx, 1);
        }
      } else {
        selectedRowKeys = [key];
      }
      onRowSelectionChange(selectedRowKeys, {
        type: 'onSelect',
        record,
        checked,
      });
    },
  },
};
