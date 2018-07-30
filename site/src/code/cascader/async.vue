<template>
  <ux-cascader v-model="value"
               :data-source="data"
               :load-data="loadData"
               style="width:200px" />
</template>

<script>
  function mock(node, cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        label: `label-${node.value}-${i}`,
        value: `value-${node.value}-${i}`,
      }));
  }
  export default {
    data() {
      return {
        value: ['value-0-1', 'value-value-0-1-2', 'value-value-value-0-1-2-1'],
        data: mock({ value: 0 }, 4),
      };
    },
    methods: {
      loadData(node) {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (node) {
              resolve(mock(node, 3));
            } else {
              resolve(mock({ value: 0 }, 4));
              // throw new Error('abc');
            }
          }, 1500);
        });
      },
    },
  };
</script>
