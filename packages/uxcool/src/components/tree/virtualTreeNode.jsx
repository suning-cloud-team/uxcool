import { CollapseTransition } from '@suning/v-utils';
import InnerNode from './innerNode';

export default {
  name: 'VirtualTreeNode',
  extends: InnerNode,
  computed: {
    showLine() {
      return this.renderShowLine();
    },
    styles() {
      const { node: { level } } = this;
      return {
        paddingLeft: `${level * 20}px`,
      };
    },
  },
  methods: {
    renderShowLine() {
      const {
        prefixCls,
        isTreeShowLine,
        allTreeNodes,
        node: { level, parent, key }
      } = this;

      if (!isTreeShowLine) {
        return null;
      }
      const isLastNodeInGroup = {};
      let parentNode = parent;
      let nodeKey = key;
      let nodeLevel = level;
      while (parentNode && parentNode.children) {
        const isLastChild = parentNode.children[parentNode.children.length - 1].key === nodeKey;
        isLastNodeInGroup[nodeLevel] = isLastChild;
        nodeKey = parentNode.key;
        nodeLevel = parentNode.level;
        parentNode = parentNode.parent;
      }
      if (nodeLevel === 0 && allTreeNodes) {
        isLastNodeInGroup[0] = allTreeNodes[allTreeNodes.length - 1].key === nodeKey;
      }
      const lines = [];
      for (let i = level; i >= 0; i -= 1) {
        const isLastNode = isLastNodeInGroup[i];
        if (!isLastNode) {
          lines.push(<span class={`${prefixCls}-indent-line`} style={`left:${(i * 20) + 12}px`}/>);
        }
      }
      return lines.length > 0 ? <span>{lines}</span> : null;
    }
  },
  render() {
    const {
      classes,
      styles,
      node: { isVisible },
      showLine,
      innerSwitcher,
      innerCheckbox,
      innerSelector,
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
    return isVisible ? (
      <CollapseTransition>
      <li
        {...{
          class: classes,
          attrs: {
            tabindex: 0,
          },
          style: styles,
          on,
        }}
      >
          {[showLine, innerSwitcher, innerCheckbox, innerSelector]}
      </li>
      </CollapseTransition>
    ) : null;
  },
};
