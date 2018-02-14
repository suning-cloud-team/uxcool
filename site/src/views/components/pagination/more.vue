<template>
  <ux-demo title="更多">
    <ux-pagination slot="demo"
                   :current="5"
                   :theme="theme"
                   :total="500">
    </ux-pagination>
    <div slot="desc">更多分页</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/pagination/more';

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
