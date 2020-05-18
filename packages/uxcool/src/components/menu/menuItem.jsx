import { VMenuItem } from '@cloud-sn/v-menu';
import { isSameTypeVNode, getVNodeText } from '@cloud-sn/v-utils';
import { buildComponentName } from '../utils';
import Tooltip from '../tooltip';

function isSubMenuNode(vm) {
  return isSameTypeVNode(vm.$vnode, 'isSubMenuType');
}

function isTopMenuItem(vm) {
  let ret = true;
  let parent = vm.$parent;

  while (parent) {
    if (isSubMenuNode(parent)) {
      ret = false;
      break;
    }
    parent = parent.$parent;
  }

  return ret;
}

export default {
  name: buildComponentName('MenuItem'),
  inject: {
    menuWrap: {
      default: {},
    },
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isWrap: true,
    };
  },
  computed: {
    prefixCls() {
      return this.menuWrap.prefixCls;
    },
    inlineCollapsed() {
      return this.menuWrap.inlineCollapsed;
    },
  },
  render() {
    const {
      $props, $attrs, $slots: { default: slotDefault }, inlineCollapsed
    } = this;
    const item = <VMenuItem {...{ props: $props, attrs: $attrs }}>{slotDefault}</VMenuItem>;
    return inlineCollapsed && isTopMenuItem(this) ? (
      <Tooltip placement="right">
        <template slot="content">{getVNodeText(slotDefault).join(' ')}</template>
        {item}
      </Tooltip>
    ) : (
      item
    );
  },
};
