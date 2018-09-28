import { isFunction } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import { DEFAULT_FIELD_NAMES } from './utils';

const { label: DefaultLabel, value: DefaultValue } = DEFAULT_FIELD_NAMES;

export default {
  name: buildComponentName('CascaderMenu'),
  props: {
    prefixCls: {
      type: String,
      default: '',
    },
    nodes: {
      type: Array,
      default() {
        return [];
      },
    },
    activeValue: {
      type: String,
      default: '',
    },
    level: {
      type: Number,
      default: -1,
    },
    expandTrigger: {
      type: String,
      default: 'click',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    renderLabel: {
      type: Function,
      default: null,
    },
  },
  created() {
    this.enterDelayTimer = null;
  },
  methods: {
    onSelect(e, node) {
      if (node.disabled) {
        return;
      }
      this.$emit('select', e, node);
    },
    onMouseEnter(e, node) {
      const { enterDelayTimer, onSelect } = this;
      if (enterDelayTimer) {
        clearTimeout(enterDelayTimer);
      }
      this.enterDelayTimer = setTimeout(() => onSelect(e, node), 150);
    },
    onMouseLeave() {
      const { enterDelayTimer } = this;
      if (enterDelayTimer) {
        clearTimeout(enterDelayTimer);
      }
    },
    getItemCls(node) {
      const { prefixCls, activeValue } = this;
      const cls = `${prefixCls}-item`;
      const isActive = activeValue === node[DefaultValue];
      return {
        [cls]: true,
        [`${cls}-expand`]: node.isParent,
        [`${cls}-active`]: isActive,
        [`${cls}-disabled`]: !!node.disabled,
        [`${cls}-loading`]: node.isLoading,
      };
    },
    renderChildren() {
      const {
        nodes,
        getItemCls,
        expandTrigger,
        renderLabel,
        onSelect,
        onMouseEnter,
        onMouseLeave,
      } = this;
      return nodes.map((node) => {
        const label = node[DefaultLabel];
        const title = node.title || label;
        let on = {
          click(e) {
            onSelect(e, node);
          },
        };

        if (expandTrigger === 'hover') {
          on = {
            ...on,
            mouseenter(e) {
              onMouseEnter(e, node);
            },
            mouseleave: onMouseLeave,
          };
        }
        return (
          <li title={title} {...{ class: getItemCls(node), on }}>
            {isFunction(renderLabel) ? renderLabel({ ...node.originNode }) : label}
          </li>
        );
      });
    },
  },
  render() {
    const { prefixCls, renderChildren } = this;
    return <ul class={`${prefixCls}`}>{renderChildren()}</ul>;
  },
};
