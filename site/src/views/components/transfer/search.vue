<template>
  <ux-demo :height="200"
           title="搜索">
    <div slot="demo">
      <ux-transfer :data-source="dataSource"
                   :target-keys="targetKeys"
                   show-search />
      <br>
      <ux-transfer :data-source="dataSource"
                   :target-keys="targetKeys"
                   :filter-option="filterOption"
                   show-search />
    </div>
    <div slot="desc">
      过滤,可使用
      <code>filterOption</code>自定义过滤
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/transfer/search.vue';

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
    data() {
      return {
        code,
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
