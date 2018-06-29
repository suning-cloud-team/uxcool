<template>
  <div>
    <ux-transfer :data-source="dataSource"
                 :list-style="listStyle"
                 :lazy="lazy"
                 show-search />
  </div>
</template>

<script>
  import code from '@/code/transfer/huge.vue';

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
        dataSource: mockData(2000),
        listStyle: { width: '300px' },
        lazy: {
          remain: 10,
        },
      };
    },
  };
</script>
