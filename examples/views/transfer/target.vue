<template>
  <div class="demo">
    <h4>target</h4>
    <ux-transfer :data-source="dataSource"
                 :target-keys="targetKeys" />
  </div>
</template>

<script>
  import { Transfer } from '@cloud-sn/uxcool';

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
    components: {
      UxTransfer: Transfer,
    },
    data() {
      return {
        dataSource: mockData(),
        targetKeys: [0, 2, 5],
      };
    },
  };
</script>
