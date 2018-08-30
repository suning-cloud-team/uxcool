<template>
  <ux-demo :height="200"
           title="基本使用">
    <div slot="demo"
         ref="normalDemoRef">
      <ux-auto-complete :data-source="dataSource"
                        :get-container="getContainer"
                        placeholder="请选择"
                        @search="onSearch" />
    </div>
    <div slot="desc">
      基本使用
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/auto-complete/basic.vue';

  export default {
    data() {
      return {
        code,
        dataSource: [],
      };
    },
    methods: {
      onSearch(searchValue) {
        this.dataSource = searchValue
          ? [1, 2, 3].map(v => ({
            value: `${searchValue}`.repeat(v),
          }))
          : [];
      },
      getContainer() {
        return this.$refs.normalDemoRef;
      },
    },
  };
</script>
