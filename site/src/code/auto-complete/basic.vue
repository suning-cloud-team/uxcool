<template>
  <div ref="normalDemoRef">
    <ux-auto-complete :data-source="dataSource"
                      :get-container="getContainer"
                      placeholder="请选择"
                      @search="onSearch" />
  </div>

</template>

<script>
  export default {
    data() {
      return {
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
