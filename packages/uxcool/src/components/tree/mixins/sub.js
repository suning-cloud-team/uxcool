export default {
  inject: {
    treeRoot: {
      default: false,
    },
  },
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
    isTreeShowLine() {
      return !!this.treeRoot.showLine;
    },
    allTreeNodes() {
      return this.treeRoot.nodes;
    },
    treeRenderContentFn() {
      return this.treeRoot.renderContentFn;
    },
    draggable() {
      const { isChildren, treeRoot } = this;
      return isChildren ? treeRoot.draggable : false;
    },
    rootDragState() {
      const { isChildren, treeRoot } = this;
      return isChildren ? treeRoot.dragState : {};
    },
    allowDrop() {
      const { isChildren, treeRoot } = this;
      return isChildren ? treeRoot.allowDrop : {};
    },
    allowDrag() {
      const { isChildren, treeRoot } = this;
      return isChildren ? treeRoot.allowDrag : {};
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
    onNodeDragStart(...args) {
      const { isChildren, treeRoot } = this;
      return isChildren ? treeRoot.onNodeDragStart(...args) : false;
    },
    onNodeDragOver(...args) {
      const { isChildren, treeRoot } = this;
      return isChildren ? treeRoot.onNodeDragOver(...args) : false;
    },
    onNodeDragEnter(...args) {
      const { isChildren, treeRoot } = this;
      return isChildren ? treeRoot.onNodeDragEnter(...args) : false;
    },
    onNodeDragEnd(...args) {
      const { isChildren, treeRoot } = this;
      return isChildren ? treeRoot.onNodeDragEnd(...args) : false;
    },
    onNodeDragLeave(...args) {
      const { isChildren, treeRoot } = this;
      return isChildren ? treeRoot.onNodeDragLeave(...args) : false;
    },
    onNodeDrop(...args) {
      const { isChildren, treeRoot } = this;
      return isChildren ? treeRoot.onNodeDrop(...args) : false;
    },
  },
};
