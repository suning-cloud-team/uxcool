<template>

  <div class="demo">
    <h4>async</h4>
    <ux-search-input placeholder="Search"
                     @input="onSearchInput" />
    <ux-tree ref="tree1"
             :selected-keys="['0-0']"
             :checked-keys="checkedKeys"
             :expand-all="expandAll"
             :selectable="selectable"
             :load-data="loadData"
             :check-strict="checkStrict"
             show-icon
             lazy
             checkable
             @select="onSelect"
             @check="onCheck"
             @expand="onExpand"
             @checked-keys-change="onCheckedKeysChange" />

  </div>
</template>


<script>
  import { Tree, Input } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxSearchInput: Input.Search,
      UxTree: Tree,
      UxTreeNode: Tree.Node,
    },
    data() {
      return {
        // checkedKeys: ['0-0-0-2', '0-0-1', '0-0-2', '0-1-2', '0-0-1-0'],
        checkedKeys: [],
        expandedKeys: ['0-0', '0-0-1'],
        selectable: true,
        expandAll: true,
        checkStrict: false,
      };
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
          } else if (node.level === 3) {
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
      onCheckedKeysChange(...args) {
        console.log('onCheckedKeysChange', ...args);
      },
    },
  };
</script>
