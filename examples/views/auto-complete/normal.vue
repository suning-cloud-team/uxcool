<template>
  <div ref="normalDemoRef"
       class="demo">
    <h4>normal</h4>
    <ux-auto-complete :data-source="dataSource"
                      :get-container="getContainer"
                      placeholder="请选择"
                      allow-clear
                      @search="onSearch" />
  </div>
</template>


<script>
  import { AutoComplete } from '@suning/uxcool';

  export default {
    components: {
      UxAutoComplete: AutoComplete,
    },
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
