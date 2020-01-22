import {
  getScroll, offset, isNumber, addEventListener, debounce
} from '@suning/v-utils';
import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('Affix'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-affix',
    },
    getTarget: {
      type: Function,
      default() {
        return window;
      },
    },
    offsetBottom: {
      type: Number,
      default: null,
    },
    offsetTop: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      affixStyle: null,
      events: [],
    };
  },
  computed: {
    classes() {
      const { prefixCls, affixStyle } = this;
      return {
        [prefixCls]: affixStyle,
      };
    },
    styles() {
      const { affixStyle } = this;
      return affixStyle
        ? {
          position: 'fixed',
          ...affixStyle,
        }
        : null;
    },
    isAffixTop() {
      const { offsetTop } = this;
      return isNumber(offsetTop);
    },
    isAffixBottom() {
      const { offsetBottom } = this;
      return isNumber(offsetBottom);
    },
    target() {
      return this.getTarget();
    },
    /* targetRect() {
      const { target } = this;
      if (target.window !== window) {
        const rect = target.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          bottom: rect.bottom,
          right: rect.right,
          width: rect.width,
          height: rect.height,
          cw: target.clientWidth,
          ch: target.clientHeight,
        };
      }
      return {
        left: 0,
        top: 0,
        cw: target.innerWidth,
        ch: target.innerHeight,
      };
    }, */
  },
  mounted() {
    const { target, updatePosition, events } = this;
    updatePosition();
    events.push(addEventListener(target, 'scroll', debounce(updatePosition)));
    events.push(addEventListener(target, 'resize', debounce(updatePosition)));
  },
  beforeDestroy() {
    const { events } = this;
    events.forEach((v) => v && v.remove());
  },
  methods: {
    isWindow(target) {
      return target.window === window;
    },
    getTargetRect() {
      const { target, isWindow } = this;
      if (!isWindow(target)) {
        const rect = target.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          bottom: rect.bottom,
          right: rect.right,
          width: rect.width,
          height: rect.height,
          cw: target.clientWidth,
          ch: target.clientHeight,
        };
      }
      return {
        left: 0,
        top: 0,
        cw: target.innerWidth,
        ch: target.innerHeight,
      };
    },
    updatePosition() {
      const {
        $el,
        $refs: { affixRef },
        affixStyle,
        target,
        getTargetRect,
        offsetTop,
        offsetBottom,
        isAffixTop,
        isAffixBottom,
        isWindow,
      } = this;
      const targetRect = getTargetRect();
      console.log(targetRect);
      const elemOffset = offset($el);
      const scrollTop = getScroll(target);
      const affixHeight = affixRef.offsetHeight;
      let top = elemOffset.top - targetRect.top;
      top = isWindow(target) ? top : top - scrollTop;
      console.log(affixRef.offsetHeight);
      console.log(scrollTop);
      let style = null;
      // eslint-disable-next-line
      const elemPosH = top + affixHeight + (offsetBottom || 0) - targetRect.ch;
      if (scrollTop > top - (offsetTop || 0) && isAffixTop) {
        style = {
          position: 'fixed',
          top: `${targetRect.top + (offsetTop || 0)}px`,
          left: `${elemOffset.left}px`,
          width: `${elemOffset.width}px`,
        };
      } else if (scrollTop < elemPosH && isAffixBottom) {
        const bottom = isWindow(target) ? 0 : window.innerHeight - targetRect.bottom;
        style = {
          position: 'fixed',
          bottom: `${bottom + offsetBottom || 0}px`,
          left: `${elemOffset.left}px`,
          width: `${elemOffset.width}px`,
        };
      }

      if ((affixStyle && !style) || (!affixStyle && style)) {
        this.$emit('change', !!style);
      }
      if (style) {
        $el.style.height = `${affixHeight}px`;
      } else {
        $el.style.cssText = '';
      }
      this.affixStyle = style;
    },
  },
  render() {
    const {
      $slots, $attrs, classes, styles
    } = this;
    const slotDefault = $slots.default;
    return (
      <div {...{ attrs: $attrs }}>
        <div {...{ class: classes, style: styles, ref: 'affixRef' }}>{slotDefault}</div>
      </div>
    );
  },
};
