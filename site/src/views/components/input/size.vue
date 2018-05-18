<template>
  <ux-demo title="大小">
    <div slot="demo">
      <ux-input size="large" />
      <ux-input />
      <ux-input size="small" />

      <ux-search-input size="large" />
      <ux-search-input size="large"
                       :enter-button="true" />
      <ux-search-input />
      <ux-search-input :enter-button="true" />
      <ux-search-input size="small" />
      <ux-search-input size="small"
                       :enter-button="true" />
    </div>
    <div slot="desc">
      定义了三种大小的输入框
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>


<script>
  import code from '@/code/input/size.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .ux-input,
  .ux-input-search {
    margin-bottom: 10px;
  }
</style>
