<template>
  <div>
    <ux-search-input v-model="inputVal"
                     autofocus
                     @click="onClick"
                     @search="onSearch"
                     @change="onChange"
                     @pressenter="onPressenter" />
    <ux-search-input :enter-button="true"
                     @search="onSearch" />
    <ux-search-input enter-button="Search"
                     @search="onSearch" />

    <ux-search-input disabled
                     @search="onSearch" />
    <ux-search-input disabled
                     :enter-button="true"
                     @search="onSearch" />
  </div>
</template>


<script>
  export default {
    methods: {
      onClick(e) {
        console.log('click', e);
      },
      onPressenter(e) {
        console.log('pressenter', e);
      },
      onChange(e) {
        console.log('onChange', e);
      },
      onSearch(e) {
        console.log('onSearch', e);
      },
    },
  };
</script>

<style scoped>
  .ux-input-affix-wrapper {
    margin-bottom: 10px;
  }
</style>
