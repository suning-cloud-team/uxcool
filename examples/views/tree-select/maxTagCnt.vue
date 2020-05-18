<template>
  <div class="demo">
    <h4>max tag count</h4>
    <ux-tree-select v-model="value"
                    :tree-data="data"
                    :clear-disabled="false"
                    :max-tag-placeholder="maxTagPlaceholder"
                    max-tag-count="0"
                    multiple
                    tree-checkable
                    style="width:300px" />
  </div>
</template>


<script>
  import { TreeSelect } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxTreeSelect: TreeSelect,
    },
    data() {
      return {
        value: ['0-0-0', '0-0-1-1'],
        data: [],
      };
    },
    created() {
      setTimeout(() => {
        this.data = [
          {
            title: '0-0',
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                  { title: 'C0-0-0-0', key: '0-0-0-0', disableCheckbox: true },
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
        ];
      }, 1500);
    },
    methods: {
      maxTagPlaceholder(nodes) {
        return <span style="color:green">选择了{nodes.length}节点</span>;
      },
    },
  };
</script>
