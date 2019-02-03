<template>
  <div class="demo">
    <ux-transfer :data-source="dataSource"
                 :operations="operations"
                 show-search
                 sort="rtl"
                 @select-change="onSelectChange"
                 @search-change="onSearchChange"
                 @change="onChange"
                 @search-clear="onSearchClear"
                 @scroll="onScroll" />
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
        dataSource: mockData(5000),
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
