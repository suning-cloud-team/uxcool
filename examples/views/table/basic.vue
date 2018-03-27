<template>
  <div>
    <normal-demo/>
    <selection-single-demo/>
    <selection-demo/>
    <selection-row-demo/>
    <selection-op-demo/>
    <selection-custom-demo/>
    <sort-filter-demo/>
    <sort-filter-reset-demo/>
    <custom-filter-panel-demo/>
    <filter-demo />
    <ajax-demo/>
    <size-demo/>
    <border-title-footer-demo/>
    <expander-row-demo/>
    <colspan-rowspan-demo/>
    <tree-data-demo/>
    <fixed-header-demo/>
    <fixed-columns-demo/>
    <fixed-columns-header-demo/>
    <group-header-demo/>
    <editable-cells-demo/>
    <editable-rows-demo/>
    <nest-table-demo/>
    <async-nest-table-demo/>
  </div>
</template>


<script>
  import '@suning/uxcool/src/components/table/style/index.scss';
  import UxTable from '@suning/uxcool/src/components/table';
  import NormalDemo from './normal.vue';
  import SelectionSingleDemo from './selectionSingle.vue';
  import SelectionDemo from './selection.vue';
  import SelectionRowDemo from './selectionRow.vue';
  import SelectionOpDemo from './selectionOp.vue';
  import SelectionCustomDemo from './selectionCustom.vue';
  import SortFilterDemo from './sortFilter.vue';
  import SortFilterResetDemo from './sortFilterReset.vue';
  import CustomFilterPanelDemo from './customFilterPanel.vue';
  import AjaxDemo from './ajax.vue';
  import SizeDemo from './size.vue';
  import FilterDemo from './filter.vue';
  import BorderTitleFooterDemo from './borderTitleFooter.vue';
  import ExpanderRowDemo from './expanderRow.vue';
  import ColspanRowspanDemo from './colSpanRowSpan.vue';
  import TreeDataDemo from './treeData.vue';
  import FixedHeaderDemo from './fixedHeader.vue';
  import FixedColumnsDemo from './fixedColumns.vue';
  import FixedColumnsHeaderDemo from './fixedColumnsHeader.vue';
  import GroupHeaderDemo from './groupHeader.vue';
  import EditableCellsDemo from './editableCells.vue';
  import EditableRowsDemo from './editableRows.vue';
  import NestTableDemo from './nestTable.vue';
  import AsyncNestTableDemo from './asyncNestTable.vue';

  export default {
    components: {
      UxTable,
      NormalDemo,
      SelectionSingleDemo,
      SelectionDemo,
      SelectionRowDemo,
      SelectionOpDemo,
      SelectionCustomDemo,
      SortFilterDemo,
      SortFilterResetDemo,
      CustomFilterPanelDemo,
      AjaxDemo,
      SizeDemo,
      FilterDemo,
      BorderTitleFooterDemo,
      ExpanderRowDemo,
      ColspanRowspanDemo,
      TreeDataDemo,
      FixedHeaderDemo,
      FixedColumnsDemo,
      FixedColumnsHeaderDemo,
      GroupHeaderDemo,
      EditableCellsDemo,
      EditableRowsDemo,
      NestTableDemo,
      AsyncNestTableDemo,
    },
  };
</script>
