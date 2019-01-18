<template>

  <div class="demo">
    <h4>directory</h4>
    <ux-tree ref="tree1"
             :selected-keys="['0-0-0', '0-0-2']"
             :checked-keys="checkedKeys"
             :data-source="dataSource"
             :default-expand-parent="expandParent"
             checkable
             directory
             @check="onCheck" />

  </div>
</template>


<script>
  import { Tree } from '@suning/uxcool';

  export default {
    components: {
      UxTree: Tree,
      UxTreeNode: Tree.Node,
    },
    data() {
      return {
        checkedKeys: ['0-0-0-0-0'],
        expandedKeys: ['0-0', '0-0-1'],
        dataSource: [
          {
            title: '0-0',
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                  {
                    title: '0-0-0-0',
                    key: '0-0-0-0',
                    disableCheckbox: true,
                    children: [
                      { title: '0-0-0-0-0', key: '0-0-0-0-0', disableCheckbox: true },
                      { title: '0-0-0-0-1', key: '0-0-0-0-1', disableCheckbox: true },
                      { title: '0-0-0-0-2', key: '0-0-0-0-2', disableCheckbox: true },
                    ],
                  },
                  { title: '0-0-0-1', key: '0-0-0-1', disableCheckbox: true },
                  { title: '0-0-0-2', key: '0-0-0-2', disableCheckbox: true },
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
    methods: {
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
    },
  };
</script>
