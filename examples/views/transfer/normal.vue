<template>
  <div class="demo">
    <ux-transfer :data-source="dataSource"
                 :operations="operations"
                 :disabled="disabled"
                 show-search
                 sort="rtl"
                 @select-change="onSelectChange"
                 @search-change="onSearchChange"
                 @change="onChange"
                 @search-clear="onSearchClear"
                 @scroll="onScroll" />

    <ux-switch :checked="disabled"
               unchecked-children="disabled"
               checked-children="disabled"
               style="margin-top: 10px;"
               @change="toggleDisabled" />
  </div>
</template>

<script>
  import { Transfer, Switch } from '@cloud-sn/uxcool';

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
      UxSwitch: Switch,
    },
    data() {
      return {
        dataSource: mockData(5000),
        operations: ['to Left', 'to Right'],
        disabled: false,
      };
    },
    methods: {
      onSelectChange(...args) {
        console.log('onSelect--change', ...args);
        const i = args[2] === 'left' ? 0 : 1;
        this.operations.splice(1 - i, 1, {
          disabled: args[i].length > 3,
          text: ['to Right', 'to Left'][i],
        });
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
