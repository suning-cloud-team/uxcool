<template>
  <div class="demo">
    <h4>multiple</h4>
    value: {{ value }}
    <br>
    <ux-tree-select v-model="value"
                    :tree-data="data"
                    :clear-disabled="false"
                    multiple
                    tree-checkable
                    style="width:300px"
                    show-checked-strategy="SHOW_ALL"
                    @input="onInput"
                    @change="onChange" />
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
        dropdownMatch: true,
        value: ['123', '0-0-1-0', '0-0-0-0', '0-111'],
        data: [
          {
            title: '0-0',
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                  {
                    title: 'C0-0-0-0',
                    key: '0-0-0-0',
                    disableCheckbox: true,
                  },
                  { title: '0-0-0-1', key: '0-0-0-1', cc: 1 },
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
      };
    },
    created() {
      setTimeout(() => {
        this.dropdownMatch = false;
        this.value = ['0-1', '0-0-0-2'];
      }, 1500);
    },
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
      onInput(...args) {
        console.log('onInput', ...args);
      },
    },
  };
</script>
