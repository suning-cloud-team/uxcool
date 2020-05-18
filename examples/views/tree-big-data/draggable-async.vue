<template>

  <div class="demo">
    <h4>draggable async</h4>
    <ux-tree ref="tree1"
             :allow-drag="allowDrag"
             :load-data="loadData"
             lazy
             draggable
             @check="onCheck"
             @node-click="onNodeClick"
             @drop="onNodeDrop"
             @expand="onExpand" />

  </div>
</template>


<script>
  import { Tree } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxTree: Tree.VirtualTree,
      UxTreeNode: Tree.Node,
    },
    data() {
      return {
        checkedKeys: ['0-0-0', '0-0-1', '0-0-2'],
        expandedKeys: ['0-0', '0-0-1'],
        selectedKeys: ['0-0-2'],
        selectable: false,
        dataSource: [
          {
            title: '0-0',
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                  { title: '0-0-0-0', key: '0-0-0-0', disableCheckbox: true },
                  { title: '0-0-0-1', key: '0-0-0-1' },
                  { title: '0-0-0-2', key: '0-0-0-2' },
                ],
              },
              {
                title: '0-0-1',
                key: '0-0-1',
                // disabled: true,
                children: [
                  { title: '0-0-1-0', key: '0-0-1-0', disabled: true },
                  { title: '0-0-1-1', key: '0-0-1-1' },
                  { title: '0-0-1-2', key: '0-0-1-2' },
                ],
              },
              { title: '0-0-2', key: '0-0-2' },
            ],
          },
          {
            title: '0-1',
            key: '0-1',
            children: [
              {
                title: '0-1-0',
                key: '0-1-0',
                children: [
                  { title: '0-1-0-0', key: '0-1-0-0', selectable: true },
                  { title: '0-1-0-1', key: '0-1-0-1', disabled: true },
                  { title: '0-1-0-2', key: '0-1-0-2' },
                ],
              },
              {
                title: '0-1-1',
                key: '0-1-1',
                children: [
                  { title: '0-1-1-0', key: '0-1-1-0' },
                  { title: '0-1-1-1', key: '0-1-1-1' },
                  { title: '0-1-1-2', key: '0-1-1-2' },
                ],
              },
              { title: '0-1-2', key: '0-1-2' },
            ],
          },
          { title: '0-2', key: '0-2' },
        ],
        expandParent: true,
      };
    },
    created() {
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
      loadData(node) {
        return new Promise((resolve) => {
          if (!node) {
            resolve([
              {
                title: '0-0',
                key: '0-0',
                children: [
                  {
                    title: '0-0-0',
                    key: '0-0-0',
                    children: [
                      { title: '0-0-0-0', key: '0-0-0-0', disableCheckbox: true },
                      { title: '0-0-0-1', key: '0-0-0-1' },
                      { title: '0-0-0-2', key: '0-0-0-2' },
                    ],
                  },
                ],
              },
              {
                title: '0-1',
                key: '0-1',
              },
              { title: '0-2', key: '0-2' },
            ]);
          } else if (node.level >= 3) {
            resolve([]);
          } else {
            setTimeout(() => {
              const { key } = node;
              resolve(Array(3)
                .fill(0)
                .map((_, i) => ({
                  title: `child-${key}-${i}`,
                  key: `${key}-${i}`,
                  disabled: i === 2,
                  isLeaf: node.key === '0-0-0-0' && node.level === 2,
              })));
            }, 1000);
          }
        });
      },
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
      onNodeClick(...args) {
        console.log('onClick', ...args);
        this.selectedKeys = [...this.selectedKeys, args[1].key];
      },
      onNodeDrop(...args) {
        console.log('getTreeOriginNodes', this.$refs.tree1.getTreeOriginNodes());
      },
      allowDrag(node) {
        console.log(node);
      },
    },
  };
</script>
