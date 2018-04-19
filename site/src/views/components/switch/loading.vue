<template>
  <ux-demo title="加载中"
           vertical>
    <div slot="demo"
         class="gutter-group">
      <ux-switch loading
                 checked/>
      <ux-switch loading
                 checked
                 size="small" />
    </div>
    <div slot="desc">
      标识
      <code>switch</code>仍在执行中
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/switch/loading';

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

