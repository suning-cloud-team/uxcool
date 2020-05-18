<template>
  <div ref="normalDemoRef"
       class="demo">
    <h4>value</h4>
    <ux-auto-complete v-model="value"
                      :data-source="dataSource"
                      :get-container="getContainer"
                      option-label-prop="label"
                      placeholder="请选择"
                      @search="onSearch" />
  </div>
</template>


<script>
  import { AutoComplete } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxAutoComplete: AutoComplete,
    },
    data() {
      return {
        value: '123',
        dataSource: [],
      };
    },
    created() {
      setTimeout(() => {
        this.value = '321';
      }, 1500);
    },
    methods: {
      onSearch(searchValue) {
        this.dataSource = searchValue
          ? [1, 2, 3].map((v) => ({
            value: `${searchValue}`.repeat(v),
            label: `${searchValue.repeat(v)}-label`,
          }))
          : [];
      },
      getContainer() {
        return this.$refs.normalDemoRef;
      },
    },
  };
</script>
