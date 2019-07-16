<template>
  <ux-demo title="基本使用">
    <div slot="demo">
      <ux-input autofocus
                placeholder="Normal Input" />
      <ux-input disabled
                autofocus
                placeholder="Disabled Input" />
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
  import code from '@/code/input/input.vue';

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
<style scoped>
  .ux-input {
    margin-bottom: 10px;
  }
</style>
