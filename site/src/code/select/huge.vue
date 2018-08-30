<template>
  <ux-select v-model="values2"
             :data-source="list"
             mode="multiple"
             style="width:200px"
             allow-clear
             @change="onChange"
             @select="onSelect"
             @deselect="onDeselect" />
</template>

<script>
  function mockData(cnt) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        value: i,
        label: `a-${i}`,
      }));
  }
  export default {
    data() {
      return {
        values2: ['C', '2', '1'],
        list: mockData(5000),
      };
    },
    methods: {
      onDeselect(...args) {
        console.log('onDeselect', ...args);
      },
      onSelect(...args) {
        console.log('onSelect', ...args);
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
