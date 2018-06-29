<template>
  <ux-demo :height="200"
           title="targetKeys">
    <div slot="demo">
      <ux-transfer :data-source="dataSource"
                   :target-keys="targetKeys" />
    </div>
    <div slot="desc">
      target框默认选中
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/transfer/target.vue';

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
        code,
        dataSource: mockData(),
        targetKeys: [0, 2, 5],
      };
    },
  };
</script>
