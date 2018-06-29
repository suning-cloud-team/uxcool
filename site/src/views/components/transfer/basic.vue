<template>
  <ux-demo :height="200"
           title="基本用法">
    <div slot="demo">
      <ux-transfer :data-source="dataSource"
                   :operations="operations"
                   show-search
                   @select-change="onSelectChange"
                   @search-change="onSearchChange"
                   @change="onChange"
                   @search-clear="onSearchClear"
                   @scroll="onScroll" />
    </div>
    <div slot="desc">
      基本用法
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/transfer/basic.vue';

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
        operations: ['to Left', 'to Right'],
      };
    },
    methods: {
      onSelectChange(...args) {
        console.log('onSelect--change', ...args);
      },
      onChange(...args) {
        console.log('change', ...args);
      },
      onScroll(...args) {
        console.log('scroll', ...args);
      },
      onSearchChange(...args) {
        console.log('onSearchChange', ...args);
      },
      onSearchClear(...args) {
        console.log('onSearchClear', ...args);
      },
    },
  };
</script>

