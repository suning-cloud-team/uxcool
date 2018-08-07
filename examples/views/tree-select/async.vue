<template>

  <div class="demo">
    <h4>async</h4>
    <ux-tree-select :value="value"
                    :load-data="loadData"
                    lazy
                    multiple
                    style="width:300px" />
  </div>
</template>


<script>
  import { TreeSelect } from '@suning/uxcool';

  export default {
    components: {
      UxTreeSelect: TreeSelect,
    },
    data() {
      return {
        value: ['0-0-0-2', '0-1-1-1', '0-1-1-0', '0-0-2', '0-1-2', '0-1-1-0'],
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
              const data = Array(3)
                .fill(0)
                .map((_, i) => ({
                  title: `child-${key}-${i}`,
                  key: `${key}-${i}`,
                  disabled: i === 2,
                  isLeaf: node.key === '0-0-0-0' && node.level === 2,
              }));
              resolve(data);
            }, 113500);
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
    },
  };
</script>
