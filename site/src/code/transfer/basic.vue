<template>
  <div>
    <ux-transfer :data-source="dataSource"
                 :operations="operations"
                 :disabled="disabled"
                 show-search
                 @select-change="onSelectChange"
                 @search-change="onSearchChange"
                 @change="onChange"
                 @search-clear="onSearchClear"
                 @scroll="onScroll" />
    <ux-switch :checked="disabled"
               checked-children="disabled"
               unchecked-children="disabled"
               style="margin-top: 10px;"
               @change="toggleDisabled" />
  </div>
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
        operations: ['to Left', 'to Right'],
        disabled: false,
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
      toggleDisabled(checked) {
        this.disabled = checked;
      },
    },
  };
</script>

