import { isArray } from '@cloud-sn/v-utils';
import {
  genCascaderKey, getParentChecked, getNodeChecked, getNodeChildCheckState
} from '../util';

export default {
  created() {
    this.cascaderStore = {
      nodesMap: {},
      // 存放待确认有效性的值
      pendingValue: [],
      // 转成对象形式方便查找
      pendingValueObj: {},
    };
  },
  methods: {
    createNodes(nodes = [], parent = null, level = 0) {
      const {
        labelField,
        valueField,
        childrenField,
        createNodes,
        isLazy,
        registerNode,
        checkStrict,
        cascaderStore: { pendingValueObj },
      } = this;

      const result = [];

      if (nodes.length === 0) {
        return result;
      }

      const parentChecked = getParentChecked(parent);

      nodes.forEach((node) => {
        const value = node[valueField];
        const valuePath = parent ? [...parent.valuePath, value] : [value];

        // 使用value路径构建唯一id
        const id = genCascaderKey(valuePath);

        const nodeClone = {
          ...node,
          originNode: { ...node },
          parent,
          level,
          id,
          valuePath,
          value,
          label: node[labelField],
          children: node[childrenField],
          isLoading: false,
          isLoaded: false,
          isParent: isLazy ? node.isParent !== false : false,
          isChecked: getNodeChecked(
            pendingValueObj,
            id,
            false,
            parentChecked,
            node.disabled,
            checkStrict
          ),
          isIndeterminate: false,
        };

        const { children } = nodeClone;

        if (isArray(children) && children.length > 0) {
          nodeClone.children = createNodes(children, nodeClone, level + 1);
          nodeClone.isParent = true;
          nodeClone.isLoaded = true;
          nodeClone.childCheckState = getNodeChildCheckState(nodeClone.children);

          if (!checkStrict) {
            nodeClone.isIndeterminate = nodeClone.childCheckState === 1;
            nodeClone.isChecked = nodeClone.childCheckState === 2 || nodeClone.isChecked;
          }
        }

        registerNode(nodeClone);
        result.push(nodeClone);
      });

      return result;
    },
    registerNode(node) {
      const {
        cascaderStore: { nodesMap },
      } = this;
      nodesMap[node.id] = node;
    },
    setPendingValue(validValue) {
      const { cascaderStore } = this;

      cascaderStore.pendingValue = validValue;
      cascaderStore.pendingValueObj = validValue.reduce((r, c) => {
        const result = r;
        const k = genCascaderKey(c);
        result[k] = true;
        return result;
      }, {});
    },
    getPendingValue() {
      return this.cascaderStore.pendingValue;
    },
    clearNodesMap() {
      const { cascaderStore } = this;

      cascaderStore.nodesMap = {};
    },
    getNode(valuePath) {
      const {
        cascaderStore: { nodesMap },
      } = this;

      return nodesMap[genCascaderKey(valuePath)];
    },
    addNodes(nodes = [], parent = null) {
      const { createNodes, childrenField, checkStrict } = this;

      let nNodes = nodes;
      const nParent = parent;
      let result;

      if (!isArray(nNodes)) {
        nNodes = [nNodes];
      }

      if (nParent) {
        result = createNodes(nNodes, nParent, nParent.level + 1);
        nParent.isParent = result.length > 0;
        nParent.children = result;
        nParent.originNode[childrenField] = result.map((node) => node.originNode);
        const { isChecked } = nParent;

        // 如果父节点未勾选，则需要更新上层节点的勾选状态
        if (!isChecked && !checkStrict) {
          let p = nParent;
          while (p) {
            p.childCheckState = getNodeChildCheckState(p.children);
            p.isIndeterminate = p.childCheckState === 1;
            p = p.parent;
          }
        }
      } else {
        result = createNodes(nNodes, null, 0);
      }

      return result;
    },
    setParentNodeCheckbox(node) {
      const { setParentNodeCheckbox } = this;
      const { parent } = node;

      if (!parent) {
        return;
      }

      // -1: 无子节点  0: 无勾选子节点  1: 部分子节点勾选  2: 所有子节点被勾选
      const childCheckState = getNodeChildCheckState(parent.children || []);

      parent.childCheckState = childCheckState;

      if (!parent.disabled) {
        switch (childCheckState) {
          case 0:
            parent.isChecked = false;
            parent.isIndeterminate = false;
            break;
          case 1:
            parent.isChecked = false;
            parent.isIndeterminate = true;
            break;
          case 2:
            parent.isChecked = true;
            parent.isIndeterminate = false;
            break;
          default:
            parent.isChecked = false;
            break;
        }
      }
      setParentNodeCheckbox(parent);
    },
    setChildrenNodeCheckbox(node, isChecked) {
      const { setChildrenNodeCheckbox } = this;
      const { children } = node;

      if (children && children.length > 0) {
        children.forEach((child) => {
          const nChild = child;

          if (!nChild.disabled) {
            nChild.isChecked = isChecked;
            nChild.isIndeterminate = false;
          }

          setChildrenNodeCheckbox(nChild, isChecked);
        });
      }

      const nNode = node;
      nNode.childCheckState = getNodeChildCheckState(children || []);
    },
    checkNodeRelation(node) {
      const { checkStrict, setChildrenNodeCheckbox, setParentNodeCheckbox } = this;

      if (!node || checkStrict) {
        return;
      }

      const { isChecked } = node;
      setChildrenNodeCheckbox(node, isChecked);
      setParentNodeCheckbox(node);
    },
  },
};
