import { isArray, isEqual, isFunction, debounce } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import { getDragNodeKeys, calcDragOverGap } from './utils';
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
    directory: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    allowDrag: {
      type: Function,
      default: null,
    },
    allowDrop: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      nodes: [],
      dragNode: null,
      // 当前拖拽包含所有节点key
      dragNodeKeys: [],
      dragOverNode: null,
      dropPosition: null,
      dragEnterTimer: null,
    };
  },
  computed: {
    classes() {
      const {
        prefixCls, showLine, directory, draggable
      } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-directory`]: directory,
        [`${prefixCls}-show-line`]: showLine,
        [`${prefixCls}-draggable`]: draggable,
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
      const { clearNodesMap, createNodes, triggerAsyncEvent } = this;
      clearNodesMap();
      this.nodes = createNodes(nVal, null, 0);
      triggerAsyncEvent();
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
      this.callHook('expandedKeysChanged', nVal);
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
      triggerCheckedKeysChangeEvent,
      triggerSelectedKeysChangeEvent,
      triggerAsyncEvent,
    } = this;
    this.debounceTriggerCheckedKeysChangeEvent = debounce(triggerCheckedKeysChangeEvent, 20);
    this.debounceTriggerSelectedKeysChangeEvent = debounce(triggerSelectedKeysChangeEvent, 20);
    updateStoreSelectedKeys(selectedKeys, null, true);
    updateStoreCheckedKeys(checkedKeys, null, true);
    updateStoreExpandedKeys(expandedKeys, null, true);
    loadRootNodes().then(triggerAsyncEvent);
  },
  methods: {
    loadRootNodes() {
      const {
        dataSource, createNodes, asyncNode, canAsync
      } = this;

      return new Promise((resolve) => {
        if (dataSource && dataSource.length > 0) {
          this.nodes = createNodes(dataSource, null, 0);
        } else if (canAsync()) {
          asyncNode().then((nodes) => {
            this.nodes = nodes || [];
            resolve();
          });
        } else {
          resolve();
        }
      });
    },
    searchFilter(value, node) {
      const { filterOption } = this;
      if (isFunction(filterOption)) {
        return filterOption(value, node);
      }

      return (String(node.key) || '').indexOf(value) > -1;
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
    triggerExpand(e, node, vm) {
      const { updateStoreExpandedKeys, getStoreExpandedKeys, getStoreExpandedNodes } = this;
      const { key, isExpanded } = node;

      updateStoreExpandedKeys(key, isExpanded ? 'add' : 'del');
      this.$emit('expand', getStoreExpandedKeys(), {
        expanded: isExpanded,
        expandedNodes: getStoreExpandedNodes(),
        node: { ...node.originNode },
        vm,
        domEvent: e,
      });
    },
    onNodeExpand(e, node, vm) {
      const {
        canAsync, asyncNode, triggerExpand, triggerAsyncEvent, callHook
      } = this;
      const { isExpanded } = node;
      callHook('onNodeExpandBeforeHook', e, node, vm);
      if (canAsync(node)) {
        if (isExpanded) {
          asyncNode(node).then(() => {
            if (node.isParent) {
              triggerExpand(e, node, vm);
            }
            triggerAsyncEvent();
          });
        }
      } else {
        triggerExpand(e, node, vm);
      }
    },
    onNodeDragStart(e, node) {
      const originNode = { ...node.originNode };
      this.dragNode = node;
      this.dragNodeKeys = getDragNodeKeys([node]);
      this.$emit('dragstart', { e, node: originNode });
    },
    clearDragOverGap(dragOverNode) {
      const nDragOverNode = dragOverNode;
      if (nDragOverNode) {
        nDragOverNode.dragOverGap = 'none';
      }
    },
    onNodeDragEnd(e, node) {
      const { clearDragOverGap, dragOverNode, callHook } = this;
      clearDragOverGap(dragOverNode);
      this.$emit('dragend', { e, node: { ...node.originNode } });
      callHook('onNodeDragEndHook', e, node);
    },
    clearDragEnterTimer() {
      if (this.dragEnterTimer) {
        clearTimeout(this.dragEnterTimer);
      }
    },
    triggerDragExpand(e, node = {}, vm) {
      // 因为drop之后重新生成了node,所以需要重新获取
      const nNode = this.getStoreNode(node.key);
      nNode.isExpanded = nNode.children && nNode.children.length > 0;
      this.triggerExpand(e, nNode, vm);
    },
    onNodeDragEnter(e, node, vm) {
      const { canAsync } = this;
      this.clearDragEnterTimer();
      if (!canAsync(node)) {
        this.dragEnterTimer = setTimeout(() => {
          // 因为drop之后重新生成了node,所以需要重新获取
          this.triggerDragExpand(e, node, vm);
          this.$emit('dragenter', {
            e,
            // drop时直接操作的的是node的originNode,所以数据时正确的
            node: { ...node.originNode },
            expandedKeys: this.getStoreExpandedKeys(),
          });
        }, 500);
      }
    },
    onNodeDragLeave(e, node) {
      this.clearDragOverGap(node);
      this.$emit('dragleave', { e, node: { ...node.originNode } });
    },

    onNodeDragOver(e, node, { $refs: { selectorRef } }) {
      const { dragNode, clearDragOverGap, dragOverNode: oldDragOverNode } = this;
      if (!dragNode) {
        this.dragOverNode = null;
        return;
      }

      clearDragOverGap(oldDragOverNode);

      const dragOverNode = node;
      dragOverNode.dragOverGap = calcDragOverGap(e, selectorRef);

      this.dragOverNode = dragOverNode;
      this.$emit('dragover', { e, node: { ...node.originNode } });
    },
    isDropInSelf(dropNode) {
      const { dragNodeKeys = [] } = this;
      const { key } = dropNode;

      return dragNodeKeys.indexOf(key) > -1;
    },
    onNodeDrop(e, dropNode, vm) {
      const that = this;
      const {
        dragNode,
        dragOverNode,
        dragNodeKeys,
        isDropInSelf,
        addChildren,
        setChildren,
        removeChildren,
        createNodes,
        onNodeExpand,
        getStoreNode,
        clearDragEnterTimer,
        updateStoreExpandedKeys,
      } = that;
      const nDropNode = dropNode;

      // const originNode = { ...nDropNode.originNode };
      const isAllowDrop = !isDropInSelf(nDropNode);
      if (!isAllowDrop) {
        e.preventDefault();
        return;
      }

      if (dragNode) {
        clearDragEnterTimer();
        let treeData = this.nodes.map(v => v.originNode);
        const { parent: dragParent } = dragNode;
        const dragParentChilds = !dragParent
          ? {
            set children(childs) {
              treeData = childs;
            },
            get children() {
              return treeData;
            },
          }
          : {
            set children(childs) {
              dragParent.originNode.children = childs;
            },
            get children() {
              return dragParent.originNode.children;
            },
        };

        removeChildren(dragParentChilds, dragNode.originNode);

        // 同步当前父级展开状态
        if (dragParent && (!dragParentChilds.children || dragParentChilds.children.length === 0)) {
          updateStoreExpandedKeys(dragParent.key, 'del');
        }
        const { parent: dropParent } = nDropNode;
        const dropParentChilds = !dropParent
          ? {
            set children(childs) {
              treeData = childs;
            },
            get children() {
              return treeData;
            },
          }
          : {
            set children(childs) {
              dropParent.originNode.children = childs;
            },
            get children() {
              return dropParent.originNode.children;
            },
        };
        const { dragOverGap } = dragOverNode;
        const dropChilds = {
          set children(childs) {
            nDropNode.originNode.children = childs;
          },
          get children() {
            return nDropNode.originNode.children;
          },
        };
        if (dragOverGap === 'mid') {
          addChildren(dropChilds, dragNode.originNode);
        } else if (
          dragOverGap === 'bottom' &&
          dropChilds.children &&
          dropChilds.children.length > 0 &&
          nDropNode.isExpanded
        ) {
          setChildren(dropChilds, dragNode.originNode, null, 0);
        } else {
          const idx = dropParentChilds.children.indexOf(nDropNode.originNode);
          setChildren(
            dropParentChilds,
            dragNode.originNode,
            null,
            dragOverGap === 'top' ? idx : idx + 1
          );
        }

        this.nodes = createNodes(
          treeData || this.nodes.map(v => v.originNode),
          null,
          0,
          true,
          'drop'
        );

        if (dragOverGap === 'mid') {
          const newDropNode = getStoreNode(nDropNode.key);
          newDropNode.isExpanded = true;
          onNodeExpand(e, newDropNode, vm);
        } else if (dropParent) {
          this.triggerDragExpand(e, dropParent, vm);
        }

        this.$emit('drop', {
          e,
          dragOverGap,
          node: { ...dropNode.originNode },
          dragNode: { ...dragNode.originNode },
          dragNodeKeys,
        });
      }
    },
    triggerAsyncEvent() {
      const {
        debounceTriggerCheckedKeysChangeEvent,
        debounceTriggerSelectedKeysChangeEvent,
      } = this;
      debounceTriggerCheckedKeysChangeEvent({ keyName: 'checkedKeys', op: null, replace: true });
      debounceTriggerSelectedKeysChangeEvent({ keyName: 'selectedKeys', op: null, replace: true });
    },
    triggerSelectedKeysChangeEvent(e) {
      const { getStoreSelectedKeys, getStoreSelectedNodes } = this;
      this.$emit('selected-keys-change', getStoreSelectedKeys(), {
        ...e,
        nodes: getStoreSelectedNodes(),
      });
    },
    triggerCheckedKeysChangeEvent(e) {
      const { getStoreCheckedKeys, getStoreCheckedNodes } = this;
      this.$emit('checked-keys-change', getStoreCheckedKeys(), {
        ...e,
        nodes: getStoreCheckedNodes(),
      });
    },
    callHook(...args) {
      const fnName = args.shift();
      if (this[fnName]) {
        this[fnName](...args);
      }
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
