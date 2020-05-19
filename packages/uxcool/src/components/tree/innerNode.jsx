import { isFunction, CollapseTransition } from '@cloud-sn/v-utils';
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
  data() {
    return {
      isNotAllowDrop: false,
    };
  },
  computed: {
    isLeaf() {
      const {
        isTreeLazy,
        node: {
          isLeaf, isParent, isLoaded, children
        },
      } = this;
      return (
        isLeaf
        || (!isParent && !isTreeLazy)
        || (isTreeLazy && isLoaded && (!children || children.length === 0))
      );
    },
    isSelectable() {
      const {
        isTreeSelectable,
        node: { selectable },
      } = this;

      if (selectable === false) {
        return false;
      }
      return !!selectable || !!isTreeSelectable;
    },
    isDisabled() {
      const {
        isTreeDisabled,
        node: { isDisabled },
      } = this;

      if (isDisabled === false) {
        return false;
      }
      return !!isDisabled || !!isTreeDisabled;
    },
    isExpanded() {
      return this.node.isExpanded;
    },
    isAllowDrag() {
      const { allowDrag, node } = this;
      return !(isFunction(allowDrag) && allowDrag(node.originNode, node) === false);
    },
    isAllowDrop() {
      const { allowDrop, node } = this;
      return !(isFunction(allowDrop) && allowDrop(node.originNode, node) === false);
    },
    classes() {
      const {
        prefixCls,
        node: {
          isParent,
          isChecked,
          isDisabled: isNodeDisabled,
          isSelected,
          isHalfChecked,
          isLoading,
          dragOverGap,
        },
        isDisabled,
        isExpanded,
        isAllowDrag,
        isAllowDrop,
      } = this;

      return {
        [`${prefixCls}-treenode-disabled`]: isDisabled,
        [`${prefixCls}-treenode-switcher-${isExpanded ? 'open' : 'close'}`]: isParent,
        [`${prefixCls}-treenode-checkbox-checked`]: !!isChecked,
        [`${prefixCls}-treenode-checkbox-indeterminate`]: !isNodeDisabled && isHalfChecked,
        [`${prefixCls}-treenode-selected`]: isSelected,
        [`${prefixCls}-treenode-loading`]: isLoading,
        'drag-over': !isDisabled && dragOverGap === 'mid',
        'drag-over-gap-top': !isDisabled && dragOverGap === 'top',
        'drag-over-gap-bottom': !isDisabled && dragOverGap === 'bottom',
        'not-allow-drop': !isDisabled && !isAllowDrop,
        'not-allow-drag': !isDisabled && !isAllowDrag,
      };
    },
    checkboxClasses() {
      const {
        prefixCls,
        isDisabled,
        node: {
          disableCheckbox, isDisabled: isNodeDisabled, isChecked, isHalfChecked
        },
      } = this;
      return {
        [`${prefixCls}-checkbox`]: true,
        [`${prefixCls}-checkbox-checked`]: isChecked,
        [`${prefixCls}-checkbox-indeterminate`]: !isNodeDisabled && !isChecked && isHalfChecked,
        [`${prefixCls}-checkbox-disabled`]: isDisabled || disableCheckbox,
      };
    },
    nodeState() {
      const {
        isExpanded,
        node: { isParent },
      } = this;
      let nodeState = '';
      if (isParent) {
        nodeState = isExpanded ? ICON_OPEN : ICON_CLOSE;
      }
      return nodeState;
    },
    selectorClasses() {
      const {
        prefixCls,
        isDisabled,
        nodeState,
        draggable,
        node: { isSelected },
      } = this;
      const wrapCls = `${prefixCls}-node-content-wrapper`;

      return {
        [wrapCls]: true,
        [`${wrapCls}-${nodeState || 'normal'}`]: true,
        [`${prefixCls}-node-selected`]: !isDisabled && isSelected,
        draggable: !isDisabled && draggable,
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
    onDragStart(e) {
      e.stopPropagation();
      const { isAllowDrag, node, onNodeDragStart } = this;
      if (!isAllowDrag) {
        e.preventDefault();
        return;
      }
      onNodeDragStart(e, node, this);
      try {
        // firefox drag
        e.dataTransfer.setData('text/plain', '');
      } catch (err) {
        // empty
      }
    },
    onDrag(e) {
      e.stopPropagation();
    },
    onDragEnter(e) {
      const { node, onNodeDragEnter } = this;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragEnter(e, node, this);
    },
    onDragOver(e) {
      const { node, onNodeDragOver } = this;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragOver(e, node, this);
    },
    onDragEnd(e) {
      const { node, onNodeDragEnd } = this;
      e.stopPropagation();
      onNodeDragEnd(e, node, this);
    },
    onDragLeave(e) {
      const { node, onNodeDragLeave } = this;
      e.stopPropagation();
      onNodeDragLeave(e, node, this);
    },
    onDrop(e) {
      const { isAllowDrop, node, onNodeDrop } = this;
      e.stopPropagation();
      if (!isAllowDrop && node.dragOverGap === 'mid') {
        e.preventDefault();
        return;
      }
      onNodeDrop(e, node, this);
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
        draggable,
        selectorClasses,
        node,
        isDisabled,
        isSelectable,
        isLeaf,
        isExpanded,
        onSelectorClick,
        treeRenderContentFn,
        onDragStart,
        onDragEnd,
      } = this;

      const { title, isLoading } = node;

      const titleElement = <span class={`${prefixCls}-title`}>{title}</span>;
      const attrs = {
        title,
      };
      if (!isDisabled && draggable) {
        attrs.draggable = true;
      }
      const on = {
        click: onSelectorClick,
        dragstart: onDragStart,
        // drag: onDrag,
        dragend: onDragEnd,
      };

      const selectorElement = (
        <span
          {...{
            class: selectorClasses,
            attrs,
            on,
            ref: 'selectorRef',
          }}
        >
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
      const {
        prefixCls,
        isExpanded,
        node: { children },
      } = this;
      // http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/235
      if (!children || children.length === 0 || children.every(({ isVisible }) => !isVisible)) {
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
            {children.map((childNode) => (
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
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop,
    } = this;
    const on = {
      dragenter: onDragEnter,
      dragleave: onDragLeave,
      dragover: onDragOver,
      drop: onDrop,
    };
    /**
     *  http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/235
     *  原来逻辑是使用v-show控制节点显示隐藏，show-line模式下可能导致last-child选择器无效
     */
    return isVisible ? (
      <li
        {...{
          class: classes,
          attrs: {
            tabindex: 0,
          },
          on,
        }}
      >
        {[innerSwitcher, innerCheckbox, innerSelector, innerChildren]}
      </li>
    ) : null;
  },
};
