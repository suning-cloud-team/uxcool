<template>

  <div class="demo">
    <ux-search-input placeholder="Search"
                     @input="onSearchInput" />
    <ux-tree ref="tree1"
             :selected-keys="['0-0-0', '0-0-2']"
             :checked-keys="checkedKeys"
             :data-source="dataSource"
             :selectable="selectable"
             checkable
             @select="onSelect"
             @check="onCheck"
             @expand="onExpand" />

  </div>
</template>


<script>
  import { Tree, Input } from '@suning/uxcool';
  import DataMixin from './tree-data';

  export default {
    components: {
      UxSearchInput: Input.Search,
      UxTree: Tree.VirtualTree,
      UxTreeNode: Tree.Node,
    },
    mixins: [DataMixin],
    data() {
      return {
        checkedKeys: ['0-0'],
        expandedKeys: ['0-0', '0-0-1'],
        selectable: false,
        dataSource: [],
        expandParent: true,
      };
    },
    created() {
      this.dataSource = this.createBigDataSource(200, 10, 10);
    },
    methods: {
      onSearchInput(val) {
        this.$refs.tree1.filter(val);
      },
      onExpand(...args) {
        console.log('onExpand', ...args);
      },
      onCheck(...args) {
        console.log('onCheck', ...args);
      },
      onSelect(...args) {
        console.log('onSelect', ...args);
      },
    },
  };
</script>
