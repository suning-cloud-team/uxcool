<template>
  <div>
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
</template>


<script>
  export default {};
</script>
<style lang="scss" scoped>
  .ux-input,
  .ux-input-search {
    margin-bottom: 10px;
  }
</style>
