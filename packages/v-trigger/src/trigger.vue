<script>
  import Vue from 'vue';
  import { vNodeIsComponent, noop, addEventListener, getClassNameFromAlign } from './utils';
  import Popup from './popup.vue';

  export default {
    props: {
      prefixCls: {
        type: String,
        default: 'ux-trigger-popup',
      },
      visible: {
        type: Boolean,
        default: false,
      },
      getDocument: {
        type: Function,
        default() {
          return window.document;
        },
      },
      getPopupContainer: {
        type: Function,
      },
      getPopupClassNameFromAlign: {
        type: Function,
        default: noop,
      },
      actions: {
        type: Array,
        default() {
          return [];
        },
      },
      popupAlign: {
        type: Object,
        default() {
          return {};
        },
      },
      popupPlacement: String,
      builtinPlacements: {
        type: Object,
        default() {
          return {};
        },
      },
      wrapClass: [String, Object, Array],
      wrapStyle: Object,
      popupTransitionName: {
        type: String,
      },
      popupClass: [String, Object, Array],
      popupStyle: Object,
      zIndex: Number,
      mouseEnterDelay: {
        type: Number,
        // ms
        default: 0,
      },
      mouseLeaveDelay: {
        type: Number,
        // ms
        default: 100,
      },
      focusDelay: {
        type: Number,
        default: 0,
      },
      blurDelay: {
        type: Number,
        default: 150,
      },
      destroyPopupOnHide: Boolean,
    },
    data() {
      return {
        delayTimer: null,
        popupVisible: false,
        closeHandler: null,
        portal: null,
        focusTime: 0,
        mouseDownTime: 0,
      };
    },
    render(h) {
      const {
        $slots,
        $el,
        triggerEvents,
        buildEventBind,
        portal,
        popupVisible,
        align,
        popupTransitionName,
        destroyPopupOnHide,
        createPortal,
        popupStyle,
        popupClass,
        actions,
      } = this;
      const { trigger = [], popup: popupVNode } = $slots;
      const triggerSlot = trigger.filter(v => v.tag || (v.text || '').trim() !== '');
      if (triggerSlot.length === 0) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('未找到trigger node!');
        }
        return trigger;
      }
      let node = triggerSlot[0];

      if (!node.tag) {
        node = h('span', [node]);
      }

      Object.keys(triggerEvents).forEach((eventName) => {
        if (actions.indexOf(eventName) !== -1) {
          const fns = triggerEvents[eventName].action;
          buildEventBind(node, fns);
        }
      });
      if (portal) {
        portal.visible = popupVisible;
        portal.align = align;
        portal.popupTransitionName = popupTransitionName;
        portal.destroyPopupOnHide = destroyPopupOnHide;
        portal.popupVNode = popupVNode;
        portal.rootDomNode = $el;
        portal.popupStyle = popupStyle;
        portal.popupClass = popupClass;
      } else {
        this.portal = createPortal();
      }

      return node;
    },
    mounted() {
      this.setPopupVisible(this.visible);
    },
    computed: {
      popupContainer() {
        const { getPopupContainer, getDocument } = this;
        let container = getDocument().body;
        if (typeof getPopupContainer === 'function') {
          container = getPopupContainer();
        }

        return container;
      },
      isUseClick() {
        const { actions } = this;
        return actions.indexOf('click') !== -1;
      },
      isUseHover() {
        const { actions } = this;
        return actions.indexOf('hover') !== -1;
      },
      isUseFocus() {
        const { actions } = this;
        return actions.indexOf('focus') !== -1;
      },
      triggerEvents() {
        const {
          onClick, onMouseDown, onMouseEnter, onMouseLeave, onFoucs, onBlur
        } = this;
        return {
          click: {
            action: [
              {
                name: 'click',
                fn: (...args) => {
                  if (this.isUseClick) {
                    onClick(...args);
                  }
                },
              },
              {
                name: 'mousedown',
                fn: (...args) => {
                  if (this.isUseClick) {
                    onMouseDown(...args);
                  }
                },
              },
            ],
          },
          hover: {
            action: [
              {
                name: 'mouseenter',
                fn: (...args) => {
                  if (this.isUseHover) {
                    onMouseEnter(...args);
                  }
                },
              },
              {
                name: 'mouseleave',
                fn: (...args) => {
                  if (this.isUseHover) {
                    onMouseLeave(...args);
                  }
                },
              },
            ],
          },
          focus: {
            action: [
              {
                name: 'focus',
                fn: (...args) => {
                  if (this.isUseFocus) {
                    onFoucs(...args);
                  }
                },
              },
              {
                name: 'blur',
                fn: (...args) => {
                  if (this.isUseFocus) {
                    onBlur(...args);
                  }
                },
              },
            ],
          },
        };
      },
      align() {
        const { builtinPlacements, popupPlacement, popupAlign } = this;
        if (builtinPlacements && popupPlacement) {
          const baseAlign = builtinPlacements[popupPlacement] || {};
          return { ...baseAlign, ...popupAlign };
        }
        return popupAlign;
      },
    },
    methods: {
      buildEventBind(node, events) {
        const nNode = node;
        if (!nNode.data) {
          nNode.data = {};
        }
        const { data } = nNode;
        const { nativeOn = {}, on = {} } = data;
        const isComponent = vNodeIsComponent(nNode);

        events.forEach((event) => {
          const originEventFn = isComponent ? nativeOn[event.name] : on[event.name];
          let fns = null;
          const eventFn =
            event.name === 'mousedown'
              ? (e) => {
                e.stopPropagation();
                event.fn(e);
              }
              : event.fn;

          if (originEventFn) {
            if (Array.isArray(originEventFn)) {
              const fnSet = new Set(originEventFn);
              fns = Array.from(fnSet.add(eventFn));
            } else if (originEventFn !== eventFn) {
              fns = [originEventFn, eventFn];
            } else {
              fns = originEventFn;
            }
          } else {
            fns = eventFn;
          }
          if (isComponent) {
            nativeOn[event.name] = fns;
            data.nativeOn = nativeOn;
          }
          on[event.name] = fns;
          data.on = on;
        });
      },
      buildNormalFuncByFuncName(eventNames = []) {
        return eventNames.map(name => ({ name, fn: e => this.$emit(`on-${name}`, e) }));
      },
      onClick(e) {
        const {
          focusTime, mouseDownTime, popupVisible, setPopupVisible
        } = this;
        this.$emit('on-click', e);
        if (focusTime) {
          if (mouseDownTime && Math.abs(mouseDownTime - focusTime) < 20) {
            return;
          }
          this.focusTime = 0;
        }
        this.mouseDownTime = 0;
        setPopupVisible(!popupVisible);
      },
      onMouseDown(e) {
        this.$emit('on-mousedown', e);
        this.mouseDownTime = Date.now();
      },
      onMouseEnter(e) {
        const { mouseEnterDelay, delaySetPopupVisible } = this;
        this.$emit('on-mouseenter', e);
        delaySetPopupVisible(true, mouseEnterDelay);
      },
      onMouseLeave(e) {
        const { mouseLeaveDelay, delaySetPopupVisible } = this;
        this.$emit('on-mouseleave', e);
        delaySetPopupVisible(false, mouseLeaveDelay);
      },
      onFoucs(e) {
        const { delaySetPopupVisible, focusDelay } = this;
        this.$emit('on-focus', e);
        this.focusTime = Date.now();
        delaySetPopupVisible(true, focusDelay);
      },
      onBlur(e) {
        const { delaySetPopupVisible, blurDelay } = this;
        this.$emit('on-blur', e);
        delaySetPopupVisible(false, blurDelay);
      },
      onDocumentClick() {
        this.setPopupVisible(false);
      },
      setPopupVisible(popupVisible) {
        if (popupVisible !== this.popupVisible) {
          this.popupVisible = !!popupVisible;
          this.$emit('on-popup-visible-change', this.popupVisible);
        }
      },
      clearDelayTimer() {
        if (this.delayTimer) {
          clearTimeout(this.delayTimer);
          this.delayTimer = null;
        }
      },
      delaySetPopupVisible(visible, delayTime = 0) {
        const { setPopupVisible, clearDelayTimer } = this;
        // ms
        const delay = delayTime;
        clearDelayTimer();
        if (delay) {
          this.delayTimer = setTimeout(() => {
            setPopupVisible(visible);
            clearDelayTimer();
          }, delay);
        } else {
          setPopupVisible(visible);
        }
      },
      onPopupMouseEnter() {
        this.clearDelayTimer();
      },
      onPopupMouseLeave() {
        this.delaySetPopupVisible(false, this.mouseLeaveDelay);
      },
      getPopupAlignClassName(align) {
        const {
          prefixCls, getPopupClassNameFromAlign, popupPlacement, builtinPlacements
        } = this;
        const alignClss = [];

        if (popupPlacement && builtinPlacements) {
          alignClss.push(getClassNameFromAlign(builtinPlacements, prefixCls, align));
        }
        if (getPopupClassNameFromAlign) {
          alignClss.push(getPopupClassNameFromAlign(align));
        }
        return alignClss.join(' ');
      },
      clearAllHandler() {
        const { closeHandler } = this;
        if (closeHandler) {
          closeHandler.remove();
          this.closeHandler = null;
        }
      },
      clearPortal() {
        const { portal } = this;
        if (portal) {
          portal.$destroy();
        }
      },
      forcePopupAlign() {
        const { popupVisible, portal = {} } = this;
        const { $refs = {} } = portal;

        if (!popupVisible || !$refs.popupRef || !$refs.popupRef.$refs.alignRef) {
          return;
        }

        const { alignRef } = $refs.popupRef.$refs;

        alignRef.forceAlign();
      },
      createPortal() {
        const {
          prefixCls: rootPrefixCls,
          popupContainer,
          actions,
          onPopupMouseEnter,
          onPopupMouseLeave,
          align: originAlign,
          popupTransitionName: originTransitionName,
          destroyPopupOnHide: originDestroyPopupOnHide,
          $slots: originSlots,
          popupVisible,
          getPopupAlignClassName,
        } = this;

        const portal = new Vue({
          props: {
            visible: {
              type: Boolean,
              default: popupVisible,
            },
            align: {
              type: Object,
              default() {
                return originAlign;
              },
            },
            popupTransitionName: {
              type: String,
              default: originTransitionName,
            },
            popupClass: String,
            popupStyle: String,
            destroyPopupOnHide: {
              type: Boolean,
              default: originDestroyPopupOnHide,
            },
            popupVNode: {
              type: Array,
              default() {
                return originSlots.popup;
              },
            },
            rootDomNode: HTMLElement,
          },
          data: {
            init: false,
          },

          render(h) {
            const {
              visible,
              align,
              popupTransitionName,
              init,
              destroyPopupOnHide,
              popupVNode,
              rootDomNode,
              popupClass,
              popupStyle,
            } = this;
            if (!visible && !init) {
              return '';
            }
            this.init = true;
            const data = {
              ref: 'popupRef',
              props: {
                prefixCls: rootPrefixCls,
                align,
                rootDomNode,
                visible,
                transition: popupTransitionName,
                destroyPopupOnHide,
                className: popupClass,
                styles: popupStyle,
                getClassNameFromAlign: getPopupAlignClassName,
              },
            };
            if (actions.indexOf('hover') !== -1) {
              data.nativeOn = {
                mouseenter: onPopupMouseEnter,
                mouseleave: onPopupMouseLeave,
              };
            }
            return h('popup', data, popupVNode);
          },
          destroyed() {
            const { $el } = this;
            const { parentNode } = $el;
            if (parentNode) {
              parentNode.removeChild($el);
            }
          },
          components: {
            Popup,
          },
        }).$mount();
        popupContainer.appendChild(portal.$el);
        return portal;
      },
    },
    watch: {
      visible(nVal, oVal) {
        if (nVal !== oVal) {
          this.setPopupVisible(nVal);
        }
      },
      popupVisible(nVal, oVal) {
        if (nVal !== oVal) {
          const {
            clearAllHandler, closeHandler, actions, getDocument, onDocumentClick
          } = this;
          if (nVal) {
            if (!closeHandler && actions.indexOf('click') !== -1) {
              this.closeHandler = addEventListener(getDocument(), 'mousedown', onDocumentClick);
            }
          } else {
            clearAllHandler();
          }
        }
      },
    },
    beforeDestroy() {
      this.clearDelayTimer();
      this.clearAllHandler();
      this.clearPortal();
    },
  };
</script>
