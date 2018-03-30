<template>
  <ux-demo title="基本用法"
           vertical>
    <div slot="demo"
         class="gutter-group">
      <ux-button type="primary">Primary</ux-button>
      <ux-button>Default</ux-button>
      <ux-button type="dashed">Dashed</ux-button>
      <ux-button type="danger">危险</ux-button>
    </div>
    <div slot="desc">
      按钮分为: 主按钮, 次按钮,虚线按钮, 危险按钮; 主按钮操作区域最多出现一次
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/button/basic';

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
