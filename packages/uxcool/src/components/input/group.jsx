import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('InputGroup'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-input-group',
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['large', 'default', 'small', ''].indexOf(val) > -1;
      },
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const { prefixCls, size, compact } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${size === 'large' ? 'lg' : 'sm'}`]: size === 'large' || size === 'small',
        [`${prefixCls}-compact`]: compact,
      };
    },
  },
  render() {
    const { $slots, classes } = this;
    return <span class={classes}>{$slots.default}</span>;
  },
};
