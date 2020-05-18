<template>
  <div class="demo">
    <h4>search</h4>
    <ux-transfer :data-source="dataSource"
                 :target-keys="targetKeys"
                 show-search />

    <h4>filterOption</h4>
    <ux-transfer :data-source="dataSource"
                 :target-keys="targetKeys"
                 :filter-option="filterOption"
                 show-search />
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
        description: `description content ${i}`,
        // disabled: i % 3 === 0,
      }));
  }
  export default {
    components: {
      UxTransfer: Transfer,
    },
    data() {
      return {
        dataSource: mockData(15),
        targetKeys: [0, 2, 5],
      };
    },
    methods: {
      filterOption(text, item) {
        return item.description.indexOf(text) > -1;
      },
    },
  };
</script>
