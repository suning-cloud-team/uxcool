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
      scrollData: this.scrollData,
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
    // virtualscroll
    virtualScroll: {
      type: [Boolean, Object],
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
      // 虚拟滚动模式使用
      scrollData: {
        sizes: {},
        validSizes: {},
        startIndex: 0,
        endIndex: 0,
        top: 0,
        bottom: 0,
      },
    };
  },
  computed: {
    classes() {
      const {
        prefixCls, useFixedHeader, scroll, scrollPosition, virtualScroll
      } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-fixed-header`]: useFixedHeader || (scroll && scroll.y) || virtualScroll,
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

    virtualConfig() {
      const {
        virtualScroll,
        scroll,
        $scopedSlots: { expand },
        expandedRowRender,
      } = this;
      if (!virtualScroll) {
        return null;
      }

      return {
        buffer: 200,
        minItemSize: 51,
        prerender: 0,
        ...virtualScroll,
        // 有expand或expandedRowRender，则认为是未知高度
        itemSize: (expand || expandedRowRender) ? null : virtualScroll.itemSize,
        maxHeight: typeof scroll.y === 'string' || typeof scroll.y === 'number' ? scroll.y : virtualScroll.maxHeight,
      };
    },

    // 将所有数据包含expanded-row-render和expand slot的记录拍平
    flatVirtualScrollRecords() {
      const { virtualScroll, flattenVirtualScrollRecords } = this;
      if (!virtualScroll) {
        return [];
      }
      
      return flattenVirtualScrollRecords();
    },

    // 根据折叠展开过滤出显示的条目
    visibleVirtualScrollRecords() {
      const { innerExpanderRowKeys, flatVirtualScrollRecords } = this;

      return flatVirtualScrollRecords.filter(({ ancestors }) => ancestors.length === 0 || ancestors.every(key => innerExpanderRowKeys.indexOf(key) > -1));
    },

    visibleVirtualScrollRecordsWithSize() {
      const {
        virtualConfig,
        visibleVirtualScrollRecords,
        scrollData: { sizes },
      } = this;
      // 非虚拟滚动或固定高度
      if (!virtualConfig || virtualConfig.itemSize) {
        return visibleVirtualScrollRecords;
      }

      // 未知高度,在子组件中动态修改sizes
      return visibleVirtualScrollRecords.map((item) => {
        const { key } = item;
        let size = sizes[key];
        if (typeof size === 'undefined' && !this.$_undefinedSizeMap[key]) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.$_undefinedSizeCount += 1;
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.$_undefinedSizeMap[key] = true;
          size = 0;
        }
        return {
          ...item,
          size,
        };
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
    visibleVirtualScrollRecords() {
      this.forceUpdate(true);
    },
  },
  created() {
    this.$_undefinedSizeCount = 0;
    this.$_undefinedSizeMap = {};

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

    // 给虚拟滚动使用
    flattenVirtualScrollRecords() {
      const {
        value,
        childColName,
        rowKey,
        $scopedSlots: { expand },
        expandedRowRender,
      } = this;
      const result = [];
      let rowIdx = 0;
      const traverse = (records, level = 0, ancestors = []) => {
        records.forEach((record) => {
          const key = getRowKey(rowKey, record, rowIdx);

          result.push({
            rowIdx,
            record,
            level,
            key,
            ancestors,
            type: 'row',
          });
          // 跟tableBody保持逻辑一致
          rowIdx += 1;

          const nextAncestors = [...ancestors, key];

          if (expandedRowRender) {
            result.push({
              rowIdx,
              record,
              level: level + 1,
              key: `${key}-expand-row`,
              ancestors: nextAncestors,
              renderFn: expandedRowRender,
              type: 'expand-row',
            });
          }

          if (expand) {
            result.push({
              rowIdx,
              record,
              level: level + 1,
              key: `${key}-expand-slot-row`,
              ancestors: nextAncestors,
              renderFn: expand,
              type: 'expand-slot-row',
            });
          }

          const children = record[childColName];

          if (children && children.length) {
            traverse(children, level + 1, nextAncestors);
          }
        });
      };
      traverse(value);
      return result;
    },

    clear() {
      this.scrollData.validSizes = {};
      this.$_undefinedSizeCount = 0;
      this.$_undefinedSizeMap = {};
    },

    forceUpdate(clear) {
      if (clear) {
        this.clear();
      }
      this.$emit('scroll:forceUpdate');
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
