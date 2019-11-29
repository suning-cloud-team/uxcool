/**
 *  vue-virtual-scroll-list
 *  https://github.com/tangbc/vue-virtual-scroll-list
 *  引入的版本为 release V1.4.3,做了以下几点修改
 *
 *  1）格式化代码，统一满足项目eslint的要求
 *  2）去掉了对table的支持
 *  3) 修改了获取变化的元素高度的逻辑，将默认值由0改为预设置的大小size,增加了通过data-auto-height来获取高度的方法
 *  4)增加了几个公共方法，比如清除偏移缓存、更新某个序号的缓存
 */
import { debounce as debounceFn } from '@suning/v-utils';

export default {
  name: 'VirtualList',
  props: {
    size: {
      type: Number,
      required: true,
    },
    remain: {
      type: Number,
      required: true,
    },
    rtag: {
      type: String,
      default: 'div'
    },
    wtag: {
      type: String,
      default: 'div'
    },
    wclass: {
      type: String,
      default: '',
    },
    pagemode: {
      type: Boolean,
      default: false,
    },
    scrollelement: {
      type: typeof window === 'undefined' ? Object : HTMLElement,
      default: null,
    },
    start: {
      type: Number,
      default: 0,
    },
    offset: {
      type: Number,
      default: 0,
    },
    variable: {
      type: [Function, Boolean],
      default: false,
    },
    bench: {
      type: Number,
      default: 0, // also equal to remain
    },
    debounce: {
      type: Number,
      default: 0,
    },
    totop: {
      type: [Function, Boolean], // Boolean just disable for priviate.
      default: false,
    },
    tobottom: {
      type: [Function, Boolean], // Boolean just disable for priviate.
      default: false,
    },
    onscroll: {
      type: [Function, Boolean], // Boolean just disable for priviate.
      default: false,
    },
    item: {
      type: [Function, Object],
      default: null,
    },
    itemcount: {
      type: Number,
      default: 0,
    },
    itemprops: {
      type: Function,
      /* istanbul ignore next */
      default() {
      },
    },
  },

  // use changeProp to identify which prop change.
  watch: {
    size() {
      this.changeProp = 'size';
    },
    remain() {
      this.changeProp = 'remain';
    },
    bench() {
      this.changeProp = 'bench';
      this.itemModeForceRender();
    },
    start() {
      this.changeProp = 'start';
      this.itemModeForceRender();
    },
    offset() {
      this.changeProp = 'offset';
      this.itemModeForceRender();
    },
    itemcount() {
      this.changeProp = 'itemcount';
      this.itemModeForceRender();
    },
    scrollelement(newScrollelement, oldScrollelement) {
      if (this.pagemode) {
        return;
      }
      if (oldScrollelement) {
        this.removeScrollListener(oldScrollelement);
      }
      if (newScrollelement) {
        this.addScrollListener(newScrollelement);
      }
    },
  },

  created() {
    const start = this.start >= this.remain ? this.start : 0;
    const keeps = this.remain + (this.bench || this.remain);
    const delta = Object.create(null);

    delta.direction = ''; // current scroll direction, D: down, U: up.
    delta.scrollTop = 0; // current scroll top, use to direction.
    delta.start = start; // start index.
    delta.end = (start + keeps) - 1; // end index.
    delta.keeps = keeps; // nums keeping in real dom.
    delta.total = 0; // all items count, update in filter.
    delta.offsetAll = 0; // cache all the scrollable offset.
    delta.paddingTop = 0; // container wrapper real padding-top.
    delta.paddingBottom = 0; // container wrapper real padding-bottom.
    delta.varCache = {}; // object to cache variable index height and scroll offset.
    delta.varAverSize = 0; // average/estimate item height before variable be calculated.
    delta.varLastCalcIndex = 0; // last calculated variable height/offset index, always increase.
    delta.lastTotal = 0; // it's used to track delta.total has changed or not
    this.delta = delta;

    this.changedIndex = -1;
  },

  mounted() {
    const {
      pagemode, scrollelement, setScrollTop, addScrollListener,
      offset, getZone, getVarOffset, variable, size,
    } = this;
    if (pagemode) {
      addScrollListener(window);
    } else if (scrollelement) {
      addScrollListener(scrollelement);
    }
    if (this.start) {
      const { start } = getZone(this.start);
      setScrollTop(variable ? getVarOffset(start) : start * size);
    } else if (offset) {
      setScrollTop(offset);
    }
  },

  beforeDestroy() {
    const { pagemode, removeScrollListener, scrollelement } = this;
    if (pagemode) {
      removeScrollListener(window);
    } else if (scrollelement) {
      removeScrollListener(scrollelement);
    }
  },
  // check if delta should update when props change.
  beforeUpdate() {
    const {
      delta, remain, bench, changeProp, getZone,
      setScrollTop, offset, variable, getVarOffset, size,
    } = this;
    const calcstart = changeProp === 'start' ? this.start : delta.start;
    const zone = getZone(calcstart);
    delta.keeps = remain + (bench || remain);
    // if start, size or offset change, update scroll position.
    if (changeProp && ['start', 'size', 'offset'].includes(changeProp)) {
      let scrollTop = 0;
      if (changeProp === 'offset') {
        scrollTop = offset; // 更新了偏移，直接将偏移设置为滚动距离
      } else {
        const { isLast, start } = zone;
        const { total } = delta;
        if (variable) { // 可变高度，则通过函数来计算距离
          scrollTop = getVarOffset(isLast ? total : start);
        } else if (isLast && (total - calcstart <= remain)) { // 已经滚动到最底
          scrollTop = total * size;
        } else {
          scrollTop = calcstart * size;
        }
      }
      this.$nextTick(setScrollTop.bind(this, scrollTop));
    }

    // if points out difference, force update once again.
    if (changeProp || delta.end !== zone.end || calcstart !== zone.start) {
      this.changeProp = '';
      delta.end = zone.end;
      delta.start = zone.start;
      this.forceRender();
    }
  },

  methods: {
    // add pagemode/scrollelement scroll event listener
    addScrollListener(element) {
      const {
        debounce, onScroll
      } = this;
      this.scrollHandler = debounce ? debounceFn(onScroll.bind(this), debounce) : onScroll;
      element.addEventListener('scroll', this.scrollHandler, false);
    },

    // remove pagemode/scrollelement scroll event listener
    removeScrollListener(element) {
      const { scrollHandler } = this;
      element.removeEventListener('scroll', scrollHandler, false);
    },

    onScroll(event) {
      const {
        delta, $refs: { vsl }, scrollelement, $el,
        onscroll, updateZone
      } = this;
      let offset;
      if (this.pagemode) {
        const elemRect = $el.getBoundingClientRect();
        offset = -elemRect.top;
      } else if (scrollelement) {
        const scrollelementRect = scrollelement.getBoundingClientRect();
        const elemRect = $el.getBoundingClientRect();
        offset = scrollelementRect.top - elemRect.top;
      } else {
        offset = (vsl.$el || vsl).scrollTop || 0;
      }

      delta.direction = offset > delta.scrollTop ? 'D' : 'U';
      delta.scrollTop = offset;

      if (delta.total > delta.keeps) {
        updateZone(offset);
      } else {
        delta.end = delta.total - 1;
      }

      const { offsetAll } = delta;
      if (onscroll) { // 执行父组件提供的滚动回调函数
        const param = Object.create(null);
        param.offset = offset;
        param.offsetAll = offsetAll;
        param.start = delta.start;
        param.end = delta.end;
        this.onscroll(event, param);
      }

      if (!offset && delta.total) {
        this.fireEvent('totop');
      }

      if (offset >= offsetAll) {
        this.fireEvent('tobottom');
      }
    },

    // update render zone by scroll offset.
    updateZone(offset) {
      const {
        delta, variable, getVarOvers, size, remain,
      } = this;
      let overs = variable ? getVarOvers(offset) : Math.floor(offset / size);
      // if scroll up, we'd better decrease it's numbers.
      if (delta.direction === 'U') {
        overs = (overs - remain) + 1;
      }

      const zone = this.getZone(overs);
      const bench = this.bench || remain;
      // for better performance, if scroll pass items within now bench, do not update.
      // and if overs is going to reach last item, we should render next zone immediately.
      const shouldRenderNextZone = Math.abs(overs - delta.start - bench) === 1;
      if (
        !shouldRenderNextZone &&
        (overs - delta.start <= bench) &&
        !zone.isLast && (overs > delta.start)
      ) {
        return;
      }

      // we'd better make sure forceRender calls as less as possible.
      if (
        shouldRenderNextZone ||
        zone.start !== delta.start ||
        zone.end !== delta.end
      ) {
        delta.end = zone.end;
        delta.start = zone.start;
        this.forceRender();
      }
    },

    // return the right zone info base on `start/index`.
    getZone(zoneIndex) {
      const { delta: { total, keeps } } = this;
      let index = parseInt(zoneIndex, 10);
      index = Math.max(0, index);
      const lastStart = total - keeps;
      const isLast = (index <= total && index >= lastStart) || (index > total);
      let start;
      if (isLast) {
        start = Math.max(0, lastStart);
      } else {
        start = index;
      }

      return {
        end: (start + keeps) - 1,
        start,
        isLast,
      };
    },

    // public method, force render ui list if we needed.
    // call this before the next repaint to get better performance.
    forceRender() {
      window.requestAnimationFrame(() => {
        this.$forceUpdate();
      });
    },

    // force render ui if using item-mode.
    itemModeForceRender() {
      if (this.item) {
        this.forceRender();
      }
    },

    // return the scroll passed items count in variable.
    getVarOvers(offset) {
      let low = 0;
      let middle = 0;
      let middleOffset = 0;
      const { delta } = this;
      let high = delta.total;

      while (low <= high) {
        middle = low + Math.floor((high - low) / 2);
        middleOffset = this.getVarOffset(middle);

        // calculate the average variable height at first binary search.
        if (!delta.varAverSize) {
          delta.varAverSize = Math.floor(middleOffset / middle);
        }

        if (middleOffset === offset) {
          return middle;
        } else if (middleOffset < offset) {
          low = middle + 1;
        } else if (middleOffset > offset) {
          high = middle - 1;
        }
      }
      let result = 0;
      if (low > 0) {
        result = low - 1;
      }
      // console.log(delta.varCache);
      return result;
    },

    // return a variable scroll offset from given index.
    getVarOffset(index, nocache) {
      const { delta } = this;
      const cache = delta.varCache[index];

      if (!nocache && cache) {
        return cache.offset;
      }

      let offset = 0;
      for (let i = 0; i < index; i += 1) {
        const size = this.getVarSize(i, nocache);
        // If we can't get this item's height and then size is zero, so don't cache it
        // and the offset value use the default size
        // modify by andyhuang
        if (size > 0) {
          delta.varCache[i] = {
            size,
            offset,
          };
          offset += size;
        } else {
          offset += this.size;
        }
      }

      delta.varLastCalcIndex = Math.max(delta.varLastCalcIndex, index - 1);
      delta.varLastCalcIndex = Math.min(delta.varLastCalcIndex, delta.total - 1);

      return offset;
    },

    // return a variable size (height) from given index.
    getVarSize(index, nocache) {
      const { delta, variable, item } = this;
      const cache = delta.varCache[index];
      if (!nocache && cache) {
        return cache.size;
      }
      if (typeof variable === 'function') {
        return variable(index) || 0;
      }
      // when using item, it can only get current components height,
      // need to be enhanced, or consider using variable-function instead
      // eslint-disable-next-line no-nested-ternary
      const slot = item
        ? (this.$children[index] ? this.$children[index].$vnode : null)
        : this.$slots.default[index];
      const style = slot && slot.data && slot.data.style;
      if (style && style.height) {
        const shm = style.height.match(/^(.*)px$/);
        return (shm && +shm[1]) || 0;
      }
      const attrData = slot && slot.elm && slot.elm.dataset;
      if (attrData && attrData.autoHeight) {
        return +attrData.autoHeight || 0;
      }

      return 0;
    },

    // return the variable paddingTop base current zone.
    // @todo: if set a large `start` before variable was calculated,
    // here will also case too much offset calculate when list is very large,
    // consider use estimate paddingTop in this case just like `getVarPaddingBottom`.
    getVarPaddingTop() {
      return this.getVarOffset(this.delta.start);
    },

    // return the variable paddingBottom base current zone.
    getVarPaddingBottom() {
      const {
        delta: {
          total, end, keeps, varLastCalcIndex, varAverSize
        }, size
      } = this;
      const last = total - 1;
      if (total - end <= keeps || varLastCalcIndex === last) {
        return this.getVarOffset(last) - this.getVarOffset(end);
      }
      // if unreached last zone or uncalculate real behind offset
      // return the estimate paddingBottom avoid too much calculate.
      return (total - end) * (varAverSize || size);
    },

    // retun the variable all heights use to judge reach bottom.
    getVarAllHeight() {
      const {
        delta: {
          total, end, keeps, varLastCalcIndex, start, varAverSize
        }, getVarOffset, size
      } = this;
      if (total - end <= keeps || varLastCalcIndex === total - 1) {
        return getVarOffset(total);
      }
      return getVarOffset(start) + ((total - end) * (varAverSize || size));
    },

    // public method, allow the parent update variable by index.
    updateVariable(index) {
      // clear/update all the offfsets and heights ahead of index.
      this.getVarOffset(index, true);
    },

    // public method, allow the parent clear varCache
    clearVarCache() {
      const { delta } = this;
      delta.varCache = {};
      delta.varLastCalcIndex = 0;
    },

    // public method, allow to set the changed index
    setChangedIndex(changedIndex) {
      this.changedIndex = changedIndex;
    },
    // public method, allow to update all variable that have been cached.
    updateAllVarCache() {
      const { delta: { varLastCalcIndex }, updateVariable } = this;
      updateVariable(varLastCalcIndex);
    },

    // update current cahce value and the same time update all subsequent item's offset
    updateVarCacheItem(index, value) {
      const { delta: { varLastCalcIndex, varCache } } = this;
      const cache = varCache[index];
      if (!cache) {
        return;
      }
      const diffValue = value - cache.size;
      if (Math.abs(diffValue) < 0.000001) {
        // cached value is equaled to the new value, so it's needn't to update
        return;
      }
      cache.size = value;
      for (let i = index + 1; i <= varLastCalcIndex; i += 1) {
        const cacheItem = varCache[i];
        if (cacheItem && cacheItem.offset) {
          cacheItem.offset += diffValue;
          if (cacheItem.offset < 0) {
            cacheItem.offset = 0;
          }
        } else {
          break;
        }
      }
    },

    // update delta.varCache which index is larger than index
    updateAfterCache(index) {
      const { delta } = this;
      delta.varLastCalcIndex = index;
      Object.keys(delta.varCache).forEach( (key) => {
        if (key - 0 > index) {
          delta.varCache[key] = null;
        }
      });
    },

    updateChangedVarCache() {
      const { changedIndex, updateAfterCache } = this;
      // eslint-disable-next-line no-void
      if (changedIndex < 0) {
        return;
      }
      updateAfterCache(changedIndex);
      this.changedIndex = -1;
    },
    // trigger a props event on parent.
    fireEvent(event) {
      if (this[event]) {
        this[event]();
      }
    },

    // set manual scroll top.
    setScrollTop(scrollTop) {
      const { pagemode, scrollelement } = this;
      if (pagemode) {
        window.scrollTo(0, scrollTop);
      } else if (scrollelement) {
        scrollelement.scrollTo(0, scrollTop);
      } else {
        const { vsl } = this.$refs;
        if (vsl) {
          (vsl.$el || vsl).scrollTop = scrollTop;
        }
      }
    },

    // filter the shown items base on `start` and `end`.
    filter(h) {
      const {
        delta, variable, size, remain, updateChangedVarCache
      } = this;
      const slots = this.$slots.default || [];

      // item-mode shoud judge from items prop.
      if (this.item || this.$scopedSlots.item) {
        delta.total = this.itemcount;
        if (delta.keeps > delta.total) {
          delta.end = delta.total - 1;
        }
      } else {
        if (!slots.length) {
          delta.start = 0;
        }
        delta.total = slots.length;
      }

      if (delta.lastTotal !== 0 && delta.lastTotal !== delta.total && variable) {
        updateChangedVarCache();
      }
      delta.lastTotal = delta.total;
      // eslint-disable-next-line one-var
      let paddingTop;
      let paddingBottom;
      let allHeight;
      const hasPadding = delta.total > delta.keeps;

      if (variable) {
        allHeight = this.getVarAllHeight();
        paddingTop = hasPadding ? this.getVarPaddingTop() : 0;
        paddingBottom = hasPadding ? this.getVarPaddingBottom() : 0;
      } else {
        allHeight = size * delta.total;
        paddingTop = size * (hasPadding ? delta.start : 0);
        paddingBottom = (size * (hasPadding ? delta.total - delta.keeps : 0)) - paddingTop;
      }

      if (paddingBottom < size) {
        paddingBottom = 0;
      }

      delta.paddingTop = paddingTop;
      delta.paddingBottom = paddingBottom;
      delta.offsetAll = allHeight - (size * remain);

      const renders = [];
      for (let i = delta.start, end = Math.ceil(delta.end); i < delta.total && i <= end; i += 1) {
        let slot = null;
        if (this.$scopedSlots.item) {
          slot = this.$scopedSlots.item(i);
        } else if (this.item) {
          slot = h(this.item, this.itemprops(i));
        } else {
          slot = slots[i];
        }
        renders.push(slot);
      }
      return renders;
    },
  },

  render(h) {
    const list = this.filter(h);
    const {
      delta: { paddingTop, paddingBottom },
      pagemode, scrollelement, size, remain, onScroll, debounce, wtag, rtag
    } = this;

    const renderList = h(wtag, {
      style: {
        display: 'block',
        'padding-top': `${paddingTop}px`,
        'padding-bottom': `${paddingBottom}px`,
      },
      class: this.wclass,
      attrs: {
        role: 'group',
      },
    }, list);

    // page mode just render list, no wraper.
    if (pagemode || scrollelement) {
      return renderList;
    }
    const itemCount = list.length || 1;
    const styles = {
      display: 'block',
      'overflow-y': itemCount >= remain ? 'auto' : 'inital',
    };
    if (itemCount > remain) {
      styles.height = `${size * remain}px`;
    }
    return h(rtag, {
      ref: 'vsl',
      style: styles,
      on: {
        '&scroll': debounce ? debounceFn(onScroll.bind(this), debounce) : onScroll,
      },
    }, [
      renderList,
    ]);
  },
};
