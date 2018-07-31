import { isArray, isFunction } from '@suning/v-utils';
import { DEFAULT_FIELD_NAMES, getCascaderKey } from '../utils';

const { value: DefaultValue, children: DefaultChildren } = DEFAULT_FIELD_NAMES;

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
        normalizeFieldNames, createNodes, registerNode, loadData
      } = this;

      const ret = [];
      const l = nodes.length;
      if (l === 0) {
        return ret;
      }
      for (let i = 0; i < l; i += 1) {
        const node = nodes[i];

        const nNode = {
          ...node,
          originNode: { ...node },
          parent,
          level,
          isLoading: false,
          isLoaded: false,
          isParent: isFunction(loadData) ? node.isParent !== false : false,
        };

        // 节点属性重置为默认属性名
        Object.keys(normalizeFieldNames).forEach((k) => {
          const fieldName = normalizeFieldNames[k];
          const val = nNode[fieldName];
          delete nNode[fieldName];
          nNode[DEFAULT_FIELD_NAMES[k]] = val;
        });

        const children = nNode[DefaultChildren];
        if (isArray(children) && children.length > 0) {
          nNode[DefaultChildren] = createNodes(children, nNode, level + 1);
          nNode.isParent = true;
        }
        registerNode(nNode);
        ret.push(nNode);
      }
      return ret;
    },
    clearNodesMap() {
      const { cascaderStore } = this;
      cascaderStore.nodesMap = {};
    },
    registerNode(node) {
      const { cascaderStore: { nodesMap } } = this;
      nodesMap[getCascaderKey(node[DefaultValue], node.level)] = node;
    },
    getNode(value, level) {
      const { cascaderStore: { nodesMap } } = this;
      return nodesMap[getCascaderKey(value, level)];
    },
    addNodes(nodes = [], parent) {
      const { createNodes } = this;

      let nNodes = nodes;
      if (!isArray(nNodes)) {
        nNodes = [nNodes];
      }
      const np = parent;
      let ret;
      if (np) {
        ret = createNodes(nNodes, np, np.level + 1);
        np.isParent = ret.length > 0;
        np[DefaultChildren] = ret;
      } else {
        ret = createNodes(nNodes, null, 0);
      }
      return ret;
    },
  },
};
