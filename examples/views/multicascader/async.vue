<template>
  <div class="demo">
    <h3>异步加载</h3>
    <ux-multi-cascader v-model="value"
                       :data-source="dataSource"
                       :load-data="loadData"
                       :field-names="{children: 'items'}"
                       style="width: 300px;"
    />
    <ux-multi-cascader v-model="value2"
                       :data-source="dataSource2"
                       :load-data="loadData2"
                       :field-names="{children: 'items'}"
                       check-strict
                       style="width: 300px;"
    />
    <div>value1: {{ value }}</div>
    <div>value2: {{ value2 }}</div>
  </div>
</template>

<script>
  import { UxMultiCascader } from '@cloud-sn/uxcool';

  const mockData = (count) => Array.from({ length: count }, (_, i) => ({ value: `${i + 1}`, label: `${i + 1}` }));
  const rootNodes = Array.from({ length: 4 }, (_, i) => ({ value: `${i + 1}`, label: `${i + 1}` }));

  export default {
    components: {
      UxMultiCascader,
    },
    data() {
      return {
        value: [['5'], ['1', '1', '2', '1'], ['1', '1', '10']],
        value2: [['5'], ['1', '1', '2', '1'], ['1', '1', '10']],
        dataSource: mockData(4),
        dataSource2: mockData(4),
      };
    },
    methods: {
      loadData(node) {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (!node) {
              resolve(rootNodes);
            } else {
              const data = Array.from({ length: 3 }, (_, i) => ({
                value: `${i + 1}`,
                label: `${i + 1}`,
                isParent: node.level < 2,
              }));
              resolve(data);
            }
          }, 1000);
        });
      },
      loadData2(node) {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (!node) {
              resolve(rootNodes);
            } else {
              const data = Array.from({ length: 3 }, (_, i) => ({
                value: `${i + 1}`,
                label: `${i + 1}`,
                isParent: node.level < 2,
              }));
              resolve(data);
            }
          }, 1000);
        });
      },
    },
  };
</script>
