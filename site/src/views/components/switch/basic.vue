<template>
  <ux-demo title="基本用法"
           vertical>
    <div slot="demo">
      <ux-switch />
      <ux-switch checked />
    </div>
    <div slot="desc">
      最简单的用法
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/switch/basic';

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



