import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('CardGrid'),
  isCardGroupType: true,
  props: {
    prefixCls: {
      type: String,
      default: 'ux-card-advance',
    },
  },
  render() {
    const { $slots, prefixCls } = this;
    return <div class={`${prefixCls}-grid`}>{$slots.default}</div>;
  },
};
