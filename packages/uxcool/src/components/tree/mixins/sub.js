export default {
  inject: ['treeRoot'],
  computed: {
    isChildren() {
      return !!this.treeRoot;
    },
    isTreeDisabled() {
      return !!this.treeRoot.disabled;
    },
    isTreeSelectable() {
      return !!this.treeRoot.selectable;
    },
    isTreeCheckable() {
      return !!this.treeRoot.checkable;
    },
    isTreeLazy() {
      return !!this.treeRoot.lazy;
    },
    treeRenderContentFn() {
      return this.treeRoot.renderContentFn;
    },
  },
  methods: {
    onNodeSelect(...args) {
      this.treeRoot.onNodeSelect(...args);
    },
    onNodeCheck(...args) {
      this.treeRoot.onNodeCheck(...args);
    },
    onNodeExpand(...args) {
      this.treeRoot.onNodeExpand(...args);
    },
    onNodeClick(...args) {
      this.treeRoot.onNodeClick(...args);
    },
  },
};
