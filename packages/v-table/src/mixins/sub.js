import ColumnsMixin from './column';

export default {
  inject: ['rootVM', 'scrollData'],
  mixins: [ColumnsMixin],
  props: {
    fixed: String,
  },
  computed: {
    rootScopedSlots() {
      return this.rootVM.$scopedSlots;
    },
    rowKey() {
      return this.rootVM.rowKey;
    },
    scrollBarW() {
      return this.rootVM.scrollBarW;
    },
    prefixCls() {
      return this.rootVM.prefixCls;
    },
    rowClass() {
      return this.rootVM.rowClass;
    },
    useFixedHeader() {
      return this.rootVM.useFixedHeader;
    },
    records() {
      return this.rootVM.value;
    },
    innerRecords() {
      // added by xql 2019/11/7
      return this.rootVM.innerValue;
    },
    scroll() {
      return this.rootVM.scroll;
    },
    hideHeader() {
      return this.rootVM.hideHeader;
    },
    onHeaderRow() {
      return this.rootVM.onHeaderRow;
    },
    onRow() {
      return this.rootVM.onRow;
    },
    isFixedHeader() {
      const { scroll, useFixedHeader, virtualScrollMode } = this;
      return useFixedHeader || scroll.y || virtualScrollMode;
    },
    bodyStyle() {
      return this.rootVM.bodyStyle;
    },
    elementRefs() {
      return this.rootVM.elementRefs;
    },
    fixedTableHeight() {
      return this.rootVM.fixedTableHeight;
    },
    currentHoverRow() {
      return this.rootVM.currentHoverRow;
    },
    prevScrollLeft() {
      return this.rootVM.prevScrollLeft;
    },
    prevScrollTop() {
      return this.rootVM.prevScrollTop;
    },
    childColName() {
      return this.rootVM.childColName;
    },
    indentSize() {
      return this.rootVM.indentSize;
    },
    expandIconAsCell() {
      return this.rootVM.expandIconAsCell;
    },
    expandRowByClick() {
      return this.rootVM.expandRowByClick;
    },
    expandIconColIndex() {
      return this.rootVM.expandIconColIndex;
    },
    expandedRowRender() {
      return this.rootVM.expandedRowRender;
    },
    expanderRowKeys() {
      return this.rootVM.innerExpanderRowKeys;
    },
    expandedRowClassName() {
      return this.rootVM.expandedRowClassName;
    },
    hideExpandTreeIcon() {
      return this.rootVM.hideExpandTreeIcon;
    },
    virtualScrollMode() {
      return !!this.rootVM.virtualScroll;
    },
    draggable() {
      return this.rootVM.draggable;
    },
    allowDrag() {
      return this.rootVM.allowDrag;
    },
    allowDrop() {
      return this.rootVM.allowDrop;
    },
    dragPosition() {
      return this.rootVM.dragPosition;
    },
    dragRowId() {
      return this.rootVM.dragRowId;
    },
    dragRow() {
      return this.rootVM.dragRow;
    },
    dragOverRowId() {
      return this.rootVM.dragOverRowId;
    },
    hasExpandRowRenderOrSlot() {
      const {
        rootScopedSlots: { expand },
        expandedRowRender,
      } = this;
      return !!expand || !!expandedRowRender;
    },
    minResizeColWidth() {
      return this.rootVM.minResizeColWidth;
    },
  },
  methods: {
    saveRef(refName, refElement) {
      this.rootVM.saveRef(refName, refElement);
    },
    updateRowHeightAndScrollPosition() {
      this.rootVM.handleWinResize();
    },
    onTableRowDragStart(...args) {
      this.rootVM.onTableRowDragStart(...args);
    },
    onTableRowDragEnter(...args) {
      this.rootVM.onTableRowDragEnter(...args);
    },
    onTableRowDragLeave(...args) {
      this.rootVM.onTableRowDragLeave(...args);
    },
    onTableRowDragOver(...args) {
      this.rootVM.onTableRowDragOver(...args);
    },
    onTableRowDrop(...args) {
      this.rootVM.onTableRowDrop(...args);
    },
    onTableRowDragEnd(...args) {
      this.rootVM.onTableRowDragEnd(...args);
    },
  },
};
