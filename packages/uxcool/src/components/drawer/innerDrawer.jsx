import Vue from 'vue';
import { isFunction, raf, addClass, removeClass, getScrollBarWidth } from '@suning/v-utils';
import { Portal, PortalTarget } from 'portal-vue';
import { buildComponentName } from '../utils';
import {
  genUid,
  isNumeric,
  getVisibleDrawerCnt,
  getDoc,
  hasScrollBar,
  hasVisibleDrawer,
} from './utils';
import Mixin from './mixin';

const visibleDrawer = {};

export default {
  name: buildComponentName('InnerDrawer'),
  mixins: [Mixin],
  inheritAttrs: false,
  props: {
    containerClass: {
      type: [String, Object, Array],
      default: '',
    },
    wrapperStyle: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      firstEnter: true,
      closingDrawer: false,
    };
  },
  computed: {
    container() {
      const { getContainer } = this;
      return isFunction(getContainer) ? getContainer() : document.body;
    },
    classes() {
      const { prefixCls, placement, innerVisible } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${placement}`]: true,
        [`${prefixCls}-open`]: innerVisible,
      };
    },
    closingMaskStyle() {
      const { closingDrawer, placement, scrollBarW } = this;

      return closingDrawer && placement === 'right'
        ? {
          width: '100%',
          transform: `translateX(-${scrollBarW}px)`,
        }
        : {};
    },
    closingDrawerStyle() {
      const { closingDrawer, placement, scrollBarW } = this;

      return closingDrawer && placement === 'right'
        ? {
          width: '100%',
          transform: `translateX(${scrollBarW}px)`,
        }
        : {};
    },
    contentWrapStyle() {
      const {
        innerVisible, firstEnter, placement, width, height
      } = this;
      let transform = '';
      if (!innerVisible || firstEnter) {
        switch (placement) {
          case 'top':
            transform = 'translateY(-100%)';
            break;
          case 'left':
            transform = 'translateX(-100%)';
            break;
          case 'bottom':
            transform = 'translateY(100%)';
            break;
          default:
            transform = 'translateX(100%)';
            break;
        }
      }
      return {
        transform,
        width: isNumeric(width || width === 0 ? Number(width) : NaN) ? `${width}px` : width,
        height: isNumeric(height || height === 0 ? Number(height) : NaN) ? `${height}px` : height,
      };
    },
  },
  watch: {
    container() {
      this.createPortal();
    },
    visible(nVal) {
      this.setInnerVisible(nVal, false);
    },
  },
  created() {
    // no reactive
    this.drawerId = genUid();
    this.portalVM = null;
    this.$doc = getDoc();
    this.scrollBarW = getScrollBarWidth();
    // no reactive
  },
  mounted() {
    const { setInnerVisible, visible, createPortal } = this;
    setInnerVisible(visible, false);
    createPortal();
  },
  beforeDestroy() {
    this.clearPortal();
    delete visibleDrawer[this.drawerId];
  },
  methods: {
    setDocOverflow(visible) {
      const { prefixCls, $doc, scrollBarW } = this;
      const cnt = getVisibleDrawerCnt(visibleDrawer);
      if (visible) {
        if (cnt > 1) {
          return;
        }
        if (hasScrollBar()) {
          $doc.style.paddingRight = `${scrollBarW}px`;
        }
        addClass($doc, `${prefixCls}-doc-open`);
      } else {
        if (cnt >= 1) {
          return;
        }
        this.closingDrawer = true;
        this.$nextTick(() => {
          $doc.style.paddingRight = '';
          removeClass($doc, `${prefixCls}-doc-open`);
        });
      }
    },
    setInnerVisible(visible, trigger = true) {
      const { innerVisible } = this;
      if (innerVisible !== visible) {
        this.innerVisible = visible;
        visibleDrawer[this.drawerId] = visible;
        this.setDocOverflow(visible);
        if (trigger) {
          this.$emit('input', visible);
        }
      }
    },
    createPortal() {
      const { drawerId, container, clearPortal } = this;
      clearPortal();
      const portal = new Vue({
        parent: this,
        beforeDestroy() {
          const { $el } = this;
          const { parentNode } = $el;
          if (parentNode) {
            parentNode.removeChild($el);
          }
        },
        render() {
          return <PortalTarget name={drawerId} slim={true} />;
        },
      }).$mount();
      if (portal) {
        container.appendChild(portal.$el);
      }
      this.portalVM = portal;
    },
    clearPortal() {
      const { portalVM } = this;
      if (portalVM) {
        portalVM.$destroy();
      }
    },
    onMaskClick(e) {
      const { maskClosable, setInnerVisible } = this;
      if (maskClosable) {
        setInnerVisible(false);
        this.$emit('mask-click', e);
      }
    },
    onContentWrapperTransitionEnd(e) {
      const { $refs: { contentWrapperRef }, innerVisible } = this;
      if (e.target === contentWrapperRef) {
        const op = innerVisible ? 'open' : 'close';
        if (op === 'close' && !hasVisibleDrawer()) {
          this.closingDrawer = false;
        }
        this.$emit('content-transitionend', innerVisible ? 'open' : 'close', e);
      }
    },
    renderChildren() {
      const {
        $slots,
        prefixCls,
        showMask,
        classes,
        maskStyle,
        wrapperClass,
        wrapperStyle,
        closingMaskStyle,
        closingDrawerStyle,
        contentWrapStyle,
        onMaskClick,
        onContentWrapperTransitionEnd,
      } = this;
      const maskNode = showMask ? (
        <div
          class={`${prefixCls}-mask`}
          style={[maskStyle, closingMaskStyle]}
          on-click={onMaskClick}
        />
      ) : null;
      return (
        <div
          ref="wrapRef"
          class={[classes, wrapperClass]}
          style={[wrapperStyle, closingDrawerStyle]}
        >
          {maskNode}
          <div
            ref="contentWrapperRef"
            class={`${prefixCls}-content-wrapper`}
            style={contentWrapStyle}
            on-transitionend={onContentWrapperTransitionEnd}
          >
            <div class={`${prefixCls}-content`}>{$slots.default}</div>
          </div>
        </div>
      );
    },
  },
  render() {
    const {
      firstEnter,
      innerVisible,
      drawerId,
      containerClass,
      containerStyle,
      renderChildren,
    } = this;
    if (firstEnter && !innerVisible) {
      return null;
    }
    // appear animation
    raf(() => {
      raf(() => {
        this.firstEnter = false;
      });
    });
    const children = renderChildren();
    return (
      <Portal to={drawerId}>
        <div class={containerClass} style={containerStyle}>
          {children}
        </div>
      </Portal>
    );
  },
};
