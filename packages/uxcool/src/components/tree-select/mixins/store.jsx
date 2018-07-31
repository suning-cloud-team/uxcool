import { isArray } from '@suning/v-utils';
import {
  DEFAULT_FIELD_NAMES,
  getNodeStatus,
  getNodeChildCheckState,
  getParentChecked,
  getOriginNodes,
} from '../utils';

const { value: DefaultValue, children: DefaultChildren } = DEFAULT_FIELD_NAMES;
export default {
  created() {
    this.treeStore = {
      nodesMap: {},
      pos: 0,
    };
  },
  methods: {
    updateParentCheckedAndHalfChecked(node) {
      const { treeCheckStrict: checkStrict } = this;
      const nNode = node;
      if (nNode.isParent) {
        nNode.childCheckState = getNodeChildCheckState(nNode[DefaultChildren] || []);
        if (!checkStrict) {
          nNode.isHalfChecked = nNode.childCheckState === 1;
          nNode.isChecked = nNode.childCheckState === 2 ? true : nNode.isChecked;
        }
      }
    },
    createNodes(nodes = [], parent = null, level = 0) {
      const {
        treeStore,
        normalizeFieldNames,
        createNodes,
        registerNode,
        innerValue,
        treeCheckStrict: checkStrict,
        updateParentCheckedAndHalfChecked,
      } = this;
      const ret = [];
      const l = nodes.length;
      if (l === 0) {
        return ret;
      }
      for (let i = 0; i < l; i += 1) {
        const item = nodes[i];
        treeStore.pos += 1;
        const { disabled, disableCheckbox } = item;
        const nNode = {
          ...item,
          originNode: item,
          parent,
          level,
          pos: treeStore.pos,
          isDisabled: typeof disabled === 'boolean' ? disabled : undefined,
          isHalfChecked: false,
        };

        Object.keys(DEFAULT_FIELD_NAMES).forEach((k) => {
          const fieldName = normalizeFieldNames[k];
          const val = nNode[fieldName];
          delete nNode[fieldName];
          nNode[DEFAULT_FIELD_NAMES[k]] = val;
        });

        const parentChecked = getParentChecked(parent);
        nNode.isChecked = getNodeStatus(
          innerValue,
          nNode[DefaultValue],
          undefined,
          parentChecked,
          disabled || disableCheckbox,
          checkStrict
        );

        let isParent = false;
        const children = nNode[DefaultChildren];
        if (isArray(children) && children.length > 0) {
          nNode[DefaultChildren] = createNodes(children, nNode, level + 1);
          isParent = true;
        }
        nNode.isParent = isParent;

        updateParentCheckedAndHalfChecked(nNode);
        registerNode(nNode);
        ret.push(nNode);
      }
      return ret;
    },
    registerNode(node) {
      const { treeStore: { nodesMap } } = this;
      nodesMap[node[DefaultValue]] = node;
    },
    clearNodesMap() {
      const { treeStore } = this;
      treeStore.pos = 0;
      treeStore.nodesMap = {};
    },
    addNodes(nodes = [], parent) {
      const { treeStore: { nodesMap }, createNodes, updateParentCheckedAndHalfChecked } = this;
      let nNodes = nodes;
      if (!isArray(nNodes)) {
        nNodes = [nNodes];
      }
      const np = parent ? nodesMap[parent[DefaultValue]] : parent;
      let ret;
      if (np) {
        ret = createNodes(nNodes, np, np.level + 1);
        np.isParent = ret.length > 0;
        np[DefaultChildren] = ret;
        updateParentCheckedAndHalfChecked(np);
      } else {
        ret = createNodes(nNodes, null, 0);
      }
      return ret;
    },
    getAllCheckedNodes() {
      const { treeStore: { nodesMap } } = this;

      return Object.keys(nodesMap).reduce((r, k) => {
        const nr = r;
        const item = nodesMap[k];
        if (item.isChecked) {
          nr.push(item);
        }
        return nr;
      }, []);
    },
    getOriginNodes(keys = []) {
      const { treeStore: { nodesMap } } = this;
      return getOriginNodes(nodesMap, keys);
    },
    resetNodesChecked(keys = []) {
      const { treeStore: { nodesMap } } = this;
      const keyObj = keys.reduce((r, k) => {
        const nr = r;
        nr[k] = 1;
        return nr;
      }, {});
      Object.keys(nodesMap).forEach((k) => {
        const node = nodesMap[k];
        if (k in keyObj) {
          node.isChecked = true;
        } else {
          node.isChecked = false;
        }
      });
    },
  },
};
