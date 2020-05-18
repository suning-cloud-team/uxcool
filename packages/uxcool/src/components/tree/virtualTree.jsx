import { buildComponentName } from '../utils';
import { VirtualList, AutoSizer } from './virtual-list';
import TreeNode from './virtualTreeNode';
import Tree from './tree';


export default {
  name: buildComponentName('VirtualTree'),
  extends: Tree,
  props: {
    size: {
      type: Number, // 每个item的高度
      default: 32,
    },
    viewCount: {
      type: Number, // 在虚拟列表窗口中，展示item的个数
      default: 30,
    },
    bench: {
      type: Number, // 待展示节点数，默认与viewCount一致
      default: 0,
    },
    pagemode: {
      type: Boolean, // 是否使用窗口页面的滚动
      default: false,
    },
    autoHeight: {
      type: Boolean, // 是否高度自适应
      default: false,
    },
    scrollelement: { // 使用虚拟列滚动的父元素
      type: typeof window === 'undefined' ? Object : HTMLElement,
      default: null,
    },
    className: { // 自定义用于virtual-list的样式名
      type: String,
      default: ''
    }
  },
  data() {
    return {
      flattenedIndexCache: {},
    };
  },
  computed: {
    mapOfFlattenedTree() {
      const { nodes, convertTreeToList } = this;
      const flattenedTreeNodes = {};
      nodes.forEach((node) => {
        flattenedTreeNodes[node.key] = convertTreeToList(node);
      });
      return flattenedTreeNodes;
    },
  },
  methods: {
    setChildNodeCheckbox(node, checked) {
      // 该方法是对store.js中的方法重写，优化复选框，对子节点的操作时间
      const {
        treeStore: { checkedKeys, halfCheckedKeys },
        updateStoreHalfCheckedKeys,
        updateStoreCheckedKeys,
      } = this;
      const { children } = node;
      const nNode = node;

      let stack = [];
      if (children) {
        stack = [...children];
        if (children.every((item) => item.isDisabled || item.disableCheckbox)) {
          nNode.childCheckState = 0;
        } else {
          nNode.childCheckState = checked ? 2 : 0;
        }
      } else {
        nNode.childCheckState = -1; // 没有子节点
      }
      const childKeys = [];
      const childHalfKeys = [];

      while (stack.length) {
        const childNode = stack.pop();
        if (!childNode.isDisabled && !childNode.disableCheckbox) {
          childNode.isChecked = checked;
          // 关联选中子节点时, 子节点是不可能有halfChecked = true的
          childNode.isHalfChecked = false;
          const { key } = childNode;
          if (checked || (!checked && checkedKeys.indexOf(key) > -1)) {
            childKeys.push(key);
          }
          if (halfCheckedKeys.indexOf(key) > -1) {
            childHalfKeys.push(key);
          }
        }
        if (childNode.children) {
          stack = [...stack, ...childNode.children];
          if (childNode.children.every((item) => item.isDisabled || item.disableCheckbox)) {
            childNode.childCheckState = 0; // 子节点全部不能选择
          } else {
            childNode.childCheckState = checked ? 2 : 0;
          }
        } else {
          childNode.childCheckState = -1; // 没有子节点
        }
      }
      updateStoreCheckedKeys(childKeys, checked ? 'add' : 'del');
      if (childHalfKeys.length > 0) {
        updateStoreHalfCheckedKeys(childHalfKeys, 'del');
      }
    },
    onNodeExpandBeforeHook(e, node, vm) {
      const { autoHeight, $refs, flattenedIndexCache } = this;
      if (autoHeight) {
        const index = flattenedIndexCache[node.key];
        if (index >= 0) {
          $refs.vtl.setChangedIndex(index);
        }
      }
    },
    onNodeDragEndHook() {
    },
    expandedKeysChanged(nVal) {
      if (this.$refs.vtl) {
        this.$refs.vtl.updateToOrigin();
      }
    },
    convertTreeToList(rootNode) {
      let stack = [];
      const childList = [];
      const treeRoot = rootNode;
      treeRoot.level = 0;
      stack.push(treeRoot);
      while (stack.length > 0) {
        const node = stack.pop();
        childList.push(node);
        if (node.children) {
          const children = [...node.children];
          children.reverse();
          stack = [...stack, ...children];
        }
      }
      return childList;
    },
    hasAllParentExpandedAndVisible(node) {
      let result = true;
      let parentNode = node.parent;
      let visible = true;
      while (parentNode) {
        result = result && parentNode.isExpanded;
        visible = visible && parentNode.isVisible;
        parentNode = parentNode.parent;
      }
      return result && visible;
    },
    getTreeChildrenVNodes() {
      const {
        prefixCls, filterNodes, hasAllParentExpandedAndVisible, mapOfFlattenedTree, autoHeight,
        flattenedIndexCache, onResize
      } = this;
      const childrens = [];
      let index = 0;
      if (autoHeight) {
        Object.keys(flattenedIndexCache).forEach((key) => {
          delete flattenedIndexCache[key];
        });
      }
      filterNodes.forEach((firstLevelNode) => {
        const nodes = mapOfFlattenedTree[firstLevelNode.key] || [];
        nodes.forEach((node) => {
          if (!node.isVisible) {
            return;
          }
          if ((node.parent && hasAllParentExpandedAndVisible(node)) || !node.parent) {
            const innerTreeNode = autoHeight ? (
              <AutoSizer { ... {
                props: {
                  unitKey: node.key,
                  onResize
                },
              }}>
                <TreeNode
                  {...{
                    props: {
                      prefixCls,
                      node,
                    },
                  }}
                />
              </AutoSizer>
            ) : (
              <TreeNode
                {...{
                  props: {
                    prefixCls,
                    node,
                  },
                }}
              />
            );
            childrens.push(innerTreeNode);
            if (autoHeight) {
              this.flattenedIndexCache[node.key] = index;
              index += 1;
            }
          }
        });
      });
      return childrens;
    },
    onResize(key, state) {
      const { height } = state;
      const { flattenedIndexCache, $refs } = this;
      const index = flattenedIndexCache[key];
      if (index >= 0 && $refs.vtl) {
        $refs.vtl.updateVarCacheItem(index, height);
      }
    }
  },
  render() {
    const {
      classes, size, viewCount, getTreeChildrenVNodes,
      prefixCls, pagemode, bench, className, scrollelement, autoHeight
    } = this;
    const childrens = getTreeChildrenVNodes();
    const remain = viewCount;
    let wclass = '';
    Object.keys(classes).forEach((classname) => {
      if (classes[classname]) {
        wclass = `${wclass} ${classname}`;
      }
    });
    wclass = `${wclass} ${prefixCls}-virtual ${prefixCls}-checkbox-virtual ${className}`;
    const virtualList = (
      <VirtualList {...{
        ref: 'vtl',
        props: {
          size,
          remain,
          bench,
          variable: autoHeight,
          pagemode,
          scrollelement,
          wtag: 'ul',
          wclass,
        },
      }}>
        {childrens}
      </VirtualList>
    );
    return (
      <div
        {...{
          ref: 'uxTree',
          attrs: {
            unselectable: 'on',
          },
        }}
      >
        {virtualList}
      </div>
    );
  },
};
