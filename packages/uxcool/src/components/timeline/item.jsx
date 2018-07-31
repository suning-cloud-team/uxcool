import { buildComponentName } from '../utils';
import Mixin from './mixin';

export default {
  name: buildComponentName('TimelineItem'),
  mixins: [Mixin],
  props: {
    color: {
      type: String,
      default: 'blue',
    },
  },
  computed: {
    prefixCls() {
      return `${this.rootPrefixCls}-item`;
    },
    classes() {
      const { prefixCls } = this;
      return {
        [prefixCls]: true,
      };
    },
    dotStyle() {
      const { color } = this;
      return /^blue|red|green$/.test(color) ? undefined : { borderColor: color };
    },
  },
  render() {
    const {
      $slots: { default: slotDefault, dot: slotDot },
      prefixCls,
      classes,
      color,
      dotStyle,
    } = this;
    const dotCls = {
      [`${prefixCls}-head`]: true,
      [`${prefixCls}-head-custom`]: !!slotDot,
      [`${prefixCls}-head-${color}`]: !!color,
    };
    return (
      <li class={classes}>
        <div class={`${prefixCls}-tail`} />
        <div class={dotCls} style={dotStyle}>
          {slotDot}
        </div>
        <div class={`${prefixCls}-content`}>{slotDefault}</div>
      </li>
    );
  },
};
