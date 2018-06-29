<template>
  <ux-transfer :data-source="dataSource"
               :target-keys="targetKeys" />
</template>

<script>
  function mockData(cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((v, i) => ({
        key: i,
        title: `title-${i}`,
        label: `label-${i}`,
        // disabled: i % 3 === 0,
      }));
  }
  export default {
    data() {
      return {
        dataSource: mockData(),
        targetKeys: [0, 2, 5],
      };
    },
  };
</script>
