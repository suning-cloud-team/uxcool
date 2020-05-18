<template>

  <div class="demo">
    <ux-search-input placeholder="Search"
                     @input="onSearchInput" />
    <ux-tree ref="tree1"
             :selected-keys="['0-0-0', '0-0-2']"
             :checked-keys="checkedKeys"
             :data-source="dataSource"
             :selectable="selectable"
             checkable
             @select="onSelect"
             @check="onCheck"
             @expand="onExpand" />

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
        checkedKeys: ['0-0'],
        expandedKeys: ['0-0', '0-0-1'],
        selectable: false,
        dataSource: [
          {
            title: '0-0',
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                key: '0-0-0',
                disabled: false,
                children: [
                  { title: '0-0-0-0', key: '0-0-0-0' },
                  { title: '0-0-0-1', key: '0-0-0-1' },
                  { title: '0-0-0-2', key: '0-0-0-2' },
                ],
              },
              {
                title: '0-0-1',
                key: '0-0-1',
                disabled: true,
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
        // this.checkedKeys = ['0-0-1-2', '0-1-0'];
        // // this.selectable = false;
        // this.checkStrict = true;
        // this.expandParent = false;
        // setTimeout(() => {
        //   this.checkStrict = false;
        // }, 3000);
      }, 5000);
    },
    methods: {
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
