import { extractVNodeData, cloneVNode } from '@cloud-sn/v-utils';
import { buildComponentName } from '../utils';
import Icon from '../icon';
import Item from './item';

export default {
  name: buildComponentName('Timeline'),
  provide() {
    return {
      timelineRoot: this,
    };
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ux-timeline',
    },
    pending: {
      type: [Boolean, String],
      default: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const { prefixCls, reverse } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-reverse`]: reverse,
      };
    },
  },
  methods: {
    renderChildren() {
      const { $slots: { default: slotDefault }, prefixCls, reverse } = this;

      if (slotDefault) {
        if (reverse) {
          slotDefault.reverse();
        }
        const lastNode = slotDefault.pop();
        const vnodeData = extractVNodeData(lastNode);
        slotDefault.push(cloneVNode(lastNode, {
          class: [vnodeData.class, `${prefixCls}-item-last`],
        }));
      }

      return slotDefault;
    },
  },
  render() {
    const {
      $slots: { pending: slotPending, pendingDot: slotPendingDot },
      prefixCls,
      pending,
      reverse,
      classes,
      renderChildren,
    } = this;

    let children = renderChildren();

    const hasPending = !!pending || !!slotPending;

    const pendingNode = (
      <Item class={`${prefixCls}-item-pending`}>
        <template slot="dot">{slotPendingDot || <Icon type="loading" />}</template>
        {slotPending || pending}
      </Item>
    );

    if (hasPending) {
      if (children) {
        children[reverse ? 'unshift' : 'push'](pendingNode);
      } else {
        children = [pendingNode];
      }
    }
    return <ul class={[classes, { [`${prefixCls}-pending`]: !!hasPending }]}>{children}</ul>;
  },
};
