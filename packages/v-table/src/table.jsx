import debounce from 'lodash/debounce';
import { isEqual, isArray, resetParentVisible, getScrollBarWidth } from '@suning/v-utils';
import { noop, getRowKey, addEventListener, flatRows, calcDragPosition } from './utils';
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

    // drag and drop
    draggable: {
      type: Boolean,
      default: false,
    },
    allowDrag: {
      type: Function,
      default: null,
    },
    allowDrop: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      // add by xql 2019/11/7 组件内部应该使用内部变量，而不是传入属性
      recordMap: {},
      innerValue: [],
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
      // for DnD
      dragRowId: null,
      dragRow: null,
      dragLeaveRowId: null,
      dragOverRowId: null,
      /**
       * 在子元素中拖动会频繁触发dragenter/dragleave事件，从a->b->c会按照:
       *  enter a, enter b, leave a, enter c , leave b的顺序触发，考虑到fixed时有3个表格，
       *  dom元素是分离的，所以通过定时器去判断，副作用是最终emit的ldragleave事件会滞后
       * */
      dragLeaveTimers: {},
      // dragenter之后延迟一会儿再展开行
      dragEnterTimers: {},
      // fixed有3个表格需要同步状态，只能通过外层属性去记录状态
      dragPosition: 'none',
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
        itemSize: expand || expandedRowRender ? null : virtualScroll.itemSize,
        maxHeight:
          typeof scroll.y === 'string' || typeof scroll.y === 'number'
            ? scroll.y
            : virtualScroll.maxHeight,
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

      return flatVirtualScrollRecords.filter(({ ancestors }) =>
        ancestors.length === 0 || ancestors.every(key => innerExpanderRowKeys.indexOf(key) > -1));
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
    value() {
      const {
        value, rowKey, childColName, createInnerValue
      } = this;
      this.innerValue = createInnerValue(value, childColName, rowKey);
    },
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

    const {
      value, rowKey, childColName, createInnerValue
    } = this;
    this.innerValue = createInnerValue(value, childColName, rowKey);
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
    // 创建value内部副本
    createInnerValue(value, childColName, rowKey) {
      const map = {};
      let count = 0;
      // 清空数据缓存
      this.recordMap = map;

      const traverse = (list, parentKey) => {
        const result = [];

        const { length } = list;
        list.forEach((item, i) => {
          // 和flatRecords的$$key以及内部的rowIdx保持一致
          const key = getRowKey(rowKey, item, count);
          const nItem = {
            ...item,
            // 用$$开头防止和用户属性冲突
            $$meta: {
              key,
              index: count,
              parent: parentKey ? map[parentKey] : null,
              // isFirst: i === 0,
              isLast: i + 1 === length,
              // 保留原始数据
              origin: item,
            },
          };

          // 存入缓存，方便查找
          map[key] = nItem;

          count += 1;

          const children = item[childColName];
          nItem[childColName] = children && children.length > 0 ? traverse(children, key) : [];

          result.push(nItem);
        });

        return result;
      };

      return traverse(value);
    },
    // 暴露一个方法，可以拿到跟innerValue结构一致的原始数据副本
    getValue() {
      const { innerValue, childColName } = this;

      const traverse = (list) => {
        const result = [];
    
        list.forEach(({ $$meta: { origin }, [`${childColName}`]: children }) => {
          const item = { ...origin };
    
          if (children && children.length > 0) {
            item[childColName] = traverse(children);
          }
    
          result.push(item);
        });
        return result;
      };
    
      return traverse(innerValue);
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
    getFirstSibling(record) {
      const { childColName, innerValue } = this;
      const siblings = record.$$meta.parent ? record.$$meta.parent[childColName] : innerValue;
      return siblings[0];
    },
    getLastSibling(record) {
      const { childColName, innerValue } = this;
      const siblings = record.$$meta.parent ? record.$$meta.parent[childColName] : innerValue;
      return siblings[siblings.length - 1];
    },
    // row dnd
    onTableRowDragStart(event, rowId, { record }) {
      // 通过记录拖拽元素来判定触发事件是否来自当前表格实例
      this.dragRowId = rowId;
      this.dragRow = record;
      this.$emit('dragstart', { event, dragKey: rowId, dragRecord: record });
    },
    onTableRowDragEnter(event, rowId, {
      isCanExpandRow, isExpanded, record, rowIdx, expandRow
    }) {
      const {
        dragRow,
        dragRowId,
        dragLeaveRowId,
        dragOverRowId,
        handleExpandChange,
        dragEnterTimers,
        dragLeaveTimers,
      } = this;

      // 拖拽元素并非来自当前实例
      if (dragRow === null) {
        return;
      }

      // 清空位置，防止进入另一行时还未来得及触发dragover计算位置，渲染的线条错位
      this.dragPosition = 'none';
      // 保存本次dragenter的元素
      this.dragOverRowId = rowId;

      // dragleave元素在同一行，清除计时器
      if (dragLeaveRowId !== null && dragLeaveRowId === rowId) {
        clearTimeout(dragLeaveTimers[rowId]);
      }

      // 进入非拖拽元素，展开该行
      if (rowId !== dragRowId && isCanExpandRow && !isExpanded) {
        dragEnterTimers[rowId] = setTimeout(() => {
          handleExpandChange(event, true, record, rowIdx, rowId);
        }, 500);
      }

      // 上一次dragenter的元素不在同一行，则触发dragenter
      if (dragOverRowId !== rowId) {
        this.$emit('dragenter', {
          event,
          isExpandRow: expandRow,
          record,
          key: rowId,
          dragKey: dragRowId,
          dragRecord: dragRow,
        });

        if (dragOverRowId) {
          clearTimeout(dragEnterTimers[dragOverRowId]);
        }
      }
    },
    onTableRowDragLeave(event, rowId, { record, expandRow }) {
      const {
        dragRow, dragRowId, dragOverRowId, dragEnterTimers, dragLeaveTimers
      } = this;

      if (dragRow === null) {
        return;
      }

      // 保存本次离开的行
      this.dragLeaveRowId = rowId;

      // 在子元素中拖拽时会频繁触发dragenter/dragleave事件，通过定时器去执行dragleave逻辑，如果拖拽后还在同一行，则定时器会被后续dragover清理掉
      dragLeaveTimers[rowId] = setTimeout(() => {
        this.$emit('dragleave', {
          event,
          isExpandRow: expandRow,
          record,
          key: rowId,
          dragKey: dragRowId,
          dragRecord: dragRow,
        });
        // 清空展开行定时器
        clearTimeout(dragEnterTimers[rowId]);

        if (dragOverRowId === rowId) {
          this.dragOverRowId = null;
          this.dragPosition = 'none';
        }
      }, 100);
    },
    onTableRowDragOver(event, rowId, { $el, record, expandRow }) {
      const {
        dragRow, dragRowId, dragLeaveRowId, dragLeaveTimers
      } = this;

      if (dragRow === null) {
        return;
      }

      const position = calcDragPosition(event, $el);

      if (dragLeaveRowId !== null && dragLeaveRowId === rowId) {
        clearTimeout(dragLeaveTimers[rowId]);
      }

      this.dragPosition = position;
      this.$emit('dragover', {
        event,
        position,
        isExpandRow: expandRow,
        record,
        key: rowId,
        dragKey: dragRowId,
        dragRecord: dragRow,
      });
    },
    onTableRowDrop(event, rowId, {
      record, isExpanded, isExpandable, rowIdx, expandRow
    }) {
      const {
        dragPosition,
        dragRow,
        dragRowId,
        recordMap,
        innerValue,
        childColName,
        handleExpandChange,
        getLastSibling,
        getValue,
        clearDndData,
      } = this;
      if (dragRow === null) {
        return;
      }

      this.dragPosition = 'none';

      // drag和drop的同一个元素，只有最后一个子节点拖到自身底部（即把子节点拖出来）才是允许的
      if (
        dragRowId === rowId &&
        !(dragPosition === 'bottom' && dragRow.$$meta.parent && dragRow.$$meta.isLast)
      ) {
        return;
      }

      // 只有正常节点才能drag，所以能够从map中找到source
      const source = recordMap[dragRowId];
      const sourceSiblings = source.$$meta.parent ? source.$$meta.parent[childColName] : innerValue;
      const sourceIndex = sourceSiblings.findIndex(({ $$meta: { key } }) => key === dragRowId);
      // 移除dragRow
      sourceSiblings.splice(sourceIndex, 1);
      const lastSourceSibling = getLastSibling(source);
      if (lastSourceSibling) {
        lastSourceSibling.$$meta.isLast = true;
      }

      // isExpanded是根据expanderRowKeys判断的，理论上如果用户给expanderRowKeys传入不可展开行的key，光看isExpanded会导致判断错误
      const isRowExpanded = isExpanded && isExpandable;

      // 在扩展行上触发drop事件只有一种情况，即插入到expandRow父元素的第一个子节点位置
      if (expandRow) {
        // 扩展行的id为`${parentKey}-expand-slot-row`或`${parentKey}-expand-row`
        const parentKey = rowId.slice(0, rowId.lastIndexOf('-expand'));
        const dest = recordMap[parentKey];
        const { [`${childColName}`]: children = [] } = dest;

        children.unshift(source);
        source.$$meta.parent = dest;
        source.$$meta.isLast = children.length === 1;
        dest[childColName] = children;
        // drag和drop是同一个元素，即把最后一个子节点拖到父节点后面
      } else if (dragRowId === rowId) {
        const dest = source.$$meta.parent;
        const destSiblings = dest.$$meta.parent ? dest.$$meta.parent[childColName] : innerValue;
        const destIndex = destSiblings.findIndex(({ $$meta: { key } }) => key === dest.$$meta.key);
        // drag元素是否是最后一项取决于父节点原先是否是最后一项
        source.$$meta.isLast = dest.$$meta.isLast;
        source.$$meta.parent = dest.$$meta.parent;
        dest.$$meta.isLast = false;
        destSiblings.splice(destIndex + 1, 0, source);
      } else {
        const dest = recordMap[rowId];

        // 插入到前面
        if (dragPosition === 'top') {
          const destSiblings = dest.$$meta.parent ? dest.$$meta.parent[childColName] : innerValue;
          const destIndex = destSiblings.findIndex(({ $$meta: { key } }) => key === rowId);
          destSiblings.splice(destIndex, 0, source);
          source.$$meta.isLast = false;
          source.$$meta.parent = dest.$$meta.parent;
        } else if (dragPosition === 'bottom' && !isRowExpanded) {
          // 插入到底部
          const destSiblings = dest.$$meta.parent ? dest.$$meta.parent[childColName] : innerValue;
          const destIndex = destSiblings.findIndex(({ $$meta: { key } }) => key === rowId);
          source.$$meta.isLast = dest.$$meta.isLast;
          source.$$meta.parent = dest.$$meta.parent;
          dest.$$meta.isLast = false;
          destSiblings.splice(destIndex + 1, 0, source);
        } else if (dragPosition === 'bottom' && isRowExpanded) {
          // 插入到目标元素子元素开头
          const { [`${childColName}`]: children = [] } = dest;
          children.unshift(source);
          source.$$meta.parent = dest;
          source.$$meta.isLast = children.length === 1;
          dest[childColName] = children;
        } else {
          // 插入到目标元素子元素末尾
          const { [`${childColName}`]: children = [] } = dest;
          const lastChild = children[children.length - 1];
          if (lastChild) {
            lastChild.$$meta.isLast = false;
          }
          source.$$meta.parent = dest;
          source.$$meta.isLast = true;
          children.push(source);
          dest[childColName] = children;
          // 展开目标行
          handleExpandChange(event, true, { ...record.$$meta.origin }, rowIdx, rowId);
        }
      }

      clearDndData();

      this.$emit('drop', {
        event,
        getValue,
        record,
        key: rowId,
        dragKey: dragRowId,
        dragRecord: dragRow,
        position: dragPosition,
        isExpandRow: expandRow,
        isExpanded: isRowExpanded,
      });

      // 同步一下高度
      this.$nextTick(() => {
        this.syncFixedTableRowHeight();
      });
    },
    onTableRowDragEnd(event, rowId, { record }) {
      const { clearDndData } = this;

      clearDndData();
      this.$emit('dragend', { event, dragKey: rowId, dragRecord: record });
    },
    clearDndData() {
      const { dragEnterTimers, dragLeaveTimers } = this;

      Object.keys(dragEnterTimers).forEach((k) => {
        clearTimeout(dragEnterTimers[k]);
      });
      Object.keys(dragLeaveTimers).forEach((k) => {
        clearTimeout(dragEnterTimers[k]);
      });

      this.dragRowId = null;
      this.dragRow = null;
      this.dragLeaveRowId = null;
      this.dragOverRowId = null;
      this.dragPosition = 'none';
      this.dragEnterTimers = {};
      this.dragLeaveTimers = {};
    }
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
