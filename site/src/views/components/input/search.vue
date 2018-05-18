<template>
  <ux-demo title="搜索框"
           :height="200">
    <div slot="demo">
      <ux-search-input autofocus
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
    <div slot="desc">
      带搜索按钮的输入框
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>


<script>
  import code from '@/code/input/search.vue';

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
  .ux-input-search {
    margin-bottom: 10px;
  }
</style>
