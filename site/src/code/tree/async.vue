<template>
  <ux-tree :checked-keys="checkedKeys"
           :load-data="loadData"
           lazy
           checkable
           @select="onSelect"
           @check="onCheck"
           @expand="onExpand" />
</template>

<script>
  export default {
    data() {
      return {
        checkedKeys: [],
        expandedKeys: ['0-0', '0-0-1'],
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
            }, 100);
          }
        });
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
