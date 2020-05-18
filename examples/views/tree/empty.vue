<template>

  <div class="demo">
    <ux-tree ref="tree1"
             :selected-keys="['0-0-0', '0-0-2']"
             :checked-keys="checkedKeys"
             :data-source="dataSource"
             :selectable="selectable"
             :default-expand-parent="expandParent"
             checkable />

  </div>
</template>


<script>
  import { Tree } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxTree: Tree,
      UxTreeNode: Tree.Node,
    },
    data() {
      return {
        checkedKeys: ['0-0-1', '0-0-1-1', '0-0-1-2'],
        expandedKeys: ['0-0', '0-0-1'],
        selectable: false,
        dataSource: [],
        expandParent: true,
      };
    },
    mounted() {
      this.dataSource = [
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
        { title: '0-2', key: '0-2' },
      ];
    },
  };
</script>
