<template>

  <div class="demo">
    <h4> big data virtual tree auto measure item's height </h4>
    <!--<div>
      <ux-button type="primary"
                 @click="onClickCtrl"> {{ showTree ? '隐藏' : '显示' }} </ux-button>
      <ux-button type="primary"
                 style="margin-left: 20px"
                 @click="onClickCtrlExpand"> {{ expandAll ? '全部展开' : '全部收起' }} </ux-button>
      <ux-button type="primary"
                 style="margin-left: 20px"
                 @click="onClickCtrlChange"> 改变大小 </ux-button>
    </div>-->
    <div v-if="showTree">
      <ux-tree ref="virtualTree"
               :data-source="dataSource"
               :default-expand-all="expandAll"
               :default-expand-parent="expandParent"
               :lazy="lazy"
               :load-data="loadDataFn"
               :remain="20"
               :show-line="true"
               checkable
               draggable
               auto-height
               @expand="onExpand"
               @select="onSelect"
               @check="onCheck"
               @node-click="onNodeClick"/>
    </div>
  </div>
</template>


<script>
  import { Tree, Button } from '@suning/uxcool';

  export default {
    components: {
      UxTree: Tree.VirtualTree,
      UxTreeNode: Tree.Node,
      UxButton: Button,
    },
    data() {
      return {
        dataSource: [],
        expandParent: true,
        treeKeyMap: {},
        showTree: true,
        expandAll: false,
        lazy: true,
        loadDataFn: null,
        scrollelement: null,
        setVariableNode: true,
      };
    },
    created() {
      this.loadDataFn = this.loadData.bind(this);
      this.addChildrenNodes();
      this.dataSource = [...this.dataSource];
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
      onClickCtrl() {
        this.showTree = !this.showTree;
      },
      onClickCtrlExpand() {
        this.expandAll = !this.expandAll;
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
        if (seed > 5) {
          if (seed % 2 === 0) {
            title = `${parentKey}-${key} -${longTitle}`;
          } else {
            title = `${parentKey}-${key} -${longTitle}-${longTitle}`;
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
      onClickCtrlChange() {
        this.dataSource[1].title += this.dataSource[1].title;
        this.dataSource = [...this.dataSource];
      }
    },
  };
</script>

<style lang="scss">
  .ux-tree .ux-auto-sizer>li .ux-tree-node-content-wrapper {
    height: auto;
    min-height: 24px;
    line-height: 24px;
    .ux-tree-title {
      word-break:normal;
      width:auto;
      display:block;
      white-space:pre-wrap;
      word-wrap : break-word ;
      overflow: hidden ;
    }
  }
</style>
