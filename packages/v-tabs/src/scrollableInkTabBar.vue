<script>
  import { HTMLElementType } from '@suning/v-utils';
  import debounce from 'lodash/debounce';
  import InkTabBar from './inkTabBar.vue';
  import {
    addEventListener,
    getElementOffset,
    getElementWH,
    isTransform3dSupported,
    isVertical,
  } from './utils';

  export default {
    name: 'ScrollInkTabBar',
    props: {
      prefixCls: String,
      tabs: Array,
      tabBarPosition: String,
      rootNode: HTMLElementType(),
      scrollAnimated: {
        type: Boolean,
        default: true,
      },
      size: String,
    },
    data() {
      return {
        init: true,
        activeTab: null,
        offset: 0,
        isSupportedTransform3d: isTransform3dSupported(),
        // isSupportedTransform3d: false,
        minOffset: 0,
        navWrapWH: 0,
        oldHasArrow: this.hasArrow,
        resizeEvent: null,
        debounceCalcMinOffset: null,
      };
    },
    created() {
      this.oldHasArrow = this.hasArrow;
      this.debounceCalcMinOffset = debounce(this.calcMinOffset, 200);
    },
    mounted() {
      this.resizeEvent = addEventListener(
        window,
        'resize',
        debounce(() => {
          this.$nextTick(() => {
            this.calcMinOffset();
            // 当前hasArrow与上一次的hasArrow不一致时, 会触发next button的onTransitionend事件,由它进行重新计算
            // if (this.hasArrow === this.oldHasArrow) {
            this.scrollToActiveTab();
            // }
          });
        }, 150)
      );
    },
    updated() {
      const { $refs } = this;
      const { tabs } = $refs;
      if (tabs) {
        const [activeTab] = tabs.filter(v => !!v.getAttribute('data-active')) || [];
        this.activeTab = activeTab;
      }
      // TODO:需优化, 有点难度
      this.debounceCalcMinOffset();
    },
    beforeDestroy() {
      if (this.resizeEvent) {
        this.resizeEvent.remove();
      }
    },
    computed: {
      navPrefixCls() {
        const { prefixCls } = this;
        return `${prefixCls}-nav`;
      },
      classes() {
        const { navPrefixCls, hasArrow } = this;
        return {
          [`${navPrefixCls}-container`]: true,
          [`${navPrefixCls}-container-scrolling`]: hasArrow,
        };
      },
      navClasses() {
        const { navPrefixCls, scrollAnimated } = this;
        return {
          [navPrefixCls]: true,
          [`${navPrefixCls}-animated`]: scrollAnimated,
          [`${navPrefixCls}-no-animated`]: !scrollAnimated,
        };
      },
      navStyle() {
        return this.buildNavStyle();
      },
      isCanNext() {
        const { minOffset, offset } = this;
        if (minOffset > 0) {
          return false;
        }
        if (offset > minOffset) {
          return true;
        }
        return false;
      },
      isCanPrev() {
        const { minOffset, offset } = this;
        if (minOffset > 0) {
          return false;
        }

        if (offset < 0) {
          return true;
        }
        return false;
      },
      hasArrow() {
        return this.isCanNext || this.isCanPrev;
      },
      prevClasses() {
        const { prefixCls, isCanPrev, hasArrow } = this;
        return {
          [`${prefixCls}-tab-prev`]: 1,
          [`${prefixCls}-tab-btn-disabled`]: !isCanPrev,
          [`${prefixCls}-tab-arrow-show`]: hasArrow,
        };
      },
      nextClasses() {
        const { prefixCls, isCanNext, hasArrow } = this;
        return {
          [`${prefixCls}-tab-next`]: 1,
          [`${prefixCls}-tab-btn-disabled`]: !isCanNext,
          [`${prefixCls}-tab-arrow-show`]: hasArrow,
        };
      },
    },
    render() {
      const {
        tabs,
        prefixCls,
        rootNode,
        tabBarPosition,
        activeTab,
        $refs,
        itemClasses,
        onTabClick,
        navPrefixCls,
        classes,
        navClasses,
        navStyle,
        onPrev,
        onNext,
        isCanPrev,
        isCanNext,
        prevClasses,
        nextClasses,
        size,
      } = this;
      const wrapNode = $refs.navRef || rootNode;
      const prevBtn = (
        <span onClick={e => (isCanPrev ? onPrev(e) : null)} unselectable class={prevClasses}>
          <span class={`${prefixCls}-tab-prev-icon`} />
        </span>
      );
      const nextBtn = (
        <span
          ref="nextBtnRef"
          onTransitionend={this.onTransitionEnd}
          onClick={e => (isCanNext ? onNext(e) : null)}
          unselectable
          class={nextClasses}
        >
          <span class={`${prefixCls}-tab-next-icon`} />
        </span>
      );
      const ink = (
        <ink-tab-bar
          prefixCls={prefixCls}
          activeTab={activeTab}
          wrapNode={wrapNode}
          tabBarPosition={tabBarPosition}
          size={size}
        />
      );
      const items = tabs.map((item, i) => {
        const event = {};
        if (!item.disabled && !item.isActive) {
          event.on = {
            click: onTabClick.bind(this, item),
          };
        }

        return (
          <div
            ref="tabs"
            refInFor
            key={i}
            role="tab"
            data-active={item.isActive}
            class={itemClasses(item)}
            {...event}
          >
            {item.tab}
          </div>
        );
      });
      return (
        <div role="navContainer" class={classes}>
          {prevBtn}
          {nextBtn}
          <div ref="navWrapRef" role="navWrap" class={`${navPrefixCls}-wrap`}>
            <div class={`${navPrefixCls}-scroll`}>
              <div ref="navRef" role="nav" class={navClasses} style={navStyle}>
                {[ink, items]}
              </div>
            </div>
          </div>
        </div>
      );
    },
    methods: {
      scrollToActiveTab() {
        const {
          activeTab, $refs, calcOffset, tabBarPosition
        } = this;
        let { offset } = this;
        const { navWrapRef } = $refs;
        if (activeTab && navWrapRef) {
          offset += calcOffset(navWrapRef, activeTab, tabBarPosition);
          this.setOffset(offset);
        }
      },
      calcMinOffset() {
        const { $refs, tabBarPosition } = this;
        const { navRef, navWrapRef } = $refs;
        const navWH = getElementWH(navRef, tabBarPosition);
        const navWrapWH = getElementWH(navWrapRef, tabBarPosition);
        this.minOffset = navWrapWH - navWH;
        this.navWrapWH = navWrapWH;
      },
      calcOffset(navWrapRef, activeTab, tabBarPosition) {
        let offset = 0;
        const activeOffset = getElementOffset(activeTab, tabBarPosition);
        const navWrapOffset = getElementOffset(navWrapRef, tabBarPosition);
        if (activeOffset.v1 < navWrapOffset.v1) {
          offset = navWrapOffset.v1 - activeOffset.v1;
        } else if (activeOffset.v2 > navWrapOffset.v2) {
          offset = navWrapOffset.v2 - activeOffset.v2;
        }
        return offset;
      },
      setOffset(offset) {
        this.offset = offset;
      },
      buildNavStyle() {
        const { minOffset, isSupportedTransform3d, tabBarPosition } = this;
        let style = {};
        let { offset } = this;
        offset = Math.min(0, Math.max(offset, minOffset));
        if (!isVertical(tabBarPosition)) {
          if (isSupportedTransform3d) {
            style = {
              transform: `translate3d(${offset}px, 0,0)`,
            };
          } else {
            style = {
              left: `${offset}px`,
            };
          }
        } else if (isSupportedTransform3d) {
          style = {
            transform: `translate3d(0, ${offset}px,0)`,
          };
        } else {
          style = {
            top: `${offset}px`,
          };
        }
        if (offset !== this.offset) {
          this.setOffset(offset);
        }

        return style;
      },
      itemClasses(tab) {
        const { prefixCls } = this;
        const { isActive, disabled } = tab;
        return {
          [`${prefixCls}-tab`]: true,
          [`${prefixCls}-tab-disabled`]: disabled,
          [`${prefixCls}-tab-active`]: isActive,
        };
      },
      onTabClick(tab, e) {
        this.$emit('tab-click', tab.vm, tab.name, e);
      },
      onPrev(e) {
        const { navWrapWH } = this;
        this.setOffset(this.offset + navWrapWH);
        this.$emit('prev-click', e);
      },
      onNext(e) {
        const { navWrapWH } = this;
        this.setOffset(this.offset - navWrapWH);
        this.$emit('next-click', e);
      },
      onTransitionEnd(e) {
        e.stopPropagation();
        // button css中需要含有opacity transition过渡效果,不然不会有效
        // fixed 由于滚动按钮存在transition过渡,而无法获取到正确navWrapRef宽度的问题
        if (e.propertyName === 'opacity') {
          const { calcMinOffset, scrollToActiveTab } = this;
          // if (oldHasArrow !== hasArrow) {
          setTimeout(() => {
            calcMinOffset();
            scrollToActiveTab();
          }, 0);
          // this.oldHasArrow = hasArrow;
          // }
        }
      },
    },
    components: {
      InkTabBar,
    },
    watch: {
      activeTab(nVal, oVal) {
        if (nVal && nVal !== oVal) {
          this.scrollToActiveTab();
        }
      },
      tabBarPosition(nVal, oVal) {
        if (nVal && nVal !== oVal) {
          this.offset = 0;
          this.minOffset = 0;
          this.navWrapWH = 0;
        }
      },
    },
  };
</script>
