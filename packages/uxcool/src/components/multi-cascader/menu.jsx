import { isFunction } from '@suning/v-utils';
import Icon from '../icon';
import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('MultiCascaderMenu'),
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
    // level: {
    //   type: Number,
    //   default: -1,
    // },
    expandTrigger: {
      type: String,
      default: 'click',
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
    onCheck(e, node) {
      if (node.disabled) {
        return;
      }

      const nNode = node;
      nNode.isChecked = !node.isChecked;
      nNode.isIndeterminate = false;

      this.$emit('check', e, nNode);
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
      const cls = `${prefixCls}-menu-item`;
      const isActive = activeValue === node.value;

      return {
        [cls]: true,
        [`${cls}-expand`]: node.isParent,
        [`${cls}-active`]: isActive,
        [`${cls}-disabled`]: node.disabled,
        loading: node.isLoading,
      };
    },
    getCheckboxCls(node) {
      const { prefixCls } = this;
      const cls = `${prefixCls}-checkbox`;

      return {
        [cls]: true,
        [`${cls}-checked`]: node.isChecked,
        [`${cls}-indeterminate`]: node.isIndeterminate,
        [`${cls}-disabled`]: node.disabled,
      };
    },
    renderChildren() {
      const {
        prefixCls,
        nodes,
        onSelect,
        onCheck,
        getItemCls,
        getCheckboxCls,
        expandTrigger,
        renderLabel,
        onMouseEnter,
        onMouseLeave,
      } = this;
      return nodes.map((node) => {
        const { label } = node;
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

        let iconEl = null;

        if (node.isParent) {
          iconEl = node.isLoading ? (
            <Icon type="refresh-d" class={`${prefixCls}-menu-item-loading-icon`} />
          ) : (
            <Icon type="right-a" class={`${prefixCls}-menu-item-expand-icon`} />
          );
        }

        return (
          <li title={title} {...{ class: getItemCls(node), on }}>
            <div class={getCheckboxCls(node)} on-click={($event) => onCheck($event, node)}>
              <span class={`${prefixCls}-checkbox-inner`} />
            </div>
            <div class={`${prefixCls}-menu-item-content`}>
              {isFunction(renderLabel) ? renderLabel({ ...node.originNode }) : label}
            </div>
            {iconEl}
          </li>
        );
      });
    },
  },
  render() {
    const { prefixCls, renderChildren } = this;
    return <ul class={`${prefixCls}-menu`}>{renderChildren()}</ul>;
  },
};
