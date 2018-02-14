<template>
  <ux-demo title="基本">
    <ux-pagination slot="demo"
                   :total="50"
                   :theme="theme"> </ux-pagination>
    <div class="desc">
      基础分页
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/pagination/basic';

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
