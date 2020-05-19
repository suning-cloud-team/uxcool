<template>

  <div class="demo">
    <h4>big data virtual tree</h4>
    <!--<div>
      <ux-button type="primary"
                 @click="onClickCtrl"> {{ showTree ? '隐藏' : '显示' }} </ux-button>
      <ux-button type="primary"
                 style="margin-left: 20px"
                 @click="onClickCtrlExpand"> {{ expandAll ? '全部展开' : '全部收起' }} </ux-button>
    </div>-->
    <div v-if="showTree">
      <ux-tree ref="virtualTree"
               :default-expand-all="expandAll"
               :default-expand-parent="expandParent"
               :lazy="lazy"
               :load-data="loadData"
               checkable
               draggable
               @expand="onExpand"
               @select="onSelect"
               @check="onCheck"
               @node-click="onNodeClick"/>
    </div>
  </div>
</template>


<script>
  import { Tree, Button } from '@cloud-sn/uxcool';

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
      };
    },
    created() {
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
        if (this.showTree) {
          this.$nextTick(() => {
            this.scrollelement = this.$refs.virtualTree.$el;
            console.log(this.scrollelement);
          });
        } else {
          this.scrollelement = null;
        }
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
