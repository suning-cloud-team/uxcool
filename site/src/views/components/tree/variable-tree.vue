<template>
  <ux-demo :height="200"
           title="节点高度可变虚拟树">
    <div slot="demo">
      <ux-virtual-tree
        ref="virtualTree"
        :lazy="lazy"
        :load-data="loadData"
        :remain="20"
        checkable
        auto-height
        @expand="onExpand"
        @select="onSelect"
        @check="onCheck"
        @node-click="onNodeClick"/>
    </div>
    <div slot="desc">
      树每个结点高度可能不一样，高度是可变的，这种情况下，建议使用auto-height属性，如果是自定义渲染内容可能出现这种情况。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/tree/variable-tree.vue';

  export default {
    data() {
      return {
        code,
        dataSource: [],
        treeKeyMap: {},
        lazy: true,
      };
    },
    created() {
      this.addChildrenNodes();
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
      addChildrens(node, length = 300) {
        if (!node) {
          return;
        }
        for (let i = 0; i < length; i += 1) {
          const childItem = this.createNode(node.key, node.children.length, node.level + 1);
          node.children.push(childItem);
        }
      },
      createChildrens(node, length = 100) {
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
      addChildrenNodes(parentKey) {
        const levelNums = [100];
        const { createNode, treeKeyMap, addChildrenNodes } = this;
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
          addChildrenNodes(node.key);
        }
      },
      createNode(parentKey, key, level) {
        let title = '';
        const longTitle = 'Zinedine Yazid Zidane O.L.H., A.O.M.N. (French pronunciation: [zinedin zidan], born 23 June 1972), nicknamed "Zizou", is a French retired professional footballer and current manager of Real Madrid. He played as an attacking midfielder for the France national team, Cannes, Bordeaux, Juventus and Real Madrid.[3][4] An elite playmaker, renowned for his elegance, vision, ball control and technique, Zidane was named the best European footballer of the past 50 years in the UEFA Golden Jubilee Poll in 2004.[5] He is widely regarded as one of the greatest players of all time';
        const seed = Math.round(Math.random() * 10);
        if (seed > 2) {
          switch (seed % 3) {
            case 0:
              title = `${parentKey}-${key} -${longTitle}`;
              break;
            case 1:
              title = `${parentKey}-${key} -${longTitle}-${longTitle}`;
              break;
            case 2:
              title = `${parentKey}-${key}`;
              break;
            default:
              break;
          }
        }
        return {
          title: title || `${parentKey}-${key}`,
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

<style lang="scss">
  .ux-tree .ux-auto-sizer>li .ux-tree-node-content-wrapper {
    height: auto;
    min-height: 24px;
    line-height: 24px;
    width: calc(100% - 46px);
    .ux-tree-title {
      word-break:normal;
      width: auto;
      display:block;
      white-space:pre-wrap;
      word-wrap : break-word ;
      overflow: hidden ;
    }
  }
</style>
