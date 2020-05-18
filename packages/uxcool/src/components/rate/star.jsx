import { offset } from '@cloud-sn/v-utils';
import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('RateStar'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-rate-star',
    },
    index: {
      type: Number,
      default: 0,
    },
    character: {
      type: Function,
      default: null,
    },
    value: {
      type: Number,
      default: 0,
    },
    allowHalf: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    focused: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const {
        prefixCls, allowHalf, index, value, focused
      } = this;
      const start = index;
      const end = index + 1;
      return {
        [prefixCls]: true,
        [`${prefixCls}-full`]: end <= value,
        [`${prefixCls}-zero`]: (allowHalf && start >= value) || (!allowHalf && end > value),
        [`${prefixCls}-half ${prefixCls}-active`]: allowHalf && value > start && value < end,
        [`${prefixCls}-focused`]:
          focused && ((value > start && value <= end) || (value === 0 && index === 0)),
      };
    },
  },
  methods: {
    getStarValue(el, posX) {
      const { index, allowHalf } = this;
      let value = index + 1;
      if (allowHalf) {
        const { left } = offset(el);
        const w = el.clientWidth;
        if (posX - left < w / 2) {
          value -= 0.5;
        }
      }
      return value;
    },
    onClick(e) {
      const {
        $el, index, disabled, getStarValue
      } = this;
      if (disabled) {
        return;
      }
      const value = getStarValue($el, e.pageX);
      this.$emit('click', e, {
        index,
        el: $el,
        value,
      });
    },
    onHover(e) {
      const {
        $el, index, disabled, getStarValue
      } = this;
      if (disabled) {
        return;
      }
      const value = getStarValue($el, e.pageX);
      this.$emit('hover', e, {
        index,
        el: $el,
        value,
      });
    },
  },
  render() {
    const {
      prefixCls, classes, character, onClick, onHover
    } = this;
    return (
      <li class={classes} on-click={onClick} on-mousemove={onHover}>
        <div class={`${prefixCls}-first`}>{character()}</div>
        <div class={`${prefixCls}-second`}>{character()}</div>
      </li>
    );
  },
};
