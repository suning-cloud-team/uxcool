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
             :view-count="20"
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
            const dataSource = this.createBigDataSource(500, 0, 0);
            resolve(dataSource);
          } else if (node.level === 3) {
            resolve([]);
          } else {
            setTimeout(() => {
              const { key } = node;
              resolve(Array(3)
                .fill(0)
                .map((_, i) => ({
                  title: `${key}-${i}`,
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
