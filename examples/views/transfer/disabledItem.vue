<template>
  <div class="demo">
    <h4>disabled item</h4>
    <ux-transfer :data-source="dataSource"
                 :selected-keys="selectedKeys"
                 show-search
                 @change="onChange"
                 @select-change="onSelectChange" />
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
        disabled: i % 3 === 0,
      }));
  }
  export default {
    components: {
      UxTransfer: Transfer,
    },
    data() {
      return {
        dataSource: mockData(10),
        selectedKeys: [0, 2],
      };
    },
    methods: {
      onChange(right, direction, keys) {
        console.log('change', right, direction, keys);
      },
      onSelectChange(left, right, position, keys, status) {
        console.log('select change', left, right, position, keys, status);
      },
    },
  };
</script>
