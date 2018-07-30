<template>
  <ux-demo :height="200"
           title="动态加载">
    <div slot="demo">
      <ux-cascader v-model="value"
                   :data-source="data"
                   :load-data="loadData"
                   style="width:200px" />
    </div>
    <div slot="desc">
      通过
      <code>load-data</code>属性实现动态加载
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/cascader/async.vue';

  function mock(node, cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        label: `label-${node.value}-${i}`,
        value: `value-${node.value}-${i}`,
    }));
  }
  export default {
    data() {
      return {
        code,
        value: ['value-0-1', 'value-value-0-1-2', 'value-value-value-0-1-2-1'],
        data: mock({ value: 0 }, 4),
      };
    },
    methods: {
      loadData(node) {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (node) {
              resolve(mock(node, 3));
            } else {
              resolve(mock({ value: 0 }, 4));
              // throw new Error('abc');
            }
          }, 1500);
        });
      },
    },
  };
</script>
