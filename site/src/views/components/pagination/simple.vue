<template>
  <ux-demo title="简单分页">
    <ux-pagination slot="demo"
                   simple
                   :total="500"
                   :theme="theme"
                   @change="paginationChange">
    </ux-pagination>
    <div slot="desc">简单分页</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/pagination/simple';

  export default {
    data() {
      return {
        code,
        current: 5,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      paginationChange(p) {
        console.log(p);
        this.current = p;
      },
    },
  };
</script>
