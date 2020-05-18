import { raf } from '@cloud-sn/v-utils';
import { getRefName } from './utils';
import SubMixin from './mixins/sub';
import VirtualBaseTable from './virtualBaseTable';

const DEFAULT_MAX_HEIGHT = 500;

export default {
  name: 'VirtualBodyTable',
  components: {
    VirtualBaseTable,
  },
  mixins: [SubMixin],
  data() {
    return {
      pool: [],
      top: 0,
      bottom: 0,
      ready: false,
    };
  },
  computed: {
    refName() {
      return getRefName(this.fixed, 'bodyTableRef');
    },

    virtualConfig() {
      return this.rootVM.virtualConfig;
    },

    maxHeight() {
      let {
        virtualConfig: { maxHeight },
      } = this;

      maxHeight = parseInt(maxHeight, 10) || DEFAULT_MAX_HEIGHT;

      return maxHeight;
    },

    style() {
      const {
        isFixedHeader,
        fixed,
        bodyStyle,
        scroll,
        scrollBarW,
        maxHeight,
        virtualScrollMode,
      } = this;

      let style = {};

      if (scroll.x && !fixed) {
        style.overflowX = 'auto';
      }

      if ((scroll.y || virtualScrollMode) && !fixed) {
        style.maxHeight = `${maxHeight}px`;
        style.overflowY = 'scroll';
      }

      if (scroll.x || scroll.y) {
        // bug retina ,chrome overflow auto
        // https://bibwild.wordpress.com/2015/07/04/long-standing-bug-in-chrome-webkit-on-page-not-being-drawn-scrollauto-retina/
        style.webkitTransform = 'translate3d(0,0,0)';
      }

      style = { ...style, ...bodyStyle };

      // header fixed
      /**
       * jsdom 无法正确获取 scrollWidth
       * https://github.com/jsdom/jsdom/issues/1192
       */
      /* istanbul ignore if */
      if (isFixedHeader && fixed && scrollBarW > 0) {
        style.marginBottom = `-${scrollBarW}px`;
        style.paddingBottom = 0;
      }
      return style;
    },

    fixedInnerStyle() {
      const { scroll, maxHeight, virtualScrollMode } = this;
      const style = {};
      if (scroll.y || virtualScrollMode) {
        style.maxHeight = `${maxHeight}px`;
        style.overflowY = 'scroll';
      }
      return style;
    },

    containerStyle() {
      const { top, bottom } = this;
      return {
        paddingTop: `${top}px`,
        paddingBottom: `${bottom}px`,
      };
    },

    hasFixedElement() {
      const { fixed, isAnyColumnsLeftFixed, isAnyColumnsRightFixed } = this;
      if (fixed === 'left') {
        return isAnyColumnsLeftFixed;
      }
      if (fixed === 'right') {
        return isAnyColumnsRightFixed;
      }
      return false;
    },

    virtualRecords() {
      return this.rootVM.visibleVirtualScrollRecordsWithSize;
    },

    // 给内层row判断使用，与原table逻辑保持一致
    needExpand() {
      const { childColName, virtualRecords } = this;

      return virtualRecords.some(
        // eslint-disable-next-line
        ({ record, level }) => level === 0 && record[childColName] && record[childColName].length > 0
      );
    },

    // 用来存储每个元素的尺寸，用于判断渲染范围
    sizes() {
      const {
        virtualConfig: { itemSize, minItemSize },
        virtualRecords,
      } = this;

      // 未知尺寸
      if (!itemSize) {
        return virtualRecords.reduce((acc, cur, i) => {
          // 当未指定size时通过minItemSize估算
          const size = cur.size || minItemSize;
          acc[i] = {
            size,
            accumulator: acc[i - 1] ? acc[i - 1].accumulator + size : size,
          };
          return acc;
        }, []);
      }
      // 定高
      return [];
    },
  },

  watch: {
    virtualRecords() {
      if (!this.fixed) {
        this.updateVisibleItems();
      }
    },
    sizes() {
      if (!this.fixed) {
        this.updateVisibleItems();
      }
    },
  },

  created() {
    // 固定列通过监听数据变化来更新数据,而非自己计算
    if (this.fixed) {
      this.$watch(
        () => {
          const {
            startIndex, endIndex, top, bottom
          } = this.scrollData;
          const { virtualRecords } = this;
          return [startIndex, endIndex, top, bottom, virtualRecords];
        },
        (n) => {
          this.setPool(...n);
        }
      );
    }
    if (this.$isServer) {
      this.updateVisibleItems();
    }
  },

  mounted() {
    const { $refs, refName } = this;
    this.saveRef(refName, $refs[refName]);

    this.$nextTick(() => {
      // 非固定表格更新渲染池数据，带动watch更新fixed表格
      if (!this.fixed) {
        this.updateVisibleItems();
      }
      this.ready = true;
    });
  },

  methods: {
    addView(pool, index, item) {
      const view = {
        item,
      };

      const nonReactive = {
        index,
      };
      Object.defineProperty(view, 'nr', {
        configurable: false,
        value: nonReactive,
      });
      pool.push(view);
    },

    onScroll(e) {
      e.stopPropagation();
      this.$emit('body-scroll', e);

      if (!this.$_scrollDirty && !this.fixed) {
        this.$_scrollDirty = true;
        raf(() => {
          this.$_scrollDirty = false;
          const { continuous } = this.updateVisibleItems();

          // It seems sometimes chrome doesn't fire scroll event :/
          // When non continous scrolling is ending, we force a refresh
          if (!continuous) {
            clearTimeout(this.$_refreshTimout);
            this.$_refreshTimout = setTimeout(() => {
              this.onScroll(e);
            }, 60);
          }
        });
      }
    },

    updateVisibleItems() {
      const {
        virtualRecords,
        sizes,
        virtualConfig: { itemSize, buffer },
        scrollData,
        setPool,
      } = this;

      const { floor, ceil } = Math;
      const count = virtualRecords.length;
      let startIndex;
      let endIndex;
      let top = 0;
      let bottom = 0;
      let totalSize;

      if (!count) {
        [startIndex, endIndex, totalSize] = [0, 0, 0];
      } else if (this.$isServer) {
        startIndex = 0;
        endIndex = this.prerender;
        totalSize = null;
      } else {
        let { start, end } = this.getScroll();
        start -= buffer;
        end += buffer;

        // Variable size mode
        if (!itemSize) {
          let h;
          let a = 0;
          let b = count - 1;
          let i = floor(count / 2);
          let oldI;

          // Searching for startIndex
          do {
            oldI = i;
            h = sizes[i].accumulator;
            if (h < start) {
              a = i;
            } else if (i < count - 1 && sizes[i + 1].accumulator > start) {
              b = i;
            }
            i = floor((a + b) / 2);
          } while (i !== oldI);

          if (i < 0) {
            i = 0;
          }
          startIndex = i;

          // For container style
          totalSize = sizes[count - 1].accumulator;

          // Searching for endIndex
          for (endIndex = i; endIndex < count && sizes[endIndex].accumulator < end; endIndex += 1);
          endIndex += 1;
          // Bounds
          if (endIndex > count) {
            endIndex = count;
          }

          top = startIndex > 0 ? sizes[startIndex - 1].accumulator : 0;
          bottom = totalSize - sizes[endIndex - 1].accumulator;
        } else {
          // Fixed size mode
          startIndex = floor(start / itemSize);
          endIndex = ceil(end / itemSize);

          // Bounds
          if (startIndex < 0) {
            startIndex = 0;
          }
          if (endIndex > count) {
            endIndex = count;
          }

          totalSize = count * itemSize;

          top = startIndex * itemSize;
          bottom = totalSize - endIndex * itemSize;
        }
      }

      // 判断滚动是否连续
      const continuous = startIndex <= scrollData.endIndex && endIndex >= scrollData.startIndex;
      setPool(startIndex, endIndex, top, bottom, virtualRecords);
      // 传给子组件，通过条件减少计算次数
      scrollData.startIndex = startIndex;
      scrollData.endIndex = endIndex;
      scrollData.top = this.top;
      scrollData.bottom = this.bottom;
      return {
        continuous,
      };
    },

    setPool(startIndex, endIndex, top, bottom, records) {
      const pool = [];
      const { addView } = this;
      for (let i = startIndex; i < endIndex; i += 1) {
        addView(pool, i, records[i]);
      }
      this.pool = pool;
      this.top = top;
      this.bottom = bottom;
    },

    getScroll() {
      const {
        $refs: {
          [this.refName]: { scrollTop },
        },
        maxHeight,
      } = this;

      const scrollState = {
        start: scrollTop,
        end: scrollTop + maxHeight,
      };

      return scrollState;
    },

    /**
     * 暂未使用
     * @param {Number} index
     */
    /* istanbul ignore next */
    scrollToItem(index) {
      const {
        virtualConfig: { itemSize },
        sizes,
        scrollToPosition,
      } = this;

      let scroll;
      if (!itemSize) {
        scroll = index > 0 ? sizes[index - 1].accumulator : 0;
      } else {
        scroll = index * itemSize;
      }
      scrollToPosition(scroll);
    },
    /**
     * 暂未使用
     * @param {Number} index
     */
    /* istanbul ignore next */
    scrollToPosition(position) {
      this.$refs[this.refName].scrollTop = position;
    },
    /**
     * 暂未使用
     * @param {Number} index
     */
    /* istanbul ignore next */
    scrollToBottom() {
      if (this.$_scrollingToBottom) {
        return;
      }

      this.$_scrollingToBottom = true;
      const el = this.$refs[this.refName];

      // Item is inserted to the DOM
      this.$nextTick(() => {
        // Item sizes are computed
        const cb = () => {
          el.scrollTop = el.scrollHeight;
          if (this.$_undefinedSizeCount === 0) {
            this.$$_scrollingToBottom = false;
          } else {
            raf(cb);
          }
        };

        raf(cb);
      });
    },
  },

  render() {
    const {
      prefixCls,
      fixed,
      refName,
      style,
      fixedInnerStyle,
      hasFixedElement,
      onScroll,
      containerStyle,
      pool,
      virtualConfig: { itemSize },
      needExpand,
    } = this;

    const table = (
      <virtual-base-table pool={pool} fixed={fixed} itemSize={itemSize} needExpand={needExpand} />
    );

    // left and right fixed时渲染列表
    if (fixed) {
      return hasFixedElement ? (
        <div class={`${prefixCls}-body-outer`} style={style}>
          <div
            ref={refName}
            class={`${prefixCls}-body-inner`}
            style={fixedInnerStyle}
            on-scroll={onScroll}
          >
            <div style={containerStyle}>{table}</div>
          </div>
        </div>
      ) : null;
    }
    return (
      <div ref={refName} class={`${prefixCls}-body`} style={style} on-scroll={onScroll}>
        <div role="virtual" style={containerStyle}>{table}</div>
      </div>
    );
  },
};
