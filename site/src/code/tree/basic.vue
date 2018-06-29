<template>
  <ux-tree ref="tree1"
           :checked-keys="checkedKeys"
           :data-source="dataSource"
           checkable
           @select="onSelect"
           @check="onCheck"
           @expand="onExpand" />
</template>

<script>
  export default {
    data() {
      return {
        checkedKeys: ['0-0'],
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
    methods: {
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
