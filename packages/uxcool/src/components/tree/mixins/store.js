import { isArray, isFunction } from '@suning/v-utils';
import {
  getNodeKey,
  normalizeNode,
  setStoreKeysByName,
  getNodeStatus,
  getNodeChildCheckState,
  getParentChecked,
  getOriginNodes,
} from '../utils';

export default {
  created() {
    this.treeStore = {
      isInit: false,
      seed: 0,
      pos: 0,
      rootNodes: [],
      nodesMap: {},
      selectedKeys: [],
      expandedKeys: [],
      checkedKeys: [],
      halfCheckedKeys: [],
    };
  },
  methods: {
    createNodes(nodes, parent, level, deepClone = true, from = 'init') {
      const {
        treeStore,
        rowKey,
        registerNode,
        addRootNodes,
        createNodes,
        checkStrict,
        defaultExpandAll: expandAll,
        multiple,
        addStoreKeys,
        lazy,
        defaultExpandParent,
        checkParentExpand,
      } = this;
      const { expandedKeys, checkedKeys } = treeStore;
      const selectedKeys = multiple ? treeStore.selectedKeys : [treeStore.selectedKeys[0] || ''];

      const l = nodes.length;
      if (l === 0) {
        return [];
      }

      const parentChecked = getParentChecked(parent);

      const ret = [];
      for (let i = 0; i < l; i += 1) {
        const item = nodes[i];
        const { children, disabled, disableCheckbox } = item;
        treeStore.pos += 1;
        const key = getNodeKey(item, rowKey, treeStore);
        const nNode = normalizeNode(item, {
          key,
          originNode: item.originNode ? item.originNode : item,
          childCheckState: -1,
          parent,
          level,
          pos: treeStore.pos,
          isVisible: true,
          isDisabled: typeof disabled === 'boolean' ? disabled : undefined,
          // 初始创建时不直接设置false, 防止后面与全局状态冲突
          isExpanded:
            getNodeStatus(expandedKeys, key, undefined, false, disabled) ||
            (lazy ? undefined : !!expandAll),
          isSelected: getNodeStatus(selectedKeys, key, undefined, false, disabled),
          isChecked: getNodeStatus(
            checkedKeys,
            key,
            undefined,
            parentChecked,
            disabled || disableCheckbox,
            checkStrict
          ),
          isHalfChecked: false,
          isLoaded: from === 'drop' ? !!item.$$isLoaded : false,
          isLoading: false,
          // 'top', 'bottom', 'mid', 'none'
          dragOverGap: 'none',
          isDragNode: !!item.$$isDragNode,
        });

        let isParent = false;
        let childNodes = null;
        if (isArray(children) && children.length > 0) {
          childNodes = deepClone
            ? createNodes(children, nNode, level + 1, deepClone, from)
            : children;
          isParent = true;
        }

        // 延迟加载时,默认isLeaf = undefined
        const isLeaf = item.isLeaf || (lazy ? undefined : !isParent);

        nNode.children = childNodes;
        // 是否叶节点
        nNode.isLeaf = isLeaf;
        // 是否父节点
        nNode.isParent = isParent;

        if (isParent) {
          nNode.childCheckState = getNodeChildCheckState(childNodes || []);
          if (!checkStrict) {
            nNode.isHalfChecked = nNode.childCheckState === 1;
            nNode.isChecked = nNode.childCheckState === 2 ? true : nNode.isChecked;
          }
        }

        if (from !== 'drop' && defaultExpandParent && nNode.isExpanded) {
          checkParentExpand(nNode);
        }

        if (level === 0) {
          addRootNodes(nNode);
        }
        addStoreKeys(nNode);
        registerNode(nNode);
        ret.push(nNode);
      }
      return ret;
    },
    checkParentExpand(node) {
      const { addStoreExpandKeys } = this;
      let np = node.parent;
      while (np) {
        if (!np.isExpanded) {
          np.isExpanded = true;
          addStoreExpandKeys(np.key);
        }
        np = np.parent;
      }
    },
    addStoreExpandKeys(node) {
      const { expandedKeys } = this.treeStore;
      const { key, isParent, isExpanded } = node;
      if (isParent && isExpanded && expandedKeys.indexOf(key) === -1) {
        expandedKeys.push(key);
      }
    },
    addStoreCheckedKeys(node) {
      const { checkedKeys } = this.treeStore;
      const { key, isChecked } = node;
      if (isChecked && checkedKeys.indexOf(key) === -1) {
        checkedKeys.push(key);
      }
    },
    addStoreHalfCheckedKeys(node) {
      const { halfCheckedKeys } = this.treeStore;
      const { key, isParent, isHalfChecked } = node;
      if (isParent && isHalfChecked && halfCheckedKeys.indexOf(key) === -1) {
        halfCheckedKeys.push(key);
      }
    },
    addStoreKeys(node) {
      const { addStoreExpandKeys, addStoreCheckedKeys, addStoreHalfCheckedKeys } = this;
      addStoreExpandKeys(node);
      addStoreCheckedKeys(node);
      addStoreHalfCheckedKeys(node);
    },
    registerNode(node) {
      const { treeStore: { nodesMap } } = this;
      nodesMap[node.key] = node;
    },
    unregisterNode(node) {
      const { treeStore: { nodesMap } } = this;
      delete nodesMap[node.key];
    },
    clearNodesMap() {
      const { treeStore } = this;
      treeStore.seed = 0;
      treeStore.pos = 0;
      treeStore.rootNodes = [];
      treeStore.nodesMap = {};
    },
    addRootNodes(node) {
      if (node.level === 0) {
        this.treeStore.rootNodes.push(node);
      }
    },
    addNodes(nodes, parent, replace = true, deepClone = true) {
      const { createNodes } = this;

      let nNodes = nodes;
      if (!isArray(nodes)) {
        nNodes = [nodes];
      }
      let ret;
      if (parent) {
        ret = createNodes(nNodes, parent, parent.level + 1, deepClone);
        const np = parent;
        let { children } = np;
        if (!replace && isArray(children)) {
          children.push(...ret);
        } else {
          children = ret;
        }
        const isParent = children.length > 0;
        np.isParent = isParent;
        // np.isLeaf = np.isLeaf || !isParent;
        np.isLeaf = !isParent;
        np.children = children;
        np.originNode.children = children.map(v => v.originNode);
      } else {
        this.clearNodesMap();
        ret = createNodes(nNodes, null, 0, deepClone);
      }
      return ret;
    },
    getStoreNode(key) {
      return this.treeStore.nodesMap[key] || null;
    },
    getSortNodes(keys = []) {
      const { getStoreNode } = this;
      return keys
        .map(k => getStoreNode(k))
        .filter(node => !!node)
        .sort((a, b) => a.pos - b.pos);
    },
    setChildren(data, childNode, cb, idx = -1) {
      const nData = data;
      const nChildNode = childNode;
      let { children } = nData;
      if (!isArray(children)) {
        children = [];
      }
      nChildNode.$$isDragNode = true;
      if (idx === -1) {
        children.push(nChildNode);
      } else {
        children.splice(idx, 0, nChildNode);
      }

      nData.children = children;
      if (isFunction(cb)) {
        cb();
      }
    },
    addChildren(data, childNode, cb) {
      this.setChildren(data, childNode, cb);
    },
    removeChildren(data, originNode) {
      const nData = data;
      const { children } = nData;
      if (isArray(children)) {
        nData.children = children.filter(v => v !== originNode);
        // nNode.children = nChildren;
        // if (!isVirtualParent) {
        //   if (nNode.parent === null) {
        //     this.nodes = this.addNodes(nodes, null, true, false);
        //   } else {
        //     this.addNodes(nNode.parent.children, nNode.parent, true, false);
        //   }
        // }
      }
    },
    resetStoreKeys(keyName, cb) {
      const { getSortNodes } = this;

      if (!keyName) {
        return null;
      }

      return (nVal = [], oVal = []) => {
        // 将已不存在的置为false
        getSortNodes(oVal).forEach((node) => {
          if (node) {
            const nNode = node;
            nNode[keyName] = false;
            if (isFunction(cb)) {
              cb('old', node);
            }
          }
        });

        // 将新增的key对应的属性置为true
        getSortNodes(nVal).forEach((node) => {
          if (node) {
            const nNode = node;
            nNode[keyName] = true;
            if (isFunction(cb)) {
              cb('new', node);
            }
          }
        });
      };
    },
    updateStoreSelectedKeys(keys = [], op = 'add', replace = false) {
      const { treeStore, resetStoreKeys, debounceTriggerSelectedKeysChangeEvent } = this;
      setStoreKeysByName(
        treeStore,
        'selectedKeys',
        keys,
        op,
        replace,
        resetStoreKeys('isSelected'),
        debounceTriggerSelectedKeysChangeEvent
      );
    },
    updateStoreExpandedKeys(keys, op = 'add', replace = false) {
      const { treeStore, resetStoreKeys } = this;
      setStoreKeysByName(
        treeStore,
        'expandedKeys',
        keys,
        op,
        replace,
        resetStoreKeys('isExpanded')
      );
    },
    updateStoreCheckedKeys(keys, op = 'add', replace = false) {
      const {
        treeStore,
        resetStoreKeys,
        checkStrict,
        checkNodeRelation,
        updateStoreHalfCheckedKeys,
        setStoreCheckedKeys,
        setStoreHalfCheckedKeys,
        debounceTriggerCheckedKeysChangeEvent,
      } = this;
      const resetFn = resetStoreKeys('isChecked', (flag, node) => {
        if (!node.isDisabled && !node.disableCheckbox) {
          if (flag === 'new') {
            const { key, isChecked, isHalfChecked } = node;
            setStoreCheckedKeys(key, isChecked);
            setStoreHalfCheckedKeys(key, isHalfChecked);
          }
          checkNodeRelation(node);
        }
      });
      setStoreKeysByName(
        treeStore,
        'checkedKeys',
        keys,
        op,
        replace,
        (...args) => {
          resetFn(...args);
          if (checkStrict) {
            updateStoreHalfCheckedKeys([], false, true);
          }
        },
        debounceTriggerCheckedKeysChangeEvent
      );
    },
    updateStoreHalfCheckedKeys(keys, op = 'add', replace = false) {
      const { treeStore, resetStoreKeys } = this;
      setStoreKeysByName(
        treeStore,
        'halfCheckedKeys',
        keys,
        op,
        replace,
        resetStoreKeys('isHalfChecked')
      );
    },
    setStoreCheckedKeys(key, checked) {
      const { treeStore: { checkedKeys }, updateStoreCheckedKeys } = this;
      if (checked || (!checked && checkedKeys.indexOf(key) > -1)) {
        updateStoreCheckedKeys(key, checked ? 'add' : 'del');
      }
    },
    setStoreHalfCheckedKeys(key, checked) {
      const { treeStore: { halfCheckedKeys }, updateStoreHalfCheckedKeys } = this;
      if (checked || (!checked && halfCheckedKeys.indexOf(key) > -1)) {
        updateStoreHalfCheckedKeys(key, checked ? 'add' : 'del');
      }
    },
    getStoreSelectedKeys() {
      return [...this.treeStore.selectedKeys];
    },
    getStoreExpandedKeys() {
      return [...this.treeStore.expandedKeys];
    },
    getStoreCheckedKeys() {
      return [...this.treeStore.checkedKeys];
    },
    getStoreHalfCheckedKeys() {
      return [...this.treeStore.halfCheckedKeys];
    },
    // get nodes
    getStoreSelectedNodes() {
      const { treeStore: { selectedKeys, nodesMap } } = this;
      return getOriginNodes(nodesMap, selectedKeys);
    },
    getStoreExpandedNodes() {
      const { treeStore: { expandedKeys, nodesMap } } = this;
      return getOriginNodes(nodesMap, expandedKeys);
    },
    getStoreCheckedNodes() {
      const { treeStore: { checkedKeys, nodesMap } } = this;
      return getOriginNodes(nodesMap, checkedKeys);
    },
    getStoreHalfCheckedNodes() {
      const { treeStore: { halfCheckedKeys, nodesMap } } = this;
      return getOriginNodes(nodesMap, halfCheckedKeys);
    },
    setChildNodeCheckbox(node, checked) {
      const { setStoreCheckedKeys, setStoreHalfCheckedKeys } = this;
      const { children } = node;

      if (children && children.length > 0) {
        for (let i = 0, l = children.length; i < l; i += 1) {
          const childNode = children[i];
          if (!childNode.isDisabled && !childNode.disableCheckbox) {
            childNode.isChecked = checked;
            // 关联选中子节点时, 子节点是不可能有halfChecked = true的
            childNode.isHalfChecked = false;
            const { key } = childNode;
            setStoreCheckedKeys(key, checked);
            setStoreHalfCheckedKeys(key, false);
          }
          this.setChildNodeCheckbox(childNode, checked);
        }
      }
      const nNode = node;
      nNode.childCheckState = getNodeChildCheckState(children || []);
    },
    setParentNodeCheckbox(node, checked) {
      const { setStoreCheckedKeys, setStoreHalfCheckedKeys } = this;
      const { parent } = node;
      if (!parent) {
        return;
      }
      // childCheckState:
      // -1 :不存在子节点 0:无 子节点被勾选 1: 部分 子节点被勾选 2:全部 子节点被勾选
      const childCheckState = getNodeChildCheckState(parent.children || []);

      parent.childCheckState = childCheckState;
      if (!parent.isDisabled && !parent.disableCheckbox) {
        switch (childCheckState) {
          case 0:
            parent.isHalfChecked = false;
            parent.isChecked = false;
            break;
          case 1:
            parent.isChecked = false;
            parent.isHalfChecked = true;
            break;
          case 2:
            parent.isChecked = true;
            parent.isHalfChecked = false;
            break;
          default:
            parent.isChecked = checked;
            break;
        }
        const { key, isChecked, isHalfChecked } = parent;
        setStoreCheckedKeys(key, isChecked);
        setStoreHalfCheckedKeys(key, isHalfChecked);
      }

      if (parent.parent) {
        this.setParentNodeCheckbox(parent, checked);
      }
    },
    checkNodeRelation(node) {
      const { checkStrict, setChildNodeCheckbox, setParentNodeCheckbox } = this;
      if (!node || checkStrict) return;

      const { isChecked } = node;
      setChildNodeCheckbox(node, isChecked);

      setParentNodeCheckbox(node, isChecked);
    },
  },
};
