import { isArray, isEqual, isFunction } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import InnerNode from './innerNode';
import StoreMixin from './mixins/store';
import AsyncMixin from './mixins/async';
import ApiMixin from './mixins/api';

export default {
  name: buildComponentName('Tree'),
  provide() {
    return {
      treeRoot: this,
    };
  },
  mixins: [StoreMixin, AsyncMixin, ApiMixin],
  props: {
    prefixCls: {
      type: String,
      default: 'ux-tree',
    },
    dataSource: {
      type: Array,
      default() {
        return [];
      },
    },
    selectedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    checkedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    expandedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: [String, Function],
      default: undefined,
    },
    showLine: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    checkStrict: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    defaultExpandParent: {
      type: Boolean,
      default: true,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    loadData: {
      type: Function,
      default() {
        return Promise.resolve();
      },
    },
    renderContent: {
      type: Function,
      default: null,
    },
    filterOption: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      nodes: [],
    };
  },
  computed: {
    classes() {
      const { prefixCls, showLine } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-show-line`]: showLine,
      };
    },
    filterNodes() {
      const { nodes } = this;
      return nodes;
    },
    renderContentFn() {
      const { $scopedSlots, renderContent } = this;
      return $scopedSlots.renderContent || renderContent;
    },
  },
  watch: {
    dataSource(nVal) {
      if (!isArray(nVal)) return;
      const { clearNodesMap, createNodes } = this;
      clearNodesMap();
      this.nodes = createNodes(nVal, null, 0);
    },
    selectedKeys(nVal, oVal) {
      if (!isArray(nVal) || isEqual(nVal, oVal)) return;
      this.updateStoreSelectedKeys(nVal, null, true);
    },
    checkedKeys(nVal, oVal) {
      if (!isArray(nVal) || isEqual(nVal, oVal)) return;
      this.updateStoreCheckedKeys(nVal, null, true);
    },
    expandedKeys(nVal, oVal) {
      if (!isArray(nVal) || isEqual(nVal, oVal)) return;
      this.updateStoreExpandedKeys(nVal, null, true);
    },
  },
  created() {
    const {
      selectedKeys,
      checkedKeys,
      expandedKeys,
      updateStoreSelectedKeys,
      updateStoreExpandedKeys,
      updateStoreCheckedKeys,
      loadRootNodes,
    } = this;
    updateStoreSelectedKeys(selectedKeys);
    updateStoreCheckedKeys(checkedKeys);
    updateStoreExpandedKeys(expandedKeys);
    loadRootNodes();
  },
  methods: {
    loadRootNodes() {
      const { dataSource, createNodes, asyncNode } = this;

      if (dataSource && dataSource.length > 0) {
        this.nodes = createNodes(dataSource, null, 0);
      } else {
        asyncNode().then((nodes) => {
          this.nodes = nodes || [];
        });
      }
    },
    searchFilter(value, node) {
      const { filterOption } = this;
      if (isFunction(filterOption)) {
        return filterOption(value, node);
      }

      return (node.key || '').indexOf(value) > -1;
    },
    onNodeClick(e, node, vm) {
      this.$emit('node-click', e, { ...node.originNode }, vm);
    },
    onNodeSelect(e, node, vm) {
      const {
        multiple,
        updateStoreSelectedKeys,
        getStoreSelectedKeys,
        getStoreSelectedNodes,
      } = this;
      const { key, isSelected } = node;
      updateStoreSelectedKeys(key, isSelected ? 'add' : 'del', isSelected && !multiple);
      this.$emit('select', getStoreSelectedKeys(), {
        selected: isSelected,
        selectedNodes: getStoreSelectedNodes(),
        node: { ...node.originNode },
        vm,
        domEvent: e,
      });
    },
    onNodeCheck(e, node, vm) {
      const {
        setStoreCheckedKeys,
        setStoreHalfCheckedKeys,
        checkNodeRelation,
        getStoreCheckedKeys,
        getStoreHalfCheckedKeys,
        getStoreCheckedNodes,
      } = this;
      const { key, isChecked, isHalfChecked } = node;

      setStoreCheckedKeys(key, isChecked);
      setStoreHalfCheckedKeys(key, isHalfChecked);

      checkNodeRelation(node);
      this.$emit('check', getStoreCheckedKeys(), {
        checked: isChecked,
        checkedNodes: getStoreCheckedNodes(),
        halfCheckedkeys: getStoreHalfCheckedKeys(),
        node: { ...node.originNode },
        vm,
        domEvent: e,
      });
    },
    onNodeExpand(e, node, vm) {
      const {
        updateStoreExpandedKeys,
        getStoreExpandedKeys,
        canAsync,
        asyncNode,
        getStoreExpandedNodes,
      } = this;
      const { key, isExpanded } = node;

      if (canAsync(node)) {
        asyncNode(node).then((data) => {
          const nNode = node;
          if (data && data.length > 0) {
            nNode.isParent = true;
          }
          nNode.children = data || [];
        });
      } else {
        updateStoreExpandedKeys(key, isExpanded ? 'add' : 'del');
      }
      this.$emit('expand', getStoreExpandedKeys(), {
        expanded: isExpanded,
        expandedNodes: getStoreExpandedNodes(),
        node: { ...node.originNode },
        vm,
        domEvent: e,
      });
    },
  },
  render() {
    const { prefixCls, filterNodes, classes } = this;
    const childrens = filterNodes.map(node => (
      <InnerNode
        {...{
          props: {
            prefixCls,
            node,
          },
        }}
      />
    ));

    return (
      <ul
        {...{
          class: classes,
          attrs: {
            unselectable: 'on',
          },
        }}
      >
        {childrens}
      </ul>
    );
  },
};
