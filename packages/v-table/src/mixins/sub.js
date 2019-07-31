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
  },
  methods: {
    saveRef(refName, refElement) {
      this.rootVM.saveRef(refName, refElement);
    },
    updateRowHeightAndScrollPosition() {
      this.rootVM.handleWinResize();
    },
  },
};
