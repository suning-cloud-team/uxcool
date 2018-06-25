<template>
  <ux-demo :height="200"
           title="事件">
    <div slot="demo">
      <ux-transfer :data-source="dataSource"
                   @select-change="onSelectChange"
                   @search-change="onSearchChange"
                   @change="onChange"
                   @search-clear="onSearchClear"
                   @scroll="onScroll" />
    </div>
    <div slot="desc">
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/transfer/event.vue';

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
    methods: {
      onSelectChange(...args) {
        console.log('select--change', ...args);
      },
      onChange(...args) {
        console.log('change', ...args);
      },
      onScroll(...args) {
        console.log('scroll', ...args);
      },
      onSearchChange(...args) {
        console.log('search-change', ...args);
      },
      onSearchClear(...args) {
        console.log('search-clear', ...args);
      },
    },
  };
</script>
