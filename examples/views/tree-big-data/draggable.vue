<template>

  <div class="demo">
    <h4>draggable</h4>
    <ux-tree ref="tree1"
             :data-source="dataSource"
             :allow-drag="allowDrag"
             :allow-drop="allowDrop"
             :show-line="true"
             draggable
             @check="onCheck"
             @node-click="onNodeClick"
             @drop="onNodeDrop"
             @expand="onExpand" />

  </div>
</template>


<script>
  import { Tree } from '@cloud-sn/uxcool';
  import DataMixin from './tree-data';

  export default {
    components: {
      UxTree: Tree.VirtualTree,
    },
    mixins: [DataMixin],
    data() {
      return {
        checkedKeys: ['0-0-0', '0-0-1', '0-0-2'],
        expandedKeys: ['0-0', '0-0-1'],
        selectedKeys: ['0-0-2'],
        selectable: false,
        dataSource: [],
        expandParent: true,
      };
    },
    created() {
      this.dataSource = this.createBigDataSource(100,5, 5);
      setTimeout(() => {
        // console.log('update multiple');
        // this.multiple = false;
        this.checkedKeys = ['0-0-1-2', '0-1-0'];
        // // this.selectable = false;
        // this.checkStrict = true;
        this.expandParent = false;
        // setTimeout(() => {
        //   this.checkStrict = false;
        // }, 3000);
      }, 5000);
    },
    methods: {
      onExpand(...args) {
        console.log('onExpand', ...args);
      },
      onCheck(checkedKeys, ...args) {
        console.log('onCheck', checkedKeys, ...args);
        // this.checkedKeys = checkedKeys;
      },
      onSelect(...args) {
        console.log('onSelect', ...args);
      },
      onNodeClick(...args) {
        console.log('onClick', ...args);
        // this.selectedKeys = [...this.selectedKeys, args[1].key];
      },
      onNodeDrop(...args) {
        console.log('getTreeOriginNodes', this.$refs.tree1.getTreeOriginNodes());
      },
      allowDrop(node, { level }) {
        if (node.key === '0-0-0' || level > 1) {
          return false;
        }
        return true;
      },
      allowDrag(node) {
        if (node.key === '0-1-0-0') {
          return false;
        }
        return true;
      },
    },
  };
</script>
