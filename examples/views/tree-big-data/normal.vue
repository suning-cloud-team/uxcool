<template>

  <div class="demo">
    <ux-tree ref="tree1"
             :selected-keys="selectedKeys"
             :checked-keys="checkedKeys"
             :data-source="dataSource"
             :selectable="selectable"
             :default-expand-parent="expandParent"
             :show-line="true"
             :view-count="20"
             checkable
             multiple
             @check="onCheck"
             @node-click="onNodeClick" />

  </div>
</template>


<script>
  import { Tree } from '@suning/uxcool';
  import DataMixin from './tree-data';

  export default {
    components: {
      UxTree: Tree.VirtualTree,
      UxTreeNode: Tree.Node,
    },
    mixins: [DataMixin],
    data() {
      return {
        checkedKeys: ['0-0-0', '0-0-1', '0-0-2'],
        expandedKeys: ['0-0', '0-0-1'],
        selectedKeys: ['0-0-2'],
        selectable: true,
        dataSource: [],
        expandParent: true,
      };
    },
    created() {
      this.nodeAttr.disabled = ['0-0-5', '0-10']; // 用于设置哪些节点disabled
      this.dataSource = this.createBigDataSource();
      setTimeout(() => {
        // this.checkedKeys = ['0-0-1-2', '0-1-0'];
        // this.expandParent = false;
      }, 5000);
    },
    methods: {
      onExpand(...args) {
        console.log('onExpand', ...args);
      },
      onCheck(...args) {
        console.log('onCheck', ...args);
      },
      onSelect(...args) {
        console.log('onSelect', ...args);
      },
      onNodeClick(...args) {
        console.log('onClick', ...args);
      },
    },
  };
</script>
