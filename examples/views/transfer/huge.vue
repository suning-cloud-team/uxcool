<template>
  <div class="demo">
    <h4>huge list</h4>
    <p>`lazy`模式支持大数据量渲染</p>
    <ux-transfer :data-source="dataSource"
                 :list-style="listStyle"
                 :lazy="lazy"
                 show-search />
  </div>
</template>

<script>
  import { Transfer } from '@suning/uxcool';

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
        dataSource: mockData(2000),
        listStyle: { width: '300px' },
        lazy: {
          remain: 10,
        },
      };
    },
  };
</script>
