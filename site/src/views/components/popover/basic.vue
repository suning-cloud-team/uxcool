<template>
  <ux-demo title="基本">
    <ux-popover slot="demo"
                :theme="theme"
                title="标题"
                content="测试内容">
      popover when mouse enter
    </ux-popover>
    <div slot="desc">
      基本使用
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/popover/basic';

  export default {
    data() {
      return { code };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>
