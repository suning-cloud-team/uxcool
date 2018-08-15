import Vue from 'vue';
import { warning, addEventListener, isEqual } from '@suning/v-utils';
import { noop, getClassNameFromAlign } from './utils';
import Popup from './popup';

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
      default: null,
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
    popupPlacement: {
      type: String,
      default: '',
    },
    builtinPlacements: {
      type: Object,
      default() {
        return {};
      },
    },
    wrapClass: {
      type: [String, Object, Array],
      default: '',
    },
    wrapStyle: {
      type: Object,
      default: null,
    },
    popupTransitionName: {
      type: String,
      default: '',
    },
    popupAnimation: {
      type: String,
      default: '',
    },
    popupClass: {
      type: [String, Object, Array],
      default: '',
    },
    popupStyle: {
      type: Object,
      default: null,
    },
    zIndex: {
      type: Number,
      default: null,
    },
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
    destroyPopupOnHide: {
      type: Boolean,
      default: false,
    },
    initPopupFirst: {
      type: Boolean,
      default: false,
    },
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
  computed: {
    popupContainer() {
      const { $el, getPopupContainer, getDocument } = this;
      let container = getDocument().body;
      if (typeof getPopupContainer === 'function') {
        container = getPopupContainer($el);
      }

      return container;
    },
    triggerEvents() {
      const {
        onClick, onMouseDown, onMouseEnter, onMouseLeave, onFocus, onBlur
      } = this;
      return {
        click: [
          {
            name: 'click',
            fn: onClick,
          },
          {
            name: 'mousedown',
            fn: onMouseDown,
          },
        ],
        hover: [
          {
            name: 'mouseenter',
            fn: onMouseEnter,
          },
          {
            name: 'mouseleave',
            fn: onMouseLeave,
          },
        ],
        // focusin,focusout can bubble, focus,blur no bubble
        focus: [
          {
            name: 'focusin',
            fn: onFocus,
          },
          {
            name: 'focusout',
            fn: onBlur,
          },
        ],
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
  watch: {
    visible(nVal, oVal) {
      if (nVal !== oVal) {
        this.setPopupVisible(nVal);
      }
    },
    actions() {
      this.bindVNodeElementEvents();
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
  mounted() {
    this.setPopupVisible(this.visible);
    this.mountPortal();
  },
  updated() {
    const { bindVNodeElementEvents } = this;
    // $vnode 中的elm是实际的页面元素, 以此绑定事件
    bindVNodeElementEvents();
  },
  beforeDestroy() {
    this.clearDelayTimer();
    this.clearAllHandler();
    this.clearPortal();
  },
  methods: {
    normalizeActions(actions = []) {
      return actions.sort((a, b) => a - b).join(',');
    },
    bindVNodeElementEvents() {
      const {
        $vnode, $el, _uid: uuid, triggerEvents, actions, normalizeActions
      } = this;
      const node = $vnode || { elm: $el };
      const { elm: element } = node;

      if (!element) {
        return;
      }
      const nActions = normalizeActions([...actions]);
      const { $$actions, $$bindEvents } = element;

      let prevActions;
      if ($$actions) {
        prevActions = $$actions[uuid];
      } else {
        element.$$actions = {};
      }
      if (nActions === prevActions) {
        return;
      }

      let bindEvents = [];
      if ($$bindEvents) {
        bindEvents = $$bindEvents[uuid] || [];
      } else {
        element.$$bindEvents = {};
      }
      if (bindEvents.length > 0) {
        bindEvents.forEach((event) => {
          event.remove();
        });
      }
      bindEvents.length = 0;

      if (actions.length === 0) {
        delete element.$$actions[uuid];
        delete element.$$bindEvents[uuid];
        return;
      }

      const keys = Object.keys(triggerEvents);
      for (let i = 0, l = keys.length; i < l; i += 1) {
        const k = keys[i];
        if (actions.indexOf(k) > -1) {
          const eventHandles = triggerEvents[keys[i]];
          for (let j = 0, ll = eventHandles.length; j < ll; j += 1) {
            const handle = eventHandles[j];
            // 同一元素多次绑定 type, callback,capture都相同的EventListener, 有且只会被绑定一次
            // The event listener is appended to target's list of event listeners
            // and is not appended if it is a duplicate,
            // i.e. having the same type, callback, and capture values.
            // link: https://www.w3.org/TR/dom/#dom-eventtarget-addeventlistener
            bindEvents.push(addEventListener(element, handle.name, handle.fn));
          }
        }
      }
      element.$$actions[uuid] = nActions;
      element.$$bindEvents[uuid] = bindEvents;
    },
    buildNormalFuncByFuncName(eventNames = []) {
      return eventNames.map(name => ({ name, fn: e => this.$emit(`on-${name}`, e) }));
    },
    onClick(e) {
      const {
        focusTime, mouseDownTime, popupVisible, setPopupVisible
      } = this;
      this.$emit('on-click', e);
      this.$emit('click', e);
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
      this.$emit('mousedown', e);
      this.mouseDownTime = Date.now();
    },
    onMouseEnter(e) {
      const { mouseEnterDelay, delaySetPopupVisible } = this;
      this.$emit('on-mouseenter', e);
      this.$emit('mouseenter', e);
      delaySetPopupVisible(true, mouseEnterDelay);
    },
    onMouseLeave(e) {
      const { mouseLeaveDelay, delaySetPopupVisible } = this;
      this.$emit('on-mouseleave', e);
      this.$emit('mouseleave', e);
      delaySetPopupVisible(false, mouseLeaveDelay);
    },
    onFocus(e) {
      const { delaySetPopupVisible, focusDelay } = this;
      this.$emit('on-focus', e);
      this.$emit('focus', e);
      this.focusTime = Date.now();
      delaySetPopupVisible(true, focusDelay);
    },
    onBlur(e) {
      const { delaySetPopupVisible, blurDelay } = this;
      this.$emit('on-blur', e);
      this.$emit('blur', e);
      delaySetPopupVisible(false, blurDelay);
    },
    onDocumentClick(e) {
      const { $el, portal } = this;
      const { target } = e;
      if ($el && portal.$el && target) {
        if (!$el.contains(target) && !portal.$el.contains(target)) {
          this.setPopupVisible(false);
        }
      }
    },
    setPopupVisible(popupVisible) {
      if (popupVisible !== this.popupVisible) {
        this.popupVisible = !!popupVisible;
        this.$emit('on-popup-visible-change', this.popupVisible);
        this.$emit('popup-visible-change', this.popupVisible);
      }
    },
    onPopupAfterEnter() {
      this.$emit('popup-after-enter');
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
      const alignClass = [];

      if (popupPlacement && builtinPlacements) {
        alignClass.push(getClassNameFromAlign(builtinPlacements, prefixCls, align));
      }
      if (getPopupClassNameFromAlign) {
        alignClass.push(getPopupClassNameFromAlign(align));
      }
      return alignClass.join(' ');
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
    getPortalPopupElement() {
      const { portal = {} } = this;

      if (!portal.$el || portal.$el.nodeType !== 1) {
        return null;
      }
      return portal.$el.querySelector('[role=align-popup]');
    },
    createPortal() {
      const {
        prefixCls: rootPrefixCls,
        actions,
        onPopupMouseEnter,
        onPopupMouseLeave,
        align: originAlign,
        popupTransitionName: originTransitionName,
        popupAnimation: originAnimation,
        destroyPopupOnHide: originDestroyPopupOnHide,
        $slots: originSlots,
        popupVisible,
        getPopupAlignClassName,
        onPopupAfterEnter,
        initPopupFirst,
      } = this;
      let portalInit = false;
      const portal = new Vue({
        parent: this,
        components: {
          Popup,
        },
        data: {
          popupProp: {
            visible: popupVisible,
            align: originAlign,
            popupTransitionName: originTransitionName,
            popupAnimation: originAnimation,
            popupClass: '',
            popupStyle: null,
            destroyPopupOnHide: originDestroyPopupOnHide,
            popupVNode: originSlots.popup,
          },
          rootDomNode: null,
        },
        destroyed() {
          const { $el } = this;
          const { parentNode } = $el;
          if (parentNode) {
            parentNode.removeChild($el);
          }
        },
        render() {
          const {
            popupProp: {
              visible,
              align,
              popupTransitionName,
              popupAnimation,
              destroyPopupOnHide,
              popupVNode,
              popupClass,
              popupStyle,
            },
            rootDomNode,
          } = this;
          if (!visible && !portalInit && !initPopupFirst) {
            return '';
          }
          portalInit = true;
          const data = {
            ref: 'popupRef',
            props: {
              prefixCls: rootPrefixCls,
              align,
              rootDomNode,
              visible,
              transition: popupTransitionName,
              animation: popupAnimation,
              destroyPopupOnHide,
              className: popupClass,
              styles: popupStyle,
              getClassNameFromAlign: getPopupAlignClassName,
            },
            on: {
              afterenter: onPopupAfterEnter,
            },
          };
          if (actions.indexOf('hover') !== -1) {
            data.nativeOn = {
              mouseenter: onPopupMouseEnter,
              mouseleave: onPopupMouseLeave,
            };
          }
          return <Popup {...data}>{popupVNode}</Popup>;
        },
      }).$mount();
      return portal;
    },
    mountPortal() {
      const { popupContainer, $el, createPortal } = this;
      const portal = createPortal();
      this.portal = portal;
      portal.rootDomNode = $el;
      popupContainer.appendChild(portal.$el);
    },
    updatePortal() {
      const {
        $el,
        portal,
        align,
        popupVisible,
        popupTransitionName,
        popupAnimation,
        destroyPopupOnHide,
        popupStyle,
        popupClass,
        $slots: { popup: popupVNode },
      } = this;
      if (portal) {
        const nProp = {
          visible: popupVisible,
          align,
          popupTransitionName,
          popupAnimation,
          destroyPopupOnHide,
          popupVNode,
          popupStyle,
          popupClass,
        };
        if (!isEqual(portal.rootDomNode, $el) || !isEqual(portal.popupProp, nProp)) {
          portal.rootDomNode = $el;
          portal.popupProp = nProp;
        }
      }
    },
  },
  render(h) {
    const { $slots } = this;
    const { trigger = [] } = $slots;
    const triggerSlot = trigger.filter(v => v.tag || (v.text || '').trim() !== '');
    if (triggerSlot.length === 0) {
      if (process.env.NODE_ENV !== 'production') {
        warning(false, 'No trigger node was found!');
      }
      return trigger;
    }
    let node = triggerSlot[0];

    if (!node.tag) {
      node = h('span', [node]);
    }
    this.updatePortal();
    return node;
  },
};
