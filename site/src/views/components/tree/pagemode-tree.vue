<template>
  <ux-demo :height="200"
           title="使用窗口滚动条">
    <div slot="demo">
      <ux-virtual-tree
        ref="virtualTree"
        :lazy="lazy"
        :load-data="loadData"
        pagemode
        checkable
        @expand="onExpand"
        @select="onSelect"
        @check="onCheck"
        @node-click="onNodeClick"/>
    </div>
    <div slot="desc">
      异步加载展示大数据树, 树的滚动通过窗口的滚动条控制
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/tree/pagemode-tree.vue';

  export default {
    data() {
      return {
        code,
        dataSource: [],
        expandParent: true,
        treeKeyMap: {},
        lazy: true
      };
    },
    created() {
      this.createBigData();
    },
    methods: {
      onExpand(...args) {
        console.log('onExpand', ...args);
      },
      onCheck(checkedKeys, ...args) {
        console.log('onCheck', checkedKeys, ...args);
      },
      onSelect(...args) {
        console.log('onSelect', ...args);
      },
      onNodeClick(...args) {
        console.log('onClick', ...args);
      },
      createChildrens(node, length = 50) {
        if (!node) {
          return [];
        }
        const children = [];
        for (let i = 0; i < length; i += 1) {
          const childItem = this.createNode(node.key, children.length, node.level + 1);
          children.push(childItem);
        }
        return children;
      },
      createBigData(parentKey) {
        const levelNums = [50];
        const { createNode, treeKeyMap, createBigData } = this;
        let { dataSource } = this;
        let parentNode = {};
        if (parentKey) {
          dataSource = treeKeyMap[parentKey].children;
          parentNode = treeKeyMap[parentKey];
        } else {
          parentNode = {
            key: '0',
            level: 0
          };
        }
        const currentLevel = parentNode.level + 1;
        if (currentLevel > levelNums.length) {
          return;
        }

        for (let i = 0; i < levelNums[currentLevel - 1]; i += 1) {
          const node = createNode(parentNode.key, dataSource.length, currentLevel);
          dataSource.push(node);
          treeKeyMap[node.key] = node;
          createBigData(node.key);
        }
      },
      createNode(parentKey, key, level) {
        return {
          title: `${parentKey}-${key}`,
          key: `${parentKey}-${key}`,
          disabled: `${parentKey}-${key}` === '0-0-2' || `${parentKey}-${key}` === '0-0-4',
          children: [],
          level
        };
      },
      loadData(node) {
        return new Promise((resolve) => {
          if (!node) {
            resolve(this.dataSource);
          } else if (node.level === 4) {
            resolve([]);
          } else {
            setTimeout(() => {
              resolve(this.createChildrens(node, node.level === 3 ? 8000 : 30));
            }, 500);
          }
        });
      },
    },
  };
</script>
