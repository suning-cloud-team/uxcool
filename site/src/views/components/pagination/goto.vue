<template>
  <ux-demo title="跳转">
    <ux-pagination slot="demo"
                   :theme="theme"
                   show-quick-jumper
                   :current="5"
                   :total="500"></ux-pagination>
    <div slot="desc">快速跳转</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>
<script>
  import code from '@/code/pagination/goto';

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
