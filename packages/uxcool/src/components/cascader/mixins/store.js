import { isArray, isFunction } from '@suning/v-utils';
import { genCascaderKey } from '../utils';

export default {
  created() {
    // no reactive
    this.cascaderStore = {
      nodesMap: {},
    };
  },
  methods: {
    createNodes(nodes = [], parent = null, level = 0) {
      const {
        createNodes, registerNode, loadData, valueField, labelField, childrenField
      } = this;

      const ret = [];
      const l = nodes.length;
      if (l === 0) {
        return ret;
      }
      for (let i = 0; i < l; i += 1) {
        const node = nodes[i];
        if (node) {
          const value = node[valueField];
          const valuePath = parent ? [...parent.valuePath, value] : [value];

          const nNode = {
            ...node,
            originNode: { ...node },
            parent,
            level,
            valuePath,
            value,
            label: node[labelField],
            children: node[childrenField],
            isLoading: false,
            isLoaded: false,
            isParent: isFunction(loadData) ? node.isParent !== false : false,
          };

          const { children } = nNode;
          if (isArray(children) && children.length > 0) {
            nNode.children = createNodes(children, nNode, level + 1);
            nNode.isParent = true;
            nNode.isLoaded = true;
          }
          registerNode(nNode);
          ret.push(nNode);
        }
      }

      return ret;
    },
    clearNodesMap() {
      const { cascaderStore } = this;
      cascaderStore.nodesMap = {};
    },
    registerNode(node) {
      const {
        cascaderStore: { nodesMap },
      } = this;
      nodesMap[genCascaderKey(node.valuePath)] = node;
    },
    getNode(valuePath) {
      const {
        cascaderStore: { nodesMap },
      } = this;
      return nodesMap[genCascaderKey(valuePath)];
    },
    addNodes(nodes = [], parent) {
      const { createNodes, childrenField } = this;

      let nNodes = nodes;
      if (!isArray(nNodes)) {
        nNodes = [nNodes];
      }
      const np = parent;
      let ret;
      if (np) {
        ret = createNodes(nNodes, np, np.level + 1);
        np.isParent = ret.length > 0;
        np.children = ret;
        np.originNode[childrenField] = ret.map((node) => node.originNode);
      } else {
        ret = createNodes(nNodes, null, 0);
      }
      return ret;
    },
  },
};
