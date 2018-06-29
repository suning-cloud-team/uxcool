import { isFunction, CollapseTransition } from '@suning/v-utils';
import { ICON_OPEN, ICON_CLOSE } from './utils';
import SubMixin from './mixins/sub';

export default {
  name: 'InnerNode',
  mixins: [SubMixin],
  props: {
    prefixCls: {
      type: String,
      default: '',
    },
    node: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isLeaf() {
      const {
        isTreeLazy, node: {
          isLeaf, isParent, isLoaded, children
        }
      } = this;
      return (
        isLeaf ||
        (!isParent && !isTreeLazy) ||
        (isTreeLazy && isLoaded && (!children || children.length === 0))
      );
    },
    isSelectable() {
      const { isTreeSelectable, node: { selectable } } = this;

      if (selectable === false) {
        return false;
      }
      return !!selectable || !!isTreeSelectable;
    },
    isDisabled() {
      const { isTreeDisabled, node: { isDisabled } } = this;

      if (isDisabled === false) {
        return false;
      }
      return !!isDisabled || !!isTreeDisabled;
    },
    isExpanded() {
      return this.node.isExpanded;
    },
    classes() {
      const {
        prefixCls,
        node: {
          isParent, isChecked, isSelected, isHalfChecked, isLoading
        },
        isDisabled,
        isExpanded,
      } = this;

      return {
        [`${prefixCls}-treenode-disabled`]: isDisabled,
        [`${prefixCls}-treenode-switcher-${isExpanded ? 'open' : 'close'}`]: isParent,
        [`${prefixCls}-treenode-checkbox-checked`]: !!isChecked,
        [`${prefixCls}-treenode-checkbox-indeterminate`]: isHalfChecked,
        [`${prefixCls}-treenode-selected`]: isSelected,
        [`${prefixCls}-treenode-loading`]: isLoading,
      };
    },
    checkboxClasses() {
      const { prefixCls, isDisabled, node: { disableCheckbox, isChecked, isHalfChecked } } = this;
      return {
        [`${prefixCls}-checkbox`]: true,
        [`${prefixCls}-checkbox-checked`]: isChecked,
        [`${prefixCls}-checkbox-indeterminate`]: !isChecked && isHalfChecked,
        [`${prefixCls}-checkbox-disabled`]: isDisabled || disableCheckbox,
      };
    },
    nodeState() {
      const { isExpanded, node: { isParent } } = this;
      let nodeState = '';
      if (isParent) {
        nodeState = isExpanded ? ICON_OPEN : ICON_CLOSE;
      }
      return nodeState;
    },
    selectorClasses() {
      const {
        prefixCls, isDisabled, nodeState, node: { isSelected }
      } = this;
      const wrapCls = `${prefixCls}-node-content-wrapper`;

      return {
        [wrapCls]: true,
        [`${wrapCls}-${nodeState || 'normal'}`]: true,
        [`${prefixCls}-node-selected`]: !isDisabled && isSelected,
      };
    },
    innerSwitcher() {
      return this.renderSwitcher();
    },
    innerCheckbox() {
      return this.renderCheckbox();
    },
    innerSelector() {
      return this.renderSelector();
    },
    innerChildren() {
      return this.renderChildren();
    },
  },
  methods: {
    onSelect(e) {
      const { node, onNodeSelect } = this;
      node.isSelected = !node.isSelected;
      onNodeSelect(e, node, this);
    },
    onCheck(e) {
      const { node, isDisabled, onNodeCheck } = this;
      if (isDisabled || node.disableCheckbox) {
        return;
      }
      node.isChecked = !node.isChecked;
      node.isHalfChecked = false;
      onNodeCheck(e, node, this);
    },
    onSelectorClick(e) {
      const {
        isSelectable, isDisabled, node, onSelect, onCheck, onNodeClick
      } = this;
      e.preventDefault();
      if (isDisabled) {
        return;
      }
      if (isSelectable) {
        onSelect(e);
      } else {
        onCheck(e);
      }
      onNodeClick(e, node, this);
    },
    onExpand(e) {
      const { isExpanded, node, onNodeExpand } = this;
      e.preventDefault();
      node.isExpanded = !isExpanded;
      onNodeExpand(e, node, this);
    },
    renderSwitcher() {
      const {
        prefixCls, isExpanded, isLeaf, onExpand
      } = this;
      if (isLeaf) {
        return <span class={`${prefixCls}-switcher ${prefixCls}-switcher-noop`} />;
      }
      const switcherCls = {
        [`${prefixCls}-switcher`]: true,
        [`${prefixCls}-switcher_${isExpanded ? ICON_OPEN : ICON_CLOSE}`]: true,
      };
      return <span class={switcherCls} on-click={onExpand} />;
    },
    renderCheckbox() {
      const {
        prefixCls, isTreeCheckable, checkboxClasses, onCheck
      } = this;
      if (!isTreeCheckable) {
        return null;
      }
      return (
        <span class={checkboxClasses} on-click={onCheck}>
          <span class={`${prefixCls}-checkbox-inner`} />
        </span>
      );
    },
    renderSelector() {
      const {
        prefixCls,
        selectorClasses,
        node,
        isDisabled,
        isSelectable,
        isLeaf,
        isExpanded,
        onSelectorClick,
        treeRenderContentFn,
      } = this;

      const { title, isLoading } = node;

      const titleElement = <span class={`${prefixCls}-title`}>{title}</span>;
      const attrs = {
        title,
      };
      const on = {
        click: onSelectorClick,
      };

      const selectorElement = (
        <span {...{ class: selectorClasses, attrs, on }}>
          {isFunction(treeRenderContentFn)
            ? treeRenderContentFn({
                node: {
                  ...node,
                  isDisabled,
                  isSelectable,
                  isLeaf,
                  isExpanded,
                },
              })
            : titleElement}
        </span>
      );
      return isLoading
        ? [<i class={`${prefixCls}-icon_loading`} />, selectorElement]
        : selectorElement;
    },
    renderChildren() {
      const { prefixCls, isExpanded, node: { children } } = this;
      if (!children || children.length === 0) {
        return null;
      }

      let nodes = null;
      if (isExpanded) {
        const childTreeCls = {
          [`${prefixCls}-child-tree`]: true,
          [`${prefixCls}-child-tree-open`]: isExpanded,
        };
        nodes = (
          <ul class={childTreeCls} data-expanded={isExpanded}>
            {children.map(childNode => (
              <inner-node {...{ props: { prefixCls, node: childNode } }} />
            ))}
          </ul>
        );
      }
      return <CollapseTransition>{nodes}</CollapseTransition>;
    },
  },
  render() {
    const {
      classes,
      node: { isVisible },
      innerSwitcher,
      innerCheckbox,
      innerSelector,
      innerChildren,
    } = this;
    return (
      <li
        v-show={isVisible}
        {...{
          class: classes,
          attrs: {
            tabindex: 0,
          },
        }}
      >
        {[innerSwitcher, innerCheckbox, innerSelector, innerChildren]}
      </li>
    );
  },
};
