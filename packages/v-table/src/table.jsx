import debounce from 'lodash/debounce';
import { isEqual, isArray, resetParentVisible, getScrollBarWidth } from '@suning/v-utils';
import { noop, getRowKey, addEventListener, flatRows } from './utils';
import ColumnMixin from './mixins/column';

import MainTable from './mainTable.vue';

export default {
  name: 'Table',
  provide() {
    return {
      rootVM: this,
    };
  },
  components: {
    MainTable,
  },
  mixins: [ColumnMixin],
  props: {
    prefixCls: {
      type: String,
      default: 'v-table',
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    useFixedHeader: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    bodyStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    rowClass: {
      type: [Object, String, Array, Function],
      default: '',
    },
    onRow: {
      type: Function,
      default: noop,
    },
    onHeaderRow: {
      type: Function,
      default: noop,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    footer: {
      type: String,
      default: '',
    },
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    scroll: {
      type: Object,
      default() {
        return {
          x: false,
          y: false,
        };
      },
    },
    // 主键字段名
    rowKey: {
      type: [Function, String],
      default: 'key',
    },
    indentSize: {
      type: [Number, String],
      default: 15,
    },
    childColName: {
      type: String,
      default: 'children',
    },
    expandIconAsCell: {
      type: Boolean,
      default: false,
    },
    expandRowByClick: {
      type: Boolean,
      default: false,
    },
    expandIconColIndex: {
      type: [Number, String],
      default: 0,
    },
    expandedRowRender: {
      type: Function,
      default: null,
    },
    expandedRowClassName: {
      type: Function,
      default() {
        return '';
      },
    },
    expandedRowKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    expandAllRows: {
      type: Boolean,
      default: false,
    },
    hideExpandTreeIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      debounceHandleWinResize: null,
      elementRefs: {},
      scrollBarW: getScrollBarWidth(),
      scrollPosition: 'left',
      fixedTableHeight: {
        thead: 'auto',
        rows: {},
        expandRows: {},
      },
      resizeEvent: null,
      resizeWatch: null,
      currentHoverRow: null,
      prevScrollLeft: 0,
      prevScrollTop: 0,
      innerExpanderRowKeys: [],
    };
  },
  computed: {
    classes() {
      const {
        prefixCls, useFixedHeader, scroll, scrollPosition
      } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-fixed-header`]: useFixedHeader || (scroll && scroll.y),
        [`${prefixCls}-scroll-position-left`]:
          scrollPosition === 'both' || scrollPosition === 'left',
        [`${prefixCls}-scroll-position-right`]:
          scrollPosition === 'both' || scrollPosition === 'right',
        [`${prefixCls}-scroll-position-middle`]: scrollPosition === 'middle',
      };
    },
    flatRecords() {
      const { childColName, value, rowKey } = this;
      const records = flatRows(value, childColName);
      return records.map((v, i) => {
        const nv = v;
        nv.$$_key = getRowKey(rowKey, v, i);
        return v;
      });
    },
  },
  watch: {
    expandedRowKeys(nVal, oVal) {
      if (isArray(nVal) && !isEqual(nVal, oVal)) {
        this.innerExpanderRowKeys = nVal.map(v => String(v));
      }
    },
    expandAllRows(nVal, oVal) {
      if (!isEqual(nVal, oVal)) {
        this.initExpanderRowKeys();
      }
    },
    flatRecords(nVal, oVal) {
      if (!isEqual(nVal, oVal)) {
        this.initExpanderRowKeys('flatRecords');
      }
    },
  },
  created() {
    this.initExpanderRowKeys();
  },
  mounted() {
    const { handleWinResize, bindResizeEvent } = this;
    this.debounceHandleWinResize = debounce(handleWinResize, 200);
    handleWinResize();
    bindResizeEvent();
    this.resizeWatch = this.$watch(
      () => {
        const { columns, value } = this;
        return {
          columns,
          value,
        };
      },
      () => {
        handleWinResize();
      }
    );
  },
  beforeDestroy() {
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }

    if (this.resizeWatch) {
      this.resizeWatch();
    }
  },
  methods: {
    initExpanderRowKeys(from) {
      const {
        expandAllRows, expandedRowKeys, flatRecords, innerExpanderRowKeys
      } = this;
      let rowKeys = [];
      if (expandAllRows) {
        for (let i = 0, l = flatRecords.length; i < l; i += 1) {
          const item = flatRecords[i];
          rowKeys.push(item.$$_key);
        }
      } else if (from === 'flatRecords') {
        rowKeys = innerExpanderRowKeys;
      } else if (isArray(expandedRowKeys)) {
        rowKeys = expandedRowKeys.map(v => String(v));
      }
      this.innerExpanderRowKeys = rowKeys;
    },
    getTitle() {
      const {
        title, $slots, $scopedSlots, value
      } = this;
      if ($scopedSlots.title) {
        return $scopedSlots.title({ records: value });
      }

      if ($slots.title) {
        return $slots.title;
      }

      if (title) {
        return title;
      }
      return null;
    },
    saveRef(refName, refElement) {
      const { elementRefs, $set } = this;
      if (refName in elementRefs) {
        elementRefs[refName] = refElement;
      } else {
        $set(elementRefs, refName, refElement);
      }
    },
    handleScrollPostion() {
      const { bodyTableRef } = this.elementRefs;
      let scrollPosition = '';
      if (bodyTableRef) {
        const { scrollWidth, scrollLeft } = bodyTableRef;
        const bodyWdith = bodyTableRef.getBoundingClientRect().width;

        if (bodyWdith >= scrollWidth) {
          scrollPosition = 'both';
        } else if (scrollLeft === 0) {
          scrollPosition = 'left';
        } else if (scrollLeft + bodyWdith >= scrollWidth - 1) {
          scrollPosition = 'right';
        } else {
          scrollPosition = 'middle';
        }
        this.scrollPosition = scrollPosition;
      }
    },
    onScrollX() {
      if (this.isAnyColumnsFixed) {
        this.handleScrollPostion();
      }
    },
    // 计算 table thead和row的高度
    syncFixedTableRowHeight() {
      const { elementRefs, fixedTableHeight } = this;
      const { tableTheadRef, tableRowRef, expandRowsRef } = elementRefs;
      if (tableTheadRef) {
        fixedTableHeight.thead = tableTheadRef.getBoundingClientRect().height || 'auto';
      }
      if (tableRowRef) {
        fixedTableHeight.rows = tableRowRef.reduce((r, v) => {
          const nr = r;
          if (!v.expandRow) {
            nr[v.rowIdx] = v.$el.getBoundingClientRect().height || 'auto';
          }
          return r;
        }, {});
      }
      if (expandRowsRef) {
        fixedTableHeight.expandRows = expandRowsRef.reduce((r, v) => {
          const nr = r;
          if (v.expandRow) {
            nr[v.uid] = v.$el.getBoundingClientRect().height || 'auto';
          }
          return nr;
        }, {});
      }
    },
    handleWinResize() {
      const {
        $refs: { tableWrapRef },
        isAnyColumnsFixed,
        syncFixedTableRowHeight,
        handleScrollPostion,
      } = this;
      if (isAnyColumnsFixed) {
        if (!tableWrapRef) {
          return;
        }
        const result = resetParentVisible(tableWrapRef);
        syncFixedTableRowHeight();
        handleScrollPostion();
        result.reset();
      }
    },
    bindResizeEvent() {
      if (!this.resizeEvent) {
        this.resizeEvent = addEventListener(window, 'resize', this.debounceHandleWinResize);
      }
    },
    handleRowHover(row) {
      this.currentHoverRow = row;
    },
    updatePrevScrollLeft(scrollLeft) {
      this.prevScrollLeft = scrollLeft;
    },
    updatePrevScrollTop(scrollTop) {
      this.prevScrollTop = scrollTop;
    },
    handleExpandChange(e, expanded, record, rowIdx, rowKey) {
      const { innerExpanderRowKeys, flatRecords } = this;
      let nRowKeys = [];
      if (expanded) {
        nRowKeys = [...innerExpanderRowKeys, rowKey];
      } else {
        nRowKeys = innerExpanderRowKeys.filter(v => v !== rowKey);
      }
      this.$emit(
        'expanded-row-change',
        nRowKeys,
        flatRecords.filter(v => nRowKeys.indexOf(v.$$_key) > -1)
      );
      this.$emit('expand', expanded, record, rowIdx);
      this.innerExpanderRowKeys = nRowKeys;
    },
  },
  render() {
    const {
      $scopedSlots,
      $slots,
      footer,
      emptyText,
      prefixCls,
      classes,
      getTitle,
      isAnyColumnsLeftFixed,
      isAnyColumnsRightFixed,
      onScrollX,
    } = this;

    const title = getTitle();
    const titleElement = title ? <div class={`${prefixCls}-title`}>{title}</div> : null;

    const leftElement = isAnyColumnsLeftFixed ? (
      <div class={`${prefixCls}-fixed-left`}>
        <main-table fixed="left" />
      </div>
    ) : null;
    const rightElement = isAnyColumnsRightFixed ? (
      <div class={`${prefixCls}-fixed-right`}>
        <main-table fixed="right" />
      </div>
    ) : null;

    let scopedSlots = null;

    if ($scopedSlots.footer) {
      scopedSlots = {
        footer(props) {
          return $scopedSlots.footer(props);
        },
      };
    }

    return (
      <div class={classes} ref="tableWrapRef">
        {titleElement}
        <div class={`${prefixCls}-content`}>
          {/* scopeSlots属性需要要放置在实际有slot-scope的元素上 */}
          <main-table
            {...{
              scopedSlots,
            }}
            on-scroll-x={onScrollX}
          >
            <template slot="empty">{$slots.empty || emptyText}</template>
            <template slot="footer">{$slots.footer || footer}</template>
          </main-table>
          {leftElement}
          {rightElement}
        </div>
      </div>
    );
  },
};
