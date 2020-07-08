import { isNumber, addEventListener, debounce } from '@cloud-sn/v-utils';
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
    isWin() {
      const { target, isWindow } = this;
      return isWindow(target);
    },
  },
  mounted() {
    const { target, updatePosition, events } = this;
    updatePosition();
    events.push(addEventListener(target, 'scroll', debounce(updatePosition)));
    events.push(addEventListener(target, 'resize', debounce(updatePosition)));
  },
  beforeDestroy() {
    const { events } = this;
    events.forEach(v => v && v.remove());
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
        // excludes scrollbar
        cw: document.documentElement.clientWidth,
        ch: document.documentElement.clientHeight,
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
        isWin,
      } = this;
      const targetRect = getTargetRect();
      const elemRect = $el.getBoundingClientRect();
      const affixHeight = affixRef.offsetHeight;
      // top border width of target
      const targetClientTop = isWin ? 0 : target.clientTop;
      const top = isWin ? elemRect.top : elemRect.top - targetRect.top - targetClientTop;
      let style = null;

      if (isAffixTop && top < offsetTop) {
        style = {
          position: 'fixed',
          top: `${targetRect.top + offsetTop + targetClientTop}px`,
          left: `${elemRect.left}px`,
          width: `${elemRect.width}px`,
        };
      } else if (isAffixBottom && top + affixHeight + offsetBottom > targetRect.ch) {
        const bottom = isWin
          ? 0
          : document.documentElement.clientHeight -
            targetRect.top -
            targetClientTop -
            targetRect.ch;
        style = {
          position: 'fixed',
          bottom: `${bottom + offsetBottom}px`,
          left: `${elemRect.left}px`,
          width: `${elemRect.width}px`,
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
    const { $slots, $attrs, classes, styles } = this;
    const slotDefault = $slots.default;
    return (
      <div {...{ attrs: $attrs }}>
        <div {...{ class: classes, style: styles, ref: 'affixRef' }}>{slotDefault}</div>
      </div>
    );
  },
};
