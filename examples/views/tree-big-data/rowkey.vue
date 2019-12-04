<template>

  <div class="demo">
    <h4>row-key</h4>
    <ux-tree ref="tree1"
             :data-source="dataSource"
             row-key="id"
             @check="onCheck"
             @select="onSelect" />

  </div>
</template>


<script>
  import { Tree } from '@suning/uxcool';

  export default {
    components: {
      UxTree: Tree.VirtualTree,
      UxTreeNode: Tree.Node,
    },
    data() {
      return {
        checkedKeys: ['0-0-1', '0-0-1-1', '0-0-1-2'],
        expandedKeys: ['0-0', '0-0-1'],
        selectable: false,
        dataSource: [
          {
            title: '0-0',
            id: '0-0',
            children: [
              {
                title: '0-0-0',
                id: '0-0-0',
                children: [
                  { title: '0-0-0-0', id: '0-0-0-0', disableCheckbox: true },
                  { title: '0-0-0-1', id: '0-0-0-1' },
                  { title: '0-0-0-2', id: '0-0-0-2' },
                ],
              },
              {
                title: '0-0-1',
                id: '0-0-1',
                disabled: true,
                children: [
                  { title: '0-0-1-0', id: '0-0-1-0', disabled: true },
                  { title: '0-0-1-1', id: '0-0-1-1' },
                  { title: '0-0-1-2', id: '0-0-1-2' },
                ],
              },
              { title: '0-0-2', id: '0-0-2' },
            ],
          },
        ],
        expandParent: true,
      };
    },
    created() {
      setTimeout(() => {
        // console.log('update multiple');
        // this.multiple = false;
        // this.checkedKeys = ['0-0-1-2', '0-1-0'];
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
        this.checkedKeys = checkedKeys;
      },
      onSelect(...args) {
        console.log('onSelect', ...args);
      },
    },
  };
</script>
